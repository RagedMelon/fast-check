// 共用接口
import { HTTP } from '../api/http.js'
class LoginModel extends HTTP {
    // 登录接口
    getLogin({
        dataType,
        username,
        password
    }) {
        return this.request({
            mock: 1,
            url: 'login.do?action=mobileLogin',
            data: {
                dataType,
                username,
                password
            }
        })
    }

    // 上传文件
    upload({
            file,
            directoryType
        }) {
            return this.request({
                mock: 1,
                url: 'uploadFile.do?action=upload',
                data: {
                    file,
                    directoryType
                }
            })
        }
        // 获取文件
    requestFile({
        id
    }) {
        return this.request({
            mock: 1,
            url: 'sambaFile.do?action=showImageById',
            data: {
                id
            }
        })
    }

}

export { LoginModel }