import { ResetModel } from '../../../models/collect/reset'
let apiReset = new ResetModel();
// pagesCollect/pages/reset/reset.js
Page({

    /**
     * Page initial data
     */
    data: {
        originPw: null,
        originValue: null,
        newPw: null,
        newValue: null,
        repeatPw: null,
        repeatValue: null,

    },
    bindOrigin: function(e) {
        this.setData({
            originPw: e.detail.value
        })
        console.log(this.data.originPw, '输入原密码')
    },
    bindNew: function(e) {
        this.setData({
            newPw: e.detail.value
        })
        console.log(this.data.newPw, '输入新密码')
    },
    bindRepeat: function(e) {
        this.setData({
            repeatPw: e.detail.value
        })
        console.log(this.data.repeatPw, '确认密码')
    },
    resetPassword() {
        let that = this
        let postData = {
            oldPassword: that.data.originPw,
            newPassword: that.data.newPw,
            confirmPassword: that.data.repeatPw
        }
        apiReset.resetPassword(postData).then(res => {
            console.log(res, '修改密码')
                // that.setData({
                //     completeList: res.data.rows
                // })
        })

    },
    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function(options) {

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