var handleAvatar = function() {
    //按ID+用户名BASE64编码存储文件名
    var avatarName = $('.username').data('avatar');//$.base64.encode($('.username').data('uid') + $('.username').text().trim());
    var avatarUrl = function() {
        //增加时间戳防止缓存
        return getRootPath(1) + '/demo/upload/' + avatarName + '.jpg?' + Date.parse(new Date());
    };

    var refreshUserHeadInfo = function(smallAvatarName) {
        if(typeof smallAvatarName == 'undefined'){
            smallAvatarName = avatarName;
        }
        var avatarUrl = getRootPath(1) + '/demo/avatar/' + smallAvatarName + '.jpg?' + Date.parse(new Date());
        $('.profile-userpic img').attr('src', avatarUrl);
        $('.username').parent().find('img').attr('src', avatarUrl);
    };

   var initAvatarImages = (function() {
        var avatar = avatarUrl();
        $.ajax({
            url: avatar,
            success: function() {
                reloadCropSource();
            },
            error: function() {
                bsTips('尚未上传头像文件，请选择图像并上传');
            }
        });
    })();

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
                },
                error: function(data) {
                    console.log(data);
                }
            });

        });


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

var handleBasicInfo = function(){
    function loadBasicInfo(){
        /*
        SQL:
        SELECT
            a.FullName,
            a.Phone,
            a.DepartMent
        FROM
        dbo.tblUser AS a where a.id=


         */
    }

    return {
        init:function(){
            loadBasicInfo();
        }
    };
}();


jQuery(document).ready(function() {
    initDom();
    UIIdleTimeout.init();
    handleAvatar.init();
});

jQuery(window).resize(function() {
    HeadFix();
});