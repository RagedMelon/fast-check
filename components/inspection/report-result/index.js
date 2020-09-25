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
        result: {
            project: '黄曲霉素',
            reagent: '试剂1',
            batch: 'xxx批次',
            factory: 'xxx厂家',
            result: '阳性 不合格',
        },
    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})