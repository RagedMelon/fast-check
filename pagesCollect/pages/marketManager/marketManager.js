import { MarketModel } from '../../../models/collect/market'
let apiMarket = new MarketModel();
// pagesCollect/pages/marketManager/marketManager.js
Page({

    /**
     * Page initial data
     */
    data: {
        focus: false,
        marketList: [],
        allMarkets: [],
        cityMarketList: [],
        searchValue: '',
        cityNames: null,
        content: '',
        cityIds: [],
        selectedCityId: null,
        default: '城市', //城市选择器默认值

        array: ['美国', '中国', '巴西', '日本'],
        index: 0, //默认选中首位城市
        // 以上为搜索框
        show: true,
        marketCount: 1,
        map: 0,
        noMarket: '当前城市暂无市场~',
        // 以下地图数据
        showLocation: true,
        scale: 10,
        latitude: 23.099994,
        longitude: 113.324520,
        circles: [{
                latitude: 23.099994,
                longitude: 113.324520,
                name: 'T.I.T 创意园',
                radius: 200,
                fillColor: '#62D66433',
                color: '#5CD264',
                strokeWidth: '2rpx'
            },
            {
                latitude: 23.099994,
                longitude: 113.324520,
                name: 'T.I.T 创意园',
                radius: 64,
                fillColor: '#FFFFFF',
            },
            {
                latitude: 23.099994,
                longitude: 113.324520,
                name: 'T.I.T 创意园',
                radius: 28,
                fillColor: '#62D664',
            }
        ],
        markers: [{
                latitude: 23.099994,
                longitude: 113.344520,
                iconPath: '/images/icon_map_locate@2x.png',
                width: '27rpx',
                height: '34rpx'
            },
            {
                latitude: 30.099994,
                longitude: 113.304520,
                iconPath: '/images/icon_map_locate@2x.png',
                width: '27rpx',
                height: '34rpx'
            }
        ],
        subKey: 'B5QBZ-7JTLU-DSSVA-2BRJ3-TNXLF-2TBR7',
        enable3d: false,
        showCompass: false,
        enableOverlooking: false,
        enableZoom: true,
        enableScroll: true,
        enableRotate: false,
        drawPolygon: false,
        enableSatellite: false,
        enableTraffic: false,
        totalPages: 1, //总页数
        rp: 10, //每页多少条数据
        page: 1, //第几页
        testArray: []
    },

    // 搜索框
    onItemsChange: function onItemsChange() {
        this.setData({
            content: e.detail.value
        });
        console.log(e.detail.value, '改变了值')
    },
    bindSearchInput: function bindSearchInput(e) {
        if (e.detail.value != '') {
            this.setData({
                content: e.detail.value,
                totalPages: 1, //总页数
                rp: 10, //每页多少条数据
                page: 1, //第几页
                marketList: [],
            })
            this.getLists()
        } else {
            this.setData({
                content: '',
                totalPages: 1, //总页数
                rp: 10, //每页多少条数据
                page: 1, //第几页
                marketList: [],
            })
            this.getLists()
            console.log('现在搜索框为空')
        }
        console.log(this.data.content, '输入内容')
    },
    bindConfirmSearch: function bindConfirmSearch(e) {
        console.log(this.data.content, '输入的值')
        this.onClickSearch(e)
    },
    // 点击搜索图标
    onClickSearch: function(e) {
        console.log(this.data.content, '输入的值')
        this.setData({
            // content: e.detail.value,
            totalPages: 1, //总页数
            rp: 10, //每页多少条数据
            page: 1, //第几页
            marketList: [],
        })
        this.getLists()

    },
    // 选择城市
    bindPickerChange: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            totalPages: 1, //总页数
            rp: 10, //每页多少条数据
            page: 1, //第几页
            marketList: [],
            index: e.detail.value,
            default: this.data.cityNames[e.detail.value].areaName,
            selectedCityId: this.data.cityIds[e.detail.value]
        })
        this.getLists()
            // let city = {
            //     cityId: this.data.cityIds[e.detail.value]
            // }
            // apiMarket.getCityMarketList(city).then(res => {
            //     console.log(res, '某市的市场')
            //     this.setData({
            //         marketList: res.data
            //     })
            // })


    },
    mapMode: function() {
        let that = this;
        wx.getLocation({
            type: 'wgs84',
            // type: 'gcj02',
            success: res => {
                const latitude = res.latitude
                const longitude = res.longitude
                    // wgs84转百度坐标系
                var ssws = that.wgs84togcj02(longitude, latitude)
                ssws = that.gcj02tobd09(ssws[0], ssws[1])
                    // 解决定位偏移
                var ssssss1 = ssws[1] - 0.000160 //纬度
                var ssssss2 = ssws[0] - 0.000160 //经度
                let circles = that.data.circles
                for (let i in circles) {
                    circles[i].latitude = ssssss1,
                        circles[i].longitude = ssssss2
                }
                that.setData({
                    longitude: ssssss2,
                    latitude: ssssss1,
                    circles: circles
                })
            }
        })
        this.setData({
            map: 1
        })
    },
    onShareAppMessage() {
        return {
            title: 'map',
            path: 'page/component/pages/map/map'
        }
    },
    hide() {
        this.setData({
            show: !this.data.show
        })
    },
    returnTo() {
        this.setData({
            marketCount: 1,
            map: 0
        })
    },
    getLists() {
        // 获取所有市场
        wx.showLoading({
            title: '加载中...',
        })
        let that = this
        if (this.data.default == '城市') {
            // 无城市筛选-无搜索
            if (this.data.content == '') {
                let postData = {
                    rp: that.data.rp,
                    page: that.data.page,
                }
                apiMarket.getMarketList(postData).then(res => {
                    wx.hideLoading()
                        // 获取总条数
                    const total = res.data.records;
                    // 计算总页数
                    const totalPages = res.data.total;
                    that.setData({
                        totalPages: totalPages,
                        marketList: [...that.data.marketList, ...res.data.rows]
                    })
                    console.log(this.data.marketList, '默认市场列表')
                })
            }
            // 无城市筛选-有搜索
            else {
                let keyValue = {
                    rp: that.data.rp,
                    page: that.data.page,
                    keyWord: this.data.content
                }
                console.log(keyValue)
                apiMarket.getCertainMarket(keyValue).then(res => {
                    console.log(res, '查找市场')
                    wx.hideLoading()
                        // 获取总条数
                    const total = res.data.records;
                    // 计算总页数
                    const totalPages = res.data.total;
                    that.setData({
                        totalPages: totalPages,
                        marketList: [...that.data.marketList, ...res.data.rows]
                    })
                })
            }


        } else {
            // 城市变动，搜索为空
            if (this.data.content == '') {
                console.log('城市变动，搜索为空')
                let city = {
                    rp: this.data.rp,
                    page: this.data.page,
                    cityId: this.data.selectedCityId
                }
                apiMarket.getCityMarketList(city).then(res => {
                    console.log(res, '某市的市场')
                    wx.hideLoading()
                        // 获取总条数
                    const total = res.data.records;
                    // 计算总页数
                    const totalPages = res.data.total;
                    this.setData({
                        totalPages: totalPages,
                        marketList: [...this.data.marketList, ...res.data.rows]
                    })
                })
            }
            // 选中城市，有搜索
            else {
                console.log('选中城市，有搜索')
                let postData = {
                    rp: this.data.rp,
                    page: this.data.page,
                    keyWord: this.data.content,
                    cityId: this.data.selectedCityId
                }
                console.log(postData)
                apiMarket.getCitySearchMarkets(postData).then(res => {
                    console.log('搜索某市市场')
                    wx.hideLoading()
                        // 获取总条数
                    const total = res.data.records;
                    // 计算总页数
                    const totalPages = res.data.total;
                    this.setData({
                        totalPages: totalPages,
                        marketList: [...this.data.marketList, ...res.data.rows]
                    })
                })
            }
        }


    },
    getCertainCityMarket(cityId) {

    },
    // 获取市场

    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function(options) {
        wx.removeStorageSync('missionId')
        this.getLists()
            // 获取广东省所有地级市
        let canton = {
            parentId: 1761,
        }
        apiMarket.getCities(canton).then(res => {
            let arr = []
            let id = []
            res.data.forEach(i => {
                arr.push(
                    i.areaName
                )
                id.push(
                    i.id
                )
            });
            this.setData({
                cityNames: res.data,
                array: arr,
                cityIds: id
            })
            console.log(this.data.cityNames, this.data.array, this.data.cityIds)
        })
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