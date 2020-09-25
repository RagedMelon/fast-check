const util = require('../../../utils/util.js')

import { accountManagerModel } from '../../../models/inspection/accountManager'
let apiAccount = new accountManagerModel();
// pagesInspection/pages/accountManager/accountManager.js
Page({

    /**
     * Page initial data
     */
    data: {
        option: 0,
        // 合格筛选框
        result: [' 合格', '不合格'],
        dateStart: null,
        dateEnd: null,
        range: '近一个月',
        content: null,
        accountList: [],
        from: null, //开始时间
        to: null, //截止时间
        // 不合格筛选框
        resultOption: null, //不合格为1，合格为2
        statusTag: '处理状态',
        statusDefault: '全部',
        status: [{
                id: 0,
                option: '全部'
            },
            {
                id: 1,
                option: '已处理'
            },
            {
                id: 2,
                option: '未处理'
            }
        ],
        failedRange: '近一个月',
        failedStatus: '全部',
        failedFrom: null,
        failedTo: null,
        handledList: null,
        notHandledList: null,
        failedDateStart: null,
        failedDateEnd: null,
        totalPages: 1, //总页数
        rp: 10, //每页多少条数据
        page: 1 //第几页

    },
    // 台账管理返回
    handledComeBack() {
        this.setData({
            option: 1,
            sampleList: [], //重置列表
            totalPages: 1, //总页数
            rp: 10, //每页多少条数据
            page: 1 //第几页

        })
        this.getTheList()
    },
    // 获取列表
    getTheList() {
        let that = this
        let type = that.data.option //合格不合格指示器
        let option = that.data.range //时间范围
        let myDate = new Date();
        let currentTime = util.formatTime(new Date());
        let today = currentTime.split(' ')[0].split('/').join('-')
        let period = null
        let keyWord = that.data.content
        wx.showLoading({
            title: '加载中...',
        })
        if (type == 0) {
            // 1.合格
            // 合格-无搜索
            if (this.data.content == null || this.data.content == '') {
                // 合格-无搜索-周期
                if (option != '自定义') {
                    switch (option) {
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
                    this.setData({
                        dateStart: result,
                        dateEnd: today

                    })
                    let dateFilter = {
                        rp: that.data.rp,
                        page: that.data.page,
                        startDate: result,
                        endDate: today + ' 23:59:59'
                    }
                    apiAccount.getPassedList(dateFilter).then(res => {
                        wx.hideLoading()
                            // 获取总条数
                        const total = res.data.records;
                        // 计算总页数
                        const totalPages = res.data.total;
                        console.log(res, option + '内合格列表')
                        that.setData({
                            totalPages: totalPages,
                            accountList: [...that.data.accountList, ...res.data.rows]
                        })
                        console.log(that.data.accountList, '合格-无搜索-周期')
                    })
                }
                // 合格-无搜索-自定义
                else {
                    let custom = {
                        rp: that.data.rp,
                        page: that.data.page,
                        startDate: that.data.from,
                        endDate: that.data.to + ' 23:59:59'
                    }
                    apiAccount.getPassedList(custom).then(res => {
                        console.log(res, that.data.from + '至' + that.data.to + '的合格列表')
                        wx.hideLoading()
                            // 获取总条数
                        const total = res.data.records;
                        // 计算总页数
                        const totalPages = res.data.total;
                        that.setData({
                            totalPages: totalPages,
                            accountList: [...that.data.accountList, ...res.data.rows]
                        })
                    })
                }
            }
            // 合格-有搜索
            else {
                // 合格-有搜索-周期
                if (option != '自定义') {
                    switch (option) {
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
                    this.setData({
                        dateStart: result,
                        dateEnd: today,
                    })
                    let dateFilter = {
                        rp: that.data.rp,
                        page: that.data.page,
                        startDate: result,
                        endDate: today + ' 23:59:59',
                        key: keyWord

                    }
                    apiAccount.getKeyPassedList(dateFilter).then(res => {
                        console.log(res, option + '内合格列表')
                        wx.hideLoading()
                            // 获取总条数
                        const total = res.data.records;
                        // 计算总页数
                        const totalPages = res.data.total;
                        that.setData({
                            totalPages: totalPages,
                            accountList: [...that.data.accountList, ...res.data.rows]
                        })
                    })
                }
                // 合格-有搜索-自定义        
                else {
                    let custom = {
                        rp: that.data.rp,
                        page: that.data.page,
                        startDate: that.data.from,
                        endDate: that.data.to + ' 23:59:59',
                        key: keyWord

                    }
                    apiAccount.getKeyPassedList(custom).then(res => {
                        console.log(res, that.data.from + '至' + that.data.to + '的合格列表')
                        wx.hideLoading()
                            // 获取总条数
                        const total = res.data.records;
                        // 计算总页数
                        const totalPages = res.data.total;
                        that.setData({
                            totalPages: totalPages,
                            accountList: [...that.data.accountList, ...res.data.rows]
                        })
                    })
                }

            }
        }
        // 2.不合格
        else {
            let that = this
            let option1 = that.data.failedRange //时间范围
            let option2 = that.data.failedStatus //任务状态
                // 获取时间区间
            let myDate = new Date();
            let currentTime = util.formatTime(new Date());
            let today = currentTime.split(' ')[0].split('/').join('-')
            let period = null
                // 不合格-无搜索内容
            if (this.data.content == '' || this.data.content == null) {
                // 不合格-无搜索内容-自定义时间
                if (option1 == '自定义') {
                    // 不合格-无搜索内容-自定义时间-全部
                    if (option2 == '全部') {
                        let custom = {
                            rp: that.data.rp,
                            page: that.data.page,
                            startDate: that.data.from,
                            endDate: that.data.to + ' 23:59:59'
                        }
                        apiAccount.getFailedNoSearchCustomList(custom).then(res => {
                            wx.hideLoading()
                                // 获取总条数
                            const total = res.data.records;
                            // 计算总页数
                            const totalPages = res.data.total;
                            console.log(res, option + '内全部列表')
                            that.setData({
                                totalPages: totalPages,
                                accountList: [...that.data.accountList, ...res.data.rows]
                            })
                        })
                    }
                    // 不合格-无搜索内容-自定义时间-已处理
                    else if (option2 == '已处理') {
                        let customDue = {
                            rp: that.data.rp,
                            page: that.data.page,
                            startDate: that.data.from,
                            endDate: that.data.to + ' 23:59:59',
                            isHandle: true
                        }
                        apiAccount.getFailedStatusList(customDue).then(res => {
                            console.log(res, '自定义已处理')
                            wx.hideLoading()
                                // 获取总条数
                            const total = res.data.records;
                            // 计算总页数
                            const totalPages = res.data.total;
                            console.log(res, option + '内全部列表')
                            that.setData({
                                totalPages: totalPages,
                                accountList: [...that.data.accountList, ...res.data.rows]
                            })
                        })
                    }
                    // 不合格-无搜索内容-自定义时间-未处理
                    else {
                        let customDue = {
                            rp: that.data.rp,
                            page: that.data.page,
                            startDate: that.data.from,
                            endDate: that.data.to + ' 23:59:59',
                            isHandle: false
                        }
                        apiAccount.getFailedStatusList(customDue).then(res => {
                            console.log(res, '自定义未处理')
                            wx.hideLoading()
                                // 获取总条数
                            const total = res.data.records;
                            // 计算总页数
                            const totalPages = res.data.total;
                            console.log(res, option + '内全部列表')
                            that.setData({
                                totalPages: totalPages,
                                accountList: [...that.data.accountList, ...res.data.rows]
                            })
                        })
                    }
                }
                // 不合格-无搜索内容-周期
                else {
                    // 不合格-无搜索内容-周期-全部
                    if (option2 == '全部') {
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
                            failedDateStart: result,
                            failedDateEnd: today
                        })
                        let custom = {
                            rp: that.data.rp,
                            page: that.data.page,
                            startDate: result,
                            endDate: today + ' 23:59:59',
                        }
                        console.log('获取全部不合格列表传参', custom)
                        apiAccount.getFailedNoSearchCustomList(custom).then(res => {
                            // console.log(res, result + '至' + today + '的不合格列表')
                            wx.hideLoading()
                                // 获取总条数
                            const total = res.data.records;
                            // 计算总页数
                            const totalPages = res.data.total;
                            console.log(res, option + '内全部不合格列表')
                            that.setData({
                                totalPages: totalPages,
                                accountList: [...that.data.accountList, ...res.data.rows]
                            })
                        })
                    }
                    // 不合格-无搜索内容-周期-已处理
                    else if (option2 == '已处理') {
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
                                failedDateStart: result,
                                failedDateEnd: today
                            })
                            // console.log(that.data.dateStart)
                        let custom2 = {
                            rp: that.data.rp,
                            page: that.data.page,
                            startDate: result,
                            endDate: today + ' 23:59:59',
                            isHandle: true
                        }
                        apiAccount.getFailedStatusList(custom2).then(res => {
                            console.log(res, that.data.from + '至' + that.data.to + '的已处理列表')
                            wx.hideLoading()
                                // 获取总条数
                            const total = res.data.records;
                            // 计算总页数
                            const totalPages = res.data.total;
                            console.log(res, option + '内全部列表')
                            that.setData({
                                totalPages: totalPages,
                                accountList: [...that.data.accountList, ...res.data.rows]
                            })
                        })
                    }
                    // 不合格-无搜索内容-周期-未处理
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
                                failedDateStart: result,
                                failedDateEnd: today
                            })
                            // console.log(that.data.dateStart)
                        let custom = {
                            rp: that.data.rp,
                            page: that.data.page,
                            startDate: result,
                            endDate: today + ' 23:59:59',
                            isHandle: false
                        }
                        console.log('获取近一个月的未处理列表传入的参数', custom)
                        apiAccount.getFailedStatusList(custom).then(res => {
                            console.log(res, result + '至' + today + '的未处理列表')
                            wx.hideLoading()
                                // 获取总条数
                            const total = res.data.records;
                            // 计算总页数
                            const totalPages = res.data.total;
                            console.log(res, option + '内全部列表')
                            that.setData({
                                totalPages: totalPages,
                                accountList: [...that.data.accountList, ...res.data.rows]
                            })
                        })
                    }
                }
            }
            // 不合格-有搜索内容
            else {
                let search = that.data.content
                    // 不合格-有搜索内容-自定义时间
                if (option1 == '自定义') {
                    // 不合格-有搜索内容-自定义时间-全部
                    if (option2 == '全部') {
                        let custom = {
                            rp: that.data.rp,
                            page: that.data.page,
                            startDate: that.data.from,
                            endDate: that.data.to + ' 23:59:59',
                            key: search
                        }
                        apiAccount.getKeyFailedCustomAllList(custom).then(res => {
                            console.log(res, that.data.from + '至' + that.data.to + '的不合格列表')
                            wx.hideLoading()
                                // 获取总条数
                            const total = res.data.records;
                            // 计算总页数
                            const totalPages = res.data.total;
                            console.log(res, option + '内全部列表')
                            that.setData({
                                totalPages: totalPages,
                                accountList: [...that.data.accountList, ...res.data.rows]
                            })
                        })
                    }
                    // 不合格-有搜索内容-自定义时间-已处理
                    else if (option2 == '已处理') {
                        let customDue = {
                            rp: that.data.rp,
                            page: that.data.page,
                            startDate: that.data.from,
                            endDate: that.data.to + ' 23:59:59',
                            key: search,
                            isHandle: true
                        }
                        apiAccount.getKeyFailedStatusList(customDue).then(res => {
                            console.log(res, '自定义已处理')
                            wx.hideLoading()
                                // 获取总条数
                            const total = res.data.records;
                            // 计算总页数
                            const totalPages = res.data.total;
                            console.log(res, option + '内全部列表')
                            that.setData({
                                totalPages: totalPages,
                                accountList: [...that.data.accountList, ...res.data.rows]
                            })
                        })
                    }
                    // 不合格-有搜索内容-自定义时间-未处理
                    else {
                        let customDue = {
                            rp: that.data.rp,
                            page: that.data.page,
                            startDate: that.data.from,
                            endDate: that.data.to + ' 23:59:59',
                            key: search,
                            isHandle: false
                        }
                        apiAccount.getKeyFailedStatusList(customDue).then(res => {
                            console.log(res, '自定义未处理')
                            wx.hideLoading()
                                // 获取总条数
                            const total = res.data.records;
                            // 计算总页数
                            const totalPages = res.data.total;
                            console.log(res, option + '内全部列表')
                            that.setData({
                                totalPages: totalPages,
                                accountList: [...that.data.accountList, ...res.data.rows]
                            })
                        })
                    }
                }
                // 不合格-有搜索内容-周期
                else {
                    // 不合格-有搜索内容-周期-全部
                    if (option2 == '全部') {
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
                            failedDateStart: result,
                            failedDateEnd: today
                        })
                        let custom = {
                            rp: that.data.rp,
                            page: that.data.page,
                            startDate: result,
                            endDate: today + ' 23:59:59',
                            key: search
                        }
                        console.log(custom)
                        apiAccount.getKeyFailedCustomAllList(custom).then(res => {
                            console.log(res, that.data.from + '至' + that.data.to + '的未处理列表')
                            wx.hideLoading()
                                // 获取总条数
                            const total = res.data.records;
                            // 计算总页数
                            const totalPages = res.data.total;
                            console.log(res, option + '内全部列表')
                            that.setData({
                                totalPages: totalPages,
                                accountList: [...that.data.accountList, ...res.data.rows]
                            })
                        })
                    }
                    // 不合格-有搜索内容-周期-已处理
                    else if (option2 == '已处理') {
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
                                failedDateStart: result,
                                failedDateEnd: today
                            })
                            // console.log(that.data.dateStart)
                        let custom2 = {
                            rp: that.data.rp,
                            page: that.data.page,
                            startDate: result,
                            endDate: today + ' 23:59:59',
                            key: search,
                            isHandle: true
                        }
                        apiAccount.getKeyFailedStatusList(custom2).then(res => {
                            console.log(res, that.data.from + '至' + that.data.to + '的已处理列表')
                            wx.hideLoading()
                                // 获取总条数
                            const total = res.data.records;
                            // 计算总页数
                            const totalPages = res.data.total;
                            console.log(res, option + '内全部列表')
                            that.setData({
                                totalPages: totalPages,
                                accountList: [...that.data.accountList, ...res.data.rows]
                            })
                        })
                    } else {
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
                            failedDateStart: result,
                            failedDateEnd: today
                        })
                        let custom = {
                            rp: that.data.rp,
                            page: that.data.page,
                            startDate: that.data.from,
                            endDate: that.data.to + ' 23:59:59',
                            key: search,
                            isHandle: false
                        }
                        apiAccount.getKeyFailedStatusList(custom).then(res => {
                            console.log(res, that.data.from + '至' + that.data.to + '的未处理列表')
                            wx.hideLoading()
                                // 获取总条数
                            const total = res.data.records;
                            // 计算总页数
                            const totalPages = res.data.total;
                            console.log(res, option + '内全部列表')
                            that.setData({
                                totalPages: totalPages,
                                accountList: [...that.data.accountList, ...res.data.rows]
                            })
                        })
                    }
                }
            }
        }


    },

    // 合格不合格切换
    switch (e) {
        this.setData({
            option: e.detail.change,
            accountList: [], //重置列表
            totalPages: 1, //总页数
            rp: 10, //每页多少条数据
            page: 1 //第几页
        })
        this.getTheList()
        console.log(this.data.accountList)
    },
    // 搜索框
    onItemsChange: function onItemsChange() {
        this.setData({

        });
        console.log(this.data.accountList)

    },
    bindSearchInput: function bindSearchInput(e) {
        if (e.detail.value) {
            this.setData({
                content: e.detail.value,
                // accountList: [], //重置列表
                // totalPages: 1, //总页数
                // rp: 10, //每页多少条数据
                // page: 1 //第几页
            })
            console.log(this.data.content, '输入内容')
        }
        console.log(this.data.accountList)


    },
    bindConfirmSearch: function bindConfirmSearch(e) {
        this.setData({
            // content: e.detail.value,
            accountList: [], //重置列表
            totalPages: 1, //总页数
            rp: 10, //每页多少条数据
            page: 1 //第几页
        })
        this.getTheList()
        console.log(this.data.accountList)

    },
    // 点击搜索图标
    onClickSearch: function(e) {
        this.bindConfirmSearch()
            // this.setData({
            //     // content: e.detail.value,
            //     accountList: [], //重置列表
            //     totalPages: 1, //总页数
            //     rp: 10, //每页多少条数据
            //     page: 1 //第几页
            // })
            // this.getTheList()
            // console.log(this.data.accountList)



    },
    // 合格列表时间筛选
    changeRange(e) {
        this.setData({
            range: e.detail.change,
            accountList: [], //重置列表
            totalPages: 1, //总页数
            rp: 10, //每页多少条数据
            page: 1 //第几页
        })
        this.getTheList()
        console.log(this.data.accountList)




    },
    // 获取自定义开始时间
    customStart(e) {
        // console.log(e.detail.change)
        this.setData({
            from: e.detail.change,
            accountList: [], //重置列表
            totalPages: 1, //总页数
            rp: 10, //每页多少条数据
            page: 1 //第几页
        })
        this.getTheList()
            // console.log('test')
        console.log(this.data.accountList)

    },
    // 获取自定义结束时间
    customEnd(e) {
        // console.log(e.detail.change)
        this.setData({
            to: e.detail.change,
            accountList: [], //重置列表
            totalPages: 1, //总页数
            rp: 10, //每页多少条数据
            page: 1 //第几页
        })
        this.getTheList()
        console.log(this.data.accountList)

    },
    failChangeRange(e) {
        console.log(e.detail.change)
            // console.log(this.data.content)
        this.setData({
            failedRange: e.detail.change,
            accountList: [], //重置列表
            totalPages: 1, //总页数
            rp: 10, //每页多少条数据
            page: 1 //第几页
        })
        this.getTheList()
        console.log(this.data.accountList)

    },
    failChangeStatus(e) {
        this.setData({
            failedStatus: e.detail.change,
            accountList: [], //重置列表
            totalPages: 1, //总页数
            rp: 10, //每页多少条数据
            page: 1 //第几页
        })
        this.getTheList()

    },
    failCustomStart(e) {
        this.setData({
            failedFrom: e.detail.change,
            accountList: [], //重置列表
            totalPages: 1, //总页数
            rp: 10, //每页多少条数据
            page: 1 //第几页
        })
        this.getTheList()
        console.log(this.data.accountList)

    },
    failCustomEnd(e) {
        this.setData({
            failedTo: e.detail.change,
            accountList: [], //重置列表
            totalPages: 1, //总页数
            rp: 10, //每页多少条数据
            page: 1 //第几页
        })
        this.getTheList()
        console.log(this.data.accountList)

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
            // console.log(pre)
        this.setData({
            from: result,
            to: today
        })
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