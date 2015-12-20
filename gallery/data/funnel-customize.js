option = {
    title : {
        text: '漏斗图',
        subtext: '纯属虚构'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c}%"
    },
    toolbox: {
        show : true,
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    legend: {
        data : ['展现','点击','访问','咨询','订单']
    },
    calculable : true,
    series : [
        {
            name:'预期',
            type:'funnel',
            x: '10%',
            width: '80%',
            itemStyle: {
                normal: {
                    opacity: 0.7,
                    label: {
                        formatter: '{b}预期'
                    },
                    labelLine: {
                        show : false
                    }
                },
                emphasis: {
                    label: {
                        position:'inside',
                        formatter: '{b}预期 : {c}%'
                    }
                }
            },
            data:[
                {value:60, name:'访问'},
                {value:40, name:'咨询'},
                {value:20, name:'订单'},
                {value:80, name:'点击'},
                {value:100, name:'展现'}
            ]
        },
        {
            name:'实际',
            type:'funnel',
            x: '10%',
            width: '80%',
            maxSize: '80%',
            itemStyle: {
                normal: {
                    opacity: 0.5,
                    borderColor: '#fff',
                    borderWidth: 2,
                    label: {
                        position: 'inside',
                        formatter: '{c}%',
                        textStyle: {
                            color: '#fff'
                        }
                    }
                },
                emphasis: {
                    label: {
                        position:'inside',
                        formatter: '{b}实际 : {c}%'
                    }
                }
            },
            data:[
                {value:30, name:'访问'},
                {value:10, name:'咨询'},
                {value:5, name:'订单'},
                {value:50, name:'点击'},
                {value:80, name:'展现'}
            ]
        }
    ]
};
