// components/collect/index/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
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
        scan: function() {
            wx.scanCode({
                success(res) {
                    console.log(res)
                }
            })
        },
    }
})