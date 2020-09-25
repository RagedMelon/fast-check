import { HTTP } from '../../api/http'
class MarketModel extends HTTP {
    /**
     * 获取任务列表
     * @rp  每页大小，默认10
     * @page  当前取第几页，默认1
     * @keyWord 市场名、编号、负责人
     * @marketType 市场类型
     * @lat 纬度
     * @lng 经度
     */
    getMarketList({
        rp,
        page
    }) {
        return this.request({

            mock: 1,
            url: 'inspection.do?action=listMarket',
            data: {
                rp,
                page
            }
        })
    }

    //获取行政区域信息
    //@parentId 父id，不传值时返回省级单位，传值时则往下查询。
    getCities({
            parentId
        }) {
            return this.request({
                mock: 1,
                url: 'areaInfo.do?action=listTree',
                data: {
                    parentId
                }
            })
        }
        // 根据地级市获取市场
    getCityMarketList({
            rp,
            page,
            cityId
        }) {
            return this.request({
                mock: 1,
                url: 'inspection.do?action=listMarket',
                data: {
                    rp,
                    page,
                    cityId
                }
            })
        }
        // 根据地级市搜索
    getCitySearchMarkets({
        rp,
        page,
        keyWord,
        cityId
    }) {
        return this.request({
            mock: 1,
            url: 'inspection.do?action=listMarket',
            data: {
                rp,
                page,
                keyWord,

                cityId
            }
        })
    }

    // 根据关键字查找市场
    /**
     * 获取任务列表
     * @rp  每页大小，默认10
     * @page  当前取第几页，默认1
     * @keyWord 市场名、编号、负责人
     * @marketType 市场类型
     * @lat 纬度
     * @lng 经度
     */
    getCertainMarket({
        rp,
        page,
        keyWord
    }) {
        return this.request({
            mock: 1,
            url: 'inspection.do?action=listMarket',
            data: {
                rp,
                page,
                keyWord
            }
        })
    }

    // 根据市场id获取档口列表
    getBoothList({
            rp,
            page,
            marketId
        }) {
            return this.request({
                mock: 1,
                url: 'inspection.do?action=listBooth',
                data: {
                    rp,
                    page,
                    marketId
                }
            })
        }
        // 根据档口id获取档口信息
    getBoothInfo({
            id
        }) {
            return this.request({
                mock: 1,
                url: 'boothInfo.do?action=getBoothInfo',
                data: {
                    id
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
        // 根据营业执照id获取执照图片
    getCertification({
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
        // 根据档口编码，商户编码获取30天内的检验记录
        /**
         * @boothCode  档口编码
         * @businessManCode  商户编码
         */
    getMonthRecord({
            boothCode,
            businessManCode
        }) {
            return this.request({
                mock: 1,
                url: 'inspection.do?action=listNearlyAMonth',
                data: {
                    boothCode,
                    businessManCode
                }
            })
        }
        // 扫商户码获取商户详情
    getDetailsByScan({
        boothCode,
        businessManCode
    }) {
        return this.request({
            mock: 1,
            url: 'businessman.do?action=getBusinessManDetail',
            data: {
                boothCode,
                businessManCode
            }
        })
    }
}

export { MarketModel }