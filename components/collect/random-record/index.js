// components/collect/index/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        month: {
            type: null,
            observer: function(newVal, oldVal) {
                this.setData({
                    record: newVal
                })
            }
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        more: false,
        record: [{
                food: '海鲈鱼',
                time: '2020-07-28 15:20:46',
                elements: [{
                        name: '氯霉素',
                        result: '阳性',
                    },
                    {
                        name: '氯霉素',
                        result: '-性',
                    },
                ]
            },
            {
                food: '剥皮牛',
                time: '2020-07-28 15:20:46',
                elements: [{
                    name: '氯霉素',
                    result: '+性',
                }]
            },
            {
                food: '海鲈鱼',
                time: '2020-07-28 15:20:46',
                elements: [{
                        name: '氯霉素',
                        result: '++性',
                    },
                    {
                        name: '氯霉素',
                        result: '--性',
                    },
                ]
            },
            {
                food: '剥皮牛',
                time: '2020-07-28 15:20:46',
                elements: [{
                    name: '氯霉素',
                    result: '阳性',
                }]
            }
        ]
    },


    /**
     * 组件的方法列表
     */
    methods: {
        expand() {
            this.setData({
                more: !this.data.more
            })
        },
    }
})