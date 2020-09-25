const util = require('../../../utils/util.js')

import { SampleManagerModel } from '../../../models/inspection/sampleManager'
let apiSample = new SampleManagerModel();
// pagesInspection/pages/sampleManager/sampleManager.js
Page({
    /**
     * Page initial data
     */
    data: {
        sampleList: [],
        inspectedPassList: null,
        inspectedFailedList: null,
        option: 0,
        resultOption: null, //不合格为1，合格为2
        resultFilter: '检验结果',
        resultDefault: '请选择',
        resultStatus: [{
                id: 1,
                option: '不合格'
            },
            {
                id: 2,
                option: '合格'
            }
        ],
        noSample: '当前暂无样品~',
        from: null, //起始时间 (自定义)
        to: null, //结束时间 (自定义)
        startDate: null, //周期时间开始
        endDate: null, //周期时间结束
        range: '近一个月',
        totalPages: 1, //总页数
        rp: 10, //每页多少条数据
        page: 1 //第几页
    },


    // 头部切换
    switch (e) {
        this.setData({
            option: e.detail.change,
            sampleList: [], //重置列表
            totalPages: 1, //总页数
            rp: 10, //每页多少条数据
            page: 1 //第几页

        })
        this.getTheList()
    },
    //从录入检测返回
    comeBack() {
        this.setData({
            option: 1,
            sampleList: [], //重置列表
            totalPages: 1, //总页数
            rp: 10, //每页多少条数据
            page: 1 //第几页
        })
        console.log(this.data.sampleList, '返回重置列表')
        this.getTheList()
        console.log(this.data.sampleList, '重返样品管理获取列表')
    },

    // 时间范围切换
    changeRange(e) {
        this.setData({
            range: e.detail.change,
            sampleList: [], //重置列表
            totalPages: 1, //总页数
            rp: 10, //每页多少条数据
            page: 1 //第几页
        })
        console.log(this.data.range, '时间范围改变')
        this.getTheList()
    },
    // 结果类型切换
    changeStatus(e) {
        this.setData({
            // status: e.detail.change,
            resultDefault: e.detail.change,
            resultOption: e.detail.chooseId,
            sampleList: [], //重置列表
            totalPages: 1, //总页数
            rp: 10, //每页多少条数据
            page: 1 //第几页
        })
        console.log(e.detail.change, '选择了')
        this.getTheList()
    },
    // 获取自定义开始时间赋值给from
    customStart(e) {
        // console.log(e.detail.change)
        this.setData({
            from: e.detail.change,
            sampleList: [], //重置列表
            totalPages: 1, //总页数
            rp: 10, //每页多少条数据
            page: 1 //第几页
        })
        this.getTheList()

    },
    // 获取自定义结束时间赋值给to
    customEnd(e) {
        // console.log(e.detail.change)
        this.setData({
            to: e.detail.change,
            sampleList: [], //重置列表
            totalPages: 1, //总页数
            rp: 10, //每页多少条数据
            page: 1 //第几页
        })
        this.getTheList()

    },

    // 根据条件获取列表
    getTheList() {
        let that = this
        let option = that.data.option
        let option1 = that.data.range //时间范围
        let option2 = that.data.resultDefault //检验结果
        let myDate = new Date();
        let currentTime = util.formatTime(new Date());
        let today = currentTime.split(' ')[0].split('/').join('-')
        let period = null
        wx.showLoading({
                title: '加载中...',
            })
            // 1.未检验
        if (option == 0) {
            let condition = {
                rp: that.data.rp,
                page: that.data.page,
                status: 'COMMIT',
                isInspection: false
            }
            apiSample.getSampleList(condition).then(res => {
                console.log(res)
                wx.hideLoading()
                    // 获取总条数
                const total = res.data.records;
                // 计算总页数
                const totalPages = res.data.total;
                console.log(totalPages)
                that.setData({
                    totalPages: totalPages,
                    sampleList: [...that.data.sampleList, ...res.data.rows]
                })
                console.log(totalPages, '未检验列表总页数')
                console.log(that.data.sampleList, '未检验列表')
            })
        }
        // 2.已检验
        else {
            // 自定义
            if (option1 == '自定义') {
                // 自定义-空
                if (option2 == '请选择') {
                    let custom = {
                        rp: that.data.rp,
                        page: that.data.page,
                        status: 'COMMIT',
                        isInspection: true,
                        startDate: that.data.from,
                        endDate: that.data.to + ' 23:59:59'
                    }
                    apiSample.getTimeFiltertedList(custom).then(res => {
                        wx.hideLoading()

                        console.log(res, '自定义时间内所有已检验样本')
                            // 获取总条数
                        const total = res.data.records;
                        // 计算总页数
                        const totalPages = res.data.total;
                        // console.log(totalPages)
                        that.setData({
                            totalPages: totalPages,
                            sampleList: [...that.data.sampleList, ...res.data.rows]

                        })
                        console.log(that.data.totalPages, '总页数')

                        console.log(that.data.sampleList, '已检验列表')
                    })
                }
                // 自定义-合格
                else if (option2 == '合格') {
                    let custom = {
                        rp: that.data.rp,
                        page: that.data.page,
                        status: 'COMMIT',
                        isInspection: true,
                        isQualified: true,
                        startDate: that.data.from,
                        endDate: that.data.to + ' 23:59:59'
                    }
                    apiSample.getDoubleFilteredList(custom).then(res => {
                        wx.hideLoading()

                        console.log(res, '自定义时间内的已检验合格样本')
                            // 获取总条数
                        const total = res.data.records;
                        // 计算总页数
                        const totalPages = res.data.total;
                        that.setData({
                            sampleList: [...that.data.sampleList, ...res.data.rows],
                            totalPages: totalPages
                        })
                    })
                }
                // 自定义-不合格
                else {
                    let custom = {
                        rp: that.data.rp,
                        page: that.data.page,
                        status: 'COMMIT',
                        isInspection: true,
                        isQualified: false,
                        startDate: that.data.from,
                        endDate: that.data.to + ' 23:59:59'
                    }
                    apiSample.getDoubleFilteredList(custom).then(res => {
                        wx.hideLoading()

                        console.log(res, '自定义时间内的已检验不合格样本')
                            // 获取总条数
                        const total = res.data.records;
                        // 计算总页数
                        const totalPages = res.data.total;
                        that.setData({
                            sampleList: [...that.data.sampleList, ...res.data.rows],
                            totalPages: totalPages
                        })
                    })
                }
            }
            // 非自定义周期
            else {
                // 周期-空
                if (option2 == '请选择') {
                    switch (option1) {
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
                    let filterData = {
                        rp: that.data.rp,
                        page: that.data.page,
                        status: 'COMMIT',
                        isInspection: true,
                        startDate: result,
                        endDate: today + ' 23:59:59'
                    }
                    console.log(filterData, '周期-空')
                    apiSample.getTimeFiltertedList(filterData).then(res => {
                        wx.hideLoading()

                        console.log(res, option1 + '内检验的所有样本')
                            // 获取总条数
                        const total = res.data.records;
                        // 计算总页数
                        const totalPages = res.data.total;
                        that.setData({
                            sampleList: [...that.data.sampleList, ...res.data.rows],
                            totalPages: totalPages
                        })
                        console.log(totalPages)
                    })
                }
                // 周期-合格
                else if (option2 == '合格') {
                    switch (option1) {
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
                    let filterData = {
                        rp: that.data.rp,
                        page: that.data.page,
                        status: 'COMMIT',
                        isInspection: true,
                        isQualified: true,
                        startDate: result,
                        endDate: today + ' 23:59:59'
                    }
                    apiSample.getDoubleFilteredList(filterData).then(res => {
                        wx.hideLoading()

                        console.log(res, option1 + '内检验的所有合格样品')
                            // 获取总条数
                        const total = res.data.records;
                        // 计算总页数
                        const totalPages = res.data.total;
                        that.setData({
                            sampleList: [...that.data.sampleList, ...res.data.rows],
                            totalPages: totalPages
                        })
                    })
                }
                // 周期-不合格
                else {
                    switch (option1) {
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
                        // console.log(that.data.dateStart)
                    let filterData = {
                        rp: that.data.rp,
                        page: that.data.page,
                        status: 'COMMIT',
                        isInspection: true,
                        isQualified: false,
                        startDate: result,
                        endDate: today + ' 23:59:59'
                    }
                    apiSample.getDoubleFilteredList(filterData).then(res => {
                        wx.hideLoading()

                        console.log(res, option1 + '内检验的所有不合格样品')
                            // 获取总条数
                        const total = res.data.records;
                        // 计算总页数
                        const totalPages = res.data.total;
                        that.setData({
                            sampleList: [...that.data.sampleList, ...res.data.rows],
                            totalPages: totalPages
                        })
                    })
                }
            }
        }
    },
    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function(options) {
        // 获取当前时间一个月内的区间
        let myDate = new Date();
        let currentTime = util.formatTime(new Date());
        let today = currentTime.split(' ')[0].split('/').join('-')
        let pre = new Date(myDate - 1000 * 60 * 60 * 24 * 30);
        let lastY = pre.getFullYear();
        let lastM = pre.getMonth() + 1;
        let lastD = pre.getDate();
        let result = lastY + "-" + (lastM < 10 ? "0" + lastM : lastM) + "-" + (lastD < 10 ? "0" + lastD : lastD)
        this.setData({
            from: result,
            to: today
        })
        console.log(today, result)
        if (options.success) {
            this.setData({
                option: parseInt(options.success)
            })
        }
        this.getTheList()

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
            url: '/pagesInspection/pages/index/index'
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
            // this.getLists();
            this.getTheList();
        }
    },

    /**
     * Called when user click on the top right corner to share
     */
    onShareAppMessage: function() {

    }
})