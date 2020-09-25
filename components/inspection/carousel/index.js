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
        carousel: [{
            id: 1,
            url: '../../../images/pic_home_banner@2x.png',
        }, ],
        indicatorDots: false,
        vertical: false,
        autoplay: true,
        interval: 2000,
        duration: 500,
    },

    /**
     * 组件的方法列表
     */
    methods: {
        // 轮播图
        // onShareAppMessage() {
        //     return {
        //         title: 'swiper',
        //         path: 'page/component/pages/swiper/swiper'
        //     }
        // },
    }
})