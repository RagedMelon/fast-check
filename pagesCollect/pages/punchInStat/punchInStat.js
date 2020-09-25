// pagesCollect/pages/punchInStat/punchInStat.js
const util = require('../../../utils/util.js')
import { PunchinModel } from '../../../models/collect/punchin'
let apiPunchin = new PunchinModel();
Page({

    /**
     * Page initial data
     */
    data: {
        counts: 21,
        content: '暂无打卡记录~',
        date: '',
        year: '',
        month: '',
        stat: null,
        record: null
    },
    getpunchInStat: function() {
        let that = this;
        let date = new Date(Date.parse(new Date()));
        let Y = date.getFullYear();
        //获取月份  
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
        that.setData({
            year: Y,
            month: M
        })
        let currentTime = util.formatTime(new Date());
        let now = currentTime.split(' ')[0].split('/').join('-')
        let postData = {
                statDate: now
            }
            // console.log(postData)
        apiPunchin.getPunchinStat(postData).then(res => {
            // console.log(res)
            that.setData({
                stat: res.data
            })
        })
        apiPunchin.getPunchinRecord(postData).then(res => {
            console.log(res.data)
            that.setData({
                record: res.data
            })
        })
    },

    // 改变统计日期
    bindDateChange(e) {
        console.log(e.detail.value)
        let changeDate = e.detail.value
        let arr = changeDate.split('-')
        console.log(arr)
        this.setData({
            year: arr[0],
            month: arr[1]
        })
        let postData = {
            statDate: changeDate
        }
        let that = this;
        apiPunchin.getPunchinStat(postData).then(res => {
            console.log(res)
            that.setData({
                stat: res.data
            })
        })
        apiPunchin.getPunchinRecord(postData).then(res => {
            console.log(res.data)
            that.setData({
                record: res.data
            })
        })
    },
    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function(options) {
        this.getpunchInStat()
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