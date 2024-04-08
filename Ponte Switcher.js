class httpMethod {
    /**
     * Callback function
     * @param {*} resolve 
     * @param {*} reject 
     * @param {*} error 
     * @param {*} response 
     * @param {*} data 
     */
    static _httpRequestCallback(resolve, reject, error, response, data) {
        if (error) {
            reject(error);
        } else {
            resolve(Object.assign(response, { data }));
        }
    }

    /**
     * HTTP GET
     * @param {Object} option 選項
     * @returns 
     */
    static get(option = {}) {
        return new Promise((resolve, reject) => {
            $httpClient.get(option, (error, response, data) => {
                this._httpRequestCallback(resolve, reject, error, response, data);
            });
        });
    }

    /**
     * HTTP POST
     * @param {Object} option 选项
     * @returns 
     */
    static post(option = {}) {
        return new Promise((resolve, reject) => {
            $httpClient.post(option, (error, response, data) => {
                this._httpRequestCallback(resolve, reject, error, response, data);
            });
        });
    }
}

class loggerUtil {
    constructor() {
        this.id = randomString();
    }

    log(message) {
        message = `[${this.id}] [ LOG ] ${message}`;
        console.log(message);
    }

    error(message) {
        message = `[${this.id}] [ERROR] ${message}`;
        console.log(message);
    }
}

function getNetworkInfo(retryTimes = 5, retryInterval = 1000) {
    // send http request
    httpMethod.get('http://ip-api.com/json').then(response => {
        if (Number(response.status) > 300) {
            throw new Error(`Request error with http status code: ${response.status}\n${response.data}`);
        }
        const info = JSON.parse(response.data);
        let networkinfo=info.query+info.country
        return networkinfo
    }).catch(error => {
        return 'unknown'
    });
}

const retryTimes = 5;
const retryInterval = 1000;
let NetworkInfo=getNetworkInfo(retryTimes, retryInterval);
console.log(NetworkInfo);
$done();
