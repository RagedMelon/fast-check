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
        boothCode: null,
        businessManCode: null,
        businessLicenceFileIds: null,
    },

    // 商户信息
    hide() {
        this.setData({
            hide: !this.data.hide,
        })
        if (this.data.tip == "展开") {
            this.setData({
                tip: "收起"
            })
        } else {
            this.setData({
                tip: "展开"
            })
        }
    },
    changeName() {
        this.setData({
            showNameList: true
        })
    },
    chooseName(e) {
        console.log(e.currentTarget.dataset)
            // console.log(e.currentTarget.dataset.name)
        this.setData({
            index: e.currentTarget.dataset.index,
            showNameList: false
        })
        this.triggerEvent('getcodes', {
            boothcode: e.currentTarget.dataset.boothcode,
            businesscode: e.currentTarget.dataset.businesscode,
            businessLicenceFileIds: e.currentTarget.dataset.businessLicenceFileIds,
            businessmanId: e.currentTarget.dataset.id
        })

    },
    // 跳转到编辑页面
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
        console.log(options, "经营者编码，档口编码")
        let that = this
            // 把id赋值给data
        this.setData({
                boothCode: options.boothCode,
                businessManCode: options.businessManCode
            })
            // 扫商户码进入时获取商户信息
        let codes = {
            boothCode: options.boothCode,
            businessManCode: options.businessManCode,

        }
        console.log(codes, '请求参数：经营者编码，档口编码')
        apiMarket.getDetailsByScan(codes).then(res => {
                console.log(res, '商户码的信息')
                that.setData({
                    boothInfo: res.data,
                    id: res.data.boothId,
                    marketId: res.data.marketId,
                    businessmanId: res.data.businessmanId,
                    businessLicenceFileIds: 'https://fastcheck.id-cas.cn/fastcheck/sambaFile.do?action=showImageById&id=' + res.data.businessLicenceFileIds
                })
            })
            // 扫商户码进入时获取近三十天检验记录
        apiMarket.getMonthRecord(codes).then(res => {
            that.setData({
                monthRecord: res.data.rows
            })

        })

        // 根据档口id获取档口经营者信息
        // if (options.id) {
        //     let id = options.id
        //     let code = parseInt(id)
        //         // let that = this
        //     that.setData({
        //         id: code,
        //         marketId: options.marketid
        //     })
        //     let postId = {
        //         boothId: code

        //     }
        //     console.log(postId, '传参档口id')
        //     apiMarket.getOwnerInfo(postId).then(res => {
        //         console.log(res, '档口id查询详情结果')
        //         that.setData({
        //             boothInfo: res.data,
        //             businessmanId: res.data[0].id

        //         })
        //         console.log(that.data.boothInfo, '获取经营者信息')

        //     })
        // }
        // 扫商户码进入时
        // if (options.boothCode && options.businessManCode) {
        //     let codes = {
        //         boothCode: options.boothCode,
        //         businessManCode: options.businessManCode
        //     }
        //     console.log(codes, '扫商户码获取的数据')
        //     apiMarket.getDetailsByScan(codes).then(res => {
        //         console.log(res)
        //         that.setData({
        //             boothInfo: res.data
        //         })
        //     })

        // }


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