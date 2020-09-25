// components/collect/index/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        change: {
            type: null,
            observer(newVal, oldVal) {
                this.setData({
                    info: newVal
                })
            }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        info: null,
        default: '请选择任务',
        tasks: ['task1', 'task2', 'task3', 'task4'],
        show: false,
        chosenTask: '',
        shopNum: '3424242',
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
            console.log(e)
            console.log(this.data.show)
            let chosen = e.currentTarget.dataset.name
            this.setData({
                default: chosen,
                show: false,
                chosenTask: chosen
            })
            console.log(this.data.show)
        },
    }
})