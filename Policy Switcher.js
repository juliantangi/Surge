const REQUEST_HEADERS = {
	'Accept':'application/json'
};

function getNetworkInfo() {
  return new Promise((resolve, reject) => {
    let option = {
      url: 'https://api.ipdata.co/?api-key=e63e9feb223c15f832b756e4f4a6a68894bc3ba13fa86066df28254d',
      headers:REQUEST_HEADERS
    };
    $httpClient.get(option, function (error, response, data) {
      if (error) {
        reject('error unknown');
      } else if (response.status === 200) {
        const info = JSON.parse(data);
        let networkinfo = info.country_name;
        resolve(networkinfo);
      } else {
				errorcode=response.status
        resolve(errorcode);
      }
    });
  });
}

async function main() {
  try {
    const NetworkInfo = await getNetworkInfo();
    if (NetworkInfo!= 'Hong Kong'){
			$surge.setSelectGroupPolicy('Work', '🦈Hong Kong');
      $notification.post('Work Proxy Rule Check', '','IP address has been switched to Hong Kong.');
		} else {
      $surge.setSelectGroupPolicy('Work', 'DIRECT');
    }

    if (NetworkInfo!= 'Hong Kong' && NetworkInfo!= 'China'){
			$surge.setSelectGroupPolicy('AI', 'DIRECT');
		} else {
      $surge.setSelectGroupPolicy('AI', '🦈Japan');
    }

    if (NetworkInfo === 'Japan'){
			// $surge.setSelectGroupPolicy('Netflix', 'DIRECT');
      $surge.setSelectGroupPolicy('Gaming', 'DIRECT');
      $notification.post('Gaming Changed to Direct', '','Proxy rule has been switched to Direct.');
		} //else {
      // $surge.setSelectGroupPolicy('Netflix', 'Japan');
      //$surge.setSelectGroupPolicy('Gaming', '🦈Japan');
    //}

    // if ($network.wifi.ssid === 'Iontrading'){
    //   $surge.setOutboundMode('direct');
    //   $notification.post('Connected to Working Place Wifi', '','Outbound Mode has been switched to Direct.');
    // } else {
    //   $surge.setOutboundMode('rule');
    // }
		
  } catch (error) {
    console.log(error);
  }
  $done();
}

main();
