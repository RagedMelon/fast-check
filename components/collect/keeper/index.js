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
        certifi: {
            type: null,
            observer: function(newVal, oldVal) {
                this.setData({
                    boothPic: newVal
                })
            }
        },
        // 展开收起
        nameShow: {
            type: null,
            observer: function(newVal, oldVal) {
                this.setData({
                    showNameList: newVal
                })
            }

        },
    },

    /**
     * 组件的初始数据
     */
    data: {
        index: 0,
        showNameList: false,
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
        tip: '收起',
        boothPic: null
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
        changeName() {
            this.setData({
                showNameList: !this.data.showNameList
            })
            let show = this.data.showNameList
            this.triggerEvent('display', { show })

        },
        chooseName(e) {
            console.log(e.currentTarget.dataset, '选择商户名')
                // console.log(e.currentTarget.dataset.name)
            this.setData({
                index: e.currentTarget.dataset.index,
                showNameList: false
            })
            this.triggerEvent('getcodes', {
                boothcode: e.currentTarget.dataset.boothcode,
                businesscode: e.currentTarget.dataset.businesscode,
                businessLicenceFileIds: e.currentTarget.dataset.businesslicencefileids,
                id: e.currentTarget.dataset.id
            })

        }
    }
})