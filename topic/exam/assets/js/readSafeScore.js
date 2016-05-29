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
        dom: [],
        myChart: [],
        color: ["#61A5E8", "#7ECF51", "#EECB5F", "#E4925D", "#E16757", "#9570E5", "#605FF0", "#85ca36", "#1c9925", "#0d8b5f", "#0f9cd3", "#2f7e9b", "#2f677d", "#9b7fed", "#7453d6", "#3b1d98", "#27abb1", "#017377", "#015f63", "#b86868", "#5669b7", "#e5aab4", "#60b65f", "#98d2b2", "#c9c8bc", "#45c3dc", "#e17979", "#5baa5a", "#eaccc2", "#ffaa74"]
    };

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
    var refreshData = function() {
        var updateChart = function() {
            //动态读取数据
            $.ajax({
                url: 'http://cbpc540.applinzi.com/index.php?s=/addon/GoodVoice/GoodVoice/getSafeExamData&uid=' + uid,
                async: false,
                dataType: "jsonp",
                callback: "JsonCallback"
            }).done(function(score) {
                console.log(score);

            });

            /*option.yAxis[0].data = [];
            option.series[0].data = [];
            if (uid == 0) {
                score.map(function(data) {
                    option.yAxis[0].data.push(data.user_name);
                    option.series[0].data.push(data.score);
                });
            } else {
                score.map(function(data) {
                    option.yAxis[0].data.push(data.user_name);
                    if (data.uid != uid) {
                        option.series[0].data.push(data.score);
                    } else {
                        option.series[0].data.push({
                            value: data.score,
                            itemStyle: {
                                normal: {
                                    color: 'rgba(66,233,98,0.5)'
                                }
                            }
                        });
                    }
                });
            }*/
        };

        /*timeTicket = setInterval(function() {
            updateChart();
        }, 10000);*/
    };

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

    //sectionsColor: ['#293c55'],
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

                option = gb.option[0];
                option.yAxis[0].data = [];
                option.series[0].data = [];

                for (var i = 1; i <= 10; i++) {
                    var name = i * 10;
                    option.yAxis[0].data.push(name);
                    option.series[0].data.push((Math.random() * 100).toFixed(0));
                }

                gb.myChart[index - 2].setOption(option);
                gb.optionRenderFlag[index - 2] = true;

            } else if (index == 3 && !gb.optionRenderFlag[index - 2]) {

                option = gb.option[0];
                option.yAxis[0].data = [];
                option.series[0].data = [];

                for (var i = 1; i <= 10; i++) {
                    var name = i * 10;
                    option.yAxis[0].data.push(name);
                    option.series[0].data.push((Math.random() * 100).toFixed(0));
                }

                gb.myChart[index - 2].setOption(option);
                gb.optionRenderFlag[index - 2] = true;

            } else if (index == 4 && !gb.optionRenderFlag[index - 2]) {

                option = gb.option[0];
                option.yAxis[0].data = [];
                option.series[0].data = [];
                option.yAxis[0].data = ['全部人员', '您的部门', '你自己'];
                option.series[0].data = ['17.8', '19', {
                    value: 13,
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
                console.log(JSON.stringify(option));
            } else if (index == 5 && !gb.optionRenderFlag[index - 2]) {

                option = gb.option[0];
                option.yAxis[0].data = ['职能部室', '制作部', '长城', '物业'];
                option.series = [{
                    name: '已参与',
                    type: 'bar',
                    barMaxWidth: 60,
                    stack: '总人数',
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight',
                            textStyle: {
                                fontSize: 18
                            },
                            formatter: '{b}\n{c}'
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
                    stack: '总人数',
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight',
                            textStyle: {
                                fontSize: 18
                            },
                            formatter: '未参与\n{c}'
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: gb.colors.whiteMediumLight
                        }
                    },
                    data: []
                }];

                for (var i = 0; i <= 3; i++) {
                    option.series[0].data.push((Math.random() * 500 + 200).toFixed(0));
                    option.series[1].data.push((Math.random() * 500 + 200).toFixed(0));
                }

                gb.myChart[index - 2].setOption(option);
                gb.optionRenderFlag[index - 2] = true;
                console.log(JSON.stringify(option));
            } else if (index == 6 && !gb.optionRenderFlag[index - 2]) {

                /*$.getJSON("./assets/data/department.min.json", function(dpt) {
                    var dptLen = dpt.length,
                        dptName = [];
                    dpt.map(function(dpt_name) {
                        dptName.push(dpt_name.name);
                    });

                });*/

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
                        radius: '70%',
                        center: ['50%', '50%'],
                        data: [],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        },
                        label: {
                            normal: {
                                textStyle: {
                                    color: '#334'
                                }
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

                for (var i = 1; i <= 9; i++) {
                    var name = i * 10;
                    option.legend.data.push(name);
                    option.series[0].data.push({
                        name: name,
                        value: (Math.random() * 100).toFixed(0)
                    });
                }

                gb.myChart[index - 2].setOption(option);
                gb.optionRenderFlag[index - 2] = true;
                console.log(JSON.stringify(option));
            } else if (index == 7 && !gb.optionRenderFlag[index - 2]) {

                option = gb.option[0];
                option.yAxis[0].data = ['职能部室', '制作部', '长城', '物业'];
                option.series = [{
                    type: 'bar',
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight',
                            textStyle: {
                                fontSize: 18
                            },
                            formatter: '{b}\n{c}'
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

                for (var i = 0; i <= 3; i++) {
                    option.series[0].data.push(
                        (Math.random() * 50 + 50).toFixed(2)
                    );
                }
                gb.myChart[index - 2].setOption(option);
                gb.optionRenderFlag[index - 2] = true;
                console.log(JSON.stringify(option));
            } else if (index == 8 && !gb.optionRenderFlag[index - 2]) {

                option = gb.option[0];
                option.yAxis[0].data = ['职能部室', '制作部', '长城', '物业'];
                option.series = [{
                    name: '获奖',
                    type: 'bar',
                    barMaxWidth: 60,
                    stack: '总人数',
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight',
                            textStyle: {
                                fontSize: 18
                            },
                            formatter: '{b}\n{c}'
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
                    name: '未获奖',
                    type: 'bar',
                    barMaxWidth: 60,
                    stack: '总人数',
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight',
                            textStyle: {
                                fontSize: 18
                            },
                            formatter: '未获奖\n{c}'
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: gb.colors.whiteMediumLight
                        }
                    },
                    data: []
                }];

                for (var i = 0; i <= 3; i++) {
                    option.series[0].data.push((Math.random() * 500 + 200).toFixed(0));
                    option.series[1].data.push((Math.random() * 500 + 200).toFixed(0));
                }

                gb.myChart[index - 2].setOption(option);
                gb.optionRenderFlag[index - 2] = true;
                console.log(JSON.stringify(option));
            } else if (index == 9 && !gb.optionRenderFlag[index - 2]) {

                option = gb.option[0];
                option.yAxis[0].data = ['职能部室', '制作部', '长城', '物业'];
                option.series = [{
                    name: '一次通过',
                    type: 'bar',
                    barMaxWidth: 60,
                    stack: '总人数',
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight',
                            textStyle: {
                                fontSize: 18
                            },
                            formatter: '{b}\n{c}'
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
                    name: '第二次',
                    type: 'bar',
                    barMaxWidth: 60,
                    stack: '总人数',
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight',
                            textStyle: {
                                fontSize: 18
                            },
                            formatter: '第二次\n{c}'
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: gb.colors.whiteMediumLight
                        }
                    },
                    data: []
                }];

                for (var i = 0; i <= 3; i++) {
                    option.series[0].data.push((Math.random() * 500 + 200).toFixed(0));
                    option.series[1].data.push((Math.random() * 500 + 200).toFixed(0));
                }

                gb.myChart[index - 2].setOption(option);
                gb.optionRenderFlag[index - 2] = true;
                console.log(JSON.stringify(option));
            } else if (index == 10 && !gb.optionRenderFlag[index - 2]) {

                option = gb.option[0];
                option.yAxis[0].data = ['职能部室', '制作部', '长城', '物业'];
                option.series = [{
                    name: '获奖',
                    type: 'bar',
                    stack: '总人数',
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight',
                            textStyle: {
                                fontSize: 18
                            },
                            formatter: '{b}\n{c}'
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
                    name: '未获奖',
                    type: 'bar',
                    stack: '总人数',
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight',
                            textStyle: {
                                fontSize: 18
                            },
                            formatter: '未获奖\n{c}'
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: gb.colors.whiteMediumLight
                        }
                    },
                    data: []
                }];

                for (var i = 0; i <= 3; i++) {
                    option.series[0].data.push((Math.random() * 500 + 200).toFixed(0));
                    option.series[1].data.push((Math.random() * 500 + 200).toFixed(0));
                }

                gb.myChart[index - 2].setOption(option);
                gb.optionRenderFlag[index - 2] = true;
                console.log(JSON.stringify(option));
            }
        }
    });
});