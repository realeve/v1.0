require.config({　　　　
    baseUrl: "assets/js",
    paths: {　　　　　　
        "jquery": "jquery.min",
        "jquery.fullPage": "jquery.fullPage.min",
        "echarts": "echarts.min",
        "waypoints": "waypoints.min",
        "jquery.counterup": "jquery.counterup.min"
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
    colors: {
        white: "#FFF",
        whiteMedium: "rgba(255, 255, 255, 0.6)",
        whiteMediumLight: "rgba(255, 255, 255, 0.3)",
        whiteLight: "rgba(255, 255, 255, 0.2)",
        whiteLighter: "rgba(255, 255, 255, 0.1)",
        primary: "#556fb5",
        primaryLight: "#889acb"
    },
    dbSheetIdx: 27, //数据库中成绩表单初始ID值，减去该值后得到用户是第几个参加活动
    option: [],
    optionRenderFlag: [],
    userInfo: {},
    dom: [],
    myChart: [],
    loadBscInfo: false,
    color: ["#61A5E8", "#7ECF51", "#EECB5F", "#E4925D", "#E16757", "#9570E5", "#605FF0", "#85ca36", "#1c9925", "#0d8b5f", "#0f9cd3", "#2f7e9b", "#2f677d", "#9b7fed", "#7453d6", "#3b1d98", "#27abb1", "#017377", "#015f63", "#b86868", "#5669b7", "#e5aab4", "#60b65f", "#98d2b2", "#c9c8bc", "#45c3dc", "#e17979", "#5baa5a", "#eaccc2", "#ffaa74"]
};

require(['jquery', 'echarts', 'waypoints', 'jquery.fullPage', 'jquery.counterup'], function($, echarts) {


    var audioInit = function() {
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

    for (var i = 1; i < 9; i++) {
        gb.dom[i] = document.getElementById("chart" + i);
    }

    var uid = (window.location.href.indexOf('?uid=') == -1) ? 0 : window.location.href.split('?uid=')[1].split('&')[0];


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
            }]
        };
        return option;
    };

    gb.option[0] = initOption();


    function getScoreOrder() {
        //载入首页信息完毕，准备第二页信息
        $.ajax({
            url: 'http://cbpc540.applinzi.com/index.php?s=/addon/GoodVoice/GoodVoice/getScoreOrder&score=' + gb.userInfo.score,
            async: false,
            dataType: "jsonp",
            callback: "JsonCallback"
        }).done(function(obj) {
            gb.userInfo.peopleNums = obj.allPeople;
            gb.userInfo.scoreOrder = obj.scoreOrder;
            gb.userInfo.scorePropt = (obj.scoreOrder == 1) ? 100 : obj.lessThan;
            //总人数
            $('[name="totals"]').text(gb.userInfo.peopleNums);

            $('[name="ltdOrder"]').text(gb.userInfo.scoreOrder);

            $('[name="scorePropt"]').text(gb.userInfo.scorePropt);
            $('[name="scoreProptDesc"]').text(Number.parseFloat(gb.userInfo.scorePropt) > 50 ? "，想想是不是有点小激动呢？" : "。");

            initDom();
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
            gb.userInfo.dptTime = obj.dptTime;
            gb.userInfo.ltdTime = obj.ltdTime;

            $('[name="timeDesc1"]').text(gb.userInfo.timeUsed < gb.userInfo.dptTime ? '低于' : '高于');
            $('[name="timeDesc2"]').text(gb.userInfo.timeUsed < gb.userInfo.ltdTime ? '低于' : '高于');

            //总人数
            $('[name="dptTimeLength"]').text((Number.parseInt(gb.userInfo.dptTime) / 60).toFixed(1));
            $('[name="ltdTimeLength"]').text((Number.parseInt(gb.userInfo.ltdTime) / 60).toFixed(1));
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
            //部门间比较信息
            gb.userInfo.dptCompare = {};
            gb.userInfo.dptCompare.answerRatio = obj;
            $('[name="mostPeople"]').text(obj[0].dpt);
            $('[name="answeredPrpt"]').text(obj[0].answeredRatio);

            //如果不是第一
            if (obj[0].dpt != gb.userInfo.user_dpt) {
                $('[name="answerRatioDesc"]').text(',赶快邀请小伙伴们来参与活动吧。');
            } else {
                $('[name="answerRatioDesc"]').text('。');
            }

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
            //部门间比较信息
            gb.userInfo.dptCompare = {};
            gb.userInfo.dptCompare.scoreCompare = obj;
            $('[name="highestScore"]').text(obj[0].dpt);
            $('[name="highestScorePrpt"]').text(obj[0].score);
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
            //部门间比较信息
            gb.userInfo.dptCompare = {};
            gb.userInfo.dptCompare.prizeCompare = obj;
            $('[name="prizePrpt"]').text(obj[0].passRatio);
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
            $('[name="2ndTimesPrpt"]').text(obj['2ndPassedRatio']);
            $('[name="1stTime"]').text(obj.moreChance);

            $.ajax({
                url: 'http://cbpc540.applinzi.com/index.php?s=/addon/GoodVoice/GoodVoice/get2ndPassedCompare',
                async: false,
                dataType: "jsonp",
                callback: "JsonCallback"
            }).done(function(obj) {
                gb.userInfo.dptCompare = {};
                gb.userInfo.dptCompare.moreChancePassedCompare = obj;
            });

        });
    }

    //sectionsColor: ['#293c55'],
    var initDom = function() {
        $('#fullpage').fullpage({
            navigation: true,
            afterRender: function() {

                for (var i = 1; i < 9; i++) {
                    gb.myChart[i - 1] = echarts.init(gb.dom[i]);
                }

                $(window).resize(function() {
                    for (var i = 1; i < 9; i++) {
                        gb.myChart[i - 1].resize();
                    }
                });
                //refreshData();
            },
            afterLoad: function(anchor, index) {
                handleCounterup($(".section:nth(" + (index - 1) + ")").find(".number"), 500);
                var option;

                if (index == 2 && !gb.optionRenderFlag[index - 2]) {

                    option = initOption();
                    option.series[0].data = [];
                    $.ajax({
                        url: 'http://cbpc540.applinzi.com/index.php?s=/addon/GoodVoice/GoodVoice/getScoreRange',
                        async: false,
                        dataType: "jsonp",
                        callback: "JsonCallback"
                    }).done(function(obj) {
                        option = getScoreRangeOption(obj, option);
                        gb.myChart[index - 2].setOption(option);
                        gb.optionRenderFlag[index - 2] = true;

                        //载入下个页面一些关键信息
                        getScoreOrderByDpt();
                    });

                } else if (index == 3 && !gb.optionRenderFlag[index - 2]) {

                    option = initOption();
                    option.series[0].data = [];
                    $.ajax({
                        url: 'http://cbpc540.applinzi.com/index.php?s=/addon/GoodVoice/GoodVoice/getScoreRangeByDpt&dpt=' + gb.userInfo.user_dpt,
                        async: false,
                        dataType: "jsonp",
                        callback: "JsonCallback"
                    }).done(function(obj) {
                        //获取下一页时间长度的信息
                        getTimeLength();

                        option = getScoreRangeOption(obj, option);
                        var mostScore = obj[obj.length - 1];

                        $('[name="dptMostScore"]').text(mostScore.score);
                        $('[name="dptMostScoreNum"]').text(mostScore.nums);
                        $('[name="dptMostScoreDesc"]').text("他们对安全规章制度一定是熟记于心了，");
                        gb.userInfo.dptScoreOrder = obj;

                        gb.myChart[index - 2].setOption(option);
                        gb.optionRenderFlag[index - 2] = true;
                    });

                } else if (index == 4 && !gb.optionRenderFlag[index - 2]) {
                    //获取下一页，参与度信息
                    getAnsweredRatio();

                    option = initOption();

                    option.series[0].data = [];
                    option.yAxis[0].data = ['全公司', gb.userInfo.user_dpt, gb.userInfo.user_name];

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

                    gb.myChart[index - 2].setOption(option);
                    gb.optionRenderFlag[index - 2] = true;

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
                        data: []
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
                        data: []
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

                    gb.myChart[index - 2].setOption(option);
                    gb.optionRenderFlag[index - 2] = true;

                } else if (index == 6 && !gb.optionRenderFlag[index - 2]) {

                    option = option = {
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

                    gb.myChart[index - 2].setOption(option);
                    gb.optionRenderFlag[index - 2] = true;
                    getScoreCompare();

                } else if (index == 7 && !gb.optionRenderFlag[index - 2]) {

                    option = initOption();
                    option.series = [{
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
                        data: []
                    }];
                    gb.userInfo.dptCompare.scoreCompare.map(function(data) {
                        option.yAxis[0].data.push(data.dpt);
                        option.series[0].data.push(data.score);
                    });
                    option.yAxis[0].data.reverse();
                    option.series[0].data.reverse();
                    gb.myChart[index - 2].setOption(option);
                    gb.optionRenderFlag[index - 2] = true;
                    getPrizeCompare();

                } else if (index == 8 && !gb.optionRenderFlag[index - 2]) {

                    option = initOption();

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
                        data: []
                    }];

                    gb.userInfo.dptCompare.prizeCompare.map(function(data) {
                        option.yAxis[0].data.push(data.dpt);
                        option.series[0].data.push(data.dptPassRatio);
                    });
                    option.yAxis[0].data.reverse();
                    option.series[0].data.reverse();

                    gb.myChart[index - 2].setOption(option);
                    gb.optionRenderFlag[index - 2] = true;
                    get2ndPassedCompare();

                } else if (index == 9 && !gb.optionRenderFlag[index - 2]) {

                    option = initOption();
                    option.legend = {
                        show: true,
                        data: ['第一次', '第二次'],
                        textStyle: {
                            color: '#fff'
                        },
                        x: 'right',
                        y: 30
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
                        name: '第一次',
                        type: 'bar',
                        barMaxWidth: 60,
                        stack: '总比例',
                        label: {
                            normal: {
                                show: false
                            }
                        },
                        data: []
                    }, {
                        name: '第二次',
                        type: 'bar',
                        barMaxWidth: 60,
                        stack: '总比例',
                        label: {
                            normal: {
                                show: false
                            }
                        },
                        data: []
                    }];
                    gb.userInfo.dptCompare.moreChancePassedCompare.map(function(data) {
                        option.yAxis[0].data.push(data.dpt);
                        option.series[0].data.push(data['1stPassed']);
                        option.series[1].data.push(data['2ndPassed']);
                    });

                    gb.myChart[index - 2].setOption(option);
                    gb.optionRenderFlag[index - 2] = true;
                    console.log("option=" + JSON.stringify(option));
                }
            }
        });
        $('.hidden').removeClass('hidden');
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
            }
        });
    }();
});