import { TaskModel } from '../../../models/collect/task'
let apiTask = new TaskModel();
// pagesCollect/pages/taskDetails/taskDetails.js
Page({

    /**
     * Page initial data
     */
    data: {
        id: null,
        details: null,
        infoList: [{
                id: 1,
                tag: '任务编号'
            },
            {
                id: 2,
                tag: '任务地点'
            },
            {
                id: 3,
                tag: '检验次数'
            },
            {
                id: 4,
                tag: '蔬菜类'
            },
            {
                id: 5,
                tag: '水产类'
            },
            {
                id: 6,
                tag: '蛋肉类'
            },
            {
                id: 7,
                tag: '采样人'
            },
            {
                id: 8,
                tag: '检验人'
            },
            {
                id: 9,
                tag: '截止日期'
            },
            {
                id: 10,
                tag: '备注'
            },
        ]
    },

    getDetials() {
        let that = this
        let taskId = that.data.id
        let postId = {
            id: taskId
        }
        apiTask.getTaskDetails(postId).then(res => {
            console.log(res)
            that.setData({
                details: res.data
            })
        })
    },
    goToMarket() {
        let mktId = this.data.details.marketInfoDto.id
        console.log(mktId)
        wx.navigateTo({
            url: '/pagesCollect/pages/shopList/shopList?id=' + mktId
        })
    },
    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function(options) {
        let id = options.id
        let code = parseInt(id)
        let that = this
        that.setData({
            id: code
        })
        this.getDetials()
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