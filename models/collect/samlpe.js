import { HTTP } from '../../api/http'
class SampleModel extends HTTP {
    /**
     * 获取采样列表
     * @rp  每页大小，默认10
     * @page  当前取第几页，默认1
     * @isInspection 是否已检验
     * @status 采样状态 TORELATED("草稿-待关联"), TOFILL("草稿-待填报"), COMMIT("提交")
     * @startDate  开始日期
     * @endDate    截止日期
     */
    // 获取未完成-未关联，未完成-已关联，完成
    getSampleList({
        rp,
        page,
        status
    }) {
        return this.request({
            mock: 1,
            url: 'sample.do?action=list',
            data: {
                rp,
                page,
                status
            }
        })
    }


    // 获取时间筛选列表
    getFilteredSampleList({
            rp,
            page,
            startDate,
            endDate
        }) {
            return this.request({
                mock: 1,
                url: 'sample.do?action=list',
                data: {
                    rp,
                    page,
                    startDate,
                    endDate
                }
            })
        }
        // 获取已完成采样的详情
        //@code 采样码
    getSampleDetails({

        code
    }) {
        return this.request({
            mock: 1,
            url: 'sample.do?action=findByCode',
            data: {
                code
            }
        })
    }


}

export { SampleModel }