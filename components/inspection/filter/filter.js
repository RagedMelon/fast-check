// pages/zy/zy.js
const util = require('../../../utils/util.js')
Component({
    properties: {
        second: {
            type: null,
            observer: function(newVal, oldVal) {
                this.setData({
                    secondFilter: newVal
                })
            }

        },
        items: {
            type: null,
            observer: function(newVal, oldVal) {
                this.setData({
                    secondItems: newVal
                })
            }
        },
        default: {
            type: null,
            observer: function(newVal, oldVal) {
                this.setData({
                    secondDefault: newVal
                })
            }
        },
    },
    data: {
        // 时间起始
        dateStart: '',
        dateEnd: '',
        dateFilter: '时间范围',
        rangeSelect: false,
        rangeText: 0,
        articles: [],
        rangeDefault: '近一个月',
        range: [{
                id: 1,
                option: '近一个月'
            },
            {
                id: 2,
                option: '近三个月'
            },
            {
                id: 3,
                option: '近一年'
            },
            {
                id: 4,
                option: '自定义'
            },
        ],
        secondFilter: '',
        secondDefault: '111',
        secondItems: [],
        secondSelect: false,
        secondText: 0,
    },
    methods: {
        // 自定义日期选择器
        // 开始日期
        bindDateStartChange(e) {
            this.setData({
                dateStart: e.detail.value
            })
            let change = this.data.dateStart
            this.triggerEvent('start', { change })

        },
        // 结束日期
        bindDateEndChange(e) {
            this.setData({
                dateEnd: e.detail.value
            })
            let change = this.data.dateEnd
            this.triggerEvent('end', { change })
        },
        // 确定日期区间后执行的函数
        sureTime(e) {　　
            this.timeBoxHidden = true　　
            this.fetch({　　
                url: ' ',
                　　success: (data) => {　　　　
                    let arr = []　　　　
                    data.datas.forEach((item) => {　　　　
                            if (item.applyTime >= this.dateStart && item.applyTime <= this.dateEnd) {　　　　 arr.push(item)　　 }
                        })
                        //article 列表渲染的数据数组
                        　　 this.articles = arr　　
                }
            })　　
            this.scrollToUpper()
        },
        bindShowRange() {
            this.setData({
                rangeSelect: !this.data.rangeSelect,
            })
        },
        bindShowsecond() {
            this.setData({
                secondSelect: !this.data.secondSelect,
            })
        },
        rangeChosen(e) {
            // console.log(e)
            let chosen = e.currentTarget.dataset.name
            let id = e.currentTarget.id
                // console.log(e.currentTarget)
            this.setData({
                rangeDefault: chosen,
                rangeSelect: false,
                rangeText: id
            })
            let change = this.data.rangeDefault
            this.triggerEvent('range', { change })
        },
        secondChosen(e) {
            // console.log(e)
            let chosen = e.currentTarget.dataset.name
            let id = e.currentTarget.id
                // console.log(e.currentTarget)
            this.setData({
                secondDefault: chosen,
                secondSelect: false,
                secondText: id
            })
            let chooseId = this.data.secondText
            let change = this.data.secondDefault
            this.triggerEvent('status', { change, chooseId })
        },
    },

    attached: function(options) {
        let myDate = new Date();
        let currentTime = util.formatTime(new Date());
        let today = currentTime.split(' ')[0].split('/').join('-')
        let pre = new Date(myDate - 1000 * 60 * 60 * 24 * 30);
        let lastY = pre.getFullYear();
        let lastM = pre.getMonth() + 1;
        let lastD = pre.getDate();
        let result = lastY + "-" + (lastM < 10 ? "0" + lastM : lastM) + "-" + (lastD < 10 ? "0" + lastD : lastD)
            // console.log(pre)
        this.setData({
            dateStart: result,
            dateEnd: today
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
})