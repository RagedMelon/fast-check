import { SampleManagerModel } from '../../../models/inspection/sampleManager'
let apiSample = new SampleManagerModel();
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
        "inspectResult": "", //检验结果
        "inspectMark": "", //检验备注
        "inspectPic": "" //留证图片id
    }];
}

// function reinspectInfo() {
//     this.details = [{
//         "checkItemId": "", //检验项目id
//         "reagentId": "", //试剂id
//         "inspectValue": "", //检验值
//         // "inspectResult": "NEGATIVE", //检验结果
//         "inspectResult": "", //检验结果
//         "inspectMark": "", //检验备注
//         "inspectPic": "" //留证图片id
//     }];
// }
function reinspectInfo() {
    this.details = [];
}

// function reservedInfo() {
//     this.details = [{
//         "checkItemId": "", //检验项目id
//         "reagentId": "", //试剂id
//         "inspectValue": "", //检验值
//         // "inspectResult": "NEGATIVE", //检验结果
//         "inspectResult": "", //检验结果
//         "inspectMark": "", //检验备注
//         "inspectPic": "" //留证图片id
//     }];
// }
function reservedInfo() {
    this.details = [];
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
        showModal2: false,
        showModal3: false,
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
        resultDefault: ['输入检验值或手动选择'], //试剂默认值
        showResult: [false], //试剂列表控制器
        resultList: ['阴性', '阳性'], //试剂数组
        info: {}, //检验表信息
        pics: [], //拍照留证
        currentInput: [''], //检验说明,
        // 备检结果
        reinspectHide: true,
        reinspectTip: '展开',
        reinspectData: {},
        checkItemsDefault2: ['选择检验项目'], //检验项目默认值
        showCheckList2: [false], //检验项目列表控制器
        checkItems2: null, //检验项目数组
        testConditions2: [], //判断是否要检验值的数组
        testVal2: [''],
        reagentDefault2: ['请选择试剂'], //试剂默认值
        showReagent2: [false], //试剂列表控制器
        reagentList2: [], //试剂数组
        factoryDefault2: [''],
        resultDefault2: ['输入检验值或手动选择'], //试剂默认值
        showResult2: [false], //试剂列表控制器
        resultList2: ['阴性', '阳性'], //试剂数组
        reinspectPics: [], //备检拍照留证
        reinspectCurrentInput: [''], //备检说明,
        // 留样结果
        reservedHide: true,
        reservedTip: '展开',
        reservedData: {},
        checkItemsDefault3: ['选择检验项目'], //检验项目默认值
        showCheckList3: [false], //检验项目列表控制器
        checkItems3: null, //检验项目数组
        testConditions3: [], //判断是否要检验值的数组
        testVal3: [''],
        reagentDefault3: ['请选择试剂'], //试剂默认值
        showReagent3: [false], //试剂列表控制器
        reagentList3: [], //试剂数组
        factoryDefault3: [''],
        resultDefault3: ['输入检验值或手动选择'], //试剂默认值
        showResult3: [false], //试剂列表控制器
        resultList3: ['阴性', '阳性'], //试剂数组
        reservedPics: [], //留样拍照留证
        reservedCurrentInput: [''], //留样说明,
    },

    submit(e) {
        let condition = this.data.resultDefault
        let condition2 = this.data.resultDefault2
        let condition3 = this.data.resultDefault3
        let reinspectData = this.data.reinspectData
        let reservedData = this.data.reservedData
        console.log(condition, condition2)
        if (reinspectData.details.length == 0 && reservedData.details.length != 0) {
            wx.showModal({
                title: '不可提交',
                content: '请先提交备检信息',
                showCancel: false, //是否显示取消按钮
                confirmText: "确定", //默认是“确定”
            })
        }
        // 当只有检验信息时
        if (reinspectData.details.length == 0 && reservedData.details.length == 0) {
            console.log('当只有检验信息时')
            let index = condition.indexOf('阳性')
                // 检验信息有阳性时
            if (index != -1) {
                this.setData({
                    showModal: true
                })
            }
            // 检验信息无阳性
            else {
                console.log('检验信息无阳性')

                // 当检验信息为空时
                if (this.data.info.details.length == 0) {
                    wx.showModal({
                        title: '不可提交',
                        content: '样品信息为空',
                        showCancel: false, //是否显示取消按钮
                        confirmText: "确定", //默认是“确定”
                    })
                }
                // 当检验信息不为空 
                else {
                    console.log('无阳性，直接提交')
                    let checkItemsJson = JSON.stringify(this.data.info.details)
                    let postData = {
                        sampleCode: this.data.sampleCode,
                        checkItemsJson: checkItemsJson,
                        inspectType: 'INSPECT'
                    }
                    apiSample.saveInspectedInfo(postData).then(res => {
                        if (res.code == 0) {
                            wx.showModal({
                                content: '检验成功',
                                showCancel: false,
                                success() {
                                    let pages = getCurrentPages();
                                    let currPage = pages[pages.length - 1]; //当前页面
                                    let prevPage = pages[pages.length - 2]; //上一个页面
                                    let homePage = pages[pages.length - 3]; //往前两个页面
                                    if (prevPage.comeBack) {
                                        prevPage.comeBack()
                                        homePage.refreshList()
                                        console.log(prevPage.data, '上一页的数据')
                                        wx.navigateBack({
                                            delta: 1
                                        })
                                    } else {
                                        prevPage.refreshList()
                                        let success = 1
                                        wx.navigateTo({
                                            url: '/pagesInspection/pages/sampleManager/sampleManager?success=' + success,
                                        })
                                        console.log('这是从首页进来的')
                                    }

                                }
                            })
                        } else {
                            wx.showModal({
                                content: res.message,
                                showCancel: false,
                            })
                        }

                    })
                    console.log(postData)
                }

            }
        }
        // 当只有检验和备检信息
        else if (reinspectData.details.length != 0 && reservedData.details.length == 0) {
            console.log('当只有检验和备检信息')
            let index = condition.indexOf('阳性')
            let index2 = condition2.indexOf('阳性')
                // 检验信息有阳性时
            if (index != -1 || index2 != -1) {
                this.setData({
                    showModal2: true
                })
            }
            // 检验信息无阳性
            else {
                // 当检验信息为空时
                if (this.data.info.details.length == 0) {
                    wx.showModal({
                        title: '不可提交',
                        content: '样品信息为空',
                        showCancel: false, //是否显示取消按钮
                        confirmText: "确定", //默认是“确定”
                    })
                }
                // 当检验信息不为空 
                else {
                    console.log('无阳性，直接提交')
                    let checkItemsJson = JSON.stringify(this.data.info.details)
                    let postData = {
                        sampleCode: this.data.sampleCode,
                        checkItemsJson: checkItemsJson,
                        inspectType: 'INSPECT'
                    }
                    let checkItemsJson2 = JSON.stringify(this.data.reinspectData.details)
                    let postData2 = {
                        sampleCode: this.data.sampleCode,
                        checkItemsJson: checkItemsJson2,
                        inspectType: 'REINSPECT'
                    }
                    apiSample.saveInspectedInfo(postData).then(res => {
                        if (res.code == 0) {
                            apiSample.saveInspectedInfo(postData2).then(res => {
                                if (res.code == 0) {
                                    wx.showModal({
                                        content: '检验成功',
                                        showCancel: false,
                                        success() {
                                            let pages = getCurrentPages();
                                            let currPage = pages[pages.length - 1]; //当前页面
                                            let prevPage = pages[pages.length - 2]; //上一个页面
                                            let homePage = pages[pages.length - 3]; //往前两个页面
                                            if (prevPage.comeBack) {
                                                prevPage.comeBack()
                                                homePage.refreshList()
                                                console.log(prevPage.data, '上一页的数据')
                                                wx.navigateBack({
                                                    delta: 1
                                                })
                                            } else {
                                                prevPage.refreshList()
                                                let success = 1
                                                wx.navigateTo({
                                                    url: '/pagesInspection/pages/sampleManager/sampleManager?success=' + success,
                                                })
                                                console.log('这是从首页进来的')
                                            }

                                        }
                                    })
                                } else {
                                    wx.showModal({
                                        content: res.message,
                                        showCancel: false,
                                    })
                                }

                            })

                        } else {
                            wx.showModal({
                                content: res.message,
                                showCancel: false,
                            })
                        }

                    })
                    console.log(postData)
                }

            }
        }
        // 检验+备检+留样
        else if (reinspectData.details.length != 0 && reservedData.details.length != 0) {
            console.log('检验+备检+留样')
            let index = condition.indexOf('阳性')
            let index2 = condition2.indexOf('阳性')
            let index3 = condition3.indexOf('阳性')
                // 检验信息有阳性时
            if (index != -1 || index2 != -1 || index3 != -1) {
                this.setData({
                    showModal3: true
                })
            }
            // 检验信息无阳性
            else {
                // 当检验信息为空时
                if (this.data.info.details.length == 0) {
                    wx.showModal({
                        title: '不可提交',
                        content: '样品信息为空',
                        showCancel: false, //是否显示取消按钮
                        confirmText: "确定", //默认是“确定”
                    })
                }
                // 当检验信息不为空 
                else {
                    console.log('无阳性，直接提交')
                    let checkItemsJson = JSON.stringify(this.data.info.details)
                    let postData = {
                        sampleCode: this.data.sampleCode,
                        checkItemsJson: checkItemsJson,
                        inspectType: 'INSPECT'
                    }
                    let checkItemsJson2 = JSON.stringify(this.data.reinspectData.details)
                    let postData2 = {
                        sampleCode: this.data.sampleCode,
                        checkItemsJson: checkItemsJson2,
                        inspectType: 'REINSPECT'
                    }
                    let checkItemsJson3 = JSON.stringify(this.data.reservedData.details)
                    let postData3 = {
                        sampleCode: this.data.sampleCode,
                        checkItemsJson: checkItemsJson3,
                        inspectType: 'RESERVED'
                    }
                    apiSample.saveInspectedInfo(postData).then(res => {
                        if (res.code == 0) {
                            apiSample.saveInspectedInfo(postData2).then(res => {
                                if (res.code == 0) {
                                    apiSample.saveInspectedInfo(postData3).then(res => {
                                        if (res.code == 0) {
                                            wx.showModal({
                                                content: '检验成功',
                                                showCancel: false,
                                                success() {
                                                    let pages = getCurrentPages();
                                                    let currPage = pages[pages.length - 1]; //当前页面
                                                    let prevPage = pages[pages.length - 2]; //上一个页面
                                                    let homePage = pages[pages.length - 3]; //往前两个页面
                                                    if (prevPage.comeBack) {
                                                        prevPage.comeBack()
                                                        homePage.refreshList()
                                                        console.log(prevPage.data, '上一页的数据')
                                                        wx.navigateBack({
                                                            delta: 1
                                                        })
                                                    } else {
                                                        prevPage.refreshList()
                                                        let success = 1
                                                        wx.navigateTo({
                                                            url: '/pagesInspection/pages/sampleManager/sampleManager?success=' + success,
                                                        })
                                                        console.log('这是从首页进来的')
                                                    }

                                                }
                                            })
                                        } else {
                                            wx.showModal({
                                                content: res.message,
                                                showCancel: false,
                                            })
                                        }

                                    })
                                } else {
                                    wx.showModal({
                                        content: res.message,
                                        showCancel: false,
                                    })
                                }

                            })

                        } else {
                            wx.showModal({
                                content: res.message,
                                showCancel: false,
                            })
                        }

                    })
                    console.log(postData)
                }

            }
        }

    },
    // 检验的弹窗
    deny: function() {
        this.setData({
            showModal: false

        })

    },
    approve: function() {
        this.setData({
            showModal: false
        })
        let checkItemsJson = JSON.stringify(this.data.info.details)
        let postData = {
            sampleCode: this.data.sampleCode,
            checkItemsJson: checkItemsJson,
            inspectType: 'INSPECT'
        }
        apiSample.saveInspectedInfo(postData).then(res => {
            if (res.code == 0) {
                wx.showModal({
                    content: '检验成功',
                    showCancel: false,
                    success() {
                        let pages = getCurrentPages();
                        let currPage = pages[pages.length - 1]; //当前页面
                        let prevPage = pages[pages.length - 2]; //上一个页面
                        let homePage = pages[pages.length - 3]; //往前两个页面
                        if (prevPage.comeBack) {
                            prevPage.comeBack()
                            homePage.refreshList()
                            console.log(prevPage.data, '上一页的数据')
                            wx.navigateBack({
                                delta: 1
                            })
                        } else {
                            prevPage.refreshList()
                            let success = 1
                            wx.navigateTo({
                                url: '/pagesInspection/pages/sampleManager/sampleManager?success=' + success,
                            })
                            console.log('这是从首页进来的')
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
        console.log(postData)
    },
    // 备检的弹窗
    deny2: function() {
        this.setData({
            showModal2: false
        })

    },
    approve2: function() {
        this.setData({
            showModal2: false
        })
        let checkItemsJson = JSON.stringify(this.data.info.details)
        let postData = {
            sampleCode: this.data.sampleCode,
            checkItemsJson: checkItemsJson,
            inspectType: 'INSPECT'
        }
        let checkItemsJson2 = JSON.stringify(this.data.reinspectData.details)
        let postData2 = {
            sampleCode: this.data.sampleCode,
            checkItemsJson: checkItemsJson2,
            inspectType: 'REINSPECT'
        }
        apiSample.saveInspectedInfo(postData).then(res => {
            if (res.code == 0) {
                apiSample.saveInspectedInfo(postData2).then(res => {
                    if (res.code == 0) {
                        wx.showModal({
                            content: '检验成功',
                            showCancel: false,
                            success() {
                                let pages = getCurrentPages();
                                let currPage = pages[pages.length - 1]; //当前页面
                                let prevPage = pages[pages.length - 2]; //上一个页面
                                let homePage = pages[pages.length - 3]; //往前两个页面
                                if (prevPage.comeBack) {
                                    prevPage.comeBack()
                                    homePage.refreshList()
                                    console.log(prevPage.data, '上一页的数据')
                                    wx.navigateBack({
                                        delta: 1
                                    })
                                } else {
                                    prevPage.refreshList()
                                    let success = 1
                                    wx.navigateTo({
                                        url: '/pagesInspection/pages/sampleManager/sampleManager?success=' + success,
                                    })
                                    console.log('这是从首页进来的')
                                }

                            }
                        })
                    } else {
                        wx.showModal({
                            content: res.message,
                            showCancel: false,
                        })
                    }

                })

            } else {
                wx.showModal({
                    content: res.message,
                    showCancel: false,
                })
            }

        })
        console.log(postData)
    },
    // 留样的弹窗
    deny3: function() {
        this.setData({
            showModal3: false
        })

    },
    approve3: function() {
        this.setData({
            showModal3: false
        })
        let checkItemsJson = JSON.stringify(this.data.info.details)
        let postData = {
            sampleCode: this.data.sampleCode,
            checkItemsJson: checkItemsJson,
            inspectType: 'INSPECT'
        }
        let checkItemsJson2 = JSON.stringify(this.data.reinspectData.details)
        let postData2 = {
            sampleCode: this.data.sampleCode,
            checkItemsJson: checkItemsJson2,
            inspectType: 'REINSPECT'
        }
        let checkItemsJson3 = JSON.stringify(this.data.reservedData.details)
        let postData3 = {
            sampleCode: this.data.sampleCode,
            checkItemsJson: checkItemsJson3,
            inspectType: 'RESERVED'
        }
        apiSample.saveInspectedInfo(postData).then(res => {
            if (res.code == 0) {
                apiSample.saveInspectedInfo(postData2).then(res => {
                    if (res.code == 0) {
                        apiSample.saveInspectedInfo(postData3).then(res => {
                            if (res.code == 0) {
                                wx.showModal({
                                    content: '检验成功',
                                    showCancel: false,
                                    success() {
                                        let pages = getCurrentPages();
                                        let currPage = pages[pages.length - 1]; //当前页面
                                        let prevPage = pages[pages.length - 2]; //上一个页面
                                        let homePage = pages[pages.length - 3]; //往前两个页面
                                        if (prevPage.comeBack) {
                                            prevPage.comeBack()
                                            homePage.refreshList()
                                            console.log(prevPage.data, '上一页的数据')
                                            wx.navigateBack({
                                                delta: 1
                                            })
                                        } else {
                                            prevPage.refreshList()
                                            let success = 1
                                            wx.navigateTo({
                                                url: '/pagesInspection/pages/sampleManager/sampleManager?success=' + success,
                                            })
                                            console.log('这是从首页进来的')
                                        }

                                    }
                                })
                            } else {
                                wx.showModal({
                                    content: res.message,
                                    showCancel: false,
                                })
                            }

                        })
                    } else {
                        wx.showModal({
                            content: res.message,
                            showCancel: false,
                        })
                    }

                })

            } else {
                wx.showModal({
                    content: res.message,
                    showCancel: false,
                })
            }

        })
        console.log(postData)
    },
    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function(options) {
        // console.log(options.dataObj)
        let sampleData = JSON.parse(options.dataObj)
        console.log(sampleData, '数据')
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
        let productType = {
            businessProductTypeId: sampleData.businessProductDto.primaryTypeId
        }
        console.log(productType, '获取检验列表的传参')
        apiSample.getCheckItemAll(productType).then(res => {
            console.log(res)
            if (res == null) {
                wx.showToast({
                    title: '该一级分类无检验项目',
                    icon: 'none'
                })
            } else if (res.code == '-1') {
                wx.showToast({
                    title: res.message,
                    icon: 'none'
                })
            } else {
                this.setData({
                    checkItems: res.data,
                    checkItems2: res.data,
                    checkItems3: res.data
                })
            }

        })

    },
    init: function() {
        let that = this;
        this.setData({
            info: new Info(),
            reinspectData: new reinspectInfo(),
            reservedData: new reservedInfo()
        });
    },
    // 检验:展开检验项目下拉菜单
    showList(e) {
        let index = parseInt(e.currentTarget.id.replace("show-", ""));
        let showCheckList = this.data.showCheckList
        showCheckList[index] = !showCheckList[index]
        this.setData({
            showCheckList: showCheckList
        })
        console.log(showCheckList)
    },
    // 备检:展开检验项目下拉菜单
    showList2(e) {
        let index = parseInt(e.currentTarget.id.replace("show-", ""));
        let showCheckList2 = this.data.showCheckList2
        showCheckList2[index] = !showCheckList2[index]
        this.setData({
            showCheckList2: showCheckList2
        })
        console.log(showCheckList2, '备检项目列表')
    },
    // 留样:展开检验项目下拉菜单
    showList3(e) {
        let index = parseInt(e.currentTarget.id.replace("show-", ""));
        let showCheckList3 = this.data.showCheckList3
        showCheckList3[index] = !showCheckList3[index]
        this.setData({
            showCheckList3: showCheckList3
        })
        console.log(showCheckList3, '备检项目列表')
    },
    // 检验:选择检验项目
    getItem(e) {
        console.log(e)
        let index = parseInt(e.currentTarget.id.replace("item-", ""));
        let info = this.data.info
        info.details[index].checkItemId = e.currentTarget.dataset.info.id
        let postId = {
            checkItemId: info.details[index].checkItemId
        }
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
    // 备检:选择检验项目
    getItem2(e) {
        console.log(e)
        let index = parseInt(e.currentTarget.id.replace("item-", ""));
        let reinspectData = this.data.reinspectData
        reinspectData.details[index].checkItemId = e.currentTarget.dataset.info.id
        let postId = {
            checkItemId: reinspectData.details[index].checkItemId
        }
        apiSample.getReagentInfo(postId).then(res => {
                console.log(res, '获取备检试剂信息')
                let reagentList2 = this.data.reagentList
                reagentList2[index] = res.data.rows
                this.setData({
                    reagentList2: reagentList2
                })
            })
            // 判断需不需要传检验值
        let testConditions2 = this.data.testConditions2
        testConditions2[index] = {
            hasParam: e.currentTarget.dataset.info.hasParam,
            paramValue: e.currentTarget.dataset.info.paramValue,
            paramUnit: e.currentTarget.dataset.info.paramUnit

        }
        this.setData({
            testConditions2: testConditions2
        })
        let checkItemsDefault2 = this.data.checkItemsDefault2
        checkItemsDefault2[index] = e.currentTarget.dataset.info.itemName
        let showCheckList2 = this.data.showCheckList2
        showCheckList2[index] = false
        this.setData({
            checkItemsDefault2: checkItemsDefault2, //替换显示的值
            showCheckList2: showCheckList2, //隐藏列表
            reinspectData: reinspectData //更新data
        })
        console.log(this.data.reinspectData, '选择项目后的备检数据')
        console.log(checkItemsDefault2, showCheckList2)


    },
    // 备检:选择检验项目
    getItem3(e) {
        console.log(e)
        let index = parseInt(e.currentTarget.id.replace("item-", ""));
        let reservedData = this.data.reservedData
        reservedData.details[index].checkItemId = e.currentTarget.dataset.info.id
        let postId = {
            checkItemId: reservedData.details[index].checkItemId
        }
        apiSample.getReagentInfo(postId).then(res => {
                console.log(res, '获取备检试剂信息')
                let reagentList3 = this.data.reagentList
                reagentList3[index] = res.data.rows
                this.setData({
                    reagentList3: reagentList3
                })
            })
            // 判断需不需要传检验值
        let testConditions3 = this.data.testConditions3
        testConditions3[index] = {
            hasParam: e.currentTarget.dataset.info.hasParam,
            paramValue: e.currentTarget.dataset.info.paramValue,
            paramUnit: e.currentTarget.dataset.info.paramUnit

        }
        this.setData({
            testConditions3: testConditions3
        })
        let checkItemsDefault3 = this.data.checkItemsDefault3
        checkItemsDefault3[index] = e.currentTarget.dataset.info.itemName
        let showCheckList3 = this.data.showCheckList3
        showCheckList3[index] = false
        this.setData({
            checkItemsDefault3: checkItemsDefault3, //替换显示的值
            showCheckList3: showCheckList3, //隐藏列表
            reservedData: reservedData //更新data
        })
        console.log(this.data.reservedData, '选择项目后的备检数据')
        console.log(checkItemsDefault3, showCheckList3)
    },
    // 检验:当hasParam为true
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
    // 备检：当hasParam为true
    getTestVal2(e) {
        let value = e.detail.value
        let index = parseInt(e.currentTarget.id.replace("testVal-", ""));
        let reinspectData = this.data.reinspectData
        let paramValue = this.data.testConditions2[index].paramValue
        if (value >= paramValue) {
            reinspectData.details[index].inspectResult = 'POSITIVE'
            reinspectData.details[index].inspectValue = value
            let resultDefault2 = this.data.resultDefault2
            resultDefault2[index] = '阳性'
            let testVal2 = this.data.testVal2
            testVal2[index] = value
            this.setData({
                resultDefault2: resultDefault2,
                reinspectData: reinspectData,
                testVal2: testVal2
            })
        } else {
            reinspectData.details[index].inspectResult = 'NEGATIVE'
            reinspectData.details[index].inspectValue = value
            let resultDefault2 = this.data.resultDefault2
            resultDefault2[index] = '阴性'
            let testVal2 = this.data.testVal2
            testVal2[index] = value
            this.setData({
                resultDefault2: resultDefault2,
                reinspectData: reinspectData,
                testVal2: testVal2
            })
        }

    },
    // 留样：当hasParam为true
    getTestVal3(e) {
        let value = e.detail.value
        let index = parseInt(e.currentTarget.id.replace("testVal-", ""));
        let reservedData = this.data.reservedData
        let paramValue = this.data.testConditions3[index].paramValue
        if (value >= paramValue) {
            reservedData.details[index].inspectResult = 'POSITIVE'
            reservedData.details[index].inspectValue = value
            let resultDefault3 = this.data.resultDefault3
            resultDefault3[index] = '阳性'
            let testVal3 = this.data.testVal3
            testVal3[index] = value
            this.setData({
                resultDefault3: resultDefault3,
                reservedData: reservedData,
                testVal3: testVal3
            })
        } else {
            reservedData.details[index].inspectResult = 'NEGATIVE'
            reservedData.details[index].inspectValue = value
            let resultDefault3 = this.data.resultDefault3
            resultDefault3[index] = '阴性'
            let testVal3 = this.data.testVal3
            testVal3[index] = value
            this.setData({
                resultDefault3: resultDefault3,
                reservedData: reservedData,
                testVal3: testVal3
            })
        }

    },
    // 检验:展开试剂下拉菜单
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

    },
    // 备检:展开试剂下拉菜单
    showReagentList2(e) {
        let index = parseInt(e.currentTarget.id.replace("show-", ""));
        if (this.data.reagentList2[index].length == 0) {
            wx.showToast({
                title: '请先为检验项目关联试剂',
                icon: 'none'
            });
        } else {
            let showReagent2 = this.data.showReagent2
            showReagent2[index] = !showReagent2[index]
            this.setData({
                showReagent2: showReagent2
            })
        }

    },
    // 留样:展开试剂下拉菜单
    showReagentList3(e) {
        let index = parseInt(e.currentTarget.id.replace("show-", ""));
        if (this.data.reagentList3[index].length == 0) {
            wx.showToast({
                title: '请先为检验项目关联试剂',
                icon: 'none'
            });
        } else {
            let showReagent3 = this.data.showReagent3
            showReagent3[index] = !showReagent3[index]
            this.setData({
                showReagent3: showReagent3
            })
        }

    },
    // 检验:选择试剂
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
    // 备检:选择试剂
    getReagent2(e) {
        console.log(e)
        let index = parseInt(e.currentTarget.id.replace("reagent-", ""));
        let reinspectData = this.data.reinspectData
        reinspectData.details[index].reagentId = e.currentTarget.dataset.info.id
        let reagentDefault2 = this.data.reagentDefault2
        let factoryDefault2 = this.data.factoryDefault2
        let showReagent2 = this.data.showReagent2
        reagentDefault2[index] = e.currentTarget.dataset.info.reagentName
        factoryDefault2[index] = e.currentTarget.dataset.info.factoryInfoDTO.factoryName
        showReagent2[index] = false
        this.setData({
            reagentDefault2: reagentDefault2, //替换试剂显示的值
            factoryDefault2: factoryDefault2, //带出厂家
            showReagent2: showReagent2, //隐藏列表
            reinspectData: reinspectData //更新data
        })

    },
    // 留样:选择试剂
    getReagent3(e) {
        console.log(e)
        let index = parseInt(e.currentTarget.id.replace("reagent-", ""));
        let reservedData = this.data.reservedData
        reservedData.details[index].reagentId = e.currentTarget.dataset.info.id
        let reagentDefault3 = this.data.reagentDefault3
        let factoryDefault3 = this.data.factoryDefault3
        let showReagent3 = this.data.showReagent2
        reagentDefault3[index] = e.currentTarget.dataset.info.reagentName
        factoryDefault3[index] = e.currentTarget.dataset.info.factoryInfoDTO.factoryName
        showReagent3[index] = false
        this.setData({
            reagentDefault3: reagentDefault3, //替换试剂显示的值
            factoryDefault3: factoryDefault3, //带出厂家
            showReagent3: showReagent3, //隐藏列表
            reservedData: reservedData //更新data
        })

    },
    // 检验:展开检验结果
    showResult(e) {
        let index = parseInt(e.currentTarget.id.replace("show-", ""));
        let showResult = this.data.showResult
        showResult[index] = !showResult[index]
        this.setData({
            showResult: showResult
        })
    },
    // 备检:展开检验结果
    showResult2(e) {
        let index = parseInt(e.currentTarget.id.replace("show-", ""));
        let showResult2 = this.data.showResult2
        showResult2[index] = !showResult2[index]
        this.setData({
            showResult2: showResult2
        })
    },
    // 留样:展开检验结果
    showResult3(e) {
        let index = parseInt(e.currentTarget.id.replace("show-", ""));
        let showResult3 = this.data.showResult3
        showResult3[index] = !showResult3[index]
        this.setData({
            showResult3: showResult3
        })
    },
    // 检验:选择检验结果
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
    // 备检:选择检验结果
    getResult2(e) {
        console.log(e)
        let index = parseInt(e.currentTarget.id.replace("result-", ""));
        let reinspectData = this.data.reinspectData
        console.log(e.currentTarget.dataset.info)
        if (e.currentTarget.dataset.info == '阴性') {
            reinspectData.details[index].inspectResult = 'NEGATIVE'
            let resultDefault2 = this.data.resultDefault2
            resultDefault2[index] = e.currentTarget.dataset.info
            let showResult2 = this.data.showResult2
            showResult2[index] = false
            this.setData({
                resultDefault2: resultDefault2,
                showResult2: showResult2,
                reinspectData: reinspectData
            })
        } else {
            reinspectData.details[index].inspectResult = 'POSITIVE'
            let resultDefault2 = this.data.resultDefault2
            resultDefault2[index] = e.currentTarget.dataset.info
            let showResult2 = this.data.showResult2
            showResult2[index] = false
            this.setData({
                resultDefault2: resultDefault2,
                showResult2: showResult2,
                reinspectData: reinspectData
            })
        }
        console.log(this.data.reinspectData, '选择检验结果后的备检数据')
    },
    // 留样:选择检验结果
    getResult3(e) {
        console.log(e)
        let index = parseInt(e.currentTarget.id.replace("result-", ""));
        let reservedData = this.data.reservedData
        console.log(e.currentTarget.dataset.info)
        if (e.currentTarget.dataset.info == '阴性') {
            reservedData.details[index].inspectResult = 'NEGATIVE'
            let resultDefault3 = this.data.resultDefault3
            resultDefault3[index] = e.currentTarget.dataset.info
            let showResult3 = this.data.showResult3
            showResult3[index] = false
            this.setData({
                resultDefault3: resultDefault3,
                showResult3: showResult3,
                reservedData: reservedData
            })
        } else {
            reservedData.details[index].inspectResult = 'POSITIVE'
            let resultDefault3 = this.data.resultDefault3
            resultDefault3[index] = e.currentTarget.dataset.info
            let showResult3 = this.data.showResult3
            showResult3[index] = false
            this.setData({
                resultDefault3: resultDefault3,
                showResult3: showResult3,
                reservedData: reservedData
            })
        }
        console.log(this.data.reservedData, '选择检验结果后的备检数据')
    },
    // 检验:检验说明
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
    // 备检:检验说明
    getInput2: function(e) {
        let index = parseInt(e.currentTarget.id.replace("description-", ""));
        let reinspectData = this.data.reinspectData
        reinspectData.details[index].inspectMark = e.detail.value
        let reinspectCurrentInput = this.data.reinspectCurrentInput
        reinspectCurrentInput[index] = e.detail.value
        this.setData({
                reinspectCurrentInput: reinspectCurrentInput,
                reinspectData: reinspectData
            })
            // console.log(info.details[index], '检验说明')
        console.log(this.data.reinspectData, '填完检验说明后的的备检数据')

    },
    // 留样:检验说明
    getInput3: function(e) {
        let index = parseInt(e.currentTarget.id.replace("description-", ""));
        let reservedData = this.data.reservedData
        reservedData.details[index].inspectMark = e.detail.value
        let reservedCurrentInput = this.data.reservedCurrentInput
        reservedCurrentInput[index] = e.detail.value
        this.setData({
                reservedCurrentInput: reservedCurrentInput,
                reservedData: reservedData
            })
            // console.log(info.details[index], '检验说明')
        console.log(this.data.reservedData, '填完检验说明后的的备检数据')

    },
    // 检验:上传图片
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
                        console.log(res.data)
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
    // 备验:上传图片
    upload2: function(e) {
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
                        let reinspectData = that.data.reinspectData
                        let index = parseInt(e.currentTarget.id.replace("pics-", ""));

                        if (reinspectData.details[index].inspectPic == "" || reinspectData.details[index].inspectPic == undefined) {
                            console.log('照片数组为空')
                            reinspectData.details[index].inspectPic = JSON.stringify(data.id)
                        } else {
                            reinspectData.details[index].inspectPic += ',' + JSON.stringify(data.id)
                        }
                        that.setData({
                            reinspectData: reinspectData
                        })
                        console.log(reinspectData)
                    }

                })
                let reinspectPics = that.data.reinspectPics
                if (reinspectPics[index] == undefined) {
                    reinspectPics[index] = []
                    reinspectPics[index].push(tempFilePaths)
                    that.setData({
                        reinspectPics: reinspectPics
                    })
                } else {
                    reinspectPics[index].push(tempFilePaths)
                    that.setData({
                        reinspectPics: reinspectPics
                    })
                }
                console.log(reinspectPics)
            }
        })
    },
    // 留样:上传图片
    upload3: function(e) {
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
                        let reservedData = that.data.reservedData
                        let index = parseInt(e.currentTarget.id.replace("pics-", ""));

                        if (reservedData.details[index].inspectPic == "" || reservedData.details[index].inspectPic == undefined) {
                            console.log('照片数组为空')
                            reservedData.details[index].inspectPic = JSON.stringify(data.id)
                        } else {
                            reservedData.details[index].inspectPic += ',' + JSON.stringify(data.id)
                        }
                        that.setData({
                            reservedData: reservedData
                        })
                        console.log(reservedData)
                    }

                })
                let reservedPics = that.data.reservedPics
                if (reservedPics[index] == undefined) {
                    reservedPics[index] = []
                    reservedPics[index].push(tempFilePaths)
                    that.setData({
                        reservedPics: reservedPics
                    })
                } else {
                    reservedPics[index].push(tempFilePaths)
                    that.setData({
                        reservedPics: reservedPics
                    })
                }
                console.log(reservedPics)
            }
        })
    },
    //检验:增加一个检验项目
    addItem: function(e) {
        let info = this.data.info;
        info.details.push(new Detail());
        this.setData({
            info: info
        });
    },
    //备检:增加一个检验项目
    addItem2: function(e) {
        let reinspectData = this.data.reinspectData;
        reinspectData.details.push(new Detail());
        this.setData({
            reinspectData: reinspectData
        });
        console.log(this.data.reinspectData)
    },
    //留样:增加一个检验项目
    addItem3: function(e) {
        let reservedData = this.data.reservedData;
        reservedData.details.push(new Detail());
        this.setData({
            reservedData: reservedData
        });
        console.log(this.data.reservedData)
    },
    //检验:删除一个检验项目
    removeItem: function(e) {
        let info = this.data.info;
        info.details.pop();
        this.setData({
            info: info
        });
    },
    //备检:删除一个检验项目
    removeItem2: function(e) {
        let reinspectData = this.data.reinspectData;
        reinspectData.details.pop();
        this.setData({
            reinspectData: reinspectData
        });
    },
    //留样:删除一个检验项目
    removeItem3: function(e) {
        let reservedData = this.data.reservedData;
        reservedData.details.pop();
        this.setData({
            reservedData: reservedData
        });
    },
    // 备检结果展开收起
    reinspectHide() {
        this.setData({
            reinspectHide: !this.data.reinspectHide,
        })
        if (this.data.reinspectTip == "展开") {
            this.setData({
                reinspectTip: "收起"
            })
        } else {
            this.setData({
                reinspectTip: "展开"
            })
        }
    },
    // 留样结果展开收起
    reservedHide() {
        this.setData({
            reservedHide: !this.data.reservedHide,
        })
        if (this.data.reservedTip == "展开") {
            this.setData({
                reservedTip: "收起"
            })
        } else {
            this.setData({
                reservedTip: "展开"
            })
        }
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