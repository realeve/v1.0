myChart.showLoading();

$.get('data/asset/data/obama_budget_proposal_2012.list.json', function (obama_budget_2012) {
    myChart.hideLoading();

    option = {
        tooltip : {
            trigger: 'item'
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType: {show: true, type: ['line', 'bar']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        legend: {
            data:['Growth', 'Budget 2011', 'Budget 2012'],
            itemGap: 5
        },
        grid: {
            y: '12%',
            x: '1%',
            x2: '10%',
            containLabel: true
        },
        xAxis: [
            {
                type : 'category',
                data : obama_budget_2012.names
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: 'Growth',
                splitLine: {show: false},
                axisLabel: {
                    formatter: function (a) {
                        a = +a;
                        return isFinite(a)
                            ? a + '%'
                            : '';
                    }
                }
            },
            {
                type : 'value',
                name : 'Budget (million USD)',
                axisLabel: {
                    formatter: function (a) {
                        a = +a;
                        return isFinite(a)
                            ? echarts.format.addCommas(+a / 1000)
                            : '';
                    }
                }
            }
        ],
        dataZoom: [
            {
                show: true,
                start: 94,
                end: 100,
                handleSize: 8
            },
            {
                type: 'inside',
                start: 94,
                end: 100
            },
            {
                show: true,
                yAxisIndex: 1,
                filterMode: 'empty',
                width: 12,
                height: '70%',
                handleSize: 8,
                showDataShadow: false,
                x: '93%'
            }
        ],
        series : [
            {
                name: 'Growth',
                type: 'line',
                // showAllSymbol: true,
                data: obama_budget_2012.delta
            },
            {
                name: 'Budget 2011',
                yAxisIndex: 1,
                type: 'bar',
                data: obama_budget_2012.budget2011List
            },
            {
                name: 'Budget 2012',
                yAxisIndex: 1,
                type: 'bar',
                data: obama_budget_2012.budget2012List
            }
        ]
    };

    myChart.setOption(option);

});