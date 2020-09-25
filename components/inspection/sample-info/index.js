// components/collect/index/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        getData: {
            type: null,
            observer: function(newVAl, oldVal) {
                this.setData({
                    sampleInfo: newVAl
                })
            }
        },
        getPicUrls: {
            type: null,
            observer: function(newVAl, oldVal) {
                this.setData({
                    picsUrl: newVAl
                })
            }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        sampleInfo: null,
        picsUrl: null,
        info: {
            code: '默认',
            name: '默认',
            date: '默认',
            from: '默认',
            supplier: '默认',
            phone: '默认',
            id: '默认',
            proof: '网址'
        },
        hide: true,
        tip: '展开'
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