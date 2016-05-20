var handleAvatar = function() {
    //按ID+用户名BASE64编码存储文件名
    var avatarName = $('.username').data('avatar'); //$.base64.encode($('.username').data('uid') + $('.username').text().trim());
    var avatarUrl = function() {
        //增加时间戳防止缓存
        return getRootPath(1) + '/demo/upload/' + avatarName + '.jpg?' + Date.parse(new Date());
    };

    var refreshUserHeadInfo = function(smallAvatarName) {
        if (typeof smallAvatarName == 'undefined') {
            smallAvatarName = avatarName;
        }
        var smallAvatarUrl = getRootPath(1) + '/demo/avatar/' + smallAvatarName + '.jpg?' + Date.parse(new Date());
        $('.profile-userpic img').attr('src', smallAvatarUrl);
        $('.username').parent().find('img').attr('src', smallAvatarUrl);
        localStorage.setItem('avatarUrl', smallAvatarUrl);
    };


    var jcrop_api;
    var initImageCrop = function() {

        // Create variables (in this scope) to hold the API and image size
        var boundx,
            boundy,
            // Grab some information about the preview pane
            $preview = $('#preview-pane'),
            $pcnt = $('#preview-pane .preview-container'),
            $pimg = $('#preview-pane .preview-container img'),

            xsize = $pcnt.width(),
            ysize = $pcnt.height();

        $('#demo8').Jcrop({
            aspectRatio: 1,
            onSelect: updateCoords,
            onChange: updatePreview
        }, function() {
            // Use the API to get the real image size
            var bounds = this.getBounds();
            boundx = bounds[0];
            boundy = bounds[1];
            // Store the API in the jcrop_api variable
            jcrop_api = this;
            // Move the preview into the jcrop container for css positioning
            $preview.appendTo(jcrop_api.ui.holder);
        });

        function updateCoords(c) {
            $('#crop_x').val(c.x);
            $('#crop_y').val(c.y);
            $('#crop_w').val(c.w);
            $('#crop_h').val(c.h);

            updatePreview(c);
        }

        $('#saveAvatar').on('click', function() {

            if ($('#crop_w').val() == '') {
                bsTips('请选择头像裁切区域后再保存.');
                return false;
            }
            var data = 1;
            $.ajax({
                url: getRootPath(1) + '/demo/cropImage.php',
                data: {
                    src: avatarUrl(),
                    filename: avatarName,
                    x: $('#crop_x').val(),
                    y: $('#crop_y').val(),
                    w: $('#crop_w').val(),
                    h: $('#crop_h').val()
                },
                success: function(data) {
                    var obj = $.parseJSON(data);
                    bsTips(obj.msg, obj.status);
                    refreshUserHeadInfo();
                    updateAvatarStatus();
                },
                error: function(data) {
                    console.log(data);
                }
            });

        });

        function updateAvatarStatus() {
            var strUrl = getRootPath() + "/DataInterface/update";
            var iData = {
                tbl: TBL.USR,
                id: $('.username').data('uid'),
                set_avatar: 1
            }
            $.ajax({
                url: strUrl,
                type: 'POST',
                data: iData,
                success: function(data) {
                    var obj = $.parseJSON(data);
                    bsTips(obj.message, obj.type);
                    setTimeout(reLogin,3000);
                },
                error: function(data) {
                    bsTips("更新数据失败，请稍后重试或联系管理员!");
                    infoTips(JSON.stringify(data));
                }
            });
        }

        function updatePreview(c) {
            if (parseInt(c.w) > 0) {
                var rx = xsize / c.w;
                var ry = ysize / c.h;

                $pimg.css({
                    width: Math.round(rx * boundx) + 'px',
                    height: Math.round(ry * boundy) + 'px',
                    marginLeft: '-' + Math.round(rx * c.x) + 'px',
                    marginTop: '-' + Math.round(ry * c.y) + 'px'
                });
            }
        }

    };

    var reloadCropSource = function() {

        //通过JS加载，否则在重新更换图像之后，Preview控制不会初始化
        var previewHtml = '<div id="preview-pane">\n<div class="preview-container">\n<img name="hisAvatar" src="../../assets/pages/media/profile/Avatar_none.jpg" class="jcrop-preview" alt="Preview" />\n</div>\n</div>';
        $('#demo8_form').parent().prepend(previewHtml);

        $('[name="hisAvatar"]').attr('src', avatarUrl());

        if (typeof jcrop_api != 'undefined') {
            jcrop_api.destroy();
        }

        initImageCrop();
    };

    var initAvatarImages = (function() {
        var avatar = $('.username').data('set-avatar') == 1;
        if (avatar) {
            reloadCropSource();
        } else {
            bsTips('尚未上传头像文件，请选择图像并上传');
        }
        /*var avatar = avatarUrl();
        $.ajax({
            url: avatar,
            success: function() {
                reloadCropSource();
            },
            error: function() {
                bsTips('尚未上传头像文件，请选择图像并上传');
            }
        });*/
    })();

    $('#submitAvatar').on('click', function() {
        var formData = new FormData($("#avatarForm")[0]);
        formData.append(
            "avatarName", avatarName
        );
        $.ajax({
            url: getRootPath(1) + "/demo/upload_avatar.php",
            type: 'POST',
            data: formData,
            async: false,
            cache: false,
            contentType: false,
            processData: false,
            success: function(data) {
                var obj = $.parseJSON(data);
                bsTips(obj.msg, obj.status);
                reloadCropSource();
            },
            error: function(obj) {
                infoTips(obj);
            }
        });
    });

    var handleResponsive = function() {
        if ($(window).width() <= 1024 && $(window).width() >= 678) {
            $('.responsive-1024').each(function() {
                $(this).attr("data-class", $(this).attr("class"));
                $(this).attr("class", 'responsive-1024 col-md-12');
            });
        } else {
            $('.responsive-1024').each(function() {
                if ($(this).attr("data-class")) {
                    $(this).attr("class", $(this).attr("data-class"));
                    $(this).removeAttr("data-class");
                }
            });
        }
    };

    return {
        //main function to initiate the module
        init: function() {
            if (!jQuery().Jcrop) {
                return;
            }

            App.addResizeHandler(handleResponsive);
            handleResponsive();
        }
    };

}();

var handleBasicInfo = function() {

    var loadDepartmentInfo = function() {
        //SELECT a.DptID, a.DepartMentName FROM dbo.tblDepartMent AS a 
        var str = getRootPath(1) + "/DataInterface/Api?Token=79d84495ca776ccb523114a2120e273ca80b315b&ID=163&M=3";
        var Data = ReadData(str);
        InitSelect("department", Data);
    }();

    function loadUserBasicInfo() {
        //SELECT a.FullName, b.DepartMentName, b.DptID,a.Phone, a.Email FROM dbo.tblUser AS a INNER JOIN dbo.tblDepartMent AS b ON b.DptID = a.DepartMent where username=? 
        var str = getRootPath(1) + "/DataInterface/Api?Token=79d84495ca776ccb523114a2120e273ca80b315b&ID=164&M=3&u=" + $('.username').text().trim();
        var Data = ReadData(str);
        var userInfo = Data.data[0];
        $('.profile-usertitle-name').text(userInfo[0]);
        $('.profile-usertitle-job').text(userInfo[2]);
        $('input[name="FullName"]').val(userInfo[0]);
        SetSelectVal("department", userInfo[1]);
        $('input[name="Phone"]').val(userInfo[3]);
        $('input[name="Email"]').val(userInfo[4]);
    }

    $('[name="restore"]').on('click', function() {
        loadUserBasicInfo();
    });

    $('[name="saveUserInfo"]').on('click', function() {
        var strUrl = getRootPath() + "/DataInterface/update";
        var iData = getFormData('userInfo');
        iData.tbl = TBL.USR;
        iData.utf2gbk = ['FullName'];
        iData.id = $('.username').data('uid');

        $.ajax({
            url: strUrl,
            type: 'POST',
            data: iData,
            success: function(data) {
                var obj = $.parseJSON(data);
                bsTips(obj.message, obj.type);
            },
            error: function(data) {
                bsTips("更新数据失败，请稍后重试或联系管理员!");
                infoTips(JSON.stringify(data));
            }
        });
    });

    var handleValidate = function() {

        $('form[name="userInfo"]').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: true, // do not focus the last invalid input
            rules: {
                FullName: {
                    required: true,
                    minlength: 2
                },
                Phone: {
                    required: true,
                    number: true,
                    minlength: 4
                },
                department: {
                    required: true,
                    min: 1
                },
                Email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                FullName: {
                    required: "姓名不能为空."
                },
                Phone: {
                    required: "电话不能为空."
                },
                Email: {
                    required: "Email是您重置密码的唯一凭证."
                },
                department: {
                    required: "请选择部门信息",
                    min: "请选择部门信息"
                }
            },
            highlight: function(element) { // hightlight error inputs
                $(element).closest('.form-group').addClass('has-error'); // set error class to the control group
            },
            success: function(label) {
                label.closest('.form-group').removeClass('has-error');
                label.remove();
            },
            submitHandler: function(form) {}
        });
    }();

    return {
        init: loadUserBasicInfo
    };
}();

    function reLogin() {
        window.location.href = getRootPath() + "/welcome/lockscreen";
    }

var handleUserPassword = function(psw) {
    //用户密码校验
    function pswValidate(psw) {
        //PSW Validate:
        //SELECT a.ID FROM dbo.tblUser AS a where a.ID = ? and UserPassword=?

        var str = getRootPath(1) + "/DataInterface/Api?Token=79d84495ca776ccb523114a2120e273ca80b315b&ID=165&M=3&uid=" + $('.username').data('uid') + "&psw=" + psw;
        var Data = ReadData(str);
        return Data.rows;
    }


    $('[name="changePsw"]').on('click', function() {

        var iData = getFormData('userPsw');
        var updateData = {};
        $.ajax({
            url: getRootPath() + "/DataInterface/md5?oldPsw=" + iData.oldPsw + "&newPsw=" + iData.newPsw,
            async: false,
            success: function(data) {
                var obj = $.parseJSON(data);
                updateData = {
                    UserPassword: obj.oldPsw,
                    newPsw: obj.newPsw
                }
            },
            error: function(data) {
                bsTips("密码校验失败，请稍后重试或联系管理员!");
                infoTips(JSON.stringify(data));
            }
        });

        if (!pswValidate(updateData.UserPassword)) {
            bsTips('原密码输入错误，请重新输入');
            $('input[name="oldPsw"]').focus();
            return
        }

        updateData.id = $('.username').data('uid');

        $.ajax({
            url: getRootPath() + "/settings/updatepsw",
            type: 'GET',
            data: updateData,
            success: function(data) {
                var obj = $.parseJSON(data);
                bsTips(obj.message + "<br>请3秒钟之后重新登录", obj.type);
                setTimeout(reLogin, 3000);
            },
            error: function(data) {
                bsTips("更新数据失败，请稍后重试或联系管理员!");
                infoTips(JSON.stringify(data));
            }
        });

    });
    /*
    $('input[name="oldPsw"]').on('blur',function(){
        bsTips('leavePsw');
    })*/
    //清空数据
    $('[name="clearPsw"]').on('click', function() {
        $('form[name="userPsw"] input').val('');
    });

    var handleValidate = function() {

        $('form[name="userPsw"]').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: true, // do not focus the last invalid input
            rules: {
                oldPsw: {
                    required: true
                },
                newPsw: {
                    required: true,

                    minlength: 5
                },
                rptPsw: {
                    equalTo: "[name='newPsw']"
                }
            },
            messages: {
                oldPsw: {
                    required: "原密码不能为空."
                },
                newPsw: {
                    required: "密码不能为空."
                },
                rptPsw: {
                    required: "密码不能为空."
                }
            },
            highlight: function(element) { // hightlight error inputs
                $(element).closest('.form-group').addClass('has-error'); // set error class to the control group
            },
            success: function(label) {
                label.closest('.form-group').removeClass('has-error');
                label.remove();
            },
            submitHandler: function(form) {}
        });
    }();

}();

jQuery(document).ready(function() {
    initDom();
    UIIdleTimeout.init();
    handleAvatar.init();
    handleBasicInfo.init();
});

jQuery(window).resize(function() {
    HeadFix();
});