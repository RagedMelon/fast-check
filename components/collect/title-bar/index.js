// components/collect/index/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        title: {
            type: null,
            observer: function(newVal, oldVal) {
                this.setData({
                    text: newVal
                })
            }

        },
        pic: {
            type: null,
            observer: function(newVal, oldVal) {
                this.setData({
                    url: newVal
                })
            }

        },

    },

    /**
     * 组件的初始数据
     */
    data: {
        text: '关联任务',
        url: '../../../images/collect/icon_associated_green@2x.png'
    },

    /**
     * 组件的方法列表
     */
    methods: {

    }
})