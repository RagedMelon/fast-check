// components/inspection/index/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        boxTitle: {
            type: null,
            observer: function(newVal, oldVal) {
                this.setData({
                    title: newVal
                })
            }
        },
        info: {
            type: null,
            observer: function(newVal, oldVal) {
                this.setData({
                    msg: newVal
                })
            }
        },
        show: {
            type: null,
            observer: function(newVal, oldVal) {
                this.setData({
                    hide: newVal
                })
            }
        },
        showText: {
            type: null,
            observer: function(newVal, oldVal) {
                this.setData({
                    tip: newVal
                })
            }
        },
    },

    /**
     * 组件的初始数据
     */
    data: {
        hide: true,
        tip: '展开',
        title: '检验结果',
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
        hide() {
            this.setData({
                hide: !this.data.hide,
            })
            if (this.data.tip == "展开") {
                this.setData({
                    tip: "收起"
                })
            } else {
                this.setData({
                    tip: "展开"
                })
            }
        },
    }
})