import { HTTP } from '../../api/http'
class CationModel extends HTTP {
    /**
     * 获取可打卡市场列表
     * @lng  经度
     * @lat  纬度
     */
    getGame({
        lng,
        lat
    }) {
        return this.request({
            mock: 1,
            url: 'clockin.do?action=listByLocation',
            data: {
                lng,
                lat
            }
        })
    }


}

export { CationModel }