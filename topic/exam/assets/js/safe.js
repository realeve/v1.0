require.config({　　　　
	baseUrl: "assets/js",
	paths: {　　　　　　
		"jquery": "jquery.min",
		"jquery-weui": "jquery-weui",
		　　　　　　"jquery.fullPage": "jquery.fullPage.min"
	},
	shim: {　　　　
		'jquery.fullPage': {　　　　　　
			deps: ['jquery']　　　
		},
		　
		'jquery-weui': {　　　　　　
			deps: ['jquery']　　　
		}　
	}　　
});
/**
 * [exam 测试题目]
 */
var exam = {
	total: 0, //总分
	error: [], //错误题目（原顺序）
	answerList: [], //乱序后的答案顺序
	isAnswered: [], //题目回答状态
	timeReleased: false, //时间用尽
	isStarted: false, //活动是否开始
	timeLength: 0, //10 * 1000,//启用时间限制 0为不限制
	sourceList: [], //原题目顺序
	scoresPerAnswer: 0, //每道题目分数
	isSubmit: false, //数据是否提交
	isLogin: false, //是否登录
	loginData: {}, //用户登录信息
	maxAnswerNum: 20, //最大抽取多少道题目
	answerTimes: 5, //每个用户最多回答几次
	examPaper: "test"//"safe" //试卷文件
};

//页面总数
var lastPage;

require(['jquery', 'jquery.fullPage', 'jquery-weui'], function($) {

	var secColor = [];
	//testMode 0:默认，1，测试模式，2，安保
	var testMode = (window.location.href.indexOf('?m=') == -1) ? 0 : window.location.href.split('?m=')[1].split('&')[0];
	exam.maxAnswerNum = (testMode === 0) ? exam.maxAnswerNum : 2;
	//隐藏提示信息
	$('[name="sucessInfo"] .weui_msg_title').hide();

	function getExamTemplate(data, i) {
		var ques = [];
		var arr = [];
		//选项乱序
		arr = getRandomArr(data.question.length);
		var oldOrder = [];
		arr.map(function(arrData, id) {
			oldOrder[arrData] = id;
		});
		var str = '<div class="section ' + (i % 2 ? '' : 'background_dark_img') + '">';
		str += '<h1 class="title answer-num ' + /*(i % 2 ? '' : 'white-font')+*/ '">第<span>' + i + '</span>题</h1>';
		str += '<div class="weui_cells_title ' + /*(i % 2 ? '' : 'white-font')+*/ '">' + data.title + '</div>';
		str += '<div class="weui_cells weui_cells_checkbox' + (i % 2 ? '' : ' weui_cells_dark') + '" data-id=' + (i - 1) + ' data-answer=' + (oldOrder[data.answer - 1] + 1) + '>';

		data.question.map(function(qTitle, idx) {
			ques[idx] = '';
			ques[idx] += '    <label class="weui_cell weui_check_label">';
			ques[idx] += '<div class="weui_cell_hd">';
			ques[idx] += '    <input type="radio" class="weui_check" name="radio' + (i - 1) + '">';
			ques[idx] += '    <i class="weui_icon_checked"></i>';
			ques[idx] += '</div>';
			ques[idx] += '<div class="weui_cell_bd weui_cell_primary" data-value=' + oldOrder[idx] + '>';
			ques[idx] += '    <p>' + qTitle + '</p>';
			ques[idx] += '</div></label>';
		});

		var strQues = '';
		for (var j = 0; j < data.question.length; j++) {
			strQues += ques[arr[j]];
		}
		//选项乱序 -END

		str += strQues + '</div>' + /*(i % 2 ? '' : '<img class="lg-component-img" src="./assets/img/bottom.png">') +*/ '</div>';
		return str;
	}

	//数组随机排序
	function randomsort(a, b) {
		return Math.random() > 0.5 ? -1 : 1;
	}

	function getRandomArr(len) {
		var arr = [];
		for (var i = 0; i < len; i++) {
			arr.push(i);
		}
		return arr.sort(randomsort);
	}

	$.getJSON("./assets/data/department.min.json", function(dpt) {
		var dptLen = dpt.length,
			dptName = [];
		dpt.map(function(dpt_name) {
			dptName.push(dpt_name.name);
		});

		$('[name="user_dpt"]').picker({
			title: "上下滑动选择您的部门",
			cols: [{
				textAlign: 'center',
				values: dptName
			}]
		});

	});

	$.getJSON("./assets/data/" + exam.examPaper + ".min.json", function(question) {
		var quesLen = question.length;
		//所有题目参与排序
		exam.sourceList = getRandomArr(quesLen);

		//只抽取maxAnswerNum个
		quesLen = (quesLen <= exam.maxAnswerNum) ? quesLen : exam.maxAnswerNum;

		$('[name="nums"]').text(quesLen);
		exam.scoresPerAnswer = 100 / quesLen;
		$('[name="scores"]').text(exam.scoresPerAnswer.toFixed(0));

		for (var i = 0; i < quesLen; i++) {
			$('[name="sucessInfo"]').before(getExamTemplate(question[exam.sourceList[i]], i + 1));
			exam.isAnswered[i] = 0;
		}


		var str = '<div class="weui_opr_area"><p class="weui_btn_area"><a href="javascript:;" class="weui_btn weui_btn_primary" id="submit">交卷</a></p></div>';
		$('.answer-num').last().parent().append(str);

		//间隔背景
		lastPage = quesLen + 3;
		for (i = 0; i < lastPage; i++) {
			secColor[i] = (i % 2) ? '#fff' : '#445';
		}

	}).done(function() {
		document.getElementById('autoplay').play();
		handleAnswer();
	});

	function jsRight(sr, rightn) {
		return sr.substring(sr.length - rightn, sr.length);
	}

	function today(type) {
		var date = new Date();
		var a = date.getFullYear();
		var b = jsRight(('0' + (date.getMonth() + 1)), 2);
		var c = jsRight(('0' + date.getDate()), 2);
		var d = date.getHours();
		var e = date.getMinutes();
		var f = date.getSeconds();
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
		}
		return output;
	}

	var handleAnswer = function() {

		function timeReleasedTip() {
			$.alert("答题时间到，系统将不再记录此后的得分，请提交当前成绩！", "时间到！", function() {
				$.fn.fullpage.moveTo(lastPage);
			});
		}

		$('.weui_check_label').on('click', function(event) {
			if (exam.timeReleased) {
				event.preventdefault();
				$.fn.fullpage.moveTo(lastPage);
				$.alert("答题时间到，系统将不再记录此后的得分，请提交当前成绩！", "时间到！");
			} else {
				var answerPrnt = $(this).parents('.weui_cells');
				var answerInfo = $(this).find('.weui_cell_primary');
				var curScore = (answerInfo.data('value') + 1 == answerPrnt.data('answer')) ? 1 : 0;
				var curID = answerPrnt.data('id');
				exam.answerList[curID] = curScore;
				exam.isAnswered[curID] = 1;
				//未到最后一题
				if (curID < exam.maxAnswerNum - 1) {
					setTimeout(function() {
						$.fn.fullpage.moveTo(curID + 4);
					}, 300);
				}
			}
		});

		function pageChange(index, nextIndex, direction) {
			var idx = index - 2;

			if (direction == 'down' && !exam.isLogin && !exam.timeReleased) {
				setTimeout(function() {
					$.fn.fullpage.moveTo(2);
				}, 200);
				return;
			}

			if (direction == 'down' && !exam.timeReleased && idx > 0 && idx < lastPage - 2 && !exam.isAnswered[idx - 1]) {
				$.alert("第" + idx + "题您还没有作答！", "警告！", function() {
					$.fn.fullpage.moveTo(index);
				});
			}

			//第一页简单颜色切换
			/*if (direction == 'down') {
				if (index % 2) {
					$('.iSlider-arrow').removeClass('iSlider-white');
				} else if (nextIndex % 2) {
					$('.iSlider-arrow').addClass('iSlider-white');
				}
			} else {
				if (nextIndex % 2) {
					$('.iSlider-arrow').addClass('iSlider-white');
				} else {
					$('.iSlider-arrow').removeClass('iSlider-white');
				}
			}*/
			//最后一页隐藏箭头
			if (index > lastPage && (direction == 'down')) {
				$('.iSlider-arrow').hide();
			}
		}

		$('#fullpage').fullpage({
			//sectionsColor: secColor,
			easingcss3: 'cubic-bezier(0.25, 0.5, 0.35, 1.15)', //'cubic-bezier(0.175, 0.885, 0.320, 1.275)',
			onLeave: function(index, nextIndex, direction) {
				//开始计时
				if (exam.timeLength && index == 1 && !exam.timeReleased) {
					exam.isStarted = true;

					//答题时间用完
					setTimeout(function() {
						exam.timeReleased = true;
						timeReleasedTip();
					}, exam.timeLength);

					//答题时间提醒
					setTimeout(function() {
						$.toast("考试时间已过去三分之一");
					}, exam.timeLength * 0.33);

					//答题时间提醒
					setTimeout(function() {
						$.toast("考试时间仅剩三分之一");
					}, exam.timeLength * 0.67);
				}

				pageChange(index, nextIndex, direction);
			},
			afterLoad: function(anchor, index) {
				//最后两页隐藏箭头
				if (index == lastPage - 1) {
					//console.log('进入倒数第二页');
					$('.iSlider-arrow').hide();
				} else if (index == lastPage) {
					//console.log('进入最后一页');
					$('.iSlider-arrow').hide();
					if (!exam.isSubmit) {
						setTimeout(function() {
							$.fn.fullpage.moveSectionUp();
						}, 500);
					}
				} else {
					$('.iSlider-arrow').show();
				}
			}
		});

		function validate(data) {
			var isPass = true;
			if (data.user_name == '') {
				$('[name="userName"]').parents('.weui_cell').find('label').css('color', '#e64340');
				isPass = false;
			} else {
				$('[name="userName"]').parents('.weui_cell').find('label').attr('style', '');
			}

			if (data.user_dpt == '') {
				$('[name="user_dpt"]').parents('.weui_cell').find('label').css('color', '#e64340');
				isPass = false;
			} else {
				$('[name="user_dpt"]').parents('.weui_cell').find('label').attr('style', '');
			}

			if (data.user_id == '') {
				$('[name="userCard"]').parents('.weui_cell').find('label').css('color', '#e64340');
				isPass = false;
			} else {
				$('[name="userCard"]').parents('.weui_cell').find('label').attr('style', '');
			}
			return isPass;
		}

		$('[name="login"] input').on('focus', function() {
			$(this).parents('.weui_cell').find('label').attr('style', '');
		});

		function handleTotalScore(iScore, uid) {
			var tipStr = '';
			if (iScore >= 80) {
				tipStr = '恭喜您获奖！请根据部门通知领取答题奖品！';
			} else {
				if (exam.loginData.iTimes == 1) {
					tipStr = '您还有一次答题机台，退出页面重新进入即可，下次继续努力哦！';
				}
				tipStr = '下次继续努力哦！安全生产离不开您的参与！';
			}

			$('[name="sucessInfo"] .weui_msg_desc').html('提交成功，您一共得了<span name="totalScore" style="font-weight:bold;color:#445"> ' + iScore + ' </span>分');
			$('.weui_icon_msg').last().addClass('weui_icon_success').removeClass('weui_icon_warn');

			//处理得分专题
			$('[name="scoreLink"]').attr('href', './safeScore.html?uid=' + uid);

			//显示提示信息
			$('[name="sucessInfo"] .weui_msg_title').text(tipStr).show();
		}

		$('#login').on('click', function() {
			var data = {
				user_name: $('[name="userName"]').val().trim(),
				user_id: $('[name="userCard"]').val().trim(),
				user_dpt: $('[name="user_dpt"]').val()
			};
			data.user_firstname = data.user_name.substr(0, 1);

			if (!validate(data)) {
				$.toast("请输入个人用户信息", "cancel");
			} else {
				$.ajax({
					url: 'http://cbpc540.applinzi.com/index.php?s=/addon/GoodVoice/GoodVoice/examSafeLogin',
					data: data,
					success: function(obj) {
						//var obj = loginData[0];
						if (obj.id == 0) { //查无此人
							$.alert("登录失败，请检查您的卡号及部门", "警告！");
						} else if (obj.first_name.trim() != data.user_firstname) {
							$.alert("登录失败，您的姓名可能填写错误", "警告！");
						} else { //登录成功
							if (obj.answer_times >= exam.answerTimes) { //回答次数用完
								$.alert("您已用完" + exam.answerTimes + "次答题机会", "警告！");
							} else {
								exam.isLogin = true;
								exam.loginData = data;
								exam.loginData.uid = obj.id;
								//答题次数增1
								exam.loginData.iTimes = Number.parseInt(obj.answer_times) + 1;

								//上次分数
								exam.loginData.oldScore = (exam.loginData.iTimes >= 1) ? Number.parseInt(obj.score) : 0;
								exam.loginData.loginTime = today(1);

								//隐藏页面，防止登录信息再次修改
								$(this).parents('.section').hide();
								$.fn.fullpage.moveSectionDown();
							}
						}
					},
					error: function(obj) {
						$.alert("登录失败，请刷新重试", "警告！");
					}
				});
			}
		});

		function isAllQuestionAnswered() {
			var passed = true;
			exam.isAnswered.map(function(isAnswered, i) {
				if (!isAnswered) {
					var j = i + 1;
					$.toast("第" + j + "题尚未作答，请先填写完所有题目再交卷");
					passed = false;
				}
			});
		}

		function submitPaper(data) {
			$.ajax({
					url: 'http://cbpc540.applinzi.com/index.php?s=/addon/GoodVoice/GoodVoice/setSafeExamData',
					data: data,
					success: function(obj) {
						if (obj.status == 0) {
							$('[name="sucessInfo"] .weui_msg_title').text('提交失败，请稍后重试');
						} else if (obj.status == -1) {
							$('[name="sucessInfo"] .weui_msg_title').text('该用户已提交数据');
						} else { //提交成功
							handleTotalScore(data.score, data.uid);
							if (data.score == exam.loginData.oldScore) {
								$.alert("本次得分" + data.score + "与上一次相同，系统将不保存此次得分", "警告！");
							} else if (data.score < exam.loginData.oldScore) {
								$.alert("系统检测到本次得分" + data.score + "比上次更低，系统将不保存此次得分", "警告！");
							}
						}

						$.fn.fullpage.moveSectionDown();
					},
					error: function(obj) {
						var tipStr = '提交失败，请退出页面重新进入';
						$('[name="sucessInfo"] .weui_msg_title').text(tipStr).show();
					}
				})
				.always(function() {
					exam.isSubmit = true;
					//隐藏提交按钮，防止二次提交数据
					$('#submit').hide();
				});
		}

		$('#submit').on('click', function(event) {
			//清空错误数据
			exam.error = [];
			//得分清零
			exam.total = 0;
			exam.answerList.map(function(scores, i) {
				exam.total += scores;
				if (!scores) {
					//错误题目推送原题目的顺序
					exam.error.push(exam.sourceList[i]);
				}
			});

			//是否所有题目均答完
			if (!isAllQuestionAnswered) {
				return;
			}

			var errStr = '';
			exam.error.map(function(elem) {
				errStr += elem + ',';
			});

			errStr = (errStr.length) ? errStr.substring(0, errStr.length - 1) : '-1';

			var data = {
				score: (exam.total * exam.scoresPerAnswer).toFixed(0),
				errors: errStr,
				rec_time: today(1),
				start_time: exam.loginData.loginTime,
				uid: exam.loginData.uid,
				iTimes: exam.loginData.iTimes,
				oldScore: exam.loginData.oldScore
			};

			$.confirm("您确定要交卷吗?", "交卷", function() {
				submitPaper(data);
			}, function() {
				$.fn.fullpage.moveTo(2);
			});

			$.modal({
				title: "提示",
				text: "您确定要交卷吗?",
				buttons: [{
					text: "交卷",
					onClick: function() {
						submitPaper(data);
					}
				}, {
					text: "检查一遍",
					onClick: function() {
						$.fn.fullpage.moveTo(3);
					}
				}]
			});


		});
	};

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
});