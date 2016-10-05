var Login = function() {
    //全局配置
    const config = {
        "TOKEN": '79d84495ca776ccb523114a2120e273ca80b315b'
    };
    var handleLogin = function() {

        $('.login-form').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            rules: {
                username: {
                    required: true
                },
                password: {
                    required: true
                },
                remember: {
                    required: false
                }
            },
            messages: {
                username: {
                    required: "用户名不能为空."
                },
                password: {
                    required: "密码不能为空."
                }
            },

            invalidHandler: function(event, validator) { //display error alert on form submit
                $('.alert-danger', $('.login-form')).show();
            },

            highlight: function(element) { // hightlight error inputs
                $(element)
                    .closest('.form-group').addClass('has-error'); // set error class to the control group
            },
            success: function(label) {
                label.closest('.form-group').removeClass('has-error');
                label.remove();
            },
            errorPlacement: function(error, element) {
                if (element.attr("name") == "tnc") { // insert checkbox errors after the container
                    error.insertAfter($('#forget-password'));
                } else if (element.closest('.input-icon').size() === 1) {
                    error.insertAfter(element.closest('.input-icon'));
                } else {
                    error.insertAfter(element);
                }
            },
            submitHandler: function(form) {
                //form.submit(); // form validation success, call ajax form submit
            }
        });

        $('.login-form input').keypress(function(e) {
            if (e.which == 13) {
                login();
            }
        });
        $('.login-form button').on('click', function() {
            login();
        });

        function login() {
            if ($('.login-form').validate().form()) {
                var strUrl = getRootPath(1) + '/welcome/trylogin';
                var loginData = {
                    'username': $('.login-form input[name="username"]').val(),
                    'password': $('.login-form input[name="password"]').val(),
                };
                $.post(strUrl, loginData,
                    function(data, status) {
                        if (status == "success") {
                            var obj = jQuery.parseJSON(data);
                            //存储菜单项
                            localStorage.settings_default_menu = obj.segment_html;
                            if (obj.type === 2 || obj.type === 3 || obj.type === 4 || obj.type === 7) {
                                obj.type = 0;
                            } else if (obj.type === 5 || obj.type === 1) {
                                obj.type = 1;
                            } else if (obj.type === 6) {
                                obj.type = 2;
                            } else if (obj.type === 9) {
                                var url = (typeof localStorage.lastUrl == 'undefined') ? (getRootPath(1) + '/welcome') : localStorage.lastUrl;
                                window.location.href = url;
                                return;
                            } else {
                                obj.type = 3;
                            }
                            infoTips(obj.message, obj.type, "#bootstrap_alerts_demo");
                        } else {
                            infoTips("登录验证失败，请稍后重试或联系管理员!", 0, "#bootstrap_alerts_demo");
                        }
                    });
            }
            return false;
        }
    };

    var handleForgetPassword = function() {
        $('.forget-form').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: "",
            rules: {
                username: {
                    required: true
                },
                password: {
                    required: true
                },
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                email: {
                    required: "Email是您重置密码的唯一凭证."
                }
            },

            invalidHandler: function(event, validator) { //display error alert on form submit

            },

            highlight: function(element) { // hightlight error inputs
                $(element)
                    .closest('.form-group').addClass('has-error'); // set error class to the control group
            },

            success: function(label) {
                label.closest('.form-group').removeClass('has-error');
                label.remove();
            },

            errorPlacement: function(error, element) {
                if (element.attr("name") == "tnc") { // insert checkbox errors after the container
                    error.insertAfter($('#register_tnc_error'));
                } else if (element.closest('.input-icon').size() === 1) {
                    error.insertAfter(element.closest('.input-icon'));
                } else {
                    error.insertAfter(element);
                }
            },
            submitHandler: function(form) {
                //form.submit();
            }
        });

        $('.forget-form input').keypress(function(e) {
            if (e.which == 13) {
                if ($('.forget-form').validate().form()) {
                    $('.forget-form').submit();
                }
                return false;
            }
        });
        $('.forget-form button').on('click', function() {
            forget();
        });

        function forget() {
            if ($('.forget-form').validate().form()) {
                var strUrl = getRootPath(1) + '/welcome/resetpassword';
                var loginData = {
                    'email': $('.forget-form input[name="email"]').val(),
                    'username': $('.forget-form input[name="username"]').val(),
                    'password': $('.forget-form input[name="password"]').val()
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
                            } else {
                                obj.type = 3;
                            }
                            infoTips(obj.message, obj.type, "#bootstrap_alerts_demo3");
                        } else {
                            infoTips("登录验证失败，请稍后重试或联系管理员!", 0, "#bootstrap_alerts_demo3");
                        }
                    });
            }
            return false;
        }
        jQuery('#forget-password').click(function() {
            jQuery('.login-form').hide();
            jQuery('.forget-form').show();
        });

        jQuery('#back-btn').click(function() {
            jQuery('.login-form').show();
            jQuery('.forget-form').hide();
        });

    };

    var dptInited = false;

    function loadDptList() {
        //SELECT a.DptID, a.DepartMentName FROM dbo.tblDepartMent AS a
        //缓存10天
        var str = getRootPath(1) + "/DataInterface/Api?Token=" + config.TOKEN + "&ID=163&M=3&cache=14400";
        var Data = ReadData(str);
        InitSelect("department", Data);
        SetSelectVal("department", 0);
        dptInited = true;
    }

    var handleRegister = function() {

        $('.register-form').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: false, // do not focus the last invalid input
            ignore: "",
            rules: {
                fullname: {
                    required: true
                },
                email: {
                    required: true,
                    email: true
                },
                phone: {
                    required: true
                },
                role: {
                    required: true
                },

                username: {
                    required: true
                },
                password: {
                    required: true
                },
                rpassword: {
                    equalTo: "#register_password"
                },
            },

            invalidHandler: function(event, validator) { //display error alert on form submit

            },

            highlight: function(element) { // hightlight error inputs
                $(element)
                    .closest('.form-group').addClass('has-error'); // set error class to the control group
            },

            success: function(label) {
                label.closest('.form-group').removeClass('has-error');
                label.remove();
            },

            errorPlacement: function(error, element) {
                if (element.attr("name") == "tnc") { // insert checkbox errors after the container
                    error.insertAfter($('#register_tnc_error'));
                } else if (element.closest('.input-icon').size() === 1) {
                    error.insertAfter(element.closest('.input-icon'));
                } else {
                    error.insertAfter(element);
                }
            },

            submitHandler: function(form) {
                //form.submit();
            }
        });

        $('.register-form input').keypress(function(e) {
            if (e.which == 13) {
                register();
            }
        });
        $('.register-form button').on('click', function() {
            register();
        });

        function register() {
            if ($('.register-form').validate().form()) {
                var strUrl = getRootPath(1) + '/welcome/register';
                var loginData = {
                    'fullname': $('.register-form input:nth(0)').val(),
                    'email': $('.register-form input:nth(1)').val(),
                    'phone': $('.register-form input:nth(2)').val(),
                    'username': $('.register-form input:nth(3)').val(),
                    'password': $('.register-form input:nth(4)').val(),
                    'department': $('.register-form select').val(),
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
                            } else {
                                obj.type = 3;
                            }
                            infoTips(obj.message, obj.type, "#bootstrap_alerts_demo2");
                        } else {
                            infoTips("登录验证失败，请稍后重试或联系管理员!", 0, "#bootstrap_alerts_demo2");
                        }
                    });
            }
            return false;
        }

        jQuery('#register-btn').click(function() {

            //注册时才加载数据
            if (!dptInited) {
                loadDptList();
            }

            jQuery('.login-form').hide();
            jQuery('.register-form').show();
        });

        jQuery('#register-back-btn').click(function() {
            jQuery('.login-form').show();
            jQuery('.register-form').hide();
        });
    };

    return {
        //main function to initiate the module
        init: function() {
            handleLogin();
            handleForgetPassword();
            handleRegister();
        }

    };

}();
//记录选择状态
jQuery(document).ready(function() {
    Login.init();
});