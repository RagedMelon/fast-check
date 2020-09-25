// components/collect/index/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        change: {
            type: null,
            observer: function(newVal, oldVal) {
                this.setData({
                    title: newVal
                })
            }
        },
        comeBack: {
            type: null,
            observer: function(newVal, oldVal) {
                this.setData({
                    option: newVal
                })
            }
        }

    },

    /**
     * 组件的初始数据
     */
    data: {
        option: 0,
        title: ['未检验', '已检验']
    },

    /**
     * 组件的方法列表
     */
    methods: {
        checkStatus: function(e) {
            this.setData({
                option: 0
            })
            let change = this.data.option
            this.triggerEvent('stage', { change })
        },
        checkStatus2: function(e) {
            this.setData({
                option: 1
            })
            let change = this.data.option
            this.triggerEvent('stage', { change })
        },
    }
})