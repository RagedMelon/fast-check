import {
    LoginModel
} from '../../models/index.js'
let apiLogin = new LoginModel();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        secondDefault: '采样端',
        secondSelect: false,
        secondItems: [{
                id: 1,
                option: '采样端'
            },
            {
                id: 2,
                option: '检验端'
            },

        ],
        secondText: 1,
        userName: null,
        passWord: null,
        nameVal: null,
        passWordVal: null

    },

    goIndex() {
        // apiLogin.getLogin()
        if (this.data.secondText == 1) {
            // let end='sample'
            let postData = {
                dataType: 'sample',
                username: this.data.userName,
                password: this.data.passWord
            }
            apiLogin.getLogin(postData).then(res => {
                console.log(res)
                wx.setStorageSync('ecafeToken', res.ecafeToken)
                wx.setStorageSync('userId', res.userId)
                wx.setStorageSync('fullName', res.fullName)
                wx.setStorageSync('department', res.department)
                if (res.code == '0') {
                    wx.navigateTo({
                        url: '/pagesCollect/pages/index/index',
                    })
                } else if (res.code == '-1') {
                    wx.showModal({
                        title: '登录失败',
                        content: res.message,
                        showCancel: false,
                    })
                }
            })

        } else {
            // let end='inspect'
            let postData = {
                dataType: 'inspect',
                username: this.data.userName,
                password: this.data.passWord
            }
            apiLogin.getLogin(postData).then(res => {
                    console.log(res)
                    wx.setStorageSync('ecafeToken', res.ecafeToken)
                    wx.setStorageSync('fullName', res.fullName)
                    wx.setStorageSync('department', res.department)
                    if (res.code == '0') {
                        wx.navigateTo({
                            url: '/pagesInspection/pages/index/index',
                        })
                    } else if (res.code == '-1') {
                        wx.showModal({
                            title: '登录失败',
                            content: res.message,
                            showCancel: false,
                        })
                    }

                })
                // wx.navigateTo({
                //     url: '/pagesInspection/pages/index/index',
                // })
        }

    },
    bindShowsecond() {
        this.setData({
            secondSelect: !this.data.secondSelect,
        })
    },
    secondChosen(e) {
        // console.log(e)
        let chosen = e.currentTarget.dataset.name
        let id = e.currentTarget.id
            // console.log(e.currentTarget)
        this.setData({
                secondDefault: chosen,
                secondSelect: false,
                secondText: id
            })
            // let change = this.data.secondDefault
            // this.triggerEvent('status', { change })
    },
    // 填入用户
    bindUserName: function(e) {
        this.setData({
            userName: e.detail.value
        })
        console.log(this.data.userName, '输入用户名')
    },
    // 填入密码
    bindPassWord: function(e) {
        this.setData({
            passWord: e.detail.value
        })
        console.log(this.data.passWord, '输入密码')
    },
    // 点击空白隐藏下拉
    noDisplay() {
        this.setData({
            secondSelect: false
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // this._apiLogin()
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

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})