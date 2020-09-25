Component({
    /**
     * 组件的属性列表
     */
    properties: {
        tabbarData: { //tabbar的数据
            type: null,
            observer: function(newVal, oldVal) {
                // console.log(newVal)
                this.setData({
                    list: newVal
                })
            }
        },
        active: { //选中的下标
            type: null,
            observer: function(newVal, oldVal) {

                if (newVal != '') {
                    this.setData({
                        selected: newVal
                    })
                }
            }
        },
        bgcolor: { //背景颜色
            type: null,
            observer: function(newVal, oldVal) {

                if (newVal != '') {
                    this.setData({
                        bgcolor: newVal
                    })
                }
            }
        },
        color: { //未选中的字体颜色
            type: null,
            observer: function(newVal, oldVal) {

                if (newVal != '') {
                    this.setData({
                        color: newVal
                    })
                }
            }
        },
        selectedColor: { //选中的字体颜色
            type: null,
            observer: function(newVal, oldVal) {

                if (newVal != '') {
                    this.setData({
                        selectedColor: newVal
                    })
                }

            }
        },
        showborder: { //选中的字体颜色
            type: null,
            observer: function(newVal, oldVal) {

                if (newVal != '') {
                    this.setData({
                        showborder: newVal
                    })
                }

            }
        },
        bordercolor: { //分割线的颜色
            type: null,
            observer: function(newVal, oldVal) {

                if (newVal != '') {
                    this.setData({
                        bordercolor: newVal
                    })
                }

            }
        },
    },
    /**
     * 数据赋值
     */
    data: {
        selected: 0, //选中的下标
        showborder: true, //显示分割线
        bordercolor: "#0000ff", //分割线的颜色
        bgcolor: "#ffffff", //背景颜色
        color: "#cccccc", //未选中的字体颜色
        selectedColor: "#333333", //选中的字体颜色
        list: [], //tabbar的数据列表
    },
    //项目初始化
    attached: function() {

    },
    methods: {
        switchTab(e) {
            const i = e.currentTarget.dataset.index;
            console.log(i, this.data.selected)
            if (i != this.data.selected) {
                if (i == 1) {
                    wx.scanCode({
                        success(res) {
                            console.log(res)
                                // 如果扫的是商户码
                            if (res.result.indexOf('http') >= 0) {
                                let start = res.result.indexOf('?') + 1
                                let string = res.result.substring(start)
                                let arr = string.split('&')
                                    // console.log(arr)
                                let boothCodeArr = arr[0].split('=')[1]
                                let businessManCodeArr = arr[1].split('=')[1]

                                console.log(boothCodeArr, businessManCodeArr)
                                wx.navigateTo({
                                    url: '/pagesCollect/pages/scanBusinessCode/scanBusinessCode?boothCode=' + boothCodeArr + '&businessManCode=' + businessManCodeArr,
                                })
                            }
                            // 如果扫的是样品码 
                            else {
                                let code = res.result
                                wx.navigateTo({
                                    url: '/pagesCollect/pages/scanSample/scanSample?samplecode=' + code,
                                })
                            }
                        },
                        // 扫码失败,提示信息
                        fail() {
                            wx.showToast({
                                title: '扫码失败，请稍后重试',
                                icon: 'none'
                            })
                        }
                    });
                } else if (i == 2) {
                    wx.navigateTo({
                        url: '/pagesCollect/pages/myAccount/myAccount',
                    })
                } else {
                    wx.navigateBack({
                            delta: 1
                        })
                        // wx.navigateTo({
                        //     url: '/pagesCollect/pages/index/index',
                        // })
                }
            }
        }

        // switchTab(e) {
        //     const i = e.currentTarget.dataset.index;
        //     if (i == 1) {
        //         wx.scanCode({
        //             success: (res) => {
        //                 console.log(res);
        //             }
        //         })
        //     } else {
        //         let that = this;
        //         that.setData({
        //                 selected: parseInt(e.currentTarget.dataset.index)
        //             })
        //             //回调函数
        //         that.triggerEvent('tapChange', parseInt(e.currentTarget.dataset.index));
        //     }
        // },
    }
})