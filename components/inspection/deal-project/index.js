// components/inspection/index/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        getInfo: {
            type: null,
            observer: function(newVal, oldVal) {
                this.setData({
                    result: newVal
                })
                console.log(this.data.result)
            }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        result: {
            project: '黄曲霉素',
            reagent: '试剂1',
            batch: 'xxx批次',
            factory: 'xxx厂家',
            result: '阳性 不合格',
        },
        hide: false,
        tip: '收起',
        info: {
            market: '默认',
            num: '默认',
            owner: '默认',
            inspector: '默认',
            time: '默认',
        }
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