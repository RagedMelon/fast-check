import { HTTP } from '../../api/http'
class ResetModel extends HTTP {
    /**
     * 获取采样列表
     * oldPassword 旧密码
     * newPassword 新密码
     * confirmPassword 确认密码
     */

    resetPassword({
        oldPassword,
        newPassword,
        confirmPassword
    }) {
        return this.request({
            mock: 1,
            url: 'login.do?action=changePassword',
            data: {
                oldPassword,
                newPassword,
                confirmPassword
            }
        })
    }



}

export { ResetModel }