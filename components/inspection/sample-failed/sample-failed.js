// components/collect/index/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        samples: {
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
                title: '鸡肉',
                time: '2020-08-07 08:02:30',
                market: '石井综合农贸市场',
                owner: '李启新',
                inspector: '王天柱',
                shop: '水产A23档',
            },
            {
                title: '鸡肉2',
                time: '2020-08-07 08:02:30',
                market: '石井综合农贸市场',
                owner: '李启新2',
                inspector: '王天柱2',
                shop: '水产A23档',
            }
        ]
    },

    /**
     * 组件的方法列表
     */
    methods: {
        handle(e) {
            console.log('点击进入处理页面', e)
            wx.navigateTo({
                // url: '/pagesInspection/pages/deal/deal?dataObj=' + JSON.stringify(e.currentTarget.dataset.info),
                url: '/pagesInspection/pages/deal/deal?id=' + e.currentTarget.dataset.info.sampleId,
            })
        },
        handledRecord(e) {
            console.log(e)
            let code = e.currentTarget.dataset.code
            let sampleid = e.currentTarget.dataset.sampleid
            wx.navigateTo({
                url: '/pagesInspection/pages/dealRecord/dealRecord?code=' + code + '&id=' + sampleid,
            })
        }
    }
})