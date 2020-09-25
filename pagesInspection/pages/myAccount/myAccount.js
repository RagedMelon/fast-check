// pagesCollect/pages/myAccount/myAccount.js
Page({

    /**
     * Page initial data
     */
    data: {
        userName: '',
        department: '',
        avatar: '',
        // 底部tab
        blockid: 0,
        bgcolor: '#FFFFFF',
        color: "#989898",
        selectedColor: '#57D957',
        showborder: false,
        bordercolor: "",
        tabbar: [{
                id: 0,
                pagePath: "page/home0/index",
                selectedIconPath: '/images/test/nav_bottom_icon_home_selected@2x.png',
                iconPath: '/images/test/nav_bottom_icon_home_default@2x.png',
                text: '首页',
            }, {
                id: 1,
                pagePath: "page/home2/index",
                selectedIconPath: '/images/test/nav_bottom_icon_scan@2x.png',
                iconPath: '/images/test/nav_bottom_icon_scan@2x.png',
                text: '',
            },
            {
                id: 2,
                pagePath: "page/home3/index",
                selectedIconPath: '/images/test/nav_bottom_icon_my_selected@2x.png',
                iconPath: '/images/test/nav_bottom_icon_my_default@2x.png',
                text: '我的',
            }
        ]

    },
    // 修改密码
    changePw: function() {
        wx.navigateTo({
            url: '/pagesInspection/pages/reset/reset',
        })
    },
    tabbarChange(e) {
        var index = parseInt(e.detail);
        console.log(index)
        this.setData({
            blockid: index
        })
    },
    logOut() {
        wx.navigateTo({
            url: '/pages/index/index',
        })
        wx.removeStorageSync('ecafeToken');
    },
    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function(options) {
        let userName = wx.getStorageSync('fullName')
        let department = wx.getStorageSync('department')
        this.setData({
            userName: userName,
            department: department
        })
        let that = this
        wx.getUserInfo({
            success: function(res) {
                var userInfo = res.userInfo
                var avatarUrl = userInfo.avatarUrl
                console.log(avatarUrl)
                that.setData({
                    avatar: avatarUrl
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