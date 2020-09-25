import { MarketModel } from '../../../models/collect/market'
let apiMarket = new MarketModel();
// pagesCollect/pages/shopInfo/shopInfo.js
Page({

    /**
     * Page initial data
     */
    data: {
        id: null, //档口id
        marketId: null, //市场id
        boothInfo: null,
        businessPic: null,
        monthRecord: null, //30天记录
        businessmanId: null, //商户id
        // 编码
        boothCode: '',
        businessManCode: ''
    },

    random() {
        let businessmanId = this.data.businessmanId
        let boothInfoId = this.data.id
        let marketId = this.data.marketId
        wx.navigateTo({
            url: '/pagesCollect/pages/randomTest/randomTest?businessmanId=' + businessmanId + '&boothInfoId=' + boothInfoId + '&marketId=' + marketId,
        })
    },
    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function(options) {
        console.log(options, "获取档口id，档口码，经营者码,营业执照码,市场id等")
        let that = this
            // 根据档口id获取档口经营者信息
        if (options.id) {
            let id = options.id
            let code = parseInt(id)
                // let that = this
            that.setData({
                id: code,
                marketId: options.marketid
            })
            let postId = {
                boothId: code

            }
            console.log(postId, '传参档口id')
            apiMarket.getOwnerInfo(postId).then(res => {
                console.log(res, '档口id查询详情结果')
                let picUrl = res.data[0].businessLicenceFileIds
                that.setData({
                    boothInfo: res.data,
                    businessmanId: res.data[0].id,
                    boothCode: res.data[0].boothCode,
                    businessManCode: res.data[0].businessCode,
                    businessPic: 'https://fastcheck.id-cas.cn/fastcheck/sambaFile.do?action=showImageById&id=' + picUrl

                })
                console.log(that.data.boothInfo, '获取经营者信息')
                let recordPost = {
                    businessmanId: res.data[0].id,
                    boothCode: res.data[0].boothCode,
                    businessManCode: res.data[0].businessCode,
                }
                console.log(recordPost)
                apiMarket.getMonthRecord(recordPost).then(res => {
                    console.log(res, '获取30天检验记录')
                    this.setData({
                        monthRecord: res.data.rows
                    })
                })
            })
        }
    },
    // 选择商户后获取相应的档口编码和商户编码
    getcodes(e) {
        console.log(e, '选择商户后对应的数据')
        this.setData({
                businessmanId: e.detail.id
            })
            // 根据档口编码和经营者编码获取近30天检验记录
        let recordPost = {
                boothCode: e.detail.boothcode,
                businessManCode: e.detail.businesscode
            }
            // console.log(recordPost, '查看30天记录传入的参数')
        apiMarket.getMonthRecord(recordPost).then(res => {
                console.log(res, '获取30天检验记录')
                this.setData({
                    monthRecord: res.data.rows
                })
            })
            // 根据营业执照id获取图片

        this.setData({
            businessPic: 'https://fastcheck.id-cas.cn/fastcheck/sambaFile.do?action=showImageById&id=' + e.detail.businessLicenceFileIds

        })
        console.log(this.data.businessPic)

    },
    /**
     * Lifecycle function--Called when page is initially rendered
     */
    onReady: function() {

    },

    /**
     * Lifecycle function--Called when page show
     */
    onShow: function() {

    },

    /**
     * Lifecycle function--Called when page hide
     */
    onHide: function() {

    },

    /**
     * Lifecycle function--Called when page unload
     */
    onUnload: function() {

    },

    /**
     * Page event handler function--Called when user drop down
     */
    onPullDownRefresh: function() {

    },

    /**
     * Called when page reach bottom
     */
    onReachBottom: function() {

    },

    /**
     * Called when user click on the top right corner to share
     */
    onShareAppMessage: function() {

    }
})