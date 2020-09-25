import { dataAnalysisModel } from '../../../models/collect/dataAnalysis'
let apiData = new dataAnalysisModel();
import * as echarts from '../../../components/collect/ec-canvas/echarts';
const util = require('../../../utils/util.js')
const app = getApp();

// let chart;

function setOption(chart, xlist, ylist1, ylist2) {
    var option = {
        legend: {
            data: ['抽检档口数', '抽检商品数'],
            itemWidth: 16,
            itemHeight: 16,
            // icon: 'emptyCircle'
            icon: 'circle',
            itemGap: 35
        },

        xAxis: {
            type: 'category',
            // boundaryGap: false,
            data: xlist,
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                color: '#808080',
                interval: 0,
                formatter: function(value) {
                    // debugger
                    var ret = ""; //拼接加\n返回的类目项  
                    var maxLength = 2; //每项显示文字个数  
                    var valLength = value.length; //X轴类目项的文字个数  
                    var rowN = Math.ceil(valLength / maxLength); //类目项需要换行的行数  
                    if (rowN > 1) //如果类目项的文字大于3,  
                    {
                        for (var i = 0; i < rowN; i++) {
                            var temp = ""; //每次截取的字符串  
                            var start = i * maxLength; //开始截取的位置  
                            var end = start + maxLength; //结束截取的位置  
                            //这里也可以加一个是否是最后一行的判断，但是不加也没有影响，那就不加吧  
                            temp = value.substring(start, end) + "\n";
                            ret += temp; //凭借最终的字符串  
                        }
                        return ret;
                    } else {
                        return value;
                    }
                }
            }
        },
        yAxis: [{
            type: 'value',
            max: function(value) {
                return value.max + 5;
            },
            axisLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                color: '#808080'
            },
            splitLine: {
                lineStyle: {
                    color: '#FAFAFA'
                }
            }


        }],
        series: [{
                name: '抽检档口数',
                type: 'bar',
                data: ylist1,
                color: '#62D664',
                barWidth: 8,
                itemStyle: {
                    barBorderRadius: 4
                },
            },
            {
                name: '抽检商品数',
                type: 'bar',
                data: ylist2,
                color: '#FFC51A',
                barWidth: 8,
                itemStyle: {
                    barBorderRadius: 4
                }
            }
        ]
    };
    chart.setOption(option);
}

Page({
    data: {
        // 数据图
        ec: {
            lazyLoad: true
        },
        // xlist: [],
        xlist: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        ylist: [],
        ylist2: [],
        // list: ['全款', '待收货', '待发货', '已收货'],
        activeIndex: 0,
        //   其他data
        monthFilter: '月份',
        selectedDate: '',
        year: null,
        month: null,
        marketSelect: false,
        marketFilter: '市场名称',
        marketDefault: '请选择市场',
        marketId: null,
        marketList: [],
        dataInfo: null,
        viewData: [],
        boothNum: [], //抽检档口数
        sampleNum: [], //抽检商品数
        type: [], //类型
        rate1: '',
        rate2: '',
        rate3: '',
    },
    // 筛选器方法
    // 时间选择
    getDateTime(e) {
        console.log(e.detail.value)
        let year = e.detail.value.split('-')[0]
        let month = e.detail.value.split('-')[1]
        this.setData({
            year: year,
            month: month
        })
        let postInfo = {
            marketId: this.data.marketId,
            monthStr: e.detail.value
        }
        apiData.getMonthlyData(postInfo).then(res => {
            console.log(res)
            let list = res.data.staViewDTOs
            let boothNum = [] //抽检档口数
            let sampleNum = [] //抽检商品数
            let type = [] //类型
            for (let index in list) {
                boothNum.push(list[index].boothNum)
                sampleNum.push(list[index].sampleNum)
                type.push(list[index].productType)
            }
            console.log(boothNum, sampleNum, type)
            this.setData({
                    dataInfo: res.data,
                    rate1: res.data.keySampleRate.toFixed(2),
                    rate2: res.data.passedInpsectRate.toFixed(2),
                    rate3: res.data.coverageRate.toFixed(2),
                    viewData: res.data.staViewDTOs,
                    xlist: type,
                    ylist: boothNum,
                    ylist2: sampleNum
                })
                // 初始化视图
            this.oneComponent = this.selectComponent('#mychart-one');
            this.getOneOption();
        })

        console.log(postInfo)


    },
    // 市场名称
    bindShowsecond() {
        this.setData({
            marketSelect: !this.data.marketSelect,
        })
    },
    secondChosen(e) {
        console.log(e.currentTarget.dataset.id)
        this.setData({
            marketSelect: false,
        })
        let postInfo = {
            marketId: e.currentTarget.dataset.id,
            monthStr: this.data.selectedDate
        }
        apiData.getMonthlyData(postInfo).then(res => {
            console.log(res)
            let list = res.data.staViewDTOs
            let boothNum = [] //抽检档口数
            let sampleNum = [] //抽检商品数
            let type = [] //类型
            for (let index in list) {
                boothNum.push(list[index].boothNum)
                sampleNum.push(list[index].sampleNum)
                type.push(list[index].productType)
            }
            console.log(boothNum, sampleNum, type)
            this.setData({
                    dataInfo: res.data,
                    rate1: res.data.keySampleRate.toFixed(2),
                    rate2: res.data.passedInpsectRate.toFixed(2),
                    rate3: res.data.coverageRate.toFixed(2),
                    viewData: res.data.staViewDTOs,
                    xlist: type,
                    ylist: boothNum,
                    ylist2: sampleNum
                })
                // 初始化视图
            this.oneComponent = this.selectComponent('#mychart-one');
            this.getOneOption();
        })


    },
    // echarts折线图
    getOneOption: function() {
        this.setData({
            // xlist: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            // ylist: [120, 132, 101, 134, 90, 230, 210],
            // ylist2: [220, 182, 191, 234, 290, 330, 310]
        })
        this.init_one(this.data.xlist, this.data.ylist, this.data.ylist2)
    },
    init_one: function(xdata, ylist1, ylist2) { //初始化第一个图表
        console.log(this.oneComponent)
        this.oneComponent.init((canvas, width, height, dpr) => {
            const chart = echarts.init(canvas, null, {
                width: width,
                height: height,
                devicePixelRatio: dpr // 解决模糊问题
            });
            setOption(chart, xdata, ylist1, ylist2) //赋值给echart图表
            this.chart = chart;
            return chart;
        });
    },
    onLoad: function(options) {
        // let myDate = new Date();
        let currentTime = util.formatTime(new Date());
        let date = currentTime.split(' ')[0].split('/')
        let deleteDay = date.pop()
        let monthStr = date.join('-') //默认当前月份
        this.setData({
            year: date[0],
            month: date[1],
            selectedDate: monthStr
        })
        apiData.getAllmarket().then(res => {
                console.log(res)
                this.setData({
                    marketList: res.data,
                    marketDefault: res.data[0].marketName,
                    marketId: res.data[0].id
                })
                let postInfo = {
                    marketId: res.data[0].id,
                    monthStr: monthStr
                }
                console.log(postInfo)
                apiData.getMonthlyData(postInfo).then(res => {
                    console.log(res)
                    let list = res.data.staViewDTOs
                    let boothNum = [] //抽检档口数
                    let sampleNum = [] //抽检商品数
                    let type = [] //类型
                    for (let index in list) {
                        boothNum.push(list[index].boothNum)
                        sampleNum.push(list[index].sampleNum)
                        type.push(list[index].productType)
                    }
                    console.log(boothNum, sampleNum, type)
                    this.setData({
                            dataInfo: res.data,
                            rate1: res.data.keySampleRate.toFixed(2),
                            rate2: res.data.passedInpsectRate.toFixed(2),
                            rate3: res.data.coverageRate.toFixed(2),
                            viewData: res.data.staViewDTOs,
                            xlist: type,
                            ylist: boothNum,
                            ylist2: sampleNum
                        })
                        // 初始化视图
                    this.oneComponent = this.selectComponent('#mychart-one');
                    this.getOneOption();
                })
            })
            // 初始化视图
            // this.oneComponent = this.selectComponent('#mychart-one');
            // this.getOneOption();

    },
    /**
     * 生命周期函数--监听页面加载
     */
    //切换柱状图
})