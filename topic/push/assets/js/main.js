(function() {
	function jsRight(sr, rightn) {
		return sr.substring(sr.length - rightn, sr.length);
	}

	function jsOnRight(sr, rightn) {
		return sr.substring(0, sr.length - rightn);
	}

	function today(type) {
		var date = new Date();
		var arrWeek = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
		var a = date.getFullYear();
		var b = date.getMonth() + 1;
		var c = date.getDate();
		var week = arrWeek[date.getDay()];
		var d = jsRight(('0' + date.getHours()), 2);
		var e = jsRight(('0' + date.getMinutes()), 2);
		var f = jsRight(('0' + date.getSeconds()), 2);
		var output;
		switch (type) {
			case 0:
				output = a + '年' + b + '月' + c + '日';
				break;
			case 1:
				output = a + '-' + b + '-' + c + ' ' + d + ':' + e + ':' + f;
				break;
			case 2:
				output = a + '年' + b + '月' + c + '日' + d + '时' + e + '分' + f + '秒';
				break;
			case 3:
				output = a + '-' + b + '-' + c + ' ' + d + ':' + e;
				break;
			case 4:
				output = a + '年' + b + '月' + c + '日  ' + d + '时' + e + '分';
				break;
			case 5:
				output = b + '/' + c + '/' + a;
				break;
			case 6:
				output = a + '-' + b + '-' + c;
				break;
			case 7:
				output = a.toString() + jsRight(('0' + b), 2) + jsRight(('0' + c), 2) ;
				break;
			case 8:
				output = a.toString() + jsRight(('0' + b), 2) ;
				break;
			default:
				output = b + '月' + c + '日 ' + week + ' ' + d + ':' + e + ':' + f;
				break;
		}
		return output;
	}

	var title = "质量控制中心 " + today();

	//信息推送
	var sendMsgToUsers = function(msg, receiver) {
		var sendMsg = function(msg, receiver) {
			$.ajax({
				url: "http://10.8.2.111:8012/sendnotify.cgi",
				type: 'get',
				async: false,
				data: {
					"delaytime": 30 * 1000, //30S延时
					"msg": msg,
					"receiver": receiver, //10879",//多人用逗号或分号隔开
					"title": title					
				},
				dataType: "jsonp",
				callback: "JsonCallback",
				success: function(json) {
					console.log(today(1) + "    " + json.msg);
				},
				error: function(json) {
					console.log(today(1) + "    " + json.msg);
				}
			})
		};
		sendMsg(msg, receiver);
	};

	//获取码后核查在线实时质量信息
	var getOnlineInfo = function() {
		var url = "http://10.8.2.133:70/DataInterface/Api?Token=79d84495ca776ccb523114a2120e273ca80b315b&ID=102&M=3&t=75";
		var msg = "";
		$.ajax({
			url: url,
			type: "get",
			async: false,
			dataType: "jsonp",
			//jsonp:"JsonCallback",
			//jsonpCallback:"JsonCallback",
			callback: "JsonCallback",
			success: function(json) {
				if (json.rows) {
					json.data.map(function(elem, index) {
						msg += elem[1] + " 好品率较低(" + elem[11] + "%)\n";
					});
					msg += '\n[(点击此处查看详情)|http://10.8.2.133/OnlineQuality.asp]';
				}

			}
		});
		return msg;
	};

	//获取每天推送的质量信息
	var getLastDayInfo = function() {
		var url = "http://10.8.2.133:70/DataInterface/Api?Token=79d84495ca776ccb523114a2120e273ca80b315b&ID=109&M=3";
		var lastDay = ")印码机检好品率:\n"; //昨天质量情况
		//var theMonth = "当月好品率:\n"; //当月质量情况
		var dateName, msg;
		var dataProdt = {
			"data": {},
			"prod": {}
		};
		$.ajax({
			url: url,
			type: "get",
			async: false,
			dataType: "jsonp",
			//jsonp:"JsonCallback",
			//jsonpCallback:"JsonCallback",
			callback: "JsonCallback",
			success: function(json) {
				if (json.rows) {
					json.data.map(function(elem, index) {
						if (typeof dataProdt['data'][elem[1]] == 'undefined') {
							dataProdt['data'][elem[1]] = {};
							dataProdt['prod'][index] = elem[1];
						}
						if (elem[0] > 10000000) { //上一个工作日
							//lastDay += elem[1] + " : " + elem[2] + "%\n";
							dateName = elem[0];
							dataProdt['data'][elem[1]]['lastDay'] = elem[2];
						} else { //本月
							dataProdt['data'][elem[1]]['theMonth'] = elem[2];
							//theMonth += elem[1] + " : " + elem[2] + "%\n";
						}

					});

					$.each(dataProdt.prod, function(index, elem) {
						var preStr;
						var delta = dataProdt['data'][elem]['lastDay'] - dataProdt['data'][elem]['theMonth'];
						delta = delta.toFixed(2);
						if (delta > 0) {
							preStr = "↑" + delta;
						} else if (delta == 0) {
							preStr = "-";
						} else {
							preStr = "↓" + (-delta);
						}
						lastDay += elem + " : " + dataProdt['data'][elem]['lastDay'] + " (" + preStr + "%);\n";

					});

					msg = '昨日(' + dateName + lastDay; // + theMonth;
					msg += '[(点击此处查看详情)|http://10.8.2.133/MonthStatic.asp]';
				}

			}
		});
		return msg;
	};


	//获取每天推送的质量信息
	var getUncheckInfo = function() {
		var url = "http://10.8.2.133:70/DataInterface/Api?Token=79d84495ca776ccb523114a2120e273ca80b315b&ID=110&M=3";
		var msg = "\n\n----平均未检数最多的机台:----\n"; //昨天质量情况
		$.ajax({
			url: url,
			type: "get",
			async: false,
			dataType: "jsonp",
			//jsonp:"JsonCallback",
			//jsonpCallback:"JsonCallback",
			callback: "JsonCallback",
			success: function(json) {
				if (json.rows) {
					for (var i = 0; i < 4; i++) {
						msg += json.data[i][0] + " : " + json.data[i][1] + " 大张/万\n";
					};
					msg += '[(点击此处查看详情)|http://10.8.2.133/qualitydetail.asp]\n';
				}
			}
		});
		return msg;
	};

	//获取用户信息(印码工序)
	var getUserInfo = function() {
		var userInfo = "";
		$.ajax({
			url: "./assets/data/all.json",
			async: false,
			success: function(json) {
				//json.dataCode.map(function(elem, index) {
				json.dataTest.map(function(elem, index) {
					userInfo += elem[3] + ",";
				})
				userInfo = jsOnRight(userInfo, 1);
			}
		});
		return userInfo;
	};

	var pushLastDayInfo = function(msg) {
		$.ajax({
			url: "./assets/data/all.json",
			async: false,
			success: function(json) {
				json.datatTest.map(function(elem, index) {
					sendMsgToUsers(elem[1] + ",早上好!" + msg, elem[3].toString());
				})
			}
		});
	}

	//获取每天推送的质量信息
	var getPaperProcessInfo = function() {
		var url = "http://10.8.2.133:70/DataInterface/Api?Token=79d84495ca776ccb523114a2120e273ca80b315b&ID=60&M=3&tstart="+ today(8) +"01&tend=" + today(8) +"31";
		var msg = "\n----本月钞纸过程质量控制水平如下:----\n"; 
		$.ajax({
			url: url,
			type: "get",
			async: false,
			dataType: "jsonp",
			//jsonp:"JsonCallback",
			//jsonpCallback:"JsonCallback",
			callback: "JsonCallback",
			success: function(json) {
				if (json.rows) {
					json.data.map(function(elem, index) {
						msg += elem[0] + " : " + elem[3] + " 分\n";
					});
					msg += '[(点击此处查看详情)|http://10.8.2.133:70/qualitytable?tid=60]\n';
				}
			}
		});		
		return msg;
	};

	//向钞纸工艺组推送信息
	var pushPaperProcessInfo = function(msg) {
		$.ajax({
			url: "./assets/data/all.json",
			async: false,
			success: function(json) {
				//json.dataPaperGY.map(function(elem, index) {
				json.dataTest.map(function(elem, index) {
					sendMsgToUsers(elem[1] + ",早上好!" + msg, elem[3].toString());
				})
			}
		});
	}

	var pushOnlineInfo = function(msg) {
		var codeUserInfo = getUserInfo();
		sendMsgToUsers(msg, codeUserInfo);
	}

	//工作日验证
	var dateValidate = function(mode) {
		if (typeof mode == 'undefined') {
			mode = 0;
		}
		var date = new Date();
		var week = date.getDay();
		var hours = date.getHours();
		var minutes = date.getMinutes();
		var isPass = 1;
		//周六周日不推送
		if (week == 0 || week == 6) {
			isPass = 0;
		} else {
			if (mode == 0) { //在线监测质量推送时间校验
				//每天早上8点半至晚上11点推送
				if (hours >= 8 && hours < 23) {
					if (hours == 8 && minutes < 30) { //早上8点半以前不推送
						isPass = 0;
					}
				} else { // 非工作时间不推送
					isPass = 0;
				}
			} else if (mode == 1) { //每天推送1次消息 ,早上6点推送
				if(hours !=7){
					isPass = 0;
				}
			}

		}

		return isPass;
	}



	var handlePushList = function() {

		var intervalID = {};
		intervalID.count = 0;
		intervalID.online = setInterval(function() {
			//10分钟刷新一次
			if (!dateValidate()) {
				console.log('实时质量推送消息 时间校验未通过:     ' + today(3));
				return;
			}

			var onlineInfo = getOnlineInfo();
			if (onlineInfo != ''){
				pushOnlineInfo(onlineInfo);
				if(intervalID.count == 50){
					window.console.clear();
				}
				intervalID.count++;
			}
		}, 15 * 60 * 1000);

		/**
		 *	每天推送一次信息------印码机检质量
		 *	当天已推送则存储该信息
		 *	为防止信息轰炸,需判断当天日期
		 **/
		intervalID.lastDay = setInterval(function() {
			//1小时刷新一次
			if (!dateValidate(1)) {
				console.log('每天推送消息 时间校验未通过:     ' + today(3));
				return;
			}

			if ($.parseJSON(localStorage.pushLog).today <= today(7)) {
				localStorage.pushLog = JSON.stringify({
					"today": today(7)
				});
				
				//推送上个工作日质量信息
				var lastDayInfo = getLastDayInfo();
				var uncheckInfo = getUncheckInfo();
				pushLastDayInfo(lastDayInfo + uncheckInfo);

				//推送钞纸过程质量控制数据
				var paperProcessInfo = getPaperProcessInfo();
				pushPaperProcessInfo( paperProcessInfo );
			}
		}, 60 * 60 * 1000);
	}();
})();


/*
jQuery(document).ready(function() {
	getOnlineInfo();
});*/