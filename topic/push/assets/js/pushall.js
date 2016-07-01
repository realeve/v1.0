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
				output = a.toString() + jsRight(('0' + b), 2) + jsRight(('0' + c), 2);
				break;
			case 8:
				output = a.toString() + jsRight(('0' + b), 2);
				break;
			default:
				output = b + '月' + c + '日 ' + week + ' ' + d + ':' + e + ':' + f;
				break;
		}
		return output;
	}

	//信息推送
	var sendMsgToUsers = function(msg, receiver,title, timeLength) {
		if (typeof timeLength == 'undefined') {
			timeLength = 60 * 60 * 1000;
		} else {
			timeLength = 0;
		}

		var sendMsg = function(msg, receiver) {
			$.ajax({
				url: "http://10.8.2.111:8012/sendnotify.cgi",
				type: 'get',
				async: false,
				data: {
					"delaytime": timeLength, //60S延时
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

	var sengMsgToAllUsers = function(msg, title, timeLength){
		sendMsgToUsers(msg,'all',title,0);
	};

	var getAllUserInfo = function() {
		var msg = '您的飞秋和腾讯通还在使用默认表情包吗？NONONO！钞人贝贝表情包来了！让你告别枯燥的办公生活，[点击下载|http://10.8.2.133/tes/%E5%93%81%E8%B4%A8%E6%88%90%E9%92%9E%E8%A1%A8%E6%83%85%E5%8C%85.zip],开始美妙的快乐的工作吧！[(表情包安装攻略)|http://10.8.2.2:5555/approve-admin/web_archive/2016/6/1558F6B7974.html]'
		
		//sengMsgToAllUsers(msg,'成钞人自己的表情包——钞人贝贝来啦！');
		/*
		var url = "http://10.8.2.133:70/DataInterface/Api?Token=79d84495ca776ccb523114a2120e273ca80b315b&ID=108&M=3";

		$.ajax({
			url: url,
			type: "get",
			async: false,
			dataType: "jsonp",
			//jsonp:"JsonCallback",
			//jsonpCallback:"JsonCallback",
			callback: "JsonCallback",
			success: function(json) {
				if (json.rows > 0) {
					var userList = [];
					var j = 0;
					json.data.map(function(data, i) {
						if ((i + 1) % 20 == 0) {
							var rtxList = (JSON.stringify(userList)).replace(/"/g, '').replace('[', '').replace(']', '');
							userList = [];
							//sendMsgToUsers(msg,rtxList,'温馨提示',0);
							console.log(rtxList);
						} else {
							if (data[3] != '') {
								userList.push(data[3]);
							}
						}
					});
				} else {
					console.log("读取用户列表信息失败");
				}
				sendMsgToUsers(msg,'10707,10654','成钞人自己的表情包——钞人贝贝来啦！');
			}
		});*/
	}();

})();