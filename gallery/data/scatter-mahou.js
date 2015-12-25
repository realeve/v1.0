var hours = [1,2,3,4,5,6,7,8,9,10,11,12];
var days = ['星期一', '星期二', '星期三',
        '星期四', '星期五', '星期六', '星期日'];

var data = [[3,6,90.04]
,[8,5,86.53]
,[8,3,85.07]
,[7,4,85.16]
,[7,2,85.93]
,[8,6,81.32]
,[3,3,86.41]
,[2,4,87.03]
,[10,5,86.58]
,[12,2,85.24]
,[5,1,86.31]
,[1,3,81.94]
,[7,1,84.79]
,[10,3,86.88]
,[3,5,86.14]
,[1,6,86.82]
,[12,4,84.5]
,[2,2,86.86]
,[12,1,83.41]
,[4,4,86.48]
,[5,5,86.38]
,[4,2,86.4]
,[12,3,88.37]
,[2,1,85.34]
,[5,6,84.08]
,[9,2,87.42]
,[11,4,85.49]
,[5,7,87.59]
,[7,5,84.67]
,[11,2,84.69]
,[10,6,87.18]
,[9,1,87.14]
,[9,4,86.91]
,[12,5,83.03]
,[5,3,86.08]
,[1,4,86.85]
,[11,1,84.16]
,[9,7,87.46]
,[1,2,82.68]
,[9,3,87.9]
,[2,5,86.52]
,[6,2,86.96]
,[8,2,84.37]
,[4,1,85.66]
,[7,3,84.65]
,[4,5,86.57]
,[8,4,85.19]
,[6,4,86.23]
,[6,1,86.01]
,[2,3,86.2]
,[9,6,80.01]
,[9,5,85.79]
,[8,1,82.54]
,[11,3,84.56]
,[11,5,86.19]
,[3,2,86.77]
,[6,3,86.87]
,[10,4,86.59]
,[1,1,82.96]
,[4,3,86.69]
,[5,2,87.04]
,[5,4,85.81]
,[1,5,82.81]
,[10,1,86.31]
,[3,1,86.71]
,[10,2,86.57]
,[3,4,87.08]
,[6,5,86.46]]

min = data.map(function(item){
   return item[2];
});
min.sort();
data = data.map(function (item) {
    return [item[0]-1, item[1]-1, item[2] || '-'];
});

option = {
    backgroundColor:'#445',
    title: {
        text: '机检好品率分布情况',
        subtext: '2014 码后核查系统',
        sublink: 'http://localhost',
        x:'center',
        textStyle: {
            color: '#fff'
        }
    },
    tooltip: {
        position: 'top'
    },
    animation: false,
    grid: {
        height: '99%',
        y:0,
        x:0,
        x2:0,
        containLabel:true
    },
    xAxis: {
        type: 'category',
        data: hours,
        splitLine:{show:false},
        axisLabel: {
            textStyle: {
                color: '#fee'
            }
        },
        axisLine:{show:false},
    },
    yAxis: {
        type: 'category',
        data: days,
        splitLine:{lineStyle:{color:'#777'}},
        axisTick:{show:false},
        axisLine:{show:false},
        axisLabel: {
            textStyle: {
                color: '#fee'
            }
        }
    },
    dataRange: {
        min: 80,
        max: 90,
        calculable: true,
        //orient: 'horizontal',
        x: 'right',
        y: 4,
        color: ['#e23','#23e'],
        textStyle: {
            color: '#fff'
        },
        splitNumber: 5,
       // inRange: {
        //    color: ['#d94e5d','#eac736','#50a3ba'].reverse()
        //},
    },
    series: [{
        name: '好品率',
        type: 'scatter',
        data: data,
        symbolSize: function (val) {
            return (val[2]-min[0]+1) * 6;
        },
    }]
};