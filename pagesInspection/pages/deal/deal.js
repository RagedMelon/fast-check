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
        // postMethod:null,
    },
    // 获取处理数量
    getWeight(e) {
        console.log(e.detail.value)
        this.setData({
            weight: e.detail.value
        })
    },
    // 获取处理方式
    showMethods() {
        this.setData({
            showList: !this.data.showList
        })
    },
    getMethod(e) {
        console.log(e)
        this.setData({
            methodDefault: e.currentTarget.dataset.method,
            showList: false

        })
    },

    // 上传处理照片
    upload: function(e) {
        let that = this
        wx.chooseImage({
            count: 10,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success(res) {
                console.log(res)
                const tempFilePaths = res.tempFilePaths
                wx.uploadFile({
                    filePath: tempFilePaths[0],
                    name: 'file',
                    url: 'https://fastcheck.id-cas.cn/fastcheck/uploadFile.do?action=upload',
                    formData: {
                        directoryType: 'accessCertificate'
                    },
                    success(res) {
                        const data = JSON.parse(res.data)
                        let picsId = that.data.picsId
                        if (picsId == "" || picsId == undefined) {
                            console.log('空数组')
                            picsId = JSON.stringify(data.id)
                        } else {
                            picsId += ',' + JSON.stringify(data.id)
                        }
                        that.setData({
                            picsId: picsId
                        })
                        console.log(that.data.picsId)
                    }
                })

                let pics = that.data.pics
                pics.push(tempFilePaths)
                that.setData({
                    pics: pics
                })
                console.log(pics)
            }
        })
    },

    // 提交
    submit() {
        console.log(this.data.picsId, this.data.sampleId, parseFloat(this.data.weight), this.data.methodDefault)
        let type = null
        if (this.data.methodDefault == '销毁') {
            type = 'DESTROY'
        } else if (this.data.methodDefault == '无公害处理') {
            type = 'POLLUTIONFREE'
        } else if (this.data.methodDefault == '下架处理') {
            type = 'SOLDOUT'
        } else if (this.data.methodDefault == '其他') {
            type = 'OTHER'
        } else {
            type = null
        }
        if (this.data.weight == null) {
            wx.showToast({
                title: '请输入处理数量',
                icon: 'none'
            })
        } else if (type == null) {
            wx.showToast({
                title: '请输入处理方式',
                icon: 'none'
            })
        } else {
            let postData = {
                sampleId: this.data.sampleId,
                type: type,
                weight: parseFloat(this.data.weight),
                pic: this.data.picsId
            }
            console.log(postData)
            apiSample.saveHandledResult(postData).then(res => {
                if (res.code == 0) {
                    wx.showModal({
                        content: '处理成功',
                        showCancel: false,
                        success() {
                            let pages = getCurrentPages();
                            let currPage = pages[pages.length - 1]; //当前页面
                            let prevPage = pages[pages.length - 2]; //上一个页面
                            let homePage = pages[pages.length - 3]; //往前两个页面
                            if (prevPage.comeBack) {
                                prevPage.comeBack()
                                console.log(prevPage.data, '刷新样品管理列表')
                                wx.navigateBack({
                                    delta: 1
                                })
                            } else {
                                prevPage.handledComeBack()
                                console.log(prevPage.data, '刷新台账管理列表')
                                wx.navigateBack({
                                    delta: 1
                                })
                            }
                        }
                    })
                } else {
                    wx.showModal({
                        // title: '',
                        content: res.message,
                        showCancel: false,
                    })
                }

            })
        }


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