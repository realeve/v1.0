var base = +new Date(2015, 11, 3);
var oneDay = 24 * 3600 * 1000;
var date = [];
var baseDataCount = 7;
var data0 = [10, 12, 21, 54, 260, 830, 710];
var data1 = [30, 182, 434, 791, 390, 30, 10];
var data2 = [320, 1132, 601, 234, 120, 90, 20];

for (var i = 0; i < 60; i++) {
    var now = new Date(base -= oneDay);
    date.unshift([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('-'));
    if (i >= baseDataCount) {
        data0.unshift(Math.random() * 400);
        data1.unshift(Math.random() * 100);
        data2.unshift(Math.random() * 200);
    }
}

option = {
    title: {
        x: 'center',
        text: '某楼盘销售情况',
    },
    legend: {
        y: 'bottom',
        data:['意向','预购','成交']
    },
    toolbox: {
        show: true,
        feature: {
            mark: {show: true},
            dataView: {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
            restore: {show: true},
            saveAsImage: {show: true}
        }
    },
    xAxis: [
        {
            type: 'category',
            boundaryGap: false,
            data: date
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    dataZoom: {
        type: 'inside',
        start: 60,
        end: 80
    },
    series: [
        {
            name:'成交',
            type:'line',
            smooth:true,
            symbol: 'none',
            stack: 'a',
            itemStyle: {normal: {areaStyle: {type: 'default'}}},
            data: data0
        },
        {
            name:'预购',
            type:'line',
            smooth:true,
            stack: 'a',
            symbol: 'none',
            itemStyle: {normal: {areaStyle: {type: 'default'}}},
            data: data1
        },
        {
            name:'意向',
            type:'line',
            smooth:true,
            stack: 'a',
            symbol: 'none',
            itemStyle: {normal: {areaStyle: {type: 'default'}}},
            data: data2
        }
    ]
};
