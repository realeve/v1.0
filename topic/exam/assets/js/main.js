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
	timeLength: 5 * 60 * 1000,
	sourceList: [],
	eachScore: 0
};

//页面总数
var lastPage;

require(['jquery', 'jquery.fullPage', 'jquery-weui'], function($) {
	var secColor = [];

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
	$.getJSON("./assets/data/test.min.json", function(question) {
		var quesLen = question.length;
		$('[name="nums"]').text(quesLen);
		exam.eachScore = 100 / quesLen;
		$('[name="scores"]').text(exam.eachScore.toFixed(0));

		exam.sourceList = getRandomArr(quesLen);

		for (var i = 0; i < quesLen; i++) {
			$('[name="form"]').before(getExamTemplate(question[exam.sourceList[i]], i + 1));
			exam.isAnswered[i] = 0;
		}

		//间隔背景
		lastPage = question.length + 2;
		for (i = 0; i < lastPage; i++) {
			secColor[i] = (i % 2) ? '#fff' : '#f3f3ff';
		}

	}).done(function() {
		handleAnswer();
	});
	var handleAnswer = function() {

		function timeReleasedTip() {
			$.alert("答题时间到，系统将不再记录此后的得分，请提交当前成绩！", "时间到！", function() {
				$.fn.fullpage.moveTo(lastPage);
			});
		}

		$('.weui_check_label').on('click', function() {
			if (exam.timeReleased) {
				timeReleasedTip();
			} else {
				var answerPrnt = $(this).parents('.weui_cells');
				var answerInfo = $(this).find('.weui_cell_primary');
				var curScore = (answerInfo.data('value') + 1 == answerPrnt.data('answer')) ? 1 : 0;
				exam.answerList[answerPrnt.data('id')] = curScore;
				exam.isAnswered[answerPrnt.data('id')] = 1;
			}

		});

		function pageChange(index) {
			var idx = index - 1;
			if (!exam.timeReleased && idx > 0 && idx < lastPage - 1 && !exam.isAnswered[idx - 1]) {
				$.alert("第" + idx + "题您还没有作答！", "警告！");
				if (idx == lastPage - 2) {
					$('.iSlider-arrow').css('display', 'none');
				} else {
					$('.iSlider-arrow').css('display', '');
				}
			}
		}

		$('#fullpage').fullpage({
			sectionsColor: secColor,
			onLeave: function(index) {
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
					}, exam.timeLength * 033);

					//答题时间提醒
					setTimeout(function() {
						$.toast("考试时间仅剩三分之一");
					}, exam.timeLength * 0.67);
				}
				pageChange(index);
			},
			afterLoad: function(index) {
				pageChange(index);
			}
		});

		function validate(data) {
			var isPass = true;
			if (data.userName == '') {
				$('[name="userName"]').parents('.weui_cell').find('label').css('color', '#e64340');
				isPass = false;
			} else {
				$('[name="userName"]').parents('.weui_cell').find('label').attr('style', '');
			}

			if (data.userCard == '') {
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

			var data = {
				userName: $('[name="userName"]').val(),
				userCard: $('[name="userCard"]').val(),
				totalScore: (exam.total * exam.eachScore).toFixed(0),
				error: exam.error
			};

			if (!validate(data)) {
				$.toast("请输入个人用户信息", "cancel");
			} else {
				$.toast("您一共取得了" + data.totalScore + "分");
			}

			console.log(data);
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