const util = require('../../../utils/util.js')
import { TaskModel } from '../../../models/collect/task'
let apiTask = new TaskModel();
import { MarketModel } from '../../../models/collect/market'
let apiMarket = new MarketModel();
// import { SampleModel } from '../../../models/collect/samlpe'
// let apiSample = new SampleModel();
// pagesCollect/pages/scanSample/scanSample.js
Page({

    /**
     * Page initial data
     */
    data: {
        userId: null,
        sampleData: null, //传入的采样信息
        text: '关联任务',
        url: '../../../images/collect/icon_associated_yellow@2x.png',
        text2: '样品采样信息',
        url2: '../../../images/collect/icon_sample_yellow@2x.png',
        // 关联任务
        taskTitle: '请选择任务', //任务标题
        taskCode: null, //任务编码
        tasks: ['task1', 'task2', 'task3', 'task4'],
        show: false,
        // chosenTask: '',
        taskList: [], //任务列表
        taskTotal: 0, //任务总数
        taskPages: 0, //任务总页数
        taskIndex: 1, //任务当前页 
        taskId: null,
        // 经营者信息
        hide: false,
        tip: '收起',
        market: null, //所属市场
        marketId: null,
        boothName: '', //档口名称
        chosenBooth: '',
        chosenBoothId: null,
        showBoothList: false,
        boothList: [], //档口列表
        boothTotal: 0, //档口总数
        boothPages: 0, //档口总页数
        boothIndex: 1, //档口当前页 
        boothCode: '', //档口编号
        boothInfo: null, //档口经营者信息
        businessmanName: '', //经营者姓名
        showBoothInfo: false,
        // boothNameList:'',
        bussinessMan: null,
        phone: '', //联系电话
        idNumber: '', //身份证号码
        businessLicenceFileIds: '', //营业执照
        // 样品采样信息
        sampleCode: null, //样品码
        // 填写样品名称
        sampleName: '', //样品名称
        showSearch: false,
        searchList: [],
        info: null,
        pics: [], //样品证明材料
        date: '', //进货日期
        date2: '', //采样时间
        place: '', //样品产地
        supplier: '', //供应商
        // 保存样品传参
        missionId: '', //任务id
        boothInfoId: null, //档口id
        businessmanId: null, //商户id
        saveData: [{
            "id": "", //采样主键id
            "inDate": "", //进货日期
            "place": "", //产地
            "supplier": "", //供应商
            "sampleCode": "", //采样码
            "businessProductId": "", //商品id
            "material": "", //照片id-多张用,号隔开
            "sampleDate": "" //采样时间
        }]

    },
    // 根据市场id获取任务列表
    getMarketTasks(marketId) {
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
            marketId: marketId,
            userId: _this.data.userId
        }
        console.log(postData, '传入的参数')
        apiTask.marketIdGetTasks(postData).then(res => {
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
            if (_this.data.marketId) {
                _this.getMarketTasks(_this.data.marketId);
            } else {
                _this.getTasks();

            }

        } else if (_this.data.taskIndex == _this.data.taskPages) {
            _this.setData({
                searchLoadingComplete: true, //“已加载全部”显示
                searchLoading: false, //"正在载入更多"隐藏
            });
        }
    },
    // 任务标题选择
    showList() {
        this.setData({
            show: !this.data.show,
        })
    },
    selected(e) {
        console.log(e)
        console.log(this.data.show)
        let chosen = e.currentTarget.dataset.name
        let i = e.currentTarget.dataset.index
        let list = this.data.taskList
        console.log(list[i])
        this.setData({
                taskTitle: chosen,
                show: false,
                // chosenTask: chosen,
                taskCode: list[i].missionCode,
                missionId: e.currentTarget.dataset.id,
                market: list[i].marketInfoDto.marketName
            })
            // 获取选择任务关联的市场id
        let chooseMarketId = list[i].marketInfoDto.id
        this.setData({
            marketId: list[i].marketInfoDto.id
        })
        this.getBoothList(chooseMarketId)
        console.log(this.data.missionId)
    },
    // 根据市场id获取档口列表
    getBoothList(marketId) {
        var _this = this;
        wx.showLoading({
            title: '加载中...',
        })
        const data = {
            allowPaging: true,
            pageIndex: _this.data.boothIndex,
            pageSize: 10
        };
        console.info("第" + _this.data.boothIndex + "页")
        let postData = {
            rp: 10,
            page: _this.data.boothIndex,
            marketId: marketId
        }
        console.log(postData, '传入的参数')
        apiMarket.getBoothList(postData).then(res => {
            wx.hideLoading()
            let Result = res.data.rows
            console.log(Result)
            console.log(res)
                // 响应无数据 则提示无数据
            if (_this.data.boothIndex == 1 && Result.length == 0) {
                _this.setData({
                    boothNoData: true
                })
            }
            if (Result.length) {
                _this.data.boothTotal = res.data.records
                _this.data.boothPages = res.data.total
                let boothListTemp = [];
                if (_this.data.boothIndex > 1) {
                    boothListTemp = _this.data.boothList.concat(Result);
                    _this.setData({
                        searchLoading: true, //"正在载入更多"显示
                    });
                } else {
                    boothListTemp = Result;
                }

                _this.setData({
                    boothList: boothListTemp, //获取数据数组
                    noData: false //“没有数据”隐藏
                });
            }
        }).catch((errMsg) => {
            console.log(errMsg);
            wx.hideLoading()
        });
    },
    // 滚动至低端事件（市场）
    ScrollLower2: function() {
        var _this = this;
        console.info("ScrollLower 第" + _this.data.boothIndex + "页")

        if (_this.data.boothIndex < _this.data.boothPages) {
            _this.setData({
                boothIndex: _this.data.boothIndex + 1, //每次触发触底事件，把taskIndex+1
            });
            let marketId = _this.data.marketId
            _this.getBoothList(marketId);

        } else if (_this.data.boothIndex == _this.data.boothPages) {
            _this.setData({
                searchLoadingComplete2: true, //“已加载全部”显示
                searchLoading2: false, //"正在载入更多"隐藏
            });
        }
    },
    // 档口名称选择
    showBoothList() {
        this.setData({
            showBoothList: !this.data.showBoothList,
        })
    },
    selectedBooth(e) {
        console.log(e)
        console.log(this.data.show)
        let chosenBooth = e.currentTarget.dataset.name
        let i = e.currentTarget.dataset.index
        let list = this.data.boothList
        console.log(list[i])
        this.setData({
                boothName: chosenBooth,
                showBoothList: false,
                chosenBooth: chosenBooth,
                boothInfoId: e.currentTarget.dataset.id,
                boothCode: list[i].boothCode
            })
            // 根据选择档口id获取经营者信息
        let postId = {
            boothId: this.data.boothInfoId

        }
        console.log(postId, '传参档口id')
        apiMarket.getOwnerInfo(postId).then(res => {
            console.log(res, '档口id查询详情结果')
            this.setData({
                boothInfo: res.data,
                businessmanId: res.data[0].id
            })
            console.log(this.data.boothInfo, '获取选中档口的经营者信息')

        })


    },
    // 经营者姓名选择
    showBusinessManList() {
        this.setData({
            showBoothInfo: !this.data.showBoothInfo,
        })
    },
    selectedBusinessMan(e) {
        let i = e.currentTarget.dataset.index
        let list = this.data.boothInfo
        console.log(list[i])
        this.setData({
            businessmanName: list[i].businessmanName,
            businessmanId: list[i].id,
            phone: list[i].phone,
            idNumber: list[i].idNumber,
            showBoothInfo: false,
            businessLicenceFileIds: 'https://fastcheck.id-cas.cn/fastcheck/sambaFile.do?action=showImageById&id=' + list[i].businessLicenceFileIds

        })

    },

    // 填写样品名称
    bindSampleName: function(e) {
        this.setData({
            sampleName: e.detail.value
        })
        let that = this
        let postString = {
            productName: e.detail.value
        }
        apiTask.getProductList(postString).then(res => {
            console.log(res.data.rows, '搜索样品名称')
            let searchList = res.data.rows
            that.setData({
                searchList: searchList,
                showSearch: true
            })
        })

    },
    // 选择样品名称
    chooseProductName(event) {
        let i = event.currentTarget.dataset.index //选择的下标
            // 获取商品的Id
        let productId = this.data.searchList[i].id
        let saveData = this.data.saveData
        saveData[0].businessProductId = this.data.searchList[i].id
        console.log(productId, '样品id')
        this.setData({
            sampleName: event.currentTarget.dataset.name,
            showSearch: false,
            saveData: saveData
        })
        console.log(this.data.saveData)

        let postData = {
            boothId: this.data.boothInfoId,
            businessProductId: productId
        }
        let that = this
        apiTask.getRecentFill(postData).then(res => {
            console.log(res.data, '最近填的信息')
            if (res.data != undefined) {
                that.setData({
                    info: res.data
                })
            }

        })

    },
    // 经营者信息
    hide() {
        this.setData({
            hide: !this.data.hide,
        })
        if (this.data.tip == "展开") {
            this.setData({
                tip: "收起"
            })
        } else {
            this.setData({
                tip: "展开"
            })
        }
    },

    // 样品码扫码
    scan: function(e) {
        console.log(e.currentTarget)
        let that = this
        wx.scanCode({
            success(res) {
                let saveData = that.data.saveData
                saveData[0].sampleCode = res.result
                that.setData({
                    saveData: saveData
                })
                console.log(that.data.saveData)
            }
        })
    },
    bindDateChange: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        let saveData = this.data.saveData
        saveData[0].inDate = e.detail.value
        this.setData({
            date: e.detail.value,
            change: true,
            saveData: saveData
        })
        console.log(this.data.saveData)
    },
    bindDateChange2: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        let saveData = this.data.saveData
        saveData[0].inDate = e.detail.value
        this.setData({
            date2: e.detail.value,
            change2: true,
            saveData: saveData

        })
        console.log(this.data.saveData)

    },
    // 填写样品产地
    bindPlace: function(e) {
        console.log(e.detail.value)
        let saveData = this.data.saveData
        saveData[0].place = e.detail.value
        this.setData({
            place: e.detail.value,
            saveData: saveData
        })
        console.log(saveData, '填入样品产地')
    },
    // 填写供应商名称
    bindSupplier: function(e) {
        console.log(e.detail.value)
        let saveData = this.data.saveData
        saveData[0].supplier = e.detail.value
        this.setData({
            supplier: e.detail.value,
            saveData: saveData
        })
        console.log(saveData, '填入供应商名称')
    },
    // 上传证明材料
    upload: function(e) {
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
                        let saveData = that.data.saveData
                        console.log(saveData.material)
                        if (saveData[0].material == "" || saveData[0].material == undefined) {
                            console.log('空数组')
                            saveData[0].material = JSON.stringify(data.id)
                        } else {
                            saveData[0].material += ',' + JSON.stringify(data.id)
                        }
                        that.setData({
                            saveData: saveData
                        })
                        console.log(saveData)
                    }
                })

                let pics = that.data.pics
                pics.push(tempFilePaths)
                that.setData({
                    pics: pics
                })
            }
        })
    },
    // 草稿按钮
    draft() {
        let productInfo = JSON.stringify(this.data.saveData)
        console.log(this.data.saveData)
        let boothId = this.data.boothInfoId
        let missionId = this.data.missionId
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
            if (res.code == 0) {
                wx.showModal({
                    content: '提交草稿成功',
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
    },
    // 提交按钮
    submit() {
        console.log(this.data.saveData)
        let productInfo = JSON.stringify(this.data.saveData)
        console.log(this.data.saveData)
        let boothId = this.data.boothInfoId
        let missionId = this.data.missionId
        let businessmanId = this.data.businessmanId
        let postData = {
            saveType: 0,
            missionId: missionId,
            boothInfoId: boothId,
            businessmanId: businessmanId,
            sampleProductJson: productInfo
        }
        console.log(postData)
        apiTask.submitBtn(postData).then(res => {
            if (res.code == 0) {
                wx.showModal({
                    content: '填报成功',
                    showCancel: false,
                    success() {
                        let pages = getCurrentPages();
                        let currPage = pages[pages.length - 1]; //当前页面
                        let prevPage = pages[pages.length - 2]; //上一个页面
                        prevPage.comeBack()
                            // console.log(prevPage.data, '上一页的数据')
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
    },
    /**
     * Lifecycle function--Called when page load
     */
    onLoad: function(options) {
        let userId = wx.getStorageSync('userId')
        console.log(userId, '用户id')
        this.setData({
            userId: userId
        })
        this.getMarketTasks(parseInt(options.marketId))
        console.log(JSON.parse(options.dataObj))
        let sampleData = JSON.parse(options.dataObj)
        if (sampleData.material) {
            let pics = sampleData.material.split(',')
            let picUrl = []
            for (let index in pics) {
                picUrl.push("https://fastcheck.id-cas.cn/fastcheck/sambaFile.do?action=showImageById&id=" + pics[index])
            }
            this.setData({
                pics: picUrl
            })
        }
        this.setData({
            // 带出的数据
            taskTitle: sampleData.missionDto.missionName,
            taskCode: sampleData.missionDto.missionCode,
            market: sampleData.boothInfoDto.marketName,
            boothName: sampleData.boothInfoDto.boothName,
            boothCode: sampleData.boothInfoDto.boothCode,
            businessmanName: sampleData.businessmanDto.businessmanName,
            phone: sampleData.businessmanDto.phone,
            idNumber: sampleData.businessmanDto.idNumber,
            businessLicenceFileIds: 'https://fastcheck.id-cas.cn/fastcheck/sambaFile.do?action=showImageById&id=' + sampleData.businessmanDto.uploadIdNumberFileIds,
            sampleCode: sampleData.sampleCode,
            sampleName: sampleData.businessProductDto.productName,
            // date: sampleData.inDate.split(' ')[0],
            date: sampleData.inDate,
            place: sampleData.place,
            supplier: sampleData.supplier,
            // date2: sampleData.sampleDate.split(' ')[0],
            date2: sampleData.sampleDate,
            missionId: sampleData.missionDto.id, //任务id
            boothInfoId: sampleData.boothInfoDto.id, //档口id
            businessmanId: sampleData.businessmanDto.id, //商户id

            saveData: [{
                "id": sampleData.id, //采样主键id
                "inDate": sampleData.inDate, //进货日期
                "place": sampleData.place, //产地
                "supplier": sampleData.supplier, //供应商
                // "sampleCode": sampleData.sampleCode, //采样码
                "sampleCode": '', //采样码
                "businessProductId": sampleData.businessProductDto.id, //商品id
                "material": sampleData.material, //照片id-多张用,号隔开
                "sampleDate": sampleData.sampleDate //采样时间
            }]
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