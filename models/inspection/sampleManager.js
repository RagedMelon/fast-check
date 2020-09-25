import { HTTP } from '../../api/http'
class SampleManagerModel extends HTTP {
    /**
     * 获取采样列表
     * @rp  每页大小，默认10
     * @page  当前取第几页，默认1
     * @isInspection 是否已检验
     * @status 采样状态 TORELATED("草稿-待关联"), TOFILL("草稿-待填报"), COMMIT("提交")
     * @startDate  开始日期
     * @endDate    截止日期
     */
    // 获取列表
    getSampleList({
        rp,
        page,
        status,
        isInspection
    }) {
        return this.request({
            mock: 1,
            url: 'sample.do?action=list',
            data: {
                rp,
                page,
                status,
                isInspection
            }
        })
    }


    // 分别获取检验合格/不合格列表
    getInspectedList({
            status,
            isInspection,
            isQualified
        }) {
            return this.request({
                mock: 1,
                url: 'sample.do?action=list',
                data: {
                    status,
                    isInspection,
                    isQualified
                }
            })
        }
        // 获取时间筛选的列表
    getTimeFiltertedList({
            rp,
            page,
            status,
            isInspection,
            startDate,
            endDate
        }) {
            return this.request({
                mock: 1,
                url: 'sample.do?action=list',
                data: {
                    rp,
                    page,
                    status,
                    isInspection,
                    startDate,
                    endDate
                }
            })
        }
        // 获取时间+检验结果筛选列表
    getDoubleFilteredList({
            rp,
            page,
            status,
            isInspection,
            isQualified,
            startDate,
            endDate
        }) {
            return this.request({
                mock: 1,
                url: 'sample.do?action=list',
                data: {
                    rp,
                    page,
                    status,
                    isInspection,
                    isQualified,
                    startDate,
                    endDate
                }
            })
        }
        // 根据商品一级分类id获取检验项目
    getCheckItemAll({
            businessProductTypeId
        }) {
            return this.request({
                mock: 1,
                url: 'checkItem.do?action=findAll',
                data: {
                    businessProductTypeId
                }
            })
        }
        // 根据检验项目id获取试剂id
    getReagentInfo({
            checkItemId
        }) {
            return this.request({
                mock: 1,
                url: 'reagentInfo.do?action=list',
                data: {
                    checkItemId
                }
            })
        }
        // 保存检验结果
    saveInspectedInfo({
            sampleCode,
            checkItemsJson,
            inspectType
        }) {
            return this.request({
                mock: 1,
                url: 'inspection.do?action=save',
                data: {
                    sampleCode,
                    checkItemsJson,
                    inspectType
                }
            })
        }
        // 保存处理结果
    saveHandledResult({
            sampleId,
            type,
            weight,
            pic
        }) {
            return this.request({
                mock: 1,
                url: 'sample.do?action=dispose',
                data: {
                    sampleId,
                    type,
                    weight,
                    pic
                }
            })
        }
        // 获取处理结果
    getHandledResult({
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

export { SampleManagerModel }