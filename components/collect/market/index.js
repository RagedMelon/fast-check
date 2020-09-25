// components/collect/index/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        market: {
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
        marketName: '默认',
        marketNum: '默认',
        marketTime: '默认'
    },

    /**
     * 组件的方法列表
     */
    methods: {
        shopList: function(event) {
            // console.log(event.currentTarget)
            let marketId = event.currentTarget.id
            let postId = String(marketId)
            wx.navigateTo({
                url: '/pagesCollect/pages/shopList/shopList?id=' + postId,
            })

        },
    }
})