var accountActive = function() {
    function initDOM() {
        var str = getRootPath(1) + "/DataInterface/Api?Token=79d84495ca776ccb523114a2120e273ca80b315b&ID=43&M=0";
        var Data = ReadData(str);
        var strTr='';
        if (Data.rows > 0) {
            Data.data.map(function(elem) {
                strTr += "<tr><td>" + elem['FullName'] + "</td><td> " + elem['DepartMentName'] + " </td><td> " + elem['regTime'] + "</td><td><a href=\"javascript:;\" class=\"btn sbold uppercase btn-outline blue\" data-id=\"" + elem['id'] + "\"><i class=\"fa fa-unlink\"></i>激活帐户</a></td></tr>";
            });
            $('table[name="accountList"] tbody').html(strTr);
        } else {
            $('table[name="accountList"] tbody').html("<tr><td class=\"text-center\" colspan=\"4\">近期无新的帐户激活申请</td></tr>");
        }
    }

    $('table[name="accountList"] tbody').on('click', 'a', function() {
        var id = $(this).data('id');
        var obj = $(this);
        var strUrl = getRootPath() + "/DataInterface/update";
        $.ajax({
            type: 'POST',
            async: false,
            url: strUrl,
            data: {
                "id": id,
                "UserRole": 9,
                "tbl": TBL.USR
            },
            success: function() {
                bsTips("帐户成功激活，现在即可登录", 2);
                //删除对应的项
                $('table a').parents('tr').remove();
                if ($('table a').length === 0) {
                    $('table[name="accountList"] tbody').html("<tr><td class=\"text-center\" colspan=\"4\">近期无新的帐户激活申请</td></tr>");
                }
            },
            error: function(data) {
                infoTips("帐户激活失败，请联系系统管理员!", 0);
                infoTips(JSON.stringify(data));
            }
        });
    });

    var loadUserBasicInfo = function() {
        //SELECT a.FullName, b.DepartMentName, a.Phone, a.Email FROM dbo.tblUser AS a INNER JOIN dbo.tblDepartMent AS b ON b.DptID = a.DepartMent where username=? 
        var str = getRootPath(1) + "/DataInterface/Api?Token=79d84495ca776ccb523114a2120e273ca80b315b&ID=164&M=3&u=" + $('.username').text().trim();
        var Data = ReadData(str);
        var userInfo = Data.data[0];
        $('.profile-usertitle-name').text(userInfo[0]);
        $('.profile-usertitle-job').text(userInfo[2]);
    }();

    return {
        init: function() {
            initDOM();
            $('.page-header .dropdown-quick-sidebar-toggler').hide();
        }
    };
}();

jQuery(document).ready(function() {
    initDom();
    UIIdleTimeout.init();
    accountActive.init();
});

jQuery(window).resize(function() {
    HeadFix();
});