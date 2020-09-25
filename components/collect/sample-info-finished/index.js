// components/collect/index/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        info: {
            type: null,
            observer(newVal, oldVal) {
                this.setData({
                    sampleInfo: newVal
                })
            }
        },
        pic: {
            type: null,
            observer(newVal, oldVal) {
                this.setData({
                    picUrl: newVal
                })
            }
        },

    },

    /**
     * 组件的初始数据
     */
    data: {
        sampleInfo: null,
        code: '123456273128',
        date: '2020-01-01',
        change: false,
        picUrl: null,
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
        filter: function(code) {
            code.slice(2, -3)
        }



    }
})