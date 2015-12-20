var labelRight = {normal: {label : {position: 'right'}}};
option = {
    title: {
        text: '交错正负轴标签',
        subtext: 'From ExcelHome',
        sublink: 'http://e.weibo.com/1341556070/AjwF2AgQm'
    },
    tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        y: 80,
        y2: 30
    },
    xAxis : [
        {
            type : 'value',
            position: 'top',
            splitLine: {lineStyle:{type:'dashed'}},
        }
    ],
    yAxis : [
        {
            type : 'category',
            axisLine: {show: false},
            axisLabel: {show: false},
            axisTick: {show: false},
            splitLine: {show: false},
            data : ['ten', 'nine', 'eight', 'seven', 'six', 'five', 'four', 'three', 'two', 'one']
        }
    ],
    series : [
        {
            name:'生活费',
            type:'bar',
            stack: '总量',
            itemStyle : { normal: {
                borderRadius: 5,
                label : {
                    show: true,
                    position: 'left',
                    formatter: '{b}'
                }
            }},
            data:[
                {value:-0.07, itemStyle:labelRight},
                {value:-0.09, itemStyle:labelRight},
                0.2, 0.44,
                {value:-0.23, itemStyle:labelRight},
                0.08,
                {value:-0.17, itemStyle:labelRight},
                0.47,
                {value:-0.36, itemStyle:labelRight},
                0.18
            ]
        }
    ]
};
