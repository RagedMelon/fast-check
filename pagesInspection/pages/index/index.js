import { SampleManagerModel } from '../../../models/inspection/sampleManager'
let apiSample = new SampleManagerModel();
// pagesInspection/pages/index/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        sampleList: [],
        noSample: '当前暂无待检验样品~',
        background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
        indicatorDots: false,
        vertical: false,
        autoplay: true,
        interval: 2000,
        duration: 500,
        menu: [{
                id: 1,
                icon: '../../../images/test/icon_home_sample@2x.png',
                text: '样品管理'
            },
            {
                id: 2,
                icon: '../../../images/test/icon_home_parameter@2x.png',
                text: '台账管理'
            },
            {
                id: 3,
                icon: '../../../images/test/icon_home_data@2x.png',
                text: '统计分析'
            },
        ],
        // 底部tab
        blockid: 0,
        bgcolor: '#FFFFFF',
        color: "#989898",
        selectedColor: '#57D957',
        showborder: false,
        bordercolor: "",
        tabbar: [{
                id: 4,
                pagePath: "page/home0/index",
                selectedIconPath: '/images/test/nav_bottom_icon_home_selected@2x.png',
                iconPath: '/images/test/nav_bottom_icon_home_default@2x.png',
                text: '首页',
            }, {
                id: 5,
                pagePath: "page/home2/index",
                selectedIconPath: '/images/test/nav_bottom_icon_scan@2x.png',
                iconPath: '/images/test/nav_bottom_icon_scan@2x.png',
                text: '',
            },
            {
                id: 6,
                pagePath: "page/home3/index",
                selectedIconPath: '/images/test/nav_bottom_icon_my_selected@2x.png',
                iconPath: '/images/test/nav_bottom_icon_my_default@2x.png',
                text: '我的',
            }
        ],
        totalPages: 1, //总页数
        rp: 10, //每页多少条数据
        page: 1 //第几页
    },
    tabbarChange(e) {

        var index = parseInt(e.detail);
        this.setData({
            blockid: index
        })
    },
    // 轮播图
    onShareAppMessage() {
        return {
            title: 'swiper',
            path: 'page/component/pages/swiper/swiper'
        }
    },
    refreshList() {
        this.setData({
            sampleList: [], //重置列表
            totalPages: 1, //总页数
            rp: 10, //每页多少条数据
            page: 1 //第几页

        })
        this.getLists()
    },
    getLists() {
        // 默认获取待检验的列表
        let that = this
        let condition = {
            rp: that.data.rp,
            page: that.data.page,
            status: 'COMMIT',
            isInspection: false
        }
        apiSample.getSampleList(condition).then(res => {
            console.log(res, '获取首页待检验')
            const total = res.data.records
            this.data.totalPages = Math.ceil(total / 10);
            that.setData({
                sampleList: [...that.data.sampleList, ...res.data.rows]
            })
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.getLists()

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
        // this.getLists();

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

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
        if (this.data.page >= this.data.totalPages) {
            // 没有下一页数据
            console.log('没有下一页数据')
                //  console.log('%c'+"没有下一页数据","color:red;font-size:100px;background-image:linear-gradient(to right,#0094ff,pink)");
                // wx.showToast({ title: '没有下一页数据' });

        } else {
            // 还有下一页数据
            //  console.log('%c'+"有下一页数据","color:red;font-size:100px;background-image:linear-gradient(to right,#0094ff,pink)");
            this.data.page++;
            this.getLists();
        }
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})