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
        code: '',
        date: '2020-01-01',
        change: false
    },

    /**
     * 组件的方法列表
     */
    methods: {
        scan: function() {
            let that = this
            wx.scanCode({
                success(res) {
                    console.log(res)
                    that.setData({
                        code: res.result
                    })
                }
            })
        },
        bindDateChange: function(e) {
            console.log('picker发送选择改变，携带值为', e.detail.value)
            this.setData({
                date: e.detail.value,
                change: true
            })
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