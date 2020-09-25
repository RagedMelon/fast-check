import { accountManagerModel } from '../../../models/inspection/accountManager'
let apiAccount = new accountManagerModel();
import { SampleManagerModel } from '../../../models/inspection/sampleManager'
let apiSample = new SampleManagerModel();
// pagesInspection/pages/deal/deal.js
Page({

    /**
     * Page initial data
     */
    data: {
        text: '样品处理',
        url: '../../../images/test/icon_samplepro_green@2x.png',
        methods: ['销毁', '无公害处理', '下架处理', '其他'],
        details: null,
        weight: null,
        showList: false,
        methodDefault: '请选择处理方式',
        picsId: '', //图片id
        pics: [], //图片地址
        sampleId: null,
        dealResult: null
            // postMethod:null,
    },





    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function(options) {
        console.log(options.id)
        let getId = parseInt(options.id)
        this.setData({
            sampleId: getId
        })
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
        let code = options.code
        let postCode = {
            code: code
        }
        apiSample.getHandledResult(postCode).then(res => {
            console.log(res)
            this.setData({
                dealResult: res.data
            })
            if (res.data.handlePic) {
                let picIds = res.data.handlePic.split(',')
                let picUrl = []
                for (let index in picIds) {
                    picUrl.push("https://fastcheck.id-cas.cn/fastcheck/sambaFile.do?action=showImageById&id=" + picIds[index])
                }
                this.setData({
                    pics: picUrl
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