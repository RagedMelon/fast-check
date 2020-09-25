const util = require('../../../utils/util.js')
import { TaskModel } from '../../../models/collect/task'
let apiTask = new TaskModel();
// pagesCollect/pages/randomTest/randomTest.js

/**
 * Detail类 构造函数 
 * @param id 采样主键id
 * @param inDate 进货日期
 * @param  place 产地
 * @param supplier 供应商
 * @param sampleCode 采样码
 * @param businessProductId 商品id
 * @param material 照片id-多张用,号隔开
 * @param sampleDate 采样时间
 
 */
function Detail(id, inDate, place, supplier, samlpeCode, businessProductId, material, sampleDate) {
    this.id = id,
        this.inDate = inDate,
        this.place = place,
        this.supplier = supplier,
        this.samlpeCode = samlpeCode,
        this.businessProductId = businessProductId,
        this.material = material,
        this.sampleDate = sampleDate

}


function Info() {
    this.details = [{
        "id": '', //采样主键id
        "inDate": '', //进货日期
        "place": '', //产地
        "supplier": '', //供应商
        "sampleCode": '', //采样码
        "businessProductId": '', //商品id
        "material": "", //照片id-多张用,号隔开
        "sampleDate": "2020-08-20 15:23:21" //采样时间
    }];
}
Page({

    /**
     * Page initial data
     */
    data: {

        text: '关联任务',
        url: '../../../images/collect/icon_associated_green@2x.png',
        text2: '样品采样信息',
        url2: '../../../images/collect/icon_sample_yellow@2x.png',
        // taskList: null,
        taskList: [], //任务列表
        taskTotal: 0, //任务总数
        taskPages: 0, //任务总页数
        taskIndex: 1, //任务当前页 
        taskNoData: false, // 任务 true 显示 false 不显示
        titleList: null,
        boothCodeList: null,
        // 关联任务
        default: '请选择任务',
        tasks: ['task1', 'task2', 'task3', 'task4'],
        show: false,
        chosenTask: '',
        shopNum: '请选择任务', //任务编号
        taskId: null,

        // 样品采样信息
        code: '', //样品码
        date: '2020-01-01',
        change: false,
        sampleName: null,
        searchResult: null,
        inputName: null,
        nameIndex: null,
        showResult: false,
        boothId: null,
        // 动态添加采样信息
        info: {},
        nameList: [],
        showSearch: [],
        searchList: [],
        selectedName: [],
        sampleCode: [],
        pics: [],
        businessmanId: null, //商户id
        marketId: null, //市场id

    },
    // 动态添加采样信息
    init: function() {
        let that = this;
        this.setData({
            info: new Info(),
        });
    },
    //增加一个检验项目
    addItem: function(e) {
        let info = this.data.info;
        console.log(this.data.info)
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
    // 任务标题选择
    showList() {
        this.setData({
            show: !this.data.show,
        })
    },
    selected(e) {
        console.log(e)
        console.log(e.currentTarget.dataset)
        console.log(this.data.show)
        let chosen = e.currentTarget.dataset.name
        let i = e.currentTarget.dataset.index
        let list = this.data.taskList
        this.setData({
            default: chosen,
            show: false,
            chosenTask: chosen,
            shopNum: list[i].missionCode,
            taskId: e.currentTarget.dataset.id
        })
        console.log(this.data.show)
    },
    getLists(id) {
        var _this = this;
        wx.showLoading({
            title: '加载中...',
        })
        const data = {
            allowPaging: true,
            pageIndex: _this.data.taskIndex,
            pageSize: 10
        };
        console.info("第" + _this.data.taskIndex + "页")
        let postData = {
            rp: 10,
            page: _this.data.taskIndex,
            isComplete: false,
            marketId: id
        }
        console.log(postData, '传入的参数')
        apiTask.certainMarketTask(postData).then(res => {
            wx.hideLoading()
            let Result = res.data.rows
            console.log(Result)
            console.log(res)
                // 响应无数据 则提示无数据
            if (_this.data.taskIndex == 1 && Result.length == 0) {
                _this.setData({
                    taskNoData: true
                })
            }
            if (Result.length) {
                _this.data.taskTotal = res.data.records
                _this.data.taskPages = res.data.total
                let taskListTemp = [];
                if (_this.data.taskIndex > 1) {
                    taskListTemp = _this.data.taskList.concat(Result);
                    _this.setData({
                        searchLoading: true, //"正在载入更多"显示
                    });
                } else {
                    taskListTemp = Result;
                }

                _this.setData({
                    taskList: taskListTemp, //获取数据数组
                    noData: false //“没有数据”隐藏
                });
            }
        }).catch((errMsg) => {
            console.log(errMsg);
            wx.hideLoading()
        });
    },
    // 滚动至低端事件
    ScrollLower: function() {
        var _this = this;
        console.info("ScrollLower 第" + _this.data.taskIndex + "页")

        if (_this.data.taskIndex < _this.data.taskPages) {
            _this.setData({
                taskIndex: _this.data.taskIndex + 1, //每次触发触底事件，把taskIndex+1
            });
            _this.getLists(_this.data.marketId);
        } else if (_this.data.taskIndex == _this.data.taskPages) {
            _this.setData({
                searchLoadingComplete: true, //“已加载全部”显示
                searchLoading: false, //"正在载入更多"隐藏
            });
        }
    },
    // 填写样品名称
    bindSampleName: function(e) {
        let index = parseInt(e.currentTarget.id.replace("name-", ""));
        let name = e.detail.value
        let nameList = this.data.nameList
        nameList[index] = name
        this.setData({
            nameList: nameList
        })
        console.log(this.data.nameList, '输入下标为' + index + '的样品名称')
        let that = this
        let postString = {
            productName: e.detail.value
        }
        apiTask.getProductList(postString).then(res => {
            console.log(res, '搜索样品名称')
            let searchList = that.data.searchList
            searchList[index] = res.data.rows
            let showSearch = that.data.showSearch
            showSearch[index] = true
            that.setData({
                    searchList: searchList,
                    showSearch: showSearch
                })
                // console.log(that.data.show)
        })

    },
    // 选择样品名称
    chooseProductName(event) {
        // console.log(event.currentTarget.dataset)
        let i = event.currentTarget.dataset.index //选择的下标
        let fi = event.currentTarget.dataset.coindex //整个表单的下标
        let nameList = this.data.nameList
        nameList[fi] = event.currentTarget.dataset.name
        let showSearch = this.data.showSearch
        showSearch[fi] = false
            // 获取商品的Id
        let searchList = this.data.searchList
        let productId = searchList[fi][i].id
        let info = this.data.info
        info.details[fi].businessProductId = productId
            // console.log(searchList[fi][i])
        this.setData({
            nameList: nameList,
            showSearch: showSearch,
            info: info
        })
        console.log(this.data.info)

        let postData = {
            boothId: this.data.boothId,
            businessProductId: productId
        }
        let that = this
        apiTask.getRecentFill(postData).then(res => {
            console.log(res.data, '最近填的信息')
            if (res.data != undefined) {
                let info = this.data.info
                info.details[fi].inDate = res.data.inDate
                info.details[fi].place = res.data.place
                info.details[fi].supplier = res.data.supplier
                that.setData({
                    info: info
                })
            }

        })
    },
    // 样品码扫码
    scan: function(e) {
        console.log(e.currentTarget)
        let index = parseInt(e.currentTarget.id.replace("code-", ""));
        let that = this
        wx.scanCode({
            success(res) {
                let info = that.data.info
                info.details[index].sampleCode = res.result
                that.setData({
                    info: info
                })
                console.log(info, '扫码成功')
            }
        })
    },
    // 进货日期变动
    bindDateChange: function(e) {
        // console.log('picker发送选择改变，携带值为', e.detail.value, e.currentTarget)
        let index = parseInt(e.currentTarget.id.replace("inDate-", ""));
        let info = this.data.info
        info.details[index].inDate = e.detail.value
        this.setData({
            info: info
        })
    },
    // 填写样品产地
    bindPlace: function(e) {
        // console.log(e.currentTarget, e.detail.value)
        let index = parseInt(e.currentTarget.id.replace("place-", ""));
        let info = this.data.info
        info.details[index].place = e.detail.value
        this.setData({
            info: info
        })
        console.log(this.data.info)


    },

    // 填写供应商
    bindSupplier: function(e) {
        // console.log(e.currentTarget, e.detail.value)
        let index = parseInt(e.currentTarget.id.replace("supplier-", ""));
        let info = this.data.info
        info.details[index].supplier = e.detail.value
        this.setData({
            info: info
        })
    },
    // 上传证明材料
    upload: function(e) {
        let index = parseInt(e.currentTarget.id.replace("pic-", ""));
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
                        console.log(info.details[index].material)
                        let groups = info.details[index].material
                        if (info.details[index].material == '') {
                            console.log('空数组')
                            info.details[index].material += JSON.stringify(data.id)
                        } else {
                            info.details[index].material += ',' + JSON.stringify(data.id)
                        }
                        console.log(info.details[index])
                        that.setData({
                            info: info
                        })
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

                // console.log(pics[index])

            }
        })
    },
    // 提交按钮
    submit() {
        let productInfo = JSON.stringify(this.data.info.details)
        console.log(this.data.info.details)
        let boothId = this.data.boothId
        let missionId = this.data.taskId.id || this.data.taskId
        let businessmanId = this.data.businessmanId
        if (productInfo == "[]") {
            wx.showModal({
                title: '不可提交',
                content: '样品信息为空',
                showCancel: false, //是否显示取消按钮
                confirmText: "确定", //默认是“确定”
            })
        } else {
            let postData = {
                saveType: 1,
                missionId: missionId,
                boothInfoId: boothId,
                businessmanId: businessmanId,
                sampleProductJson: productInfo
            }
            console.log(postData)
            apiTask.submitBtn(postData).then(res => {
                console.log(res)
                if (res.code == 0) {
                    wx.showModal({
                        content: '提交成功',
                        showCancel: false,
                        success() {
                            let pages = getCurrentPages();
                            // 从任务管理进入
                            let currPage = pages[pages.length - 1]; //randomtest
                            let prevPage = pages[pages.length - 5]; //taskManager
                            // 从首页进入
                            let prev5Page = pages[pages.length - 5]; //index
                            prevPage.refreshList()
                            wx.navigateBack({
                                delta: 2
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
        }

    },
    // 草稿按钮
    draft() {
        let productInfo = JSON.stringify(this.data.info.details)
        console.log(this.data.info.details)
        let boothId = this.data.boothId
        let missionId = this.data.taskId.id || this.data.taskId
        let businessmanId = this.data.businessmanId
        let postData = {
            saveType: 0,
            missionId: missionId,
            boothInfoId: boothId,
            businessmanId: businessmanId,
            sampleProductJson: productInfo
        }
        console.log(postData)
        apiTask.draftBtn(postData).then(res => {
            console.log(res)
            if (res.code == 0) {
                wx.showModal({
                    content: '提交草稿成功',
                    showCancel: false,
                    success() {
                        wx.navigateBack({
                            delta: 2
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
    },
    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function(options) {
        this.init()
        parseInt()
        this.setData({
            marketId: options.marketId
        })
        this.getLists(parseInt(options.marketId))
        let myDate = new Date();
        let currentTime = util.formatTime(new Date());
        let today = currentTime.split(' ')[0].split('/').join('-')
        if (wx.getStorageSync('missionId')) {
            let missionId = parseInt(wx.getStorageSync('missionId'))
            let postId = {
                id: missionId
            }
            apiTask.getTaskDetails(postId).then(res => {
                this.setData({
                    taskId: postId,
                    default: res.data.missionName,
                    shopNum: res.data.missionCode
                })
            })
        }

        // wx.removeStorageSync('missionId')
        console.log(today)
        console.log(options)

        this.setData({
            date: today,
            boothId: parseInt(options.boothId),
            businessmanId: parseInt(options.businessmanId),
            boothId: parseInt(options.boothInfoId)
                // boothInfoId: options.boothInfoId
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