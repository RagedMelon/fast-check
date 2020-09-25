import { SampleManagerModel } from '../../../models/inspection/sampleManager'
let apiSample = new SampleManagerModel();
import { accountManagerModel } from '../../../models/inspection/accountManager'
let apiAccount = new accountManagerModel();
// pagesInspection/pages/readIn/readIn.js
/**
 * Detail类 构造函数 
 * @param id 
 * @param itemName 
 * @param hasParam 
 * @param paramValue	 
 * @param minValue 
 * @param maxValue 
 * @param paramUnit 
 * @param productTypeId 
 */
function Detail(checkItemId, reagentId, inspectValue, inspectResult, inspectMark, inspectPic) {
    this.checkItemId = checkItemId
    this.reagentId = reagentId
    this.inspectValue = inspectValue
    this.inspectResult = inspectResult
    this.inspectMark = inspectMark
    this.inspectPic = inspectPic
}

function Info() {
    this.details = [{
        "checkItemId": "", //检验项目id
        "reagentId": "", //试剂id
        "inspectValue": "", //检验值
        "inspectResult": "NEGATIVE", //检验结果
        "inspectMark": "", //检验备注
        "inspectPic": "" //留证图片id
    }];
}
Page({

    /**
     * Page initial data
     */
    data: {
        text: '检验结果',
        url: '../../../images/test/icon_test_green@2x.png',
        submit: false,
        showModal: false,
        sampleData: null,
        sampleCode: null,
        proofPic: null,
        checkItems: null, //检验项目数组
        checkItemsDefault: ['选择检验项目'], //检验项目默认值
        showCheckList: [false], //检验项目列表控制器
        testConditions: [], //判断是否要检验值的数组
        testVal: [''],
        reagentDefault: ['请选择试剂'], //试剂默认值
        showReagent: [false], //试剂列表控制器
        reagentList: [], //试剂数组
        factoryDefault: [''],
        resultDefault: ['阴性'], //试剂默认值
        showResult: [false], //试剂列表控制器
        resultList: ['阴性', '阳性'], //试剂数组
        info: {}, //检验表信息
        pics: [], //拍照留证
        currentInput: [''], //检验说明
        inspectResult: null,
        reinspects: null,
        reserveds: null,
        reinspectText: '备检结果',
        reservedsText: '留样结果',
        reservedsHide: false,
        reservedsTip: '收起',
    },

    submit(e) {
        if (this.data.reinspects.length == 0) {
            let condition = this.data.resultDefault
            console.log(condition)
            let index = condition.indexOf('阳性')
            if (index != -1) {
                this.setData({
                    showModal: true
                })
            } else {
                console.log('无阳性，直接提交')
                let checkItemsJson = JSON.stringify(this.data.info.details)
                let postData = {
                    sampleCode: this.data.sampleCode,
                    checkItemsJson: checkItemsJson,
                    inspectType: 'REINSPECT'
                }
                apiSample.saveInspectedInfo(postData).then(res => {
                    if (res.code == 0) {
                        wx.showModal({
                            content: '备检成功',
                            showCancel: false,
                            success() {
                                wx.navigateBack({
                                    delta: 1
                                })
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
                console.log(postData)
            }
        } else {
            let condition = this.data.resultDefault
            console.log(condition)
            let index = condition.indexOf('阳性')
            if (index != -1) {
                this.setData({
                    showModal: true
                })
            } else {
                console.log('无阳性，直接提交')
                let checkItemsJson = JSON.stringify(this.data.info.details)
                let postData = {
                    sampleCode: this.data.sampleCode,
                    checkItemsJson: checkItemsJson,
                    inspectType: 'RESERVED'
                }
                apiSample.saveInspectedInfo(postData).then(res => {
                    if (res.code == 0) {
                        wx.showModal({
                            content: '留样成功',
                            showCancel: false,
                            success() {
                                wx.navigateBack({
                                    delta: 1
                                })
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
                console.log(postData)
            }
        }

    },
    deny: function() {
        this.setData({
            showModal: false
        })

    },
    approve: function() {
        this.setData({
            showModal: false
        })
        if (this.data.reinspects.length == 0) {
            let checkItemsJson = JSON.stringify(this.data.info.details)
            let postData = {
                sampleCode: this.data.sampleCode,
                checkItemsJson: checkItemsJson,
                inspectType: 'REINSPECT'
            }
            apiSample.saveInspectedInfo(postData).then(res => {
                if (res.code == 0) {
                    wx.showModal({
                        content: '备检成功',
                        showCancel: false,
                        success() {
                            wx.navigateBack({
                                delta: 1
                            })
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
            console.log(postData)
        } else {
            let checkItemsJson = JSON.stringify(this.data.info.details)
            let postData = {
                sampleCode: this.data.sampleCode,
                checkItemsJson: checkItemsJson,
                inspectType: 'RESERVED'
            }
            apiSample.saveInspectedInfo(postData).then(res => {
                if (res.code == 0) {
                    wx.showModal({
                        content: '留样成功',
                        showCancel: false,
                        success() {
                            wx.navigateBack({
                                delta: 1
                            })
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
            console.log(postData)
        }

    },
    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function(options) {
        let postCode = {
            code: options.code
        }
        console.log(postCode)
        let sampleData = null
        apiSample.getHandledResult(postCode).then(res => {
            console.log(res.data)
            sampleData = res.data
            if (sampleData.material) {
                let pics = sampleData.material.split(',')
                let picUrl = []
                for (let index in pics) {
                    picUrl.push("https://fastcheck.id-cas.cn/fastcheck/sambaFile.do?action=showImageById&id=" + pics[index])
                }
                this.setData({
                    proofPic: picUrl
                })
            }
            this.setData({
                sampleData: sampleData,
                sampleCode: sampleData.sampleCode
            })
            let postId = {
                sampleId: sampleData.id
            }
            apiAccount.getTestDetails(postId).then(res => {
                    console.log(res.data)
                    this.setData({
                        inspectResult: res.data.inspects,
                        reinspects: res.data.reinspects,
                        reserveds: res.data.reserveds
                    })
                })
                // 根据产品一级分类获取检验项目列表
            let productType = {
                businessProductTypeId: sampleData.businessProductDto.primaryTypeId
            }
            console.log(productType, '获取检验列表的传参')
            apiSample.getCheckItemAll(productType).then(res => {
                console.log(res)
                if (res.code == '-1') {
                    wx.showToast({
                        title: res.message,
                        icon: 'none'
                    })
                } else {
                    this.setData({
                        checkItems: res.data
                    })
                }
            })
        })
    },
    init: function() {
        let that = this;
        this.setData({
            info: new Info(),
        });
    },
    // 选择检验项目名字
    showList(e) {
        let index = parseInt(e.currentTarget.id.replace("show-", ""));
        let showCheckList = this.data.showCheckList
        showCheckList[index] = !showCheckList[index]
        this.setData({
            showCheckList: showCheckList
        })
        console.log(showCheckList)
    },
    getItem(e) {
        console.log(e)
        let index = parseInt(e.currentTarget.id.replace("item-", ""));
        let info = this.data.info
        info.details[index].checkItemId = e.currentTarget.dataset.info.id
        let postId = {
            checkItemId: info.details[index].checkItemId
        }
        console.log(postId, '获取试剂传入的项目id')
        apiSample.getReagentInfo(postId).then(res => {
                console.log(res, '获取试剂信息')
                let reagentList = this.data.reagentList
                reagentList[index] = res.data.rows
                this.setData({
                    reagentList: reagentList
                })
            })
            // 判断需不需要传检验值
        let testConditions = this.data.testConditions
        testConditions[index] = {
            hasParam: e.currentTarget.dataset.info.hasParam,
            paramValue: e.currentTarget.dataset.info.paramValue,
            paramUnit: e.currentTarget.dataset.info.paramUnit

        }
        this.setData({
            testConditions: testConditions
        })
        let checkItemsDefault = this.data.checkItemsDefault
        checkItemsDefault[index] = e.currentTarget.dataset.info.itemName
        let showCheckList = this.data.showCheckList
        showCheckList[index] = false
        this.setData({
            checkItemsDefault: checkItemsDefault, //替换显示的值
            showCheckList: showCheckList, //隐藏列表
            info: info //更新data
        })
        console.log(this.data.info)
        console.log(checkItemsDefault, showCheckList)


    },
    // 当hasParam为true
    getTestVal(e) {
        let value = e.detail.value
        let index = parseInt(e.currentTarget.id.replace("testVal-", ""));
        let info = this.data.info
        let paramValue = this.data.testConditions[index].paramValue
        if (value >= paramValue) {
            info.details[index].inspectResult = 'POSITIVE'
            info.details[index].inspectValue = value
            let resultDefault = this.data.resultDefault
            resultDefault[index] = '阳性'
            let testVal = this.data.testVal
            testVal[index] = value
            this.setData({
                resultDefault: resultDefault,
                info: info,
                testVal: testVal
            })
        } else {
            info.details[index].inspectResult = 'NEGATIVE'
            info.details[index].inspectValue = value
            let resultDefault = this.data.resultDefault
            resultDefault[index] = '阴性'
            let testVal = this.data.testVal
            testVal[index] = value
            this.setData({
                resultDefault: resultDefault,
                info: info,
                testVal: testVal
            })
        }

    },
    // 选择试剂
    showReagentList(e) {
        let index = parseInt(e.currentTarget.id.replace("show-", ""));
        if (this.data.reagentList[index].length == 0) {
            wx.showToast({
                title: '请先为检验项目关联试剂',
                icon: 'none'
            });
        } else {
            let showReagent = this.data.showReagent
            showReagent[index] = !showReagent[index]
            this.setData({
                showReagent: showReagent
            })
        }
        // let showReagent = this.data.showReagent
        // showReagent[index] = !showReagent[index]
        // this.setData({
        //     showReagent: showReagent
        // })
    },
    getReagent(e) {
        console.log(e)
        let index = parseInt(e.currentTarget.id.replace("reagent-", ""));
        let info = this.data.info
        info.details[index].reagentId = e.currentTarget.dataset.info.id
        let reagentDefault = this.data.reagentDefault
        let factoryDefault = this.data.factoryDefault
        let showReagent = this.data.showReagent
        reagentDefault[index] = e.currentTarget.dataset.info.reagentName
        factoryDefault[index] = e.currentTarget.dataset.info.factoryInfoDTO.factoryName
        showReagent[index] = false
        this.setData({
            reagentDefault: reagentDefault, //替换试剂显示的值
            factoryDefault: factoryDefault, //带出厂家
            showReagent: showReagent, //隐藏列表
            info: info //更新data
        })

    },
    // 选择检验结果
    showResult(e) {
        let index = parseInt(e.currentTarget.id.replace("show-", ""));
        let showResult = this.data.showResult
        showResult[index] = !showResult[index]
        this.setData({
            showResult: showResult
        })
    },
    getResult(e) {
        console.log(e)
        let index = parseInt(e.currentTarget.id.replace("result-", ""));
        let info = this.data.info
        console.log(e.currentTarget.dataset.info)
        if (this.data.checkItemsDefault[index] == '农残检测' && this.data.testVal[index] == '') {
            if (e.currentTarget.dataset.info == '阴性') {
                info.details[index].inspectResult = 'NEGATIVE'
                let resultDefault = this.data.resultDefault
                resultDefault[index] = e.currentTarget.dataset.info
                let showResult = this.data.showResult
                showResult[index] = false
                let testVal = this.data.testVal
                testVal[index] = 0
                this.setData({
                    resultDefault: resultDefault,
                    showResult: showResult,
                    info: info,
                    testVal: testVal
                })
            }
        }
        if (e.currentTarget.dataset.info == '阴性') {
            info.details[index].inspectResult = 'NEGATIVE'
            let resultDefault = this.data.resultDefault
            resultDefault[index] = e.currentTarget.dataset.info
            let showResult = this.data.showResult
            showResult[index] = false
            this.setData({
                resultDefault: resultDefault,
                showResult: showResult,
                info: info
            })
        } else {
            info.details[index].inspectResult = 'POSITIVE'
            let resultDefault = this.data.resultDefault
            resultDefault[index] = e.currentTarget.dataset.info
            let showResult = this.data.showResult
            showResult[index] = false
            this.setData({
                resultDefault: resultDefault,
                showResult: showResult,
                info: info
            })
        }

    },
    // 检验说明
    getInput: function(e) {
        let index = parseInt(e.currentTarget.id.replace("description-", ""));
        let info = this.data.info
        info.details[index].inspectMark = e.detail.value
        let currentInput = this.data.currentInput
        currentInput[index] = e.detail.value
        this.setData({
            currentInput: currentInput,
            info: info
        })
        console.log(info.details[index], '检验说明')
    },
    // 上传图片
    upload: function(e) {
        let index = parseInt(e.currentTarget.id.replace("pics-", ""));
        let that = this
        wx.chooseImage({
            count: 3,
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
                        let info = that.data.info
                        let index = parseInt(e.currentTarget.id.replace("pics-", ""));

                        if (info.details[index].inspectPic == "" || info.details[index].inspectPic == undefined) {
                            console.log('空数组')
                            info.details[index].inspectPic = JSON.stringify(data.id)
                        } else {
                            info.details[index].inspectPic += ',' + JSON.stringify(data.id)
                        }
                        that.setData({
                            info: info
                        })
                        console.log(info)
                    }

                })
                let pics = that.data.pics
                if (pics[index] == undefined) {
                    pics[index] = []
                    pics[index].push(tempFilePaths)
                    that.setData({
                        pics: pics
                    })
                } else {
                    pics[index].push(tempFilePaths)
                    that.setData({
                        pics: pics
                    })
                }
                console.log(pics)
            }
        })
    },
    //增加一个检验项目
    addItem: function(e) {
        let info = this.data.info;
        info.details.push(new Detail());
        this.setData({
            info: info
        });
    },
    //删除一个检验项目
    removeItem: function(e) {
        let info = this.data.info;
        info.details.pop();
        this.setData({
            info: info
        });
    },
    /**
     * Lifecycle function--Called when page is initially rendered
     */
    onReady: function() {
        this.init();
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