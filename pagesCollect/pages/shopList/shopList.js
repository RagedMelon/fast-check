import { MarketModel } from '../../../models/collect/market'
let apiMarket = new MarketModel();
// pagesCollect/pages/shopList/shopList.js
Page({

    /**
     * Page initial data
     */
    data: {
        boothInfo: [],
        id: null, //市场id
        missionId: null, //任务id
        content: '此市场暂无档口~',
        totalPages: 1, //总页数
        rp: 10, //每页多少条数据
        page: 1, //第几页
    },

    getLists() {
        let that = this
        wx.showLoading({
            title: '加载中...',
        })
        let postId = {
            rp: that.data.rp,
            page: that.data.page,
            marketId: that.data.id
        }
        console.log(that.data.id, '市场id获取成功')
        apiMarket.getBoothList(postId).then(res => {
            console.log(res.data.rows)
            wx.hideLoading()
                // 获取总条数
            const total = res.data.records;
            // 计算总页数
            const totalPages = res.data.total;
            that.setData({
                totalPages: totalPages,
                boothInfo: [...that.data.boothInfo, ...res.data.rows]
            })
        })
    },
    /**
     * Lifecycle function--Called when page load
     */
    // 获取档口列表
    onLoad: function(options) {
        let id = options.id //市场id
        let code = parseInt(id)
        let that = this
        that.setData({
            id: code
        })
        that.getLists()
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
        //  1 判断还有没有下一页数据
        if (this.data.page >= this.data.totalPages) {
            // 没有下一页数据
            //  console.log('%c'+"没有下一页数据","color:red;font-size:100px;background-image:linear-gradient(to right,#0094ff,pink)");
            wx.showToast({ title: '已经加载完列表' });

        } else {
            // 还有下一页数据
            //  console.log('%c'+"有下一页数据","color:red;font-size:100px;background-image:linear-gradient(to right,#0094ff,pink)");
            this.data.page++;
            this.getLists();
        }
    },

    /**
     * Called when user click on the top right corner to share
     */
    onShareAppMessage: function() {

    }
})