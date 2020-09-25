import { HTTP } from '../../api/http'
class TaskModel extends HTTP {
    /**
     * 获取任务列表
     * @rp  每页大小，默认10
     * @page  当前取第几页，默认1
     * @isComplete 是否完成
     * @isOverdue 是否超期
     * @preExpire 用于查询当前不超期 N天后超期的任务（值判断不能小于等于0）
     * @allExpire 用于查询N天后超期的所有任务（值判断不能小于等于0）
     * @userId  用户id
     * @startDate  开始日期
     * @endDate    截止日期
     * @marketId  市场id
     */
    getTaskAll() {
        return this.request({
            mock: 1,
            url: 'mission.do?action=list',
            data: {}
        })
    }

    homePageList({
            userId
        }) {
            return this.request({
                mock: 1,
                url: 'mission.do?action=warnMission',
                data: {
                    userId
                }
            })
        }
        // 根据市场获取任务列表
        // 新
    marketIdGetTasks({
            rp,
            page,
            isComplete,
            marketId,
            userId
        }) {
            return this.request({
                mock: 1,
                url: 'mission.do?action=list',
                data: {
                    rp,
                    page,
                    isComplete,
                    marketId,
                    userId
                }
            })
        }
        // 旧
    certainMarketTask({
            rp,
            page,
            isComplete,
            marketId
        }) {
            return this.request({
                mock: 1,
                url: 'mission.do?action=list',
                data: {
                    rp,
                    page,
                    isComplete,
                    marketId
                }
            })
        }
        // 根据是否完成获取任务列表
    getTaskList({
        rp,
        page,
        isComplete,
        userId
    }) {
        return this.request({
            mock: 1,
            url: 'mission.do?action=list',
            data: {
                rp,
                page,
                isComplete,
                userId
            }
        })
    }

    // 首页扫二维码
    getSampleUserTasks({
            userId,
            isComplete
        }) {
            return this.request({
                mock: 1,
                url: 'mission.do?action=listSampleMission',
                data: {
                    userId,
                    isComplete
                }
            })
        }
        // 获取未完成/完成-超期/未超期任务
    getOverdueList({
            rp,
            page,
            isComplete,
            isOverdue
        }) {
            return this.request({
                mock: 1,
                url: 'mission.do?action=list',
                data: {
                    rp,
                    page,
                    isComplete,
                    isOverdue
                }
            })
        }
        // 获取即将到期任务
    getSoonList({
            userId
        }) {
            return this.request({
                mock: 1,
                url: 'mission.do?action=closeExpire',
                data: {
                    userId
                }
            })
        }
        // 根据档口id获取商户信息
    getOwnerInfo({
            boothId
        }) {
            return this.request({
                mock: 1,
                url: 'businessman.do?action=findByBoothId',
                data: {
                    boothId
                }
            })
        }
        // 获取任务详情
    getTaskDetails({
            id
        }) {
            return this.request({
                mock: 1,
                url: 'mission.do?action=getMission',
                data: {
                    id
                }
            })
        }
        // 获取双筛选后任务
    getFilteredList({
            rp,
            page,
            isComplete,
            isOverdue,
            startDate,
            endDate,
            userId

        }) {
            return this.request({
                mock: 1,
                url: 'mission.do?action=list',
                data: {
                    rp,
                    page,
                    isComplete,
                    isOverdue,
                    startDate,
                    endDate,
                    userId
                }
            })
        }
        // 获取时间筛选后任务
    getTimeList({
            rp,
            page,
            isComplete,
            startDate,
            endDate,
            userId

        }) {
            return this.request({
                mock: 1,
                url: 'mission.do?action=list',
                data: {
                    rp,
                    page,
                    isComplete,
                    startDate,
                    endDate,
                    userId

                }
            })
        }
        // 获取状态筛选后任务
    getStatusList({
            isComplete,
            isOverdue
        }) {
            return this.request({
                mock: 1,
                url: 'mission.do?action=list',
                data: {
                    isComplete,
                    isOverdue,
                }
            })
        }
        // 获取商品列表
    getProductList({
            productName
        }) {
            return this.request({
                mock: 1,
                url: 'businessProduct.do?action=list',
                data: {
                    productName
                }
            })
        }
        // 获取采样人最近一次填写的商品相关信息
    getRecentFill({
            boothId,
            businessProductId
        }) {
            return this.request({
                mock: 1,
                url: 'sample.do?action=lastProductInfo',
                data: {
                    boothId,
                    businessProductId
                }
            })
        }
        // 上传文件
    upload({
            // file,
            directoryType
        }) {
            return this.request({
                mock: 1,
                url: 'uploadFile.do?action=upload',
                data: {
                    // file,
                    directoryType,
                },
                method: 'post'
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
        // 草稿按钮
    draftBtn({
            saveType,
            missionId,
            boothInfoId,
            businessmanId,
            sampleProductJson
        }) {
            return this.request({
                mock: 1,
                url: 'sample.do?action=save',
                data: {
                    saveType,
                    missionId,
                    boothInfoId,
                    businessmanId,
                    sampleProductJson
                }
            })
        }
        // 提交采样
    submitBtn({
        saveType,
        missionId,
        boothInfoId,
        businessmanId,
        sampleProductJson
    }) {
        return this.request({
            mock: 1,
            url: 'sample.do?action=save',
            data: {
                saveType,
                missionId,
                boothInfoId,
                businessmanId,
                sampleProductJson
            }
        })
    }
}

export { TaskModel }