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
        date: '请选择进货日期',
        change: false,
        date2: '请选择采样时间',
        change2: false,
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
        bindDateChange: function(e) {
            console.log('picker发送选择改变，携带值为', e.detail.value)
            this.setData({
                date: e.detail.value,
                change: true
            })
            console.log(this.data.change)
        },
        bindDateChange2: function(e) {
            console.log('picker发送选择改变，携带值为', e.detail.value)
            this.setData({
                date2: e.detail.value,
                change2: true
            })
            console.log(this.data.change2)
        },
        upload: function() {
            wx.chooseImage({
                count: 1,
                sizeType: ['original', 'compressed'],
                sourceType: ['album', 'camera'],
                success(res) {
                    // tempFilePath可以作为img标签的src属性显示图片
                    const tempFilePaths = res.tempFilePaths
                }
            })
        },

    }
})