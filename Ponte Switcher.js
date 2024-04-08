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
        let networkinfo = info.query + info.country;
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
			$surge.setSelectGroupPolicy('Ponte', 'Hong Kong');
    $notification.post('SFW Check', '','IP address has been switched to Hong Kong.');
		}
		
  } catch (error) {
    console.log(error);
  }
  $done();
}

main();
