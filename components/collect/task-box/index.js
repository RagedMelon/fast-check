// components/collect/index/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        taskList: { //tabbar的数据
            type: null,
            observer: function(newVal, oldVal) {
                this.setData({
                    List: newVal
                })
            }
        },
    },

    /**
     * 组件的初始数据
     */
    data: {
        splitter: ' ',
        List: null,
        task: {
            type: '肉类检测',
            status: '已过期',
            num: 'RL-15',
            time: '2020-08-05',
            market: '石井综合农贸市场',
            veg: 300,
            fruit: 300,
            meat: 300,
        }

    },

    /**
     * 组件的方法列表
     */
    methods: {
        taskDetails: function(event) {
            let taskId = event.currentTarget.id
            let postId = String(taskId)
            wx.removeStorageSync('missionId')
            wx.setStorageSync('missionId', taskId)
            wx.navigateTo({
                url: '/pagesCollect/pages/taskDetails/taskDetails?id=' + postId,

            })
        },
        taskDetails2: function(event) {
            let taskId = event.currentTarget.id
            let postId = String(taskId)
            wx.removeStorageSync('missionId')
            wx.setStorageSync('missionId', taskId)
            wx.navigateTo({
                url: '/pagesCollect/pages/taskDetails2/taskDetails2?id=' + postId,
            })
        },
    }
})