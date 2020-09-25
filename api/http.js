import {
    mockData
} from 'mock-data.js' //模拟数据内容
import {
    config
} from '../config.js'

// 请求状态
const tips = {
    1: '请求有误',
}
class HTTP {
    // mock 模拟数据是否返回数组  1为数组 默认为1
    mock = 1
    request({ mock, url, data = {}, method = 'GET' }) {
        // url 判断是否为空  为空是使用模拟数据
        if (url) {
            return new Promise((resolve, reject) => {
                wx.request({
                    url: config.api_url + url,
                    method: method,
                    data: {
                        ...data,
                        ecafeToken: wx.getStorageSync('ecafeToken'),
                        ecafeNotRedirect: true
                    },
                    header: {
                        "Content-Type": "application/json"
                    },
                    success: (res) => {
                        const code = res.statusCode.toString()
                        if (code.startsWith('2')) {
                            resolve(res.data)
                        } else {
                            reject()
                            const error_code = res.data.error_code
                            this._show_error(error_code)
                        }
                    },
                    fail: (err) => {
                        reject()
                        this._show_error(1)
                    }
                });
            })
        } else {
            var res = mockData(mock)
                // // 输出结果
            return new Promise((resolve, reject) => {
                resolve(res)
            })

        }
    }
    _show_error(error_code) {
        if (!error_code) {
            error_code = 1
        }
        const tip = tips[error_code]
        wx.showToast({
            title: tip ? tip : tips[1],
            icon: 'none',
            duration: 2000
        })
    }
}
export {
    HTTP
}