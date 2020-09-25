// components/collect/index/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        value: {
            type: null,
            observer: function(newVal, oldVal) {
                this.setData({
                    info: newVal
                })
            }

        },
        getMarketId: {
            type: null,
            observer: function(newVal, oldVal) {
                this.setData({
                    marketId: newVal
                })
            }
        },
        // getMissionId: {
        //     type: null,
        //     observer: function(newVal, oldVal) {
        //         this.setData({
        //             missionId: newVal
        //         })
        //     }
        // }
    },

    /**
     * 组件的初始数据
     */
    data: {
        info: null,
        shopName: '默认',
        result: '近期存在抽检不合格',
        shopNum: '默认',
        owner: '默认',
        phone: '默认',
        marketId: null,
        // missionId: null,
    },

    /**
     * 组件的方法列表
     */
    methods: {
        jumpToDetails(event) {
            console.log(event.currentTarget, '测试')
            let boothId = event.currentTarget.id
            let postId = String(boothId)
            let boothCode = event.currentTarget.dataset.boothcode
            let bussinessCode = event.currentTarget.dataset.bussinessmancode
            let licence = event.currentTarget.dataset.licence
            let marketId = this.data.marketId
            let missionId = this.data.missionId
                // console.log(postId, boothCode, bussinessCode)
            wx.navigateTo({
                url: "/pagesCollect/pages/shopInfo/shopInfo?id=" + postId + "&boothCode=" + boothCode + "&bussinessCode=" + bussinessCode + "&licence=" + licence + "&marketid=" + marketId
            })
        },
        // editSample(event) {
        //     let boothId = event.currentTarget.id
        //     let postId = String(boothId)
        //     wx.navigateTo({
        //             url: '/pagesCollect/pages/randomTest/randomTest?boothId=' + postId,
        //         })
        //         console.log('ok')
        //         wx.scanCode({
        //             success(res) {
        //                 //跳转页面
        //                 wx.navigateTo({
        //                     url: '/pagesCollect/pages/randomTest/randomTest',
        //                 });
        //             },
        //             // 扫码失败,提示信息
        //             fail() {
        //                 wx.showToast({
        //                     title: '扫码失败，请稍后重试',
        //                     icon: 'none'
        //                 })
        //             }
        //         });
        // }
    }
})