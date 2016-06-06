//document.getElementsByClassName('section')[0].style.height = window.screen.height+'px';
require.config({　　　　
    baseUrl: "assets/js",
    paths: {　　　　　　
        "jquery": "jquery.min",
        "jquery.fullPage": "jquery.fullPage.min",
        "echarts": "echarts.min",
        "waypoints": "waypoints.min",
        "jquery.counterup": "jquery.counterup.min",
        "fakeLoader": "fakeLoader.js/fakeLoader.min"
    },
    shim: {　　　　
        'jquery.fullPage': {　　　　　　
            deps: ['jquery']　　　
        },
        　　　　
        'jquery.counterup': {　　　　　　
            deps: ['jquery']　　　
        }

    }　　
});

var gb = {
    loadComplete: false,
    colors: {
        white: "#FFF",
        whiteMedium: "rgba(255, 255, 255, 0.6)",
        whiteMediumLight: "rgba(255, 255, 255, 0.3)",
        whiteLight: "rgba(255, 255, 255, 0.2)",
        whiteLighter: "rgba(255, 255, 255, 0.1)",
        primary: "#556fb5",
        primaryLight: "#889acb"
    },
    dbSheetIdx: 53, //数据库中成绩表单初始ID值，减去该值后得到用户是第几个参加活动
    option: [],
    optionRenderFlag: [],
    userInfo: {},
    dom: [],
    myChart: [],
    loadBscInfo: false,
    color: ["#61A5E8", "#7ECF51", "#EECB5F", "#E4925D", "#E16757", "#9570E5", "#605FF0", "#85ca36", "#1c9925", "#0d8b5f", "#0f9cd3", "#2f7e9b", "#2f677d", "#9b7fed", "#7453d6", "#3b1d98", "#27abb1", "#017377", "#015f63", "#b86868", "#5669b7", "#e5aab4", "#60b65f", "#98d2b2", "#c9c8bc", "#45c3dc", "#e17979", "#5baa5a", "#eaccc2", "#ffaa74"]
};

//require(['jquery', 'echarts', 'fakeLoader', 'waypoints', 'jquery.fullPage', 'jquery.counterup'], function($, echarts) {
require(['echarts', 'waypoints', 'jquery.counterup', 'jquery.fullPage'], function(echarts) {
    function getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = encodeURI(window.location.search).substr(1).match(reg); //匹配目标参数
        if (r !== null) return decodeURI(r[2]);
        return null; //返回参数值
        //return App.getURLParameter(name);
    }

    for (var i = 1; i < 9; i++) {
        gb.dom[i] = document.getElementById("chart" + i);
    }

    var uid = getUrlParam('uid');

    var initOption = function() {
        var option = {
            color: ['rgba(255,255,255,0.6)'],
            grid: {
                borderWidth: 0,
                x: 15,
                y: 60,
                x2: 15,
                y2: 35
            },
            tooltip: {},
            yAxis: [{
                type: 'category',
                "show": false,
                data: []
            }],
            xAxis: [{
                type: 'value',
                splitLine: {
                    show: !0,
                    lineStyle: {
                        type: "dashed",
                        color: gb.colors.whiteLight
                    }
                },
                axisLine: {
                    show: !1
                },
                axisTick: {
                    show: !1
                },
                boundaryGap: 0,
                axisLabel: {
                    textStyle: {
                        color: gb.colors.whiteMedium
                    }
                }
            }],
            series: [{
                name: '得分',
                type: "bar",
                barMaxWidth: 60,
                areaStyle: {
                    normal: {
                        color: gb.colors.whiteMediumLight
                    }
                },
                lineStyle: {
                    normal: {
                        width: 1
                    }
                },
                data: [],
                itemStyle: {
                    normal: {
                        color: gb.colors.whiteMedium,
                        width: 1,
                        label: {
                            show: false,
                            textStyle: {
                                fontSize: 15,
                                color: '#fff'
                            },
                            position: 'insideRight',
                            formatter: '{b}:{c}'
                        },
                        barBorderRadius: 2
                    }
                },
                //animationEasing: 'cubicInOut',
                //animationEasingUpdate: 'cubicInOut',
                animationDelay: function(idx) {
                    return idx * 200;
                },
                animationDelayUpdate: function(idx) {
                    return idx * 200;
                }
            }]
        };
        return option;
    };

    //gb.option[0] = initOption();

    function getScoreOrder() {
        //载入首页信息完毕，准备第二页信息
        $.ajax({
            url: 'http://cbpc540.applinzi.com/index.php?s=/addon/GoodVoice/GoodVoice/getScoreOrder&score=' + gb.userInfo.score,
            async: false,
            dataType: "jsonp",
            callback: "JsonCallback"
        }).done(function(obj) {
            //console.log(1);
            //$('[name="progress"]').text('10%');
            gb.userInfo.peopleNums = obj.allPeople;
            gb.userInfo.scoreOrder = obj.scoreOrder;
            gb.userInfo.scorePropt = (obj.scoreOrder == 1) ? 100 : obj.lessThan;
            //总人数
            $('[name="totals"]').text(gb.userInfo.peopleNums);

            $('[name="ltdOrder"]').text(gb.userInfo.scoreOrder);
            $('[name="scorePropt"]').text(gb.userInfo.scorePropt);
            $('[name="scoreProptDesc"]').text(Number.parseFloat(gb.userInfo.scorePropt) > 50 ? "，想想是不是有点小激动呢？" : "。");
            getScoreOrderByDpt();
        });
    }

    function getScoreOrderByDpt() {
        //载入首页信息完毕，准备第二页信息
        $.ajax({
            url: 'http://cbpc540.applinzi.com/index.php?s=/addon/GoodVoice/GoodVoice/getScoreOrderByDpt&score=' + gb.userInfo.score + "&dpt=" + gb.userInfo.user_dpt,
            async: false,
            dataType: "jsonp",
            callback: "JsonCallback"
        }).done(function(obj) {
            //console.log(2);
            //$('[name="progress"]').text('20%');
            gb.userInfo.dpt = {};
            gb.userInfo.dpt.all = obj.dpt_people;
            gb.userInfo.dpt.peopleNums = obj.allPeople;
            gb.userInfo.dpt.scoreOrder = obj.scoreOrder;
            gb.userInfo.dpt.scorePropt = (obj.scoreOrder == 1) ? 100 : obj.lessThan;

            $('[name="dptName"]').text(gb.userInfo.user_dpt);

            //总人数
            $('[name="dptCrewNum"]').text(gb.userInfo.dpt.all);
            $('[name="dptTotals"]').text(gb.userInfo.dpt.peopleNums);
            $('[name="dptOrder"]').text(gb.userInfo.dpt.scoreOrder);

            $('[name="dptScorePropt"]').text(gb.userInfo.dpt.scorePropt);
            getTimeLength();
        });
    }
    // Handles counterup plugin wrapper
    var handleCounterup = function(obj, time) {
        if (!$().counterUp) {
            return;
        }

        obj.counterUp({
            delay: 10,
            time: time
        });
    };

    //handleCounterup($('[name="progress"]'), 5000);

    //用户分数排名(在部门或在公司中排序)
    function getScoreRangeOption(obj, option) {
        userScore = Math.floor(Number.parseInt(gb.userInfo.score) / 10) * 10;
        option.grid.x = 35;
        option.yAxis = [{
            "type": "category",
            "show": true,
            "axisLine": {
                "show": false
            },
            "axisTick": {
                "show": false
            },
            "splitLine": {
                "show": false
            },
            "axisLabel": {
                "textStyle": {
                    "color": "rgba(255, 255, 255, 0.6)"
                }
            },
            "data": []
        }];
        obj.map(function(data, i) {
            option.yAxis[0].data.push(data.score);
            if (userScore != data.score) {
                option.series[0].data.push(data.nums);
            } else {
                option.series[0].data.push({
                    value: data.nums,
                    itemStyle: {
                        normal: {
                            color: '#95E570'
                        }
                    },
                    label: {
                        normal: {
                            show: true,
                            formatter: '你的分数 ' + gb.userInfo.score + ' 分'
                        }
                    }
                });
            }
        });
        return option;
    }

    function getTimeLength() {

        $.ajax({
            url: 'http://cbpc540.applinzi.com/index.php?s=/addon/GoodVoice/GoodVoice/getTimeLength',
            async: false,
            dataType: "jsonp",
            callback: "JsonCallback"
        }).done(function(obj) {
            //console.log(3);
            //$('[name="progress"]').text('30%');
            gb.userInfo.dptTime = obj.dptTime;
            gb.userInfo.ltdTime = obj.ltdTime;

            $('[name="timeDesc1"]').text(Number.parseInt(gb.userInfo.timeUsed) < Number.parseInt(gb.userInfo.dptTime) ? '低于' : '高于');
            $('[name="timeDesc2"]').text(Number.parseInt(gb.userInfo.timeUsed) < Number.parseInt(gb.userInfo.ltdTime) ? '低于' : '高于');

            //总人数
            $('[name="dptTimeLength"]').text((Number.parseInt(gb.userInfo.dptTime) / 60).toFixed(1));
            $('[name="ltdTimeLength"]').text((Number.parseInt(gb.userInfo.ltdTime) / 60).toFixed(1));

            getAnsweredRatio();
        });
    }

    //活动参与度     
    function getAnsweredRatio() {
        $.ajax({
            url: 'http://cbpc540.applinzi.com/index.php?s=/addon/GoodVoice/GoodVoice/getAnsweredRatio',
            async: false,
            dataType: "jsonp",
            callback: "JsonCallback"
        }).done(function(obj) {
            //console.log(4);
            //$('[name="progress"]').text('40%');
            //部门间比较信息
            //gb.userInfo.dptCompare = {};
            gb.userInfo.dptCompare.answerRatio = obj;
            $('[name="mostPeople"]').text(obj[0].dpt);
            $('[name="answeredPrpt"]').text(obj[0].answeredRatio);

            //如果不是第一
            if (obj[0].dpt != gb.userInfo.user_dpt) {
                $('[name="answerRatioDesc"]').text(',赶快邀请小伙伴们来参与活动吧。');
            } else {
                $('[name="answerRatioDesc"]').text('，告诉小伙伴们要继续努力哦。');
            }
            getScoreCompare();
        });
    }

    //得分对比
    function getScoreCompare() {
        $.ajax({
            url: 'http://cbpc540.applinzi.com/index.php?s=/addon/GoodVoice/GoodVoice/getScoreCompare',
            async: false,
            dataType: "jsonp",
            callback: "JsonCallback"
        }).done(function(obj) {
            //console.log(5);
            //$('[name="progress"]').text('50%');
            //部门间比较信息
            //gb.userInfo.dptCompare = {};
            gb.userInfo.dptCompare.scoreCompare = obj;
            $('[name="highestScore"]').text(obj[0].dpt);
            $('[name="highestScorePrpt"]').text(obj[0].score);
            getPrizeCompare();
        });
    }

    //获奖对比
    function getPrizeCompare() {
        $.ajax({
            url: 'http://cbpc540.applinzi.com/index.php?s=/addon/GoodVoice/GoodVoice/getPrizeCompare',
            async: false,
            dataType: "jsonp",
            callback: "JsonCallback"
        }).done(function(obj) {
            //console.log(6);
            //$('[name="progress"]').text('60%');
            //部门间比较信息
            //gb.userInfo.dptCompare = {};
            gb.userInfo.dptCompare.prizeCompare = obj;
            $('[name="prizePrpt"]').text(obj[0].passRatio);
            get2ndPassedCompare();

        });
    }

    //获奖对比
    function get2ndPassedCompare() {
        $.ajax({
            url: 'http://cbpc540.applinzi.com/index.php?s=/addon/GoodVoice/GoodVoice/get2ndPassedRatio',
            async: false,
            dataType: "jsonp",
            callback: "JsonCallback"
        }).done(function(obj) {
            //console.log(7);
            //$('[name="progress"]').text('70%');
            $('[name="2ndTimesPrpt"]').text(obj['2ndPassedRatio']);
            $('[name="1stTime"]').text(obj.moreChance);

            $.ajax({
                url: 'http://cbpc540.applinzi.com/index.php?s=/addon/GoodVoice/GoodVoice/get2ndPassedCompare',
                async: false,
                dataType: "jsonp",
                callback: "JsonCallback"
            }).done(function(obj) {
                //gb.userInfo.dptCompare = {};
                //console.log(8);
                //$('[name="progress"]').text('80%');
                gb.userInfo.dptCompare.moreChancePassedCompare = obj;
                getScoreRangeByDpt();
            });

        });
    }

    function getScoreRangeByDpt() {
        $.ajax({
            url: 'http://cbpc540.applinzi.com/index.php?s=/addon/GoodVoice/GoodVoice/getScoreRangeByDpt&dpt=' + gb.userInfo.user_dpt,
            async: false,
            dataType: "jsonp",
            callback: "JsonCallback"
        }).done(function(obj) {
            //console.log(9);
            //$('[name="progress"]').text('90%');
            var mostScore = obj[obj.length - 1];
            $('[name="dptMostScore"]').text(mostScore.score);
            $('[name="dptMostScoreNum"]').text(mostScore.nums);
            $('[name="dptMostScoreDesc"]').text("他们对安全规章制度一定是熟记于心了，");
            gb.userInfo.dptScoreOrder = obj;
            getScoreRange();
        });
    }

    function getScoreRange() {

        $.ajax({
            url: 'http://cbpc540.applinzi.com/index.php?s=/addon/GoodVoice/GoodVoice/getScoreRange',
            async: false,
            dataType: "jsonp",
            callback: "JsonCallback"
        }).done(function(obj) {
            //console.log(10);
            gb.userInfo.scoreRange = obj;
            for (var i = 2; i <= 9; i++) {
                gb.option[i] = getOptions(i);
            }
            //$('[name="progress"]').text('99%');
            initDom();
        });
    }

    var getOptions = function(index) {
        var option;
        if (index == 2 && !gb.optionRenderFlag[index - 2]) {

            option = initOption();
            option.series[0].data = [];
            option = getScoreRangeOption(gb.userInfo.scoreRange, option);
            gb.optionRenderFlag[index - 2] = true;
            return option;

        } else if (index == 3 && !gb.optionRenderFlag[index - 2]) {

            option = initOption();
            option.series[0].data = [];
            option = getScoreRangeOption(gb.userInfo.dptScoreOrder, option);

            //gb.myChart[index - 2].setOption(option);
            gb.optionRenderFlag[index - 2] = true;
            return option;

        } else if (index == 4 && !gb.optionRenderFlag[index - 2]) {
            //获取下一页，参与度信息

            option = initOption();

            option.series[0].data = [];
            option.yAxis[0].data = ['全公司', gb.userInfo.user_dpt, gb.userInfo.user_name];
            option.series[0].name = "答题时间";
            option.series[0].data = [(Number.parseInt(gb.userInfo.ltdTime) / 60).toFixed(1), (Number.parseInt(gb.userInfo.dptTime) / 60).toFixed(1), {
                value: (Number.parseInt(gb.userInfo.timeUsed) / 60).toFixed(1),
                itemStyle: {
                    normal: {
                        color: 'rgb(99,201,99)',
                        label: {
                            "textStyle": {
                                "color": "#fff"
                            }
                        }
                    }
                }
            }];
            option.series[0].itemStyle.normal.label = {
                "show": true,
                "textStyle": {
                    "fontSize": 18,
                    "color": "#333"
                },
                "position": "insideLeft",
                "formatter": "{b}:{c}分钟"
            };

            //gb.myChart[index - 2].setOption(option);
            gb.optionRenderFlag[index - 2] = true;
            return option;

        } else if (index == 5 && !gb.optionRenderFlag[index - 2]) {

            option = initOption();
            option.series = [{
                name: '已参与',
                type: 'bar',
                barMaxWidth: 60,
                stack: '比例',
                label: {
                    normal: {
                        show: false,
                        position: 'insideLeft',
                        textStyle: {
                            fontSize: 15
                        },
                        formatter: function(param) {
                            return param.name + '\n' + (param.value).toFixed(2) + '%';
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        color: function(params) {
                            return gb.color[params.dataIndex];
                        },
                    }
                },
                data: [],
                //animationEasing: 'cubicInOut',
                //animationEasingUpdate: 'cubicInOut',
                animationDelay: function(idx) {
                    return idx * 100;
                },
                animationDelayUpdate: function(idx) {
                    return idx * 100;
                }
            }, {
                name: '未参与',
                type: 'bar',
                barMaxWidth: 60,
                stack: '比例',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight',
                        textStyle: {
                            fontSize: 15
                        },
                        formatter: function(param) {
                            return param.name + '\n' + (100 - param.value).toFixed(2) + '%';
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        color: gb.colors.whiteMediumLight
                    }
                },
                data: [],
                //animationEasing: 'cubicInOut',
                //animationEasingUpdate: 'cubicInOut',
                animationDelay: function(idx) {
                    return idx * 100;
                },
                animationDelayUpdate: function(idx) {
                    return idx * 100;
                }
            }];

            gb.userInfo.dptCompare.answerRatio.map(function(data) {
                option.yAxis[0].data.push(data.dpt);
                var curRatio = Number.parseFloat(data.answeredRatio);
                option.series[0].data.push(curRatio);
                option.series[1].data.push(100 - curRatio);
            });
            //如果有一半以上的人员参与
            if (option.series[0].data[0] > 50) {
                option.series[0].label.normal.show = true;
                option.series[1].label.normal.show = false;
            }
            option.yAxis[0].data.reverse();
            option.series[0].data.reverse();
            option.series[1].data.reverse();

            //gb.myChart[index - 2].setOption(option);
            gb.optionRenderFlag[index - 2] = true;

            return option;

        } else if (index == 6 && !gb.optionRenderFlag[index - 2]) {

            option = {
                color: gb.color,
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}分 : {c}人 ({d}%)"
                },
                legend: {
                    show: false,
                    orient: 'vertical',
                    left: 'left',
                    data: []
                },
                series: [{
                    name: '得分分布',
                    type: 'pie',
                    radius: '60%',
                    center: ['50%', '50%'],
                    data: [],
                    label: {
                        normal: {
                            textStyle: {
                                color: '#334'
                            },
                            formatter: '{b}分\n({d}%)'
                        }
                    },
                    labelLine: {
                        normal: {
                            length: 10,
                            lineStyle: {
                                color: '#334'
                            }
                        }
                    },
                    //animationEasing: 'cubicInOut',
                    //animationEasingUpdate: 'cubicInOut',
                    animationDelay: function(idx) {
                        return idx * 100;
                    },
                    animationDelayUpdate: function(idx) {
                        return idx * 100;
                    }
                }]
            };
            gb.userInfo.dptScoreOrder.map(function(data) {
                option.legend.data.push(data.score);
                option.series[0].data.push({
                    name: data.score,
                    value: data.nums
                });
            });

            //gb.myChart[index - 2].setOption(option);
            gb.optionRenderFlag[index - 2] = true;
            return option;

        } else if (index == 7 && !gb.optionRenderFlag[index - 2]) {

            option = initOption();
            option.tooltip = {
                trigger: 'item',
                formatter: "{a} <br/>{b} :{c}分"
            };
            option.series = [{
                name: '平均得分',
                type: 'bar',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight',
                        textStyle: {
                            fontSize: 15
                        },
                        formatter: '{b}\n{c}分'
                    }
                },
                itemStyle: {
                    normal: {
                        color: function(params) {
                            return gb.color[params.dataIndex];
                        },
                    }
                },
                data: [],
                //animationEasing: 'cubicInOut',
                //animationEasingUpdate: 'cubicInOut',
                animationDelay: function(idx) {
                    return idx * 100;
                },
                animationDelayUpdate: function(idx) {
                    return idx * 100;
                }
            }];

            gb.userInfo.dptCompare.scoreCompare.map(function(data) {
                option.yAxis[0].data.push(data.dpt);
                option.series[0].data.push(data.score);
            });
            option.yAxis[0].data.reverse();
            option.series[0].data.reverse();

            //gb.myChart[index - 2].setOption(option);
            gb.optionRenderFlag[index - 2] = true;
            return option;

        } else if (index == 8 && !gb.optionRenderFlag[index - 2]) {

            option = initOption();

            option.tooltip = {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c}%"
            };
            option.series = [{
                name: '获奖比例',
                type: 'bar',
                barMaxWidth: 60,
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight',
                        textStyle: {
                            fontSize: 15
                        },
                        formatter: '{b}\n{c}%'
                    }
                },
                itemStyle: {
                    normal: {
                        color: function(params) {
                            return gb.color[params.dataIndex];
                        },
                    }
                },
                data: [],
                //animationEasing: 'cubicInOut',
                //animationEasingUpdate: 'cubicInOut',
                animationDelay: function(idx) {
                    return idx * 100;
                },
                animationDelayUpdate: function(idx) {
                    return idx * 100;
                }
            }];

            gb.userInfo.dptCompare.prizeCompare.map(function(data) {
                option.yAxis[0].data.push(data.dpt);
                option.series[0].data.push(data.dptPassRatio);
            });
            option.yAxis[0].data.reverse();
            option.series[0].data.reverse();

            //gb.myChart[index - 2].setOption(option);
            gb.optionRenderFlag[index - 2] = true;
            return option;

        } else if (index == 9 && !gb.optionRenderFlag[index - 2]) {

            option = initOption();
            option.legend = {
                show: true,
                data: ['第二次', '第一次'],
                textStyle: {
                    color: '#fff'
                },
                x: 'right',
                y: 30
            };
            option.tooltip = {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c}%"
            };
            option.yAxis = [{
                "type": "category",
                "show": true,
                "axisLine": {
                    "show": false
                },
                "axisTick": {
                    "show": false
                },
                "splitLine": {
                    "show": false
                },
                "axisLabel": {
                    "textStyle": {
                        "color": "rgba(255, 255, 255, 0.6)"
                    }
                },
                "data": []
            }];
            option.grid.x = 95;
            option.color = gb.color;
            option.series = [{
                name: '第二次',
                type: 'bar',
                barMaxWidth: 60,
                stack: '总比例',
                label: {
                    normal: {
                        show: false
                    }
                },
                data: [],
                //animationEasing: 'cubicInOut',
                //animationEasingUpdate: 'cubicInOut',
                animationDelay: function(idx) {
                    return idx * 100;
                },
                animationDelayUpdate: function(idx) {
                    return idx * 100;
                }
            }, {
                name: '第一次',
                type: 'bar',
                barMaxWidth: 60,
                stack: '总比例',
                label: {
                    normal: {
                        show: false
                    }
                },
                data: [],
                //animationEasing: 'cubicInOut',
                //animationEasingUpdate: 'cubicInOut',
                animationDelay: function(idx) {
                    return idx * 100;
                },
                animationDelayUpdate: function(idx) {
                    return idx * 100;
                }
            }];
            gb.userInfo.dptCompare.moreChancePassedCompare.map(function(data) {
                option.yAxis[0].data.push(data.dpt);
                option.series[0].data.push(data['2ndPassed']);
                option.series[1].data.push(data['1stPassed']);
            });

            option.yAxis[0].data.reverse();
            option.series[0].data.reverse();
            option.series[1].data.reverse();

            //gb.myChart[index - 2].setOption(option);
            gb.optionRenderFlag[index - 2] = true;
            return option;
        }
    }


    //sectionsColor: ['#293c55'],
    var initDom = function() {

        $('#fullpage').fullpage({
            navigation: true,
            afterRender: function(index, direction) {

                for (var i = 1; i < 9; i++) {
                    gb.myChart[i - 1] = echarts.init(gb.dom[i]);
                }

                $(window).resize(function() {
                    for (var i = 1; i < 9; i++) {
                        gb.myChart[i - 1].resize();
                    }
                });

                //最后一页隐藏箭头
                if (index == 8 && (direction == 'down')) {
                    $('.iSlider-arrow').hide();
                }
            },
            afterLoad: function(anchor, index) {
                handleCounterup($(".section:nth(" + (index - 1) + ")").find(".number"), 500);

                if (index >= 2 && index <= 9) {
                    gb.myChart[index - 2] = echarts.init(gb.dom[index - 1]);
                    gb.myChart[index - 2].setOption(gb.option[index]);
                }

                if (index == 10) {
                    //console.log('进入最后一页');
                    $('.iSlider-arrow').hide();
                } else {
                    $('.iSlider-arrow').show();
                }
            }
        });

        $('.hidden').removeClass('hidden');

        //全屏加载完毕
        if (!gb.loadComplete) {
            $("#fakeLoader").hide();
            gb.loadComplete = true;
        }
    };

    var refreshData = function() {
        $.ajax({
            url: 'http://cbpc540.applinzi.com/index.php?s=/addon/GoodVoice/GoodVoice/getSafeExamData&uid=' + uid,
            async: false,
            dataType: "jsonp",
            callback: "JsonCallback"
        }).done(function(obj) {
            gb.loadBscInfo = obj.status;
            if (gb.loadBscInfo) {

                gb.userInfo = obj;
                gb.userInfo.dptCompare = {};
                gb.userInfo.user_dpt = gb.userInfo.user_dpt.trim();
                $('[name="userName"]').text(gb.userInfo.user_name);
                $('[name="userOrder"]').text(Number.parseInt(gb.userInfo.id) - gb.dbSheetIdx);
                $('[name="userScore"]').text(gb.userInfo.score);
                //所用时间
                var minutes = Math.floor(Number.parseInt(gb.userInfo.timeUsed) / 60);
                var seconds = Number.parseInt(gb.userInfo.timeUsed) % 60;

                $('[name="userMinuteLength"]').text(minutes);
                $('[name="userSecondLength"]').text(seconds);

                var scoreDesc = (Number.parseInt(gb.userInfo.score) >= 80) ? "这是一个不错的分数哟" : "下次还需要继续努力呢";

                $('[name="scoreDesc"]').text(scoreDesc);
                $('[name="answerTimes"]').text(gb.userInfo.iTimes == "1" ? "仅用了一次机会便" : "用了两次机会");

                getScoreOrder();

                /*getTimeLength();
                getAnsweredRatio();
                getScoreCompare();
                getPrizeCompare();
                get2ndPassedCompare();

                console.log(JSON.stringify(gb.userInfo));

                for (var i = 2; i <= 9; i++) {
                    gb.option[i] = getOptions(i);
                }

                initDom();*/

            }
        });
    }();

    var audioInit = function() {
        $('#autoplay').attr('src', 'assets/audio/bgm2.mp3');
        var audio = document.getElementById('autoplay');
        var controller = document.getElementById('musicBtn');
        var controllerHint = document.getElementById('musicBtnTxt');

        document.getElementById('musicBtn').addEventListener('touchstart', function() {
            controllerHint.style.display = '';
            if (audio.paused) {
                audio.play();
                controller.className = 'music-btn on';
                controllerHint.innerHTML = '开始';
            } else {
                audio.pause();
                controller.className = 'music-btn';
                controllerHint.innerHTML = '关闭';
            }

            setTimeout(function() {
                controllerHint.style.display = 'none';
            }, 1000);

        }, false);
    }();

});