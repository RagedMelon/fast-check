// components/collect/index/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        text: {
            type: null,
            observer: function(newVal, oldVal) {
                this.setData({
                    content: newVal
                })
            }

        },
    },

    /**
     * 组件的初始数据
     */
    data: {
        content: '默认',
    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})