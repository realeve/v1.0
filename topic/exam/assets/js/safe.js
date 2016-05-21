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
 * @type {总分、错误题目、答题数据、当前题目是否已答、时间有剩余、答题已开始、考试时间、原答题顺序}
 */
var exam = {
	total: 0,
	error: [],
	answerList: [],
	isAnswered: [],
	timeReleased: false,
	isStarted: false,
	timeLength: 180 * 60 * 1000,
	sourceList: [],
	eachScore: 0,
	isSubmit: false,
	maxAnswerNum: 20, //最大抽取多少道题目
	paperData: "safe"
};

//页面总数
var lastPage;

require(['jquery', 'jquery.fullPage', 'jquery-weui'], function($) {

	var secColor = [];
	//testMode 0:默认，1，测试模式，2，安保
	var testMode = (window.location.href.indexOf('?m=') == -1) ? 0 : window.location.href.split('?m=')[1].split('&')[0];
	exam.maxAnswerNum = (testMode === 0) ? 20 : 3;
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
		var str = '<div class="section">';
		str += '<h1 class="title">第<span>' + i + '</span>题</h1>';
		str += '<div class="weui_cells_title">' + data.title + '</div>';
		str += '<div class="weui_cells ' + (i % 2 ? '' : 'weui_cells_dark') + ' weui_cells_checkbox" data-id=' + (i - 1) + ' data-answer=' + (oldOrder[data.answer - 1] + 1) + '>';

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

		str += strQues + '</div>\n</div>';
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
			title: "请选择您的部门",
			cols: [{
				textAlign: 'center',
				values: dptName
			}]
		});

	});

	$.getJSON("./assets/data/" + exam.paperData + ".min.json", function(question) {
		var quesLen = question.length;
		//所有题目参与排序
		exam.sourceList = getRandomArr(quesLen);

		//只抽取maxAnswerNum个
		quesLen = (quesLen <= exam.maxAnswerNum) ? quesLen : exam.maxAnswerNum;

		$('[name="nums"]').text(quesLen);
		exam.eachScore = 100 / quesLen;
		$('[name="scores"]').text(exam.eachScore.toFixed(0));
		
		for (var i = 0; i < quesLen; i++) {
			$('[name="form"]').before(getExamTemplate(question[exam.sourceList[i]], i + 1));
			exam.isAnswered[i] = 0;
		}

		//间隔背景
		lastPage = quesLen + 2;
		for (i = 0; i < lastPage; i++) {
			secColor[i] = (i % 2) ? '#fff' : '#f3f3ff';
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
				exam.answerList[answerPrnt.data('id')] = curScore;
				exam.isAnswered[answerPrnt.data('id')] = 1;
				setTimeout(function() {
					$.fn.fullpage.moveTo(answerPrnt.data('id') + 3);
				}, 200);
			}
		});

		function pageChange(index, nextIndex, direction) {
			var idx = index - 1;
			if (direction == 'down' && !exam.timeReleased && idx > 0 && idx < lastPage - 1 && !exam.isAnswered[idx - 1]) {
				$.alert("第" + idx + "题您还没有作答！", "警告！", function() {
					$.fn.fullpage.moveTo(idx + 1);
				});
			}

			//第一页简单颜色切换
			if (index == 1 && direction == 'down') {
				$('.iSlider-arrow').removeClass('iSlider-white');
			} else if (nextIndex == 1 && direction == 'up') {
				$('.iSlider-arrow').addClass('iSlider-white');
			}
			//最后两页隐藏箭头
			if (index >= lastPage - 1 && (direction == 'down')) {
				$('.iSlider-arrow').hide();
			}
		}

		$('#fullpage').fullpage({
			sectionsColor: secColor,
			easingcss3: 'cubic-bezier(0.25, 0.5, 0.35, 1.15)', //'cubic-bezier(0.175, 0.885, 0.320, 1.275)',
			onLeave: function(index, nextIndex, direction) {
				//开始计时
				if (index == 1 && !exam.timeReleased) {
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
				if (index == lastPage) {
					//console.log('进入倒数第二页');
					$('.iSlider-arrow').hide();
				} else if (index > lastPage) {
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

		$('[name="form"] input').on('focus', function() {
			$(this).parents('.weui_cell').find('label').attr('style', '');
		});

		function handleTotalScore(iScore, uid) {
			var tipStr = '';
			if (iScore >= 80) {
				tipStr = '恭喜您获奖！请根据部门通知领取答题奖品！';
			} else if (iScore >= 80) {
				tipStr = '下次继续努力哦！安全生产离不开您的参与！';
			}
			$('[name="weui_msg_title"]').text(tipStr);

			$('[name="sucessInfo"] h1').text('提交成功，您一共得了<span name="totalScore">' + iScore + '</span>分');
			$('.weui_icon_msg').last().addClass('weui_icon_success');

			//处理得分专题
			$('[name="scoreLink"]').attr('href', './safeScore.html?uid=' + uid);

			//显示提示信息
			$('[name="sucessInfo"] .weui_msg_title').show();
		}

		$('[name="form"] .weui_btn').on('click', function(event) {
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

			var errStr = '';
			exam.error.map(function(elem) {
				errStr += elem + ',';
			});
			errStr = (errStr.length) ? errStr.substring(0, errStr.length - 1) : '-1';

			var data = {
				user_name: $('[name="userName"]').val(),
				user_id: $('[name="userCard"]').val(),
				user_dpt: $('[name="user_dpt"]').val(),
				score: (exam.total * exam.eachScore).toFixed(0),
				errors: errStr,
				rec_time: today(1)
			};

			if (!validate(data)) {
				$.toast("请输入个人用户信息", "cancel");
			} else {

				//'http://cbpm.sinaapp.com/topic/exam/data/setExamData.php',
				//testURL:http://cbpc540.applinzi.com/index.php?s=/addon/GoodVoice/GoodVoice/setJZExamData&user_name=me&user_id=22333&score=95&errors=2&rec_time=test
				$.ajax({
						url: 'http://cbpc540.applinzi.com/index.php?s=/addon/GoodVoice/GoodVoice/setSafeExamData',
						data: data,
						success: function(obj) {
							if (obj.status == 0) {
								$('[name="sucessInfo"] h1').text('提交失败，请稍后重试');
							} else if (obj.status == -1) {
								$('[name="sucessInfo"] h1').text('该用户已提交数据');
							} else { //提交成功
								handleTotalScore(data.score,obj.uid);
							}
						},
						error: function(obj) {
							if (obj.status == 0) {
								$('[name="sucessInfo"] h1').text('提交失败，请稍后重试');
							} else if (obj.status == -1) {
								$('[name="sucessInfo"] h1').text('该用户已提交数据');
							} else {
								$('[name="sucessInfo"] h1').text('提交成功');
								$('.weui_icon_msg').last().addClass('weui_icon_success');

							}
						}
					})
					.always(function() {
						exam.isSubmit = true;
						$.fn.fullpage.moveSectionDown();
					});
			}

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