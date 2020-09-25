const util = require('../../../utils/util.js')
import { SampleModel } from '../../../models/collect/samlpe'
let apiSample = new SampleModel();
// pagesCollect/pages/scanSample/scanSample.js
Page({

    /**
     * Page initial data
     */
    data: {
        text: '关联任务',
        url: '../../../images/collect/icon_associated_yellow@2x.png',
        text2: '样品采样信息',
        url2: '../../../images/collect/icon_sample_yellow@2x.png',
        boothInfo: null,
        picUrl: null,
        proofUrl: null
    },

    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function(options) {
        // console.log(options)
        let that = this
        let postId = {
            code: options.id
        }
        console.log(postId, '传入的参数')
        apiSample.getSampleDetails(postId).then(res => {
            console.log(res, '详情')
            if (res.data.material) {
                let pics = res.data.material.split(',')
                let picUrl = []
                for (let index in pics) {
                    picUrl.push("https://fastcheck.id-cas.cn/fastcheck/sambaFile.do?action=showImageById&id=" + pics[index])
                }
                this.setData({
                    proofUrl: picUrl
                })
            }
            that.setData({
                boothInfo: res.data,
                picUrl: 'https://fastcheck.id-cas.cn/fastcheck/sambaFile.do?action=showImageById&id=' + res.data.boothInfoDto.businessLicenceFileIds,
                // proofUrl: 'https://fastcheck.id-cas.cn/fastcheck/sambaFile.do?action=showImageById&id=' + res.data.material,

            })
            console.log(that.data.proofUrl, '网址获取成功')
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