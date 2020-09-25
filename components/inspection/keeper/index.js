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
                    keeperInfo: newVAl,
                    certification: "https://fastcheck.id-cas.cn/fastcheck/sambaFile.do?action=showImageById&id=" + newVAl.boothInfoDto.businessLicenceFileIds
                })
            }
        }

    },

    /**
     * 组件的初始数据
     */
    data: {
        keeperInfo: null,
        certification: null,
        info: {
            owner: '默认',
            market: '默认',
            num: '默认',
            phone: '默认',
            id: '默认',
            pic: '网址'
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