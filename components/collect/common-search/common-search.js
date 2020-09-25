"use strict";

Component({
    properties: {
        tab_datas: {
            type: Array,
            value: [],
            observer: "onItemsChange"
        },

    },


    data: {
        content: '',
        searchValue: '',
        array: ['美国', '中国', '巴西', '日本'],
        index: 0, //默认选中首位城市
    },


    methods: {
        onItemsChange: function onItemsChange() {
            this.setData({

            });
        },
        bindSearchInput: function bindSearchInput(e) {
            this.setData({
                content: e.detail.value
            })
            this.triggerEvent('onSearchInputChange', { content: e.detail.value });
        },
        onClickClear: function onClickClear(e) {
            this.setData({
                searchValue: '',
                content: ''
            });
            this.triggerEvent('onSearchInputChange', { content: this.data.content });
        },
        bindConfirmSearch: function bindConfirmSearch(e) {
            this.triggerEvent('onClickSubmit', { content: e.detail.value });
        },
        onClickSearch: function onClickSearch(e) {
            this.triggerEvent('onClickSubmit', { content: this.data.content });
        },

        bindPickerChange: function(e) {
            console.log('picker发送选择改变，携带值为', e.detail.value)
            this.setData({
                index: e.detail.value
            })
            this.triggerEvent('changeCity', { content: this.data.index });
        },
    }
});