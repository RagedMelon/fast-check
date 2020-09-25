// pagesCollect/pages/taskManager/taskManager.js
const util = require('../../../utils/util.js')

import { TaskModel } from '../../../models/collect/task'
let apiTask = new TaskModel();
Page({

    /**
     * Page initial data
     */
    data: {
        userId: null,
        completeList: null,
        incompleteList: [],
        overdue: null,
        notdue: null,
        soon: null,
        dateStart: null,
        dateEnd: null,
        oneMonth: null,
        oneSeason: null,
        from: null,
        to: null,
        content: '暂无未完成的任务~',
        option: 0,
        range: '近一个月',
        status: null,
        incomplete: 1,
        taskFilter: '任务状态',
        taskDefault: '请选择状态',
        taskStatus: [{
                id: 1,
                option: '未超期'
            },
            {
                id: 2,
                option: '已超期'
            }
        ],
        taskList: [],
        totalPages: 1, //总页数
        rp: 10, //每页多少条数据
        page: 1 //第几页
    },
    // 获取自定义开始时间
    customStart(e) {
        // console.log(e.detail.change)
        this.setData({
            from: e.detail.change,
            taskList: [], //重置列表
            totalPages: 1, //总页数
            rp: 10, //每页多少条数据
            page: 1 //第几页
        })
        this.getTheList()
    },
    // 获取自定义结束时间
    customEnd(e) {
        // console.log(e.detail.change)
        this.setData({
            to: e.detail.change,
            taskList: [], //重置列表
            totalPages: 1, //总页数
            rp: 10, //每页多少条数据
            page: 1 //第几页
        })
        this.getTheList()
    },
    switch (e) {
        this.setData({
            option: e.detail.change,
            taskList: [], //重置列表
            totalPages: 1, //总页数
            rp: 10, //每页多少条数据
            page: 1 //第几页
        })
        this.getTheList()

    },
    // 时间范围切换
    changeRange(e) {
        this.setData({
            range: e.detail.change,
            taskList: [], //重置列表
            totalPages: 1, //总页数
            rp: 10, //每页多少条数据
            page: 1 //第几页
        })
        this.getTheList()




    },
    changeStatus(e) {
        this.setData({
            status: e.detail.change,
            taskList: [], //重置列表
            totalPages: 1, //总页数
            rp: 10, //每页多少条数据
            page: 1 //第几页
        })
        this.getTheList()
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

    getTheList() {
        let that = this
        let option = that.data.option
        let option1 = that.data.range //时间范围
        let option2 = that.data.status //任务状态
            // 获取时间区间
        let myDate = new Date();
        let currentTime = util.formatTime(new Date());
        let today = currentTime.split(' ')[0].split('/').join('-')
        let period = null
        wx.showLoading({
                title: '加载中...',
            })
            // 未完成
        if (option == 0) {
            // console.log(notComplete,'请求参数')
            let notComplete = {
                rp: that.data.rp,
                page: that.data.page,
                isComplete: false,
                userId: that.data.userId
            }
            console.log(notComplete, '请求参数')

            // 获取未完成
            apiTask.getTaskList(notComplete).then(res => {
                wx.hideLoading()
                console.log(res, '获取该采样人的未完成的任务')
                    // 获取总条数
                const total = res.data.records;
                // 计算总页数
                const totalPages = res.data.total;
                that.setData({
                    totalPages: totalPages,
                    taskList: [...that.data.taskList, ...res.data.rows]
                })
            })

        }
        // 已完成
        else {
            console.log('已选已完成')
                // 已完成-自定义
            if (option1 == '自定义') {
                // 已完成-自定义-全部
                if (option2 == null) {
                    let custom = {
                        rp: that.data.rp,
                        page: that.data.page,
                        isComplete: true,
                        startDate: that.data.from,
                        endDate: that.data.to + ' 23:59:59',
                        userId: that.data.userId
                    }
                    apiTask.getTimeList(custom).then(res => {
                        wx.hideLoading()
                        console.log(res, '已完成-自定义-全部的任务')
                            // 获取总条数
                        const total = res.data.records;
                        // 计算总页数
                        const totalPages = res.data.total;
                        that.setData({
                            totalPages: totalPages,
                            taskList: [...that.data.taskList, ...res.data.rows]
                        })
                    })
                }
                // 已完成-自定义-已超期
                else if (option2 == '已超期') {
                    let customDue = {
                        rp: that.data.rp,
                        page: that.data.page,
                        isComplete: true,
                        isOverdue: true,
                        startDate: that.data.from,
                        endDate: that.data.to + ' 23:59:59',
                        userId: that.data.userId
                    }
                    apiTask.getFilteredList(customDue).then(res => {
                        console.log(res, '已完成-自定义-已超期')
                        wx.hideLoading()
                            // 获取总条数
                        const total = res.data.records;
                        // 计算总页数
                        const totalPages = res.data.total;
                        that.setData({
                            totalPages: totalPages,
                            taskList: [...that.data.taskList, ...res.data.rows]
                        })
                    })
                }
                // 已完成-自定义-未超期
                else {
                    let notDue = {
                        rp: that.data.rp,
                        page: that.data.page,
                        isComplete: true,
                        isOverdue: false,
                        startDate: that.data.from,
                        endDate: that.data.to + ' 23:59:59',
                        userId: that.data.userId

                    }
                    apiTask.getFilteredList(notDue).then(res => {
                        console.log(res, '已完成-自定义-未超期')
                        wx.hideLoading()
                            // 获取总条数
                        const total = res.data.records;
                        // 计算总页数
                        const totalPages = res.data.total;
                        that.setData({
                            totalPages: totalPages,
                            taskList: [...that.data.taskList, ...res.data.rows]
                        })
                    })
                }
            }
            // 已完成-周期
            else {
                // 已完成-周期-全部
                if (option2 == null) {
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
                        // console.log('时间范围非自定义，任务状态空')
                    let filterData = {
                        rp: that.data.rp,
                        page: that.data.page,
                        isComplete: true,
                        startDate: result,
                        endDate: today + ' 23:59:59',
                        userId: that.data.userId
                    }
                    apiTask.getTimeList(filterData).then(res => {
                        console.log(res, option1 + '的任务')
                        wx.hideLoading()
                            // 获取总条数
                        const total = res.data.records;
                        // 计算总页数
                        const totalPages = res.data.total;
                        that.setData({
                            totalPages: totalPages,
                            taskList: [...that.data.taskList, ...res.data.rows]
                        })
                    })
                }
                // 已完成-周期-已超期
                else if (option2 == '已超期') {
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
                        isComplete: true,
                        isOverdue: true,
                        startDate: result,
                        endDate: today + ' 23:59:59',
                        userId: that.data.userId

                    }
                    apiTask.getFilteredList(filterData).then(res => {
                        console.log(res, option1 + '已超期的任务')
                        wx.hideLoading()
                            // 获取总条数
                        const total = res.data.records;
                        // 计算总页数
                        const totalPages = res.data.total;
                        that.setData({
                            totalPages: totalPages,
                            taskList: [...that.data.taskList, ...res.data.rows]
                        })
                    })
                }
                // 已完成-周期-未超期
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
                        isComplete: true,
                        isOverdue: false,
                        startDate: result,
                        endDate: today + ' 23:59:59',
                        userId: that.data.userId

                    }
                    apiTask.getFilteredList(filterData).then(res => {
                        console.log(res, option1 + '未超期的任务')
                        wx.hideLoading()
                            // 获取总条数
                        const total = res.data.records;
                        // 计算总页数
                        const totalPages = res.data.total;
                        that.setData({
                            totalPages: totalPages,
                            taskList: [...that.data.taskList, ...res.data.rows]
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
        let userId = wx.getStorageSync('userId')
        console.log(userId, '用户id')
        this.setData({
            userId: userId
        })
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
        console.log(this.data.range, this.data.status)

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
            this.getTheList();
        }
    },

    /**
     * Called when user click on the top right corner to share
     */
    onShareAppMessage: function() {

    }
})