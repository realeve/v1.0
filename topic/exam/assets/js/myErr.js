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
	loadComplete: false,
	total: 0, //总分
	error: [], //错误题目（原顺序）
	answerList: [], //乱序后的答案顺序
	isAnswered: [], //题目回答状态
	timeReleased: false, //时间用尽
	sourceList: [], //原题目顺序
	scoresPerAnswer: 0, //每道题目分数
	isSubmit: false, //数据是否提交
	maxAnswerNum: 20, //最大抽取多少道题目
	examPaper: "safe", //"safe" //试卷文件
	answerNums: 0,
	myErrNums: 0,
	myError: []
};

//页面总数
var lastPage;

require(['jquery.fullPage', 'jquery-weui'], function() {
	function getUrlParam(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
		var r = encodeURI(window.location.search).substr(1).match(reg); //匹配目标参数
		if (r !== null) return decodeURI(r[2]);
		return null; //返回参数值
		//return App.getURLParameter(name);
	}

	var uid = getUrlParam('uid');

	var secColor = [];


	function getExamTemplateByObj(data, mode, i, obj) {
		var ques = [];
		var arr = [];
		var answerAttr = ['A', 'B', 'C', 'D'];
		//选项乱序
		arr = getRandomArr(data.question.length);
		var oldOrder = [];
		arr.map(function(arrData, id) {
			oldOrder[arrData] = id;
		});
		var str = '<div class="section background_main">' +
			'<h1 class="title answer-num ' + /*(i % 2 ? '' : 'white-font')+*/ '">第<span>' + i + '</span>题</h1>';
		if (mode) {
			str += '<h3 class="weui_cells_title">错误人数：<span>' + obj.nums + '人 </span>( ' + obj.percent + '% )</h3>';
		}

		str += '<h3 class="weui_cells_title">正确答案:<span>' + answerAttr[Number.parseInt(oldOrder[data.answer - 1])] + '</h3>' +
			'<div class="weui_cells_title ' + /*(i % 2 ? '' : 'white-font')+*/ '">' + data.title + '</div>' +
			'<div class="weui_cells weui_cells_checkbox weui_cells_dark weui_cells_dark_myerr" data-id=' + (i - 1) + ' data-answer=' + (oldOrder[data.answer - 1] + 1) + '>';

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
		/*str = str.replace('不正确', '<span class="white-font-red">不正确</span>');
		str = str.replace('正确', '<span class="white-font-red">正确</span>');
		str = str.replace('不属于', '<span class="white-font-red">不属于</span>');*/
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

	var initDom = function() {

		$('#fullpage').fullpage({
			//sectionsColor: secColor,
			easingcss3: 'cubic-bezier(0.25, 0.5, 0.35, 1.15)', //'cubic-bezier(0.175, 0.885, 0.320, 1.275)',
			onLeave: function(index, nextIndex, direction) {
				if (index - 2 > lastPage && (direction == 'down')) {
					$('.iSlider-arrow').hide();
				}
			},
			afterLoad: function(anchor, index) {

				if (index - 2 == lastPage) {
					$('.iSlider-arrow').hide();
				} else {
					$('.iSlider-arrow').show();
				}
			}
		});

		//全屏加载完毕
		if (!exam.loadComplete) {
			$("#fakeLoader").hide();
		}

	}

	function renderPapers() {

		$.getJSON("./assets/data/" + exam.examPaper + ".min.json", function(question) {
			var quesLen = exam.error.length;

			//只抽取maxAnswerNum个
			quesLen = (quesLen <= exam.maxAnswerNum) ? quesLen : exam.maxAnswerNum;
			exam.maxAnswerNum = quesLen;

			for (var i = 0; i < quesLen; i++) {
				$('#fullpage').append(getExamTemplateByObj(question[exam.error[i].id], 1, i + 1, exam.error[i]));
			}

			for (var i = 0; i < exam.myErrNums; i++) {
				$('[name="allErr"]').before(getExamTemplateByObj(question[exam.myError[i]], 0, i + 1));
			}
			//var str = '<div class="weui_opr_area"><p class="weui_btn_area"><a href="javascript:;" class="weui_btn weui_btn_primary" >查看错题统计</a></p></div>';
			//$('.answer-num').last().parent().append(str);

			//间隔背景
			lastPage = quesLen + 1 + exam.myErrNums;
			for (i = 0; i < lastPage; i++) {
				secColor[i] = (i % 2) ? '#fff' : '#445';
			}

		}).done(function() {
			initDom();
			document.getElementById('autoplay').play();
		});
	}

	$.ajax({
		url: 'http://cbpc540.applinzi.com/index.php?s=/addon/GoodVoice/GoodVoice/getMyErrs&uid=' + uid,
		async: false,
		dataType: "jsonp",
		callback: "JsonCallback"
	}).done(function(obj) {
		$('[name="username"]').text(obj.user_name);
		$('[name="userscore"]').text(obj.score);
		exam.myErrNums = (100 - Number.parseInt(obj.score)) / 5;
		if (exam.myErrNums > 0) {
			$('[name="errTips"]').text('做错' + exam.myErrNums + '道题,最终');
			$('[name="myErrTips"]').text('接下来我们来看看这' + exam.myErrNums + '道题目的正确答案。');
			exam.myError = obj.errors.split(',');
		}

		loadAllErrs();
	});

	//载入答题错误信息数据
	function loadAllErrs() {

		$.ajax({
			url: 'http://cbpc540.applinzi.com/index.php?s=/addon/GoodVoice/GoodVoice/getAllErrs',
			async: false,
			dataType: "jsonp",
			callback: "JsonCallback"
		}).done(function(obj) {

			for (var i = 0; i < obj.errors.length; i++) {
				exam.isAnswered[i] = 0;
			}

			exam.answerNums = obj.nums;
			var arrTemp = [];
			obj.errors.map(function(data) {
				arrTemp.push(data);
			})

			arrTemp.sort(function(a, b) {
				return b - a;
			});

			for (var j = 0; j < exam.maxAnswerNum && exam.error.length < exam.maxAnswerNum; j++) {
				obj.errors.map(function(data, i) {
					if (data == arrTemp[j] && exam.isAnswered[i] == 0) {
						exam.error.push({
							id: i,
							nums: data,
							percent: Number.parseFloat(data * 100 / obj.nums).toFixed(2)
						});
						exam.isAnswered[i] = 1;
					};
				});
			}
			renderPapers();
		});
	}

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