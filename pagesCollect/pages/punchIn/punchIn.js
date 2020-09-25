// pagesCollect/pages/punchIn/punchIn.js
const util = require('../../../utils/util.js')
    // const clock_in = require('../../../models/collect/index')
import { PunchinModel } from '../../../models/collect/punchin'
let apiPunchin = new PunchinModel();
Page({

    /**
     * Page initial data
     */

    data: {
        showModal: false,
        time: '', //日期加时间
        clockNow: '', //时刻
        within: null, //打卡范围指标
        success: true,
        marketList: null,
        marketId: null,
        testList: [111111, 222222],
        index: 0,
        items: [{
                "distance": 728, //与打卡位置距离（米）
                "id": 13018, //市场id
                "marketName": "测试市场1ww" //市场名称
            },
            {
                "distance": 222, //与打卡位置距离（米）
                "id": 22222, //市场id
                "marketName": "测试市场2" //市场名称
            }
        ],

    },
    // 出现在两个市场范围内
    radioChange: function(e) {
        console.log('radio发生change事件，携带value值为：', e.detail.value)
        this.setData({
            marketId: e.detail.value
        })
        console.log(this.data.marketId)

    },

    clockinStat: function() {
        wx.navigateTo({
            url: '/pagesCollect/pages/punchInStat/punchInStat',
        })
    },

    //  点击打卡按钮打卡
    showDialogBtn: function() {
        if (this.data.marketList.length) {
            // this.setData({
            //     showModal: true
            // })
            let that = this;
            let currentTime = util.formatTime(new Date());
            let clock = currentTime.split(' ')[1]
            let now = currentTime.split(' ')[0].split('/').join('-').concat(' ' + clock)
            this.setData({
                time: now,
            })
            wx.getLocation({
                type: 'wgs84',
                // type: 'gcj02',
                success: res => {
                    const latitude = res.latitude
                    const longitude = res.longitude
                        // wgs84转百度坐标系
                    var ssws = that.wgs84togcj02(longitude, latitude)
                    ssws = that.gcj02tobd09(ssws[0], ssws[1])
                        //解决定位偏移
                    var ssssss1 = ssws[1] - 0.000160
                    var ssssss2 = ssws[0] - 0.000160
                    const speed = res.speed
                    const accuracy = res.accuracy
                    let id = null
                        // 如果只有一个市场范围内
                    if (that.data.marketList.length == 1) {
                        id = that.data.marketList[0].id
                    } else {
                        id = that.data.marketId
                    }
                    if (id) {
                        let postData = {
                            lat: ssssss1.toFixed(6),
                            lng: ssssss2.toFixed(6),
                            marketId: id
                        }
                        apiPunchin.getPunchin(postData).then(res => {
                            console.log(res)
                            that.setData({
                                showModal: true
                            })
                        })
                    } else {
                        wx.showToast({
                            title: '请先选择市场',
                            icon: 'none',
                        })
                    }



                }
            })
        } else {
            console.log('不在任一市场范围内')
        }

    },

    //地图定位矫正
    /**
     * WGS84转GCj02
     * @param lng
     * @param lat
     * @returns {*[]}
     */

    wgs84togcj02: function(lng, lat) {
        var that = this

        var x_PI = 3.14159265358979324 * 3000.0 / 180.0;
        var PI = 3.1415926535897932384626;
        var a = 6378245.0;
        var ee = 0.00669342162296594323;
        if (that.out_of_china(lng, lat)) {
            return [lng, lat]
        } else {
            var dlat = that.transformlat(lng - 105.0, lat - 35.0);
            var dlng = that.transformlng(lng - 105.0, lat - 35.0);
            var radlat = lat / 180.0 * PI;
            var magic = Math.sin(radlat);
            magic = 1 - ee * magic * magic;
            var sqrtmagic = Math.sqrt(magic);
            dlat = (dlat * 180.0) / ((a * (1 - ee)) / (magic * sqrtmagic) * PI);
            dlng = (dlng * 180.0) / (a / sqrtmagic * Math.cos(radlat) * PI);
            var mglat = lat + dlat;
            var mglng = lng + dlng;
            return [mglng, mglat]
        }
    },
    /**
     * 火星坐标系 (GCJ-02) 与百度坐标系 (BD-09) 的转换
     * 即谷歌、高德 转 百度
     * @param lng
     * @param lat
     * @returns {*[]}
     */
    gcj02tobd09: function(lng, lat) {
        var that = this
        var x_PI = 3.14159265358979324 * 3000.0 / 180.0;
        var PI = 3.1415926535897932384626;
        var a = 6378245.0;
        var ee = 0.00669342162296594323;
        var z = Math.sqrt(lng * lng + lat * lat) + 0.00002 * Math.sin(lat * x_PI);
        var theta = Math.atan2(lat, lng) + 0.000003 * Math.cos(lng * x_PI);
        var bd_lng = z * Math.cos(theta) + 0.0065;
        var bd_lat = z * Math.sin(theta) + 0.006;
        return [bd_lng, bd_lat]
    },
    transformlat: function(lng, lat) {
        var x_PI = 3.14159265358979324 * 3000.0 / 180.0;
        var PI = 3.1415926535897932384626;
        var a = 6378245.0;
        var ee = 0.00669342162296594323;
        var ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
        ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(lat * PI) + 40.0 * Math.sin(lat / 3.0 * PI)) * 2.0 / 3.0;
        ret += (160.0 * Math.sin(lat / 12.0 * PI) + 320 * Math.sin(lat * PI / 30.0)) * 2.0 / 3.0;
        return ret
    },

    transformlng: function(lng, lat) {
        var x_PI = 3.14159265358979324 * 3000.0 / 180.0;
        var PI = 3.1415926535897932384626;
        var a = 6378245.0;
        var ee = 0.00669342162296594323;
        var ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
        ret += (20.0 * Math.sin(6.0 * lng * PI) + 20.0 * Math.sin(2.0 * lng * PI)) * 2.0 / 3.0;
        ret += (20.0 * Math.sin(lng * PI) + 40.0 * Math.sin(lng / 3.0 * PI)) * 2.0 / 3.0;
        ret += (150.0 * Math.sin(lng / 12.0 * PI) + 300.0 * Math.sin(lng / 30.0 * PI)) * 2.0 / 3.0;
        return ret
    },

    /**
     * 判断是否在国内，不在国内则不做偏移
     * @param lng
     * @param lat
     * @returns {boolean}
     */
    out_of_china: function(lng, lat) {
        return (lng < 72.004 || lng > 137.8347) || ((lat < 0.8293 || lat > 55.8271) || false);
    },
    /**
     * 弹出框蒙层截断touchmove事件
     */
    preventTouchMove: function() {},
    /**
     * 隐藏模态对话框
     */
    hideModal: function() {
        this.setData({
            showModal: false
        });
    },
    /**
     * 对话框取消按钮点击事件
     */
    onCancel: function() {
        this.hideModal();
    },
    /**
     * 对话框确认按钮点击事件
     */
    onConfirm: function() {
        this.hideModal();
    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function(options) {
        let that = this;
        // 设定打开页面那一秒的时间
        that.setData({
            clockNow: util.formatTime(new Date()).split(' ')[1]
        });
        // 一直更新时间
        setInterval(function() {
            that.setData({
                clockNow: util.formatTime(new Date()).split(' ')[1]
            });

        }, 1000);
        // 获取后台数据-可打卡市场列表
        this.getMarketLocation()
    },
    // 获取可打卡市场列表
    getMarketLocation: function() {
        let that = this;
        wx.getLocation({
            // type: 'gcj02',
            type: 'wgs84',
            // success(res) {
            success: res => {
                const latitude = res.latitude
                const longitude = res.longitude
                    // wgs84转百度坐标系
                var ssws = that.wgs84togcj02(longitude, latitude)
                ssws = that.gcj02tobd09(ssws[0], ssws[1])
                    //解决定位偏移
                var ssssss1 = ssws[1] - 0.000160
                var ssssss2 = ssws[0] - 0.000160
                const speed = res.speed
                const accuracy = res.accuracy
                let postData = {
                    lat: ssssss1.toFixed(6),
                    lng: ssssss2.toFixed(6)
                }
                console.log(postData, '传入的坐标')
                apiPunchin.getPunchinList(postData).then(res => {
                    console.log(res.data)
                    that.setData({
                        marketList: res.data
                    })
                    if (res.data.length == 0) {
                        that.setData({
                            within: false
                        })
                    } else {
                        that.setData({
                            within: true
                        })
                    }
                })
            }
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
        wx.hideHomeButton()
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