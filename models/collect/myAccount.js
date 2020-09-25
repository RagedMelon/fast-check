import { HTTP } from '../../api/http'
class TaskModel extends HTTP {
    /**
     * 获取用户信息
     */
    getInfo() {
        return this.request({
            mock: 1,
            url: 'mission.do?action=list',
            data: {}
        })
    }

}

export { TaskModel }