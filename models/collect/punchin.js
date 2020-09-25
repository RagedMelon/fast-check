import { HTTP } from '../../api/http'
class PunchinModel extends HTTP {
    /**
     * 获取可打卡市场列表
     * @lng  经度
     * @lat  纬度
     */
    getPunchinList({
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

    /**
     * 打卡
     * @lng  经度
     * @lat  纬度
     * @marketId 市场id
     */
    getPunchin({
        lng,
        lat,
        marketId
    }) {
        return this.request({
            mock: 1,
            url: 'clockin.do?action=clockIn',
            data: {
                lng,
                lat,
                marketId
            }
        })
    }

    /**
     * 获取打卡数据
     * @stateDate  统计的时间YYYY-MM-DD
     * 
     */
    getPunchinStat({
        statDate
    }) {
        return this.request({
            mock: 1,
            url: 'clockin.do?action=clockInStat',
            data: {
                statDate
            }
        })
    }

    /**
     * 获取打卡记录
     * @rp  每页大小，默认10
     * @page 当前取第几页，默认1
     * @statDate 统计的时间YYYY-MM-DD
     */
    getPunchinRecord({
        statDate
    }) {
        return this.request({
            mock: 1,
            url: 'clockin.do?action=list',
            data: {
                statDate
            }
        })
    }

}

export { PunchinModel }