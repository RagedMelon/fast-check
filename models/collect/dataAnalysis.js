import { HTTP } from '../../api/http'
class dataAnalysisModel extends HTTP {
    /**
     * 获取市场列表
     * @rp  每页大小，默认10
     * @page  当前取第几页，默认1
     */
    // 获取所有市场
    getAllmarket() {
            return this.request({
                mock: 1,
                url: 'marketInfo.do?action=findAll',
                data: {}
            })
        }
        //根据月份获取市场数据统计
        //marketId-市场id
        //monthStr-字符串格式：2020-09
    getMonthlyData({
        marketId,
        monthStr
    }) {
        return this.request({
            mock: 1,
            url: 'statistics.do?action=getByMonthStr',
            data: {
                marketId,
                monthStr
            }
        })
    }
}

export { dataAnalysisModel }