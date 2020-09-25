import { TaskModel } from '../../../models/collect/task'
let apiTask = new TaskModel();
// pagesCollect/pages/index/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        noTask: '暂时没有任务~',
        // 底部tab
        blockid: 0,
        bgcolor: '#FFFFFF',
        color: "#989898",
        selectedColor: '#57D957',
        showborder: false,
        bordercolor: "",
        tabbar: [{
                id: 1,
                pagePath: "page/home0/index",
                selectedIconPath: '/images/test/nav_bottom_icon_home_selected@2x.png',
                iconPath: '/images/test/nav_bottom_icon_home_default@2x.png',
                text: '首页',
            }, {
                id: 2,
                pagePath: "page/home2/index",
                selectedIconPath: '/images/test/nav_bottom_icon_scan@2x.png',
                iconPath: '/images/test/nav_bottom_icon_scan@2x.png',
                text: '',
            },
            {
                id: 3,
                pagePath: "page/home3/index",
                selectedIconPath: '/images/test/nav_bottom_icon_my_selected@2x.png',
                iconPath: '/images/test/nav_bottom_icon_my_default@2x.png',
                text: '我的',
            }
        ],
        soon: null,
        overdue: null,
        taskList: [],
        totalPages: 1, //总页数
        rp: 10, //每页多少条数据
        page: 1, //第几页
        // 轮播通知
        text: "即将到期，请尽快完成",
        animation: null,
        timer: null,
        duration: 0,
        textWidth: 0,
        wrapWidth: 0
    },
    tabbarChange(e) {
        var index = parseInt(e.detail);
        this.setData({
            blockid: index
        })
    },
    // 打卡图标跳转
    clockin: function() {
        wx.navigateTo({
            url: '/pagesCollect/pages/punchIn/punchIn',
        })
    },
    // 轮播图
    onShareAppMessage() {
        return {
            title: 'swiper',
            path: 'page/component/pages/swiper/swiper'
        }
    },
    // 4个图标跳转
    jumpTo(event) {
        // console.log(event)
        let id = event.currentTarget.id
        if (id == 1) {
            wx.navigateTo({
                url: '/pagesCollect/pages/taskManager/taskManager',
            })
        } else if (id == 2) {
            wx.navigateTo({
                url: '/pagesCollect/pages/marketManager/marketManager',
            })
        } else if (id == 3) {
            wx.navigateTo({
                url: '/pagesCollect/pages/samplingManager/samplingManager',
            })
        } else {
            wx.navigateTo({
                url: '/pagesCollect/pages/staticAnalysis/staticAnalysis',
            })
        }
    },
    // 刷新首页列表
    refreshList() {
        this.setData({
            taskList: [], //重置列表
            totalPages: 1, //总页数
            rp: 10, //每页多少条数据
            page: 1 //第几页

        })
        this.getTheList()
    },
    // 获取任务
    getTheList() {
        let that = this
        wx.showLoading({
            title: '加载中...',
        })
        let postData = {
                userId: that.data.userId
            }
            // 获取任务列表
        apiTask.homePageList(postData).then(res => {
            console.log(res, '获取首页任务列表')
            wx.hideLoading()
                // const total = res.data.records;
                // 计算总页数
                // const totalPages = res.data.total;
            that.setData({
                // totalPages: totalPages,
                taskList: res.data
            })
        })


    },
    // 查看更多任务
    more: function() {
        wx.navigateTo({
            url: '/pagesCollect/pages/taskManager/taskManager',
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let userId = wx.getStorageSync('userId')
        this.setData({
            userId: userId
        })
        let postId = {
            userId: userId

        }
        apiTask.getSoonList(postId).then(res => {
            console.log(res, '即将到期')
            if (res.data.missionName) {
                this.setData({
                    soon: res.data,
                    text: res.data.missionName + "即将到期，请尽快完成"
                })
            } else {
                this.setData({
                    soon: res.data,
                    text: "暂无即将到期任务"
                })
            }

        })
        this.getTheList()
            // apiTask.getSoonList().then(res => {
            //     console.log(res, '获取即将过去任务')
            // })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        this.initAnimation(this.data.text)
            // this.getTheList()
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {
        this.destroyTimer()
        this.setData({
            timer: null
        })
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {
        this.destroyTimer()
        this.setData({
            timer: null
        })
    },

    destroyTimer() {
        if (this.data.timer) {
            clearTimeout(this.data.timer);
        }
    },

    /**
     * 开启公告字幕滚动动画
     * @param  {String} text 公告内容
     * @return {[type]} 
     */
    initAnimation(text) {
        let that = this
        this.data.duration = 15000
        this.data.animation = wx.createAnimation({
            duration: this.data.duration,
            timingFunction: 'linear'
        })
        let query = wx.createSelectorQuery()
        query.select('.content-box').boundingClientRect()
        query.select('#text').boundingClientRect()
        query.exec((rect) => {
            console.log(rect[1].width)
            that.setData({
                wrapWidth: rect[0].width,
                // textWidth: rect[1].width
                textWidth: 343

            }, () => {
                this.startAnimation()
            })
        })
    },
    // 定时器动画
    startAnimation() {
        //reset
        // this.data.animation.option.transition.duration = 0
        const resetAnimation = this.data.animation.translateX(this.data.wrapWidth).step({ duration: 0 })
        this.setData({
                animationData: resetAnimation.export()
            })
            // this.data.animation.option.transition.duration = this.data.duration
        const animationData = this.data.animation.translateX(-this.data.textWidth).step({ duration: this.data.duration })
        setTimeout(() => {
            this.setData({
                animationData: animationData.export()
            })
        }, 100)
        const timer = setTimeout(() => {
            this.startAnimation()
        }, this.data.duration)
        this.setData({
            timer
        })
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
        //  1 判断还有没有下一页数据
        // if (this.data.page >= this.data.totalPages) {
        //    wx.showToast({ title: '已经加载完列表' });

        // } else {
        //     this.data.page++;
        //     this.getTheList();
        // }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})