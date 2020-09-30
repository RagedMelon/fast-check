const util = require('../../../utils/util.js')
import { SampleModel } from '../../../models/collect/samlpe'
let apiSample = new SampleModel();
// pagesCollect/pages/samplingManager/samplingManager.js
Page({

    /**
     * Page initial data
     */
    data: {
        blank: null,
        blank2: null,
        complete: 0, //未完成0-已完成1 切换
        status: 1, //待关联1-待填报2
        sampleList: [],
        dateStart: null,
        dateEnd: null,
        range: '近一个月',
        from: null,
        to: null,
        totalPages: 1, //总页数
        rp: 10, //每页多少条数据
        page: 1, //第几页
        rp2: 10,
        page2: 1,
        rp3: 10,
        page3: 1,
    },

    // 点击空白隐藏下拉
    showMask() {
        this.setData({
            blank: true
        })
    },
    showMask2() {
        this.setData({
            blank2: true
        })
    },
    noDisplay() {
        console.log('点击蒙层')
        this.setData({
            blank: false,
            blank2: false
        })
    },
    /**
     * Lifecycle function--Called when page load
     */
    // 完成-未完成切换
    switch (e) {
        let that = this
        this.setData({
            complete: e.detail.change,
            totalPages: 1, //总页数
            rp: 10, //每页多少条数据
            page: 1, //第几页
            sampleList: [], //重置列表
        })
        this.getTheList()

    },
    //从录入检测返回
    comeBack() {
        this.setData({
            complete: 1,
            sampleList: [], //重置列表
            totalPages: 1, //总页数
            rp: 10, //每页多少条数据
            page: 1 //第几页

        })
        this.getTheList()
    },
    // 未完成-采样状态切换
    getId(e) {
        let that = this
        this.setData({
            blank: false,
            status: e.detail.current,
            totalPages: 1, //总页数
            rp: 10, //每页多少条数据
            page: 1, //第几页
            sampleList: [], //重置列表
        })
        this.getTheList()

    },
    // 已完成-时间切换
    changeRange(e) {
        this.setData({
            blank2: false,
            range: e.detail.change,
            totalPages: 1, //总页数
            rp: 10, //每页多少条数据
            page: 1, //第几页
            sampleList: [], //重置列表
        })
        this.getTheList()
    },
    // 获取自定义开始时间
    customStart(e) {
        // console.log(e.detail.change)
        this.setData({
            from: e.detail.change,
            totalPages: 1, //总页数
            rp: 10, //每页多少条数据
            page: 1, //第几页
            sampleList: [], //重置列表
        })
        this.getTheList()
    },
    // 获取自定义结束时间
    customEnd(e) {
        // console.log(e.detail.change)
        this.setData({
            to: e.detail.change,
            totalPages: 1, //总页数
            rp: 10, //每页多少条数据
            page: 1, //第几页
            sampleList: [], //重置列表
        })
        this.getTheList()
    },

    // 获取列表
    getTheList() {
        let that = this
        wx.showLoading({
            title: '加载中...',
        })
        let option = that.data.complete //未完成-完成
        let status = that.data.status //待关联-待填报
            // 未完成
        if (option == 0) {
            // 待关联
            if (status == 1) {
                let condtion = {
                    rp: that.data.rp,
                    page: that.data.page,
                    status: 'TORELATED'
                }
                console.log(condtion, '采样管理（未完成-待关联），传入的参数')
                apiSample.getSampleList(condtion).then(res => {
                    wx.hideLoading()
                    console.log(res, '未完成-待关联')
                        // 获取总条数
                    const total = res.data.records;
                    // 计算总页数
                    const totalPages = res.data.total;
                    this.setData({
                        totalPages: totalPages,
                        sampleList: [...that.data.sampleList, ...res.data.rows]
                    })
                    console.log(that.data.sampleList)
                })
            }
            // 待填报
            else {
                let condtion = {
                    rp: that.data.rp,
                    page: that.data.page,
                    status: 'TOFILL'
                }
                console.log(condtion, '采样管理（未完成-待填报），传入的参数')
                apiSample.getSampleList(condtion).then(res => {
                    wx.hideLoading()
                    console.log(res, '未完成-待填报')
                        // 获取总条数
                    const total = res.data.records;
                    // 计算总页数
                    const totalPages = res.data.total;
                    this.setData({
                        totalPages: totalPages,
                        sampleList: [...that.data.sampleList, ...res.data.rows]
                    })
                })
            }
        }
        // 已完成
        else {
            let range = that.data.range
                // 获取时间区间
            let myDate = new Date();
            let currentTime = util.formatTime(new Date());
            let today = currentTime.split(' ')[0].split('/').join('-')
            let period = null
            console.log(range, '获取时间筛选成功')
            if (range != '自定义') {
                switch (range) {
                    case '近一个月':
                        period = new Date(myDate - 1000 * 60 * 60 * 24 * 30);
                        break
                    case '近三个月':
                        period = new Date(myDate - 1000 * 60 * 60 * 24 * 90);
                        break
                    case '近一年':
                        period = new Date(myDate - 1000 * 60 * 60 * 24 * 365);
                        break
                }
                let lastY = period.getFullYear();
                let lastM = period.getMonth() + 1;
                let lastD = period.getDate();
                let result = lastY + "-" + (lastM < 10 ? "0" + lastM : lastM) + "-" + (lastD < 10 ? "0" + lastD : lastD)
                that.setData({
                        dateStart: result,
                        dateEnd: today
                    })
                    // console.log('时间范围非自定义')
                let filterData = {
                    rp: that.data.rp,
                    page: that.data.page,
                    startDate: result,
                    endDate: today + ' 23:59:59'
                }
                console.log(filterData)
                apiSample.getFilteredSampleList(filterData).then(res => {
                    console.log(res, range + '已完成的采样')
                    wx.hideLoading()
                        // 获取总条数
                    const total = res.data.records;
                    // 计算总页数
                    const totalPages = res.data.total;
                    this.setData({
                        totalPages: totalPages,
                        sampleList: [...that.data.sampleList, ...res.data.rows]
                    })
                })
            }
            // 自定义时间
            else {
                let custom = {
                    rp: that.data.rp,
                    page: that.data.page,
                    startDate: that.data.from,
                    endDate: that.data.to + ' 23:59:59'
                }
                apiSample.getFilteredSampleList(custom).then(res => {
                    console.log(res, '自定义时间的采样')
                    wx.hideLoading()
                        // 获取总条数
                    const total = res.data.records;
                    // 计算总页数
                    const totalPages = res.data.total;
                    this.setData({
                        totalPages: totalPages,
                        sampleList: [...that.data.sampleList, ...res.data.rows]
                    })
                })
            }
        }
    },
    onLoad: function(options) {
        if (options.success) {
            this.setData({
                complete: parseInt(options.success)
            })
        }
        this.getTheList()
        let myDate = new Date();
        let currentTime = util.formatTime(new Date());
        let today = currentTime.split(' ')[0].split('/').join('-')
        let pre = new Date(myDate - 1000 * 60 * 60 * 24 * 30);
        let lastY = pre.getFullYear();
        let lastM = pre.getMonth() + 1;
        let lastD = pre.getDate();
        let result = lastY + "-" + (lastM < 10 ? "0" + lastM : lastM) + "-" + (lastD < 10 ? "0" + lastD : lastD)
            // console.log(pre)
        this.setData({
            from: result,
            to: today
        })

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
        wx.reLaunch({
            url: '/pagesCollect/pages/index/index'
        })
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
            this.getTheList()

        }
    },

    /**
     * Called when user click on the top right corner to share
     */
    onShareAppMessage: function() {

    }
})