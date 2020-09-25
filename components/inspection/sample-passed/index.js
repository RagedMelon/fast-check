// components/collect/index/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        samples: {
            type: null,
            observer: function(newVal, oldVal) {
                this.setData({
                    list: newVal
                })
            }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        expand: true,
        list: null,
        tip: '展开',
        tip2: '收起',
        items: [{
                title: '鸡肉',
                time: '2020-08-07 08:02:30',
                market: '石井综合农贸市场',
                owner: '李启新',
                inspector: '王天柱',
                shop: '水产A23档',
                id: 12312
            },
            {
                title: '鸡肉2',
                time: '2020-08-07 08:02:30',
                market: '石井综合农贸市场',
                owner: '李启新2',
                inspector: '王天柱2',
                shop: '水产A23档',
                id: 42423423
            }
        ],
        hide: true,

    },

    /**
     * 组件的方法列表
     */
    methods: {
        viewReport(event) {
            let sampleId = event.currentTarget.dataset.id
            console.log(sampleId)
            let postId = String(sampleId)
            wx.navigateTo({
                url: '/pagesInspection/pages/testReport/testReport?id=' + postId,
            })
        },
        editResult(e) {
            // console.log('跳转到详情页面', e.currentTarget.dataset.info)
            let sampleCode = e.currentTarget.dataset.code
            wx.navigateTo({
                url: '/pagesInspection/pages/reInspect/reInspect?code=' + sampleCode,
            })
        },
        expand: function(e) {
            let that = this
            let index = 0;
            let array = this.data.list; //获取循环数组对象
            for (let item of array) {
                //如果当前点击的对象index和循环对象里的index一致
                if (item.sampleId == e.currentTarget.dataset.id) {
                    //判断当前对象中的insert是否为true（true为显示，其他为隐藏） insert是新增的一个值然后进行判断
                    if (array[index].insert == "" || array[index].insert == undefined) {
                        array[index].insert = "true"
                    } else {
                        array[index].insert = ""
                    }
                }
                index++;
            }
            //将数据动态绑定 
            that.setData({
                list: array
            })
        },
    }
})