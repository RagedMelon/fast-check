// components/collect/index/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        unreported: {
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
                type: '商品类型：水产类',
                code: '样品码：1*****908'
            },
            {
                title: '虾2',
                time: '2020-08-07 08:02:302',
                market: '石井综合农贸市场2',
                shop: '兴隆海鲜档2',
                owner: '王天柱2',
                type: '商品类型：水产类2',
                code: '样品码：1*****201'

            }
        ]
    },

    /**
     * 组件的方法列表
     */
    methods: {
        submit(event) {
            console.log(event.currentTarget.dataset.marketid)
            let marketid = event.currentTarget.dataset.marketid
            let i = event.currentTarget.dataset.index
            let dataObj = this.data.list[i]
            wx.navigateTo({
                url: '/pagesCollect/pages/editUnreported/editUnreported?marketId=' + marketid + '&dataObj=' + JSON.stringify(dataObj),
            });
        }
    }
})