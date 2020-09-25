import { accountManagerModel } from '../../../models/inspection/accountManager'
let apiAccount = new accountManagerModel();
// pagesInspection/pages/testReport/testReport.js
Page({

    /**
     * Page initial data
     */
    data: {
        details: null,
        result: {
            project: '黄曲霉素',
            reagent: '试剂1',
            batch: 'xxx批次',
            factory: 'xxx厂家',
            result: '阳性 不合格',
        },
        text: '检验结果',
        url: '../../../images/test/icon_test_yellow@2x.png'

    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function(options) {
        console.log(options.id)
        let getId = parseInt(options.id)
        let postId = {
            sampleId: getId
        }
        let that = this
        apiAccount.getTestDetails(postId).then(res => {
            console.log(res.data)
            that.setData({
                details: res.data
            })
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