// components/collect/index/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        icons: {
            type: null,
            observer: function(newVal, oldVal) {
                this.setData({
                    menu: newVal
                })
            }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        menu: [{
                id: 1,
                icon: '../../../images/collect/icon_home_task@2x.png',
                text: '任务管理'
            },
            {
                id: 2,
                icon: '../../../images/collect/icon_home_market@2x.png',
                text: '市场管理'
            },
            {
                id: 3,
                icon: '../../../images/collect/icon_home_sampling@2x.png',
                text: '采样管理'
            },
            {
                id: 4,
                icon: '../../../images/collect/icon_home_data@2x.png',
                text: '统计分析'
            },
        ],
    },

    /**
     * 组件的方法列表
     */
    methods: {
        jumpTo(event) {
            // console.log(event)
            let id = event.currentTarget.id
            if (id == 1) {
                wx.navigateTo({
                    url: '/pagesCollect/pages/taskManager/taskManager',
                })
            } else if (id == 2) {
                wx.navigateTo({
                    url: '/pagesCollect/pages/marketManager/marketManager',
                })
            } else if (id == 3) {
                wx.navigateTo({
                    url: '/pagesCollect/pages/samplingManager/samplingManager',
                })
            } else {
                wx.navigateTo({
                    url: '/pagesCollect/pages/staticAnalysis/staticAnalysis',
                })
            }
        },

    }
})