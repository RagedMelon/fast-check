// components/inspection/index/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        info: {
            type: null,
            observer: function(newVal, oldVal) {
                this.setData({
                    msg: newVal
                })
            }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        msg: null,
        test: {
            time: '2020-08-10 08:20:38',
            inspector: '王天柱',
            sample: '鸡肉',
            market: '石井综合农贸市场',
            shop: 'A23档',
            owner: '李国胜'
        }
    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})