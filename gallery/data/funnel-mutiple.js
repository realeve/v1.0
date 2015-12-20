option = {
    title : {
        text: '漏斗图',
        subtext: '纯属虚构',
        x: 'left',
        y: 'bottom'
    },
    tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c}%"
    },
    toolbox: {
        show : true,
        orient: 'vertical',
        y: 'center',
        feature : {
            mark : {show: true},
            dataView : {show: true, readOnly: false},
            restore : {show: true},
            saveAsImage : {show: true}
        }
    },
    legend: {
        orient: 'vertical',
        x: 'left',
        data : ['展现','点击','访问','咨询','订单']
    },
    calculable : true,
    series : [
        {
            name:'漏斗图',
            type:'funnel',
            width: '40%',
            height: '45%',
            x:'5%',
            y:'50%',
            data:[
                {value:60, name:'访问'},
                {value:30, name:'咨询'},
                {value:10, name:'订单'},
                {value:80, name:'点击'},
                {value:100, name:'展现'}
            ]
        },
        {
            name:'金字塔',
            type:'funnel',
            width: '40%',
            height: '45%',
            x: '5%',
            y: '5%',
            sort : 'ascending',
            data:[
                {value:60, name:'访问'},
                {value:30, name:'咨询'},
                {value:10, name:'订单'},
                {value:80, name:'点击'},
                {value:100, name:'展现'}
            ]
        },
        {
            name:'漏斗图',
            type:'funnel',
            width: '40%',
            height: '45%',
            x:'55%',
            y: '5%',
            itemStyle: {
                normal: {
                    // color: 各异,
                    label: {
                        position: 'left'
                    }
                }
            },
            data:[
                {value:60, name:'访问'},
                {value:30, name:'咨询'},
                {value:10, name:'订单'},
                {value:80, name:'点击'},
                {value:100, name:'展现'}
            ]
        },
        {
            name:'金字塔',
            type:'funnel',
            width: '40%',
            height: '45%',
            x:'55%',
            y:'50%',
            sort : 'ascending',
            itemStyle: {
                normal: {
                    // color: 各异,
                    label: {
                        position: 'left'
                    }
                }
            },
            data:[
                {value:60, name:'访问'},
                {value:30, name:'咨询'},
                {value:10, name:'订单'},
                {value:80, name:'点击'},
                {value:100, name:'展现'}
            ]
        }
    ]
};
