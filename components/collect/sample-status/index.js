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
        tag: "采样状态",
        chosenId: 1,
        default: '待关联',
        show: false,
        groups: [{
                id: 1,
                status: '待关联'
            },
            {
                id: 2,
                status: '待填报'
            }
        ]
    },

    /**
     * 组件的方法列表
     */
    methods: {
        showList() {
            this.setData({
                show: !this.data.show,
            })
        },
        selected(e) {
            let chosen = e.currentTarget.dataset.name
            let chosenId = e.currentTarget.id
            this.setData({
                default: chosen,
                show: false,
                chosenId: chosenId
            })
            let current = this.data.chosenId
            this.triggerEvent('idNum', { current })
        },
    }
})