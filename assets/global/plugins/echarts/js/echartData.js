//此处起为各图表数据赋值
var functionMap = {
 dynamic: function(){
		var lastData = 90;
		var axisData;            
		timeTicket = setInterval(function (){
			lastData += Math.random() * ((Math.round(Math.random() * 10) % 2) == 0 ? 1 : -1);
			lastData = lastData.toFixed(1) - 0;
			axisData = (new Date()).toLocaleTimeString().replace(/^\D*/,'');                
			// 动态数据接口 addData
			myChart.addData([
				[
					0,        // 系列索引
					Math.round(Math.random() * 1000), // 新增数据
					true,     // 新增数据是否从队列头部插入
					false     // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
				],
				[
					1,        // 系列索引
					lastData, // 新增数据
					false,    // 新增数据是否从队列头部插入
					false,    // 是否增加队列长度，false则自定删除原有数据，队头插入删队尾，队尾插入删队头
					axisData  // 坐标轴标签
				]
			]);
		}, 1500);
	},
};

var optionMap = {
	 TimeAndQuality : {		
		title : {
                text: '核查好品率随时间变化情况',
                subtext: '数据来源：质量综合管理系统数据库',
				x:'center',
            },
        tooltip : {
            trigger: 'axis'
        },		
        legend: {
            data:['胶印好品率','胶印产量','凹印好品率','凹印产量'],
			x:'center',
			y:60,
			itemGap:20,
			selected:{
				'胶印产量':false,
				'凹印产量':false,
			}
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
				//dataZoom : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
		dataZoom : {
            show : true,
            realtime: true,
            start : 0,
            end :100,
			//height:20,
        },
        calculable : true,
        xAxis : [
            {
				name:'领用时间',
				axisTick : {show: false},//隐藏标记线,
                type : 'category',
                boundaryGap : true,
                data : ['7:30','8:00','8:30','9:00','9:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00','18:30','19:00','19:30','20:00','20:30','21:00','21:30','22:00','22:30'],
			}
        ],
        yAxis : [
            {
				name:'平均好品率',
                type : 'value',
				position: 'left',
				min:85,
				max:89,
				scale: true,//自动缩放最大最小值
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value} %',    // Template formatter!               
				},				
            },
			{
                type : 'value',
				min:500,
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 18,
					formatter: '{value} 车',    // Template formatter!               
				},
            }
        ],
        series : [
            {
                name:'胶印好品率',
                type:'line',
                smooth:true,
				//symbolSize:0,
		        // itemStyle: {normal: {areaStyle: {type: 'default'}}},
                data:[86.89,87.44,87.26,87.33,86.56,86.84,86.66,86.22,87.1,87.07,86.98,86.94,86.79,86.47,86.67,87.51,87.35,87.32,87.36,87.14,87.7,87.56,86.67,87.01,87.48,87.1,87.34,86.59,88.35,86.83,86.37],
				markPoint : MPtStyle,
				markLine : MLnStyle,
			},
            {
                name:'胶印产量',
                type:'bar',barMaxWidth:80,
                smooth:true,
				yAxisIndex: 1,
                itemStyle: {
					normal: {
						areaStyle: {type: 'default'},
						}
				},
                data:[3757,1512,775,1366,926,1243,1208,456,1002,1046,1519,924,716,523,408,1426,2925,1956,1014,424,459,1646,1671,996,1081,1042,882,755,309,125,13],
            },
            {
                name:'凹印好品率',
                type:'line',
                smooth:true,
				//symbolSize:0,
               // itemStyle: {normal: {areaStyle: {type: 'default'}}},
                data:[87.05,87.22,87.75,87.89,87.49,87.31,87.31,86.85,87.26,87.12,87.45,87.1,87.19,86.67,86.94,87.11,87.32,87.83,87.42,86.85,87.04,87.76,87.6,87.1,87.22,87.3,87.78,87.46,87.59,87.01,84.9],
				markPoint : MPtStyle,
				markLine : MLnStyle,
			},
            {
                name:'凹印产量',
                type:'bar',barMaxWidth:80,
                smooth:true,				
				yAxisIndex: 1,
                  itemStyle: {
					normal: {
						areaStyle: {type: 'default'},
						}
				},
                data:[5575,1115,811,2106,1155,1897,1723,1190,1082,1134,1599,1605,987,844,716,1243,2851,2175,1662,759,634,1383,1928,1431,1264,1223,1221,1030,630,344,64],
            }
        ]
    },
	TimeAndQuality0 : {		
		title : {
                text: '核查好品率随时间变化情况',
                subtext: '数据来源：质量综合管理系统数据库\n统计时间：2015年1月至7月15日',
				x:'center',
            },
        tooltip : {
            trigger: 'axis'
        },		
        legend: {
            data:['胶印好品率','胶印产量','凹印好品率','凹印产量'],
			x:'center',
			y:70,
			itemGap:20,
			selected:{
				'胶印产量':false,
				'凹印产量':false,
			}
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
				//dataZoom : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        xAxis : [
            {
				name:'领用时间',
				axisTick : {show: false},//隐藏标记线,
                type : 'category',
                boundaryGap : true,
                data : ['9:30','10:00','10:30','11:00','11:30','12:00','12:30'],
			}
        ],
        yAxis : [
            {
				name:'平均好品率',
                type : 'value',
				position: 'left',
				min:85,
				max:89,
				scale: true,//自动缩放最大最小值
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value} %',    // Template formatter!               
				},				
            },
			{
                type : 'value',
				min:500,
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 18,
					formatter: '{value} 车',    // Template formatter!               
				},
            }
        ],
        series : [
            {
                name:'胶印好品率',
                type:'line',
                smooth:true,
				//symbolSize:0,
		        // itemStyle: {normal: {areaStyle: {type: 'default'}}},
                data:[86.04,86.52,85.69,85.88,86.67,86.74,86.08],
				markPoint : MPtStyle,
				markLine : MLnStyle,
			},
            {
                name:'凹印好品率',
                type:'line',
                smooth:true,
				//symbolSize:0,
               // itemStyle: {normal: {areaStyle: {type: 'default'}}},
                data:[87.68,85.83,86.48,86.29,87.09,86.93,86.59],
				markPoint : MPtStyle,
				markLine : MLnStyle,
			}
        ]
    },
	
	WeekAndQuality : {		
		title : {
                text: '胶凹工序好品率随星期变化情况',
                subtext: '数据来源：质量综合管理系统数据库',
				x:'center',
            },
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            data:['胶印好品率','胶印产量','凹印好品率','凹印产量'],
			x:'center',
			y:60,
			itemGap:20,
			selected:{
				'胶印产量': false,
				'凹印产量': false,
			}
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        xAxis : [
            {
				name:'星期',
				axisTick : {show: false},//隐藏标记线,
                type : 'category',
                boundaryGap : true,
                data : ['星期一','星期二','星期三','星期四','星期五','星期六'],
			}
        ],
        yAxis : [
            {
				name:'平均好品率',
                type : 'value',
				position: 'left',
				//min:84,
				//max:89,
				scale: true,
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value} %',    // Template formatter!               
				},
            },
			{
                type : 'value',
				min:500,
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 18,
					formatter: '{value} 车',    // Template formatter!               
				},
            }
        ],
        series : [
            {
                name:'胶印好品率',
                type:'line',
                smooth:true,
              //  itemStyle: {normal: {areaStyle: {type: 'default'}}},
                data:[86.39,86.96,87.44,87.35,87.18,86.51],
				markPoint : MPtStyle,
				markLine : MLnStyle,
			},
            {
                name:'胶印产量',
                type:'bar',barMaxWidth:80,
                smooth:true,
				yAxisIndex: 1,
                itemStyle : BarStyleTBlue,
                data:[5079,7459,7550,7183,6114,553],
			},
            {
                name:'凹印好品率',
                type:'line',
                smooth:true,
               // itemStyle: {normal: {areaStyle: {type: 'default'}}},
                data:[86.91,87.18,87.45,87.56,87.49,85.85],
				markPoint : MPtStyle,
				markLine : MLnStyle,
			},
            {
                name:'凹印产量',
                type:'bar',barMaxWidth:80,
                smooth:true,
				yAxisIndex: 1,
                itemStyle : BarStyleTGreen,
                data:[6688,9263,9293,8970,7896,1033]
			}
        ]
    },
	
	
	'TimeRelease1' : {
		title : {
                text: '凹印用餐时间产品好品率分布',
                subtext: '数据来源：质量综合管理系统数据库',
				x:'center',
            },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c}万 ({d}%)"
        },
        legend: {
            orient : 'vertical',
            x : 'left',
            data:['0%','10%','20%','30%','40%','50%','60%','70%','80%','90%']
        },
        toolbox: {
            show : true,
            feature : {
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
				magicType: {
					show: true,
					type : ['pie'],
					option: {
						funnel: {
							x: '25%',
							width: '50%',
							funnelAlign: 'right',
							max: 3000
						}
					}
				},
                restore : {show: true},
                saveAsImage : {show: true},				
            }
        },
        calculable : true,
        series : [
            {
                name:'白班',
				selectedMode:'single',
                type:'pie',
				startAngle: 180,
				center : ['35%', 250],
                radius : ['30%', '70%'],
                data:[
                    {value:1, name:'0%'},
                    {value:3, name:'10%'},
                    {value:4, name:'20%'},
                    {value:17, name:'30%'},
                    {value:32, name:'40%'},
                    {value:81, name:'50%'},
                    {value:205, name:'60%'},
					{value:567, name:'70%'},
					{value:2095, name:'80%'},
					{value:2889, name:'90%'}
                ],
				 itemStyle : {					
					emphasis : {
						label : {
							show : true,
							formatter: "{d}%",
							position : 'center',
							textStyle : {
								fontSize : '30',
								fontWeight : 'bold'
							}
						}
					}
				},
            },
			   {
                name:'中班',
                type:'pie',
				startAngle: 180,
				center : ['75%', 250],
                radius : ['30%', '70%'],
                data:[
					{value:1, name:'0%'},
                    {value:3, name:'10%'},
                    {value:6, name:'20%'},
                    {value:9, name:'30%'},
                    {value:21, name:'40%'},
                    {value:63, name:'50%'},
                    {value:176, name:'60%'},
					{value:506, name:'70%'},
					{value:1806, name:'80%'},
					{value:2641, name:'90%'}
                ],
				itemStyle : {					
					emphasis : {
						label : {
							show : true,
							formatter: "{d}%",
							position : 'center',
							textStyle : {
								fontSize : '30',
								fontWeight : 'bold'
							}
						}
					}
				},
            }
        ]
    },
	
	'TimeRelease2' : {
		title : {
                text: '胶印用餐时间产品好品率分布',
                subtext: '数据来源：质量综合管理系统数据库',
				x:'center',
            },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c}万 ({d}%)"
        },
        legend: {
            orient : 'vertical',
            x : 'left',
            data:['0%','10%','20%','30%','40%','50%','60%','70%','80%','90%']
        },
        toolbox: {
            show : true,
            feature : {
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
				magicType: {
					show: true,
					type : ['pie'],
					option: {
						funnel: {
							x: '25%',
							width: '50%',
							funnelAlign: 'right',
							max: 3000
						}
					}
				},
                restore : {show: true},
                saveAsImage : {show: true},				
            }
        },
        calculable : true,
        series : [
            {
                name:'白班',
                type:'pie',
				selectedMode:'single',
				startAngle: 180,
				center : ['35%', 250],
                radius : ['30%', '70%'],
                data:[
                    {value:3, name:'0%'},
                    {value:2, name:'10%'},
                    {value:6, name:'20%'},
                    {value:13, name:'30%'},
                    {value:22, name:'40%'},
                    {value:64, name:'50%'},
                    {value:134, name:'60%'},
					{value:412, name:'70%'},
					{value:1379, name:'80%'},
					{value:1874, name:'90%'}
                ],
				itemStyle : {					
					emphasis : {
						label : {
							show : true,
							formatter: "{d}%",
							position : 'center',
							textStyle : {
								fontSize : '30',
								fontWeight : 'bold'
							}
						}
					}
				},
            },
			   {
                name:'中班',
                type:'pie',
				startAngle: 180,
				center : ['75%', 250],
                radius : ['30%', '70%'],
                data:[
                    {value:2, name:'0%'},
                    {value:2, name:'10%'},
                    {value:4, name:'20%'},
                    {value:9, name:'30%'},
                    {value:11, name:'40%'},
                    {value:53, name:'50%'},
                    {value:129, name:'60%'},
					{value:386, name:'70%'},
					{value:1311, name:'80%'},
					{value:1947, name:'90%'}
                ],
				itemStyle : {					
					emphasis : {
						label : {
							show : true,
							formatter: "{d}%",
							position : 'center',
							textStyle : {
								fontSize : '30',
								fontWeight : 'bold'
							}
						}
					}
				},
            }
        ]
    },
	
	'TimeRelease3' : {
		title : {
                text: '当天质量最稳定的时间段好品率分布',
                subtext: '数据来源：质量综合管理系统数据库',
				x:'center',
            },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c}万 ({d}%)"
        },
        legend: {
            orient : 'vertical',
            x : 'left',
            data:['0%','10%','20%','30%','40%','50%','60%','70%','80%','90%']
        },
        toolbox: {
            show : true,
            feature : {
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
				magicType: {
					show: true,
					type : ['pie'],
					option: {
						funnel: {
							x: '25%',
							width: '50%',
							funnelAlign: 'right',
							max: 3000
						}
					}
				},
                restore : {show: true},
                saveAsImage : {show: true},				
            }
        },
        calculable : true,
        series : [
            {
                name:'胶印15:00-18:00',
                type:'pie',
				selectedMode:'single',
				startAngle: 180,
				center : ['35%', 250],
                radius : ['30%', '70%'],
                data:[
                    {value:3, name:'0%'},
                    {value:4, name:'10%'},
                    {value:14, name:'20%'},
                    {value:16, name:'30%'},
                    {value:34, name:'40%'},
                    {value:114, name:'50%'},
                    {value:268, name:'60%'},
					{value:831, name:'70%'},
					{value:2723, name:'80%'},
					{value:4197, name:'90%'}
                ],
				itemStyle : {					
					emphasis : {
						label : {
							show : true,
							formatter: "{d}%",
							position : 'center',
							textStyle : {
								fontSize : '30',
								fontWeight : 'bold'
							}
						}
					}
				},
            },
			   {
                name:'凹印08:00-10:00',
                type:'pie',
				startAngle: 180,
				center : ['75%', 250],
                radius : ['30%', '70%'],
                data:[
					{value:1, name:'0%'},
                    {value:2, name:'10%'},
                    {value:4, name:'20%'},
                    {value:4, name:'30%'},
                    {value:31, name:'40%'},
                    {value:60, name:'50%'},
                    {value:165, name:'60%'},
					{value:518, name:'70%'},
					{value:1743, name:'80%'},
					{value:2661, name:'90%'}
                ],
				itemStyle : {					
					emphasis : {
						label : {
							show : true,
							formatter: "{d}%",
							position : 'center',
							textStyle : {
								fontSize : '30',
								fontWeight : 'bold'
							}
						}
					}
				},
            }
        ]
    },
	
	
	'TimeRelease4' : {
		title : {
                text: '胶印15:00~18:00开印产品好品率分布',
                subtext: '数据来源：质量综合管理系统数据库',
				x:'center',
            },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c}万 ({d}%)"
        },
        legend: {
            orient : 'vertical',
            x : 'left',
            //data:['50%以下','50%','60%','70%','80%','90%']
			data:['0%','10%','20%','30%','40%','50%以下','50%','60%','70%','80%','90%']
        },
        toolbox: {
            show : true,
            feature : {
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
				magicType: {show: true, type : ['pie', 'funnel']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        series : [
            {
                name:'50%以上',
                type:'pie',
				selectedMode:'single',
				startAngle: 180,
				center : ['35%', 250],
                radius : ['30%', '60%'],
                data:[
                   //{value:3, name:'0%'},
                    //{value:4, name:'10%'},
                    //{value:14, name:'20%'},
                    //{value:16, name:'30%'},
                    {value:71, name:'50%以下'},
                    {value:114, name:'50%'},
                    {value:268, name:'60%'},
					{value:831, name:'70%'},
					{value:2723, name:'80%'},
					{value:4197, name:'90%'}
                ],
				itemStyle : {					
					emphasis : {
						label : {
							show : true,
							formatter: "{d}%",
							position : 'center',
							textStyle : {
								fontSize : '30',
								fontWeight : 'bold'
							}
						}
					}
				},
            },
			{
                name:'50%以下',
                type:'pie',
				startAngle: 180,
				center : ['75%', 250],
                radius : ['20%', '50%'],
                data:[
                    {value:3, name:'0%'},
                    {value:4, name:'10%'},
                    {value:14, name:'20%'},
                    {value:16, name:'30%'},
                    {value:34, name:'40%'},
                ],
				itemStyle : {					
					emphasis : {
						label : {
							show : true,
							formatter: "{d}%",
							position : 'center',
							textStyle : {
								fontSize : '20',
								fontWeight : 'bold'
							}
						}
					}
				},
            }
        ]
    },	
		'TimeRelease5' : {
		title : {
                text: '凹印08:00-10:00开印产品好品率分布',
                subtext: '数据来源：质量综合管理系统数据库',
				x:'center',
            },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c}万 ({d}%)"
        },
        legend: {
            orient : 'vertical',
            x : 'left',
            //data:['50%以下','50%','60%','70%','80%','90%']
			data:['0%','10%','20%','30%','40%','50%以下','50%','60%','70%','80%','90%']
        },
        toolbox: {
            show : true,
            feature : {
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
				magicType: {show: true, type : ['pie', 'funnel']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        series : [
            {
                name:'50%以上',
                type:'pie',
				selectedMode:'single',
				startAngle: 180,
				center : ['35%', 250],
                radius : ['30%', '60%'],
                data:[
					//{value:1, name:'0%'},
                    //{value:2, name:'10%'},
                    //{value:4, name:'20%'},
                    //{value:4, name:'30%'},
                    {value:43, name:'50%以下'},
                    {value:60, name:'50%'},
                    {value:165, name:'60%'},
					{value:518, name:'70%'},
					{value:1743, name:'80%'},
					{value:2661, name:'90%'}
                ],
				itemStyle : {					
					emphasis : {
						label : {
							show : true,
							formatter: "{d}%",
							position : 'center',
							textStyle : {
								fontSize : '30',
								fontWeight : 'bold'
							}
						}
					}
				},
            },
			{
                name:'50%以下',
                type:'pie',
				startAngle: 180,
				center : ['75%', 250],
                radius : ['20%', '50%'],
                data:[
                    {value:1, name:'0%'},
                    {value:2, name:'10%'},
                    {value:4, name:'20%'},
                    {value:4, name:'30%'},
                    {value:31, name:'40%'},
                ],
				itemStyle : {					
					emphasis : {
						label : {
							show : true,
							formatter: "{d}%",
							position : 'center',
							textStyle : {
								fontSize : '20',
								fontWeight : 'bold'
							}
						}
					}
				},
            }
        ]
    },	
	
	'TimeRelease6':	{
		timeline : {
			data : [
				'2013-01-01', '2013-02-01', { name:'2013-03-01', symbol:'Star6', symbolSize:8 }, '2013-04-01', '2013-05-01',
				{ name:'2013-06-01', symbol:'emptyStar6', symbolSize:8 }				
			],			
			autoPlay : true,
			playInterval : 1500,
			label : {
				formatter : function(s) {
					var strLable;
					switch(s.slice(6, 7))
					{
						case '2':
							strLable ='凹印晚餐时间';
							break;
						case '3':
							strLable ='凹印08:00-10:00';
							break;
						case '4':
							strLable ='胶印午餐时间';
							break;
						case '5':
							strLable ='胶印晚餐时间';
							break;
						case '6':
							strLable ='胶印15:00-18:00';
							break;
						default:
							strLable ='凹印午餐时间';
					}
					return strLable;
				}
			}
		},
		options : [
			{
				title : {
					text: '凹印午餐时间开印产品好品率分布',
					subtext: '2014年1至12月',
					x:'center',
				},
				tooltip : {
					trigger: 'item',
					formatter: "{a} <br/>{b} : {c}万 ({d}%)"
				},
				legend: {
					orient : 'vertical',
					x : 'left',
					//data:['0%','10%','20%','30%','40%','50%','60%','70%','80%','90%']
					data:['0%','10%','20%','30%','40%','50%','60%','70%','80%','90%']
				},
				calculable : true,
				toolbox: {
					show : true,
					feature : {
						mark : {show: true},
						dataView : {show: true, readOnly: false}, dataZoom : {show: true},
						magicType : {
							show: true, 
							type: ['pie', 'funnel'],
							option: {
								funnel: {
									x: '25%',
									width: '50%',
									funnelAlign: 'left',
									max: 3000
								}
							}
						},
						restore : {show: true},
						saveAsImage : {show: true}
					}
				},
				series : [
					{
						name:'好品率分布',
						type:'pie',
						selectedMode:'single',
						startAngle: 180,
						radius : ['30%', '70%'],
						data:[
							{value:1, name:'0%'},
							{value:3, name:'10%'},
							{value:4, name:'20%'},
							{value:17, name:'30%'},
							{value:32, name:'40%'},
							{value:81, name:'50%'},
							{value:205, name:'60%'},
							{value:567, name:'70%'},
							{value:2095, name:'80%'},
							{value:2889, name:'90%'}
						] ,
						 itemStyle : {
							emphasis : {
								label : {
									show : true,
									formatter: "{d}%",
									position : 'center',
									textStyle : {
										fontSize : '30',
										fontWeight : 'bold'
									}
								}
							}
						},
					}
				]
			},
			{
				title : {
						text: '凹印晚餐时间开印产品好品率分布',
						subtext: '数据来源：质量综合管理系统数据库',
						x:'center',
					},
				series : [
					{
					name:'好品率分布',
					type:'pie',
					selectedMode:'single',
					startAngle: 180,
					radius : ['30%', '70%'],
					data:[
						{value:1, name:'0%'},
						{value:3, name:'10%'},
						{value:6, name:'20%'},
						{value:9, name:'30%'},
						{value:21, name:'40%'},
						{value:63, name:'50%'},
						{value:176, name:'60%'},
						{value:506, name:'70%'},
						{value:1806, name:'80%'},
						{value:2641, name:'90%'}
					]
					}
				]
			},
			{
				title : {
					text: '凹印8-10点开印产品好品率分布',
					subtext: '数据来源：质量综合管理系统数据库',
					x:'center',
				},
				series : [
					{
					name:'好品率分布',
					type:'pie',
					selectedMode:'single',
					startAngle: 180,
					radius : ['30%', '70%'],
					data:[
						{value:1, name:'0%'},
						{value:2, name:'10%'},
						{value:4, name:'20%'},
						{value:4, name:'30%'},
						{value:31, name:'40%'},
						{value:60, name:'50%'},
						{value:165, name:'60%'},
						{value:518, name:'70%'},
						{value:1743, name:'80%'},
						{value:2661, name:'90%'}
					]
					}
				]
			},
			{
				title : {
					text: '胶印午餐时间开印产品好品率分布',
					subtext: '数据来源：质量综合管理系统数据库',
					x:'center',
				},
				series : [//胶印白班
					{
					name:'好品率分布',
					type:'pie',
					selectedMode:'single',
					startAngle: 180,
					radius : ['30%', '70%'],
					data:[
						{value:3, name:'0%'},
						{value:2, name:'10%'},
						{value:6, name:'20%'},
						{value:13, name:'30%'},
						{value:22, name:'40%'},
						{value:64, name:'50%'},
						{value:134, name:'60%'},
						{value:412, name:'70%'},
						{value:1379, name:'80%'},
						{value:1874, name:'90%'}
					]
					}
				]
			},
			{
				title : {
					text: '胶印晚餐时间开印产品好品率分布',
					subtext: '数据来源：质量综合管理系统数据库',
					x:'center',
				},
				series : [
					{
					name:'好品率分布',
					type:'pie',
					selectedMode:'single',
					startAngle: 180,
					radius : ['30%', '70%'],
					data:[
						{value:2, name:'0%'},
						{value:2, name:'10%'},
						{value:4, name:'20%'},
						{value:9, name:'30%'},
						{value:11, name:'40%'},
						{value:53, name:'50%'},
						{value:129, name:'60%'},
						{value:386, name:'70%'},
						{value:1311, name:'80%'},
						{value:1947, name:'90%'}
					]
					}
				]
			},
			{
				title : {
					text: '胶印15-18点开印产品好品率分布',
					subtext: '数据来源：质量综合管理系统数据库',
					x:'center',
				},
				series : [
					{
						name:'好品率分布',
						type:'pie',
						selectedMode:'single',
						startAngle: 180,
						radius : ['30%', '70%'],
						data:[
							{value:3, name:'0%'},
							{value:4, name:'10%'},
							{value:14, name:'20%'},
							{value:16, name:'30%'},
							{value:34, name:'40%'},
							{value:114, name:'50%'},
							{value:268, name:'60%'},
							{value:831, name:'70%'},
							{value:2723, name:'80%'},
							{value:4197, name:'90%'}
						]
					}
				]
			},
		]
	},
	
	'TimeRelease7' : {//最普通的饼图（环形图）
		title : {
                text: '凹印8:00~10:00开印产品好品率分布',
                subtext: '数据来源：质量综合管理系统数据库',
				x:'center',
            },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c}万 ({d}%)"
        },
        legend: {
            orient : 'vertical',
            x : 'left',
            data:['0%','10%','20%','30%','40%','50%','60%','70%','80%','90%']
        },
        toolbox: {
            show : true,
            feature : {
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
				magicType: {show: true, type : ['pie', 'funnel']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        series : [
            {
                name:'好品率分布',
                type:'pie',
				selectedMode:'single',
				startAngle: 180,
                radius : ['30%', '70%'],
                data:[
                    {value:1, name:'0%'},
                    {value:2, name:'10%'},
                    {value:4, name:'20%'},
                    {value:4, name:'30%'},
                    {value:31, name:'40%'},
                    {value:60, name:'50%'},
                    {value:165, name:'60%'},
					{value:518, name:'70%'},
					{value:1743, name:'80%'},
					{value:2661, name:'90%'}
                ]
            }
        ]
    },	
	DateAndQuality : {		
		title : {
                text: '核查好品率随日期变化情况',
                subtext: '数据来源：质量综合管理系统数据库',
				x:'center',
            },
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            data:['胶印好品率','凹印好品率'],
			x:150,
			y:40,
			itemGap:20,
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
				//dataZoom : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
		 dataZoom : {
            show : true,
            realtime: true,
            start : 0,
            end :100,
			//height:20,
        },
        calculable : true,
        xAxis : [
            {
				name:'日期',
                type : 'category',
				axisTick:{length:2},
                boundaryGap : false,//此处不将产量放进图表中（设为TRUE,柱形图会溢出边界）
				//此处数据动态生成
                data : (
				function (){
					var res = [];
					for(var i=1;i<31;i++) {
						res.push(i);
					}
					return res;
            })(),
			}
        ],
        yAxis : [
            {
				name:'平均好品率',
                type : 'value',
				position: 'left',
				//min:84,
				//max:89,
				scale: true,
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value} %',    // Template formatter!               
				},
            }
        ],
        series : [
            {
                name:'胶印好品率',
                type:'line',
                smooth:true,
              //  itemStyle: {normal: {areaStyle: {type: 'default'}}},
                data:[86.28,86.46,87.44,87.9,87.04,85.9,86.43,86.93,86.63,87.25,86.87,87.51,87.25,87.38,87.34,87.04,87.26,87.23,87.37,87.63,88.1,87.06,86.99,86.24,86.14,87.29,87.92,86.64,85.72,84.69],
				markPoint : MPtStyle,
				markLine : MLnStyle,
			},            
            {
                name:'凹印好品率',
                type:'line',
                smooth:true,
              //  itemStyle: {normal: {areaStyle: {type: 'default'}}},
                data:[86.19,86.73,87.11,87.71,88.35,87.72,86.72,87.56,87.46,87.17,87.79,87.75,86.77,87.28,87.25,86.87,86.74,87.16,87.62,87.48,87.41,87.35,87.32,86.9,86.75,88,87.78,87.51,87.54,85.44],
				markPoint : MPtStyle,
				markLine : MLnStyle,
			}
        ]
    },
	DateAndProduce : {		
		title : {
                text: '产量随日期变化情况',
                subtext: '数据来源：质量综合管理系统数据库',
				x:'center',
            },
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            data:['胶印产量','凹印产量'],
			x:150,
			y:40,
			itemGap:20,
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
				////dataZoom : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
		 dataZoom : {
            show : true,
            realtime: true,
            start : 0,
            end :100,
			//height:20,
        },
        calculable : true,
        xAxis : [
            {
				name:'月份',
                type : 'category',
				axisTick:{length:2},
                boundaryGap : false,//此处不将产量放进图表中（设为TRUE,柱形图会溢出边界）
				//此处数据动态生成
                data : (
				function (){
					var res = [];
					for(var i=1;i<=31;i++) {
						res.push(i);
					}
					return res;
            })(),
			}
        ],
        yAxis : [
            {
				name:'产量',
                type : 'value',
				position: 'left',
				scale: true,
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value} 车',    // Template formatter!               
				},
            }
        ],
        series : [
            {
                name:'胶印产量',
                type:'line',
                smooth:true,
                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                data:[481,806,1232,1343,880,801,769,905,1300,1511,1352,1235,1416,1475,1250,1298,1561,1659,1264,1406,1495,1357,1393,1399,1213,1191,1046,728,352,48,21],
				markPoint : MPtStyle,
				markLine : MLnStyle,
			},            
            {
                name:'凹印产量',
                type:'line',
                smooth:true,
                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                data:[572,788,1381,1769,1196,1093,1001,1097,1563,1946,1817,1589,1722,1836,1592,1623,1898,1977,1607,1762,1904,1777,1829,1868,1631,1395,1137,1184,633,245,99],
				markPoint : MPtStyle,
				markLine : MLnStyle,
			}
        ]
    },
	
	
	//2011-2014质量变化
	'FourYearsQuality_Year':	{
		timeline:{
			data:[
				'2011-01-01','2012-01-01','2013-01-01',{ name:'2014-01-01', symbol:'emptyStar6', symbolSize:8 }
			],
			label : {
				formatter : function(s) {
					return s.slice(0, 4);
				}
			},
			autoPlay : true,
			playInterval : 1500,
			y:'92%',//时间轴纵向位置
			padding:5,
		},
		options : [
		{
			title : {
                text: '2011年1月至12月平均好品率',
                subtext: '小张核查',
				x:'center',
            },
			tooltip : {
				trigger: 'axis',
				axisPointer:{
					type : 'cross',
					lineStyle: {
						type : 'dashed',
						width : 1
					}
				}
			},
			legend: {
				data:['胶印好品率','凹印好品率'],
				x:150,
				y:40,
				itemGap:20,
			},
			toolbox: {
				show : true,
				feature : {
					mark : {show: true},
					//dataZoom : {show: true},
					dataView : {show: true, readOnly: false}, dataZoom : {show: true},
					magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
					restore : {show: true},
					saveAsImage : {show: true}
				}
			},
			calculable : true,
			xAxis : [{
				name:'月份',
				axisTick : {length:2},//隐藏标记线,
				type : 'category',
				boundaryGap : false,//此处不将产量放进图表中（设为TRUE,柱形图会溢出边界）
				//此处数据动态生成
				data : (
					function (){
						var res = [];
						for(var i=1;i<=12;i++) {
							res.push(i+'月');
						}
						return res;
					})(),
				}],
			yAxis : [
				{
					name:'平均好品率',
					type : 'value',
					position: 'left',
					//scale: true,//此处不自动缩放Y轴最值，否则无法看清楚各年变化情况
					min:75,
					max:95,
					splitNumber:8,//将Y轴分为8段
					axisLabel : {
						show:true,
						interval: 'auto',    // {number}
						//rotate: -45,
						margin: 8,
						formatter: '{value} %',    // Template formatter!               
					},
				}
			],
			series : [
				{
					name:'胶印好品率',
					type:'line',
					smooth:true,
				//	itemStyle: {normal: {areaStyle: {type: 'default'}}},
					data:[76.01,76.21,79.03,80.78,77.88,78.35,78.75,79.82,81.41,82.14,80.68,83.96],
					markPoint : MPtStyle,
					markLine : MLnStyle,
				},
				{
					name:'凹印好品率',
					type:'line',
					smooth:true,
				//	itemStyle: {normal: {areaStyle: {type: 'default'}}},
					data:[84.07,83.26,77.18,77.36,78.63,78.3,76.57,77.63,80.65,81.77,82.49,80.19],
					markPoint : MPtStyle,
					markLine : MLnStyle,
				}]
			},
			{
				title : {
						text: '2012年1月至12月平均好品率',
						subtext: '小张核查',
						x:'center',
				},
				series : [
				{
					name:'胶印好品率',
					type:'line',
					smooth:true,
				//	itemStyle: {normal: {areaStyle: {type: 'default'}}},
					data:[81.25,82.89,81.22,83.26,84.23,83.83,83.84,89.19,91.67,90.22,84.09,78.02],
					markPoint : MPtStyle,
					markLine : MLnStyle,
				},
				{
					name:'凹印好品率',
					type:'line',
					smooth:true,
				//	itemStyle: {normal: {areaStyle: {type: 'default'}}},
					data:[78.23,81.46,81.34,80.91,81.49,83.82,83.1,84.42,89.33,90.86,89.16,82.66],
					markPoint : MPtStyle,
					markLine : MLnStyle,
				}]
			},
			{
				title : {
						text: '2013年1月至12月平均好品率',
						subtext: '小张核查及码后核查',
						x:'center',
					},
				series : [
				{
					name:'胶印好品率',
					type:'line',
					smooth:true,
				//	itemStyle: {normal: {areaStyle: {type: 'default'}}},
					data:[87.9,88.53,89.11,90.7,92.74,91.46,89.6,88.31,87.98,86.45,88.54,88.36],
					markPoint : MPtStyle,
					markLine : MLnStyle,
				},
				{
					name:'凹印好品率',
					type:'line',
					smooth:true,
				//	itemStyle: {normal: {areaStyle: {type: 'default'}}},
					data:[87.64,88.24,87.73,88.61,91.41,91.46,90.69,89.43,88.13,87.95,85.62,88.58],
					markPoint : MPtStyle,
					markLine : MLnStyle,
				}]
			},
			{
				title : {
						text: '2014年1月至12月平均好品率',
						subtext: '小张核查及码后核查',
						x:'center',
					},
				series : [
				{
					name:'胶印好品率',
					type:'line',
					smooth:true,
				//	itemStyle: {normal: {areaStyle: {type: 'default'}}},
					data:[86.01,88.95,89,88.47,87.54,85.49,86.76,87.4,87.48,86.13,84.54,85.31],
					markPoint : MPtStyle,
					markLine : MLnStyle,
				},
				{
					name:'凹印好品率',
					type:'line',
					smooth:true,
				//	itemStyle: {normal: {areaStyle: {type: 'default'}}},
					data:[84.49,86.3,88.45,88.89,89.09,88.21,85.95,87.31,88.07,86.34,86.56,83.63],
					markPoint : MPtStyle,
					markLine : MLnStyle,
				}]
			}
			
		]
	},
	//2011-2014质量变化
	'FourYearsQuality_Month':	{
		timeline:{
			data:[
				'2014-01-01','2014-02-01',{ name:'2014-03-01', symbol:'emptyStar6', symbolSize:8 },'2014-04-01','2014-05-01',{ name:'2014-06-01', symbol:'emptyStar6', symbolSize:8 },
				'2014-07-01','2014-08-01',{ name:'2014-09-01', symbol:'emptyStar6', symbolSize:8 },'2014-10-01','2014-11-01',{ name:'2014-12-01', symbol:'emptyStar6', symbolSize:8 }
			],
			label : {
				formatter : function(s) {
					var strLable;
					switch(s.slice(5, 7))
					{
						case '02':
							strLable ='二月';
							break;
						case '03':
							strLable ='三月';
							break;
						case '04':
							strLable ='四月';
							break;
						case '05':
							strLable ='五月';
							break;
						case '06':
							strLable ='六月';
							break;
						case '07':
							strLable ='七月';
							break;
						case '08':
							strLable ='八月';
							break;
						case '09':
							strLable ='九月';
							break;
						case '10':
							strLable ='十月';
							break;
						case '11':
							strLable ='十一月';
							break;
						case '12':
							strLable ='十二月';
							break;
						default:
							strLable ='一月';
					}
					return strLable;
				}
			},
			autoPlay : true,
			playInterval : 1500,
			y:'92%',//时间轴纵向位置
			padding:7,
		},
		options : [
		{
			title : {
                text: '一月份平均好品率',
                subtext: '2011-2014',
				x:'center',
            },
			tooltip : {
				trigger: 'axis',
				axisPointer : {            // 坐标轴指示器，坐标轴触发有效
					type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
				},
			},
			legend: {
				data:['胶印好品率','凹印好品率'],
				x:150,
				y:40,
				itemGap:20,
			},
			toolbox: {
				show : true,
				feature : {
					mark : {show: true},
					dataView : {show: true, readOnly: false}, dataZoom : {show: true},
					magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
					restore : {show: true},
					saveAsImage : {show: true}
				}
			},
			calculable : true,
			xAxis : [{
				name:'年份',
				type : 'category',
				axisTick : {show: false},//隐藏标记线,
				boundaryGap : true,//此处不将产量放进图表中（设为TRUE,柱形图会溢出边界）
				//此处数据动态生成
				data : (
					function (){
						var res = [];
						for(var i=2011;i<=2014;i++) {
							res.push(i+'年');
						}
						return res;
					})(),
				}],				
			yAxis : [
				{
					name:'平均好品率',
					type : 'value',
					position: 'left',
					//scale: true,//此处不自动缩放Y轴最值，否则无法看清楚各年变化情况
					min:75,
					max:95,
					splitNumber:8,//将Y轴分为8段
					axisLabel : {
						show:true,
						interval: 'auto',    // {number}
						//rotate: -45,
						margin: 8,
						formatter: '{value} %',    // Template formatter!               
					},
				}
			],
			series : [
				{
					name:'胶印好品率',
					type:'bar',barMaxWidth:80,
					smooth:true,
					itemStyle:BarStyleTBlue,
					data:[76.01,81.25,87.9,86.01],
					markPoint : MPtStyle,
					markLine : MLnStyle,
				},
				{
					name:'凹印好品率',
					type:'bar',barMaxWidth:80,
					smooth:true,
					itemStyle:BarStyleTGreen,
					data:[84.07,78.23,87.64,84.49],
					markPoint : MPtStyle,
					markLine : MLnStyle,
				}]
			},
			{
				title : {
						text: '二月份平均好品率',
						subtext: '2011-2014',
						x:'center',
				},
				series : [
				{
					name:'胶印好品率',
					type:'bar',barMaxWidth:80,					
					smooth:true,
					itemStyle: {normal: {areaStyle: {type: 'default'}}},
					data:[76.21,82.89,88.53,88.95],
					markPoint : MPtStyle,
					markLine : MLnStyle,
				},
				{
					name:'凹印好品率',
					type:'bar',barMaxWidth:80,
					smooth:true,
					itemStyle:dataStyle_iT,
					data:[83.26,81.46,88.24,86.3],
					markPoint : MPtStyle,
					markLine : MLnStyle,
				}]
			},
			{
				title : {
						text: '三月份平均好品率',
						subtext: '2011-2014',
						x:'center',
					},
				series : [
				{
					name:'胶印好品率',
					type:'bar',barMaxWidth:80,
					smooth:true,
					itemStyle:dataStyle_iT,
					data:[79.03,81.22,89.11,89],
					markPoint : MPtStyle,
					markLine : MLnStyle,
				},
				{
					name:'凹印好品率',
					type:'bar',barMaxWidth:80,
					smooth:true,
					itemStyle: {normal: {areaStyle: {type: 'default'}}},
					data:[77.18,81.34,87.73,88.45],
					markPoint : MPtStyle,
					markLine : MLnStyle,
				}]
			},
			{
				title : {
						text: '四月份平均好品率',
						subtext: '2011-2014',
						x:'center',
					},
				series : [
				{
					name:'胶印好品率',
					type:'bar',barMaxWidth:80,
					smooth:true,
					itemStyle:dataStyle_iT,
					data:[80.78,83.26,90.7,88.47],
					markPoint : MPtStyle,
					markLine : MLnStyle,
				},
				{
					name:'凹印好品率',
					type:'bar',barMaxWidth:80,
					smooth:true,
					itemStyle: {normal: {areaStyle: {type: 'default'}}},
					data:[77.36,80.91,88.61,88.89],
					markPoint : MPtStyle,
					markLine : MLnStyle,
				}]
			}
			,
			{
				title : {
						text: '五月份平均好品率',
						subtext: '2011-2014',
						x:'center',
					},
				series : [
				{
					name:'胶印好品率',
					type:'bar',barMaxWidth:80,
					smooth:true,
					itemStyle:dataStyle_iT,
					data:[77.88,84.23,92.74,87.54],
					markPoint : MPtStyle,
					markLine : MLnStyle,
				},
				{
					name:'凹印好品率',
					type:'bar',barMaxWidth:80,
					smooth:true,
					itemStyle:dataStyle_iT,
					data:[78.63,81.49,91.41,89.09],
					markPoint : MPtStyle,
					markLine : MLnStyle,
				}]
			},
			{
				title : {
						text: '六月份平均好品率',
						subtext: '2011-2014',
						x:'center',
					},
				series : [
				{
					name:'胶印好品率',
					type:'bar',barMaxWidth:80,
					smooth:true,
					itemStyle:dataStyle_iT,
					data:[78.35,83.83,91.46,85.49],
					markPoint : MPtStyle,
					markLine : MLnStyle,
				},
				{
					name:'凹印好品率',
					type:'bar',barMaxWidth:80,
					smooth:true,
					itemStyle:dataStyle_iT,
					data:[78.3,83.82,91.46,88.21],
					markPoint : MPtStyle,
					markLine : MLnStyle,
				}]
			},
			{
				title : {
						text: '七月份平均好品率',
						subtext: '2011-2014',
						x:'center',
					},
				series : [
				{
					name:'胶印好品率',
					type:'bar',barMaxWidth:80,
					smooth:true,
					itemStyle:dataStyle_iT,
					data:[78.75,83.84,89.6,86.76],
					markPoint : MPtStyle,
					markLine : MLnStyle,
				},
				{
					name:'凹印好品率',
					type:'bar',barMaxWidth:80,
					smooth:true,
					itemStyle:dataStyle_iT,
					data:[76.57,83.1,90.69,85.95],
					markPoint : MPtStyle,
					markLine : MLnStyle,
				}]
			},
			{
				title : {
						text: '八月份平均好品率',
						subtext: '2011-2014',
						x:'center',
					},
				series : [
				{
					name:'胶印好品率',
					type:'bar',barMaxWidth:80,
					smooth:true,
					itemStyle:dataStyle_iT,
					data:[79.82,89.19,88.31,87.4],
					markPoint : MPtStyle,
					markLine : MLnStyle,
				},
				{
					name:'凹印好品率',
					type:'bar',barMaxWidth:80,
					smooth:true,
					itemStyle:dataStyle_iT,
					data:[77.63,84.42,89.43,87.31],
					markPoint : MPtStyle,
					markLine : MLnStyle,
				}]
			},
			{
				title : {
						text: '九月份平均好品率',
						subtext: '2011-2014',
						x:'center',
					},
				series : [
				{
					name:'胶印好品率',
					type:'bar',barMaxWidth:80,
					smooth:true,
					itemStyle:dataStyle_iT,
					data:[81.41,91.67,87.98,87.48],
					markPoint : MPtStyle,
					markLine : MLnStyle,
				},
				{
					name:'凹印好品率',
					type:'bar',barMaxWidth:80,
					smooth:true,
					itemStyle:dataStyle_iT,
					data:[80.65,89.33,88.13,88.07],
					markPoint : MPtStyle,
					markLine : MLnStyle,
				}]
			},
			{
				title : {
						text: '十月份平均好品率',
						subtext: '2011-2014',
						x:'center',
					},
				series : [
				{
					name:'胶印好品率',
					type:'bar',barMaxWidth:80,
					smooth:true,
					itemStyle:dataStyle_iT,
					data:[82.14,90.22,86.45,86.13],
					markPoint : MPtStyle,
					markLine : MLnStyle,
				},
				{
					name:'凹印好品率',
					type:'bar',barMaxWidth:80,
					smooth:true,
					itemStyle:dataStyle_iT,
					data:[81.77,90.86,87.95,86.34],
					markPoint : MPtStyle,
					markLine : MLnStyle,
				}]
			},
			{
				title : {
						text: '十一月份平均好品率',
						subtext: '2011-2014',
						x:'center',
					},
				series : [
				{
					name:'胶印好品率',
					type:'bar',barMaxWidth:80,
					smooth:true,
					itemStyle:dataStyle_iT,
					data:[80.68,84.09,88.54,84.54],
					markPoint : MPtStyle,
					markLine : MLnStyle,
				},
				{
					name:'凹印好品率',
					type:'bar',barMaxWidth:80,
					smooth:true,
					itemStyle:dataStyle_iT,
					data:[82.49,89.16,85.62,86.56],
					markPoint : MPtStyle,
					markLine : MLnStyle,
				}]
			},
			{
				title : {
						text: '十二月份平均好品率',
						subtext: '2011-2014',
						x:'center',
					},
				series : [
				{
					name:'胶印好品率',
					type:'bar',barMaxWidth:80,
					smooth:true,
					itemStyle:dataStyle_iT,
					data:[83.96,78.02,88.36,85.31],
					markPoint : MPtStyle,
					markLine : MLnStyle,
				},
				{
					name:'凹印好品率',
					type:'bar',barMaxWidth:80,
					smooth:true,
					itemStyle:dataStyle_iT,
					data:[80.19,82.66,88.58,83.63],
					markPoint : MPtStyle,
					markLine : MLnStyle,
				}]
			}
		]
	},
	'RoseData':	{		
		title : {
			text: '2011-2014年平均好品率',
			subtext: '四年联合统计',
			x:'center'
		},
		tooltip : {
			trigger: 'axis',			
			axisPointer:{
				type : 'cross',
				lineStyle: {
					type : 'dashed',
					width : 1
				}
			},
			formatter: function(a){ 
				 res = a.seriesName  + a.name + '</br>' + '平均好品率: '; 
				 var i = a.value+83;
				 res += i +'% ';
				 if(a.percent!=null)	{res+='(比例'+ a.percent +'%)'};				
				return res; 
			} 
		},
		legend: {
			orient : 'vertical',
			y:'center',
			data : (
				function (){
					var res = [];
					for(var i=1;i<=12;i++) {
						res.push(i+'月');
					}
					return res;
            })(),
		},
		toolbox: {
			show : true,
			feature : {
				mark : {show: true},
				dataView : {show: true, readOnly: false}, dataZoom : {show: true},
				magicType : {
					show: true, 
					type: ['pie', 'funnel']
				},
				restore : {show: true},
				saveAsImage : {show: true}
			}
		},
		calculable : true,
		series : [
			{
				name:'胶印',
				type:'pie',
				//selectedMode:'single',
				radius : [70, 200],
				center : ['25%', 240],
				roseType : 'radius',//半径模式
				width: '40%',       // for funnel
				max: 5,            // for funnel
				itemStyle : {
					normal : {
						label : {
							show : false
						},
						labelLine : {
							show : false
						}
					},
					emphasis : {
						label : {
							show : true,
							position : 'center',
							textStyle : {
								fontSize : '20',
								fontWeight : 'bold'
							},
							formatter: function(a){ 
								 res = a.name + ':'; 
								 var i = a.value+83.5;
								 res += i;
								return res; 
							} 
						},
						//labelLine : {
						//	show : true,
						//}
					}
				},
				data:[
						{value:84.44-83.5, name:'1月'},
						{value:84.83-83.5, name:'2月'},
						{value:84.89-83.5, name:'3月'},
						{value:86.2-83.5, name:'4月'},
						{value:86.43-83.5, name:'5月'},
						{value:84.93-83.5, name:'6月'},
						{value:84.98-83.5, name:'7月'},
						{value:86.19-83.5, name:'8月'},
						{value:87.5-83.5, name:'9月'},
						{value:86.56-83.5, name:'10月'},
						{value:85.14-83.5, name:'11月'},
						{value:84.04-83.5, name:'12月'},
					]
				},
				{
					name:'凹印',
					type:'pie',					
					//startAngle: 180,
					radius : [70, 200],
					center : ['75%', 240],
					roseType : 'area',//面积模式
					x: '50%',               // for funnel
					max: 5,                // for funnel
					//sort : 'ascending',     // for funnel
					//sort : 'none',
					itemStyle : {
						normal : {
							label : {
								show : false
							},
							labelLine : {
								show : false
							}
						},
						emphasis : {
							label : {
								show : true,
								position : 'center',
								textStyle : {
									fontSize : '20',
									fontWeight : 'bold'
								},
								formatter: function(a){ 
									 res = a.name + ':'; 
									 var i = a.value+83.5;
									 res += i;
									return res; 
								} 
							}
						}
					},
					data:[
						{value:83.97-83.5, name:'1月'},
						{value:84.29-83.5, name:'2月'},
						{value:84.02-83.5, name:'3月'},
						{value:84.25-83.5, name:'4月'},
						{value:85.18-83.5, name:'5月'},
						{value:85.54-83.5, name:'6月'},
						{value:83.88-83.5, name:'7月'},
						{value:84.2-83.5, name:'8月'},
						{value:86.38-83.5, name:'9月'},
						{value:86.67-83.5, name:'10月'},
						{value:86.04-83.5, name:'11月'},
						{value:84.83-83.5, name:'12月'},
				]
			}
		]
	},
	//2011-2014质量变化
	'FourYearsQuality_Years':	{
		title : {
			text: '2011-2014年平均好品率',
			subtext: '四年联合统计',
			x:'center',
		},
		tooltip : {
			trigger: 'axis',			
			axisPointer:{
				type : 'cross',
				lineStyle: {
					type : 'dashed',
					width : 1
				}
			},
		},
		legend: {
			data:['胶印好品率','凹印好品率'],
			x:150,
			y:40,
			itemGap:20,
		},
		toolbox: {
			show : true,
			feature : {
				mark : {show: true},
				//dataZoom : {show: true},
				dataView : {show: true, readOnly: false}, dataZoom : {show: true},
				magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
				restore : {show: true},
				saveAsImage : {show: true}
			}
		},
		calculable : true,
		xAxis : [{
			name:'月份',
			type : 'category',
			axisTick:{length:2},
			boundaryGap : false,//此处不将产量放进图表中（设为TRUE,柱形图会溢出边界）
			//此处数据动态生成
			data : (
				function (){
					var res = [];
					for(var i=1;i<=12;i++) {
						res.push(i+'月');
					}
					return res;
				})(),
			}],
		yAxis : [
			{
				name:'平均好品率',
				type : 'value',
				position: 'left',
				scale: true,//此处不自动缩放Y轴最值，否则无法看清楚各年变化情况
				//min:75,
				//max:95,
				splitNumber:8,//将Y轴分为8段
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value} %',    // Template formatter!               
				},
			}
		],
		series : [
		{
			name:'胶印好品率',
			type:'line',
			smooth:true,
		//	itemStyle: {normal: {areaStyle: {type: 'default'}}},
			data:[84.44,84.83,84.89,86.2,86.43,84.93,84.98,86.19,87.5,86.56,85.14,84.04],
			markPoint : MPtStyleMax,
			markLine : MLnStyle,
			//itemStyle :LineStyleBlue,
		},
		{
			name:'凹印好品率',
			type:'line',
			smooth:true,
		//	itemStyle: {normal: {areaStyle: {type: 'default'}}},
			data:[83.97,84.29,84.02,84.25,85.18,85.54,83.88,84.2,86.38,86.67,86.04,84.83],
			markPoint : MPtStyleMax,
			markLine : MLnStyle,
		//	itemStyle :LineStyleArea,
		}]

	},
	
		//2011-2014质量变化
	'FourYearsQuality_Season':	{
		title: {
			text: '2011-2014年Q1~Q4平均好品率',
			subtext: '四年联合统计',
			x:'center'
		},
		tooltip : {
			trigger: 'axis',
			axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			},
			formatter : '{b}<br/>{a0}:{c0}%<br/>{a2}:{c2}%<br/>{a4}:{c4}%<br/>{a6}:{c6}%'
		},
		legend: {
			y: '90%',
			itemGap : 210,//document.getElementById('main').offsetWidth / 8,
			data:['2011', '2012','2013', '2014']
		},
		toolbox: {
			show : true,
			feature : {
				mark : {show: true},
				//dataZoom : {show: true},
				dataView : {show: true, readOnly: false}, dataZoom : {show: true},
				magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
				restore : {show: true},
				saveAsImage : {show: true}
			}
		},
		grid: {
			y: 80,
			y2: 30
		},
		xAxis : [
			{
				//name:'年份',
				type : 'value',
				position: 'top',
				splitLine: {show: false},
				axisLabel: {show: false},
				axisLine: {show: false},
			}
		],
		yAxis : [
			{
				name:'季度',
				type : 'category',
				splitLine: {show: false},
				data : ['Q4', 'Q3', 'Q2', 'Q1'],
			}
		],
		series : [
			{
				name:'2011',
				type:'bar',barMaxWidth:60,
				stack: '总量',
				itemStyle : dataStyle_iL,
				data:[81.32,76.7,77.78,78.78]
			},
			{
				name:'2011',
				type:'bar',barMaxWidth:60,
				stack: '总量',
				itemStyle: placeHoledStyle,
				data:[18.68,23.3,22.22,21.22]
			},
			{
				name:'2012',
				type:'bar',barMaxWidth:60,
				stack: '总量',
				itemStyle : dataStyle_iL,
				data:[90.13,84.06,81.46,80.66]
			},
			{
				name:'2012',
				type:'bar',barMaxWidth:60,
				stack: '总量',
				itemStyle: placeHoledStyle,
				data:[9.87,15.94,18.54,19.34]
			},
			{
				name:'2013',
				type:'bar',barMaxWidth:60,
				stack: '总量',
				itemStyle : dataStyle_iL,
				data:[87.58,90.4,89.87,88.32]
			},
			{
				name:'2013',
				type:'bar',barMaxWidth:60,
				stack: '总量',
				itemStyle: placeHoledStyle,
				data:[12.42,9.6,10.13,11.68]
			},
			{
				name:'2014',
				type:'bar',barMaxWidth:60,
				stack: '总量',
				itemStyle : dataStyle_iL,
				data:[86.66,86.96,88.45,85.94]
			},
			{
				name:'2014',
				type:'bar',barMaxWidth:60,
				stack: '总量',
				itemStyle: placeHoledStyle,
				data:[13.34,13.04,11.55,14.06]
			}
		]
	},
	
	//2011-2014质量变化
	'QualityByCaptainIntaglio':	{
		title : {
			text: '9602A各机长平均好品率(凹印)',
			subtext: '数据来源：质量综合管理系统数据库',
			x:'center',
			textStyle: {color: '#56a68d'},
		},
		tooltip : {
			trigger: 'axis',
			axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			},
		},
	/*	legend: {
			data:['2011年', '2012年'],
			x:50,
			y:30
		},*/
		toolbox: {
			show : true,
			feature : {
				mark : {show: true},
				dataView : {show: true, readOnly: false}, dataZoom : {show: true},
				magicType: {show: true, type: ['line', 'bar']},
				restore : {show: true},
				saveAsImage : {show: true}
			}
		},
		calculable : true,
		xAxis : [
			{
				name:'平均好品率',
				type : 'value',
				boundaryGap : [0, 0.01],
				scale: true,//自动缩放最大最小值
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value} %',    // Template formatter!               
				},
			}
		],
		yAxis : [
			{
				type : 'category',
				//axisLine : {show: false}, //坐标纵向线
				axisTick : {show: false},//隐藏标记线,
				data : ['赵军','何兵','刘健康','奉伟','陈拥军','马斌','高思东','何杰','徐晖','牟军','吴勇']
			}
		],
		series : [
			{
				type:'bar',barMaxWidth:80,
				itemStyle: BarStyle2,				
				data:[83.88,83.91,84.33,86.24,86.65,87.07,87.49,87.99,88.14,88.51,88.61],
				markLine : MLnStyle,
			}
		]		
	},
	'QualityByCaptainIntaglio2':	{
		title : {
			text: '9603A各机长平均好品率(凹一印)',
			subtext: '数据来源：质量综合管理系统数据库',
			x:'center',
			textStyle: {color: '#93417c'},
		},
		tooltip : {
			trigger: 'axis',
			axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			},
		},
		toolbox: {
			show : true,
			feature : {
				mark : {show: true},
				dataView : {show: true, readOnly: false}, dataZoom : {show: true},
				magicType: {show: true, type: ['line', 'bar']},
				restore : {show: true},
				saveAsImage : {show: true}
			}
		},
		calculable : true,
		xAxis : [
			{
				name:'平均好品率',
				type : 'value',
				boundaryGap : [0, 0.01],
				scale: true,//自动缩放最大最小值
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value} %',    // Template formatter!               
				},
			}
		],
		yAxis : [
			{
				type : 'category',
				//axisLine : {show: false}, //坐标纵向线
				axisTick : {show: false},//隐藏标记线
				data : ['刘健康','杨平','任晓军','刘晓洲','康建','杜志明'],
			}
		],
		series : [
			{
				type:'bar',barMaxWidth:80,
				itemStyle: BarStyle3,
				data:[85.72,87.33,89.77,90.23,90.99,91.09],
				markLine : MLnStyle,
			}
		]		
	},
	'QualityByCaptainIntaglio3':	{
		title : {
			text: '9604A各机长平均好品率(凹一印)',
			subtext: '数据来源：质量综合管理系统数据库',
			x:'center',
			textStyle: {color: '#158f8a'},
		},
		tooltip : {
			trigger: 'axis',
			axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			},
		},
		toolbox: {
			show : true,
			feature : {
				mark : {show: true},
				dataView : {show: true, readOnly: false}, dataZoom : {show: true},
				magicType: {show: true, type: ['line', 'bar']},
				restore : {show: true},
				saveAsImage : {show: true}
			}
		},
		calculable : true,
		xAxis : [
			{
				name:'平均好品率',
				type : 'value',
				min:85,
				boundaryGap : [0, 0.01],
				scale: true,//自动缩放最大最小值
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value} %',    // Template formatter!               
				},
			}
		],
		yAxis : [
			{
				type : 'category',
				axisTick : {show: false},//隐藏标记线
				data : ['杨平','任晓军','李强','冯利军','李浩志','黄杰','柏华','汪涛','袁璐','赵小华','罗仕勇'],
			}
		],
		series : [
			{
				type:'bar',barMaxWidth:80,
				itemStyle: BarStyle4,
				data:[86.1,86.65,87.2,87.96,88.02,88.05,88.2,88.28,88.32,88.49,89.27],
				markLine : MLnStyle,
			}
		]		
	},
	'QualityByCaptainIntaglio4':	{
		title : {
			text: '9607A各机长平均好品率(凹一印)',
			subtext: '数据来源：质量综合管理系统数据库',
			x:'center',
			textStyle: {color: '#e94128'},
		},
		tooltip : {
			trigger: 'axis',
			axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			},
		},
		toolbox: {
			show : true,
			feature : {
				mark : {show: true},
				dataView : {show: true, readOnly: false}, dataZoom : {show: true},
				magicType: {show: true, type: ['line', 'bar']},
				restore : {show: true},
				saveAsImage : {show: true}
			}
		},
		calculable : true,
		xAxis : [
			{
				name:'平均好品率',
				type : 'value',
				boundaryGap : [0, 0.01],
				scale: true,//自动缩放最大最小值
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value} %',    // Template formatter!               
				},
			}
		],
		yAxis : [
			{
				type : 'category',
				axisTick : {show: false},//隐藏标记线
				data : ['邓学彬','况东','张登军','赵小华','徐晖','黄杰','彭强','柏华','何杰','刘大金'],
			}
		],
		series : [
			{
				type:'bar',barMaxWidth:80,
				itemStyle: BarStyle7,
				data:[81.82,82.32,83,83.84,83.86,83.87,84.27,85.18,86.7,86.74,],
				markLine : MLnStyle,
			}
		]		
	},
	'QualityByCaptainIntaglio5':	{
		title : {
			text: '9603A各机长平均好品率(凹二印)',
			subtext: '数据来源：质量综合管理系统数据库',
			x:'center',
			textStyle: {color: '#93417c'},
		},
		tooltip : {
			trigger: 'axis',
			axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			},
		},
		toolbox: {
			show : true,
			feature : {
				mark : {show: true},
				dataView : {show: true, readOnly: false}, dataZoom : {show: true},
				magicType: {show: true, type: ['line', 'bar']},
				restore : {show: true},
				saveAsImage : {show: true}
			}
		},
		calculable : true,
		xAxis : [
			{
				name:'平均好品率',
				type : 'value',
				boundaryGap : [0, 0.01],
				scale: true,//自动缩放最大最小值
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value} %',    // Template formatter!               
				},
			}
		],
		yAxis : [
			{
				type : 'category',
				axisTick : {show: false},//隐藏标记线
				data : ['刘健康','康健','陈拥军','马斌','赵杰元'],
			}
		],
		series : [
			{
				type:'bar',barMaxWidth:80,
				itemStyle: BarStyle3,
				data:[87.67,89.7,90.12,90.55,91.18],
				markLine : MLnStyle,
			}
		]		
	},
	'QualityByCaptainIntaglio6':	{
		title : {
			text: '9604A各机长平均好品率(凹二印)',
			subtext: '数据来源：质量综合管理系统数据库',
			x:'center',
			textStyle: {color: '#158f8a'},
		},
		tooltip : {
			trigger: 'axis',
			axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			},
		},
		toolbox: {
			show : true,
			feature : {
				mark : {show: true},
				dataView : {show: true, readOnly: false}, dataZoom : {show: true},
				magicType: {show: true, type: ['line', 'bar']},
				restore : {show: true},
				saveAsImage : {show: true}
			}
		},
		calculable : true,
		xAxis : [
			{
				name:'平均好品率',
				type : 'value',
				boundaryGap : [0, 0.01],
				scale: true,//自动缩放最大最小值
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value} %',    // Template formatter!               
				},
			}
		],
		yAxis : [
			{
				type : 'category',
				axisTick : {show: false},//隐藏标记线
				data : ['柏华','罗仕勇','刘洪','蔡勇','杨济榕','刘建勇','周文彬','杨平','余松阳','李强','付豹','郑昭辉'],
			}
		],
		series : [
			{
				type:'bar',barMaxWidth:80,
				itemStyle: BarStyle4,
				data:[83.27,85.51,87.22,87.78,88.02,88.27,88.38,88.56,88.59,88.83,89.12,89.67],
				markLine : MLnStyle,
			}
		]		
	},
	'QualityByCaptainIntaglio7':	{
		title : {
			text: '9607A各机长平均好品率(凹二印)',
			subtext: '数据来源：质量综合管理系统数据库',
			x:'center',
			textStyle: {color: '#e94128'},
		},
		tooltip : {
			trigger: 'axis',
			axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			},
		},
		toolbox: {
			show : true,
			feature : {
				mark : {show: true},
				dataView : {show: true, readOnly: false}, dataZoom : {show: true},
				magicType: {show: true, type: ['line', 'bar']},
				restore : {show: true},
				saveAsImage : {show: true}
			}
		},
		calculable : true,
		xAxis : [
			{
				name:'平均好品率',
				type : 'value',
				boundaryGap : [0, 0.01],
				scale: true,//自动缩放最大最小值
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value} %',    // Template formatter!               
				},
			}
		],
		yAxis : [
			{
				type : 'category',
				axisTick : {show: false},//隐藏标记线
				data : ['刘大金','游郑岗','刘芋兵','冯利军','何伟平','付豹','李强','赵小华','况东','杨平'],
			}
		],
		series : [
			{
				type:'bar',barMaxWidth:80,
				itemStyle: BarStyle7,
				data:[82.58,83.21,83.25,83.28,83.53,83.94,84.11,84.3,84.75,88.08],
				markLine : MLnStyle,
			}
		]		
	},
	
	//2011-2014质量变化
	'QualityByCaptainOffset':	{
		title : {
			text: '9602A品各机长平均好品率(胶一印)',
			subtext: '数据来源：质量综合管理系统数据库',
			x:'center',
			textStyle: {color: '#56a68d'},
		},
		tooltip : {
			trigger: 'axis',
			axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			},
		},
		/*legend: {
			data:['平均好品率', '好品率低于70%大万数'],
			x:100,
			y:20
		},*/
		toolbox: {
			show : true,
			feature : {
				mark : {show: true},
				dataView : {show: true, readOnly: false}, dataZoom : {show: true},
				magicType: {show: true, type: ['line', 'bar']},
				restore : {show: true},
				saveAsImage : {show: true}
			}
		},
		calculable : true,
		xAxis : [
			{
				name:'平均好品率',
				type : 'value',
				boundaryGap : [0, 0.01],
				scale: true,//自动缩放最大最小值
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value} %',    // Template formatter!               
				},
			},
			/*{
				name:'大万数',
				type : 'value',
				boundaryGap : [0, 0.01],
				scale: true,//自动缩放最大最小值
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					//margin: 2,
					formatter: '{value}万',    // Template formatter!               
				},
			}*/
		],
		yAxis : [
			{
				type : 'category',
				axisTick : {show: false},//隐藏标记线
				data : ['陈小强','王渝波','张立力','刘强','唐军','吴强']
			}			
		],
		series : [
			{
				type:'bar',barMaxWidth:80,
				name:'平均好品率', 
				itemStyle: BarStyle2,				
				data:[84.4,84.72,85.3,85.84,85.84,86.18],
				markLine : MLnStyle,
			},
			/*{
				xAxisIndex: 1,
				name:'好品率低于70%大万数',
				type:'bar',barMaxWidth:80,
				itemStyle: BarStyleFake,
				data:[165,137,101,31,111,36],
				markLine : MLnStyle,
			*/
		]		
	},
	'QualityByCaptainOffset2':	{
		title : {
			text: '9603A品各机长平均好品率(胶一印)',
			subtext: '数据来源：质量综合管理系统数据库',
			x:'center',
			textStyle: {color: '#93417c'},
		},
		tooltip : {
			trigger: 'axis',
			axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			},
		},
		toolbox: {
			show : true,
			feature : {
				mark : {show: true},
				dataView : {show: true, readOnly: false}, dataZoom : {show: true},
				magicType: {show: true, type: ['line', 'bar']},
				restore : {show: true},
				saveAsImage : {show: true}
			}
		},
		calculable : true,
		xAxis : [
			{
				name:'平均好品率',
				type : 'value',
				boundaryGap : [0, 0.01],
				scale: true,//自动缩放最大最小值
				min:88,
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value} %',    // Template formatter!               
				},
			}
		],
		yAxis : [
			{
				type : 'category',
				//axisLine : {show: false}, //坐标纵向线
				axisTick : {show: false},//隐藏标记线
				data : ['刘强','吴强','李启路','许嘉'],
			}
		],
		series : [
			{
				type:'bar',barMaxWidth:80,
				itemStyle: BarStyle3,
				data:[88.95,89.69,90.19,90.54],
				markLine : MLnStyle,
			}
		]		
	},
		'QualityByCaptainOffset3':	{
		title : {
			text: '9602A各机长平均好品率(胶二印)',
			subtext: '数据来源：质量综合管理系统数据库',
			x:'center',
			textStyle: {color: '#56a68d'},
		},
		tooltip : {
			trigger: 'axis',
			axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			},
		},
	/*	legend: {
			data:['2011年', '2012年'],
			x:50,
			y:30
		},*/
		toolbox: {
			show : true,
			feature : {
				mark : {show: true},
				dataView : {show: true, readOnly: false}, dataZoom : {show: true},
				magicType: {show: true, type: ['line', 'bar']},
				restore : {show: true},
				saveAsImage : {show: true}
			}
		},
		calculable : true,
		xAxis : [
			{
				name:'平均好品率',
				type : 'value',
				boundaryGap : [0, 0.01],
				scale: true,//自动缩放最大最小值
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value} %',    // Template formatter!               
				},
			}
		],
		yAxis : [
			{
				type : 'category',
				//axisLine : {show: false}, //坐标纵向线
				axisTick : {show: false},//隐藏标记线
				data : ['查安余','李建华','吴明森','温涛','王崇润','李胜利','邓忠华','刘强']
			}
		],
		series : [
			{
				type:'bar',barMaxWidth:80,
				itemStyle: BarStyle2,				
				data:[84.5,84.92,84.95,86.06,86.21,86.26,86.39,87.6],
				markLine : MLnStyle,
			}
		]		
	},
	'QualityByCaptainOffset4':	{
		title : {
			text: '9603A各机长平均好品率(胶二印)',
			subtext: '数据来源：质量综合管理系统数据库',
			x:'center',
			textStyle: {color: '#93417c'},
		},
		tooltip : {
			trigger: 'axis',
			axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			},
		},
		toolbox: {
			show : true,
			feature : {
				mark : {show: true},
				dataView : {show: true, readOnly: false}, dataZoom : {show: true},
				magicType: {show: true, type: ['line', 'bar']},
				restore : {show: true},
				saveAsImage : {show: true}
			}
		},
		calculable : true,
		xAxis : [
			{
				name:'平均好品率',
				type : 'value',
				boundaryGap : [0, 0.01],
				//scale: true,//自动缩放最大最小值
				min:88,
				max:91,
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value} %',    // Template formatter!               
				},
			}
		],
		yAxis : [
			{
				type : 'category',
				//axisLine : {show: false}, //坐标纵向线
				axisTick : {show: false},//隐藏标记线
				data : ['李胜利','李晓军','刘文华','温涛'],
			}
		],
		series : [
			{
				type:'bar',barMaxWidth:80,
				itemStyle: BarStyle3,
				data:[89.01,90.33,90.36,90.39],
				markLine : MLnStyle,
			}
		]		
	},
	'QualityByCaptainOffset5':	{
		title : {
			text: '9604A各机长平均好品率(胶印)',
			subtext: '数据来源：质量综合管理系统数据库',
			x:'center',
			textStyle: {color: '#158f8a'},
		},
		tooltip : {
			trigger: 'axis',
			axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			},
		},
		toolbox: {
			show : true,
			feature : {
				mark : {show: true},
				dataView : {show: true, readOnly: false}, dataZoom : {show: true},
				magicType: {show: true, type: ['line', 'bar']},
				restore : {show: true},
				saveAsImage : {show: true}
			}
		},
		calculable : true,
		xAxis : [
			{
				name:'平均好品率',
				type : 'value',
				boundaryGap : [0, 0.01],
				//scale: true,//自动缩放最大最小值
				min:83,
				max:90,
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value} %',    // Template formatter!               
				},
			}
		],
		yAxis : [
			{
				type : 'category',
				axisTick : {show: false},//隐藏标记线

				data : ['范宁','钱亦轲','严强','严磊','刘勇明','邓波','周武华','黄玉勇','杨略','张志军'],
			}
		],
		series : [
			{
				type:'bar',barMaxWidth:80,
				itemStyle: BarStyle4,
				data:[84,84.28,87.08,87.78,88.19,88.19,88.22,88.23,88.98,89.19],
				markLine : MLnStyle,
			}
		]		
	},
	'QualityByCaptainOffset6':	{
		title : {
			text: '9607A各机长平均好品率(胶印)',
			subtext: '数据来源：质量综合管理系统数据库',
			x:'center',
			textStyle: {color: '#e94128'},
		},
		tooltip : {
			trigger: 'axis',
			axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			},
		},
		toolbox: {
			show : true,
			feature : {
				mark : {show: true},
				dataView : {show: true, readOnly: false}, dataZoom : {show: true},
				magicType: {show: true, type: ['line', 'bar']},
				restore : {show: true},
				saveAsImage : {show: true}
			}
		},
		calculable : true,
		xAxis : [
			{
				name:'平均好品率',
				type : 'value',
				boundaryGap : [0, 0.01],
				scale: true,//自动缩放最大最小值
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value} %',    // Template formatter!               
				},
			}
		],
		yAxis : [
			{
				type : 'category',
				axisTick : {show: false},//隐藏标记线
				data : ['刘勇明','贺梓峻','钱亦轲','范宁','廖其武','杨晓东','王勇成'],
			}
		],
		series : [
			{
				type:'bar',barMaxWidth:80,
				itemStyle: BarStyle7,
				data:[81.9,82.2,83.3,83.58,83.82,84.18,84.27],
				markLine : MLnStyle,
			}
		]		
	},
	
	'QualityByMachine':	{
		title : {
			text: '9602A各设备平均好品率(胶印)',
			subtext: '数据来源：质量综合管理系统数据库',
			x:'center',
			textStyle: {color: '#56a68d'},
		},
		tooltip : {
			trigger: 'axis',
			axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			},
		},
	/*	legend: {
			data:['2011年', '2012年'],
			x:50,
			y:30
		},*/
		toolbox: {
			show : true,
			feature : {
				mark : {show: true},
				dataView : {show: true, readOnly: false}, dataZoom : {show: true},
				magicType: {show: true, type: ['line', 'bar']},
				restore : {show: true},
				saveAsImage : {show: true}
			}
		},
		calculable : true,
		xAxis : [
			{
				name:'平均好品率',
				type : 'value',
				boundaryGap : [0, 0.01],
				scale: true,//自动缩放最大最小值
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value} %',    // Template formatter!               
				},
			}
		],
		yAxis : [
			{
				type : 'category',
				//axisLine : {show: false}, //坐标纵向线
				axisTick : {show: false},//隐藏标记线
				data : ['小森机-1号','小森机-2号','三菱机-1号','小森机-4号','小森机-3号','三菱机-2号'],
			}
		],
		series : [
			{
				type:'bar',barMaxWidth:80,
				itemStyle: BarStyle2,				
				data:[87.52,88.25,88.45,86.93,87.65,89.68],
				markLine : MLnStyle,
			}
		]		
	},
	'QualityByMachine2':	{
		title : {
			text: '9603A各设备平均好品率(胶印)',
			subtext: '数据来源：质量综合管理系统数据库',
			x:'center',
			textStyle: {color: '#93417c'},
		},
		tooltip : {
			trigger: 'axis',
			axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			},
		},
		toolbox: {
			show : true,
			feature : {
				mark : {show: true},
				dataView : {show: true, readOnly: false}, dataZoom : {show: true},
				magicType: {show: true, type: ['line', 'bar']},
				restore : {show: true},
				saveAsImage : {show: true}
			}
		},
		calculable : true,
		xAxis : [
			{
				name:'平均好品率',
				type : 'value',
				boundaryGap : [0, 0.01],
				scale: true,//自动缩放最大最小值
				min : 88.5,
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value} %',    // Template formatter!               
				},
			}
		],
		yAxis : [
			{
				type : 'category',
				//axisLine : {show: false}, //坐标纵向线
				axisTick : {show: false},//隐藏标记线
				data : ['小森机-1号','海德堡-1号','小森机-3号','海德堡-2号'],
			}
		],
		series : [
			{
				type:'bar',barMaxWidth:80,
				itemStyle: BarStyle3,
				data:[89.36,90.39,89.67,90.35],
				markLine : MLnStyle,
			}
		]		
	},
		'QualityByMachine3':	{
		title : {
			text: '9604A各设备平均好品率(胶印)',
			subtext: '数据来源：质量综合管理系统数据库',
			x:'center',
			textStyle: {color: '#56a68d'},
		},
		tooltip : {
			trigger: 'axis',
			axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			},
		},
	/*	legend: {
			data:['2011年', '2012年'],
			x:50,
			y:30
		},*/
		toolbox: {
			show : true,
			feature : {
				mark : {show: true},
				dataView : {show: true, readOnly: false}, dataZoom : {show: true},
				magicType: {show: true, type: ['line', 'bar']},
				restore : {show: true},
				saveAsImage : {show: true}
			}
		},
		calculable : true,
		xAxis : [
			{
				name:'平均好品率',
				type : 'value',
				boundaryGap : [0, 0.01],
				scale: true,//自动缩放最大最小值
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value} %',    // Template formatter!               
				},
			}
		],
		yAxis : [
			{
				type : 'category',
				//axisLine : {show: false}, //坐标纵向线
				axisTick : {show: false},//隐藏标记线
				data : ['J99-2号','J98-2号','J98-1号','J98-3号','J98-4号'],
			}
		],
		series : [
			{
				type:'bar',barMaxWidth:80,
				itemStyle: BarStyle4,				
				data:[83.88,86.24,89.23,90.59,90.71],
				markLine : MLnStyle,
			}
		]		
	},
	'QualityByMachine4':	{
		title : {
			text: '9607A各设备平均好品率(胶印)',
			subtext: '数据来源：质量综合管理系统数据库',
			x:'center',
			textStyle: {color: '#e94128'},
		},
		tooltip : {
			trigger: 'axis',
			axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			},
		},
		toolbox: {
			show : true,
			feature : {
				mark : {show: true},
				dataView : {show: true, readOnly: false}, dataZoom : {show: true},
				magicType: {show: true, type: ['line', 'bar']},
				restore : {show: true},
				saveAsImage : {show: true}
			}
		},
		calculable : true,
		xAxis : [
			{
				name:'平均好品率',
				type : 'value',
				boundaryGap : [0, 0.01],
				scale: true,//自动缩放最大最小值
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value} %',    // Template formatter!               
				},
			}
		],
		yAxis : [
			{
				type : 'category',
				axisTick : {show: false},//隐藏标记线

				data : ['J98-4号','J99-1号','J99-2号','J98-5号','J98-6号'],
			}
		],
		series : [
			{
				type:'bar',barMaxWidth:80,
				itemStyle: BarStyle7,
				data:[81.6,83.47,84.75,85.97,86.52],
				markLine : MLnStyle,
			}
		]		
	},
	'QualityByMachine5':	{
		title : {
			text: '9602A各设备平均好品率(凹印)',
			subtext: '数据来源：质量综合管理系统数据库',
			x:'center',
			textStyle: {color: '#56a68d'},
		},
		tooltip : {
			trigger: 'axis',
			axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			},
		},
	/*	legend: {
			data:['2011年', '2012年'],
			x:50,
			y:30
		},*/
		toolbox: {
			show : true,
			feature : {
				mark : {show: true},
				dataView : {show: true, readOnly: false}, dataZoom : {show: true},
				magicType: {show: true, type: ['line', 'bar']},
				restore : {show: true},
				saveAsImage : {show: true,type:"jpeg"},
			}
		},
		calculable : true,
		xAxis : [
			{
				name:'平均好品率',
				type : 'value',
				boundaryGap : [0, 0.01],
				//scale: true,//自动缩放最大最小值
				min:87,
				max:92,
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value} %',    // Template formatter!               
				},
			}
		],
		yAxis : [
			{
				type : 'category',
				//axisLine : {show: false}, //坐标纵向线
				axisTick : {show: false},//隐藏标记线
				data : ['W92C-11号','W92B-5号','W92-2号','W92-1号','W92C-12号'],
			}
		],
		series : [
			{
				type:'bar',barMaxWidth:80,
				itemStyle: BarStyle2,				
				data:[88.04,88.25,89.42,90.91,91.41],
				markLine : MLnStyle,
			}
		]		
	},
	'QualityByMachine6':	{
		title : {
			text: '9603A各设备平均好品率(凹印)',
			subtext: '数据来源：质量综合管理系统数据库',
			x:'center',
			textStyle: {color: '#93417c'},
		},
		tooltip : {
			trigger: 'axis',
			axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			},
		},
		toolbox: {
			show : true,
			feature : {
				mark : {show: true},
				dataView : {show: true, readOnly: false}, dataZoom : {show: true},
				magicType: {show: true, type: ['line', 'bar']},
				restore : {show: true},
				saveAsImage : {show: true}
			}
		},
		calculable : true,
		xAxis : [
			{
				name:'平均好品率',
				type : 'value',
				boundaryGap : [0, 0.01],
				scale: true,//自动缩放最大最小值
				min:89,
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value} %',    // Template formatter!               
				},
			}
		],
		yAxis : [
			{
				type : 'category',
				//axisLine : {show: false}, //坐标纵向线
				axisTick : {show: false},//隐藏标记线
				data : ['W92A-3号','W92A-4号','W92B-6号','W92B-5号'],
			}
		],
		series : [
			{
				type:'bar',barMaxWidth:80,
				itemStyle: BarStyle3,
				data:[89.79,90.34,89.97,90.17],
				markLine : MLnStyle,
			}
		]		
	},
		'QualityByMachine7':	{
		title : {
			text: '9604A各设备平均好品率(凹印)',
			subtext: '数据来源：质量综合管理系统数据库',
			x:'center',
			textStyle: {color: '#56a68d'},
		},
		tooltip : {
			trigger: 'axis',
			axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			},
		},
	/*	legend: {
			data:['2011年', '2012年'],
			x:50,
			y:30
		},*/
		toolbox: {
			show : true,
			feature : {
				mark : {show: true},
				dataView : {show: true, readOnly: false}, dataZoom : {show: true},
				magicType: {show: true, type: ['line', 'bar']},
				restore : {show: true},
				saveAsImage : {show: true}
			}
		},
		calculable : true,
		xAxis : [
			{
				name:'平均好品率',
				type : 'value',
				boundaryGap : [0, 0.01],
				scale: true,//自动缩放最大最小值
				min:81.5,
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value} %',    // Template formatter!               
				},
			}
		],
		yAxis : [
			{
				type : 'category',
				//axisLine : {show: false}, //坐标纵向线
				axisTick : {show: false},//隐藏标记线
				data : ['W10-1号','SD-2号','SD-1号','W92C-7号','接线凹-4号','W92C-7号','W92C-8号','W92C-10号','W92C-9号','W10-1号'],
			}
		],
		series : [
			{
				type:'bar',barMaxWidth:80,
				itemStyle: BarStyle4,				
				data:[82.3,88.75,89.15,89.27,92.1,86.15,87.71,88.63,89.01,93.95],
				markLine : MLnStyle,
			}
		]		
	},
	'QualityByMachine8':	{
		title : {
			text: '9607A各设备平均好品率(凹印)',
			subtext: '数据来源：质量综合管理系统数据库',
			x:'center',
			textStyle: {color: '#e94128'},
		},
		tooltip : {
			trigger: 'axis',
			axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			},
		},
		toolbox: {
			show : true,
			feature : {
				mark : {show: true},
				dataView : {show: true, readOnly: false}, dataZoom : {show: true},
				magicType: {show: true, type: ['line', 'bar']},
				restore : {show: true},
				saveAsImage : {show: true}
			}
		},
		calculable : true,
		xAxis : [
			{
				name:'平均好品率',
				type : 'value',
				boundaryGap : [0, 0.01],
				scale: true,//自动缩放最大最小值
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value} %',    // Template formatter!               
				},
			}
		],
		yAxis : [
			{
				type : 'category',
				axisTick : {show: false},//隐藏标记线
				data : ['接线凹-3号','接线凹-1号','接线凹-2号','W92C-7号','W92C-12号','接线凹-5号','接线凹-6号','接线凹-3号','W10-1号','接线凹-4号'],
			}
		],
		series : [
			{
				type:'bar',barMaxWidth:80,
				itemStyle: BarStyle7,
				data:[83.54,84.87,85.54,86.55,87.9,84.57,84.69,85,86.46,86.49],
				markLine : MLnStyle,
			}
		]		
	},
	
	//质量详情(这是4个圆，突出各个品种)
	'QualityDetailOneYear' : {
		 legend: {
			x : 'center',
			y : 'bottom',
			data:['9602A','9603A','9604A','9607A']
		},
		title : {
			text: '2014年各品种平均好品率',
			subtext: '数据来源：质量综合管理系统数据库',
			x: 'center'
		},
		toolbox: {
			show : true,
			feature : {
				dataView : {show: true, readOnly: false}, dataZoom : {show: true},
				restore : {show: true},
				saveAsImage : {show: true}
			}
		},
		series : [
			{
				type : 'pie',
				center : ['20%', '50%'],
				radius : radius,
				itemStyle : 
				{
					normal : {
						color: '#ccc',
						label : {
							formatter : function (a){return xround(100-a.value,2) + '%'},
							textStyle: {
								//baseline : 'bottom',
								fontSize: 30,
								fontWeight: 'normal',//'bolder', 不加粗
								color: 'rgb(123,195,119)'          // 主标题文字颜色
							}
						}
					}
				},//labelFromatter,
				data : [
					{name:'other', value:13.31, itemStyle : labelBottom},
					{
						name:'9602A', 
						value:86.69,
						itemStyle : {
							normal : {
								label : {
									show : false,//true,
									position : 'center',
									formatter : '{b}',
									textStyle: {
										fontSize : '20',
										baseline : 'top'
									}
								},
								color:'rgb(123,195,119)',
								labelLine : {
									show : false
								}
							}
						}
					}
				]
			},
			{
				type : 'pie',
				center : ['40%', '50%'],
				radius : radius,
				itemStyle : 
				{
					normal : {
						color: '#ccc',
						label : {
							formatter : function (a){return xround(100-a.value,2) + '%'},
							textStyle: {
								//baseline : 'bottom',
								fontSize: 30,
								fontWeight: 'normal',//'bolder', 不加粗
								color: 'rgb(144,101,171)'          // 主标题文字颜色
							}
						}
					}
				},//labelFromatter,
				data : [
					{name:'other', value:9.89, itemStyle : labelBottom},
					{
						name:'9603A', 
						value:90.11,
						itemStyle : {
							normal : {
								label : {
									show : false,
									position : 'center',
									formatter : '{b}',
									textStyle: {
										fontSize : '20',
										baseline : 'top'
									}
								},
								color: 'rgb(144,101,171)',
								labelLine : {
									show : false
								}
							}
						}
					
					}
				]
			},
			{
				type : 'pie',
				center : ['60%', '50%'],
				radius : radius,
				itemStyle : 
				{
					normal : {
						color: '#ccc',
						label : {
							formatter : function (a){return xround(100-a.value,2) + '%'},
							textStyle: {
								//baseline : 'bottom',
								fontSize: 30,
								fontWeight: 'normal',//'bolder', 不加粗
								color: '#01a99c'          // 主标题文字颜色
							}
						}
					}
				},//labelFromatter,
				data : [
					{name:'other', value:11.96, itemStyle : labelBottom},
					{
						name:'9604A',
						value:88.04,
						itemStyle : {
							normal : {
								label : {
									show : false,
									position : 'center',
									formatter : '{b}',
									textStyle: {
										fontSize : '20',
										baseline : 'top'
									}
								},
								color: '#55c1e8',
								labelLine : {
									show : false
								}
							}
						}
					}
				]
			},
			{
				type : 'pie',
				center : ['80%', '50%'],
				radius : radius,
				itemStyle : 
				{
					normal : {
						color: '#ccc',
						label : {
							formatter : function (a){return xround(100-a.value,2) + '%'},
							textStyle: {
								//baseline : 'bottom',
								fontSize: 30,
								fontWeight: 'normal',//'bolder', 不加粗
								color: '#ec8171',         // 主标题文字颜色
							}
						}
					}
				},//labelFromatter,
				data : [
					{name:'other', value:16.39, itemStyle : labelBottom},
					{
						name:'9607A', 
						value:83.61,
						itemStyle : {
							normal : {
								label : {
									show : false,//true,
									position : 'center',
									formatter : '{b}',
									textStyle: {
										fontSize : '10',
										baseline : 'top',
									}
								},
								color: '#ec8171',
								labelLine : {
									show : false
								}
							}
						}
					}
				]
			}
		]
    },
	
	QualityDetail : {		
		 legend: {
			x : 140,
			y : 40,
			data:['2013年','2014年']
		},
		title : {
			text: '2013-2014年各品种平均好品率',
			subtext: '数据来源：质量综合管理系统数据库',
			x: 'center'
		},
        tooltip : {
            trigger: 'item'
        },

        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        xAxis : [
            {
				name:'品种',
                type : 'category',
                boundaryGap : true,
                data : ['9602A','9603A','9604A','9607A'],
				axisTick : {show: false},//隐藏标记线,
			}
        ],
        yAxis : [
            {
				name:'平均好品率',
                type : 'value',
				position: 'left',
				//min:84,
				//max:89,
				scale: true,
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value} %',    // Template formatter!               
				},
            }
        ],
        series : [
            {
                name:'2013年',
                type:'bar',barMaxWidth:80,
                smooth:true,
                itemStyle:BarStyleTGreen,
                data:[90.46,89.61,89.06,87.72],
				markPoint : MPtStyle,
				markLine : MLnStyle,
			},            
            {
                name:'2014年',
                type:'bar',barMaxWidth:80,
                smooth:true,
                itemStyle:BarStyleTBlue,
                data:[86.69,90.11,88.04,83.61],
				markPoint : MPtStyle,
				markLine : MLnStyle,
			},
			{
				name:'统计万数',
				type:'pie',
				tooltip : {
					trigger: 'item',
					formatter: '{a} <br/>{b} : {c} ({d}%)'
				},
				center: ['83%','25%'],
				radius : [0, 50],
				itemStyle :　{
					normal : {
						label : {
							show :false,
						},
						labelLine : {
							show : false,
							length : 10
						},
					},
				},
				data:[
					{value:25295, name:'2014年'},
					{value:18459, name:'2013年'},
				]
			}
        ]
    },
	
	'ProductDetail' : {
		//backgroundColor: 'rgb(214,216,217)',
		title : {
                text: '2013-2014核查工艺产量分布对比',
                subtext: '数据来源：机台作业系统\n左侧：2013年分布；右侧：2014年分布',
				x:'center',
            },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c}万 ({d}%)"
        },
        legend: {
            orient : 'vertical',
            x : 'center',
			y : '20%',
			//data:['小张核查','码后核查','全检品','其它']
			data:['9602A','9603A','9604A','9607A']
        },
        toolbox: {
            show : true,
            feature : {
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,		
        series : [
			 {
				name:'2013年',
                type:'pie',
				selectedMode:'single',
				startAngle: 90,
				center : ['25%', 250],
                radius : ['10%', '35%'],
				innerRing: false,
				outterRing: false,
                data:[                    
                    {value:18435, name:'小张核查'},
                    {value:9667, name:'码后核查'},
					{value:3287, name:'全检品'},
					//{value:1926, name:'其它'},
					/*
						data:[{value:5, name:'其它'},{value:1856, name:'全好品'},{value:66, name:'补票'},]
					*/
                ],
				itemStyle : {
					normal: {
						borderColor: 'rgba(0,0,0,0)',
						borderWidth: 1,
						label: {
							show :true,
							position: 'inner',
							formatter: "{b}\n({d}%)",
							textStyle: {fontSize:12},
						},
						labelLine: {
							show: false,
							length: 20,
							lineStyle: {
								width: 1,
								type: 'solid'
							}
						}
					},
					emphasis : {
						label : {
							show : true,
							position : 'center',
							formatter: '{c}'+'万',
							textStyle : {
								fontSize : '15',
								fontWeight : 'bold'
							}
						}
					}
				},
            },
            {
				name:'2014年',
                type:'pie',
				selectedMode:'single',
				startAngle: 90,
				center : ['75%', 250],
                radius : ['10%', '35%'],
				innerRing: false,
				outterRing: false,
                data:[                    
                    {value:10189, name:'小张核查'},
                    {value:16658, name:'码后核查'},
					{value:4118, name:'全检品'},
					//{value:117, name:'其它'},
                ],
				itemStyle : {
					 normal: {
						borderColor: 'rgba(0,0,0,0)',
						borderWidth: 1,
						label: {
							show :true,
							position: 'inner',
							formatter: "{b}\n({d}%)",
							textStyle: {fontSize:12},
						},
						labelLine: {
							show: false,
							length: 20,
							lineStyle: {
								width: 1,
								type: 'solid'
							}
						}
					},
					emphasis : {
						label : {
							show : true,
							position : 'center',
							formatter: '{c}'+'万',
							textStyle : {
								fontSize : '15',
								fontWeight : 'bold'
							}
						}
					}
				},
            },
			{
				name:'2014年',
                type:'pie',
				selectedMode:'single',
				startAngle: 90,
				center : ['75%', 250],
                radius : ['35%', '70%'],
				innerRing: false,
				outterRing: false,
                data:[                    
                    {value:1883, name:'9602A'},
					{value:4284, name:'9603A'},
					{value:1539, name:'9604A'},
					{value:2483, name:'9607A'},
                    {value:8457, name:'9602A'},
					//{value:0, name:'9603A'},
					{value:7570, name:'9604A'},
					{value:631, name:'9607A'},
					{value:130, name:'9602A'},
					{value:482, name:'9603A'},
					{value:206, name:'9604A'},
					{value:3290, name:'9607A'},
					//{value:117, name:'其它'},
                ],
				itemStyle : {
					 normal: {
						borderColor: 'rgba(0,0,0,0)',
						borderWidth: 1,
						label: {
							show :true,
							position: 'outter',
							//formatter: "{b}:{d}%",
							formatter: "{d}%",
							textStyle: {fontSize:12},
						},
						labelLine: {
							show: true,
							length: 10,
							lineStyle: {
								width: 1,
								type: 'solid'
							}
						},	
						color: function(params) {
							// build a color map as your need.
							var colorList = [
							  'rgb(123,195,119)','rgb(144,101,171)','#6189ac','#ec8171'
							];
							return colorList[params.dataIndex]
						},
					},
					emphasis : {
						label : {
							show : true,
							position : 'center',
							formatter: '{c}'+'万',
							textStyle : {
								fontSize : '15',
								fontWeight : 'bold'
							}
						}
					}
				},
            },
			{
				name:'2013年',
                type:'pie',
				selectedMode:'single',
				startAngle: 90,
				center : ['25%', 250],
                radius : ['35%', '70%'],
				innerRing: false,
				outterRing: false,
                data:[                    
                    {value:2120, name:'9602A'},
					{value:6732, name:'9603A'},
					{value:2697, name:'9604A'},
					{value:6886, name:'9607A'},
                    {value:4408, name:'9602A'},
					//{value:0, name:'9603A'},
					{value:5259, name:'9604A'},
					//{value:631, name:'9607A'},
					{value:167, name:'9602A'},
					{value:307, name:'9603A'},
					{value:513, name:'9604A'},
					{value:2300, name:'9607A'},
					//{value:117, name:'其它'},
                ],
				itemStyle : {
					 normal: {
						borderColor: 'rgba(0,0,0,0)',
						borderWidth: 1,
						label: {
							show :true,
							position: 'outter',
							//formatter: "{b}:{d}%",
							formatter: "{d}%",
							textStyle: {fontSize:12},
						},
						labelLine: {
							show: true,
							length: 10,
							lineStyle: {
								width: 1,
								type: 'solid'
							}
						},	
						color: function(params) {
							// build a color map as your need.
							var colorList = [
							  'rgb(123,195,119)','rgb(144,101,171)','#6189ac','#ec8171'
							];
							return colorList[params.dataIndex]
						},
					},
					emphasis : {
						label : {
							show : true,
							position : 'center',
							formatter: '{c}'+'万',
							textStyle : {
								fontSize : '15',
								fontWeight : 'bold'
							}
						}
					}
				},
            }
			/*{
                name:'其它',
                type:'pie',
				startAngle: 180,
				center : ['75%', 250],
                radius : ['20%', '50%'],
				itemStyle : {
					normal : {
						label : {
							show :true,
						},
						labelLine : {
							show : true
						}
					},
					emphasis : {
						label : {
							show : true,
							position : 'center',
							formatter: "{c}万",
							textStyle : {
								fontSize : '20',
								fontWeight : 'bold'
							}
						}
					}
				},
                data:[
                    {value:5, name:'其它'},
                    {value:55, name:'全好品'},
                    {value:57, name:'补票'},

                ]
            }*/
			
        ]
    },	
	
	'QualitySection' : {
		title : {
                text: '各好品率区间分布',
                subtext: '数据来源：质量综合管理系统数据库',
				x:'center',
            },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c}万 ({d}%)"
        },
        legend: {
            orient : 'vertical',
            x : 'left',
            data:['0%','10%','20%','30%','40%','50%','60%','70%以下','70%','80%','90%']
        },
        toolbox: {
            show : true,
            feature : {
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
				magicType: {
					show: true,
					type : ['pie'],
					option: {
						funnel: {
							x: '25%',
							width: '50%',
							funnelAlign: 'right',
							max: 3000
						}
					}
				},
                restore : {show: true},
                saveAsImage : {show: true},				
            }
        },
        calculable : true,
        series : [
            {
                name:'白班',
				selectedMode:'single',
                type:'pie',
				selectedMode:'single',
				startAngle: 180,
				center : ['35%', 250],
                radius : ['30%', '70%'],
                data:[
                   /* {value:9, name:'0%'},
                    {value:12, name:'10%'},
                    {value:28, name:'20%'},
                    {value:51, name:'30%'},
                    {value:131, name:'40%'},
                    {value:343, name:'50%'},*/
                    {value:1480, name:'70%以下'},
					{value:2586, name:'70%'},
					{value:8732, name:'80%'},
					{value:12497, name:'90%'}
                ],
				 itemStyle : {					
					emphasis : {
						label : {
							show : true,
							formatter: "{d}%",
							position : 'center',
							textStyle : {
								fontSize : '30',
								fontWeight : 'bold'
							}
						}
					}
				},
            },
			{
                name:'70%以下',
                type:'pie',
				startAngle: 180,
				center : ['75%', 250],
                radius : ['20%', '50%'],
                data:[
                    {value:9, name:'0%'},
                    {value:12, name:'10%'},
                    {value:28, name:'20%'},
                    {value:51, name:'30%'},
                    {value:131, name:'40%'},
                    {value:343, name:'50%'},
                    {value:906, name:'60%'},
                ],
				itemStyle : {					
					emphasis : {
						label : {
							show : true,
							formatter: "{d}%",
							position : 'center',
							textStyle : {
								fontSize : '20',
								fontWeight : 'bold'
							}
						}
					}
				},
            }
        ]
    },
	SectionAndQuality : {		
		title : {
                text: '各好品率区间对整体的影响情况',
                subtext: '数据来源：质量综合管理系统数据库',
				x:'center',
            },
        tooltip : {
            trigger: 'item'
        },
		legend:{
			data:['平均好品率','影响比例'],
			//orient : 'vertical',
            x : 'center',
			y:'70',
			show:false
		},
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        xAxis : [
            {
				name:'好品率区间',
				axisTick : {show: false},//隐藏标记线,
                type : 'category',
                boundaryGap : true,
                data:['全部','50%','60%','70%','80%','90%']
			}
        ],
        yAxis : [
            {
				name:'平均好品率',
                type : 'value',
				position: 'left',
				min:85,
				//max:89,
				scale: true,

				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value} %',    // Template formatter!               
				},
            }
        ],
        series : [
			/*{
                type:'line',
                smooth:true,
				//itemStyle :LineStyleBlue,
				itemStyle:{normal: {label: { show: false }}},
                data:[87.19,87.64,88.09,88.94,90.53,93.69],
			},*/
			{
				name:'平均好品率',
				stack:'总量',
                type:'bar',barMaxWidth:80,
                smooth:true,
                //itemStyle : BarStyleTGreen,
				
               // data:[87.19,87.64,88.09,88.94,90.53,93.69],
			    data:[87.19,87.19,87.19,87.19,87.19,87.19],
				markPoint : MPtStyle,
				markLine : MLnStyle,
			},
			{
				name:'影响比例',
				stack:'总量',
                type:'bar',barMaxWidth:80,
                smooth:true,
				//yAxisIndex:1,
				itemStyle : {
					normal:{
						label : {
							show: true,
							position: 'top',
							formatter: '{c}%'
						}
					}
				},
                //itemStyle : BarStyleTGreen,
                data:[0,0.45,0.9,1.75,3.34,6.5],
				markPoint : MPtStyle,
				markLine : MLnStyle,
			}, 
        ]
    },
	
	'QualityByTeam2':	{
		title : {
			text: '凹印各班组好品率比较',
			subtext: '数据来源：质量综合管理系统数据库',
			x:'center',
			y:-2,
			textStyle: {color: '#8b6b78'},
		},
		tooltip : {
			trigger: 'axis',
			axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			},
			formatter: function(a){ 
				 res = '</br>机台:'+a[0][1]+ '</br>好品率: '; 
				 //console.log(a.length);
				 var i;
				if(a[0][2]<0)
					{i = -a[0][2]+80;}
				else
					{i = a[0][2]+80;}
				res += ','+xround(i,2) +'% ('+a[0][0]+')';
				if(a.length>1)//如果选择两个序列则增加一个
				{
					i = a[1][2]+80;
				    res +=','+ xround(i,2) +'% ('+a[1][0]+')';
				}				 
				return res; 
			}
		},
		legend: {
			data:['凹印二班', '凹印四班'],
			x:'39%',
			y:45,
			itemGap : 100,
			
		},
		toolbox: {
			show : true,
			feature : {
				mark : {show: true},
				dataView : {show: true, readOnly: false}, dataZoom : {show: true},
				magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
				restore : {show: true},
				saveAsImage : {show: true,type:"jpeg"},
			}
		},
		calculable : true,
		 xAxis : [
			{
				name:'平均好品率',
				type : 'value',
				//boundaryGap : [0, 0.01],
				//scale: true,//自动缩放最大最小值
				//min:-12,
				//max:12,
				//splitNumber:6,//将Y轴分为8段
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter : function (a){
						var i=parseInt(a);
						if(i<0){i=-i};
						if(i===0)
							return i;
						else
							return 80+i+ '%';	
					},//X轴格式
				},
			}
		],
		yAxis : [
			{
				type : 'category',
				//name:'机型',
				axisTick : {show: false},
				data : ['W92C-10号','SD-1号','W92C-9号','SD-2号','W92C-8号','W92C-7号','接线凹-4号','接线凹-1号','接线凹-6号','接线凹-5号','接线凹-2号','接线凹-3号'],
			}
		],
		series : [
			{
				name:'凹印二班',
				type:'bar',barMaxWidth:80,
				stack: '总量',
				itemStyle: TwoBarLeft,
				//88.8,88.02,88.82,87.03,87.22,88.17,84.06,82.87,82.47,85.84,83.33,83.53,
				data:[-8.82,-8.8,-8.17,-8.02,-7.22,-7.03,-5.84,-4.06,-3.53,-3.33,-2.87,-2.47],
				markLine : {
					data : [
						{	
							type : 'average',
							name: '平均值',
							symbol:'pin',//'circle' | 'rectangle' | 'triangle' | 'diamond' |'emptyCircle' | 'emptyRectangle' | 'emptyTriangle' | 'emptyDiamond' 
							 effect : {
								show: true,
								period: 10,//越大越慢
								//shadowColor: '#77e3ff',
								shadowColor: '#FFF',
								shadowBlur: 10
							},
							itemStyle : {normal: {borderWidth:1,label:{show:false}}},
						}
					]
					/*data : [
						[
							{name: '平均值', value: 85.85, x: '28.7%', y: '88%'}, 
							{name: '', x: '28.7%', y: 50}
						],
					]*/
				},
			},
			{
				name:'凹印四班',
				type:'bar',barMaxWidth:80,
				stack: '总量',
			   // barWidth : 5,
				itemStyle: TwoBarRight,
				data:[8.59,8.29,8.49,8.28,7.79,7.41,6.44,4.45,2.67,3.13,3.33,2.26],
				markLine : {
					data : [
						{	
							type : 'average',
							name: '平均值',
							symbol:'pin',//'circle' | 'rectangle' | 'triangle' | 'diamond' |'emptyCircle' | 'emptyRectangle' | 'emptyTriangle' | 'emptyDiamond' 
							 effect : {
								show: true,
								period: 10,//越大越慢
								//shadowColor: '#77e3ff',
								shadowColor: '#FFF',
								shadowBlur: 10
							},
							itemStyle : {normal: {borderWidth:1,label:{show:false}}},
						}
					]
					/*data : [
						[
							{name: '平均值', value: 85.93, x: '71%', y: '88%'}, 
							{name: '', x: '71%', y: 50}
						],
					]*/
				},
			}			
		]
	},
	'QualityByTeam':	{
		title : {
			text: '凹印各班组好品率比较',
			subtext: '数据来源：质量综合管理系统数据库',
			x:'center',
			y:-2,
			textStyle: {color: '#8b6b78'},
		},
		tooltip : {
			trigger: 'axis',
			axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			},
			formatter: function(a){ 
				 res = '</br>机台:'+a[0][1]+ '</br>好品率: '; 
				 //console.log(a.length);
				 var i;
				if(a[0][2]<0)
					{i = -a[0][2]+80;}
				else
					{i = a[0][2]+80;}
				res += ','+xround(i,2) +'% ('+a[0][0]+')';
				if(a.length>1)//如果选择两个序列则增加一个
				{
					i = a[1][2]+80;
				    res +=','+ xround(i,2) +'% ('+a[1][0]+')';
				}				 
				return res; 
			}
		},
		legend: {
			data:['凹印一班', '凹印三班'],
			x:'39%',
			y:45,
			itemGap : 100,
			
		},
		toolbox: {
			show : true,
			feature : {
				mark : {show: true},
				dataView : {show: true, readOnly: false}, dataZoom : {show: true},
				magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
				restore : {show: true},
				saveAsImage : {show: true,type:"jpeg"},
			}
		},
		calculable : true,
		 xAxis : [
			{
				name:'平均好品率',
				type : 'value',
				//boundaryGap : [0, 0.01],
				//scale: true,//自动缩放最大最小值
				//min:-12,
				//max:12,
				//splitNumber:6,//将Y轴分为8段
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter : function (a){
						var i=parseInt(a);
						if(i<0){i=-i};
						if(i===0)
						{
							return i;
						}
						else
						{
							return 80+i + '%';
						}	
					
					},//X轴格式
				},
			}
		],
		yAxis : [
			{
				type : 'category',
				//name:'机型',
				axisTick : {show: false},
				data : ['W92A-4号','W92A-3号','W92B-6号','W92B-5号','W92-1号','W92C-12号','W10-1号','W92-2号','W92C-11号'],
			}
		],
		series : [
			{
				name:'凹印一班',
				type:'bar',barMaxWidth:80,
				stack: '总量',
				itemStyle: TwoBarLeft,
				data:[-10.27,-9.81,-9.7,-9.52,-8.51,-7.94,-7.53,-6.66,-3.89],
				markLine : {
					data : [
						{	
							type : 'average',
							name: '平均值',
							symbol:'pin',//'circle' | 'rectangle' | 'triangle' | 'diamond' |'emptyCircle' | 'emptyRectangle' | 'emptyTriangle' | 'emptyDiamond' 
							 effect : {
								show: true,
								period: 10,//越大越慢
								//shadowColor: '#77e3ff',
								shadowColor: '#FFF',
								shadowBlur: 10
							},
							itemStyle : {normal: {borderWidth:1,label:{show:false}}},
						}
					]
					/*data : [
						[
							{name: '平均值', value: 88.20, x: '20%', y: '88%'}, 
							{name: '', x: '20%', y: 50}
						],
					]*/
				},
			},
			{
				name:'凹印三班',
				type:'bar',barMaxWidth:80,
				stack: '总量',
			   // barWidth : 5,
				itemStyle: TwoBarRight,
				data:[10.4,10.24,9.76,8.83,8.61,7.31,6.93,5.43,4.25],
				markLine : {
					data : [
						{	
							type : 'average',
							name: '平均值',
							symbol:'pin',//'circle' | 'rectangle' | 'triangle' | 'diamond' |'emptyCircle' | 'emptyRectangle' | 'emptyTriangle' | 'emptyDiamond' 
							 effect : {
								show: true,
								period: 10,//越大越慢
								//shadowColor: '#77e3ff',
								shadowColor: '#FFF',
								shadowBlur: 10
							},
							itemStyle : {normal: {borderWidth:1,label:{show:false}}},
						}
					]
					/*data : [
						[
							{name: '平均值', value: 87.97, x: '79%', y: '88%'}, 
							{name: '', x: '79%', y: 50}
						],
					]*/
				},
			}			
		]
	},
	'QualityByTeam3':	{
		title : {
			text: '胶印各班组好品率比较',
			subtext: '数据来源：质量综合管理系统数据库',
			x:'center',
			y:-2,
			textStyle: {color: '#8b6b78'},
		},
		tooltip : {
			trigger: 'axis',
			axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			},
			formatter: function(a){ 
				 res = '</br>机台:'+a[0][1]+ '</br>好品率: '; 
				 //console.log(a.length);
				 var i;
				if(a[0][2]<0)
					{i = -a[0][2]+80;}
				else
					{i = a[0][2]+80;}
				res += ','+xround(i,2) +'% ('+a[0][0]+')';
				if(a.length>1)//如果选择两个序列则增加一个
				{
					i = a[1][2]+80;
				    res +=','+ xround(i,2) +'% ('+a[1][0]+')';
				}				 
				return res; 
			}
		},
		legend: {
			data:['干胶印一班', '干胶印二班'],
			x:'39%',
			y:45,
			itemGap : 100,
			
		},
		toolbox: {
			show : true,
			feature : {
				mark : {show: true},
				dataView : {show: true, readOnly: false}, dataZoom : {show: true},
				magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
				restore : {show: true},
				saveAsImage : {show: true,type:"jpeg"},
			}
		},
		calculable : true,
		 xAxis : [
			{
				name:'平均好品率',
				type : 'value',
				//boundaryGap : [0, 0.01],
				//scale: true,//自动缩放最大最小值
				//min:-12,
				//max:12,
				//splitNumber:6,//将Y轴分为8段
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter : function (a){
						var i=parseInt(a);
						if(i<0){i=-i};
						if(i===0)
							{return i}
						else
							{return 80+i + '%'};						
					
					},//X轴格式
				},
			}
		],
		yAxis : [
			{
				type : 'category',
				//name:'机型',
				axisTick : {show: false},
				data : ['J99-1号','J99-2号','J98-6号','J98-5号','J98-4号','J98-2号','J98-1号','J98-3号'],
			}
		],
		series : [
			{
				name:'干胶印一班',
				type:'bar',barMaxWidth:80,
				stack: '总量',
				itemStyle: TwoBarLeft,
				data:[-1.89,-3.61,-3.82,-4.63,-7.37,-7.39,-8.19,-8.43],
				markLine : {
					data : [
						{	
							type : 'average',
							name: '平均值',
							symbol:'pin',//'circle' | 'rectangle' | 'triangle' | 'diamond' |'emptyCircle' | 'emptyRectangle' | 'emptyTriangle' | 'emptyDiamond' 
							 effect : {
								show: true,
								period: 10,//越大越慢
								//shadowColor: '#77e3ff',
								shadowColor: '#FFF',
								shadowBlur: 10
							},
							itemStyle : {normal: {borderWidth:1,label:{show:false}}},
						}
					]/*
					data : [
						[
							{name: '平均值', value: 85.67, x: '30%', y: '88%'}, 
							{name: '', x: '30%', y: 50}
						],
					]*/
				},
			},
			{
				name:'干胶印二班',
				type:'bar',barMaxWidth:80,
				stack: '总量',
			   // barWidth : 5,
				itemStyle: TwoBarRight,
				data:[1.73,3.73,2.8,4.27,6.99,8.22,8.36,9.17],
				markLine : {
					data : [
						{	
							type : 'average',
							name: '平均值',
							symbol:'pin',//'circle' | 'rectangle' | 'triangle' | 'diamond' |'emptyCircle' | 'emptyRectangle' | 'emptyTriangle' | 'emptyDiamond' 
							 effect : {
								show: true,
								period: 10,//越大越慢
								//shadowColor: '#77e3ff',
								shadowColor: '#FFF',
								shadowBlur: 10
							},
							itemStyle : {normal: {borderWidth:1,label:{show:false}}},
						}
					]
					/*data : [
						[
							{name: '平均值', value: 85.66, x: '72%', y: '88%'}, 
							{name: '', x: '72%', y: 50}
						],
					]*/
				},
			}			
		]
	},
	'QualityByTeam5':	{
		title : {
			text: '胶印各班组好品率比较',
			subtext: '数据来源：质量综合管理系统数据库',
			x:'center',
			y:-2,
			textStyle: {color: '#8b6b78'},
		},
		tooltip : {
			trigger: 'axis',
			axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			},
			formatter: function(a){ 
				 res = '</br>机台:'+a[1][1]+ '</br>好品率: '; 
				 var i = a[1][2];
				 if(i<0){i=-i};
				 i+=80;
				 res += xround(i,2) +'% ('+a[1][0]+')';	
				 i = a[0][2]+80;
				  res += ','+xround(i,2) +'% ('+a[0][0]+')';
				return res; 
			}
		},
		legend: {
			data:['水胶印一班', '水胶印二班'],
			x:'39%',
			y:45,
			itemGap : 100,
			
		},
		toolbox: {
			show : true,
			feature : {
				mark : {show: true},
				dataView : {show: true, readOnly: false}, dataZoom : {show: true},
				magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
				restore : {show: true},
				saveAsImage : {show: true,type:"jpeg"},
			}
		},
		calculable : true,
		 xAxis : [
			{
				name:'平均好品率',
				type : 'value',
				//boundaryGap : [0, 0.01],
				//scale: true,//自动缩放最大最小值
				min:-12,
				max:12,
				splitNumber:6,//将Y轴分为8段
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter : function (a){
						var i=parseInt(a);
						if(i<0){i=-i};
						if(i===0)
							{return i}
						else
							{return 80+i + '%'};						
					
					},//X轴格式
				},
			}
		],
		yAxis : [
			{
				type : 'category',
				//name:'机型',
				axisTick : {show: false},
				data : ['海德堡-2号','海德堡-1号','小森机-1号','小森机-3号','三菱机-2号','小森机-2号','三菱机-1号','小森机-4号'],
			}
		],
		series : [
			{
				name:'水胶印一班',
				type:'bar',barMaxWidth:80,
				stack: '总量',
				itemStyle: TwoBarLeft,
				data:[-10.31,-10.56,-7.75,-7.7,-6.21,-6.14,-5.13,-4.97],
				markLine : {
					/*data : [
						{	
							type : 'average',
							name: '平均值',
							symbol:'pin',//'circle' | 'rectangle' | 'triangle' | 'diamond' |'emptyCircle' | 'emptyRectangle' | 'emptyTriangle' | 'emptyDiamond' 
							 effect : {
								show: true,
								period: 10,//越大越慢
								//shadowColor: '#77e3ff',
								shadowColor: '#FFF',
								shadowBlur: 10
							},
							itemStyle : {
								normal: {
									borderWidth:1,
								}
							},
						}
					]*/
					data : [
						[
							{name: '平均值', value: 87.35, x: '23%', y: '88%'}, 
							{name: '', x: '23%', y: 50}
						],
					]
				},
			},
			{
				name:'水胶印二班',
				type:'bar',barMaxWidth:80,
				stack: '总量',
			   // barWidth : 5,
				itemStyle: TwoBarRight,
				data:[10.38,10.2,8.43,8.33,6.39,5.74,5.32,4.85],
				markLine : {
					/*data : [
						{	
							type : 'average',
							name: '平均值',
							symbol:'pin',//'circle' | 'rectangle' | 'triangle' | 'diamond' |'emptyCircle' | 'emptyRectangle' | 'emptyTriangle' | 'emptyDiamond' 
							 effect : {
								show: true,
								period: 10,//越大越慢
								//shadowColor: '#77e3ff',
								shadowColor: '#FFF',
								shadowBlur: 10
							},
							itemStyle : {normal: {borderWidth:1,}},
						}
					]*/
					data : [
						[
							{name: '平均值', value: 87.46, x: '77%', y: '88%'}, 
							{name: '', x: '77%', y: 50}
						],
					]
				},
			}			
		]
	},
	'QualityByTeam4':	{
		title : {
			text: '胶印各班组好品率比较',
			subtext: '数据来源：质量综合管理系统数据库',
			x:'center',
			y:-2,
			textStyle: {color: '#8b6b78'},
		},
		tooltip : {
			trigger: 'axis',
			axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			},
			formatter: function(a){ 
				 res = '</br>机台:'+a[0][1]+ '</br>好品率: '; 
				 //console.log(a.length);
				 var i;
				if(a[0][2]<0)
					{i = -a[0][2]+80;}
				else
					{i = a[0][2]+80;}
				res += ','+xround(i,2) +'% ('+a[0][0]+')';
				if(a.length>1)//如果选择两个序列则增加一个
				{
					i = a[1][2]+80;
				    res +=','+ xround(i,2) +'% ('+a[1][0]+')';
				}				 
				return res; 
			}
		},
		legend: {
			data:['水胶印一班', '水胶印二班'],
			x:'39%',
			y:45,
			itemGap : 100,
			
		},
		toolbox: {
			show : true,
			feature : {
				mark : {show: true},
				dataView : {show: true, readOnly: false}, dataZoom : {show: true},
				magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
				restore : {show: true},
				saveAsImage : {show: true,type:"jpeg"},
			}
		},
		calculable : true,
		 xAxis : [
			{
				name:'平均好品率',
				type : 'value',
				//boundaryGap : [0, 0.01],
				//scale: true,//自动缩放最大最小值
				//splitNumber:6,//将Y轴分为8段
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter : function (a){
						var i=parseInt(a);
						if(i<0){i=-i};
						if(i===0)
							{return i}
						else
							{return 80+i + '%'};						
					
					},//X轴格式
				},
			}
		],
		yAxis : [
			{
				type : 'category',
				//name:'机型',
				axisTick : {show: false},
				data : ['海德堡-2号','海德堡-1号','小森机-1号','小森机-3号','三菱机-2号','小森机-2号','三菱机-1号','小森机-4号'],
			}
		],
		series : [
			{
				name:'水胶印一班',
				type:'bar',barMaxWidth:80,
				stack: '总量',
				itemStyle: TwoBarLeft,
				data:[-10.31,-10.56,-7.75,-7.7,-6.21,-6.14,-5.13,-4.97],
				markLine : {
					data : [
						{	
							type : 'average',
							name: '平均值',
							symbol:'pin',//'circle' | 'rectangle' | 'triangle' | 'diamond' |'emptyCircle' | 'emptyRectangle' | 'emptyTriangle' | 'emptyDiamond' 
							 effect : {
								show: true,
								period: 10,//越大越慢
								//shadowColor: '#77e3ff',
								shadowColor: '#FFF',
								shadowBlur: 10
							},
							itemStyle : {normal: {borderWidth:1,label:{show:false}}},
						}
					]
				},
			},
			{
				name:'水胶印二班',
				type:'bar',barMaxWidth:80,
				stack: '总量',
			   // barWidth : 5,
				itemStyle: TwoBarRight,
				data:[10.38,10.2,8.43,8.33,6.39,5.74,5.32,4.85],
				markLine : {
					data : [
						{	
							type : 'average',
							name: '平均值',
							symbol:'pin',//'circle' | 'rectangle' | 'triangle' | 'diamond' |'emptyCircle' | 'emptyRectangle' | 'emptyTriangle' | 'emptyDiamond' 
							 effect : {
								show: true,
								period: 10,//越大越慢
								//shadowColor: '#77e3ff',
								shadowColor: '#FFF',
								shadowBlur: 10
							},
							itemStyle : {normal: {borderWidth:1,label:{show:false}}},
						}
					]
				},
			}			
		]
	},
	RealFake : {		
		title : {
                text: '胶凹各机型平均实废开数',
                subtext: '数据来源：质量综合管理系统数据库',
				x:'center',
            },
        tooltip : {
            trigger: 'item'
        },
		grid:{
			x:10,
			x2:45,
			y:0,
			//y2:75
		},
		legend: {
			//orient : 'vertical',
			x : 'center',
			y : 60,
			data:['实废开数','拆包量'],
			selected:{
				'拆包量':false
			}
		},
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
		dataZoom : {
            show : true,
            realtime: true,
            start : 0,
            end :43,
			//height:20,
        },
        calculable : true,
        xAxis : [
            {
				name:'机型',
				axisTick : {show: false},//隐藏标记线,
                type : 'category',
                boundaryGap : true,
                data:['J98-1号','J98-2号','J98-3号','J98-4号','J98-5号','J98-6号','J99-1号','J99-2号','海德堡-1号','海德堡-2号','三菱机-1号','三菱机-2号','小森机-1号','小森机-2号','小森机-3号','小森机-4号','SD-1号','SD-2号','W10-1号','W92-1号','W92-2号','W92A-3号','W92A-4号','W92B-5号','W92B-6号','W92C-10号','W92C-11号','W92C-12号','W92C-7号','W92C-8号','W92C-9号','接线凹-1号','接线凹-2号','接线凹-3号','接线凹-4号','接线凹-5号','接线凹-6号'],
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: 45,
					//margin: 2          
				}
			}
        ],
        yAxis : [
            {
				name:'实废开数',
                type : 'value',
				position: 'left',
				//min:84,
				//max:89,
				scale: true,
				axisLine: {show:false},
				axisLabel : {
					show:false,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value} %',    // Template formatter!               
				},
            }
        ],
        series : [
			  {
				name:'实废开数',
                type:'bar',barMaxWidth:80,
                smooth:true,
                itemStyle : {
					normal:{
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},	
						label : {
							show: true,
							position: 'insideTop',
							formatter: function(c){
								return xround(c.data,1)
							}//'{c}'
						}
					}},
                data:[114.4,102.9,90.4,88.3,196,266.2,219.5,114.4,103.9,99.1,103.6,127.8,94.9,122.4,96.7,109.8,104,99.9,96.8,111.3,93,106.8,101.5,97.9,102.3,94.5,99,139.1,171.9,92.6,117.9,197.7,177.8,260.2,159.4,163.1,192.4],
				markPoint : MPtStyleBoth,
				markLine : MLnStyle,
			},
			{
				name:'拆包量',
                type:'bar',barMaxWidth:80,
                smooth:true,
                itemStyle : {
					normal:{
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},						
						label : {
							show: true,
							position: 'insideTop',
							formatter: function(c){
								return xround(c.data,1)
							}//'{c}'
						}
					}},
                data:[40.2,40.5,32.9,32.8,50.3,61.5,53.9,43.4,32.4,31.7,36.1,34.3,35.7,35.8,34.7,35.7,36.8,38.4,39.9,36.9,34.1,30.9,32.7,30.4,31.7,35.4,33.6,35.5,45.2,36.9,43,50.9,49.8,59.8,44.3,47.7,50.8,],
				markPoint : MPtStyleBoth,
				markLine : MLnStyle,
			}			
        ]
    },
	RealFake2 : {		
		title : {
                text: '胶印各机长平均实废开数',
                subtext: '数据来源：质量综合管理系统数据库\n(峰值数据从左至右分别代表02A/03A/04A/07A)',
				x:'center',
            },
        tooltip : {
            trigger: 'item'
        },
		grid:{
			x:10,
			x2:45,
			y:0,
			//y2:75
		},
		legend: {
			//orient : 'vertical',
			x : 'center',
			y : 70,
			data:['实废开数','拆包量'],
			selected:{
				'拆包量':false
			}
		},
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
		dataZoom : {
            show : true,
            realtime: true,
            start : 0,
            end :20,
			//height:20,
        },
        calculable : true,
        xAxis : [
            {
				name:'机长',
				axisTick : {show: false},//隐藏标记线,
                type : 'category',
                boundaryGap : true,
                data:['王崇润','李建华','唐军','许嘉','张立力','邓忠华','查安余','王渝波','李晓军','陈小强','温涛','李胜利','刘强','吴强','吴明森','刘文华','李启路','李胜利','吴强','刘强','李启路','温涛','李晓军','许嘉','刘文华','刘勇明','杨略','邓波','陈兵','黄玉勇','范宁','廖其武','严强','杨晓东','周武华','钱亦轲','张志军','严磊','贺梓峻','张松林','廖其武','范宁','陈兵','严磊','王勇成','刘勇明','杨晓东','贺梓峻','钱亦轲','严强'],
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: 45,
					//margin: 2          
				}
			}
        ],
        yAxis : [
            {
				name:'实废开数',
                type : 'value',
				position: 'left',
				//min:84,
				//max:89,
				scale: true,
				axisLine: {show:false},
				axisLabel : {
					show:false,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value} %',    // Template formatter!               
				},
            }
        ],
        series : [
			  {
				name:'实废开数',
                type:'bar',barMaxWidth:80,
                smooth:true,
                itemStyle : {
					normal:{
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},	
						label : {
							show: true,
							position: 'insideTop',
							formatter: function(c){
								return xround(c.data,1)
							}//'{c}'
						}
					}},
                data:[141.6,129.7,124.5,121.1,120.2,113.7,111.7,104.5,103.2,102.7,87.1,86.3,86.3,85.3,83.3,80.2,68.2,127.4,115.6,115.8,110.4,109.8,99.7,99.2,98.4,120.3,113.8,111.9,110.4,108.5,107.6,106.6,97.1,96.3,96.8,93.8,89.2,84.5,76.3,369,258.3,250.8,245.5,226.5,198.2,193.6,182.1,180.8,178.6,177],
				markPoint : MPtStyleBoth,
				markLine : MLnStyle,
			},
			{
				name:'拆包量',
                type:'bar',barMaxWidth:80,
                smooth:true,
                itemStyle : {
					normal:{
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},						
						label : {
							show: true,
							position: 'insideTop',
							formatter: function(c){
								return xround(c.data,1)
							}//'{c}'
						}
					}},
                data:[34.4,33.8,35.8,51.3,35.8,34.9,35.3,35.7,39.1,36.6,35.8,36.3,38,35.8,38.4,36.3,37,32.1,32.2,32.3,32.4,31.1,31.4,31.7,31.8,39.9,40.7,40.6,36.9,37.6,41,50.3,37.7,31.9,39.2,42.8,33.6,32.4,34,64,60.1,58.1,52.6,46.7,50.6,52.3,49.2,55.3,46.5,53.2],
				markPoint : MPtStyleBoth,
				markLine : MLnStyle,
			}			
        ]
    },
	RealFake3 : {		
		title : {
                text: '凹印各机长平均实废开数',
                subtext: '数据来源：质量综合管理系统数据库\n(峰值数据从左至右分别代表02A/03A/04A/07A)',
				x:'center',
            },
        tooltip : {
            trigger: 'item'
        },
		grid:{
			x:10,
			x2:45,
			y:0,
			//y2:75
		},
		legend: {
			//orient : 'vertical',
			x : 'center',
			y : 70,
			data:['实废开数','拆包量'],
			selected:{
				'拆包量':false
			}
		},
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
		dataZoom : {
            show : true,
            realtime: true,
            start : 0,
            end :20,
			//height:20,
        },
        calculable : true,
        xAxis : [
            {
				name:'机长',
				axisTick : {show: false},//隐藏标记线,
                type : 'category',
                boundaryGap : true,
                data:['赵军','吴勇','奉伟','牟军','高思东','刘健康','何兵','何杰','徐晖','刘大金','康建','张向军','马斌','陈拥军','罗仕勇','陈拥军','杜志明','刘晓洲','康健','马斌','刘健康','康建','任晓军','赵杰元','杨平','徐晖','杨济榕','罗仕勇','康建','赵小华','黄杰','柏华','冯利军','刘建勇','汪涛','李浩志','付豹','蔡勇','余松阳','袁璐','任晓军','杨平','郑昭辉','周文彬','李强','刘洪','付豹','柏华','刘建勇','赵小华','徐晖','何杰','况东','冯利军','刘大金','彭强','何伟平','黄杰','刘芋兵','邓学彬','胡彬','罗仕勇','杨平','张登军','游郑岗','李强'],
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: 45,
					//margin: 2          
				}
			}
        ],
        yAxis : [
            {
				name:'实废开数',
                type : 'value',
				position: 'left',
				//min:84,
				//max:89,
				scale: true,
				axisLine: {show:false},
				axisLabel : {
					show:false,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value} %',    // Template formatter!               
				},
            }
        ],
        series : [
			  {
				name:'实废开数',
                type:'bar',barMaxWidth:80,
                smooth:true,
                itemStyle : {
					normal:{
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},	
						label : {
							show: true,
							position: 'insideTop',
							formatter: function(c){
								return xround(c.data,1)
							}//'{c}'
						}
					}},
                data:[128.5,113.5,109.9,107.8,100.5,99.3,96.8,96.5,93.5,92.8,77.7,76,73.8,62.1,125.2,116.4,114.3,110.9,108.7,107.7,104.1,101.7,99.4,98.8,86.7,196.5,127,126.5,118.4,116.9,114.4,113.7,102.3,101.6,100.1,99.8,99,97.9,97.6,95.1,94.4,92.8,91.9,90.8,89.8,87.1,363,355.3,321.3,298.3,267,248.8,229.9,222.4,213.7,209.6,195.2,194.2,180.4,170.6,166.6,163.7,151.4,150.5,146.4,120.7],
				markPoint : MPtStyleBoth,
				markLine : MLnStyle,
			},
			{
				name:'拆包量',
                type:'bar',barMaxWidth:80,
                smooth:true,
                itemStyle : {
					normal:{
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},						
						label : {
							show: true,
							position: 'insideTop',
							formatter: function(c){
								return xround(c.data,1)
							}//'{c}'
						}
					}},
                data:[36.7,35.6,33.2,36.9,34.6,32.6,32.2,33.5,28.6,41.4,38.6,41.7,29.8,27.8,30.5,30.2,32.1,32.4,32.1,31.6,28.5,32,29.1,32.3,26,46.4,44.1,44.4,42.2,35.3,40,38.5,34.3,36.7,37.9,38.9,39.5,37.7,35.5,35.3,40.9,40.4,31.5,36.5,36.9,36.2,68.9,69.8,64.1,67.8,56,55.2,55.9,57.2,53,52.2,49.7,47.6,47.6,49.6,63,51.1,43.6,47.4,47.8,39.6],
				markPoint : MPtStyleBoth,
				markLine : MLnStyle,
			}			
        ]
    },
	RealFake4 : {		
		title : {
                text: '胶印各机长平均实废开数',
                subtext: '数据来源：质量综合管理系统数据库\n(各品种综合计算)',
				x:'center',
            },
        tooltip : {
            trigger: 'item'
        },
		grid:{
			x:10,
			x2:45,
			y:0,
			//y2:75
		},
		legend: {
			//orient : 'vertical',
			x : 'center',
			y : 70,
			data:['实废开数','拆包量'],
			selected:{
				'拆包量':false
			}
		},
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
		dataZoom : {
            show : true,
            realtime: true,
            start : 0,
            end :100,
			//height:20,
        },
        calculable : true,
        xAxis : [
            {
				name:'机长',
				axisTick : {show: false},//隐藏标记线,
                type : 'category',
                boundaryGap : true,
                data:['张松林','廖其武','陈兵','王勇成','贺梓峻','范宁','杨晓东','王崇润','刘勇明','李建华','唐军','张立力','钱亦轲','邓忠华','杨略','邓波','查安余','李启路','黄玉勇','王渝波','陈小强','许嘉','李晓军','李胜利','刘文华','严强','周武华','吴强','刘强','温涛','张志军','严磊','吴明森'],
				axisLabel : {
					show:true,					
					interval: 'auto',    // {number}
					//rotate: 45,
					//margin: 2          
				}
			}
        ],
        yAxis : [
            {
				name:'实废开数',
                type : 'value',
				position: 'left',
				//min:84,
				//max:89,
				scale: true,
				axisLine: {show:false},
				axisLabel : {
					show:false,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value} %',    // Template formatter!               
				},
            }
        ],
        series : [
			  {
				name:'实废开数',
                type:'bar',barMaxWidth:80,
                smooth:true,
                itemStyle : {
					normal:{
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},	
						label : {
							show: true,
							position: 'insideTop',
							formatter: function(c){
								return xround(c.data,1)
							}//'{c}'
						}
					}},
                data:[369,240.9,226.3,198.2,175.7,174.5,168.6,141.6,134.8,129.7,124.5,120.2,114.9,113.7,113.8,111.9,111.7,108.8,108.5,104.5,102.7,99.9,99.8,99.5,98,98.9,96.8,95.9,94.6,93.7,89.2,87.6,83.3],
				markPoint : MPtStyleBoth,
				markLine : MLnStyle,
			},
			{
				name:'拆包量',
                type:'bar',barMaxWidth:80,
                smooth:true,
                itemStyle : {
					normal:{
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},						
						label : {
							show: true,
							position: 'insideTop',
							formatter: function(c){
								return xround(c.data,1)
							}//'{c}'
						}
					}},
                data:[64,59,50.4,50.6,54.3,49,46.5,34.4,42.3,33.8,35.8,35.8,43.8,34.9,40.7,40.6,35.3,32.6,37.6,35.7,36.6,32.3,31.6,34.9,31.8,38,39.2,34.5,36.4,34.4,33.6,32.7,38.4],
				markPoint : MPtStyleBoth,
				markLine : MLnStyle,
			}			
        ]
    },
	RealFake5 : {		
		title : {
                text: '凹印各机长平均实废开数',
                subtext: '数据来源：质量综合管理系统数据库\n(各品种综合计算)',
				x:'center',
            },
        tooltip : {
            trigger: 'item'
        },
		grid:{
			x:10,
			x2:45,
			y:0,
			y2:75
		},
		legend: {
			//orient : 'vertical',
			x : 'center',
			y : 70,
			data:['实废开数','拆包量'],
			selected:{
				'拆包量':false
			}
		},
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
		dataZoom : {
            show : true,
            realtime: true,
            start : 0,
            end :100,
			//height:20,
        },
        calculable : true,
        xAxis : [
            {
				name:'机长',
				axisTick : {show: false},//隐藏标记线,
                type : 'category',
                boundaryGap : true,
                data:['况东','彭强','徐晖','何伟平','赵小华','刘芋兵','柏华','邓学彬','胡彬','刘大金','付豹','张登军','游郑岗','冯利军','赵军','黄杰','罗仕勇','杨济榕','杜志明','刘建勇','吴勇','何杰','刘晓洲','奉伟','康健','牟军','李强','高思东','汪涛','李浩志','康建','刘健康','赵杰元','余松阳','蔡勇','陈拥军','何兵','任晓军','马斌','杨平','袁璐','郑昭辉','周文彬','刘洪','张向军'],
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					rotate: 45,
					//margin: 2          
				}
			}
        ],
        yAxis : [
            {
				name:'实废开数',
                type : 'value',
				position: 'left',
				//min:84,
				//max:89,
				scale: true,
				axisLine: {show:false},
				axisLabel : {
					show:false,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value} %',    // Template formatter!               
				},
            }
        ],
        series : [
			  {
				name:'实废开数',
                type:'bar',barMaxWidth:80,
                smooth:true,
                itemStyle : {
					normal:{
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},	
						label : {
							show: true,
							position: 'insideTop',
							formatter: function(c){
								return xround(c.data,1)
							}//'{c}'
						}
					}},
                data:[229.9,209.6,207.9,195.2,181.5,180.4,173.3,170.6,166.6,165.7,161,150.5,146.4,141.3,128.5,127.4,126.8,127,114.3,114.1,113.5,112.9,110.9,109.9,108.7,107.8,100.5,100.5,100.1,99.8,99.6,99.9,98.8,97.6,97.9,96.1,96.8,96.7,96.7,96,95.1,91.9,90.8,87.1,76],
				markPoint : MPtStyleBoth,
				markLine : MLnStyle,
				
			},
			{
				name:'拆包量',
                type:'bar',barMaxWidth:80,
                smooth:true,
                itemStyle : {
					normal:{
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},						
						label : {
							show: true,
							position: 'insideTop',
							formatter: function(c){
								return xround(c.data,1)
							}//'{c}'
						}
					}},
                data:[55.9,52.2,46.8,49.7,46.8,47.6,46.2,49.6,63,48.4,46.4,47.4,47.8,41.7,36.7,41.2,44,44.1,32.1,38.3,35.6,35.8,32.4,33.2,32.1,36.9,37.8,34.6,37.9,38.9,33.3,32.1,32.3,35.5,37.7,29.3,32.2,35.6,31,39.2,35.3,31.5,36.5,36.2,41.7],
				markPoint : MPtStyleBoth,
				markLine : MLnStyle,
			}			
        ]
    },
	
	RealFake6 : {		
		title : {
                text: '胶凹各班组平均实废开数',
                subtext: '数据来源：质量综合管理系统数据库',
				x:'center',
            },
        tooltip : {
            trigger: 'item'
        },
		grid:{
			x:10,
			x2:45,
			y:0,
			y2:30,
		},
		legend: {
			//orient : 'vertical',
			x : 'center',
			y : 70,
			data:['实废开数','拆包量'],
			selected:{
				'拆包量':false
			}
		},
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
		/*dataZoom : {
            show : true,
            realtime: true,
            start : 0,
            end :100,
			//height:20,
        },*/
        calculable : true,
        xAxis : [
            {
				name:'机长',
				axisTick : {show: false},//隐藏标记线,
                type : 'category',
                boundaryGap : true,
                data:['凹印一班','凹印二班','凹印三班','凹印四班','水胶印一班','水胶印二班','干胶印一班','干胶印二班'],
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: 45,
					//margin: 2          
				}
			}
        ],
        yAxis : [
            {
				name:'实废开数',
                type : 'value',
				position: 'left',
				min:0,
				//max:89,
				scale: true,
				axisLine: {show:false},
				axisLabel : {
					show:false,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value} %',    // Template formatter!               
				},
            }
        ],
        series : [
			  {
				name:'实废开数',
                type:'bar',barMaxWidth:80,
                smooth:true,
                itemStyle : {
					normal:{
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},	
						label : {
							show: true,
							position: 'insideTop',
							formatter: function(c){
								return xround(c.data,1)
							}//'{c}'
						}
					}},
                data:[103.6,129.8,104.8,130.7,108.7,106,132.5,124.9],
				markPoint : MPtStyleBoth,
				markLine : MLnStyle,
				
			},
			{
				name:'拆包量',
                type:'bar',barMaxWidth:80,
                smooth:true,
                itemStyle : {
					normal:{
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},						
						label : {
							show: true,
							position: 'insideTop',
							formatter: function(c){
								return xround(c.data,1)
							}//'{c}'
						}
					}},
                data:[34.6,41.8,34,41.7,34.9,34.5,42.5,41.6],
				markPoint : MPtStyleBoth,
				markLine : MLnStyle,
			}			
        ]
    },
	
	QualityByPerson : {		
		title : {
                text: '凹印大张离线仪机台人员工艺执行情况',
                subtext: '数据来源：质量综合管理系统数据库',
				x:'center',
            },
        tooltip : {
            trigger: 'item'
        },
         toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        xAxis : [
            {
				name:'机长',
				axisTick : {show: false},//隐藏标记线,
                type : 'category',
                boundaryGap : true,
                data:['陈拥军','李浩志','刘芋兵','徐晖',' 杨平',' 彭强',' 李强',' 游郑岗','何伟平','黄杰',' 邓学彬','袁路',' 况东',' 高思东','杜志明','任晓军','蔡勇',' 汪涛',' 大康健','赵杰元','奉伟',' 何杰',' 刘大金','柏华',' 罗仕勇','冯利军','任光耀','刘晓洲','小康健','张登军','余松阳','马斌',' 刘洪',' 吴勇',' 刘健康','牟军',' 赵小华','刘建勇','付豹',' 杨济榕','周文彬','何兵'],
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					rotate: 45,
					//margin: 2          
				}
			}
        ],
        yAxis : [
            {
				name:'抽检异常天数比例',
                type : 'value',
				position: 'left',
				//min:84,
				//max:89,
				scale: true,
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value} %',    // Template formatter!               
				},
            }
        ],
        series : [
			  {
                type:'bar',barMaxWidth:80,
                smooth:true,
                itemStyle : {
					normal:{
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},
						color: (function (){			
							//return zrColor.getLinearGradient(10,10,1000,900,[[0,'rgba(255,127,104,0.9)'],[0.6,'rgba(120, 216, 225,0.9)'],[1,'rgba(210, 196, 65,0.9)']])
							return zrColor.getLinearGradient(10,10,1000,900,[[0,'#26b98b'],[1,'#3f4c6b']])
						})(),	
						label : {
							show: true,
							position: 'insideTop',
							formatter: function(c){
								return xround(c.data,1)
							}//'{c}'
						}
					}},
                data:[88.6,82.35,80.19,80,77.33,75.82,74.73,70.62,69.27,69.27,65.52,62.91,62.14,61.47,57.14,54.13,52.88,52.34,51.59,50.79,50.45,50,48.1,45.9,45.9,45.64,45.45,44.63,44.55,36.36,34.16,33.33,33.33,33.03,30.97,30.09,29.92,29.8,28.86,22.03,19.02,7.48],
				markPoint : MPtStyleBoth,
				markLine : MLnStyle,
			},{
				name:'机长比例',
				type:'pie',
				tooltip : {
					trigger: 'item',
					formatter: '{a} <br/>{b} : {c} ({d}%)'
				},
				center: ['88%','25%'],
				radius : [0, 50],
				itemStyle :　{
					normal : {
						label : {
							show :true,
						},
						labelLine : {
							show : false,
							length : 10
						},
					},
				},
				data:[
					{value:8, name:'30%以下'},
					{value:37, name:'30%以上'},
				]
			}/*,
			 {
                type:'line',
                smooth:true,
				//itemStyle :LineStyleBlue,
				itemStyle:{normal: {label: { show: false }}},
                data:[87.19,87.64,88.09,88.94,90.53,93.69],
			},*/
        ]
    },
	QualityByPerson2 : {		
		title : {
                text: '凹印大张离线仪凹印质检员工艺执行情况',
                subtext: '数据来源：质量综合管理系统数据库',
				x:'center',
            },
        tooltip : {
            trigger: 'item'
        },
		/*legend: {
			orient : 'vertical',
			x : 'right',
			y : 'bottom',
			data:['机长A','机长B']
		},*/
         toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        xAxis : [
            {
				name:'机长',
				axisTick : {show: false},//隐藏标记线,
                type : 'category',
                boundaryGap : true,
                data:['况东','柏华','李浩志','张登军','赵小华','黄杰','刘洪','周文彬','刘建勇','杨济榕','冯利军','游郑岗','何伟平','邓学彬','任光耀','罗仕勇','袁路','杨平','彭强','汪涛','蔡勇','刘芋兵','李强','余松阳','刘大金','徐晖','刘健康','小康健','赵杰元','付豹','奉伟','陈拥军','吴勇','牟军','任晓军','马斌','大康健','刘晓洲','何兵','高思东','杜志明','何杰'],
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					rotate: 45,
					//margin: 2          
				}
			}
        ],
        yAxis : [
            {
				name:'抽检异常天数比例',
                type : 'value',
				position: 'left',
				//min:84,
				//max:89,
				scale: true,
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value} %',    // Template formatter!               
				},
            }
        ],
        series : [
			  {
                type:'bar',barMaxWidth:80,
                smooth:true,
                itemStyle : {
					normal:{
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},
						color: (function (){			
							//return zrColor.getLinearGradient(10,10,1000,900,[[0,'rgba(255,127,104,0.9)'],[0.6,'rgba(120, 216, 225,0.9)'],[1,'rgba(210, 196, 65,0.9)']])
							return zrColor.getLinearGradient(10,10,1000,900,[[0,'#26b98b'],[1,'#3f4c6b']])
						})(),	
						label : {
							show: true,
							position: 'insideTop',
							formatter: function(c){
								return xround(c.data,1)
							}//'{c}'
						}
					}},
                data:[100,99.18,98.69,98.6,98.43,98.32,94.61,94.15,91.39,89.83,84.62,84.36,82.44,79.31,78.79,74.86,74.83,73.33,72.53,68.75,68.27,60.85,60.44,59.9,53.8,52.73,51.33,50.91,50.79,50.34,48.65,47.37,46.79,45.13,44.04,43.86,43.65,42.98,42.06,41.28,24.68,23.08],
				markPoint : MPtStyle,
				markLine : MLnStyle,
			},{
				name:'机长比例',
				type:'pie',
				tooltip : {
					trigger: 'item',
					formatter: '{a} <br/>{b} : {c} ({d}%)'
				},
				center: ['88%','25%'],
				radius : [0, 50],
				itemStyle :　{
					normal : {
						label : {
							show :true,
							position:'outter',
						},
						labelLine : {
							show : true,
							length : 10
						},
					},
				},
				data:[
					{value:2, name:'30%以下'},
					{value:40, name:'30%以上'},
				]
			}/*,
			 {
                type:'line',
                smooth:true,
				//itemStyle :LineStyleBlue,
				itemStyle:{normal: {label: { show: false }}},
                data:[87.19,87.64,88.09,88.94,90.53,93.69],
			},*/
        ]
    },
	QualityByPerson3 : {		
		title : {
                text: '凹印大张离线仪技术质量部抽检人员工艺执行情况',
                subtext: '数据来源：质量综合管理系统数据库',
				x:'center',
            },
        tooltip : {
            trigger: 'item'
        },
		/*legend: {
			orient : 'vertical',
			x : 'right',
			y : 'bottom',
			data:['机长A','机长B']
		},*/
         toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        xAxis : [
            {
				name:'机长',
				axisTick : {show: false},//隐藏标记线,
                type : 'category',
                boundaryGap : true,
                data:['邓学彬','况东','张登军','刘大金','冯利军','刘芋兵','游郑岗','袁路','何伟平','罗仕勇','李强','赵小华','刘建勇','任晓军','彭强','付豹','蔡勇','黄杰','余松阳','徐晖','杨平','汪涛','刘洪','周文彬','赵杰元','杜志明','刘健康','刘晓洲','马斌','大康健','柏华','陈拥军','高思东','杨济榕','小康健','何杰','奉伟','牟军','吴勇','李浩志','何兵'],
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					rotate: 45,
					//margin: 2          
				}
			}
        ],
        yAxis : [
            {
				name:'抽检异常天数比例',
                type : 'value',
				position: 'left',
				//min:84,
				//max:89,
				scale: true,
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value} %',    // Template formatter!               
				},
            }
        ],
        series : [
			  {
                type:'bar',barMaxWidth:80,
                smooth:true,
                itemStyle : {
					normal:{
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},
						color: (function (){			
							//return zrColor.getLinearGradient(10,10,1000,900,[[0,'rgba(255,127,104,0.9)'],[0.6,'rgba(120, 216, 225,0.9)'],[1,'rgba(210, 196, 65,0.9)']])
							return zrColor.getLinearGradient(10,10,1000,900,[[0,'#26b98b'],[1,'#3f4c6b']])
						})(),	
						label : {
							show: true,
							position: 'insideTop',
							formatter: function(c){
								return xround(c.data,1)
							}//'{c}'
						}
					}},
                data:[58.62,50,48.95,46.84,42.05,38.21,36.49,33.77,33.17,30.6,29.12,26.77,25.83,25.69,25.27,24.83,24.04,23.46,21.78,20.91,20.67,20.31,18.63,18.54,16.67,15.58,13.27,13.22,12.28,11.9,10.66,9.65,9.17,8.47,8.18,7.69,7.21,7.08,5.5,4.58,3.74],
				markPoint : MPtStyle,
				markLine : MLnStyle,
			},{
				name:'机长比例',
				type:'pie',
				tooltip : {
					trigger: 'item',
					formatter: '{a} <br/>{b} : {c} ({d}%)'
				},
				center: ['88%','25%'],
				radius : [0, 50],
				itemStyle :　{
					normal : {
						label : {
							show :true,
							position:'outter',
						},
						labelLine : {
							show : true,
							length : 10
						},
					},
				},
				data:[
					{value:31, name:'30%以下'},
					{value:10, name:'30%以上'},
				]
			}/*,
			 {
                type:'line',
                smooth:true,
				//itemStyle :LineStyleBlue,
				itemStyle:{normal: {label: { show: false }}},
                data:[87.19,87.64,88.09,88.94,90.53,93.69],
			},*/
        ]
    },
	QualityByPerson4 : {		
		title : {
                text: '凹印大张离线仪机台人员平均每天抽检频次',
                subtext: '数据来源：质量综合管理系统数据库',
				x:'center',
            },
        tooltip : {
            trigger: 'item'
        },
		/*legend: {
			orient : 'vertical',
			x : 'right',
			y : 'bottom',
			data:['机长A','机长B']
		},*/
         toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        xAxis : [
            {
				name:'机长',
				axisTick : {show: false},//隐藏标记线,
                type : 'category',
                boundaryGap : true,
                data:['周文彬','赵小华','何兵','刘建勇','柏华','马斌','冯利军','杨济榕','汪涛','张登军','付豹','刘洪','黄杰','罗仕勇','余松阳','大康健','牟军','吴勇','刘健康','刘晓洲','刘大金','赵杰元','任晓军','杜志明','小康健','蔡勇','袁路','任光耀','奉伟','何杰','况东','何伟平','邓学彬','高思东','李浩志','游郑岗','李强','徐晖','刘芋兵','杨平','彭强','陈拥军'],
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					rotate: 45,
					//margin: 2          
				}
			}
        ],
        yAxis : [
            {
				name:'抽检次数',
                type : 'value',
				position: 'left',
				//min:84,
				//max:89,
				scale: true,
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value} 次',    // Template formatter!               
				},
            }
        ],
        series : [
			  {
                type:'bar',barMaxWidth:80,
                smooth:true,
				symbolSize: 3,
                itemStyle : {
					normal:{	
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},
						color: (function (){			
							//return zrColor.getLinearGradient(10,10,1000,900,[[0,'rgba(255,127,104,0.9)'],[0.6,'rgba(120, 216, 225,0.9)'],[1,'rgba(210, 196, 65,0.9)']])
							return zrColor.getLinearGradient(10,10,1000,900,[[0,'#26b98b'],[1,'#3f4c6b']])
						})(),	
						label : {
							show: true,
							position: 'insideTop',
							formatter: function(c){
								return xround(c.data,1)
							}//'{c}'
						}
					}},
                data:[9.52,9.41,8.84,8.59,8.58,8.44,8.27,7.98,7.73,7.07,6.77,6.59,6.33,6.12,5.82,5.77,5.76,5.69,5.54,5.34,5.34,5.33,5.13,5.11,5.08,5.04,5.03,5.02,4.73,4.62,4.59,4.19,4.14,3.95,3.85,3.82,3.8,3.61,3.57,3.34,3.27,3.24],
				markLine : MLnStyle,
			},{
				name:'机长比例',
				type:'pie',
				tooltip : {
					trigger: 'item',
					formatter: '{a} <br/>{b} : {c} ({d}%)'
				},
				center: ['88%','25%'],
				radius : [0, 50],
				itemStyle :　{
					normal : {
						label : {
							show :true,
							//position:'outter',
						},
						labelLine : {
							show : false,
							length : 10
						},
					},
				},
				data:[
					{value:14, name:'5次以下'},
					{value:28, name:'5次以上'},
				]
			}/*,
			 {
                type:'line',
                smooth:true,
				//itemStyle :LineStyleBlue,
				itemStyle:{normal: {label: { show: false }}},
                data:[87.19,87.64,88.09,88.94,90.53,93.69],
			},*/
        ]
    },
	QualityByPerson5 : {		
		title : {
                text: '凹印大张离线仪凹印质检员平均每天抽检频次',
                subtext: '数据来源：质量综合管理系统数据库',
				x:'center',
            },
        tooltip : {
            trigger: 'item'
        },
		/*legend: {
			orient : 'vertical',
			x : 'right',
			y : 'bottom',
			data:['机长A','机长B']
		},*/
         toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        xAxis : [
            {
				name:'机长',
				axisTick : {show: false},//隐藏标记线,
                type : 'category',
                boundaryGap : true,
                data:['黄杰','赵杰元','况东','刘芋兵','彭强','高思东','陈拥军','刘洪','杜志明','刘晓洲','刘健康','任光耀','柏华','吴勇','何兵','任晓军','杨济榕','马斌','何伟平','牟军','杨平','周文彬','李强','刘大金','张登军','小康健','冯利军','刘建勇','余松阳','奉伟','徐晖','何杰','邓学彬','汪涛','罗仕勇','赵小华','蔡勇','大康健','付豹'],
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					rotate: 45,
					//margin: 2          
				}
			}
        ],
        yAxis : [
            {
				name:'抽检次数',
                type : 'value',
				position: 'left',
				//min:84,
				//max:89,
				scale: true,
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value} 次',    // Template formatter!               
				},
            }
        ],
        series : [
			  {
                type:'bar',barMaxWidth:80,
                smooth:true,
				symbolSize: 3,
                itemStyle : {
					normal:{
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},
						color: (function (){			
							//return zrColor.getLinearGradient(10,10,1000,900,[[0,'rgba(255,127,104,0.9)'],[0.6,'rgba(120, 216, 225,0.9)'],[1,'rgba(210, 196, 65,0.9)']])
							return zrColor.getLinearGradient(10,10,1000,900,[[0,'#26b98b'],[1,'#3f4c6b']])
						})(),	
						label : {
							show: true,
							position: 'insideTop',
							formatter: function(c){
								return xround(c.data,1)
							}//'{c}'
						}
					}},
                data:[0.99,1,1,1,1.01,1.01,1.01,1.01,1.02,1.02,1.03,1.03,1.03,1.03,1.04,1.04,1.05,1.05,1.06,1.07,1.07,1.08,1.09,1.09,1.09,1.09,1.09,1.11,1.11,1.11,1.11,1.12,1.13,1.14,1.16,1.16,1.17,1.2,1.26],
				markLine : MLnStyle,
			}/*,
			 {
                type:'line',
                smooth:true,
				//itemStyle :LineStyleBlue,
				itemStyle:{normal: {label: { show: false }}},
                data:[87.19,87.64,88.09,88.94,90.53,93.69],
			},*/
        ]
    },
	QualityByPerson6 : {		
		title : {
                text: '凹印大张离线仪技术质量部抽检人员平均每天抽检频次',
                subtext: '数据来源：质量综合管理系统数据库',
				x:'center',
            },
        tooltip : {
            trigger: 'item'
        },
		/*legend: {
			orient : 'vertical',
			x : 'right',
			y : 'bottom',
			data:['机长A','机长B']
		},*/
         toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        xAxis : [
            {
				name:'机长',
				axisTick : {show: false},//隐藏标记线,
                type : 'category',
                boundaryGap : true,
                data:['李浩志','袁路','柏华','游郑岗','黄杰','汪涛','冯利军','杨平','何伟平','刘芋兵','胡彬','刘建勇','况东','罗仕勇','赵小华','彭强','高思东','余松阳','张登军','刘洪','李强','杜志明','付豹','周文彬','蔡勇','邓学彬','徐晖','何杰','赵杰元','刘大金','小康健','任晓军','陈拥军','刘健康','任光耀','刘晓洲','大康健','吴勇','奉伟','马斌','何兵','牟军','杨济榕'],
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					rotate: 45,
					//margin: 2          
				}
			}
        ],
        yAxis : [
            {
				name:'抽检次数',
                type : 'value',
				position: 'left',
				//min:84,
				//max:89,
				scale: true,

				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value} 次',    // Template formatter!               
				},
            }
        ],
        series : [
			  {
                type:'bar',barMaxWidth:80,
                smooth:true,
				symbolSize: 3,
                itemStyle : {
					normal:{
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},
						color: (function (){			
							//return zrColor.getLinearGradient(10,10,1000,900,[[0,'rgba(255,127,104,0.9)'],[0.6,'rgba(120, 216, 225,0.9)'],[1,'rgba(210, 196, 65,0.9)']])
							return zrColor.getLinearGradient(10,10,1000,900,[[0,'#26b98b'],[1,'#3f4c6b']])
						})(),	
						label : {
							show: true,
							position: 'insideTop',
							formatter: function(c){
								return xround(c.data,1)
							}//'{c}'
						}
					}},
                data:[1.05,1.11,1.13,1.16,1.22,1.22,1.25,1.27,1.31,1.33,1.33,1.34,1.35,1.38,1.4,1.42,1.43,1.44,1.44,1.44,1.48,1.5,1.5,1.52,1.54,1.55,1.55,1.58,1.64,1.65,1.66,1.66,1.67,1.7,1.71,1.72,1.74,1.74,1.76,1.77,1.8,1.84,1.89],
				markLine : MLnStyle,
			},{
				name:'机长比例',
				type:'pie',
				tooltip : {
					trigger: 'item',
					formatter: '{a} <br/>{b} : {c} ({d}%)'
				},
				center: ['11%','25%'],
				radius : [0, 50],
				itemStyle :　{
					normal : {
						label : {
							show :true,
							//position:'outter',
						},
						labelLine : {
							show : false,
							length : 10
						},
					},
				},
				data:[
					{value:21, name:'<1.5次'},
					{value:22, name:'>1.5次'},
				]
			}/*,
			 {
                type:'line',
                smooth:true,
				//itemStyle :LineStyleBlue,
				itemStyle:{normal: {label: { show: false }}},
                data:[87.19,87.64,88.09,88.94,90.53,93.69],
			},*/
        ]
    },
	QualityByCode : {		
		title : {
                text: '印码工序作废类型分布统计',
                subtext: '数据来源：号码质量中心数据库',
				x:'center',
            },
        tooltip : {
            trigger: 'axis',
			axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			},
        },
		legend: {
            //orient : 'vertical',
			
            x : 'right',
			y : 50,
            data:[/*'水印走版','待定','荧光其他','水印未查','可疑','整列错号','水印其他','漏印','折角','荧光走版','其他','墨脏','荧光墨淡','荧光断线','荧光蹭脏','荧光缺印','荧光残缺','串色','保险','骑码',*/'其余','嵌墨','墨浅','墨浓','走版','错号','花白','墨点'],
			//selected:{
				//'其余':false,
			//}
		},
		//grid:{
			//x : 220,
		//},
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        xAxis : [
            {
				name:'缺陷类型',
				axisTick : {show: false},//隐藏标记线,
                type : 'category',
                boundaryGap : true,
                data:['水印走版','待定','荧光其他','水印未查','可疑','整列错号','水印其他','漏印','折角','荧光走版','其他','墨脏','荧光墨淡','荧光断线','荧光蹭脏','荧光缺印','荧光残缺','串色','保险','骑码','嵌墨','墨浅','墨浓','走版','错号','花白','墨点'],
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					rotate: 45,
					//margin: 2          
				}
			}
        ],
        yAxis : [
            {
				name:'实废条数',
                type : 'value',
				position: 'left',
				//min:84,
				//max:89,
				scale: true,
				axisLine : {show:false},
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value} 条',    // Template formatter!               
				},
            }
        ],
        series : [
			  {
                type:'bar',barMaxWidth:80,
                smooth:true,
                itemStyle : {
					normal:{
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},
						/*color: (function (){			
							//return zrColor.getLinearGradient(10,10,1000,900,[[0,'rgba(255,127,104,0.9)'],[0.6,'rgba(120, 216, 225,0.9)'],[1,'rgba(210, 196, 65,0.9)']])
							return zrColor.getLinearGradient(10,10,1000,900,[[0,'#26b98b'],[1,'#3f4c6b']])
						})(),
						color: function(params) {
							// build a color map as your need.
							var colorList = [
							  '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
							   '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
							   '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0',
							   '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
							   '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
							   '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
							];
							return colorList[params.dataIndex]
						},	*/
						label : {
							show: true,
							//position: 'insideTop',
							formatter: function(c){
								return xround(c.data,1)
							}//'{c}'
						}
					}},
                data:[2,3,111,151,174,180,285,462,1109,1407,1542,1579,1811,2222,2320,2438,2497,2854,3003,3238,4424,7207,8680,8785,11085,12708,60679],
				markPoint : MPtStyleBoth,
				markLine : MLnStyle,
			},
			{
				selectedMode:'single',
                type:'pie',
				selectedMode:'single',
				startAngle:-90,
				center : ['18%', 150],
                radius : ['20%', '40%'],
                data:[
                    {value:27388,name:'其余'},
					{value:4424,name:'嵌墨'},
					{value:7207,name:'墨浅'},
					{value:8680,name:'墨浓'},
					{value:8785,name:'走版'},
					{value:11085,name:'错号'},
					{value:12708,name:'花白'},
					{value:60679,name:'墨点'},
                ],
				 itemStyle : {					
					emphasis : {
						label : {
							show : true,
							formatter: "{d}%",
							position : 'center',
							textStyle : {
								fontSize : '20',
								fontWeight : 'bold'
							}
						}
					}
				},
            },
			/*{
                name:'其余',
                type:'pie',
				startAngle: -90,
				center : ['50%', 160],
                radius : ['15%', '30%'],
                data:[
                    {value:2,name:'水印走版'},
					{value:3,name:'待定'},
					{value:111,name:'荧光其他'},
					{value:151,name:'水印未查'},
					{value:174,name:'可疑'},
					{value:180,name:'整列错号'},
					{value:285,name:'水印其他'},
					{value:462,name:'漏印'},
					{value:1109,name:'折角'},
					{value:1407,name:'荧光走版'},
					{value:1542,name:'其他'},
					{value:1579,name:'墨脏'},
					{value:1811,name:'荧光墨淡'},
					{value:2222,name:'荧光断线'},
					{value:2320,name:'荧光蹭脏'},
					{value:2438,name:'荧光缺印'},
					{value:2497,name:'荧光残缺'},
					{value:2854,name:'串色'},
					{value:3003,name:'保险'},
					{value:3238,name:'骑码'}
                ],
				itemStyle : {					
					emphasis : {
						label : {
							show : true,
							formatter: "{d}%",
							position : 'center',
							textStyle : {
								fontSize : '15',
								fontWeight : 'bold'
							}
						}
					},
					normal:{
						label : {
							show : true,
							//formatter: "{d}%",
							position : 'outer',
							//textStyle : {
							//	fontSize : '20',
							//	fontWeight : 'bold'
							//}
						},
						labelLine : {
							show : true,
							length : 5
						},
					}
				},
            }*/
        ]
    },
	QualityByCode2 : {		
		title : {
                text: '印码工序作废类型分布统计',
                subtext: '数据来源：号码质量中心数据库',
				x:'center',
            },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c}万 ({d}%)"
        },
        legend: {
            orient : 'vertical',
            x : 'left',
            data:['水印走版','待定','荧光其他','水印未查','可疑','整列错号','水印其他','漏印','折角','荧光走版','其他','墨脏','荧光墨淡','荧光断线','荧光蹭脏','荧光缺印','荧光残缺','串色','保险','骑码','其余','嵌墨','墨浅','墨浓','走版','错号','花白','墨点']
        },
        toolbox: {
            show : true,
            feature : {
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                restore : {show: true},
                saveAsImage : {show: true},				
            }
        },
        calculable : true,
        series : [
            {
				selectedMode:'single',
                type:'pie',
				selectedMode:'single',
				startAngle:45,
				center : ['35%', 250],
                radius : ['30%', '70%'],
                data:[
                    {value:27388,name:'其余'},
					{value:4424,name:'嵌墨'},
					{value:7207,name:'墨浅'},
					{value:8680,name:'墨浓'},
					{value:8785,name:'走版'},
					{value:11085,name:'错号'},
					{value:12708,name:'花白'},
					{value:60679,name:'墨点'},
                ],
				 itemStyle : {					
					emphasis : {
						label : {
							show : true,
							formatter: "{d}%",
							position : 'center',
							textStyle : {
								fontSize : '30',
								fontWeight : 'bold'
							}
						}
					}
				},
            },
			{
                name:'其余',
                type:'pie',
				startAngle: 180,
				center : ['75%', 250],
                radius : ['20%', '50%'],
                data:[
                    {value:2,name:'水印走版'},
					{value:3,name:'待定'},
					{value:111,name:'荧光其他'},
					{value:151,name:'水印未查'},
					{value:174,name:'可疑'},
					{value:180,name:'整列错号'},
					{value:285,name:'水印其他'},
					{value:462,name:'漏印'},
					{value:1109,name:'折角'},
					{value:1407,name:'荧光走版'},
					{value:1542,name:'其他'},
					{value:1579,name:'墨脏'},
					{value:1811,name:'荧光墨淡'},
					{value:2222,name:'荧光断线'},
					{value:2320,name:'荧光蹭脏'},
					{value:2438,name:'荧光缺印'},
					{value:2497,name:'荧光残缺'},
					{value:2854,name:'串色'},
					{value:3003,name:'保险'},
					{value:3238,name:'骑码'}
                ],
				itemStyle : {					
					emphasis : {
						label : {
							show : true,
							formatter: "{d}%",
							position : 'center',
							textStyle : {
								fontSize : '20',
								fontWeight : 'bold'
							}
						}
					},
					normal:{
						label : {
							show : true,
							//formatter: "{d}%",
							position : 'outer',
						},
						labelLine : {
							show : true,
							length : 10
						},
					}
				},
            }
        ]
    },
	QualityByCode3 : {		
		title : {
                text: '印码工序作废类型分布统计',
                subtext: '数据来源：号码质量中心数据库',
				x:'center',
            },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c}万 ({d}%)"
        },
        legend: {
            orient : 'vertical',
            x : 'left',
            data:['水印','荧光其他','荧光墨淡','荧光断线','荧光蹭脏','荧光缺印','荧光残缺','号码其他','墨脏','串色','保险','骑码','嵌墨','墨浅','墨浓','走版','错号','花白','墨点']
        },
        toolbox: {
            show : true,
            feature : {
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                restore : {show: true},
                saveAsImage : {show: true},				
            }
        },
        calculable : true,
        series : [
            {
				name:'号码、荧光、水印比例',
				selectedMode:'single',
				clockWise:false,
                type:'pie',
				selectedMode:'single',
				startAngle:90,
				center : ['50%', '55%'],
                radius : [0, '40%'],
                data:[
					{name:'荧光/水印',value:13244},
					{name:'号码',value:127712},
                ],
				 itemStyle : {					
					emphasis : {
						label : {
							show : true,
							formatter: "{d}%",
							position : 'inner',
							textStyle : {
								fontSize : '15',
								fontWeight : 'bold',
								color: '#fff'
							}
						}
					},
					normal:{
						label : {
							show : true,
							formatter: "{b}\n{d}%",
							position : 'inner',
							textStyle : {
								color: '#fff'
							}
						},
						labelLine : {
							show : false,
							length : 20
						},
					}
				},
            },
			{
                name:'详情',
                type:'pie',
				startAngle: 90,
				clockWise:false,
				center : ['50%', '55%'],
                radius : ['42%', '75%'],
                data:[					
					{name:'水印',value:438},
					{name:'荧光其他',value:1518},
					{name:'荧光墨淡',value:1811},
					{name:'荧光断线',value:2222},
					{name:'荧光蹭脏',value:2320},
					{name:'荧光缺印',value:2438},
					{name:'荧光残缺',value:2497},
					{name:'号码其他',value:3470},
					{name:'墨脏',value:1579},
					{name:'串色',value:2854},
					{name:'保险',value:3003},
					{name:'骑码',value:3238},
					{name:'嵌墨',value:4424},
					{name:'墨浅',value:7207},
					{name:'墨浓',value:8680},
					{name:'走版',value:8785},
					{name:'错号',value:11085},
					{name:'花白',value:12708},
					{name:'墨点',value:60679}
                ],
				itemStyle : {					
					emphasis : {
						label : {
							show : true,
							formatter: "{d}%",
							position : 'inner',
							textStyle : {
								fontSize : '15',
								fontWeight : 'bold'
							}
						}
					},					
					normal:{
						label : {
							show : true,
							formatter: "{b}({d}%)",
							position : 'outter',
							//textStyle : {
							//	fontSize : '20',
							//	fontWeight : 'bold'
							//}
						},
						color: function(params) {
							// build a color map as your need.
							var colorList = [
							  'rgb(255,127,104)','rgb(148,205,97)','rgb(138,148,184)',		
							'rgb(45,164,168)','rgb(141,74,143)','rgb(67,87,114)','rgb(254,167,67)','rgb(106,117,141)','rgb(207,34,87)',
							'rgb(207,97,80)','rgb(143,167,133)','rgb(71,74,83)','rgb(138,143,146)','rgb(218,61,61)',
							'rgb(113,37,86)','rgb(228,108,96)','rgb(185,61,95)','rgb(92,151,180)',
							'rgb(52,184,170)','rgb(252,192,104)','rgb(60,207,227)','rgb(235,56,38)','rgb(98,201,145)'
							];
							return colorList[params.dataIndex]
						},
						labelLine : {
							show : true,
							length : 15
						},
					}
				},
            }
        ]
    },
	QualityByCode4 : {		
		title : {
                text: '印码各机型统计大万数',
                subtext: '数据来源：号码质量中心数据库',
				x:'center',
            },
        tooltip : {
            trigger: 'axis',
			axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			},
        },
         toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        xAxis : [
            {
				name:'机台',
				axisTick : {show: false},//隐藏标记线,
                type : 'category',
                boundaryGap : true,                
				data:['双色1#','双色2#','双色3#','双色4#','多功能-1#','多功能-2#','多功能-3#','接线印码机','M81D-1#','M81D-2#','DMJ12-1#','DMJ12-2#'],			   
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: 45,
					//margin: 2          
				}
			}
        ],
        yAxis : [
            {
				name:'大万数',
                type : 'value',
				position: 'left',
				//min:84,
				//max:89,
				scale: true,
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value} 万',    // Template formatter!               
				},
            },
			{
                type : 'value',
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 18,
					formatter: '{value} 条',    // Template formatter!               
				},
            }
        ],
        series : [
			  {
				name:'大万数',
                type:'bar',barMaxWidth:80,
                smooth:true,
                itemStyle : {
					normal:{
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},
						color: (function (){			
							//return zrColor.getLinearGradient(10,10,1000,900,[[0,'rgba(255,127,104,0.9)'],[0.6,'rgba(120, 216, 225,0.9)'],[1,'rgba(210, 196, 65,0.9)']])
							return zrColor.getLinearGradient(10,10,1000,900,[[0,'#26b98b'],[1,'#3f4c6b']])
						})(),	
						/*color: function(params) {
							// build a color map as your need.
							var colorList = [
							  '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
							   '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
							   '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0',
							   '#C1232B','#B5C334','#FCCE10','#E87C25','#27727B',
							   '#FE8463','#9BCA63','#FAD860','#F3A43B','#60C0DD',
							   '#D7504B','#C6E579','#F4E001','#F0805A','#26C0C0'
							];
							return colorList[params.dataIndex]
						},*/
						label : {
							show: true,
							position: 'insideTop',
							formatter: function(c){
								return xround(c.data,1)
							}//'{c}'
						}
					}},
                data:[2457,1906,1603,1744,2530,3005,2433,1721,668,343,538,469],				
			}
        ]
    },
	QualityByCode15: {		
		title : {
                text: '印码各机台平均实废条数对比',
                subtext: '数据来源：号码质量中心数据库',
				x:'center',
            },
        tooltip : {
            trigger: 'axis',
			axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			},
        },
		legend: {
			orient : 'vertical',
            x : 'right',
			y : 'center',
			data:['墨点','花白','错号','荧光蹭脏','墨浅','走版','其他','荧光断线','荧光墨淡','嵌墨','骑码','保险','串色','折角','荧光缺印','荧光残缺','墨脏'],	
        },
         toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
				
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        xAxis : [
            {
				//name:'作废类型',
				axisTick : {show: false},//隐藏标记线,
                type : 'category',
                boundaryGap : true,                
				data:['双色-1#','双色-2#','双色-3#','双色-4#','多功能-1#','多功能-2#','多功能-3#','接线印码机','M81D-1#','M81D-2#','DMJ12-1#','DMJ12-2#'],			   
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: 45,
					margin: 12          
				}
			}
        ],
        yAxis : [
            {
				name:'平均实废条数/万',
                type : 'value',
				position: 'left',
				min:0,
				max:30,
				//scale: true,
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value} 条',    // Template formatter!               
				},
            }
        ],
        series : [
			  {
				name:'墨点',
                type:'bar',barMaxWidth:80,
				stack: '总量',
                smooth:true,
                itemStyle : {
					normal:{
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},
						
						label : {
							show: false,
							position: 'insideTop',
							formatter: function(c){
								return xround(c.data,1)
							}//'{c}'
						}
					}},
                data:[4.31,4.62,16.31,0.06,0.50,0.88,0.81,0.29,1.27,1.50,8.11,6.09],		
			},
			 {
				name:'花白',
                type:'bar',barMaxWidth:80,
				stack: '总量',
                smooth:true,
                itemStyle : {
					normal:{
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},
						
						label : {
							show: false,
							position: 'insideTop',
							formatter: function(c){
								return xround(c.data,1)
							}//'{c}'
						}
					}},
                data:[1.06,0.91,1.34,0.00,0.20,0.31,0.61,1.10,0.66,0.80,0.58,0.77],		
			},
			 {
				name:'错号',
                type:'bar',barMaxWidth:80,
				stack: '总量',
                smooth:true,
                itemStyle : {
					normal:{
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},
						
						label : {
							show: false,
							position: 'insideTop',
							formatter: function(c){
								return xround(c.data,1)
							}//'{c}'
						}
					}},
                data:[0.88,0.79,0.40,0.18,0.36,0.33,0.40,0.25,2.73,0.62,1.36,0.85],		
			},
			 {
				name:'荧光蹭脏',
                type:'bar',barMaxWidth:80,
				stack: '总量',
                smooth:true,
                itemStyle : {
					normal:{
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},
						
						label : {
							show: false,
							position: 'insideTop',
							formatter: function(c){
								return xround(c.data,1)
							}//'{c}'
						}
					}},
                data:[0.45,0.25,0.17,0.01,0.03,0.01,0.01,0.03,0.23,0.06,0.06,0.09],		
			},
			 {
				name:'墨浅',
                type:'bar',barMaxWidth:80,
				stack: '总量',
                smooth:true,
                itemStyle : {
					normal:{
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},
						
						label : {
							show: false,
							position: 'insideTop',
							formatter: function(c){
								return xround(c.data,1)
							}//'{c}'
						}
					}},
                data:[0.41,0.64,0.67,0.03,0.03,0.07,0.30,0.21,1.58,1.87,0.63,0.93],		
			},
			 {
				name:'走版',
                type:'bar',barMaxWidth:80,
				stack: '总量',
                smooth:true,
                itemStyle : {
					normal:{
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},
						
						label : {
							show: false,
							position: 'insideTop',
							formatter: function(c){
								return xround(c.data,1)
							}//'{c}'
						}
					}},
                data:[0.36,0.52,1.69,0.12,0.23,0.20,0.30,0.15,0.54,0.45,2.26,0.17],		
			},
			 {
				name:'其他',
                type:'bar',barMaxWidth:80,
				stack: '总量',
                smooth:true,
                itemStyle : {
					normal:{
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},
						
						label : {
							show: false,
							position: 'insideTop',
							formatter: function(c){
								return xround(c.data,1)
							}//'{c}'
						}
					}},
                data:[0.28,0.07,0.42,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00],		
			},
			 {
				name:'荧光断线',
                type:'bar',barMaxWidth:80,
				stack: '总量',
                smooth:true,
                itemStyle : {
					normal:{
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},
						
						label : {
							show: false,
							position: 'insideTop',
							formatter: function(c){
								return xround(c.data,1)
							}//'{c}'
						}
					}},
                data:[0.22,0.19,0.25,0.01,0.00,0.02,0.03,0.01,0.16,0.06,0.87,0.30],		
			},
			 {
				name:'荧光墨淡',
                type:'bar',barMaxWidth:80,
				stack: '总量',
                smooth:true,
                itemStyle : {
					normal:{
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},
						
						label : {
							show: false,
							position: 'insideTop',
							formatter: function(c){
								return xround(c.data,1)
							}//'{c}'
						}
					}},
                data:[0.16,0.12,0.45,0.01,0.01,0.01,0.03,0.00,0.04,0.10,0.36,0.08],		
			},
			 {
				name:'嵌墨',
                type:'bar',barMaxWidth:80,
				stack: '总量',
                smooth:true,
                itemStyle : {
					normal:{
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},
						
						label : {
							show: false,
							position: 'insideTop',
							formatter: function(c){
								return xround(c.data,1)
							}//'{c}'
						}
					}},
                data:[0.16,0.22,0.63,0.00,0.00,0.01,0.00,0.00,2.40,1.72,0.43,0.29],		
			},
			 {
				name:'骑码',
                type:'bar',barMaxWidth:80,
				stack: '总量',
                smooth:true,
                itemStyle : {
					normal:{
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},
						
						label : {
							show: false,
							position: 'insideTop',
							formatter: function(c){
								return xround(c.data,1)
							}//'{c}'
						}
					}},
                data:[0.12,0.15,0.70,0.01,0.04,0.03,0.05,0.01,0.80,1.15,0.30,0.19],		
			},
			 {
				name:'保险',
                type:'bar',barMaxWidth:80,
				stack: '总量',
                smooth:true,
                itemStyle : {
					normal:{
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},
						
						label : {
							show: false,
							position: 'insideTop',
							formatter: function(c){
								return xround(c.data,1)
							}//'{c}'
						}
					}},
                data:[0.08,0.15,0.62,0.00,0.20,0.17,0.08,0.10,0.00,0.00,0.13,0.16],		
			},
			 {
				name:'串色',
                type:'bar',barMaxWidth:80,
				stack: '总量',
                smooth:true,
                itemStyle : {
					normal:{
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},
						
						label : {
							show: false,
							position: 'insideTop',
							formatter: function(c){
								return xround(c.data,1)
							}//'{c}'
						}
					}},
                data:[0.05,0.07,0.12,0.04,0.17,0.10,0.15,0.29,0.36,0.43,0.19,0.52],		
			},
			 {
				name:'折角',
                type:'bar',barMaxWidth:80,
				stack: '总量',
                smooth:true,
                itemStyle : {
					normal:{
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},
						
						label : {
							show: false,
							position: 'insideTop',
							formatter: function(c){
								return xround(c.data,1)
							}//'{c}'
						}
					}},
                data:[0.02,0.05,0.05,0.06,0.04,0.08,0.03,0.02,0.00,0.00,0.46,0.18],		
			},
			 {
				name:'荧光缺印',
                type:'bar',barMaxWidth:80,
				stack: '总量',
                smooth:true,
                itemStyle : {
					normal:{
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},
						
						label : {
							show: false,
							position: 'insideTop',
							formatter: function(c){
								return xround(c.data,1)
							}//'{c}'
						}
					}},
                data:[0.01,0.14,0.05,0.24,0.00,0.00,0.00,0.00,0.16,0.17,2.17,0.62],		
			},
			 {
				name:'荧光残缺',
                type:'bar',barMaxWidth:80,
				stack: '总量',
                smooth:true,
                itemStyle : {
					normal:{
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},
						
						label : {
							show: false,
							position: 'insideTop',
							formatter: function(c){
								return xround(c.data,1)
							}//'{c}'
						}
					}},
                data:[0.01,0.11,0.06,0.09,0.05,0.06,0.26,0.18,0.96,0.04,0.03,0.09],		
			},
			 {
				name:'墨脏',
                type:'bar',barMaxWidth:80,
				stack: '总量',
                smooth:true,
                itemStyle : {
					normal:{
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},
						
						label : {
							show: false,
							position: 'insideTop',
							formatter: function(c){
								return xround(c.data,1)
							}//'{c}'
						}
					}},
                data:[0.01,0.08,0.06,0.70,0.00,0.00,0.00,0.00,0.04,0.04,0.01,0.06],		
			}
        ]
    },
	/*QualityByCode5: {		
		title : {
                text: '印码各机型主要缺陷类型分布(双色机)',
                subtext: '数据来源：号码质量中心数据库',
				x:'center',
            },
        tooltip : {
            trigger: 'axis',
			axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			},
			formatter: function (params) {
				var tar = params[0];
				return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
			}
        },
         toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        xAxis : [
            {
				name:'作废类型',
				axisTick : {show: false},//隐藏标记线,
                type : 'category',
                boundaryGap : true,                
				data:['总量','墨点','花白','走版','错号','墨浅','荧光蹭脏','嵌墨','骑码','墨脏','其他'],			   
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: 45,
					margin: 12          
				}
			}
        ],
        yAxis : [
            {
				name:'实废条数',
                type : 'value',
				position: 'left',
				//min:84,
				//max:89,
				scale: true,
				splitArea : {
					show: true,
					areaStyle:{
						color:['rgba(144,238,144,0.2)','rgba(255,255,255,0.05)']
					}
				},
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value} 条',    // Template formatter!               
				},
            }
        ],
        series : [
			    {
					name:'辅助',
					type:'bar',barMaxWidth:80,
					stack: '总量',
					itemStyle:{
						normal:{
							barBorderColor:'rgba(0,0,0,0)',
							color:'rgba(0,0,0,0)'
						},
						emphasis:{
							barBorderColor:'rgba(0,0,0,0)',
							color:'rgba(0,0,0,0)'
						}
					},
					data:[0, 27712, 21235, 16423, 11795, 8434,6550,4719,2988,1493,0]
				},
			  {
                type:'bar',barMaxWidth:80,
                smooth:true,
				stack: '总量',
                itemStyle : {
					normal:{
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},
						
						label : {
							show: true,
							position: 'insideTop',
							formatter: function(c){
								return xround(c.data,1)
							}//'{c}'
						}
					}},
                data:[73340,45628,6477,4812,4628,3361,1884,1831,1731,1495,1493],		
			}
        ]
    },*/
	QualityByCode5: {		
		title : {
                text: '印码各机型主要缺陷类型分布(双色机)',
                subtext: '数据来源：号码质量中心数据库',
				x:'center',
            },
        tooltip : {
            trigger: 'axis',
			axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			},
			formatter: function (params) {
				var tar = params[0];
				return tar.name + '<br/>' + tar.seriesName + ' : ' + tar.value;
			}
        },
         toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        xAxis : [
            {
				name:'作废类型',
				axisTick : {show: false},//隐藏标记线,
                type : 'category',
                boundaryGap : true,                
				data:['墨点','花白','走版','错号','墨浅','荧光蹭脏','嵌墨','骑码','墨脏','其他'],			   
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: 45,
					margin: 12          
				}
			}
        ],
        yAxis : [
            {
				name:'实废条数',
                type : 'value',
				position: 'left',
				//min:84,
				//max:89,
				scale: true,

				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value} 条',    // Template formatter!               
				},
            },
        ],
        series : [
			{
                type:'bar',barMaxWidth:80,
                smooth:true,
				stack: '总量',
                itemStyle : {
					normal:{
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},
						color: function(params) {
							// build a color map as your need.
							var colorList = [
							'rgb(38,185,139)','#998899','rgb(255,127,104)','rgb(148,205,97)','rgb(138,148,184)',		
							'rgb(45,164,168)','rgb(141,74,143)','rgb(67,87,114)','rgb(254,167,67)','rgb(106,117,141)','rgb(207,34,87)',
							'rgb(207,97,80)','rgb(143,167,133)','rgb(71,74,83)','rgb(138,143,146)','rgb(218,61,61)',
							'rgb(113,37,86)','rgb(228,108,96)','rgb(185,61,95)','rgb(92,151,180)',
							];
							return colorList[params.dataIndex]
						},
						label : {
							show: true,
							position: 'top',
							formatter: function(c){
								return xround(c.data,1)
							}//'{c}'
						}
					}},
                data:[45628,6477,4812,4628,3361,1884,1831,1731,1495,1493],		
			},
			{
				selectedMode:'single',
                type:'pie',
				selectedMode:'single',
				startAngle:90,
				center : ['84%', 170],
                radius : ['20%', '40%'],
                data:[
                    {name:'墨点',value:45628},
					{name:'花白',value:6477},
					{name:'走版',value:4812},
					{name:'错号',value:4628},
					{name:'墨浅',value:3361},
					{name:'荧光蹭脏',value:1884},
					{name:'嵌墨',value:1831},
					{name:'骑码',value:1731},
					{name:'墨脏',value:1495},
					{name:'其他',value:1493},
                ],
				 itemStyle : {					
					emphasis : {
						label : {
							show : true,
							formatter: "{d}%",
							position : 'center',
							textStyle : {
								fontSize : '20',
								fontWeight : 'bold'
							}
						}
					},
					normal:{						
						label : {
							show : true,
							formatter: "{b}({d}%)",
							position : 'outer',
							//textStyle : {
							//	fontSize : '20',
							//	fontWeight : 'bold'
							//}
						},
						labelLine : {
							show : true,
							length : 5
						},
					}
				},
            },
        ]
    },
	QualityByCode6: {		
		title : {
                text: '印码各机型主要缺陷类型分布(多功能机)',
                subtext: '数据来源：号码质量中心数据库',
				x:'center',
            },
        tooltip : {
            trigger: 'axis',
			axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			},
        },
         toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        xAxis : [
            {
				name:'作废类型',
				axisTick : {show: false},//隐藏标记线,
                type : 'category',
                boundaryGap : true,                
				data:['墨浓','墨点','花白','错号','走版','串色','墨浅','保险','荧光残缺','荧光走版',],			   
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: 45,
					margin: 12  ,
				}
			}
        ],
        yAxis : [
            {
				name:'实废条数',
                type : 'value',
				position: 'left',
				//min:84,
				//max:89,
				scale: true,

				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value} 条',    // Template formatter!               
				},
            }
        ],
        series : [
			  {
                type:'bar',barMaxWidth:80,
                smooth:true,
                itemStyle : {
					normal:{
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},
						color: function(params) {
							// build a color map as your need.
							var colorList = [
							'rgb(38,185,139)','#998899','rgb(255,127,104)','rgb(148,205,97)','rgb(138,148,184)',		
							'rgb(45,164,168)','rgb(141,74,143)','rgb(67,87,114)','rgb(254,167,67)','rgb(106,117,141)','rgb(207,34,87)',
							'rgb(207,97,80)','rgb(143,167,133)','rgb(71,74,83)','rgb(138,143,146)','rgb(218,61,61)',
							'rgb(113,37,86)','rgb(228,108,96)','rgb(185,61,95)','rgb(92,151,180)',
							];
							return colorList[params.dataIndex]
						},
						label : {
							show: true,
							position: 'top',							
							//position:'right',
							formatter: function(c){
								return xround(c.data,1)
							}//'{c}'
						}
					}},
                data:[8304,6364,4826,3287,2154,1606,1366,1354,1240,533],		
			},
			{
				selectedMode:'single',
                type:'pie',
				selectedMode:'single',
				startAngle:90,
				center : ['84%', 170],
                radius : ['20%', '40%'],
                data:[
					{name:'墨浓',value:8304},
					{name:'墨点',value:6364},
					{name:'花白',value:4826},
					{name:'错号',value:3287},
					{name:'走版',value:2154},
					{name:'串色',value:1606},
					{name:'墨浅',value:1366},
					{name:'保险',value:1354},
					{name:'荧光残缺',value:1240},
					{name:'荧光走版',value:533},
                ],
				 itemStyle : {					
					emphasis : {
						label : {
							show : true,
							formatter: "{d}%",
							position : 'center',
							textStyle : {
								fontSize : '20',
								fontWeight : 'bold'
							}
						}
					},
					normal:{						
						label : {
							show : true,
							formatter: "{b}({d}%)",
							position : 'outer',
							//textStyle : {
							//	fontSize : '20',
							//	fontWeight : 'bold'
							//}
						},
						labelLine : {
							show : true,
							length : 5
						},
					}
				},
            },
        ]
    },
	QualityByCode7: {		
		title : {
                text: '印码各机型主要缺陷类型分布(M81D型)',
                subtext: '数据来源：号码质量中心数据库',
				x:'center',
            },
        tooltip : {
            trigger: 'axis',
			axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			},
        },
         toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        xAxis : [
            {
				name:'作废类型',
				axisTick : {show: false},//隐藏标记线,
                type : 'category',
                boundaryGap : true,                
				data:['嵌墨','错号','墨浅','墨点','骑码','花白','荧光残缺','走版','串色','荧光走版'],			   
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: 45,
					margin: 12          
				}
			}
        ],
        yAxis : [
            {
				name:'实废条数',
                type : 'value',
				position: 'left',
				min:0,
				//max:89,
				scale: true,
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value} 条',    // Template formatter!               
				},
            }
        ],
        series : [
			  {
                type:'bar',barMaxWidth:80,
                smooth:true,
                itemStyle : {
					normal:{
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},
						color: function(params) {
							// build a color map as your need.
							var colorList = [
							'rgb(38,185,139)','#998899','rgb(255,127,104)','rgb(148,205,97)','rgb(138,148,184)',		
							'rgb(45,164,168)','rgb(141,74,143)','rgb(67,87,114)','rgb(254,167,67)','rgb(106,117,141)','rgb(207,34,87)',
							'rgb(207,97,80)','rgb(143,167,133)','rgb(71,74,83)','rgb(138,143,146)','rgb(218,61,61)',
							'rgb(113,37,86)','rgb(228,108,96)','rgb(185,61,95)','rgb(92,151,180)',
							];
							return colorList[params.dataIndex]
						},
						label : {
							show: true,
							position: 'top',
							formatter: function(c){
								return xround(c.data,1)
							}//'{c}'
						}
					}},
                data:[2194,2037,1699,1366,929,714,657,517,387,224],		
			},
			{
				selectedMode:'single',
                type:'pie',
				selectedMode:'single',
				startAngle:90,
				center : ['84%', 170],
                radius : ['20%', '40%'],
                data:[
					{name:'嵌墨',value:2194},
					{name:'错号',value:2037},
					{name:'墨浅',value:1699},
					{name:'墨点',value:1366},
					{name:'骑码',value:929},
					{name:'花白',value:714},
					{name:'荧光残缺',value:657},
					{name:'走版',value:517},
					{name:'串色',value:387},
					{name:'荧光走版',value:224},
                ],
				 itemStyle : {					
					emphasis : {
						label : {
							show : true,
							formatter: "{d}%",
							position : 'center',
							textStyle : {
								fontSize : '20',
								fontWeight : 'bold'
							}
						}
					},
					normal:{						
						label : {
							show : true,
							formatter: "{b}({d}%)",
							position : 'outer',
							//textStyle : {
							//	fontSize : '20',
							//	fontWeight : 'bold'
							//}
						},
						labelLine : {
							show : true,
							length : 5
						},
					}
				},
            },
        ]
    },
	QualityByCode8: {		
		title : {
                text: '印码各机型主要缺陷类型分布(DMJ12型)',
                subtext: '数据来源：号码质量中心数据库',
				x:'center',
            },
        tooltip : {
            trigger: 'axis',
			axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			},
        },
         toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        xAxis : [
            {
				name:'作废类型',
				axisTick : {show: false},//隐藏标记线,
                type : 'category',
                boundaryGap : true,                
				data:['墨点','荧光缺印','走版','错号','墨浅','花白','荧光断线','荧光走版','嵌墨','串色'],			   
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: 45,
					margin: 12          
				}
			}
        ],
        yAxis : [
            {
				name:'实废条数',
                type : 'value',
				position: 'left',
				min:0,
				//max:89,
				scale: true,
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value} 条',    // Template formatter!               
				},
            }
        ],
        series : [
			{
                type:'bar',barMaxWidth:80,
                smooth:true,
                itemStyle : {
					normal:{
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},
						color: function(params) {
							// build a color map as your need.
							var colorList = [
							'rgb(38,185,139)','#998899','rgb(255,127,104)','rgb(148,205,97)','rgb(138,148,184)',		
							'rgb(45,164,168)','rgb(141,74,143)','rgb(67,87,114)','rgb(254,167,67)','rgb(106,117,141)','rgb(207,34,87)',
							'rgb(207,97,80)','rgb(143,167,133)','rgb(71,74,83)','rgb(138,143,146)','rgb(218,61,61)',
							'rgb(113,37,86)','rgb(228,108,96)','rgb(185,61,95)','rgb(92,151,180)',
							];
							return colorList[params.dataIndex]
						},
						label : {
							show: true,
							position: 'top',
							formatter: function(c){
								return xround(c.data,1)
							}//'{c}'
						}
					}},
                data:[7217,1457,1297,1133,778,676,612,609,368,346],		
			},
			{
				selectedMode:'single',
                type:'pie',
				selectedMode:'single',
				startAngle:90,
				center : ['82%', 170],
                radius : ['20%', '40%'],
                data:[
					{name:'墨点',value:7217},
					{name:'荧光缺印',value:1457},
					{name:'走版',value:1297},
					{name:'错号',value:1133},
					{name:'墨浅',value:778},
					{name:'花白',value:676},
					{name:'荧光断线',value:612},
					{name:'荧光走版',value:609},
					{name:'嵌墨',value:368},
					{name:'串色',value:346},
                ],
				 itemStyle : {					
					emphasis : {
						label : {
							show : true,
							formatter: "{d}%",
							position : 'center',
							textStyle : {
								fontSize : '20',
								fontWeight : 'bold'
							}
						}
					},
					normal:{						
						label : {
							show : true,
							formatter: "{b}({d}%)",
							position : 'outer',
							//textStyle : {
							//	fontSize : '20',
							//	fontWeight : 'bold'
							//}
						},
						labelLine : {
							show : true,
							length : 5
						},
					}
				},
            },
        ]
    },
	QualityByCode16: {		
		title : {
                text: '印码各机型主要缺陷类型分布(DMJ12型)',
                subtext: '数据来源：号码质量中心数据库\n统计时间：2014年9月至2015年5月10日',
				x:'center',
            },
        tooltip : {
            trigger: 'axis',
			axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			},
        },
         toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        xAxis : [
            {
				name:'作废类型',
				axisTick : {show: false},//隐藏标记线,
                type : 'category',
                boundaryGap : true,                
				data:['墨点','荧光走版','走版','错号','荧光缺印','墨浅','花白','荧光断线','可疑','嵌墨','串色','骑码','折角','荧光墨淡','保险','荧光蹭脏','墨脏','荧光残缺'],			   
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: 45,
					margin: 12          
				}
			}
        ],
        yAxis : [
            {
				name:'实废条数',
                type : 'value',
				position: 'left',
				min:0,
				//max:89,
				scale: true,
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value} 条',    // Template formatter!               
				},
				axisLine:{show:false},
            }
        ],
        series : [
			{
                type:'bar',barMaxWidth:80,
                smooth:true,
                itemStyle : {
					normal:{
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},
						color: function(params) {
							// build a color map as your need.
							var colorList = [
							'rgb(38,185,139)','#998899','rgb(255,127,104)','rgb(148,205,97)','rgb(138,148,184)',		
							'rgb(45,164,168)','rgb(141,74,143)','rgb(67,87,114)','rgb(254,167,67)','rgb(106,117,141)','rgb(207,34,87)',
							'rgb(207,97,80)','rgb(143,167,133)','rgb(71,74,83)','rgb(138,143,146)','rgb(218,61,61)',
							'rgb(113,37,86)','rgb(228,108,96)','rgb(185,61,95)','rgb(92,151,180)',
							];
							return colorList[params.dataIndex]
						},
						label : {
							show: true,
							position: 'top',
							formatter: function(c){
								return xround(c.data,1)
							}//'{c}'
						}
					}},
                data:[14003,5209,3424,2324,1798,1733,1191,933,870,724,634,540,474,331,291,256,167,115],		
			},
			{
				selectedMode:'single',
                type:'pie',
				selectedMode:'single',
				startAngle:90,
				center : ['82%', 170],
                radius : ['20%', '40%'],
                data:[
					{name:'墨点',value:14003},
					{name:'荧光走版',value:5209},
					{name:'走版',value:3424},
					{name:'错号',value:2324},
					{name:'荧光缺印',value:1798},
					{name:'墨浅',value:1733},
					{name:'花白',value:1191},
					{name:'荧光断线',value:933},
					{name:'可疑',value:870},
					{name:'嵌墨',value:724},
					{name:'串色',value:634},
					{name:'骑码',value:540},
					{name:'折角',value:474},
					{name:'荧光墨淡',value:331},
					{name:'保险',value:291},
					{name:'荧光蹭脏',value:256},
					{name:'墨脏',value:167},
					{name:'荧光残缺',value:115},
                ],
				 itemStyle : {					
					emphasis : {
						label : {
							show : true,
							formatter: "{d}%",
							position : 'center',
							textStyle : {
								fontSize : '20',
								fontWeight : 'bold'
							}
						}
					},
					normal:{						
						label : {
							show : true,
							formatter: "{b}({d}%)",
							position : 'outer',
							//textStyle : {
							//	fontSize : '20',
							//	fontWeight : 'bold'
							//}
						},
						labelLine : {
							show : true,
							length : 5
						},
					}
				},
            },
        ]
    },
	QualityByCode17: {		
		title : {
                text: '印码机检号控系统误报类型分布(双色机96A品)',
                subtext: '数据来源：号码质量中心数据库\n统计时间：2014年1月至7月',
				x:'center',
            },
        tooltip : {
            trigger: 'axis',
			axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			},
        },
         toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        xAxis : [
            {
				name:'作废类型',
				axisTick : {show: false},//隐藏标记线,
                type : 'category',
                boundaryGap : true,                
				data:['荧光蹭脏','荧光残缺','荧光断线','墨浅','墨脏','走版','墨浓','荧光走版','荧光墨淡','错号','串色','漏印','水印其他','折角','荧光缺印','整列错号','水印走板','墨点','花白','荧光整列走板','待定','骑码','保险','其他','水印未查','可疑'],			   
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: 45,
					margin: 12          
				}
			}
        ],
        yAxis : [
            {
				name:'误废条数',
                type : 'value',
				position: 'left',
				min:0,
				//max:89,
				scale: true,
				splitArea : {
					show: true,
					areaStyle:{
						color:['rgba(144,238,144,0.2)','rgba(255,255,255,0.05)']
					}
				},
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value} 条',    // Template formatter!               
				},
            }
        ],
        series : [
			  {
                type:'bar',barMaxWidth:80,
                smooth:true,
                itemStyle : {
					normal:{
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},
						color: function(params) {
							// build a color map as your need.
							var colorList = [
							'rgb(38,185,139)','#998899','rgb(255,127,104)','rgb(148,205,97)','rgb(138,148,184)',		
							'rgb(45,164,168)','rgb(141,74,143)','rgb(67,87,114)','rgb(254,167,67)','rgb(106,117,141)','rgb(207,34,87)',
							'rgb(207,97,80)','rgb(143,167,133)','rgb(71,74,83)','rgb(138,143,146)','rgb(218,61,61)',
							'rgb(113,37,86)','rgb(228,108,96)','rgb(185,61,95)','rgb(92,151,180)',
							];
							return colorList[params.dataIndex]
						},
						label : {
							show: true,
							position: 'top',
							formatter: function(c){
								return xround(c.data,1)
							}//'{c}'
						}
					}},
                data:[250444,248301,183815,176891,159505,150783,77066,75318,67930,48582,43560,33237,27007,20133,12902,11205,11107,10335,5296,2927,2133,1903,1019,155,40,8],		
			},
			{
				selectedMode:'single',
                type:'pie',
				selectedMode:'single',
				startAngle:90,
				center : ['82%', 170],
                radius : ['20%', '40%'],
                data:[
					{name:'荧光蹭脏',value:250444},
                    {name:'荧光残缺',value:248301},
                    {name:'荧光断线',value:183815},
                    {name:'墨浅',value:176891},
                    {name:'墨脏',value:159505},
                    {name:'走版',value:150783},
                    {name:'墨浓',value:77066},
                    {name:'荧光走版',value:75318},
                    {name:'荧光墨淡',value:67930},
                    {name:'错号',value:48582},
                    {name:'串色',value:43560},
                    {name:'漏印',value:33237},
                    {name:'水印其他',value:27007},
                    {name:'折角',value:20133},
                    {name:'荧光缺印',value:12902},
                    {name:'整列错号',value:11205},
                    {name:'水印走板',value:11107},
                    {name:'墨点',value:10335},
                    {name:'花白',value:5296},
                    {name:'荧光整列走板',value:2927},
                    {name:'待定',value:2133},
                    {name:'骑码',value:1903},
                    {name:'保险',value:1019},
                    {name:'其他',value:155},
                    {name:'水印未查',value:40},
                    {name:'可疑',value:8}
                ],
				 itemStyle : {					
					emphasis : {
						label : {
							show : true,
							formatter: "{d}%",
							position : 'center',
							textStyle : {
								fontSize : '20',
								fontWeight : 'bold'
							}
						}
					},
					normal:{						
						label : {
							show : true,
							formatter: "{b}({d}%)",
							position : 'outer',
							//textStyle : {
							//	fontSize : '20',
							//	fontWeight : 'bold'
							//}
						},
						labelLine : {
							show : true,
							length : 5
						},
					}
				},
            },
        ]
    },
	QualityByCode9: {		
		title : {
                text: '印码各机台常见缺陷对比',
                subtext: '数据来源：号码质量中心数据库',
				x:'center',
            },
        tooltip : {
            trigger: 'axis',
			axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			},
        },
		legend: {
            x : 'center',
			y : 70,
			data:['墨点','花白','错号','走版','墨浓','墨浅'],	
        },
         toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        xAxis : [
            {
				name:'作废类型',
				axisTick : {show: false},//隐藏标记线,
                type : 'category',
                boundaryGap : true,                
				data:['双色-1#','双色-2#','双色-3#','双色-4#','多功能-1#','多功能-2#','多功能-3#','接线印码机','M81D-1#','M81D-2#','DMJ12-1#','DMJ12-2#'],			   
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: 45,
					margin: 12          
				}
			}
        ],
        yAxis : [
            {
				name:'平均实废条数/万',
                type : 'value',
				position: 'left',
				min:0,
				//max:89,
				scale: true,

				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value} 条',    // Template formatter!               
				},
            }
        ],
        series : [
			  {
				name:'墨点',
                type:'bar',barMaxWidth:80,
				stack: '总量',
                smooth:true,
                itemStyle : {
					normal:{
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},
						
						label : {
							show: false,
							position: 'insideTop',
							formatter: function(c){
								return xround(c.data,1)
							}//'{c}'
						}
					}},
                data:[4.3065,4.6175,16.3063,0.0614,0.4957,0.8805,0.8089,0.2882,1.2725,1.5044,8.1059,6.0896],		
			},
			 {
				name:'花白',
                type:'bar',barMaxWidth:80,
				stack: '总量',
                smooth:true,
                itemStyle : {
					normal:{
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},
						
						label : {
							show: false,
							position: 'insideTop',
							formatter: function(c){
								return xround(c.data,1)
							}//'{c}'
						}
					}},
                data:[1.0566,0.9108,1.3381,0,0.1996,0.3145,0.6091,1.1005,0.6602,0.7959,0.5818,0.774],		
			},
			 {
				name:'错号',
                type:'bar',barMaxWidth:80,
				stack: '总量',
                smooth:true,
                itemStyle : {
					normal:{
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},
						
						label : {
							show: false,
							position: 'insideTop',
							formatter: function(c){
								return xround(c.data,1)
							}//'{c}'
						}
					}},
                data:[0.8795,0.7938,0.3955,0.1835,0.3585,0.3265,0.397,0.2516,2.729,0.6239,1.3643,0.8507],		
			},
			 {
				name:'走版',
                type:'bar',barMaxWidth:80,
				stack: '总量',
                smooth:true,
                itemStyle : {
					normal:{
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},
						
						label : {
							show: false,
							position: 'insideTop',
							formatter: function(c){
								return xround(c.data,1)
							}//'{c}'
						}
					}},
                data:[0.3614,0.522,1.6931,0.1233,0.2257,0.2257,0.2951,0.1517,0.5449,0.4461,2.2639,0.1684],		
			},
			 {
				name:'墨浓',
                type:'bar',barMaxWidth:80,
				stack: '总量',
                smooth:true,
                itemStyle : {
					normal:{
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},
						
						label : {
							show: false,
							position: 'insideTop',
							formatter: function(c){
								return xround(c.data,1)
							}//'{c}'
						}
					}},
                data:[0.0033,0.0142,0.1021,0.1021,0.685,0.8632,1.1804,0.6421,0,0,0,0],		
			},
			 {
				name:'墨浅',
                type:'bar',barMaxWidth:80,
				stack: '总量',
                smooth:true,
                itemStyle : {
					normal:{
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},
						
						label : {
							show: false,
							position: 'insideTop',
							formatter: function(c){
								return xround(c.data,1)
							}//'{c}'
						}
					}},
                data:[0.4139,0.6406,0.0258,0.0258,0.0269,0.0662,0.3021,0.2115,1.5838,1.8688,0.6338,0.9318],		
			}
        ]
    },
	QualityByCode10: {		
		title : {
                text: '印码各机台机检号控系统平均误报条数',
                subtext: '数据来源：号码质量中心数据库',
				x:'center',
            },
        tooltip : {
            trigger: 'axis',
			axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			},
        },
         toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        xAxis : [
            {
				name:'作废类型',
				axisTick : {show: false},//隐藏标记线,
                type : 'category',
                boundaryGap : true,                
				data:['双色-1#','双色-2#','双色-3#','双色-4#','多功能-1#','多功能-2#','多功能-3#','接线印码机','M81D-1#','M81D-2#','DMJ12-1#','DMJ12-2#'],			   
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: 45,
					margin: 12          
				}
			}
        ],
        yAxis : [
            {
				name:'平均误废条数/万',
                type : 'value',
				position: 'left',
				min:0,
				//max:89,
				scale: true,
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value} 条',    // Template formatter!               
				},
            }
        ],
        series : [
			  {
                type:'bar',barMaxWidth:80,
                smooth:true,
                itemStyle : {
					normal:{
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},
						color: function(params) {
							// build a color map as your need.
							var colorList = [
							'rgb(38,185,139)','#998899','rgb(255,127,104)','rgb(148,205,97)','rgb(138,148,184)',		
							'rgb(45,164,168)','rgb(141,74,143)','rgb(67,87,114)','rgb(254,167,67)','rgb(106,117,141)','rgb(207,34,87)',
							'rgb(207,97,80)','rgb(143,167,133)','rgb(71,74,83)','rgb(138,143,146)','rgb(218,61,61)',
							'rgb(113,37,86)','rgb(228,108,96)','rgb(185,61,95)','rgb(92,151,180)',
							];
							return colorList[params.dataIndex]
						},
						label : {
							show: true,
							position: 'insideTop',
							formatter: function(c){
								return xround(c.data,1)
							}//'{c}'
						}
					}},
                data:[67.00 ,74.48 ,244.15 ,55.27 ,19.20 ,39.05 ,115.52 ,52.91 ,161.48 ,176.65 ,222.84 ,121.97],		
			}
        ]
    },
	QualityByCode11: {		
		title : {
                text: '印码机检号控系统误报类型分布(双色机9607T品)',
                subtext: '数据来源：号码质量中心数据库',
				x:'center',
            },
        tooltip : {
            trigger: 'axis',
			axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			},
        },
         toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        xAxis : [
            {
				name:'作废类型',
				axisTick : {show: false},//隐藏标记线,
                type : 'category',
                boundaryGap : true,                
				data:['走版','花白','荧光蹭脏','嵌墨','荧光断线','墨点','荧光墨淡','骑码','荧光缺印','错号','墨脏','水印其他','荧光残缺','保险','串色'],			   
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: 45,
					margin: 12          
				}
			}
        ],
        yAxis : [
            {
				name:'误废条数',
                type : 'value',
				position: 'left',
				min:0,
				//max:89,
				scale: true,

				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value} 条',    // Template formatter!               
				},
            }
        ],
        series : [
			  {
                type:'bar',barMaxWidth:80,
                smooth:true,
                itemStyle : {
					normal:{
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},
						color: function(params) {
							// build a color map as your need.
							var colorList = [
							'rgb(38,185,139)','#998899','rgb(255,127,104)','rgb(148,205,97)','rgb(138,148,184)',		
							'rgb(45,164,168)','rgb(141,74,143)','rgb(67,87,114)','rgb(254,167,67)','rgb(106,117,141)','rgb(207,34,87)',
							'rgb(207,97,80)','rgb(143,167,133)','rgb(71,74,83)','rgb(138,143,146)','rgb(218,61,61)',
							'rgb(113,37,86)','rgb(228,108,96)','rgb(185,61,95)','rgb(92,151,180)',
							];
							return colorList[params.dataIndex]
						},
						label : {
							show: true,
							position: 'top',
							formatter: function(c){
								return xround(c.data,1)
							}//'{c}'
						}
					}},
                data:[280883,111910,71407,70410,36792,36062,33234,29921,21768,16736,14988,9815,8933,6858,5519],		
			},
			{
				selectedMode:'single',
                type:'pie',
				selectedMode:'single',
				startAngle:90,
				center : ['82%', 170],
                radius : ['20%', '40%'],
                data:[
					{name:'走版',value:280883},
					{name:'花白',value:111910},
					{name:'荧光蹭脏',value:71407},
					{name:'嵌墨',value:70410},
					{name:'荧光断线',value:36792},
					{name:'墨点',value:36062},
					{name:'荧光墨淡',value:33234},
					{name:'骑码',value:29921},
					{name:'荧光缺印',value:21768},
					{name:'错号',value:16736},
					{name:'墨脏',value:14988},
					{name:'水印其他',value:9815},
					{name:'荧光残缺',value:8933},
					{name:'保险',value:6858},
					{name:'串色',value:5519},
                ],
				 itemStyle : {					
					emphasis : {
						label : {
							show : true,
							formatter: "{d}%",
							position : 'center',
							textStyle : {
								fontSize : '20',
								fontWeight : 'bold'
							}
						}
					},
					normal:{						
						label : {
							show : true,
							formatter: "{b}({d}%)",
							position : 'outer',
							//textStyle : {
							//	fontSize : '20',
							//	fontWeight : 'bold'
							//}
						},
						labelLine : {
							show : true,
							length : 5
						},
					}
				},
            },
        ]
    },
	QualityByCode12: {		
		title : {
                text: '印码机检号控系统误报类型分布(多功能机)',
                subtext: '数据来源：号码质量中心数据库',
				x:'center',
            },
        tooltip : {
            trigger: 'axis',
			axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			},
        },
         toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        xAxis : [
            {
				name:'作废类型',
				axisTick : {show: false},//隐藏标记线,
                type : 'category',
                boundaryGap : true,                
				data:['墨浅','荧光残缺','墨浓','走版','荧光走版','水印其他','花白','荧光蹭脏','水印走板','错号','荧光断线','墨点','折角','荧光墨淡','串色'],			   
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: 45,
					margin: 12          
				}
			}
        ],
        yAxis : [
            {
				name:'误废条数',
                type : 'value',
				position: 'left',
				min:0,
				//max:89,
				scale: true,

				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value} 条',    // Template formatter!               
				},
            }
        ],
        series : [
			  {
                type:'bar',barMaxWidth:80,
                smooth:true,
                itemStyle : {
					normal:{
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},
						color: function(params) {
							// build a color map as your need.
							var colorList = [
							'rgb(38,185,139)','#998899','rgb(255,127,104)','rgb(148,205,97)','rgb(138,148,184)',		
							'rgb(45,164,168)','rgb(141,74,143)','rgb(67,87,114)','rgb(254,167,67)','rgb(106,117,141)','rgb(207,34,87)',
							'rgb(207,97,80)','rgb(143,167,133)','rgb(71,74,83)','rgb(138,143,146)','rgb(218,61,61)',
							'rgb(113,37,86)','rgb(228,108,96)','rgb(185,61,95)','rgb(92,151,180)',
							];
							return colorList[params.dataIndex]
						},
						label : {
							show: true,
							position: 'top',
							formatter: function(c){
								return xround(c.data,1)
							}//'{c}'
						}
					}},
                data:[100708,90604,74821,72321,36845,26715,26676,23841,18998,17304,13287,8771,7106,6824,4018],		
			},
			{
				selectedMode:'single',
                type:'pie',
				selectedMode:'single',
				startAngle:90,
				center : ['82%', 170],
                radius : ['20%', '40%'],
                data:[
					{name:'墨浅',value:100708},
					{name:'荧光残缺',value:90604},
					{name:'墨浓',value:74821},
					{name:'走版',value:72321},
					{name:'荧光走版',value:36845},
					{name:'水印其他',value:26715},
					{name:'花白',value:26676},
					{name:'荧光蹭脏',value:23841},
					{name:'水印走板',value:18998},
					{name:'错号',value:17304},
					{name:'荧光断线',value:13287},
					{name:'墨点',value:8771},
					{name:'折角',value:7106},
					{name:'荧光墨淡',value:6824},
					{name:'串色',value:4018},
                ],
				 itemStyle : {					
					emphasis : {
						label : {
							show : true,
							formatter: "{d}%",
							position : 'center',
							textStyle : {
								fontSize : '20',
								fontWeight : 'bold'
							}
						}
					},
					normal:{						
						label : {
							show : true,
							formatter: "{b}({d}%)",
							position : 'outer',
							//textStyle : {
							//	fontSize : '20',
							//	fontWeight : 'bold'
							//}
						},
						labelLine : {
							show : true,
							length : 5
						},
					}
				},
            },
        ]
    },
	QualityByCode13: {		
		title : {
                text: '印码机检号控系统误报类型分布(M81D型)',
                subtext: '数据来源：号码质量中心数据库',
				x:'center',
            },
        tooltip : {
            trigger: 'axis',
			axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			},
        },
         toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        xAxis : [
            {
				name:'作废类型',
				axisTick : {show: false},//隐藏标记线,
                type : 'category',
                boundaryGap : true,                
				data:['嵌墨','荧光墨淡','荧光断线','错号','墨点','花白','荧光走版','走版','荧光缺印','荧光蹭脏','墨浅','荧光残缺','串色','骑码','墨脏'],			   
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: 45,
					margin: 12          
				}
			}
        ],
        yAxis : [
            {
				name:'误废条数',
                type : 'value',
				position: 'left',
				min:0,
				//max:89,
				scale: true,

				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value} 条',    // Template formatter!               
				},
            }
        ],
        series : [
			  {
                type:'bar',barMaxWidth:80,
                smooth:true,
                itemStyle : {
					normal:{
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},
						color: function(params) {
							// build a color map as your need.
							var colorList = [
							'rgb(38,185,139)','#998899','rgb(255,127,104)','rgb(148,205,97)','rgb(138,148,184)',		
							'rgb(45,164,168)','rgb(141,74,143)','rgb(67,87,114)','rgb(254,167,67)','rgb(106,117,141)','rgb(207,34,87)',
							'rgb(207,97,80)','rgb(143,167,133)','rgb(71,74,83)','rgb(138,143,146)','rgb(218,61,61)',
							'rgb(113,37,86)','rgb(228,108,96)','rgb(185,61,95)','rgb(92,151,180)',
							];
							return colorList[params.dataIndex]
						},
						label : {
							show: true,
							position: 'top',
							formatter: function(c){
								return xround(c.data,1)
							}//'{c}'
						}
					}},
                data:[38653,35126,26379,11719,11608,11071,8572,8098,6612,4015,3495,2451,336,314,10],		
			},
			{
				selectedMode:'single',
                type:'pie',
				selectedMode:'single',
				startAngle:90,
				center : ['82%', 170],
                radius : ['20%', '40%'],
                data:[
					{name:'嵌墨',value:38653},
					{name:'荧光墨淡',value:35126},
					{name:'荧光断线',value:26379},
					{name:'错号',value:11719},
					{name:'墨点',value:11608},
					{name:'花白',value:11071},
					{name:'荧光走版',value:8572},
					{name:'走版',value:8098},
					{name:'荧光缺印',value:6612},
					{name:'荧光蹭脏',value:4015},
					{name:'墨浅',value:3495},
					{name:'荧光残缺',value:2451},
					{name:'串色',value:336},
					{name:'骑码',value:314},
					{name:'墨脏',value:10},
                ],
				 itemStyle : {					
					emphasis : {
						label : {
							show : true,
							formatter: "{d}%",
							position : 'center',
							textStyle : {
								fontSize : '20',
								fontWeight : 'bold'
							}
						}
					},
					normal:{						
						label : {
							show : true,
							formatter: "{b}({d}%)",
							position : 'outer',
							//textStyle : {
							//	fontSize : '20',
							//	fontWeight : 'bold'
							//}
						},
						labelLine : {
							show : true,
							length : 5
						},
					}
				},
            },
        ]
    },
	QualityByCode14: {		
		title : {
                text: '印码机检号控系统误报类型分布(DMJ12型)',
                subtext: '数据来源：号码质量中心数据库',
				x:'center',
            },
        tooltip : {
            trigger: 'axis',
			axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			},
        },
         toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        xAxis : [
            {
				name:'作废类型',
				axisTick : {show: false},//隐藏标记线,
                type : 'category',
                boundaryGap : true,                
				data:['墨点','荧光缺印','荧光墨淡','错号','花白','荧光走版','荧光残缺','走版','串色','荧光蹭脏','嵌墨','荧光断线','折角','墨浅','保险'],			   
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: 45,
					margin: 12          
				}
			}
        ],
        yAxis : [
            {
				name:'误废条数',
                type : 'value',
				position: 'left',
				min:0,
				//max:89,
				scale: true,

				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value} 条',    // Template formatter!               
				},
            }
        ],
        series : [
			  {
                type:'bar',barMaxWidth:80,
                smooth:true,
                itemStyle : {
					normal:{
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},
						color: function(params) {
							// build a color map as your need.
							var colorList = [
							'rgb(38,185,139)','#998899','rgb(255,127,104)','rgb(148,205,97)','rgb(138,148,184)',		
							'rgb(45,164,168)','rgb(141,74,143)','rgb(67,87,114)','rgb(254,167,67)','rgb(106,117,141)','rgb(207,34,87)',
							'rgb(207,97,80)','rgb(143,167,133)','rgb(71,74,83)','rgb(138,143,146)','rgb(218,61,61)',
							'rgb(113,37,86)','rgb(228,108,96)','rgb(185,61,95)','rgb(92,151,180)',
							];
							return colorList[params.dataIndex]
						},
						label : {
							show: true,
							position: 'top',
							formatter: function(c){
								return xround(c.data,1)
							}//'{c}'
						}
					}},
                data:[57752,33047,32908,6360,5190,3805,2295,1831,1507,1399,1287,1142,364,359,198],		
			},
			{
				selectedMode:'single',
                type:'pie',
				selectedMode:'single',
				startAngle:90,
				center : ['82%', 220],
                radius : ['20%', '40%'],
                data:[
					{name:'墨点',value:57752},
					{name:'荧光缺印',value:33047},
					{name:'荧光墨淡',value:32908},
					{name:'错号',value:6360},
					{name:'花白',value:5190},
					{name:'荧光走版',value:3805},
					{name:'荧光残缺',value:2295},
					{name:'走版',value:1831},
					{name:'串色',value:1507},
					{name:'荧光蹭脏',value:1399},
					{name:'嵌墨',value:1287},
					{name:'荧光断线',value:1142},
					{name:'折角',value:364},
					{name:'墨浅',value:359},
					{name:'保险',value:198},
                ],
				 itemStyle : {					
					emphasis : {
						label : {
							show : true,
							formatter: "{d}%",
							position : 'center',
							textStyle : {
								fontSize : '20',
								fontWeight : 'bold'
							}
						}
					},
					normal:{						
						label : {
							show : true,
							formatter: "{b}({d}%)",
							position : 'outer',
							//textStyle : {
							//	fontSize : '20',
							//	fontWeight : 'bold'
							//}
						},
						labelLine : {
							show : true,
							length : 5
						},
					}
				},
            },
        ]
    },
	QualityByCut: {		
		title : {
                text: '裁切工序各品种平均得分及开数分布',
                subtext: '数据来源：质量综合管理系统数据库',
				x:'center',
            },
        tooltip : {
            trigger: 'axis',
			axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			},
        },
		legend: {
			//orient : 'vertical',
			x : 'center',
			//y : 'bottom',
			y :70,
			data:['9602A','9603A','9604A','9607A']
		},
         toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        xAxis : [
            {
				name:'品种',
				axisTick : {show: false},//隐藏标记线,
                type : 'category',
                boundaryGap : true,                
				data:['9602A','9603A','9604A','9607A'],	   
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: 45,
					margin: 12          
				}
			}
        ],
        yAxis : [
            {
				name:'平均得分',
                type : 'value',
				position: 'left',
				min:5.9,
				//max:89,
				scale: true,
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value} ',    // Template formatter!               
				},
            }
        ],
        series : [
			  {
                type:'bar',barMaxWidth:80,
                smooth:true,
                itemStyle : {
					normal:{
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},
						color: function(params) {
							// build a color map as your need.
							var colorList = [
							'rgb(38,185,139)','#998899','rgb(255,127,104)','rgb(148,205,97)','rgb(138,148,184)',		
							'rgb(45,164,168)','rgb(141,74,143)','rgb(67,87,114)','rgb(254,167,67)','rgb(106,117,141)','rgb(207,34,87)',
							'rgb(207,97,80)','rgb(143,167,133)','rgb(71,74,83)','rgb(138,143,146)','rgb(218,61,61)',
							'rgb(113,37,86)','rgb(228,108,96)','rgb(185,61,95)','rgb(92,151,180)',
							];
							return colorList[params.dataIndex]
						},
						label : {
							show: true,
							position: 'insideTop',
							//'{c}'
						}
					}},
                data:[5.941,5.92,5.924,5.926],		
				markPoint : MPtStyleBoth,
				markLine : MLnStyle,
			},
			{
				name:'统计开数',
				type:'pie',
				tooltip : {
					trigger: 'item',
					formatter: '{a} <br/>{b} : {c} ({d}%)'
				},
				center: ['83%','25%'],
				radius : [0, 50],
				itemStyle :　{
					normal : {
						label : {
							show :true,
							position:'outter',
						},
						labelLine : {
							show : true,
							length : 10
						},
					},
				},
				data:[
					{value:12875, name:'9602A'},
					{value:5833, name:'9603A'},
					{value:11249, name:'9604A'},
					{value:8066, name:'9607A'},
				]
			}
        ]
    },
	QualityByCut2: {		
		title : {
                text: '裁切工序各班组平均得分及开数分布',
                subtext: '数据来源：质量综合管理系统数据库',
				x:'center',
            },
        tooltip : {
            trigger: 'axis',
			axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			},
        },
		legend: {
			//orient : 'vertical',
			x : 'center',
			//y : 'bottom',
			y :60,
			data:['清分机一班','清分机二班','自动线一班','自动线二班','自动线三班','自动线四班']
		},
         toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        xAxis : [
            {
				name:'品种',
				axisTick : {show: false},//隐藏标记线,
                type : 'category',
                boundaryGap : true,                
				data:['清分机一班','清分机二班','自动线一班','自动线二班','自动线三班','自动线四班'], 
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: 45,
					margin: 12          
				}
			}
        ],
        yAxis : [
            {
				name:'平均得分',
                type : 'value',
				position: 'left',
				min:5.9,
				//max:89,
				scale: true,
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value} ',    // Template formatter!               
				},
            }
        ],
        series : [
			  {
                type:'bar',barMaxWidth:80,
                smooth:true,
                itemStyle : {
					normal:{
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},
						color: function(params) {
							// build a color map as your need.
							var colorList = [
							'rgb(38,185,139)','#998899','rgb(255,127,104)','rgb(148,205,97)','rgb(138,148,184)',		
							'rgb(45,164,168)','rgb(141,74,143)','rgb(67,87,114)','rgb(254,167,67)','rgb(106,117,141)','rgb(207,34,87)',
							'rgb(207,97,80)','rgb(143,167,133)','rgb(71,74,83)','rgb(138,143,146)','rgb(218,61,61)',
							'rgb(113,37,86)','rgb(228,108,96)','rgb(185,61,95)','rgb(92,151,180)',
							];
							return colorList[params.dataIndex]
						},
						label : {
							show: true,
							position: 'insideTop',
							//'{c}'
						}
					}},
                data:[5.936,5.933,5.929,5.947,5.916,5.923],		
				markPoint : MPtStyleBoth,
				markLine : MLnStyle,
			},
			{
				name:'统计开数',
				type:'pie',
				tooltip : {
					trigger: 'item',
					formatter: '{a} <br/>{b} : {c} ({d}%)'
				},
				center: ['83%','27%'],
				radius : [0, 50],
				itemStyle :　{
					normal : {
						label : {
							show :true,
							position:'outter',
						},
						labelLine : {
							show : true,
							length : 10
						},
					},
				},
				data:[
					{name:'清分机一班', value:2937},
					{name:'清分机二班', value:3060},
					{name:'自动线一班', value:8650},
					{name:'自动线二班', value:7751},
					{name:'自动线三班', value:6814},
					{name:'自动线四班', value:8811},
				]
			}
        ]
    },
	QualityByCut3: {		
		title : {
                text: '裁切工序各机型平均得分及开数分布',
                subtext: '数据来源：质量综合管理系统数据库',
				x:'center',
            },
        tooltip : {
            trigger: 'axis',
			axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			},
        },
		legend: {
			//orient : 'vertical',
			x : 'center',
			//y : 'bottom',
			y :60,
			data:['裁封-1号','裁封-2号','裁封-3号','裁封-4号','裁封-5号','裁封-6号','裁封-7号','裁封-8号','裁封-9号','裁封-10号','裁切机-1号','裁切机-2号']
		},
         toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        xAxis : [
            {
				name:'品种',
				axisTick : {show: false},//隐藏标记线,
                type : 'category',
                boundaryGap : true,                
				data:['裁封-1号','裁封-2号','裁封-3号','裁封-4号','裁封-5号','裁封-6号','裁封-7号','裁封-8号','裁封-9号','裁封-10号','裁切机-1号','裁切机-2号'], 
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: 45,
					margin: 12          
				}
			}
        ],
        yAxis : [
            {
				name:'平均得分',
                type : 'value',
				position: 'left',
				min:5.85,
				//max:89,
				scale: true,

				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value} ',    // Template formatter!               
				},
            }
        ],
        series : [
			  {
                type:'bar',barMaxWidth:80,
                smooth:true,
                itemStyle : {
					normal:{
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},
						color: function(params) {
							// build a color map as your need.
							var colorList = [
							'rgb(38,185,139)','#998899','rgb(255,127,104)','rgb(148,205,97)','rgb(138,148,184)',		
							'rgb(45,164,168)','rgb(141,74,143)','rgb(67,87,114)','rgb(254,167,67)','rgb(106,117,141)','rgb(207,34,87)',
							'rgb(207,97,80)','rgb(143,167,133)','rgb(71,74,83)','rgb(138,143,146)','rgb(218,61,61)',
							'rgb(113,37,86)','rgb(228,108,96)','rgb(185,61,95)','rgb(92,151,180)',
							];
							return colorList[params.dataIndex]
						},
						label : {
							show: true,
							position: 'insideTop',
							//'{c}'
						}
					}},
                data:[5.956,5.953,5.898,5.945,5.885,5.935,5.929,5.94,5.961,5.901,5.943,5.926],		
				markPoint : MPtStyleBoth,
				markLine : MLnStyle,
			},
			{
				name:'统计开数',
				type:'pie',
				tooltip : {
					trigger: 'item',
					formatter: '{a} <br/>{b} : {c} ({d}%)'
				},
				center: ['93%','29%'],
				radius : [0, 50],
				itemStyle :　{
					normal : {
						label : {
							show :false,
							position:'outter',
						},
						labelLine : {
							show : false,
							length : 10
						},
					},
				},
				data:[
					{name:'裁封-1号',value:575},
					{name:'裁封-2号',value:2058},
					{name:'裁封-3号',value:4447},
					{name:'裁封-4号',value:4491},
					{name:'裁封-5号',value:2532},
					{name:'裁封-6号',value:3697},
					{name:'裁封-7号',value:4458},
					{name:'裁封-8号',value:2353},
					{name:'裁封-9号',value:4454},
					{name:'裁封-10号',value:2961},
					{name:'裁切机-1号',value:3053},
					{name:'裁切机-2号',value:2944},
				]
			}
        ]
    },
	QualityByCut4: {		
		title : {
                text: '裁切工序各机台平均得分及开数分布',
                subtext: '数据来源：质量综合管理系统数据库',
				x:'center',
            },
        tooltip : {
            trigger: 'axis',
			axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			},
        },
		legend: {
			//orient : 'vertical',
			show:false,
			x : 'right',
			//y : 'bottom',
			y :60,
			data:['张登勇','查勇智','王昊','樊明亮','徐健','施剑','赵德升','权翊','谭卫东','侯都','邓小明','彭云建','徐联军','白敏','孟国文','郑海峰','干晔','陈刚','唐礼']
		},
         toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        xAxis : [
            {
				name:'品种',
				axisTick : {show: false},//隐藏标记线,
                type : 'category',
                boundaryGap : true,                
				data:['张登勇','查勇智','王昊','樊明亮','徐健','施剑','赵德升','权翊','谭卫东','侯都','邓小明','彭云建','徐联军','白敏','孟国文','郑海峰','干晔','陈刚','唐礼'], 
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: 45,
					margin: 12          
				}
			}
        ],
        yAxis : [
            {
				name:'平均得分',
                type : 'value',
				position: 'left',
				min:5.85,
				//max:89,
				scale: true,

				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value} ',    // Template formatter!               
				},
            }
        ],
        series : [
			  {
                type:'bar',barMaxWidth:80,
                smooth:true,
                itemStyle : {
					normal:{
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},
						color: function(params) {
							// build a color map as your need.
							var colorList = [
							'rgb(38,185,139)','#998899','rgb(255,127,104)','rgb(148,205,97)','rgb(138,148,184)',		
							'rgb(45,164,168)','rgb(141,74,143)','rgb(67,87,114)','rgb(254,167,67)','rgb(106,117,141)','rgb(207,34,87)',
							'rgb(207,97,80)','rgb(143,167,133)','rgb(71,74,83)','rgb(138,143,146)','rgb(218,61,61)',
							'rgb(113,37,86)','rgb(228,108,96)','rgb(185,61,95)','rgb(92,151,180)',
							];
							return colorList[params.dataIndex]
						},
						label : {
							show: true,
							position: 'insideTop',
							//'{c}'
						}
					}},
                data:[5.954,5.953,5.948,5.947,5.946,5.945,5.942,5.942,5.94,5.94,5.933,5.931,5.927,5.925,5.916,5.912,5.905,5.892,5.883],	
				markPoint : MPtStyleBoth,
				markLine : MLnStyle,
			},
			{
				name:'统计开数',
				type:'pie',
				tooltip : {
					trigger: 'item',
					formatter: '{a} <br/>{b} : {c} ({d}%)'
				},
				center: ['88%','27%'],
				radius : [0, 50],
				itemStyle :　{
					normal : {
						label : {
							show :true,
							position:'outter',
						},
						labelLine : {
							show : true,
							length : 15
						},
					},
				},
				data:[
					{name:'张登勇',value:2270},
					{name:'查勇智',value:2190},
					{name:'王昊',value:2224},
					{name:'樊明亮',value:1782},
					{name:'徐健',value:1530},
					{name:'施剑',value:1516},
					{name:'赵德升',value:2301},
					{name:'权翊',value:2232},
					{name:'谭卫东',value:1523},
					{name:'侯都',value:2047},
					{name:'邓小明',value:2265},
					{name:'彭云建',value:1928},
					{name:'徐联军',value:1389},
					{name:'白敏',value:1555},
					{name:'孟国文',value:2239},
					{name:'郑海峰',value:2215},
					{name:'干晔',value:2255},
					{name:'陈刚',value:2290},
					{name:'唐礼',value:2256},
				]
			}
        ]
    },
	QualityByCut5: {		
		title : {
                text: '裁切工序各机型不同品种平均得分情况',
                subtext: '数据来源：质量综合管理系统数据库',
				x:'center',
            },
        tooltip : {
            trigger: 'axis',
			axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			},
        },
		legend: {
			orient : 'vertical',
			//show:false,
			x : 'right',
			//y : 'bottom',
			y :'center',
			itemGap:30,
			data:['9602A','9603A','9604A','9607A']
		},
         toolbox: {
            show : true,
            feature : {
                mark : {show: true},
				//dataZoom : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
		dataZoom : {
            show : true,
            realtime: true,
            start : 0,
            end :33,
			//height:20,
        },
        calculable : true,
        xAxis : [
            {
				name:'品种',
				axisTick : {show: false},//隐藏标记线,
                type : 'category',
                boundaryGap : true,                
				data:['裁封-1号','裁封-2号','裁封-3号','裁封-4号','裁封-5号','裁封-6号','裁封-7号','裁封-8号','裁封-9号','裁封-10号','裁切机-1号','裁切机-2号'], 
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: 45,
					margin: 12          
				}
			}
        ],
        yAxis : [
            {
				name:'平均得分',
                type : 'value',
				position: 'left',
				min:5.75,
				//max:89,
				scale: true,
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value} ',    // Template formatter!               
				},
            }
        ],
        series : [			 
			{
				name:'9602A',
				type:'bar',barMaxWidth:80,
				smooth:true,
                itemStyle : {
					normal:{
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},						
						label : {
							show: true,
							position: 'top',
							//'{c}'
						}
					}},
				data:['-','-','-','-','-',5.935,5.929,'-',5.961,'-',5.884,5.925],
			},
			{
				name:'9603A',
				type:'bar',barMaxWidth:80,
				smooth:true,
                itemStyle : {
					normal:{
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},						
						label : {
							show: true,
							position: 'top',
							//'{c}'
						}
					}},
				data:['-','-','-','-',5.885,'-','-',5.942,'-',5.949,5.947,5.933],
			},
			{
				name:'9604A',
				type:'bar',barMaxWidth:80,
				smooth:true,
                itemStyle : {
					normal:{
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},						
						label : {
							show: true,
							position: 'top',
							//'{c}'
						}
					}},
				data:['-','-',5.898,5.945,'-','-','-',5.94,'-','-',5.92,5.884],
			},
			{
				name:'9607A',
				type:'bar',barMaxWidth:80,
				smooth:true,
                itemStyle : {
					normal:{
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},						
						label : {
							show: true,
							position: 'top',
							//'{c}'
						}
					}},
				data:[5.956,5.953,'-','-','-','-','-','-','-',5.802,5.947,5.926],
			},
        ]
    },
	QualityByCut6: {		
		title : {
                text: '裁切工序各机型不同机长平均得分情况',
                subtext: '数据来源：质量综合管理系统数据库',
				x:'center',
            },
        tooltip : {
            trigger: 'axis',
			axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			},
        },
		legend: {
			orient : 'vertical',
			//show:false,
			x : 'right',
			//y : 'bottom',
			y :'center',
			itemGap:12,
			data:['裁封-1号','裁封-2号','裁封-3号','裁封-4号','裁封-5号','裁封-6号','裁封-7号','裁封-8号','裁封-9号','裁封-10号','裁切机-1号','裁切机-2号'], 
		},
         toolbox: {
            show : true,
            feature : {
                mark : {show: true},
				//dataZoom : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
		dataZoom : {
            show : true,
            realtime: true,
            start : 0,
            end :33,
			//height:20,
        },
        calculable : true,
        xAxis : [
            {
				name:'品种',
				axisTick : {show: false},//隐藏标记线,
                type : 'category',
                boundaryGap : true,                
				data:['白敏','查勇智','陈刚','邓小明','樊明亮','干晔','侯都','孟国文','彭云建','权翊','施剑','谭卫东','唐礼','王昊','徐健','徐联军','张登勇','赵德升','郑海峰'], 
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: 45,
					margin: 12          
				}
			}
        ],
        yAxis : [
            {
				name:'平均得分',
                type : 'value',
				position: 'left',
				//min:5.65,
				//max:89,
				scale: true,
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value} ',    // Template formatter!               
				},
            }
        ],
        series : [			 
			{
				name:'裁封-1号',
				type:'bar',barMaxWidth:80,
				smooth:true,
				data:['-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-','-',5.955]
			},
			{
				name:'裁封-2号',
				type:'bar',barMaxWidth:80,
				smooth:true,
				data:['-','-','-','-','-','-',5.943,'-',5.982,'-','-','-','-','-','-','-','-','-',5.951]
			},
			{
				name:'裁封-3号',
				type:'bar',barMaxWidth:80,
				smooth:true,
				data:['-','-',5.905,'-','-',5.89,'-','-','-','-','-','-','-','-','-','-','-','-','-']
			},
			{
				name:'裁封-4号',
				type:'bar',barMaxWidth:80,
				smooth:true,
				data:['-','-','-','-','-','-','-','-','-','-','-','-','-',5.948,'-','-','-',5.942,'-']
			},
			{
				name:'裁封-5号',
				type:'bar',barMaxWidth:80,
				smooth:true,
				data:['-','-','-','-',5.905,'-',5.943,'-','-','-',5.95,'-',5.707,'-','-','-','-','-',5.719]
			},
			{
				name:'裁封-6号',
				type:'bar',barMaxWidth:80,
				smooth:true,
				data:['-','-','-',5.932,'-','-',5.938,'-','-','-','-','-',5.952,'-','-','-','-','-',5.955]
			},
			{
				name:'裁封-7号',
				type:'bar',barMaxWidth:80,
				smooth:true,
				data:['-','-','-','-','-','-','-',5.916,'-',5.942,'-','-','-','-','-','-','-','-','-']
			},
			{
				name:'裁封-8号',
				type:'bar',barMaxWidth:80,
				smooth:true,
				data:['-',5.94,'-','-','-','-','-','-','-','-',5.909,'-',5.943,'-','-','-','-','-',5.949]
			},
			{
				name:'裁封-9号',
				type:'bar',barMaxWidth:80,
				smooth:true,
				data:['-',5.963,'-','-',5.975,'-','-','-','-','-','-','-','-','-','-','-',5.954,'-','-']
			},
			{
				name:'裁封-10号',
				type:'bar',barMaxWidth:80,
				smooth:true,
				data:['-','-','-',5.956,'-','-','-','-',5.881,'-',5.943,'-',5.888,'-','-','-','-','-','-']
			},
			{
				name:'裁切机-1号',
				type:'bar',barMaxWidth:80,
				smooth:true,
				data:['-','-','-','-','-','-','-','-','-','-','-',5.94,'-','-',5.946,'-','-','-','-']
			},
			{
				name:'裁切机-2号',
				type:'bar',barMaxWidth:80,
				smooth:true,
				data:[5.925,'-','-','-','-','-','-','-','-','-','-','-','-','-','-',5.927,'-','-','-']
			},
        ]
    },
	QualityByCut7: {		
		title : {
                text: '裁切工序各品种不同机长平均得分情况',
                subtext: '数据来源：质量综合管理系统数据库',
				x:'center',
            },
        tooltip : {
            trigger: 'axis',
			axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			},
        },
		legend: {
			orient : 'vertical',
			//show:false,
			x : 'right',
			//y : 'bottom',
			y :'center',
			itemGap:30,
			data:['9602A','9603A','9604A','9607A']
		},
         toolbox: {
            show : true,
            feature : {
                mark : {show: true},
				//dataZoom : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
		dataZoom : {
            show : true,
            realtime: true,
            start : 0,
            end :33,
			//height:20,
        },
        calculable : true,
        xAxis : [
            {
				name:'品种',
				axisTick : {show: false},//隐藏标记线,
                type : 'category',
                boundaryGap : true,                
				data:['白敏','查勇智','陈刚','邓小明','樊明亮','干晔','侯都','孟国文','彭云建','权翊','施剑','谭卫东','唐礼','王昊','徐健','徐联军','张登勇','赵德升','郑海峰'], 
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: 45,
					margin: 12          
				}
			}
        ],
        yAxis : [
            {
				name:'平均得分',
                type : 'value',
				position: 'left',
				//min:5.65,
				//max:89,
				scale: true,
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value} ',    // Template formatter!               
				},
            }
        ],
        series : [			 
			{
				name:'9602A',
				type:'bar',barMaxWidth:80,
				smooth:true,
                itemStyle : {
					normal:{
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},						
						label : {
							show: true,
							position: 'top',
							//'{c}'
						}
					}},
				data:['-',5.963,'-',5.932,5.975,'-',5.938,5.916,'-',5.941,'-','-',5.952,'-','-','-',5.954,'-',5.955]
			},
			{
				name:'9603A',
				type:'bar',barMaxWidth:80,
				smooth:true,
                itemStyle : {
					normal:{
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},						
						label : {
							show: true,
							position: 'top',
							//'{c}'
						}
					}},
				data:[5.92,5.957,'-',5.956,5.914,'-',5.943,'-',5.963,'-',5.948,5.95,5.918,'-',5.945,5.947,'-','-',5.719]
			},
			{
				name:'9604A',
				type:'bar',barMaxWidth:80,
				smooth:true,
                itemStyle : {
					normal:{
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},						
						label : {
							show: true,
							position: 'top',
							//'{c}'
						}
					}},
				data:['-',5.939,5.892,'-','-',5.905,'-','-','-','-',5.909,'-','-',5.948,'-','-','-',5.942,5.949]
			},
			{
				name:'9607A',
				type:'bar',barMaxWidth:80,
				smooth:true,
                itemStyle : {
					normal:{
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},						
						label : {
							show: true,
							position: 'top',
							//'{c}'
						}
					}},
				data:[5.928,'-','-','-','-','-',5.943,'-',5.928,'-','-',5.942,5.743,'-',5.953,5.924,'-','-',5.963]
			},
        ]
    },
	QualityByExtract: {		
		title : {
                text: '防伪指标检测抽检开位分布',
                subtext: '数据来源：质量综合管理系统数据库',
				x:'center',
            },
        tooltip : {
            trigger: 'axis',
			axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			},
        },
		legend: {
			//orient : 'vertical',
			//show:false,
			x : 'center',
			//y : 'bottom',
			y : 60,
			itemGap:30,
			data:['9602A','9603A','9604A','9607A']
		},
         toolbox: {
            show : true,
            feature : {
                mark : {show: true},
				//dataZoom : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
		dataZoom : {
            show : true,
            realtime: true,
            start : 0,
            end :100,
			//height:20,
        },
        calculable : true,
        xAxis : [
            {
				name:'开位',
				axisTick : {show: false},//隐藏标记线,
                type : 'category',
                boundaryGap : true,                
				data : (
					function (){
						var res = [];
						for(var i=1;i<41;i++) {
							res.push(i);
						}
						return res;
				})(),
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: 45,
					margin: 12          
				}
			}
        ],
        yAxis : [
            {
				name:'抽检开数',
                type : 'value',
				position: 'left',
				min:5.75,
				//max:89,
				scale: true,

				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value} ',    // Template formatter!               
				},
            }
        ],
        series : [			 
			{
				name:'9602A',
				type:'bar',barMaxWidth:80,
				smooth:true,
				symbolSize: 6,
                itemStyle : {
					normal:{
						lineStyle: {
							width: 5,
							shadowOffsetX: 3,
							shadowOffsetY: 3
						},
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},						
						label : {
							show: false,
							position: 'top',
							//'{c}'
						}
					}},
				data:[178,162,189,228,208,245,276,265,326,367,353,389,351,372,233,507,157,497,425,380,348,394,403,470,284,408,404,405,421,370,365,389,180,247,262,243,212,228,238,173],
				markPoint : MPtStyleBoth,
				markLine : MLnStyle,
			},
			{
				name:'9603A',
				type:'bar',barMaxWidth:80,
				smooth:true,
				symbolSize: 6,
                itemStyle : {
					normal:{
						lineStyle: {
							width: 5,
							shadowOffsetX: 3,
							shadowOffsetY: 3
						},
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},						
						label : {
							show: false,
							position: 'top',
							//'{c}'
						}
					}},
				data:[214,70,84,111,127,114,75,79,145,154,170,246,191,169,106,149,79,189,273,169,160,168,111,140,82,135,269,179,120,138,138,110,72,70,67,103,54,47,36,68],
				markPoint : MPtStyleBoth,
				markLine : MLnStyle,
			},
			{
				name:'9604A',
				type:'bar',barMaxWidth:80,
				smooth:true,
                symbolSize: 6,
                itemStyle : {
					normal:{
						lineStyle: {
							width: 5,
							shadowOffsetX: 3,
							shadowOffsetY: 3
						},
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},						
						label : {
							show: false,
							position: 'top',
							//'{c}'
						}
					}},
				data:[90,154,193,253,258,236,119,200,332,410,457,469,309,298,88,439,696,696,624,293,210,225,420,508,522,485,316,292,83,255,245,256,233,190,122,'-','-','-','-','-'],
				markPoint : MPtStyleBoth,
				markLine : MLnStyle,
			},
			{
				name:'9607A',
				type:'bar',barMaxWidth:80,
				smooth:true,
                symbolSize: 6,
                itemStyle : {
					normal:{
						lineStyle: {
							width: 5,
							shadowOffsetX: 3,
							shadowOffsetY: 3
						},
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},						
						label : {
							show: false,
							position: 'top',
							//'{c}'
						}
					}},
				data:[127,122,134,140,149,118,117,160,171,198,237,218,196,200,104,214,202,250,245,199,173,113,165,234,204,217,156,148,95,121,127,130,123,99,114,'-','-','-','-'],
				markPoint : MPtStyleBoth,
				markLine : MLnStyle,
			},
        ]
    },
	
	QualityByExtract2: {		
		title : {
                text: '防伪指标检测抽检列数分布',
                subtext: '数据来源：质量综合管理系统数据库',
				x:'center',
            },
        tooltip : {
            trigger: 'axis',
			axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			},
        },
		legend: {
			//orient : 'vertical',
			//show:false,
			x : 'center',
			//y : 'bottom',
			y : 60,
			itemGap:30,
			data:['9602A','9603A','9604A','9607A']
		},
         toolbox: {
            show : true,
            feature : {
                mark : {show: true},
				//dataZoom : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
		/*dataZoom : {
            show : true,
            realtime: true,
            start : 0,
            end :100,
			//height:20,
        },*/
        calculable : true,
        xAxis : [
            {
				name:'列数',
				axisTick : {show: false},//隐藏标记线,
                type : 'category',
                boundaryGap : true,                
				data : (
					function (){
						var res = [];
						for(var i=1;i<6;i++) {
							res.push('第'+i+'列');
						}
						return res;
				})(),
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: 45,
					margin: 12          
				}
			}
        ],
        yAxis : [
            {
				name:'抽检开数',
                type : 'value',
				position: 'left',
				min:5.75,
				//max:89,
				scale: true,
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value} ',    // Template formatter!               
				},
            }
        ],
        series : [			 
			{
				name:'9602A',
				type:'bar',barMaxWidth:80,
				smooth:true,
				symbolSize: 6,
                itemStyle : {
					normal:{
						lineStyle: {
							width: 5,
							shadowOffsetX: 3,
							shadowOffsetY: 3
						},
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},						
						label : {
							show: false,
							position: 'top',
							//'{c}'
						}
					}},
				data:[1751,2898,3074,3046,1783],
				//markPoint : MPtStyleBoth,
				//markLine : MLnStyle,
			},		
			{
				name:'9603A',
				type:'bar',barMaxWidth:80,
				smooth:true,
				symbolSize: 6,
                itemStyle : {
					normal:{
						lineStyle: {
							width: 5,
							shadowOffsetX: 3,
							shadowOffsetY: 3
						},
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},						
						label : {
							show: false,
							position: 'top',
							//'{c}'
						}
					}},
				data:[874,1330,1289,1171,517],
				//markPoint : MPtStyleBoth,
				//markLine : MLnStyle,
			},
			{
				name:'9604A',
				type:'bar',barMaxWidth:80,
				smooth:true,
                symbolSize: 6,
                itemStyle : {
					normal:{
						lineStyle: {
							width: 5,
							shadowOffsetX: 3,
							shadowOffsetY: 3
						},
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},						
						label : {
							show: false,
							position: 'top',
							//'{c}'
						}
					}},
				data:[1303,2475,3046,2768,1384],
				//markPoint : MPtStyleBoth,
				//markLine : MLnStyle,
			},
			{
				name:'9607A',
				type:'bar',barMaxWidth:80,
				smooth:true,
                symbolSize: 6,
                itemStyle : {
					normal:{
						lineStyle: {
							width: 5,
							shadowOffsetX: 3,
							shadowOffsetY: 3
						},
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},						
						label : {
							show: false,
							position: 'top',
							//'{c}'
						}
					}},
				data:[907,1380,1387,1237,809],
				//markPoint : MPtStyleBoth,
				//markLine : MLnStyle,
			},
        ]
    },
	QualityByExtract3: {		
		title : {
                text: '防伪指标检测抽检千位分布',
                subtext: '数据来源：质量综合管理系统数据库',
				x:'center',
            },
        tooltip : {
            trigger: 'axis',
			axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			},
        },
		legend: {
			//orient : 'vertical',
			//show:false,
			x : 'center',
			//y : 'bottom',
			y : 60,
			itemGap:30,
			data:['9602A','9603A','9604A','9607A']
		},
         toolbox: {
            show : true,
            feature : {
                mark : {show: true},
				//dataZoom : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
		/*dataZoom : {
            show : true,
            realtime: true,
            start : 0,
            end :100,
			//height:20,
        },*/
        calculable : true,
        xAxis : [
            {
				name:'千位',
				axisTick : {show: false},//隐藏标记线,
                type : 'category',
                boundaryGap : true,                
				data : (
					function (){
						var res = [];
						for(var i=0;i<10;i++) {
							res.push(i);
						}
						return res;
				})(),
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: 45,
					margin: 12          
				}
			}
        ],
        yAxis : [
            {
				name:'抽检开数',
                type : 'value',
				position: 'left',
				min:5.75,
				//max:89,
				scale: true,
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value} ',    // Template formatter!               
				},
            }
        ],
        series : [			 
			{
				name:'9602A',
				type:'bar',barMaxWidth:80,
				smooth:true,
				symbolSize: 6,
                itemStyle : {
					normal:{
						lineStyle: {
							width: 5,
							shadowOffsetX: 3,
							shadowOffsetY: 3
						},
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},						
						label : {
							show: false,
							position: 'top',
							//'{c}'
						}
					}},
				data:[3468,1651,1330,984,659,1252,1278,1001,695,499],
				//markPoint : MPtStyleBoth,
				//markLine : MLnStyle,
			},
			{
				name:'9603A',
				type:'bar',barMaxWidth:80,
				smooth:true,
				symbolSize: 6,
                itemStyle : {
					normal:{
						lineStyle: {
							width: 5,
							shadowOffsetX: 3,
							shadowOffsetY: 3
						},
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},						
						label : {
							show: false,
							position: 'top',
							//'{c}'
						}
					}},
				data:[1861,657,438,378,261,460,403,353,296,221],
				//markPoint : MPtStyleBoth,
				//markLine : MLnStyle,
			},
			{
				name:'9604A',
				type:'bar',barMaxWidth:80,
				smooth:true,
                symbolSize: 6,
                itemStyle : {
					normal:{
						lineStyle: {
							width: 5,
							shadowOffsetX: 3,
							shadowOffsetY: 3
						},
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},						
						label : {
							show: false,
							position: 'top',
							//'{c}'
						}
					}},
				data:[2856,1441,1181,935,710,1111,997,813,663,454],
				//markPoint : MPtStyleBoth,
				//markLine : MLnStyle,
			},
			{
				name:'9607A',
				type:'bar',barMaxWidth:80,
				smooth:true,
                symbolSize: 6,
                itemStyle : {
					normal:{
						lineStyle: {
							width: 5,
							shadowOffsetX: 3,
							shadowOffsetY: 3
						},
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},						
						label : {
							show: false,
							position: 'top',
							//'{c}'
						}
					}},
				data:[1516,1004,699,537,458,634,526,403,373,283],
				//markPoint : MPtStyleBoth,
				//markLine : MLnStyle,
			},
        ]
    },
	QualityByExtract4: {		
		title : {
                text: '防伪指标检测抽检上下5千分布',
                subtext: '数据来源：质量综合管理系统数据库',
				x:'center',
            },
        tooltip : {
            trigger: 'axis',
			axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			},
        },
		legend: {
			//orient : 'vertical',
			//show:false,
			x : 'center',
			//y : 'bottom',
			y : 60,
			itemGap:30,
			data : ['上5千','下5千'],			
		},
         toolbox: {
            show : true,
            feature : {
                mark : {show: true},
				//dataZoom : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
		/*dataZoom : {
            show : true,
            realtime: true,
            start : 0,
            end :100,
			//height:20,
        },*/
        calculable : true,
        yAxis : [
            {
				name:'千位',
				axisTick : {show: false},//隐藏标记线,
				axisLine: {show: false},
                type : 'category',
                boundaryGap : true,                
				data:['9602A','9603A','9604A','9607A'],
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: 45,
					margin: 12          
				}
			}
        ],
        xAxis : [
            {
				name:'抽检开数',
                type : 'value',
				position: 'left',
				min:5.75,
				//max:89,
				scale: true,
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value} ',    // Template formatter!               
				},
            }
        ],
        series : [			 
			{
				name:'上5千',
				type:'bar',barMaxWidth:80,
				smooth:true,
				symbolSize: 6,
                itemStyle : {
					normal:{
						lineStyle: {
							width: 5,
							shadowOffsetX: 3,
							shadowOffsetY: 3
						},
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},						
						label : {
							show: true,
							position: 'insideRight',
							//'{c}'
						}
					}},
				stack: '总量',
				data:[8092,3595,7123,4214],
				//markPoint : MPtStyleBoth,
				//markLine : MLnStyle,
			},
			{
				name:'下5千',
				type:'bar',barMaxWidth:80,
				smooth:true,
				symbolSize: 6,
                itemStyle : {
					normal:{
						lineStyle: {
							width: 5,
							shadowOffsetX: 3,
							shadowOffsetY: 3
						},
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},						
						label : {
							show: true,
							position: 'insideRight',
						}
					}},
				stack: '总量',
				data:[4725,1733,4038,2219],
				//markPoint : MPtStyleBoth,
				//markLine : MLnStyle,
			},
			/*{
				type : 'pie',
				center : ['90%', '40%'],
				radius : [20,40],
				startAngle: -45,
				clockWise:false,
				data : [
					{name:'下5千', value:4725, itemStyle : labelHide},
					{
						name:'上5千', 
						value:8092,
						itemStyle : {
							normal : {
								label : {
									show : false,								
								},
								color:'rgb(123,195,119)',
								labelLine : {
									show : false
								}
							},
							emphasis : {
								color: 'rgba(0,0,0,0)'
							}
						}
					}
				]
			},
			{
				type : 'pie',
				center : ['90%', '40%'],
				radius : [40,60],
				startAngle: -45,
				clockWise:false,
				data : [
					{name:'下5千', value:1733, itemStyle : labelHide},
					{
						name:'上5千', 
						value:3595,
						itemStyle : {
							normal : {
								label : {
									show : false,
									position : 'center',
									formatter : '{b}',
									textStyle: {
										fontSize : '20',
										baseline : 'top'
									}
								},
								color: 'rgb(144,101,171)',
								labelLine : {
									show : false
								}
							}
						}
					
					}
				]
			},
			{
				type : 'pie',
				center : ['90%', '40%'],
				radius : [60,80],
				startAngle: -45,
				clockWise:false,
				data : [
					{name:'下5千', value:4038, itemStyle : labelHide},
					{
						name:'上5千',
						value:7123,
						itemStyle : {
							normal : {
								label : {
									show : false,
									position : 'center',
									formatter : '{b}',
									textStyle: {
										fontSize : '20',
										baseline : 'top'
									}
								},
								color: '#55c1e8',
								labelLine : {
									show : false
								}
							}
						}
					}
				]
			},
			{
				type : 'pie',
				center : ['90%', '40%'],
				radius : [80,100],
				startAngle: -45,
				clockWise:false,				
				data : [
					{	name:'下5千',value:2219,  itemStyle : labelHide},
					{
						name:'上5千', 
						value:4214,
						itemStyle : {
							normal : {
								label : {
									show : false,//true,
									position : 'center',
									formatter : '{b}',
									textStyle: {
										fontSize : '10',
										baseline : 'top',
									}
								},
								color: '#ec8171',
								labelLine : {
									show : false
								}
							}
						}
					}
				]
			}*/
        ]
    },
	QualityByExtract5: {		
		title : {
                text: '防伪指标检测抽检上下5千分布',
                subtext: '数据来源：质量综合管理系统数据库',
				x:'center',
            },
        tooltip : {
            trigger: 'axis',
			axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			},
        },
		legend: {
			//orient : 'vertical',
			//show:false,
			x : 'center',
			//y : 'bottom',
			y : 60,
			itemGap:30,
			data : ['上5千','下5千'],			
		},
         toolbox: {
            show : true,
            feature : {
                mark : {show: true},
				//dataZoom : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
		/*dataZoom : {
            show : true,
            realtime: true,
            start : 0,
            end :100,
			//height:20,
        },*/
        calculable : true,
        yAxis : [
            {
				name:'千位',
				axisTick : {show: false},//隐藏标记线,
				axisLine: {show: false},
                type : 'category',
                boundaryGap : true,                
				data:['9602A','9603A','9604A','9607A'],
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: 45,
					margin: 12          
				}
			}
        ],
        xAxis : [
            {
				name:'抽检比例',
                type : 'value',
				position: 'left',
				min:0,
				max:100,
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value}% ',    // Template formatter!               
				},
            }
        ],
        series : [			 
			{
				name:'上5千',
				type:'bar',barMaxWidth:60,
				smooth:true,
				symbolSize: 6,
                itemStyle : {
					normal:{
						lineStyle: {
							width: 5,
							shadowOffsetX: 3,
							shadowOffsetY: 3
						},
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},						
						label : {
							show: true,
							position: 'insideRight',
							formatter : '{c}%',
							//'{c}'
						}
					}},
					markLine : {
				
					data : [
						[
							{name: '平均值', value: 50, x: '50%', y: '88%'}, 
							{name: '', x: '50%', y: 75}
						],
					]
				},
				stack: '总量',
				data:[63.13,67.47,63.82,65.51],
				//markPoint : MPtStyleBoth,
				//markLine : MLnStyle,
			},
			{
				name:'下5千',
				type:'bar',barMaxWidth:60,
				smooth:true,
				symbolSize: 6,
                itemStyle : {
					normal:{
						lineStyle: {
							width: 5,
							shadowOffsetX: 3,
							shadowOffsetY: 3
						},
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},						
						label : {
							show: true,
							position: 'insideRight',
							formatter : '{c}%',
						}
					}},
				stack: '总量',
				data:[36.87,32.53,36.18,34.49],
				//markPoint : MPtStyleBoth,
				//markLine : MLnStyle,
			}
        ]
    },
	QualityByExtract6: {		
		title : {
                text: '防伪指标检测抽检上下5千分布',
                subtext: '数据来源：质量综合管理系统数据库',
				x:'center',
            },
        legend: {
			x : 'center',
			y : 60,
			data:['上5千','下5千']
		},
		toolbox: {
			show : true,
			feature : {
				dataView : {show: true, readOnly: false}, dataZoom : {show: true},
				restore : {show: true},
				saveAsImage : {show: true}
			}
		},
		series : [
			{
				type : 'pie',
				center : ['15%', '50%'],
				radius : radius,
				itemStyle : 
				{
					normal : {
						color: '#ccc',
						label : {
							formatter : function (a,b,c){return  xround(8092*100/(8092+4725),2) + '%\n9602A'},//用四舍五入解决浮点的问题
							textStyle: {
								//baseline : 'bottom',
								fontSize: 25,
								fontWeight: 'normal',//'bolder', 不加粗
								color: 'rgb(123,195,119)'          // 主标题文字颜色
							}
						}
					}
				},//labelFromatter,
				data : [
					{name:'下5千', value:4725, itemStyle : labelBottom},
					{
						name:'上5千', 
						value:8092,
						itemStyle : {
							normal : {
								label : {
									show : false,//true,
									position : 'center',
									formatter : '{b}',
									textStyle: {
										fontSize : '20',
										baseline : 'top'
									}
								},
								color:'rgb(123,195,119)',
								labelLine : {
									show : false
								}
							}
						}
					}
				]
			},
			{
				type : 'pie',
				center : ['38.3%', '50%'],
				radius : radius,
				itemStyle : 
				{
					normal : {
						color: '#ccc',
						label : {
							formatter : function (a,b,c){return xround(3595*100/(3595+1733),2) + '%\n9603A'},//用四舍五入解决浮点的问题
							textStyle: {
								//baseline : 'bottom',
								fontSize: 25,
								fontWeight: 'normal',//'bolder', 不加粗
								color: 'rgb(144,101,171)'          // 主标题文字颜色
							}
						}
					}
				},//labelFromatter,
				data : [
					{name:'下5千', value:1733, itemStyle : labelBottom},
					{
						name:'上5千', 
						value:3595,
						itemStyle : {
							normal : {
								label : {
									show : false,
									position : 'center',
									formatter : '{b}',
									textStyle: {
										fontSize : '20',
										baseline : 'top'
									}
								},
								color: 'rgb(144,101,171)',
								labelLine : {
									show : false
								}
							}
						}
					
					}
				]
			},
			{
				type : 'pie',
				center : ['61.6%', '50%'],
				radius : radius,
				itemStyle : 
				{
					normal : {
						color: '#ccc',
						label : {
							formatter : function (a,b,c){return xround(7123*100/(7123+4038),2) + '%\n9604A'},//用四舍五入解决浮点的问题
							textStyle: {
								//baseline : 'bottom',
								fontSize: 25,
								fontWeight: 'normal',//'bolder', 不加粗
								color: '#01a99c'          // 主标题文字颜色
							}
						}
					}
				},//labelFromatter,
				data : [
					{name:'下5千', value:4038, itemStyle : labelBottom},
					{
						name:'上5千',
						value:7123,
						itemStyle : {
							normal : {
								label : {
									show : false,
									position : 'center',
									formatter : '{b}',
									textStyle: {
										fontSize : '20',
										baseline : 'top'
									}
								},
								color: '#55c1e8',
								labelLine : {
									show : false
								}
							}
						}
					}
				]
			},
			{
				type : 'pie',
				center : ['85%', '50%'],
				radius : radius,
				itemStyle : 
				{
					normal : {
						color: '#ccc',
						label : {
							formatter : function (a,b,c){return xround(4214*100/(4214+2219),2) + '%\n9607A'},//用四舍五入解决浮点的问题
							textStyle: {
								//baseline : 'bottom',
								fontSize: 25,
								fontWeight: 'normal',//'bolder', 不加粗
								color: '#ec8171',         // 主标题文字颜色
							}
						}
					}
				},//labelFromatter,
				data : [
					{name:'下5千', value:2219, itemStyle : labelBottom},
					{
						name:'上5千', 
						value:4214,
						itemStyle : {
							normal : {
								label : {
									show : false,//true,
									position : 'center',
									formatter : '{b}',
									textStyle: {
										fontSize : '10',
										baseline : 'top',
									}
								},
								color: '#ec8171',
								labelLine : {
									show : false
								}
							}
						}
					}
				]
			}
		]
    },
	QualityByExtract7: {		
		title : {
                text: '各抽检列单开分析仪平均得分情况',
                subtext: '数据来源：质量综合管理系统数据库',
				x:'center',
            },
        tooltip : {
            trigger: 'axis',
			axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
			},
        },
		legend: {
			orient : 'vertical',
			//show:false,
			x : 'right',
			//y : 'bottom',
			y : '30%',
			itemGap:45,
			data:['9602A','9603A','9604A','9607A','平均']
		},
         toolbox: {
            show : true,
            feature : {
                mark : {show: true},
				//dataZoom : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
		/*dataZoom : {
            show : true,
            realtime: true,
            start : 0,
            end :100,
			//height:20,
        },*/
        calculable : true,
        xAxis : [
            {
				name:'列数',
				axisTick : {show: false},//隐藏标记线,
                type : 'category',
                boundaryGap : true,                
				data : (
					function (){
						var res = [];
						for(var i=1;i<6;i++) {
							res.push('第'+i+'列');
						}
						return res;
				})(),
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: 45,
					margin: 12          
				}
			}
        ],
        yAxis : [            
			{
				name:'平均得分',
                type : 'value',
				position: 'left',
				min:87,
				max:92,
				//scale: true,	
				axisLine:{show:false},
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value} ',    // Template formatter!               
				},
            }
        ],
        series : [			 
			{
				name:'9602A',			
				type:'line',barMaxWidth:80,
				smooth:true,
				symbolSize: 6,
                /*itemStyle : {
					normal:{
						lineStyle: {
							width: 5,
							shadowOffsetX: 3,
							shadowOffsetY: 3
						},
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},						
						label : {
							show: false,
							position: 'top',
							//'{c}'
						}
					}},*/
				data:[90.816,90.932,90.736,90.84,90.789],
				//markPoint : MPtStyle,
				//markLine : MLnStyle,
			},
			{
				name:'9603A',
				type:'line',barMaxWidth:80,
				smooth:true,
				symbolSize: 6,
                /*itemStyle : {
					normal:{
						lineStyle: {
							width: 5,
							shadowOffsetX: 3,
							shadowOffsetY: 3
						},
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},						
						label : {
							show: false,
							position: 'top',
							//'{c}'
						}
					}},*/
				data:[90.301,90.771,90.219,89.756,88.438],
				//markPoint : MPtStyleBoth,
				//markLine : MLnStyle,
			},
			{
				name:'9604A',
				type:'line',barMaxWidth:80,
				smooth:true,
				symbolSize: 6,
                 /*itemStyle : {
					normal:{
						lineStyle: {
							width: 5,
							shadowOffsetX: 3,
							shadowOffsetY: 3
						},
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},						
						label : {
							show: false,
							position: 'top',
							//'{c}'
						}
					}},*/
				data:[90.591,90.25,90.254,90.312,90.219],
				//markPoint : MPtStyleBoth,
				//markLine : MLnStyle,
			},			
			{
				name:'9607A',
				type:'line',barMaxWidth:80,
				smooth:true,				
				symbolSize: 6,
               /*itemStyle : {
					normal:{
						lineStyle: {
							width: 5,
							shadowOffsetX: 3,
							shadowOffsetY: 3
						},
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},						
						label : {
							show: false,
							position: 'top',
							//'{c}'
						}
					}},*/
				data:[89.912,89.189,88.989,89.374,89.188],
				//markPoint : MPtStyleBoth,
				//markLine : MLnStyle,
			},
			{
				name:'平均',
				type:'line',barMaxWidth:80,
				smooth:true,				
				symbolSize: 6,
               /*itemStyle : {
					normal:{
						lineStyle: {
							width: 5,
							shadowOffsetX: 3,
							shadowOffsetY: 3
						},
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},						
						label : {
							show: false,
							position: 'top',
							//'{c}'
						}
					}},*/
				data:[90.489,90.397,90.218,90.289,90.054],
				//markPoint : MPtStyleBoth,
				//markLine : MLnStyle,
			}
			,
			{
				name:'统计开数',
				type:'pie',
				tooltip : {
					trigger: 'item',
					formatter: '{a} <br/>{b} : {c} ({d}%)'
				},
				center: ['15%','65%'],
				radius : [0, 60],
				itemStyle :　{
					normal : {
						label : {
							show :true,
							position:'outter',
							formatter: "{b}\n({d}%)",
						},
						labelLine : {
							show : true,
							length : 10
						},
					},
				},
				data:[
					{value:4963, name:'第1列'},
					{value:8192, name:'第2列'},
					{value:9010, name:'第3列'},
					{value:8337, name:'第4列'},
					{value:4569, name:'第5列'}
				]
			}
        ]
    },	
	
	QualityByExtract8: {		
		title : {
                text: '各抽检列裁切工序平均得分情况',
                subtext: '数据来源：质量综合管理系统数据库',
				x:'center',
            },
        tooltip : {
            trigger: 'axis',
			axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
			},
        },
		legend: {
			orient : 'vertical',
			//show:false,
			x : 'right',
			//y : 'bottom',
			y : '30%',
			itemGap:45,
			data:['9602A','9603A','9604A','9607A','平均']
		},
         toolbox: {
            show : true,
            feature : {
                mark : {show: true},
				//dataZoom : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
		/*dataZoom : {
            show : true,
            realtime: true,
            start : 0,
            end :100,
			//height:20,
        },*/
        calculable : true,
        xAxis : [
            {
				name:'列数',
				axisTick : {show: false},//隐藏标记线,
                type : 'category',
                boundaryGap : true,                
				data : (
					function (){
						var res = [];
						for(var i=1;i<6;i++) {
							res.push('第'+i+'列');
						}
						return res;
				})(),
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: 45,
					margin: 12          
				}
			}
        ],
        yAxis : [            
			{
				name:'平均得分',
                type : 'value',
				position: 'left',
				min:5.88,
				//max:92,
				scale: true,	
				axisLine:{show:false},
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value} ',    // Template formatter!               
				},
            }
        ],
        series : [			 
			{
				name:'9602A',			
				type:'line',barMaxWidth:80,
				smooth:true,
				symbolSize: 6,
                /*itemStyle : {
					normal:{
						lineStyle: {
							width: 5,
							shadowOffsetX: 3,
							shadowOffsetY: 3
						},
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},						
						label : {
							show: false,
							position: 'top',
							//'{c}'
						}
					}},*/
				data:[5.942,5.947,5.941,5.949,5.939],
				//markPoint : MPtStyle,
				//markLine : MLnStyle,
			},
			{
				name:'9603A',
				type:'line',barMaxWidth:80,
				smooth:true,
				symbolSize: 6,
                /*itemStyle : {
					normal:{
						lineStyle: {
							width: 5,
							shadowOffsetX: 3,
							shadowOffsetY: 3
						},
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},						
						label : {
							show: false,
							position: 'top',
							//'{c}'
						}
					}},*/
				data:[5.921,5.945,5.9,5.95,5.911],
				//markPoint : MPtStyleBoth,
				//markLine : MLnStyle,
			},
			{
				name:'9604A',
				type:'line',barMaxWidth:80,
				smooth:true,
				symbolSize: 6,
                 /*itemStyle : {
					normal:{
						lineStyle: {
							width: 5,
							shadowOffsetX: 3,
							shadowOffsetY: 3
						},
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},						
						label : {
							show: false,
							position: 'top',
							//'{c}'
						}
					}},*/
				data:[5.915,5.926,5.921,5.935,5.925],
				//markPoint : MPtStyleBoth,
				//markLine : MLnStyle,
			},			
			{
				name:'9607A',
				type:'line',barMaxWidth:80,
				smooth:true,				
				symbolSize: 6,
               /*itemStyle : {
					normal:{
						lineStyle: {
							width: 5,
							shadowOffsetX: 3,
							shadowOffsetY: 3
						},
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},						
						label : {
							show: false,
							position: 'top',
							//'{c}'
						}
					}},*/
				data:[5.9,5.939,5.94,5.947,5.908],
				//markPoint : MPtStyleBoth,
				//markLine : MLnStyle,
			},
			{
				name:'平均',
				type:'line',barMaxWidth:80,
				smooth:true,				
				symbolSize: 6,
               /*itemStyle : {
					normal:{
						lineStyle: {
							width: 5,
							shadowOffsetX: 3,
							shadowOffsetY: 3
						},
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},						
						label : {
							show: false,
							position: 'top',
							//'{c}'
						}
					}},*/
				data:[5.923,5.939,5.928,5.944,5.926],
				//markPoint : MPtStyleBoth,
				//markLine : MLnStyle,
			},
			{
				name:'统计开数',
				type:'pie',
				tooltip : {
					trigger: 'item',
					formatter: '{a} <br/>{b} : {c} ({d}%)'
				},
				center: ['90%','20%'],
				radius : [0, 40],
				itemStyle :　{
					normal : {
						label : {
							show :true,
							position:'outter',
							formatter: "{b}\n({d}%)",
						},
						labelLine : {
							show : true,
							length : 10
						},
					},
				},
				data:[
					{value:4887, name:'第1列'},
					{value:8114, name:'第2列'},
					{value:8869, name:'第3列'},
					{value:8247, name:'第4列'},
					{value:4523, name:'第5列'}
				]
			}
        ]
    },	
	QualityByExtract9: {		
		title : {
                text: '单开分析仪边缘开位与中心开位产品得分对比',
                subtext: '数据来源：质量综合管理系统数据库\n(边缘开位:各品种大张产品中最外围的开位)',
				x:'center',				
            },
        tooltip : {
            trigger: 'axis',
			axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			},
        },
		grid: {
			y: 90,
			y2: 30
		},
		legend: {
			//orient : 'vertical',
			x : '80%',
			//y : 'bottom',
			y :50,
			data:['综合得分','裁切得分']
		},
         toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        yAxis : [
            {
				//name:'品种',
				axisTick : {show: false},//隐藏标记线,
				axisLine : {show: false},
                type : 'category',
                boundaryGap : true,                
				data:['边缘开位','中心开位'],	   
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: 45,
					margin: 12          
				}
			}
        ],
        xAxis : [
            {
				name:'平均得分',
                type : 'value',
				position: 'left',
				min:90,
				max:90.5,
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value} ',    // Template formatter!               
				},
            },
			 {
				name:'裁切得分',
                type : 'value',
				position: 'left',
				min:5.9,
				max:5.95,
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value} ',    // Template formatter!               
				},
            }
        ],
        series : [
			  {
				name:'裁切得分',
				xAxisIndex: 1,
                type:'bar',barMaxWidth:80,
                smooth:true,
                itemStyle : {
					normal:{
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},					
						label : {
							show: true,
							position: 'insideRight',
							//'{c}'
						}
					}},
                data:[5.917,5.934],		
			},
			{
				name:'综合得分',
				
                type:'bar',barMaxWidth:80,
                smooth:true,
                itemStyle : {
					normal:{
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},					
						label : {
							show: true,
							position: 'insideRight',
							//'{c}'
						}
					}},
                data:[90.213,90.352],
			},
			{
				name:'统计开数',
				type:'pie',
				tooltip : {
					trigger: 'item',
					formatter: '{a} <br/>{b} : {c} ({d}%)'
				},
				center: ['85%','35%'],
				radius : [0, 60],
				itemStyle :　{
					normal : {
						label : {
							show :true,
							position:'inner',
							formatter: "{b}\n({d}%)",
						},
						labelLine : {
							show : false,
							length : 5
						},
					},
				},
				data:[
					{value:14672, name:'边缘开位'},
					{value:20399, name:'中心开心'},
				]
			}
        ]
    },
	
	QualityByExtract10: {		
		title : {
                text: '2015年1-3月防伪指标检测抽检上下5千分布',
                subtext: '数据来源：质量综合管理系统数据库',
				x:'center',
            },
        legend: {
			x : 'center',
			y : 60,
			data:['上5千','下5千']
		},
		toolbox: {
			show : true,
			feature : {
				dataView : {show: true, readOnly: false}, dataZoom : {show: true},
				restore : {show: true},
				saveAsImage : {show: true}
			}
		},
		series : [
			{
				type : 'pie',
				center : ['15%', '50%'],
				radius : radius,
				itemStyle : 
				{
					normal : {
						color: '#ccc',
						label : {
							formatter : function (a,b,c){return  xround(1172*100/(1172+1077),2) + '%\n9602A'},//用四舍五入解决浮点的问题
							textStyle: {
								//baseline : 'bottom',
								fontSize: 25,
								fontWeight: 'normal',//'bolder', 不加粗
								color: 'rgb(123,195,119)'          // 主标题文字颜色
							}
						}
					}
				},//labelFromatter,
				data : [
					{name:'下5千', value:1077, itemStyle : labelBottom},
					{
						name:'上5千', 
						value:1172,
						itemStyle : {
							normal : {
								label : {
									show : false,//true,
									position : 'center',
									formatter : '{b}',
									textStyle: {
										fontSize : '20',
										baseline : 'top'
									}
								},
								color:'rgb(123,195,119)',
								labelLine : {
									show : false
								}
							}
						}
					}
				]
			},
			{
				type : 'pie',
				center : ['38.3%', '50%'],
				radius : radius,
				itemStyle : 
				{
					normal : {
						color: '#ccc',
						label : {
							formatter : function (a,b,c){return xround(480*100/(480+431),2) + '%\n9603A'},//用四舍五入解决浮点的问题
							textStyle: {
								//baseline : 'bottom',
								fontSize: 25,
								fontWeight: 'normal',//'bolder', 不加粗
								color: 'rgb(144,101,171)'          // 主标题文字颜色
							}
						}
					}
				},//labelFromatter,
				data : [
					{name:'下5千', value:431, itemStyle : labelBottom},
					{
						name:'上5千', 
						value:480,
						itemStyle : {
							normal : {
								label : {
									show : false,
									position : 'center',
									formatter : '{b}',
									textStyle: {
										fontSize : '20',
										baseline : 'top'
									}
								},
								color: 'rgb(144,101,171)',
								labelLine : {
									show : false
								}
							}
						}
					
					}
				]
			},
			{
				type : 'pie',
				center : ['61.6%', '50%'],
				radius : radius,
				itemStyle : 
				{
					normal : {
						color: '#ccc',
						label : {
							formatter : function (a,b,c){return xround(1347*100/(1347+1278),2) + '%\n9604A'},//用四舍五入解决浮点的问题
							textStyle: {
								//baseline : 'bottom',
								fontSize: 25,
								fontWeight: 'normal',//'bolder', 不加粗
								color: '#01a99c'          // 主标题文字颜色
							}
						}
					}
				},//labelFromatter,
				data : [
					{name:'下5千', value:1278, itemStyle : labelBottom},
					{
						name:'上5千',
						value:1347,
						itemStyle : {
							normal : {
								label : {
									show : false,
									position : 'center',
									formatter : '{b}',
									textStyle: {
										fontSize : '20',
										baseline : 'top'
									}
								},
								color: '#55c1e8',
								labelLine : {
									show : false
								}
							}
						}
					}
				]
			},
			{
				type : 'pie',
				center : ['85%', '50%'],
				radius : radius,
				itemStyle : 
				{
					normal : {
						color: '#ccc',
						label : {
							formatter : function (a,b,c){return xround(778*100/(778+715),2) + '%\n9607A'},//用四舍五入解决浮点的问题
							textStyle: {
								//baseline : 'bottom',
								fontSize: 25,
								fontWeight: 'normal',//'bolder', 不加粗
								color: '#ec8171',         // 主标题文字颜色
							}
						}
					}
				},//labelFromatter,
				data : [
					{name:'下5千', value:715, itemStyle : labelBottom},
					{
						name:'上5千', 
						value:778,
						itemStyle : {
							normal : {
								label : {
									show : false,//true,
									position : 'center',
									formatter : '{b}',
									textStyle: {
										fontSize : '10',
										baseline : 'top',
									}
								},
								color: '#ec8171',
								labelLine : {
									show : false
								}
							}
						}
					}
				]
			}
		]
    },
	
	QualityByExtract11: {		
		title : {
                text: '抽检异常分布',
                subtext: '数据来源：质量综合管理系统数据库\n统计范围：2015年1-3月',
				x:'center',
				y: 'center',
				itemGap: 20,
				textStyle : {
					color : 'rgba(30,144,255,0.8)',
					fontFamily : '微软雅黑',
					fontSize : 35,
					fontWeight : 'bolder'
				}
            },
        legend: {
			orient : 'vertical',
			x : '50%',
			y : 95,
			itemGap:12,
			data:['94%正常','5%未达标','1%抽检不足']
		},
		toolbox: {
			show : true,
			feature : {
				dataView : {show: true, readOnly: false}, dataZoom : {show: true},
				restore : {show: true},
				saveAsImage : {show: true}
			}
		},
		tooltip : {
			show: true,
			formatter: "{a} <br/>{b} : {c} ({d}%)"
		},
		series : [			
			{
				name:'1',
				type:'pie',
				clockWise:false,				
				radius : [125, 150],
				startAngle: 90,
				itemStyle : {
					  normal: {
						label: {show:false},
						labelLine: {show:false}
					}
				},
				data:[
					{
						value:94, 
						name:'94%正常'
					},
					{
						value:6,
						name:'invisible',
						itemStyle : placeHoledStyle
					}
				]
			},
			{
				name:'2',
				type:'pie',
				clockWise:false,
				startAngle: 90,
				radius : [100, 125],
				itemStyle : {
					  normal: {
						label: {show:false},
						labelLine: {show:false}
					}
				},
				data:[
					{
						value:5, 
						name:'5%未达标'
					},
					{
						value:95,
						name:'invisible',
						itemStyle : placeHoledStyle
					}
				]
			},
			{
				name:'3',
				type:'pie',
				clockWise:false,
				startAngle: 90,
				radius : [75, 100],
				itemStyle : {
					  normal: {
						label: {show:false},
						labelLine: {show:false}
					}
				},
				data:[
					{
						value:1,
						name:'1%抽检不足'
					},
					{
						value:99,
						name:'invisible',
						itemStyle : placeHoledStyle
					}
				]
			},
			
		]
    },
	QualityByExtract12: {		
		title : {
                text: '各抽检列裁切工序平均得分情况',
                subtext: '数据来源：质量综合管理系统数据库\n统计范围：2015年1-3月',
				x:'center',
            },
        tooltip : {
            trigger: 'axis',
			axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
			},
        },
		legend: {
			orient : 'vertical',
			//show:false,
			x : '87%',
			//y : 'bottom',
			y : '53%',
			itemGap:60,
			data:['裁切得分','总分']
		},
         toolbox: {
            show : true,
            feature : {
                mark : {show: true},
				//dataZoom : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
		/*dataZoom : {
            show : true,
            realtime: true,
            start : 0,
            end :100,
			//height:20,
        },*/
        calculable : true,
        xAxis : [
            {
				name:'列数',
				axisTick : {show: false},//隐藏标记线,
                type : 'category',
                boundaryGap : true,                
				data : (
					function (){
						var res = [];
						for(var i=1;i<6;i++) {
							res.push('第'+i+'列');
						}
						return res;
				})(),
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: 45,
					margin: 12          
				}
			}
        ],
        yAxis : [            
			{
				name:'总分',
                type : 'value',
				position: 'left',
				min:89,
				max:91.5,
				//scale: true,	
				axisLine:{show:false},
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value} ',    // Template formatter!               
				},
            },
			{
				name:'裁切得分',
                type : 'value',
				position: 'left',
				min:5.9,
				//max:6,
				scale: true,	
				axisLine:{show:false},
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value} ',    // Template formatter!               
				},
            }
        ],
        series : [			 
			{
				name:'总分',			
				type:'line',barMaxWidth:80,
				smooth:true,
				symbolSize: 6,
                /*itemStyle : {
					normal:{
						lineStyle: {
							width: 5,
							shadowOffsetX: 3,
							shadowOffsetY: 3
						},
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},						
						label : {
							show: false,
							position: 'top',
							//'{c}'
						}
					}},*/
				data:[90.621,90.203,90.072,89.781,89.589],
				//markPoint : MPtStyle,
				//markLine : MLnStyle,
			},
			{
				name:'裁切得分',
				type:'line',barMaxWidth:80,
				smooth:true,
				symbolSize: 6,
				yAxisIndex:1,
                /*itemStyle : {
					normal:{
						lineStyle: {
							width: 5,
							shadowOffsetX: 3,
							shadowOffsetY: 3
						},
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},						
						label : {
							show: false,
							position: 'top',
							//'{c}'
						}
					}},*/
				data:[5.907,5.935,5.943,5.943,5.922],
				//markPoint : MPtStyleBoth,
				//markLine : MLnStyle,
			},
			{
				name:'统计开数',
				type:'pie',
				tooltip : {
					trigger: 'item',
					formatter: '{a} <br/>{b} : {c} ({d}%)'
				},
				center: ['85%','20%'],
				radius : [0, 40],
				itemStyle :　{
					normal : {
						label : {
							show :true,
							position:'outter',
							formatter: "{b}\n({d}%)",
						},
						labelLine : {
							show : true,
							length : 10
						},
					},
				},
				data:[
					{value:1089, name:'第1列'},
					{value:1480, name:'第2列'},
					{value:1355, name:'第3列'},
					{value:1359, name:'第4列'},
					{value:1069, name:'第5列'}
				]
			}
        ]
    },	
	'FakeAndGoodrate':{
		title : {
			text: '平均好品率与缺陷条数的关系',
			subtext: '数据来源：质量综合管理系统数据库\n数据量：25267组',
			x:'center',
		},
		dataZoom : {
            show : true,
            realtime: true,
            start : 0,
            end :100,
			//height:20,
        },
		tooltip : {
			trigger: 'axis',
			showDelay : 0,
			formatter : function (params) {
				if (params.value.length > 1) {//
					return  params.seriesName +'</br>好品率:' + params.value[0] + '%<br/>缺陷条数:' 
					   + params.value[1] + '条 ';
				}
				else {
					return params.seriesName + ' :<br/>'
					   + params.name + ' : '
					   + params.value + 'kg ';
				}
			},  
			axisPointer:{
				type : 'cross',
				lineStyle: {
					type : 'dashed',
					width : 1
				}
			}
		},
		legend: {
			data:['小张核查','码后核查'],
			y:70,
			//show:false,
		},
		grid:{y:90},
		toolbox: {
            show : true,
            feature : {
                mark : {show: true},
				//dataZoom : {show: true},
                dataView : {show: true, readOnly: false}, 
				dataZoom : {show: true},
                //magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
		xAxis : [
			{
				type : 'value',
				name : '好品率',
				scale:true,
				axisLabel : {
					formatter: '{value} %'
				}
			}
		],
		yAxis : [
			{
				type : 'value',
				name : '缺陷条数',
				scale:true,
				//max:10000,
				axisLabel : {
					formatter: '{value} 条'
				}
			}
		],
		animation: false,
		series : [
			/*function (value){
					return Math.round(value[1] / 2000);
				}*/
			{
				name:'小张核查',
				type:'scatter',
				symbolSize: 6,
				data:[[70.35,11645],[78.06,12931],[94.08,958],[70.46,11270],[87.35,9006],[78.7,6139],[96.76,383],[87.15,6598],[95.92,611],[88.55,4320],[85.79,6589],[90.54,2285],[82.17,4886],[91.3,2696],[96.41,645],[81.62,6488],[89.52,4243],[92.65,809],[87.65,3597],[92.88,2540],[74.81,9370],[73.41,10200],[90.08,3193],[86.65,8299],[86.53,6744],[84.56,6597],[79.77,5575],[85.24,9730],[73.08,4931],[86.58,5851],[85.89,8239],[87.5,3121],[90.53,8537],[86.76,3018],[85.93,8278],[91.87,3421],[85.74,7305],[83.05,3720],[77.83,14438],[79.41,3747],[85.21,5611],[80.29,6120],[92.26,6497],[88.19,4177],[90.95,3135],[76.91,7197],[78.61,8519],[88.71,1835],[87.65,3515],[92.49,1297],[81.67,6436],[83.18,15641],[84.08,12934],[81.65,7678],[87.87,12067],[92.02,2387],[84.25,8825],[84.34,8658],[90.08,3012],[72.99,7716],[82.55,10978],[85.33,4814],[92.24,1749],[81.36,11756],[89.2,2904],[75.76,10132],[75.85,18007],[89.65,2811],[85.39,3257],[80.16,6864],[72.56,8514],[81.19,5277],[93.48,1402],[87.82,3275],[83.15,3834],[81.99,7227],[85.48,2855],[89.86,3461],[69.33,17739],[80.28,8197],[71.4,11672],[85.47,5184],[89.39,2053],[67.24,13647],[93.9,1328],[85.76,3740],[87.23,10741],[93.37,966],[93.87,2543],[90.4,3546],[84.59,7418],[81.73,8382],[88.7,3944],[82.62,6813],[87.9,3536],[79.98,7522],[84.05,6648],[86.25,10289],[81.21,6852],[91.33,4017],[88.39,3916],[91.04,1653],[84.87,1774],[74.28,6346],[94.39,611],[82.19,4985],[87.13,3247],[92.32,1693],[93.88,1163],[96.35,1048],[80.45,4743],[69.73,15324],[72.61,6057],[95.06,909],[83.9,4842],[77.14,4823],[93.5,1053],[64.61,14891],[83.47,5680],[80.67,9544],[83.77,3134],[94.04,1002],[73.04,13014],[87.2,1914],[92.73,2206],[75.65,10343],[72.39,9328],[83.24,2924],[68.47,15418],[93.71,2326],[80.88,7466],[71.55,6532],[90.89,3248],[60.59,13863],[89.13,2679],[93.87,828],[96.43,508],[80.1,7052],[79.07,9182],[85.37,5912],[91.83,2171],[86.03,4568],[90.11,3470],[83.19,6719],[87.36,4892],[79.18,5781],[92.53,1229],[83.79,7516],[84.96,3923],[93.38,1513],[85.18,3074],[90.44,2504],[85.1,3564],[75.73,7630],[70.95,13661],[91.1,2312],[86.11,4100],[88.64,2898],[93.98,1101],[83.75,4130],[87.94,4440],[96.14,940],[91.62,2510],[83.98,6626],[95.21,962],[67.19,8930],[77.34,3986],[85.53,4826],[80.82,13633],[72.28,6755],[90.65,1684],[72.11,6551],[88.4,4866],[92.28,2278],[82,3548],[90.02,2061],[78.97,3570],[73.79,8785],[91.71,2301],[85.14,3662],[84.32,3309],[87.93,2914],[86.07,3592],[71.29,10480],[76.03,5033],[81.99,5911],[79.86,4758],[92.25,2154],[88.59,2940],[71.66,10934],[88.18,2969],[88.18,3687],[86.85,2757],[76.45,10740],[91.88,2094],[95.93,928],[68.67,8004],[88.51,1813],[53.57,15671],[86.88,3550],[71.46,4752],[84.46,6174],[85.01,6576],[88.64,5507],[80.56,5576],[75.97,7558],[60.93,16484],[72.65,7173],[89.27,3117],[95.77,1020],[79.02,7704],[73.57,8946],[83.69,4321],[93.96,3862],[81.92,8196],[90.53,2031],[74.25,11852],[93.94,1282],[94.22,1398],[84.12,6040],[83.71,5697],[63.82,5436],[84.34,3819],[82.64,16616],[79.11,7394],[80.36,11894],[88.06,5312],[91.63,2220],[96.65,889],[79.8,3934],[77.72,6257],[95.27,1113],[90.64,2309],[94.62,1320],[75.06,7005],[66.96,10137],[82.99,5505],[88.92,4569],[68.1,7174],[73.02,10467],[87.13,3139],[65.14,13827],[82.14,5124],[90.38,2286],[84.54,3852],[85.17,4324],[82.22,6342],[91.25,1567],[93.17,3455],[62.97,20667],[83.33,2209],[74.26,5994],[88.93,5215],[86.78,3776],[87.42,1818],[77.84,4612],[91.3,2584],[85.52,3329],[93.35,871],[66.83,6663],[90.35,2799],[84.91,3202],[83.47,2020],[71.49,6414],[86.47,3817],[72.31,19574],[70.57,10982],[83.83,3167],[81.18,4882],[88.03,7456],[90.09,2238],[86.42,4746],[70.09,13937],[77.81,19312],[87.59,3826],[82.64,6991],[89.38,2233],[87.45,2865],[86.69,4729],[95.39,888],[90.36,3834],[82.58,4833],[89,3268],[94.3,1166],[90.54,1512],[82.93,2452],[85.34,3824],[89.52,2603],[82.88,2227],[89.63,1594],[93.05,1014],[77.92,4472],[92.81,1356],[85.06,2150],[82.76,2999],[75.21,4655],[78.93,2818],[61.97,28829],[65.52,6870],[86.65,2644],[73.91,5402],[77.81,2725],[60.11,7650],[79.2,3631],[63.9,7965],[83.79,2325],[83.54,2628],[67.92,7077],[74.45,3441],[93.02,888],[85.29,1936],[87.18,2064],[77.06,4171],[91.54,996],[90.31,1276],[95.79,1262],[90.4,1316],[73.46,9782],[87.84,2675],[85.53,2573],[65.32,8055],[91.57,1115],[92.76,1142],[89.96,1835],[88.84,1680],[68.95,4236],[54.47,22486],[93.32,1181],[68.11,6148],[80.56,2712],[76.31,5810],[85.43,3450],[79.49,3072],[64.45,8846],[85.83,1991],[75.35,16310],[83.05,10981],[80.26,2979],[84.65,3157],[69.41,5334],[87.62,2647],[91.02,1224],[70.71,3669],[88.47,1660],[76.06,3779],[58.71,20972],[65.73,11411],[82.6,2675],[90.29,1423],[92.6,935],[82.47,2411],[87.55,2275],[68.61,5380],[88.57,1656],[68.72,8904],[79.61,2329],[65.51,5914],[86.86,2531],[91.03,1211],[81.21,2836],[75.08,4255],[71.3,5310],[62.96,9387],[77.12,3510],[81.18,4497],[82.45,4594],[87.78,1542],[94.72,1332],[71.41,26985],[85.15,2240],[75.32,9219],[91.53,1328],[72.02,7436],[94.32,790],[83.95,1999],[79.93,4106],[77.91,3332],[88.73,1694],[85.03,2884],[84.17,3388],[92.89,1084],[91.49,976],[76.58,4927],[80.67,3207],[92.45,1194],[79.35,2703],[77.38,3848],[82.48,3857],[91.2,1600],[79.34,3697],[73.11,4282],[80.15,2897],[91.35,1237],[58.41,14527],[92.05,1186],[83.67,3233],[89.96,2018],[89.14,1638],[87.59,1816],[82.86,3145],[93.8,893],[92.58,986],[78,3327],[82.89,3420],[42.56,29972],[86.18,1806],[82.67,3061],[87.95,1892],[84.71,2561],[88.19,2355],[74.4,4971],[66.36,4967],[83.96,2224],[81.95,2313],[80.43,2820],[83.08,2392],[89.78,1704],[86.77,2272],[86.31,1830],[83.06,2137],[72.46,5888],[91.14,1377],[85.51,2056],[81.18,2764],[92.13,1441],[94,925],[75.43,8328],[78.73,4697],[78.96,4546],[53.46,10289],[82.73,5562],[89.1,2009],[67.28,4756],[78.77,3064],[88.02,1767],[84.81,3289],[86.7,2024],[84.24,2104],[81.97,2747],[79.52,3529],[91.18,1234],[81.23,2510],[81.29,3034],[89.68,1812],[90.21,1362],[86.68,2180],[81.17,2779],[89.36,1325],[79.45,4744],[92.83,944],[80.66,3220],[74.2,3607],[90.31,1359],[72.46,4099],[92.62,2427],[91.56,4078],[90.3,1685],[94.7,1138],[93.37,1375],[96.45,953],[90.42,4594],[80.4,4086],[91.75,1423],[96.25,1495],[90.68,2276],[93.2,1175],[88.5,2099],[91.23,1287],[77.09,5327],[92.64,1535],[95.52,882],[90.82,1914],[81.61,4189],[94.44,1521],[91.57,3093],[81.3,3886],[90.75,2380],[84.12,2965],[94.44,836],[85.57,2548],[87.45,1984],[85.66,2759],[81.16,3332],[94.76,1117],[85.72,2319],[89.52,4062],[79.45,3973],[94.03,1769],[93.35,1863],[95.26,3077],[91.8,4624],[93.17,2516],[93.68,2081],[93.37,2887],[92.44,2071],[82.46,6129],[90.57,2901],[89.09,4333],[89.1,4789],[88.9,2591],[93.81,1987],[87.51,4744],[90.9,2370],[91.7,3786],[95.34,1702],[94.88,2344],[95.91,1483],[94.15,2288],[94.9,2565],[94.53,3258],[91.83,3170],[89.06,2127],[94.19,1650],[90.85,5453],[92.82,2689],[94.89,2350],[95.7,1345],[92.66,3328],[94.2,1855],[92.82,1942],[84.65,4411],[91.57,2474],[89.73,3926],[94.32,2472],[94.79,3025],[93.41,2819],[95.43,1677],[95.31,2265],[88.31,4247],[81.87,6413],[89.35,7670],[86.46,3197],[92.72,2465],[91.63,3070],[81.57,6863],[95.49,2136],[94.36,1626],[93.29,2226],[85.05,6693],[93.03,2325],[88.45,2073],[93.31,2101],[86.38,3669],[93.26,1972],[93.5,2846],[91.26,3476],[93.57,2700],[81.28,5695],[87.27,3768],[95.38,1731],[91.45,2255],[93.29,1379],[88.98,5536],[84.07,2132],[92.8,858],[89.67,1675],[89.45,1490],[73.16,5547],[88.85,2475],[79.07,2643],[88.65,1716],[86.4,2064],[91.41,1151],[86.21,1941],[78.37,3866],[91.77,1142],[91.97,1029],[88.69,1295],[90.24,1408],[91.51,935],[85.85,2204],[90.86,1154],[91.7,1005],[91.33,1150],[72.45,4203],[84.99,1995],[87.63,1560],[90.98,1138],[89.72,1712],[93.45,849],[87.45,2701],[88.23,1999],[92.85,1080],[92.63,1376],[82.19,4565],[85.8,1859],[93.04,1036],[90.25,1341],[88.65,1448],[88.98,2031],[82.63,2886],[92.97,890],[84.93,2190],[88.82,1582],[90.7,1259],[91.61,1063],[78.27,4315],[92.89,956],[89.95,1466],[86.04,2447],[84.18,2234],[87.02,4427],[90.44,3248],[93.52,1069],[87.1,2172],[89.47,2760],[91.54,1167],[95.87,417],[94.74,684],[94.61,3077],[88.43,1711],[98.27,178],[87.69,1583],[92.64,2654],[87.28,1596],[86.93,2059],[88.57,1586],[90.91,3398],[87.25,2107],[95.01,840],[84.28,3279],[77.96,8162],[88.22,1697],[89.63,1528],[91.23,1730],[96.65,1092],[84.79,2305],[78.24,7021],[90.53,1544],[95.29,1782],[92.82,1117],[95.11,1675],[75.3,7419],[89.22,1662],[70,5311],[93.36,765],[70.53,9266],[92.2,1105],[92.82,1253],[90.6,1333],[88.88,3882],[89.09,2003],[92.43,1058],[87.13,2816],[88.9,5764],[88.45,2285],[78.06,3019],[94.1,877],[91.97,1204],[83.27,2638],[92.96,788],[84.25,2917],[94.22,690],[89.92,1505],[92.74,838],[86.32,1562],[93.69,808],[77.79,3699],[88.77,2132],[93.75,784],[86.36,2148],[90.36,988],[88.62,1769],[91.8,971],[76.91,3875],[95.1,575],[84.12,2297],[87.8,1658],[79.6,3320],[88.79,2168],[87.6,1600],[94.85,559],[87.31,2434],[86.1,2396],[98.14,320],[66.48,5756],[82.91,2224],[82.66,3252],[80.82,5295],[79.85,6160],[90.06,1441],[90.98,1354],[94.91,717],[80.56,2533],[86.87,2149],[96.94,400],[85.88,2991],[94.1,788],[89.58,1565],[90.18,1655],[92.05,925],[97.25,476],[84.86,2021],[90.77,1095],[98.21,242],[90.09,1462],[87.27,2574],[90.04,2196],[94.71,985],[94.79,738],[92.86,1209],[86.28,1790],[75.26,8462],[90.76,1170],[82.68,2317],[71.75,4911],[84.7,2964],[86.8,1739],[89.12,1491],[84.23,3271],[93.63,969],[93.8,761],[88.76,1397],[83.04,2825],[88.76,1291],[85.56,2381],[90.57,1204],[93.74,1244],[90,1316],[79.92,5578],[79.86,4938],[78.92,2812],[87.83,2223],[95.99,492],[87.6,1787],[89.13,1516],[89.72,1130],[86.88,4984],[83.96,3322],[93.65,1079],[89.1,1575],[92.81,917],[90,1939],[71.96,9172],[89.86,1429],[92.3,1071],[87.38,1594],[93.94,727],[92.39,1134],[71.26,4056],[92.53,1014],[86.9,2947],[83.52,2129],[86.53,2114],[80.29,6671],[91.29,1385],[90.3,1524],[77.1,5491],[81.41,4956],[98.61,170],[91.05,1336],[83.4,3042],[98.57,233],[92.7,1308],[88.66,1884],[92.46,1056],[88.61,2040],[87.14,1578],[84.3,3266],[87.95,1562],[81.5,9071],[89.24,1844],[90.28,1251],[82.47,1944],[88.12,1619],[86.26,1636],[68.32,5015],[92.47,996],[87.02,1995],[86.46,2310],[87.79,1405],[88.59,1415],[83.61,6298],[89.99,1809],[87.2,1982],[90.8,1246],[85.47,1912],[73.03,8261],[78.45,4122],[87.09,1687],[79.9,2718],[79.31,8711],[75.58,4868],[82.25,3384],[84,3234],[84.55,3777],[93.39,2625],[89.6,1290],[88.38,1601],[89.27,2423],[79.71,9192],[82.68,2259],[86.07,2020],[87.92,2680],[89.69,1221],[93.56,1155],[90.94,1167],[90.42,1820],[87.8,2012],[90.18,1291],[89.5,1633],[81.93,2858],[96.13,1758],[94.03,613],[88.19,1603],[92.39,1063],[85.82,3930],[86.38,4357],[95.55,1470],[88.67,3341],[84.14,4822],[88.12,3783],[89.92,8807],[93.19,4690],[91.45,3946],[86.08,12322],[64.53,8298],[91.82,4324],[91.72,4996],[93.43,7108],[91.97,4290],[92.54,2676],[92.83,2737],[90.34,3765],[88.5,15333],[93.72,3213],[96.8,2876],[82.71,5837],[96.39,2393],[82.49,6113],[90.24,4076],[93.55,4461],[95.83,2018],[93.71,3144],[91,3376],[93.83,1904],[94.69,2531],[96.77,3036],[86.34,8089],[75.64,10701],[93.26,5921],[87.07,5810],[93.17,2057],[85.62,2245],[90.47,3230],[85.01,3791],[92.61,1239],[85.19,2617],[74.46,5420],[97.18,593],[96.44,576],[89.46,2072],[91.56,1711],[94.36,2083],[96.32,4205],[86.87,6014],[94.68,2274],[90.43,3553],[95.15,2189],[93.33,2090],[90.3,2045],[87.26,3766],[95.55,2221],[95.72,2108],[93.9,3361],[96.67,1248],[93.13,2676],[92.04,4784],[92.09,2426],[93.21,2807],[89.4,4065],[81.69,18626],[95.27,1412],[95.25,2014],[94.11,837],[81.87,2445],[78.89,3376],[81.85,3713],[90.65,1332],[92.71,1553],[94.96,746],[83.13,2606],[86.19,3911],[83.09,2789],[91.88,1251],[87.22,3582],[65.77,6341],[86.9,2480],[84.09,2681],[84.25,2226],[85.63,1997],[84.89,2187],[86.81,2006],[83.89,2341],[75.7,5027],[90.12,2402],[82.55,2277],[90.55,1662],[89.72,1531],[96.97,377],[88.74,2231],[96.48,590],[96.21,608],[91.71,1344],[88.95,9245],[90.66,1272],[97.05,510],[87.76,3103],[95.78,1691],[77.83,12630],[66.32,30244],[71.16,9573],[82.7,10546],[75.94,5243],[68.75,16780],[81.64,11583],[90.27,5072],[88.37,5013],[58.24,25394],[92.85,4355],[91.07,3839],[89.86,4118],[94.01,4149],[84.72,7417],[91.08,1376],[88.93,5884],[93.33,1035],[83.6,2074],[81.31,11167],[87.73,7753],[90.78,1720],[86.46,8824],[85.28,9174],[81.29,6788],[87.73,4002],[95.43,4276],[89.9,2094],[76.89,4524],[95.53,2530],[92.66,2402],[88.19,6362],[89.53,1378],[82.07,4088],[87.33,7823],[95.48,506],[67.93,12374],[76.1,13264],[92.95,3998],[93.62,939],[75.17,10203],[91.05,7497],[87.84,8247],[85.72,4591],[72.28,6130],[76.72,7576],[81.8,6643],[73.49,8105],[88.68,4117],[76.5,11567],[83.92,3968],[90.39,9271],[97.38,311],[84.08,13718],[97.07,385],[73.7,6258],[88.12,4317],[75.57,14237],[78.42,7920],[83.63,4345],[87.28,6217],[95.5,548],[89.48,3514],[87.53,9018],[92.78,3276],[91.54,985],[88.01,3002],[87.12,9871],[86.7,6375],[90.71,5051],[93.56,735],[78.56,5161],[93.66,2907],[87.32,1497],[82.04,7050],[89.22,2642],[90.01,4726],[92.1,3972],[86.42,1658],[84.59,4613],[83.67,5089],[81.8,10498],[73.5,8539],[83.61,6402],[86.92,9536],[84.73,6122],[68.81,15675],[86.97,9045],[71.86,9879],[84.79,8481],[87.54,6599],[64.3,6511],[67,31602],[85.24,4492],[85.25,7770],[76.82,13314],[88.67,5278],[81.98,5263],[90.73,3746],[88.94,6591],[77.93,4627],[79.92,9754],[92.03,4628],[86.04,3882],[94.78,2211],[91.83,4377],[81.31,6005],[86.26,10720],[80.8,4650],[73.85,16486],[95.41,2424],[70.91,13137],[77.66,5271],[94.71,4379],[90.33,6650],[77.66,5473],[94.2,1419],[91.92,4093],[87.13,3296],[89.55,5324],[80.64,8358],[84.96,7958],[96.04,1576],[77.33,11315],[91.53,4263],[85.17,12659],[78.4,5548],[86.98,6710],[68.71,13193],[73.79,7246],[89.28,6698],[77.13,16830],[65.61,10992],[90.03,5688],[88.45,7027],[81.58,10304],[82,20652],[75.09,17183],[80.63,5664],[90.96,5131],[85.49,9546],[77.92,6184],[88.09,6318],[91.53,5649],[77.91,4441],[77.29,22406],[93.54,2754],[90.42,2965],[72.24,12501],[92.27,3827],[77.8,6373],[94.4,2676],[77.42,6517],[92.72,3202],[78.3,5413],[89.09,5106],[89.1,2951],[92.07,3558],[84.25,9855],[58.73,13581],[80.31,4941],[78.63,8419],[89.13,7588],[86.53,4498],[83.97,7514],[69.17,6642],[85.98,6371],[73.87,7138],[85.83,7677],[77.81,6654],[85.63,5848],[81.21,2848],[84.59,8051],[66.89,12881],[82.66,6057],[81.09,5081],[82.85,5553],[82.32,14801],[75.99,10875],[83.59,3920],[88.23,4632],[80.37,4763],[84.44,4785],[86.7,3575],[87.15,3464],[75.59,5144],[87.24,3132],[76.46,17040],[89,5504],[59.16,32299],[72.92,21994],[77.1,8697],[79.99,3553],[85.21,5031],[73.29,11767],[81.21,11383],[82.16,4900],[53.54,9866],[56.31,9543],[85.38,3426],[77.24,14275],[94.22,1876],[59.18,28944],[88.42,7122],[79.38,10164],[64.55,21056],[90.73,2866],[72.24,18196],[86.98,6039],[69.27,10334],[80.23,6048],[79.65,10129],[91.26,2319],[71.22,8719],[94.44,2972],[42.4,25380],[73.67,4883],[85.23,7264],[91.56,6990],[82.76,3761],[88.91,3195],[79.5,4719],[85.77,8478],[61.23,20858],[93.73,1180],[93.47,3351],[73.8,26054],[70.55,5788],[80.85,3860],[90.28,1495],[86.87,2092],[81.18,3087],[87.38,2469],[68.68,14842],[89.56,1522],[83.19,2053],[57.2,11244],[85.48,1695],[78.13,6225],[84.61,2330],[97.86,237],[97.51,272],[75.21,6552],[91.03,1430],[90.22,1280],[93.42,1239],[92.87,1301],[88.54,1945],[71.51,7137],[85.49,4595],[75.71,18687],[75.8,3311],[90.14,1313],[93.39,890],[94.25,688],[82.07,3383],[70.35,6240],[95.92,468],[88.09,1554],[84.7,2206],[72.67,4367],[98.04,241],[90.73,2013],[89.64,1509],[82.5,2476],[95.02,654],[90.85,1119],[81.33,2366],[70.69,5784],[92.57,1102],[90.53,1469],[75.17,3420],[60.36,8217],[97.51,331],[77.7,4223],[79.29,4352],[79.56,3464],[95.36,927],[93.45,955],[83.21,2287],[73.27,4682],[97.71,247],[86.54,1905],[91.88,1266],[70.38,8379],[96.87,388],[89.81,1576],[84.28,2180],[84.24,2997],[97.36,320],[88.33,2049],[77,7285],[78.02,4849],[71.78,4440],[77.78,3622],[82.53,2813],[74.42,6487],[92.22,1400],[85.62,1885],[76.6,3825],[76.13,3952],[88.19,1734],[87.46,1605],[87.02,1948],[80.01,3936],[89.63,1815],[89.13,1537],[66.98,8982],[87.07,1846],[89.94,1499],[93.04,903],[69.27,5865],[87,1648],[72.8,4152],[70.01,9096],[76.05,3737],[88.32,1921],[66.94,11906],[79.45,3265],[79.87,3201],[72.05,8108],[84.63,2647],[86.41,2026],[77.26,3839],[70.31,7258],[78.26,3761],[89.61,1748],[79,2835],[72.43,4954],[86.13,2346],[85.43,1990],[92.72,973],[92.28,1262],[97.44,356],[89.84,4755],[74.64,5720],[83.24,3591],[80.08,4265],[88.32,1617],[74.12,3689],[83.92,8236],[88.25,2269],[71.17,25861],[85.58,5629],[92.88,1029],[82.57,2775],[96.81,347],[88.12,2794],[71.62,5331],[80.85,4107],[82.87,4637],[89.63,1471],[91.81,1056],[84.33,2517],[87.4,1716],[75.39,4379],[85.64,2048],[71.76,8123],[91.19,1401],[74.14,3592],[72.65,7900],[82.68,3747],[76.36,5479],[77.66,5216],[86.9,2130],[83,3852],[78.91,3583],[83.62,4323],[70.34,6802],[76.95,10747],[82.4,5557],[76.77,6745],[79.28,3232],[86.98,1909],[89.91,1338],[72.48,4773],[75.22,5685],[86.57,4106],[87.98,2230],[67.66,4904],[65.46,5385],[85.03,2360],[77.22,2982],[77.69,3172],[85.44,2437],[80.33,5279],[85.13,2036],[84.7,2571],[83.63,3283],[90.44,1235],[84.84,5087],[62.44,8399],[89.59,1515],[81.01,6258],[87.82,1710],[79.38,2982],[77.14,3378],[85.59,3484],[90.87,1478],[74.43,4313],[86.15,2046],[89.87,1466],[83.19,2537],[78.51,3398],[92.81,915],[87.99,2478],[91.6,1153],[87.78,1895],[87.15,3377],[88.5,1431],[84.98,2105],[94.53,794],[85.53,3088],[81.9,2916],[90.52,1199],[89.16,4778],[59.46,23400],[83.01,2820],[82.21,2805],[79.93,3133],[88.25,2259],[82.37,2013],[75.66,3479],[92.79,979],[92.91,1366],[78.13,3579],[92.18,828],[96.12,1536],[78.51,3291],[54.12,13279],[85.32,2969],[79.56,3766],[84.13,2581],[92.32,1071],[86.23,2218],[81.51,12647],[85.46,2544],[86.94,1875],[88.8,2467],[87.12,1799],[79.82,3320],[78.34,5982],[88.55,1486],[72.14,5797],[85.38,2027],[93.63,3035],[85.61,1954],[92.13,1121],[80.54,2986],[75.49,4074],[79.14,3352],[81.74,2374],[83.42,11191],[92.83,1215],[74.47,5145],[88.88,1488],[90.87,1703],[97.45,448],[77.99,4334],[94.07,767],[78.56,3290],[95.21,551],[82.84,2758],[86.84,1632],[97.83,270],[84.78,2313],[87.44,2075],[98.11,214],[81.85,2698],[85.25,2081],[96.44,697],[91.23,1135],[91.7,1291],[92.18,1924],[91.6,946],[86.76,1843],[96.86,629],[84.53,7373],[92.26,1000],[91.85,4746],[86.62,1953],[88.82,1619],[97.52,277],[80.84,3202],[92.63,972],[75.08,3984],[94.49,651],[79.67,3683],[97.78,301],[81.22,2633],[80.96,2818],[82.15,2342],[92.33,3847],[91.24,1301],[83.48,1905],[85.36,2088],[87.89,1460],[87.33,2660],[69.38,4417],[82.6,1963],[90.04,1679],[87.75,1513],[80.47,3808],[91.44,1192],[83.69,2208],[91.34,1080],[78.85,4699],[89.52,1480],[92.35,1106],[93.15,1050],[93.3,912],[88.76,1602],[89.82,1383],[92.23,1137],[87.66,2569],[93.16,918],[83.83,2419],[79.52,3256],[89.37,2972],[92.55,1337],[87.25,3328],[92.4,1222],[86.97,2125],[89.64,1513],[87.62,1940],[93.35,948],[97.96,256],[91.81,988],[98.19,278],[91.1,1265],[87.98,1742],[69.85,4877],[81.38,2628],[81.83,3981],[97.64,246],[88.71,1665],[93.7,1004],[85.34,3654],[88.9,1953],[75.93,21722],[81.14,9635],[83.39,2674],[88.27,1993],[77.47,2908],[87.08,2247],[72.2,5523],[77.67,4137],[83.46,2172],[96.6,501],[84.51,2873],[90.71,1426],[92.16,1343],[86.61,2122],[96.03,718],[87.73,1786],[77.4,3488],[80.77,5428],[96.76,402],[93.22,869],[85.02,2978],[97.84,384],[90.3,1311],[77.61,3015],[86.77,2939],[94.38,875],[87.62,1574],[91.55,1341],[94.3,698],[87.75,1813],[90.37,1210],[94.77,605],[82.78,3664],[91.7,1135],[79.37,2705],[90.47,1168],[86.66,2054],[93.06,861],[81.98,2410],[84.35,2455],[76.21,2854],[88.71,1386],[86.86,1869],[90.25,1628],[88.18,2416],[82.89,2477],[90.53,1033],[92.27,1118],[89.14,2159],[66.59,5081],[82.62,3335],[90.98,1327],[85.61,2197],[76.29,2962],[85.48,1839],[87.07,2607],[89.63,1420],[93.15,937],[88.7,1514],[90.67,1243],[81.51,2729],[83.77,2912],[89.1,1600],[83.32,2410],[65.52,9038],[92.31,1219],[79.93,2968],[89.13,1441],[92.43,968],[86.82,1969],[85.68,1882],[85.04,2354],[91.81,1044],[93.14,871],[93.35,1092],[87.83,2866],[95.6,490],[88.15,1931],[84.78,2991],[83.29,4498],[81.56,2869],[88.18,2331],[84.54,2174],[93.45,829],[85.19,9853],[91.06,1476],[91.51,1337],[87.91,1641],[81.81,2707],[88.62,2261],[88.88,1512],[90.96,1981],[91.11,1210],[87.51,1671],[90,1429],[69.8,7453],[92.62,1036],[94.04,826],[81.29,3157],[84.25,2386],[89.13,1373],[88.57,1645],[82.6,1994],[87.92,1978],[86.17,1925],[91.86,1220],[94.81,1608],[62.6,5178],[75.93,3873],[90.42,1294],[90.06,1124],[81.27,2983],[91.83,1345],[84.1,2291],[87.73,1454],[83.67,2359],[80.88,3282],[84.73,3266],[91.14,1017],[90.87,1895],[78.26,3813],[84.67,3212],[90.3,1639],[88.29,1562],[88.58,1752],[86.44,2188],[92.8,1027],[79.51,3353],[84.01,2415],[83.29,4548],[91.41,1252],[76.33,4283],[87.27,2323],[91.11,1200],[91.75,1270],[91.68,1605],[91.47,1091],[83.03,2605],[93.38,733],[93.03,1182],[87.82,1936],[86.83,1774],[97.42,377],[93.4,1299],[88.87,1442],[86.09,1640],[81.36,2906],[87.13,1534],[95.56,573],[83.63,2341],[76.3,3827],[94.31,779],[87.04,5201],[89.01,1709],[70.91,4180],[94.66,635],[88.66,1649],[94.82,2127],[82.48,2769],[91.38,1092],[87.86,2096],[93.93,700],[91.74,2862],[90.99,1076],[83.53,2096],[88.27,1419],[91.59,3399],[91.89,1096],[88.24,1960],[77.62,6110],[89.68,2146],[92.36,1014],[91.65,2819],[84.4,2531],[65.67,7776],[87.1,1873],[95.22,1499],[94.32,666],[92.55,1388],[93.88,671],[87.32,1296],[91.85,1174],[86.79,3620],[89.46,1434],[88.19,2150],[83.55,2458],[83.32,2609],[92.66,973],[84.37,2002],[88.43,1616],[94.37,752],[89.58,1533],[89.01,3425],[76.27,3819],[92.73,868],[90.91,1485],[87.48,2117],[93.84,817],[90.57,1567],[80.13,2597],[92.08,891],[90.25,1471],[92.48,863],[87.89,1558],[81.96,3670],[92.34,922],[90.71,1347],[93.92,877],[87.58,1433],[80.76,3994],[92.63,973],[93.68,780],[90.32,1270],[90.88,1626],[86.36,2911],[87.83,1661],[91.05,1778],[92.84,1083],[84.07,7824],[94.36,729],[93.5,828],[93.41,771],[84.7,2322],[85.12,2367],[89.66,1343],[81.41,3131],[90.32,1581],[90.84,1701],[70.88,5745],[90.35,3335],[88.7,1475],[86.52,2162],[96.22,434],[90.39,1497],[66.9,6662],[90.72,1230],[92.79,1281],[91.94,1223],[91.59,1402],[89.33,1669],[78.42,5164],[80.82,4111],[94.25,640],[87.43,2368],[84.3,2207],[92.45,1023],[92.24,1065],[84.92,1982],[85.45,2076],[86.47,1853],[92.49,1215],[93.71,1530],[71.28,4128],[93.43,845],[81.48,4297],[90.24,1444],[83.61,2510],[93.13,813],[85.65,2328],[92.44,1044],[92.63,1163],[89.52,1684],[92.03,1545],[96.75,435],[75.55,5405],[88.5,3499],[87.52,1725],[92.76,1102],[77.65,3278],[85.58,2129],[93.31,1149],[73.68,4839],[88.98,1694],[92.85,2456],[92.36,930],[81.53,6821],[80.84,4574],[70.95,6689],[85.2,2877],[89.71,1697],[95.97,433],[84.26,3168],[88.86,2348],[63.53,12022],[86.76,8464],[90.48,1566],[87.81,1603],[91.22,1136],[81.42,5160],[85.32,1973],[95.65,668],[92.46,1214],[85.51,4699],[88.64,2398],[91.04,1802],[94.38,736],[88.56,2092],[89.17,1717],[81.64,2728],[87.82,2318],[78.12,4421],[93.22,880],[83.95,2404],[85.6,2913],[76.59,3869],[90.17,1567],[91.33,1370],[84.53,2174],[83.98,3309],[75.32,5362],[83.8,2108],[90.29,1376],[92.52,870],[84.33,2521],[89.35,2365],[88.47,2243],[79.67,3453],[85.52,5045],[83.64,4127],[94.25,861],[85.23,1630],[91.43,1217],[78.39,3123],[91.02,1579],[67.64,7513],[96.59,363],[74.32,3527],[88.03,2284],[87.96,1507],[91.63,1226],[83.74,2364],[91.03,1932],[73.21,4220],[77.13,9199],[85.6,2356],[91.8,1198],[92.04,1281],[91.06,1230],[79.5,3819],[93.14,1177],[87.67,1496],[78.68,5683],[71.82,4289],[89.28,2049],[92.6,917],[91.61,1322],[90.67,1224],[87.52,2723],[80.18,2439],[90,1374],[91,1260],[84.63,4600],[82.23,2214],[72.49,5721],[79.9,2474],[94.15,697],[85.93,1647],[81.07,2258],[91.55,1038],[94.65,628],[89.66,1139],[87.38,2377],[71.43,6346],[87.84,2518],[73.17,9239],[88.63,2647],[91.83,1180],[86.64,3330],[92.96,1034],[84.2,3264],[86.72,2459],[74.37,6051],[84.57,2516],[92.89,2812],[71.16,3432],[93.82,685],[80.71,3356],[84.58,2979],[87.83,2340],[81.66,3648],[78.38,7614],[70.84,8084],[90.39,1611],[88.5,1816],[88.36,1633],[84.94,2708],[72.82,5063],[87.55,2228],[94.17,938],[80.69,3915],[89.02,2074],[92.03,1154],[96.22,528],[89.7,1333],[92.03,1276],[87.78,1905],[94.85,613],[88.94,2136],[92.1,976],[86.11,2360],[91.21,1506],[94.45,742],[92.83,1650],[90.15,1620],[87.69,2151],[94.8,698],[93.87,811],[83.16,2229],[85.17,3430],[89.74,1077],[87.54,2033],[91.92,1232],[91.1,1410],[93.3,1058],[90.89,1286],[81.54,2628],[90.25,1804],[81.29,3123],[90.02,1429],[76.23,9950],[77.66,5005],[78.84,4188],[78.21,3080],[85.51,2462],[94.52,941],[91.61,1360],[91.78,1025],[70.43,6568],[85.86,2687],[90.45,2558],[90.66,1515],[87.88,3210],[86.05,5171],[68.07,5287],[83.26,4217],[91.06,4429],[90.16,1285],[90.68,1372],[94.56,729],[86.59,2711],[78.03,3010],[79.26,10816],[86.97,2766],[83.29,2188],[78.21,5651],[84.96,1994],[93.57,1107],[93.38,1317],[81.98,4904],[80.78,4163],[83.72,1893],[84.76,4343],[89.6,1738],[92.23,1080],[89.01,2406],[87.6,1692],[88.6,1748],[92.12,912],[90.58,1510],[79.87,2598],[88.13,1717],[95.92,592],[88.8,2215],[84.79,2288],[94.65,660],[87.85,1859],[70.25,12165],[86.94,1641],[93.14,1039],[93.25,737],[82.92,2373],[78.89,3496],[91.79,1078],[88.25,3598],[72.79,4420],[90.67,1330],[93.21,1029],[94.93,1060],[88.63,2148],[92.31,996],[89.67,1396],[88.55,1827],[91.02,1350],[84.91,2213],[86.03,2285],[91.77,1429],[92.12,1044],[92.8,1274],[85.62,3793],[74.29,4755],[83.42,2976],[83.52,3362],[92.14,1034],[93.07,1449],[84.02,2378],[93.66,1319],[84.69,2100],[85.28,3103],[94.29,1302],[81.05,2404],[94.16,958],[90.78,1548],[85.3,2602],[90.64,1429],[93.84,979],[95.93,692],[86.13,1652],[85.39,2283],[89.34,5211],[89.84,1631],[86.93,1660],[76.77,3828],[91.35,1385],[91.7,1843],[90.73,1849],[81.24,4401],[90.81,2134],[88.75,2853],[77.61,4533],[90.02,1440],[90.46,2013],[90.55,1232],[82.21,2674],[87.43,2538],[92.32,1352],[83.99,2909],[92.58,1542],[84.59,2161],[86.44,1907],[92.62,1330],[72.03,5363],[86.56,2773],[84.55,2381],[86,2211],[85,3761],[73.28,7907],[80.85,2638],[79.87,2957],[88.78,2581],[79.06,2679],[84.15,2725],[94.3,860],[73.8,3703],[75.08,4052],[86.63,1695],[77.54,4526],[82.73,2293],[86.35,1622],[88.47,2017],[93.05,823],[81.11,2843],[86.52,2801],[79.81,3056],[81.56,5544],[94.58,825],[89.74,2044],[92.63,1068],[87.83,1761],[89.58,1960],[89.15,2044],[92.93,979],[84.47,3619],[83.22,2365],[94.51,790],[86.54,2372],[90.3,1560],[88.88,1916],[95.88,689],[79.67,5302],[76.71,5177],[86,2439],[83.37,2632],[69.18,5455],[77.15,5093],[84.19,3683],[69.91,4869],[85.23,2167],[88.69,1521],[87.68,2739],[68.18,8902],[85.13,3564],[89.44,1383],[80.78,4472],[67.03,5392],[89.69,2430],[85.13,2518],[86.71,2059],[90.12,1792],[91.47,1766],[82.19,4281],[83.77,2016],[88.93,4136],[92.32,893],[83.5,2158],[93.82,910],[89.22,2767],[92.98,2425],[94.92,910],[85.52,4456],[86.78,1941],[87.93,2832],[83.63,2947],[70.27,10915],[93.88,912],[95.98,585],[88.71,1934],[92.44,3631],[90.52,4437],[88,4015],[84.2,2102],[81.88,2681],[86.34,5494],[90.57,1302],[95.68,1041],[92.21,1371],[97.22,732],[90.97,2536],[88.63,1596],[87.85,2439],[88.81,9695],[91.71,2423],[92.44,2436],[97.72,494],[78.1,3804],[89.03,1967],[89.27,1533],[90.9,2154],[93.96,875],[95.51,2081],[94.76,1045],[94.31,1493],[84.83,10187],[93.65,1366],[92.66,1103],[83.21,5887],[80.13,5225],[71.53,5851],[89.97,2230],[94.12,1739],[87.41,1655],[92.54,2079],[88.75,1858],[92.27,1421],[92.91,1330],[82.65,5515],[91.13,1646],[91.41,1847],[90.26,2427],[89.04,2195],[88.99,2288],[93.38,2715],[92.33,1457],[89.55,3479],[95.7,747],[91.31,1865],[96.31,695],[87.18,2706],[89.35,1393],[88.77,2935],[95.87,1066],[89.27,2493],[92.26,2209],[89.65,2789],[93.11,923],[94.43,999],[91.73,1130],[89.36,2845],[88.17,2699],[95.87,834],[96.05,852],[90.88,1305],[73.74,3352],[75.61,5541],[96.04,953],[90.94,2669],[81.35,2465],[89.52,2344],[96.41,1192],[96.48,867],[87.11,2404],[81.18,3936],[94.45,1431],[91,2668],[92.83,1173],[95.77,1058],[93.39,1549],[87.85,2002],[89.65,1510],[96.07,1003],[95.45,1027],[83.16,4816],[75.33,4459],[82.56,4293],[84.55,4748],[93.55,1473],[91.58,1737],[95.3,1041],[90.45,1876],[88.52,2977],[89.95,4037],[89.04,4041],[95.33,1217],[95.72,1011],[84.82,5794],[89.64,2783],[94.08,1294],[91.78,1130],[91.93,2274],[88.36,1847],[94.35,2429],[93.12,1219],[85.14,4082],[89.44,1835],[85.34,3134],[95.57,1405],[94.18,920],[79.24,3227],[90.3,1831],[92.58,1223],[94.61,1983],[85.69,2765],[94.09,1379],[73.88,4905],[87.66,2188],[93.19,1972],[97.62,522],[84.08,2421],[92.01,2363],[91.68,1409],[88.49,1967],[92.52,1627],[90.61,2714],[88.36,2096],[90.12,1355],[91.48,1571],[80.38,2882],[91.98,2182],[92,1271],[88.56,2543],[86.15,2030],[89.43,1836],[95.7,962],[96.32,1043],[89.76,2780],[91.29,1856],[96.55,899],[95.34,1611],[89.08,2887],[87.78,3246],[95.06,1609],[88.95,4375],[87.61,2542],[93.1,928],[91.87,3910],[84.59,2479],[80.89,4215],[90.06,4053],[82.46,4214],[83.95,3225],[87.78,2584],[89.17,3293],[92.6,3663],[93.98,1341],[89.81,3552],[86.06,5160],[89.23,1725],[96.55,863],[96.12,807],[90.11,4428],[94.28,782],[80.04,3911],[91.68,2584],[96.29,1071],[88.57,1884],[92.95,1262],[95.89,988],[94.07,1166],[91.7,1341],[64.41,6831],[88.74,1990],[90.47,1896],[65.88,14097],[88.61,4420],[86.51,2103],[97.46,514],[95.93,837],[86.15,2650],[87.11,2993],[94.77,1439],[94.99,1341],[95.44,1589],[91.69,2606],[87.45,5476],[90.63,3370],[89.56,2214],[84.52,2713],[87.76,1730],[78.46,3966],[86.21,4460],[93.57,1342],[89.11,1601],[95.64,1206],[94.58,1630],[80.15,4116],[87.1,3130],[81.37,3666],[80.84,4459],[95.39,788],[95.39,2016],[88.45,1813],[85.38,2502],[90.39,1465],[96.05,1921],[94.15,2388],[89.21,1883],[93.38,1300],[90.1,1512],[84.79,4495],[97.29,1043],[93.32,1758],[92.55,1191],[96.22,1053],[96.51,612],[91.58,1207],[89.75,1214],[95.48,640],[97.67,339],[96.81,471],[96.88,548],[95.31,664],[97.24,383],[97.86,468],[96.62,787],[93.99,5241],[88.74,1713],[88.25,2146],[94,2830],[92.06,2079],[93.76,1367],[93.5,2538],[95.15,1325],[94.51,1376],[85.76,2199],[93.05,1626],[93.83,1141],[90.11,2968],[97.93,739],[97.48,857],[95.95,911],[93.17,4547],[93.07,991],[96.68,459],[95.55,1085],[92.56,2167],[97.76,1096],[94.71,1071],[93.93,2271],[92.88,2771],[95.88,1120],[88.87,5055],[88.66,1927],[95.63,671],[96.07,714],[88.29,2044],[81.79,2588],[94.84,951],[85.31,2073],[85.07,3235],[92.11,2772],[91.69,1951],[87.25,4670],[92.27,1558],[83.26,4597],[95.77,549],[91.43,1570],[97.48,336],[77.1,3751],[92.13,1766],[66.96,4849],[92.03,3021],[89.18,4862],[88.73,1641],[75.02,3756],[97.35,361],[92.35,1672],[70.28,5854],[86.96,4866],[95.58,710],[94.38,744],[98.36,222],[83.44,2123],[92.77,1408],[82.83,3654],[95.36,747],[96.36,708],[87.9,2689],[90.84,1484],[93.08,953],[87.59,2337],[88.41,1399],[90.91,1373],[92.04,1442],[87.13,1745],[94.24,1412],[81.35,3843],[95.36,871],[88.64,2087],[91.37,2160],[91.61,1633],[97.33,382],[90.27,1342],[90.64,2351],[92.26,2539],[95.94,930],[91.42,1628],[90.06,2271],[84.05,2681],[92.34,1976],[91.69,2040],[94.78,1266],[89.3,2731],[97.57,352],[81.39,2833],[89.84,2267],[95.7,1438],[88.89,6165],[96.29,546],[88.31,1719],[89.14,2414],[93.04,1459],[90.2,2291],[75.29,4431],[94.22,1017],[88.94,2177],[96.63,561],[83.66,2662],[96.19,704],[94.03,901],[78.07,3374],[91.23,4046],[85.05,4389],[95.31,1466],[91.28,1339],[89.37,2446],[93.89,1138],[84,4353],[97.2,405],[93.17,3263],[88.99,2107],[91.68,3005],[88.91,2521],[90.67,1330],[90.44,2019],[94.56,802],[85.86,4348],[87.05,2297],[91.49,1176],[93.39,1214],[91.85,1413],[88.06,2921],[86.51,10590],[90.35,4258],[95.86,640],[92.66,1294],[94.63,896],[87.42,2347],[97.01,465],[90.99,1534],[86.21,2776],[97.18,549],[96.36,500],[90.39,1632],[92.97,1695],[91.91,1797],[88.52,1622],[89.76,6927],[88.96,2461],[84.37,3884],[86.26,3838],[91.51,1286],[94.8,721],[90.08,1812],[91.46,2343],[86.44,4487],[93.07,1428],[90.84,1522],[91.45,1556],[92.77,2148],[89.61,2319],[90.55,4674],[74.29,5356],[89.31,1832],[92.17,1561],[94.81,1981],[89.97,1640],[83.04,2647],[85.48,3500],[92.26,1698],[90.41,1735],[90.35,6839],[87.73,1802],[91.28,1832],[93.08,1298],[89.26,2509],[79.86,3450],[83.37,2480],[89.91,3017],[92.75,1257],[79.68,4219],[93.21,2583],[92.75,1364],[91.61,1719],[87.67,3903],[86.74,2216],[93.14,1361],[94.83,914],[89.5,2075],[96.28,792],[90.66,1651],[90.48,1741],[93.15,1425],[90.08,3669],[93.74,1140],[82.12,3389],[93.09,1381],[92.4,1894],[80.31,7749],[81.92,2739],[81.59,3389],[93.88,4618],[92.53,1266],[92.61,1328],[87.66,1865],[95.58,1089],[91.67,2114],[87.74,2271],[88.25,2295],[67.34,13923],[92.9,1076],[86.23,2344],[89.92,3275],[78.5,3449],[91.61,1552],[72.94,5374],[90.66,1458],[72.22,3793],[80.92,5634],[81.54,3203],[93.8,1116],[84.3,6304],[91.43,7127],[95.18,678],[93.44,1809],[63.36,19500],[77.5,13979],[92.14,2158],[92.89,3041],[83.11,3285],[56.11,18002],[92.9,1226],[92.29,2728],[83.08,3823],[90.2,5335],[94.12,1744],[82.53,4531],[88.83,7272],[96.78,332],[94.37,1966],[78.12,6440],[89.01,6635],[73.13,8618],[89.53,1313],[93.54,2722],[75.18,20627],[94.58,800],[78.78,4568],[88.91,2850],[62.92,12004],[67.82,13438],[98.01,268],[86.4,7809],[92.84,3142],[94.43,1332],[82.64,4701],[86.77,4930],[93.25,2224],[92.57,1058],[84.49,5043],[86.97,7012],[84.27,5435],[83.83,4022],[92.22,2788],[84.33,4746],[79.71,7471],[84.87,11174],[83.4,10360],[75.7,10673],[82.41,13252],[92.98,3249],[65.07,14967],[85.15,7633],[80.88,5350],[86.74,3098],[87.85,7682],[82.02,6101],[80.38,6831],[75.57,9256],[82.76,4762],[90.63,2903],[91.93,3348],[78.92,4826],[94.73,2292],[86,5282],[82.14,4427],[93.76,2009],[89.92,5557],[78.67,6338],[93.55,2713],[86.61,7770],[82.12,7033],[91.54,3607],[91.14,5139],[84.3,10067],[92.17,3934],[86.83,8076],[74.87,18463],[81.67,8335],[93.94,3015],[92.48,2925],[91.48,3733],[83.28,4209],[77.01,5697],[90.01,3780],[77.7,5074],[81.85,15119],[97.99,203],[75.88,14356],[79.82,17803],[94.62,653],[61.54,16513],[84.12,11266],[94.84,641],[70.44,11875],[75.9,11752],[97.76,256],[75.09,12625],[85.28,11606],[97.82,234],[93.2,1106],[92.61,1192],[81.11,4974],[96.05,851],[85.17,3865],[97.52,357],[92.49,1155],[94,2152],[95.99,1610],[93.66,992],[95.12,835],[91.47,5552],[94.59,1336],[92.27,2273],[91.27,1721],[96.05,632],[95.55,1954],[95.56,1118],[91.6,2345],[88.57,1593],[95.73,568],[89.22,1992],[91.14,3638],[95.03,1575],[93.37,963],[95.32,1153],[94.43,1515],[91.76,1933],[89.55,2336],[93.09,1042],[93.49,1619],[98.49,814],[91.43,2317],[89.78,1853],[94.25,1278],[84.62,4160],[97,653],[93.17,1681],[88.17,1606],[91.7,1659],[89.88,2162],[94.75,1262],[90.95,4694],[97.81,351],[90.3,2120],[96.7,1052],[92.24,2714],[97.87,308],[90.73,1390],[95.41,754],[92.97,2485],[86.56,5856],[86.15,3055],[69.39,11008],[96.78,985],[82.7,7237],[93.44,2197],[96.48,860],[98.48,228],[81.28,3667],[91.98,1337],[95.75,838],[95.92,1588],[96.64,516],[93.67,1002],[97.01,505],[97.47,999],[96.2,803],[78.08,3592],[95.7,722],[91.47,1479],[95.78,1265],[86.54,4114],[90.94,2147],[75.31,5838],[95.19,3228],[94.22,1859],[90.71,1554],[92.6,1431],[96.1,1202],[87.19,2528],[92.98,2393],[92.54,1158],[86.43,7021],[94.7,1508],[96.13,792],[97.16,443],[85.25,9136],[89.28,1966],[89.98,2484],[95.77,1665],[90.45,4531],[91.43,1826],[95.75,628],[96.25,1281],[94.69,1790],[93.5,1256],[95.99,708],[92.8,1633],[92.18,1446],[95.33,1270],[90.4,3478],[96.59,1315],[94.46,1180],[98.06,1005],[87.55,1835],[94.75,1272],[85.15,3923],[86.69,4000],[98.41,372],[76.27,3912],[95.53,912],[91.85,1952],[95.75,1304],[87.68,1752],[97.05,655],[92.68,1015],[88.08,2924],[96.73,848],[77.73,6011],[96.43,776],[86.97,2580],[96.9,1844],[89.5,2851],[90.3,1958],[94.52,984],[81.18,4053],[92.12,1763],[90.8,5622],[88.5,2958],[93.24,1767],[91.43,5978],[79.5,11563],[81.85,5874],[93.42,1256],[89.87,8065],[77.52,8036],[79.2,7568],[76.09,6570],[88.16,4667],[79.75,12741],[91.33,6865],[83.78,3325],[86.46,3829],[79.94,17461],[93.08,3821],[81.81,4144],[79.03,10396],[90.46,5910],[93.38,2207],[85.15,3828],[47.81,9542],[82.7,8537],[82.98,9132],[79.91,3395],[70.92,12171],[85.11,10340],[68.8,19439],[84.94,3286],[83.34,5220],[61.49,17446],[89.22,4765],[60.39,17455],[84.26,4809],[86.32,5047],[90.59,3632],[84.18,3490],[84.83,2413],[72.73,17717],[83.09,10726],[70.61,9906],[83.12,6796],[79.63,10457],[78.85,5642],[76.96,13295],[75.75,7034],[58.15,11257],[82.84,11657],[93.27,2491],[90.37,2497],[90.84,3350],[64.14,18471],[85.82,3126],[81.75,7084],[93.92,1956],[79,5421],[87.13,4332],[83.2,6643],[90.94,1997],[92.48,1490],[83.92,7041],[87.33,7621],[85.43,5136],[88.33,4993],[88.89,1938],[80.58,11421],[89.13,2752],[90.75,1661],[73.45,4604],[70.28,12193],[80.07,5508],[93.22,1230],[60.15,8424],[93.46,3430],[85.58,4391],[86.63,1980],[71.36,7267],[95.06,2203],[89.56,4565],[84.88,3912],[87.66,1852],[81.15,4497],[80.73,4362],[88.16,3731],[88.47,1658],[81.37,3359],[70.55,11632],[82.3,5396],[85.94,5674],[90.65,5222],[91.38,2085],[78.87,6525],[73.33,10233],[87.36,2284],[85.84,7095],[95.52,1324],[88.44,5099],[81.35,4080],[77.07,13064],[80.13,4789],[82.23,7910],[94.54,964],[80.72,4311],[84.85,3261],[86.09,2690],[93.71,6816],[70.09,7803],[76.67,4103],[77.03,9879],[85.9,1952],[77.73,7186],[83.37,4824],[79.68,7117],[89.16,3154],[90.02,1857],[84.21,4748],[62.52,9358],[82.82,5084],[91.74,3256],[77.52,5054],[87.44,1626],[72.55,8501],[83.95,6577],[94.24,1546],[91.42,1030],[73.31,8585],[81.25,11324],[56.7,16650],[95.31,1368],[83.67,6253],[89.3,1790],[80.34,5769],[81.88,3108],[81.85,5592],[78.48,9422],[80.04,2716],[85.9,2954],[88.04,4489],[92.67,3143],[83.77,4675],[83.38,4006],[68.31,7431],[86.19,2588],[91.74,3101],[77.51,5148],[90.88,2792],[83.14,4785],[94.74,895],[88.93,3507],[85.78,5238],[94.95,1073],[90.13,1127],[95.49,1501],[87.12,1967],[89.86,1449],[95.81,1089],[88.49,2024],[95.86,582],[87.82,3042],[87.27,1934],[97.04,710],[94.77,5211],[91.86,3214],[81.98,5198],[90.82,1512],[92.53,1259],[98.05,506],[97.93,248],[96.11,615],[83.52,5260],[94.54,998],[87.53,2483],[96.77,1056],[94.69,661],[93.13,2811],[97.06,696],[96.3,625],[96.1,695],[96.13,752],[91.1,1653],[95.32,834],[95.37,1830],[92.87,1331],[89.44,2142],[96.1,581],[98.67,315],[89.99,1911],[96.14,1046],[96.74,511],[93.52,1621],[65.74,4930],[95.91,919],[96.24,891],[88.65,1939],[89.86,8318],[82.35,9558],[96.41,1233],[94.18,1123],[90.29,1643],[95.9,2402],[95.58,743],[95.59,1286],[78.49,21013],[94.53,1857],[95.53,1667],[81.52,3782],[97.54,372],[81.94,7727],[94.07,1807],[92.59,2313],[83.78,2828],[93.81,857],[97.48,949],[87.91,4685],[87.95,2525],[93.67,2175],[91.21,1368],[95.21,1500],[97.35,541],[91.84,1535],[94.37,2100],[92.75,1623],[91.62,1746],[96.69,694],[90.53,2291],[87.68,1934],[85.31,1989],[90.62,3118],[85.5,3527],[91.69,1034],[66.74,8268],[80.5,3734],[87.7,3596],[80.6,2460],[86.02,1775],[84.44,3764],[88.26,1513],[81.74,5108],[88.17,1789],[86.83,4678],[84.67,1924],[86.47,2496],[65.21,4385],[66.76,8850],[69.46,5602],[84.12,2785],[81.73,4762],[63.96,8744],[71.86,3768],[82.46,2693],[90.44,1024],[52.75,9266],[76.84,6049],[87.88,1776],[81.29,3360],[80.21,7560],[62.58,4853],[87.25,1747],[86.37,5699],[65.76,7676],[93.76,718],[92.66,1084],[75.19,2662],[89.74,1355],[79.77,3427],[82.2,2359],[88.27,1578],[79.1,2542],[87.25,2386],[87.58,1860],[89.9,1449],[64.58,10351],[84.24,1962],[94.46,823],[96.22,462],[90.03,3018],[89.71,1407],[88.07,1943],[92.04,1701],[85.53,2098],[92.02,862],[92.24,942],[93.45,935],[90.88,1180],[90.79,2032],[85.2,1883],[92.44,896],[85.77,1704],[90.46,1277],[80.57,2595],[82.9,2261],[86.64,2124],[75.7,3486],[92.51,1043],[82.33,2335],[90.04,1395],[76.25,4251],[86.64,1994],[90.62,1185],[87.34,1680],[82.56,2377],[84.57,3653],[90.75,1287],[88.06,1696],[86.9,2162],[93.93,2368],[89.39,2232],[88.64,2140],[92.29,985],[95.48,623],[94.71,836],[95.39,504],[96.77,405],[95.36,495],[97.55,252],[85.78,2246],[96.35,533],[97.22,312],[96.96,337],[91.52,5254],[93.99,945],[97.71,264],[94.95,913],[62.17,10115],[97.64,376],[98.53,164],[95.65,467],[94.72,699],[96.41,411],[96.51,512],[93.26,894],[76.74,5514],[97.38,387],[93.5,953],[87.37,9168],[92.76,3778],[91.9,2068],[81.91,5126],[81.95,8224],[76.36,27700],[91.4,3123],[95.72,1664],[92.28,4393],[89.44,4608],[86.8,7460],[95.44,1631],[95.45,1705],[83.99,6482],[89.11,5258],[78.22,10563],[94.09,2517],[87.05,3154],[90.4,2740],[74.57,13261],[91.59,3937],[95.92,1754],[93.71,3484],[83.95,11864],[93.96,2655],[89.62,3974],[87.87,5602],[70.9,5725],[89.89,3317],[91.55,3224],[89.93,3438],[90.2,3219],[61.93,32322],[89.87,6274],[91.34,2923],[92.9,2571],[95.89,1996],[90.86,4428],[82.51,11758],[95.8,921],[97.47,327],[87.51,3214],[81.81,4934],[96.99,749],[83.12,5854],[96.14,559],[85.62,2894],[95.15,900],[97.46,415],[95.3,1876],[93.92,958],[95.1,3425],[72.53,6893],[95.35,1098],[98.51,207],[89.85,5483],[76.26,4986],[89.5,2106],[98.39,217],[94.78,3682],[90.78,2435],[95.59,858],[97.48,447],[97.05,661],[92.01,2861],[96.06,850],[97.68,526],[96.94,1528],[98.58,180],[95.75,6942],[88.73,4311],[91.54,2193],[96.42,723],[98.26,271],[92.17,3870],[94.71,1055],[68.76,4585],[89.84,3158],[92.05,1953],[96.33,740],[88.88,2516],[95.94,1000],[94.76,1340],[90.2,1854],[94.61,1486],[94.15,849],[95.56,677],[87.65,3456],[95.4,900],[96.36,555],[90.22,4074],[89.74,1912],[85.8,1925],[68.28,3736],[95.13,980],[88.79,1741],[95.64,811],[82.59,7673],[81.22,3717],[92.35,1996],[81.33,3038],[79.56,5871],[93.16,2869],[84.88,3680],[91.01,1323],[94.44,4159],[95.19,1589],[90.07,3142],[89.11,2209],[95.2,1282],[90.58,1618],[90.21,1416],[97.55,502],[93.9,1607],[96.57,1559],[87.52,2649],[98.14,300],[92.84,1763],[85.65,2881],[86.18,1637],[59.37,9990],[94.99,676],[81.9,2014],[93.37,779],[88.11,2108],[81.23,5033],[94.73,630],[86.48,2942],[85.91,1836],[65.61,12642],[83.69,2391],[86.85,1897],[95.76,776],[95.53,716],[81.09,3155],[89.28,2847],[76.79,4382],[89.99,1812],[89.31,2262],[87.41,2263],[94.39,1146],[88.26,2339],[88.29,3164],[90.49,1311],[88.82,2171],[87.73,4582],[87.21,4946],[87.05,4837],[90.52,2327],[93.43,2385],[88.09,3050],[85.32,5473],[87.8,3263],[81.73,4263],[90.04,3063],[90.8,3390],[79.26,10529],[81.32,7071],[87.59,4720],[88.73,4829],[93.85,2410],[95.95,1480],[89.5,3115],[95.1,1353],[91.13,2122],[79.44,6797],[85.53,4313],[86.99,4123],[92.01,4488],[88.35,4414],[78.32,9836],[92.73,3659],[73.28,18018],[92.05,4345],[96.5,1610],[91.72,5062],[84.53,5367],[76.51,15610],[88.29,3664],[92.32,2436],[93.56,940],[93.59,1020],[93.46,943],[84.78,1968],[65.96,17170],[90.9,1611],[87.95,1533],[85.6,2342],[72.37,4171],[69.08,5528],[76.11,3317],[83.79,2546],[85.4,2209],[65.87,11638],[87.19,1978],[87.44,2450],[90.44,1510],[77.67,6819],[82.66,2303],[89.55,1655],[78.49,3403],[85.1,2278],[89.01,2462],[75.87,7598],[89.58,2355],[90.33,1262],[90.08,1305],[87.5,2439],[94.74,818],[83.26,2155],[79.72,2788],[91.85,1226],[77.72,3008],[81.82,2871],[80.42,3425],[82.06,2300],[87.92,1605],[87.99,1751],[82.51,2472],[90.14,1647],[92.83,1146],[88.91,1940],[89.64,1376],[86.76,2154],[70.69,27518],[77,12106],[62.98,28050],[88.34,2032],[77.16,2753],[90.9,2049],[89.4,2870],[85.6,2044],[93.61,2590],[92.29,969],[82.13,3408],[94.02,1084],[76.67,2586],[72.38,20105],[70.38,10955],[94.88,1169],[87.75,19230],[86.27,2031],[90.74,1515],[92.3,1244],[90.61,2035],[90.88,2277],[91.5,1489],[98.03,296],[93.66,1344],[82.82,3981],[95.59,894],[96.42,791],[91.61,1989],[90.13,1790],[93.04,1247],[95.97,1161],[96.32,551],[92.62,1130],[91.43,2436],[86.92,4062],[94.83,2704],[95.17,1925],[82.22,2619],[87.98,3177],[96.78,422],[84.9,3751],[75.45,10139],[89.78,1546],[96.15,562],[88.16,2243],[84.83,2805],[85.58,2516],[93.84,2059],[93.81,1342],[85.72,3313],[79.19,3914],[89.15,1971],[94.1,1811],[88.56,3501],[89.6,1904],[71.09,6817],[88.13,2800],[95.49,583],[96.86,549],[71.38,6467],[97.55,330],[88.14,3725],[90.19,2317],[95.56,939],[76.27,5751],[94.63,740],[97.52,301],[82.94,3465],[90.7,1446],[94.71,733],[85.05,3312],[91.97,3201],[90.32,1190],[96.14,928],[77.51,4431],[85.98,4023],[88.48,6759],[94.13,930],[96.8,832],[83.34,2683],[90.4,1623],[81.64,3137],[90.81,2566],[98.46,197],[92.01,1291],[94.68,986],[89.17,2127],[94.84,701],[97.42,682],[78.15,5298],[92.23,1535],[87.78,3491],[81.32,5330],[93.63,1036],[97.06,388],[77.62,4130],[85.7,3762],[88.79,2054],[88.25,2384],[89,2472],[87.67,1424],[93.12,874],[89.17,1640],[95.28,525],[89.37,1817],[89.46,3378],[84.96,3680],[92.63,2247],[94.64,1278],[86.33,6228],[94.92,678],[94.46,912],[85,3919],[91.27,1651],[85.36,8610],[94.26,2011],[78.52,6370],[90.19,1866],[92.05,5129],[90.66,1610],[87.78,1610],[74.89,6146],[85.68,1817],[85.98,2988],[91.86,1200],[92.57,999],[87.4,1867],[89.65,1901],[87.03,2376],[83.64,4551],[94.93,633],[77.01,6335],[87.2,2246],[93.41,950],[82.67,2330],[87.18,2089],[91.19,2943],[96.54,811],[96.98,559],[96.28,1609],[94.99,2275],[95.7,1958],[89.33,2664],[97.09,414],[93.93,1066],[95.18,768],[77.29,3573],[96.09,872],[95.54,907],[90.64,1519],[97.87,384],[93.07,1236],[96.48,2092],[94.31,1039],[86.1,2333],[93.7,1239],[84.47,3837],[93.46,816],[92.12,3435],[94.07,1257],[94.91,1031],[95.62,859],[97.16,330],[87.38,2640],[88.71,2715],[96.79,437],[97.51,459],[96.19,524],[96.08,1632],[84.42,3534],[93.23,1316],[95.56,806],[89.59,3062],[82.3,5326],[97.68,358],[95.75,559],[85.42,4941],[96.01,509],[96.25,521],[96.85,401],[86.12,5658],[97.67,783],[90.19,2815],[95.15,729],[95.64,1365],[97.05,563],[94.64,3124],[93.52,855],[96.97,739],[96.88,832],[88.7,1883],[97.59,903],[91.1,2258],[94.66,1489],[94.27,956],[94.91,1951],[88.27,2848],[96.75,603],[92.25,3505],[84.4,2258],[97.43,389],[91.09,2757],[91.56,1679],[97.09,658],[97.26,423],[94.81,1186],[95.79,644],[95.93,551],[97.83,421],[95.31,1780],[98.53,283],[97.12,522],[86.29,5707],[96.59,488],[96.89,416],[96.02,1374],[96.47,628],[95.26,1716],[95.51,856],[96.27,527],[90.69,1377],[94.34,1225],[96.84,550],[96.03,557],[92.98,2208],[95.38,640],[97.73,529],[85.53,8634],[89.47,2093],[95.59,810],[97.46,890],[94.37,1687],[96.23,837],[94.93,1346],[95.63,1298],[92.51,1423],[91.93,2369],[94.86,1197],[96.76,640],[90.39,2099],[85.11,2465],[88.88,3930],[94.15,1146],[94.23,1115],[95.87,813],[97.07,525],[95.28,1987],[97.44,528],[87.61,2572],[95.9,954],[88.95,3060],[97.06,366],[95.92,1117],[96.07,1216],[69.07,5392],[97.41,313],[96.58,607],[90.52,2029],[95.65,1033],[96.17,594],[97.52,356],[91.15,2286],[98.2,558],[98.12,291],[80.24,10190],[92.73,3004],[96.48,448],[93.27,1617],[88.81,2590],[95.05,591],[93.13,921],[95.04,1851],[90.12,3309],[92.51,988],[92.98,1697],[95.1,799],[92.99,1784],[95.93,658],[94.86,1406],[90.49,4179],[97.91,527],[94.35,1177],[96.39,536],[93.24,945],[92.66,1353],[95.76,1184],[96.79,479],[93.04,1025],[95.71,3921],[96.15,820],[93.45,1663],[90.95,2137],[88.77,1563],[97.75,349],[95.96,780],[84.53,7203],[69.29,3702],[94.61,987],[93.8,1427],[75.4,6185],[93.16,1413],[82.12,7077],[96.65,396],[93.1,2175],[94.2,1458],[90.76,1040],[89.15,2895],[81.87,3126],[94.82,830],[96.12,1551],[96.07,983],[88.27,5110],[90.93,2746],[87.89,1603],[97.09,1246],[93.5,2433],[93.55,1348],[81.94,2164],[94.97,2065],[97.58,326],[90.48,1839],[85.15,1739],[87.54,2707],[97.41,328],[97.52,372],[89.82,1523],[98.53,183],[97.24,456],[98.51,213],[80.82,6572],[95.34,784],[97.73,276],[97.45,411],[84.58,5560],[96.37,717],[91.11,1535],[87.77,2099],[96.34,1257],[95.56,955],[92.84,1008],[96.44,498],[93.79,1384],[94.54,1005],[93.95,994],[95.42,1165],[95.54,3547],[95.54,626],[94.9,756],[90.79,2015],[90.4,2067],[92.05,1191],[97.03,684],[95.65,1282],[84.94,2457],[94.53,1681],[92.94,1147],[92.83,5061],[93.23,1821],[89.22,1683],[86.41,2083],[95.91,1271],[94.48,1859],[86.5,2766],[95.19,809],[96.95,454],[75.92,11794],[96.76,853],[92.04,1342],[90.33,1540],[94.11,1198],[86.23,2638],[96.45,1056],[92.49,1517],[91.21,2592],[95.84,1025],[89.07,2786],[92.52,2945],[95.82,628],[94.86,999],[93.26,1326],[92.74,1782],[97.06,476],[96.32,648],[97.04,771],[98.46,303],[96.55,562],[97.46,788],[93.28,946],[94.13,1296],[84.41,5775],[92.72,1728],[88.08,4414],[88.02,1666],[92.39,2250],[96.87,971],[88.72,3036],[97.14,472],[96.51,612],[91.01,2032],[90.28,1901],[84.62,2615],[87.67,3137],[95.95,706],[92.96,1977],[95.62,647],[96.5,518],[91.68,3269],[89.26,1780],[92.5,1218],[89.84,1588],[82.95,3070],[80.12,2321],[91.13,1175],[75.32,4550],[94.1,957],[91.63,2032],[34.38,11277],[95.36,1041],[91.12,1478],[94.16,2008],[92.79,2594],[87.65,2664],[92.06,1759],[95.5,1546],[93.39,1815],[92.75,6718],[93.38,2114],[85.58,2586],[95.84,1177],[96.52,804],[85.2,10716],[94.63,674],[95.3,1569],[62.38,11794],[94.02,2009],[97.66,383],[81.06,3828],[87.73,1702],[96.14,689],[82.56,4415],[90.33,1674],[94.64,889],[77.8,4404],[93.33,979],[88.26,1618],[94.11,1162],[88.67,2822],[96.33,1028],[89.69,2040],[82.24,3321],[95.34,810],[89.17,3078],[90.5,1882],[92.16,1159],[96.27,572],[95.97,880],[89.42,1929],[81.93,2563],[81.56,3990],[96.51,577],[88.76,2529],[84.24,4430],[95.48,780],[78.89,2770],[86.18,1951],[70.45,5251],[90.17,2101],[93.32,1504],[97.84,563],[85.07,2294],[93.34,1462],[94.98,888],[88.17,2755],[94.16,1058],[95.61,940],[95.85,657],[88.32,2590],[85.31,7568],[91.63,1546],[84.45,3380],[89.17,3265],[96.74,1368],[88.7,3115],[83.19,2983],[86.31,2062],[88.74,2494],[89.93,1768],[75.38,4342],[89.16,6694],[88.1,2811],[88.17,2379],[89.54,1729],[91.48,2440],[92.88,1235],[85.72,1956],[93.14,2354],[84.45,2425],[89.08,3044],[87.91,1719],[92.58,1135],[91.13,1472],[92.38,1387],[61.53,22937],[82.74,4881],[87.76,1876],[92.6,1210],[88.27,2655],[90.07,2944],[93.22,2686],[88.47,1878],[92.63,1951],[93.12,1397],[97.46,467],[97,688],[88.58,1529],[90.92,4166],[95.61,1342],[89.01,1725],[84.35,2576],[79.43,3402],[93.78,3988],[96.25,606],[85.54,3126],[84.92,2216],[86.76,4217],[90.63,1381],[92.99,1300],[84.38,2545],[95.06,2880],[91.89,1417],[85.25,6595],[94.65,2112],[79.26,5942],[94.98,1014],[88.38,12722],[79.75,4188],[88.28,4586],[83.69,2540],[92.51,1188],[93.98,1277],[90.85,2580],[78.65,4124],[82.31,2245],[94.32,1984],[83.98,2327],[94.95,2778],[86.67,2092],[90.77,1397],[95.17,831],[94.03,2440],[97.12,634],[89.07,2525],[80.44,3115],[95.54,1454],[94.95,764],[86.43,2460],[96.15,2297],[96.74,623],[81.72,3039],[97.16,551],[86.23,4102],[88.84,2485],[97.21,6040],[90.84,2664],[87.86,2228],[96.44,601],[96.34,611],[86.35,5356],[69.55,7048],[95.48,1275],[96.82,505],[88.13,3607],[80.91,3132],[96.07,1774],[92.15,939],[93.93,991],[73.34,4126],[76.16,4060],[93.33,954],[92.96,1019],[89.53,1510],[83.08,2779],[88.75,1349],[90.98,1249],[89.76,1929],[87.3,1845],[89.73,1299],[51.59,13511],[87.34,1676],[90.67,1341],[74.4,3550],[91.45,1201],[86.55,2528],[82.62,2473],[89.99,1237],[78.09,4230],[92.87,1169],[90.07,3396],[87.95,1997],[90.14,1323],[84.2,2631],[91.23,1172],[86.93,2263],[90.59,1629],[89.24,2337],[92.89,956],[73.26,3371],[84.18,1941],[89.58,2062],[90.97,1901],[89.99,1486],[85.08,3028],[82.42,2765],[87.9,1912],[40.48,25943],[91.34,1328],[87.87,2229],[93.89,832],[87.39,1611],[87.6,1814],[89.38,1235],[89.35,1517],[61.88,6094],[88.31,2226],[89.01,1756],[90.47,1163],[85.82,2388],[92.75,1145],[90.16,2609],[92.66,1184],[90.74,1368],[91.02,1272],[85.09,4677],[93.85,2073],[89.79,1504],[90.05,1594],[80.81,3730],[92.07,1216],[89.62,1798],[89.99,1451],[73.57,3324],[88.22,1980],[75.3,3407],[85.68,2665],[86.43,2715],[92.4,1425],[90.03,1079],[74.87,4707],[83.88,3117],[93.33,808],[92.07,1233],[66.88,4795],[93.28,897],[90.54,1633],[86.6,2405],[73.45,3638],[86.17,2058],[89.91,1484],[97.57,348],[61.21,6776],[66.41,4262],[95.98,493],[95.19,590],[75.47,4695],[95.48,635],[71.46,3956],[96.16,473],[87.8,2109],[83.12,2612],[97.71,369],[92.43,915],[83.6,3601],[86.59,1729],[92.9,2091],[97.3,379],[91.61,1323],[92.23,1062],[91.54,1342],[91.13,1216],[96.22,502],[82.12,4977],[95.94,446],[88.88,2604],[90.37,1430],[92.74,1038],[91.06,1231],[90.3,1592],[84.86,1885],[89.97,2124],[88.54,2373],[81.53,3951],[88.31,1762],[98.56,202],[88.66,1623],[95.12,769],[79.48,2086],[92.89,897],[76.78,6186],[81.08,2394],[66.94,6648],[85.54,2085],[88.6,1945],[91.52,1556],[93.49,826],[76.84,6945],[85.57,1742],[69.18,4215],[96.53,583],[90.89,1514],[91.63,1089],[88.16,1879],[80.67,2703],[84.08,1975],[77.23,17262],[83.59,4195],[97.84,361],[91.41,1577],[91.01,1195],[88.35,2059],[81.84,2990],[92.58,894],[94.87,721],[94.97,1191],[92.11,2433],[97.14,634],[97.6,519],[97.58,582],[96.92,629],[96.33,1042],[90.28,3268],[95.85,2001],[94.95,938],[98.41,328],[91.35,2166],[96.78,545],[92.93,1072],[93.2,1132],[94.87,605],[92.22,2819],[79.49,7223],[88.37,2939],[92.83,2234],[88.4,2514],[96.21,1365],[88.59,2415],[92.38,11593],[94.38,1408],[83.98,4453],[95.96,654],[91.9,3715],[88.68,1671],[93.91,1159],[97.06,667],[95.33,1234],[89.48,1636],[94.86,1382],[96.78,592],[96.5,615],[90.06,7751],[92.53,1864],[88.39,2619],[91.27,2379],[86.66,5587],[28,7540],[96.33,539],[84.84,6528],[96,532],[94.93,1112],[94.44,913],[96.94,415],[89.48,2188],[97.12,422],[97.14,438],[96.57,857],[87.25,5581],[93.42,1255],[80.84,6833],[91.85,1486],[88.46,1814],[81.78,3367],[94.08,2133],[83.96,4812],[94.62,2121],[96.87,1172],[96.9,768],[83.26,9725],[93.84,1551],[84.24,11491],[92.21,3125],[91.78,2185],[94.22,1402],[95.58,1707],[97.73,788],[93.97,1343],[90.21,3763],[93.33,1940],[96.51,1149],[94,985],[97.98,618],[96.09,757],[95.77,616],[97.25,433],[98.51,259],[96.57,1202],[87.26,2170],[97.36,629],[97.12,534],[94.11,1996],[90.63,2272],[98.34,271],[95.89,679],[97.32,465],[91.44,2624],[93.79,1064],[97.68,444],[88.65,4298],[92.4,1844],[94.17,1551],[60.3,21154],[88.69,3739],[95.98,2109],[94.97,1998],[96.55,610],[95.66,1416],[89.23,3092],[97.22,578],[94.08,1042],[95.54,1544],[94.3,1430],[93.67,2035],[97.23,643],[96.23,917],[87.49,4198],[97.56,766],[96.44,610],[95.45,797],[83.54,4546],[89.16,2717],[94.3,1638],[93.4,957],[71.09,12118],[96.08,687],[90.51,1319],[94.05,955],[96.22,627],[88.16,1660],[89.31,1656],[97.34,636],[94.58,1143],[95.74,744],[92.18,1135],[95.99,845],[84.36,14832],[96.11,919],[88.11,2579],[95.75,1236],[89.91,3886],[93.38,1509],[91.88,1210],[95.63,1025],[90.41,2516],[88.66,4316],[93.19,1592],[95.95,927],[92.39,2693],[96.5,1467],[94.29,1284],[93.5,1232],[94.95,1401],[96.69,995],[86.66,2671],[89.53,3339],[95.02,1132],[94.14,1698],[81.99,2735],[94.56,1870],[95,1606],[95.99,855],[94.28,1537],[85.07,5166],[94.07,988],[74.37,8870],[95.09,1253],[87.92,3637],[93.08,2019],[87.75,1632],[96.73,1500],[84.41,2767],[85.06,2584],[95.22,848],[87.23,2288],[65.43,6298],[93.35,2258],[81.59,4341],[88.05,2094],[78.1,4209],[97.56,430],[91.28,1538],[68.63,9296],[94.56,1268],[90.53,5877],[94.19,939],[95.75,1219],[86.52,2217],[95.68,742],[95.1,1071],[90.36,1292],[95.78,1222],[95.34,1187],[95.19,1592],[97.55,571],[96.6,1540],[89.99,4409],[63.58,6131],[84.69,5197],[96.14,633],[96.47,453],[81.47,3666],[93.07,1583],[94.31,2547],[95.58,2273],[66.49,3709],[94.45,1980],[69.39,8286],[93.88,3957],[70.5,6509],[96,2014],[84,2536],[97.13,555],[93.31,1555],[97.85,472],[74.74,7101],[92.59,3358],[92.64,1419],[62.79,4213],[94.16,1518],[97.03,612],[72.05,7877],[77.95,11448],[89.97,2744],[81.46,8228],[80.6,3306],[90.11,2536],[79.71,2172],[93.08,855],[84.88,2852],[96.66,1395],[94.39,1506],[96.26,1790],[77.56,7133],[96.63,456],[98.29,260],[94.69,3370],[83.56,3041],[97.52,355],[93.41,3174],[95.41,1000],[88.11,3232],[84.87,4661],[93.94,1369],[96.94,416],[94.98,929],[81.14,2975],[95.16,746],[88.86,2362],[95.57,1016],[86.74,2070],[88.71,4716],[96.89,451],[81.79,5001],[94.99,1036],[98.22,293],[93.22,2807],[81.42,3738],[95.13,1927],[95.95,2558],[97.87,268],[81.5,3844],[91.8,1429],[96.35,1549],[97.97,230],[87.3,1839],[96.09,1165],[90.27,3574],[96.21,566],[83.54,2527],[94.62,1932],[97.45,1239],[97.47,394],[82.47,2879],[97.79,633],[94.9,676],[96.42,799],[91.09,2001],[71.16,23641],[96.38,607],[94.99,891],[92.63,1406],[94.75,856],[90.41,2496],[97.48,394],[91.38,1736],[93.24,1310],[96.07,898],[92.93,1955],[90.44,2460],[85.92,5796],[86.09,2782],[95.87,4401],[96.15,786],[80.82,4939],[73.89,5428],[83.32,5600],[97.13,553],[96.78,409],[82.94,4282],[94.14,945],[98.34,314],[94.03,1551],[82.54,3705],[94.97,1407],[92.43,2085],[97.4,332],[88.32,1688],[97.53,489],[93.55,1886],[97.32,1071],[97.87,263],[96.77,624],[88.64,2117],[96.19,976],[93.46,1638],[88.79,2988],[95.16,1641],[88.57,2886],[92.29,1604],[89.99,1953],[93.32,1936],[95.37,1880],[89.6,2151],[91.59,4977],[85.34,2294],[92.11,1806],[73.6,11758],[95.94,955],[79.51,15117],[94.3,1420],[84.69,2810],[82.49,2558],[95.6,1550],[96.34,1257],[79.12,4466],[75.97,4739],[85.47,8659],[96.02,859],[83.55,3693],[93.91,1186],[89.47,2649],[75.11,4003],[86.16,17290],[92.63,2119],[89.34,3674],[96.48,802],[82.3,4668],[91.58,2261],[88.36,2311],[83.51,3510],[89.35,1826],[85.6,2855],[87.08,2266],[87.38,2513],[88.45,2705],[80.05,4152],[91.83,1750],[81.77,5382],[90.68,1878],[72.31,7089],[69.6,5848],[94.05,1279],[58.03,14135],[80.49,5265],[94.56,2671],[88.39,8650],[95.41,1017],[88.93,1995],[88.82,1727],[93.55,1464],[96.46,704],[94.25,1564],[93.11,2473],[87.75,1732],[79.25,4093],[88.41,2433],[94.81,1400],[94.21,1769],[94.57,806],[95.66,1062],[94.31,2355],[89.95,2170],[89.63,2376],[80.85,9853],[91.63,2407],[95.25,1911],[84.52,2451],[85.22,5321],[94.94,1440],[96.49,634],[91.42,4808],[80.69,8415],[96.6,884],[93.03,5683],[82.75,4084],[90.59,3954],[86.08,2882],[96.12,1222],[84.63,2394],[85.34,3023],[96,816],[81.99,2511],[91.17,1599],[92.95,1651],[94.39,856],[92.29,3547],[92.63,9113],[88.3,2255],[92.95,3860],[90.39,1780],[93.44,1777],[85.19,6859],[95.32,1596],[93.13,1763],[78.16,5245],[89.8,5111],[91.64,2001],[76.43,4632],[89.98,1924],[93.72,970],[87.79,4336],[85.58,2160],[76.97,6456],[82.95,8079],[75.44,6692],[95.3,1544],[85.12,3510],[83.35,3895],[89,5460],[87.35,3888],[94.85,1831],[87.77,2638],[78.36,3374],[96.48,851],[76.49,7587],[83.91,5544],[91.76,3833],[89.7,3681],[87.44,3007],[88.91,1876],[88.13,2891],[91.3,2926],[92.64,2122],[94.33,870],[90.85,1717],[90.76,4156],[95.61,1091],[94.6,1298],[88.14,3144],[72.4,16557],[95.66,1922],[83.64,3909],[86.75,2133],[96.5,1030],[94.39,1163],[93.29,1695],[95.97,1055],[92.52,1236],[92.52,1514],[96.31,1578],[91.45,2290],[87.36,2557],[95.87,1117],[92.64,2909],[91.68,1363],[89.2,2481],[89.75,1969],[90.15,1839],[96.07,829],[88.6,3249],[91.64,10923],[91.48,2955],[92.74,1557],[94.33,939],[96.5,665],[96.59,519],[95.91,880],[97.24,549],[92.7,1497],[91.93,2122],[92.79,2305],[89.18,2668],[88.31,2971],[93.67,1342],[94.93,1838],[90.64,2033],[91.42,3785],[96.97,697],[72.92,5408],[90.85,2379],[88.53,2674],[91.43,1908],[95.6,1439],[91.84,1464],[92.18,5001],[91.23,1527],[89.44,3483],[97.17,919],[88.49,2020],[92.1,1557],[93.75,2381],[91.86,3714],[86.14,2268],[88.66,2197],[94.32,4919],[91.32,2466],[95.05,1089],[90.58,1958],[89.25,3875],[93.48,2241],[90.83,1690],[95.96,1338],[93.46,997],[93.9,1596],[95.85,869],[92.76,1952],[92.19,1758],[92.21,1984],[93.37,1590],[95.07,1817],[91.05,3724],[94.89,1362],[90.54,2280],[91.93,1697],[95.89,1944],[94.27,1439],[92.74,1277],[94.44,1536],[96.81,807],[95.36,1020],[62.99,6368],[97.06,855],[85.9,3668],[93.04,1307],[92.87,1397],[73.03,6258],[90.13,3984],[81.15,3514],[92.35,1395],[94.45,1037],[91.14,1046],[97.18,867],[90.54,1972],[96.02,819],[95.69,890],[95.69,1837],[86.27,2532],[95.83,947],[96.44,542],[94.39,1219],[78.12,5887],[97.26,822],[97.67,497],[95.73,978],[82.43,3594],[92.94,3181],[97.63,327],[78.66,3606],[93.32,2232],[92.41,2496],[97.15,1061],[93.11,1694],[75.88,3302],[96.96,811],[96.09,1241],[96.98,595],[90.97,3318],[92.49,2049],[88.48,4695],[90.21,2759],[90,2097],[95.11,755],[91.47,2129],[92.71,1546],[91.73,2968],[71.17,7232],[97.14,400],[96.15,545],[97.01,667],[96.38,628],[97.17,365],[96.78,436],[97.24,343],[91.81,1466],[98.21,375],[90.03,2872],[96.83,362],[97.07,494],[90.8,2077],[86.27,4042],[97.08,722],[75.44,10787],[96.14,694],[94.65,961],[86.95,4259],[76.98,4322],[91.47,1748],[84.96,3552],[74.48,14730],[93.14,1680],[92.26,2032],[92.93,1382],[91.39,3386],[94.76,909],[92.95,1849],[97.04,628],[96.37,998],[89.98,1831],[96.07,769],[94.51,2512],[95.18,1047],[87.41,3258],[95.59,1413],[95.81,1510],[92.74,3080],[86.16,5752],[97.04,585],[97.38,598],[93.63,1533],[92.4,6070],[93.8,4082],[97.77,453],[95.89,1500],[97.24,699],[96.33,444],[86.45,3404],[94.87,2446],[93.57,2426],[89.64,1956],[85.44,2973],[80.94,9792],[95.62,1160],[94.69,1686],[61.07,33981],[79.18,9644],[85.35,2691],[88.69,3028],[97.52,372],[93.09,1358],[81.51,9885],[96.47,987],[90.54,2092],[82.77,4500],[95.03,1328],[92.58,2687],[94.28,943],[92.87,1188],[96.02,1278],[94.7,1101],[91.83,1487],[94.16,1428],[95.48,898],[95.73,717],[84.95,8398],[95.68,1041],[94.29,1058],[94,877],[90.7,2403],[70.2,4075],[90.76,3386],[96.14,506],[95.91,2111],[97.34,491],[91.34,1341],[98.07,459],[94.97,842],[94.15,2009],[94.27,1197],[94.37,1877],[91.73,2356],[94.79,1180],[96.54,486],[93.71,1035],[97.06,612],[96.56,532],[82.76,7035],[94.17,2108],[94.08,1286],[98.06,445],[92.28,2423],[97.16,606],[94.58,1100],[98,288],[95.47,1087],[93.4,1233],[94.96,2164],[92.16,1499],[91.83,2752],[91.72,1662],[95.22,2981],[96.84,662],[97.9,386],[91.95,1798],[92.94,1927],[94.81,1156],[96.35,612],[90.18,2037],[92.3,1465],[88.9,2144],[93.16,1951],[96.18,1224],[85.76,4571],[95.38,1267],[85.12,3952],[93.19,3601],[86.23,2508],[90.06,2031],[96.87,826],[91.98,1706],[78.76,6091],[94.05,1338],[87.19,1910],[91,1889],[96.41,686],[95.6,2047],[89.05,2038],[95.16,1568],[93.05,1501],[92.97,1782],[94.27,1052],[87.15,3048],[95,1362],[95.35,939],[82.73,4060],[96.47,658],[94.37,1001],[91.74,2025],[90.41,3275],[97.88,431],[96.88,510],[97.76,457],[74.91,10169],[64.13,4610],[64.67,3963],[89.05,2038],[82.01,8015],[94.9,908],[91.94,1553],[91.29,1555],[94.41,1463],[88.67,3330],[92.35,1303],[92.08,5782],[96.68,453],[90.13,2237],[95.24,1184],[94.19,1112],[96.19,767],[89.18,2150],[77.23,7463],[75.45,8303],[84.67,5302],[80.51,4704],[74.94,5158],[95.41,1044],[87.35,2469],[95.65,1162],[91.37,6684],[90.46,4002],[94.24,905],[84.76,3603],[97.36,388],[85.71,3223],[95.39,5132],[90.44,2597],[83.97,3062],[93.05,1764],[93.34,5073],[95.71,1013],[93.94,1547],[90.51,2424],[94.85,1458],[96.75,668],[97.38,891],[94.34,2180],[92.21,1957],[86.57,3691],[95.65,1098],[92.4,2333],[92.59,1325],[93.13,1353],[89.4,3131],[95.98,1242],[96.53,493],[89.34,3540],[91.2,3271],[96.04,599],[96.69,1196],[95.72,927],[94.39,1051],[84.07,3363],[95.64,1073],[90.28,1667],[95.87,1677],[93.01,1215],[95.12,808],[96.42,1008],[95.38,1071],[75.36,9451],[95.93,846],[91.85,1890],[81.84,13305],[94.03,1529],[94.33,1259],[90.7,1726],[96.65,1181],[91.73,1335],[80.59,7758],[87.07,2761],[90.35,2008],[90.33,3701],[94.11,2499],[94.43,2216],[78.68,4087],[96.71,460],[94.16,1655],[94.35,1371],[92.47,3168],[82.94,4234],[76.26,4581],[96.41,610],[94.13,1975],[86.18,2288],[94.73,959],[83.26,6097],[95.48,856],[96.11,591],[85.27,2447],[94.5,1110],[83.26,3787],[95.73,979],[87.79,3975],[92.16,2114],[90.37,2124],[94.15,1239],[95.3,1348],[90.59,1752],[95.56,841],[94.46,6272],[88.91,11691],[90.75,1488],[91.96,2804],[89.38,2199],[97.99,265],[94.16,1403],[93.16,2671],[95.07,718],[92.05,3393],[85.91,2334],[85.57,2313],[77.3,10703],[92.86,1450],[94.71,1111],[94.98,998],[91.23,1536],[96.19,557],[95.49,797],[94.47,845],[86.53,2568],[88.61,3581],[65.68,3668],[91.85,2598],[93.36,1208],[95.05,1143],[97.18,515],[91.65,1476],[85.6,2744],[94.25,1035],[94.88,1569],[94.95,1258],[86.44,12041],[96.45,859],[84.4,3685],[96.38,596],[92.77,2021],[80.61,4806],[90.68,1734],[93.05,1252],[87.75,2404],[87.96,2958],[93.77,2412],[86.54,3112],[94.13,1363],[97.22,632],[79.32,6472],[85.08,4048],[93.99,1552],[90.25,2861],[66.05,20505],[86.76,6004],[83.12,6311],[96.68,800],[95.82,469],[96.46,592],[87.37,5367],[94.99,1091],[85.82,3068],[95.17,837],[91.01,1369],[83.3,3638],[74.57,3441],[92.59,1012],[89.64,1755],[94.63,836],[90.14,4698],[90.94,1631],[82,2389],[88.96,4630],[73.41,9474],[95.82,1408],[81.88,5277],[91.82,1991],[96,1916],[89.12,2987],[93.36,1212],[92.25,2868],[81.51,4098],[95.31,570],[86.68,8177],[97.64,385],[86.2,5969],[86.3,6413],[86.74,3352],[97.89,294],[82.77,6374],[83.63,2320],[94.03,1785],[97.07,1323],[85.23,11658],[95.58,1135],[96.08,1114],[98.41,255],[94.85,4988],[97.26,438],[86.78,3348],[96.34,493],[82.91,5894],[96.92,426],[88.11,2980],[84.63,11866],[96.06,806],[92.38,1359],[94.31,807],[85.94,2163],[93.91,1577],[97.05,396],[95.79,437],[93.15,1637],[94.82,1253],[91.55,1531],[91.99,1293],[80.67,4732],[89.53,2273],[85.33,3354],[74.61,3651],[95.16,1033],[98.4,192],[92.48,2757],[94.62,1048],[96.2,474],[90.31,3223],[95.22,1434],[93.57,811],[90.74,1820],[98.11,259],[87.47,7205],[95.52,1360],[95.98,1067],[97.59,365],[93.22,1297],[91.93,2131],[96.57,411],[93.92,1475],[90.25,2580],[97.5,343],[89.59,2270],[97.31,365],[97.29,483],[94.13,1184],[97.6,748],[97.38,368],[90.57,2572],[95.76,564],[94.56,1278],[94.4,862],[85.62,4892],[96.67,454],[96.22,523],[96.06,1567],[95.18,893],[91.04,1768],[96.15,416],[93.99,1081],[83.89,3024],[94.57,1205],[89.43,2112],[89.12,2603],[79.73,5120],[77.76,4218],[91.98,1576],[92.33,5401],[90.45,1894],[78.63,3422],[91.1,1632],[87.4,3281],[93.29,2349],[73.08,4582],[86.23,2458],[88.41,2823],[95.3,2068],[91.02,1765],[81.47,4019],[67.34,12093],[88.34,3668],[90.27,2038],[86.27,3483],[89.66,4936],[89.75,1876],[93.88,2237],[93.69,1132],[92.85,1447],[92.42,1375],[91.1,1303],[91.47,1989],[96.35,503],[89.03,2950],[90.65,1622],[92.91,996],[93.52,1610],[94.92,840],[91.85,1514],[91.29,1387],[95.5,901],[92.16,1619],[95.71,707],[95.95,661],[84.44,2758],[60.75,10751],[78.15,5016],[90.25,1814],[89.08,1864],[92.19,1307],[90.71,1984],[85.74,3420],[91.1,2409],[91.94,1353],[90.75,2506],[82,3143],[80.66,3409],[81.09,5465],[96.35,1376],[79.45,4962],[95.94,1646],[89.76,2199],[90.83,1526],[93.46,1792],[95.07,2778],[81.64,6932],[93.75,1485],[94.24,983],[87.74,1756],[94.69,876],[95.8,1866],[94.37,982],[93.73,999],[91.6,1391],[92.79,953],[86.49,3066],[92.88,1292],[87.84,2623],[92.72,1831],[90.83,1236],[93.14,1470],[96.82,970],[87.36,2898],[95.62,687],[93.69,821],[86.78,2060],[93.43,2587],[86.8,5560],[92.12,1674],[87.72,1602],[95.57,915],[89.95,1668],[91.08,1390],[90.99,1769],[91.11,2361],[93.01,1187],[88.88,1461],[96.54,631],[94.68,1269],[91.23,1984],[95.99,1210],[91.45,1534],[90,2723],[88.18,2333],[94.47,761],[91.5,1576],[93.24,1210],[97.4,886],[91.14,1457],[89.59,1997],[95.01,694],[92.31,1211],[72.38,3900],[90.53,2138],[78.83,3023],[84.91,5534],[97.02,2329],[88.75,2410],[94.42,1264],[87.6,1667],[97.48,988],[96.35,851],[90.65,2827],[89.86,1617],[94.76,1295],[88.45,3622],[88.07,2188],[91.64,2888],[96.91,1362],[89.02,1956],[84.98,6478],[91.13,1635],[87.12,4607],[95.26,947],[80.98,4974],[93.48,1032],[89.33,4581],[84.75,2561],[93.61,4794],[93.76,2074],[86.07,2314],[88.15,2091],[96.15,1096],[92.11,4588],[91.26,1548],[95.83,1099],[93.12,1460],[94.13,1557],[89.89,4626],[94.2,1590],[95.88,998],[91.67,4648],[92.64,1924],[90.99,2049],[93.75,1248],[88.58,1672],[85.57,2720],[89.42,2480],[89.95,2127],[73.2,6165],[91.17,1835],[88.7,2513],[89.71,1750],[90.18,2727],[86.08,4503],[95.26,1158],[91.61,1479],[94,1312],[89.55,3028],[92.33,3703],[95.79,1533],[94.84,1600],[92.87,2371],[96.24,1043],[91.83,1839],[93.31,1719],[96.45,967],[91.69,3192],[87.18,4725],[96.18,599],[94.99,840],[93.43,1321],[96.16,696],[96.12,631],[89.24,1653],[93.46,1115],[88.63,4462],[96.68,444],[94.12,1056],[83.18,4212],[95.02,1080],[91.07,2816],[93.39,1259],[97,996],[93.12,1378],[89.64,3290],[95.42,1223],[92.04,1996],[95.51,1082],[92.77,1917],[96.61,1141],[88.91,3190],[88.69,2806],[90.35,3346],[86.41,2793],[90.76,4914],[94.8,1518],[90.74,2639],[84.52,3743],[96.02,1714],[94.11,1745],[90.41,2899],[84.86,2998],[94.46,1301],[97.96,1693],[94.35,1739],[91.67,3859],[87.37,3521],[94.38,795],[91.3,1470],[74.36,4439],[92.21,1473],[92.24,2075],[91.02,1370],[87.55,3688],[93.63,1568],[88.24,6597],[90.21,2553],[97.57,489],[94.01,3119],[83.78,2663],[88.63,1968],[90.79,4779],[94.04,1503],[89.54,1727],[85.9,2200],[93.42,1599],[92.65,4855],[90.45,1486],[92.75,1186],[82.63,8288],[85.75,2191],[91.84,2881],[89.19,2443],[87.11,3554],[94.21,1224],[87.02,4916],[89.12,2047],[70.7,7033],[74.69,8158],[58.88,16960],[82.58,2794],[94.94,1241],[94.44,1204],[89.49,3426],[80.76,2932],[81.36,4509],[91.22,1895],[85.13,5153],[88.9,2837],[91.88,1507],[94.3,1343],[94.97,2383],[97.13,822],[95.11,2163],[93.86,1430],[89.95,2579],[90.87,2805],[88.83,3029],[75.82,4214],[92.14,1906],[85.52,5241],[93.8,1236],[93.17,1374],[91.85,2706],[90.84,1448],[92.82,1193],[86.38,1896],[77.57,3413],[96.03,941],[91.76,2809],[87.65,4020],[94.28,1281],[86.6,11709],[90.47,2939],[88.91,2383],[86.87,4153],[97.18,453],[94.39,1357],[95.46,1321],[92.97,1555],[86.75,2308],[93.68,1401],[89.06,2398],[92.83,1187],[88.78,3609],[90.1,2133],[93.58,1084],[93.01,1737],[87.06,3247],[86.71,2204],[82.14,7338],[90.21,1725],[84.48,3236],[72.17,3423],[93.33,1100],[89.65,4825],[96.56,652],[90.85,1420],[95.75,2114],[97.31,2413],[92.99,1851],[94,2198],[91.8,1783],[82.98,10740],[81.16,4008],[94.95,873],[92.29,2673],[95.1,1955],[96.87,614],[93.9,3365],[96.94,964],[96.43,934],[92.36,1863],[93.22,1734],[97.37,669],[93.66,1257],[85.93,2682],[91.76,1277],[97.76,477],[97.06,968],[94.43,1532],[98.17,419],[96.25,829],[96.81,1089],[95.63,2059],[96.18,1340],[88.23,3934],[95.91,1159],[92.64,2256],[97.24,492],[95.77,1214],[91,1588],[94.26,1048],[94.98,1763],[95.42,1874],[91.75,3613],[95.88,1024],[89.32,2374],[96.1,817],[93.63,1901],[97.05,545],[97.91,583],[87.91,3075],[94.88,1107],[95.89,741],[96.19,728],[93.02,2367],[95.17,1452],[95.87,2400],[90.98,2694],[93.55,1203],[97.05,726],[93.9,2501],[93.01,1371],[94.51,1455],[97.58,648],[95.14,1063],[94.09,2175],[94.37,2048],[96.47,802],[95.34,1439],[91.61,1101],[94.05,2288],[95.7,718],[94.63,1359],[92.09,2037],[95.07,2312],[97.47,530],[93.91,1946],[93.96,1633],[94.92,723],[96.28,1080],[94.68,1865],[97.84,360],[95.39,1264],[91.97,2238],[94.57,1593],[95.57,1122],[89.47,3951],[97.6,357],[94.48,2297],[91.44,2756],[95.61,1394],[91.87,2261],[90.21,2413],[94.91,1006],[94.44,1941],[86.02,5683],[88.45,2489],[81.55,6465],[93.58,1026],[90.49,2136],[94.91,1071],[96.72,1297],[96.92,831],[94.83,1466],[94.61,1278],[82.37,3381],[95.08,1557],[96.03,1055],[92.16,4286],[84.04,4930],[92.81,1887],[94.95,2890],[90.76,3697],[93.6,2086],[90.77,2255],[93.13,3063],[92.17,2915],[94.48,1153],[89.05,3900],[94.47,2009],[91.88,1826],[97.1,2223],[97.27,709],[92.21,3241],[87.48,4110],[92.47,3062],[95.14,1757],[91.51,3592],[94.99,1960],[95.63,826],[97.67,2848],[91.22,1464],[98.04,387],[94.41,1128],[92.18,1078],[93.66,1220],[91.78,2833],[96.58,769],[87.96,3830],[96.71,589],[95.49,1181],[89.44,1686],[96.42,664],[81.55,5120],[92.23,2478],[91.92,2271],[97.86,292],[98.05,368],[86.13,5783],[83.03,3540],[96.33,554],[72.27,3222],[93.63,950],[96.03,465],[96.87,431],[84.29,2790],[96.02,526],[96.86,406],[95.02,590],[85.33,5844],[71.55,4437],[96.9,471],[95.12,1158],[98.3,354],[88.84,1739],[94.95,4045],[96.08,584],[89.72,1325],[81.08,2414],[95.27,706],[96.46,1235],[87.65,1673],[84.44,7520],[96.94,367],[97.87,889],[79.23,7061],[93.83,1536],[93.12,1472],[81.12,9490],[95.43,654],[95.33,1279],[95.49,735],[86.8,3936],[84.71,8216],[89.99,2302],[94.01,1360],[96.83,946],[81.47,3260],[86.05,2689],[98.35,311],[92.98,1227],[94.89,1418],[95.54,1237],[92.83,1102],[84.03,4575],[90.39,1241],[93.54,2694],[97.23,1005],[96.99,643],[88.03,3112],[88.22,4204],[97.89,418],[87.05,3042],[91.16,3289],[97.25,798],[93.05,1403],[94.36,1514],[96.46,570],[95.36,999],[94.33,5809],[68.86,18208],[84.19,4565],[95.97,1141],[78.2,2968],[89.49,2817],[93.5,873],[95.98,1535],[78.34,5510],[89.77,2950],[69.24,5605],[93.59,1598],[92.41,1095],[92.26,1850],[81.59,4617],[88.75,1610],[91.61,3042],[81.54,3028],[92.96,903],[88.47,1639],[82.17,5665],[84.16,5699],[95.14,933],[87.34,1783],[93.49,1686],[94.47,815],[89.37,3129],[95.48,1553],[96.53,1057],[96.21,986],[92.89,1138],[88.58,1728],[90.61,3490],[89.8,2897],[85.71,1937],[92.94,1660],[54.09,14467],[90.01,1684],[96.37,844],[95.64,835],[94.24,980],[97.57,576],[97.9,514],[98.07,1025],[96.15,667],[95.63,746],[95.13,751],[90.07,1796],[78.39,2933],[79.71,4956],[80.87,6108],[95.71,1018],[85.21,2180],[91.5,2280],[89.56,5741],[96.15,728],[90.23,1377],[86.85,4003],[92.4,1181],[95.02,2230],[97.63,518],[96.18,1552],[95.13,638],[80.64,5155],[92.43,2314],[94.82,3310],[91.47,1428],[89.26,2448],[91.3,2540],[97.29,604],[88.65,3784],[89.98,3234],[95.52,679],[91.66,1831],[86.91,5076],[95.09,1085],[90.39,2501],[93.35,3772],[90.67,2188],[85.33,3834],[92.47,5415],[92.13,1949],[96.76,1070],[95.74,1531],[92.88,1384],[91.21,3213],[91.6,1871],[97.54,549],[93.77,1122],[92.52,1087],[95.9,462],[93.1,1681],[94.59,1286],[92.37,1092],[88.85,4195],[93.75,1715],[97.28,553],[93.35,933],[95.94,1104],[94.53,1803],[94.57,870],[92.68,1113],[93.45,1882],[94.41,1447],[97.79,442],[91.42,4647],[94.29,1448],[88.53,1543],[87.36,1580],[88.86,6860],[95.13,1209],[90.38,3246],[97.49,560],[97.31,749],[87.32,3124],[96.1,813],[96.21,821],[87.12,2229],[89.01,4063],[91.63,3867],[88.37,4410],[90.84,2216],[90.69,8244],[91.62,1711],[96.95,739],[90.47,2383],[72.75,3746],[97.14,509],[96.83,373],[93.47,1852],[89.71,1685],[77.45,9492],[97.58,1114],[91.5,2696],[96.4,751],[90.41,3618],[95.37,1891],[93.42,2084],[63.08,7197],[91.03,1929],[94.96,859],[93.77,2003],[92.4,1039],[93.9,1933],[90.43,1223],[90.02,1491],[86.58,5161],[95.66,668],[95.13,1514],[78.02,3936],[95.56,1216],[94.45,1240],[84.61,3037],[94.8,1386],[91.95,2097],[93.8,842],[95.04,1227],[91.46,2213],[95.82,1285],[93.92,1373],[96.05,841],[94.62,612],[95.75,589],[97.53,525],[94.58,1032],[80.27,2816],[95.79,583],[93.88,1041],[92.5,1641],[96.8,1331],[93.8,890],[89.23,1715],[92.06,1748],[94.48,1088],[83.62,2498],[95.78,782],[89.36,1611],[96.77,383],[92.87,2017],[91.92,3164],[96.21,530],[97.24,438],[92.85,3237],[83.98,4022],[97.66,585],[97.2,381],[88.18,3489],[96.36,594],[96.07,1501],[89.71,1845],[94.24,1086],[93.59,984],[89.6,1994],[93.09,1401],[95.33,591],[98.22,608],[92.39,1629],[80.74,5611],[98.05,316],[92.27,905],[96.52,865],[94.83,1162],[96.94,603],[97.5,334],[94.9,1372],[94.71,6118],[96.12,573],[93.74,1446],[94.39,702],[87.12,2447],[94.89,652],[79.21,4928],[83.73,4355],[95.26,2222],[83.75,3979],[97.77,1818],[96.73,401],[87.64,1958],[93.66,1257],[95.98,618],[94.39,700],[96.88,755],[97.11,354],[86.47,2101],[90.39,1743],[94.84,566],[91.06,5982],[95.3,652],[92.21,1922],[96.31,509],[93.73,1330],[95.6,620],[97.36,657],[90.13,1425],[96.55,406],[97.43,433],[82.08,3803],[95.95,1163],[89.86,1625],[95.08,1652],[97.4,360],[96,3694],[96.36,1175],[95.4,1338],[95.1,1346],[92.04,2011],[97.13,762],[95.25,897],[98.16,450],[91.74,1398],[96.58,420],[96.02,1061],[93.44,2078],[96.9,676],[77.33,5143],[96.23,837],[93.01,1974],[79.29,10175],[87.25,2353],[97.68,326],[88.42,2009],[95.19,1279],[95.64,1143],[96.43,565],[95.02,4861],[95.5,1084],[97.24,644],[92.49,1198],[96.37,1654],[85.3,4066],[92.82,1721],[95.08,1490],[95.56,863],[96.77,787],[90.4,1979],[93.58,2402],[96.47,499],[96.47,499],[96.47,499],[95.82,793],[96.81,652],[89.36,2450],[94.8,682],[95.94,572],[95.94,572],[91.61,1562],[90.16,1150],[88.94,1609],[95.93,638],[98.11,262],[96.4,530],[96.53,451],[98.25,408],[95.62,575],[94.98,769],[97.78,325],[96.58,516],[95.64,924],[93.3,1239],[96.14,883],[95.53,847],[95.72,657],[95.42,924],[89.13,1950],[93.86,1662],[94.22,1279],[92.38,1578],[97.15,470],[91.01,2387],[88.42,1846],[87.97,4047],[93.66,1490],[85.14,1976],[97.8,413],[85.95,5438],[77.11,3749],[89.58,1610],[92.01,7288],[87.77,4603],[89.24,1514],[86.83,5079],[96.46,1196],[96.84,907],[97.02,2252],[95.6,964],[91.53,2063],[93.87,1428],[79.86,4498],[93.62,897],[97.96,330],[94.48,659],[96.85,386],[90.23,1853],[94.75,1097],[93.78,1285],[95.53,790],[79.11,7585],[96.32,720],[88.75,2680],[91.47,2499],[79.67,6859],[92.91,3310],[95.85,1175],[93.51,2879],[95.21,1104],[93.78,2826],[96.48,842],[91.6,2493],[96.76,647],[85.44,2349],[96.41,1733],[96.89,993],[96.56,1670],[92.1,1179],[93.14,3290],[97.59,357],[95.59,936],[91.45,3248],[97.54,434],[87.92,4340],[75.51,5987],[96.6,790],[83.21,8352],[94.53,1612],[93.62,2580],[88.87,1710],[96.25,2058],[95.19,1095],[92.88,4014],[79.73,3452],[96.71,843],[94.67,1925],[90.22,2973],[88.15,1739],[96.69,798],[95.47,1477],[91.77,1100],[96.22,1026],[85.72,9071],[96.4,846],[91.72,3854],[94.35,1700],[93.32,1526],[95.94,768],[67.6,10030],[94.18,1474],[94.23,2311],[95.05,921],[92.95,1862],[89.74,3206],[95.37,1235],[86.4,5103],[93.34,1641],[89.34,2542],[95.14,991],[95,630],[93.3,2168],[92.94,1279],[92.07,3423],[92.76,983],[83.04,3562],[93.11,1427],[79.69,5804],[86.63,2389],[91.73,1409],[87.98,2286],[95.77,602],[82.57,2886],[90.16,3425],[96.67,671],[86.7,2176],[77.65,7074],[96.17,1011],[95.36,844],[75.56,6485],[86.22,1946],[92.98,1296],[76.32,6780],[84.23,2183],[95.94,724],[95.9,808],[90.94,1309],[95.82,715],[96.7,923],[91.23,2458],[94.68,1776],[89.76,1409],[95.8,683],[96.23,1001],[77.97,3579],[77.36,3897],[96.91,523],[82.88,5584],[95.26,1301],[95.1,1425],[95.17,953],[94.93,1553],[94.36,1528],[91.49,1966],[92.88,1822],[91.51,2271],[97.6,314],[93.06,1001],[81.51,4198],[95.96,5405],[84.45,2923],[97.26,452],[97.18,875],[96.85,1279],[70.28,18427],[87.91,3130],[97.96,388],[96.12,560],[95.9,1516],[95.68,3603],[81.16,5547],[96.96,764],[97.09,957],[83.26,3875],[96.7,687],[96.37,1025],[86.04,5805],[93.8,1704],[91.33,1717],[87.13,1835],[77.55,4295],[94.69,1596],[95.25,5861],[85.55,7059],[95.32,3757],[81.37,5409],[95.9,1500],[95.55,1195],[85.25,2674],[59.55,7360],[66.55,5113],[75.42,4256],[74.44,4006],[74.46,6490],[96.42,720],[94.19,1747],[90.96,3163],[82.06,3046],[96.01,644],[95.48,788],[93.34,1867],[85.39,2891],[98.67,289],[94.17,1004],[95.54,668],[93.32,2751],[82.45,3522],[98.66,320],[93.02,1860],[96.55,2029],[95.92,651],[88.67,1837],[93.71,1394],[89.25,4816],[96.58,578],[91.68,2583],[90.03,2168],[94.65,1195],[87.02,2409],[96.67,674],[94.02,1858],[85.3,4804],[94.24,1794],[95.02,1105],[89.85,1824],[94.49,832],[85.89,2562],[86.25,2793],[92.06,1641],[90.7,1708],[93.7,1372],[86.56,2356],[86.03,5880],[98.93,143],[91.01,3706],[80.39,3036],[77.21,15988],[91.65,2467],[88.71,1498],[94.46,1121],[95.08,923],[96.48,881],[94.56,780],[93.75,1014],[92.39,1327],[81.43,12685],[89.93,3902],[86.22,2328],[88.14,2585],[91.87,2169],[92.06,1326],[94.33,2700],[96.36,891],[95.52,1283],[88.45,1911],[89.9,6478],[86.62,3448],[97.66,661],[95.85,1547],[92.15,1492],[95.16,1614],[97.59,473],[92.05,2241],[98.72,345],[92.44,1288],[95.49,7037],[88.77,4900],[74.21,3402],[72.83,12355],[87.96,3654],[87.75,5854],[85.05,4043],[90.44,7498],[91.72,2705],[87.21,5514],[90.06,3868],[80.35,5806],[94.06,1660],[74.31,6286],[96.02,643],[96.8,488],[96.58,616],[96.11,703],[98.12,276],[97.19,517],[95.64,908],[94.09,2524],[97.07,385],[94.75,1225],[97.81,430],[96.32,727],[96,664],[95.98,1502],[96.77,523],[86.63,1966],[84.78,6204],[96.57,569],[81.14,4890],[72.27,4691],[91.66,3079],[93.37,4024],[88.92,2647],[86.58,2293],[92.68,1164],[83.94,2219],[84.23,11426],[95.39,706],[85.74,2234],[79.87,4448],[87.85,7271],[90.82,2742],[95.51,656],[83.35,2308],[93.34,2357],[91.37,2942],[84.06,2358],[91.32,1176],[90.56,3032],[92.83,1506],[93.06,895],[91.23,1343],[86.62,4344],[95.28,572],[83.11,10083],[95.52,766],[89.83,4594],[84.08,3807],[95.13,2602],[92.91,1846],[93.75,4545],[91.82,4347],[77.18,5051],[96,985],[95.64,4132],[89.26,3213],[79.37,4368],[86.01,4873],[88.73,1602],[90.62,1285],[85.85,1876],[92.47,1692],[90.85,3414],[91.4,1718],[79.15,5038],[92.47,1690],[89.65,2504],[87.7,3528],[87.32,2019],[81.6,3523],[92.03,1650],[90.19,2163],[93.96,1357],[69.79,6947],[84.21,3253],[93.22,1350],[92.02,1425],[88.5,1884],[87.23,1939],[89.57,2281],[84.95,6901],[83.22,2908],[90.5,2308],[71.75,4046],[85.73,2760],[93.02,1068],[84.9,2614],[92.2,1688],[90.94,2159],[90.97,1655],[90.15,1682],[96.04,693],[88.24,1890],[89.52,1611],[78.95,3265],[84.45,3635],[95.09,1159],[94.36,854],[95.17,1007],[82.87,3854],[90.96,2821],[89.82,2337],[96.12,890],[75.83,4087],[88.13,2679],[84.08,4300],[92.85,1558],[86.45,2448],[92.2,1976],[89.9,3355],[85.89,2038],[86.86,2583],[90.35,2026],[84.32,3968],[88.87,2615],[89.32,2403],[84.94,2694],[88.69,2671],[81.17,3005],[96.81,649],[89.57,1956],[82.23,2779],[92.2,1202],[94.7,1021],[97.07,447],[91.43,1420],[82.19,4477],[93.37,1352],[87.13,2556],[94.55,947],[90.16,2485],[93.15,952],[89.83,2319],[92.65,1490],[87.34,7373],[85.31,2088],[84.27,2821],[89.3,2061],[81.35,6401],[94.19,1177],[90.81,3298],[92.85,1194],[83.87,3305],[94.6,903],[89.58,3416],[90.67,2634],[91.79,1324],[93.95,911],[93.06,3143],[91.92,2343],[87.9,2002],[91.36,1616],[86.94,4395],[85.67,3359],[95.21,905],[77.93,3661],[93.39,2314],[89.63,1619],[93.34,1842],[96.48,630],[87.79,1980],[86.48,2396],[88.57,2215],[91.09,1645],[81.93,5465],[71.43,5847],[82.14,7211],[92.37,1371],[93.14,1921],[97.25,370],[93.92,1122],[97.45,443],[96.46,627],[96.28,581],[78.54,12302],[86.84,2662],[85.22,4503],[95.39,1566],[95.2,789],[81.07,2416],[93.89,1786],[51.66,19109],[84.52,2518],[94.57,1626],[75.24,8099],[86.49,2044],[83.95,7469],[86.7,5133],[87.78,2050],[96.14,495],[95.8,2063],[86.21,2573],[80.13,8036],[87.24,1696],[92.52,1137],[89.14,2299],[90.08,5331],[87.89,4797],[87.77,1648],[88.86,3436],[85.72,2196],[89.02,1384],[95.3,1976],[96.42,802],[94.77,1276],[91.83,1057],[84.76,5224],[90.63,2333],[89.85,1501],[62.1,22059],[80.61,4598],[88.53,1755],[95.03,1499],[89.53,4935],[83.24,6248],[89.42,1714],[83.19,2606],[94.16,1941],[80.26,2566],[90.37,3586],[84.49,2092],[85.57,2746],[93.89,4650],[78.97,5725],[91.18,1168],[96.05,1025],[69.43,6947],[93.4,1083],[95.25,1160],[83.59,2303],[96.9,479],[92.54,5965],[96.48,1802],[94.8,1145],[86.03,1851],[91.84,6225],[96.52,1809],[83.43,2278],[98.07,250],[93.49,1034],[96.23,753],[93.47,1213],[75.14,4730],[83.74,4624],[95.67,1079],[80.85,5312],[62.23,8984],[71.82,6871],[95.83,670],[93.59,2570],[94.36,950],[96.47,1007],[95.76,527],[94.27,1771],[95.96,709],[95.96,1067],[96.59,1228],[97.94,351],[96,2683],[95.8,882],[96.61,553],[93.97,1244],[97.02,497],[94.36,5045],[86.02,4869],[96.72,486],[95.35,2044],[96.99,527],[96.98,1014],[91.38,1561],[79.05,3833],[94.14,829],[96.58,1273],[63.54,9571],[93,2381],[85.78,6969],[95.84,732],[95.79,1608],[92.87,1325],[91.41,1624],[94.88,691],[93.3,2259],[93.01,3557],[92.19,1221],[89.45,1200],[90.1,5053],[94.38,1491],[87.59,3384],[82.59,2651],[93.07,1829],[89.5,3806],[76.67,3509],[90.86,2670],[94.97,1210],[89.66,1429],[93.12,3027],[94.31,1732],[94.63,1045],[95.41,653],[90.09,2165],[90.25,1557],[92.79,2217],[87.76,4122],[91.05,1993],[83.36,2790],[92.91,1965],[93.26,1744],[96.25,853],[94.93,1077],[93.79,2137],[90.69,5267],[96.31,2433],[95.85,2128],[90.46,2026],[93.31,1042],[93.68,1105],[82.97,7047],[84.74,2911],[90.11,7850],[92.32,1452],[93.11,2538],[87.95,5649],[93,2585],[94.84,1033],[84.94,7393],[93.72,2396],[83.76,6696],[95.47,1158],[87.56,3338],[92.52,1124],[93.77,1384],[85.4,9474],[89.42,3378],[96.38,523],[95.08,1919],[97.02,666],[94.23,982],[94.48,1618],[93.44,3109],[92.86,1766],[92.2,3874],[90.9,3561],[77.19,9465],[90.01,3831],[96.77,723],[95.78,1008],[94.85,970],[90.32,2682],[92.29,3006],[92.64,1893],[96.95,784],[91.84,3202],[91.6,1834],[91.23,3175],[94.98,2172],[89.6,7849],[90.19,1680],[74.09,13824],[91.62,1579],[81.36,7143],[94.12,1586],[90.27,3374],[90.56,6283],[88.76,3409],[90.21,1381],[96.15,777],[91.41,1196],[93.21,5879],[90.61,2577],[80.45,4436],[83.8,2376],[93.33,1882],[91.62,4354],[94.72,929],[94.28,1706],[90.44,1348],[70.65,5355],[88.81,4762],[90.67,2903],[88.39,4431],[73.49,4211],[91.17,4759],[93.19,1440],[74.19,3718],[94.36,1519],[94.4,1572],[90.63,1723],[91.15,3193],[88.03,4083],[87.3,4864],[91.68,5527],[81.15,2815],[88.6,2400],[77.79,6046],[74.31,4313],[62.98,7821],[92.78,7577],[91.92,6129],[96.49,761],[88.36,2140],[89.36,3756],[95.63,635],[90.9,6522],[89.48,2718],[92.18,1231],[92.36,2858],[89.87,3154],[90.05,3669],[91.29,1118],[77.43,5864],[89.5,4745],[95.31,988],[92.59,1888],[91.71,1373],[93.9,1640],[96.1,1829],[93.72,1743],[95.76,1305],[85.62,3743],[92.67,3524],[92.93,1795],[93.62,1284],[94.49,972],[82.86,3283],[82.24,6219],[86.1,2406],[84.23,1806],[94.11,1778],[92.41,1583],[96.35,611],[92.77,1283],[95.86,723],[86.97,4419],[97.07,421],[88.3,1840],[82.04,4003],[81.36,4912],[71.82,5019],[91.54,7248],[94.87,1486],[84.24,2066],[88.77,10138],[88.5,3632],[80.76,2871],[90.43,5104],[93.51,1617],[92.71,1159],[87.74,7893],[93.04,2359],[91.86,1096],[92.76,2079],[91.26,2232],[90.23,1399],[93.3,2294],[83.19,8483],[80.84,3711],[90.04,2869],[95.45,1253],[93.33,1720],[89.99,4453],[87.54,3229],[92.47,2397],[92.77,2402],[93.11,2707],[91.32,3449],[93.14,2036],[93.15,2869],[92.56,4907],[91.09,6946],[93.05,1373],[86.67,2175],[86.17,2967],[96.08,684],[91.72,2028],[85.84,3401],[87.27,3964],[79.18,5999],[78.26,14972],[83.69,9090],[92.09,5804],[89.96,1518],[80.49,4158],[86.97,5250],[86.44,1701],[87.65,6907],[95.24,692],[92.36,3133],[67.2,5938],[95.84,2730],[96.34,796],[95.44,660],[88.66,7723],[88.97,4302],[90.85,2438],[94.11,1226],[91.54,3760],[93.73,2520],[89.81,4648],[93.08,3747],[88.55,2816],[90.32,3121],[92.53,1844],[93.71,1640],[91.06,3289],[87.05,1841],[94.55,1392],[74.74,5047],[91.92,1226],[82.12,5021],[91.77,3596],[80.88,11271],[93.67,1696],[89.29,5336],[87.43,4840],[91.81,1217],[93.99,1026],[82.19,2825],[94.98,723],[87.97,3042],[79.3,3253],[90.45,2461],[88.13,1755],[83.25,2368],[91.34,1244],[89.19,6392],[93.59,1157],[91.56,2753],[94.48,826],[93.73,962],[89.44,1551],[91.87,4680],[90.67,1685],[90.52,1738],[92.28,1475],[92.31,2388],[65.91,16797],[79.9,4766],[85.86,3971],[85.98,2488],[92.26,7847],[94.09,1136],[94.21,1476],[90.77,1264],[95.8,1134],[92.76,1025],[92.01,1024],[92.59,1205],[83.47,4006],[92.42,1049],[92.85,997],[94.25,1319],[95.38,688],[92.98,1842],[95.24,594],[74.49,4664],[90.87,1135],[93.27,1126],[88.24,4971],[93.37,937],[87.94,1588],[90.83,1186],[95.81,705],[85.61,7836],[86.18,3845],[94.94,857],[91.64,1480],[92.85,1666],[94.82,1062],[89.14,1997],[95.03,692],[84.01,2889],[75.94,2886],[89.76,1807],[83.54,3719],[89.63,1971],[70.11,7344],[76.41,5076],[93.23,1248],[87.22,3577],[86.25,3847],[82.41,2765],[90.53,3287],[84.98,2187],[64.81,17583],[78,3478],[93.07,2874],[93.87,1437],[78.81,5981],[91.86,1047],[94.45,975],[96.95,437],[94.14,701],[84.52,5401],[77.13,3368],[86.93,2341],[92.02,1287],[97.19,499],[91.97,3737],[88.74,1271],[96.79,521],[62.42,6484],[94.96,802],[93.66,1265],[97.17,415],[91.95,1150],[91.21,2539],[94.93,967],[88.58,2041],[94.92,871],[94.55,757],[89.33,1770],[76.87,3000],[96.55,507],[93.68,1540],[94.26,927],[82.31,2700],[80.49,10090],[92.52,2978],[81.61,2832],[92.97,3631],[94.99,919],[91.16,1264],[91.37,3169],[73.23,3484],[94.16,1408],[86.79,2905],[95.3,793],[94.58,1657],[94.02,1823],[89.58,1654],[82.65,3670],[91.52,1849],[95.85,2710],[89.55,1531],[79.2,3752],[84.98,2919],[94.15,1822],[88.95,2782],[89.3,2016],[92,1087],[91.95,1595],[91.5,1465],[82.45,12872],[88.8,3008],[90.3,2338],[93.66,1282],[96.04,641],[95.97,971],[82.08,5456],[91.78,1300],[89.3,1450],[76.17,3415],[95.72,744],[85.79,2169],[88.8,1645],[80.93,8769],[84.18,3721],[84.61,2387],[94.6,847],[93.85,3809],[87.46,3446],[73.42,4575],[63.19,6260],[93.46,1700],[70.77,3676],[65.22,4043],[95.79,831],[90.17,2702],[92.83,1173],[89.13,1345],[86.78,1781],[90.69,2495],[94.3,933],[93.17,4568],[81.25,3902],[95.43,2932],[90.69,1353],[92.07,1486],[87.93,5258],[93.93,912],[94.17,1590],[70.24,3565],[88.85,2265],[89.34,2676],[76.07,3778],[92.63,3178],[81.5,13477],[88.36,1502],[91.49,1062],[91.8,2362],[92.88,1150],[81.14,8052],[83.33,9374],[83.87,2626],[92.83,986],[86.4,4781],[82.67,2852],[93.63,1200],[78.07,9117],[95.28,1497],[95.19,692],[86.84,3578],[93.81,856],[85.59,7855],[77.11,4991],[94.71,1677],[79.37,3563],[93.1,1044],[94.68,1671],[92.35,1347],[96.04,1262],[95.97,694],[95.93,1489],[77.35,2963],[92.16,2486],[84.35,4621],[95.36,3021],[75.29,4739],[94.52,1645],[95.81,640],[96.04,699],[96.86,619],[84.1,2326],[95.94,721],[92.44,1025],[91.01,1218],[95.36,1085],[94.78,776],[95.09,1336],[88.07,2543],[85.16,1873],[79.77,11038],[96.61,1765],[94.82,892],[80.55,2555],[93.17,3593],[89.3,1781],[88.53,1681],[93.93,939],[97.19,418],[96.62,612],[60.61,11380],[92.55,1342],[94.95,815],[95.23,894],[95.69,889],[77.75,7135],[92.06,1988],[94.46,1038],[95.94,538],[94.63,676],[94.27,1001],[90.39,1405],[96.11,510],[97.36,647],[85.3,4545],[95.1,3459],[88.2,2185],[87.92,3183],[91.38,2765],[88.17,2285],[87.61,3511],[83.27,4571],[81.59,4783],[93.69,775],[96.73,543],[86.19,1753],[97.64,496],[96.82,1469],[86.41,5982],[85.44,5142],[96.79,921],[96.12,580],[89.62,7213],[96.73,476],[95.56,1448],[97.35,346],[86.79,6795],[98.28,216],[94.08,1489],[96.59,602],[89.83,5278],[91.17,1885],[96.37,869],[96.71,467],[89.89,3260],[81.19,9782],[96.77,497],[90.79,5710],[94.93,2584],[92.1,2518],[95.84,1040],[96.91,671],[80.4,5420],[87.19,6512],[84.43,6317],[90.48,2259],[74.1,6636],[88.68,3684],[77.54,3932],[95.17,1437],[89.75,2157],[89.51,1971],[89.28,2255],[97.84,406],[95.41,2542],[97.23,531],[94.54,2459],[90.88,2674],[91.44,2602],[95.75,682],[82.87,3833],[91.93,2111],[94.31,1331],[97.39,1011],[94.63,777],[88.59,2311],[95.9,676],[97.06,796],[95.63,1245],[97.83,340],[93.17,1959],[96.76,886],[91.56,1440],[94.8,4053],[97.82,408],[91.99,1062],[90.23,8230],[95.45,1818],[94.18,1612],[97.02,677],[96.69,863],[97.1,798],[93.16,834],[97.63,635],[84.15,8377],[97.35,630],[91.21,1751],[95.24,1163],[91.53,2391],[86,3634],[96.96,951],[93.86,2428],[96.04,525],[95.5,1851],[95.54,1249],[79.07,10650],[96.13,543],[90.85,5347],[98.76,135],[96.01,980],[90.52,2329],[95.03,1412],[85.92,3780],[96.4,466],[91.56,4078],[91.39,2393],[90.42,3574],[96.21,627],[93.06,1408],[92.71,1654],[93.24,1485],[97.11,630],[92.77,954],[96.97,724],[95.02,1210],[96.8,863],[98,307],[98.17,391],[96.41,1404],[97.97,307],[97.3,463],[97.58,496],[91.35,2096],[96.59,557],[86.67,3674],[95.85,610],[98.15,1593],[67.08,33889],[91.37,2107],[85.3,1963],[93.47,1623],[94.66,1065],[96.82,428],[78.51,5104],[94.8,993],[94.08,2400],[85.14,2088],[94.16,892],[94.36,1889],[95.87,759],[87.55,3480],[95.29,1368],[93.96,7886],[93.32,3506],[92.2,2989],[93.6,10207],[92.52,2133],[89.44,2102],[97.02,398],[96.03,3200],[97.24,695],[97.86,284],[98.01,328],[85.01,8634],[85.46,4219],[94.36,884],[95.37,601],[86.01,5109],[92.3,1365],[96.27,732],[97.19,452],[90.43,1365],[92.69,1109],[88.67,3380],[87.87,3128],[92.34,3270],[96.02,1264],[89.43,3302],[95.9,646],[96.46,859],[94.04,2456],[93.39,2386],[97.61,470],[95.31,728],[97.63,558],[95.94,1061],[93.68,1108],[90.54,2267],[96.47,1624],[84.59,2257],[97.43,464],[96.04,774],[84.41,3775],[97.33,603],[89.75,2877],[87.07,1547],[89.8,1770],[94.68,975],[96.45,780],[97.59,513],[91.91,1894],[94.16,734],[93.21,1698],[97.39,982],[88.97,2659],[96.19,1860],[96.25,1169],[92.52,2211],[94.07,2003],[92.54,917],[93.16,1684],[92.86,3021],[95.92,1054],[95.54,934],[95.73,896],[95.07,1411],[96.4,851],[90.6,3523],[94.47,1592],[95.33,972],[90.44,2457],[82.47,3025],[88.91,3415],[93.97,1494],[90.55,2684],[96.68,458],[97.02,549],[95.59,1530],[80.34,4140],[85.57,6775],[96.21,1071],[93.84,1887],[95.96,1291],[85.47,4759],[96.71,986],[95.72,765],[92.56,1475],[74.67,3350],[91.56,4663],[85.41,4511],[73.42,9558],[96.47,618],[81.53,3126],[87.89,2373],[90.51,1279],[72.26,6124],[97.69,644],[89.06,4453],[90.42,4328],[96.94,1663],[89.42,5822],[96.98,906],[96.98,1568],[94.48,1750],[94.86,1385],[86.06,4738],[79.1,9872],[81.39,6217],[91.76,3794],[91.18,2987],[82.7,10410],[61.6,9902],[86.18,9506],[89.03,3621],[68.43,7222],[88.6,2651],[83.29,3046],[95.4,1134],[60.26,11090],[94.82,2362],[61.89,8465],[86.78,11319],[93.5,2566],[71,8203],[88,4443],[78.85,3435],[84.46,4418],[87.63,4400],[79.54,3938],[96.07,1049],[94.96,1247],[89.17,5924],[80.83,4133],[92.12,2258],[74.45,6896],[67.67,12459],[75.3,5776],[91.63,2991],[76.45,4925],[88.73,3063],[93.82,997],[75.24,7397],[93.78,782],[93.09,1218],[94.69,909],[90.74,1300],[92.91,1738],[91.7,1170],[94.16,908],[89.33,2569],[81.78,3251],[87.92,1973],[85.45,2094],[93.13,2439],[96.5,949],[96.97,1607],[96.41,743],[87.71,2341],[95.24,1862],[94.13,934],[95.35,1496],[93.45,2417],[94.45,2969],[92.32,2999],[90.11,1652],[89.69,2215],[84.19,6008],[90.28,2018],[95.66,1090],[88.72,6129],[97.03,1027],[94.18,1536],[97.79,756],[94.06,2402],[96.43,1017],[75.6,5999],[91.85,3247],[97.06,795],[90.8,3094],[52.62,26115],[70.32,11694],[84.56,5855],[95.02,1445],[71.05,5700],[90.16,6306],[66.28,6787],[97.28,670],[89.59,3278],[71.72,5303],[81.11,7319],[88.92,3330],[80.08,4160],[68.47,12858],[95.85,4202],[80.44,3559],[94.27,1858],[94.76,1684],[87.9,2777],[92.14,1807],[89.67,3764],[82.73,6597],[94.48,1282],[96.71,924],[90.91,4852],[95.56,1859],[95.18,2364],[93.06,2166],[90.05,6842],[86.34,2211],[97.67,973],[95.42,2050],[76.18,10537],[93.09,2089],[53.07,16438],[53.78,23821],[51.56,29393],[92.42,3768],[89.86,2525],[96.84,1025],[95.48,890],[96.7,1306],[87.92,2703],[98.46,331],[89.98,1670],[93.49,4591],[92.96,2716],[77.62,8122],[91.88,2789],[73.78,10918],[94.78,3398],[80.06,4620],[96.76,1212],[66.27,11510],[87.44,2808],[96.55,565],[92.8,1989],[78.95,7050],[93.87,1334],[63.89,11632],[96.1,842],[97.08,613],[93.28,1266],[90.24,2007],[94.66,1315],[89.84,4767],[61.34,16804],[87.75,4418],[90.69,1911],[95.47,1168],[80.6,7046],[75.91,14263],[64.95,9121],[83.23,2625],[66.46,7717],[86.46,4707],[70.56,15775],[83.95,3361],[73.09,5196],[77.41,5498],[82.89,3999],[94.89,2022],[93.69,1643],[97.4,1149],[90.2,2893],[93.61,1265],[92.59,1286],[88.59,2358],[96.62,619],[90.27,2319],[93.2,2684],[88.19,5785],[64.74,9115],[89.8,2958],[82.49,5319],[74.45,5327],[85.33,3067],[94.54,1518],[97.9,377],[69.89,7751],[90.36,4436],[79.79,4182],[95.31,2969],[97.72,441],[70.48,8489],[85.3,2818],[97.58,943],[78.59,4569],[95.64,1067],[97.9,487],[85.48,2038],[87.68,1950],[97.36,525],[84.86,2974],[82.97,3096],[71.13,4955],[70.94,7759],[63.18,7077],[74.27,5625],[86.29,2862],[94.85,2370],[98.35,479],[87.74,6691],[94.91,1434],[95.51,979],[91.09,2292],[87.66,1903],[94.31,667],[68.02,7120],[90.36,2376],[95.46,1105],[94.62,705],[89.29,1839],[94.91,1352],[92.41,1184],[95.57,678],[92.02,3009],[95.41,963],[95.62,577],[98.35,193],[90.17,3874],[96.55,1304],[97.11,1367],[97.6,285],[79,6365],[92.29,10390],[94.23,1054],[94.4,1813],[91.95,2049],[95.15,624],[95.67,1003],[96.42,662],[91.13,2589],[80.35,7809],[96.38,1211],[97.5,313],[92.37,1776],[97.82,267],[96.11,1437],[95.19,891],[95.64,1491],[96.69,508],[95.34,1313],[97.02,386],[95.92,877],[95.59,681],[94.55,918],[97.19,502],[94.9,887],[94.82,835],[84.38,4433],[93.78,1357],[95.39,873],[91.58,1981],[97.58,361],[94.16,999],[96.09,640],[95.72,544],[84.48,3898],[94.85,1591],[77.37,5263],[73.83,8607],[91.63,2429],[93.54,1998],[96.43,1464],[93.6,3066],[96.03,972],[89.56,2620],[92.43,2371],[93.68,2177],[95.35,1319],[90.67,2647],[91,2252],[93.4,1808],[95.27,3765],[90.12,5657],[93.89,1760],[90.43,1991],[95.61,1363],[85.05,4608],[91.47,1797],[91.56,2296],[94.58,1482],[82.85,5436],[84.39,1923],[86.47,5532],[94.55,783],[95.27,686],[82.49,5652],[97.61,355],[91.06,1079],[91.32,1127],[98.51,218],[98.15,386],[87.04,1945],[94.57,792],[95.52,1028],[93.34,2094],[78.68,3301],[91.81,1948],[84.56,3048],[95.8,1030],[91.46,1167],[79.44,2446],[68,16921],[92.72,1037],[96.44,459],[92.93,2532],[79.27,5055],[96.82,740],[80.91,4319],[96.64,702],[89.28,3807],[88.6,2999],[93.44,1179],[92.9,11497],[91.02,2679],[87.83,2200],[93.79,1092],[96.64,622],[87.84,3788],[90.22,3604],[89.4,3830],[92.75,1611],[77.32,4618],[90.63,1297],[95.83,702],[91.04,4754],[94.4,1651],[96.79,786],[95.93,1012],[88.27,4474],[96.68,486],[98.68,280],[93.45,1490],[90.55,2834],[86.94,3206],[96.84,1041],[86.11,1919],[93.16,1109],[87.16,3978],[92.63,1633],[87.1,3219],[97.55,633],[94.35,982],[93.12,1411],[96.41,605],[94.65,797],[95.05,855],[84.47,3867],[97.08,627],[95.59,918],[91.85,1680],[78.39,3612],[77.35,3994],[53.5,10523],[75.91,3437],[69.43,4914],[74.04,5018],[89.47,1833],[83.64,2463],[77.59,2848],[88.02,3104],[90.45,1439],[93.91,1134],[90.85,1789],[95.17,1407],[67.53,5108],[92.78,1360],[88.34,2495],[89.45,2204],[92.88,1945],[96.27,788],[90.64,2539],[95.72,964],[90.53,1848],[95.91,878],[92.52,1776],[90.68,1748],[92.02,1288],[89.46,3007],[91.36,1749],[89.3,3992],[95.67,1991],[91.32,3594],[93.3,3364],[83.45,4141],[87.66,2095],[92.29,1987],[94.49,848],[97.68,1753],[93.55,2945],[95.56,1095],[97.1,570],[96.75,635],[88.47,5171],[96.29,983],[74.39,6694],[94.86,1118],[86.51,3012],[92.42,3824],[82.07,5137],[83.62,6588],[71.74,45380],[92.83,1121],[88.46,3797],[92.28,1314],[89.92,3795],[93.84,1928],[91.75,2419],[92.67,1492],[86.3,3126],[95.01,847],[93.71,1275],[95.13,1198],[78.45,2689],[98.14,2463],[92.98,2163],[93.88,1076],[96.86,1064],[95.57,939],[97.46,593],[94.92,3858],[93.98,887],[95.01,1546],[94.33,1667],[94.71,1169],[95.47,1680],[92.76,1131],[93.05,1850],[96.45,721],[85.5,2712],[94.03,1458],[94.26,2201],[96.35,904],[90.34,3030],[92.91,1967],[96.04,833],[89.56,3516],[92.47,2406],[95.33,1810],[89.7,5140],[83.22,2238],[76.94,3800],[96.55,2081],[88.63,1779],[96.03,1314],[90.91,9796],[89.65,3247],[93.59,2059],[91.01,2428],[93.67,2031],[95.71,1905],[93.48,1047],[88.64,4405],[89.51,2690],[95.69,2329],[96.76,920],[92.98,3196],[91.86,1715],[94.86,1841],[94.83,1116],[77.91,7551],[97.03,931],[94.87,1413],[92.1,1764],[96.55,722],[91.1,1748],[96.87,897],[90.6,1794],[94.89,1485],[96.39,1059],[92.37,1049],[93.74,1675],[94.62,1328],[94.18,3155],[94.93,1581],[94.69,845],[90.83,6518],[92.87,2736],[95.67,1624],[90.46,4168],[97.55,637],[91.87,1157],[91.28,1883],[94.14,2921],[95.12,2892],[94.9,1397],[91.38,2062],[84.89,2246],[92.74,2249],[92.37,1092],[93.79,1493],[92.68,2047],[96.62,901],[96.76,818],[92.84,2174],[93.08,2277],[95.34,1387],[96.51,1021],[91.1,2205],[91.98,6958],[85.25,2923],[73.32,8068],[92.19,3025],[94.07,1559],[90.96,1969],[85.99,3766],[93.63,1531],[97.76,770],[85.55,5136],[89.78,4320],[92.13,1856],[92.53,1687],[97.35,455],[90.4,1360],[93.61,4605],[91.63,4125],[89.57,1860],[97.29,886],[94.41,1549],[97.65,1175],[90.81,3584],[86.81,2323],[97.32,1202],[96.58,576],[94.97,1470],[90.58,3046],[96.04,1088],[95.92,956],[93.39,944],[95.69,1245],[84.53,6050],[88.77,4500],[93.52,1703],[94.6,815],[91.95,1756],[95,1290],[91.13,1800],[94.95,1843],[90.82,1635],[93.65,1528],[96.84,655],[94.05,1384],[94.31,963],[91.76,1457],[93.15,1629],[94.45,1664],[95.55,1626],[89.12,6633],[96.46,821],[95.04,1300],[96.3,873],[95.77,1230],[92.26,1603],[86.37,3254],[96.15,1089],[95.07,1635],[94.67,1408],[89.87,2615],[94.7,1632],[93.62,1378],[97.75,742],[89.25,4552],[92.56,2099],[94.11,1179],[88.92,3213],[94.05,910],[96.02,1211],[96.23,2844],[95.45,1174],[89.56,3093],[95.82,706],[95.25,664],[89.41,1381],[93.38,3227],[77.04,8975],[86.91,4199],[88.31,4579],[95.31,3341],[95,1836],[96.17,528],[86.84,7418],[92.81,1480],[97.17,621],[96.89,453],[95.33,802],[93.11,1615],[90.71,1960],[98.1,236],[93.19,1628],[89,3261],[95.72,969],[97.96,308],[94.1,1409],[93.5,1125],[91.99,3928],[96.67,553],[94.66,1256],[95.06,1225],[95.76,900],[96.22,692],[95.25,1520],[97.45,306],[97.37,445],[96.17,638],[96.7,433],[98.23,208],[89.35,3484],[95.55,653],[98.17,230],[87.45,2270],[93.89,1260],[92.23,1917],[93.82,1008],[93.09,2002],[93.73,1225],[89.97,3834],[93.38,1019],[91.74,1176],[93.58,1683],[94.45,1049],[97.14,485],[97.81,323],[94.92,1573],[89.15,2827],[89.28,2543],[90.63,2461],[90.81,1757],[93.13,1192],[85.54,2498],[92.68,1487],[93.82,1877],[91.08,1699],[87.71,3670],[93.93,1133],[94.4,1224],[94.88,912],[96.58,665],[93.55,1114],[89.85,2014],[89,2693],[86.25,3063],[89.43,2584],[63.31,25895],[87.83,3277],[85.9,6055],[93.52,3136],[94.09,3374],[93.85,1728],[86.36,8764],[91.84,2046],[95.03,1165],[90,3010],[80.62,14396],[89.42,2606],[86.47,1580],[87.06,2055],[93.42,2776],[91.67,1692],[90.5,2733],[94.59,1174],[85.79,3969],[70.63,5995],[78.29,3604],[92.1,2142],[93.72,1647],[84.94,5745],[93.4,1993],[90.04,1750],[91.15,2504],[84.6,4354],[86.32,3235],[89.75,2102],[95.31,826],[91.11,2126],[90.5,2548],[89.12,2631],[88.05,7084],[92.33,2576],[89.24,1323],[92.52,1427],[79.63,11766],[91.16,2238],[65.62,15357],[88.01,3508],[75.12,11614],[91.41,3158],[86.54,3341],[92.03,4880],[81.47,3009],[88.17,2091],[83.38,3988],[85.46,4845],[94.4,1952],[86.31,2998],[84.09,3266],[92.45,1387],[85.76,4389],[89.63,3215],[90.66,2324],[85.98,5779],[88.02,1984],[90.8,1846],[81.13,3925],[69.06,17891],[86.25,4116],[89.97,2596],[90.5,2526],[93.07,1582],[90.68,1743],[93.64,1300],[90.93,2158],[88.77,3484],[86.6,2464],[87.83,3742],[85.57,4845],[91.97,1916],[87.98,3084],[94.23,1014],[94.69,1008],[93.63,1189],[89.14,1978],[97.32,475],[80.67,5640],[92.85,1341],[94.45,819],[96.66,446],[97.11,552],[96.63,745],[92.49,1347],[96.25,729],[95.88,841],[96.25,950],[96.69,825],[96.47,471],[72.41,6851],[91.11,1211],[93.96,955],[93.54,818],[96.86,527],[94.76,851],[86.61,2084],[95.84,598],[95.06,1094],[92.89,1443],[93.45,1440],[92.87,1026],[96.64,622],[96.35,475],[96.22,1099],[94.53,1783],[96.75,634],[95.37,882],[92.8,8427],[85.57,2735],[94.29,783],[92.66,999],[93,944],[87.9,3181],[97.51,564],[94.71,704],[78.73,2316],[96.36,592],[95.97,663],[87.5,1901],[95.8,717],[97.04,436],[92.27,1300],[92.3,1774],[97.33,558],[94.69,1165],[92.78,1255],[96.52,1956],[93.93,1226],[96.46,879],[96.48,825],[95.47,1052],[80.29,5497],[95.96,976],[92.84,1777],[96.08,926],[96.13,997],[94.52,1009],[93.73,1427],[90.79,1341],[96.71,687],[94.07,1297],[97.2,821],[96.38,816],[94.24,961],[92.37,1472],[94.78,2703],[77.7,7264],[96.83,826],[92.4,3279],[89.2,1632],[96.24,700],[95.6,894],[94.14,1661],[96.1,1416],[91.45,1461],[94.71,958],[93.98,1792],[92.28,1707],[97.34,544],[94.57,1009],[95.35,1447],[92.19,1446],[96.41,904],[88.91,2807],[90.9,2843],[92.38,1797],[88.4,3437],[90.07,3215],[79.47,4217],[89.41,2730],[95.92,1281],[90.42,1930],[80.32,4534],[88.13,2079],[82.63,2910],[95.09,1843],[89.81,1557],[97.54,714],[96.35,1288],[94.11,2396],[94.64,1345],[95.13,1126],[94.11,1803],[88.01,4299],[84.49,2936],[93.47,1717],[94.7,2315],[95.95,1035],[96.85,754],[70.62,34030],[85.52,1523],[95.95,1289],[89.94,4742],[94.75,1934],[96.84,953],[94.88,805],[94.83,1195],[97.07,529],[97.56,573],[96.75,976],[96.46,929],[97.46,2123],[84.67,6378],[92.67,1889],[93.36,1246],[90.58,3498],[83.63,3496],[97.83,907],[92.67,1849],[92.95,2290],[95.96,2767],[96.04,1066],[96.51,598],[90.01,2847],[94.68,841],[97.61,935],[92.5,1655],[94.33,1753],[92.45,1377],[96.43,940],[94.79,742],[94.8,1238],[93.78,1378],[93.01,4901],[78.58,3921],[76.28,2958],[90.04,1209],[92.37,1582],[95.77,879],[88.35,1951],[96.45,621],[93.88,2682],[90.85,1218],[95.81,1052],[96.11,672],[84.61,2686],[93.12,1143],[88.93,1573],[97.31,530],[87.1,3346],[77.22,5655],[93.48,801],[93.72,903],[96.46,586],[96.03,731],[64.01,7898],[92.06,2276],[94.56,801],[80.88,3001],[82.91,2690],[96.46,927],[96.72,576],[82.12,2474],[82.91,2190],[94.65,1428],[95.55,811],[84.05,2217],[85.55,2172],[91.41,4858],[96.38,499],[84.95,2485],[93.03,2142],[97.1,460],[86.78,6732],[82.06,3058],[94.33,1316],[96.85,453],[94.69,719],[94.71,1453],[96.47,555],[94.39,811],[92.91,4605],[93.82,772],[92.15,1122],[88.55,3380],[95.95,671],[95.85,661],[89.68,3295],[95.78,643],[81.81,8641],[96.23,636],[85.03,9677],[80.18,2690],[92.53,1092],[91.16,3048],[90.92,3355],[86.36,1764],[94.55,797],[94.87,776],[66.46,6052],[94.07,798],[95.85,1418],[93.49,982],[93.66,943],[91.71,3407],[96.51,527],[76.89,5816],[93.21,993],[87.83,2235],[90.11,1289],[93.3,2158],[81.52,3362],[91.23,2995],[94.48,853],[82.95,2415],[93.46,893],[95.32,1545],[95.05,943],[92.57,1043],[93.42,1125],[83.58,6007],[71.66,14325],[86.18,2059],[85.76,9218],[85.28,2900],[94.42,1888],[96.86,515],[93.75,915],[95,2344],[92.65,950],[93.47,1489],[94.13,1193],[92.79,2160],[94.57,839],[96.27,531],[92.78,1924],[95.21,1561],[95.4,1405],[95.99,1072],[93.46,1057],[87.9,2340],[95.22,1559],[89.31,1866],[94.7,1351],[85.18,2462],[90.15,3036],[84.05,2503],[81.8,4733],[92.85,1656],[85.52,4415],[84.55,4748],[88.96,1836],[92.42,1718],[96.05,752],[91.95,1458],[89.21,4029],[90.8,2592],[95.2,970],[95.41,999],[84.99,3496],[93.79,2252],[78.21,5483],[92.97,1593],[94.24,993],[97.42,579],[90.42,2559],[89.38,1761],[92.39,1610],[94.74,1332],[89.96,1635],[97.03,572],[92.88,2663],[95.05,1296],[95.55,964],[92.6,1751],[86.53,4296],[94.1,1690],[89.22,2422],[93.55,999],[91.55,1560],[92.42,1102],[92.54,1284],[95.46,753],[93.48,1038],[93.64,1087],[96.54,778],[86.75,3557],[89.77,2524],[87.49,2242],[90.63,1768],[97.96,472],[85.39,2657],[90.84,1714],[89.42,3014],[90.06,2622],[95.18,1040],[89.97,2775],[87.12,2665],[91.4,6044],[89.95,3327],[90.56,1816],[96.31,879],[88.62,2743],[93.06,1745],[97.17,416],[77.63,7035],[93.03,1260],[96.4,652],[90.48,1799],[88.49,3256],[86.49,2599],[94.41,1930],[92.24,1514],[88.47,2473],[85.07,3143],[96.32,691],[90.49,2610],[94.93,2187],[86.56,2030],[87.4,2946],[90.44,1999],[92.53,1504],[87.23,2488],[90.51,2392],[92.96,2165],[82.21,4738],[92.04,2021],[93.33,1495],[95.69,1062],[89.42,2313],[88.36,5281],[92.36,1631],[91.1,5907],[85.36,3194],[90.96,3827],[94.68,1109],[94.3,1068],[94.46,1667],[97.09,993],[94.35,1098],[85.67,2984],[87.92,2167],[90.55,1996],[93.69,1251],[80.5,6653],[92.01,1356],[86.84,12568],[92.5,2500],[82.44,4363],[92.39,2285],[78.37,9777],[71.66,12485],[89.33,1688],[91.98,2399],[91.84,2074],[86.25,3625],[90.54,2739],[94.6,955],[84.86,3094],[85.7,2552],[92.9,1834],[93.91,1890],[93.47,1983],[87.63,1827],[88.96,2245],[86.1,3080],[87.19,2321],[89.88,1794],[87.2,2245],[86.86,1801],[95.03,1631],[91.65,1165],[93,1347],[87.5,2026],[90.82,1833],[88.63,2622],[96.54,563],[93.17,4547],[88.61,2094],[87.92,2031],[95.53,1156],[91.27,1426],[93.01,1621],[89.16,2285],[93.65,1136],[90.73,1326],[95.1,704],[95.34,1217],[69.8,8535],[91.79,2415],[82.7,3319],[94.76,1266],[95.55,905],[85.28,2678],[87.98,2811],[89.08,4163],[90.36,6097],[94.45,2051],[84.19,4709],[83.71,5444],[97.09,851],[96.47,890],[80.3,8286],[96.42,829],[93.4,1542],[95.19,1730],[84.81,6618],[96.87,746],[89.26,1927],[93.6,1435],[93.35,3763],[88.59,2012],[94.76,1544],[89.47,2275],[95.61,674],[78.58,6613],[90.56,5890],[69.06,11739],[71.97,10030],[82.18,5877],[92.42,1161],[94.66,1155],[86.56,3016],[93.24,1458],[94.36,1639],[91.3,2535],[90.66,4181],[90.9,2511],[94.98,1606],[92.48,2093],[94.36,2767],[92.15,2640],[96.35,841],[89.73,3538],[87.51,2418],[95.16,1497],[87.8,3051],[94.69,885],[84.79,4013],[89.7,2571],[96.13,688],[78.93,5022],[84.64,3778],[86.17,3685],[92.97,2210],[90.66,1697],[94.89,1411],[82.09,4192],[93.39,1683],[91.9,1434],[93.81,1996],[92.67,1885],[95.93,1193],[79.01,10820],[91.06,3062],[92.45,2973],[93.66,1205],[81.08,3950],[86.12,5637],[90.25,1462],[87.24,2077],[91.48,1743],[91.91,2709],[81.21,2949],[94.78,1591],[88.21,2860],[79.19,2822],[93.7,1882],[82.4,2419],[88.46,4410],[93.25,1188],[93.91,1239],[92.38,1083],[87.91,1979],[77.49,6741],[91.63,1149],[86.04,2527],[92.65,1299],[89.51,6440],[91.03,6387],[85.78,3198],[91.24,1797],[93.55,1388],[92.14,2154],[90.86,5310],[95.22,2653],[89.59,2673],[89.49,2350],[79.39,5921],[84.22,4607],[80.55,13876],[96.46,652],[92.22,1528],[91.38,1142],[88.14,4637],[92.42,1983],[90.63,2107],[92.46,4745],[95.46,2051],[77.32,4483],[92.01,1338],[90.55,2471],[94.1,1162],[96.8,831],[87.54,3283],[94.51,1313],[78.92,5144],[76.62,4557],[89.1,2634],[97.77,1023],[68.07,13321],[82.63,3326],[81.31,8526],[76.47,15492],[91.81,1167],[81.67,3140],[86.13,4464],[89.87,1776],[94.56,1149],[78.91,7944],[88.1,6270],[78.2,3346],[91.27,10594],[91.79,2050],[95.02,1031],[90.4,1671],[95.06,1217],[91.6,1671],[96.94,527],[96.78,890],[98.11,814],[94.7,1192],[93.04,1859],[96.57,841],[91.71,3650],[89.69,2731],[93.72,2054],[83.97,5200],[95.88,776],[93.3,1234],[86.04,13813],[94,4183],[92.76,1355],[91.62,3957],[95.79,1018],[86.55,5402],[95.87,1533],[74.57,5569],[94.26,1142],[80.8,5264],[91.17,2039],[87.64,2819],[97.79,616],[97.86,1078],[93.14,1840],[88.95,3693],[95.57,3511],[94.58,1835],[89.57,1636],[93.36,1520],[91.41,4009],[91.24,5053],[89.32,3698],[80.18,5117],[91.31,1578],[94.42,1362],[97.54,1054],[96.85,1745],[89.34,3135],[85.14,3525],[89.31,5279],[96.22,840],[94.31,1432],[90.42,2791],[95.52,1980],[85.96,4953],[90.47,2170],[92.91,1378],[97.43,673],[95.69,1596],[96.91,707],[93.35,1654],[90.72,2200],[95.13,1554],[92.16,2052],[93.9,1199],[90.11,2346],[91.6,7158],[77.73,3101],[96.06,1254],[97.09,877],[97.19,867],[91.96,2670],[94.04,1443],[94.27,809],[96.29,1156],[93.91,2354],[94.36,1673],[91.11,1513],[94.89,1278],[82.78,3937],[93.54,1377],[95.24,1210],[95.31,3527],[92.28,1767],[89.45,2832],[92.31,1687],[86.65,2987],[94.94,1181],[97.26,816],[88.62,2971],[85.91,3586],[97.16,1111],[94.55,1326],[97.25,577],[88.33,2830],[95.26,894],[92.75,1310],[97.2,482],[91.29,1560],[93.85,1112],[85.03,3949],[74.18,9942],[94.59,938],[90.46,2693],[94.26,991],[95.85,806],[88.64,1755],[97.32,443],[95.91,714],[94.1,1236],[83.79,1866],[84.02,5096],[76.75,12920],[87.64,2774],[94.4,1093],[91.06,1963],[96.58,704],[94.99,614],[96.3,525],[86.73,4391],[94.26,1160],[82.65,4058],[89.79,2967],[95.7,713],[91.39,1557],[97.8,454],[92.97,1938],[89.58,3219],[91.81,1408],[76.18,3315],[97.22,781],[96.05,1411],[88.44,2965],[85.29,12750],[88.8,1973],[95.9,1320],[93.52,2013],[94.58,3352],[87.24,2729],[88.63,2079],[90.91,4561],[94.91,1018],[75.03,7313],[91.54,1745],[91.05,1820],[96.08,904],[88.01,1938],[89.24,4391],[82.87,4362],[91.1,2133],[82.81,4531],[79.21,5036],[93.34,1913],[95.87,1064],[94.12,1540],[86.71,2464],[95.77,1500],[82.35,11056],[94.57,938],[93.28,2689],[96.62,3653],[89.66,1497],[95.5,1535],[78.19,5016],[87.24,12650],[77.85,5775],[85.33,3993],[94.87,1194],[86.34,4797],[80.6,3460],[96.32,590],[91,3151],[89.23,4274],[96.3,1255],[93.08,1338],[88.31,2142],[89.11,3658],[96.17,1083],[90.6,2495],[96.52,1579],[97.88,499],[95.01,889],[95.22,909],[91.1,6322],[89.42,2524],[91.6,1876],[81.64,2725],[96.7,1496],[96.8,563],[93.88,1442],[83.1,3942],[42.42,12778],[76.09,5487],[83.44,3052],[83.92,4245],[86.72,3130],[87.54,2898],[81.48,7016],[76.7,11789],[87.66,2807],[74,5568],[90.74,2049],[93.82,936],[90.87,1984],[95.53,1049],[96.38,1146],[95.34,882],[96.8,940],[92.78,1446],[86.16,4790],[95.78,577],[89.39,2155],[95.34,964],[86.41,3350],[95.93,771],[95.01,770],[97.15,907],[94.59,688],[88.42,1765],[84.46,19448],[94.31,3327],[95.78,633],[97.12,460],[80.02,4778],[95.34,885],[94.74,810],[92.27,2468],[94.9,1032],[97,475],[94.23,850],[94.95,833],[92.61,1173],[93.69,1004],[89.89,2025],[94.56,993],[96.11,662],[96.89,639],[94.17,1774],[93.66,1703],[73.8,3696],[90.44,1270],[96.17,673],[94.32,966],[95.56,764],[94.76,836],[97.39,451],[96.35,759],[79.34,6821],[89.86,1653],[95.62,833],[96.52,934],[92.84,1736],[95.95,681],[95.87,755],[92.77,1433],[96.21,617],[96.4,506],[93.87,818],[77.31,3559],[80.44,2731],[91.68,1425],[91.61,2488],[81.54,2394],[79.18,5735],[95.26,766],[96.66,634],[95.49,767],[93.26,888],[96.14,514],[96.84,537],[91.13,1374],[93.3,885],[94.91,719],[96.11,593],[94.54,1035],[96.06,649],[96.3,580],[94.43,890],[88.51,1738],[96.56,617],[87.67,1943],[94.26,788],[97.49,437],[93.79,821],[95.88,577],[96.47,847],[96.42,800],[95.73,1011],[95.82,589],[97.01,668],[95.49,892],[89.43,1392],[93.36,978],[92.47,1307],[93.84,881],[94.48,1227],[93.11,862],[94.89,1176],[91.82,1690],[96.59,625],[89.04,1475],[97.41,492],[91.97,1368],[89.32,1703],[90.48,1120],[96.09,641],[87.85,4598],[79.36,5790],[96.01,885],[67.97,16865],[77.44,4443],[95.22,820],[95.52,753],[96.86,409],[95.16,660],[87.37,1938],[93.86,1016],[85.3,2242],[94.41,1079],[89.17,1618],[94.72,1807],[95.88,515],[92.42,1390],[95.51,759],[87.63,1975],[93.12,928],[97.18,371],[96.65,565],[96.03,678],[94.25,1125],[80.74,3060],[89.85,1313],[95.28,889],[95.42,790],[82.57,3337],[94.24,1083],[96.02,529],[97.78,279],[93.43,1194],[75.22,3164],[94.76,922],[94.89,796],[75.61,7908],[83.21,3748],[88.95,1598],[89.34,2066],[89.26,1756],[95.07,852],[90.85,1490],[80.99,3058],[91.8,3393],[94.04,1536],[90,2051],[90.86,1214],[83.55,3010],[75.57,4323],[93.24,883],[86.16,4397],[94.68,665],[91.94,1308],[94.22,865],[95.45,714],[95.91,1418],[90.99,1285],[93.01,1348],[95.31,609],[90.34,1703],[87.61,1817],[94.41,988],[91.48,2240],[92.01,2257],[90.71,2134],[94.66,841],[93.42,1386],[94.82,1087],[92.6,2220],[93.47,1096],[95.55,623],[85.21,3386],[81.03,6393],[94.35,694],[95.81,663],[82.49,2698],[94.09,878],[88.48,1903],[90.84,1175],[97.04,459],[92.26,1170],[94.43,942],[92.37,1740],[91.65,1901],[88.3,2881],[92.6,1288],[91.57,1396],[91.97,1163],[92.17,1655],[92.59,3869],[91.61,1236],[86.11,5984],[90.74,4917],[96.17,864],[90.72,2615],[91.32,1799],[95.46,1918],[96.62,472],[96.23,613],[90.26,2059],[94.65,835],[95.73,767],[96.05,758],[95.13,894],[95,910],[97.52,425],[93.11,1033],[94.32,1204],[96.76,552],[92.43,1904],[93.84,1486],[92.14,2036],[92.77,1791],[93.33,1139],[91.87,2022],[94.36,1739],[54.91,47960],[90.36,2892],[96.21,667],[95.44,992],[89.75,1399],[91.46,1417],[95.49,662],[95.3,747],[90.63,2223],[94.09,1251],[86.27,2984],[75.41,13251],[92.58,1781],[84.9,6531],[92.25,1089],[85.15,2503],[95.47,659],[94.48,888],[94.25,857],[93.39,1722],[93.87,1374],[93.38,2699],[91.58,7567],[79.87,3056],[74.99,3619],[94.85,1033],[96.39,697],[95.96,607],[94.35,1116],[96.43,587],[96.77,685],[94.26,1371],[89.46,2184],[80.09,6329],[85.51,7304],[87.73,2858],[93.57,1129],[84.09,9487],[94.35,1236],[94.8,1027],[94.14,1597],[71.53,8575],[86.45,4348],[89.89,1805],[92.09,1958],[94.8,1986],[93.29,1126],[95.32,839],[94.88,816],[90.95,1390],[79.87,4832],[92.73,1203],[82.19,3620],[88.97,2421],[85.53,2120],[89.42,2499],[77.8,4412],[73.35,12581],[76.84,4144],[86.07,2357],[85.87,2503],[69.16,5762],[78.83,3692],[90.59,2326],[95.53,597],[96.67,472],[85.54,9383],[92.93,1250],[96.79,537],[88.15,4148],[85.1,4712],[95.2,685],[92.9,1412],[89.04,3053],[95.48,966],[85.43,3115],[96.42,666],[88.68,3885],[94.93,1089],[94.16,932],[65.14,5374],[94.99,856],[95.39,1564],[88.38,5408],[90.88,3487],[85.65,3457],[95.91,609],[95.7,703],[93.24,858],[95,948],[82.74,3155],[86.11,2814],[73.59,5782],[88.7,2043],[86.41,2721],[88.11,2320],[89.24,1840],[94.39,1352],[83.64,6971],[93.74,1579],[84.66,3257],[88.63,3890],[90.44,3174],[89.64,3132],[90.98,2258],[85.53,4544],[87.43,3322],[90.06,2144],[76.58,9752],[93.62,1171],[92.95,1019],[90.77,1926],[89.15,2747],[96.71,717],[91.82,2201],[88.2,2693],[83.3,4222],[87.83,3448],[76.64,6128],[88.71,2322],[93.7,1986],[87.85,4205],[82.59,3632],[76.57,5557],[91.41,2161],[86.9,4780],[73.22,7201],[83.45,12086],[77.38,3979],[88.75,3284],[95.16,1962],[93.12,2145],[85.23,3539],[89.97,2185],[90.78,1957],[91.72,1984],[91.04,3654],[92.06,1477],[85.76,2624],[96.25,625],[86.88,4244],[90.41,1968],[89.57,3092],[84.65,6939],[89.97,2402],[94.67,1277],[83.96,7347],[85.47,7734],[90.46,2148],[83.79,4402],[82.65,8118],[78.39,5308],[81.26,5649],[88.06,3667],[81.05,14492],[88.03,3146],[91.27,1496],[89.98,3227],[58.41,9473],[78.95,3893],[88.04,3231],[81.7,7143],[82.19,4495],[89.64,4543],[92.77,1863],[87.99,1843],[89.59,2459],[74.51,9712],[84.31,3947],[90.22,2628],[86.85,4238],[87.6,5953],[92.34,3147],[86.5,7706],[87.48,4679],[84.1,4141],[89.84,1387],[97.1,950],[89.61,2102],[97.81,737],[92.05,3138],[88.81,3360],[94.94,933],[90.67,3453],[57.48,17543],[47.19,11702],[83.28,5858],[70.72,6144],[86.86,3441],[84.39,2869],[74.61,10211],[79.89,6310],[81.73,12284],[80.2,4657],[95.22,832],[76.57,6923],[94.07,1661],[93.79,2325],[95.99,2110],[93.44,1910],[77.61,4816],[94.23,949],[91.18,1347],[94.11,2223],[91.07,2651],[90.71,1663],[91.98,2650],[85.38,5946],[92.09,1403],[93.12,1499],[87.8,4967],[91.29,1421],[92.94,1481],[98.1,1342],[95.03,1326],[94.88,890],[90.19,2468],[85.37,2953],[93.28,1765],[93.98,1212],[68.89,16237],[91.04,4544],[87.98,2751],[92.88,2056],[92.43,2467],[89.98,1870],[94.51,1273],[56.78,27593],[86,8741],[87.44,2960],[83.83,4440],[89.24,3231],[94.61,1440],[95.51,905],[93.5,1944],[85.53,3746],[94.09,832],[86.75,5273],[88.92,2506],[89.82,1992],[90.23,2980],[94.08,1439],[90.38,1690],[89.33,2283],[85.86,2920],[87.36,4184],[93.34,2147],[74.81,6252],[88.05,2489],[89.78,4460],[93.04,1190],[85.99,2762],[94.11,1254],[88.07,2586],[89.79,2382],[84.11,5291],[88.71,4628],[89.87,1559],[92.55,1595],[88.52,2763],[91.07,1757],[75.68,3740],[92.16,2154],[82.19,4270],[94.29,1647],[95.98,1186],[81.54,6391],[91.92,4723],[73.73,15447],[88.31,3732],[79.05,4901],[93.12,1280],[92.02,1895],[90.79,1551],[86.49,3036],[93.14,1332],[90.36,1584],[93.6,2414],[81.37,6537],[87.07,4109],[90.58,2393],[89.17,2591],[92.23,3587],[76,5527],[88.1,2760],[90.43,2198],[94.18,1627],[91.19,2779],[93.7,3701],[86.94,3190],[90.44,2561],[74.39,9025],[89.87,5083],[92.97,1665],[88.54,3270],[95.9,584],[93.81,4220],[89.75,2200],[89.7,2444],[82.94,6726],[94.11,1381],[91.93,1726],[87.37,3781],[54.05,23614],[93.68,2630],[95.36,1474],[93.94,3001],[88.45,3654],[93.1,1349],[89.84,5594],[89.89,4422],[94.05,2600],[85.98,10955],[79.13,5455],[96.04,1392],[90.06,2583],[92.33,1634],[92.63,1687],[87.34,5281],[76.21,17729],[84.64,3782],[87.9,3870],[95.61,1025],[93.49,1371],[87.91,3670],[95.82,1701],[86.6,6057],[60.15,23472],[90.27,2250],[93.1,1855],[82.48,10287],[85.5,1974],[84.56,14341],[88.26,2130],[82.63,3904],[96.5,1892],[82.36,2884],[93.46,1213],[95.85,885],[97.65,817],[92.06,2195],[96.08,501],[82.07,3726],[91.65,1834],[91.48,2247],[94.67,1209],[91.39,1765],[92.03,2213],[94.22,1301],[90.55,2611],[89.11,2123],[85.25,2937],[86.13,2739],[79.06,3574],[90.96,1723],[89.64,2421],[89.54,2377],[94.59,956],[90.66,3393],[93.24,3116],[84.33,3786],[97.49,483],[87.84,13394],[91.69,2662],[97.13,821],[93.06,1463],[95.21,1153],[93.71,2197],[88.32,5847],[80.27,7005],[86.62,3821],[97.01,868],[91.81,1499],[88.54,2972],[92.39,3802],[88.95,3239],[90.48,3189],[94,1508],[79.5,6361],[77.98,6992],[92.58,10917],[91.77,2029],[92.08,1709],[93.75,1405],[88.22,3101],[95.91,724],[91.34,3024],[94.02,1727],[93.21,2643],[97.58,476],[97.11,734],[96.9,1655],[91.45,1967],[96.28,831],[85.18,4324],[97.17,754],[86.98,2032],[93.83,1988],[87.84,2831],[93.09,3546],[82.86,12224],[94.84,808],[97.2,567],[88.05,2839],[96.09,677],[93.57,1102],[95.25,910],[97.44,473],[98.06,364],[91.82,1896],[95.57,889],[92.2,1573],[90.31,1378],[96.08,778],[97.29,911],[92.6,1593],[78.18,4069],[59.34,9241],[87.05,2934],[90.8,1857],[70.97,8119],[89.91,2406],[87.48,2284],[81.15,8868],[92.91,2103],[93.45,1086],[71.51,6487],[93.24,1373],[88.17,2488],[92.11,1712],[92.69,2661],[92.74,2605],[93.19,1390],[90.39,5635],[93.5,2597],[93.38,3234],[90.86,2248],[76.75,7690],[78.73,8656],[90.17,4297],[92.39,5338],[94.52,1963],[94.58,1540],[93.66,5356],[92.47,1775],[93.54,1956],[93.08,2417],[96.14,2136],[95.41,1092],[96.52,842],[93.11,2229],[96.88,1026],[95.24,2719],[96.38,774],[94.16,2345],[95.08,808],[91.97,2080],[47.48,19101],[58,10653],[82.41,4787],[94.51,2902],[90.25,2611],[90.76,2407],[91.1,1820],[93.14,6042],[93.57,1709],[97.1,973],[96.91,2023],[7.14,20641],[83.17,2870],[96.62,2703],[95.37,1433],[92.45,4247],[97.27,2684],[90.55,4494],[93.64,1749],[85.65,6615],[96.62,3355],[93.16,4743],[96.51,2223],[92.66,4063],[94.32,2358],[91,3061],[89.37,4805],[91.33,4839],[94.73,2719],[95.31,1745],[91.1,1833],[97.96,700],[90.7,2459],[97.01,636],[90.44,2586],[95.69,1095],[94.31,1040],[95.6,1392],[93.28,1836],[93.07,897],[97.73,405],[96.85,903],[93.19,2148],[96.07,825],[95.87,1127],[91.41,2043],[96.09,683],[92.92,1123],[96.49,1490],[92.42,1361],[95.16,893],[96.89,673],[91.66,3209],[97.41,794],[93.32,1148],[94.03,1086],[91.78,12641],[96.1,738],[97.53,395],[96.75,1136],[96.9,600],[92.36,1781],[97.11,719],[96.05,1621],[95.59,1302],[97.69,585],[78.09,4743],[93.75,1349],[94.42,1842],[97.13,1318],[96.42,1441],[95.84,1837],[83.42,8355],[89.09,5822],[94.9,1644],[94.49,1698],[94.2,1337],[94.16,2199],[94.16,1998],[97.2,504],[94.63,884],[96.04,988],[88.25,3880],[85.55,3911],[96.98,547],[96.64,815],[96.36,1120],[93.55,1251],[97.41,426],[95.11,838],[97.06,559],[92.16,2458],[94.14,1336],[94.6,939],[94.82,749],[89.62,1810]]
			},
			{
				name:'码后核查',
				type:'scatter',
				symbol: 'circle', //'circle', 'rectangle', 'triangle', 'diamond', 'emptyCircle', 'emptyRectangle', 'emptyTriangle', 'emptyDiamond'
				symbolSize: 6,
				data:[[94.97,854],[94.09,740],[97.74,271],[92.18,1030],[83.57,2569],[83.83,6079],[84.72,2133],[93,1017],[87.81,1756],[87.41,1815],[93.14,1491],[94.49,788],[81.67,2521],[95.58,737],[88.03,1971],[95.36,693],[67.5,4384],[95.88,2401],[97.23,495],[92.58,1083],[79.8,2455],[91.87,1065],[96.76,404],[90.89,1487],[86.7,2236],[94.25,910],[79.13,3309],[92.93,1236],[76.7,2613],[77.79,2797],[77.29,2810],[93.06,838],[96.58,678],[87.25,2347],[93.65,746],[92.29,1085],[97.23,517],[82.9,2284],[95.22,664],[61.58,4701],[95.28,1124],[76.53,3647],[87.85,1922],[95.46,825],[63.23,5301],[77.78,3546],[97.77,327],[76.12,21448],[83.48,3311],[95.98,721],[88.93,1290],[93.52,824],[94.27,953],[97.09,625],[97.52,469],[92.57,1008],[93.57,1208],[95.61,1249],[91.59,1018],[86.94,3689],[93.77,865],[86.05,1828],[83.08,2148],[91.55,1231],[80.42,2483],[97.35,402],[95.9,2064],[96.42,537],[59.02,5775],[94.71,1144],[92.36,1378],[89.78,2119],[96.5,833],[96.02,833],[95.89,501],[78.75,3797],[81.36,2795],[92,1324],[96.32,659],[96.34,639],[88.8,2130],[93.41,1144],[93.47,899],[95.72,745],[96.77,494],[68.86,3876],[98,381],[94.32,1103],[86.38,2600],[97.12,538],[97.12,512],[81.2,8613],[87.24,4844],[96.82,595],[97.41,469],[86.56,2137],[91.5,1627],[98.31,298],[91.77,1157],[94.9,1014],[95.31,863],[95.88,1195],[97.79,319],[89.73,1289],[92.71,1189],[72.11,2963],[94.96,1282],[90.01,1416],[98.06,277],[97.38,496],[96.45,685],[97.53,495],[81.89,2525],[88.91,1260],[85.71,2548],[94.42,800],[94.69,1909],[97.84,579],[74.28,4121],[95.8,896],[95.01,1120],[89.82,3317],[93.93,2182],[93.42,1014],[85.93,4949],[95.12,828],[93.36,1169],[92.76,1756],[90.21,1624],[82.16,2704],[93.56,945],[89.4,1928],[93.43,1129],[92.08,1549],[92.4,1748],[94.38,1073],[60.4,6518],[90.21,2132],[94.69,1150],[91.61,3151],[94,1165],[93.27,1479],[91.7,1962],[91.61,1362],[88.21,2458],[92.35,1240],[91.45,2395],[93.29,1342],[40.1,10008],[89.02,1971],[91.77,1474],[90.68,1295],[92.47,1394],[91.95,1174],[86.04,2592],[83.45,2474],[91.08,1403],[92.61,1538],[92.38,1332],[81.97,3374],[92.36,1326],[86.16,2804],[90.75,1964],[82.96,3007],[82.53,3672],[89.53,2435],[91.52,1716],[60.5,9748],[73.5,3908],[72.96,4525],[37.54,14618],[52.53,8286],[41.03,12669],[46.29,11342],[44,11568],[59.83,7795],[75.59,3861],[84.81,2611],[73.47,4846],[67.12,6460],[88.34,2449],[78.33,4181],[83.61,3066],[78.37,4165],[89.64,1456],[52.79,9947],[63.21,7413],[69.19,5999],[56.56,8905],[43.15,12763],[58.08,7660],[50.94,8920],[59.74,7770],[57.59,7510],[83.6,2368],[90.81,1935],[47.19,12555],[65.97,5797],[22.89,27532],[85.24,2748],[75.09,4703],[59.74,9554],[42.3,15797],[47.89,13504],[60.09,9270],[49.11,16347],[78.6,5356],[41.62,14961],[50.47,12259],[60.11,11064],[39.7,14996],[75.53,5354],[36.29,15942],[59.46,9762],[47.68,13932],[67.02,7087],[62.04,8562],[57.09,9342],[11.07,10967],[79.57,4222],[88.83,1804],[88.59,1728],[67.24,15095],[92.32,1080],[60.51,7467],[60.72,6970],[53.97,9171],[61.19,6321],[41.49,19201],[65.56,5997],[49.92,10984],[58.48,8592],[83.6,2097],[76.69,3816],[92.74,1229],[68.2,4534],[82.76,2968],[85.18,2039],[73.86,4402],[92.29,936],[88,1767],[89.72,1512],[68.16,5125],[77.5,3813],[57.74,4758],[78.57,3062],[90.05,2037],[54.19,36251],[74.48,26960],[90.14,1281],[92.33,2051],[88.03,1550],[70.62,5874],[36.06,20537],[88.8,1784],[89.35,1243],[66.29,6299],[79.93,3239],[73.43,4055],[72.69,7833],[82.52,3540],[85.64,1894],[85.62,1952],[90.53,1356],[84.19,4353],[91.1,1260],[57.49,9092],[88.35,1644],[53.76,7977],[78.18,2929],[69.61,4592],[78.95,2942],[87.1,2257],[81.58,2317],[85.89,2956],[69.8,4771],[79.86,3832],[77.87,3448],[75.92,4369],[52.69,7511],[65.58,5643],[79.91,3752],[42.41,10534],[79.97,2805],[84.37,2600],[78.18,2984],[49.25,11036],[76.3,4187],[72.35,5758],[81.89,3347],[74.69,4184],[76.1,4544],[83.6,2536],[91.94,1222],[91.37,2667],[88.85,1383],[62.71,10945],[72.93,6248],[79.84,5481],[58.15,7094],[74.9,3830],[74.7,3177],[90.81,1547],[84.36,2046],[67.74,4531],[20.78,35582],[34.85,36841],[84.15,2569],[84.33,2204],[80.24,3935],[88.95,1516],[86.06,1980],[74.09,9063],[65.78,4593],[44.72,13974],[57.28,9745],[59.38,8790],[75.71,6414],[66.56,6834],[88.85,1496],[85.69,2052],[87.63,1772],[89.42,2002],[84.14,3348],[48.02,13503],[74.22,4963],[71.09,5897],[27.14,24398],[61.6,7731],[59.98,10676],[53.08,13235],[60.61,7832],[69.23,6489],[50.11,12648],[87.43,2298],[85.82,3395],[52.01,10737],[76.67,3854],[69.67,4836],[86.29,2588],[37.84,15745],[74.81,4865],[86.93,2889],[49.67,12178],[61.96,9761],[38.07,16125],[86.62,2310],[79.52,4136],[40.67,16030],[72.54,5216],[89.9,1713],[92.57,1374],[96.56,478],[97.07,506],[87.81,1793],[92.82,2007],[86.61,1920],[79.16,2702],[87.81,2922],[89.9,1431],[85.66,2730],[52.34,9365],[87.3,2041],[71.53,3837],[96.42,794],[90.23,2020],[94.6,891],[80.99,2434],[88.11,1671],[84.25,2132],[91.73,1431],[79.08,6444],[83.58,2194],[68.99,6509],[88.06,2268],[75.28,4928],[89.54,1264],[80.23,2673],[97.23,425],[88.96,3454],[85.83,3771],[92.34,1488],[91.32,22508],[88.63,1694],[94.72,1357],[61.68,12082],[65.38,6941],[46.41,14391],[88.41,1838],[85.43,1905],[83.77,3631],[89.55,2044],[86.02,2419],[89.41,1912],[77.06,2960],[94.99,1266],[83.05,2197],[91.87,3135],[73.7,3618],[97.51,351],[96.22,871],[91.07,1248],[92.49,1489],[77.77,5593],[90.11,1932],[93.36,1211],[83.91,2710],[91.15,1143],[88.77,3213],[95.76,524],[94.8,1104],[91.84,1662],[76.78,4552],[92.01,1106],[94.18,890],[90.98,1425],[42.38,13365],[89.67,1861],[90.08,4091],[90.86,1582],[87.46,1611],[81.45,2450],[91.55,3699],[90.64,1476],[82.8,2850],[60.75,23600],[92.66,1017],[92.57,1237],[95.53,785],[95.81,895],[86.37,1767],[94.85,1067],[91.61,2017],[89.27,2383],[92.06,1836],[95.45,1038],[76.37,3500],[89.47,1526],[90.23,2207],[87.29,6973],[59.48,17706],[96.67,463],[83.3,2893],[85.91,1629],[87.1,2640],[89.82,1751],[86.02,1938],[92.2,1372],[92.79,1197],[79.91,3157],[86.25,3141],[85.82,2453],[86.02,2455],[90.62,1465],[91.94,1857],[88.26,1785],[77.14,3167],[90.56,1183],[92.34,1718],[93.27,1626],[88.49,7255],[93.39,1441],[74.57,3098],[86.52,8001],[96.19,695],[93.07,1205],[93.97,828],[95.56,1153],[73.58,3712],[95.6,691],[95.19,911],[91.61,1447],[88.14,2123],[91.42,3336],[88.93,1623],[88.49,1531],[97.15,786],[91.93,2347],[75.48,3189],[92.79,1087],[86.96,7478],[92.39,5742],[92.68,1842],[81.4,4847],[93.63,3909],[91.62,1207],[96.71,592],[89.63,1594],[92.38,1045],[91.49,997],[97.71,322],[91.77,1535],[73.92,3431],[87.56,1606],[89.22,1781],[92.78,1096],[78.39,2901],[95.77,576],[91.74,1340],[94.63,1080],[95.53,757],[86.66,1883],[94.35,832],[93.67,820],[90.79,1623],[92.63,1123],[90.34,1498],[96.43,534],[93.44,970],[96.1,1126],[88.7,1843],[87.91,2526],[92.58,944],[96.54,1072],[97.09,578],[82.4,2040],[94.01,1601],[90.21,2526],[94.29,1490],[92.62,2799],[87.65,2701],[95.31,1610],[91.43,1113],[91.51,1682],[90.94,2034],[82.77,2236],[75.92,3417],[95.02,810],[85.61,2419],[95.71,878],[91,1101],[98.61,306],[93.99,797],[90.97,1219],[95.46,734],[95,1294],[89.69,1636],[85.96,2163],[91.3,1075],[61.07,4719],[68.57,3827],[91.1,1591],[59.06,11694],[87.32,1794],[94.7,766],[94.58,706],[96.59,428],[94.71,708],[90.86,1574],[92.33,1180],[94.7,671],[94.69,923],[49.85,6215],[92.69,1297],[80.55,2773],[86.96,2589],[88.04,1734],[81.11,4085],[91.14,1801],[92.92,1059],[90.51,2395],[88.05,2730],[91.48,1518],[82.33,3117],[90.4,1477],[70.03,4131],[89.94,1585],[75.49,4650],[96.23,566],[95.14,756],[76.31,3578],[90.67,2972],[76.26,3149],[91.86,2048],[96.7,576],[96.53,562],[93.98,1386],[91.12,1246],[95.75,1847],[92.68,1004],[88.35,1616],[91.82,1166],[86.89,1742],[92.66,1054],[89.39,1576],[84.58,2172],[95.73,819],[93.54,984],[95.76,870],[78.53,4109],[89.21,1400],[97.43,885],[92.73,971],[96.74,536],[96.7,480],[95.2,887],[93.3,1047],[93.5,970],[95.17,586],[93.09,945],[94.95,1227],[93.65,1916],[95.86,702],[93.79,783],[94,1485],[54.24,7212],[91.74,2519],[91.15,1974],[94.99,1132],[78.02,5673],[97.32,747],[96.66,811],[97.09,1061],[95.49,565],[85.59,2300],[97.19,426],[88.23,1508],[95.77,675],[85.61,1717],[86.89,1699],[82.62,2221],[87.05,1595],[90.26,5054],[94.31,829],[86.32,2491],[93.15,1085],[92.37,856],[85.67,7525],[91.85,1593],[82.5,5283],[80.35,7859],[85.86,3464],[92.86,1285],[95.16,799],[86.5,1946],[84.46,2962],[91.51,1317],[90.92,1842],[95.01,807],[86.3,2460],[90.06,1611],[96.53,560],[91.38,1733],[95.32,707],[93.8,759],[95.08,662],[96.75,676],[97.6,312],[84.89,2098],[86.45,1920],[92.99,1016],[90.58,1348],[96.32,532],[78.71,3557],[95.89,629],[93.37,1995],[95.28,1146],[86.58,1734],[82.41,2215],[94.49,779],[73.19,4246],[89.73,2313],[84.15,2512],[97.96,1051],[97.42,346],[93.13,1510],[88.95,1684],[91.29,1763],[91.81,1479],[83.13,1891],[91.12,1154],[92.6,4797],[94.67,1874],[94.71,1817],[95.71,1121],[95.58,974],[96.36,801],[95.08,821],[86.2,1721],[96.15,594],[90.83,1497],[92.29,1355],[93.84,928],[89.7,1754],[69.41,3647],[76.99,3202],[95.56,1383],[89.55,2864],[90.45,3198],[51.09,28312],[80.64,2877],[64.65,6684],[65.43,5238],[91.4,1529],[64.09,4009],[90.43,1423],[75.67,3898],[89.57,1232],[94.55,1535],[95.06,680],[95.21,1620],[94.73,1024],[89.58,3983],[87.95,2846],[79.02,3394],[88.26,2145],[74.2,4125],[92.32,2323],[85.7,1910],[81.99,2162],[91.75,1313],[79.74,2371],[91.17,1271],[94.04,1195],[88.01,1747],[95.17,1691],[94.5,2042],[88.39,1828],[90.38,5744],[86.91,3032],[91.39,2333],[96.39,1722],[87.75,2152],[86.03,1916],[97.87,272],[97.45,310],[93.66,892],[87.51,3927],[58.24,7535],[86.11,5130],[96.46,452],[80.64,3526],[70,3415],[86.93,2300],[91.07,1723],[73.88,3438],[80.65,3009],[82.62,6505],[73.92,3946],[89.49,1684],[93.69,865],[90.37,1495],[86.59,2692],[85.37,2114],[83.56,2856],[86.89,4677],[85.37,1766],[92,1247],[72.98,5030],[77.57,3270],[76.64,7478],[93.53,722],[95.3,882],[81.95,2225],[91.38,1662],[87.06,1727],[87.2,2225],[89.07,1357],[68.65,4492],[90.58,1598],[85.31,2146],[85.06,2041],[89.23,2913],[94.98,824],[81.02,2714],[88.25,1755],[95.11,787],[80.33,3546],[79.89,3665],[91.39,1100],[93.92,966],[84.58,1955],[84.03,3193],[77.81,3213],[92.05,2063],[87.64,2363],[92.41,1745],[72.15,17333],[97.72,368],[97,540],[96.35,516],[95.44,985],[94.52,769],[90.65,1016],[95.8,1072],[94.98,817],[96.73,398],[91.89,1463],[96.84,369],[94.33,1105],[97.17,402],[95.07,704],[96.46,552],[91.01,1918],[82.24,2797],[95.19,1021],[87.14,3448],[88.09,1818],[85.24,2149],[92.34,1303],[89.55,2044],[78,5404],[89.66,1583],[83.22,2924],[91.58,1315],[85.92,2736],[87.1,3037],[78.56,4780],[92.31,1336],[83.58,2602],[68.94,14038],[90.77,1235],[97.11,388],[93.58,1680],[91.57,1273],[93.28,1508],[96.22,462],[96.81,532],[97.22,421],[89.85,1363],[94.94,785],[93.88,849],[79.51,7828],[82.95,3053],[60.89,7146],[83.92,2882],[81.66,3655],[90.52,1368],[80.5,3827],[84.86,2390],[81.48,3338],[78.14,4287],[91.91,1157],[67.51,11063],[93.93,1062],[97.23,558],[91.19,1288],[95.02,670],[91.47,1348],[90.13,1987],[91.86,1520],[91.44,1324],[91.32,1585],[86.1,2431],[72.17,3940],[88.22,2455],[86.64,2457],[98.1,382],[96.67,579],[95.92,503],[97.64,315],[97.01,700],[93.26,985],[83.97,3577],[91.5,1364],[83.84,2054],[95.18,910],[81.22,3281],[96.55,534],[92.9,1373],[86.19,2177],[90.92,1414],[86.03,1937],[91.23,4043],[78.07,4153],[90.06,1338],[67.41,5186],[91.05,3187],[91.1,1233],[83.67,2984],[96.36,940],[77.99,5867],[96.71,726],[87.88,1858],[87.8,2415],[91.56,2204],[94.2,1602],[90.15,2342],[91.84,1300],[89.77,1350],[93.64,1509],[91.09,2169],[51.94,6843],[89.91,1610],[95.17,1374],[89.91,1697],[90.37,1314],[94.3,1707],[67.87,4860],[83.38,2589],[93.04,1278],[91.56,1345],[90.47,1296],[83.09,4482],[93.02,1223],[89.52,2379],[80.57,4378],[88.03,1541],[83.88,1982],[93.16,1271],[93.61,1041],[74.44,4049],[97.33,486],[95.63,602],[97.34,449],[96.67,477],[92.06,1191],[94.1,1477],[91.43,1568],[90.81,1238],[92.45,1141],[97.29,302],[97.2,417],[89.72,1599],[95.3,688],[85.92,3107],[87.13,4240],[91.03,1572],[86.72,4116],[80.49,2633],[79.33,6471],[91.11,1257],[96.06,521],[91.9,1062],[92.82,967],[95.9,580],[90.97,2501],[91.36,1331],[76.99,3985],[88.39,2000],[92.14,1899],[97.64,582],[89.69,3381],[94.8,1457],[95.65,599],[85.9,1832],[97.33,359],[94.59,1007],[85.83,2120],[82.83,3522],[88.61,2987],[94.2,1467],[86.95,3272],[94.82,1236],[87.09,1504],[82.28,3868],[89.33,1473],[90.08,2298],[91.8,1319],[87.3,2339],[90.78,1503],[91.37,1241],[90.1,1829],[92.46,1395],[91.94,1430],[82.73,2275],[88.19,2019],[81.58,3249],[92.77,2128],[86.43,2965],[67.48,4691],[94.83,710],[81.62,3201],[87.51,1959],[87.66,2045],[89.03,1783],[91.66,2985],[91.25,2388],[94.22,1257],[89.58,1968],[84.84,2125],[73.2,4542],[97.8,421],[93.48,915],[95.11,1221],[95.65,594],[90.63,2617],[95.67,1285],[69.8,8187],[86.58,2746],[98.18,294],[81.02,2821],[85.94,1843],[97.28,435],[96.18,431],[96.5,501],[95.77,1349],[87.95,2264],[63.38,5461],[93.57,1557],[84.41,3868],[81.94,2384],[91.02,1331],[93.73,865],[89.15,1740],[96.42,569],[96.19,621],[78.06,6640],[88.77,1920],[95.36,683],[97.11,823],[96.32,503],[95.71,639],[93.81,4085],[92.48,1570],[77.93,3324],[92.66,2046],[93.38,1243],[85.88,2005],[92.5,1515],[71.43,7208],[90.05,2979],[87.67,2081],[83.2,4783],[86.82,3791],[86.83,3838],[76.5,2797],[73.29,4048],[89.19,1846],[67.95,3798],[93.47,951],[92.88,1339],[85.03,2039],[93.13,1017],[94.85,727],[95.04,628],[90.19,1474],[83.73,4695],[87.94,3132],[83.41,3489],[77.54,10876],[90.23,1224],[90.88,1375],[95.52,615],[91.24,1881],[94.34,1220],[91.53,1308],[94.5,1105],[92.02,2141],[84.11,5947],[88.44,2257],[94.12,1372],[79.04,3752],[84.68,2304],[91.56,1199],[57.38,5993],[85.19,4520],[93.52,884],[91.86,2101],[84.83,2544],[77.87,3986],[87.23,2512],[93.5,1039],[95.11,708],[83.44,3538],[91.82,2722],[75.78,4560],[94.5,907],[93.72,776],[82.9,9207],[93.89,1114],[89.35,1259],[91.56,1945],[92.4,929],[96.57,502],[93.27,1417],[94.54,881],[51.04,9307],[84.6,2247],[83.8,7326],[66.49,5789],[64.19,4789],[90.87,1591],[76.25,9322],[34.02,11493],[88.69,1675],[73.28,3589],[90.82,1580],[90.31,1744],[89.9,4910],[57.3,6128],[86.09,11710],[91.89,1442],[84.33,2228],[93.39,1021],[89.65,1683],[88.23,1763],[92.6,1598],[92.96,1454],[89.26,1815],[85.17,3919],[94.13,1887],[95.03,559],[93.38,1486],[92.51,944],[76.57,3911],[93.46,970],[82.89,2003],[66.27,4106],[94.96,1419],[84.22,3027],[94.37,1207],[87.57,1768],[80.48,3089],[87.79,2602],[82.17,2481],[83.76,2227],[69.92,4529],[90.62,1224],[92.79,1122],[94.48,828],[91.77,2422],[68.74,4319],[58.39,6679],[61.47,4335],[84.98,2229],[87.85,2523],[85.65,3412],[90.81,1869],[79.25,3455],[93.85,984],[88.48,5908],[94.08,1242],[96.98,495],[91.99,1751],[87.43,2568],[94.33,909],[91.62,1735],[76.61,4412],[82.33,2517],[94.22,1165],[89.46,6925],[89.77,2257],[79.65,3887],[88.13,2219],[93.01,1228],[79.42,3216],[66.52,11392],[89.33,2034],[85.34,3106],[84.4,3247],[81.87,2425],[69.94,3934],[75.47,7346],[82.91,2164],[79.11,4281],[95.75,965],[90.38,3352],[76.04,6676],[74.66,4550],[12.67,27461],[89.48,4686],[76.86,2866],[94.89,652],[38.9,11579],[33.69,14044],[82.08,2570],[96.79,427],[89.42,2632],[80.09,2988],[88.59,1514],[62.31,10387],[71.25,4233],[94.11,1434],[95.5,856],[86.09,2125],[87.3,1597],[78.21,3799],[49.14,11027],[82.8,2279],[88.97,2258],[69.48,6317],[86.29,4169],[93.42,2398],[96.33,557],[57.64,5985],[83.64,3416],[88.01,2507],[89.68,2214],[96.6,553],[75.39,5362],[91.11,1291],[75.15,3351],[95.24,794],[81.88,2444],[94.42,1537],[92.77,1843],[71.26,3834],[56.02,16046],[93.78,1022],[90.45,1401],[88.23,3177],[92.44,2271],[89.12,1503],[93.97,850],[89.52,1415],[91.04,1864],[94.06,1215],[85.1,2540],[68.55,4453],[95.37,748],[72.42,3803],[84.43,3280],[81.34,3105],[97.11,400],[93.33,1133],[86.9,2114],[55.16,9445],[93.28,2011],[90.1,1388],[97.26,524],[95.91,832],[81.31,2386],[84.19,2289],[90.13,2570],[86.73,5571],[58.53,5753],[86.05,4286],[62.68,6215],[67.24,6341],[94.59,820],[95.29,1026],[85.81,3229],[32.5,15064],[92.84,1344],[97.72,336],[94.54,1167],[95.24,702],[96.75,576],[94.43,943],[95.28,1503],[89.37,3452],[95.68,647],[93.96,1315],[91.04,1315],[96.39,473],[91.63,1635],[50.76,8687],[89.78,1705],[90.91,3389],[78.57,2914],[81.97,5059],[74.81,3283],[96.17,530],[93.5,1171],[89.09,3495],[95.56,690],[91.79,1217],[90.08,4023],[88.03,1960],[94.36,970],[70.18,4797],[90.88,2182],[79.13,7180],[70.31,6918],[48.61,8671],[65.22,6512],[93.22,1514],[91.71,1529],[87.65,5637],[81.7,8165],[91.84,1906],[79.2,3088],[89.19,2284],[85.81,1985],[95.16,910],[83.86,2137],[94.65,694],[88.4,1756],[82.93,2552],[72.14,3917],[97.73,274],[90.48,2536],[75.86,8138],[79.19,6827],[93.95,1283],[86.81,3020],[90.08,1764],[92.55,1109],[93.38,794],[86.81,1794],[94.25,1004],[89.26,1477],[90.27,1655],[92.62,1498],[72.34,5989],[91.03,1456],[91.47,1025],[90.1,1456],[86.47,1972],[90.88,1056],[89.96,1802],[96.52,478],[97.29,370],[82.97,2614],[95.58,592],[76.13,2890],[95.04,742],[95.42,714],[89.1,1980],[95.86,631],[93.49,1048],[89.58,2815],[88.42,2118],[90.77,10335],[83.77,2476],[86.99,2687],[60.73,10591],[84.46,2374],[96.93,451],[89.39,1625],[80.35,2691],[91.93,2231],[68.88,7118],[77.52,3074],[96.26,605],[90.61,1647],[79.72,3044],[90.59,1209],[92.38,1644],[85.39,3646],[90.12,1852],[96.99,945],[19.89,34871],[80.74,7690],[88.6,1631],[88.48,2347],[96.2,777],[85.09,3392],[93.57,1218],[66.49,8796],[78.91,10191],[93.47,970],[66.34,5146],[89.01,2121],[68.82,8270],[91.2,1593],[74.61,3370],[88.61,2983],[71.14,4421],[95.91,739],[92.72,1724],[89.06,1591],[89.86,1136],[91.06,1562],[84.76,3623],[90.36,1202],[79.96,2745],[90.03,7622],[92.4,1030],[81.76,2591],[89.64,1524],[64.17,5514],[76.38,2991],[52.7,7429],[86.04,1772],[86.29,2525],[90.62,3670],[80.6,5700],[91.84,2132],[74.02,9614],[85.51,3025],[68.1,6995],[91.63,3552],[85.12,3101],[67.69,5172],[73.84,4437],[92.44,1461],[93.54,1626],[80.45,5583],[96.47,638],[87.81,1772],[91.85,1406],[89.37,1483],[92.83,1052],[93.37,1671],[87.72,1600],[83.03,8869],[89.43,1776],[96.98,406],[88.87,2124],[90.02,1406],[92.44,1851],[93.14,1225],[55.18,8181],[90.75,2289],[84.73,3004],[80.01,5295],[95.12,676],[89.13,3579],[92.43,2143],[89.78,1849],[95.85,680],[89.9,1889],[75.19,27078],[93.19,988],[87.35,2259],[94.37,901],[86.13,1923],[95.54,800],[74.27,3862],[82.01,2763],[93.74,1055],[92.76,1198],[89.74,1821],[86.06,3419],[79.82,4372],[57.15,18085],[89.82,2268],[58.13,5726],[83.27,3421],[91.81,1616],[96.11,585],[82.31,4576],[96.35,540],[93.56,1227],[90.04,5914],[94.43,1414],[93.24,1138],[56.36,27077],[51.99,12483],[76.38,19870],[87.85,1685],[70.02,5144],[85.18,1789],[84.88,2188],[84.5,2166],[69.3,8652],[87.11,3135],[93.14,1274],[94.79,1332],[93.54,1809],[90.84,1146],[93.28,1226],[88.65,6377],[96.39,512],[94.29,940],[72.56,4540],[83.32,3285],[83.89,5141],[85.6,2540],[92.9,1770],[90.31,1347],[70.87,4451],[93.97,1910],[95.7,673],[82.34,2327],[91.02,2101],[88.48,2779],[88.75,4142],[30.35,34483],[89.45,1332],[75.55,3854],[86.83,1957],[82.25,2462],[83.24,2449],[88.83,1671],[86.18,2005],[91.78,1525],[91.23,1110],[46.34,23223],[95.33,817],[96.3,693],[88.17,2836],[64.74,8216],[55.62,9190],[83.31,2304],[71.91,3687],[93.62,1021],[89.86,2167],[61.13,8232],[91.98,1196],[92.92,2029],[93.47,1013],[57.97,8567],[97.09,402],[82.14,5669],[95.54,712],[72.28,4981],[87.14,5086],[75.57,3163],[88.88,2054],[85.17,2069],[82.55,2881],[70.27,4687],[30.27,16939],[93.97,1698],[95.34,1551],[95.07,1274],[96.56,440],[91.39,4076],[92.32,1393],[84.77,2372],[81.63,2689],[88.01,1684],[84.54,2236],[85.84,5295],[83.57,3374],[89.6,6696],[62.64,5561],[81.7,2802],[83.29,2285],[70.99,6098],[86.22,1955],[57.11,6199],[94.68,801],[91.61,3033],[42.16,10234],[96.62,623],[86.53,1763],[68.08,4686],[95.45,789],[92.1,3727],[91.22,1327],[75.88,3149],[62.57,6325],[95,685],[89.82,6898],[92.05,1508],[95.07,974],[87.71,4048],[76.9,3409],[80.49,3308],[72.13,5419],[91.08,1304],[97.1,356],[88.25,3299],[85.51,1744],[89.22,1783],[80.09,4479],[74.67,6738],[85.1,3185],[97.13,416],[85.98,5279],[92.88,1664],[81.04,4170],[80.4,6163],[83.26,2790],[91.92,1109],[93.8,1549],[90.69,1976],[94.03,1205],[91.45,1599],[91.24,2591],[90.17,2216],[87.44,2500],[69.71,15893],[96.37,484],[94.82,754],[95.74,796],[73.09,14667],[78.62,2711],[88.84,1668],[90.35,1908],[89.33,2243],[66.35,5955],[91.25,1787],[89.66,1667],[75.94,3627],[82.69,2271],[80.14,2720],[96.41,485],[92.49,1044],[96,575],[89.21,2331],[89.47,5396],[88.38,1712],[96.06,522],[87.11,4131],[92.19,1044],[95.45,660],[93.69,1173],[84.72,1991],[75.63,4257],[85,3026],[89.56,1670],[97.07,459],[87.67,1892],[84.76,4982],[80.19,9526],[96.8,386],[90.93,1506],[95.16,2111],[89.93,1415],[85.6,6239],[95.46,670],[72.14,4111],[78.8,10376],[91.72,3218],[91.84,1031],[91.96,2697],[62.23,5679],[92.42,2600],[90.91,3069],[92.61,977],[88.51,1509],[89.05,3648],[86.42,7507],[91.19,1557],[85.94,2554],[96.02,796],[89.44,1472],[89.15,1725],[93.43,1505],[91.86,1385],[88.28,1512],[96.63,582],[96.27,595],[93.65,1130],[96.89,959],[95.72,644],[94.92,1200],[95.51,884],[68.35,3460],[86,3507],[84.02,2896],[86.92,1837],[81.3,3004],[83.62,2352],[87.72,1686],[88.13,1595],[82.44,2643],[88.61,1713],[92.82,1352],[89.3,1510],[80.87,2590],[78.59,3802],[96.18,440],[72.11,3490],[82.72,3084],[82.52,2276],[79.91,5776],[86.17,4570],[90.07,3622],[93.48,1024],[80.23,2433],[85.63,7643],[75.52,7882],[94.33,1720],[92.4,1910],[92.44,21571],[80.71,3926],[93.18,2055],[91.75,2106],[94.84,1684],[78.3,7786],[82.95,3662],[87.91,3119],[92.55,1603],[77.16,3621],[94.28,1140],[93.56,1070],[89.68,1392],[89.71,2222],[92.22,1067],[78.55,3274],[81.74,5912],[83.65,4961],[88.63,2090],[89.65,1845],[90.14,1440],[88.23,1870],[89.54,2617],[93.75,1463],[92.49,2465],[83.18,2700],[84.66,3230],[89.17,1605],[92.04,1946],[94.58,653],[97.45,336],[65.12,4325],[88.09,1611],[85.31,1900],[89.99,1415],[95.06,810],[88.93,5123],[89.8,2491],[94.41,3816],[84.85,3660],[88.5,3062],[82.29,8940],[87.24,6565],[88.46,3510],[65.34,15444],[90.23,1799],[68.64,6847],[92.76,2393],[93.56,1078],[81.57,6286],[84.74,3976],[89.36,1578],[92.22,2015],[88,2253],[88.65,2939],[93.24,972],[96.6,799],[86.38,2009],[78.76,8659],[84.32,1803],[83.38,2355],[72.35,3391],[96.79,385],[89.73,1594],[87.13,2482],[84.94,2704],[72.61,3303],[52.02,6496],[80.4,3579],[90.22,4229],[42.8,10311],[70.27,6520],[63.25,6678],[88.7,2050],[80.51,5433],[72.48,3534],[78.24,3357],[73.08,9659],[67.23,10729],[88.86,2303],[93.28,1159],[93.85,1137],[74.46,3493],[87.71,1739],[94.23,1037],[92.64,10429],[88.43,6336],[89.25,6525],[85.5,10741],[87.51,6419],[84.69,5635],[82.69,13209],[92.7,4349],[85.24,5710],[88.19,3697],[80.3,6357],[93.62,3006],[89.92,8765],[90.24,6395],[88.57,2019],[92.01,2133],[85.68,3677],[85.67,3373],[90.71,1439],[91.24,1452],[91.01,1725],[95.21,1105],[88.71,1505],[97.32,766],[81.37,2596],[93.95,964],[98.06,392],[47.79,7665],[90.33,1515],[90.07,1463],[78.51,3111],[84.37,2018],[87.77,1443],[91.7,1733],[80.9,2771],[84.5,2045],[85.59,2221],[84.47,2075],[95.36,733],[96.69,565],[96.34,488],[84.38,2047],[77.69,2674],[81.42,2740],[95.62,860],[93.85,865],[96.76,1336],[77.95,2615],[87.96,1510],[88.48,3451],[77.73,7854],[88.97,1728],[77.22,6010],[87.84,2806],[89.81,2070],[86.11,4452],[82.18,5828],[92.95,1133],[75.52,27842],[88.52,3330],[85.5,4074],[89.51,4465],[83.66,11159],[84.28,10955],[84.34,2704],[90.35,1212],[81.35,2935],[87.76,2165],[89.51,1519],[62.34,5180],[88.12,1539],[82.81,3873],[84.39,2189],[85.99,2067],[87.65,1672],[83.79,2530],[86.3,1671],[85.37,2260],[76.36,3662],[88.49,1387],[87.62,1616],[90.13,1224],[97.26,461],[89.66,3504],[85.14,4597],[78.57,4020],[72.7,9550],[93.12,1268],[95.68,727],[84.31,1929],[98.2,451],[75.71,3022],[94.28,1009],[74.15,3045],[88.91,1451],[91.87,1466],[92.11,1513],[91.19,1685],[92.93,1664],[90.6,3067],[91.7,1699],[93.51,1841],[92.23,1833],[91.56,1525],[73.25,5117],[93.31,1595],[93.47,1521],[91.69,1724],[77.02,5307],[88.77,3722],[59.42,8622],[88.86,2405],[90.36,1954],[96.15,624],[92.84,1099],[98,287],[92.23,909],[90.3,1308],[82.23,3863],[91.43,1387],[95.89,612],[85.77,2481],[95.75,563],[97.02,737],[95.55,705],[95.82,714],[94.96,966],[97.92,255],[84.6,5495],[69.4,3470],[86.3,1616],[90.46,1375],[93.55,813],[95.13,662],[95.21,1082],[95.52,582],[96.83,775],[96.39,537],[96.68,521],[93.18,1035],[95.82,999],[95.2,690],[95.34,985],[95.97,812],[92.45,1405],[96.64,543],[95.86,701],[89.24,2314],[87.84,4099],[81.6,3356],[86.23,1504],[84.32,2209],[85.44,1968],[89,1554],[88.74,2305],[88.6,1491],[89.29,1282],[75.4,3186],[95.03,1367],[86.89,2987],[63.15,11246],[87.68,3652],[86.84,2765],[85.03,2300],[53.88,30223],[78.64,4008],[92.71,1291],[85.97,2322],[55.38,11017],[82.49,3382],[83.45,3991],[97.76,798],[95.45,816],[94.86,1017],[95.02,909],[94.89,837],[94.04,1110],[94.94,824],[93.79,1041],[94.19,1232],[96.94,725],[95.6,880],[96.67,451],[92.52,1000],[86.67,4557],[82.09,12005],[75.85,8577],[87.46,7666],[85.92,6989],[90.94,3906],[90.21,5276],[76.32,7217],[90.42,5172],[74.4,9101],[86.92,4399],[79.47,13272],[91.05,3543],[83.37,4486],[75.4,4294],[86.96,2296],[54.94,9346],[90.85,2370],[93.52,2058],[91.68,1542],[86.8,3377],[89.98,2878],[84.2,3806],[89.47,3154],[88.33,2662],[90.44,2814],[88.67,4671],[91.48,1882],[91.08,2506],[85.16,2952],[89.39,1699],[87.69,4510],[73.5,3894],[88.56,4017],[89.68,1731],[86.74,3975],[72.67,3258],[94.12,938],[55.09,6250],[91.88,1220],[89.11,3425],[85.7,7171],[77.49,3469],[81.84,3265],[42.35,9865],[93.82,1169],[93.61,2290],[69.47,4350],[90.07,1556],[88.25,1352],[93.38,1323],[87.13,2455],[81.65,3035],[92.7,1263],[87.16,6325],[92.69,1290],[84.99,2432],[86.41,5228],[85.04,1914],[97.68,378],[95.58,631],[98.06,428],[95.13,894],[92.75,1255],[87.94,1614],[96.8,397],[84.87,1942],[85.48,1928],[91.51,1154],[84.4,3075],[88.8,1694],[84,2336],[84.42,3511],[93.18,2110],[91.06,1134],[93.2,977],[97.15,511],[95.68,868],[93.83,1190],[88.56,1507],[90.33,2774],[94.95,812],[87.46,2582],[85.23,2422],[91.17,1105],[93.49,1005],[89.53,2427],[96.27,545],[83.06,4162],[88.22,2095],[60.38,4933],[91.79,1057],[78.64,4314],[91,1804],[91.66,1332],[90.15,1770],[83.13,2297],[81.44,2658],[86.33,1958],[94.27,940],[83.17,2409],[62.6,5508],[90.07,1198],[87.03,2013],[96.02,868],[96.32,516],[89.07,3026],[79.21,2298],[62.39,4890],[94.61,857],[85.43,1987],[80.9,2510],[95.87,590],[71,3696],[78.49,7928],[86.87,4118],[88.37,3141],[82.19,4004],[87.14,4581],[89.18,3535],[87.48,3431],[90.25,2641],[83.16,6354],[94.71,987],[81.79,2396],[88.32,2570],[87.28,3786],[89.38,3340],[88.06,2789],[91.12,1159],[88.91,2026],[83.75,4090],[98.21,417],[86.99,2507],[93.24,1153],[91.27,5270],[81.82,7480],[87.64,1692],[96.56,466],[79.79,5331],[82.23,4506],[88.88,2921],[78.86,10542],[91.21,3224],[96.98,581],[96.13,889],[90.49,1285],[91.29,1607],[92.2,1243],[84.04,1924],[77.17,4901],[89.01,1934],[89.53,1845],[86.85,1760],[89.11,1293],[94.2,1089],[92.24,2175],[89.07,2016],[94.24,2026],[92.68,941],[95.61,1082],[92.39,1115],[95.91,908],[92.47,1456],[91.8,1522],[85.73,2945],[92.38,2070],[95.86,746],[94.59,1943],[93.45,903],[57.42,5816],[85.71,4871],[86.78,2569],[91.22,1645],[85.76,2488],[60.4,6074],[88.45,1981],[86.44,4376],[88.67,2056],[94,1377],[85.02,5916],[86.66,2362],[82.77,2944],[93.37,980],[91.94,1231],[92.42,3630],[82.5,5542],[74.29,3092],[91.32,2023],[96.83,577],[68.06,4018],[91.81,1189],[89.5,2311],[88.73,1608],[86.43,1941],[85.03,1747],[90.37,1322],[79.53,4953],[80.97,3140],[96.76,767],[96.05,698],[82.59,2298],[88.63,2764],[95.68,651],[74,3130],[65.48,4067],[92.79,891],[90.98,1563],[87.07,2029],[95.1,753],[84.77,5849],[84.32,1788],[94.68,1412],[94.8,939],[91.66,1330],[94.14,1215],[83.39,3807],[92.24,3797],[89.07,5767],[85.94,2504],[83.33,2376],[82.45,2607],[85.7,11120],[92.71,2657],[84.51,8875],[91.97,7454],[89.78,6663],[85.6,1708],[83.46,2283],[90.54,2942],[91.91,1382],[94.48,995],[92.84,1335],[76.1,6509],[68.72,4467],[89.57,1343],[88.68,4229],[91.14,5689],[88.11,2382],[87.05,2287],[87.58,2066],[86.7,1814],[87.93,2933],[92.55,1710],[75.34,7619],[95.3,706],[86.74,3020],[84.66,4177],[68.09,11652],[62.53,7658],[86.57,2317],[94.76,853],[82.07,4187],[87.12,2163],[87.27,3011],[89.46,2212],[88,2888],[74.36,3802],[76.69,3370],[83.27,1970],[93.77,1913],[95.08,890],[82.56,4075],[88.09,2279],[87.88,1245],[90.79,1101],[84.89,15924],[93.47,950],[89.3,1219],[93.61,1326],[95.37,798],[95.05,1085],[90.25,2234],[87.84,1954],[86.71,1961],[89.8,2010],[91.26,1356],[56.9,14264],[94.96,754],[88.33,2078],[88.53,2791],[61.75,4929],[86.67,1521],[79.33,2962],[90.13,1322],[79.52,2683],[89.71,1393],[74.35,3199],[88.56,6163],[88.96,1995],[89.3,1219],[82.4,4367],[87,4247],[87.2,9350],[88.41,3529],[83.97,7645],[81.2,4199],[57.91,12731],[90.81,1627],[68.02,3963],[95.07,742],[76.75,3199],[80.68,2438],[34.21,19381],[87.49,6330],[67.52,16177],[93.39,1744],[91.51,1190],[83.1,6543],[92.6,1081],[61.32,7781],[80.59,3002],[90.84,1073],[93.54,1317],[95.84,757],[72.77,3669],[89.01,3468],[93.31,2961],[96.02,614],[95.32,945],[94.27,1200],[94.87,938],[95.96,637],[42.99,7026],[83.37,3515],[91.35,2413],[84.76,2390],[91.72,1300],[95.31,802],[73.05,3353],[96.69,477],[91.02,1412],[94.2,825],[90.15,1657],[83.16,2277],[91.18,1360],[85.81,2581],[96.17,529],[88.61,5223],[94.12,2259],[91.84,1525],[89.46,2478],[64.25,5593],[88.55,1505],[61.04,4850],[89.26,5123],[94.63,847],[81.49,2429],[84.54,7872],[85.13,1783],[95.26,918],[87.95,1510],[94.12,914],[84.46,5963],[96.66,450],[93.18,1127],[86.12,3278],[84.59,2532],[83.82,2748],[90.79,1101],[93.17,946],[85.39,10740],[86.99,6717],[92.03,2009],[93.47,950],[94.52,853],[90.83,1120],[83.37,1938],[86.4,2506],[87.94,1739],[74.56,3228],[76.96,8993],[83.23,6112],[92.58,1032],[67.16,10925],[81.88,1900],[93.97,910],[96.5,586],[83.35,2410],[78.72,5125],[93.22,1352],[67.98,5960],[56.79,7275],[91.51,1043],[71.43,4299],[64.13,9098],[93.13,1109],[83.42,2476],[83.91,2835],[85.09,2319],[89.56,1800],[87.95,2424],[89.36,5090],[83.27,3339],[95.07,742],[95.48,705],[93.15,945],[97.04,467],[88.54,1503],[90.89,1400],[70.58,3659],[80.15,2213],[94.09,851],[86.55,6177],[89.34,1825],[75.74,3230],[89.38,1730],[94.18,923],[82.22,2065],[88.16,6850],[94.42,899],[95.64,700],[82.07,7341],[95.15,621],[82.81,6838],[93.65,954],[96.33,716],[62.98,12930],[78.58,5005],[76.4,5195],[96.03,607],[53.53,15350],[70.2,8266],[81.89,9235],[92.89,1047],[88.07,2000],[79.53,10201],[87.87,2451],[84.34,2774],[94.14,1008],[89.47,1354],[94.31,864],[95.65,627],[82.33,2839],[90.69,2035],[89.5,1547],[92.11,4003],[83.05,6443],[90.6,1487],[88.28,1523],[84.56,5837],[86.21,6340],[88.14,2511],[77.6,6529],[76.1,2908],[90.2,1928],[86.03,5475],[82.19,2757],[84.16,5496],[95.26,871],[86.08,2571],[78.14,3433],[78.72,12452],[93.78,1189],[81.52,6960],[93.8,1635],[88.92,1690],[93.08,1551],[90.18,1334],[82.77,4277],[92.56,1260],[91.19,4668],[76.84,3070],[88.98,4019],[84.25,1734],[91.21,1159],[88.12,1966],[81.03,3374],[62.77,10387],[92.63,1478],[63.77,14356],[80.42,5630],[63.88,4757],[75.87,7145],[81.84,3254],[88.75,1783],[90.69,1747],[90.23,1931],[88.97,1782],[81.97,3033],[83.1,5500],[93.6,1001],[92.6,1388],[92.67,1148],[93.84,928],[82.74,2333],[80.93,4407],[90.48,1552],[65.56,9554],[64.82,13791],[86.47,2158],[89.83,1508],[82.74,2333],[80.96,3659],[76.35,3345],[84.43,3058],[86.49,3471],[72.88,3498],[83.52,4217],[96.46,670],[95.2,758],[95.23,931],[95.77,800],[83.58,3223],[77.11,2653],[85.18,7353],[93.02,1070],[78.68,3169],[86.88,1394],[95.81,1109],[93.01,1948],[90.76,3446],[86.83,3421],[88.5,8775],[86,3352],[87.15,4931],[91.27,1719],[89.18,1690],[89.31,2066],[89.35,2549],[57.9,6774],[93.84,928],[95.55,826],[75.39,2879],[82.52,4468],[86.35,1657],[96.88,733],[94.26,757],[93.52,933],[89.17,1510],[85.8,2834],[88.96,2105],[91.65,2283],[91.75,1746],[81.75,2441],[87.09,2193],[85.16,2413],[69.27,7604],[82.24,3322],[87.02,1641],[87.01,1762],[76.52,2645],[68.08,7679],[84.89,2205],[73.32,4569],[79.51,2967],[70.34,5920],[89.2,3391],[95.85,529],[81.57,2474],[80.65,4541],[95.8,690],[82.58,3598],[58.36,10965],[80.63,2753],[91.38,1414],[92.86,1038],[84.02,1887],[96.63,427],[88.16,2071],[93.89,919],[79.25,4012],[47.53,7421],[87.81,1882],[86.99,1910],[88.35,4254],[90.33,1495],[96.41,696],[84.53,2256],[96.86,532],[95.04,719],[84.74,2160],[83.99,2024],[76.27,3632],[92.27,963],[87.67,1904],[87.16,1823],[79.31,2690],[90.51,1830],[86.41,2474],[81.16,2514],[89.28,1844],[94.75,1020],[94.76,1235],[75.47,10927],[88.58,7489],[91.9,1559],[89.34,4199],[84.53,7006],[94.17,1134],[87.09,5789],[89.01,1911],[86.19,5801],[87.05,3054],[82.48,4415],[90.91,3743],[92,1269],[89.04,1806],[94.36,949],[82.26,4868],[97.07,441],[62.75,6612],[90.48,2226],[84.8,7053],[95.16,1011],[85.44,3203],[88.35,1614],[72.04,3489],[90.3,1280],[86.97,3889],[80.09,3084],[52.39,7700],[77.56,6416],[92.09,1037],[72.16,4997],[81.34,2657],[73.96,3901],[87.74,2102],[85.47,3300],[90.45,1495],[88.86,2016],[91.4,1477],[91.97,1398],[91.6,1412],[93.08,1098],[88.59,2417],[90.57,1681],[88.16,2044],[91.53,1851],[92.22,964],[96.98,430],[80.43,2890],[94.21,1187],[92.53,2716],[82.52,2339],[87.87,1888],[89.59,1412],[95.89,582],[94.74,699],[93.6,1095],[82.17,2713],[86,2267],[89.64,1556],[95.6,654],[83.82,2677],[82.74,2640],[87.6,1721],[95,950],[83.83,2353],[94.89,646],[96.84,546],[92.38,1422],[74.42,4804],[92.87,1150],[91.64,1369],[90.04,1276],[97.97,342],[97.26,470],[68.41,5043],[87.17,2976],[88.94,5173],[61.73,7381],[88.39,4101],[85.05,3135],[88.41,1953],[86.83,2750],[88.45,1779],[91.61,1307],[89.51,1790],[90.44,1802],[93.49,1309],[88.76,5879],[90.48,1705],[68.09,4032],[87.83,2239],[94.16,848],[95.22,819],[94.84,846],[95.84,804],[92.86,1078],[96.12,1419],[90.59,1250],[89.36,2972],[89.35,1653],[89.74,1962],[77.01,3683],[94.81,708],[92.08,1133],[93,950],[92.22,1183],[93.32,1060],[91.68,1186],[92.84,1073],[85.66,1967],[89.15,1669],[78.47,5851],[89.99,1295],[64.06,4948],[90.95,3246],[90.11,1228],[95.06,783],[90.81,1280],[82.23,5037],[85.23,2148],[94.82,749],[85.95,2804],[86.7,1715],[83.86,2259],[85.16,2019],[85.71,2249],[94.72,746],[95.82,704],[94.95,975],[80.88,3157],[90.41,1567],[95.97,593],[54.89,6741],[85.6,2482],[85.24,2567],[75.18,7903],[82.94,3124],[92.16,1318],[89.28,1778],[89.71,2009],[94.59,757],[92.79,984],[85.36,1949],[77.49,12521],[87.06,2416],[97.52,387],[82.76,7804],[89.61,1301],[86.61,5863],[60.36,5207],[85.08,8082],[89.19,1771],[58.42,4974],[77.87,6513],[95.14,811],[71.64,4576],[91.12,1272],[84.85,2348],[79.96,4669],[87.41,3393],[84.55,4854],[25.14,12484],[90.09,2187],[56.19,6224],[57.92,6687],[71.36,3817],[89.23,1715],[66.89,4940],[89.64,2179],[72.7,3575],[66.04,5182],[89.42,1563],[87.85,1973],[86.08,2104],[91.18,1416],[86.86,2168],[85.16,7628],[82.63,4278],[88.66,3334],[75.36,4542],[94.59,801],[90.91,1332],[91.52,1192],[92.04,954],[93.26,871],[85.06,5336],[94.1,1440],[93.22,961],[89.39,2191],[82.01,5760],[91.98,1411],[91.83,1646],[91.56,1143],[89.43,2600],[90.62,1708],[95.44,794],[80.11,3289],[95.87,677],[78.88,2953],[78.33,3774],[89.05,2390],[69.93,5121],[93.28,1098],[95.3,806],[91.56,2694],[97.58,345],[94.62,1629],[81.83,2761],[81.45,2439],[69.65,4997],[91.33,1461],[74.22,3246],[85.11,6808],[86.54,3321],[87.42,2624],[93.18,884],[78.71,3003],[86.71,2165],[82.8,2236],[94.95,934],[96.68,413],[90.19,1618],[86.14,1768],[94.24,1930],[50.2,8404],[77.13,3527],[85.89,2456],[87.66,2070],[96.95,390],[93.39,1266],[93.67,2100],[92.71,1136],[88.89,1594],[72.84,4126],[96.75,472],[95.57,647],[92.3,1984],[88.25,2725],[91.56,1706],[83.1,2460],[89.96,1391],[77.87,3291],[75.17,4524],[86.24,4603],[83.79,3147],[88.96,2142],[73.68,3190],[93.58,949],[85.41,2676],[91.31,1338],[93.93,1306],[94.19,692],[86.63,3046],[92.09,1533],[84.02,2226],[80.87,2944],[88.35,2405],[89.66,3895],[40.07,11196],[89.59,2262],[93.12,1401],[88.72,2014],[81.75,2691],[95,1007],[93.64,1096],[92.82,1743],[97.01,754],[92.02,1158],[96.33,658],[97.05,536],[93.94,1245],[87.4,2386],[94.38,1237],[96.07,1229],[95.47,728],[96.81,570],[71.74,4506],[81.6,4836],[93.77,1580],[96.25,620],[93.91,1721],[89.21,1973],[96.06,673],[82.62,2835],[60.66,8168],[80.35,3607],[88,1424],[86.62,3241],[90.96,1249],[79.26,3308],[95.3,653],[86.46,4176],[91.78,1174],[84.33,2261],[82.32,5908],[60.11,6574],[85.27,5125],[92.33,1425],[82.18,6383],[96.37,497],[83.13,3090],[76.82,2853],[88.94,1718],[93.7,1034],[72.87,4623],[84.51,2161],[90.57,1211],[95.93,526],[81.53,2461],[85.45,2334],[89.28,1635],[89.43,3969],[80.92,2595],[69.44,4559],[87.8,2406],[91.73,1250],[69.35,4036],[83.49,2241],[91.15,1248],[88.84,2008],[88.67,3061],[86.24,2074],[95.73,760],[78.19,2948],[94.17,834],[94.57,719],[73.05,5879],[86.86,3140],[69.35,9997],[92.92,2387],[79.1,5680],[81.67,4098],[58.21,13321],[89.17,5879],[87.81,2407],[90.81,1395],[83.62,2661],[90.53,1834],[85.38,3326],[73.64,4137],[90.36,2526],[93.5,1791],[86.09,2101],[32.13,24946],[88.53,1650],[35.24,21061],[74.8,3593],[89.95,1646],[88.53,2017],[85.01,2131],[89.66,2277],[90.15,1517],[79.08,3044],[89.79,1526],[95.04,815],[88.71,2962],[79.05,3871],[89.79,5078],[83.38,2542],[85.62,1895],[33.58,29038],[85.3,3305],[90.33,1560],[90.38,3110],[88.01,2031],[74.31,3479],[96.62,580],[81.7,3300],[94.48,955],[93.69,2347],[86.95,2233],[63.79,4958],[88.26,2953],[89.31,1722],[86.84,2933],[92.47,1834],[82.23,2304],[91.21,1434],[91,1221],[85.64,1942],[95.52,1147],[90.42,1335],[94.09,823],[96.73,470],[95.78,580],[95.93,574],[94.37,1052],[97.16,357],[96.35,519],[97.14,458],[73.16,3820],[92.93,1699],[85.76,2379],[84.13,2013],[87.86,1781],[93.66,1193],[88.92,1824],[97.56,441],[75.6,3876],[86.76,3735],[87.74,1682],[92.83,2410],[87.49,2040],[91.29,1344],[76.62,3351],[85.64,6326],[92.91,983],[87.17,2057],[87.31,2321],[88,1684],[91.29,1644],[96.03,557],[92.37,1406],[92.18,1175],[57.49,7343],[79.99,5519],[90.26,1625],[83.15,2343],[54.51,16343],[60.88,31312],[90,1865],[89.74,1340],[75.96,3750],[90.28,3364],[60.42,5606],[95.26,795],[77.18,3098],[77.04,3956],[92.96,1546],[77.09,2961],[89.3,2261],[90.33,1263],[92.67,1607],[90.84,1902],[93.82,1061],[97.36,917],[84.77,2699],[91.55,1084],[90.8,2673],[88.67,2720],[88.02,4478],[76.65,8197],[77.27,3503],[88.67,4008],[90.23,1861],[91.25,1535],[91.67,2198],[84.34,2439],[93.86,2206],[94.3,1411],[88.48,1436],[85.33,2654],[87.47,1721],[93.44,1757],[76.01,3151],[89.32,1383],[83.04,3016],[88.67,1613],[95.32,838],[89.05,3392],[87.98,1858],[95.22,871],[81.25,3077],[52.56,8158],[82.14,2289],[78.5,2869],[94.65,824],[88.59,2078],[84.33,2373],[91.68,1359],[97.24,387],[88.55,2371],[89.9,1245],[87.16,2874],[93.31,1482],[81.91,3558],[86.81,1844],[76.66,5102],[63.89,5167],[63.67,4735],[85.88,2395],[95.16,700],[86.08,2447],[83.93,2156],[82.47,3591],[72.93,3268],[94.66,4977],[89.54,1769],[92.39,1312],[94.09,1815],[91.61,1350],[84.79,2541],[75.14,3871],[80.16,2901],[80.93,2689],[66.17,4920],[66.02,15942],[83.08,3152],[87.75,1527],[93.52,2063],[89.15,1781],[82.06,2846],[94.06,1025],[77.93,8713],[95.33,770],[81.98,3048],[94.29,762],[86.97,2009],[92.91,1101],[90.66,4292],[92.36,1261],[92.52,967],[92.42,4315],[90.94,1908],[96.57,717],[95.59,651],[92.29,1622],[86.11,1868],[91.97,1440],[95.92,1389],[96.24,578],[93.7,1106],[92.84,1423],[93.36,2020],[79.75,2607],[95.23,700],[94.29,1173],[62.54,4931],[86.38,1763],[80.66,3081],[93.95,1692],[95.07,1369],[96.16,507],[84.41,3002],[70.56,4150],[91.41,1194],[90.04,3020],[95.5,855],[96.35,1210],[92.47,2999],[92.22,962],[92.93,916],[90.31,4681],[89.52,2002],[88.44,1819],[86.07,2438],[95.56,865],[83.52,2297],[74.88,4727],[89.98,1134],[77.8,2656],[90.48,1609],[90.05,1488],[95.65,814],[88.34,2200],[90.8,1362],[90.86,2615],[95.72,854],[91.35,1477],[92.55,2858],[92.89,1331],[93.95,1282],[95.94,561],[97.7,323],[95.11,743],[95.64,549],[94.66,738],[90.76,1412],[92.01,1257],[88.37,2020],[94.79,1156],[91.51,2016],[87.01,1614],[86.76,2101],[92.99,1161],[78.02,2533],[96.79,411],[73.04,3571],[95.69,1006],[89.38,1528],[80.04,2369],[90.06,1433],[92.8,886],[94.94,653],[95.96,516],[92.23,1080],[94.83,961],[89.21,1508],[89.58,2006],[93.35,1243],[88.25,2208],[94,1364],[96.37,838],[91.63,1493],[96.27,584],[90.52,1733],[96.53,1084],[94.97,1546],[96.06,720],[94.36,1103],[92.25,1723],[93.08,1119],[95.3,830],[54.15,14278],[97.28,332],[87.32,2183],[93.83,854],[97.12,467],[72.81,3809],[95.26,1003],[94.52,899],[93.73,809],[95.97,615],[81.19,2572],[92.71,1384],[93.66,1071],[93.98,1538],[75.88,3576],[79.94,2469],[81.25,2818],[69.22,4234],[85.67,2184],[88.37,1552],[94.31,996],[82.79,3218],[92.46,2072],[36.64,12686],[90.79,1239],[91.49,1385],[91.43,1494],[93.23,1799],[77.6,2676],[94.9,976],[94.14,686],[96.68,655],[90.33,3476],[85.38,2602],[92.88,1009],[97.81,348],[94.23,1093],[92.95,1074],[92.58,1932],[92.92,1306],[95.76,971],[96.75,797],[89.94,1223],[79.81,2590],[91.82,1063],[97.33,651],[77.34,2856],[93.04,3600],[92.19,1251],[83.16,2634],[91.51,2583],[85.65,2185],[90.03,1307],[82.55,3084],[88.07,1518],[96.57,1359],[96.53,607],[75.58,3125],[82.66,2213],[91.29,1118],[91.16,1550],[87.85,2965],[92.06,1922],[92.85,1138],[88.86,3885],[93.77,872],[90.76,1692],[95.42,1170],[88.21,2140],[93.11,1106],[92.67,969],[79.7,4026],[93.77,1345],[89.55,2568],[93.77,772],[95.32,699],[96.17,554],[90.88,996],[95.15,522],[91.07,1252],[92.37,1095],[96.82,699],[92.51,1525],[96.41,568],[92.38,1650],[93.45,1744],[54.23,12570],[79.98,3996],[93.62,998],[92.58,1292],[86.9,4203],[92.51,1008],[94.41,815],[90.93,2035],[97.66,462],[97.73,446],[91.52,1131],[91.81,1052],[93.83,987],[95.89,821],[92.25,3310],[80.73,3425],[94.22,860],[85.46,3222],[94.19,1299],[73.81,8864],[94.73,937],[97.92,694],[87.81,2780],[96.56,2205],[93.98,1330],[87.28,1726],[84.41,2658],[79.66,2399],[97.15,522],[91.44,1528],[86.74,1681],[92.32,1386],[89.55,1437],[74.51,4063],[84.9,2511],[95.66,1041],[94.72,916],[74.2,5766],[88.53,1721],[82.85,2629],[84.22,2174],[91.87,1182],[94.97,1043],[94.82,3951],[92.07,1215],[90.11,1130],[90.22,1621],[89.35,1506],[87.95,1718],[93.6,964],[76.56,3347],[89.97,1667],[96.4,516],[92.27,1872],[89.67,10794],[91.1,1699],[93.46,1834],[96.87,632],[69.29,10632],[76.14,3296],[88.47,1425],[91.65,1235],[48.67,7196],[92.5,943],[96.98,533],[95.25,1207],[90.44,1394],[90.62,2089],[91.51,2568],[89.6,2645],[92.2,3006],[82.33,2310],[94.81,951],[90.59,1196],[91.15,1189],[95.55,603],[91.45,2014],[95.61,1898],[87.26,4914],[96.54,446],[84.56,2479],[82.65,9316],[67.13,11779],[94.44,756],[89.52,2343],[66.85,8817],[96.46,1089],[54.84,20394],[82.17,3769],[68.88,5119],[89.21,1389],[87.32,3402],[91.23,1426],[94.47,1062],[92.82,1280],[88.06,2737],[83.01,3146],[83.57,4459],[89.71,2329],[88.1,1926],[93.25,866],[92.76,1899],[95.76,893],[81.7,8366],[94.21,2744],[91.11,1197],[95.95,637],[81.3,2456],[93.21,911],[91.8,1218],[58.83,5105],[92.93,1065],[97.64,333],[95.38,822],[96.32,512],[92.55,997],[81.65,3815],[90.99,1303],[96.46,518],[86.57,1747],[80.58,3126],[51.82,7205],[95.25,624],[87.66,1808],[90.53,1404],[95.65,752],[87.02,2389],[86.84,4524],[81.98,6257],[86.23,2295],[87.85,2353],[93.62,1580],[90.88,1524],[90.26,2396],[93.54,848],[66.68,11240],[94.75,846],[95.57,653],[96.82,482],[83.52,2320],[96.65,638],[96.03,566],[89.96,1750],[87.75,2035],[90.66,1399],[89.27,1240],[94.88,808],[74.77,4088],[69.41,4521],[78.83,3800],[88.73,1741],[96.39,444],[83.14,3139],[87.22,1438],[89.42,1576],[95.17,731],[86.62,2677],[97.02,413],[87.42,2796],[74.59,2895],[79.65,3502],[63.33,6365],[82.83,5248],[80.96,6630],[65.43,5506],[59.47,5852],[88.64,1598],[88.81,1370],[69.65,3645],[68.3,11182],[92.15,1407],[91.53,3875],[94.53,1039],[92.23,1175],[88.54,1481],[80.52,2472],[89.28,1648],[89.93,1697],[67.29,4003],[80.74,3068],[87.32,1869],[84.98,1743],[79.64,8818],[94.46,853],[88.84,1538],[96.43,732],[74.09,6478],[96.32,469],[93.13,1083],[91.03,1694],[94.04,966],[93.08,1167],[92.55,2303],[75.94,3897],[83.43,3651],[88.83,2059],[88.89,1912],[84.54,2435],[96.04,580],[95.03,1095],[92.65,1049],[85.71,2474],[86.23,2930],[88.21,3297],[73.9,3610],[91.69,1048],[85.11,5982],[88.56,2115],[92.02,1673],[90.82,1979],[88.15,3042],[95.15,569],[85.1,1913],[94.81,758],[76.5,4024],[85,3146],[87.09,2437],[92.17,1866],[86.89,1999],[85.01,3056],[85,1880],[92.51,1484],[61.91,5004],[91.01,1221],[83.55,1967],[92.04,1263],[93.86,1097],[92.8,1396],[90.12,1413],[83.93,2271],[49.04,8367],[80.98,2862],[67.2,4396],[86.07,2938],[79.12,2990],[92.58,755],[91.74,1230],[94.59,764],[90.71,1346],[84.35,2659],[97.28,398],[94.87,821],[89.62,1395],[80.49,2838],[90.23,1974],[70.84,5024],[95.98,1184],[81.15,2543],[56.25,6175],[92.37,1099],[86.95,2002],[91.41,1213],[85.01,2064],[97.48,380],[91.14,1209],[80.67,2563],[85.44,2410],[84.72,2531],[87.76,1959],[91.31,1346],[81.34,4407],[88.49,1687],[93.99,1110],[87.91,1829],[88.58,2075],[80.03,2645],[89.47,1465],[87.08,2094],[97.44,527],[86.43,2222],[95.56,1074],[89.07,2589],[80.93,2492],[76.91,2698],[66.01,4775],[91.3,1330],[86.94,3974],[75.56,3655],[80,2526],[84.8,2173],[66.23,4786],[92.74,938],[94.02,834],[92.41,1219],[4.28,25703],[86.83,1921],[93.28,1056],[84.81,1822],[83.67,2146],[91.72,1052],[83.47,2070],[63.92,4893],[76.33,4318],[75.51,3097],[72.67,5014],[88.36,1245],[85.57,1850],[88.45,1356],[87.95,1470],[51.77,7672],[70.19,3847],[81.94,2232],[84.51,2911],[52.65,12186],[75.73,3730],[66.13,6045],[80.6,2655],[62.22,5072],[88.03,1527],[92.28,1361],[87.43,2374],[91.26,1190],[60.48,4640],[73.42,3766],[91.45,1330],[89.06,1407],[47.01,7935],[67.05,4935],[12.9,17816],[9.72,39777],[49.88,14500],[20.09,26096],[68.36,12456],[88.55,1554],[93.71,876],[94.14,827],[80.5,2916],[96.39,874],[95.82,634],[55.85,5302],[91.48,1085],[78.32,4080],[88.17,1405],[71.81,5185],[83.38,1998],[87.62,1719],[69.91,4091],[75.72,3129],[81.95,2309],[90.49,1916],[51.16,6957],[82.41,2723],[68.64,3977],[86.54,1659],[82.05,2484],[94.44,835],[80.47,2347],[96.96,444],[88.57,2000],[88.16,1724],[64.76,4849],[63.2,4677],[83.97,2041],[88.81,1691],[61.98,5481],[81.74,2437],[86.86,1919],[68.21,3388],[39.29,7214],[72.26,3343],[73.16,3759],[94.58,947],[83.78,1989],[78.65,3100],[79.17,3420],[60.26,7347],[93.84,1151],[94.86,902],[83.99,2328],[86.1,2151],[95.48,744],[82.95,2009],[93.15,1006],[91.88,1153],[80.66,2181],[87.76,2646],[91.87,1024],[82.25,2287],[74.75,2969],[55.63,12681],[89.56,1395],[96.42,450],[50.02,6654],[94.02,706],[89.73,1278],[71.24,5354],[70.69,3301],[80.8,4368],[83,2686],[69.36,4340],[88.28,1947],[81.15,2661],[76.93,3291],[75.8,3234],[91.94,1769],[92.03,2563],[85.08,1983],[69.54,3651],[52.04,29706],[60.46,6710],[83.14,2172],[82.64,3859],[75.81,3175],[81.23,2329],[84.18,2803],[63.68,4865],[83.24,1952],[74.54,3250],[46.95,8409],[56.22,7263],[88.41,1491],[93.22,834],[81.19,2478],[93.27,836],[70.12,4293],[64.25,4802],[71.97,4921],[86.43,1496],[78.33,2600],[91.76,2304],[84.72,1945],[68.1,4857],[86.81,3354],[87.4,1933],[84.28,2009],[87.81,2278],[55.81,6430],[79.1,2489],[88.77,2440],[95.23,751],[96.18,466],[96.77,486],[91.82,1206],[94.62,1480],[79.55,2523],[29.17,17269],[47.28,28423],[90.09,1528],[86.39,2059],[92.04,1147],[26.29,17045],[39.48,31251],[56.85,9883],[93.48,806],[48.8,7839],[48.61,10227],[47.51,8484],[49.59,9482],[61.64,8329],[43.26,18406],[84.21,2208],[96.32,612],[52.58,8005],[93.87,1071],[79.54,3096],[91.29,1258],[90.99,1171],[96.33,1014],[54.56,16280],[78.4,2796],[69.47,6396],[34.68,13217],[44.24,9316],[79.92,3444],[95.57,804],[89.81,1356],[95.59,679],[91.17,1093],[87.47,1472],[44.12,10670],[90.65,1261],[78.86,2720],[84.73,3806],[73.08,4102],[66.24,5367],[75.84,3462],[68.99,4389],[85.08,1960],[58.74,7719],[88.77,1541],[79.99,2742],[92.66,1087],[93.56,982],[59.95,7775],[93.6,1067],[74.16,5136],[88.68,1396],[92.14,1873],[92.88,1000],[63.68,5175],[28.05,18862],[90.28,1316],[92.66,969],[53.01,9577],[75.84,5301],[87.92,1535],[81.08,4444],[72.38,5150],[67.19,5023],[54.88,7370],[87.93,1427],[75.11,3198],[82.76,2270],[79.65,3465],[85.42,2013],[90.22,1352],[94.54,864],[89.33,2717],[90.99,1211],[85.13,1830],[93.38,754],[83.8,2120],[86.75,2445],[75.38,4163],[77.51,3139],[47.77,12107],[91.55,1428],[69.68,3756],[87.96,1470],[68.77,4157],[76.03,14103],[60.34,5445],[89.98,1417],[88.28,2148],[73.87,3365],[81.03,2377],[71.45,3631],[66.13,5535],[75.28,3063],[73.64,7923],[82.71,2077],[72.3,4069],[88.31,1438],[60.4,5831],[55.82,8827],[73.82,7931],[81.44,2400],[86.79,2496],[43.5,10563],[65.3,5358],[79.03,3959],[92.91,935],[84.41,2267],[92.79,1012],[83.1,2140],[88.17,1667],[84.38,2052],[76.99,3241],[92.56,959],[88.26,1714],[97.78,469],[79.42,3072],[92.09,1143],[83.86,2204],[78.38,3789],[85.66,2187],[78.4,2507],[70.82,3968],[59.11,8701],[75.55,3370],[50.56,10304],[88.89,1621],[64.08,7343],[79.22,2654],[71.35,5600],[94.56,689],[85.46,2036],[81.94,3064],[83.4,3317],[89.35,1642],[93.73,1175],[92.67,1561],[91.24,1884],[90.11,1795],[93.17,1258],[91.21,1121],[90.87,1170],[93.32,765],[95.81,646],[86.32,1681],[93.98,847],[96.07,553],[96.36,552],[92.27,1029],[87.92,1689],[87.24,1475],[85.12,1675],[86.67,1830],[94.47,987],[97.17,516],[86.53,1840],[94.08,761],[61.68,7391],[95.13,868],[84.32,2408],[78.85,2680],[87.35,1735],[93.55,860],[69.32,4430],[84.2,2278],[89.7,1744],[60.84,4426],[70.99,5247],[79.81,2625],[87.26,1585],[92.87,865],[93.94,1121],[90.37,4341],[46.03,10356],[82.18,2737],[80.85,3158],[90.38,1165],[96.71,490],[72.43,4616],[43.43,11708],[92.7,1070],[93.46,874],[95.75,752],[93.85,806],[95.6,833],[71.5,4955],[92.01,1108],[83.67,2041],[88.09,1391],[93.22,943],[50.57,12105],[92.54,1150],[79.78,3473],[96.24,669],[94.68,936],[95.16,635],[89.1,1636],[78.67,3115],[80.31,2375],[87.58,1509],[79.07,2646],[80.97,2463],[89.05,1393],[97.37,716],[87.63,1408],[82.31,2550],[87.67,1663],[89.93,1652],[74.43,3505],[94.32,959],[79.94,3400],[91.54,1209],[95,682],[95.31,760],[91.19,1324],[79.51,2581],[84,2362],[88.87,1470],[96.48,525],[93.27,808],[91.17,1266],[94.36,1626],[89.43,1394],[86.03,4970],[75.54,5141],[89.99,1332],[70.37,7486],[95.75,604],[80.68,5276],[69.99,7176],[85.75,1788],[90.95,1049],[94.63,834],[91.43,1145],[79.33,2563],[92.77,1186],[93.19,847],[76.82,3819],[91.97,1025],[94.73,1340],[90.3,1485],[77.57,3974],[97.01,725],[78.01,3344],[79.33,3050],[80.85,2887],[90.8,1366],[89.3,1433],[91.58,1195],[86.4,3044],[90.52,1612],[92.58,1104],[87.35,1609],[82.17,2839],[83.08,2144],[87.45,4109],[91.27,1669],[71.12,8247],[84.27,2342],[93.34,1217],[81.74,2425],[93.47,991],[97.25,567],[55,7977],[93.8,1025],[75.68,3730],[86.35,2190],[68.12,4032],[94.43,949],[97.37,2011],[93.1,1238],[92.9,1945],[87.2,2465],[86.23,2997],[90.02,2535],[91.96,2583],[87.42,1693],[94.19,1140],[86.08,2094],[92.76,2302],[91.8,1290],[93.72,952],[93.85,920],[94.05,1482],[69.69,5374],[81.82,3191],[90.31,1692],[85.59,2750],[84.27,2886],[90.1,1588],[76.6,5884],[91.62,1700],[87.05,2985],[93.43,1205],[89.73,1617],[77.38,3139],[89.68,2066],[73.43,4399],[89.63,3577],[91.01,1637],[90.62,1683],[87.5,2383],[91.43,1667],[87.35,2813],[89.86,1949],[85.63,1941],[90.53,2529],[84.01,2702],[86.31,2341],[92.8,2100],[93.52,944],[92.11,1290],[90.69,1818],[95.65,660],[90.03,2025],[92.18,1165],[86.77,2732],[91.66,1783],[87.21,6825],[88.3,8410],[89.68,6158],[91.11,1895],[94.14,1221],[87.05,2972],[85.66,2469],[92.39,1200],[86.84,3471],[88.43,2794],[81.57,4380],[80.45,4596],[64.51,7864],[89.88,1953],[88.56,2069],[92.08,1151],[93.32,1188],[89.4,1937],[43.53,14357],[91.63,1338],[72.49,4436],[91.8,1477],[73.9,11052],[81.01,8335],[95.36,1224],[79.89,5771],[88.05,2465],[94.13,1405],[92.48,1768],[92.32,1765],[86.97,2061],[56.89,6143],[87.35,2048],[91.74,1558],[93.08,1080],[92.73,1656],[85.07,2765],[61.46,13412],[91.21,1373],[90.28,2255],[90.27,3677],[85.6,4198],[92.15,1829],[88.48,3258],[88.3,2480],[80.37,15750],[88.73,2718],[95.16,734],[91.57,1852],[93.64,1145],[93.09,1507],[92.28,1573],[90.09,2224],[87.73,1934],[85.02,2730],[92.34,1250],[95,1117],[94.83,1921],[90.31,2018],[92.3,1098],[78.78,3391],[83.37,2767],[93.23,1149],[91.65,1652],[89.6,1603],[83.62,12845],[93.16,1395],[94.38,1304],[89.96,4003],[92.6,1291],[92.45,1510],[89.67,3809],[49.25,17495],[83.61,3307],[80.96,11904],[93.04,1622],[91.76,1361],[94.05,1108],[93.6,1232],[93.56,1726],[94.38,1071],[89.42,3294],[78.05,16212],[94.99,1188],[87.6,2211],[86.6,3888],[92.44,1365],[95.5,972],[91.95,2046],[90.35,1426],[86.79,2384],[87.8,2948],[90.18,4404],[88.92,2213],[89.86,2241],[91.04,1707],[94.21,1289],[94.45,827],[89.32,1594],[89.33,1959],[94.93,1148],[91.44,2538],[93.63,995],[92.83,1033],[70.95,4681],[93.03,1730],[96.22,696],[84.11,4207],[93.37,1331],[90.02,5008],[68.38,5484],[92.84,1149],[90.87,1491],[91.45,2583],[95.11,838],[93.74,1584],[92.65,1336],[86.85,3072],[92.96,1351],[93.97,869],[93.14,1466],[93.73,934],[94.89,1067],[92.94,1263],[84.27,2319],[91.19,1741],[91.87,1425],[91.38,2473],[85.61,4519],[65.65,7341],[86.77,3306],[88.52,1822],[89.04,2267],[88.07,2281],[93.52,2622],[90.99,1777],[89.13,3090],[90.44,3698],[91.17,1576],[94.12,1210],[94.11,894],[90,2664],[89.07,1582],[88.77,1717],[93.94,923],[83.38,4294],[69.74,4272],[85.63,2635],[90.53,2489],[82.02,2454],[91,2134],[83.28,4198],[51.15,9612],[63.12,6952],[94.5,1024],[89.16,1620],[90.25,2504],[76.91,6876],[85.06,2616],[95.74,789],[91.98,1260],[95.81,1136],[91.57,2362],[90.11,3454],[91.12,2590],[94.95,784],[94.16,919],[88.81,2565],[88.38,1892],[94.55,948],[90.91,1813],[89,1861],[92.58,1878],[96.14,624],[95.13,1126],[83.6,2399],[90.95,3882],[89.51,2492],[92.29,1625],[93.75,928],[92.48,1169],[92.88,1711],[95.98,1007],[94.7,860],[92.5,1322],[87.56,2962],[89.29,2124],[93.02,1252],[91.32,3611],[89.15,3401],[86.46,5200],[93.24,1297],[80.53,3967],[73.74,12536],[46.12,27312],[95.15,1349],[95.7,754],[84.86,10915],[91.95,1472],[90.76,1765],[89.43,1521],[93.93,2541],[92.13,2877],[76.87,7747],[93.57,943],[93.64,2022],[84.91,13030],[92.1,1389],[92.5,1176],[87.88,2195],[95.51,800],[91.03,2223],[86.61,2222],[93.37,1064],[95.11,1390],[94.13,900],[89.53,2209],[94.97,1081],[94.42,955],[90.01,2214],[90.37,2241],[85.62,3049],[88.39,1831],[92.72,1359],[93.97,1110],[88.33,3779],[90.63,2625],[94.35,1405],[94.61,859],[94.42,1252],[94.02,832],[92.8,1292],[96.29,605],[92.95,1054],[91.92,2121],[91.68,1604],[92.83,1321],[92.14,1612],[92.69,1327],[91.03,1790],[95.27,732],[93.91,1159],[72.85,4103],[71.69,5983],[91.71,2091],[94.65,1872],[88.71,2038],[95.58,766],[93.38,1667],[94.23,2037],[96.4,963],[91.64,1568],[96.88,641],[92.38,856],[97.17,475],[95.39,716],[89.17,2377],[64.23,4227],[90.24,1480],[84.68,3776],[76.09,13363],[86.83,2141],[91.62,1358],[95.42,609],[96.22,573],[88.78,1692],[95.33,644],[61.06,9073],[95.34,630],[51.28,5498],[86.36,1933],[87.75,1589],[96.42,408],[96.01,757],[93.63,859],[92.78,1137],[94.15,700],[92.45,1413],[96.15,1732],[97.02,512],[97.55,284],[88.2,3334],[94.66,1257],[97.32,339],[93.23,975],[95.52,494],[95.92,605],[91.05,1499],[95.62,817],[90.04,1245],[96.46,439],[92.35,937],[95.01,1103],[95.57,681],[95.22,611],[94.69,1201],[96.56,642],[94.5,737],[96.18,509],[96.94,478],[95.85,535],[97.72,332],[96.52,449],[95.55,582],[97.03,400],[78.98,2463],[97.8,284],[83.49,2123],[89.83,1570],[93.95,1088],[92.75,1294],[94.89,595],[90.01,1337],[58.52,9512],[94.74,993],[95.95,647],[74.36,9189],[97.29,379],[97.58,379],[96.55,498],[96.86,555],[96.31,630],[95.86,550],[93.42,878],[97.26,387],[92.33,1028],[85.5,1891],[89.51,1813],[83.81,1949],[92.14,1432],[91.26,1432],[93.41,1093],[93.23,782],[58,9732],[97.7,362],[95.26,626],[96.19,517],[91.34,1201],[93.94,763],[90.79,981],[86.32,1833],[86.47,1932],[85.53,1889],[91.91,2919],[72.87,3628],[87.62,1577],[70.57,4044],[85.65,2564],[45.42,12818],[70.23,3835],[82.9,2086],[68.4,8660],[94.36,685],[89.43,1324],[97.14,519],[94.16,911],[96.58,512],[94.14,873],[96.83,498],[95.39,577],[89.44,1571],[96.2,562],[94.52,820],[96.4,1096],[94.95,813],[94.17,786],[71.27,3703],[41.56,11110],[49.64,11511],[93.98,954],[93.58,1005],[94.09,1024],[91.1,1522],[88.94,1751],[96.97,487],[87.5,2522],[91.27,1267],[93.86,1049],[68.89,6056],[95.19,780],[85.03,2266],[90.56,1300],[60.45,9432],[94.98,616],[91.34,1272],[94.32,1361],[72.73,5472],[69.41,6942],[87.42,1640],[89.08,2716],[96.37,578],[96.46,983],[80.86,2574],[92.7,755],[90.62,1247],[96.94,514],[75.31,3416],[81.52,2594],[85.16,2445],[82.68,2257],[96.1,954],[80.92,2947],[93.98,875],[92.15,952],[96.14,539],[94.31,1057],[82.33,2251],[89.22,1479],[88.15,1661],[84.8,2351],[88.16,1679],[94.18,964],[79.52,5001],[91.51,1371],[87.66,1865],[93.76,917],[92.02,1089],[96.22,1029],[95.81,712],[88.01,1461],[93.62,778],[96.97,455],[87.74,1967],[82.77,2009],[93.16,865],[56.39,6382],[54.1,6355],[79.47,4077],[62.37,11152],[81.25,2670],[90.31,1566],[97.51,380],[48.85,17570],[78.78,3279],[95.26,836],[92.69,824],[95.06,780],[78.47,3825],[97.66,388],[94.47,1658],[85.21,2277],[87.25,1784],[55.53,10989],[69.64,4519],[96.75,559],[98.13,328],[91.49,1662],[95.46,585],[96.78,635],[92.52,1010],[78.76,4126],[96.87,518],[73.78,3771],[35.97,11358],[96.2,582],[88.36,1378],[94.55,648],[96.98,533],[71.09,3808],[98.13,234],[78.43,3525],[98.59,272],[96.53,458],[90.57,1415],[74.56,2642],[94.39,602],[89.22,1422],[93.29,1139],[91.94,1292],[97.51,559],[77.22,3168],[92.04,1064],[90.72,1212],[96.13,1035],[75.17,3094],[89.36,1337],[97.38,315],[78.34,2797],[71.96,4769],[95.2,637],[55.68,5753],[81.54,2667],[83.37,1782],[85.24,1841],[86.03,1545],[60.56,6632],[68.55,3677],[92.83,1177],[95.75,557],[84.28,2041],[94.77,778],[90.14,1118],[90.68,1308],[63.02,5410],[75.18,4085],[92.38,914],[90.01,1284],[93.45,863],[92.69,1774],[96.03,500],[81.96,2088],[97.06,424],[75.99,4217],[92.73,873],[74.85,3220],[89.87,1507],[84.47,1773],[79.89,2621],[89.42,1287],[87.74,1538],[90.4,1062],[83.24,2733],[90.58,2148],[94.65,1258],[86.68,1698],[94.82,1516],[77.16,2605],[96.55,636],[95.19,651],[95.49,610],[96.91,604],[89.2,1410],[83.61,2016],[69.98,6166],[89.16,1326],[79.88,2556],[84.79,1810],[82.59,2086],[84.13,1827],[62.98,4798],[47.93,8476],[88.3,1362],[90.89,1142],[92.94,942],[77.18,3536],[75.63,3856],[81.75,2766],[93.69,738],[87.68,1734],[87.92,1549],[91.02,1092],[83.34,1817],[93.42,742],[75.3,3086],[94.76,778],[89.36,1279],[93.57,895],[71.26,4701],[80.01,2189],[95.62,559],[86.08,1848],[95.82,546],[93.91,668],[95.46,561],[93.03,2013],[95.43,521],[95.44,570],[95.22,566],[93.51,880],[87.69,1433],[89.73,1110],[88.19,1319],[94.95,642],[91.92,1061],[71.5,3896],[94.92,665],[82.11,2295],[93.9,829],[92.21,869],[90.31,1222],[90.06,1231],[95.19,550],[95.5,555],[95.05,672],[94.66,655],[95.82,451],[84.83,2205],[93.46,979],[96.09,523],[94.7,1017],[94.66,709],[95.2,623],[77.91,7947],[77.46,5045],[93.67,1057],[86.4,2350],[92.82,1390],[90.68,1915],[53.17,7704],[54.12,7734],[35.46,12251],[71.29,3201],[74.49,3896],[93.05,1155],[82.3,2583],[72.57,3257],[79.55,3770],[37.1,17232],[72.11,3600],[79.71,4330],[92.26,1272],[96.06,630],[90.52,1149],[93.88,1179],[87.4,3864],[95.74,717],[92.65,1079],[95.84,591],[95.29,624],[95.83,585],[93.43,929],[95.01,706],[97.32,431],[91.14,1574],[93.41,888],[86.62,2493],[81.59,2186],[78.03,2645],[91.79,1089],[93.32,770],[94.59,666],[91.98,1029],[82.85,3191],[69.92,6728],[88.94,1541],[89.6,1468],[93.55,719],[96.36,562],[85.46,1857],[81.6,2386],[64.35,9653],[94.86,1440],[90.43,3569],[88.74,2520],[87.83,2292],[95.24,1777],[97.42,505],[96.03,1048],[95.33,1422],[97.24,520],[96.42,867],[82.58,3801],[92.83,2117],[85.1,2556],[87.59,2270],[85.13,2920],[96.62,1244],[90.68,2412],[86.49,3180],[95.29,1260],[98.68,536],[96.53,654],[94.45,1409],[94.81,945],[87.8,2261],[89.5,1734],[90.9,1288],[83.69,3369],[76.08,4445],[94.52,1326],[95.77,1416],[96.63,656],[96.59,693],[97.32,601],[97.69,541],[92.91,1415],[97.97,859],[92.33,1294],[93.63,1248],[93.7,1071],[95.51,11424],[95.84,800],[97.71,465],[94.76,1425],[93.95,1038],[93.1,1348],[96.22,674],[95.51,715],[93.78,1378],[84.93,3104],[90.72,1571],[93.2,1368],[93.02,1934],[91.28,1362],[92.75,1075],[93.46,1138],[90.2,2795],[88.27,8565],[94.83,935],[91.85,2256],[89.69,1617],[75.49,3329],[92.13,1428],[92.72,1084],[90.43,1540],[93.69,1078],[90.38,1649],[95.02,943],[94.34,1029],[85.55,2119],[88.68,1576],[91.31,1209],[88.75,2235],[94.05,872],[93.58,877],[92.04,1517],[87.47,2090],[84.99,2512],[85.49,2526],[74.7,5300],[86.11,3062],[90.53,1492],[95.8,781],[96.91,593],[92.27,1401],[95.21,946],[90.48,1997],[96.08,671],[86.37,1981],[89.68,2132],[85.05,2709],[89.14,1817],[88.28,1889],[91.58,1467],[67.43,6686],[88.55,1929],[92.33,1346],[92.38,1208],[90.35,1846],[95.45,643],[88.52,2353],[90.95,1414],[79.02,4463],[91.81,1582],[89.97,1778],[85.13,3752],[84.11,4021],[87.14,2766],[85.04,2437],[84.74,2711],[87.24,2860],[92.03,2248],[94.23,896],[84.68,2920],[92.74,1326],[86.43,2811],[77.4,4328],[95.75,649],[88.36,2397],[96.79,847],[79.57,3153],[75.56,5010],[96.32,796],[94.39,3700],[79.15,3401],[87.51,2868],[92.17,1569],[91.62,1283],[55.72,6892],[98.14,894],[90.36,1898],[92.52,1583],[95.85,1763],[97.09,786],[88.09,2209],[97.11,549],[91.69,6280],[93.75,1275],[89.45,2397],[91.95,1555],[92.66,2414],[95.38,2170],[92.27,1556],[96.79,837],[98.11,701],[95.51,734],[97.71,723],[97.57,712],[97.04,584],[92.28,1385],[95.01,3358],[97.19,732],[96.4,617],[95.08,1140],[97.62,831],[93.73,940],[96.22,971],[89.69,39232],[94.71,4796],[92.68,16193],[94.7,1260],[75.64,3378],[92.16,1518],[94.7,981],[92.35,1642],[94.18,1382],[95.86,760],[91.43,2127],[93.87,1475],[96.69,680],[94.01,2159],[93.79,1542],[92.63,1603],[93.69,1838],[91.87,1742],[84.97,3301],[90.15,1906],[92.5,1822],[95.1,1054],[93.43,1495],[93.67,10061],[95.29,1603],[76.04,6603],[90.39,2339],[94.48,1348],[97.72,8168],[97.47,1009],[96.27,1307],[85.67,3680],[90.36,2115],[96.61,1665],[95.35,1139],[97.49,1043],[97.98,1144],[96.67,826],[93.88,1357],[93.76,2647],[93.9,957],[94.41,1698],[96.18,1073],[91.81,2410],[94.94,936],[95.99,753],[89.66,2161],[95.24,928],[89.52,1943],[93.08,1617],[76.3,5563],[97.18,894],[97.93,1181],[86.91,6237],[95.66,1033],[88.84,2096],[97.84,616],[95.6,1108],[95.7,894],[95.63,1357],[89.17,1715],[95.39,1083],[96.36,3275],[82.74,3287],[96.06,1509],[97.01,762],[97.8,796],[91.85,1376],[67.88,8315],[94.32,1120],[86.86,3877],[96.49,1205],[92.85,1805],[95.77,956],[91.72,3679],[92.37,1755],[97.1,475],[96.67,929],[97.28,893],[95.67,737],[97.48,408],[95.99,774],[93.02,1250],[87.87,3210],[96.19,796],[95.34,1266],[96.25,723],[95.51,937],[94.89,967],[96.11,3125],[98.24,734],[95.99,802],[88.17,2938],[96.43,606],[94.98,1045],[91.05,1948],[76.13,4331],[91.09,1705],[96.3,607],[95.71,1108],[96.39,1282],[91.75,5626],[78.8,5168],[89.75,2872],[91.2,1278],[97.03,810],[95.56,1004],[88.41,2539],[91.34,1712],[86.47,4296],[92.79,1921],[93.22,1517],[96.71,1098],[92.07,2228],[96.04,808],[87.65,2377],[94.89,1928],[82.02,2777],[86.94,2107],[96.96,792],[95.07,1010],[89.88,1903],[73.03,6038],[89.53,1749],[91.83,2440],[68.19,8917],[87.19,2807],[82.81,4956],[80.74,5652],[85.36,3790],[89.3,4965],[91.27,1322],[89.43,3837],[97.59,608],[92.77,1705],[93.91,4925],[85.12,4774],[92.67,1835],[94.83,6551],[98.63,474],[97.53,745],[95.77,6065],[97.7,548],[97.52,873],[91.94,1369],[93.49,2102],[93.9,1192],[87.06,4012],[96.49,1048],[83.09,5163],[97.16,1693],[80.83,4830],[96.51,1221],[89.75,4158],[83.94,2961],[93.04,1612],[85.98,3070],[78.77,6702],[95.24,716],[95.63,706],[97.71,776],[96.9,739],[96.53,927],[97.46,988],[97.04,934],[84.64,11825],[95.66,975],[86.73,9790],[94.87,1222],[87.07,3482],[86.08,4725],[87.3,2961],[95.37,1330],[96.83,1022],[97.15,895],[84.92,8823],[97.91,1031],[93.54,1673],[79.03,7388],[95.16,1137],[96.33,1105],[93.94,2143],[9.61,14274],[94.62,1597],[95.51,1020],[85.76,1945],[76.09,2951],[15.22,17273],[13.31,30322],[74.42,3828],[79.89,2708],[83.54,2393],[83.64,2009],[91.18,1137],[92.56,1819],[94.13,1379],[88.59,2374],[92.32,1473],[85.34,2999],[91.6,2672],[80.68,2667],[87.09,3855],[78.74,8347],[89.24,1954],[84.05,5041],[91.14,2197],[88.83,2440],[89.89,2634],[89.15,2983],[91.64,1618],[92.71,1095],[93.2,1060],[89.69,2372],[80.16,9713],[89.78,2709],[84.24,5577],[86.39,5019],[79.71,9724],[90.49,1378],[89.53,2340],[86.85,4417],[87.93,2952],[89.78,2759],[86.81,3465],[91.42,1756],[80.81,5101],[90.14,2093],[87.42,3465],[82.63,3698],[89.88,2914],[67.06,17107],[72.01,5512],[76.71,8816],[72.46,9423],[76.43,11944],[85.01,5451],[74.46,13159],[71.02,13553],[80.34,9667],[91.14,2311],[75.37,14003],[91.87,1830],[81.71,7477],[72.34,5407],[86.64,3436],[77.39,9075],[89.96,3346],[76.35,8628],[89.93,2913],[80.65,7306],[72.54,10738],[88.96,2991],[82.49,3525],[82.34,8770],[71.73,12281],[86.74,2960],[88.04,4175],[78.64,4291],[88.6,3450],[79.71,9935],[77.61,5525],[77.17,5287],[82.23,4598],[89.38,2217],[83.44,5272],[78.07,11274],[81.63,5461],[81.97,8898],[90.06,1461],[92.97,987],[91.74,1869],[77.97,7986],[78.61,2580],[93.36,898],[87,3050],[84.03,4292],[87.21,1730],[92.17,1045],[89.63,1598],[93.61,1058],[78.77,6897],[90.94,2152],[85.54,5110],[93.29,1032],[88.1,1732],[89.83,1496],[92.12,1677],[90.29,1429],[92.49,3211],[92.06,1361],[92.45,1100],[88.57,1483],[85.68,2707],[92.39,1155],[91.19,1785],[87.64,2169],[87.69,1781],[89.98,1331],[90.43,1732],[77.53,3178],[89.66,1682],[81.49,4248],[87.6,1735],[93.98,954],[91.02,1688],[89,2492],[74.25,4690],[73.63,6813],[92.55,1135],[85.42,2585],[79.63,4922],[88.75,1598],[87.95,2081],[92.67,2484],[93.05,997],[88.61,1541],[84.07,2690],[90.32,2826],[89.28,1593],[79.55,2903],[91.29,1980],[94.64,771],[82.44,3293],[76.38,6229],[92.28,1847],[82.98,2342],[93.79,1053],[52.28,10147],[90.32,1667],[93.66,821],[90.27,2031],[92.96,1329],[92.47,1105],[92.62,1242],[90.28,1991],[84.18,3921],[93.35,952],[93.3,1257],[94.16,911],[89.38,1443],[85.36,2749],[92.91,1077],[91.44,1168],[94.77,649],[91.16,1348],[94.37,834],[89.06,3986],[93.3,1156],[94.19,761],[93.44,1203],[85.58,2189],[89.92,1562],[87.84,1846],[84.95,2590],[83.25,2238],[88.48,1706],[89.53,1367],[91.95,1110],[88.18,2541],[79.91,2712],[86.49,1822],[89.5,1731],[89.68,3995],[87.31,1785],[77.94,4530],[81.84,2684],[87.86,1700],[82.91,5917],[88.69,1610],[87.53,1743],[84.88,2201],[83.57,2514],[89.3,1571],[86.9,2044],[86.12,2031],[72.81,5159],[87.48,2421],[88.58,1485],[87.72,1638],[83.04,2787],[75.25,4014],[81.31,2888],[88.02,1793],[91.23,1178],[75.92,3572],[88.09,1846],[90.74,1479],[86.01,2628],[80.03,3232],[90.04,3253],[85.36,2189],[92.64,1062],[86.12,2024],[93.63,990],[86.66,2048],[88.6,2614],[90.33,1427],[81.59,4711],[89.43,2208],[89.26,1888],[91.72,1409],[89.12,2467],[93.88,888],[90.86,2010],[87.72,2974],[88.54,2827],[94.96,1023],[90.88,1633],[91.99,1251],[79.65,2409],[93.08,971],[94.02,867],[91.9,1500],[92.32,1184],[94.59,639],[91.14,1441],[93.5,902],[94.29,1015],[84.44,2013],[79.2,3731],[74.16,4435],[85.04,3670],[87.53,2258],[91.61,1201],[58.41,5495],[90.14,1727],[79.56,3105],[93.01,1127],[92.88,996],[87.88,1838],[78.4,3973],[64.55,5393],[89.05,11602],[78.99,4019],[79.94,10311],[90.37,5619],[88.96,4293],[83.02,6912],[89.69,2442],[90.84,1458],[90.84,1414],[92.98,1114],[92.37,1219],[92.89,1037],[91.14,1400],[88.57,2422],[77.79,4360],[89.4,3585],[91.11,1851],[87.93,2814],[89.15,1721],[91.38,1928],[90.23,4602],[89.37,2524],[89.35,3023],[81.2,3304],[82.19,3314],[91.04,1310],[89.71,1704],[88.56,2050],[81.3,3156],[84.62,3353],[95.17,1058],[88.52,1673],[88.43,2785],[82.08,3266],[91.6,1222],[90.26,1579],[87.91,4472],[90.27,1715],[96.07,473],[87.25,2178],[71.28,8790],[84.97,2830],[77.93,2971],[89.4,2090],[88.96,1676],[87.48,2099],[79.3,3483],[93.91,964],[93.47,1361],[92.2,1532],[73.76,3521],[84.67,5142],[84.96,5167],[63.81,17114],[92.82,1590],[83.68,6312],[88.8,2256],[72.4,15092],[70.5,4622],[91.95,1363],[93.18,895],[85.3,3472],[84.42,1875],[82.02,2393],[82.21,5437],[78.88,4298],[88.38,1881],[91.46,1554],[86.19,2294],[92.6,2083],[86.44,2337],[92.03,1175],[83.6,2295],[82.21,2585],[90.71,2616],[85.55,7552],[89.03,1825],[92.57,2333],[93.08,1073],[88.66,1584],[89.78,1395],[83.73,2548],[89.4,4730],[91.79,1436],[91.45,1066],[93,1311],[92.99,1626],[92.09,3370],[95.35,708],[87.47,4771],[91.44,1790],[89.58,2903],[90.01,2295],[66.76,21029],[86.91,2912],[88.35,3737],[77.07,8240],[77.93,7070],[72.91,18334],[81.59,7668],[83.32,5058],[77.83,9889],[85.82,3719],[82.54,4884],[88.15,3205],[83.49,7302],[60.75,13696],[69.57,4735],[90.12,1866],[93.21,1343],[64.53,17819],[81.13,4173],[88.81,3263],[69.12,10735],[83.63,7044],[87.56,3057],[46.36,10359],[88.22,1905],[91.21,1163],[54.25,8666],[92.13,1223],[90.6,1266],[93.92,819],[93.49,956],[90.97,1467],[94.3,780],[90.24,1497],[90.84,1298],[93.36,847],[91.43,1192],[90.51,1336],[76,4799],[93.63,860],[93.88,830],[93.1,1046],[79.04,2771],[92.19,1104],[92.95,1685],[84.48,3837],[86.78,2347],[89.48,4580],[86.35,2536],[91.83,1227],[80.72,2674],[84.78,11837],[92.18,1106],[82.68,2561],[88.77,1346],[91.9,1156],[86.35,3005],[81.16,2373],[91.94,1251],[75.13,8323],[86.85,1793],[93.75,1774],[90.14,1520],[90.92,1286],[91.17,1292],[81.33,2530],[85.51,2483],[92.44,1132],[92.41,1408],[88.29,1897],[80.66,2932],[91.79,1065],[90.71,1473],[82.35,2842],[82.26,2227],[75.49,3657],[83.12,2087],[88.67,2202],[85.51,2206],[76.09,4344],[84.06,2421],[84.53,2652],[66.92,4591],[83.51,2929],[73.3,4114],[88.69,1837],[95.17,749],[89.88,2359],[93.36,1108],[90.66,1204],[91.56,1412],[88.45,2360],[83.39,2816],[90.25,2400],[77.67,4432],[91.47,1047],[87.38,1928],[79.23,3277],[88.94,1341],[90.33,2069],[66.27,8940],[88.6,1560],[92.38,1098],[88.85,3646],[89.91,2365],[74.5,4235],[91.7,1744],[90.32,2914],[83.87,3652],[87.21,2375],[91.44,1640],[92.9,1462],[94.15,841],[88.88,2442],[93.83,963],[72.49,6857],[48.73,13826],[79.67,2573],[83.7,3107],[90.73,1562],[85.39,2703],[84.41,4994],[86.91,3375],[84.03,2551],[89.56,1822],[92.78,971],[95.19,674],[79.49,2683],[88.24,1783],[93.84,950],[88.91,1961],[91.37,1439],[80.64,3114],[71.3,4037],[84.03,2895],[91.36,3572],[91.43,1568],[87.36,2458],[85.52,2256],[87.4,2738],[93.36,1491],[89.13,1752],[91.31,2545],[94,1308],[89.72,2961],[93.15,1187],[91.76,1143],[82.72,2704],[85.5,2741],[84.03,2353],[84.5,3294],[81.22,2678],[83.99,2464],[84.82,2238],[89.59,1800],[87,1715],[86.11,1834],[88.81,1412],[88.67,4112],[73.94,11089],[91.14,2206],[96.36,490],[89.07,2653],[86.15,4802],[92.7,928],[93.2,759],[90.86,1582],[85.24,3173],[69.43,6336],[90.28,1190],[91.84,1022],[90.32,1544],[92.57,1849],[86.36,4674],[69.47,13607],[92.48,1633],[96.75,784],[91.89,2638],[96.14,1066],[73.81,9078],[95.87,738],[95.23,501],[93.38,1964],[94.47,858],[96.23,455],[96.24,567],[82.48,2182],[95.63,513],[92.88,868],[93.21,1092],[94.05,700],[97.77,277],[86.28,5643],[89.86,2828],[84.58,9396],[96.96,330],[97.7,366],[95.1,1052],[87.27,4897],[95.32,1012],[91.12,1345],[98.12,308],[96.84,715],[94.93,1656],[86.86,2331],[88.59,3606],[94.84,798],[72.03,10238],[88.29,4770],[96.44,749],[76.14,9185],[94.5,1235],[92.68,1103],[89.01,2003],[92.6,1558],[98.37,220],[70.28,11158],[89.07,6502],[87.05,1945],[96.24,857],[94.81,811],[93.01,1430],[89.89,1771],[88.59,2603],[87.27,2448],[85.32,3047],[95.3,1817],[85.73,5997],[87.42,11510],[91.27,2532],[95.66,1003],[88.8,3370],[84.44,2217],[96.45,1566],[94.28,988],[92.1,1880],[92.72,1566],[93.41,1976],[94.3,1013],[89.91,1924],[96.75,382],[67.72,49804],[93.67,1769],[96.39,543],[97.7,379],[96.85,443],[94.05,1185],[98.5,270],[90.97,1472],[96.92,526],[93.91,803],[95.05,795],[93.05,958],[94.77,529],[94.54,1313],[93.28,1198],[90.98,1613],[85.21,2320],[88.39,1722],[94.01,998],[86.76,1689],[97.08,398],[93.29,1326],[96.12,569],[97.81,421],[97.31,332],[91.3,1802],[92.18,2272],[91.35,1713],[88.74,2180],[94.57,3046],[94.92,1317],[91.85,1097],[87.85,2795],[66.97,7624],[94.69,847],[95.36,778],[86.8,1894],[86.2,3542],[94.67,807],[77.29,7827],[92.6,846],[93.37,2086],[97.41,401],[92.78,1076],[96.39,555],[95.11,919],[96.13,640],[92.55,1821],[95.38,723],[94.66,978],[94.59,890],[94.65,713],[97.89,1779],[84.56,2596],[96.3,619],[88.4,2207],[91.05,1393],[90.9,1458],[94.3,841],[96,967],[93.51,953],[81.62,2606],[94.74,872],[92.66,939],[96.74,353],[92.52,965],[90.6,1231],[86.31,3577],[87.62,1544],[95.26,588],[89.82,1359],[91.98,1257],[92.59,859],[82.93,4124],[91.14,3011],[87.16,1662],[94.98,819],[90.19,1971],[96.57,514],[97.24,394],[92.51,1008],[94.71,798],[94.84,784],[95.96,496],[96.31,838],[75.47,4063],[56.78,24217],[44.88,10381],[91,1679],[82.89,1899],[96.75,1789],[69.27,7000],[98.19,459],[96.31,718],[87.86,4701],[94.83,1046],[96.38,874],[68.56,3997],[96.26,3314],[89.97,4765],[71.12,12077],[93.06,1856],[90.91,1487],[62.67,4516],[93.01,1581],[70.53,8395],[87.59,3925],[94.26,741],[97.1,345],[83.79,4790],[88.64,2329],[60.86,4647],[96.04,528],[62.77,6936],[94.17,1157],[95.28,732],[97.14,440],[97.31,577],[96.92,517],[94.01,951],[94.76,856],[94.49,924],[95.95,747],[92.88,1244],[84.73,2491],[94.82,2944],[92.64,1302],[93.33,7697],[93.36,1499],[92.1,1884],[95.46,1965],[94.25,3034],[97.46,898],[96.04,1914],[96.43,1165],[95.86,1138],[87.13,8594],[95.46,1157],[95.23,2942],[85.86,6672],[93.6,1308],[94.13,789],[89.11,1341],[93.54,3837],[94.49,951],[93.71,908],[67.93,4250],[81.95,3580],[65.4,17840],[83.67,2309],[85.72,1985],[95.26,859],[89.72,1456],[25.06,16364],[82,2244],[88.47,1637],[82.23,2418],[96.27,695],[96.04,1158],[89.85,1374],[83.15,2180],[94.48,825],[88.61,3281],[94.92,1583],[80.02,4364],[89.54,1944],[89.96,2163],[85.01,2687],[90.27,2277],[63.3,5984],[91.94,1502],[94.54,1792],[85.37,4753],[83.74,3021],[78.37,4441],[93.39,1055],[95.24,1498],[93.59,1225],[91.16,3109],[72.05,10924],[92.77,1328],[85.94,8003],[81.91,4160],[86.08,2097],[84.95,7463],[92.34,1097],[79.82,4520],[84.86,2822],[86.97,2803],[84.74,3410],[84.77,2970],[79.84,3308],[86.74,2613],[61.32,6507],[86.68,2065],[97.19,1514],[93.29,1510],[94.48,1019],[94.22,913],[94.44,1041],[89.94,2076],[92.19,1166],[82.56,3005],[88.67,2031],[86.39,2633],[91.06,1029],[71.78,3511],[92.74,1017],[77.11,3161],[61.15,10295],[80.46,3085],[87.78,1499],[97.11,395],[86.43,4108],[89.89,1933],[94.63,788],[91.06,1999],[93.7,1158],[91.68,7100],[97.35,299],[97.85,268],[95.78,552],[91.99,1091],[96.12,535],[94.4,716],[96.82,369],[96.07,607],[96.11,480],[97.29,313],[93.66,988],[81.76,2808],[81.12,3474],[92.08,1441],[93.1,980],[89.71,1387],[93.35,861],[94.22,2882],[91.78,1595],[94,1097],[90.83,2905],[93.27,1730],[94.28,1170],[94.34,1266],[79.05,2914],[95.4,858],[78.79,2447],[95.98,796],[94.9,1083],[82.39,2494],[94.21,625],[90.91,1024],[50.09,9417],[93.33,793],[82.6,3016],[86.75,2098],[87.44,1506],[77.16,6365],[77.06,5007],[94.6,2226],[85.72,4467],[84.89,3570],[93.49,2998],[93.06,4079],[80.91,4286],[97.4,769],[82.26,6358],[89.44,5946],[92.88,1683],[94.47,1382],[91.59,1977],[96.46,474],[95.36,827],[98.12,250],[95.69,487],[94.99,635],[95.5,662],[95.31,812],[91.35,1085],[68.88,14237],[94.58,1320],[85.16,3170],[92.09,1538],[88.23,1346],[90.72,1239],[93.79,999],[92.13,1016],[97.12,878],[94,1203],[84.81,2298],[82.76,3696],[88.97,1386],[97.04,614],[92.35,1681],[83,2430],[59.06,8850],[83.42,1994],[89.68,1681],[89.02,1525],[84.41,2236],[80.54,3644],[91.83,1189],[87.18,2092],[94.65,865],[85.56,3852],[96.62,761],[65.36,23656],[84.85,3595],[94.29,982],[96.43,484],[85.92,2927],[79.58,2861],[90.48,2896],[96.74,474],[90.4,1441],[86.39,2951],[94.41,1230],[91.89,1161],[83.76,3077],[92.64,1017],[97.32,669],[93.43,1346],[86.02,1724],[96.65,461],[97.98,431],[92.32,1503],[94.01,860],[93.97,729],[89.47,1286],[88.86,3945],[82.95,1939],[88.74,1919],[86.76,1670],[82.92,2112],[94.14,778],[93.39,2330],[73.71,22417],[82.29,2917],[96.48,430],[93.67,1087],[71.45,4596],[92.62,1681],[96.32,1380],[85.57,4025],[92.27,931],[95.46,891],[90.38,1664],[87.12,2413],[83.82,3836],[97.37,375],[92.04,1135],[92.53,1274],[92.87,1169],[86.73,2470],[88.96,1280],[72.6,9169],[77.99,3013],[93.71,1182],[97.48,475],[91.43,1509],[87.19,3399],[75.38,3791],[89.57,1736],[91.19,1224],[83.97,2807],[96.81,589],[94.49,688],[93.62,1244],[87.45,1966],[89.96,1261],[90.73,1038],[89.33,1249],[85.67,1850],[81.87,2145],[84.95,2040],[82.27,2387],[76.22,3398],[89.9,1637],[20.64,19758],[90.18,4779],[89.63,1495],[94.31,835],[75.96,3118],[85.57,2830],[63.85,30800],[72.52,19458],[88.49,1562],[89.87,1632],[85.25,4269],[97.42,822],[95.48,620],[81.87,1848],[86.89,2924],[92.65,1340],[65.31,5205],[87.45,1758],[92.49,1351],[97.33,354],[96.61,635],[97.11,454],[94.29,1182],[92.26,1281],[88.96,3028],[85.72,1830],[97.68,623],[90.48,1391],[89.64,1873],[46.8,8254],[74.97,3727],[73.77,11976],[75.01,3195],[92.84,918],[91.43,1220],[85.63,1873],[97.05,511],[93.39,1268],[91.64,1604],[80.65,9943],[88.47,1593],[87.23,1566],[95.48,588],[97.2,390],[97.26,620],[85.03,2387],[62.56,12683],[86.08,1649],[91.25,1490],[94.05,1063],[89.34,1446],[80.87,2517],[90.84,1207],[95.42,1417],[97.34,799],[78.97,3816],[84.07,5846],[96.41,5081],[95.67,1236],[96.74,865],[95.36,1632],[93.45,5616],[95.12,6493],[92.8,2630],[97.06,988],[97.22,773],[95.58,1963],[94.57,1864],[85.25,4327],[96.08,3834],[94.7,722],[88.39,1661],[84.59,2212],[79.74,3615],[93.07,1319],[86.76,2872],[91.64,1771],[87.85,1335],[94.39,686],[89.35,1867],[91.78,1053],[93.92,1018],[81.31,3805],[92.53,1043],[83.85,2254],[96.56,509],[93.52,1020],[80.35,44310],[93.04,991],[77.61,2506],[85.03,2461],[97.39,357],[84.67,3821],[97.52,391],[82.26,2275],[61.69,6483],[92.24,1242],[97.3,335],[91.89,2161],[85.44,2041],[88.05,1735],[92.74,3725],[87.47,1622],[96.34,565],[96.41,498],[86.05,1723],[94.89,930],[90.38,1377],[87.54,1663],[95.1,683],[95.86,661],[92.2,1229],[79.37,2775],[93.85,994],[96.38,410],[93.33,914],[97.21,339],[93.99,721],[95.58,697],[93.81,726],[90.88,1284],[84.84,3829],[93.83,841],[92.86,719],[96.76,399],[91.81,1156],[90.34,1214],[92.66,1269],[87.32,1595],[96.08,815],[93.34,1086],[87.55,2007],[86.16,1856],[91.19,3629],[97.3,1484],[80.86,2409],[90.78,1561],[88.1,2117],[90.79,983],[95.29,652],[85.4,2059],[92.5,1541],[92.5,916],[83.11,1774],[74.88,9833],[90.62,4154],[96.89,1094],[92.08,4280],[87.97,1487],[96.9,386],[86.28,2471],[97.29,393],[97.57,665],[95.89,1145],[92.89,782],[95.15,631],[96.12,447],[92.41,963],[88.51,1324],[84.78,2492],[87.89,1560],[95.65,660],[93.04,715],[90.33,1133],[90.4,1120],[89.45,1486],[89.6,1365],[96.64,552],[88.29,2320],[85.66,2580],[92.87,1132],[93.98,1057],[92.98,1010],[94,939],[90.72,1584],[95.52,588],[89.62,1715],[78.27,2667],[93.76,5140],[84.12,2303],[92.37,1094],[90.14,2156],[96.52,848],[93.31,942],[75.73,4402],[84.37,2501],[86.61,2328],[91.22,1521],[91.67,1450],[95.03,755],[91.05,1467],[83.91,2549],[92.21,1268],[89.01,1454],[87.94,1710],[80.85,7650],[86.16,2401],[43.4,9574],[92.13,1493],[86.8,3210],[90.42,1311],[90.66,1398],[82.13,2255],[73,3772],[97.3,479],[95,673],[96.92,407],[95.28,739],[96.02,508],[93.93,849],[94.19,1009],[94.18,802],[93.13,1016],[97.41,362],[92.46,1201],[94.72,757],[96.72,1047],[88.25,2350],[85.16,2455],[90.62,1209],[82.62,3369],[85.46,1867],[86.74,1811],[85.25,2370],[94.51,796],[90.21,1428],[86.95,1626],[68.5,4007],[67.51,4440],[78.67,2909],[90.93,1523],[82.71,2076],[90.14,1755],[86.3,1502],[91.36,1247],[91.39,1579],[73.88,4815],[88.66,1664],[93.75,1348],[91.3,1699],[89.74,1737],[87.01,2393],[59,6560],[87.76,3273],[92.98,1391],[94.02,916],[94.97,942],[93.1,1071],[94.46,845],[86.56,1847],[93.53,1243],[88.78,1866],[91.86,2504],[87.53,2427],[85.1,2307],[84.97,1878],[92.85,839],[87.94,1935],[90.14,2690],[86.72,1860],[81.41,2181],[94.5,751],[86.23,3053],[81.37,4175],[91.94,1324],[85.49,2721],[96.36,1143],[96.62,2632],[97.09,1306],[96.39,961],[98.21,740],[95.03,858],[90.53,1324],[81.24,4199],[88.15,1645],[90.28,1740],[91.87,1260],[70.23,4597],[95.22,761],[86.38,1789],[80.3,3160],[92.42,1104],[70.57,4319],[93.09,1373],[85.6,2196],[88.04,1701],[81.63,2272],[91.35,1055],[91.01,1073],[94.25,716],[94.68,720],[87,1668],[95.68,982],[94.37,687],[94.36,2087],[74.4,3821],[90.78,1306],[94.2,609],[93.38,1204],[91.93,2197],[97.68,857],[97.45,724],[55.82,8717],[92.73,2088],[94.47,1176],[93.24,1500],[80.15,3283],[91.05,1476],[86.88,1996],[93.56,1184],[91.57,1714],[93.56,1087],[49.5,8947],[90.03,2674],[90.55,2235],[95.02,791],[86.81,2490],[76.92,4354],[93.35,1116],[87.91,1672],[94.75,1011],[93.84,854],[89.86,2366],[80.37,3077],[88.12,1656],[74.02,4228],[76.48,4333],[90.31,1427],[91.43,2299],[95.92,562],[77.62,3261],[91.34,1056],[97.34,363],[91.27,1213],[97,468],[93.92,874],[88.43,1614],[93.88,2662],[79.2,3401],[90.24,1430],[78.32,4824],[89.74,1384],[76.84,3619],[92.74,1305],[94.97,745],[92.55,1312],[80.58,2985],[69.34,4825],[61.56,12099],[83.36,2948],[91.83,949],[96.28,494],[89.36,1342],[97.13,350],[82.82,2229],[82.27,4443],[91.51,1065],[59.8,6108],[85.86,1773],[76.17,3484],[87.48,1654],[75.96,3526],[91.64,1705],[91.03,4108],[88.52,2446],[89.33,2588],[90.14,3532],[83.55,2205],[92.25,1217],[88.86,2610],[90.97,1900],[93.8,1104],[87.68,1799],[89.96,1993],[68.2,4219],[81.85,2413],[92.05,2116],[93.34,979],[95.18,701],[94.37,898],[93.37,1456],[78.62,3092],[92.52,1017],[87.48,1696],[88.19,1866],[91.07,2455],[80.74,2778],[92.78,1472],[92.07,1074],[95.64,589],[87.31,1948],[88.86,2228],[89.17,2805],[57.06,6246],[82.92,2368],[68.41,4915],[91.26,1684],[83.96,2185],[94.22,838],[88.68,2011],[88.11,2528],[93.57,979],[93.29,1795],[91.7,1225],[87.49,1870],[93.63,1171],[85.9,4843],[69.2,4458],[84.86,2231],[80.63,2825],[87.83,1353],[94.59,880],[84.66,2393],[74.43,3645],[92.01,1273],[72.91,4659],[94.56,952],[92.41,1181],[82.05,2697],[91.32,1316],[93.79,907],[81.06,2948],[93.37,917],[91.43,2242],[89.98,2862],[88.52,1362],[88.8,2641],[91.56,1231],[91.29,1649],[91.17,1158],[72.65,3308],[84.29,1894],[94.22,853],[95.07,756],[84.86,1878],[83.95,1836],[89.54,2116],[95.69,595],[92.7,1791],[94.61,938],[89.15,1935],[82.94,3779],[91.42,1253],[88.26,1577],[80.78,3305],[89.08,1608],[68.47,4121],[80.38,3063],[94.58,1238],[81.84,2268],[79.23,2926],[87.14,1604],[86.88,1717],[84.74,2358],[75.46,3014],[92.85,1052],[87.78,2453],[78.27,2609],[77.67,3137],[87.33,1650],[94.97,1019],[86.79,1555],[94.35,907],[91.11,1366],[88.78,2153],[72.35,3537],[92.77,1437],[83.91,2647],[82.36,2392],[71.63,3847],[54.6,6379],[95.07,908],[89.29,1642],[86.51,2144],[81.08,3490],[93.64,1182],[87.46,1493],[94.34,1097],[83.07,2269],[92.83,1178],[94.41,889],[90.77,1604],[83.71,1801],[86.72,1844],[93.54,854],[76.38,3092],[81.91,2566],[97.18,638],[79.09,3870],[90.88,1652],[92.16,1181],[93.9,1090],[94.8,667],[95.85,1440],[70.42,4042],[68.29,14624],[92.52,953],[90.05,1743],[84.12,2493],[92.71,1770],[85.38,2372],[92.82,10872],[89.2,2177],[73.47,4241],[92.74,1342],[93.4,2215],[91.71,1480],[87.17,1660],[91.75,1248],[92.22,1485],[80.63,2606],[90.66,3910],[87.61,1562],[85.71,1911],[79.41,3149],[90.38,1700],[95.45,910],[80.08,3221],[92.7,1184],[89.93,1364],[92.69,1343],[94.73,782],[89.8,1540],[71.64,3171],[88.03,2761],[87.83,1460],[86.34,1556],[96.12,679],[72.52,4138],[94.89,733],[87.28,2469],[94.78,838],[89.46,2000],[94.02,1026],[94.16,979],[91.01,1107],[84.18,1992],[82.79,2554],[89.39,3141],[76.26,3752],[76.16,5329],[91.28,1146],[82.38,2431],[95.34,698],[80.55,3195],[80,2623],[89.12,2144],[93.17,956],[74.37,3027],[91.85,1299],[64.76,6823],[91.9,1463],[80.45,2513],[78.93,2384],[96.03,694],[93.96,2503],[91.03,1010],[95.2,707],[94.3,976],[89.16,1399],[91.77,997],[72.26,3393],[91.73,1720],[80.69,4143],[94.92,1015],[95.09,759],[96.41,585],[95.72,605],[93.24,2179],[96.23,502],[62.22,7287],[75.84,2868],[95.94,790],[74.1,4596],[85.16,1910],[93.77,803],[61.81,12494],[92.37,2575],[94.19,861],[95.01,958],[90,3231],[94.13,935],[88.65,1923],[85.4,2028],[92.09,1969],[89.25,2035],[96.57,508],[69.67,4331],[55.95,5421],[90.86,1466],[92.46,1660],[92.59,1091],[91.73,1082],[93.54,874],[62.24,4606],[61.37,6263],[86.92,2032],[95.84,868],[72.59,3812],[87.64,1641],[85.93,2602],[94.89,1030],[93.99,1555],[95.97,830],[93.34,815],[79.12,2926],[94.12,1272],[90.13,1536],[93.08,1074],[86.46,2296],[73.96,2861],[95.64,1021],[91.82,1104],[81.56,3298],[95.04,1347],[96.6,497],[89.78,3394],[94.67,1022],[75.13,3238],[87.94,1819],[88.26,2229],[87.09,2639],[89.32,1742],[85.79,2339],[61.57,22081],[56.25,6023],[88.98,1550],[93.21,983],[80.15,3217],[89.63,3114],[91.48,1546],[53.62,6209],[90.14,1604],[87.1,2461],[91.86,1408],[75.96,4353],[91.04,1442],[86.43,2707],[80.4,6764],[84.83,3171],[93.11,1043],[87.89,2028],[92.45,1543],[86.48,3132],[83.88,2823],[89.5,2010],[90.41,5918],[77.59,4042],[89.94,1908],[89.74,2712],[90.8,1454],[70.28,7537],[91.65,2111],[86.18,6834],[88.91,2167],[46.6,10684],[60.2,7372],[93.24,1332],[96.54,602],[89.18,2068],[87.27,2437],[84.51,2427],[92.96,1347],[91.96,1156],[92.89,1092],[94.52,810],[83.27,3563],[84.53,2341],[92.07,1049],[68.24,6251],[92.65,1296],[65.43,9915],[89.38,1493],[89.67,1703],[94.4,934],[84.56,2340],[94.04,973],[95.32,1028],[84.9,2676],[92.37,1561],[89.49,1651],[92.63,3714],[91.69,1448],[92.31,1016],[91.53,1305],[82.22,3449],[90.13,1470],[85.58,1761],[45.75,7210],[64.82,4920],[70.53,4311],[78.48,3169],[80,4021],[88.86,3043],[86.37,2029],[90.94,1418],[71.22,4094],[87.7,2367],[87.08,2571],[89.31,1312],[85.61,2466],[91.63,2812],[73.98,3443],[76.56,3920],[90.57,1431],[67.45,4294],[84.03,2599],[56.91,6149],[85.38,2495],[94.15,1065],[83.88,4045],[87.77,1780],[93.9,933],[91,1308],[85.54,2422],[92.55,1162],[68.46,4148],[91.5,1730],[84.45,3714],[89.74,2221],[93.83,1001],[88.73,1613],[92.6,1217],[86.54,2424],[92.17,1878],[89.14,1488],[86.17,2532],[95.76,614],[91.31,1186],[88.7,1991],[94.28,827],[77.9,3520],[90.59,6506],[92.26,1089],[57.29,8660],[88.17,1776],[90.78,1283],[82.42,2274],[69.41,3971],[86.91,3355],[65.71,4587],[88.19,1744],[78.7,2640],[91.23,1275],[96.23,481],[78.25,2712],[92.85,1086],[84.08,3253],[65.15,4644],[75.57,5509],[84.88,1971],[94.8,1246],[86.28,1922],[82.62,2185],[96.47,618],[88.22,1983],[88.91,1541],[81.33,2401],[85.28,2225],[94.08,1209],[47,7525],[88.26,2027],[74.68,3479],[96.2,544],[86.58,1868],[92.02,1527],[61.79,4555],[77.63,4413],[55.24,6826],[94.66,742],[89.55,1826],[95.32,732],[88.29,2383],[72.67,5732],[87.88,2006],[86.77,1936],[94.16,870],[90.48,1415],[93.19,995],[87.34,2052],[85.92,4359],[94.16,1362],[79.48,3084],[82.34,3020],[88.75,2147],[93.27,1154],[89.96,1283],[95.76,803],[95.21,652],[89.16,1957],[88.2,1308],[77.72,4281],[93.04,1105],[79.62,2617],[94.16,789],[63.55,5851],[85.11,2059],[85.22,2043],[95.01,802],[62.56,4936],[91.41,1646],[84.86,4011],[77.83,2872],[86.42,1775],[81.21,3561],[92.13,1584],[93.64,1321],[86.62,1414],[73.97,3854],[84.9,2083],[87.44,2702],[89.64,1839],[66.16,4714],[63.38,5236],[60.87,5490],[56.91,6247],[79.51,2967],[84.13,2429],[79.15,2912],[81.49,2832],[84.25,3337],[85.61,2193],[71.23,5227],[69.27,4453],[85.23,2042],[86.71,1802],[89.38,1809],[87.02,4138],[86.64,3011],[91.97,1901],[77.71,5504],[81.74,4853],[93.86,1275],[60.09,9175],[73.22,5347],[72.07,6527],[87.57,2210],[92.08,1112],[79.2,5351],[92.09,14339],[94.64,631],[88.09,2277],[92.04,1551],[77.54,2715],[91.83,1395],[89.17,1573],[93.61,1241],[96.16,503],[85.97,1918],[64.93,4422],[86.84,2110],[93.53,899],[78.26,4950],[59.62,12410],[84.91,3430],[81.44,3595],[60.65,5389],[75.6,3983],[81.6,4253],[81.89,3212],[83.63,4381],[96.68,811],[84.18,2371],[89,1738],[76.23,3396],[87.08,1904],[93.64,696],[91.69,1631],[94.68,870],[91.37,1124],[71.78,6484],[93.34,2600],[73.59,4261],[80.82,3906],[77.3,2882],[71.84,4261],[89.81,1893],[77.4,3474],[90.23,2341],[92.51,948],[82.57,2478],[76.37,3668],[81.88,2809],[90.71,1120],[93.1,1510],[85.57,2189],[85.4,2088],[75.25,8687],[94.5,702],[72.25,3586],[87.6,2222],[91.47,1742],[90.83,1941],[86.64,1815],[62.18,5494],[86.08,1983],[92,1187],[88.2,2727],[94.66,908],[88.63,1798],[79.64,2734],[91.29,1671],[83.74,2202],[90.3,1490],[82.61,11059],[91.91,1215],[94.97,1791],[94.77,891],[86.63,1958],[88.92,2948],[81.17,2875],[84.44,2531],[92.08,1421],[91.82,1153],[81.78,2954],[86.71,1760],[88.81,1632],[76.66,4108],[88.13,3323],[54.72,6368],[86.68,1651],[89.89,1848],[91.97,1177],[82.86,2588],[70.55,4076],[88.89,1539],[95.29,875],[95.13,639],[78.54,3120],[92.68,1288],[91.18,1166],[91.88,1001],[81.53,3003],[81.13,3307],[83.95,1835],[90.2,1202],[93.58,868],[80.98,2247],[59.78,5395],[64.34,4762],[90.15,1543],[85.13,3939],[94.31,1130],[88.12,2937],[92.04,1400],[87.28,2766],[88.14,1883],[90.33,1253],[88.89,1488],[89.35,1534],[86.61,2838],[88.35,1882],[89.56,1647],[88.34,1403],[90.98,1668],[96.33,593],[67.65,3900],[82.98,2713],[95.23,782],[94.15,947],[95.25,917],[91.16,1976],[93.49,1491],[87.99,1517],[82.85,2495],[90.27,1388],[92.75,1301],[95.01,798],[85.75,2199],[92.5,1024],[82.87,2340],[96.36,748],[84.26,2234],[94.51,688],[87.51,1841],[92.65,1414],[80.53,2830],[84.88,2373],[94.55,789],[86.63,1726],[81.72,2325],[92.82,1136],[94.6,939],[83.11,3214],[90.21,4445],[90.21,1475],[87.94,1997],[82.83,2532],[91.67,2322],[78.52,5903],[86.65,1876],[92.43,1071],[90.25,1505],[90.23,1328],[87.45,1702],[90.87,1193],[89.96,1553],[78.65,2717],[96.37,1396],[75.75,3632],[91.24,3353],[85.97,2722],[89.48,1918],[96.3,553],[77.85,2707],[85.74,1953],[72.4,4011],[92.85,1381],[96.21,545],[86.4,2807],[90.9,1244],[76.72,3200],[78.63,3057],[92.01,1209],[96.56,844],[92.23,1091],[92.32,1165],[75.06,3620],[82.71,3180],[89.4,1616],[91.63,1622],[86.19,4267],[88.28,1909],[79.65,3377],[94.1,1081],[72.52,5663],[93.02,5952],[83.35,2700],[84,2489],[85.27,2230],[83.7,2485],[79.39,3309],[93.63,835],[82.45,3131],[91.98,2042],[85.75,2836],[78.5,4179],[73.62,4064],[79.5,4847],[86.29,2228],[82.26,3960],[91.01,2987],[86.4,3034],[78.06,2967],[94.12,1089],[80.23,3433],[93.28,941],[86.15,2179],[94.1,789],[84.75,2371],[94.88,971],[92.19,1134],[96.24,656],[82.69,2242],[94.12,2043],[92.89,1290],[90,3564],[86.95,2125],[81.77,3444],[94.9,1579],[78.14,3285],[87.76,2309],[67.74,3987],[90.44,1323],[84.59,2973],[81.85,3819],[94.38,843],[87.43,6345],[90.32,3388],[48.99,23969],[83.9,2836],[89.41,1472],[84.34,2159],[93.01,1183],[81.54,3344],[84.17,2522],[60.87,5719],[89.78,1466],[60.6,6671],[91.69,1404],[80.49,3257],[88.53,1639],[92.79,6376],[90.77,1119],[94.8,3008],[92.84,1381],[89.86,1199],[95.36,765],[92.51,1264],[69.47,4486],[82.85,2280],[95.12,760],[92.1,1358],[80.27,2772],[66.29,4953],[93.79,1238],[91.85,1245],[54.88,7634],[78.96,2654],[89.66,2117],[91.84,1575],[38.82,11257],[95.75,485],[86.38,2204],[95.67,934],[82.77,2089],[84.69,2664],[92.96,1438],[90.88,1814],[89.4,2461],[83.52,2376],[87.03,4469],[82.04,2224],[55.78,5900],[94,1042],[71.77,4918],[92.29,1720],[94.6,708],[90.99,1604],[94.61,874],[89.6,1681],[90.51,2268],[81.71,2305],[91.15,1048],[90.69,1472],[76.35,5130],[70.02,3984],[90.04,2002],[81.95,4241],[86.49,2031],[86.31,1596],[88.49,1667],[82.33,2068],[78.72,2734],[93.03,916],[90.13,1321],[89.81,1599],[86.96,2547],[69.87,3965],[73.27,3674],[90.83,1677],[92.65,1578],[72.48,4059],[92.86,1206],[90.79,1434],[95.1,930],[90.21,1376],[71.33,5094],[87.3,2011],[93.87,870],[91.27,1506],[89.37,1989],[83.72,2494],[84.81,2065],[77.36,3881],[86.13,1759],[50.17,8146],[90.09,2258],[82.2,3170],[67.52,7150],[83.8,2244],[91.79,1175],[89.31,1495],[78.77,2992],[90.56,1672],[74.2,4375],[68.52,7529],[92.94,908],[70.22,4080],[93.39,982],[86.04,1829],[73.1,3345],[95.43,717],[90.8,1189],[87.98,4319],[78.98,4280],[86.63,2901],[84.25,1982],[89.31,1960],[88.58,3658],[85.82,1965],[95.35,638],[65.92,6426],[86.38,1783],[71.23,5160],[84.08,2073],[91.46,1283],[91.15,1200],[86.61,1941],[89.76,1733],[80.43,3043],[85.46,3638],[90.39,1508],[93.37,1388],[85.65,2839],[64.64,6592],[91.3,1797],[89.74,2123],[80.3,2582],[82.97,2736],[75.46,3906],[94.41,3207],[91.69,1042],[88.18,1347],[87.69,2292],[87,2667],[81.29,3173],[84.29,2990],[93.08,944],[89.64,1341],[86.12,2381],[90.53,1790],[90.66,1706],[93.36,1468],[96.59,862],[97.48,420],[91.53,1456],[94.1,723],[93.02,1494],[91.05,1829],[95.95,621],[76.52,3925],[92.49,1501],[91.9,1256],[91.36,1784],[87.47,1381],[92.35,1635],[87.88,2069],[91.47,1416],[84.79,2050],[88.06,2880],[89.19,1396],[34.27,16454],[87.62,1668],[94.27,876],[86.77,1657],[77.49,4938],[83.56,2393],[87.81,2681],[86.51,2027],[68.86,7226],[95.15,698],[92.12,1987],[93.76,892],[89.35,1341],[87.7,2805],[91.25,1550],[93.15,971],[81.84,3284],[88.6,2307],[86.43,1717],[74.05,4800],[87.24,1537],[78.36,3525],[93.71,1613],[90.54,1607],[83.2,3353],[93.66,1320],[73.88,3839],[87.89,2296],[84.25,6435],[89.11,2131],[77.33,4416],[90.05,4938],[87.98,1842],[93.1,1195],[74.55,3754],[83.85,4010],[83.41,2393],[76.83,3385],[79.02,2675],[82.82,10092],[87.89,2685],[91.14,1690],[87.9,2697],[65.25,4690],[39.63,10421],[96.53,628],[74.91,3032],[87.22,2331],[83.15,2062],[85.8,1703],[64.11,6265],[90.77,1753],[83.09,2241],[82.69,2233],[91.41,1120],[92.9,1524],[63.21,6832],[83.78,3532],[82.24,4939],[90.8,2166],[92.3,1397],[90.94,1741],[61.59,5939],[94.22,1161],[82.49,2256],[81.49,2683],[60.86,9321],[93.42,1953],[95.43,872],[89.38,1687],[79.66,3260],[90.48,2717],[91.17,1329],[91.57,1524],[90.74,1907],[48.71,12147],[82.96,2366],[93.01,1697],[87.97,1541],[88.71,1382],[81.53,2362],[93.56,1179],[81.15,2666],[92.22,919],[90.34,1153],[97.17,525],[90.49,1594],[92.07,2675],[66.68,4913],[75.34,5049],[76.62,3791],[84.67,2558],[91.42,1557],[65.07,5498],[87.23,2315],[92.26,2514],[82.64,2313],[84.57,2144],[89.59,2023],[89.29,1775],[82.39,2339],[75.93,3591],[86.69,1776],[90.09,1521],[79.94,2981],[91.49,2026],[95.89,1020],[87.49,1579],[82.73,2171],[93.26,1556],[93.72,1148],[62.63,6276],[94.18,1645],[84.12,1915],[91.16,2271],[90.21,1816],[91.83,1059],[92.17,1428],[88.8,1599],[87.5,1649],[85.21,1993],[94.38,1019],[76.57,3739],[67.85,4652],[86.61,1745],[89.63,1361],[89.53,1177],[89.31,1581],[70.16,5011],[90.31,1662],[96.44,496],[78.62,6308],[92.43,1004],[70.2,5912],[95.95,455],[69.02,4305],[88.92,2154],[86.8,3267],[83.58,1998],[88.96,2482],[77.84,3808],[89.09,1341],[72.92,7713],[82.06,3628],[87.11,1809],[92.23,1906],[89.77,1169],[93.36,1340],[77.92,2917],[91.4,1241],[93.84,1956],[90.74,1727],[93.53,998],[40.38,27628],[85.99,2522],[84.64,1718],[93.13,1260],[90.45,1316],[87.42,2295],[88.09,1410],[90.95,2120],[93.82,1023],[92.67,919],[86.36,2043],[92.56,1064],[82.34,2814],[85.74,1751],[88.74,1482],[85.12,1983],[87.66,1816],[82.9,4865],[68.88,3719],[88.67,2002],[88.91,1742],[94.13,1165],[94.38,796],[90.74,1266],[64.89,6160],[92.7,1042],[82.62,4188],[35.26,12472],[75.18,4041],[87.95,1684],[83.86,1975],[80.61,6000],[70.23,13671],[66.8,3604],[83.87,1985],[75.03,3925],[90.78,2239],[88.38,2627],[19.65,18438],[84.37,2069],[71.56,3620],[79.26,3815],[75.56,3551],[90.33,1702],[92.26,1049],[42.74,11878],[92.34,1336],[86.25,2412],[86.98,1533],[73.19,4619],[72.07,3346],[85.08,1944],[93.62,1201],[78.68,3148],[95.31,814],[91.67,1257],[92.27,1098],[80.38,2702],[92.16,1131],[87.37,1844],[87.97,1685],[84.15,2652],[89.19,2616],[85.61,2905],[88.84,1776],[87.64,2329],[90.91,1138],[89.04,3356],[94.97,652],[87.04,1604],[90.63,1487],[91.12,1749],[84.93,3956],[87.14,2593],[79.98,2522],[88.01,2205],[91.65,1367],[92.83,901],[85.03,2929],[87.39,2466],[81.08,2332],[83.88,3183],[73.3,8284],[49.72,10426],[74.29,4062],[93.06,976],[95.19,572],[80.37,4511],[90.43,1995],[81.43,3021],[89.91,1550],[78.92,3983],[92.41,1029],[89.56,1383],[94.9,767],[94.04,858],[91.64,1151],[63.25,5115],[88.86,1733],[90.04,2222],[91.12,3105],[86.63,2701],[86.09,4039],[40.81,9794],[94.13,1079],[77.87,4207],[72.48,5718],[94.71,748],[94.72,672],[89.32,1879],[75.14,4491],[71.55,6579],[93.15,1578],[85.82,2707],[89.34,1479],[94.27,704],[91.59,1241],[92.12,1443],[90.46,1714],[75.35,4024],[95.15,857],[88.62,3400],[95.9,620],[77.15,3594],[93.39,962],[86.78,2617],[92.19,1044],[92.83,992],[92.47,1296],[81.81,2398],[91.69,1495],[79.47,4371],[95.45,549],[88.37,1902],[93.93,1429],[92.84,1098],[90.28,1433],[91.78,1413],[89.75,1745],[87.03,1713],[86.39,1877],[88.79,1588],[74.57,14525],[76.62,5732],[80.96,2867],[60.17,8893],[87.38,3364],[48.27,8526],[86.65,2719],[69.04,9546],[77.19,5347],[86.64,2138],[54.28,11498],[81.11,2719],[86.9,7739],[88.51,4363],[90.13,2142],[80.81,4489],[76.16,3243],[92.54,1059],[61.68,8416],[73.87,4878],[84.16,2914],[67.33,10342],[82.89,5820],[93.02,1572],[87.56,2871],[90.51,1368],[92.41,1457],[79.35,9212],[83.82,2365],[87.82,2023],[84.98,2637],[92.8,1508],[91.82,1229],[90.4,1940],[81.81,6136],[94.59,744],[87.69,5431],[94.12,1086],[84.69,6221],[84.03,2754],[84.1,3311],[93.28,1949],[83.91,2411],[88.56,1401],[89.95,1691],[78.87,7474],[67.18,8718],[81.85,3816],[87.73,2799],[83.06,3131],[86.42,2022],[90.44,2747],[77.91,3171],[82.5,6179],[89.4,2390],[86.95,1930],[92.04,1295],[88.49,2449],[89.52,1452],[92.42,1075],[95.28,638],[89.38,1334],[88.47,2183],[85.15,7047],[89.58,1814],[79.46,3263],[88.57,1751],[83.79,2414],[73.92,3829],[77.53,2912],[93.26,1475],[86.28,1667],[93.29,834],[81.87,2995],[87.86,1868],[87.25,1736],[91.46,1178],[90.96,1849],[80.27,2980],[85.19,2070],[86.01,1488],[84.77,2000],[74.19,4921],[83.21,3241],[88.79,2403],[69.5,5987],[74.17,3687],[62.21,6519],[76.92,5325],[92.15,1201],[86.04,2395],[97.87,410],[87.36,1888],[63.12,7149],[88.2,2000],[88.19,3034],[92.88,1933],[85.6,2048],[81.93,2396],[89.94,1307],[83.95,2098],[91.26,2132],[71.46,4671],[70.61,4009],[67.46,5182],[43.43,30099],[85.64,2197],[82.39,2298],[80.56,3524],[70.12,9021],[81.53,3575],[80.92,6798],[89.89,1593],[93.77,1122],[79.88,4710],[85.67,1945],[89.74,1474],[75.62,3484],[93.34,936],[85.28,5348],[86.51,1752],[93.59,831],[95.66,1091],[95.24,673],[92.13,1937],[95.79,626],[93.2,1027],[83.03,2844],[93.22,1198],[95.54,1042],[94.47,939],[72.16,4105],[91.44,1225],[85.19,2306],[81.12,2432],[89.38,1636],[78.24,2875],[91.31,1554],[91.96,1971],[76.76,5305],[94.18,1616],[93.35,2003],[85.77,1765],[60.62,5529],[82.43,2537],[93.08,1540],[87.61,1442],[91.52,1810],[89.12,2465],[74.57,3241],[76.43,3399],[94.12,732],[90.62,1594],[85.8,1695],[80.02,3404],[91.06,1608],[93.12,865],[91.04,1064],[83.45,2480],[91.89,1383],[92.34,1678],[70.19,7563],[77.1,3795],[94.99,786],[96.01,756],[94.41,937],[89.46,1368],[87.62,2412],[91.92,1462],[77.49,3478],[85.37,1808],[90.45,1692],[82.85,2182],[94.46,1179],[87.63,2787],[93.63,921],[89.12,1443],[89.28,1628],[79.63,2250],[70.52,4108],[97.87,355],[92.59,1432],[78.51,2762],[89.46,2777],[89.59,1713],[90.32,2114],[91.46,1354],[91.62,1389],[83.38,2528],[81.77,4023],[90.25,1203],[86.24,2672],[82.9,4251],[84.85,1906],[95.61,1151],[82.46,2377],[15.87,17944],[95.99,1973],[63.23,5198],[89.21,1504],[93.23,1539],[86.4,2049],[96.48,683],[93.08,1067],[90.27,1746],[96.96,461],[95.39,724],[83.46,2508],[94.83,1000],[92.47,1161],[75.59,5991],[80.93,2557],[86.79,1984],[72.01,4740],[85.32,2451],[81.4,2573],[81.5,3661],[74.67,4670],[82.25,3087],[82.14,3394],[71.13,4412],[74.16,4341],[76.9,3696],[85.48,1947],[81.45,2873],[83.9,2431],[82.59,2468],[60.89,6407],[83.49,2655],[84.23,2575],[82.89,2931],[90.68,1570],[80.96,2676],[78.6,8173],[80.95,3062],[81.65,3617],[84.01,2472],[87.48,1610],[87.33,1813],[76.22,4029],[82.79,2412],[88.33,1685],[81.96,3311],[84.95,1984],[82.45,2327],[82.96,2318],[77.85,3775],[82.16,3355],[82.92,2543],[80.62,2956],[88.73,1463],[85.27,2334],[84.41,2379],[79.27,4892],[81.48,2666],[80.15,3038],[80.1,3283],[86.4,2612],[87.02,2227],[69.27,10435],[88.78,2474],[88.45,1978],[89.81,3085],[81.02,3301],[92.56,2017],[90.18,2101],[75.39,3700],[89,3114],[92.81,1349],[85.18,2268],[95.3,767],[84.09,2298],[90.97,1395],[78,3306],[91.71,1308],[82.4,3048],[84.79,2179],[92.28,1357],[89.16,2832],[85.36,5307],[70.12,5239],[89.18,2178],[75.16,4595],[88.44,2783],[83.16,2858],[93.16,1575],[87.04,1742],[86.9,2215],[84.26,2996],[86.17,2722],[87.61,3114],[88.51,3039],[93.61,1080],[89.38,1578],[89.1,1858],[86.47,2653],[92.6,1180],[88.22,2011],[81.27,2804],[77.62,3569],[78.98,3429],[95.42,967],[88.01,1863],[92.96,1147],[86.29,2149],[91.97,1574],[90.1,3115],[83.55,4022],[77.85,5320],[85.8,2905],[81.38,3176],[66.95,6130],[91.24,1314],[60.89,7829],[87.77,2378],[81.62,4675],[86.91,2591],[89.96,1781],[85.76,2229],[90.08,2528],[85.25,2733],[85.55,5025],[84.3,3352],[78.99,3809],[86.4,5725],[92.38,1597],[79.23,3569],[89.66,1909],[74.03,6123],[90.74,1491],[92.09,1276],[82.24,2755],[91.92,1977],[72.41,5032],[76.96,3110],[89.19,1971],[85.36,2322],[92.51,1183],[90.03,2489],[82.7,3415],[85.4,4190],[44.44,11703],[88.52,1600],[88.93,1703],[91.51,2073],[91.28,1575],[92.94,1092],[83.41,2554],[87.76,2953],[89.52,1891],[88.42,2896],[89.89,1739],[76.79,7559],[86.66,2395],[84.96,2453],[82.33,3698],[86.21,2249],[78.28,12445],[86.63,2868],[92.7,1455],[93.35,1466],[93.25,1108],[95.13,969],[94.02,2505],[90.2,1779],[93.22,1057],[92.57,1083],[87.92,3089],[86.5,2527],[92.11,1163],[89.17,2707],[74.64,6471],[82.07,3903],[91.41,1418],[81.55,3385],[89.1,2363],[94.12,857],[75.5,3491],[84.68,1832],[84.28,1937],[84.72,2588],[79.13,2656],[82.16,2254],[81.25,2784],[87.57,1928],[84.4,1964],[90.62,1307],[84.94,1855],[88.43,1646],[81.73,2668],[96.72,1239],[93.89,1060],[89.64,1824],[96.24,822],[94.39,1085],[94,1249],[94.85,1206],[92.84,1510],[89.24,4296],[93.62,1160],[94.11,986],[84.43,4755],[82.41,2770],[94.74,845],[93.27,1410],[85.27,3045],[61.09,8175],[76.04,3955],[57.29,5271],[82.54,3550],[51.5,8287],[63.72,7894],[85.07,1938],[75.86,4630],[85.76,1625],[85.75,2767],[86.09,1843],[85.09,2545],[81.86,2563],[83.71,2210],[79.62,3035],[82.15,2778],[71.53,4201],[83.17,2706],[78.13,3242],[86.36,2502],[83.51,2223],[95.97,617],[94.18,825],[92.88,1111],[96.59,495],[91.05,1551],[84,2127],[91.35,1413],[93.15,1395],[94.76,694],[86.21,2582],[95.64,621],[83.19,2671],[59.87,8460],[80.55,3040],[80,3029],[94.44,797],[95,738],[95.35,714],[91.43,1783],[88.36,1539],[82.65,2434],[86.46,1649],[89.15,1439],[60.99,4774],[82.81,3195],[89.14,1493],[52.52,6938],[86.56,1547],[65.08,4551],[66.64,6007],[85.72,3058],[89.6,1929],[94.53,1710],[93.99,1663],[88.93,2660],[91.03,1462],[86.14,1941],[93.12,1254],[85.51,4105],[92.83,2354],[82.58,4948],[93.16,921],[95.25,581],[95.91,533],[92.67,1054],[95.08,614],[91.88,1178],[91.07,1446],[94.44,1104],[98.25,231],[90.64,1577],[86.2,1743],[92.01,1075],[85.29,2239],[93.25,902],[81.81,2091],[70.28,3541],[96.3,656],[88.28,3109],[93.66,2119],[76.72,2824],[65.75,4107],[84.51,3536],[88.79,1608],[86.23,2341],[87.45,2269],[57.18,11465],[65.75,4265],[83.88,5987],[41.24,7070],[93.25,1405],[94.01,1173],[80.29,3163],[75.16,4130],[96.32,1267],[62.05,6028],[71.33,5642],[83.72,1966],[85.13,4470],[84.54,3923],[91.42,1359],[83.49,5852],[78.5,2937],[80.58,2787],[83.88,4061],[80.82,2297],[85.09,2175],[88.75,1695],[80.7,2265],[84.92,2442],[95.08,897],[90.2,1694],[95.18,941],[89.92,1936],[92.58,3392],[82.2,7591],[54.47,8539],[81.25,2784],[90.28,1438],[88.81,2602],[59.03,5209],[95.58,926],[89.04,2445],[70.42,3704],[91.53,1018],[90.57,2458],[79.78,4058],[76.81,3903],[90.17,1680],[88.69,2403],[79.34,11371],[90.56,2585],[69.33,9227],[84.9,2639],[88.58,2512],[81.51,6097],[83.14,3129],[53.8,7327],[75.59,3370],[81.84,2754],[91.25,1198],[87.65,1553],[85.35,2070],[95.47,809],[83.51,4553],[85.41,2206],[93.73,1081],[91.87,1213],[90.5,1533],[95.73,1032],[82.42,3350],[88.01,1654],[92.92,4236],[92.2,1002],[93.18,938],[74.65,4786],[93.09,1022],[96.72,608],[84.67,2061],[91.09,1903],[88.01,1936],[84.34,3641],[91.26,2003],[87.58,1703],[86.36,2465],[94.26,1240],[81.04,2411],[87.87,1832],[54.72,9255],[72.64,3705],[68.8,3920],[73.81,3341],[63.1,4532],[87.71,1940],[92.44,1865],[75.78,3296],[95.21,640],[87.63,2956],[85.45,1897],[85.98,1815],[84.48,3543],[94.24,1024],[86.79,1961],[96.6,464],[75.35,6521],[92.98,1057],[83.46,5495],[93.81,802],[92.8,1132],[93.43,1205],[48,7043],[84.36,3050],[86.32,1869],[95.44,747],[85.51,2958],[62.26,5305],[88.4,1465],[97.26,341],[96.48,481],[95.89,526],[95.57,694],[93.67,814],[89.15,1697],[76.9,4445],[91.76,1300],[86.83,2213],[94.98,827],[80.33,2464],[80.52,2577],[87.58,1834],[81.53,3466],[84.49,2237],[82.51,3143],[84.43,3960],[91.3,2007],[87.01,2085],[93.41,1149],[93.54,1172],[70.86,4338],[89.37,2331],[81.34,3650],[92.31,1320],[80.29,2298],[87.42,1826],[80.28,3481],[91.69,1011],[88.1,1457],[96.16,756],[89.22,1836],[90.48,1685],[93.26,952],[88.09,2995],[76.47,6916],[69.21,5823],[92.1,1119],[92.66,846],[92.61,1239],[85.52,1819],[88.96,1535],[88.84,1660],[81.28,2547],[94.64,878],[95.63,643],[75.87,3167],[93.77,900],[93.79,1181],[95.2,989],[93.99,2382],[88.52,2619],[89.13,2169],[92.15,1407],[38.09,24422],[82.71,2251],[92.48,1140],[92.51,1186],[89.65,1261],[87.82,1893],[90.81,1915],[65.8,4054],[95.6,642],[34.41,21782],[86.21,1660],[90.85,2001],[87.82,3789],[91.02,1162],[71.11,4810],[91.17,1588],[64.46,6349],[93.69,891],[78.38,3040],[85.69,4736],[91.76,1621],[86.39,2511],[66.12,5417],[87.48,2350],[92.04,1205],[90.73,2188],[84.16,1774],[95,993],[82.58,2269],[85.96,2719],[92.14,968],[68.94,5788],[92.52,1135],[73.65,6868],[68.57,18166],[90.18,1671],[92.01,943],[53.42,14948],[94.07,897],[74.32,3295],[74.61,8550],[69.23,3821],[77.17,3820],[91.4,1379],[79.73,3036],[94.52,790],[94.41,774],[92.55,1067],[91,1670],[93.55,1241],[96.28,754],[95.17,959],[93.67,883],[95.59,838],[93.47,955],[93.9,1060],[95.59,1021],[96.19,708],[89.9,1344],[92.95,1069],[94.94,668],[95.09,755],[95.09,709],[94.78,983],[96.14,610],[79.14,2650],[95.46,804],[93.43,1171],[87.71,3210],[93.79,1031],[94.63,1043],[96.61,781],[82.9,2100],[94.59,1026],[95.39,948],[94.04,1321],[93.62,1177],[89.88,1882],[94.13,1006],[96.89,626],[95.09,657],[93.22,1003],[47.57,7120],[81.08,5260],[92.76,1407],[90.31,1705],[73.13,6372],[84.27,2874],[80.31,4211],[93.03,966],[91.97,1996],[67.11,4169],[92.9,1302],[88.53,1554],[87.77,1924],[94.69,927],[96.59,414],[91.77,1090],[82.49,2672],[95.59,622],[90.91,1531],[90.31,2210],[92.05,1699],[95.95,4703],[93.83,906],[87.55,2499],[80.88,3438],[80.15,2364],[71.27,3553],[88.64,1689],[95.17,763],[71.74,4332],[88.86,1518],[84.52,4457],[88.82,5872],[96.47,548],[94.07,887],[93.31,1125],[94.8,895],[73.63,4320],[78.49,5339],[85.11,2842],[87.28,1912],[73.6,4247],[73.04,3043],[95.29,1312],[87.5,1599],[77.89,3144],[90.5,1501],[90.81,1269],[93.51,849],[88.56,1905],[97.15,501],[86.86,1762],[84.94,2068],[58.88,5952],[96.6,476],[77.29,2793],[88.71,1742],[94.15,871],[96.82,402],[96.96,441],[95.72,620],[95.19,609],[93.64,930],[96.67,468],[91.17,1343],[91.86,1266],[96.94,512],[53.9,6023],[91.78,1706],[92.81,1442],[91.86,961],[67.33,3873],[82.01,2281],[84.6,2386],[82.57,2768],[93.08,738],[86.67,2285],[96.55,516],[92.73,1209],[74.47,3431],[84.84,2846],[96.11,810],[78.35,3616],[86.24,2271],[72.31,3766],[95.57,923],[82.76,3024],[90.92,1158],[92.4,1356],[83.57,2175],[80.35,3695],[92.84,1338],[94.39,1130],[92.54,1299],[87.18,1946],[92.62,1558],[74.13,9008],[87.58,2098],[52.63,6176],[84.78,2138],[87.81,2343],[96.92,479],[91.48,1845],[76.92,2793],[97.65,329],[89.73,1546],[95.1,1106],[20.56,17884],[92.55,957],[80.8,2984],[86.58,2094],[70.17,4562],[96.41,644],[93.79,2077],[89.55,1741],[93.14,1809],[97.21,419],[94.27,1189],[59.88,5332],[90.48,1309],[95.17,650],[91.29,3300],[75.29,4127],[92.95,1008],[84.23,1862],[96.2,560],[87.49,2266],[88.89,1938],[72.51,6497],[91.73,1485],[83.77,2954],[92.16,861],[91.07,1451],[90.68,1134],[93.36,1121],[92.9,1372],[83.87,3180],[79.15,4288],[86.68,2298],[51.66,9988],[88.38,4461],[79.13,4169],[93.16,1374],[97.16,429],[97.01,1300],[96.93,410],[96.12,772],[96.06,917],[70.86,9744],[95.88,1105],[96.83,507],[98.07,638],[95.94,912],[96.92,377],[95.89,3094],[77.33,3945],[79.44,3686],[84.92,2383],[73.6,5161],[96.82,398],[97.84,319],[97.09,497],[94.38,919],[94.92,913],[98.24,1496],[97.57,404],[94.11,794],[98.26,239],[96.43,687],[98.47,249],[89.79,5755],[97.01,439],[94.81,884],[93.84,1130],[94.51,877],[97.66,425],[95.9,625],[97.73,475],[96.95,588],[97.16,532],[96.45,465],[90.27,1893],[89.41,2007],[97.7,375],[96.12,779],[97.64,448],[97.29,378],[94.59,847],[95.77,633],[98.32,292],[96.81,601],[97.92,287],[96.16,572],[96.79,440],[92.02,1547],[95.07,577],[96.17,663],[97.82,379],[94.71,917],[96.97,384],[97.71,284],[96.75,402],[95.39,813],[96.76,901],[96.61,577],[98.15,251],[97.65,301],[97.89,400],[94.76,736],[95.77,645],[92.89,853],[97.44,366],[96.88,782],[95.51,887],[90.91,2038],[94.45,653],[95.28,1189],[97.3,336],[95.03,905],[82.63,4740],[98.44,223],[96.37,632],[92.29,2501],[97.31,444],[97.24,365],[97.54,306],[97.19,510],[96.59,606],[96.6,449],[96.44,531],[96.01,606],[96.4,812],[94.79,704],[95.61,1657],[92.15,2054],[97.32,539],[93.58,1003],[97.73,306],[96.79,550],[95.61,827],[97.63,351],[97.93,340],[98.03,426],[96.64,620],[97.19,413],[97.95,248],[97.02,455],[96.45,424],[97.41,396],[96.63,490],[96.75,485],[96.75,473],[97.02,446],[84.97,2984],[96.96,435],[96.62,486],[97.41,503],[97.4,397],[97.84,255],[97.31,774],[97.07,395],[96.07,533],[94.35,1225],[96.81,454],[93.39,1829],[93.28,736],[95.69,663],[97.88,272],[95.68,3193],[97.68,293],[95.56,580],[97.6,588],[96.97,497],[97.2,580],[96.78,650],[96.69,384],[97.84,306],[96.54,535],[97.76,369],[97.39,441],[95.79,710],[97.59,344],[96.77,781],[97.53,331],[97.49,303],[97.34,427],[98.33,323],[96.26,479],[97.35,434],[94.74,1640],[85.42,1556],[93.19,1301],[94.55,1175],[98.19,463],[96.65,613],[97.59,529],[97.64,298],[95.54,617],[96.39,459],[73.26,15137],[97.59,327],[93.28,799],[96.53,556],[93.49,1182],[97.9,257],[98.09,241],[96.16,715],[96.75,424],[95.17,582],[97.34,462],[98.12,290],[94.92,675],[97.07,475],[97.99,343],[97.89,252],[98.02,308],[97.39,453],[98.41,212],[96.7,688],[97.1,446],[96.66,443],[95.85,922],[83.85,2951],[91.27,1431],[87.12,1697],[67.93,8925],[87.42,2119],[87.68,1865],[66.9,7714],[75.45,5591],[73.34,3162],[69.29,5206],[93.71,860],[80.01,2787],[85.1,2025],[64.64,36060],[87.41,3492],[88.83,4833],[93.95,1226],[74.7,3326],[75.95,4154],[96.12,636],[88.85,1941],[94.32,1234],[87.95,1835],[93.51,1186],[80.49,4652],[64.04,8790],[93.1,1517],[86.51,1618],[90.02,1670],[51.09,8882],[93,1145],[90.77,2108],[89.91,1619],[61.21,5580],[85.82,4283],[71.39,3768],[88.74,2069],[85.4,1863],[91.57,1253],[88.03,2228],[79.8,2793],[90.02,2435],[77.74,10732],[82.14,2366],[73.29,3485],[81.62,8201],[71.06,4091],[64.36,5088],[82.79,2175],[87.93,1537],[71.19,3961],[74.4,6343],[94.88,1192],[89.71,1710],[93.38,904],[87.31,1902],[92.77,1093],[86.98,3853],[83.53,3162],[87.84,2712],[71.87,3975],[74.43,5268],[93.16,1307],[74.23,9073],[83.79,2521],[80.18,7319],[74.08,8246],[92.5,1125],[91.49,1163],[94,888],[90.03,1769],[97.2,406],[89.19,1687],[83.14,3246],[63.9,11833],[90.98,1338],[74.98,5606],[88.76,1708],[91.98,1568],[92.55,1530],[91.37,1405],[92.46,1161],[79.98,3045],[87.59,2092],[75.91,3811],[68.02,7401],[95.65,1238],[91.93,1836],[68.06,10134],[89.63,2432],[73.89,3464],[72.89,8795],[78.3,3179],[72.16,5031],[81.92,3371],[78.76,2731],[80.67,3646],[70.73,11720],[69.76,9654],[83.23,21284],[77.31,4999],[82.33,7737],[83.13,3035],[75.83,5670],[89.68,1629],[94.02,956],[76.84,5917],[89.35,1484],[89.32,1387],[88.73,2039],[56.31,6365],[91.75,1262],[90,1938],[93.63,940],[74.17,4782],[86.08,2545],[71.86,5276],[85.53,2386],[83.57,2432],[93.34,3977],[85.69,2191],[78.83,4240],[93.48,1243],[84.7,2072],[94,792],[82.4,7781],[88.29,2072],[76.29,6218],[91.61,1383],[87.04,9154],[93.11,1136],[69.54,8050],[87.53,2916],[73.58,5143],[54.69,5534],[87.67,1577],[97.02,669],[89.18,1409],[82.88,4310],[97.11,530],[96.24,866],[97.69,283],[97.43,472],[97.17,527],[97.63,434],[94.22,736],[84.46,1854],[83.82,4419],[82.22,2179],[87.39,6417],[69.89,4849],[92.21,1398],[89.82,1515],[95.26,1180],[70.47,7003],[55.53,6546],[47.11,10334],[90.57,1711],[93.48,1245],[94.88,848],[95.21,969],[74.28,5891],[76.16,8920],[92.14,1198],[92.8,1054],[91.72,1479],[95.56,744],[86.75,4453],[40.47,10770],[94.17,1459],[91.87,1998],[95.47,542],[96.52,492],[92.35,1585],[97.05,425],[96.26,716],[91.85,1790],[95.24,822],[94.57,762],[94.48,1085],[92.94,3038],[87.47,2327],[94.79,1237],[96.09,570],[93.21,1117],[95.3,748],[90.98,1583],[88,1715],[71.71,8387],[76.91,4340],[85.72,2471],[55.6,9551],[87.36,1816],[81.24,5482],[93.63,1086],[74.88,4964],[89.02,1520],[86.49,12941],[88.22,1920],[92.64,1587],[67.38,14076],[73.1,5276],[93.25,997],[76.5,4137],[94.87,905],[93.02,1570],[86.57,3060],[91.02,2397],[87.82,2318],[93.27,1266],[71.69,7944],[71.86,4975],[88.27,2206],[61.14,6836],[90.85,2692],[91.33,1654],[74.04,4322],[90.49,1672],[79.33,3348],[75.2,4774],[90.93,1484],[78.63,2593],[77.64,4410],[90.72,1723],[72.83,4229],[87.43,6473],[91.17,1698],[69.86,3880],[92.17,2831],[85.02,2518],[89.89,2213],[69.87,20618],[82.89,3923],[88.22,2467],[89.4,6204],[91.45,1763],[50.62,8124],[86.98,3054],[88.68,3162],[95.5,633],[91.97,3296],[86.16,2449],[93.51,1418],[87.71,4683],[92.85,1326],[85.21,1922],[92.44,1140],[87.99,2105],[73.74,11867],[84.41,2799],[73.89,5186],[81.45,3497],[83.83,2779],[79.35,4452],[82.7,2338],[72.41,3337],[88.44,1421],[84.53,5024],[88.61,2430],[92.16,1604],[75.69,3271],[87.75,2012],[92.45,1312],[99.65,65],[84.62,3260],[97,544],[97.67,327],[96.22,679],[98.29,307],[97.7,381],[94.55,961],[96.8,915],[95.95,640],[97.31,295],[95.02,1463],[95.33,716],[90.49,1228],[94.62,1032],[96.07,1260],[92.59,1065],[95.15,981],[97.61,335],[97.36,368],[95.28,745],[96.83,732],[95.31,902],[96.24,618],[83.98,2039],[54.73,7268],[80.2,3269],[82.88,2421],[83.06,3126],[91.78,1123],[76.49,4341],[79.33,2623],[81.45,2507],[87.93,1807],[92.76,1192],[80.38,3828],[95.86,502],[93.69,1090],[91.86,1151],[61.18,5914],[86.59,2207],[89.68,1281],[86.17,2878],[91.41,1607],[75.32,5324],[89.62,1434],[91.84,1147],[85.91,3812],[96.27,868],[82.54,4566],[85.88,1744],[74.87,5075],[93.11,1463],[89.05,2573],[81.8,5529],[84.62,3115],[84.62,2964],[84.87,1970],[80.81,3273],[87.7,2973],[59.74,8508],[93.74,1294],[62.81,5763],[92.97,5534],[91.37,1771],[90.86,1437],[76.15,5893],[62.98,11180],[91.82,1643],[75.08,7419],[78.26,3834],[79.95,3676],[46.56,14130],[58.1,6507],[94.82,1514],[80.21,3784],[82.22,3603],[95.08,1226],[87.7,1898],[75.87,9385],[92.14,2046],[91.15,1154],[91,2156],[89.44,1382],[87.54,1624],[87.87,1929],[90.94,1455],[92.32,1821],[83.2,2677],[64.48,8579],[59.76,7263],[92.3,2649],[89.43,2160],[90.96,1484],[90.61,2338],[85.81,2057],[93.12,1097],[93.81,1208],[69.9,8559],[91.96,1220],[61.44,11406],[88.06,1901],[87.25,2293],[89.53,1730],[86.75,1812],[91.93,1448],[80.09,4290],[86.21,2993],[84.4,3962],[91.81,1731],[89.19,1686],[93.51,1140],[54.88,7071],[93.3,982],[85.52,15372],[85.67,2233],[87.96,1478],[64.25,5242],[89.44,1485],[85.28,1816],[90.57,1459],[80.91,3321],[81.91,2268],[75.91,3188],[86.58,3475],[90.78,1521],[90.75,4275],[83.64,2593],[87.6,2777],[95.52,604],[80.58,4189],[94.25,856],[88.26,2099],[80.91,2523],[90.16,2056],[85.91,2235],[88.13,2124],[50.07,8016],[78.13,6841],[80.06,3279],[91.38,1296],[51.01,7107],[45.01,10169],[86.6,2196],[83,3006],[74.36,5596],[55.39,15866],[88.74,1925],[73.14,5578],[85.79,1931],[82.53,3757],[89.59,1752],[89.34,1708],[83.32,2883],[85.09,5521],[89.17,1863],[85.06,1704],[85.79,1841],[80.14,2723],[79.54,2505],[85.88,1911],[76.6,3036],[78.5,3116],[92.65,1241],[83.42,3128],[72.86,3959],[89.88,1464],[88.93,2104],[85.71,1824],[87.55,2269],[73.51,4426],[90.7,1458],[92.09,960],[92.32,1356],[84.29,3384],[83.77,7674],[75.62,4559],[89.22,2001],[92.17,1701],[87.12,2184],[50.38,17147],[88.15,2386],[78.96,4146],[87.54,3577],[93.22,916],[90.04,1553],[72.9,3832],[90.29,1331],[95.35,653],[59.93,12463],[92.13,1211],[93.5,911],[92.59,920],[95.62,584],[93.01,1170],[95.49,618],[89.33,1567],[83.84,3719],[87.43,1988],[93.48,1028],[91.55,977],[94.31,2652],[96.77,1481],[95.4,632],[96.29,514],[84.21,2841],[93.72,1023],[83.94,2953],[95.8,645],[74.65,5409],[84.84,2014],[88.87,2062],[83.88,2814],[93.6,1220],[92.79,1538],[83.09,2648],[74.35,3181],[90.25,1477],[96.98,467],[93.29,1076],[73.47,4890],[78.79,3898],[86.67,3413],[85.74,2305],[61.5,5761],[74.85,4207],[81.72,27597],[88.04,2118],[90.49,1248],[84.44,2402],[80.02,9449],[90.97,1256],[81.44,2542],[91.99,1706],[93.87,776],[92.67,1099],[87.23,2664],[94.11,1059],[95.8,669],[86.93,2201],[83.81,2109],[78.55,7215],[84.78,7329],[71.61,5031],[85.59,4153],[78.78,2664],[86.48,1962],[80.16,3100],[81.99,3363],[82.25,2721],[71.52,4117],[77.53,3789],[90.51,2045],[89.6,1700],[89.47,2424],[92.65,1592],[81.49,8357],[90.65,1164],[92.53,1742],[94.63,777],[79.67,3544],[95.48,813],[86.75,3491],[95.35,1020],[50.77,35214],[97.3,535],[91.9,1588],[83.3,6143],[64.88,4004],[90.69,1959],[91.64,1389],[83.25,2889],[88.34,2927],[95,583],[90.46,3555],[93.78,970],[93.27,855],[87.56,1486],[91.61,1562],[84.19,10038],[69.55,4962],[67.17,4019],[83.06,3092],[93.59,731],[25.07,35506],[86.18,2887],[92.11,3231],[93.61,822],[88.55,2478],[73.14,4371],[88.88,2488],[82.07,2157],[89.47,1307],[82.13,2943],[92.59,1077],[93.81,863],[93.87,811],[85.25,1885],[91.12,1375],[69.98,5445],[81.51,7353],[90.25,1195],[90.79,1392],[68.9,6740],[89.92,2054],[90.47,1514],[77.28,3942],[82.9,3411],[84.35,7003],[85.3,2182],[77.05,3613],[95.29,677],[88.04,1731],[92.05,1520],[96.54,512],[91.12,1079],[89.87,1296],[87.16,2425],[82.05,3431],[96.98,427],[92.74,1049],[88.59,6378],[88.26,2069],[63.45,24374],[79.34,3245],[71.77,4647],[86.05,2496],[86.71,3487],[82.72,2940],[84.74,2952],[61.82,5906],[82.26,8263],[84.78,2595],[78.9,3122],[80.73,3158],[91.53,1572],[76.17,5742],[72.21,5056],[85.49,2611],[93.56,999],[80.66,3301],[93.96,1065],[95.36,811],[92.41,1077],[94.33,853],[94.26,839],[97.19,450],[91.16,3552],[88.86,1845],[90.4,1701],[94,901],[92.98,1163],[90.52,1352],[68.32,7579],[81.64,2098],[88.52,1346],[80.43,2347],[85.52,1561],[65.86,4195],[87.67,1612],[60.37,6648],[90.96,1486],[77.32,2845],[92.21,1132],[93.97,1347],[71.29,6712],[84.18,2583],[86.8,2268],[67.52,4920],[84.5,6883],[87.49,2069],[75.3,3314],[78.25,2815],[57.09,6636],[70.12,4318],[84.64,1972],[84.48,1950],[92.51,1000],[71.67,5822],[94.61,666],[90.49,1273],[92.8,956],[78.22,3163],[85.42,1870],[77.31,4520],[88.71,2047],[88,3978],[76.06,3103],[91.46,1481],[90.4,1617],[81.36,2971],[92.41,1262],[85.53,2460],[83.78,2447],[79.2,2609],[95.55,865],[83.75,4088],[90.93,1118],[71.06,7552],[85.48,3281],[49.87,7049],[90.87,1528],[92.22,1116],[91.83,1687],[89.09,1785],[96.62,603],[85.28,1638],[87.26,2106],[91.02,2814],[91.41,1229],[90.56,1655],[89.65,1266],[92.59,1413],[93.31,1230],[95.12,1116],[91.21,1056],[95.47,1034],[95.14,820],[95.15,837],[88.02,2320],[88.49,1867],[85.46,2677],[96.62,550],[81.22,3366],[78.79,4850],[92.49,1969],[69.49,7611],[68.51,6220],[84.21,1972],[96.29,705],[94.99,833],[96.43,498],[95.32,705],[91.11,1176],[94.6,895],[92.01,1345],[90.28,2135],[88.64,4277],[66.11,4270],[60.62,10561],[72.24,4823],[93.1,3209],[80.94,3215],[74.96,6279],[87.31,2400],[72.96,4113],[95.02,865],[88.44,2739],[78.54,3829],[57.6,7871],[86.71,2312],[81.47,3167],[84.62,4199],[82.74,3452],[83.32,3751],[74.03,4110],[92.81,916],[95.3,819],[71.43,10939],[91.77,1866],[77.31,12967],[64.77,6222],[90.16,2292],[90.91,1494],[95.71,639],[68.07,5233],[79.4,3513],[59.51,5707],[80.88,4654],[79.37,2804],[85.11,4587],[52.54,6834],[87.52,1929],[92.25,1966],[88.29,4717],[90.92,1336],[88.23,1326],[90.15,2357],[89.24,2429],[94.28,819],[49.62,6643],[86.46,2198],[91.62,1891],[82.51,9405],[89.71,1289],[88.66,2133],[97.29,385],[86.05,4871],[91.68,1036],[84.39,2883],[87.03,1684],[91.22,2090],[92.59,1430],[92.9,960],[74.55,5160],[92.51,1210],[88.43,2246],[91.31,1743],[71.67,4825],[68.43,3820],[89.07,2021],[91.27,1772],[84.15,2466],[92.9,875],[78.35,4830],[93.44,1391],[75.58,2918],[92.05,1793],[93.67,1139],[63.76,5950],[69.72,7496],[91.97,1457],[90.72,1468],[88.45,2385],[94.47,963],[94.98,656],[86.59,1855],[91.62,1024],[87.2,2214],[92.49,868],[94.02,910],[92.1,2063],[82.86,2111],[92.09,1177],[88.69,3272],[87.62,2775],[91.08,1113],[86.76,2162],[88.22,3941],[95.43,657],[91.04,3821],[89.23,1333],[87.59,2326],[95.68,605],[88.43,4278],[82.74,3118],[86.74,2724],[94.64,877],[93.14,4369],[93.81,1298],[89.81,1655],[89.89,1498],[63.47,6571],[79.63,6924],[92.83,1278],[85.65,4719],[93.69,1007],[83.36,3103],[93.18,1134],[64.9,4808],[84.97,2168],[81.84,5250],[89.27,1774],[64.78,4946],[68.27,4587],[87.12,3184],[78.63,5799],[95.16,1013],[80.46,3557],[91.63,1784],[76.24,3604],[95.13,812],[88.38,1777],[93.17,1102],[36.23,38381],[81.16,5403],[86.96,1850],[92.7,1108],[95.26,1157],[96.61,490],[85.99,2506],[91.78,1249],[71.82,5500],[89.13,2518],[68.98,3675],[66.23,5431],[78.51,4323],[78.66,2826],[73.25,3666],[96.08,1438],[84.69,3093],[80.89,2563],[92.2,3781],[84.21,5019],[93.28,1839],[89.92,1519],[86.94,1968],[84.96,2225],[79.21,5754],[92.65,2083],[91.29,1382],[87.92,2419],[59.94,6173],[88.02,2062],[88.72,1633],[63.32,4230],[94.38,2246],[82.65,2720],[86.48,2187],[86.9,1978],[92.76,1238],[64.18,4244],[69.12,4327],[93.94,1007],[87.94,2406],[87.04,2000],[81.53,4463],[91.46,1699],[85.47,1934],[61.88,8321],[84.64,3254],[93.89,893],[78.9,4094],[89.66,1952],[75.11,8103],[76.76,2655],[93.29,2272],[87.67,2903],[76.11,3056],[94.54,1138],[62.8,5603],[84.44,6925],[92.2,1234],[74.81,6995],[84.34,7470],[80.45,3344],[91.97,1530],[90.16,1342],[85.2,2720],[73.06,3439],[81.4,3691],[86.42,1495],[96.36,633],[86.24,6158],[93.9,854],[73.39,17276],[83.6,4938],[53.55,8058],[78.75,4442],[88.06,1916],[91.37,2117],[91.68,1529],[79.76,2566],[91.74,1630],[90.1,2008],[96.7,559],[92.21,2066],[86.5,3893],[93.45,1122],[94.25,1433],[80.94,4426],[92.5,1246],[80.11,3437],[84.94,2590],[75,4389],[95.54,848],[60,6428],[90.32,1627],[97.03,471],[81.34,3578],[90.62,1599],[72.38,5774],[97.05,376],[70.17,8642],[74.23,5086],[80.26,2919],[89.16,1499],[89.05,2952],[83.56,5120],[67.06,8533],[87.68,2537],[86.63,2150],[76.39,4502],[60.54,8018],[81.65,3183],[54.75,6790],[93.45,1397],[87.15,2813],[91.65,1296],[60.89,7687],[65.13,4114],[95.42,817],[92.91,1157],[94.19,1013],[87.21,1986],[89.26,2965],[86.83,1907],[70.44,6079],[81.68,4190],[94.69,1296],[83.63,2749],[93.36,918],[77.54,4911],[91.8,1322],[73.25,7262],[83.66,3826],[95.18,1026],[94.97,1425],[88.22,8486],[89.12,10081],[89.67,1533],[93.09,934],[62.28,6417],[85.9,2180],[69.24,7290],[94.41,770],[91.62,1662],[95.97,1261],[91.33,1450],[82.78,3159],[74.53,3629],[89.88,3187],[41.27,17961],[83.27,3434],[93.76,904],[93.44,1069],[90.95,1330],[94.1,1126],[88.6,1666],[85.25,2612],[80.73,3127],[92.32,1078],[88.52,1477],[91.89,1137],[65.01,5440],[76.95,3573],[79.18,3119],[80.95,2693],[61.63,5931],[71.54,4148],[77.69,3465],[75.54,4078],[85.33,2067],[77.27,3147],[73.69,3219],[84.95,1892],[87.13,1449],[83.47,2404],[87.97,1784],[79.95,7198],[87.17,2142],[88.96,1441],[88.51,2410],[88.29,1295],[68.38,4540],[82.92,2368],[80.8,2980],[83.46,2430],[86.13,1601],[88.62,1484],[90.31,1235],[53.93,21199],[77.71,5762],[93.72,1168],[91.02,1321],[87.51,1934],[91.58,1505],[83.11,2179],[68.5,4355],[59.45,8442],[92.43,1298],[87.26,2141],[92.68,1509],[84.62,3535],[89.56,1688],[97,669],[79.8,2480],[93.87,956],[91.35,2087],[83.8,3353],[93.51,1175],[75.4,2815],[86.84,11300],[91.03,1331],[90.19,1793],[84.31,2483],[77.5,3887],[73.25,5864],[85.59,3176],[82.21,5761],[94.51,771],[92.7,1486],[75.32,3045],[77.17,5581],[91.8,1893],[89.35,1785],[72.85,4674],[95.37,716],[75.8,9748],[94.55,1198],[88.73,2589],[62.61,13371],[94.48,1042],[86.49,4872],[80.17,3953],[87.89,2349],[67.39,7801],[76.9,4168],[89.77,2719],[78.05,7333],[91.55,2247],[87.71,1633],[87.92,2449],[93.88,995],[72.57,10546],[92.03,1689],[88.26,2151],[95.26,1060],[82.52,3313],[89,1987],[93.07,1499],[78.3,4018],[96.6,581],[93.87,1482],[88.12,7276],[79.21,3922],[92.2,1099],[80.36,3227],[70.72,7774],[63.85,4657],[94.12,723],[84.9,1914],[84.58,2086],[91.21,1121],[68.37,5194],[82.64,2202],[90.41,1232],[25.41,9522],[89.9,1503],[88.16,1581],[75.71,4630],[81.4,2583],[84.6,2843],[90.13,1840],[88.13,1560],[92.94,1181],[87.89,1347],[93.97,1051],[90.06,1101],[80.1,2730],[65.26,4789],[88.17,1506],[77.81,3347],[88.88,1329],[86.36,2092],[80.41,2767],[90.89,1246],[89.83,1323],[90.45,1242],[84.37,2445],[68.7,6225],[78.82,5571],[87.97,2036],[91.38,1191],[95.48,661],[93.61,1292],[89.52,1151],[89.72,2207],[85.55,2599],[94.05,883],[68.1,8057],[71.06,8471],[85.52,2263],[81.21,4274],[57.07,14218],[81.73,4170],[83.04,3722],[94.68,2257],[86.35,2802],[73.33,3325],[79.42,3984],[75.92,6288],[81.11,4273],[63.08,5716],[77.04,5932],[92.64,1360],[88.5,1515],[87.91,1591],[91.32,1133],[64.06,14335],[79.51,3739],[81.38,6581],[75.3,5624],[85.76,2078],[88.9,2223],[91.78,2012],[82.02,2940],[93.74,811],[87.87,2131],[90.27,1423],[86.22,2383],[88.51,1544],[75.26,11080],[80.12,4762],[83.69,3086],[92.81,1422],[84.71,3931],[90.28,3295],[66.45,6564],[84.26,2470],[82.5,4019],[71.92,3553],[81.06,2812],[76.62,5924],[79.37,4456],[68.35,11268],[93.56,1098],[91.3,1549],[86.1,1751],[88.13,1676],[94.21,1162],[76.87,4113],[80.67,2372],[79.91,7411],[89.61,1338],[91.19,1752],[94.9,936],[88.33,1907],[90.85,1822],[83.41,10465],[67.37,4499],[80.58,14607],[76.72,6469],[97.92,368],[95.35,2897],[59.8,13308],[89.53,1452],[93.82,812],[86.27,2405],[75.35,5995],[77.23,9293],[89.61,1728],[81.76,4147],[84.66,1894],[81.12,3467],[75.71,2821],[89.91,4041],[88.17,2718],[70.35,4823],[95.92,786],[86.35,3033],[83.29,6317],[71.12,4959],[81.31,2469],[87.68,1498],[86.06,1728],[81.77,2600],[79.17,2304],[85.44,1870],[85.75,1864],[87.97,1631],[89.5,1290],[87.65,1754],[93.73,878],[92.41,1034],[83.08,2949],[94.46,990],[86.78,2883],[60.32,7362],[92.69,1592],[94.28,789],[91.6,1386],[93.77,1006],[94.91,790],[91.61,1656],[88.97,1633],[94.5,924],[93.27,771],[92.61,799],[94.21,933],[92.07,1397],[92.67,1608],[93.14,1089],[92.4,1611],[96.28,557],[90.11,2055],[96.05,685],[94.13,973],[94.97,787],[95.29,600],[89.63,1268],[96.42,496],[94.48,1189],[81.8,3404],[85.19,2611],[55.95,5602],[92.59,3342],[81.36,2699],[91.55,1439],[76.82,14301],[87.09,6994],[87.84,2878],[88.91,2389],[89.74,1824],[87.73,2594],[81.66,2898],[91.46,1237],[93.59,1198],[94.15,1331],[70.46,3805],[93.98,1055],[85.04,7474],[84.42,2050],[83.85,3705],[93.42,1304],[89.1,2092],[93.78,873],[83.14,3364],[79.54,2467],[56.93,7168],[87.53,2196],[84.28,4662],[82.06,3014],[92.63,1475],[89.51,1950],[58.05,31905],[80.6,3110],[71.92,4158],[92.49,1506],[94.61,909],[95.47,715],[78.57,3769],[91.31,1134],[93.88,1506],[93.49,1009],[83.96,3580],[79.82,2645],[81.41,6607],[88.32,2687],[79.47,2900],[95.01,1001],[95.32,683],[84.58,2860],[88.52,1842],[95.68,700],[89.31,2229],[83.28,3090],[96.82,362],[86.97,2439],[83.84,12256],[91.55,1640],[42.8,9892],[79.06,3634],[87.24,2233],[92.38,1190],[94.2,2394],[94.86,1068],[86.4,2871],[83.02,3312],[86.77,3001],[87.49,1709],[91.44,2605],[78.74,3621],[89.16,2382],[89.79,2073],[85.02,2335],[93.3,1143],[92.24,1305],[92.1,1573],[94.81,745],[91.93,1233],[95.23,803],[86.14,5575],[94.5,959],[93.08,1876],[94.54,814],[95.88,678],[89.48,3759],[91.74,1699],[93.04,1470],[95.98,576],[95.66,680],[89.55,2019],[42.22,42295],[85.64,3080],[72.23,3500],[89.46,1432],[74.76,5244],[85.64,2464],[93.52,1193],[92.16,1206],[91.7,1633],[92.47,988],[95.98,628],[95.58,761],[93.06,1359],[91.41,1366],[71.21,3590],[83.99,2442],[84.52,2655],[88.98,1640],[73.37,7784],[95.94,676],[83.54,2910],[76.16,4328],[72.34,4051],[90.79,1551],[65.89,12206],[91.04,1645],[84.56,1847],[93.18,1617],[73.46,7397],[84.02,2906],[95.32,790],[84.79,6044],[91.47,3187],[80.43,5264],[86.26,2289],[83.44,2679],[77.96,11062],[85.12,6719],[86.74,4183],[83.08,4678],[85.94,8171],[84.22,2951],[86.56,4110],[92.65,1035],[63.53,4439],[93.92,1085],[65.94,9640],[84.72,3307],[85.58,3344],[93.58,977],[86.32,1884],[85.77,1819],[78.38,3006],[80.31,2354],[76.2,3173],[64.9,4349],[78.79,3026],[92.26,1112],[85.11,2705],[96.17,788],[89.92,1479],[94.62,703],[95.47,755],[79.82,3039],[86.81,1679],[74.71,3554],[77.83,2709],[86.45,1789],[86.91,2053],[89.31,2898],[88.36,2037],[95.58,761],[92.48,1521],[84.65,2126],[87.94,2192],[77.48,5685],[88.76,2279],[71.86,8311],[79.24,7922],[71.49,4647],[88.64,2117],[93.35,1291],[59.71,14570],[82.72,3520],[92.01,3932],[94.22,1097],[82.86,4109],[88.49,2161],[90.71,3712],[93.59,1185],[72.27,4790],[88.67,2219],[83.4,2596],[54.02,8214],[93.37,1093],[75.99,10019],[86.49,2217],[93.58,1247],[93.87,900],[78.48,3963],[66.74,4003],[79.12,4650],[78.6,4754],[88.3,1543],[87.98,1636],[88.75,1857],[86.64,2163],[89.91,2054],[94.67,1157],[79.67,8596],[84.15,4893],[60.58,8637],[75.75,6456],[91.27,1193],[89.36,2409],[85.35,2764],[86.44,3524],[86,2810],[85.16,2571],[81.12,2528],[73.03,16054],[87.87,3308],[95.11,675],[93.46,996],[93.79,819],[91.96,1117],[96.1,466],[76.03,4860],[96.43,570],[95.19,831],[95.14,1035],[89.18,1542],[93.93,874],[90.79,2265],[94.86,639],[89.11,1676],[92.53,1199],[85.16,2767],[93.47,1019],[91.24,1491],[95.6,648],[91.91,1454],[90.67,1650],[75.76,13896],[67.85,13766],[89.41,1414],[91.37,1551],[94.5,760],[84.12,3892],[84.28,2551],[87.44,2682],[35.99,10900],[86.69,3411],[93.84,1142],[87.6,4025],[87.83,2507],[84.67,2019],[84.11,2163],[91.63,1035],[84.11,3323],[82.23,2201],[74.37,3279],[90.63,1014],[84.46,2423],[86.88,1313],[72.06,3582],[87.73,1398],[67.88,4114],[86.99,1713],[92.96,971],[68.05,4431],[88.01,2350],[63.45,5150],[87.97,1987],[72.26,4495],[74.12,4123],[70.7,11594],[86.07,4168],[87.59,2434],[97.25,758],[31.47,18306],[88.94,1503],[88.16,1766],[90.22,1707],[97.21,482],[82.7,2647],[86.3,8118],[87.39,2136],[61.63,4918],[92.28,1235],[93.39,1367],[88.83,1471],[64.76,5312],[76.99,3932],[93.78,1112],[96.07,864],[64.2,6546],[93.1,1311],[94.02,926],[93.07,1254],[74.05,3539],[87,2475],[41.55,12825],[97.32,477],[78.55,9396],[71.43,4909],[75.27,3549],[88.85,2240],[74.99,3427],[83.34,2019],[87.71,1863],[85.99,2109],[85.89,1868],[75.37,3069],[86.41,1688],[87.84,1354],[92.05,1109],[77.28,2992],[81.54,2605],[38.8,17129],[69.51,4607],[77.53,4333],[94.89,1259],[92.05,1418],[93.51,1265],[84.88,1986],[88.43,1937],[67.25,4929],[88.71,1614],[90.68,1513],[90.28,1357],[86.76,1668],[86.93,1542],[76.32,3058],[84.12,2057],[89.38,1652],[86.33,3863],[96.01,787],[62.97,4808],[67.32,4724],[86.65,3403],[84.84,3168],[91.77,1533],[93.14,979],[87.58,3104],[72.77,3497],[90.24,2106],[76.51,5407],[92.9,1020],[89.97,2111],[88.7,1500],[94.88,1083],[87.52,1749],[85.35,1880],[91.95,1195],[96.93,413],[87.62,2051],[58.2,7597],[76.32,3959],[88.03,2158],[92.32,1413],[84.79,2956],[81.58,5147],[81.75,7387],[93.92,1016],[84.97,3557],[88.22,2404],[95.15,1004],[91.06,1830],[93.71,1164],[89.45,1958],[93.35,1521],[81.3,2907],[86.13,1620],[91.63,1073],[80.63,4749],[68.04,6433],[95.21,764],[90.87,1441],[76.13,7609],[79.6,4189],[94.21,1106],[88.66,1337],[81.05,2284],[83.55,2918],[91.95,1634],[92.07,1248],[86.77,1666],[76.82,4858],[91.33,2342],[88.45,2203],[93.12,959],[86.03,1959],[89.71,1634],[93.96,900],[93.53,1344],[72,5836],[71.72,9335],[74.4,4630],[72.3,4217],[92.89,1053],[78.89,3347],[95.17,1068],[81.18,3337],[95.34,728],[96.49,579],[94.04,867],[92.08,1070],[94.82,1072],[91.17,1448],[93.76,1332],[88.02,6743],[72.93,6848],[90.23,1598],[91.33,1162],[94.78,864],[69.01,5490],[93.54,1164],[84.94,4648],[78.75,2746],[88.81,1518],[66.64,7619],[79.26,5044],[84.58,2896],[93.61,864],[83.68,3205],[79.96,3942],[86.37,8413],[87.31,1928],[82.26,3381],[90.03,1706],[92.9,936],[90.74,1673],[85.78,2733],[87.59,2107],[90.53,1458],[86.54,2258],[94.17,838],[95.05,989],[70.51,5047],[93.75,1074],[82.19,5836],[93.67,1169],[87.63,2688],[93.32,1174],[83.38,1992],[89.6,3129],[86.61,2186],[95.93,741],[87.84,1901],[94.38,1795],[89.36,1798],[84.73,2763],[88.95,2411],[77.91,8168],[79.28,2662],[91.69,1345],[80.3,4448],[94.08,991],[95,693],[91.02,1460],[95.28,871],[67.76,11946],[89.82,1712],[75.89,4933],[75.09,5315],[95.04,1291],[97.83,489],[72.08,6083],[73.84,7442],[65.43,5542],[73.1,3547],[61.32,7397],[87.63,2056],[82.17,2542],[83.5,3277],[88.53,2008],[91.55,2942],[76.28,2977],[51.43,10448],[80.97,2744],[86.6,2138],[82.66,2410],[84.39,2893],[59.37,6765],[78.66,2801],[86.63,1884],[77.51,3926],[58.68,8387],[85.01,3145],[87.25,1369],[84.31,2259],[88.67,2100],[76.26,3240],[79.87,3227],[95.75,1154],[92.91,1290],[93.14,1485],[87.21,2316],[57.76,10612],[85.03,6252],[92.75,1541],[77.07,4960],[82.66,4086],[76.56,3377],[91.55,2379],[83.42,2153],[55.3,8084],[92.3,3343],[91.56,5484],[65.65,10700],[91.26,1649],[90.48,2081],[90.57,1801],[92.25,929],[92.02,1590],[93.58,1391],[96.77,646],[61.49,10506],[80.1,4211],[94.72,1157],[81.28,2430],[70.02,14321],[87.78,1876],[90.51,1217],[92.74,1221],[84.97,1897],[82.17,2335],[92.39,1513],[82.63,2076],[93.94,899],[89.28,1539],[92.81,1074],[62.63,6316],[93.52,1442],[90.51,1521],[67.89,4981],[84.07,2515],[67.04,4351],[75.84,3406],[84.24,3436],[92.87,1312],[85.94,2580],[90.69,1249],[92.69,833],[90.91,1219],[95.92,1048],[88.88,2997],[94.85,856],[90.11,1224],[92.43,2064],[90.57,1186],[97.12,576],[96.07,887],[95.2,695],[83.59,2751],[81.83,2974],[87.18,2764],[84.02,3353],[91.74,1106],[90.54,2165],[88.35,1735],[64.39,17135],[76.03,5718],[63.63,22103],[92.04,1322],[83.61,2234],[84.78,2367],[91.75,1742],[81.87,3414],[89.52,1710],[71.75,4010],[90.71,1774],[89.66,1700],[91.6,1233],[98.08,255],[93.89,780],[85.58,3209],[96.81,392],[96.83,565],[87.64,1970],[96.7,1022],[95.3,3202],[93.42,1503],[96.27,763],[96.46,986],[96.17,651],[95.22,660],[93.58,1084],[96.56,473],[96.46,529],[93.94,2079],[95.87,1939],[90.98,2765],[85.27,4600],[96.13,840],[91.02,1677],[96.24,621],[95.35,561],[95.27,641],[97.32,468],[95.12,1099],[44.2,13770],[96.23,530],[96.74,524],[96.48,804],[80.47,3279],[95.36,560],[93.06,1150],[96.18,774],[96.04,553],[92.28,1267],[93.42,1868],[96.93,535],[82.26,6687],[92.19,1419],[95.7,593],[96.09,419],[91.54,2827],[79.6,7172],[91.83,1125],[96.61,753],[95.71,932],[91.92,1402],[94.69,781],[94.29,1315],[93.35,829],[93.94,901],[91.65,1266],[94.46,722],[92.41,2612],[93.5,1203],[96.29,537],[87.23,1814],[92.86,1059],[96.07,542],[92.52,1017],[85.48,1683],[96.87,415],[92.97,1117],[88.41,1336],[97.95,365],[86.17,1647],[92.66,1204],[96.1,497],[93.5,1074],[90.49,1171],[96.93,392],[89.05,1689],[90.89,1255],[86.8,1647],[94.08,957],[93.04,901],[85.32,2051],[86.91,2026],[77.48,4279],[93.38,1306],[95.6,727],[95.09,818],[88.26,2543],[81.01,4056],[76.89,6560],[95.86,689],[93.08,2716],[94.75,4066],[58.13,9923],[92.78,1458],[94.04,767],[92.67,1198],[75.59,4291],[93.54,996],[94.09,784],[93.95,910],[95.66,631],[91.69,1330],[92.11,1353],[94.51,864],[91.76,1121],[96.22,875],[95.53,1195],[72.97,11763],[77.23,6669],[85.66,2854],[75.33,3531],[68.72,6381],[75.95,4060],[69.51,17404],[83.65,2898],[84.24,3326],[92.96,1161],[86.33,2391],[85.58,2101],[84.97,2752],[87.77,1287],[95.48,590],[94.44,737],[88.09,2078],[95,708],[92.96,934],[88.56,1825],[79.94,5978],[90.92,1390],[86.35,2503],[59.94,5644],[77.87,5283],[95,828],[88.67,2228],[91.84,1263],[92.12,2538],[82.38,2744],[80.78,2881],[85.21,2841],[89.64,2040],[67.16,7522],[89.23,1855],[87.17,2046],[89.23,1530],[91.92,1737],[78.46,2604],[90,1239],[91.53,1772],[82.16,3670],[87.95,1856],[78.71,3267],[66.19,6497],[90.55,1596],[92.38,1041],[85.71,5653],[68.13,5381],[87.4,2743],[85.44,2437],[86.61,2061],[84.48,1856],[57.95,6897],[84.67,1731],[83.51,2273],[73.47,4852],[58.76,8884],[87.52,2054],[79.73,4453],[70.62,4128],[92.59,1877],[79.64,3481],[89.53,1776],[91.07,1204],[87.05,8023],[68.43,26493],[68.93,8741],[92.61,1013],[84.58,3923],[84.31,2492],[76.97,4594],[83.38,3142],[87.2,2532],[77.27,16394],[88.75,1615],[55.87,10265],[55.22,7853],[71.64,5260],[67.13,9249],[24.88,19523],[80.9,3981],[88.13,1916],[89.45,1496],[92.76,1280],[72.83,7144],[91.05,1507],[67.51,5960],[89.13,1872],[77.59,4708],[86.83,2768],[48.44,14337],[91.4,1449],[85.51,2987],[92.28,1148],[89.49,1563],[84.59,3650],[69.33,6892],[75.65,6650],[71.45,7024],[91.8,1154],[95.35,846],[91.38,1774],[76.11,4701],[80.74,21021],[51.11,8283],[93.82,1094],[77.75,4828],[83.29,3402],[85.07,2722],[85.14,3208],[91.89,1324],[66.71,10716],[82.96,2718],[78.63,5503],[87.53,2338],[63.34,8038],[53.81,10254],[89.54,1863],[74.68,4731],[83.02,4009],[76,4063],[51.01,13039],[89.3,1627],[81.85,3987],[75.15,3920],[63.1,10242],[77.8,7694],[79.21,5589],[93.94,1052],[89.49,1913],[73.48,9617],[81.21,2879],[67.81,7911],[91.4,1670],[63.4,7875],[82.63,17295],[87.07,2378],[84.77,2805],[73.7,5940],[88.85,2360],[87.82,2031],[77.74,5560],[81.95,2914],[79.85,3703],[74.19,5444],[74.37,3165],[67.69,11140],[75.11,4826],[68.18,6289],[68.74,13642],[83.19,3390],[74.73,6877],[88.72,1671],[84.87,2326],[84.79,2292],[88.72,1526],[73.61,4111],[85.37,2415],[77.59,4200],[92.1,1088],[86.67,1950],[89.06,1636],[92.19,1124],[90.55,1595],[88.01,2462],[83.66,3716],[81.08,4177],[80.26,4314],[91.56,1479],[76.56,6617],[72.33,6731],[77.65,4952],[81.8,4371],[85.7,3011],[65.83,9257],[84.07,3032],[90.17,1423],[72.63,10601],[91.88,1186],[77.42,6321],[91.54,1502],[78.74,4672],[85.27,2024],[58.81,13665],[57.99,7013],[83.5,2625],[77.15,4621],[41.58,29297],[76.33,14950],[85.42,2401],[58.28,11124],[69.39,4218],[81.93,3494],[68.37,7534],[85.45,2785],[91.47,1205],[93.06,1489],[54.01,12575],[85.95,2729],[91.05,1435],[85.57,5722],[90.13,1515],[85.33,1987],[81.23,4217],[70.83,4548],[80.8,3741],[88.98,1556],[83.13,2263],[87.45,2086],[80.25,3106],[78.45,5141],[81.04,2517],[75.1,3437],[86.3,2850],[73.67,5716],[73.55,5914],[91.57,1360],[89,1726],[83.3,2571],[82.66,3486],[83.11,3354],[92.98,1167],[91.25,1213],[87.49,2919],[78.13,4838],[74.21,5188],[74.47,5240],[71.98,4942],[87.9,2053],[71.11,7944],[88.67,1785],[91.88,1684],[80.8,5066],[55.1,9617],[83.76,3049],[82.25,3203],[84.67,3427],[92.36,1193],[89.96,1792],[87.92,1723],[74.63,7103],[78.83,3564],[78.28,4753],[83.58,4720],[82.72,2699],[63.86,8356],[86.3,2190],[88.57,1654],[83.64,2969],[83.49,3811],[85.94,2527],[90.85,1257],[85.95,2218],[91.61,1223],[69.18,5569],[76,5672],[77.85,7113],[85.73,1751],[91.54,1438],[64.57,10607],[66.9,5913],[87.56,1735],[78.57,4206],[89.1,2090],[82.64,4416],[92.91,1993],[68.92,10936],[85.1,2681],[75.34,5041],[73.18,8531],[89.23,1561],[93.38,2029],[80.18,3647],[72.01,4737],[85.66,2625],[90.86,1249],[67.03,12448],[90.09,1889],[61.61,9537],[93.45,846],[78.92,3970],[93.35,2863],[78.39,17267],[77.54,8355],[91.83,1446],[89.91,1674],[87.79,1704],[89.75,2037],[63.29,8045],[84.07,2456],[87.58,2091],[93.31,962],[89.78,2121],[88.2,1707],[87.73,1744],[87.89,2171],[88.31,2124],[93.06,1306],[92.76,1473],[91.6,1376],[91.61,1162],[88.37,1529],[89.89,1358],[91.53,1341],[94.39,745],[94.15,1134],[90.1,1530],[88.22,6921],[94.07,1035],[95.08,583],[81.8,2267],[93.75,851],[92.59,1178],[95.46,874],[95.46,780],[91.52,1151],[91.41,1080],[93.15,2478],[84.01,4048],[77.66,3654],[90.19,2400],[88.69,1826],[83.86,2424],[85.97,3221],[81.72,10118],[89.06,1903],[94.49,1499],[94.38,1192],[90.67,1480],[92.71,1047],[92.41,1347],[89.79,1346],[87.57,2671],[87.32,2048],[84.61,3360],[84.23,3305],[76.81,3538],[92.57,985],[89.81,1912],[89,1296],[93.46,1529],[88.9,1427],[90.72,1461],[87.29,1914],[87.22,1643],[88.65,2115],[91.79,1095],[89.62,1438],[92.68,1007],[92.99,1064],[93.99,1127],[91.68,1166],[93.73,912],[89.4,1503],[89.22,1481],[90.45,2630],[88.79,1517],[97.26,413],[86.26,1905],[90.81,1151],[89.15,1449],[94.37,1451],[92.53,1052],[91.74,1295],[91.88,1028],[79.86,2836],[93.77,963],[82.07,2847],[90.15,1484],[95.42,762],[84.94,2423],[93.05,1247],[89.29,1528],[90.92,1210],[93.5,959],[86.15,2010],[87.61,1638],[92.61,1127],[93.85,974],[90.45,2079],[85.02,2869],[83.68,4430],[88.73,1532],[93.48,2402],[83.07,2919],[70.23,5058],[54.82,6423],[79.43,2582],[85.5,1932],[96.74,593],[76.51,7733],[94.86,876],[94.93,1426],[84.84,2100],[86.47,1845],[85.22,2959],[80.94,2450],[96.78,965],[91,1376],[76.98,3037],[91.18,1976],[82.79,1950],[53.72,6144],[85.69,2193],[81.16,4196],[80.53,3778],[78.84,3896],[87.34,1697],[88.13,1484],[83.39,2301],[75.88,3992],[83.75,2144],[57.95,8866],[85.65,1877],[88.17,2474],[94.62,703],[77.25,2687],[88.27,2098],[51.04,19272],[91.96,1275],[86.11,2277],[90.06,2110],[91.98,1275],[94.5,823],[78.51,2897],[91.39,1380],[89.55,2047],[71.34,3804],[93.67,1079],[85.33,1962],[89.21,2113],[72.58,3933],[93.11,886],[86.97,2065],[86.99,2661],[92.89,1074],[71.73,4602],[93.19,1077],[91.02,1319],[93.32,1398],[88.7,2029],[88.7,1651],[86.05,2409],[91.95,1739],[77.76,3821],[90.19,2089],[79.83,4403],[86.31,2257],[69.89,6564],[80.17,2321],[78.96,8235],[86.88,2436],[93.44,1900],[76.67,3154],[74.43,11067],[87.43,3228],[85.61,4606],[84.01,1816],[95.97,613],[81.32,2475],[76.19,3297],[89.27,1504],[78.67,2965],[77.98,3334],[79.44,6968],[65.01,6188],[74.9,4791],[60.64,7818],[66.11,6604],[60.91,8850],[57.81,8385],[23.86,19433],[77.05,4825],[93.53,1008],[66.34,6094],[73.34,4895],[95.95,1495],[96.07,627],[90.41,1390],[94.79,776],[88.03,1698],[91.49,1262],[72.02,8364],[92.94,1335],[90.51,1615],[93.06,1376],[63.73,6886],[95.96,574],[88.23,1854],[61.64,5339],[81.48,3886],[87.21,2063],[86.1,1752],[93.55,3246],[90.12,1432],[92.71,1892],[87.02,3036],[84.76,1994],[90.55,1098],[85.38,2508],[91.96,1664],[87.02,1925],[78.46,12016],[88.53,5968],[91.9,2198],[88.76,2263],[79.02,3770],[73.24,10952],[86.89,1824],[90.04,1537],[79.28,4839],[90.06,1973],[86.78,4309],[89.4,1628],[86.97,1714],[70.02,10811],[96.69,718],[85.09,2992],[89.85,1622],[58.08,5423],[77.59,6655],[69.4,7883],[87.25,1773],[88.32,1761],[77.5,2737],[89.59,1395],[95.89,541],[91.26,1161],[90.98,1100],[93.13,875],[86.59,2316],[92.44,1049],[83.48,2377],[93.28,1104],[92.51,867],[94.08,1123],[58.3,9837],[74.29,3493],[93.04,1423],[93.3,1040],[64.48,4783],[91.05,2141],[92.59,1000],[92.22,2693],[90.55,1844],[87.03,3610],[29.56,14267],[83.33,2463],[56.69,8034],[85.91,1699],[93.23,1251],[94.39,1124],[89.94,1663],[78.63,4287],[78.55,2575],[74.01,4281],[82.17,3230],[80.97,2582],[76.3,3599],[85.58,2833],[76.81,5533],[86.31,1665],[79.95,4124],[86.67,5245],[79.11,2811],[95.01,1141],[86.52,3653],[96.53,469],[94.58,737],[56.04,14834],[93.63,6465],[83.19,3692],[88.59,2065],[93.28,908],[77.03,4650],[67.11,8403],[94.94,810],[90.59,1680],[89.83,1546],[89.42,2022],[87.9,2568],[91.48,1800],[91.78,1067],[95.24,995],[94.81,852],[76.48,4147],[89.09,1734],[89.59,1825],[93.59,908],[95.19,724],[92.35,1137],[94.2,882],[87.25,2883],[92.36,997],[82.81,3579],[92.89,1058],[70.55,7040],[75.28,5059],[90.6,1562],[93.87,840],[88.59,2006],[76.86,4418],[90.53,2867],[92.63,1218],[82.16,3543],[85.04,1893],[82.11,3579],[93.59,982],[88.51,1443],[71.59,5165],[89.83,2171],[93.66,1241],[92.91,956],[87.46,2055],[91.67,1061],[93.34,1081],[96.36,472],[92.85,966],[88.09,1671],[61.37,11777],[92.22,1117],[96.34,448],[96.39,1111],[83.68,16447],[94.6,796],[93.42,1013],[84.79,2127],[88.58,1566],[88.45,4384],[91.19,1334],[91.67,1576],[87.9,2597],[92.53,1231],[90.29,1853],[96.7,448],[79.96,8166],[92.76,1395],[77.56,3532],[85,2827],[67.18,10883],[73.7,6370],[91.44,1942],[89.26,1631],[91.47,1393],[82.54,6425],[87.3,2412],[85.82,2548],[92.12,1694],[94.1,924],[80.72,3400],[85.73,3155],[95.15,850],[83.44,2630],[90.8,2257],[88.69,1887],[91.04,1904],[93.79,1885],[92.37,942],[91.36,1486],[91.62,1387],[86.59,5118],[94.69,646],[80.15,4595],[81.87,4641],[75.51,7168],[90.65,3096],[93.54,1324],[93.97,899],[93.3,975],[93.64,1810],[80.6,3937],[91.7,1236],[88.46,2128],[95.94,559],[86.91,5382],[84.19,2568],[97.87,344],[84.31,2717],[88.44,2049],[75.2,13762],[88.96,3101],[92.62,1258],[81.12,3172],[94.91,789],[89.98,1412],[66.61,5675],[81.87,2985],[92.52,1101],[90.14,1973],[90.35,2271],[80.42,2498],[89.95,3582],[87.36,2467],[94.84,1195],[82.01,3495],[92.46,1281],[92.22,1605],[91.93,2549],[67.46,3702],[97.15,431],[58.12,14702],[92.68,2376],[69.89,6594],[86.54,2542],[89.97,2665],[87.45,2551],[92.35,1495],[96.52,642],[76.3,5521],[69.04,4797],[94.93,789],[87.35,3427],[89.03,1591],[85.11,3053],[92.96,940],[96.18,599],[87,5436],[94.67,662],[85.16,2176],[93.95,723],[90.22,1605],[88.65,4146],[95.32,934],[87.34,1716],[81.56,2445],[52.83,15905],[95.28,757],[86.23,3691],[88.35,2255],[85.01,3136],[93.13,1838],[76.03,7420],[78,4845],[64.82,4811],[90.07,1483],[73.33,7777],[93.83,1780],[89.58,1763],[90.02,4502],[88.32,3108],[91.84,1747],[84.99,2999],[94.05,866],[88.73,1876],[78.64,3241],[95.06,672],[94.23,682],[95.63,556],[87.08,2389],[94.38,879],[87.74,4372],[69.69,3401],[93.04,1622],[86.34,4337],[84.9,3160],[90.21,1308],[89.11,2854],[67.16,14377],[62.91,7361],[88.26,2493],[88.62,2667],[81.4,3501],[88.02,5331],[82.22,6377],[92.58,1776],[85.25,1922],[95.24,731],[79.56,2815],[95.84,520],[92.2,1152],[94.19,814],[83.33,7514],[74.2,5925],[87.86,3138],[71.59,4199],[95.32,619],[94.49,865],[95.21,806],[78.95,4044],[90.9,1707],[77.39,21519],[91.7,1075],[93.69,944],[56.86,8091],[92.2,1053],[90.6,1643],[94.54,659],[95.49,639],[90.27,1587],[94.13,845],[85.54,2229],[80.94,4331],[87.82,1905],[93.82,1682],[85.62,2619],[85.87,3158],[87.18,3532],[89.44,1446],[83.75,2586],[80.29,4426],[79.44,4009],[81.57,3494],[77.49,2880],[95.46,694],[92.29,1614],[96.98,461],[81.33,2350],[79.82,4914],[85.89,2189],[96.1,511],[90.61,2930],[94.99,929],[87.88,1460],[90.93,1834],[77.09,4851],[82.73,3011],[88.16,1923],[81,3035],[91.04,1502],[49.76,22690],[96.41,680],[87.84,2961],[88.56,3311],[95.3,1114],[91.72,1233],[95.03,751],[78.41,6010],[95.26,745],[64.31,8373],[86.85,3903],[90.71,2844],[70.37,5116],[55.56,9776],[78.14,4263],[94.81,707],[92.97,935],[89.44,1368],[80.68,2792],[91.23,3998],[79.23,3679],[79.78,6208],[86.77,3705],[91.83,1405],[92.24,1053],[87.74,1875],[80.39,3010],[90.52,2027],[89.89,1686],[97.1,475],[97.62,422],[74.1,7470],[93.4,958],[96.31,794],[78.38,4390],[76.95,8098],[92.24,2719],[79.66,3802],[89.2,3460],[77.79,4488],[96.16,547],[73.93,5263],[75.04,4856],[93.81,1134],[82.48,7555],[89.65,1601],[79.31,3329],[94.99,927],[94.88,750],[96.1,760],[90.43,2158],[85.88,3165],[82.92,3476],[94.53,759],[92.77,1290],[72.32,3986],[93.99,2756],[90.75,2066],[89.53,3616],[92.79,1189],[92.19,1754],[83.98,5089],[71.22,6578],[92.31,1008],[95.49,630],[73.56,3859],[94.77,1329],[95.82,705],[85.14,3160],[81.27,8135],[83.03,3921],[94.73,840],[84.72,3427],[90.29,1335],[94.8,937],[89.88,3649],[89.38,1934],[88.58,1437],[95.45,663],[90.46,1089],[76.48,4990],[88.45,4936],[87.38,2573],[94.81,780],[94.83,1001],[93.82,982],[92.9,1611],[54.78,9819],[95.99,579],[82.06,3720],[84.99,2488],[61.8,5439],[90.23,2021],[93.03,1524],[94.51,1477],[92.83,1371],[77.69,6555],[84.7,1998],[92.63,900],[88.56,2345],[80.58,2963],[82.43,2163],[86.22,2296],[95.99,508],[95.93,725],[89.56,1183],[94.51,755],[89.59,1732],[94.55,648],[89.75,1307],[94.34,942],[93.46,1158],[94.2,1152],[87.49,3030],[90.24,1750],[94.19,982],[96.42,662],[95.54,1952],[92.16,1070],[65.99,5947],[95.64,554],[93.02,969],[91.98,1080],[90.88,1997],[94.45,668],[91.77,1501],[73.53,5159],[68.38,17906],[83.21,2203],[87.04,1734],[93.33,1291],[85.68,6163],[89.15,2580],[89.63,3393],[93.99,776],[88.84,2359],[71.46,3536],[95.42,625],[84.33,2677],[91.2,1167],[92.17,1488],[92.29,1215],[95.82,1191],[95.37,555],[95.32,773],[88.52,1864],[72.63,4955],[91.96,1439],[91.36,1081],[94.95,715],[92.76,1525],[85.58,3906],[94.5,1342],[90.51,1405],[94.56,846],[89.01,1759],[92.63,1474],[67.52,5224],[91.07,1769],[95.07,664],[94.01,959],[90.35,2197],[92.66,855],[91.48,1146],[82.65,2644],[79.7,2546],[47.55,17219],[80.41,3845],[82.14,2637],[69.04,5747],[85.53,2063],[81.59,2755],[75.34,4764],[94.59,1360],[88.15,2395],[94.43,881],[95.41,676],[88.6,1827],[94.94,662],[87.26,1396],[92.7,958],[90.25,2319],[91.63,1443],[92.16,2142],[95.94,512],[86.74,2650],[72.15,11007],[53.25,6376],[92.34,2523],[84.49,2305],[96.08,504],[78.78,5159],[93.92,1179],[89.66,1647],[92.65,1029],[85.02,2059],[87.6,1664],[86.06,2755],[46.86,11886],[95.46,609],[93.63,872],[84.62,2780],[65.59,7310],[94.73,885],[92.88,928],[94.45,699],[69.55,8220],[77.14,4426],[89.49,1629],[88.45,1724],[52.83,6736],[92.82,1834],[91.36,2476],[80.55,3299],[86.88,2112],[87.31,1926],[94.77,1992],[56.3,10219],[94.02,929],[91.8,1126],[94.06,1369],[93.26,1526],[80.71,2555],[95.5,743],[89.8,2080],[81.47,3764],[90.5,1652],[89.28,1496],[94.33,812],[85.08,1819],[93.64,858],[92.9,1135],[85.09,3339],[78.68,3761],[93.42,1211],[83.36,2128],[95.11,939],[89.64,2224],[70.08,7329],[90,2348],[94.2,789],[94.09,764],[87.22,2656],[73.12,3481],[93.94,927],[81.91,9929],[87.04,2084],[92,1038],[71.75,3818],[95.94,567],[86.81,1635],[88.75,1384],[88.04,1929],[39.2,7597],[88.59,6262],[87.14,2216],[97.22,325],[79.53,2906],[76.9,4731],[94.4,1285],[7.77,18186],[89.36,1952],[88.03,8287],[79.85,3074],[80.78,2230],[72.38,5038],[83.29,2610],[91.7,2204],[88.58,1968],[93.99,917],[89.66,1548],[94.49,1139],[92.7,1519],[91.55,1948],[88.08,2112],[93.49,932],[96.48,483],[93.01,982],[94.73,28313],[82.8,3946],[76.35,4281],[65.55,5663],[93.49,1134],[87.25,2257],[65.96,5094],[85.21,3601],[77.23,3336],[92.34,2206],[91.14,1174],[90.31,1534],[93.61,1312],[91.09,2494],[96.63,734],[93.78,836],[91.47,1403],[86.13,4195],[94.87,788],[84.21,2875],[86.89,2618],[94.53,984],[87.61,1899],[74.61,4836],[78.35,3753],[92.88,1120],[90.95,1856],[92.33,1319],[95.68,590],[85.89,2309],[54.81,12162],[89.24,1341],[88.03,1596],[77.08,2911],[80.85,4193],[69.52,5056],[78.77,3267],[91.31,1291],[86.6,1714],[97.3,1117],[94.71,909],[91.66,1174],[83.19,2227],[91.12,1379],[94.51,723],[89.63,1856],[89,1392],[93.03,1386],[96.75,447],[85.39,1530],[93.93,917],[80.74,4295],[92.08,2279],[85.51,1753],[93.92,985],[86.79,2254],[94.97,937],[86.48,1786],[75.04,3618],[92.74,3015],[87.39,1634],[63.18,4174],[94.81,847],[86.33,2056],[87.69,2135],[90.77,2113],[64.26,7410],[93.8,1182],[71.63,3612],[91.76,1127],[80.14,2944],[94.67,955],[91.3,1388],[95.33,924],[72.9,15560],[84.86,2104],[76.21,3552],[78.74,4435],[75.82,3572],[93.13,1005],[96.46,690],[78.53,3327],[77.88,3898],[94.06,869],[88.83,1714],[91.94,1420],[92.88,3430],[94.03,820],[95.39,655],[92.53,1535],[88.8,1524],[82.36,2279],[93.56,814],[84.57,2344],[81.02,2913],[88.75,2035],[96.39,829],[91.14,1285],[84.58,2096],[92.9,1299],[91.19,1272],[93.95,1505],[94.18,1745],[87.3,1714],[82.69,3825],[72.6,16373],[57.88,7948],[93.23,1105],[74.73,3192],[90.89,1973],[92.28,3400],[89.38,2264],[90.34,2639],[93.29,872],[86.23,2430],[90.74,4456],[91.92,1446],[73.5,3912],[90.99,1899],[87.67,1628],[94.83,802],[89.1,1416],[83.94,3609],[59.07,7075],[90.14,1456],[89.17,2181],[91.45,1600],[81.46,3015],[91.77,1577],[92.46,970],[88.18,3220],[91.42,1258],[68.94,8209],[81.9,3109],[88.57,2032],[92.47,9689],[85.44,5220],[94.33,1405],[73.85,7358],[42.46,10263],[88.57,2260],[82.67,2384],[78.55,4141],[94.09,804],[72.26,4087],[92.06,1008],[70.74,5841],[92.03,1384],[89.08,1900],[87.66,1718],[66.66,4368],[90.98,1931],[93.98,1203],[93.14,1036],[90.6,1183],[74.59,7957],[85.29,3691],[87.69,1996],[56.04,7409],[87.23,3553],[91.4,1412],[86.14,1992],[86.38,2252],[95.84,1412],[94.04,1005],[94.15,1037],[86.61,1873],[86.97,1857],[93,1324],[64.85,6748],[83.24,2490],[89.27,1454],[85.56,2656],[94.58,1336],[82.79,5271],[94.52,1370],[84.12,3262],[85.36,1709],[82.02,4141],[86.72,2410],[95.36,813],[96.17,515],[81.88,8452],[95.36,553],[87.71,1713],[92.91,900],[84.65,2237],[94.77,975],[88.63,2144],[92.83,1011],[95.98,706],[94.24,1179],[87.46,7763],[83.97,3193],[91.97,2209],[84.46,2659],[94.7,686],[91.74,1570],[90.4,2001],[76.2,4255],[91.38,1145],[89.46,2320],[92.55,1560],[92.47,1823],[90.44,1365],[93.66,870],[91.78,1080],[67.22,10109],[93.89,749],[81.4,2476],[89.92,1272],[75.76,3369],[85.23,3044],[92.57,982],[93.78,834],[90.66,1240],[81.58,2898],[85.03,3796],[90.41,1397],[82.1,3901],[65.57,4677],[84.06,2102],[85.07,3008],[93.43,1055],[24.45,13394],[90.58,1571],[83.95,2155],[86.91,2702],[84.29,2822],[92.37,1015],[91.23,1323],[61.21,5275],[92.74,1925],[75.63,5094],[63.15,6483],[86.74,1981],[92.15,1297],[93.91,826],[86.93,3056],[74.28,3344],[82.43,3489],[88.17,2032],[88.53,1824],[73.98,6286],[86.25,2471],[91.54,1346],[76.44,3877],[65.58,5414],[93.47,1349],[90.62,1376],[90.12,2245],[81.52,2993],[71.79,4039],[90.69,1335],[81.52,6084],[91.99,1262],[68.75,4886],[89.33,1837],[81.28,6716],[91.65,1726],[88.82,2241],[90.35,2279],[94.89,919],[92.53,887],[90.91,2426],[65.68,7350],[92.19,971],[92.64,1115],[33.03,17207],[94.57,931],[65.18,4850],[90.65,2279],[89.35,2084],[91.93,3712],[81.05,2440],[82.59,3095],[95.45,631],[94.17,962],[82.33,3287],[80.49,4101],[78.68,2753],[90.3,1581],[90.08,1350],[96.5,623],[92.6,4630],[82.81,2793],[96.12,594],[90.48,1760],[91.57,1859],[70.38,6943],[91.77,1621],[92.74,1031],[80.25,3022],[92.88,1468],[87.68,1889],[87.83,1792],[71.76,6810],[90.42,1787],[92.22,1163],[87.02,2185],[92.24,1241],[91.54,1640],[62.32,9183],[71.64,4895],[72.46,4047],[79.19,2896],[81.87,4949],[83.22,4420],[94.07,1118],[96.21,573],[88.56,2507],[93.22,1593],[91.41,1851],[77.47,3181],[89.03,1570],[87.94,1637],[81.31,3201],[86.42,2079],[95.29,778],[88.47,2677],[90.77,1270],[84.24,10792],[93.99,1022],[89.15,1777],[61.55,7411],[90.63,1615],[66.61,5191],[88.43,2197],[90.35,1191],[71.75,4260],[93.81,947],[90.36,1312],[77.25,3015],[89.87,1465],[93.68,1093],[86.66,2407],[86.22,2447],[95.78,687],[69.75,4833],[94.65,696],[93.86,1480],[92.83,979],[84.81,1833],[93.01,1432],[85.79,3764],[91.87,2988],[84.47,2114],[84.21,2038],[89,1586],[91.77,1236],[92.65,1064],[85.93,2057],[82.82,4542],[72.53,5157],[71.47,4715],[81.17,3336],[86.52,1712],[81.89,3165],[85.88,2389],[90.71,1379],[85.21,3239],[91.44,1244],[90.26,1224],[56.88,6637],[93.59,2356],[88.65,2286],[84.64,2329],[87.53,2713],[86.8,1740],[87.76,1402],[93.66,770],[94.2,970],[56.85,6157],[69.82,6038],[87.27,1749],[91.7,2538],[20.24,14848],[86.07,2135],[77.74,2776],[97.19,450],[90.15,1438],[85.93,3434],[88.69,2174],[80.47,2525],[74.39,5607],[92.81,1627],[94.07,838],[89.49,1478],[90.81,1176],[92.39,1394],[62.83,4849],[90.08,1585],[74.16,4008],[97.84,361],[85,2335],[93.77,1083],[93.94,827],[91.46,1621],[88.96,1385],[90.04,1226],[93.22,879],[92.35,2593],[89.12,2047],[95.36,602],[45.34,6461],[60.7,6031],[85.47,2434],[88.82,1456],[94.25,1264],[62.29,5837],[83.8,4186],[86.73,2152],[90.78,1344],[93.91,790],[90.01,1558],[82.21,2832],[80.12,2829],[79.53,4345],[91.7,1417],[92.68,2174],[90.7,1185],[96.25,549],[90.32,2220],[97.11,440],[91,1471],[93.45,890],[87.15,1956],[89.5,1626],[89.93,1512],[89.55,1873],[95.4,1346],[90.62,1325],[91.65,1136],[94.77,645],[77.13,4744],[83.56,2057],[90.2,1511],[90.63,3220],[85.52,1921],[87.68,2284],[91.49,1455],[51.51,8894],[88.78,3875],[85.35,2079],[85.28,1926],[86.38,2432],[94.89,875],[90.63,1301],[85.54,1883],[94.15,907],[90.1,1717],[92.48,1282],[97.9,272],[39.1,12426],[94.11,822],[84.37,2363],[93.22,893],[92.18,1258],[82.27,2404],[87.08,2254],[92.15,1418],[94.84,910],[91.82,1620],[85.78,2539],[82.93,2643],[89.84,1841],[95.3,913],[95.49,718],[92.79,1064],[81.96,2456],[91.67,1348],[86.06,1666],[95,952],[86.03,5764],[93.38,1561],[83.69,2038],[94.72,1049],[76.67,6138],[85.44,2947],[82.2,2440],[89.64,2095],[94.65,1230],[84.6,3180],[85.34,1870],[89.43,3861],[84,4294],[92.27,1931],[91.9,1523],[95.64,653],[93.21,851],[92.35,996],[96.5,589],[90.56,2060],[70.69,4592],[83.43,2134],[86.34,4036],[86.89,2147],[93.48,2436],[95.82,763],[81.67,2479],[91.19,2289],[91.75,1166],[93.16,1141],[92.59,1412],[93.07,1470],[91.58,1230],[93.31,1176],[91.97,1076],[91.54,1593],[87.03,2800],[89.51,3104],[93.58,1018],[92.63,1634],[83.52,2459],[91.37,1112],[87.62,2260],[95.58,1614],[55.01,6636],[88.73,1482],[84.4,2106],[95.62,553],[94.17,770],[69.93,4540],[92.83,1353],[93.72,764],[46.69,9795],[94.64,827],[92.76,1542],[82.28,2207],[90.45,1584],[89.45,2726],[87.71,1952],[94.53,861],[87.16,2404],[92.62,1355],[94.92,874],[91.31,1407],[96.18,716],[94.95,788],[94.34,1159],[96.42,1213],[87.38,2336],[74.86,4331],[92.86,1425],[94.56,806],[97.56,354],[90.34,2522],[84.56,3439],[94.54,1006],[95.74,629],[91.26,1697],[41.32,12022],[61.97,6392],[71.73,3854],[78.15,3236],[76.41,4160],[74.61,3148],[95.05,652],[54.5,6520],[93.03,938],[93.34,1100],[51.75,9649],[91.91,1060],[66.48,6139],[81.22,2047],[92.89,1465],[93.11,2354],[89.57,1726],[86.5,3900],[90.23,1724],[93.18,1339],[96.01,596],[91.53,1085],[64.8,6876],[91.94,1494],[85.64,1782],[87.09,2111],[96.44,624],[85.59,6360],[76.34,7731],[91.5,1191],[41.21,16144],[9.97,27445],[90.68,1649],[81.54,6567],[62.47,6857],[94.4,1035],[92.08,1299],[89.53,1383],[89.33,1983],[92.63,1342],[92.18,1067],[94.89,1019],[93.91,1329],[92.39,2529],[96.65,586],[91.18,1992],[86.82,4292],[94.06,1226],[93.63,1117],[83.86,2081],[88.29,2362],[50.47,8829],[87.92,1416],[91.14,1103],[82.83,2073],[92.36,846],[91.6,1488],[76.48,3424],[78.27,2812],[67.39,5181],[88.39,1659],[77.66,3544],[94.74,675],[21.6,17919],[88.98,2634],[89.51,1623],[65.71,5894],[87.51,2084],[89.44,1773],[34.66,14232],[91.73,1324],[90.85,1507],[75.64,5270],[92.92,1225],[61.42,6940],[91.59,1481],[89.69,1636],[74.9,4200],[89.22,3153],[85.05,3188],[92.59,1945],[94.35,933],[86.46,3164],[83.1,2039],[83.98,3100],[90.05,1252],[84.84,2245],[93.72,2879],[93.09,1456],[88.62,2237],[85.65,1488],[74.95,5755],[92.16,1647],[87.65,2216],[92.05,1425],[65.49,5340],[92.95,1397],[89.27,1660],[58.81,7377],[79.48,3859],[95.16,921],[84.57,3095],[52.66,7375],[87.57,1765],[82.21,2738],[80.45,4129],[77.37,2642],[86.57,1944],[96.04,833],[92.83,1511],[93.59,1306],[88.55,1524],[55.38,5253],[7.14,18379],[74.37,3175],[90.45,956],[88.86,1391],[89.44,2346],[90.05,1725],[85.89,2143],[91.67,2921],[84.2,2908],[63.81,6179],[90.18,2017],[78.4,4472],[92.14,1157],[92.92,1299],[87.51,1831],[82.22,2832],[91.81,1196],[96.56,449],[84.84,2646],[94.38,973],[87.2,2930],[92.02,1394],[60.17,5424],[91.89,1317],[93.22,1572],[80.1,15273],[83.55,4569],[90.97,1226],[81.64,2247],[92.42,1850],[79.61,2868],[77.15,3579],[96.52,550],[91.57,1456],[88.51,2290],[86.82,2205],[95,3965],[92.13,1266],[32.16,13930],[91.45,1626],[72.9,4568],[87.63,2501],[93.44,1713],[92.78,1433],[82.42,2159],[96.1,931],[97.1,475],[90.41,3085],[96.05,698],[80.96,4184],[95.64,1095],[86.57,2887],[86.12,2608],[90.09,7557],[29.69,15098],[85.81,8243],[91.07,1648],[44.6,9528],[86.43,2593],[95.41,542],[93.86,1266],[84.94,2514],[89.67,1915],[91.86,1259],[25.16,15782],[72.68,4460],[74.23,5113],[62.83,9140],[91.22,1360],[48.25,8171],[90.45,1347],[83.36,4507],[67.74,4720],[69.24,4498],[92.13,1389],[87.61,2170],[32.77,14372],[87,2037],[90.11,1126],[57.94,14374],[16.81,12262],[84.31,1963],[82.2,2452],[94.91,783],[91.54,9549],[35.95,17108],[92.48,854],[90.04,1181],[77.41,2949],[84.4,8579],[92.31,1392],[97.15,446],[95.77,643],[91.14,2261],[93.23,1405],[91.05,2924],[96.34,508],[85.69,3253],[88.84,1963],[91.9,1749],[87.96,2405],[91.44,1460],[78.16,3290],[93.08,995],[92.33,1158],[91.55,1704],[63.34,5051],[94.38,892],[87.61,4905],[85.07,1960],[88.09,1717],[90.6,1386],[88.31,6482],[91.06,1356],[78.89,4408],[90.93,2067],[85.93,2758],[73.66,3360],[80.94,3586],[91.1,1369],[91.07,8068],[46.48,8558],[94.44,1097],[90,1803],[92.89,1002],[68.04,7723],[91.54,1341],[37.63,16980],[87.13,1722],[80.06,3207],[93.36,2769],[92.74,1029],[65.04,4934],[86.23,1838],[83.13,3088],[91.03,2429],[91.46,1593],[92.61,1607],[92.95,1619],[91.81,1353],[91.32,1526],[48.06,13365],[89.65,5376],[80.74,4516],[85.41,2468],[58.54,6187],[91.42,1378],[90.28,1352],[95.11,771],[87.16,2302],[75.18,7294],[74.51,3274],[90.6,1896],[91.6,1657],[64.07,4583],[88.55,1589],[89.32,2667],[74.23,5234],[61.07,5413],[92.68,906],[90.19,1921],[90.91,1596],[82.4,2317],[62.75,4867],[90.43,1538],[88.25,1514],[94.23,1022],[83.31,2205],[82.25,3030],[93.55,1098],[91.68,1468],[92.99,1070],[92.91,1367],[92.12,1236],[89.71,1751],[86.83,2065],[80.42,2475],[94.7,904],[88.6,1784],[92.5,1164],[90.47,1396],[87.14,2158],[76.55,6408],[90.14,1703],[74.24,4804],[71.57,7290],[92.73,1290],[90.47,1501],[82.09,3314],[85.27,2621],[84.02,4037],[89.25,1354],[88.66,1516],[88.33,1704],[89.17,1366],[83.61,2814],[87.57,2281],[89.83,1087],[88.2,1627],[90.59,1153],[89.14,1124],[91.82,2146],[92.71,2395],[89.68,1630],[62.47,6857],[93.16,1073],[90.39,1886],[87.85,1538],[92.47,1177],[92.71,1244],[84.93,2002],[84.39,4045],[89.81,1661],[92.19,1313],[94.93,1728],[47.15,10206],[94.87,990],[83.68,3838],[75.28,4460],[21.6,17919],[96.71,713],[90.84,1559],[92.83,1197],[96.1,694],[94.08,1851],[87.47,1691],[88.2,2837],[82.69,5246],[93.23,1054],[93.63,814],[91.43,1556],[89.48,1925],[85.74,2401],[92.05,1978],[81.28,2555],[92.56,1328],[92.42,1837],[92.25,1172],[73.93,3310],[88.57,1922],[95.42,696],[82.35,2209],[93.09,1034],[91.87,972],[92.37,1580],[90.58,1614],[83.34,2101],[84.92,3405],[91.4,1695],[96.66,467],[85.15,1798],[96.64,471],[50.33,8083],[82.2,2551],[79.95,3370],[93.19,891],[80.25,2644],[89.03,1687],[91.43,2173],[90.1,2764],[91.08,1185],[87.79,1418],[78.43,2671],[85.29,3264],[90.6,1214],[63.13,5016],[94.97,794],[85.61,1997],[85.82,2552],[95.29,860],[88.56,1655],[90.02,1065],[71.61,4024],[87.62,2209],[72.24,2926],[77.19,2892],[85.88,2024],[85.74,2335],[87.14,1837],[92.68,1173],[93.8,824],[95.82,577],[96.2,563],[48.5,9135],[84.89,2630],[91.61,1101],[80.24,3230],[93.2,1789],[76.44,5166],[50.8,11808],[92.19,1218],[96.23,483],[92.5,1309],[80.09,4338],[60.82,7494],[94.58,759],[92.94,920],[85.89,2660],[56.86,14388],[69.36,4402],[81.63,3519],[89.21,1832],[76.97,3080],[95.36,672],[94.16,982],[91.72,1113],[90.45,1660],[90.36,1487],[80.66,3037],[96.43,501],[91.27,1313],[88.81,1967],[75.2,3287],[50.79,9070],[92.83,1432],[91.38,1431],[94.87,925],[92,1049],[63.89,5176],[92.97,1304],[93.57,1217],[94.51,788],[90.47,1533],[94.36,762],[80.54,2457],[88.86,1352],[93.77,993],[86.32,1829],[64.33,4797],[90.7,2191],[96.26,654],[95.86,700],[51.73,7679],[89.02,1774],[85.43,1771],[90.05,1925],[94.97,672],[91.99,1628],[89.78,1573],[90.76,1069],[88.59,1538],[89,1488],[83.02,6589],[88.94,1816],[87.17,1971],[80.52,2653],[83.96,1998],[87.5,1989],[94.31,875],[78.02,3174],[92.98,3673],[93.74,3745],[88.12,2106],[86.25,1806],[94.48,803],[87.48,1715],[92.64,1270],[71.47,5161],[88.29,1360],[92.99,2184],[36.92,12166],[86.05,4083],[88.51,2383],[84.44,2812],[62.6,5831],[74.32,3277],[62.85,5464],[93.25,1201],[89.87,1828],[88.99,1471],[60.75,5233],[88.46,1690],[88.02,1765],[75.55,2885],[94.21,1506],[82.64,3690],[94.06,961],[95.55,1356],[94.4,905],[88.53,1607],[76.58,5031],[45.08,11555],[59.95,14115],[69.7,3977],[59.17,6622],[91.94,1251],[51.79,7689],[94.29,1955],[32.65,12872],[95.88,599],[30.99,17713],[89.96,2488],[79.73,3844],[55.27,7328],[93.38,1177],[85.43,2218],[96.79,667],[94.77,714],[94.22,1379],[79.36,2679],[86.78,1527],[78.5,3345],[93.61,1199],[92.89,1199],[79.37,3103],[79.59,2498],[61.67,7121],[79.27,9342],[91.27,1387],[96.6,697],[95.54,631],[89.65,1851],[91.83,1266],[90.24,1434],[91.49,2210],[95.61,980],[89.91,2026],[94.09,923],[78.23,2837],[97.24,798],[92.46,1041],[94.95,3164],[87.03,1824],[91.3,1050],[96.78,458],[96.06,831],[86.54,2212],[91.99,1347],[95.6,1680],[81.26,2366],[96.52,811],[80.82,4391],[94.33,820],[88.96,2256],[91.12,1388],[84.89,2968],[95.76,643],[42.3,10889],[96.2,845],[93.46,1116],[96.47,483],[94.7,816],[79.71,2703],[88.62,2245],[96.28,541],[90.45,1266],[91.3,1365],[63.86,5909],[93.7,1373],[91.42,1745],[88.38,2192],[93.57,1340],[93.69,1106],[82.26,2506],[83.27,2231],[88.93,2309],[96.47,714],[83.86,2561],[97.47,420],[94.55,1046],[87.07,2652],[90.79,1412],[91.05,1532],[94.37,950],[95.95,624],[93.02,1436],[92.23,1402],[84.45,2102],[93.78,993],[84.33,2163],[89.98,1433],[79.21,2815],[86.89,2052],[87.85,5017],[94.9,949],[95.13,654],[80.71,3120],[87.24,2567],[77.89,3287],[88.69,1737],[95.58,791],[86.4,7445],[93.4,1450],[90.35,1549],[92.41,1835],[90.55,2001],[94.3,1302],[95.55,766],[86.57,2439],[93.4,2042],[96.99,614],[90.69,1269],[82.57,2555],[93.56,1015],[77.86,2669],[98.12,297],[94.57,832],[94.23,821],[91.31,1239],[88.86,2177],[82.96,2420],[93.05,1137],[89.52,1922],[81.59,4288],[91.08,2830],[94.28,883],[92.18,1247],[86.15,3313],[90.27,2205],[95.88,812],[55.73,6706],[87.24,2889],[95.34,742],[91.56,6892],[94.97,1033],[92.71,1083],[93.02,1030],[27.09,15942],[94.43,1051],[74.67,6885],[80.58,2816],[91.97,2775],[73.98,3324],[69.78,8587],[91.98,2405],[94.02,3123],[84.3,2220],[94.6,931],[84.98,3254],[90.73,1998],[73.95,4219],[93.54,1207],[89.18,1726],[91.16,1230],[90.76,1422],[73.07,8582],[89.67,1720],[72.86,4673],[79.44,5626],[62.76,6319],[94.85,978],[90.71,2327],[79.41,5930],[85.67,2610],[91.51,1192],[26.95,15992],[94.3,926],[90.56,1663],[53.68,6188],[66.97,4541],[62.27,4927],[51.4,11643],[68.38,4837],[85.64,2036],[90.6,1563],[86.45,2183],[68.68,4446],[92.78,1999],[93.95,753],[87.96,2257],[97.76,277],[93.81,808],[96.37,755],[95.57,628],[71.48,11152],[87.66,4205],[92.75,946],[94.1,964],[90.73,1642],[81.35,6094],[96.59,491],[90.51,1169],[95.8,560],[94.91,704],[95.23,839],[78.53,4537],[96.06,524],[81.21,3037],[52.62,29431],[95.59,904],[91.79,1445],[90.19,1976],[90.94,1608],[95.6,967],[70.91,23647],[91.26,1469],[92.96,1103],[65.83,5484],[89.66,1611],[90.1,1320],[95.35,1041],[96.03,583],[93.93,1224],[91.98,2558],[76.24,6584],[90.54,1677],[91.5,1326],[96.86,4369],[94.51,709],[95.62,610],[93.54,1305],[87.83,2130],[94.28,1116],[80.28,2773],[93.25,3074],[92.37,1108],[95.56,608],[94.09,910],[90.77,1064],[92.54,1443],[96.26,511],[97.49,617],[88.6,1770],[95.65,733],[95.94,688],[90.48,1261],[93.57,1107],[89.25,1757],[81.32,3333],[91.46,1336],[88.84,1898],[97.47,420],[79.86,2821],[89.66,1706],[94.36,1032],[87.77,1847],[85.5,2089],[87.42,2179],[93.29,2577],[92.76,1040],[94.35,789],[93.89,1268],[91.3,1473],[81.11,4553],[87.71,1803],[93.89,1182],[72.97,4148],[92.79,1540],[96.61,586],[78.17,4722],[92.72,1124],[95.72,608],[93.14,1048],[92.77,1171],[85.65,1990],[86.01,2578],[91.4,1157],[93.28,1368],[97.29,435],[68.8,4034],[95.11,894],[75.58,3802],[94.22,1038],[96.37,694],[93.39,1129],[96.59,473],[96.5,457],[80.2,2667],[93.99,1696],[85.61,1742],[95.4,777],[93.59,1617],[89.59,1344],[83.08,3211],[94.68,1644],[89.59,1653],[95.62,603],[93.94,1265],[91.72,1295],[78.84,3278],[94.13,1104],[91.91,2245],[90.79,1171],[66.11,5721],[94.21,808],[83.6,3626],[89.24,1713],[93.41,3697],[91.23,1362],[89.31,1806],[78.13,3061],[92.39,1147],[75.12,4358],[82.04,2665],[92.15,1478],[94.52,897],[97.03,439],[58.75,7261],[88.28,1608],[88.57,1521],[95.19,726],[96.3,556],[83.65,5588],[91.01,1152],[90.06,1890],[85.49,1947],[91.14,1673],[92.83,1584],[83.47,2779],[95.96,598],[95.09,763],[91.39,1584],[93.8,982],[85.31,2361],[87.84,1843],[88.17,2180],[96.17,653],[77.62,3163],[93.13,1100],[71.4,3725],[93.78,1046],[95.63,724],[93.93,1015],[94.72,1035],[93.63,1508],[80.59,2557],[90.86,1473],[91.89,1186],[95.14,719],[95.72,593],[95.93,1209],[85.28,2239],[89.05,1841],[81.59,2837],[95.19,705],[95.21,721],[93.19,1254],[85.65,1734],[93.96,1203],[94.77,724],[79.91,2552],[92.3,1331],[93.4,1150],[63.62,5841],[79.14,2519],[95.42,765],[92.19,1277],[76.96,3385],[79.51,3694],[92.72,1162],[95.2,852],[72.86,3733],[91.82,1538],[85.78,2746],[94.64,879],[93.19,1687],[89.13,1856],[72.42,3738],[90.79,1701],[92.24,1501],[91.04,4649],[65.65,5988],[94.74,668],[77.48,3111],[95.65,577],[88.27,1530],[92.83,1073],[85.74,2056],[72.75,3590],[90.94,1548],[92.21,1411],[81.97,4706],[91.85,1176],[88.8,1596],[85.96,2067],[95.28,804],[95.25,854],[94.9,988],[92.26,1517],[92.63,1251],[94.01,1058],[92.39,1293],[58.13,8256],[84.23,5044],[91.33,1469],[81.36,2707],[89.33,1544],[93.18,1101],[92.79,1077],[61.61,5570],[96.29,825],[92.88,1107],[90.66,1137],[92.75,1148],[95.34,1350],[46.95,15513],[60.4,5130],[82.31,2685],[97.27,450],[80.03,2542],[93.66,1564],[55.67,6050],[94.71,714],[79.1,2587],[88.6,1422],[92.83,1137],[86.76,2064],[92.86,1074],[92.08,1690],[71.94,4097],[95,918],[95.91,537],[92.95,909],[92.46,1047],[74.64,3068],[81.83,2896],[93.89,2040],[68.09,4033],[78.85,4119],[72.73,4256],[91.16,1097],[92.91,1071],[94.52,909],[92.28,1223],[65.05,5205],[89.05,2405],[95.78,585],[90.36,1703],[86.41,2112],[81.72,2160],[86.12,1690],[95.35,892],[86.97,2667],[95.02,661],[86.07,1716],[82.68,5167],[94.66,1139],[74.42,4267],[95.16,990],[94.19,769],[84.52,4845],[78.55,3054],[95.37,761],[83.91,2220],[95.57,634],[89.94,1155],[92.55,1520],[90.27,1460],[87.15,1714],[80.61,3899],[70.62,7735],[68.82,6413],[86.9,2142],[89.92,1501],[89.27,2554],[94.17,1110],[86.08,1960],[95.47,603],[89.93,1927],[93.79,1207],[88.99,1757],[91.33,1258],[92.79,1213],[91.16,1661],[92.29,1071],[70.84,4515],[89.26,1451],[88.97,1873],[93.37,1111],[95.48,655],[93.95,1286],[76.79,4163],[72.37,4280],[94.44,1101],[97.72,563],[74.69,3603],[95.72,1481],[85.14,2419],[93.57,1004],[95.21,641],[60.97,6025],[80.86,12836],[87.85,2158],[96.51,820],[69.25,4480],[94.05,823],[91.04,1384],[71.38,3952],[87.84,2217],[87.61,2364],[92.96,1457],[72.71,7846],[93.72,1131],[95.12,698],[75.92,6237],[79.72,3461],[95.36,775],[92.59,1040],[84.34,6997],[93.11,1308],[90.33,1597],[89.87,1903],[96.2,773],[96.24,563],[88.7,5938],[93.82,1245],[73.99,5272],[87.38,1830],[93.46,1095],[78.54,3211],[84.03,7126],[79.47,2631],[93.08,1480],[93.83,1030],[88.27,2535],[94.96,883],[80.43,4309],[95.4,897],[92.69,992],[64.3,5336],[94.02,1595],[96.54,577],[91.26,1317],[96.46,685],[77.91,3386],[73.8,4490],[96.19,679],[80.73,4401],[94.78,985],[95.73,718],[84.92,1698],[94.55,776],[92.39,1496],[93.34,1891],[96.82,1030],[87.91,2715],[93.55,1137],[86.55,2169],[93.06,1260],[90.15,2658],[95.25,689],[91.34,2305],[88.68,2017],[81.61,3073],[89.83,4746],[92.74,1123],[88.94,1604],[84.56,2029],[84.3,2261],[92.94,1101],[92.73,1362],[90.31,1981],[76.95,2719],[47.1,10922],[78.29,3000],[96.56,435],[93.74,1404],[86.17,3410],[91.11,2426],[61.51,5139],[89.47,1294],[95.21,764],[92.56,1266],[66.47,5745],[74,3771],[92.91,1220],[85.72,2474],[91.53,1332],[93.85,1562],[87.92,1817],[93.21,850],[70.5,3647],[95.97,522],[94.51,768],[95.72,902],[87.12,2763],[95.89,738],[90.53,1591],[89.75,2959],[78.98,2178],[74.69,5190],[93.77,1075],[88.26,1435],[88.96,1654],[94.88,856],[94.04,1079],[89.39,2141],[83.89,6525],[87.57,1655],[96.66,499],[92.03,2505],[92.46,1589],[87.19,2875],[66.33,7207],[91.3,1332],[93.25,3081],[89.08,2011],[92.63,1491],[92.11,1174],[95.96,572],[92.3,1130],[90.91,1349],[94.65,2679],[91.35,1718],[91.91,1899],[93.34,1084],[69.66,5406],[94.36,864],[93.98,1548],[95.34,819],[88.26,2050],[95.48,756],[93.41,1377],[75.12,4613],[70.12,13180],[67.91,4260],[74.81,3415],[63.69,5116],[13.11,26496],[58.72,6291],[77.62,3030],[82.62,3299],[94.43,888],[94.91,750],[81.46,2839],[95.01,677],[80.16,2755],[90.5,1405],[90.4,2157],[95.92,478],[91.77,1333],[84.14,3561],[82.68,2399],[92.88,3413],[92.42,1309],[88.78,2263],[94.63,700],[89.67,1551],[85.01,10565],[46.9,9774],[90.48,1565],[93.32,1057],[89.11,1791],[91.89,1580],[94.96,886],[93.17,1136],[91.87,1210],[89.21,1782],[91.54,1225],[95.48,550],[95.96,522],[90.06,1609],[90.83,1217],[93.83,823],[92.71,1017],[91.76,1044],[93.79,875],[92.15,995],[92.02,978],[90.04,1439],[67.13,4128],[90.37,1354],[90.3,1360],[94.61,855],[91.28,1241],[91.45,1936],[92.1,1181],[92.87,879],[89.67,1514],[93.07,1134],[94.69,743],[93.87,856],[95.32,574],[93.74,813],[95.81,945],[93.3,743],[93.2,857],[93.54,996],[94.14,813],[90.21,1309],[92.5,967],[94.29,875],[88.73,1481],[84.86,3155],[88.48,9230],[94.09,859],[96.15,517],[89.08,1880],[92.23,1064],[90.14,1393],[93.95,1051],[91.49,1638],[92.48,1723],[80.06,3858],[81.64,2315],[96.72,492],[90.62,1782],[94.9,739],[91.08,1342],[91.84,1106],[95.68,1261],[89.69,1402],[91.6,1282],[88.16,1720],[91.08,1707],[96.14,511],[92.13,1382],[94.33,826],[87.72,1690],[90.48,1726],[90.47,1342],[94.66,857],[94.4,801],[91.8,1297],[93.79,994],[92.06,1020],[90.39,2759],[88.88,1885],[93.22,935],[91.13,1436],[97.12,329],[89.36,1756],[90.17,1496],[85.1,2474],[90.25,1313],[89.55,1734],[90.62,1456],[91.51,1605],[96.25,1022],[94.52,818],[92.14,1235],[86.12,1736],[81.28,2954],[89.61,1417],[93.7,898],[87.96,2448],[90.82,2033],[92.47,1081],[84.63,2351],[95.35,767],[91.63,1329],[91.24,1181],[95.11,675],[90.93,1283],[92.82,2001],[95.23,1443],[96.73,433],[88.13,1621],[94.75,679],[92.24,1016],[93.54,1033],[92.47,1312],[92.96,1110],[94.83,704],[94.06,1072],[85.9,2728],[73.37,4481],[93.04,1343],[95.22,1256],[85.34,7530],[82.91,2634],[95.49,595],[92.39,1174],[94.34,1100],[92.37,1353],[96.83,476],[94.36,841],[94.17,849],[90.36,1584],[86.92,1950],[88.83,1756],[89.04,1654],[84.93,2658],[83.34,3211],[92.81,1454],[85.24,2722],[87.75,1903],[92.85,978],[95,935],[75.35,11974],[91.76,1423],[94.13,1315],[90.6,1798],[87.24,1831],[91.35,2137],[90.95,1265],[91.09,1621],[88.38,1749],[86.69,1945],[95.59,603],[93.96,860],[93.2,1079],[94.32,741],[92.97,954],[92.68,961],[95.74,514],[92.96,1439],[90.66,1473],[91.16,1685],[90.7,1273],[90.17,1306],[94.66,681],[93.92,887],[92.52,885],[86.4,3434],[95.89,761],[84.17,1932],[87.35,2674],[85.19,3997],[66.26,5305],[96.13,489],[93.95,1654],[89.99,1545],[93.9,933],[90.16,1546],[90.63,1290],[86.12,2290],[90.45,2077],[95.73,692],[67.05,4886],[96.59,506],[87.24,2033],[94.5,843],[76.28,4141],[69.93,8659],[84.41,3400],[64.25,6850],[77.83,2898],[93.83,957],[84.83,3661],[90.9,1815],[94.33,1482],[90.65,1530],[91.07,1281],[94.69,1852],[93.24,1389],[90.38,1724],[89.81,1931],[74.62,3308],[84.08,2687],[93.42,1717],[92.37,2407],[75.1,3027],[85.73,2453],[82.76,2862],[92.75,1097],[53.83,7017],[93.39,1026],[91.15,1412],[94.24,989],[56.37,14186],[82.26,2957],[84.72,2228],[95.07,834],[94.27,1044],[92.11,1280],[96.04,451],[90.04,2116],[95.07,639],[95.64,628],[91.18,1502],[93.36,896],[89,1637],[91.56,1592],[91.9,1108],[91.31,4615],[46.32,9518],[92.49,1208],[91.12,1670],[93.81,2441],[83.14,3824],[91.98,1423],[94.16,756],[93.28,1124],[93.54,1617],[86.46,1903],[81.59,2504],[79.5,2693],[76.42,3988],[62.7,13809],[92.01,1500],[47.28,8732],[80.43,4066],[77.41,3730],[89.1,2614],[92.38,1293],[83.43,3193],[96.55,565],[97.59,414],[90.23,1122],[93.19,1316],[91.99,1337],[94.26,992],[92.82,1777],[93.87,1138],[87.63,1841],[75.31,4730],[90.68,1634],[95.65,793],[73.08,4449],[86.34,2274],[86.67,1997],[91.76,1299],[67.87,4256],[75.32,3817],[93.45,1067],[87.93,2106],[66.57,4949],[94.95,842],[93.75,1204],[91.75,1232],[85.85,2037],[92.2,1580],[93.5,886],[94.04,790],[93.75,951],[90.68,1489],[61.92,12791],[86.43,3347],[76.75,3603],[85.1,3006],[91.34,1786],[89.98,1460],[89.61,2081],[94.95,1000],[90.85,1212],[63.85,6548],[95.15,734],[92.81,1340],[95.47,933],[94.58,844],[91.22,3331],[91.91,1393],[85.03,3746],[80.69,3708],[74.93,4931],[79.51,3139],[80.49,3476],[90.07,1608],[76.22,3051],[94.52,766],[87.08,2120],[87.39,1969],[72.27,4528],[76.69,3781],[88.62,1482],[79.51,3719],[91.51,1542],[91.94,2291],[92.14,1318],[94.1,946],[94.76,707],[86.37,1955],[69.71,6008],[81.25,3452],[93.07,1360],[90.95,1845],[90.89,1529],[93.17,1145],[95.73,511],[92.62,1465],[94.83,784],[90.45,3056],[94.55,956],[91.65,1164],[75.2,4116],[93.75,1216],[89.58,1644],[86.9,3544],[83.59,2660],[92.98,891],[87.78,1633],[92.41,1125],[93.46,895],[90.17,1259],[82.28,2887],[94.88,822],[87.79,2032],[91.86,1137],[91.95,1715],[81.91,2624],[84.96,3493],[90.63,1813],[94.42,746],[87.77,1989],[89.43,1557],[89.59,1322],[94.14,616],[93.87,702],[82.96,4402],[91.13,2042],[92.64,1106],[84.41,2463],[90.47,1022],[84.17,2799],[73.37,3564],[87.95,2182],[79.12,3464],[89.06,4668],[84.75,2923],[96.7,541],[89.77,2529],[81.21,3833],[85.05,3478],[91.46,1652],[76.59,4025],[92.93,1061],[86.94,1845],[86.24,6760],[95.53,754],[96.22,558],[94.99,717],[88.11,3029],[94.33,1175],[88.06,1783],[65,14621],[76.36,6291],[87.44,2029],[90.97,1268],[73.23,3630],[93.89,1083],[83.65,2251],[92.2,1340],[77.57,3589],[93.07,1033],[87.31,3062],[94.2,866],[89.98,1822],[90.68,1501],[63.43,5048],[88.81,1776],[91.89,2368],[87.47,2724],[88.71,2106],[93.26,1067],[91.33,1561],[64.05,5808],[85.62,1818],[85.27,2518],[63.88,5900],[84.56,2388],[47.97,9555],[89.65,1278],[94.88,954],[91.84,1246],[91.82,1730],[97.22,440],[74,4583],[91.09,2547],[93.37,1092],[90.36,2181],[86.82,2606],[90.49,1706],[89.95,1520],[91.12,1285],[56.2,6655],[95.08,849],[92.17,1280],[91.45,1586],[91.41,1226],[89.55,1437],[90.92,2665],[90.81,1489],[72.42,4319],[50.26,7010],[91.4,1561],[79.32,2738],[83.51,3892],[74.22,4132],[75.47,4874],[94.56,1064],[88.48,20111],[89.31,2177],[89.85,2000],[93.18,840],[85.44,1886],[79.6,3096],[91.07,1607],[73.59,4653],[86.37,1823],[89.67,1562],[86.42,2712],[89.58,1644],[85.96,2596],[72.71,4630],[89.86,3633],[91.64,1176],[81.06,3312],[79.23,5617],[72.8,6084],[93.11,1076],[83.91,2612],[91.41,1117],[85.33,1774],[77.92,3181],[80.46,3364],[84.97,2007],[87.32,2451],[87.84,1974],[94.4,981],[87.83,2596],[59.98,5319],[95.8,676],[88.63,3480],[92.85,1012],[90.61,1929],[75.11,3408],[95.5,796],[94.37,1009],[89.94,1615],[51.99,6995],[90.26,2001],[92.21,1436],[82.94,2182],[83.75,3281],[91.37,1495],[89.24,2145],[85.51,1829],[94,1207],[90.98,1443],[90.83,1595],[93.17,1267],[91.35,1860],[88.17,2988],[90.78,1792],[92.68,1527],[85.5,3142],[81.69,3609],[82.31,3544],[93.1,1105],[91.2,1220],[85.49,3858],[85.99,2161],[90.99,1583],[42.8,18787],[91.39,1994],[93.29,929],[90.79,1561],[87.46,1861],[79.77,5854],[93.86,1101],[89.3,2557],[91.32,1791],[91.14,2710],[88.88,1648],[86.22,2915],[91.44,3218],[92.37,1700],[93.66,1259],[91.57,1171],[89.75,1485],[88.78,2033],[91.95,1313],[92.03,1349],[77.5,3890],[90.07,1501],[81.88,2792],[81.06,2536],[92.64,1268],[57.95,10008],[88.57,1623],[94.22,797],[94.23,747],[90.7,1464],[80.09,4096],[71.67,9065],[77.69,3554],[92.53,1668],[82.66,2686],[88.7,2639],[84.34,3380],[95.53,563],[94.18,756],[90.27,1551],[93.15,1075],[94.86,641],[91.09,1181],[92.29,1104],[82.57,2864],[93.66,779],[93.01,831],[91.23,1300],[82.06,2277],[77.23,3578],[93.17,1129],[93.15,956],[91.76,1978],[93.02,946],[88.66,1717],[90.94,1238],[80.36,3437],[94.01,1027],[91.65,1083],[94.82,698],[92.31,1755],[95.13,684],[89.81,1498],[94.04,797],[93.73,984],[87.97,2624],[93.49,931],[95.54,609],[96.85,423],[87.36,4350],[94.4,772],[91.21,1565],[96.29,466],[96.36,472],[95.21,795],[96.41,431],[90,1477],[93.08,1306],[89.25,1696],[92.54,4129],[93.82,720],[94.78,687],[87.52,1897],[90.65,1651],[89.63,1427],[94.73,850],[91.97,2968],[95.01,668],[96.52,503],[96.51,430],[95.85,530],[86.49,2503],[95.07,688],[96.97,597],[94.97,847],[94.95,845],[92.69,874],[93.55,922],[91.38,1151],[96.88,463],[96.04,466],[95.12,925],[89.75,1653],[97.05,430],[96.64,542],[97.43,384],[94.16,854],[96.23,465],[96.87,366],[91.93,1134],[94.01,738],[95.96,482],[90.99,1166],[96.54,431],[91.37,1385],[95.29,728],[89.85,1124],[97.1,437],[92.89,1175],[96.86,392],[94.88,895],[88.09,3078],[97.03,427],[96.78,444],[90.84,1843],[92.41,2762],[96.26,482],[94.9,1660],[96.01,609],[94.45,801],[95.88,565],[81.44,4157],[96.75,459],[79.25,7315],[92.4,2017],[94.53,958],[94.79,1153],[94.81,773],[95.97,546],[95.09,638],[93.9,1031],[87.44,1561],[96.12,669],[95.7,821],[96.54,495],[95.06,810],[94.15,739],[92.22,2000],[94.57,916],[97.15,346],[95.31,727],[87.24,8376],[96.7,476],[82.9,1959],[81.72,2276],[94.81,851],[94.58,825],[95.48,560],[94.82,964],[96.68,501],[96.46,611],[93.34,859],[96.51,558],[94.56,650],[96.66,623],[95.87,742],[94.7,1275],[96.21,571],[96.65,562],[96.58,423],[95.19,642],[95.88,533],[92.28,1036],[91.54,1161],[94.63,640],[93.63,1190],[95.85,495],[87.37,2609],[95.74,511],[93.25,1100],[96.58,447],[92.53,1652],[90.66,1730],[93.55,830],[96.56,408],[93.33,770],[87.69,2057],[89.48,1587],[89.54,1737],[78.91,4074],[53.91,14390],[89.08,8947],[84.14,6810],[79.22,3190],[90.6,1180],[89.85,1131],[54.48,8330],[92.4,1059],[89.42,1555],[84.79,2702],[94.28,1076],[83.96,3428],[92.14,1394],[79.25,2625],[89.58,1974],[92.63,1105],[89.19,3837],[83.12,2091],[81.4,2283],[85.03,2029],[83.58,2826],[94.89,674],[78.84,2817],[89,2334],[92.85,1097],[93.09,967],[87.69,2339],[94.69,787],[79.34,3065],[93.98,787],[59.7,11187],[91.84,2905],[91.9,2082],[95.82,538],[94.77,1170],[80.35,2943],[85.93,2284],[92.68,1088],[85.72,2131],[90.44,2060],[84.82,2638],[92.7,1040],[94.13,1137],[59.67,6866],[78.68,3154],[73.62,5388],[83.26,3148],[84.1,2830],[95.32,598],[63.14,6545],[86.2,2012],[78.76,2646],[90.43,2575],[90.14,1529],[91.84,1092],[81.54,2541],[84.82,1917],[83.63,3208],[84.52,2774],[95.25,1074],[86.93,6927],[90.25,1769],[82.66,2838],[80.3,4530],[77.49,4092],[74.39,3541],[92.73,967],[92.55,1410],[67.58,3889],[95.93,643],[90.56,1541],[93.91,664],[94.77,859],[89.12,1692],[81.97,5156],[93.46,876],[92.35,1345],[65.94,17851],[70.01,10989],[94.93,724],[90.84,978],[77.38,2659],[83.85,4162],[92.85,1109],[88.46,1931],[89.86,1565],[84.15,3247],[75.07,2853],[80.18,3491],[84.28,5239],[94.24,846],[95.34,707],[60.11,4687],[80.86,2555],[94,812],[95.63,612],[91.98,5015],[91.62,1158],[72.51,3804],[85.9,17837],[87.53,1982],[77.64,3777],[92.49,1236],[77.43,3063],[89.51,1444],[87.73,1908],[94.4,655],[92.08,1375],[93.66,682],[89.2,2696],[93.42,1029],[97.05,441],[84.11,2414],[72.45,3514],[89.19,1955],[91.74,1717],[88.9,1447],[77.12,4238],[71.91,3649],[91.06,1657],[95.48,546],[93.95,1228],[96.47,635],[92.95,1418],[94.14,845],[95,639],[92.92,1211],[72.18,4606],[90.15,1403],[88.97,1705],[85.34,2831],[92.58,1660],[90.85,5466],[84.84,2651],[57.47,7133],[82.98,4176],[91.43,1727],[85.8,1802],[81.43,2900],[70.66,6469],[85.27,2751],[67.04,4135],[83.87,2722],[93.7,939],[89.71,2025],[87.17,2280],[89.93,1126],[94.52,814],[89.43,2206],[72.93,3345],[91.48,1484],[77.74,4878],[81.53,5909],[95.12,608],[81.73,3282],[76.36,5247],[93.18,1744],[92.44,1220],[95.58,577],[94.68,892],[75.62,11211],[81.04,3345],[88.04,1835],[72.62,3756],[91.98,1423],[94.9,923],[59.5,7473],[95.07,587],[64.91,10581],[84.26,2113],[90.54,1353],[88.02,1843],[90.01,1371],[95.59,619],[93.05,797],[81.91,3206],[91.11,1396],[80.51,2427],[93.16,1825],[93.18,1120],[82.77,4489],[86.06,1812],[85.21,1871],[58.65,9627],[82.95,2277],[94.71,684],[67.81,4319],[95.65,675],[88.78,1747],[92.41,1040],[89.09,1684],[94.71,803],[87.95,1885],[94.72,678],[82.25,2324],[90.82,1389],[94.03,822],[91.31,1181],[92.29,1092],[92.07,1600],[91.62,1382],[79.82,2500],[88.75,1632],[89.99,1681],[55.82,7681],[81.37,2879],[79.66,2597],[88.54,3852],[94.95,624],[79.83,3453],[89.75,1723],[93.34,829],[83.49,1904],[94.62,823],[91.14,1605],[91.32,1472],[76.16,5144],[91.16,1588],[90.01,2795],[75.82,4241],[92.62,1239],[80.2,2716],[89.36,1889],[94.19,998],[86.34,2359],[96.01,643],[88.87,1542],[91.45,1222],[93.52,795],[75.14,3094],[93.73,948],[95.13,776],[65.16,7510],[89.37,3093],[67.82,4597],[92.78,1399],[89.31,2194],[89.14,2281],[93.98,1272],[90.65,1191],[87.78,4578],[96.58,448],[73.2,4449],[82.12,4190],[93.81,1097],[93.86,923],[83.38,4230],[83.65,2785],[76.03,4971],[90.55,1592],[92.4,1684],[91.53,1491],[71.83,4658],[84.09,3352],[92.24,1506],[83.72,5539],[94.65,633],[91.67,1217],[96.89,635],[89.66,1668],[88.47,2073],[94.2,786],[86.97,1824],[88.37,1702],[87.53,2214],[89.4,1810],[94.82,2171],[90.87,1240],[90.1,1861],[92.11,1293],[89.71,1356],[97.34,320],[82.68,2502],[82.72,2372],[89.73,1791],[86.15,1642],[95.72,667],[90.57,1357],[86.97,1661],[85.57,3116],[91.07,1467],[85.53,2169],[91.39,1530],[93.3,1065],[89.16,1233],[85.75,2536],[88.76,1777],[93.6,878],[92.34,1345],[74.08,4270],[81.56,3249],[84.19,1873],[94.38,760],[88.97,1855],[92.62,972],[90.64,1481],[68.73,17857],[86.46,3197],[85.06,2229],[91.82,1424],[91.31,1245],[63.22,4025],[91.15,1687],[91.91,1361],[73.83,4514],[95.65,638],[94.72,841],[92.86,1949],[87.01,2176],[94.54,833],[92.7,829],[93.45,915],[91.16,1107],[84.27,2475],[76.21,4290],[87.64,2087],[93.69,778],[91.52,1320],[84.18,2389],[87,2176],[72.89,7211],[90.21,1883],[88.64,1776],[90.24,1754],[92.2,1272],[77.34,5055],[95,1448],[90.48,1413],[90,2732],[95.85,603],[93.1,983],[90.59,1164],[91.16,2070],[84.27,2814],[90.07,2454],[95.22,1221],[94.25,768],[88.53,2122],[87.95,3146],[75.03,4776],[91.1,1586],[86.44,2832],[78.12,3369],[84.16,2048],[85.2,1828],[88.4,1362],[95.05,1833],[87.96,2241],[94.39,881],[79.92,2719],[87.59,1706],[96.11,640],[94.32,819],[92.08,1283],[89.39,1950],[88.61,1803],[86.53,2553],[81.31,3313],[88.88,3548],[95.33,660],[90.42,1386],[85.03,2326],[95.41,634],[85.87,2752],[93.25,1056],[81.67,3105],[92.53,1125],[90.78,2001],[94.44,698],[86.29,1973],[90.71,5317],[83.01,2982],[93.41,1139],[92,1407],[88.73,1844],[93.17,994],[91.88,1180],[93.64,1103],[87.51,1901],[92.24,810],[94.59,763],[89.16,1283],[92.47,1110],[82.2,2359],[95.09,869],[89.86,1946],[81.53,2413],[91.16,1415],[82.19,2951],[92.18,1331],[95.8,521],[86.87,1551],[89.72,1417],[84.59,1680],[86.92,2474],[90.44,1562],[73.86,6497],[88.77,2746],[92.66,1176],[93.79,1041],[85.88,2621],[87.78,2097],[80.94,2662],[89.47,1816],[94.87,849],[95.38,2094],[92.93,1251],[89.86,2507],[94.48,855],[86.51,1742],[83.7,2529],[83.87,2208],[74.15,4823],[79.53,2576],[90.3,1472],[80.23,4594],[88.31,1451],[91.86,1336],[89.59,4133],[91.98,1438],[88.19,3203],[93.19,852],[91.07,2018],[88.11,1251],[91.42,975],[90.41,1537],[90.41,1279],[96.48,610],[85.35,2292],[87.5,2815],[90.3,1049],[92.46,1704],[93.91,1322],[69.22,36081],[93.08,1219],[84.6,3704],[87.96,1873],[92.64,978],[90.74,1695],[92.52,1186],[85.72,6001],[87.99,1678],[93.7,1025],[76.42,4235],[94.01,1505],[91.75,1180],[92.4,1004],[87.24,2009],[84,2495],[88.96,2321],[86.31,2556],[81.94,3318],[85.93,2216],[89.58,1396],[92.67,1043],[91.52,1756],[80.14,2921],[93.2,1696],[93.02,895],[92.2,2085],[92.41,2071],[78.7,3031],[89.09,1934],[87.55,2075],[91.63,1324],[93.28,1113],[93.36,1480],[93.5,1041],[93.34,843],[86.02,1738],[91.65,1641],[66.65,13098],[92.33,1169],[93.46,1318],[83.05,2161],[94.08,850],[96.43,632],[90.87,1739],[95.78,705],[86.13,2080],[92.05,1413],[94.23,957],[91.01,1494],[91.73,2178],[88.61,1765],[94.32,1095],[84.87,2210],[86.81,2550],[84.53,2830],[92.53,997],[87.13,1573],[94.04,1308],[81.54,2243],[89.55,1777],[92.56,1121],[95.13,914],[87.72,1921],[68.12,4622],[86.68,2050],[79.68,4193],[90.38,1348],[78.93,2746],[70.17,6986],[86.83,2276],[80.7,3275],[94.63,1062],[82.61,2826],[91.13,1187],[93.71,1112],[79.88,3113],[89.46,1892],[92.92,891],[87.37,2604],[90.08,1559],[95.75,595],[96.45,1273],[88.22,2587],[76.03,3685],[92.05,1437],[84.24,2269],[84.39,2027],[88.92,1264],[86.53,1978],[87.96,1547],[88.47,2052],[91.68,1552],[90.92,1639],[92.91,1187],[86.29,2117],[95.92,598],[85.32,3504],[90.05,1554],[92.07,1761],[85.17,2198],[77.52,3065],[94.51,901],[93.21,1474],[90.47,1261],[91.13,2295],[89.72,1472],[94.95,793],[76.79,4300],[93.01,1680],[84.64,2541],[87.18,2340],[95.26,1491],[74.33,3896],[84.92,2095],[73.76,4231],[66.33,4318],[82.37,3347],[90.32,1558],[88.17,2200],[92.39,1498],[88.16,2044],[89.74,1515],[89.8,1206],[77.98,3532],[76.13,3340],[88.06,1616],[88.46,2446],[92.78,1153],[87.47,2401],[86.52,2056],[94.86,3972],[92.42,1750],[79.86,3508],[91.39,1408],[88.62,1955],[86.12,3308],[88.3,2410],[83.64,2046],[92.6,975],[73.09,3590],[88.87,2021],[87.73,1937],[94.1,1164],[84.25,3813],[89.08,1790],[93.33,1269],[73.69,3965],[93.23,1421],[96.84,602],[93.37,965],[93.01,1078],[90.45,1368],[89.5,1799],[87.88,1553],[90.65,1426],[90.78,1253],[87.03,3534],[85.15,2593],[63.51,5781],[89.9,1965],[92.29,1293],[89.75,2714],[84.39,2069],[71.18,9880],[83.28,3408],[83.11,2857],[91.99,1028],[86.6,2558],[72.15,4208],[86.69,2290],[83.39,2977],[94.68,1311],[65.29,5342],[96.17,676],[90.51,1840],[93.59,1004],[85.61,1767],[73.22,5536],[82.15,3955],[91.76,1406],[83.6,2450],[93.97,1159],[41.48,9847],[61.11,6211],[80.95,2628],[84.13,2572],[83.42,3010],[90.92,1204],[44.54,8634],[83.31,2970],[84.81,1872],[90.86,1349],[95.96,599],[91.95,1006],[84.56,1924],[93.84,1251],[91.08,1655],[91.65,1031],[87.49,1661],[88.11,2041],[93.16,1248],[84.22,2250],[93.39,1316],[89.81,1804],[91.53,1413],[92.11,1087],[94.85,1133],[83.53,2481],[90.39,1232],[90.06,1355],[75.45,2990],[65.63,4920],[95.14,1351],[90.68,2112],[84.77,1791],[93.21,1513],[73.17,5394],[90.1,2194],[50.81,7218],[90.38,1456],[79.8,4122],[67.65,5129],[33.29,16822],[69.74,4138],[85.95,2319],[74.29,3202],[66.5,5338],[87.49,1300],[89.42,2139],[88.38,1439],[89,2009],[84.16,2430],[72.86,5384],[73.97,3537],[92.01,1590],[94.33,1089],[86.63,2715],[71.92,3392],[80.75,3330],[92.55,1618],[92.33,1494],[59.34,6251],[67.9,5873],[86.39,2237],[77.44,3683],[78.42,2680],[65.13,6711],[96.33,583],[86.98,2250],[50.63,16895],[92.86,1463],[91.03,1862],[87.33,1538],[90.48,3230],[91.33,1482],[84.4,2056],[88.06,2526],[88.76,2384],[92.22,1005],[91.57,1764],[28.69,22182],[88.45,2258],[67.92,4436],[92.35,1566],[68.75,9125],[72.01,9119],[90.24,1703],[87.89,1539],[78.27,5066],[84.57,2210],[95.27,919],[92.06,1503],[90.82,1432],[96.91,544],[91.54,1936],[84.98,2726],[94.62,1073],[86.79,1683],[79.68,3196],[92.2,1506],[76.26,3007],[54.72,6733],[74.31,4203],[69.16,4204],[84.28,3779],[88.96,2011],[95.45,727],[80.34,3054],[95.98,879],[91.42,1088],[95.24,792],[90.95,2032],[88.87,1473],[83.87,2134],[89.5,2024],[86.91,1927],[91.13,1666],[91,1579],[84.4,1928],[88.16,2130],[86.42,3900],[94.41,730],[70.33,5077],[90.62,1658],[91.11,1780],[87.53,1571],[92.11,2098],[89.73,1965],[80.99,4573],[94.62,902],[87.82,2423],[87.33,2085],[92.27,1056],[55.41,9291],[70.79,4464],[71.45,4119],[77.41,4272],[90.36,1691],[91.99,1620],[92.51,1023],[82.36,2528],[88.99,1840],[92.75,1759],[92.39,1216],[92.2,1299],[87.66,1654],[88.88,1258],[92.69,1615],[94.68,1736],[89.84,1694],[92.99,1322],[96.18,712],[94.36,982],[86.74,2479],[65.42,4657],[83.3,2750],[92.48,1420],[70.21,16799],[80.76,2732],[75.62,3901],[78.5,10346],[93.5,1161],[95.28,748],[90.76,1912],[92.33,1834],[89.11,1840],[87.88,2039],[83.13,2263],[89.23,1639],[85.54,1982],[88.43,1588],[93.23,1177],[91.91,1128],[95.34,1035],[82.57,2098],[89.65,1618],[85.13,2758],[78.28,3335],[88.11,2293],[87.33,1602],[91.45,1427],[91.96,1276],[82.9,2629],[80.47,25226],[95.54,664],[48.19,8979],[84.69,3939],[87.88,2165],[90.36,1517],[81.38,2373],[85.17,2392],[87.64,2181],[94.88,935],[86.63,2343],[84.4,1981],[72.66,5018],[83.82,2543],[73.1,3733],[78.61,2980],[92.33,1603],[96.51,1016],[89.97,1868],[88.77,1694],[85.1,2600],[92.69,1350],[93.99,942],[66.97,5586],[87.8,2119],[78.87,3413],[74.3,4812],[86.1,2072],[69.32,5198],[73.73,3716],[86.02,2842],[84.77,2022],[97.45,414],[80.64,2534],[71.61,4937],[79.95,3143],[91.91,20800],[85.51,2301],[80.02,2718],[94.67,1525],[83.79,2139],[78.5,2839],[94.32,817],[76.93,3930],[86.34,2619],[82.41,3927],[93.39,972],[86.26,2312],[91.12,1667],[91.08,1825],[59.88,21522],[57.37,6843],[50.13,7549],[93.89,1505],[67.41,5063],[86.2,2600],[80.61,4315],[60.03,5964],[93.39,1018],[79,3155],[89.93,4322],[87.34,1701],[83.83,2065],[88.39,4205],[90.1,1279],[94.83,1881],[76.17,3575],[83.04,2076],[89.74,1257],[85.97,1702],[88.64,1747],[81.93,3301],[84.88,1978],[68.19,6846],[92.28,1155],[97.06,392],[91.08,1656],[94.42,2306],[90.02,2220],[65.26,6068],[92.07,1597],[81.56,2462],[87.64,1886],[91.4,1893],[86.75,1796],[72.08,3737],[83.43,2155],[94.08,784],[85.89,1606],[91.16,1024],[83.4,2409],[90.42,1139],[83.3,2710],[90.71,1227],[92.06,3054],[86.76,2747],[66.47,5706],[87.18,1541],[91.39,1079],[81.05,3682],[82.96,2495],[88.63,1609],[80.13,4015],[90.4,1231],[91.25,1249],[95.58,577],[53.23,6340],[82.46,4353],[76.57,3515],[91.97,8944],[66.22,5119],[88.67,2501],[85.82,2076],[64.22,6268],[80.8,2623],[88.02,2247],[84.67,2057],[88.87,3242],[93.01,795],[89.54,1703],[88.23,2453],[62.7,6367],[85.74,1759],[79.98,2631],[47.69,9496],[88.19,1663],[80.57,2752],[92.16,1678],[89.97,1600],[87.46,2519],[85.33,2517],[87.5,2212],[83.85,2489],[79.49,3607],[89.57,1406],[93.99,946],[93.65,1699],[88.03,2608],[93.74,861],[87.79,1661],[66.15,6522],[88.76,2286],[73.91,6063],[82.41,2351],[85.79,2100],[87.52,1633],[82.2,2524],[93.78,902],[76.51,3232],[80.04,2968],[95.52,810],[85.79,2019],[93.56,3051],[84.89,2513],[86.74,4115],[79.85,2793],[88.1,1735],[93.32,988],[89.15,2171],[90.81,1363],[79.68,3217],[93.66,1242],[86.42,3097],[61.85,8284],[80.83,2876],[93.19,1061],[81.82,3013],[82.87,2615],[92.86,1772],[81.04,2470],[67.99,8474],[90.31,1530],[88.97,1337],[87.79,2875],[76.05,3128],[90.67,1385],[92.58,1488],[87.33,1613],[89.42,1760],[88.1,1551],[89.69,1706],[86.63,1894],[86.93,2663],[92.97,1068],[76.22,4945],[88.33,1394],[92.41,975],[91.82,1177],[93.91,818],[85.4,2356],[89.14,1586],[91.75,1495],[92.5,1200],[77.59,3529],[81.61,3712],[59.82,6671],[91.68,1201],[89.36,2977],[93.21,779],[93.66,3473],[73.62,4381],[91.25,1534],[80.88,2354],[89.36,1408],[82.24,3554],[83.86,2995],[79.39,3613],[94.64,732],[84.68,1818],[76.25,3408],[66.37,5148],[78.36,2908],[86.45,2510],[87.69,2240],[66.3,4355],[77.43,3022],[79.58,3943],[91.2,1124],[89.25,1328],[87.41,2282],[76.58,3717],[95.54,1016],[82.55,3110],[90.78,2126],[78.03,2984],[88.4,2521],[73.61,7457],[89.42,2058],[74.09,3332],[64.07,9267],[89.33,2365],[72.01,7236],[89.83,1213],[85.52,2954],[87.75,1904],[90.93,2422],[87.76,2342],[88.24,5613],[89.95,2324],[80.33,2990],[95.89,592],[62.44,5500],[85.36,2137],[90.83,1431],[63.74,5332],[95.32,716],[92.84,1021],[89.68,1345],[84.75,1894],[83.37,3053],[82.45,3585],[82.96,2956],[88.08,1914],[90.87,1170],[77.71,3188],[94.67,691],[79.76,2715],[93.18,1807],[84.38,3944],[51.89,7464],[79.61,3140],[84.63,2342],[87.16,2337],[82.33,3078],[88.34,1662],[81.4,3043],[76.93,3108],[82.54,3117],[92.25,1237],[92.04,1546],[76.2,4049],[92.62,1280],[86.58,1986],[92.47,1235],[90.95,1941],[71.37,7448],[83.87,2801],[86.68,2123],[79.95,3448],[89.76,2100],[89.49,1331],[90.92,1583],[77.51,4770],[92.12,1022],[80.03,2628],[90.59,1516],[94.62,674],[74.63,4317],[93.1,1077],[92.52,1307],[82.78,4418],[87.1,2078],[88.95,1418],[92.45,1571],[92.14,1400],[91.77,1261],[88.29,1655],[85.26,3391],[75.3,4160],[84.49,2128],[94.85,1274],[91.1,1145],[88.36,2575],[96.33,614],[77.83,2804],[60.85,5160],[86.61,2740],[89.03,1486],[77.33,2907],[87.14,2480],[83.38,4924],[81.24,3177],[88.87,2873],[88.74,2004],[90.11,1532],[91.9,1265],[75.12,3264],[84.14,2573],[88.04,1680],[73.16,3592],[93.4,1090],[82.45,3487],[85.33,2875],[93.58,2088],[79.7,2806],[89.02,2000],[88.23,1772],[82.78,2211],[87.27,2056],[65.23,5024],[80.92,2570],[85.58,2025],[93.68,1077],[68.3,4565],[81.43,3698],[86.61,1776],[85.08,1935],[72.44,4859],[87.73,2567],[69.96,4427],[87.89,2219],[89.59,1435],[91.23,2864],[56.44,5803],[80.69,2904],[90.46,1476],[71.24,3911],[74.02,4121],[73.59,4712],[79.14,2644],[83,2114],[87.8,1833],[88.14,1618],[89.57,1247],[93.05,1428],[84.36,2483],[84.87,3225],[88.57,1463],[65.13,6556],[32.86,13112],[92.78,925],[80.5,3257],[73.28,5126],[93.71,1556],[90.97,1200],[91.76,1533],[80.02,2554],[89.2,1654],[88.27,2252],[94.38,1246],[84.05,2960],[90.55,1687],[88.68,2451],[76.15,5036],[88.75,1468],[70.35,6348],[78.36,2938],[75.61,3317],[84.6,2374],[74.22,3451],[61.44,6103],[86.26,1447],[93.87,1271],[93.87,1078],[93.86,1250],[66.79,5020],[91.92,1151],[94.56,1040],[89.17,1693],[91.84,1220],[88.04,2227],[95.56,591],[90.32,1241],[69.32,3694],[87.35,1861],[86.24,2014],[94.85,856],[73.08,6258],[75.07,4469],[88.36,1959],[86.41,4850],[85.6,1998],[96.92,389],[91.2,1599],[80.85,4603],[82.22,3810],[84.58,2188],[90.82,2033],[71.67,3851],[85.34,1730],[79.75,3198],[84.86,4154],[83.54,2436],[92.51,1023],[79.26,3124],[95.81,633],[73.71,5061],[83.85,3373],[91.77,1096],[74.01,3729],[86.85,2202],[69.36,4901],[69.75,4003],[82.01,3654],[83.88,3484],[76.37,4000],[87.25,1731],[93.43,1115],[94.9,853],[89.83,2137],[93.1,1229],[89.15,1340],[84.61,2292],[94.94,986],[76.52,3164],[79.13,3208],[90.12,1723],[87.43,1566],[78.44,2710],[86.81,2161],[93.22,993],[87.03,2254],[94.08,1302],[91.99,1383],[82.15,7097],[74.21,6272],[94.01,1024],[72.45,3759],[95.62,777],[87.41,2045],[94.77,800],[87.06,2654],[83.48,3178],[94.96,1062],[79.3,3993],[92.33,1248],[90.71,1047],[92.91,1213],[88.92,1573],[92.83,1033],[79.98,2523],[91.38,1388],[54.36,8579],[72.38,3950],[93.89,905],[91.8,1535],[78.39,3574],[86.05,3006],[92.27,1533],[84.74,2283],[91.56,1667],[87.96,2323],[90.48,1294],[92.22,1963],[60.09,5633],[90.03,1987],[77.55,3465],[94.08,957],[87.58,2098],[90.5,1832],[79.93,3443],[75.57,3484],[74.4,3325],[89.86,1841],[91.15,1637],[84.23,3593],[82.39,6736],[88.76,1644],[83.68,3888],[89.69,1267],[42.62,10863],[90.19,1378],[81.44,3017],[86.16,3745],[85.89,1747],[83.77,2122],[93.54,1087],[76.83,3413],[92.25,1125],[93.73,1606],[92.77,1474],[94.94,1198],[51,6978],[89.33,1777],[84.58,2097],[91.35,1234],[94.41,1312],[85.78,2522],[64.82,6510],[94.41,881],[91.02,1798],[51.38,8866],[92.21,1694],[87.89,1561],[93.85,4172],[90.73,2980],[80.48,2428],[86.74,1743],[92.41,984],[95.48,610],[93.74,1561],[92.6,1351],[93.46,1119],[89.7,2062],[61.11,5085],[96.78,546],[83.67,2762],[84.34,2368],[90.55,2046],[58.99,6434],[79.52,4842],[86.07,1798],[92.32,1560],[96.54,607],[94.25,1147],[92.06,1553],[80.69,2899],[73.92,3424],[87.79,2436],[86.58,1859],[88.25,2414],[91.5,1520],[93.52,1035],[83.76,1989],[90.52,1598],[79.26,3646],[92.05,1554],[90.29,2142],[67.87,6605],[75.97,3145],[93.32,849],[81.32,2391],[92.09,1065],[89.2,1534],[81.07,2949],[91.5,1081],[92.59,1714],[91.27,1612],[91.34,1614],[93.37,2004],[93.33,1399],[88.18,1607],[91.17,1775],[89.61,1879],[86.94,1876],[80.26,3555],[89.7,1318],[87.58,1795],[73.93,3842],[87.8,2401],[78.71,2962],[90.2,2185],[91.34,1212],[86.61,3078],[89.1,2225],[92.81,1584],[90.94,1646],[92.03,1030],[95.11,865],[61.79,6099],[82.57,2683],[93.36,1224],[85.98,2372],[94.15,972],[93.1,1044],[84.84,21320],[73.66,3308],[90.64,2316],[85.15,2500],[74.45,6165],[85.05,3686],[74.72,4867],[79.06,2537],[88.08,1453],[91.87,1767],[91.81,1299],[89.75,2653],[85.87,2102],[93.48,1178],[87.87,1545],[94.57,712],[74.21,7942],[93.99,763],[95.66,694],[90.47,1813],[92.32,1035],[91.37,1031],[90.41,1177],[85.5,2035],[92.6,1004],[81.29,3256],[92.66,1377],[90.04,1385],[89.44,1364],[85.64,3069],[80.62,6109],[87.25,1626],[87.35,1763],[92,986],[91.66,1208],[77.9,3136],[82.38,2344],[88.83,1554],[91.91,1023],[94.95,600],[92.98,930],[93.44,1009],[91.05,2434],[78.63,2772],[90.33,1313],[93.44,1874],[87.79,1822],[92.93,1356],[96,506],[93.32,1124],[73.1,12326],[86.39,1805],[85.49,2775],[91.28,1219],[93.92,1030],[76.06,4464],[92.8,1597],[81.14,4311],[91.32,1388],[90.59,2610],[86.87,2819],[84.77,2327],[92.28,1670],[88.08,2068],[91.39,1111],[78.34,3617],[92.52,1404],[69.11,10021],[86.93,2185],[93.5,1440],[89.6,1439],[79.86,3319],[87.03,1694],[93.13,1523],[89.96,1268],[94.2,763],[85.13,2450],[93.43,1205],[74.17,4803],[88.59,1599],[86.8,2207],[92.85,1799],[89.66,1350],[87.93,2431],[86.41,3866],[81.94,2484],[87.57,2405],[90.42,2408],[87.12,2364],[78.04,3090],[91.55,1855],[87.75,4840],[73.67,4110],[78.67,4698],[68.09,5076],[87.86,2178],[94.27,1178],[96.25,511],[95.94,666],[76.11,3305],[84.2,2120],[89.78,1323],[71.38,4930],[77.36,3555],[86.23,2658],[75.75,3257],[75.62,4037],[83.81,2345],[86.01,2084],[78.68,3545],[76.45,4461],[83.6,2237],[72.07,4128],[78.93,2648],[94.09,901],[90.03,1213],[83.42,2197],[86.61,1788],[82.91,2680],[86.45,2050],[79.1,3003],[71.42,4659],[85.51,2201],[73.5,3392],[81.18,4044],[65.49,7618],[83.34,2459],[27.55,11254],[96.21,574],[92.54,1149],[90.1,1477],[54.64,6986],[86.78,3385],[80.4,3794],[79.12,3447],[91.59,1201],[80.1,2837],[64,5889],[76.17,3838],[92.5,1130],[50.69,6627],[89.6,1779],[87.25,1683],[83.5,3309],[93.43,1616],[89.82,1523],[86.12,2608],[59.99,6318],[91.97,1508],[60.47,6164],[69.61,10594],[85.44,2307],[93.5,1412],[93.59,1196],[87.21,2031],[85.48,2745],[84.56,2758],[90.61,5747],[88.99,1894],[79.48,3289],[81.59,2730],[94.5,1506],[90.73,1417],[88.93,1846],[93.44,724],[90.94,1283],[77.53,2657],[90.72,1719],[89.63,1622],[92.93,1519],[61.32,4522],[93.4,1194],[82.52,2609],[89.57,2305],[83.73,2799],[90.74,1588],[77.21,4127],[88.9,1504],[55.62,10014],[90.18,1342],[46.76,9063],[92.76,1103],[91.25,1228],[66.94,5045],[90.86,1472],[86.25,2551],[93.31,1332],[93.89,1044],[91.73,1372],[95.5,677],[91.57,1261],[91.95,2026],[67.8,4563],[96.71,1019],[89.53,1527],[89.64,1911],[83.2,3383],[92.28,1034],[54.2,7284],[90.43,1983],[65.35,4961],[79.56,2766],[91.72,1338],[85.77,2528],[90.79,1726],[69.59,4970],[91.18,1372],[86.59,2425],[86.3,3230],[95.27,1335],[91.56,1069],[85.71,2408],[55.66,6877],[87.26,2564],[77.55,3988],[88.59,1419],[94.79,994],[91.97,1298],[80.53,3018],[85.93,2621],[91.04,2030],[90.32,1909],[86.55,2009],[85.39,5351],[87.89,2633],[94.19,966],[76.53,3548],[82.99,3170],[88.44,2281],[88.05,1886],[83.44,3115],[84.78,2871],[89.35,2096],[87.94,2944],[36.57,11559],[96.15,531],[94.48,890],[81.89,3393],[94.27,1282],[76.64,3676],[67.48,4541],[93.09,1634],[94.64,572],[84.59,1889],[86.95,2966],[79.12,5274],[79.64,3753],[84.57,2066],[81.26,2660],[93.96,1052],[89.71,2174],[90.3,1215],[81.29,3842],[62.91,4539],[84.92,2583],[85.32,3948],[66.23,4580],[78.06,3469],[90.81,2945],[76.16,7890],[75.01,3404],[85.39,1723],[83.71,2988],[89.48,2861],[85.48,1696],[90.51,1594],[80.15,2541],[85.14,2289],[94.08,986],[87.45,2325],[93.57,1555],[90.87,1124],[87.87,2240],[90.5,1948],[91.01,1859],[79.77,3305],[82.2,2732],[90.08,2406],[84.43,3626],[87.32,1746],[95.56,1398],[93.49,1536],[97.68,325],[72.56,3579],[88.07,2519],[87.11,2787],[86.11,1927],[80.11,2795],[93.89,835],[93.03,9427],[94.59,695],[93.37,1036],[89.52,2706],[90.3,1866],[93,1247],[90.93,1071],[90.5,1898],[85.95,1901],[92.63,1750],[91.41,1378],[87.6,2695],[57.88,6422],[91.81,1910],[93.09,2409],[63.12,7099],[81.8,2017],[87.18,1745],[94.77,719],[90.07,2907],[93.73,775],[93.86,844],[89.56,1485],[92.3,1045],[74.54,2977],[92.97,996],[93.91,774],[89.73,1444],[87.69,1896],[79.98,4554],[74.06,3819],[90.77,1191],[72.01,3712],[87.03,3425],[90.08,2310],[90.48,2072],[83.51,1851],[90.99,1860],[86.84,1683],[91.4,1849],[88.66,1386],[85.35,4614],[91.76,2659],[89.07,2622],[94.04,1143],[95.23,777],[94.76,799],[89.13,1531],[86.95,1674],[79.75,3070],[89.05,1299],[88.4,2053],[94.29,1026],[88.84,1714],[86.87,3955],[90.07,2544],[95.03,1086],[88.91,2388],[86.74,1550],[90.77,1588],[90.92,5422],[89.83,1123],[88.37,2558],[88.77,3064],[95.95,691],[85.26,2618],[88.42,1609],[92.58,1481],[78.66,4999],[81.09,2479],[87.05,1526],[84.92,1796],[82.74,2919],[91.96,1687],[65.69,5078],[87.93,2039],[86.09,3367],[96.07,462],[91.02,1081],[83.87,2435],[88.63,1290],[90.04,1266],[84.62,1922],[82.74,3393],[85.19,3122],[66.91,5824],[91.5,1397],[79.54,3429],[86.62,2179],[87.05,3088],[95.57,615],[89.55,2034],[88.38,2155],[93.32,838],[90.81,1458],[86.6,2455],[94.23,972],[96.67,424],[84.47,3352],[90.11,1211],[73.81,3572],[92.19,1209],[91.24,1329],[95.63,563],[91.28,1297],[66.54,4936],[89.84,2043],[93.39,954],[84.55,4281],[74.23,3996],[91.75,1406],[88.12,1508],[88.44,1619],[86.26,2743],[79.58,3174],[86.13,2718],[94.19,846],[90.17,1261],[86.55,2626],[93.55,920],[93.51,925],[91.43,1459],[91.36,1042],[87.18,1567],[91.82,1830],[89.87,1975],[57.75,6438],[88.21,2077],[91.94,1018],[92.71,1216],[78.09,4503],[53.59,7867],[79.54,3802],[83.08,3311],[94.27,1307],[89.43,1760],[93.4,783],[87.3,1874],[90.3,1223],[87.58,1667],[86.13,2611],[88.61,1565],[82.05,2661],[92.6,910],[83.19,5259],[70.78,4214],[87.22,2612],[74.1,4265],[59.5,5131],[86.09,2289],[89.58,2112],[90.78,1551],[91.23,1694],[65.87,4295],[86.93,1542],[87.21,2328],[91.32,1567],[66.71,5330],[93.56,1074],[83.35,2595],[88.71,2415],[37.86,12049],[79.21,2282],[94.75,1083],[87.68,1890],[87.28,1983],[89.59,2263],[84.68,1889],[88.19,1907],[86.37,2080],[96.67,514],[86.64,1677],[85.53,3637],[91.74,1186],[89.77,1629],[85.75,2330],[83.45,2230],[77.56,3108],[81.55,2447],[87.68,1555],[70.4,4650],[76.18,4063],[78.61,2763],[82.1,2177],[80.51,2497],[91.21,1408],[76.91,3604],[85.45,1997],[83.5,2763],[88.97,1439],[92.09,1573],[90.31,1493],[71.52,4274],[83.12,2275],[84.82,2224],[90.18,1355],[86.12,3883],[89.16,1559],[87.85,2029],[67.66,4072],[92.15,1983],[86.75,1999],[91.98,1409],[87.74,2613],[95.5,834],[91.85,1171],[88.9,1972],[84.34,2201],[84.03,2015],[89.89,1995],[70.78,3498],[87.84,2175],[93.12,1194],[92.7,1373],[82.79,2834],[90.94,1419],[86.14,1800],[60.01,5515],[92.88,850],[88.17,2589],[91.03,1169],[86.93,1613],[92.36,1446],[88.78,1743],[91.1,1306],[82.78,2581],[84.9,1865],[90.07,1302],[75.27,3653],[75.94,12760],[84.44,2133],[82.35,2428],[63.7,5843],[84.3,3534],[83.87,7139],[83.45,2246],[91.72,1787],[96.32,668],[84.95,3134],[90.56,3600],[92.97,1792],[92.92,1648],[77.51,3079],[86.74,2152],[95.31,835],[71.34,5339],[88.78,3102],[91.67,1104],[90.69,1169],[87.42,2031],[90.04,1716],[88.28,2182],[93.97,771],[91.13,1768],[87.22,2409],[90.11,2021],[91.17,1639],[92.97,1212],[91.12,1629],[90.53,2369],[93.24,1164],[84.54,1975],[86.99,2392],[66.3,10186],[85.9,2503],[91.56,1241],[83.58,2438],[87.18,1764],[93.22,826],[91.05,1086],[70.75,5457],[91.65,941],[91.79,2175],[82.87,2262],[88.65,2259],[93.14,1903],[89.91,1839],[66,6623],[92.25,3565],[88.9,1360],[55.14,7269],[79.12,3106],[84.72,2801],[89.81,1751],[93.88,1011],[70.24,4360],[85.01,3039],[84.06,2041],[91.93,1578],[88.83,1290],[88.28,1762],[90.82,1016],[77.14,6758],[89.73,1832],[89.36,1282],[87.62,2309],[80.97,2626],[94.27,979],[74.44,2888],[95.16,746],[74.65,3400],[86.14,2258],[94.74,790],[92.52,975],[90.63,1346],[95.02,653],[61.55,9413],[89.52,2066],[73.67,5827],[93.36,1210],[88.41,3406],[79.62,2634],[92.44,1269],[89.67,1286],[89.91,1664],[89.69,2424],[94.48,806],[83.92,9084],[86.46,2250],[90.56,1656],[67.52,5228],[83.05,3147],[95.12,1081],[87.11,2665],[78.99,2688],[36.5,9091],[90.92,1653],[91.64,1554],[87.3,1686],[88.49,3336],[83.19,2153],[91.19,1066],[90.88,1712],[91.41,1064],[88.54,1849],[86.69,2345],[92.72,1154],[87.4,1504],[83.3,3325],[81.88,2591],[80.11,3080],[82.1,2563],[96.04,706],[91.45,1529],[88.09,2320],[94.59,734],[75.61,3650],[95.41,804],[89.55,2980],[91.79,1278],[95.05,1324],[87.3,6931],[93.13,1034],[92.49,1161],[89.05,1323],[84.76,2887],[83.84,2075],[94.21,819],[92.52,1584],[84.8,1876],[93.25,1028],[62.49,16389],[77.26,2674],[80.7,3094],[93.2,1604],[52.54,8212],[68.62,6308],[64.66,6964],[87.72,1571],[87.31,2531],[93.55,850],[94.17,1058],[89.59,1383],[80.48,2341],[82.7,2330],[94.57,763],[80.98,2083],[84,4432],[89.57,2032],[87.05,2038],[91.77,2662],[77.66,10490],[86.73,2447],[88.27,13910],[93.57,1174],[86.22,3342],[91.83,1521],[91.02,1654],[77.65,3770],[95.19,904],[88.49,3686],[88.92,1984],[75.62,7106],[41.9,10275],[65.54,6102],[85.76,2918],[68.31,4825],[72.04,8220],[94.05,948],[66.78,6193],[84.51,1988],[72.63,5297],[92.88,917],[91.32,1611],[92.8,1672],[93.5,1734],[89.21,2065],[61.62,5244],[78.52,2942],[74.7,4563],[75.27,4154],[80.6,2851],[86.36,3138],[49.52,10370],[84.18,3356],[92.88,1049],[95.53,510],[88.62,2243],[95.14,619],[95.53,836],[88.21,1769],[79.67,3185],[73.77,9655],[96.62,806],[72.14,4812],[97.75,433],[87.05,1660],[90.25,1395],[90.1,1904],[92.36,879],[68.16,6870],[94.63,748],[90.24,1414],[87.89,2027],[85.32,1996],[92.74,1169],[81.92,2922],[97.13,526],[93.45,1059],[85.04,2072],[89.55,2439],[94.86,625],[80.81,2665],[87.3,2544],[81.51,3049],[90.92,1585],[88.04,2136],[82.62,2263]]
			}
			
		]
	},
	FakeAndGoodrate2 : {		
		title : {
                text: '印码平均缺陷条数分布',
                subtext: '数据来源：质量综合管理系统数据库',
				x:'center',
            },
        tooltip : {
            trigger: 'axis',
			axisPointer:{
				type : 'cross',
				lineStyle: {
					type : 'dashed',
					width : 1
				}
			}
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
				//dataZoom : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
		legend: {
			data:['大万数','平均好品率'],
			y:70,
			//show:false,
		},
		/* dataZoom : {
            show : true,
            realtime: true,
            start : 0,
            end :100,
			//height:20,
        },*/
        calculable : true,
        xAxis : [
            {
				name:'缺陷数区间\n(单位:条)',
                type : 'category',
				axisTick:{length:2},
                boundaryGap : true,//此处不将产量放进图表中（设为TRUE,柱形图会溢出边界）
				//此处数据动态生成
                data : (
				function (){
					var res = [];
					for(var i=1;i<=20;i++) {
						res.push((i-1)*1000+'~'+i*1000+'条');
					}
					return res;
            })(),
			}
        ],
        yAxis : [
            {
				name:'大万数',
                type : 'value',
				position: 'left',
				//min:84,
				//max:89,
				scale: true,
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value}车',    // Template formatter!               
				},
            },
			 {
				name:'平均好品率',
                type : 'value',
				position: 'right',
				//min:84,
				//max:89,
				scale: true,
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value}%',    // Template formatter!               
				},
            }
        ],
        series : [
            {
				name:'大万数',
                type:'line',
                smooth:true,
				symbolSize: 6,
                itemStyle: {normal: {label:{show:false}}},/*,areaStyle: {type: 'default'}*/
                data:[4539,8422,4914,2597,1565,904,605,417,282,207,172,129,94,67,63,37,38,48,20,16],
				//markPoint : MPtStyle,
				//markLine : MLnStyle,
			}, 
			 {
				name:'平均好品率',
                type:'line',
                smooth:true,
				yAxisIndex: 1,
				symbolSize: 6,
				itemStyle: {normal: {label:{show:false}}},/*,areaStyle: {type: 'default'}*/
                data:[95.56,91.47,86.91,83.08,79.64,77.44,74.88,73.35,71.7,69.94,69.54,68.97,65.44,65.64,61.55,62.65,60.43,56.21,54.59,56.17],
				//markPoint : MPtStyle,
				//markLine : MLnStyle,
			}, 
        ]
    },	
	FakeAndGoodrate4 : {		
		title : {
                text: '印码各机台每天平均好品率',
                subtext: '数据来源：质量综合管理系统数据库\n统计时间：2014年01月至2015年03月',
				x:'center',
            },
        tooltip : {
            trigger: 'axis',
			axisPointer:{
				type : 'cross',
				lineStyle: {
					type : 'dashed',
					width : 1
				}
			}
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
				//dataZoom : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
		legend: {
			data:['大万数','平均好品率'],
			y:70,
			selected: {
				'大万数' : false
			},
			//show:false,
		},
		dataZoom : {
            show : true,
            realtime: true,
            start : 0,
            end :100,
			//height:20,
        },
        calculable : true,
        xAxis : [
            {
				name:'日期',
                type : 'category',
				axisTick:{length:2},
                boundaryGap : true,//此处不将产量放进图表中（设为TRUE,柱形图会溢出边界）
				//此处数据动态生成
                data : ['2014/1/2','2014/1/3','2014/1/4','2014/1/6','2014/1/7','2014/1/8','2014/1/9','2014/1/10','2014/1/13','2014/1/14','2014/1/15','2014/1/16','2014/1/17','2014/1/18','2014/1/20','2014/1/21','2014/1/22','2014/1/23','2014/1/24','2014/2/10','2014/2/11','2014/2/12','2014/2/13','2014/2/14','2014/2/17','2014/2/18','2014/2/19','2014/2/20','2014/2/21','2014/2/24','2014/2/25','2014/2/26','2014/2/27','2014/2/28','2014/3/3','2014/3/4','2014/3/5','2014/3/6','2014/3/7','2014/3/10','2014/3/11','2014/3/12','2014/3/13','2014/3/14','2014/3/15','2014/3/17','2014/3/18','2014/3/19','2014/3/20','2014/3/21','2014/3/24','2014/3/25','2014/3/26','2014/3/27','2014/3/28','2014/3/31','2014/4/1','2014/4/2','2014/4/3','2014/4/4','2014/4/8','2014/4/9','2014/4/10','2014/4/11','2014/4/14','2014/4/15','2014/4/16','2014/4/17','2014/4/18','2014/4/21','2014/4/22','2014/4/23','2014/4/24','2014/4/25','2014/4/28','2014/4/29','2014/4/30','2014/5/4','2014/5/5','2014/5/6','2014/5/7','2014/5/8','2014/5/9','2014/5/12','2014/5/13','2014/5/14','2014/5/15','2014/5/16','2014/5/17','2014/5/19','2014/5/20','2014/5/21','2014/5/22','2014/5/23','2014/5/24','2014/5/26','2014/5/27','2014/5/28','2014/5/29','2014/5/30','2014/6/3','2014/6/4','2014/6/5','2014/6/6','2014/6/9','2014/6/10','2014/6/11','2014/6/12','2014/6/13','2014/6/16','2014/6/17','2014/6/18','2014/6/19','2014/6/20','2014/6/23','2014/6/24','2014/6/25','2014/6/26','2014/6/27','2014/6/30','2014/7/1','2014/7/2','2014/7/3','2014/7/4','2014/7/7','2014/7/8','2014/7/9','2014/7/10','2014/7/11','2014/7/14','2014/7/15','2014/7/16','2014/7/17','2014/7/18','2014/7/21','2014/7/22','2014/7/23','2014/7/24','2014/7/25','2014/8/11','2014/8/12','2014/8/13','2014/8/14','2014/8/15','2014/8/18','2014/8/19','2014/8/20','2014/8/21','2014/8/22','2014/8/25','2014/8/26','2014/8/27','2014/8/28','2014/8/29','2014/8/30','2014/9/1','2014/9/2','2014/9/3','2014/9/4','2014/9/5','2014/9/9','2014/9/10','2014/9/11','2014/9/12','2014/9/13','2014/9/15','2014/9/16','2014/9/17','2014/9/18','2014/9/19','2014/9/20','2014/9/22','2014/9/23','2014/9/24','2014/9/25','2014/9/26','2014/9/28','2014/9/29','2014/9/30','2014/10/7','2014/10/8','2014/10/9','2014/10/10','2014/10/11','2014/10/13','2014/10/14','2014/10/15','2014/10/16','2014/10/17','2014/10/20','2014/10/21','2014/10/22','2014/10/23','2014/10/24','2014/10/25','2014/10/27','2014/10/28','2014/10/29','2014/10/30','2014/10/31','2014/11/3','2014/11/4','2014/11/5','2014/11/6','2014/11/7','2014/11/10','2014/11/11','2014/11/12','2014/11/13','2014/11/14','2014/11/17','2014/11/18','2014/11/19','2014/11/20','2014/11/21','2014/11/24','2014/11/25','2014/11/26','2014/11/27','2014/11/28','2014/12/1','2014/12/2','2014/12/3','2014/12/4','2014/12/5','2014/12/8','2014/12/9','2014/12/10','2015/1/20','2015/1/21','2015/1/22','2015/1/23','2015/1/24','2015/1/26','2015/1/27','2015/1/28','2015/1/29','2015/1/30','2015/2/2','2015/2/3','2015/2/4','2015/2/5','2015/2/6','2015/2/9','2015/2/10','2015/2/11','2015/3/2','2015/3/3','2015/3/4','2015/3/5','2015/3/6','2015/3/9','2015/3/10','2015/3/11','2015/3/12','2015/3/13','2015/3/16','2015/3/17','2015/3/18','2015/3/19','2015/3/20','2015/3/23','2015/3/24','2015/3/25','2015/3/26','2015/3/27','2015/3/30','2015/3/31','2015/4/1','2015/4/2','2015/4/3','2015/4/7','2015/4/8','2015/4/9','2015/4/10'],
				splitNumber:10,
			}
        ],
        yAxis : [
			 {
				name:'平均好品率',
                type : 'value',
				position: 'left',
				min:70,
				max:95,
				//scale: true,
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value}%',    // Template formatter!               
				},
            },
            {
				name:'大万数',
                type : 'value',
				position: 'right',				
				//min:84,
				//max:89,
				scale: true,
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value}车',    // Template formatter!               
				},
            }			
        ],
        series : [
            {
				name:'大万数',
                type:'line',
                smooth:true,
				yAxisIndex: 1,
				symbolSize: 0,
                itemStyle: LnStyle_Normal,/*,areaStyle: {type: 'default'}*/
                data:[70,72,62,54,72,77,66,57,51,58,83,72,69,55,79,81,76,92,63,91,136,123,113,113,107,123,128,93,96,111,114,93,72,74,78,107,111,126,123,123,140,139,144,126,55,125,116,128,126,108,100,112,125,127,110,119,150,158,148,141,137,150,158,135,122,159,150,153,139,130,148,135,135,141,128,145,128,104,152,146,154,144,114,114,140,131,136,133,117,125,143,146,150,125,29,119,157,145,149,103,127,145,146,121,121,150,140,142,125,120,141,139,140,126,118,133,131,136,113,97,142,137,125,129,116,130,129,128,114,105,125,133,131,119,120,144,127,119,39,58,112,122,126,103,113,128,137,137,122,112,130,135,123,117,19,97,125,130,130,118,111,131,124,105,76,99,119,122,124,101,42,107,132,120,122,115,117,116,23,87,107,106,100,84,96,112,95,96,86,85,98,101,107,99,30,94,109,102,106,60,56,84,100,98,83,90,103,99,90,85,84,100,100,85,86,93,103,94,95,58,90,111,108,104,87,81,59,28,30,35,35,35,28,51,76,83,82,46,74,92,95,93,76,84,95,28,71,99,90,102,92,89,104,97,74,47,86,98,99,91,58,88,96,101,102,82,58,38,91,81,76,84,98,94,61],
				//markPoint : MPtStyle,
				//markLine : MLnStyle,
			}, 
			 {
				name:'平均好品率',
                type:'line',
                smooth:true,				
				symbolSize: 0,
				itemStyle: LnStyle_Normal,/*,areaStyle: {type: 'default'}*/
                data:[86.58,86.36,85.63,82.9,84.63,82.03,84.84,81.93,83.83,82.89,84.87,85.89,81.26,84.52,81.87,82.42,84.78,85.11,83.05,83.66,84.21,84.53,86.87,86.35,85.34,84.57,86.66,84.61,85.42,86.78,86.83,87.6,88.04,88.66,90.53,89.39,87.24,87.74,84.62,86.21,87.48,87.09,87.5,87.78,90.04,88.57,87.68,87.15,88.04,85.93,86.98,89.28,87.54,88.2,87.38,85.84,88.73,88.63,88.36,87.38,87.35,88.61,88.82,89.21,87.91,90.54,88.95,89.59,89.06,89.36,88.05,89.2,89.83,88.15,87.37,88.54,87.99,89.87,88.57,88.93,88.49,87.8,87.06,89.01,87.96,87.91,90.56,89.73,88.66,87.37,89.69,88.23,88.51,89.66,81.36,87.92,89.42,89.21,87.96,88.08,88.17,88.72,87.55,88.79,87,88.47,89.08,89.52,88.32,88.88,88.44,88.38,89.91,89.78,87.06,89.03,88.68,89.2,89.34,88.53,88.28,87.61,87.67,87.44,86.32,87.29,87.03,87.61,87.45,88.34,87.91,87.53,86.3,87.33,86.65,87.13,86.92,87.51,86.15,81.84,85.11,84.58,84.13,85.83,84.21,84.47,87.21,87.19,88.4,86.52,86.93,86.72,89.27,88.06,82.71,88.22,86.53,86.8,85.45,85.89,85.48,88.18,87.05,88.91,85.2,87.99,88.96,88.55,89.19,88.29,80.34,90.24,90.54,90.62,90.49,90.41,88.58,88.11,86.87,87.18,88.85,87.91,88.23,87.87,86.3,86.73,86.42,86.71,86.59,87.9,88.51,88.77,89.21,88.76,86.35,87.38,85.9,85.23,84.86,85.96,83.25,87.38,86.77,88.21,86.68,86.73,86.54,85.26,85.05,87.55,85.56,84.52,86.92,86.31,88.27,86.71,86.37,87.24,87.81,86.95,85.7,85.92,89.44,87.01,86.53,86.11,89.65,89.11,86.15,81.53,85.92,86.18,85.95,84.46,84.81,85.14,87.68,87.28,86.7,89.74,88.5,88.59,87.15,87.55,88.42,88.1,86.34,86.27,86.33,87.94,85.62,86.4,87.04,86.54,88.63,90.53,87.28,85.84,86.83,87.58,88.23,86.03,84.82,87.77,87.34,88.11,88.77,85.85,84.57,81.74,80.98,83.6,89.21,86.88,89.56],
				markPoint : MPtStyle,
				markLine : MLnStyle,
			}, 
        ]
    },
	FakeAndGoodrate5 : {		
		title : {
                text: '凹正各机台每天平均好品率',
                subtext: '数据来源：质量综合管理系统数据库\n统计时间：2014年01月至2015年03月',
				x:'center',
            },
        tooltip : {
            trigger: 'axis',
			axisPointer:{
				type : 'cross',
				lineStyle: {
					type : 'dashed',
					width : 1
				}
			}
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
				//dataZoom : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
		legend: {
			data:['大万数','平均好品率'],
			y:70,
			//show:false,
			selected: {
				'大万数' : false
			},
		},
		dataZoom : {
            show : true,
            realtime: true,
            start : 0,
            end :100,
			//height:20,
        },
        calculable : true,
        xAxis : [
            {
				name:'日期',
                type : 'category',
				axisTick:{length:2},
                boundaryGap : true,//此处不将产量放进图表中（设为TRUE,柱形图会溢出边界）
				//此处数据动态生成
                data : ['2014/01/02','2014/01/03','2014/01/04','2014/01/06','2014/01/07','2014/01/08','2014/01/09','2014/01/10','2014/01/13','2014/01/14','2014/01/15','2014/01/16','2014/01/17','2014/01/18','2014/01/20','2014/01/21','2014/01/22','2014/01/23','2014/01/24','2014/01/25','2014/02/10','2014/02/11','2014/02/12','2014/02/13','2014/02/14','2014/02/17','2014/02/18','2014/02/19','2014/02/20','2014/02/21','2014/02/22','2014/02/24','2014/02/25','2014/02/26','2014/02/27','2014/03/03','2014/03/04','2014/03/05','2014/03/06','2014/03/07','2014/03/10','2014/03/11','2014/03/12','2014/03/13','2014/03/14','2014/03/17','2014/03/18','2014/03/19','2014/03/20','2014/03/21','2014/03/24','2014/03/25','2014/03/26','2014/03/27','2014/03/28','2014/03/31','2014/04/01','2014/04/02','2014/04/03','2014/04/04','2014/04/08','2014/04/09','2014/04/10','2014/04/11','2014/04/14','2014/04/15','2014/04/16','2014/04/17','2014/04/18','2014/04/21','2014/04/22','2014/04/23','2014/04/24','2014/04/25','2014/04/26','2014/04/28','2014/04/29','2014/05/04','2014/05/05','2014/05/06','2014/05/07','2014/05/08','2014/05/09','2014/05/12','2014/05/13','2014/05/14','2014/05/15','2014/05/16','2014/05/19','2014/05/20','2014/05/21','2014/05/22','2014/05/23','2014/05/26','2014/05/27','2014/05/28','2014/05/29','2014/05/30','2014/06/03','2014/06/04','2014/06/05','2014/06/06','2014/06/09','2014/06/10','2014/06/11','2014/06/12','2014/06/13','2014/06/16','2014/06/17','2014/06/18','2014/06/19','2014/06/20','2014/06/23','2014/06/24','2014/06/25','2014/06/26','2014/06/27','2014/07/01','2014/07/02','2014/07/03','2014/07/04','2014/07/07','2014/07/08','2014/07/09','2014/07/10','2014/07/11','2014/07/14','2014/07/15','2014/07/16','2014/07/17','2014/07/18','2014/07/21','2014/07/22','2014/07/23','2014/07/24','2014/07/25','2014/08/11','2014/08/12','2014/08/13','2014/08/14','2014/08/15','2014/08/18','2014/08/19','2014/08/20','2014/08/21','2014/08/22','2014/08/23','2014/08/25','2014/08/26','2014/08/27','2014/08/28','2014/08/29','2014/09/01','2014/09/02','2014/09/03','2014/09/04','2014/09/05','2014/09/09','2014/09/10','2014/09/11','2014/09/12','2014/09/15','2014/09/16','2014/09/17','2014/09/18','2014/09/19','2014/09/22','2014/09/23','2014/09/24','2014/09/25','2014/09/26','2014/09/28','2014/09/29','2014/10/07','2014/10/08','2014/10/09','2014/10/10','2014/10/13','2014/10/14','2014/10/15','2014/10/16','2014/10/17','2014/10/20','2014/10/21','2014/10/22','2014/10/23','2014/10/24','2014/10/25','2014/10/27','2014/10/28','2014/10/29','2014/10/30','2014/11/03','2014/11/04','2014/11/05','2014/11/06','2014/11/10','2014/11/11','2014/11/12','2014/11/13','2014/11/14','2014/11/17','2014/11/18','2014/11/19','2014/11/20','2014/11/21','2014/11/24','2014/11/25','2014/11/26','2014/11/27','2014/12/01','2014/12/02','2014/12/03','2015/01/12','2015/01/13','2015/01/14','2015/01/15','2015/01/16','2015/01/19','2015/01/20','2015/01/21','2015/01/22','2015/01/23','2015/01/26','2015/01/27','2015/01/28','2015/01/29','2015/01/30','2015/02/02','2015/02/03','2015/02/04','2015/02/05','2015/02/06','2015/02/09','2015/02/10','2015/02/11','2015/03/02','2015/03/03','2015/03/04','2015/03/05','2015/03/06','2015/03/09','2015/03/10','2015/03/11','2015/03/12','2015/03/13','2015/03/16','2015/03/17','2015/03/18','2015/03/19','2015/03/20','2015/03/23','2015/03/24','2015/03/25','2015/03/26','2015/03/27','2015/03/30','2015/03/31','2015/04/01'],
				splitNumber:10,
			}
        ],
        yAxis : [
			 {
				name:'平均好品率',
                type : 'value',
				position: 'left',
				min:70,
				max:95,
				//scale: true,
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value}%',    // Template formatter!               
				},
            },
            {
				name:'大万数',
                type : 'value',
				position: 'right',
				//min:84,
				//max:89,
				scale: true,
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value}车',    // Template formatter!               
				},
            }			
        ],
        series : [
            {
				name:'大万数',
                type:'line',
                smooth:true,
				yAxisIndex: 1,
				symbolSize: 0,
                itemStyle: LnStyle_Normal,/*,areaStyle: {type: 'default'}*/
                data:[25,30,26,33,42,46,45,33,22,46,52,49,40,11,40,49,51,59,44,29,29,63,66,53,62,49,63,53,44,45,49,38,61,54,38,37,42,36,50,50,38,43,31,38,34,35,60,62,53,40,30,59,54,42,23,15,33,39,37,46,32,58,47,52,31,45,48,45,44,46,51,51,56,45,31,46,32,31,58,51,61,61,46,35,43,45,54,66,35,52,45,50,22,24,42,39,39,14,24,41,57,38,32,50,67,53,36,48,55,45,60,62,31,53,42,60,37,53,53,57,50,44,51,60,53,59,37,43,63,55,58,55,42,67,57,12,28,77,67,52,58,32,53,64,54,48,41,40,39,46,40,16,21,53,52,37,33,33,42,55,50,30,66,44,48,41,40,67,65,50,42,34,15,40,60,51,43,50,54,57,51,52,55,68,54,71,63,11,56,71,70,62,51,54,63,59,58,38,61,49,42,43,45,43,51,57,49,50,45,24,46,44,21,19,18,18,20,23,18,41,48,53,37,32,38,53,50,57,41,54,60,67,63,62,60,43,47,58,82,68,49,48,61,81,88,71,58,93,99,102,90,73,102,106,93,48,63,19,19],
				//markPoint : MPtStyle,
				//markLine : MLnStyle,
			}, 
			 {
				name:'平均好品率',
                type:'line',
                smooth:true,				
				symbolSize: 0,
				itemStyle: LnStyle_Normal,/*,areaStyle: {type: 'default'}*/
                data:[79.4,81.01,80.35,80.9,79.87,80.76,83.72,75.5,75.43,78.19,78.35,78.6,75.66,90.01,80.15,80.16,85.02,79.9,83.09,78.74,78.59,86.02,84.1,78.6,83.12,81.68,80.13,82.85,82.82,81.73,81.26,82.78,85.78,81.73,83.94,79.7,85.71,88.18,84.61,85.51,86.41,84.57,86.29,86.68,80.68,82.1,86.83,87.39,85.81,83.33,85.47,84.08,86.75,86.94,87.76,89.07,80.57,85.32,86.01,86.67,89.33,89.3,84.47,86.58,81.74,84.59,84,89.18,84.43,84.06,84.63,87.68,88.39,83.49,88.6,80.81,84.43,85.02,88.28,85.4,82.58,89.78,84.72,85.37,85.77,87.37,89.34,89.93,85.45,83.84,88.46,87.61,92.15,87.96,85.16,82.85,86.84,87.12,82.44,85.49,85.23,86.56,87.79,84.58,87.74,90.2,85.96,84.41,91.22,80,82.76,91.28,83.5,80.63,80.24,86.19,86.23,86.9,85.08,85.75,85.39,80.28,83.18,82.17,86.92,84.42,86.61,81.86,82.47,81.12,81.72,81.75,79.3,80.45,79.89,76.4,83.92,82.33,85.34,85.35,82.93,82.27,80.54,85.1,82.15,82.77,81.73,78.44,83.26,82.62,84.54,83.79,72.39,78.02,81.69,80.55,75.11,75.95,90.22,87.05,90.45,86.82,87.8,85.86,85.67,84.74,82.39,84.6,86.6,84.44,83.81,81.74,89.22,81.29,83.36,81.56,85.39,87.93,88.66,85.95,82.54,85.23,82.94,85.39,79.33,84.62,84.62,77.11,82.04,79.05,82.85,81.71,81.09,85.04,82.09,85.4,81.22,85.41,83.96,83.82,87.3,81.78,84.57,85.17,86.33,85.21,83.24,85.86,86.72,86.39,83.21,83.92,86.96,89.18,89.01,86.78,86.8,90.39,81.84,83.46,85.46,86.29,87.55,81.31,85.29,86.9,85.58,86.3,85.53,88.44,86.64,87.07,86.51,85.31,84.41,84.61,83.99,85.1,87.13,84.6,85.8,86.39,86.67,84.94,83.97,87.08,83.12,85.27,88.09,86.46,85.14,84.26,82.86,82.59,87.01,84.06,86.57,88.46,91.38],
				markPoint : MPtStyle,
				markLine : MLnStyle,
			}, 
        ]
    },
	'FakeAndGoodrate6':{
		title : {
                text: '印码好品率随星期变化情况',
                subtext: '数据来源：质量综合管理系统数据库',
				x:'center',
            },
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            data:['好品率','产量'],
			x:'center',
			y:60,
			itemGap:20,
			selected:{
				'产量': false,
			}
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        xAxis : [
            {
				name:'星期',
				axisTick : {show: false},//隐藏标记线,
                type : 'category',
                boundaryGap : true,
                data : ['星期一','星期二','星期三','星期四','星期五','星期六'],
			}
        ],
        yAxis : [
            {
				name:'平均好品率',
                type : 'value',
				position: 'left',
				//min:84,
				//max:89,
				scale: true,
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value} %',    // Template formatter!               
				},
            },
			{
                type : 'value',
				min:500,
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 18,
					formatter: '{value} 车',    // Template formatter!               
				},
            }
        ],
        series : [
            {
                name:'好品率',
                type:'line',
                smooth:true,
              //  itemStyle: {normal: {areaStyle: {type: 'default'}}},
				symbolSize: 8,
                data:[86.73,87.31,87.3,87.55,87.29,85.39],
				markPoint : MPtStyle,
				markLine : MLnStyle,
			},
            {
                name:'产量',
                type:'bar',barMaxWidth:80,
                smooth:true,
				yAxisIndex: 1,
                itemStyle : BarStyleTBlue,
                data:[4214,5336,5316,5130,4473,577],
			},		
        ]
	},
	FakeAndGoodrate7 : {		
		title : {
                text: '印码各好品率区间大万分布',
                subtext: '数据来源：质量综合管理系统数据库',
				x:'center',
            },
        tooltip : {
            trigger: 'axis',
			axisPointer:{
				type : 'cross',
				lineStyle: {
					type : 'dashed',
					width : 1
				}
			}
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
				//dataZoom : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
		legend: {
			data:['大万数','缺陷条数'],
			y:60,
			//show:false,
			selected: {
				'缺陷条数' : false,
			},
		},
		/*dataZoom : {
            show : true,
            realtime: true,
            start : 0,
            end :100,
			//height:20,
        },*/
        calculable : true,
        xAxis : [
            {
				name:'好品率区间\n     (%)',
                type : 'category',
				axisTick:{length:2},
                boundaryGap : false,//此处不将产量放进图表中（设为TRUE,柱形图会溢出边界）
				//此处数据动态生成
                data : (
					function (){
						var res = [];
						for(var i=10;i<=100;i+=10) {
							var j=i-10;
							res.push(j+'~'+i);
						}
						return res;
				})(),
				splitNumber:10,
			}
        ],
        yAxis : [
			 {
				name:'大万数(单位:万)',
                type : 'value',
				position: 'left',
				//min:70,
				//max:95,
				scale: true,
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value}',    // Template formatter!               
				},
            },
			{
				name:'缺陷条数',
                type : 'value',
				position: 'right',
				//min:70,
				//max:95,
				scale: true,
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value}条',    // Template formatter!               
				},
            }				
        ],
        series : [           
			 {
				name:'大万数',
                type:'line',
                smooth:true,				
				symbolSize: 8,
				itemStyle: {normal: {areaStyle: {type: 'default'}}},
                data:[9,12,28,51,131,343,905,2587,8738,12558],
				//markPoint : MPtStyle,
				//markLine : MLnStyle,
			}, 
			{
				name:'缺陷条数',
                type:'line',
                smooth:true,				
				symbolSize: 8,				
				yAxisIndex:1,
				itemStyle: {normal: {areaStyle: {type: 'default'}}},
                data:[26546,54090,22864,16668,13409,10488,7721,5398,3077,1403],
				//markPoint : MPtStyle,
				//markLine : MLnStyle,
			},
			{
				name:'大万数',
				type:'pie',
				tooltip : {
					trigger: 'item',
					formatter: '{a} <br/>{b} : {c} ({d}%)'
				},
				center: ['18%','27%'],
				radius : [0, 50],
				itemStyle :　{
					normal : {
						label : {
							show :true,
							position:'outter',
							formatter: "{b}\n({d}%)",
						},
						labelLine : {
							show : true,
							length : 20
						},
					},
				},
				data:[
					/*{name:'20以下',value:21},
					{name:'20%以上',value:28},
					{name:'30%以上',value:51},
					{name:'40%以上',value:131},
					{name:'50%以上',value:343},*/
					{name:'70%以下',value:1479},
					{name:'70%以上',value:2587},
					{name:'80%以上',value:8738},
					{name:'90%以上',value:12558},
				]
			}
        ]
    },
	FakeAndGoodrate8 : {		
		title : {
                text: '印码各好品率区间大万分布',
                subtext: '数据来源：质量综合管理系统数据库',
				x:'center',
            },
        tooltip : {
            trigger: 'axis',
			axisPointer:{
				type : 'cross',
				lineStyle: {
					type : 'dashed',
					width : 1
				}
			}
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
				//dataZoom : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
		legend: {
			data:['大万数','缺陷条数'],
			y:60,
			//show:false,
			selected: {
				'缺陷条数' : false,
			},
		},
		dataZoom : {
            show : true,
            realtime: true,
            start : 0,
            end :100,
			//height:20,
        },
        calculable : true,
        xAxis : [
            {
				name:'好品率区间\n     (%)',
                type : 'category',
				axisTick:{length:2},
                boundaryGap : false,//此处不将产量放进图表中（设为TRUE,柱形图会溢出边界）
				//此处数据动态生成
                data : [5,7,8,10,12,13,14,15,16,17,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100],
				splitNumber:10,
			}
        ],
        yAxis : [
			 {
				name:'大万数(单位:万)',
                type : 'value',
				position: 'left',
				//min:70,
				//max:95,
				scale: true,
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value}',    // Template formatter!               
				},
            },
			{
				name:'缺陷条数',
                type : 'value',
				position: 'right',
				//min:70,
				//max:95,
				scale: true,
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value}条',    // Template formatter!               
				},
            }				
        ],
        series : [           
			 {
				name:'大万数',
                type:'line',
                smooth:true,				
				symbolSize: 0,
				//itemStyle: LnStyle_Normal,
				itemStyle: {normal: {areaStyle: {type: 'default'},label:{show:false}}},
                data:[2,1,3,3,1,2,2,1,2,2,2,5,3,1,1,2,5,2,3,3,3,3,1,6,4,8,6,7,5,5,6,7,13,17,7,9,5,17,22,17,17,23,30,24,27,39,37,32,37,44,50,72,73,70,74,73,90,92,102,122,137,137,166,201,208,225,279,285,327,343,416,452,546,600,630,781,893,986,1147,1282,1421,1574,1730,1841,1824,1749,1638,1328,747,124,3],
				markPoint : MPtStyle,
				//markLine : MLnStyle,
			}, 
			{
				name:'缺陷条数',
                type:'line',
                smooth:true,				
				symbolSize: 0,				
				yAxisIndex:1,
				//itemStyle: LnStyle_Normal,
				itemStyle: {normal: {areaStyle: {type: 'default'},label:{show:false}}},
                data:[46975,6263,19068,27165,10967,22638,28409,315943,17608,65779,26654,22833,58883,27532,19433,16458,17931,16518,17198,16194,15544,23045,18306,15716,19277,18084,14191,17194,15324,16102,13984,15909,17681,15301,15352,11060,9642,12503,11452,14131,11486,10831,10586,10803,11414,11828,11014,10812,8671,10042,9719,8471,9305,7986,7879,7945,7499,7036,8122,7536,6617,7394,6669,5985,6150,5273,5750,5327,5127,4522,4389,4304,4123,3841,3542,3451,3268,3053,2627,2527,2308,2074,1893,1672,1457,1222,1040,776,574,385,45],
				//markPoint : MPtStyle,
				//markLine : MLnStyle,
			}, 
        ]
    },
	FakeAndGoodrate3 : {		
		title : {
                text: '印码各机台平均好品率对比',
                subtext: '数据来源：质量综合管理系统数据库',
				x:'center',
            },
        tooltip : {
            trigger: 'item',
			/*axisPointer:{
				type : 'cross',
				lineStyle: {
					type : 'dashed',
					width : 1
				}
			}*/
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
				//dataZoom : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
		legend: {
			data:['平均好品率','缺陷条数'],
			y:70,
			selected: {
				'缺陷条数' : false
			},
			//show:false,
		},
		/* dataZoom : {
            show : true,
            realtime: true,
            start : 0,
            end :100,
			//height:20,
        },*/
        calculable : true,
        xAxis : [
            {
				name:'机台',
                type : 'category',
				axisTick:{length:2},
                boundaryGap : true,//此处不将产量放进图表中（设为TRUE,柱形图会溢出边界）
				//此处数据动态生成
                data : ['大张1#','大张2#','大张3#','大张4#','大张5#','大张6#','DMJ12-1#','DMJ12-2#','M81D-1#','M81D-2#','多功能-1#','多功能-2#','多功能-3#','接线印码机','丝凸-2#'],
			}
        ],
        yAxis : [
            {
				name:'平均好品率',
                type : 'value',
				position: 'left',
				//min:84,
				//max:89,
				scale: true,
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value}%',    // Template formatter!               
				},
            },
			 {
				name:'缺陷条数',
                type : 'value',
				position: 'right',
				//min:84,
				//max:89,
				scale: true,
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value}条',    // Template formatter!               
				},
            }
        ],
        series : [
            {
				name:'缺陷条数',
                type:'bar',
                smooth:true,
				symbolSize: 6,
				yAxisIndex: 1,
                itemStyle: {normal: {label:{show:true}}},/*,areaStyle: {type: 'default'}*/
                data:[5907,5651,3300,2497,3503,5120,1504,1481,2714,3538,4057,4345,3957,2141,3842],
				//markPoint : MPtStyle,
				//markLine : MLnStyle,
			}, 
			 {
				name:'平均好品率',
                type:'bar',
                smooth:true,				
				symbolSize: 6,
				itemStyle: {normal: {label:{show:true}}},/*,areaStyle: {type: 'default'}*/
                data:[85.11,89.43,90.81,89.56,90.07,88.95,92.61,91.32,82.92,81.21,88.86,85.81,85.24,89.19,80.52],
				//markPoint : MPtStyle,
				//markLine : MLnStyle,
			}, 
        ]
    },
	FakeAndGoodrate9 : {		
		title : {
                text: '印码各机台未检情况对比',
                subtext: '数据来源：质量综合管理系统数据库',
				x:'center',
            },
        tooltip : {
            trigger: 'item',
			/*axisPointer:{
				type : 'cross',
				lineStyle: {
					type : 'dashed',
					width : 1
				}
			}*/
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
				//dataZoom : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
		legend: {
			data:['平均未检数','未检总数'],
			y:70,
			selected: {
				'未检总数' : false
			},
			//show:false,
		},
		/*dataZoom : {
            show : true,
            realtime: true,
            start : 0,
            end :100,
			//height:20,
        },*/
        calculable : true,
        xAxis : [
            {
				name:'机台',
                type : 'category',
				axisTick:{length:2},
                boundaryGap : true,//此处不将产量放进图表中（设为TRUE,柱形图会溢出边界）
				//此处数据动态生成
                data : ['大张3号机','接线印码机','大张6号机','大张5号机','DMJ12-1号机','多功能-3号机','多功能-2号机','M81D-2号机','DMJ12-2号机','M81D-1号机','多功能-1号机'],
			}
        ],
        yAxis : [
            {
				name:'平均未检条数(条/万)',
                type : 'value',
				position: 'left',
				//min:84,
				//max:89,
				scale: true,
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value}条',    // Template formatter!               
				},
            },
			{
				name:'未检总量(条)',
                type : 'value',
				position: 'left',
				//min:84,
				//max:89,
				scale: true,
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value}条',    // Template formatter!               
				},
            }
        ],
        series : [
            {
				name:'平均未检数',
                type:'bar',
                smooth:true,
				symbolSize: 6,
                itemStyle: {normal: {label:{show:true}}},/*,areaStyle: {type: 'default'}*/
                data:[16.62,13.81,11.01,6.58,4.48,4.09,3.86,3.08,2.1,1.06,0.9],
				//markPoint : MPtStyle,
				//markLine : MLnStyle,
			},
			{
				name:'未检总数',
                type:'bar',
                smooth:true,
				symbolSize: 6,
				yAxisIndex: 1,
                itemStyle: {normal: {label:{show:true}}},/*,areaStyle: {type: 'default'}*/
                data:[20930,24416,24416,13728,3094,9809,8805,5458,3275,2063,2081],
				//markPoint : MPtStyle,
				//markLine : MLnStyle,
			}
        ]
    },
	FakeAndGoodrate10 : {		
		title : {
                text: '印码工序每月未检情况对比',
                subtext: '数据来源：质量综合管理系统数据库',
				x:'center',
            },
        tooltip : {
            trigger: 'item',
			/*axisPointer:{
				type : 'cross',
				lineStyle: {
					type : 'dashed',
					width : 1
				}
			}*/
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
				//dataZoom : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
		legend: {
			data:['平均未检数','未检总数'],
			y:70,
			selected: {
				'未检总数' : false
			},
			//show:false,
		},
		/*dataZoom : {
            show : true,
            realtime: true,
            start : 0,
            end :100,
			//height:20,
        },*/
        calculable : true,
        xAxis : [
            {
				name:'机台',
                type : 'category',
				axisTick:{length:2},
                boundaryGap : true,//此处不将产量放进图表中（设为TRUE,柱形图会溢出边界）
				//此处数据动态生成
                data : ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
			}
        ],
        yAxis : [
            {
				name:'平均未检条数(条/万)',
                type : 'value',
				position: 'left',
				//min:84,
				//max:89,
				scale: true,
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value}条',    // Template formatter!               
				},
            },
			{
				name:'未检总量(条)',
                type : 'value',
				position: 'left',
				//min:84,
				//max:89,
				scale: true,
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value}条',    // Template formatter!               
				},
            }
        ],
        series : [
            {
				name:'平均未检数',
                type:'bar',
                smooth:true,
				symbolSize: 6,
                itemStyle: {normal: {label:{show:true}}},/*,areaStyle: {type: 'default'}*/
                data:[1.63,4.61,5.91,4.03,1.66,1.57,4.32,8.01,2.3,14.66,11.9,15.01,],
				//markPoint : MPtStyle,
				//markLine : MLnStyle,
			},
			{
				name:'未检总数',
                type:'bar',
                smooth:true,
				symbolSize: 6,
				yAxisIndex: 1,
                itemStyle: {normal: {label:{show:true}}},/*,areaStyle: {type: 'default'}*/
                data:[1362,5353,10358,8517,3583,3271,7720,12274,5634,28865,21349,9789],
				//markPoint : MPtStyle,
				//markLine : MLnStyle,
			}
        ]
    },
	FakeAndGoodrate11 : {		
		title : {
                text: '印码工序各机台未检情况对比(2014年Q4)',
                subtext: '数据来源：质量综合管理系统数据库',
				x:'center',
            },
        tooltip : {
            trigger: 'item',
			/*axisPointer:{
				type : 'cross',
				lineStyle: {
					type : 'dashed',
					width : 1
				}
			}*/
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
				//dataZoom : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
		legend: {
			data:['平均未检数','未检总数'],
			y:70,
			selected: {
				'未检总数' : false
			},
			//show:false,
		},
		/*dataZoom : {
            show : true,
            realtime: true,
            start : 0,
            end :100,
			//height:20,
        },*/
        calculable : true,
        xAxis : [
            {
				name:'机台',
                type : 'category',
				axisTick:{length:2},
                boundaryGap : true,//此处不将产量放进图表中（设为TRUE,柱形图会溢出边界）
				//此处数据动态生成
                data : ['大张3号机','大张6号机','大张5号机','M81D-2号机','多功能-3号机','丝凸-2号机','DMJ12-2号机','多功能-2号机','接线印码机','多功能-1号机','M81D-1号机'],
			}
        ],
        yAxis : [
            {
				name:'平均未检条数(条/万)',
                type : 'value',
				position: 'left',
				//min:84,
				//max:89,
				scale: true,
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value}条',    // Template formatter!               
				},
            },
			{
				name:'未检总量(条)',
                type : 'value',
				position: 'left',
				//min:84,
				//max:89,
				scale: true,
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value}条',    // Template formatter!               
				},
            }
        ],
        series : [
            {
				name:'平均未检数',
                type:'bar',
                smooth:true,
				symbolSize: 6,
                itemStyle: {normal: {label:{show:true}}},/*,areaStyle: {type: 'default'}*/
                data:[101.11,47.69,18.77,2.92,2.85,2.08,2.08,1.58,1.25,1.24,0.98,],
				//markPoint : MPtStyle,
				//markLine : MLnStyle,
			},
			{
				name:'未检总数',
                type:'bar',
                smooth:true,
				symbolSize: 6,
				yAxisIndex: 1,
                itemStyle: {normal: {label:{show:true}}},/*,areaStyle: {type: 'default'}*/
                data:[20930,24416,8728,1160,1511,50,802,849,512,673,422],
				//markPoint : MPtStyle,
				//markLine : MLnStyle,
			}
        ]
    },
	FakeAndGoodrate12 : {		
		title : {
                text: '印码工序各机台缺陷分布对比',
                subtext: '数据来源：质量综合管理系统数据库',
				x:'center',
            },
        tooltip : {
            trigger: 'item',
			/*axisPointer:{
				type : 'cross',
				lineStyle: {
					type : 'dashed',
					width : 1
				}
			}*/
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
				//dataZoom : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
		legend: {
			data:['正面','背面','透视'],
			y:70,
			//selected: {
			//	'缺陷条数' : false
			//},
			//show:false,
		},
		/*dataZoom : {
            show : true,
            realtime: true,
            start : 0,
            end :100,
			//height:20,
        },*/
        calculable : true,
        xAxis : [
            {
				name:'机台',
                type : 'category',
				axisTick:{length:2},
                boundaryGap : true,//此处不将产量放进图表中（设为TRUE,柱形图会溢出边界）
				//此处数据动态生成
                data : ['DMJ12-1号机','DMJ12-2号机','M81D-1号机','M81D-2号机','大张5号机','大张6号机','多功能-1号机','多功能-2号机','多功能-3号机','接线印码机'],
			}
        ],
        yAxis : [
            {
				name:'平均缺陷条数(条/万)',
                type : 'value',
				position: 'left',
				//min:84,
				//max:89,
				scale: true,
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value}条',    // Template formatter!               
				},
            }
        ],
        series : [
            {
				name:'正面',
                type:'bar',
                smooth:true,
				symbolSize: 6,
				stack: '总量',
                itemStyle: {normal: {label:{show:true,position:'insideTop'}}},/*,areaStyle: {type: 'default'}*/
                data:[1007,806,2440,2102,1225,3898,2107,2722,2032,902],
				//markPoint : MPtStyle,
				//markLine : MLnStyle,
			},
			{
				name:'背面',
                type:'bar',
                smooth:true,
				symbolSize: 6,
				stack: '总量',
                itemStyle: {normal: {label:{show:true,position:'insideTop'}}},/*,areaStyle: {type: 'default'}*/
                data:[505,600,587,1141,1414,2690,1214,1816,2204,883],
				//markPoint : MPtStyle,
				//markLine : MLnStyle,
			},
			{
				name:'透视',
                type:'bar',
                smooth:true,
				symbolSize: 6,
				stack: '总量',
                itemStyle: {normal: {label:{show:true,position:'top'}}},/*,areaStyle: {type: 'default'}*/
                data:[40,51,45,457,190,200,735,249,56,466],
				//markPoint : MPtStyle,
				//markLine : MLnStyle,
			}
        ]
    },
	FakeAndGoodrate14 : {		
		title : {
                text: '小张核查与码后核查质量情况对比',
                subtext: '数据来源：质量综合管理系统数据库\n(不包含大张1、2、4号机及丝凸2号机)',
				x:'center',
            },
        tooltip : {
            trigger: 'item',
			/*axisPointer:{
				type : 'cross',
				lineStyle: {
					type : 'dashed',
					width : 1
				}
			}*/
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
				//dataZoom : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
		legend: {
			data:['平均好品率','缺陷总数','实废条数','拆包量','大万数'],
			y:40,
			x:'60%',
			selected: {
				'大万数' : false,
				'实废条数' : false,
				'缺陷总数' : false
			},
			//show:false,
		},
		/*dataZoom : {
            show : true,
            realtime: true,
            start : 0,
            end :100,
			//height:20,
        },*/
        calculable : true,
        yAxis : [
            {
				//name:'机台',
                type : 'category',
				axisTick:{length:2},
                boundaryGap : true,//此处不将产量放进图表中（设为TRUE,柱形图会溢出边界）
				//此处数据动态生成
                data : ['小张核查','码后核查'],
			}
        ],
        xAxis : [            
			{				
                type : 'value',
				position: 'left',
				min:0,
				//max:60,
				scale: true,
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value}',    // Template formatter!               
				},
            },			
        ],
        series : [
            {
				name:'平均好品率',
                type:'bar',barMaxWidth:80,
                smooth:true,
				symbolSize: 6,
                itemStyle: {normal: {label:{show:true,position:'insideRight',formatter: '{c}%'}}},/*,areaStyle: {type: 'default'}*/
                data:[89.92,86.75],
				//markPoint : MPtStyle,
				//markLine : MLnStyle,
			},
			{
				name:'拆包量',
                type:'bar',barMaxWidth:80,
                smooth:true,
				symbolSize: 6,
                itemStyle: {normal: {label:{show:true,position:'insideRight',formatter: '{c}包/万'}}},/*,areaStyle: {type: 'default'}*/
                data:[30,36],
				//markPoint : MPtStyle,
				//markLine : MLnStyle,
			},
			{
				name:'缺陷总数',
                type:'bar',barMaxWidth:80,
                smooth:true,
				yAxisIndex: 0,
				symbolSize: 6,
                itemStyle: {normal: {label:{show:true,position:'insideRight',formatter: '{c}条/万'}}},/*,areaStyle: {type: 'default'}*/
                data:[3642,3052],
				//markPoint : MPtStyle,
				//markLine : MLnStyle,
			},
			{
				name:'实废条数',
                type:'bar',barMaxWidth:80,
                smooth:true,
				yAxisIndex: 0,
				symbolSize: 6,
                itemStyle: {normal: {label:{show:true,position:'insideRight',formatter: '{c}条/万'}}},/*,areaStyle: {type: 'default'}*/
                data:[151,170],
				//markPoint : MPtStyle,
				//markLine : MLnStyle,
			},
			{
				name:'大万数',
                type:'bar',barMaxWidth:80,
                smooth:true,
				yAxisIndex: 0,
				symbolSize: 6,
                itemStyle: {normal: {label:{show:true,position:'insideRight',formatter: '{c}万'}}},/*,areaStyle: {type: 'default'}*/
                data:[5440,14494],
				//markPoint : MPtStyle,
				//markLine : MLnStyle,
			}			
        ]
    },
	BlackAndWhite : {		
		title : {
                text: '白班与中班质量对比',
                subtext: '数据来源：质量综合管理系统数据库',
				x:'center',
            },
        tooltip : {
            trigger: 'item',
			/*axisPointer:{
				type : 'cross',
				lineStyle: {
					type : 'dashed',
					width : 1
				}
			}*/
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
				//dataZoom : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
		legend: {
			data:['平均好品率','实废开数','拆包量'],
			y:40,
			x:'60%',
			selected: {
				'平均好品率' : false,
				'拆包量' : false
			},
			//show:false,
		},
		/*dataZoom : {
            show : true,
            realtime: true,
            start : 0,
            end :100,
			//height:20,
        },*/
        calculable : true,
        yAxis : [
            {
				//name:'机台',
                type : 'category',
				axisTick:{length:2},
                boundaryGap : true,//此处不将产量放进图表中（设为TRUE,柱形图会溢出边界）
				//此处数据动态生成
                data : ['凹印白班','凹印中班','胶印白班','胶印中班'],
			}
        ],
        xAxis : [            
			{				
                type : 'value',
				position: 'left',				
				//max:60,
				scale: true,
				min:0,
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value}',    // Template formatter!               
				},
            },			
        ],
        series : [
            {
				name:'平均好品率',
                type:'bar',barMaxWidth:80,
                smooth:true,
				symbolSize: 6,
                itemStyle: {normal: {label:{show:true,position:'insideRight',formatter: '{c}%'}}},/*,areaStyle: {type: 'default'}*/
                data:[85.22,84.9,85.66,85.69],
				//markPoint : MPtStyle,
				//markLine : MLnStyle,
			},
			{
				name:'拆包量',
                type:'bar',barMaxWidth:80,
                smooth:true,
				symbolSize: 6,
                itemStyle: {normal: {label:{show:true,position:'insideRight',formatter: '{c}包/万'}}},/*,areaStyle: {type: 'default'}*/
                data:[37.8,38.4,37.6,37.3],
				//markPoint : MPtStyle,
				//markLine : MLnStyle,
			},
			{
				name:'实废开数',
                type:'bar',barMaxWidth:80,
                smooth:true,
				yAxisIndex: 0,
				symbolSize: 6,
                itemStyle: {normal: {label:{show:true,position:'insideRight',formatter: '{c}开/万'}}},/*,areaStyle: {type: 'default'}*/
                data:[116.7,118,117.4,113.5],
				//markPoint : MPtStyle,
				//markLine : MLnStyle,
			}		
        ]
    },
	FakeAndGoodrate13 : {		
		title : {
                text: '印码工序各机台人工判废情况',
                subtext: '数据来源：质量综合管理系统数据库',
				x:'center',
            },
        tooltip : {
            trigger: 'item',
			/*axisPointer:{
				type : 'cross',
				lineStyle: {
					type : 'dashed',
					width : 1
				}
			}*/
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
				//dataZoom : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
		legend: {
			data:['实废条数','拆包量','实废比例'],
			y:40,
			x:'70%',
			selected: {
				'实废条数' : false
			},
			//show:false,
		},
		/*dataZoom : {
            show : true,
            realtime: true,
            start : 0,
            end :100,
			//height:20,
        },*/
        calculable : true,
        xAxis : [
            {
				name:'机台',
                type : 'category',
				axisTick:{length:2},
                boundaryGap : true,//此处不将产量放进图表中（设为TRUE,柱形图会溢出边界）
				//此处数据动态生成
                data : ['DMJ12-1号机','DMJ12-2号机','多功能-1号机','接线印码机','多功能-3号机','M81D-1号机','多功能-2号机','M81D-2号机','大张5号机','大张6号机','大张3号机'],
			}
        ],
        yAxis : [            
			{
				name:'拆包量(包/万)',
                type : 'value',
				position: 'left',
				min:0,
				//max:60,
				scale: true,
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value}包',    // Template formatter!               
				},
            },
			{
				name:'实废条数(条/万)',
                type : 'value',
				position: 'right',
				//min:84,
				//max:89,
				scale: true,
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value}条',    // Template formatter!               
				},
            },
			{
				name:'实废比例(%)',
                type : 'value',
				position: 'right',
				//min:84,
				//max:89,
				scale: true,
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value}%',    // Template formatter!               
				},
            }
        ],
        series : [
            {
				name:'实废条数',
                type:'bar',
                smooth:true,
				yAxisIndex: 1,
				symbolSize: 6,
                itemStyle: {normal: {label:{show:true,position:'insideTop'}}},/*,areaStyle: {type: 'default'}*/
                data:[169,145,271,119,185,122,179,135,140,180,94],
				//markPoint : MPtStyle,
				//markLine : MLnStyle,
			},
			{
				name:'拆包量',
                type:'bar',
                smooth:true,
				yAxisIndex: 0,
				symbolSize: 6,
                itemStyle: {normal: {label:{show:true,position:'insideTop'}}},/*,areaStyle: {type: 'default'}*/
                data:[36,37,40,27,40,35,37,35,28,34,20],
				//markPoint : MPtStyle,
				//markLine : MLnStyle,
			},
			{
				name:'实废比例',
                type:'bar',
                smooth:true,
				yAxisIndex: 0,
				symbolSize: 6,
                itemStyle: {normal: {label:{show:true,position:'top',formatter: '{c}%',}}},/*,areaStyle: {type: 'default'}*/
                data:[11.66,10.06,6.96,5.96,4.83,4.59,4.38,4.38,4.23,3.86,2.99],
				//markPoint : MPtStyle,
				//markLine : MLnStyle,
			}
        ]
    },
	FakeAndGoodrate15 : {		
		title : {
                text: '图像判废人员每天判废情况对比',
                subtext: '数据来源：质量综合管理系统数据库',
				x:'center',
            },
        tooltip : {
            trigger: 'item',
			/*axisPointer:{
				type : 'cross',
				lineStyle: {
					type : 'dashed',
					width : 1
				}
			}*/
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
				//dataZoom : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
		legend: {
			data:['判废量','判废万数'],
			y:70,
			selected: {
				'判废万数' : false
			},
			//show:false,
		},
		/*dataZoom : {
            show : true,
            realtime: true,
            start : 0,
            end :100,
			//height:20,
        },*/
        calculable : true,
        xAxis : [
            {
				name:'人员',
                type : 'category',
				axisTick:{length:2},
                boundaryGap : true,//此处不将产量放进图表中（设为TRUE,柱形图会溢出边界）
				//此处数据动态生成
                data : ['李小平','刘照英','龚季敏','张素珍','杜希','蒋静','李鹤玲','蒙娅','邓丽','何建英','何莉','杨亚蓉','彭瑶','夏志英','龙晓凤','何桂莲','郭芳'],
			}
        ],
        yAxis : [
            {
				name:'平均条数(条/天)',
                type : 'value',
				position: 'left',
				min:0,
				//max:89,
				scale: true,
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value}条',    // Template formatter!               
				},
            },
			{
				name:'大万数(万/天)',
                type : 'value',
				position: 'left',
				min:0,
				//max:89,
				scale: true,
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value}条',    // Template formatter!               
				},
            }
        ],
        series : [
            {
				name:'判废量',
                type:'bar',
                smooth:true,
				symbolSize: 6,
                itemStyle: {normal: {label:{show:true,position:'insideTop'},color:'rgb(106,117,141)'}},
                data:[25088,24654,24513,23406,23021,22330,22308,21998,21944,21942,21931,21867,21598,21476,18125,17957,16843],
				//markPoint : MPtStyle,
				markLine : MLnStyle,
			},
			{
				name:'判废万数',
                type:'bar',
                smooth:true,
				symbolSize: 6,
				yAxisIndex: 1,
                itemStyle: {normal: {label:{show:true,position:'insideTop'},color:'rgb(144,209,81)'}},
                data:[8.04,8.21,7.61,7.57,7.27,7.22,6.86,6.87,6.84,6.85,7.13,6.42,6.59,6.9,5.38,5.09,4.95],
				//markPoint : MPtStyle,
				markLine : MLnStyle,
			}
        ]
    },
	FakeAndGoodrate26 : {		
		title : {
                text: '图像判废人员每天判废情况对比',
                subtext: '数据来源：质量综合管理系统数据库\n统计时间:2015年4月至5月26日',
				x:'center',
            },
        tooltip : {
            trigger: 'item',
			/*axisPointer:{
				type : 'cross',
				lineStyle: {
					type : 'dashed',
					width : 1
				}
			}*/
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
				//dataZoom : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
		legend: {
			data:['判废量','判废万数'],
			y:70,
			selected: {
				'判废万数' : false
			},
			//show:false,
		},
		/*dataZoom : {
            show : true,
            realtime: true,
            start : 0,
            end :100,
			//height:20,
        },*/
        calculable : true,
        xAxis : [
            {
				name:'人员',
                type : 'category',
				axisTick:{length:2},
                boundaryGap : true,//此处不将产量放进图表中（设为TRUE,柱形图会溢出边界）
				//此处数据动态生成
                data : ['张素珍','龚季敏','龙晓凤','何桂莲','郭芳','李小平','杨亚蓉','李鹤玲','邓丽','蒙娅','何莉','刘照英','蒋静','夏志英','杜希','何建英'],
			}
        ],
        yAxis : [
            {
				name:'平均条数(条/天)',
                type : 'value',
				position: 'left',
				min:0,
				//max:89,
				scale: true,
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value}条',    // Template formatter!               
				},
            },
			{
				name:'大万数(万/天)',
                type : 'value',
				position: 'left',
				min:0,
				//max:89,
				scale: true,
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value}条',    // Template formatter!               
				},
            }
        ],
        series : [
            {
				name:'判废量',
                type:'bar',
                smooth:true,
				symbolSize: 6,
                itemStyle: {normal: {label:{show:true,position:'insideTop'},color:'rgb(106,117,141)'}},
                data:[22791,22442,22257,21745,21478,21382,21148,20921,20884,20875,20857,20686,20631,20200,20101,19530],
				//markPoint : MPtStyle,
				markLine : MLnStyle,
			},
			{
				name:'判废万数',
                type:'bar',
                smooth:true,
				symbolSize: 6,
				yAxisIndex: 1,
                itemStyle: {normal: {label:{show:true,position:'insideTop'},color:'rgb(144,209,81)'}},
                data:[11.3,11.4,8,8.6,8,7.9,7.2,7.7,7.5,7.1,7.6,7.3,6.8,7.5,7.1,7.7],
				//markPoint : MPtStyle,
				markLine : MLnStyle,
			}
        ]
    },
	FakeAndGoodrate28 : {		
		title : {
                text: '排活系统应用前后判废情况对比',
                subtext: '数据来源：质量综合管理系统数据库',
				x:'center',
            },
		tooltip : {
			formatter: "{a} <br/>{c} {b}"
		},
		legend: {
			orient : 'vertical',
			data:['应用前','应用后'],
			x : 'center',
			y : 'center',
			itemGap:200,
			//show:false,
		},
		toolbox: {
			show : true,
			feature : {
				mark : {show: true},
				restore : {show: true},
				saveAsImage : {show: true}
			}
		},
		series : [
			{
				name:'应用前',
				type:'gauge',
				min:0,
				max:3000,
				splitNumber:10,
				radius : '60%',
				center : ['75%', '40%'],    // 默认全局居中
				startAngle: 180,
				endAngle: 0,
				axisLine: {            // 坐标轴线
					lineStyle: {       // 属性lineStyle控制线条样式
						width: 10
					}
				},
				axisTick: {            // 坐标轴小标记
					length :15,        // 属性length控制线长
					lineStyle: {       // 属性lineStyle控制线条样式
						color: 'auto'
					}
				},
				splitLine: {           // 分隔线
					length :20,         // 属性length控制线长
					lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
						color: 'auto'
					}
				},
				title : {
					textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
						//fontWeight: 'bolder',
						//fontSize: 20,
						fontStyle: 'italic'
					}
				},
				detail : {
					textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
						fontWeight: 'bolder'
					},
					offsetCenter: [0, 8],       // x, y，单位px
				},
				data:[{value: 2200, name: '方差(判废量)'}]
			},
			{
				name:'应用后',
				type:'gauge',
				min:0,
				max:3000,
				splitNumber:10,
				radius : '60%',
				center : ['75%', '90%'],    // 默认全局居中
				startAngle: 180,
				endAngle: 0,
				axisLine: {            // 坐标轴线
					lineStyle: {       // 属性lineStyle控制线条样式
						width: 10
					}
				},
				axisTick: {            // 坐标轴小标记
					length :15,        // 属性length控制线长
					lineStyle: {       // 属性lineStyle控制线条样式
						color: 'auto'
					}
				},
				splitLine: {           // 分隔线
					length :20,         // 属性length控制线长
					lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
						color: 'auto'
					}
				},
				title : {
					textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
						//fontWeight: 'bolder',
						//fontSize: 20,
						fontStyle: 'italic'
					}
				},
				detail : {
					textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
						fontWeight: 'bolder'
					},
					offsetCenter: [0, 8],       // x, y，单位px
				},
				data:[{value: 875, name: '方差(判废量)'}]
			},
			{
				name:'应用前',
				type:'gauge',
				center : ['25%', '40%'],    // 默认全局居中
				radius : '60%',
				min:0,
				max:1,
				startAngle: 180,
				endAngle: 0,
				splitNumber:10,
				axisLine: {            // 坐标轴线
					lineStyle: {       // 属性lineStyle控制线条样式
						width: 8
					}
				},
				axisTick: {            // 坐标轴小标记
					length :12,        // 属性length控制线长
					lineStyle: {       // 属性lineStyle控制线条样式
						color: 'auto'
					}
				},
				splitLine: {           // 分隔线
					length :20,         // 属性length控制线长
					lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
						color: 'auto'
					}
				},
				pointer: {
					width:5
				},
				title : {
					offsetCenter: [0, '-30%'],       // x, y，单位px
				},
				detail : {
					textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
						fontWeight: 'bolder'
					},
					offsetCenter: [0, 8],       // x, y，单位px
				},
				data:[{value: 0.93, name: '方差(大万数)'}]
			},
			{
				name:'应用后',
				type:'gauge',
				center : ['25%', '90%'],    // 默认全局居中
				radius : '60%',
				min:0,
				max:1,
				startAngle: 180,
				endAngle: 0,
				splitNumber:10,
				axisLine: {            // 坐标轴线
					lineStyle: {       // 属性lineStyle控制线条样式
						width: 8
					}
				},
				axisTick: {            // 坐标轴小标记
					length :12,        // 属性length控制线长
					lineStyle: {       // 属性lineStyle控制线条样式
						color: 'auto'
					}
				},
				splitLine: {           // 分隔线
					length :20,         // 属性length控制线长
					lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
						color: 'auto'
					}
				},
				pointer: {
					width:5
				},
				title : {
					offsetCenter: [0, '-30%'],       // x, y，单位px
				},
				detail : {
					textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
						fontWeight: 'bolder'
					},
					offsetCenter: [0, 8],       // x, y，单位px
				},
				data:[{value: 0.47, name: '方差(大万数)'}]
			},
		]
    },
	'FakeAndGoodrate27': {       
        title : {
            text: '印钞特抽班自动报表系统应用前后抽检对比',
            subtext: '数据来源：质量综合管理系统数据库\n统计时间：2015年5月18日前后\n(注：工艺规定图像判废按最低5%比例抽检)',
            x:'center'
        },
        tooltip : {
            trigger: 'axis',            
            axisPointer:{
                type : 'cross',
                lineStyle: {
                    type : 'dashed',
                    width : 1
                }
            },
            formatter: "{b} : {c} ({d}%)"
        },
        /*legend: {
            x : 'left',
            y : 'center',
            orient : 'vertical',
            data:['纸点','号码墨点','前工序']
        },*/
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        series : [
            {
                name:'5月18日前',
                type:'pie',                 
                //startAngle: 180,
                radius : [70, 140],
                center : ['25%', 280],
                //roseType : 'radius',//'area',//面积模式
                itemStyle : {
                    normal : {
                        color: function(params) {
                            var colorList = [
                              'rgb(106,117,141)','rgb(255,207,54)','rgb(144,209,81)'
                            ];
                            return colorList[params.dataIndex]
                        },
                        label : {
                            show : false,
                            position : 'inner',
                            textStyle : {
                                fontSize : '15',
                                fontWeight : 'bold',
                                color:'#fff',
                            },
                            formatter: "{b}\n{d}%"
                        },
                        labelLine :{show:false}
                    },
                    emphasis : {
                        label : {
                            show : true,
                            position : 'center',
                            textStyle : {
                                fontSize : '20',
                                fontWeight : 'bold'
                            },
                            formatter: "{b}\n{c}"
                        }
                    }
                },
                data:[
                    {value:10449429-294029, name:'未抽检'},
                    {value:294029, name:'抽检比例(应用前)',
                    itemStyle : {
                        normal : {
                            label : {
								show : true,
                                position : 'outter',
                                textStyle : {color:'#777'},
                            },
                            labelLine : {
                                show : true
                            }
                        },
                        emphasis : {label : {show : false,textStyle : {color:'#777'}}}
                    }}
                ]
            },
			{
                name:'5月18日后',
                type:'pie',                 
                //startAngle: 180,
                radius : [70, 140],
                center : ['75%', 280],
                //roseType : 'radius',//'area',//面积模式
                itemStyle : {
                    normal : {
                        color: function(params) {
                            var colorList = [
                              'rgb(106,117,141)','rgb(255,207,54)','rgb(144,209,81)'
                            ];
                            return colorList[params.dataIndex]
                        },
                        label : {
                            show : false,
                            position : 'inner',
                            textStyle : {
                                fontSize : '15',
                                fontWeight : 'bold',
                                color:'#fff',
                            },
                            formatter: "{b}\n{d}%"
                        },
                        labelLine :{show:false}
                    },
                    emphasis : {
                        label : {
                            show : true,
                            position : 'center',
                            textStyle : {
                                fontSize : '20',
                                fontWeight : 'bold'
                            },
                            formatter: "{b}\n{c}"
                        }
                    }
                },
                data:[
                    {value:2236229-112940, name:'未抽检'},
                    {value:112940, name:'抽检比例(应用后)',
                    itemStyle : {
                        normal : {
                            label : {
								show : true,
                                position : 'outter',
                                textStyle : {color:'#777'},
                            },
                            labelLine : {
                                show : true
                            }
                        },
                        emphasis : {label : {show : false,textStyle : {color:'#777'}}}
                    }},
                ]
            }
        ]
    },
	FakeAndGoodrate16 : {		
		title : {
                text: '码后核查系统各开位缺陷条数分布',
                subtext: '数据来源：质量综合管理系统数据库\n品种：9602A',
				x:'center',
            },
        tooltip : {
            trigger: 'axis',
			axisPointer:{
				type : 'cross',
				lineStyle: {
					type : 'dashed',
					width : 1
				}
			}
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
				//dataZoom : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
		/*legend: {
			data:['大万数','缺陷条数'],
			y:60,
			//show:false,
			selected: {
				'缺陷条数' : false,
			},
		},
		dataZoom : {
            show : true,
            realtime: true,
            start : 0,
            end :100,
			//height:20,
        },*/
        calculable : true,
        xAxis : [
            {
				name:'开位',
                type : 'category',
				axisTick:{length:2},
                boundaryGap : false,//此处不将产量放进图表中（设为TRUE,柱形图会溢出边界）
				//此处数据动态生成
                data :[40,8,24,32,1,16,17,3,25,21,33,9,2,26,35,11,39,5,23,38,13,31,6,30,27,34,14,7,20,22,37,29,36,15,4,28,18,12,19,10],
				splitNumber:10,
			}
        ],
        yAxis : [			 
			{
				name:'缺陷条数',
                type : 'value',
				position: 'left',
				//min:70,
				//max:95,
				scale: true,
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value}条',    // Template formatter!               
				},
            }				
        ],
        series : [  
			{
				name:'缺陷条数',
                type:'line',
                smooth:true,				
				symbolSize: 0,		
				itemStyle: {normal: {areaStyle: {type: 'default'},label:{show:false}}},
                data:[987480,871017,803245,658855,517749,408451,353581,326183,284909,265173,260673,248254,215589,190696,187334,184729,168344,166580,159096,140016,111095,109332,109054,108921,102763,101299,88836,86348,86096,85209,77958,77625,75844,74257,59670,51960,51313,47582,41482,36008],
				//markPoint : MPtStyle,
				//markLine : MLnStyle,
			},
			{
				name:'缺陷条数',
				type:'pie',
				tooltip : {
					trigger: 'item',
					formatter: '{a} <br/>{b} : {c} ({d}%)'
				},
				center: ['80%','27%'],
				radius : [0, 70],
				itemStyle :　{
					normal : {
						label : {
							show :true,
							position:'inner',
							formatter: "{b}\n{d}%",
						},
						labelLine : {
							show : false,
							length : 10
						},
					},
				},
				data:[
					{name:'版头/版尾',value:5394214},
					{name:'其它开位',value:3586392},
				]
			}
        ]
    },
	
	FakeAndGoodrate17 : {		
		title : {
                text: '码后核查系统各开位缺陷条数分布',
                subtext: '数据来源：质量综合管理系统数据库\n品种：9604A与9607A',
				x:'center',
            },
        tooltip : {
            trigger: 'axis',
			axisPointer:{
				type : 'cross',
				lineStyle: {
					type : 'dashed',
					width : 1
				}
			}
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
				//dataZoom : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
		/*legend: {
			data:['大万数','缺陷条数'],
			y:60,
			//show:false,
			selected: {
				'缺陷条数' : false,
			},
		},
		dataZoom : {
            show : true,
            realtime: true,
            start : 0,
            end :100,
			//height:20,
        },*/
        calculable : true,
        xAxis : [
            {
				name:'开位',
                type : 'category',
				axisTick:{length:2},
                boundaryGap : false,//此处不将产量放进图表中（设为TRUE,柱形图会溢出边界）
				//此处数据动态生成
                data :[28,35,22,7,21,34,29,15,8,1,2,13,14,3,20,31,33,32,4,30,12,23,11,25,6,24,5,27,26,9,10,18,16,17,19],
				splitNumber:10,
			}
        ],
        yAxis : [			 
			{
				name:'缺陷条数',
                type : 'value',
				position: 'left',
				//min:70,
				//max:95,
				scale: true,
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value}条',    // Template formatter!               
				},
            }				
        ],
        series : [  
			{
				name:'缺陷条数',
                type:'line',
                smooth:true,				
				symbolSize: 0,		
				itemStyle: {normal: {areaStyle: {type: 'default'},label:{show:false}}},
                data:[525245,499145,432454,424321,418421,397342,327745,320298,294998,260607,258939,224152,218483,206631,205806,204896,189617,179082,163556,162588,155160,152651,148269,147542,141488,133127,125663,118574,97393,88973,85397,79683,78049,77827,76660],
				//markPoint : MPtStyle,
				//markLine : MLnStyle,
			},
			{
				name:'缺陷条数',
				type:'pie',
				tooltip : {
					trigger: 'item',
					formatter: '{a} <br/>{b} : {c} ({d}%)'
				},
				center: ['80%','27%'],
				radius : [0, 70],
				itemStyle :　{
					normal : {
						label : {
							show :true,
							position:'inner',
							formatter: "{b}\n{d}%",
						},
						labelLine : {
							show : false,
							length : 10
						},
					},
				},
				data:[
					{name:'版头/版尾',value:3899065},
					{name:'其它开位',value:3721717},
				]
			}
        ]
    },
	
	FakeAndGoodrate18 : {		
		title : {
                text: '码后核查系统各宏区缺陷条数分布',
                subtext: '数据来源：质量综合管理系统数据库\n机型：多功能-2号机',
				x:'center',
            },
        tooltip : {
            trigger: 'axis',
			axisPointer:{
				type : 'cross',
				lineStyle: {
					type : 'dashed',
					width : 1
				}
			}
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
				//dataZoom : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
		/*legend: {
			data:['大万数','缺陷条数'],
			y:60,
			//show:false,
			selected: {
				'缺陷条数' : false,
			},
		},
		dataZoom : {
            show : true,
            realtime: true,
            start : 0,
            end :100,
			//height:20,
        },*/
        calculable : true,
        xAxis : [
            {
				name:'宏区编号',
                type : 'category',
				axisTick:{length:2},
                boundaryGap : false,//此处不将产量放进图表中（设为TRUE,柱形图会溢出边界）
				//此处数据动态生成
                data :[0,32,98,14,13,24,22,16,36,29,23,17,7,30,2,20,26,15,4,19,6,25,11,35,10,12,9,3,21,18,5,8,1,37,27,33,31,38,34,28],
				splitNumber:10,
			}
        ],
        yAxis : [			 
			{
				name:'缺陷条数',
                type : 'value',
				position: 'left',
				//min:70,
				//max:95,
				scale: true,
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value}条',    // Template formatter!               
				},
            }				
        ],
        series : [  
			{
				name:'缺陷条数',
                type:'line',
                smooth:true,				
				symbolSize: 0,		
				itemStyle: {normal: {areaStyle: {type: 'default'},label:{show:false}}},
                data:[500659,224127,196285,193003,189622,113909,101483,100441,98932,91567,79458,74403,73735,44870,44301,42722,34899,33877,33291,32337,30406,28571,24967,22095,21511,21131,16820,16109,16103,15908,15295,13259,13043,10061,5237,4735,4499,2705,1867,1347],
				//markPoint : MPtStyle,
				//markLine : MLnStyle,
			},
			{
				name:'缺陷条数',
				type:'pie',
				tooltip : {
					trigger: 'item',
					formatter: '{a} <br/>{b} : {c} ({d}%)'
				},
				center: ['80%','37%'],
				radius : [0, 90],
				itemStyle :　{
					normal : {
						label : {
							show :true,
							position:'outter',
							//formatter: "{b}\n{d}%",
						},
						labelLine : {
							show : true,
							length : 30
						},
					},
				},
				data:[
					{name:'0',value:500659},
					{name:'32',value:224127},
					{name:'98',value:196285},
					{name:'14',value:193003},
					{name:'13',value:189622},
					{name:'24',value:113909},
					{name:'22',value:101483},
					{name:'16',value:100441},
					{name:'36',value:98932},
					{name:'29',value:91567},
					{name:'23',value:79458},
					{name:'17',value:74403},
					{name:'7',value:73735},
					{name:'30',value:44870},
					{name:'2',value:44301},
					{name:'20',value:42722},
					{name:'26',value:34899},
					{name:'15',value:33877},
					{name:'4',value:33291},
					{name:'19',value:32337},
					{name:'6',value:30406},
					{name:'25',value:28571},
					{name:'11',value:24967},
					{name:'35',value:22095},
					{name:'10',value:21511},
					{name:'12',value:21131},
					{name:'9',value:16820},
					{name:'3',value:16109},
					{name:'21',value:16103},
					{name:'18',value:15908},
					{name:'5',value:15295},
					{name:'8',value:13259},
					{name:'1',value:13043},
					{name:'37',value:10061},
					{name:'27',value:5237},
					{name:'33',value:4735},
					{name:'31',value:4499},
					{name:'38',value:2705},
					{name:'34',value:1867},
					{name:'28',value:1347}
				]
			}
        ]
    },
	FakeAndGoodrate19 : {		
		title : {
                text: '码后核查系统各宏区缺陷条数分布',
                subtext: '数据来源：质量综合管理系统数据库\n机型：M81D-2号机',
				x:'center',
            },
        tooltip : {
            trigger: 'axis',
			axisPointer:{
				type : 'cross',
				lineStyle: {
					type : 'dashed',
					width : 1
				}
			}
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
				//dataZoom : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
		/*legend: {
			data:['大万数','缺陷条数'],
			y:60,
			//show:false,
			selected: {
				'缺陷条数' : false,
			},
		},
		dataZoom : {
            show : true,
            realtime: true,
            start : 0,
            end :100,
			//height:20,
        },*/
        calculable : true,
        xAxis : [
            {
				name:'宏区编号',
                type : 'category',
				axisTick:{length:2},
                boundaryGap : false,//此处不将产量放进图表中（设为TRUE,柱形图会溢出边界）
				//此处数据动态生成
                data :[13,12,2,25,8,10,20,24,0,23,27,98,15,9,14,31,36,29,28,22,18,30,6,3,32,35,26,11,5,16,1,34,7,4,19,37,33,21,17],
				splitNumber:10,
			}
        ],
        yAxis : [			 
			{
				name:'缺陷条数',
                type : 'value',
				position: 'left',
				//min:70,
				//max:95,
				scale: true,
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value}条',    // Template formatter!               
				},
            }				
        ],
        series : [  
			{
				name:'缺陷条数',
                type:'line',
                smooth:true,				
				symbolSize: 0,		
				itemStyle: {normal: {areaStyle: {type: 'default'},label:{show:false}}},
                data:[376550,319841,274093,193592,115852,98207,96647,91619,46806,44005,43527,42658,41580,27207,25570,25246,24227,23037,21603,21308,19105,17326,16333,14957,14929,13690,13471,13262,10807,10107,7822,5435,4734,4248,2752,2576,2458,1415,658],
				//markPoint : MPtStyle,
				//markLine : MLnStyle,
			},
			{
				name:'缺陷条数',
				type:'pie',
				tooltip : {
					trigger: 'item',
					formatter: '{a} <br/>{b} : {c} ({d}%)'
				},
				center: ['80%','37%'],
				radius : [0, 90],
				itemStyle :　{
					normal : {
						label : {
							show :true,
							position:'outter',
							//formatter: "{b}\n{d}%",
						},
						labelLine : {
							show : true,
							length : 30
						},
					},
				},
				data:[
					{name:'13',value:376550},
					{name:'12',value:319841},
					{name:'2',value:274093},
					{name:'25',value:193592},
					{name:'8',value:115852},
					{name:'10',value:98207},
					{name:'20',value:96647},
					{name:'24',value:91619},
					{name:'0',value:46806},
					{name:'23',value:44005},
					{name:'27',value:43527},
					{name:'98',value:42658},
					{name:'15',value:41580},
					{name:'9',value:27207},
					{name:'14',value:25570},
					{name:'31',value:25246},
					{name:'36',value:24227},
					{name:'29',value:23037},
					{name:'28',value:21603},
					{name:'22',value:21308},
					{name:'18',value:19105},
					{name:'30',value:17326},
					{name:'6',value:16333},
					{name:'3',value:14957},
					{name:'32',value:14929},
					{name:'35',value:13690},
					{name:'26',value:13471},
					{name:'11',value:13262},
					{name:'5',value:10807},
					{name:'16',value:10107},
					{name:'1',value:7822},
					{name:'34',value:5435},
					{name:'7',value:4734},
					{name:'4',value:4248},
					{name:'19',value:2752},
					{name:'37',value:2576},
					{name:'33',value:2458},
					{name:'21',value:1415},
					{name:'17',value:658},
				]
			}
        ]
    },
	FakeAndGoodrate20 : {		
		title : {
                text: '码后核查系统未检条数分布',
                subtext: '数据来源：质量综合管理系统数据库\n统计时间：2014年8月至12月底',
				x:'center',
            },
        tooltip : {
            trigger: 'axis',
			axisPointer:{
				type : 'cross',
				lineStyle: {
					type : 'dashed',
					width : 1
				}
			}
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
				//dataZoom : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
		legend: {
			data:['大万数','千位数'],
			y:70,
			//show:false,
			//selected: {
			//	'缺陷条数' : false,
			//},
		},
		/*dataZoom : {
            show : true,
            realtime: true,
            start : 0,
            end :100,
			//height:20,
        },*/
        calculable : true,
        xAxis : [
            {
				name:'未检区间',
                type : 'category',
				axisTick:{length:2},
                boundaryGap : false,//此处不将产量放进图表中（设为TRUE,柱形图会溢出边界）
				//此处数据动态生成
                data :['1~10','11~20','21~30','31~40','41~50','51~60','61~70','71~80','81~90','90以上'],
				splitNumber:10,
			}
        ],
        yAxis : [			 
			{
				name:'',
                type : 'value',
				position: 'left',
				//min:70,
				//max:95,
				scale: true,
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value}',    // Template formatter!               
				},
            }				
        ],
        series : [  
			{
				name:'千位数',
                type:'line',
                smooth:true,				
				symbolSize: 0,		
				itemStyle: {normal: {areaStyle: {type: 'default'},label:{show:false}}},
                data:[6593,385,94,32,19,9,12,4,1,49],
				//markPoint : MPtStyle,
				//markLine : MLnStyle,
			},
			{
				name:'大万数',
                type:'line',
                smooth:true,				
				symbolSize: 0,		
				itemStyle: {normal: {areaStyle: {type: 'default'},label:{show:false}}},
                data:[3292,315,81,29,19,9,12,4,1,27],
				//markPoint : MPtStyle,
				//markLine : MLnStyle,
			},
			{
				name:'千位数',
				type:'pie',
				tooltip : {
					trigger: 'item',
					formatter: '{a} <br/>{b} : {c} ({d}%)'
				},
				center: ['80%','37%'],
				radius : [0, 90],
				itemStyle :　{
					normal : {
						label : {
							show :true,
							position:'outter',
							formatter: "{b}\n{d}%",
						},
						labelLine : {
							show : true,
							length : 35
						},
					},
				},
				data:[
					{name:'1~10',value:6593},
					{name:'11~20',value:385},
					{name:'20以上',value:220},
				]
			}
        ]
    },
	
	FakeAndGoodrate21 : {		
		title : {
                text: '码后核查系统未检条数11-20区间分布',
                subtext: '数据来源：质量综合管理系统数据库\n统计时间：2014年1月至12月底',
				x:'center',
            },
        tooltip : {
            trigger: 'axis',
			axisPointer:{
				type : 'cross',
				lineStyle: {
					type : 'dashed',
					width : 1
				}
			}
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
				//dataZoom : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
		legend: {
			data:['大万数','千位数'],
			y:70,
			//show:false,
			//selected: {
			//	'缺陷条数' : false,
			//},
		},
		/*dataZoom : {
            show : true,
            realtime: true,
            start : 0,
            end :100,
			//height:20,
        },*/
        calculable : true,
        xAxis : [
            {
				name:'未检区间',
                type : 'category',
				axisTick:{length:2},
                boundaryGap : false,//此处不将产量放进图表中（设为TRUE,柱形图会溢出边界）
				//此处数据动态生成
                data : (
					function (){
						var res = [];
						for(var i=11;i<=20;i++) {
							res.push(i);
						}
						return res;
				})(),
				splitNumber:10,
			}
        ],
        yAxis : [			 
			{
				name:'',
                type : 'value',
				position: 'left',
				//min:70,
				//max:95,
				scale: true,
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value}',    // Template formatter!               
				},
            }				
        ],
        series : [  			
			{
				name:'千位数',
                type:'line',
                smooth:true,				
				symbolSize: 0,		
				itemStyle: {normal: {areaStyle: {type: 'default'},label:{show:false}}},
                data:[67,217,83,95,64,90,50,82,129,58,],
				//markPoint : MPtStyle,
				//markLine : MLnStyle,
			},
			{
				name:'大万数',
                type:'line',
                smooth:true,				
				symbolSize: 0,		
				itemStyle: {normal: {areaStyle: {type: 'default'},label:{show:false}}},
                data:[64,196,83,80,59,83,44,67,118,53],
				//markPoint : MPtStyle,
				//markLine : MLnStyle,
			},
			{
				name:'千位数',
				type:'pie',
				tooltip : {
					trigger: 'item',
					formatter: '{a} <br/>{b} : {c} ({d}%)'
				},
				center: ['85%','27%'],
				radius : [0, 60],
				itemStyle :　{
					normal : {
						label : {
							show :true,
							position:'outter',
							formatter: "{b}\n{d}%",
						},
						labelLine : {
							show : true,
							length : 20
						},
					},
				},
				data:[
					{name:'11',value:67},
					{name:'12',value:217},
					{name:'13',value:83},
					{name:'14',value:95},
					{name:'15',value:64},
					{name:'16',value:90},
					{name:'17',value:50},
					{name:'18',value:82},
					{name:'19',value:129},
					{name:'20',value:58}
				]
			}
        ]
    },
	'FakeAndGoodrate22':{
		title : {
                text: '凹印质量作废随星期变化情况',
                subtext: '数据来源：质量综合管理系统数据库',
				x:'center',
            },
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            data:['实废小开数','拆包量'],
			x:'center',
			y:60,
			itemGap:20,
			selected:{
				'拆包量': false,
			}
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        xAxis : [
            {
				name:'星期',
				axisTick : {show: false},//隐藏标记线,
                type : 'category',
                boundaryGap : true,
                data : ['星期一','星期二','星期三','星期四','星期五','星期六'],
			}
        ],
        yAxis : [
            {
				name:'实废小开数',
                type : 'value',
				position: 'left',
				min:110,
				//max:89,
				scale: true,
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value} 开',    // Template formatter!               
				},
            },
			{
                type : 'value',
				min:500,
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 18,
					formatter: '{value} 包',    // Template formatter!               
				},
            }
        ],
        series : [
            {
                name:'实废小开数',
                type:'line',
                smooth:true,
              //  itemStyle: {normal: {areaStyle: {type: 'default'}}},
				symbolSize: 8,
                data:[117.97,116.04,118,114.91,114.02,119.14],
				markPoint : MPtStyle,
				markLine : MLnStyle,
			},
            {
                name:'拆包量',
                type:'bar',barMaxWidth:80,
                smooth:true,
				yAxisIndex: 1,
                itemStyle : BarStyleTBlue,
                data:[30.66,30.09,29.99,29.92,29.89,29.24],
			},		
        ]
	},
	
	FakeAndGoodrate23 : {		
		title : {
                text: '码后核查系统各开位实废条数分布',
                subtext: '数据来源：码后核查中心数据库\n品种：9602A',
				x:'center',
            },
        tooltip : {
            trigger: 'axis',
			axisPointer:{
				type : 'cross',
				lineStyle: {
					type : 'dashed',
					width : 1
				}
			}
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
				//dataZoom : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
		/*legend: {
			data:['大万数','缺陷条数'],
			y:60,
			//show:false,
			selected: {
				'缺陷条数' : false,
			},
		},
		dataZoom : {
            show : true,
            realtime: true,
            start : 0,
            end :100,
			//height:20,
        },*/
        calculable : true,
        xAxis : [
            {
				name:'开位',
                type : 'category',
				axisTick:{length:2},
                boundaryGap : false,//此处不将产量放进图表中（设为TRUE,柱形图会溢出边界）
				//此处数据动态生成
                 data : (
					function (){
						var res = [];
						for(var i=1;i<=40;i++) {
							res.push(i);
						}
						return res;
				})(),
				splitNumber:10,
			}
        ],
        yAxis : [			 
			{
				name:'实废条数',
                type : 'value',
				position: 'left',
				//min:70,
				//max:95,
				scale: true,
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value}条',    // Template formatter!               
				},
            }				
        ],
        series : [  
			{
				name:'实废条数',
                type:'line',
                smooth:true,				
				symbolSize: 0,		
				itemStyle: {normal: {areaStyle: {type: 'default'},label:{show:false}}},
                data:[50422,41506,38347,35001,39813,41052,43930,97161,33283,28748,23820,23594,23829,28017,26647,40056,45395,31964,34343,29269,29714,29862,32757,55660,40223,29736,25769,25735,26850,27237,27883,52277,51604,42940,45959,40810,40078,40999,45735,109020],
				//markPoint : MPtStyle,
				//markLine : MLnStyle,
			},
			{
				name:'实废条数',
				type:'pie',
				tooltip : {
					trigger: 'item',
					formatter: '{a} <br/>{b} : {c} ({d}%)'
				},
				center: ['80%','27%'],
				radius : [0, 70],
				itemStyle :　{
					normal : {
						label : {
							show :true,
							position:'inner',
							formatter: "{b}\n{d}%",
						},
						labelLine : {
							show : false,
							length : 10
						},
					},
				},
				data:[
					{name:'版头/版尾',value:575101},
					{name:'其它开位',value:1001944},
				]
			}
        ]
    },
	
	FakeAndGoodrate24 : {		
		title : {
                text: '码后核查系统各开位实废条数分布',
                subtext: '数据来源：码后核查中心数据库\n品种：9604A',
				x:'center',
            },
        tooltip : {
            trigger: 'axis',
			axisPointer:{
				type : 'cross',
				lineStyle: {
					type : 'dashed',
					width : 1
				}
			}
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
				//dataZoom : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
		/*legend: {
			data:['大万数','缺陷条数'],
			y:60,
			//show:false,
			selected: {
				'缺陷条数' : false,
			},
		},
		dataZoom : {
            show : true,
            realtime: true,
            start : 0,
            end :100,
			//height:20,
        },*/
        calculable : true,
        xAxis : [
            {
				name:'开位',
                type : 'category',
				axisTick:{length:2},
                boundaryGap : false,//此处不将产量放进图表中（设为TRUE,柱形图会溢出边界）
				//此处数据动态生成
                 data : (
					function (){
						var res = [];
						for(var i=1;i<=35;i++) {
							res.push(i);
						}
						return res;
				})(),
				splitNumber:10,
			}
        ],
        yAxis : [			 
			{
				name:'实废条数',
                type : 'value',
				position: 'left',
				//min:70,
				//max:95,
				scale: true,
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value}条',    // Template formatter!               
				},
            }				
        ],
        series : [  
			{
				name:'实废条数',
                type:'line',
                smooth:true,				
				symbolSize: 0,		
				itemStyle: {normal: {areaStyle: {type: 'default'},label:{show:false}}},
                data:[73222,50787,43596,45862,52905,54121,104667,36822,28660,23585,22929,24939,23852,48570,42605,31183,27158,23913,29834,28025,58042,30405,24321,21730,20678,24293,23892,48125,63248,46642,39807,38286,43128,47255,76992],
				//markPoint : MPtStyle,
				//markLine : MLnStyle,
			},
			{
				name:'实废条数',
				type:'pie',
				tooltip : {
					trigger: 'item',
					formatter: '{a} <br/>{b} : {c} ({d}%)'
				},
				center: ['80%','27%'],
				radius : [0, 70],
				itemStyle :　{
					normal : {
						label : {
							show :true,
							position:'inner',
							formatter: "{b}\n{d}%",
						},
						labelLine : {
							show : false,
							length : 10
						},
					},
				},
				data:[
					{name:'版头/版尾',value:582698},
					{name:'其它开位',value:841381},
				]
			}
        ]
    },
	FakeAndGoodrate25 : {		
		title : {
                text: '核查系统二次核查剔废率对比',
                subtext: '数据来源：码后核查中心数据库',
				x:'center',
            },
        tooltip : {
            trigger: 'item',
			/*axisPointer:{
				type : 'cross',
				lineStyle: {
					type : 'dashed',
					width : 1
				}
			}*/
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
				//dataZoom : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
		grid:{
			y:60,
		},
		/*legend: {
			data:['平均好品率','缺陷总数','实废条数','拆包量','大万数'],
			y:40,
			x:'60%',
			selected: {
				'大万数' : false,
				'实废条数' : false,
				'缺陷总数' : false
			},
			//show:false,
		},
		dataZoom : {
            show : true,
            realtime: true,
            start : 0,
            end :100,
			//height:20,
        },*/
        calculable : true,
        yAxis : [
            {
				name:'剔废率',
                type : 'category',
				axisTick:{length:2},
                boundaryGap : true,//此处不将产量放进图表中（设为TRUE,柱形图会溢出边界）
				//此处数据动态生成
                data : ['多功能3号机','多功能2号机','多功能1号机','大张机5号机','大张机6号机','大张机3号机'],
			}
        ],
        xAxis : [            
			{				
                type : 'value',
				position: 'left',
				min:0,
				//max:60,
				scale: true,
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value}%',    // Template formatter!               
				},
            },			
        ],
        series : [
            {
				name:'二次核查剔废率',
                type:'bar',barMaxWidth:80,
                smooth:true,
				symbolSize: 6,
                itemStyle: {normal: {label:{show:true,position:'insideRight',formatter: '{c}%'}}},/*,areaStyle: {type: 'default'}*/
                data:[20.71,27.08,35.3,46.06,56.11,65.78],
				//markPoint : MPtStyle,
				//markLine : MLnStyle,
			}	
        ]
    },
	
	FakeAndGoodrate29 : {		
		color : ['rgb(243,111,91)','rgb(80,80,80)','rgb(106,117,141)','rgb(255,207,54)','rgb(144,209,81)',],
		title : {
                text: '9602A凹印各机长平均好品率对比',
                subtext: '数据来源：码后核查中心数据库\n统计时间:2014年1月至2015年3月',
				x:'center',
            },
        tooltip : {
            trigger: 'item',
			/*axisPointer:{
				type : 'cross',
				lineStyle: {
					type : 'dashed',
					width : 1
				}
			}*/
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
				//dataZoom : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
		grid:{
			y:40,
			x:25,
			x2:35,
			y2:25,
		},
		legend: {
			data:['多功能-1#','接线印码机','M81D-1#','M81D-2#'],
			y:40,
			x:'60%',
			selected: {
				'接线印码机' : false,
				'多功能-1#' : false
			},
			//show:false,
		},
		/*dataZoom : {
            show : true,
            realtime: true,
            start : 0,
            end :100,
			//height:20,
        },*/
        calculable : true,
        xAxis : [
            {
				name:'机长',
                type : 'category',
				axisTick:{length:2},
                boundaryGap : true,//此处不将产量放进图表中（设为TRUE,柱形图会溢出边界）
				//此处数据动态生成
                data : ['陈拥军','奉伟','高思东','何兵','何杰','刘大金','刘健康','马斌','牟军','吴勇','徐晖','赵军'],
			}
        ],
        yAxis : [            
			{				
                type : 'value',
				position: 'left',
				min:50,
				//max:60,
				scale: true,
				axisLabel : {
					show:false,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value}%',    // Template formatter!               
				},
            },			
        ],
        series : [
            {
				name:'多功能-1#',
                type:'bar',barMaxWidth:80,
                smooth:true,
				symbolSize: 6,
                itemStyle: {normal: {label:{show:true,position:'insideTop',formatter : function (c){return xround(c.value,1)},}}},/*,areaStyle: {type: 'default'}*/
                data:[89.13,88.09,90.09,87.96,90.4,88.45,89.09,89.37,90.22,89.85,89.22,88.06],
				markPoint : MPtStyleMin,
				//markLine : MLnStyle,
			},	
			{
				name:'接线印码机',
                type:'bar',barMaxWidth:80,
                smooth:true,
				symbolSize: 6,
                itemStyle: {normal: {label:{show:true,position:'insideTop',formatter: function (c){return xround(c.value,1)},}}},
                data:[88.39,88.44,88.36,88.67,88.95,84.42,88.61,88.67,85.7,88.26,91.48,87.8],
				markPoint : MPtStyleMin,
				//markLine : MLnStyle,
			},	
			{
				name:'M81D-1#',
                type:'bar',barMaxWidth:80,
                smooth:true,
				symbolSize: 6,
                itemStyle: {normal: {label:{show:true,position:'insideTop',formatter: function (c){return xround(c.value,1)},}}},
                data:[82.84,81.73,85.72,76.4,82.72,83.91,76.04,81.37,85.99,87.62,85.01,82.85],
				markPoint : MPtStyleMin,
				//markLine : MLnStyle,
			},	
			{
				name:'M81D-2#',
                type:'bar',barMaxWidth:80,
                smooth:true,
				symbolSize: 6,
                itemStyle: {normal: {label:{show:true,position:'insideTop',formatter: function (c){return xround(c.value,1)},}}},
                data:[82.88,80.9,82.68,75.85,79.44,77.48,74.87,83.83,85.83,86.44,76.6,78.04],
				markPoint : MPtStyleMin,
				//markLine : MLnStyle,
			}
        ]
    },
	
	FakeAndGoodrate30 : {		
		color : ['rgb(243,111,91)','rgb(80,80,80)','rgb(106,117,141)','rgb(255,207,54)','rgb(144,209,81)',],
		title : {
                text: '9602A凹印各机型平均好品率对比',
                subtext: '数据来源：码后核查中心数据库\n统计时间:2014年1月至2015年3月',
				x:'center',
            },
        tooltip : {
            trigger: 'item',
			/*axisPointer:{
				type : 'cross',
				lineStyle: {
					type : 'dashed',
					width : 1
				}
			}*/
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
				//dataZoom : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
		grid:{
			y:40,
			x:25,
			x2:35,
			y2:25,
		},
		legend: {
			data:['多功能-1#','接线印码机','M81D-1#','M81D-2#'],
			y:40,
			x:'60%',
			//show:false,
		},
		/*dataZoom : {
            show : true,
            realtime: true,
            start : 0,
            end :100,
			//height:20,
        },*/
        calculable : true,
        xAxis : [
            {
				name:'机台',
                type : 'category',
				axisTick:{length:2},
                boundaryGap : true,//此处不将产量放进图表中（设为TRUE,柱形图会溢出边界）
				//此处数据动态生成
                data : ['W92-1号','W92-2号','W92A-4号','W92B-5号','W92C-11号','W92C-12号'],
			}
        ],
        yAxis : [            
			{				
                type : 'value',
				position: 'left',
				min:50,
				//max:60,
				scale: true,
				axisLabel : {
					show:false,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value}%',    // Template formatter!               
				},
            },			
        ],
        series : [
            {
				name:'多功能-1#',
                type:'bar',barMaxWidth:80,
                smooth:true,
				symbolSize: 6,
                itemStyle: {normal: {label:{show:true,position:'insideTop',formatter : function (c){return xround(c.value,1)},}}},/*,areaStyle: {type: 'default'}*/
                data:[90.23,89.17,89.96,89.24,88.3,89.65],
				markPoint : MPtStyleMin,
				//markLine : MLnStyle,
			},	
			{
				name:'接线印码机',
                type:'bar',barMaxWidth:80,
                smooth:true,
				symbolSize: 6,
                itemStyle: {normal: {label:{show:true,position:'insideTop',formatter: function (c){return xround(c.value,1)},}}},
                data:[87.34,87.68,91.22,88.54,88.35,90.3],
				markPoint : MPtStyleMin,
				//markLine : MLnStyle,
			},	
			{
				name:'M81D-1#',
                type:'bar',barMaxWidth:80,
                smooth:true,
				symbolSize: 6,
                itemStyle: {normal: {label:{show:true,position:'insideTop',formatter: function (c){return xround(c.value,1)},}}},
                data:[87.7,82.88,85.68,81.66,77.69,84.29],
				markPoint : MPtStyleMin,
				//markLine : MLnStyle,
			},	
			{
				name:'M81D-2#',
                type:'bar',barMaxWidth:80,
                smooth:true,
				symbolSize: 6,
                itemStyle: {normal: {label:{show:true,position:'insideTop',formatter: function (c){return xround(c.value,1)},}}},
                data:[86.69,79.91,87.59,83.39,75.68,82.04],
				markPoint : MPtStyleMin,
				//markLine : MLnStyle,
			}
        ]
    },
	
	FakeAndGoodrate31 : {		
		color : ['rgb(243,111,91)','rgb(80,80,80)','rgb(106,117,141)','rgb(255,207,54)','rgb(144,209,81)',],
		title : {
                text: '9602A凹印各机台好品率低于80%产品分布情况',
                subtext: '数据来源：码后核查中心数据库\n统计时间:2014年1月至2015年3月',
				x:'center',
            },
        tooltip : {
            trigger: 'item',
			/*axisPointer:{
				type : 'cross',
				lineStyle: {
					type : 'dashed',
					width : 1
				}
			}*/
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
				//dataZoom : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
		grid:{
			y:40,
			x:25,
			x2:35,
			y2:25,
		},
		legend: {
			data:['多功能-1#','接线印码机','M81D-1#','M81D-2#'],
			y:40,
			x:'60%',
			/*selected: {
				'接线印码机' : false,
				'多功能-1#' : false
			},*/
			//show:false,
		},
		/*dataZoom : {
            show : true,
            realtime: true,
            start : 0,
            end :100,
			//height:20,
        },*/
        calculable : true,
        xAxis : [
            {
				name:'机台',
                type : 'category',
				axisTick:{length:2},
                boundaryGap : true,//此处不将产量放进图表中（设为TRUE,柱形图会溢出边界）
				//此处数据动态生成
                data : ['W92-1号','W92-2号','W92B-5号','W92C-11号','W92C-12号'],
			}
        ],
        yAxis : [            
			{				
                type : 'value',
				position: 'left',
				//min:50,
				//max:60,
				scale: true,
				axisLabel : {
					show:false,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value}万',    // Template formatter!               
				},
            },			
        ],
        series : [
            {
				name:'多功能-1#',
                type:'bar',barMaxWidth:80,
                smooth:true,
				symbolSize: 6,
                itemStyle: {normal: {label:{show:true,position:'insideTop',formatter : '{c}',}}},/*,areaStyle: {type: 'default'}*/
                data:[66,53,0,90,30],
				stack:'总量'
				//markPoint : MPtStyleMin,
				//markLine : MLnStyle,
			},	
			{
				name:'接线印码机',
                type:'bar',barMaxWidth:80,
                smooth:true,
				symbolSize: 6,
                itemStyle: {normal: {label:{show:true,position:'insideTop',formatter : '{c}',}}},/*,areaStyle: {type: 'default'}*/
                data:[109,78,21,76,24],
				stack:'总量'
				//markPoint : MPtStyleMin,
				//markLine : MLnStyle,
			},	
			{
				name:'M81D-1#',
                type:'bar',barMaxWidth:80,
                smooth:true,
				symbolSize: 6,
                itemStyle: {normal: {label:{show:true,position:'insideTop',formatter : '{c}',}}},/*,areaStyle: {type: 'default'}*/
                data:[118,159,62,342,95],
				stack:'总量'
				//markPoint : MPtStyleMin,
				//markLine : MLnStyle,
			},	
			{
				name:'M81D-2#',
                type:'bar',barMaxWidth:80,
                smooth:true,
				symbolSize: 6,
                itemStyle: {normal: {label:{show:true,position:'insideTop',formatter : '{c}',}}},/*,areaStyle: {type: 'default'}*/
                data:[105,197,43,384,111],
				stack:'总量'
				//markPoint : MPtStyleMin,
				//markLine : MLnStyle,
			}
        ]
    },
	FakeAndGoodrate32 : {		
		color : ['rgb(80,80,80)','rgb(255,207,54)','rgb(144,209,81)','rgb(243,111,91)','rgb(106,117,141)'],
		title : {
                text: '9602A凹印各机台好品率低于80%产品分布情况',
                subtext: '数据来源：码后核查中心数据库\n统计时间:2015年4月至2015年5月',
				x:'center',
            },
        tooltip : {
            trigger: 'item',
			/*axisPointer:{
				type : 'cross',
				lineStyle: {
					type : 'dashed',
					width : 1
				}
			}*/
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
				//dataZoom : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
		grid:{
			y:40,
			x:25,
			x2:35,
			y2:25,
		},
		legend: {
			data:['M81D-1#','M81D-2#'],
			y:40,
			x:'60%',
			/*selected: {
				'接线印码机' : false,
				'多功能-1#' : false
			},*/
			//show:false,
		},
		/*dataZoom : {
            show : true,
            realtime: true,
            start : 0,
            end :100,
			//height:20,
        },*/
        calculable : true,
        xAxis : [
            {
				name:'机台',
                type : 'category',
				axisTick:{length:2},
                boundaryGap : true,//此处不将产量放进图表中（设为TRUE,柱形图会溢出边界）
				//此处数据动态生成
                data : ['W92-1号','W92-2号','W92A-4号','W92B-6号','W92C-11号'],
			}
        ],
        yAxis : [            
			{				
                type : 'value',
				position: 'left',
				//min:50,
				//max:60,
				scale: true,
				axisLabel : {
					show:false,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value}万',    // Template formatter!               
				},
            },			
        ],
        series : [
			{
				name:'M81D-1#',
                type:'bar',barMaxWidth:80,
                smooth:true,
				symbolSize: 6,
                itemStyle: {normal: {label:{show:true,position:'insideTop',formatter : '{c}',}}},/*,areaStyle: {type: 'default'}*/
                data:[1,23,6,3,18],
				//stack:'总量'
				//markPoint : MPtStyleMin,
				//markLine : MLnStyle,
			},	
			{
				name:'M81D-2#',
                type:'bar',barMaxWidth:80,
                smooth:true,
				symbolSize: 6,
                itemStyle: {normal: {label:{show:true,position:'insideTop',formatter : '{c}',}}},/*,areaStyle: {type: 'default'}*/
                data:[21,68,28,5,64],
				//stack:'总量'
				//markPoint : MPtStyleMin,
				//markLine : MLnStyle,
			}
        ]
    },
	'FakeAndGoodrate33':{
		title : {
                text: '成钞纸张/金鼎纸张平均好品率对比',
                subtext: '数据来源：质量综合管理系统数据库\n统计时间：2014年1月至2015年5月',
				x:'center',
            },
        tooltip : {
            trigger: 'item',
			/*axisPointer:{
				type : 'cross',
				lineStyle: {
					type : 'dashed',
					width : 1
				}
			}*/
        },
		grid:{
			x2:'15%',
		},
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
				//dataZoom : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        yAxis : [
            {
                type : 'category',
				axisTick:{length:2},
                boundaryGap : true,//此处不将产量放进图表中（设为TRUE,柱形图会溢出边界）
				//此处数据动态生成
                data : ['成钞纸张','金鼎纸张'],
			}
        ],
        xAxis : [            
			{		
				show : false,
                type : 'value',
				position: 'left',				
				//max:60,
				scale: true,
				min:50,
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value}',    // Template formatter!               
				},
            },			
        ],
        series : [
            {
				name:'平均好品率',
                type:'bar',barMaxWidth:80,
                smooth:true,
				symbolSize: 6,
                itemStyle: {
					normal: {
						color: function(params) {
							var colorList = ['rgb(80,80,80)','rgb(255,207,54)'];
							return colorList[parseInt(params.dataIndex)]
						},
						label:{
							show:true,
							position:'insideRight',
							formatter: '{c}%'}
						}
					},
                data:[85.96,86.81],
			},
			{
                name:'数据量分布',
                type:'pie',                 
                //startAngle: 180,
                radius : [0, 80],
                center : ['90%', '30%'],
                //roseType : 'area',//面积模式
                itemStyle : {
                    normal : {
						color: function(params) {
							var colorList = ['rgb(80,80,80)','rgb(255,207,54)'];
							return colorList[parseInt(params.dataIndex)]
						},
                        label : {
                            show : false,
                            position : 'outter',
                            textStyle : {
                                fontSize : '15',
                                fontWeight : 'bold'
                            },
                            formatter: "{b}:{d}%\n({c}车)"
                        },
                        labelLine : {
                            show : false
                        }
                    }
                },
                data:[					
                    {value:17926, name:'成钞纸张'},
                    {value:1921, name:'金鼎纸张',
						itemStyle : {
							normal : {
								label : {
									show : true,
									position : 'outter',
									textStyle : {color:'#777'},
								},
								labelLine : {
									show : true
								}
							},
							//emphasis : {label : {textStyle : {color:'#777'}}}
						}}
                ]
            }	
        ]
	},
	'FakeAndGoodrate34':{
		title : {
                text: '2015年3月16日 M81D-2#机检好品率情况',
                subtext: '数据来源：质量综合管理系统数据库',
				x:'center',
            },
        tooltip : {
            trigger: 'item',
			/*axisPointer:{
				type : 'cross',
				lineStyle: {
					type : 'dashed',
					width : 1
				}
			}*/
        },
		grid:{
			x:20,
			x2:20,
		},
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
				//dataZoom : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
				axisTick:{length:2},
                boundaryGap : true,//此处不将产量放进图表中（设为TRUE,柱形图会溢出边界）
				//此处数据动态生成
                data :['1520A689','1520A670','1520A723','1520A775','1520A690','1520A707','1520A726','1520A783','1520A729'],
			}
        ],
        yAxis : [            
			{		
				show : false,
                type : 'value',
				position: 'left',				
				//max:60,
				scale: true,
				min:0,
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value}',    // Template formatter!               
				},
            },			
        ],
        series : [
            {
				name:'平均好品率',
                type:'bar',barMaxWidth:80,
                smooth:true,
				symbolSize: 6,
                itemStyle: {
					normal: {
						color: 'rgb(106,117,141)',
						label:{
							show:true,
							position:'insideTop',
							formatter: '{c}%'}
						}
					},
                data:[93.58,74.15,75.39,55.16,93.95,83.20,89.09,89.13,83.01],
			}
        ]
	},
	'MapData' : {
		//backgroundColor: '#492f38',
		color: ['gold','aqua','lime'],
		title : {
			text: '全国印制企业分布与GDP关系',
			subtext: '数据来源：国家统计局2014年GDP数据',
			x:'center',
			//textStyle : {color: '#fff'}
		},
		tooltip : {
			trigger: 'item',
			formatter: '{b}'
		},
		 legend: {
			orient: 'vertical',
			x:'left',
			data:['印钞', '造币', '钞纸'],
		   // selectedMode: 'single',
			selected:{
				'造币' : false,
				'钞纸' : false
			},
			//textStyle : {color: '#fff'}
		},
		toolbox: {
			show : true,
			orient : 'vertical',
			x: 'right',
			y: 'center',
			feature : {
				mark : {show: true},
				dataView : {show: true, readOnly: false},
				restore : {show: true},
				saveAsImage : {show: true}
			}
		},
		dataRange: {
			min: 800,
            max: 70000,
			calculable : true,
			//color: ['#ff3333', 'orange', 'yellow','lime','aqua'],
			//color:['yellow','rgba(33,188,249,0.5)'],
			//textStyle:{color:'#fff'}
		},
		animationDurationUpdate: 2000, // for update animation, like legend selected.
		series : [
			{
				name: '印钞',
				type: 'map',
				roam: true,
				hoverable: false,
				mapType: 'china',
				itemSdtyle:{
                    normal:{label:{show:true}}
                },
				itemStyle:{
					normal:{
						borderColor:'rgba(100,149,237,1)',
						borderWidth:0.5,
						label: {
							show: false
						},
						areaStyle:{
							color: '#1b1b1b'
						},
					}
				},
				data:[
					{name:'广东', value:67800},
					{name:'江苏', value:65100},
					{name:'山东', value:59400},
					{name:'浙江', value:40200},
					{name:'河南', value:34900},
					{name:'河北', value:29000},
					{name:'辽宁', value:28600},
					{name:'四川', value:28500},
					{name:'湖北', value:27400},
					{name:'湖南', value:27000},
					{name:'福建', value:24100},
					{name:'上海', value:23600},
					{name:'北京', value:21300},
					{name:'安徽', value:20800},
					{name:'内蒙古', value:17800},
					{name:'陕西', value:17700},
					{name:'天津', value:15722},
					{name:'江西', value:15708},
					{name:'广西', value:15700},
					{name:'黑龙江', value:14800},
					{name:'重庆', value:14300},
					{name:'吉林', value:13800},
					{name:'云南', value:12814},
					{name:'山西', value:12759},
					{name:'新疆', value:9264},
					{name:'贵州', value:9251},
					{name:'甘肃', value:6600},
					{name:'海南', value:3500},
					{name:'宁夏', value:2800},
					{name:'青海', value:2300},
					{name:'西藏', value:900},
					{name:'香港', value:22457},
					{name:'台湾', value:31703},
				],
				geoCoord: {
					'昆山':[120.95, 31.39],
					'上海': [121.4648,31.2891],
					'东莞': [113.8953,22.901],
					'东营': [118.7073,37.5513],
					'中山': [113.4229,22.478],
					'临汾': [111.4783,36.1615],
					'临沂': [118.3118,35.2936],
					'丹东': [124.541,40.4242],
					'丽水': [119.5642,28.1854],
					'乌鲁木齐': [87.9236,43.5883],
					'佛山': [112.8955,23.1097],
					'保定': [115.0488,39.0948],
					'兰州': [103.5901,36.3043],
					'包头': [110.3467,41.4899],
					'北京': [116.4551,40.2539],
					'北海': [109.314,21.6211],
					'南京': [118.8062,31.9208],
					'南宁': [108.479,23.1152],
					'南昌': [116.0046,28.6633],
					'南通': [121.1023,32.1625],
					'厦门': [118.1689,24.6478],
					'台州': [121.1353,28.6688],
					'合肥': [117.29,32.0581],
					'呼和浩特': [111.4124,40.4901],
					'咸阳': [108.4131,34.8706],
					'哈尔滨': [127.9688,45.368],
					'唐山': [118.4766,39.6826],
					'嘉兴': [120.9155,30.6354],
					'大同': [113.7854,39.8035],
					'大连': [122.2229,39.4409],
					'天津': [117.4219,39.4189],
					'太原': [112.3352,37.9413],
					'威海': [121.9482,37.1393],
					'宁波': [121.5967,29.6466],
					'宝鸡': [107.1826,34.3433],
					'宿迁': [118.5535,33.7775],
					'常州': [119.4543,31.5582],
					'广州': [113.5107,23.2196],
					'廊坊': [116.521,39.0509],
					'延安': [109.1052,36.4252],
					'张家口': [115.1477,40.8527],
					'徐州': [117.5208,34.3268],
					'德州': [116.6858,37.2107],
					'惠州': [114.6204,23.1647],
					'成都': [103.9526,30.7617],
					'扬州': [119.4653,32.8162],
					'承德': [117.5757,41.4075],
					'拉萨': [91.1865,30.1465],
					'无锡': [120.3442,31.5527],
					'日照': [119.2786,35.5023],
					'昆明': [102.9199,25.4663],
					'杭州': [119.5313,29.8773],
					'枣庄': [117.323,34.8926],
					'柳州': [109.3799,24.9774],
					'株洲': [113.5327,27.0319],
					'武汉': [114.3896,30.6628],
					'汕头': [117.1692,23.3405],
					'江门': [112.6318,22.1484],
					'沈阳': [123.1238,42.1216],
					'沧州': [116.8286,38.2104],
					'河源': [114.917,23.9722],
					'泉州': [118.3228,25.1147],
					'泰安': [117.0264,36.0516],
					'泰州': [120.0586,32.5525],
					'济南': [117.1582,36.8701],
					'济宁': [116.8286,35.3375],
					'海口': [110.3893,19.8516],
					'淄博': [118.0371,36.6064],
					'淮安': [118.927,33.4039],
					'深圳': [114.5435,22.5439],
					'清远': [112.9175,24.3292],
					'温州': [120.498,27.8119],
					'渭南': [109.7864,35.0299],
					'湖州': [119.8608,30.7782],
					'湘潭': [112.5439,27.7075],
					'滨州': [117.8174,37.4963],
					'潍坊': [119.0918,36.524],
					'烟台': [120.7397,37.5128],
					'玉溪': [101.9312,23.8898],
					'珠海': [113.7305,22.1155],
					'盐城': [120.2234,33.5577],
					'盘锦': [121.9482,41.0449],
					'石家庄': [114.4995,38.1006],
					'福州': [119.4543,25.9222],
					'秦皇岛': [119.2126,40.0232],
					'绍兴': [120.564,29.7565],
					'聊城': [115.9167,36.4032],
					'肇庆': [112.1265,23.5822],
					'舟山': [122.2559,30.2234],
					'苏州': [120.6519,31.3989],
					'莱芜': [117.6526,36.2714],
					'菏泽': [115.6201,35.2057],
					'营口': [122.4316,40.4297],
					'葫芦岛': [120.1575,40.578],
					'衡水': [115.8838,37.7161],
					'衢州': [118.6853,28.8666],
					'西宁': [101.4038,36.8207],
					'西安': [109.1162,34.2004],
					'贵阳': [106.6992,26.7682],
					'连云港': [119.1248,34.552],
					'邢台': [114.8071,37.2821],
					'邯郸': [114.4775,36.535],
					'郑州': [113.4668,34.6234],
					'鄂尔多斯': [108.9734,39.2487],
					'重庆': [107.7539,30.1904],
					'金华': [120.0037,29.1028],
					'铜川': [109.0393,35.1947],
					'银川': [106.3586,38.1775],
					'镇江': [119.4763,31.9702],
					'长春': [125.8154,44.2584],
					'长沙': [113.0823,28.2568],
					'长治': [112.8625,36.4746],
					'阳泉': [113.4778,38.0951],
					'青岛': [120.4651,36.3373],
					'韶关': [113.7964,24.7028],	
					'黑河':[127.50083,50.25069],
					'腾冲':[98.51,25.01],
					
				},				
				markLine : {
					smooth:true,
					effect : {
						show: true,
						scaleSize: 1,
						period: 30,
						color: '#fff',
						shadowBlur: 10
					},
					itemStyle : {
						normal: {
							borderWidth:1,
							label: {
								show: false
							},
							lineStyle: {
								type: 'solid',
								shadowBlur: 10
							}
						}
					},
					data : [
						/*[ {name:'东莞',value:95},{name:'北京', smoothRadian:0.2}],
						[ {name:'成都',value:90},{name:'北京', smoothRadian:0.3}],
						[ {name:'西安',value:80},{name:'北京', smoothRadian:0.4}],
						[ {name:'石家庄',value:70},{name:'北京', smoothRadian:0.5}],
						[ {name:'上海',value:60},{name:'北京', smoothRadian:0.6}],
						[ {name:'南昌',value:50},{name:'北京', smoothRadian:0.2}],*/
						[ {name:'东莞',value:67800},{name:'北京', smoothRadian:0.2}],
						[ {name:'成都',value:28500},{name:'西安', smoothRadian:0.7}],
						[ {name:'成都',value:28500},{name:'北京', smoothRadian:0.3}],
						[ {name:'西安',value:17700},{name:'北京', smoothRadian:0.4}],
						[ {name:'石家庄',value:15708},{name:'北京', smoothRadian:0.5}],
						[ {name:'上海',value:23600},{name:'北京', smoothRadian:0.6}],
						[ {name:'南昌',value:29000},{name:'北京', smoothRadian:0.2}],
						[ {name:'腾冲',value:10000},{name:'腾冲', smoothRadian:0.4}],
						[ {name:'黑河',value:10000},{name:'黑河', smoothRadian:0.4}],
					]
				},
				markPoint : {
					symbol:'emptyCircle',
					symbolSize : function (v){
						return 10 + v/10
					},
					effect : {
						show: true,
						shadowBlur : 0
					},
					itemStyle:{
						normal:{
							label:{show:false}
						},
						emphasis: {
							label:{position:'top'}
						}
					},
					data : [
						{name:'上海',value:40},
						{name:'东莞',value:40},
						{name:'成都',value:40},
						{name:'西安',value:40},
						{name:'南昌',value:40},
						{name:'石家庄',value:40},
						{name:'北京',value:40}
					]
				}
			
			},
			{
				name: '造币',
				type: 'map',
				mapType: 'china',
				data:[
					{name:'广东', value:67800},
					{name:'江苏', value:65100},
					{name:'山东', value:59400},
					{name:'浙江', value:40200},
					{name:'河南', value:34900},
					{name:'河北', value:29000},
					{name:'辽宁', value:28600},
					{name:'四川', value:28500},
					{name:'湖北', value:27400},
					{name:'湖南', value:27000},
					{name:'福建', value:24100},
					{name:'上海', value:23600},
					{name:'北京', value:21300},
					{name:'安徽', value:20800},
					{name:'内蒙古', value:17800},
					{name:'陕西', value:17700},
					{name:'天津', value:15722},
					{name:'江西', value:15708},
					{name:'广西', value:15700},
					{name:'黑龙江', value:14800},
					{name:'重庆', value:14300},
					{name:'吉林', value:13800},
					{name:'云南', value:12814},
					{name:'山西', value:12759},
					{name:'新疆', value:9264},
					{name:'贵州', value:9251},
					{name:'甘肃', value:6600},
					{name:'海南', value:3500},
					{name:'宁夏', value:2800},
					{name:'青海', value:2300},
					{name:'西藏', value:900},
					{name:'香港', value:22457},
					{name:'台湾', value:31703},
				],
				markLine : {
					smooth:true,
					effect : {
						show: true,
						scaleSize: 1,
						period: 30,
						color: '#fff',
						shadowBlur: 10
					},
					itemStyle : {
						normal: {
							borderWidth:1,
							label: {
								show: false
							},
							lineStyle: {
								type: 'solid',
								shadowBlur: 10
							}
						}
					},
					data : [
						[{name:'成都', smoothRadian:0.2}, {name:'北京',value:45}],
						[{name:'沈阳', smoothRadian:0.3}, {name:'北京',value:40}],
						[{name:'南京', smoothRadian:0.4}, {name:'北京',value:30}],
						[{name:'东莞', smoothRadian:0.4}, {name:'北京',value:20}]
					]
				}
			},
			{
				name: '钞纸',
				type: 'map',
				mapType: 'china',
				data:[
					{name:'广东', value:67800},
					{name:'江苏', value:65100},
					{name:'山东', value:59400},
					{name:'浙江', value:40200},
					{name:'河南', value:34900},
					{name:'河北', value:29000},
					{name:'辽宁', value:28600},
					{name:'四川', value:28500},
					{name:'湖北', value:27400},
					{name:'湖南', value:27000},
					{name:'福建', value:24100},
					{name:'上海', value:23600},
					{name:'北京', value:21300},
					{name:'安徽', value:20800},
					{name:'内蒙古', value:17800},
					{name:'陕西', value:17700},
					{name:'天津', value:15722},
					{name:'江西', value:15708},
					{name:'广西', value:15700},
					{name:'黑龙江', value:14800},
					{name:'重庆', value:14300},
					{name:'吉林', value:13800},
					{name:'云南', value:12814},
					{name:'山西', value:12759},
					{name:'新疆', value:9264},
					{name:'贵州', value:9251},
					{name:'甘肃', value:6600},
					{name:'海南', value:3500},
					{name:'宁夏', value:2800},
					{name:'青海', value:2300},
					{name:'西藏', value:900},
					{name:'香港', value:22457},
					{name:'台湾', value:31703},
				],
				markLine : {
					smooth:true,
					effect : {
						show: true,
						scaleSize: 1,
						period: 30,
						color: '#fff',
						shadowBlur: 10
					},
					itemStyle : {
						normal: {
							borderWidth:1,
							label: {
								show: false
							},
							lineStyle: {
								type: 'solid',
								shadowBlur: 10
							}
						}
					},
					data : [
						[ {name:'成都',value:40},{name:'西安', smoothRadian:0.7}],
						[{name:'保定', smoothRadian:0.3}, {name:'北京',value:20}],
						[{name:'保定', smoothRadian:0.6}, {name:'石家庄',value:30}],
						[{name:'昆山', smoothRadian:0.4}, {name:'南昌',value:10}],
						[{name:'昆山', smoothRadian:0.4}, {name:'上海',value:10}],
						[{name:'东莞', smoothRadian:0.4}, {name:'东莞',value:20}]
					]
				}
			}
		]
	},
    'TreeMap':{
		title : {
			text: '印码各机型主要缺陷类型分布',
			subtext: '数据来源：号码质量中心数据库',
			x:'20'
		},
		tooltip : {
			trigger: 'item',
			formatter: "{b}: {c}"
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
		calculable : false,
		series : [
			{
				name:'矩形图',
				type:'treemap',
				itemStyle: {
					normal: {
						label: {
							show: true,
							formatter: "{b}\n{c}",
							textStyle: {color: '#fff'}
						},
						borderWidth: 1
					},
					emphasis: {
						label: {
							show: true,
							textStyle: {
								color: '#fff'
							}
						}
					}
				},
				data:[
					{name:'墨点(43%)',value:60679,children:[{name:'双色机',value:45628},{name:'多功能',value:6364},{name:'M81D',value:1366},{name:'DMJ12',value:7217}]},
					{name:'花白',value:12708,children:[{name:'双色机',value:6477},{name:'多功能',value:4826},{name:'M81D',value:714},{name:'DMJ12',value:676}]},
					{name:'错号',value:11085,children:[{name:'双色机',value:4628},{name:'多功能',value:3287},{name:'M81D',value:2037},{name:'DMJ12',value:1133}]},
					{name:'走版',value:8785,children:[{name:'双色机',value:4812},{name:'多功能',value:2154},{name:'M81D',value:517},{name:'DMJ12',value:1297}]},
					{name:'墨浓',value:8680,children:[{name:'双色机',value:216},{name:'多功能',value:8304}]},
					{name:'墨浅',value:7207,children:[{name:'双色机',value:3361},{name:'多功能',value:1366},{name:'M81D',value:1699},{name:'DMJ12',value:778}]},
					{name:'嵌墨',value:4424,children:[{name:'双色机',value:1831},{name:'多功能',value:31},{name:'M81D',value:2194},{name:'DMJ12',value:368}]},
					{name:'骑码',value:3238,children:[{name:'双色机',value:45628},{name:'多功能',value:1731},{name:'M81D',value:929},{name:'DMJ12',value:249}]},
					{name:'保险',value:3003},
					{name:'串色',value:2854},
					{name:'荧光残缺',value:2497},
					{name:'荧光缺印',value:2438},
					{name:'荧光蹭脏',value:2320},
					{name:'荧光断线',value:2222},
					{name:'荧光墨淡',value:1811},
					{name:'墨脏',value:1579},
					{name:'其他',value:1542},
					{name:'荧光走版',value:1407},
					{name:'折角',value:1109},
					{name:'漏印',value:462},
					{name:'水印其他',value:285},
					{name:'整列错号',value:180},
					{name:'可疑',value:174},
					{name:'水印未查',value:151},
					{name:'荧光其他',value:111}
				]
			}
		]
	}, 
	'TreeMap2':{
		title : {
			text: '印码各机型主要缺陷类型分布(M97型)',
            subtext: '数据来源：号码质量中心数据库\t     品种:9607T品',
			x:'20'
		},
		tooltip : {
			trigger: 'item',
			formatter: "{b}: {c}"
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
		calculable : false,
		series : [
			{
				name:'矩形图',
				type:'treemap',
				itemStyle: {
					normal: {
						label: {
							show: true,
							formatter: "{b}\n{c}",
							textStyle: {color: '#fff'}
						},
						borderWidth: 1
					},
					emphasis: {
						label: {
							show: true,
							textStyle: {
								color: '#fff'
							}
						}
					}
				},
				data:[
					{name:'墨点(59%)',value:45472,children:[{name:'M97-1#',value:10581},{name:'M97-2#',value:8801},{name:'M97-3#',value:26139},{name:'m97-4#',value:107}]},
                    {name:'花白',value:6477,children:[{name:'M97-1#',value:2596},{name:'M97-2#',value:1736},{name:'M97-3#',value:2145},{name:'m97-4#',value:0}]},
                    {name:'走版',value:4567,children:[{name:'M97-1#',value:888},{name:'M97-2#',value:995},{name:'M97-3#',value:2714},{name:'m97-4#',value:215}]},
                    {name:'错号',value:4290,children:[{name:'M97-1#',value:2161},{name:'M97-2#',value:1513},{name:'M97-3#',value:634},{name:'m97-4#',value:320}]},
                    {name:'墨浅',value:3314},
                    {name:'荧光蹭脏',value:1864},
                    {name:'嵌墨',value:1831},
                    {name:'骑码',value:1692},
                    {name:'其他',value:1474},
                    {name:'保险',value:1474},
                    {name:'荧光墨淡',value:1338},
                    {name:'荧光断线',value:1307},
                    {name:'串色',value:414},
                    {name:'荧光缺印',value:377},
                    {name:'荧光残缺',value:310},
                    {name:'折角',value:225},
                    {name:'荧光其他',value:109},
                    {name:'墨脏',value:32},
                    {name:'可疑',value:2}
				]
			}
		]
	},         
	'TreeMap3':{
		title : {
			text: '印码各机型主要缺陷类型分布(多功能机)',
			subtext: '数据来源：号码质量中心数据库',
			x:'20'
		},
		tooltip : {
			trigger: 'item',
			formatter: "{b}: {c}"
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
		calculable : false,
		series : [
			{
				name:'矩形图',
				type:'treemap',
				itemStyle: {
					normal: {
						label: {
							show: true,
							formatter: "{b}\n{c}",
							textStyle: {color: '#fff'}
						},
						borderWidth: 1
					},
					emphasis: {
						label: {
							show: true,
							textStyle: {
								color: '#fff'
							}
						}
					}
				},
				data:[
					{name:'墨浓(25%)',value:8304,children:[{name:'多功能-1#',value:1733},{name:'多功能-2#',value:2594},{name:'多功能-3#',value:2872},{name:'接线印码机#',value:1105}]},
					{name:'墨点',value:6364,children:[{name:'多功能-1#',value:1254},{name:'多功能-2#',value:2646},{name:'多功能-3#',value:1968},{name:'接线印码机#',value:496}]},
					{name:'花白',value:4826,children:[{name:'多功能-1#',value:505},{name:'多功能-2#',value:945},{name:'多功能-3#',value:1482},{name:'接线印码机#',value:1894}]},
					{name:'错号',value:3287,children:[{name:'多功能-1#',value:907},{name:'多功能-2#',value:981},{name:'多功能-3#',value:966},{name:'接线印码机#',value:433}]},
					{name:'走版',value:2154},
					{name:'串色',value:1606},
					{name:'墨浅',value:1366},
					{name:'保险',value:1354},
					{name:'荧光残缺',value:1240},
					{name:'荧光走版',value:533},
				]
			}
		]
	},   
	'TreeMap4':{
		title : {
			text: '印码各机型主要缺陷类型分布(M81D型)',
			subtext: '数据来源：号码质量中心数据库',
			x:'20'
		},
		tooltip : {
			trigger: 'item',
			formatter: "{b}: {c}"
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
		calculable : false,
		series : [
			{
				name:'矩形图',
				type:'treemap',
				itemStyle: {
					normal: {
						label: {
							show: true,
							formatter: "{b}\n{c}",
							textStyle: {color: '#fff'}
						},
						borderWidth: 1
					},
					emphasis: {
						label: {
							show: true,
							textStyle: {
								color: '#fff'
							}
						}
					}
				},
				data:[
					{name:'嵌墨(19%)',value:2194,children:[{name:'M81D-1#',value:1604},{name:'M81D-2#',value:590}]},
					{name:'错号',value:2037,children:[{name:'M81D-1#',value:1823},{name:'M81D-2#',value:214}]},
					{name:'墨浅',value:1699,children:[{name:'M81D-1#',value:1058},{name:'M81D-2#',value:641}]},
					{name:'墨点',value:1366,children:[{name:'M81D-1#',value:850},{name:'M81D-2#',value:516}]},
					{name:'骑码',value:929,children:[{name:'M81D-1#',value:536},{name:'M81D-2#',value:393}]},
					{name:'花白',value:714,children:[{name:'M81D-1#',value:441},{name:'M81D-2#',value:273}]},
					{name:'荧光残缺',value:657,children:[{name:'M81D-1#',value:643},{name:'M81D-2#',value:14}]},
					{name:'走版',value:517,children:[{name:'M81D-1#',value:364},{name:'M81D-2#',value:153}]},
					{name:'串色',value:387,children:[{name:'M81D-1#',value:238},{name:'M81D-2#',value:149}]},
					{name:'荧光走版',value:224,children:[{name:'M81D-1#',value:164},{name:'M81D-2#',value:60}]},
				]
			}
		]
	},     
	'TreeMap5':{
		title : {
			text: '印码各机型主要缺陷类型分布(DMJ12型)',
			subtext: '数据来源：号码质量中心数据库',
			x:'20'
		},
		tooltip : {
			trigger: 'item',
			formatter: "{b}: {c}"
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
		calculable : false,
		series : [
			{
				name:'矩形图',
				type:'treemap',
				itemStyle: {
					normal: {
						label: {
							show: true,
							formatter: "{b}\n{c}",
							textStyle: {color: '#fff'}
						},
						borderWidth: 1
					},
					emphasis: {
						label: {
							show: true,
							textStyle: {
								color: '#fff'
							}
						}
					}
				},
				data:[
					{name:'墨点(46%)',value:7217,children:[{name:'DMJ12-1#',value:4361},{name:'DMJ12-2#',value:2856}]},
					{name:'荧光缺印',value:1457,children:[{name:'DMJ12-1#',value:1166},{name:'DMJ12-2#',value:291}]},
					{name:'走版',value:1297,children:[{name:'DMJ12-1#',value:1218},{name:'DMJ12-2#',value:79}]},
					{name:'错号',value:1133,children:[{name:'DMJ12-1#',value:734},{name:'DMJ12-2#',value:399}]},
					{name:'墨浅',value:778,children:[{name:'DMJ12-1#',value:341},{name:'DMJ12-2#',value:437}]},
					{name:'花白',value:676,children:[{name:'DMJ12-1#',value:313},{name:'DMJ12-2#',value:363}]},
					{name:'荧光断线',value:612,children:[{name:'DMJ12-1#',value:470},{name:'DMJ12-2#',value:142}]},
					{name:'荧光走版',value:609,children:[{name:'DMJ12-1#',value:547},{name:'DMJ12-2#',value:62}]},
					{name:'嵌墨',value:368,children:[{name:'DMJ12-1#',value:233},{name:'DMJ12-2#',value:135}]},
					{name:'串色',value:346,children:[{name:'DMJ12-1#',value:104},{name:'DMJ12-2#',value:242}]},
				]
			}
		]
	},           
    'TreeMap6':{
        title : {
            text: '印码各机型主要缺陷类型分布(M97-1#机)',
            subtext: '数据来源：号码质量中心数据库\t     品种:9607T品',
            x:'20'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{b}: {c}"
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
        calculable : false,
        series : [
            {
                name:'矩形图',
                type:'treemap',
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            formatter: "{b}\n{c}",
                            textStyle: {color: '#fff'}
                        },
                        borderWidth: 1
                    },
                    emphasis: {
                        label: {
                            show: true,
                            textStyle: {
                                color: '#fff'
                            }
                        }
                    }
                },
                data:[
                    {name:'墨点(50%)',value:10568},
                    {name:'花白',value:2596},
                    {name:'错号',value:2159},
                    {name:'荧光蹭脏',value:1114},
                    {name:'墨浅',value:1017},
                    {name:'走版',value:882},
                    {name:'其他',value:694},
                    {name:'荧光断线',value:545},
                    {name:'荧光墨淡',value:394},
                    {name:'嵌墨',value:391},
                    {name:'骑码',value:300},
                    {name:'保险',value:196},
                    {name:'串色',value:119},
                    {name:'折角',value:46},
                    {name:'荧光缺印',value:36},
                    {name:'荧光残缺',value:35},
                    {name:'荧光其他',value:21},
                    {name:'可疑',value:1},
                ]
            }
        ]
    },     
    'TreeMap7':{
        title : {
            text: '印码各机型主要缺陷类型分布(M97-2#机)',
            subtext: '数据来源：号码质量中心数据库\t     品种:9607T品',
            x:'20'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{b}: {c}"
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
        calculable : false,
        series : [
            {
                name:'矩形图',
                type:'treemap',
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            formatter: "{b}\n{c}",
                            textStyle: {color: '#fff'}
                        },
                        borderWidth: 1
                    },
                    emphasis: {
                        label: {
                            show: true,
                            textStyle: {
                                color: '#fff'
                            }
                        }
                    }
                },
                data:[
                    {name:'墨点(51%)',value:8773},
                    {name:'花白',value:1736},
                    {name:'错号',value:1497},
                    {name:'墨浅',value:1219},
                    {name:'走版',value:978},
                    {name:'荧光蹭脏',value:479},
                    {name:'嵌墨',value:428},
                    {name:'荧光断线',value:366},
                    {name:'保险',value:285},
                    {name:'骑码',value:271},
                    {name:'荧光缺印',value:268},
                    {name:'荧光墨淡',value:225},
                    {name:'荧光残缺',value:211},
                    {name:'其他',value:124},
                    {name:'串色',value:112},
                    {name:'折角',value:95},
                    {name:'荧光其他',value:65},
                    {name:'墨脏',value:8}
                ]
            }
        ]
    },         
    'TreeMap8':{
        title : {
            text: '印码各机型主要缺陷类型分布(M97-3#机)',
            subtext: '数据来源：号码质量中心数据库\t     品种:9607T品',
            x:'20'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{b}: {c}"
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
        calculable : false,
        series : [
            {
                name:'矩形图',
                type:'treemap',
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            formatter: "{b}\n{c}",
                            textStyle: {color: '#fff'}
                        },
                        borderWidth: 1
                    },
                    emphasis: {
                        label: {
                            show: true,
                            textStyle: {
                                color: '#fff'
                            }
                        }
                    }
                },
                data:[
                    {name:'墨点(68%)',value:26131},
                    {name:'走版',value:2707},
                    {name:'花白',value:2145},
                    {name:'骑码',value:1121},
                    {name:'墨浅',value:1078},
                    {name:'嵌墨',value:1012},
                    {name:'保险',value:993},
                    {name:'荧光墨淡',value:719},
                    {name:'其他',value:656},
                    {name:'错号',value:634},
                    {name:'荧光断线',value:396},
                    {name:'荧光蹭脏',value:271},
                    {name:'串色',value:183},
                    {name:'折角',value:84},
                    {name:'荧光缺印',value:73},
                    {name:'荧光残缺',value:64},
                    {name:'墨脏',value:24},
                    {name:'荧光其他',value:23},
                    {name:'可疑',value:1}
                ]
            }
        ]
    },             
    'TreeMap9':{
        title : {
            text: '印码各机型主要缺陷类型分布(DMJ12型)',
            subtext: '数据来源：号码质量中心数据库\t        统计时间：2014年9月至2015年5月10日',
            x:'20'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{b}: {c}"
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
        calculable : false,
        series : [
            {
                name:'矩形图',
                type:'treemap',
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            formatter: "{b}\n{c}",
                            textStyle: {color: '#fff'}
                        },
                        borderWidth: 1
                    },
                    emphasis: {
                        label: {
                            show: true,
                            textStyle: {
                                color: '#fff'
                            }
                        }
                    }
                },
                data:[
                    {name:'墨点(40%)',value:14003},
                    {name:'荧光走版',value:5209},
                    {name:'走版',value:3424},
                    {name:'错号',value:2324},
                    {name:'荧光缺印',value:1798},
                    {name:'墨浅',value:1733},
                    {name:'花白',value:1191},
                    {name:'荧光断线',value:933},
                    {name:'可疑',value:870},
                    {name:'嵌墨',value:724},
                    {name:'串色',value:634},
                    {name:'骑码',value:540},
                    {name:'折角',value:474},
                    {name:'荧光墨淡',value:331},
                    {name:'保险',value:291},
                    {name:'荧光蹭脏',value:256},
                    {name:'墨脏',value:167},
                    {name:'荧光残缺',value:115},
                ]
            }
        ]
    },             
     'TreeMap10':{
        title : {
            text: '印码各机型主要缺陷类型分布',
            subtext: '数据来源：号码质量中心数据库\t        统计时间：2015年4月至5月22日',
            x:'20'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{b}: {c}"
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
        calculable : false,
        series : [
            {
                name:'矩形图',
                type:'treemap',
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            formatter: "{b}\n{c}",
                            textStyle: {color: '#fff'}
                        },
                        borderWidth: 1
                    },
                    emphasis: {
                        label: {
                            show: true,
                            textStyle: {
                                color: '#fff'
                            }
                        }
                    }
                },
                data:[
                    {name:'墨点(26%)',value:9192,
                    children: [
                        {
                            name: 'M97',
                            value: 4743
                        },
                        {
                            name: '多功能',
                            value: 2204
                        },
                        {
                            name: 'M81D',
                            value: 1427
                        },
                        {
                            name: 'DMJ12',
                            value: 2013
                        }
                    ]},
                    {name:'错号',value:4248,
                    children: [
                        {
                            name: 'M97',
                            value: 1994
                        },
                        {
                            name: '多功能',
                            value: 1097
                        },
                        {
                            name: 'M81D',
                            value: 806
                        },
                        {
                            name: 'DMJ12',
                            value: 272
                        }
                    ]},
                    {name:'墨浅',value:3471,
                    children: [
                        {
                            name: 'M97',
                            value: 1303
                        },
                        {
                            name: '多功能',
                            value: 2204
                        },
                        {
                            name: 'M81D',
                            value: 1427
                        },
                        {
                            name: 'DMJ12',
                            value: 517
                        }
                    ]},
                    {name:'荧光蹭脏',value:2810,
                    children: [
                        {
                            name: 'M97',
                            value: 2533
                        },
                        {
                            name: '多功能',
                            value: 58
                        },
                        {
                            name: 'M81D',
                            value: 45
                        },
                        {
                            name: 'DMJ12',
                            value: 132
                        }
                    ]},
                    {name:'花白',value:2772,
                    children: [
                        {
                            name: 'M97',
                            value: 915
						},
                        {
                            name: '多功能',
                            value: 1285
                        },
                        {
                            name: 'M81D',
                            value: 320
                        },
                        {
                            name: 'DMJ12',
                            value: 255
                        }
                    ]},
                    {name:'墨浓',value:2215,
                    children: [
                        {
                            name: 'M97',
                            value: 1303
                        },
                        {
                            name: '多功能',
                            value: 2204
                        }
                    ]},
                    {name:'荧光断线',value:2133,
                    children: [
                        {
                            name: 'M97',
                            value: 1949
                        },
                        {
                            name: '多功能',
                            value: 79
                        },
                        {
                            name: 'M81D',
                            value: 20
                        },
                        {
                            name: 'DMJ12',
                            value: 181
                        }
                    ]},
                    {name:'嵌墨',value:1741,
                    children: [
                        {
                            name: 'M97',
                            value: 296
                        },
                        {
                            name: '多功能',
                            value: 0
                        },
                        {
                            name: 'M81D',
                            value: 1366
                        },
                        {
                            name: 'DMJ12',
                            value: 79
                        }
                    ]},
                    {name:'走版',value:1658},
                    {name:'荧光缺印',value:782},
                    {name:'串色',value:753},
                    {name:'骑码',value:600},
                    {name:'荧光残缺',value:552},
                    {name:'墨脏',value:526},
                    {name:'保险',value:392},
                    {name:'折角',value:366},
                    {name:'荧光其他',value:274},
                    {name:'荧光走版',value:149},
                    {name:'荧光墨淡',value:119},
                    {name:'漏印',value:90},
                    {name:'可疑',value:86},
                    {name:'水印其他',value:40},
                    {name:'整列错号',value:18},
                    {name:'待定',value:7},
                ]
            }
        ]
    },                
     'TreeMap11':{
        title : {
            text: '印码各机型主要缺陷类型分布(DMJ12型)',
            subtext: '数据来源：号码质量中心数据库\t        统计时间：2015年4月至5月22日',
            x:'20'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{b}: {c}"
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
        calculable : false,
        series : [
            {
                name:'矩形图',
                type:'treemap',
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            formatter: "{b}\n{c}",
                            textStyle: {color: '#fff'}
                        },
                        borderWidth: 1
                    },
                    emphasis: {
                        label: {
                            show: true,
                            textStyle: {
                                color: '#fff'
                            }
                        }
                    }
                },
                data:[
                    {name:'墨点(42%)',value:2013},
                    {name:'荧光缺印',value:560},
                    {name:'墨浅',value:517},
                    {name:'错号',value:272},
                    {name:'花白',value:255},
                    {name:'串色',value:187},
                    {name:'荧光断线',value:181},
                    {name:'走版',value:147},
                    {name:'荧光蹭脏',value:132},
                    {name:'骑码',value:118},
                    {name:'折角',value:97},
                    {name:'可疑',value:85},
                    {name:'嵌墨',value:79},
                    {name:'保险',value:56},
                    {name:'荧光墨淡',value:24},
                    {name:'墨脏',value:24},
                    {name:'荧光走版',value:22},
                    {name:'荧光残缺',value:11},
                    {name:'荧光其他',value:1},
                ]
            }
        ]
    },                
     'TreeMap12':{
        title : {
            text: '印码各机型主要缺陷类型分布(M97型)',
            subtext: '数据来源：号码质量中心数据库\t        统计时间：2015年4月至5月22日',
            x:'20'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{b}: {c}"
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
        calculable : false,
        series : [
            {
                name:'矩形图',
                type:'treemap',
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            formatter: "{b}\n{c}",
                            textStyle: {color: '#fff'}
                        },
                        borderWidth: 1
                    },
                    emphasis: {
                        label: {
                            show: true,
                            textStyle: {
                                color: '#fff'
                            }
                        }
                    }
                },
                data:[
                    {name:'墨点(31%)',value:4743},
                    {name:'荧光蹭脏',value:2533},
                    {name:'错号',value:1994},
                    {name:'荧光断线',value:1848},
                    {name:'墨浅',value:1303},
                    {name:'花白',value:915},
                    {name:'走版',value:370},
                    {name:'荧光残缺',value:310},
                    {name:'嵌墨',value:296},
                    {name:'荧光其他',value:273},
                    {name:'骑码',value:189},
                    {name:'保险',value:151},
                    {name:'荧光缺印',value:121},
                    {name:'串色',value:43},
                    {name:'荧光墨淡',value:36},
                    {name:'折角',value:34},
                    {name:'墨脏',value:12},
                    {name:'可疑',value:1},
                    {name:'荧光走版',value:22}
                ]
            }
        ]
    },   
     'TreeMap13':{
        title : {
            text: '印码各机型主要缺陷类型分布(M81D型)',
            subtext: '数据来源：号码质量中心数据库\t        统计时间：2015年4月至5月23日',
            x:'20'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{b}: {c}"
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
        calculable : false,
        series : [
            {
                name:'矩形图',
                type:'treemap',
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            formatter: "{b}\n{c}",
                            textStyle: {color: '#fff'}
                        },
                        borderWidth: 1
                    },
                    emphasis: {
                        label: {
                            show: true,
                            textStyle: {
                                color: '#fff'
                            }
                        }
                    }
                },
                data:[
                    {name:'墨浅(24%)',value:1427},
                    {name:'嵌墨(23%)',value:1366},
                    {name:'墨点',value:925},
                    {name:'错号',value:806},
                    {name:'走版',value:507},
                    {name:'花白',value:320},
                    {name:'骑码',value:202},
                    {name:'串色',value:146},
                    {name:'荧光缺印',value:94},
                    {name:'荧光走版',value:84},
                    {name:'墨脏',value:52},
                    {name:'荧光残缺',value:46},
                    {name:'荧光蹭脏',value:45},
                    {name:'荧光断线',value:20},
                    {name:'荧光墨淡',value:16}
                ]
            }
        ]
    },      
    'TreeMap14':{
        title : {
            text: '印码各机型主要缺陷类型分布(多功能型)',
            subtext: '数据来源：号码质量中心数据库\t        统计时间：2015年4月至5月23日',
            x:'20'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{b}: {c}"
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
        calculable : false,
        series : [
            {
                name:'矩形图',
                type:'treemap',
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            formatter: "{b}\n{c}",
                            textStyle: {color: '#fff'}
                        },
                        borderWidth: 1
                    },
                    emphasis: {
                        label: {
                            show: true,
                            textStyle: {
                                color: '#fff'
                            }
                        }
                    }
                },
                data:[
                    {name:'墨浓(27%)',value:2204},
                    {name:'墨点',value:1395},
                    {name:'花白',value:1285},
                    {name:'错号',value:1097},
                    {name:'走版',value:504},
                    {name:'串色',value:370},
                    {name:'折角',value:234},
                    {name:'墨浅',value:213},
                    {name:'保险',value:185},
                    {name:'荧光残缺',value:166},
                    {name:'漏印',value:88},
                    {name:'骑码',value:87},
                    {name:'荧光断线',value:79},
                    {name:'荧光蹭脏',value:58},
                    {name:'荧光走版',value:34},
                    {name:'整列错号',value:13},
                    {name:'水印其它',value:8},
                    {name:'荧光墨淡',value:6},
                    {name:'荧光缺印',value:4},
                    {name:'待定',value:2}
                ]
            }
        ]
    },                  
    'TreeMap15':{
        title : {
            text: '印码各机型主要缺陷类型分布(M97-3#)',
            subtext: '数据来源：号码质量中心数据库\t        统计时间：2015年4月至5月22日',
            x:'20'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{b}: {c}"
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
        calculable : false,
        series : [
            {
                name:'矩形图',
                type:'treemap',
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            formatter: "{b}\n{c}",
                            textStyle: {color: '#fff'}
                        },
                        borderWidth: 1
                    },
                    emphasis: {
                        label: {
                            show: true,
                            textStyle: {
                                color: '#fff'
                            }
                        }
                    }
                },
                data:[
                    {name:'墨点(51%)',value:1399},
                    {name:'错号',value:342},
                    {name:'墨浅',value:192},
                    {name:'花白',value:173},
                    {name:'荧光残缺',value:168},
                    {name:'嵌墨',value:103},
                    {name:'走版',value:93},
                    {name:'荧光断线',value:69},
                    {name:'骑码',value:61},
                    {name:'保险',value:61},
                    {name:'荧光蹭脏',value:45},
                    {name:'荧光墨淡',value:25},
                    {name:'串色',value:20},
                    {name:'折角',value:9},
                    {name:'荧光缺印',value:5}
                ]
            }
        ]
    },                  
     'TreeMap16':{
        title : {
            text: '印码机检号控系统误报类型分布(M97型)',
            subtext: '数据来源：号码质量中心数据库       品种：9607T品',
            x:'20'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{b}: {c}"
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
        calculable : false,
        series : [
            {
                name:'矩形图',
                type:'treemap',
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            formatter: "{b}\n{c}",
                            textStyle: {color: '#fff'}
                        },
                        borderWidth: 1
                    },
                    emphasis: {
                        label: {
                            show: true,
                            textStyle: {
                                color: '#fff'
                            }
                        }
                    }
                },
                data:[
                    {name:'走版(37%)',value:280883},
                    {name:'花白(15%)',value:111910},
                    {name:'荧光蹭脏(9%)',value:71407},
                    {name:'嵌墨',value:70410},
                    {name:'荧光断线',value:36792},
                    {name:'墨点',value:36062},
                    {name:'荧光墨淡',value:33234},
                    {name:'骑码',value:29921},
                    {name:'荧光缺印',value:21768},
                    {name:'错号',value:16736},
                    {name:'墨脏',value:14988},
                    {name:'水印其他',value:9815},
                    {name:'荧光残缺',value:8933},
                    {name:'保险',value:6858},
                    {name:'串色',value:5519},
                ]
            }
        ]
    },                  
     'TreeMap17':{
        title : {
            text: '印码机检号控系统误报类型分布(M97型)',
            subtext: '数据来源：号码质量中心数据库       品种：96A品',
            x:'20'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{b}: {c}"
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
        calculable : false,
        series : [
            {
                name:'矩形图',
                type:'treemap',
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            formatter: "{b}\n{c}",
                            textStyle: {color: '#fff'}
                        },
                        borderWidth: 1
                    },
                    emphasis: {
                        label: {
                            show: true,
                            textStyle: {
                                color: '#fff'
                            }
                        }
                    }
                },
                data:[
                    {name:'荧光蹭脏(15%)',value:250444},
                    {name:'荧光残缺(15%)',value:248301},
                    {name:'荧光断线(11%)',value:183815},
                    {name:'墨浅',value:176891},
                    {name:'墨脏',value:159505},
                    {name:'走版',value:150783},
                    {name:'墨浓',value:77066},
                    {name:'荧光走版',value:75318},
                    {name:'荧光墨淡',value:67930},
                    {name:'错号',value:48582},
                    {name:'串色',value:43560},
                    {name:'漏印',value:33237},
                    {name:'水印其他',value:27007},
                    {name:'折角',value:20133},
                    {name:'荧光缺印',value:12902},
                    {name:'整列错号',value:11205},
                    {name:'水印走板',value:11107},
                    {name:'墨点',value:10335},
                    {name:'花白',value:5296},
                    {name:'荧光整列走板',value:2927},
                    {name:'待定',value:2133},
                    {name:'骑码',value:1903},
                    {name:'保险',value:1019},
                    {name:'其他',value:155},
                    {name:'水印未查',value:40},
                    {name:'可疑',value:8}
                ]
            }
        ]
    },                  
     'TreeMap18':{
        title : {
            text: '印码机检号控系统误报类型分布(多功能机)',
            subtext: '数据来源：号码质量中心数据库',
            x:'20'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{b}: {c}"
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
        calculable : false,
        series : [
            {
                name:'矩形图',
                type:'treemap',
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            formatter: "{b}\n{c}",
                            textStyle: {color: '#fff'}
                        },
                        borderWidth: 1
                    },
                    emphasis: {
                        label: {
                            show: true,
                            textStyle: {
                                color: '#fff'
                            }
                        }
                    }
                },
                data:[
                    {name:'墨浅(19%)',value:100708},
                    {name:'荧光残缺(17%)',value:90604},
                    {name:'墨浓(14%)',value:74821},
                    {name:'走版(14%)',value:72321},
                    {name:'荧光走版',value:36845},
                    {name:'水印其他',value:26715},
                    {name:'花白',value:26676},
                    {name:'荧光蹭脏',value:23841},
                    {name:'水印走板',value:18998},
                    {name:'错号',value:17304},
                    {name:'荧光断线',value:13287},
                    {name:'墨点',value:8771},
                    {name:'折角',value:7106},
                    {name:'荧光墨淡',value:6824},
                    {name:'串色',value:4018},
                ]
            }
        ]
    },                  
     'TreeMap19':{
        title : {
            text: '印码机检号控系统误报类型分布(M81D)',
            subtext: '数据来源：号码质量中心数据库',
            x:'20'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{b}: {c}"
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
        calculable : false,
        series : [
            {
                name:'矩形图',
                type:'treemap',
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            formatter: "{b}\n{c}",
                            textStyle: {color: '#fff'}
                        },
                        borderWidth: 1
                    },
                    emphasis: {
                        label: {
                            show: true,
                            textStyle: {
                                color: '#fff'
                            }
                        }
                    }
                },
                data:[              
                    {name:'嵌墨(23%)',value:38653},
                    {name:'荧光墨淡(21%)',value:35126},
                    {name:'荧光断线(16%)',value:26379},
                    {name:'错号',value:11719},
                    {name:'墨点',value:11608},
                    {name:'花白',value:11071},
                    {name:'荧光走版',value:8572},
                    {name:'走版',value:8098},
                    {name:'荧光缺印',value:6612},
                    {name:'荧光蹭脏',value:4015},
                    {name:'墨浅',value:3495},
                    {name:'荧光残缺',value:2451},
                    {name:'串色',value:336},
                    {name:'骑码',value:314},
                    {name:'墨脏',value:10},
                ]
            }
        ]
    },                  
     'TreeMap20':{
        title : {
            text: '印码机检号控系统误报类型分布(DMJ12型)',
            subtext: '数据来源：号码质量中心数据库',
            x:'20'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{b}: {c}"
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
        calculable : false,
        series : [
            {
                name:'矩形图',
                type:'treemap',
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            formatter: "{b}\n{c}",
                            textStyle: {color: '#fff'}
                        },
                        borderWidth: 1
                    },
                    emphasis: {
                        label: {
                            show: true,
                            textStyle: {
                                color: '#fff'
                            }
                        }
                    }
                },
                data:[
                    {name:'墨点(39%)',value:57752},
                    {name:'荧光缺印(22%)',value:33047},
                    {name:'荧光墨淡(22%)',value:32908},
                    {name:'错号',value:6360},
                    {name:'花白',value:5190},
                    {name:'荧光走版',value:3805},
                    {name:'荧光残缺',value:2295},
                    {name:'走版',value:1831},
                    {name:'串色',value:1507},
                    {name:'荧光蹭脏',value:1399},
                    {name:'嵌墨',value:1287},
                    {name:'荧光断线',value:1142},
                    {name:'折角',value:364},
                    {name:'墨浅',value:359},
                    {name:'保险',value:198},
                ]
            }
        ]
    },        
    'TreeMap21':{
        title : {
            text: '印码机检号控系统误报类型分布(M97-1#)',
            subtext: '数据来源：号码质量中心数据库    品种：9607T品',
            x:'20'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{b}: {c}"
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
        calculable : false,
        series : [
            {
                name:'矩形图',
                type:'treemap',
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            formatter: "{b}\n{c}",
                            textStyle: {color: '#fff'}
                        },
                        borderWidth: 1
                    },
                    emphasis: {
                        label: {
                            show: true,
                            textStyle: {
                                color: '#fff'
                            }
                        }
                    }
                },
                data:[
                    {name:'走版(35%)',value:64683},
                    {name:'花白(13%)',value:23955},
                    {name:'骑码(12%)',value:21613},
                    {name:'嵌墨',value:17831},
                    {name:'荧光断线',value:16606},
                    {name:'错号',value:8428},
                    {name:'荧光蹭脏',value:7343},
                    {name:'墨点',value:7281},
                    {name:'荧光墨淡',value:3978},
                    {name:'墨浅',value:2620},
                    {name:'墨脏',value:2482},
                    {name:'荧光残缺',value:1735},
                    {name:'荧光走版',value:766},
                    {name:'墨浓',value:675},
                    {name:'折角',value:625},
                    {name:'荧光其他',value:435},
                    {name:'荧光缺印',value:283},
                    {name:'保险',value:265},
                    {name:'漏印',value:210},
                    {name:'其他',value:188},
                    {name:'串色',value:172},
                    {name:'整列错号',value:40},
                    {name:'待定',value:9},
                    {name:'水印其他',value:8},
                    {name:'荧光整列走板',value:3},
                ]
            }
        ]
    },    
    'TreeMap22':{
        title : {
            text: '印码机检号控系统误报类型分布(M97-2#)',
            subtext: '数据来源：号码质量中心数据库    品种：9607T品',
            x:'20'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{b}: {c}"
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
        calculable : false,
        series : [
            {
                name:'矩形图',
                type:'treemap',
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            formatter: "{b}\n{c}",
                            textStyle: {color: '#fff'}
                        },
                        borderWidth: 1
                    },
                    emphasis: {
                        label: {
                            show: true,
                            textStyle: {
                                color: '#fff'
                            }
                        }
                    }
                },
                data:[
                    {name:'花白(19%)',value:47970},
                    {name:'荧光残缺(16%)',value:40619},
                    {name:'走版(16%)',value:38420},
                    {name:'嵌墨(13%)',value:32035},
                    {name:'墨脏(11%)',value:26417},
                    {name:'墨点',value:14854},
                    {name:'荧光走版',value:10906},
                    {name:'荧光蹭脏',value:6198},
                    {name:'墨浅',value:6004},
                    {name:'荧光断线',value:4017},
                    {name:'水印其他',value:3779},
                    {name:'错号',value:3284},
                    {name:'荧光墨淡',value:2021},
                    {name:'墨浓',value:1809},
                    {name:'骑码',value:1637},
                    {name:'保险',value:1206},
                    {name:'荧光其他',value:1199},
                    {name:'荧光缺印',value:1171},
                    {name:'水印走板',value:919},
                    {name:'折角',value:919},
                    {name:'串色',value:696},
                    {name:'待定',value:393},
                    {name:'整列错号',value:380},
                    {name:'漏印',value:320},
                    {name:'荧光整列走板',value:111},
                    {name:'水印未查',value:3}
                ]
            }
        ]
    },    
    'TreeMap23':{
        title : {
            text: '印码机检号控系统误报类型分布(M97-3#)',
            subtext: '数据来源：号码质量中心数据库    品种：9607T品',
            x:'20'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{b}: {c}"
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
        calculable : false,
        series : [
            {
                name:'矩形图',
                type:'treemap',
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            formatter: "{b}\n{c}",
                            textStyle: {color: '#fff'}
                        },
                        borderWidth: 1
                    },
                    emphasis: {
                        label: {
                            show: true,
                            textStyle: {
                                color: '#fff'
                            }
                        }
                    }
                },
                data:[
                    {name:'荧光残缺(22%)',value:63665},
                    {name:'走版(13%)',value:36918},
                    {name:'串色(10%)',value:29521},
                    {name:'荧光蹭脏(10%)',value:28000},
                    {name:'墨脏',value:23581},
                    {name:'墨浅',value:17653},
                    {name:'墨浓',value:13108},
                    {name:'错号',value:13168},
                    {name:'荧光墨淡',value:11577},
                    {name:'荧光走版',value:10995},
                    {name:'漏印',value:9561},
                    {name:'荧光缺印',value:9388},
                    {name:'水印走板',value:8604},
                    {name:'整列错号',value:6414},
                    {name:'折角',value:3034},
                    {name:'荧光断线',value:2729},
                    {name:'水印其他',value:914},
                    {name:'墨点',value:606},
                    {name:'骑码',value:291},
                    {name:'待定',value:235},
                    {name:'其他',value:155},
                    {name:'荧光整列走板',value:68},
                    {name:'水印未查',value:17}
                ]
            }
        ]
    },          
	'QualityByCode18': {		
		//backgroundColor: '#FAFAFA',
		title : {
                text: '印码各机型平均每万作废条数',
                subtext: '数据来源：号码质量中心数据库',
				x:'center',
            },
        tooltip : {
            trigger: 'axis',
			axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			},
        },
		legend: {
			x : 'center',
			y : 60,
			itemGap:30,
			data : ['误废','实废'],			
		},
		grid:{
			x:80,
			y:60,
		},
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
				//dataZoom : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        yAxis : [
            {
				name:'机台',
				axisTick : {show: false},//隐藏标记线,
				axisLine: {show: false},
                type : 'category',
                boundaryGap : true,                
				data:['M97升级前','M97升级后','多功能','M81D','DMJ12'],
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: 45,
					margin: 12          
				},
				splitArea: {show: false}
			}
        ],
        xAxis : [
            {
				name:'条数',
                type : 'value',
				position: 'left',
				scale: true,
				axisTick : {show: false},//隐藏标记线,
				axisLine: {show: false},
				axisLabel : {
					show:false,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value} ',    // Template formatter!               
				},
				splitArea: {show: false}
            }
        ],
        series : [			 
			{
				name:'误废',
				type:'bar',barMaxWidth:100,
				smooth:true,
				symbolSize: 6,
                itemStyle : {
					normal:{
						color: 'rgb(80,80,80)',
						lineStyle: {
							width: 5,
							shadowOffsetX: 3,
							shadowOffsetY: 3
						},
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},						
						label : {
							show: true,
							position: 'insideRight',
							//'{c}'
						}
					}},				
				stack: '总量',
				data:[393,100,55,167,149],
			},
			{
				name:'实废',
				type:'bar',barMaxWidth:100,
				smooth:true,
				symbolSize: 6,
                itemStyle : {
					normal:{
						color: 'rgb(255,207,54)',
						lineStyle: {
							width: 5,
							shadowOffsetX: 3,
							shadowOffsetY: 3
						},
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},						
						label : {
							show: true,
							position: 'right',
							textStyle:{color:'rgb(80,80,80)'},
						}
					}},
				stack: '总量',
				data:[10.4,56.1,3.44,11.17,15.6],
			},
        ]
    },
	'QualityByCode19': {		
		//backgroundColor: '#FAFAFA',
		title : {
                text: '2015年4月前后印码墨点实废比例变化情况',
                subtext: '数据来源：号码质量中心数据库',
				x:'center',
            },
        tooltip : {
            trigger: 'axis',
			axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			},
        },
		legend: {
			x : 'center',
			y : 60,
			itemGap:30,
			data : ['4月后','变化值'],			
		},
		grid:{
            x:80,
            y:70,
            y2:'5',
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
				//dataZoom : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        yAxis : [
            {
				name:'机台',
				axisTick : {show: false},//隐藏标记线,
				axisLine: {show: false},
                type : 'category',
                boundaryGap : true,                
				data:['M97','M97-3#','DMJ12'],
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: 45,
					margin: 12          
				},
				splitArea: {show: false}
			}
        ],
        xAxis : [
            {
				name:'比例',
                type : 'value',
				position: 'left',
				scale: true,
				axisTick : {show: false},//隐藏标记线,
				axisLine: {show: false},
				axisLabel : {
					show:false,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value} ',    // Template formatter!               
				},
				splitArea: {show: false}
            }
        ],
        series : [			 
			{
				name:'4月后',
				type:'bar',barMaxWidth:80,
				smooth:true,
				symbolSize: 6,
                itemStyle : {
					normal:{
						color: 'rgb(80,80,80)',
						lineStyle: {
							width: 5,
							shadowOffsetX: 3,
							shadowOffsetY: 3
						},
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},						
						label : {
							show: true,
							position: 'insideRight',
							formatter:'{c}%'
						}
					}},				
				stack: '4月前',
				data:[31,51,42],
			},
			{
				name:'变化值',
				type:'bar',barMaxWidth:60,
				smooth:true,
				symbolSize: 6,
                itemStyle : {
					normal:{
						color: 'rgb(255,207,54)',
						lineStyle: {
							width: 5,
							shadowOffsetX: 3,
							shadowOffsetY: 3
						},
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},						
						label : {
							show: true,
							position: 'insideLeft',
							textStyle:{color:'rgb(80,80,80)'},
							formatter:'↓ {c}%'
						}
					}},
				stack: '4月前',
				data:[28,17,4],
			},
        ]
    },
    'QualityByCode20': {        
        //backgroundColor: '#FAFAFA',
        title : {
                text: '印码各机台稽核实废条数分布',
                subtext: '数据来源：号码质量中心数据库\n统计时间：2015年1月至5月24日',
                x:'center',
            },
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            },
        },
        grid:{
            x:80,
            y:5,
            y2:'5',
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                //dataZoom : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        yAxis : [
            {
                name:'机台',
                axisTick : {show: false},//隐藏标记线,
                axisLine: {show: false},
                type : 'category',
                boundaryGap : true,                
                data:['DMJ12-1','DMJ12-2','M81D-1','M81D-2','M97-1','M97-2','M97-3','M97-4','多功能-1','多功能-2','多功能-3','接线印码机'],
                axisLabel : {
                    show:true,
                    interval: 'auto',    // {number}
                    //rotate: 45,
                    margin: 12          
                },
                splitArea: {show: false}
            }
        ],
        xAxis : [
            {
                name:'缺陷条数',
                type : 'value',
                position: 'left',
                scale: true,
                axisTick : {show: false},//隐藏标记线,
                axisLine: {show: false},
                axisLabel : {
                    show:false,
                    interval: 'auto',    // {number}
                    //rotate: -45,
                    margin: 8,
                    formatter: '{value} ',    // Template formatter!               
                },
                splitArea: {show: false}
            }
        ],
        series : [           
            {
                name:'实废',
                type:'bar',barMaxWidth:60,
                smooth:true,
                symbolSize: 6,
                itemStyle : {
                    normal:{
                        //color: 'rgb(144,209,81)',//'rgb(255,207,54)',
						color: function(params) {
                            var colorList = [
                              'rgb(243,111,91)','rgb(255,207,54)','rgb(144,209,81)','rgb(144,209,81)','rgb(106,117,141)','rgb(106,117,141)'
                            ];
                            return colorList[parseInt(params.dataIndex/2)]
                        },
                        lineStyle: {
                            width: 5,
                            shadowOffsetX: 3,
                            shadowOffsetY: 3
                        },
                        barBorderColor:'rgba(0,0,0,0)',
                        areaStyle: {type: 'default'},                       
                        label : {
                            show: true,
                            position: 'insideRight',
                            //textStyle:{color:'rgb(80,80,80)'},
                            formatter:'{c}'
                        }
                    }},
                //stack: '总量',
                data:[94,130,518,620,410,490,196,648,119,199,120,72],
            },
        ]
    },
    'TreeMap24':{
        title : {
            text: '印码稽核实废缺陷类型分布',
            subtext: '数据来源：号码质量中心数据库\t      统计时间：2015年1月至5月24日',
            x:'20'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{b}: {c}"
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
        calculable : false,
        series : [
            {
                name:'矩形图',
                type:'treemap',
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            formatter: "{b}\n{c}",
                            textStyle: {color: '#fff'}
                        },
                        borderWidth: 1
                    },
                    emphasis: {
                        label: {
                            show: true,
                            textStyle: {
                                color: '#fff'
                            }
                        }
                    }
                },
                data:[
                    {name:'走版(17%)',value:602,
						children:[							
							{name:'多功能-1#',value:6},
							{name:'多功能-2#',value:19},
							{name:'多功能-3#',value:16},
							{name:'接线印码机',value:9},
							{name:'M97-1#',value:122},
							{name:'M97-2#',value:34},
							{name:'M97-3#',value:48},
							{name:'M97-4#',value:180},
							{name:'M81D-1#',value:7},
							{name:'M81D-2#',value:146},
							{name:'DMJ12-1#',value:7},
							{name:'DMJ12-1#',value:8},
					]},
                    {name:'墨点(17%)',value:599,
						children:[							
							{name:'多功能-1#',value:7},
							{name:'多功能-2#',value:25},
							{name:'多功能-3#',value:3},
							{name:'接线印码机',value:1},
							{name:'M97-1#',value:78},
							{name:'M97-2#',value:255},
							{name:'M97-3#',value:35},
							{name:'M97-4#',value:21},
							{name:'M81D-1#',value:67},
							{name:'M81D-2#',value:56},
							{name:'DMJ12-1#',value:31},
							{name:'DMJ12-1#',value:21},
					]},
                    {name:'花白(10%)',value:362,
						children:[							
							{name:'多功能-1#',value:22},
							{name:'多功能-2#',value:33},
							{name:'多功能-3#',value:5},
							{name:'接线印码机',value:19},
							{name:'M97-1#',value:91},
							{name:'M97-2#',value:42},
							{name:'M97-3#',value:84},
							{name:'M97-4#',value:0},
							{name:'M81D-1#',value:26},
							{name:'M81D-2#',value:30},
							{name:'DMJ12-1#',value:5},
							{name:'DMJ12-1#',value:5},
					]},
                    {name:'墨浅(9%)',value:322,
						children:[							
							{name:'多功能-1#',value:8},
							{name:'多功能-2#',value:5},
							{name:'多功能-3#',value:2},
							{name:'接线印码机',value:3},
							{name:'M97-1#',value:26},
							{name:'M97-2#',value:20},
							{name:'M97-3#',value:10},
							{name:'M97-4#',value:4},
							{name:'M81D-1#',value:155},
							{name:'M81D-2#',value:66},
							{name:'DMJ12-1#',value:3},
							{name:'DMJ12-1#',value:21},
					]},
                    {name:'嵌墨',value:306,
						children:[							
							{name:'多功能-1#',value:0},
							{name:'多功能-2#',value:0},
							{name:'多功能-3#',value:0},
							{name:'接线印码机',value:0},
							{name:'M97-1#',value:10},
							{name:'M97-2#',value:26},
							{name:'M97-3#',value:2},
							{name:'M97-4#',value:0},
							{name:'M81D-1#',value:193},
							{name:'M81D-2#',value:69},
							{name:'DMJ12-1#',value:2},
							{name:'DMJ12-1#',value:4},
					]},
                    {name:'墨脏',value:196,
						children:[						
							{name:'M97-1#',value:10},
							{name:'M97-2#',value:2},
							{name:'M97-4#',value:184}
					]},
                    {name:'串色',value:165,
						children:[							
							{name:'多功能-1#',value:5},
							{name:'多功能-2#',value:7},
							{name:'多功能-3#',value:6},
							{name:'接线印码机',value:2},
							{name:'M97-1#',value:0},
							{name:'M97-2#',value:2},
							{name:'M97-3#',value:0},
							{name:'M97-4#',value:7},
							{name:'M81D-1#',value:9},
							{name:'M81D-2#',value:117},
							{name:'DMJ12-1#',value:1},
							{name:'DMJ12-1#',value:9},
					]},
                    {name:'错号',value:161},
                    {name:'荧光走版',value:144},
                    {name:'荧光残缺',value:132},
                    {name:'整列错号',value:112},
                    {name:'荧光缺印',value:84},
                    {name:'荧光断线',value:77},
                    {name:'骑码',value:69},
                    {name:'荧光蹭脏',value:56},
                    {name:'墨浓',value:51},
                    {name:'荧光墨淡',value:47},
                    {name:'保险',value:39},
                    {name:'折角',value:35},
                    {name:'水印其他',value:16},
                    {name:'漏印',value:13},
                    {name:'水印走板',value:7},
                    {name:'荧光其他',value:3},
                    {name:'待定',value:2},
                    {name:'荧光整列走板',value:2},
                    {name:'水印未查',value:1}
                ]
            }
        ]
    },    
    'RoseData2': {       
        title : {
            text: '印码号控判废结果分布',
            subtext: '数据来源：号码质量中心数据库\n统计时间：2015年1月至5月24日',
            x:'center'
        },
        tooltip : {
            trigger: 'axis',            
            axisPointer:{
                type : 'cross',
                lineStyle: {
                    type : 'dashed',
                    width : 1
                }
            },
            formatter: "{b} : {c} ({d}%)"
        },
        /*legend: {
            x : 'center',
            y : '80',
            data:['误废','实废','漏废']
        },*/
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        series : [
            {
                name:'作废分布',
                type:'pie',                 
                //startAngle: 180,
                radius : [70, 200],
                center : ['50%', 260],
                roseType : 'area',//面积模式
                itemStyle : {
                    normal : {
                        label : {
                            show : true,
                            position : 'outter',
                            textStyle : {
                                fontSize : '15',
                                fontWeight : 'bold'
                            },
                            formatter: "{b}:{c}"
                        },
                        labelLine : {
                            show : true
                        }
                    },
                    emphasis : {
                        label : {
                            show : true,
                            position : 'center',
                            textStyle : {
                                fontSize : '20',
                                fontWeight : 'bold'
                            },
                            formatter: "{b}\n{d}%"
                        }
                    }
                },
                data:[
                    {value:122134, name:'实废'},
                    {value:1866786, name:'误废'},
                    {value:3603, name:'漏废'}
                ]
            }
        ]
    },
    'QualityByCode21': {        
        //backgroundColor: '#FAFAFA',
        title : {
                text: '印码机台判废主要漏废类型分布',
                subtext: '数据来源：号码质量中心数据库\n统计时间：2015年1月至5月24日',
                x:'center',
            },
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            },
        },
        legend: {
            x : 'center',
            y : '95%',
            data:['M97-1','M97-2','M97-4','M81D-1','M81D-2'],
            itemGap : 165
        },
        grid:{
            x:20,
            y:60,
            y2:60,
            x2:20
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                //dataZoom : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        xAxis : [
            {
                name:'缺陷类型',
                axisTick : {show: false},//隐藏标记线,
                axisLine: {show: false},
                type : 'category',
                boundaryGap : true,                
                data:['走版','花白','墨点','错号','墨浅','墨点','花白','走版','骑码','嵌墨','墨脏','走版','整列错号','荧光残缺','荧光缺印','嵌墨','墨浅','墨点','花白','错号','走版','串色','荧光走版','嵌墨','墨浅'],
                axisLabel : {
                    show:true,
                    interval: 'auto',    // {number}
                    rotate: 0.1,
                    margin: 8          
                },
                splitArea: {show: false}
            }
        ],
        yAxis : [
            {
                name:'缺陷条数',
                type : 'value',
                position: 'left',
                scale: true,
                axisTick : {show: false},//隐藏标记线,
                axisLine: {show: false},
                axisLabel : {
                    show:false,
                    interval: 'auto',    // {number}
                    margin: 8,
                    formatter: '{value} ',    // Template formatter!               
                }
            }
        ],
        series : [           
            {
                name:'漏废',
                type:'bar',barMaxWidth:60,
                smooth:true,
                symbolSize: 6,
                itemStyle : {
                    normal:{
                        color: function(params) {
                            var colorList = [
                              'rgb(243,111,91)','rgb(80,80,80)','rgb(255,207,54)','rgb(144,209,81)','rgb(106,117,141)'
                            ];
                            return colorList[parseInt(params.dataIndex/5)]
                        },
                        lineStyle: {
                            width: 5,
                            shadowOffsetX: 3,
                            shadowOffsetY: 3
                        },
                        barBorderColor:'rgba(0,0,0,0)',
                        areaStyle: {type: 'default'},                       
                        label : {
                            show: true,
                            position: 'insideTop',
                            //textStyle:{color:'rgb(80,80,80)'},
                            formatter:'{c}'
                        }
                    }},
                //stack: '总量',
                data:[122,91,78,29,26,255,42,34,32,26,184,180,99,36,27,193,155,67,26,16,146,117,79,69,66],
            },
        ]
    },
    'RoseData3': {       
        title : {
            text: '墨点实废组成分布(M97-3# 9607T)',
            subtext: '数据来源：号码质量中心数据库\n统计范围：随机抽取2015年共1000条缺陷',
            x:'center'
        },
        tooltip : {
            trigger: 'axis',            
            axisPointer:{
                type : 'cross',
                lineStyle: {
                    type : 'dashed',
                    width : 1
                }
            },
            formatter: "{b} : {c} ({d}%)"
        },
        /*legend: {
            x : 'left',
            y : 'center',
            orient : 'vertical',
            data:['纸点','号码墨点','前工序']
        },*/
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        series : [
            {
                name:'作废分布',
                type:'pie',                 
                //startAngle: 180,
                radius : [70, 190],
                center : ['50%', 280],
                //roseType : 'radius',//'area',//面积模式
                itemStyle : {
                    normal : {
                        color: function(params) {
                            var colorList = [
                              'rgb(106,117,141)','rgb(255,207,54)','rgb(144,209,81)'
                            ];
                            return colorList[params.dataIndex]
                        },
                        label : {
                            show : true,
                            position : 'inner',
                            textStyle : {
                                fontSize : '15',
                                fontWeight : 'bold',
                                color:'#fff',
                            },
                            formatter: "{b}:{c}"
                        },
                        labelLine :{show:false}
                    },
                    emphasis : {
                        label : {
                            show : true,
                            position : 'center',
                            textStyle : {
                                fontSize : '20',
                                fontWeight : 'bold'
                            },
                            formatter: "{b}\n{d}%"
                        }
                    }
                },
                data:[
                    {value:778, name:'纸点'},
                    {value:53, name:'号码墨点',
                    itemStyle : {
                        normal : {
                            label : {
                                position : 'outter',
                                textStyle : {color:'#777'},
                            },
                            labelLine : {
                                show : true
                            }
                        },
                        //emphasis : {label : {textStyle : {color:'#777'}}}
                    }},
                    {value:169, name:'前工序'}
                ]
            }
        ]
    },
	
	'TreeData': {       
		/*color : [
			'rgb(243,111,91)','rgb(255,207,54)','rgb(144,209,81)','#80B1D2',
			'#FB8070','#FBB367','#80B1D2','#CC99FF','#B0D961',
		],*/
		title : {
			text: '成都印钞有限公司\n印钞生产、质量、数字信息力导向布局图',
			subtext: '截止至2015年5月',
			x:'right',
			y:'bottom'
		},
		tooltip : {
			trigger: 'item',
			formatter: '{a} : {b}'
		},
		toolbox: {
			show : true,
			feature : {
				restore : {show: true},
				mark : {show: true},
				magicType: {show: true, type: ['force', 'chord']},
				saveAsImage : {show: true}
			}
		},
		legend: {
			x: 'left',
			data:[ '主数据','信息系统','基础信息','元信息'],
			selected:{'主数据':false}
		},
		series : [
			{
				type:'force',
				name : "节点描述",
				ribbonType: false,
				categories : [              	
					{
						name: '主数据',
					},
					{
						name: '信息系统'
					},
					{
						name: '元信息'
					},
					{
						name: '基础信息'
					},
				],
				itemStyle: {
					normal: {
						label: {
							show: true,
							textStyle: {color: '#333'}
						},
						nodeStyle : {
							brushType : 'both',
							borderColor : 'rgba(255,215,0,0.6)',
							borderWidth : 1
						}
					}
				},
				minRadius : 15,
				maxRadius : 35,
				coolDown: 0.995,
				steps: 10,
				nodes:[
					{category:0, name: '大万号', value : 12, label: '★大万号'},   
					{category:0, name: '冠字号', value : 10},  
					{category:1, name: '胶凹离线检测',value : 8},
					{category:1, name: '机台作业',value : 8},
					{category:1, name: '质量综合管理系统',value : 8},
					{category:1, name: '号码三合一',value : 8},					
					{category:1, name: '图像判废',value : 8},
					
					{category:1, name: '清分机检',value : 8},
					{category:1, name: '废品分析',value : 8},
					{category:1, name: '在线清数',value : 8},
					
					{category:1, name: '单开分析仪',value : 8},
					{category:1, name: '防伪指标',value : 8},
					{category:1, name: '库管信息',value : 8},
					//
					{category:2, name: '大张数',value : 3},
					{category:2, name: '识别状态',value : 3},
					{category:2, name: '拒识数',value : 3},
					{category:2, name: '生产时间',value : 3},
					{category:2, name: '识别时间',value : 3},
					//
					{category:2, name: '成品率',value : 3},
					{category:2, name: '作废率1',value : 3},
					{category:2, name: 'IPP数',value : 3},
					{category:2, name: '缺陷数',value : 3},
					//{category:2, name: '印码号',value : 3},
					{category:2, name: '抽检开位',value : 3},
					{category:2, name: '抽检量',value : 3},
					//
					{category:2, name: '废品类型',value : 3},
					{category:2, name: '作废工序',value : 3},
					{category:2, name: '作废开数',value : 3},
					{category:2, name: '封皮数',value : 3},
					{category:2, name: '作废率2',value : 3},
					//
					{category:2, name: '出库时间',value : 3},
					{category:2, name: '出库人员',value : 3},
					//{category:2, name: '机长',value : 3},
					{category:2, name: '机台',value : 3},
					{category:2, name: '入库时间',value : 3},
					{category:2, name: '入库人员',value : 3},
					//
					{category:2, name: '胶正得分',value : 3},
					{category:2, name: '胶背得分',value : 3},
					{category:2, name: '凹正得分',value : 3},
					{category:2, name: '凹背得分',value : 3},
					{category:2, name: '印码得分',value : 3},
					{category:2, name: '裁切得分',value : 3},
					{category:2, name: '纸张得分',value : 3},
					{category:2, name: '评价总分',value : 3},
					//{category:2, name: '安全线',value : 3},
					{category:2, name: '竖号码',value : 3},
					{category:2, name: 'OVMI',value : 3},
					{category:2, name: '安全线2',value : 3},
					//
					{category:2, name: 'W信号',value : 3},
					{category:2, name: '荧光亮度',value : 3},
					{category:2, name: 'SM值',value : 3},
					{category:2, name: '磁性',value : 3},
					{category:2, name: '安全线1',value : 3},
					//
					{category:2, name: '人员类型',value : 3},
					{category:2, name: '机长1',value : 3},
					{category:2, name: '机长2',value : 3},
					{category:2, name: '机长3',value : 3},
					{category:2, name: '机长4',value : 3},
					{category:2, name: '机台',value : 3},
					{category:2, name: '检测时间',value : 3},
					{category:2, name: '总分',value : 3},
					{category:2, name: '墨色',value : 3},
					{category:2, name: '接线',value : 3},
					{category:2, name: '套印',value : 3},
					{category:2, name: '混色',value : 3},
					{category:2, name: '防复印圈',value : 3},
					{category:2, name: '对印',value : 3},
					//
					{category:2, name: '人工实废',value : 3},
					{category:2, name: '机检实废',value : 3},
					{category:2, name: '机检误废',value : 3},
					{category:2, name: '实废大张',value : 3},
					{category:2, name: '未检数',value : 3},
					{category:2, name: '实废小开',value : 3},
					{category:2, name: '拆包量',value : 3},
					{category:2, name: '实废图像1',value : 3},
					{category:2, name: '实废图像2',value : 3},
					//
					{category:3, name: '小张核查',value : 6},
					{category:3, name: '码后核查',value : 6},					
					{category:2, name: '荧光缺陷1',value : 3},
					{category:2, name: '号码缺陷1',value : 3},
					{category:2, name: '荧光缺陷2',value : 3},
					{category:2, name: '号码缺陷2',value : 3},
				
					{category:2, name: '印码号1',value : 3},
					{category:2, name: '印码号2',value : 3},
					{category:2, name: '印码号3',value : 3},
					{category:2, name: '印码号4',value : 3},
					{category:2, name: '印码号5',value : 3},
					{category:2, name: '印码号6',value : 3},
					{category:2, name: '印码号',value : 3},
					{category:2, name: '实废类型1',value : 3},
					{category:2, name: '实废数1',value : 3},
					{category:2, name: '漏废数1',value : 3},
					{category:2, name: '大张废1',value : 3},
					{category:2, name: '实废类型1',value : 3},
					{category:2, name: '实废数1',value : 3},
					{category:2, name: '漏废数1',value : 3},
					{category:2, name: '大张废1',value : 3},
					{category:2, name: '开位1',value : 3},
					{category:2, name: '宏区编号1',value : 3},					
					{category:2, name: '好品率1',value : 3},
					{category:2, name: '缺陷条数1',value : 3},
					{category:2, name: '核查剔废率1',value : 3},
					{category:2, name: '正面缺陷1',value : 3},
					{category:2, name: '背面缺陷1',value : 3},
					{category:2, name: '透视缺陷1',value : 3},
					
					{category:2, name: '实废类型2',value : 3},
					{category:2, name: '实废数2',value : 3},
					{category:2, name: '漏废数2',value : 3},
					{category:2, name: '大张废2',value : 3},
					{category:2, name: '实废类型2',value : 3},
					{category:2, name: '实废数2',value : 3},
					{category:2, name: '漏废数2',value : 3},
					{category:2, name: '大张废2',value : 3},
					{category:2, name: '开位2',value : 3},
					{category:2, name: '宏区编号2',value : 3},					
					{category:2, name: '好品率2',value : 3},
					{category:2, name: '缺陷条数2',value : 3},
					{category:2, name: '核查剔废率2',value : 3},
					{category:2, name: '正面缺陷2',value : 3},
					{category:2, name: '背面缺陷2',value : 3},
					{category:2, name: '透视缺陷2',value : 3},
					//
					{category:3, name: '物料信息',value : 5},
					{category:3, name: '印版/色模',value : 4},
					{category:2, name: '编号',value : 3},
					{category:2, name: '印量',value : 3},
					{category:3, name: '油墨',value : 4},
					{category:2, name: '批次',value : 3},
					{category:2, name: '名称',value : 3},
					{category:2, name: '用量',value : 3},
					{category:3, name: '耗材',value : 4},
					{category:3, name: '生产信息',value : 5},
					//{category:2, name: '机长',value : 3},
					{category:2, name: '机型',value : 3},
					{category:2, name: '班组',value : 3},
					{category:2, name: '班次',value : 3},
					{category:2, name: '生产时间',value : 3},
					{category:2, name: '检测时间',value : 3},
					{category:2, name: '产量',value : 3},
					{category:2, name: '工序1',value : 3},
					{category:2, name: '工序2',value : 3},
					{category:2, name: '作业记录',value : 3},
					{category:2, name: '大万号1',value : 3},
					{category:2, name: '大万号2',value : 3},
					{category:2, name: '大万号3',value : 3},
				],
				links : [
					{source : '冠字号', target : '大万号', weight : 4, name: '唯一对应'},
					{source : '大万号', target : '冠字号', weight : 4},
					//{source : '冠字号', target : '印码号1', weight : 2},
					//在线清数
					{source : '在线清数', target : '大万号1', weight : 1},
					{source : '在线清数', target : '大张数', weight : 1},
					{source : '在线清数', target : '识别状态', weight : 1},
					{source : '在线清数', target : '拒识数', weight : 1},
					{source : '在线清数', target : '识别时间', weight : 1},
					//清分机检
					{source : '清分机检', target : '大万号2', weight : 1},
					{source : '清分机检', target : '成品率', weight : 1},
					{source : '清分机检', target : '作废率1', weight : 1},
					{source : '清分机检', target : 'IPP数', weight : 1},
					{source : '清分机检', target : '缺陷数', weight : 1},
					{source : '清分机检', target : '印码号6', weight : 1},
					{source : '清分机检', target : '抽检开位', weight : 1},
					{source : '清分机检', target : '抽检量', weight : 1},
					{source : '清分机检', target : '实废数2', weight : 1},
					{source : '清分机检', target : '实废类型2', weight : 1},
					
					//废品分析
					{source : '废品分析', target : '大万号3', weight : 2},
					{source : '废品分析', target : '废品类型', weight : 2},
					{source : '废品分析', target : '作废工序', weight : 2},
					{source : '废品分析', target : '机长1', weight : 2},
					{source : '废品分析', target : '作废开数', weight : 2},
					{source : '废品分析', target : '封皮数', weight : 2},
					{source : '废品分析', target : '作废率2', weight : 2},
					{source : '废品分析', target : '漏废数2', weight : 2},
					//库管信息
					{source : '库管信息', target : '大万号', weight : 2},
					{source : '库管信息', target : '出库时间', weight : 2},
					{source : '库管信息', target : '出库人员', weight : 2},
					{source : '库管信息', target : '入库时间', weight : 2},
					{source : '库管信息', target : '入库人员', weight : 2},
					{source : '库管信息', target : '机长2', weight : 2},
					{source : '库管信息', target : '工序2', weight : 2},
					//单开分析仪
					{source : '单开分析仪', target : '印码号', weight : 1},
					{source : '印码号', target : '防伪指标', weight : 1},
					{source : '单开分析仪', target : '冠字号', weight : 2},
					{source : '单开分析仪', target : '印码号3', weight : 2},
					{source : '单开分析仪', target : '胶正得分', weight : 2},
					{source : '单开分析仪', target : '胶背得分', weight : 2},
					{source : '单开分析仪', target : '凹正得分', weight : 2},
					{source : '单开分析仪', target : '凹背得分', weight : 2},
					{source : '单开分析仪', target : '印码得分', weight : 2},
					{source : '单开分析仪', target : '裁切得分', weight : 2},
					{source : '单开分析仪', target : '纸张得分', weight : 2},
					{source : '单开分析仪', target : '评价总分', weight : 2},
					{source : '单开分析仪', target : '安全线1', weight : 2},
					{source : '单开分析仪', target : '竖号码', weight : 2},
					{source : '单开分析仪', target : 'OVMI', weight : 2},					
					//防伪指标
					{source : '防伪指标', target : '冠字号', weight : 2},					
					{source : '防伪指标', target : 'W信号', weight : 1},
					{source : '防伪指标', target : '荧光亮度', weight : 1},
					{source : '防伪指标', target : 'SM值', weight : 1},
					{source : '防伪指标', target : '磁性', weight : 1},
					{source : '防伪指标', target : '安全线2', weight : 1},
					//胶凹离线检测
					{source : '胶凹离线检测', target : '大万号', weight : 3},	
					{source : '胶凹离线检测', target : '人员类型', weight : 1},	
					{source : '胶凹离线检测', target : '机长3', weight : 1},	
					{source : '胶凹离线检测', target : '机台', weight : 1},	
					{source : '胶凹离线检测', target : '检测时间', weight : 1},	
					{source : '胶凹离线检测', target : '总分', weight : 1},	
					{source : '胶凹离线检测', target : '墨色', weight : 1},	
					{source : '胶凹离线检测', target : '接线', weight : 1},	
					{source : '胶凹离线检测', target : '套印', weight : 1},	
					{source : '胶凹离线检测', target : '混色', weight : 1},	
					{source : '胶凹离线检测', target : '防复印圈', weight : 1},	
					{source : '胶凹离线检测', target : '对印', weight : 1},
					
					//图像判废
					{source : '图像判废', target : '大万号', weight : 1},
					{source : '图像判废', target : '印码号1', weight : 1},
					{source : '图像判废', target : '人工实废', weight : 1},
					{source : '图像判废', target : '机检实废', weight : 1},
					{source : '图像判废', target : '机检误废', weight : 1},
					{source : '图像判废', target : '实废大张', weight : 1},
					{source : '图像判废', target : '未检数', weight : 1},
					{source : '图像判废', target : '实废小开', weight : 1},
					{source : '图像判废', target : '拆包量', weight : 1},
					{source : '图像判废', target : '实废图像1', weight : 1},					
			
					{source : '号码三合一', target : '大万号', weight : 1},
					{source : '号码三合一', target : '印码号2', weight : 1},
					{source : '号码三合一', target : '冠字号', weight : 1},
					{source : '号码三合一', target : '实废图像2', weight : 1},
					{source : '号码三合一', target : '荧光缺陷2', weight : 1},
					{source : '号码三合一', target : '号码缺陷2', weight : 1},
					{source : '号码三合一', target : '实废类型1', weight : 1},
					{source : '号码三合一', target : '实废数1', weight : 1},
					{source : '号码三合一', target : '漏废数1', weight : 1},
					
					//机台作业
					{source : '机台作业', target : '大万号', weight : 1},
					{source : '机台作业', target : '生产信息', weight : 1},
					{source : '机台作业', target : '物料信息', weight : 1},
					
					{source : '物料信息', target : '印版/色模', weight : 1},
					{source : '物料信息', target : '油墨', weight : 1},
					{source : '物料信息', target : '耗材', weight : 1},
					{source : '印版/色模', target : '编号', weight : 1},
					{source : '印版/色模', target : '印量', weight : 1},
					{source : '油墨', target : '批次', weight : 1},
					{source : '油墨', target : '名称', weight : 1},
					{source : '油墨', target : '用量', weight : 1},
					
					{source : '生产信息', target : '机长4', weight : 1},
					{source : '生产信息', target : '机型', weight : 1},
					{source : '生产信息', target : '班组', weight : 1},
					{source : '生产信息', target : '生产时间', weight : 1},
					{source : '生产信息', target : '冠字', weight : 1},
					{source : '生产信息', target : '产量', weight : 1},
					{source : '生产信息', target : '班次', weight : 1},
					{source : '生产信息', target : '作业记录', weight : 1},
					{source : '生产信息', target : '工序1', weight : 1},
					//质量管理系统
					{source : '质量综合管理系统', target : '码后核查', weight : 4},
					{source : '质量综合管理系统', target : '小张核查', weight : 4},
					{source : '质量综合管理系统', target : '大万号', weight : 4},
					{source : '小张核查', target : '印码号4', weight : 1},
					{source : '码后核查', target : '印码号5', weight : 1},
					
					{source : '码后核查', target : '好品率1', weight : 1},
					{source : '码后核查', target : '缺陷条数1', weight : 1},
					{source : '码后核查', target : '核查剔废率1', weight : 1},
					//{source : '码后核查', target : '冠字号', weight : 1},
					{source : '码后核查', target : '正面缺陷1', weight : 1},
					{source : '码后核查', target : '背面缺陷1', weight : 1},
					{source : '码后核查', target : '透视缺陷1', weight : 1},
					{source : '码后核查', target : '荧光缺陷1', weight : 1},
					{source : '码后核查', target : '号码缺陷1', weight : 1},
					{source : '码后核查', target : '开位1', weight : 1},
					{source : '码后核查', target : '宏区编号1', weight : 1},
					{source : '码后核查', target : '黑图数1', weight : 1},
					{source : '码后核查', target : '未检数1', weight : 1},
					{source : '码后核查', target : '大张废1', weight : 1},
					
					{source : '小张核查', target : '黑图数2', weight : 1},
					{source : '小张核查', target : '未检数2', weight : 1},
					{source : '小张核查', target : '好品率2', weight : 1},
					{source : '小张核查', target : '缺陷条数2', weight : 1},
					{source : '小张核查', target : '核查剔废率2', weight : 1},
					{source : '小张核查', target : '冠字号2', weight : 1},
					{source : '小张核查', target : '正面缺陷2', weight : 1},
					{source : '小张核查', target : '背面缺陷2', weight : 1},
					{source : '小张核查', target : '透视缺陷2', weight : 1},
					{source : '小张核查', target : '开位2', weight : 1},
					{source : '小张核查', target : '宏区编号2', weight : 1},
					{source : '小张核查', target : '大张废2', weight : 1},
				]
			}
		]
    },
	'TreeData2': {       
		/*color : [
			'rgb(243,111,91)','rgb(255,207,54)','rgb(144,209,81)','#80B1D2',
			'#FB8070','#FBB367','#80B1D2','#CC99FF','#B0D961'
		],*/
		title : {
			text: 'M81D好品率偏低原因分析',
			x:'right',
			y:'bottom'
		},
		tooltip : {
			trigger: 'item',
			formatter: '{a} : {b}'
		},
		toolbox: {
			show : true,
			feature : {
				restore : {show: true},
				mark : {show: true},
				magicType: {show: true, type: ['force', 'chord']},
				saveAsImage : {show: true}
			}
		},
		legend: {
			x: 'left',
			data:[ '主数据','主要原因','详细说明'],
			//selected:{'主数据':false}
		},
		series : [
			{
				type:'force',
				name : "节点描述",
				ribbonType: false,
				categories : [              	
					{
						name: '主数据',
					},
					{
						name: '主要原因'
					},
					{
						name: '详细说明'
					}
				],
				itemStyle: {
					normal: {
						label: {
							show: true,
							textStyle: {color: '#333'}
						},
						nodeStyle : {
							brushType : 'both',
							borderColor : 'rgba(255,215,0,0.6)',
							borderWidth : 1
						}
					}
				},
				minRadius : 30,
				maxRadius : 50,
				coolDown: 0.995,
				steps: 10,
				nodes:[
					{category:0, name: '好品率\n偏低', value : 12,itemStyle: {
                normal: {
                    label: {
                        show: true,
                        textStyle: {
                            color: '#FFF',
							fontSize : '22',
                        }
                    }}}},  
					{category:1, name: '钞纸质量影响',value : 8},
					{category:1, name: '胶印影响',value : 8},
					{category:1, name: '凹印影响',value : 8},
					{category:1, name: '模型原因',value : 8},					
					{category:1, name: '成像原因',value : 8},	
					{category:2, name: '凹印\n印刷压力',value : 4},
					{category:2, name: '凹印产品\n质量不佳',value : 4},
					{category:2, name: '胶印\n印刷压力',value : 4},
					{category:2, name: '胶印产品\n质量不佳',value : 4},
					{category:2, name: '成钞纸张',value : 4},
					{category:2, name: '金鼎纸张',value : 4},
					{category:2, name: '集中供气\n不稳定',value : 4},
					{category:2, name: '硬件原因',value : 4}
				],
				links : [
					{source : '钞纸质量影响', target : '好品率\n偏低', weight : 4},
					{source : '胶印影响', target : '好品率\n偏低', weight : 4},
					{source : '凹印影响', target : '好品率\n偏低', weight : 4},
					{source : '模型原因', target : '好品率\n偏低', weight : 4},
					{source : '成像原因', target : '好品率\n偏低', weight : 4},
					{source : '胶印\n印刷压力', target : '胶印影响', weight : 3},
					{source : '凹印\n印刷压力', target : '凹印影响', weight : 3},
					{source : '胶印产品\n质量不佳', target : '胶印影响', weight : 3},
					{source : '凹印产品\n质量不佳', target : '凹印影响', weight : 3},
					{source : '成钞纸张', target : '钞纸质量影响', weight : 3},
					{source : '金鼎纸张', target : '钞纸质量影响', weight : 3},
					{source : '集中供气\n不稳定', target : '成像原因', weight : 4},
					{source : '硬件原因', target : '成像原因', weight : 4}
				]
			}
		]
    },
	
	'WordCloud' : {
			title: {
				text: '关于机检系统的\n大数据分析应用探讨',
				link: 'http://10.8.2.133:540',
				subtext:'2015年6月',
				x:"right",
				y:"bottom"
			},
			toolbox: {
				show : true,
				feature : {
				   // mark : {show: true},
				   // dataView : {show: true, readOnly: false},
					restore : {show: true},
					saveAsImage : {show: true}
				}
			},
			tooltip: {
				show: true
			},
			series: [{
				name: '频次',
				type: 'wordCloud',
				size: ['90%', '90%'],
			   // textRotation : [0, 45, 90, -45,60,30,25,20,70],
				/*textRotation:(function (){
								var res = [];
								var len = 30;
								while (len--) {
									res.push(Math.round(Math.random() * 180-90));
								}
								return res;
							})(),
				textPadding: 0,*/
				autoSize: {
					enable: true,
					minSize: 20
				},
				data: [
					{
						name: "平均好品率",
						value: 10000,
						itemStyle: createRandomItemStyle()
					},
					{
						name: "码后核查",
						value: 6181,
						itemStyle: createRandomItemStyle()
					},
					{
						name: "小张核查",
						value: 4386,
						itemStyle: createRandomItemStyle()
					},
					{
						name: "机检",
						value: 4055,
						itemStyle: createRandomItemStyle()
					},
					{
						name: "印码",
						value: 2467,
						itemStyle: createRandomItemStyle()
					},
					{
						name: "检封",
						value: 2244,
						itemStyle: createRandomItemStyle()
					},
					{
						name: "离线",
						value: 1898,
						itemStyle: createRandomItemStyle()
					},
					{
						name: "中班",
						value: 582,
						itemStyle: createRandomItemStyle()
					},
					{
						name: "判废",
						value: 555,
						itemStyle: createRandomItemStyle()
					},
					{
						name: "实废",
						value: 550,
						itemStyle: createRandomItemStyle()
					},
					{
						name: "误废",
						value: 462,
						itemStyle: createRandomItemStyle()
					},
					{
						name: "机检",
						value: 366,
						itemStyle: createRandomItemStyle()
					},
					{
						name: "开位",
						value: 360,
						itemStyle: createRandomItemStyle()
					},
					{
						name: "质量",
						value: 282,
						itemStyle: createRandomItemStyle()
					},
					{
						name: "印钞",
						value:  Math.round(Math.random() * 2000),
						itemStyle: createRandomItemStyle()
					},
					{
						name: "品种",
						value: 265,
						itemStyle: createRandomItemStyle()
					},			
					{
					 name:"质量",
					 value:  6400,
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"机台",
					 value:  4500,
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"产品",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"胶凹",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"条数",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"平均",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"机长",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"机型",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"码后",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"较高",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"最低",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"最低",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"数据",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"检测",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"胶印",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"建议",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"主要",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"人员",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"设备",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"统计",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"全年",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"存在",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"生产",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"大张",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"水平",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"分布",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"得分",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"规律",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"其余",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"进入",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"千位",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"明显",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"印钞",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"对于",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"之间",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"由于",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"处于",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"开印",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"印刷",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"影响",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"最高",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"标准",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"较大",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"管理",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"评分",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"其中",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"上传",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"机检",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"好品率",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"信息",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"分析",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"印码",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"生产",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"缺陷",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"得分",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"分布",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"大张",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"逐渐",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"实废",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"多功能",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"处理",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"建议",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"以上",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"稳定",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"作为",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"发现",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"过程中",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"所有",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"成像",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"清分机",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"下降",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"9602A",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"9603A",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"9604A",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"9607A",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"稳定",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"实现",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"异常",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"检封",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"总结",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"宏区",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"关联",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"进入",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"集中",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"偏低",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"均在",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"产量",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"错号",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"报告",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"标准",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"花白",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"星期",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"较多",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"我们",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"可以",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"达到",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"保养",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"变化",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"其它",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"专题",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"针对",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"对于",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"目前",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"最低",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},
					{
					 name:"造成",
					 value:  Math.round(Math.random() * 2000),
					 itemStyle: createRandomItemStyle()
					},           
				]
			}]
		},
    'MultiData':{
		title : {
			text: '防伪指标检测抽检上下5千分布情况',
			subtext: '数据来源:质量综合管理系统数据库',
			x:'center',
		},
		toolbox: {
			show : true,
			feature : {
				mark : {show: true},
				dataView : {show: true, readOnly: false}, dataZoom : {show: true},
				magicType: {show: true, type : ['line', 'bar', 'stack', 'tiled']},
				restore : {show: true},
				saveAsImage : {show: true,type:"jpeg"},
			}
		},
		tooltip : {
			trigger: 'axis',
			axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
			},
		},
		legend: {
			//orient : 'vertical',
			//show:false,
			x : 'center',
			//y : 'bottom',
			y : 50,
			itemGap:30,
			data : ['上5千','下5千'],			
		},
		calculable : true,
		grid:{
			x0:20,
			x2:400,
		},
		yAxis : [
			{
				name:'千位',
				axisTick : {show: false},//隐藏标记线,
				axisLine: {show: false},
				type : 'category',
				boundaryGap : true,                
				data:['9602A','9603A','9604A','9607A'],
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: 45,
					margin: 12          
				}
			}
		],
		xAxis : [
			{
				name:'抽检开数',
				type : 'value',
				position: 'left',
				min:5.75,
				//max:89,
				scale: true,
				splitArea : {
					show: true,
					areaStyle:{
						color:['rgba(144,238,144,0.2)','rgba(255,255,255,0.05)']
					}
				},
				axisLabel : {
					show:true,
					interval: 'auto',    // {number}
					//rotate: -45,
					margin: 8,
					formatter: '{value} ',    // Template formatter!               
				},
			}
		],
		series : [			 
			{
				name:'上5千',
				type:'bar',barMaxWidth:80,
				smooth:true,
				symbolSize: 6,
				itemStyle : {
					normal:{
						lineStyle: {
							width: 5,
							shadowOffsetX: 3,
							shadowOffsetY: 3
						},
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},						
						label : {
							show: true,
							position: 'insideRight',
							//'{c}'
						}
					}},
				stack: '总量',
				data:[8092,3595,7123,4214],
			},
			{
				name:'下5千',
				type:'bar',barMaxWidth:80,
				smooth:true,
				symbolSize: 6,
				itemStyle : {
					normal:{
						lineStyle: {
							width: 5,
							shadowOffsetX: 3,
							shadowOffsetY: 3
						},
						barBorderColor:'rgba(0,0,0,0)',
						areaStyle: {type: 'default'},						
						label : {
							show: true,
							position: 'insideRight',
						}
					}},
				stack: '总量',
				data:[4725,1733,4038,2219],
			},	
			{
				type : 'pie',
				center : ['75%', '30%'],
				radius : radius2,
				innerRing: false,
				outterRing: false,
				itemStyle : 
				{
					normal : {
						color: '#ccc',
						label : {
							formatter : function (a,b,c){return  xround(8092*100/(8092+4725),2) + '%\n9602A'},//用四舍五入解决浮点的问题
							textStyle: {
								//baseline : 'bottom',
								fontSize: 17,
								fontWeight: 'normal',//'bolder', 不加粗
								color: 'rgb(123,195,119)'          // 主标题文字颜色
							}
						}
					}
				},//labelFromatter,
				data : [
					{name:'下5千', value:4725, itemStyle : labelBottom},
					{
						name:'上5千', 
						value:8092,
						itemStyle : {
							normal : {
								label : {
									show : false,//true,
									position : 'center',
									formatter : '{b}',
									textStyle: {
										fontSize : '20',
										baseline : 'top'
									}
								},
								color:'rgb(123,195,119)',
								labelLine : {
									show : false
								}
							}
						}
					}
				]
			},
			{
				type : 'pie',
				center : ['90%', '30%'],
				radius : radius2,
				innerRing: false,
				outterRing: false,
				itemStyle : 
				{
					normal : {
						color: '#ccc',
						label : {
							formatter : function (a,b,c){return xround(3595*100/(3595+1733),2) + '%\n9603A'},//用四舍五入解决浮点的问题
							textStyle: {
								//baseline : 'bottom',
								fontSize: 17,
								fontWeight: 'normal',//'bolder', 不加粗
								color: 'rgb(144,101,171)'          // 主标题文字颜色
							}
						}
					}
				},//labelFromatter,
				data : [
					{name:'下5千', value:1733, itemStyle : labelBottom},
					{
						name:'上5千', 
						value:3595,
						itemStyle : {
							normal : {
								label : {
									show : false,
									position : 'center',
									formatter : '{b}',
									textStyle: {
										fontSize : '20',
										baseline : 'top'
									}
								},
								color: 'rgb(144,101,171)',
								labelLine : {
									show : false
								}
							}
						}
					
					}
				]
			},
			{
				type : 'pie',
				center : ['75%', '70%'],
				radius : radius2,
				innerRing: false,
				outterRing: false,
				itemStyle : 
				{
					normal : {
						color: '#ccc',
						label : {
							formatter : function (a,b,c){return xround(7123*100/(7123+4038),2) + '%\n9604A'},//用四舍五入解决浮点的问题
							textStyle: {
								//baseline : 'bottom',
								fontSize: 17,
								fontWeight: 'normal',//'bolder', 不加粗
								color: '#01a99c'          // 主标题文字颜色
							}
						}
					}
				},//labelFromatter,
				data : [
					{name:'下5千', value:4038, itemStyle : labelBottom},
					{
						name:'上5千',
						value:7123,
						itemStyle : {
							normal : {
								label : {
									show : false,
									position : 'center',
									formatter : '{b}',
									textStyle: {
										fontSize : '20',
										baseline : 'top'
									}
								},
								color: '#55c1e8',
								labelLine : {
									show : false
								}
							}
						}
					}
				]
			},
			{
				type : 'pie',
				center : ['90%', '70%'],
				radius : radius2,
				innerRing: false,
				outterRing: false,
				itemStyle : 
				{
					normal : {
						color: '#ccc',
						label : {
							formatter : function (a,b,c){return xround(4214*100/(4214+2219),2) + '%\n9607A'},//用四舍五入解决浮点的问题
							textStyle: {
								//baseline : 'bottom',
								fontSize: 17,
								fontWeight: 'normal',//'bolder', 不加粗
								color: '#ec8171',         // 主标题文字颜色
							}
						}
					}
				},//labelFromatter,
				data : [
					{name:'下5千', value:2219, itemStyle : labelBottom},
					{
						name:'上5千', 
						value:4214,
						itemStyle : {
							normal : {
								label : {
									show : false,//true,
									position : 'center',
									formatter : '{b}',
									textStyle: {
										fontSize : '10',
										baseline : 'top',
									}
								},
								color: '#ec8171',
								labelLine : {
									show : false
								}
							}
						}
					}
				]
			}
		]
	},            
	
	'RadarData':{
		title : {
			text: '机长A vs 机长B 质量对比',
			subtext: '模拟数据'
		},
		tooltip : {
			trigger: 'axis'
		},
		legend: {
			orient : 'vertical',
			x : 'right',
			y : 'bottom',
			data:['机长A','机长B']
		},
		toolbox: {
			show : true,
			feature : {
				mark : {show: true},
				dataView : {show: true, readOnly: false}, dataZoom : {show: true},
				restore : {show: true},
				saveAsImage : {show: true}
			}
		},
		polar : [
		   {
			   indicator : [
				   { text: '过程质量控制', max: 100},
				   { text: '好品率', max: 100},
				   { text: '成品率', max: 100},
				   { text: '防伪指标', max: 100},
				   { text: '产量', max: 100},
				   { text: '单开检测', max: 100}
				],
			}
		],
		calculable : true,
		series : [
			{
				name: '机长A vs 机长B',
				type: 'radar',
				itemStyle: {
					normal: {
						areaStyle: {
							type: 'default'
						}
					}
				},
				data : [
					{
						value : [80.7, 85.5, 97.28,41, 87, 69],
						name : '机长A'
					},
					 {
						value : [89.6, 93.5, 99.33,32, 86, 87],
						name : '机长B'
					}
				]
			}
		]
	},
	'dynamic' :{
            title : {
                text: '实时质量数据',
                subtext: '模拟数据'
            },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:['成品率', '缺陷条数']
            },
            toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false}, dataZoom : {show: true},
                    magicType: {show: true, type : ['line', 'bar']},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            AAdataZoom : {
                show : false,
                realtime: true,
                start : 0,
                end : 50
            },
            grid:{y2:30,y:70},
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,//此处不将产量放进图表中（设为TRUE,柱形图会溢出边界）
                    axisLine: {onZero: false},
                    data : (function (){
                        var now = new Date();
                        var res = [];
                        var len = 10;
                        while (len--) {
                            res.unshift(now.toLocaleTimeString().replace(/^\D*/,''));
                            now = new Date(now - 2000);
                        }
                        return res;
                    })()
                },
                {
                    type : 'category',
                    boundaryGap : false,//此处不将产量放进图表中（设为TRUE,柱形图会溢出边界）
                    splitline : {show : false},
                    axisLine: {onZero: false},
                    data : (function (){
                        var res = [];
                        var len = 10;
                        while (len--) {
                            res.push(len + 1);
                        }
                        return res;
                    })()
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    scale: true,
                    name : '成品率(%)',
                    boundaryGap: [0.2, 0.2],
                    splitNumber:5
                },
                {
                    type : 'value',
                    splitNumber:5,
                    scale: true,
                    name : '缺陷条数',
                    boundaryGap: [0.2, 0.2]
                }
            ],
            series : [
                {
                    name:'缺陷条数',
                    type:'line',
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                shadowColor : 'rgba(0,0,0,0.4)'
                            },
							areaStyle: {type: 'default'}
                        }
                    },
                    data:(function (){
                        var res = [];
                        var len = 10;
                        while (len--) {
                            res.push(Math.round(Math.random() * 1000));
                        }
                        return res;
                    })()
                },
                {
                    name:'成品率',
                    type:'line',
                    itemStyle: {
                        normal: {
							label: { show: true },
                            //color : 'rgb(255,127,104)',//'rgba(85,206,85,0.7)'
							color: (function (){			
								//return zrColor.getLinearGradient(10,10,1000,900,[[0,'rgba(255,127,104,0.9)'],[0.6,'rgba(120, 216, 225,0.9)'],[1,'rgba(210, 196, 65,0.9)']])
								return zrColor.getLinearGradient(10,10,1000,900,[[0,'rgba(243,32,30,0.95'],[0.3,'rgba(246,109,78,0.95)'],[0.65,'rgba(231,225,58,0.95)'],[1,'rgba(249,61,253,0.95)']])
							})(),	
							//areaStyle: {type: 'default'},
							lineStyle: {
								width: 8,
							},
                        }
                    },
					symbolSize: 10,           // 拐点图形大小
		            data:(function (){
                        var res = [];
                        var len = 10;
                        while (len--) {
                            res.push((Math.random()*10 + 90).toFixed(1) - 0);
                        }
                        return res;
                    })()
                }
            ]
	},

    BusinessMode:{
        title : {
                text: '长城贵金属产业平台生态圈',
                x:'right',
                y:650
            },
        tooltip : {
            trigger: 'item',        
            formatter : function(a) {
                var strLable;           
                switch(a.seriesIndex)
                {
                    case 0:                     
                        strLable ='将国内首家专业贵金属平台的搭建作为公司“+互联网”</br>'+
                        '的切入点，通过扩网、聚核、协同逐步确立贵金属平台生</br>'+'态圈领导地位。';
                        break;
                    case 1:
                        switch(a.dataIndex)
                        {
                            case 0:
                                strLable ='将中国人民银行、印钞造币总公司的国企信用与公司的较</br>'+
                                '先进的检测技术及资质相结合，建立专业的贵金属终端销</br>'+
                                '售、投资平台。';
                                break;
                            case 1:
                                strLable ='将目前的线下销售渠道搬到互联网上，增加终端消费者的</br>'+'实体体验;';
                                break;
                            case 2:
                                strLable ='长城公司利用现有资源，进行供应链资源的整合，将行业</br>'+
                                '内的资源开采企业、加工生产企业、设计开发企业、渠道</br>'+
                                '运营企业纳入该平台，通过该平台提供行业信息与电子商</br>'+
                                '务交流，向平台企业提供行业的系统信息及其相关产业环</br>'+'节的信息。';
                                break;
                        }
                        break;
                    case 2:
                        strLable ='支付在平台中的作用';
                        break;
                    case 3:
                        switch(a.dataIndex)
                        {
                            case 0:
                                strLable ='通过这个平台直接将自己的商品销售给最终用户;';
                                break;
                            case 1:
                                strLable ='面向平台的最终用户进行黄金质押贷款等金融服务;';
                                break;
                            case 2:
                                strLable ='直接面向生产者购买商品，减少流通环节，享受最优价</br>'+'格，实现部分融资需求;';
                                break;
                            case 3:
                                strLable ='增加销售渠道;';
                                break;
                            case 4:
                                strLable ='增加保管箱服务等;';
                                break;
                            case 5:
                                strLable ='增加实体体验;';
                                break;
                            case 6:
                                strLable ='为资源开采企业扩大精炼加工企业选择面、降低交易成本;';
                                break;
                            case 7:
                                strLable ='提供企业展示平台，扩大产品设计选择面，扩大客户资源';
                                break;
                            case 8:
                                strLable ='提供企业展示平台，扩大客户资源，提供此类小微企业融</br>'+'资、众筹平台;';
                                break;
                        }
                        break;
                    case 4:
                        switch(a.dataIndex)
                        {
                            case 0:
                                strLable ='作为平台管理者进行盈利，方式同B2B模式;';
                                break;
                            case 1:
                                strLable = '作为质量认证提供者进行盈利，提供有偿的产品检定服务;';
                                break;
                            case 2:
                                strLable ='作为物联网平台的搭建者进行盈利，通过物联信息服务、</br>'+'物联设备、载体的提供进行盈利;';
                                break;
                            case 3:
                                strLable ='作为贵金属回购者进行盈利;';
                                break;  
                            case 4:
                                strLable ='作为平台管理者、质量认证提供者、物联网平台的搭建者、</br>'+'贵金属回购者进行盈利，方式同B2C模式;';
                                break;                                      
                            case 5:
                                strLable ='作为线下实体销售服务商，提供有偿线下实体促销服务;';
                                break;
                            case 6:                             
                                strLable ='作为物流网络的搭建者，对平台商户提供有偿使用平台物</br>'+'流网络，对终端消费者提供有偿的产品保管服务;';
                                break;
                            case 7:
                                strLable ='作为平台管理者，收取会员费、广告费、竞价排</br>'+'名费、增值服务：大数据分析服务、线下服务：主要包括</br>'+'展会，期刊，研讨会等;';
                                break;
                            case 8:
                                strLable ='长城公司作为该平台使用者，利用平台可将整个生产分解，</br>'+'并为每个步骤寻求最佳解决方案，增强长城公司自身的运</br>'+'营能力;';
                                break;
                            /*
                            case 9:
                                strLable ='10说明';
                                break;
                            case 10:
                                strLable ='11说明';
                                break;
                            case 11:
                                strLable ='12说明';
                                break;*/
                        }
                        break;
                    default:
                        switch(a.dataIndex)
                        {
                            case 0:
                                strLable ='由于贵金属本身的金融属性，对资金的需求高，因此以上</br>'+
                                '三平台的参与者均存在着对第三方支付平台和P2P的需求，</br>'+
                                '我们将根据需要，积极研究相关政策，实现平台融合，最</br>'+
                                '终完成贵金属全产业链生态圈的打造。';
                                break;
                            case 1:
                                strLable ='联通企业间贵金属原料信息，提供原料拆借、租赁平台；</br>'+'向所有平台使用者提供行业平台大数据分析服务。将平台</br>'+
                                    '企业共同发展、增值作为系统性价值主张增加网络效应，</br>'+
                                    '在进行长城公司的“+互联网”同时加快关联产业企业的</br>'+
                                    '“+互联网”的进程，挖掘资源创造价值，成为贵金属行</br>'+'业的阿里巴巴。';
                                break;
                        }                       
                }           
                return "<div style='width:300px;'>" + a.name + ":<br/><small>" + strLable + "</small></div>";
            }           
        },
        toolbox: {
            show : true,
            feature : {
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        series : [
            {               
                type:'pie',
                innerRing: false,
                outterRing: false,
                selectedMode:'single',
                startAngle: 30,
                center : ['50%', '50%'],
                radius : ['0%', '24%'],
                data:[                    
                    {value:100, name:'长城\n领导者'}
                ],
                itemStyle : {
                     normal: {
                        borderColor: 'rgba(0,0,0,0)',
                        borderWidth: 0,
                        label: {
                            show :true,
                            position: 'center',
                            formatter: "{b}",
                            textStyle: {fontSize:22,color:'#444',fontWeight:'bold'},
                        },
                        color: (function (){            
                            return zrColor.getRadialGradient(650, 350, 10, 650, 350, 100,[[0,'#fce84f'],[1,'#f69213']])
                        })(),
                    },
                    emphasis : {label : {show : false}}
                },
                markPoint : {
                    symbol:'emptyCircle',
                    symbolSize:440,
                    effect:{show:true,scaleSize:12,color:'rgba(250,225,50,0.8)',shadowBlur:10,period:30},
                    data:[{x:'50%',y:'50%'}]
                }
            },
            {               
                type:'pie',
                innerRing: false,
                outterRing: false,
                selectedMode:'single',
                startAngle: 30,
                center : ['50%', '50%'],
                radius : ['24%', '48%'],
                data:[                      
                    {value:120, name:'B2C'},                    
                    {value:120, name:'O2O'},
                    {value:120, name:'B2B'},
                ],
                itemStyle : {
                     normal: {
                        borderColor: 'rgba(0,0,0,0)',
                        borderWidth: 0,
                        label: {
                            show :true,
                            position: 'inner',
                            formatter: "{b}",
                            textStyle: {fontSize:16,fontWeight:'bold'},
                        },
                        color: function(params) {
                            var colorList = [
                              '#4e5868','#57aaf8','#ed7964'
                            ];
                            return colorList[params.dataIndex]
                        },
                    },
                    emphasis : {label : {show : false}}
                },
            },
            {               
                type:'pie',
                innerRing: false,
                outterRing: false,
                selectedMode:'single',
                startAngle: 30,
                center : ['50%', '50%'],
                radius : ['47%', '49%'],
                data:[                    
                    {value:24, name:'支付'},
                    {value:24, name:'P2P'},
                    {value:24, name:'支付'},
                    {value:24, name:'p2p'},
                    {value:24, name:'支付'},
                ],
                itemStyle : {
                     normal: {
                        borderColor: 'rgba(0,0,0,0)',
                        borderWidth: 0,
                        label: {
                            show :true,
                            position: 'inner',
                            formatter: "{b}",
                            textStyle: {fontSize:12,fontStyle:'italic'},
                        },
                        color:'#ff9c82',
                    },
                    emphasis : {label : {show : false}}
                },
            }
            ,
            {               
                type:'pie',
                innerRing: false,
                outterRing: false,
                selectedMode:'single',
                startAngle: 30,
                center : ['50%', '50%'],
                radius : ['48%', '72%'],
                data:[                    
                    {value:40, name:'生产商和\n销售商'},
                    {value:40, name:'银行'},
                    {value:40, name:'用户'},
                    
                    {value:40, name:'生产商'},
                    {value:40, name:'银行'},
                    {value:40, name:'用户'},
                    
                    {value:40, name:'矿山'},
                    {value:40, name:'加工生产/\n渠道运营企业'},
                    {value:40, name:'设计开发企业'},
                ],
                itemStyle : {
                     normal: {
                        borderColor: 'rgba(0,0,0,0)',
                        borderWidth: 0,
                        label: {
                            show :true,
                            position: 'inner',
                            formatter: "{b}",
                            textStyle: {fontSize:16,fontWeight:'bold'},
                        },
                        color: function(params) {
                            var colorList = [
                              '#6f798b','#606b7c','#6f798b',
                              '#4fb6ff','#61a8f6','#4fb6ff',
                              '#ed8d73','#dc7677','#ed8d73'
                            ];
                            return colorList[params.dataIndex]
                        },
                    },
                    emphasis : {label : {show : false}}
                },
            }
            ,
            {               
                type:'pie',
                innerRing: false,
                outterRing: false,
                selectedMode:'single',
                startAngle: 30,
                center : ['50%', '50%'],
                radius : ['72%', '92%'],
                data:[                    
                    {value:30, name:'平台管理者'},
                    {value:30, name:'质量认证提供者'},
                    {value:30, name:'物联平台搭建者'},
                    {value:30, name:'贵金属回购者'},
                    
                    {value:40, name:'平台管理者'},
                    {value:40, name:'销售服务商'},
                    {value:40, name:'物联平台搭建者'},
                    
                    {value:60, name:'平台管理者'},
                    {value:60, name:'平台使用者'},
                    
                    
                ],
                itemStyle : {
                     normal: {
                        borderColor: 'rgba(0,0,0,0)',
                        borderWidth: 0,
                        label: {
                            show :true,
                            position: 'outter',
                            formatter: "{b}",
                            textStyle: {fontSize:16,fontWeight:'bold',color: '#666'},
                        },                      
                        labelLine : {show : true,length : 25},
                        color: function(params) {
                            var colorList = [
                              '#8c97a9','#808a9c','#8c97a9','#808a9c',
                              '#79c8f0','#6bbae2','#79c8f0',
                              '#ff9c82','#e17a7b'
                            ];
                            return colorList[params.dataIndex]
                        },
                    },
                    emphasis : {label : {show : false}}
                },
            },
            {
                name:'.',
                type:'treemap',
                size: [
                    '100%',
                    '60%'
                ],
                 center: [
                    '50%',
                    '50%'
                ],
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            formatter: "{b}",
                            textStyle: {color: '#444'}
                        },
                        borderWidth: 1
                    },
                    emphasis: {
                        label: {
                            show: true,
                            textStyle: {
                                color: '#444'
                            }
                        }
                    }
                },
                data:[                          
                    {name:'支付\n\nP2P',value:50, itemStyle: {
                        normal: {
                            label: {
                                show: true,
                                x:50,
                                y:200,
                                textStyle: {
                                    color: '#444',
                                    fontSize: 40,
                                    fontFamily:'微软雅黑, 黑体, Arial'
                                }
                            },
                            color: 'rgba(138,148,244,0.3)',
                            borderWidth: 1
                        },}
                    },
                    {name:'大\n数\n据',value:50, itemStyle: {
                        normal: {
                            label: {
                                show: true,
                                x: 550,
                                y: 200,
                                textStyle: {
                                    color: '#444',
                                    fontSize: 40,
                                    fontFamily:'微软雅黑, 黑体, Arial'
                                }
                            },
                            color: 'rgba(138,148,244,0.3)',
                            borderWidth: 1
                        },}
                    }
                ]
            }
        ]
    }
}

                    


