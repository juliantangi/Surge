const REQUEST_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.61 Safari/537.36',
  'Accept-Language': 'en',
};

async function checkNetflix() {
  let inner_check = (filmId) => {
    return new Promise((resolve, reject) => {
      let option = {
        url: 'https://www.netflix.com/title/' + filmId,
        headers: REQUEST_HEADERS,
      }
      $httpClient.get(option, function (error, response, data) {
        if (error != null) {
          reject('Error')
          return
        }

        if (response.status === 403) {
          reject('Not Available')
          return
        }

        if (response.status === 404) {
          resolve('Not Found')
          return
        }

        if (response.status === 200) {
          let url = response.headers['x-originating-url']
          let region = url.split('/')[3]
          region = region.split('-')[0]
          if (region == 'title') {
            region = 'us'
          }
          resolve(region)
          return
        }

        reject('Error')
      })
    })
  }

  let netflix_check_result = 'Netflix: '

  await inner_check(81280792)
    .then((code) => {
      if (code === 'Not Found') {
        return inner_check(80018499)
      }
      netflix_check_result += '已完整解鎖，區域: ' + code.toUpperCase()
      return Promise.reject('BreakSignal')
    })
    .then((code) => {
      if (code === 'Not Found') {
        return Promise.reject('Not Available')
      }

      netflix_check_result += '僅解鎖自製劇，區域: ' + code.toUpperCase()
      return Promise.reject('BreakSignal')
    })
    .catch((error) => {
      if (error === 'BreakSignal') {
        return
      }
      if (error === 'Not Available') {
        netflix_check_result += '該節點不支援解鎖'
        return
      }
      netflix_check_result += '檢查失敗，請重新整理'
    })

  return netflix_check_result
}

async function main() {
  const netflixCheck = await checkNetflix();
  if (netflixCheck.includes('僅解鎖自製劇')) {
    $surge.setSelectGroupPolicy('Streaming Media', 'Hong Kong');
    $notification.post('Netflix Check', '','Direct connection was limited, proxy has been used.');
  }
  $done();
}

$surge.setSelectGroupPolicy('Streaming Media', 'DIRECT');
main();
