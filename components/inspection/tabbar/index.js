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
            let pages = getCurrentPages();
            console.log(pages)
            console.log('检验端底部栏')
            const i = e.currentTarget.dataset.index;
            console.log(i, this.data.selected)
            if (i != this.data.selected) {
                if (i == 1) {
                    wx.scanCode({
                        success(res) {
                            console.log(res)
                                // 跳转页面
                            wx.navigateTo({
                                url: '/pagesInspection/pages/scanReadIn/scanReadIn?code=' + res.result,
                            });
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
                        url: '/pagesInspection/pages/myAccount/myAccount',
                    })
                } else {
                    wx.navigateBack({
                            delta: 1
                        })
                        // wx.navigateTo({
                        //     url: '/pagesInspection/pages/index/index',
                        // })
                }
            }

        },
    }
})