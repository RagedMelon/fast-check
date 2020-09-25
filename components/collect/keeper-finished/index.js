// components/collect/index/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        booth: {
            type: null,
            observer: function(newVal, oldVal) {
                this.setData({
                    msg: newVal
                })
            }

        },
        pic: {
            type: null,
            observer: function(newVal, oldVal) {
                this.setData({
                    photoUrl: newVal
                })
            }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        photoUrl: null,
        msg: null,
        id: '1231425432523',
        info: {
            market: '默认',
            name: '默认',
            num: '默认',
            name: '默认',
            owner: '默认',
            phone: '默认',
            id: '默认',
            pic: '网址'
        },
        hide: false,
        tip: '收起'
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