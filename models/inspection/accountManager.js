import { HTTP } from '../../api/http'
class accountManagerModel extends HTTP {
    /**
     * 获取采样列表
     * @rp  每页大小，默认10
     * @page  当前取第几页，默认1
     * @status 采样状态 TORELATED("草稿-待关联"), TOFILL("草稿-待填报"), COMMIT("提交")
     * @startDate  开始日期
     * @endDate    截止日期
     * @key     关键字（商品名、采样人名、市场名）
     * @isHandle 是否已处理
     */
    // 获取合格列表
    getPassedList({
            rp,
            page,
            startDate,
            endDate
        }) {
            return this.request({
                mock: 1,
                url: 'inspection.do?action=listPass',
                data: {
                    rp,
                    page,
                    startDate,
                    endDate
                }
            })
        }
        // 获取不合格列表
    getFailedList({
            rp,
            page,
            startDate,
            endDate
        }) {
            return this.request({
                mock: 1,
                url: 'inspection.do?action=listFail',
                data: {
                    rp,
                    page,
                    startDate,
                    endDate
                }
            })
        }
        // 获取关键字筛选合格列表
    getKeyPassedList({
            rp,
            page,
            startDate,
            endDate,
            key

        }) {
            return this.request({
                mock: 1,
                url: 'inspection.do?action=listPass',
                data: {
                    rp,
                    page,
                    startDate,
                    endDate,
                    key
                }
            })
        }
        // 获取关键字筛选不合格列表
    getKeyFailedList({
            rp,
            page,
            startDate,
            endDate,
            key
        }) {
            return this.request({
                mock: 1,
                url: 'inspection.do?action=listFail',
                data: {
                    rp,
                    page,
                    startDate,
                    endDate,
                    key
                }
            })
        }
        // 不合格-无搜索内容-自定义时间-全部
    getFailedNoSearchCustomList({
            rp,
            page,
            startDate,
            endDate
        }) {
            return this.request({
                mock: 1,
                url: 'inspection.do?action=listFail',
                data: {
                    rp,
                    page,
                    startDate,
                    endDate
                }
            })
        }
        // 无关键字筛选不合格列表+处理与否筛选
    getFailedStatusList({
            rp,
            page,
            startDate,
            endDate,
            isHandle
        }) {
            return this.request({
                mock: 1,
                url: 'inspection.do?action=listFail',
                data: {
                    rp,
                    page,
                    startDate,
                    endDate,
                    isHandle
                }
            })
        }
        // 不合格-有搜索内容-自定义时间-全部
    getKeyFailedCustomAllList({
            rp,
            page,
            startDate,
            endDate,
            key
        }) {
            return this.request({
                mock: 1,
                url: 'inspection.do?action=listFail',
                data: {
                    rp,
                    page,
                    startDate,
                    endDate,
                    key
                }
            })
        }
        // 获取关键字筛选不合格列表+处理与否筛选
    getKeyFailedStatusList({
        rp,
        page,
        startDate,
        endDate,
        key,
        isHandle
    }) {
        return this.request({
            mock: 1,
            url: 'inspection.do?action=listFail',
            data: {
                rp,
                page,
                startDate,
                endDate,
                key,
                isHandle
            }
        })
    }
    getTestDetails({
        sampleId
    }) {
        return this.request({
            mock: 1,
            url: 'inspection.do?action=findDetail',
            data: {
                sampleId
            }
        })
    }

}

export { accountManagerModel }