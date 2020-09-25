// components/collect/index/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        unrelated: {
            type: null,
            observer: function(newVal, oldVal) {
                this.setData({
                    list: newVal
                })
            }

        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        list: null,
        items: [{
                title: '虾',
                time: '2020-08-07 08:02:30',
                market: '石井综合农贸市场',
                shop: '兴隆海鲜档',
                owner: '王天柱',
                type: '商品类型：水产类'
            },
            {
                title: '虾2',
                time: '2020-08-07 08:02:302',
                market: '石井综合农贸市场2',
                shop: '兴隆海鲜档2',
                owner: '王天柱2',
                type: '商品类型：水产类2'
            }
        ]
    },

    /**
     * 组件的方法列表
     */
    methods: {
        scanRelate(event) {
            // console.log('ok')
            let that = this
            wx.scanCode({
                success(res) {
                    //跳转页面 
                    console.log(res.result)
                    let code = res.result
                    let i = event.currentTarget.dataset.index
                    let dataObj = that.data.list[i]
                    wx.navigateTo({
                        url: '/pagesCollect/pages/scanSample/scanSample?samplecode=' + code + '&dataObj=' + JSON.stringify(dataObj),
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
        },
        editSample: function(event) {
            console.log(event.currentTarget.dataset.marketid)
            let marketid = event.currentTarget.dataset.marketid
            let i = event.currentTarget.dataset.index
            let dataObj = this.data.list[i]
            wx.navigateTo({
                url: '/pagesCollect/pages/editSample/editSample?marketId=' + marketid + '&dataObj=' + JSON.stringify(dataObj),
            });
        },
    }
})