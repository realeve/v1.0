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


require(['jquery', 'jquery.fullPage', 'jquery-weui'], function($) {
	var dptAttr={};
	$.getJSON("./assets/data/department.min.json", function(dpt) {
		var dptLen = dpt.length,
			dptName = [];
		dpt.map(function(dpt_name) {
			dptName.push(dpt_name.name);

			dptAttr[dpt_name.name] = dpt_name.attr;

		});

		$('[name="user_dpt"]').picker({
			title: "上下滑动选择您的部门",
			cols: [{
				textAlign: 'center',
				values: dptName
			}]
		});

	});

	$('#fullpage').fullpage({});

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


	$('#login').on('click', function() {
		var data = {
			user_name: $('[name="userName"]').val().trim(),
			user_id: $('[name="userCard"]').val().trim(),
			user_dpt: $('[name="user_dpt"]').val()
		};
		data.user_surname = data.user_name.substr(0, 1);
		//部门属性
		data.user_dpt_attr = dptAttr[data.user_dpt];

		if (!validate(data)) {
			$.toast("请输入个人用户信息", "cancel");
		} else {
			$.ajax({
				url: 'http://cbpc540.applinzi.com/index.php?s=/addon/GoodVoice/GoodVoice/userInfoValid',
				data: data,
				success: function(obj) { 					
					$.alert(obj.msg, (obj.id == '1')?'更新成功':'更新失败');
				},
				error: function(obj) {
					$.alert("系统错误，请刷新重试", "警告！");
				}
			});
		}
	});

});