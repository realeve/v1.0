var Login = function() {

	var handleLockScreen = function() {
		$('.lock-form button').on('click', function() {
			lock();
		});
		$('.lock-form button').bind("copy cut paste", function(e) {
			return false;
		});
		$('.lock-form input[name="password"]').val('');

		function lock() {
			var strUrl = getRootPath(1) + '/welcome/relogin';
			var loginData = {
				'password': $('.lock-form input[name="password"]').val()
			};
			$.post(strUrl, loginData,
				function(data, status) {
					if (status == "success") {
						var obj = jQuery.parseJSON(data);
						if (obj.type === 2 || obj.type === 3 || obj.type === 4 || obj.type === 7) {
							obj.type = 0;
						} else if (obj.type === 5) {
							obj.type = 1;
						} else if (obj.type === 6) {
							obj.type = 2;
						} else if (obj.type === 9) {
							window.location.href = (typeof localStorage.lastUrl == 'undefined') ? (getRootPath(1) + '/welcome') : localStorage.lastUrl;
							return;
						} else {
							obj.type = 3;
						}
						infoTips(obj.message, obj.type, "#bootstrap_alerts");
					} else {
						infoTips("登录验证失败，请稍后重试或联系管理员!", 0, "#bootstrap_alerts");
					}
				});
		}
	};
	return {
		//main function to initiate the module
		init: function() {
			handleLockScreen();
		}

	};

}();
jQuery(document).ready(function() {
	Login.init();
});