var previewSidebar = function() {

    var resBreakpointMd = App.getResponsiveBreakpoint('md');

    // Handles sidebar toggler to close/hide the sidebar.
    var handleFixedSidebarHoverEffect = function() {
        var body = $('#menuPreviewDetail');
        if (body.hasClass('page-sidebar-fixed')) {
            $('#menuPreviewDetail .page-sidebar').on('mouseenter', function() {
                if (body.hasClass('page-sidebar-closed')) {
                    $(this).find('.page-sidebar-menu').removeClass('page-sidebar-menu-closed');
                }
            }).on('mouseleave', function() {
                if (body.hasClass('page-sidebar-closed')) {
                    $(this).find('.page-sidebar-menu').addClass('page-sidebar-menu-closed');
                }
            });
        }
    };

    // Set proper height for sidebar and content. The content and sidebar height must be synced always.
    var handleSidebarAndContentHeight = function() {
        var content = $('#menuPreviewDetail .page-content');
        var sidebar = $('#menuPreviewDetail .page-sidebar');
        var body = $('#menuPreviewDetail');
        var height;

        if (body.hasClass("page-footer-fixed") === true && body.hasClass("page-sidebar-fixed") === false) {
            var available_height = App.getViewPort().height - $('.page-footer').outerHeight() - $('.page-header').outerHeight();
            if (content.height() < available_height) {
                content.attr('style', 'min-height:' + available_height + 'px');
            }
        } else {
            if (body.hasClass('page-sidebar-fixed')) {
                height = _calculateFixedSidebarViewportHeight();
                if (body.hasClass('page-footer-fixed') === false) {
                    height = height - $('.page-footer').outerHeight();
                }
            } else {
                var headerHeight = $('.page-header').outerHeight();
                var footerHeight = $('.page-footer').outerHeight();

                if (App.getViewPort().width < resBreakpointMd) {
                    height = App.getViewPort().height - headerHeight - footerHeight;
                } else {
                    height = sidebar.height() + 20;
                }

                if ((height + headerHeight + footerHeight) <= App.getViewPort().height) {
                    height = App.getViewPort().height - headerHeight - footerHeight;
                }
            }
            content.attr('style', 'min-height:' + height + 'px');
        }
    };

    var _calculateFixedSidebarViewportHeight = function() {
        var sidebarHeight = App.getViewPort().height - $('.page-header').outerHeight(true);
        if ($('body').hasClass("page-footer-fixed")) {
            sidebarHeight = sidebarHeight - $('.page-footer').outerHeight();
        }

        return sidebarHeight;
    };

    // Handle sidebar menu
    var handleSidebarMenu = function() {
        // handle sidebar link click
        $('#menuPreviewDetail .page-sidebar-menu').on('click', 'li > a.nav-toggle, li > a > span.nav-toggle', function(e) {
            var that = $(this).closest('.nav-item').children('.nav-link');

            if (App.getViewPort().width >= resBreakpointMd && !$('#menuPreviewDetail .page-sidebar-menu').attr("data-initialized") && $('body').hasClass('page-sidebar-closed') && that.parent('li').parent('.page-sidebar-menu').size() === 1) {
                return;
            }

            var hasSubMenu = that.next().hasClass('sub-menu');

            if (App.getViewPort().width >= resBreakpointMd && that.parents('#menuPreviewDetail .page-sidebar-menu-hover-submenu').size() === 1) { // exit of hover sidebar menu
                return;
            }

            if (hasSubMenu === false) {
                if (App.getViewPort().width < resBreakpointMd && $('#menuPreviewDetail .page-sidebar').hasClass("in")) { // close the menu on mobile view while laoding a page 
                    $('.page-header .responsive-toggler').click();
                }
                return;
            }

            if (that.next().hasClass('sub-menu always-open')) {
                return;
            }

            var parent = that.parent().parent();
            var the = that;
            var menu = $('#menuPreviewDetail .page-sidebar-menu');
            var sub = that.next();

            var autoScroll = menu.data("auto-scroll");
            var slideSpeed = parseInt(menu.data("slide-speed"));
            var keepExpand = menu.data("keep-expanded");

            if (!keepExpand) {
                parent.children('li.open').children('a').children('.arrow').removeClass('open');
                parent.children('li.open').children('.sub-menu:not(.always-open)').slideUp(slideSpeed);
                parent.children('li.open').removeClass('open');
            }

            var slideOffeset = -200;

            if (sub.is(":visible")) {
                $('.arrow', the).removeClass("open");
                the.parent().removeClass("open");
                sub.slideUp(slideSpeed, function() {
                    if (autoScroll === true && $('#menuPreviewDetail').hasClass('page-sidebar-closed') === false) {
                        if ($('#menuPreviewDetail').hasClass('page-sidebar-fixed')) {
                            menu.slimScroll({
                                'scrollTo': (the.position()).top
                            });
                        } else {
                            App.scrollTo(the, slideOffeset);
                        }
                    }
                    handleSidebarAndContentHeight();
                });
            } else if (hasSubMenu) {
                $('.arrow', the).addClass("open");
                the.parent().addClass("open");
                sub.slideDown(slideSpeed, function() {
                    if (autoScroll === true && $('#menuPreviewDetail').hasClass('page-sidebar-closed') === false) {
                        if ($('#menuPreviewDetail').hasClass('page-sidebar-fixed')) {
                            menu.slimScroll({
                                'scrollTo': (the.position()).top
                            });
                        } else {
                            App.scrollTo(the, slideOffeset);
                        }
                    }
                    handleSidebarAndContentHeight();
                });
            }

            e.preventDefault();
        });

        // handle scrolling to top on responsive menu toggler click when header is fixed for mobile view
        $('#menuPreviewDetail').on('click', '.page-header-fixed-mobile .page-header .responsive-toggler', function() {
            App.scrollTop();
        });

        // handle sidebar hover effect        
        handleFixedSidebarHoverEffect();
    };

    // Handles fixed sidebar
    var handleFixedSidebar = function() {
        var menu = $('#menuPreviewDetail .page-sidebar-menu');

        App.destroySlimScroll(menu);

        if ($('#menuPreviewDetail .page-sidebar-fixed').size() === 0) {
            handleSidebarAndContentHeight();
            return;
        }

        if (App.getViewPort().width >= resBreakpointMd) {
            menu.attr("data-height", _calculateFixedSidebarViewportHeight());
            App.initSlimScroll(menu);
            handleSidebarAndContentHeight();
        }
    };

    // Hanles sidebar toggler
    var handleSidebarToggler = function() {
        var body = $('#menuPreviewDetail');

        // handle sidebar show/hide
        $('#menuPreviewDetail').on('click', '.sidebar-toggler', function(e) {
            var sidebar = $('#menuPreviewDetail .page-sidebar');
            var sidebarMenu = $('#menuPreviewDetail .page-sidebar-menu');

            if (body.hasClass("page-sidebar-closed")) {
                body.removeClass("page-sidebar-closed");
                sidebarMenu.removeClass("page-sidebar-menu-closed");
                if ($.cookie) {
                    $.cookie('sidebar_closed', '0');
                }
            } else {
                body.addClass("page-sidebar-closed");
                sidebarMenu.addClass("page-sidebar-menu-closed");
                if (body.hasClass("page-sidebar-fixed")) {
                    sidebarMenu.trigger("mouseleave");
                }
            }

            $(window).trigger('resize');
        });

    };

    return {
        init: function() {
            //layout handlers
            handleFixedSidebar(); // handles fixed sidebar menu
            handleSidebarMenu(); // handles main menu
            handleSidebarToggler(); // handles sidebar hide/show

            App.addResizeHandler(handleFixedSidebar); // reinitialize fixed sidebar on window resize 
        }
    };
}();

var customizeMenu = function() {
    //全局UID
    var uid = $('.username').data('uid');
    //存储个人菜单列表项
    var menuDetailObj = [];

    //存储转换之后的数据
    var menuDetailConv = [];

    var resetMenuList = function() {
        //更新菜单列表内容
        $('#menuDetail .task-list .task-checkbox').parent().removeClass('task-done');
        $('#menuDetail .task-list .liChild').parent().removeClass('checked');
    };

    function getListStr(obj) {
        var strList = '<li>';
        strList += '<div class="task-checkbox">';
        strList += '        <input type="hidden"  value="' + obj.id + '"/>';
        strList += '        <div class="checker"><span><input type="checkbox" class="liChild" value="' + obj.id + '"/></span></div>';
        strList += '    </div>';
        strList += '    <div class="task-title">';
        strList += '        <span class="task-title-sp">';
        strList += '        <a>' + obj.name + ' </a></span>';
        strList += '    </div>';
        strList += '    <div class="task-config">';
        strList += '        <div class="task-config-btn btn-group">';
        strList += '            <a class="btn btn-xs default" href="#" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">';
        strList += '            <i class="fa fa-cog"></i><i class="fa fa-angle-down"></i>';
        strList += '            </a>';
        strList += '             <ul class="dropdown-menu pull-right">';
        /*strList += '                <li class="complete">';
        strList += '                    <a href="javascript:;">';
        strList += '                    <i class="fa fa-check"></i> 完成 </a>';
        strList += '                </li>';*/
        strList += '                <li class="edit"  data-id="' + obj.id + '">';
        strList += '                    <a href="javascript:;">';
        strList += '                    <i class="fa fa-pencil"></i> 编辑 </a>';
        strList += '                </li>';
        strList += '            </ul>';
        strList += '        </div>';
        strList += '    </div>';
        strList += '</li>';
        return strList;
    }

    //菜单列表
    var menuList = function() {
        return {
            init: function() {

                function InitSettingSelect(sel_Name, Data) {
                    var i, str = '<option value="-1"></option>';
                    for (i = 0; i < Data.rows; i++) {
                        str += '<option value="' + Data.data[i].id + '" data-userid="' + Data.data[i].user_id + '" data-share="' + Data.data[i].share + '"' + " data-seg='" + GBK2UTF(Data.data[i].segment_json) + "'>" + Data.data[i].name + '</option>';
                    }
                    $("select[name='" + sel_Name + "']").html(str);
                }

                //初始化DOM
                var initDOM = function() {

                    if (getUrlParam('debug') == 1) {
                        $('#menuPreviewList_output').parents('.portlet').removeClass('hide');
                    }

                    var str = getRootPath(1) + "/DataInterface/Api?Token=79d84495ca776ccb523114a2120e273ca80b315b&ID=45&M=0&uid=" + uid;
                    var Data = ReadData(str);
                    InitSettingSelect("menu_list", Data);

                    $('.page-header .dropdown-quick-sidebar-toggler').hide();
                    $.fn.select2.defaults.set("theme", "bootstrap");
                    $(".select2").select2({
                        width: null,
                        placeholder: '请选择要编辑的菜单'
                    });

                    //载入菜单项
                    loadAllMenu();
                }();

                //重置菜单项

                function resetMenu() {
                    //$('#menuDetail .task-list').html('');
                    resetMenuList();
                    //$('#menuEdit select').html('');

                    //$('#menuPreviewList').html('<ol class="dd-list"></ol>');
                }


                //增加新菜单项
                $('#newMenu [name="save"]').on('click', function() {
                    if ($(this).data('mode') == 'add') {
                        addMenu();
                    } else {
                        editMenu();
                    }
                });

                function addMenu() {
                    var strUrl = getRootPath() + "/DataInterface/insert";
                    var iData = {
                        "tbl": TBL.SETTINGS_MENULIST,
                        "name": $('#newMenu [name="menuName"]').val(),
                        "user_id": uid,
                        "share": ($('#newMenu [name="share"]').attr('checked') === 'checked') ? 1 : 0,
                        "utf2gbk": ['name'],
                        "hide": 0
                    };
                    if (iData.name === '') {
                        bsTips('菜单名不能为空');
                        return;
                    }
                    $.post(strUrl, iData, function(data, status) {
                        var obj = $.parseJSON(data);
                        if (status == "success") {
                            $('select[name="menu_list"]').append('<option value="' + obj.id + '" data-share="' + iData.share + '" data-userid="' + uid + '">' + iData.name + '</option>');
                            $('#newMenu [name="menuName"]').val('');
                            $('#newMenu [name="share"]').parent().removeClass('checked');

                            if (iData.share) {
                                $('#menuList [name="share"]').parent().addClass("checked");
                            } else {
                                $('#menuList [name="share"]').parent().removeClass("checked");
                            }
                            //隐藏菜单
                            $('#newMenu [name="cancel"]').click();
                            resetMenu();
                            bsTips('菜单项添加成功', 2);
                        } else {
                            bsTips("添加失败，请稍后重试或联系管理员!", 0);
                            infoTips(JSON.stringify(data));
                        }
                    });
                }

                function editMenu() {
                    var strUrl = getRootPath() + "/DataInterface/update";
                    var iData = {
                        "tbl": TBL.SETTINGS_MENULIST,
                        "name": $('#newMenu [name="menuName"]').val(),
                        "id": $('#newMenu [name="save"]').data('id'),
                        "share": ($('#newMenu [name="share"]').attr('checked') === 'checked') ? 1 : 0,
                        "utf2gbk": ['name']
                    };
                    if (iData.name === '') {
                        bsTips('菜单名不能为空');
                        return;
                    }
                    $.post(strUrl, iData, function(data, status) {
                        var obj = $.parseJSON(data);
                        if (status == "success") {
                            $('select[name="menu_list"]').find('option:selected').data('share', iData.share).text(iData.name);
                            $(".select2").select2({
                                width: null,
                                placeholder: '请选择要编辑的菜单'
                            });
                            if (iData.share) {
                                $('#menuList [name="share"]').parent().addClass("checked");
                            } else {
                                $('#menuList [name="share"]').parent().removeClass("checked");
                            }
                            //隐藏菜单
                            $('#newMenu [name="cancel"]').click();
                            //resetMenu();
                            bsTips('菜单项更新成功', 2);
                        } else {
                            bsTips("更新失败，请稍后重试或联系管理员!", 0);
                            infoTips(JSON.stringify(data));
                        }
                    });
                }

                function menuEditValidata() {
                    //Develop 帐户可以保存
                    if (uid == 15) {
                        return true;
                    }
                    if ($('select[name="menu_list"]').val() < 1) {
                        bsTips('默认菜单不允许修改');
                        return false;
                    } else if ($('select[name="menu_list"]').find('option:selected').data('userid') != uid) {
                        bsTips('其它人的菜单不允许修改');
                        return false;
                    }
                    return true;
                }

                $('#menuList [name="share"]').change(function() {
                    var strUrl = getRootPath() + "/DataInterface/update";
                    var objCheck = $(this);
                    var objList = $('select[name="menu_list"]');
                    var iData = {
                        "tbl": TBL.SETTINGS_MENULIST,
                        "share": ($(this).attr('checked') === 'checked') ? 0 : 1,
                        "id": objList.val()
                    };
                    if (!menuEditValidata()) {
                        if (iData.id >= 0) {
                            objCheck.parent().addClass('checked');
                        }
                        return;
                    }
                    $.post(strUrl, iData, function(data, status) {
                        var obj = $.parseJSON(data);
                        if (status == "success") {
                            bsTips('菜单项分享状态修改成功', 2);
                            if (iData.share == 1) {
                                objList.find('option:selected').data('share', 1);
                                objCheck.parent().addClass("checked");
                            } else {
                                objList.find('option:selected').data('share', 0);
                                objCheck.parent().removeClass("checked");
                            }
                        } else {
                            bsTips("修改失败，请稍后重试或联系管理员!", 0);
                            infoTips(JSON.stringify(data));
                        }
                    });
                });

                //删除菜单项
                $('body').on('confirmed.bs.confirmation', '#menuOper [name="del"]', function() {
                    var strUrl = getRootPath() + "/DataInterface/update";
                    if (!menuEditValidata()) {
                        return;
                    }
                    var iData = {
                        "tbl": TBL.SETTINGS_MENULIST,
                        "id": $(this).data('id'),
                        "hide": 1
                    };
                    $.post(strUrl, iData, function(data, status) {
                        if (status == "success") {
                            $('select[name="menu_list"]').find('option:selected').remove();
                            SetSelect2Val('menu_list', -1);
                            //清除数据
                            resetMenu();
                            bsTips('菜单项删除成功', 2);
                        } else {
                            bsTips("删除失败，请稍后重试或联系管理员!", 0);
                            infoTips(JSON.stringify(data));
                        }
                    });
                });

                //删除菜单时，取消按钮点击事件
                $('body').on('canceled.bs.confirmation', '#menuOper [name="del"]', function() {
                    $('#menuOper [name="del"]').click();
                });

                //保存菜单设置
                $('#menuOper').on('click', '[name="save"]', function() {
                    saveMenuHtml();
                });

                //设为默认菜单
                $('#menuOper').on('click', '[name="active"]', function() {
                    //保存菜单设置
                    //saveMenuHtml();

                    //激活菜单
                    var strUrl = getRootPath() + "/DataInterface/update";
                    var iData = {
                        "tbl": TBL.USR,
                        "id": uid,
                        "default_menu_id": $('select[name="menu_list"]').val()
                    };

                    $.post(strUrl, iData, function(data, status) {
                        //本地缓存更新
                        //quaCenter.settings.default_menu;
                        localStorage.settings_default_menu = UTF2GBK($('#menuPreviewDetail').html());
                        loadMenuSettings();
                        bsTips('菜单项已成功设置', 2);
                    });
                });

                function saveMenuHtml() {
                    var strUrl = getRootPath() + "/DataInterface/update";
                    if (!menuEditValidata()) {
                        bsTips('菜单信息未保存', 1);
                        return;
                    }

                    var iData = {
                        "tbl": TBL.SETTINGS_MENULIST,
                        "id": $('#menuOper [name="save"]').data('id'),
                        "segment_json": UTF2GBK($('#menuPreviewList_output').val()),
                        "segment_html": UTF2GBK($('#menuPreviewDetail').html())
                    };

                    $.post(strUrl, iData, function(data, status) {
                        $('select[name="menu_list"]').find('option:selected').data('seg', $('#menuPreviewList_output').val());
                        bsTips('菜单信息保存成功', 2);
                    });
                }

                function restoreModal(mode) {
                    $('#newMenu [name="save"]').attr('disabled', false);
                    if (mode == 'add') {
                        $('#newMenu h4').text('添加新菜单');
                        $('#newMenu [name="menuName"]').val('');
                        $('#newMenu [name="share"]').parent().removeClass("checked");
                        $('#newMenu [name="save"]').text('添加菜单');
                        $('#newMenu [name="save"]').data('mode', 'add');
                        //添加项
                    } else {
                        $('#newMenu h4').text('编辑菜单');
                        $('#newMenu [name="menuName"]').val(GetSelect2Text('menu_list'));
                        if ($('select[name="menu_list"]').find('option:selected').data('share') == 1) {
                            $('#newMenu [name="share"]').parent().addClass('checked');
                        } else {
                            $('#newMenu [name="share"]').parent().removeClass("checked");
                        }
                        $('#newMenu [name="save"]').text('更新菜单').data('mode', 'edit').data('id', $('select[name="menu_list"]').val());
                    }
                }

                $('#menuList [name="add"]').click(function() {
                    restoreModal('add');
                });

                $('#menuList [name="rename"]').click(function() {
                    if (!menuEditValidata()) {
                        $('#newMenu [name="save"]').attr('disabled', true); //禁止提交
                        return;
                    }
                    restoreModal('edit');
                });

                /**
                 * 菜单编辑相关
                 */

                //解析序列化字符串

                function decodeSerial(seg) {
                    var item = [];

                    function decode() {
                        seg.map(function(index, elem) {
                            item.push(index.id);
                            if (typeof index.children !== 'undefined') {
                                item = decode(index.children, item);
                            }
                        });
                        return item;
                    }
                    return item;
                }

                function getSelectListStr(obj) {
                    if (jsLeft(obj.url, 7) !== "http://" && jsLeft(obj.url, 10) !== "javascript" && jsLeft(obj.url, 1) !== "/") {
                        obj.url = /*getRootPath() +*/ '/' + obj.url;
                    }
                    return '<option value="' + obj.id + '" data-userid="' + obj.user_id + '" data-share="' + obj.share + '" data-url="' + obj.url + '" data-type="' + obj.type + '" data-icon="' + obj.icon + '">' + obj.name + '</option>';
                }
                //载入所有菜单项

                function loadAllMenu() {
                    var str = getRootPath(1) + "/DataInterface/Api?Token=79d84495ca776ccb523114a2120e273ca80b315b&ID=46&M=0&uid=" + uid;
                    menuDetailObj = ReadData(str);
                    var menuEditObj = $('select[name="menuDetail"]');
                    $('#menuPreviewList').append('<ol class="dd-list"></ol>');

                    str = '<option value="-1"></option>';
                    var iCount = 0;
                    menuDetailObj.data.map(function(index, elem) {
                        if (iCount % 2 === 0) {
                            $('#menuDetail .task-list').last().append(getListStr(index));
                        } else {
                            $('#menuDetail .task-list').first().append(getListStr(index));
                        }
                        str += getSelectListStr(index);
                        iCount++;
                    });
                    menuEditObj.html(str);
                    $('li.del a').confirmation();
                }

                $('select[name="menuDetail"]').on('change', function() {
                    if ($(this).val() == -1) {
                        $('#menuEdit [name="name"]').val('');
                        $('#menuEdit [name="url"]').val('');
                        $('#menuEdit [name="share"]').parent().removeClass('checked');
                        $('[data-target="#icon_library"]').html('');
                        return;
                    }
                    var item = {};
                    item.val = $(this).val();
                    item.name = GetSelect2Text('menuDetail');
                    var obj = $('select[name="menuDetail"]').find('option[value="' + item.val + '"]');
                    item.url = obj.data('url');
                    item.userid = obj.data('userid');
                    item.share = obj.data('share');
                    item.icon = obj.data('icon');

                    if (item.userid != uid) {
                        bsTips('其它人的菜单不允许修改');
                        clearInput();
                        return false;
                    }
                    $('input[name="name"]').val(item.name);
                    $('input[name="url"]').val(item.url);
                    if (item.share == "1") {
                        $('#menuEdit [name="share"]').parent().addClass("checked");
                    } else {
                        $('#menuEdit [name="share"]').parent().removeClass("checked");
                    }
                    if (item.icon !== 'undefined') {
                        $('[data-target="#icon_library"]').html(GBK2UTF(item.icon));
                    }
                });

                $('#menuDetail').on('click', 'li.edit', function() {
                    SetSelect2Val('menuDetail', $(this).data('id'));
                });

                //ICONS编辑
                $('#icon_library .bs-glyphicons li').click(function() {
                    $('[data-target="#icon_library"]').html($(this).html());
                    $('#icon_library .modal-footer button').click();
                });
            }
        };
    }();

    //输出序列化字符串
    var updateOutput = function(e) {
        var list = e.length ? e : $(e.target),
            output = list.data('output');
        if (window.JSON) {
            output.val(window.JSON.stringify(list.nestable('serialize'))); //, null, 2));
        } else {
            output.val('JSON browser support required for this demo.');
        }
    };

    /**
     * [Serial2DOM 序列化字符串转换为DOM项]
     * @param {[type]} selecter [选择器]
     * @param {[type]} data     [serial数据]
     * @param {[type]} type     [1：拖拽控件；0：菜单预览项]
     */
    var Serial2DOM = function(selecter, data, type) {
        function step(data, str) {
            if (str) {
                str += '<ol class="dd-list">';
            }
            data.map(function(index, elem) {
                //更新菜单列表内容
                $('#menuDetail .task-list input[value="' + index.id + '"]').parents('li').addClass('task-done');
                $('#menuDetail .task-list .liChild[value=' + index.id + ']').parent().addClass('checked');
                str += '<li class="dd-item" data-id="' + index.id + '">';
                if (typeof index.children !== 'undefined') {
                    str += '<button data-action="collapse" type="button" style="display: block;">Collapse</button>';
                    str += '<button data-action="expand" type="button" style="display: none;">Expand</button>';
                    str += '      <div class="dd-handle"> ' + menuDetailConv[index.id].name + ' </div>';
                    str = step(index.children, str);
                } else {
                    str += '      <div class="dd-handle"> ' + menuDetailConv[index.id].name + ' </div>';
                }
                str += ' </li>';
            });
            return str + '</ol>';
        }

        /**
         * [step2 Data2HTML预览]
         * @param  {[type]} data       [JSON数据]
         * @param  {[type]} str        [缓存字符串]
         * @param  {[type]} levelDepth [菜单层级]
         * @return {[type]}            [HTML预览字符串]
         */

        function step2(data, str, levelDepth) {
            if (str) {
                str += '<ul class="sub-menu">';
            }
            var iconStr;
            data.map(function(index, elem) {
                if (menuDetailConv[index.id].icon == 'undefined') {
                    menuDetailConv[index.id].icon = '%20';
                }
                iconStr = GBK2UTF(menuDetailConv[index.id].icon);
                if (typeof index.children !== 'undefined') {
                    str += '<li class="nav-item" data-id="' + index.id + '">';
                    str += '      <a href="' + menuDetailConv[index.id].url + '" class="nav-link nav-toggle"> ' + iconStr + ' <span class="title">' + menuDetailConv[index.id].name;
                    str = step2(index.children, str + '</span><span class="arrow "></span>', levelDepth + 1);
                    str += '</a>';
                } else {
                    if (levelDepth === 0) {
                        str += '<li class="heading" data-id="' + index.id + '">';
                        str += '      <h3 style="font-size:1.3em;">' + iconStr + menuDetailConv[index.id].name + '</h3>';
                    } else {
                        str += '<li class="nav-item" data-id="' + index.id + '">';
                        str += '      <a href="' + menuDetailConv[index.id].url + '" class="nav-link nav-toggle"> ' + iconStr + ' <span class="title">' + menuDetailConv[index.id].name + '</span></a>';
                    }
                }
                str += '</li>';
            });
            return str + '</ul>';
        }

        if (type == 1) {
            if (data.length === 0) {
                $(selecter).html('<ol class="dd-list"></ol>');
                return;
            }
            str = jsOnRight(step(data, ''), 5);
            $(selecter).html('<ol class="dd-list">' + str + '</ol>');
        } else {
            if (data.length === 0) {
                $(selecter).html('');
                return;
            }
            str = jsOnRight(step2(data, '', 0), 5);
            $(selecter).html(str);
            /*字符替换效率大于dom遍历
            str = str.replace(/<a href=\"javascript:;\" class=\"nav-link nav-toggle\"><\/a>/g, '').replace(/<a href=\"javascript:;\" class=\"nav-link nav-toggle\">      <\/a>/g, '');
            $(selecter).html(str);*/

            $(selecter).find('a').map(function(index, elem) {
                if ($(this).text().trim() === '') {
                    $(this).remove();
                }
            });
        }
    };

    /**
     * [updateMenuPreview 更新实际预览时的菜单项]
     * @return {[type]} [NONE]
     */
    var updateMenuPreview = function(data) {
        //更新Preview列表
        Serial2DOM('#menuPreviewDetail', data, 0);
        //更新后重新初始化
        //previewSidebar.init();
    };

    //清除输出项

    function clearInput() {
        $('#menuEdit [name="name"]').val('');
        $('#menuEdit [name="url"]').val('');
        //($('#menuEdit [name="menu_share"]').attr('checked')==='checked')?1:0;
        $('#menuEdit [name="share"]').parent().removeClass('checked');
        $('[data-target="#icon_library"]').html('');
        SetSelect2Val('menuDetail', -1); //重置选项卡
    }

    //菜单详情
    var menuDetail = function() {
        return {
            init: function() {
                $('.task-list').on('click', '.task-checkbox,.task-title', function(event) {
                    var item = $(this).parent().find('.liChild');
                    var itemPrnt = $(this).parents('li');
                    var item_val = item.val();
                    if (item.parent().hasClass('checked')) { //勾选状态-增加数据
                        itemPrnt.removeClass("task-done");
                        item.parent().removeClass("checked");

                        //删除信息
                        var obj = $('#menuPreviewList .dd-item[data-id="' + item_val + '"]');
                        var objPrev = $('#menuPreviewDetail [data-id="' + item_val + '"]');
                        var subMenu = $('#menuPreviewList li[data-id=' + item_val + '] ol');

                        if (obj.parent().find('li').length == 1) {
                            if ($('#menuPreviewDetail li').length == 1) {
                                objPrev.remove();
                                obj.remove();
                            } else {
                                objPrev.parent().remove();
                                obj.parent().remove();
                            }
                        } else {
                            obj.remove();
                            objPrev.remove();
                        }

                        if (subMenu.length) { //先保存子项目
                            //$('#menuPreviewList ol').first().append(subMenu.first().html());
                            //2016-05-17 子项目直接删除
                            updateOutput($('#menuPreviewList').data('output', $('#menuPreviewList_output')));
                            resetMenuList();
                            Serial2DOM('#menuPreviewList', $.parseJSON($('#menuPreviewList_output').val()), 1);
                        }

                    } else {
                        itemPrnt.addClass("task-done");
                        item.parent().addClass("checked");

                        //添加信息
                        var item_text = $.trim(itemPrnt.find('.task-title').text());
                        var item_edit = '<li class="dd-item" data-id="' + item_val + '">      <div class="dd-handle"> ' + item_text + ' </div> </li>';
                        var item_preview = '<li class="nav-item" data-id="' + item_val + '">      <a href="javascript:;" class="nav-link nav-toggle"> <span class="title">' + item_text + '</span> </a> </li>';
                        $('#menuPreviewList ol').first().append(item_edit);
                        $('#menuPreviewDetail').append(item_preview);
                        //bsTips('任务标记为完成，请在后台更新数据', 2);
                    }
                    updateOutput($('#menuPreviewList').data('output', $('#menuPreviewList_output')));
                    updateMenuPreview($.parseJSON($('#menuPreviewList_output').val()));
                });

                //任务删除
                /*$('.task-list').on('click', '.del', function() {
                var obj = $(this).parents('li').remove();
                bsTips('任务成功删除，请在后台更新数据', 2);
            });*/

            }
        };
    }();

    //菜单项编辑
    var menuEdit = function() {
        return {
            init: function() {

                function getData() {
                    return {
                        "tbl": TBL.SETTINGS_MENUDETAIL,
                        "utf2gbk": ['name'],
                        "name": $('#menuEdit [name="name"]').val(),
                        "url": $('#menuEdit [name="url"]').val().trim(),
                        "share": ($('#menuEdit [name="share"]').attr('checked') === 'checked') ? 1 : 0,
                        "icon": UTF2GBK($('[data-target="#icon_library"]').html().trim() + " ")
                    };
                }
                $('#menuEdit').on('click', 'button[name="add"]', function() {
                    var iData = getData();
                    iData.user_id = uid;
                    iData.type = 1;
                    iData.hide = 0;
                    if (iData.name === "") {
                        bsTips('菜单名不能为空');
                        return;
                    } else if (iData.url === "") {
                        iData.url = "javascript:;"
                    }
                    $.ajax({
                        url: getRootPath() + "/DataInterface/insert",
                        type: 'POST',
                        data: iData
                    }).done(function(data) {
                        bsTips("菜单增加成功", 1);
                        var obj = $.parseJSON(data);
                        var objList = {
                            "id": obj.id,
                            "name": iData.name
                        };
                        //添加到列表中
                        var listObj;
                        if ($('#menuDetail .task-list').last().find('li').length < $('#menuDetail .task-list').first().find('li').length) {
                            listObj = $('#menuDetail .task-list').last();
                        } else {
                            listObj = $('#menuDetail .task-list').first();
                        }
                        listObj.append(getListStr(objList));

                        //更新全局数据
                        menuDetailConv[obj.id] = {
                            "name": iData.name,
                            "url": iData.url,
                            "icon": iData.icon
                        };
                        //菜单列表项增加项
                        var str = '<option value="' + objList.id + '" data-userid="' + iData.user_id + '" data-share="' + iData.share + '" data-url="javascript:;" data-type="' + iData.type + ' data-icon="' + iData.icon + '">' + objList.name + '</option>';
                        $('select[name="menuDetail"]').append(str);

                    }).fail(function(data) {
                        bsTips('增加' + JSON.stringify(iData));
                        infoTips(JSON.stringify(iData));
                    });
                    clearInput();
                });

                $('#menuEdit').on('click', 'button[name="edit"]', function() {
                    var iData = getData();
                    iData.id = $('select[name="menuDetail"]').val();
                    if (iData.name === "") {
                        bsTips('菜单名不能为空');
                        return;
                    } else if (iData.url === "") {
                        iData.url = "javascript:;"
                    }
                    $.ajax({
                        url: getRootPath() + "/DataInterface/update",
                        type: 'POST',
                        data: iData
                    }).done(function(data) {
                        bsTips("菜单修改成功", 1);

                        //修改列表中的名称
                        $('#menuDetail .liChild[value=' + iData.id + ']').parents('li').find('.task-title-sp a').text(iData.name);

                        //更新全局数据
                        menuDetailConv[iData.id].name = iData.name;
                        menuDetailConv[iData.id].url = iData.url;
                        menuDetailConv[iData.id].icon = iData.icon;

                        $('#menuPreview li[data-id=' + iData.id + '] .dd-handle').first().text(iData.name);
                        $('#menuPreview li[data-id=' + iData.id + '] .nav-link').first().html(GBK2UTF(iData.icon) + iData.name).attr("href", iData.url);

                        //菜单列表项修改
                        $('select[name="menuDetail"] option[value="' + iData.id + '"]').data('share', iData.share).data('url', iData.url).data('type', iData.type).data('icon', iData.icon).text(iData.name);
                        $('select[name="menuDetail"]').select2(); //重新初始化

                    }).fail(function(data) {
                        bsTips('修改' + JSON.stringify(iData));
                        infoTips(JSON.stringify(iData));
                    });
                    clearInput();
                });

                function dealListView(id) {
                    var item = $('#menuDetail .liChild[value=' + id + ']');
                    var itemPrnt = item.parents('li');
                    var item_val = item.val();

                    if (item.parent().hasClass('checked')) { //勾选状态-增加数据
                        itemPrnt.removeClass("task-done");
                        item.parent().removeClass("checked");
                        //删除信息
                        var obj = $('#menuPreviewList .dd-item[data-id="' + item_val + '"]');
                        var objPrev = $('#menuPreviewDetail [data-id="' + item_val + '"]');
                        var subMenu = $('#menuPreviewList li[data-id=' + item_val + '] ol');
                        if (subMenu.length) { //先保存子项目
                            $('#menuPreviewList ol').first().append(subMenu.first().html());
                        }

                        if (obj.parent().find('li').length == 1) {
                            if ($('#menuPreviewDetail li').length == 1) {
                                objPrev.remove();
                                obj.remove();
                            } else {
                                objPrev.parent().remove();
                                obj.parent().remove();
                            }
                        } else {
                            obj.remove();
                            objPrev.remove();
                        }

                        updateOutput($('#menuPreviewList').data('output', $('#menuPreviewList_output')));
                        updateMenuPreview($.parseJSON($('#menuPreviewList_output').val()));
                    }
                    clearInput();
                }

                $('#menuEdit').on('click', 'button[name="hide"]', function() {
                    var iData = getData();
                    iData.id = $('select[name="menuDetail"]').val();
                    iData.hide = 1;
                    $.ajax({
                        url: getRootPath() + "/DataInterface/update",
                        type: 'POST',
                        data: iData
                    }).done(function(data) {
                        bsTips("菜单删除成功", 1);

                        //修改列表中的名称
                        //先将右侧值删除
                        dealListView(iData.id);
                        $('#menuDetail .liChild[value=' + iData.id + ']').parents('li').remove();

                        //删除全局数据值
                        delete menuDetailConv[iData.id];

                        //菜单列表项修改
                        $('select[name="menuDetail"] option[value="' + iData.id + '"]').remove();
                        $('select[name="menuDetail"]').select2(); //重新初始化

                    }).fail(function(data) {
                        bsTips('删除' + JSON.stringify(iData));
                        infoTips(JSON.stringify(iData));
                    });
                });

            }
        };
    }();

    //菜单预览
    var menuPreview = function() {
        return {
            init: function() {

                //解析序列化数据
                function decodeSerial(seg) {
                    var item = [];

                    function decode(seg, item) {
                        seg.map(function(index, elem) {
                            item.push(index.id);
                            if (typeof index.children !== 'undefined') {
                                item = decode(index.children, item);
                            }
                        });
                        return item;
                    }
                    decodeSerial(seg, item);
                    return item;
                }

                //格式转换

                function convertFormat(data) {
                    var item = [];
                    data.map(function(index, elem) {
                        item[index.id] = {};
                        item[index.id].name = index.name;
                        item[index.id].url = index.url;
                        item[index.id].icon = index.icon;
                    });
                    return item;
                }

                //更新属性列表
                menuDetailConv = convertFormat(menuDetailObj.data);

                //初始化菜单列表
                $('select[name="menu_list"]').change(function() {
                    var curVal = $(this).val();
                    var obj = $(this).find('option:selected');
                    if (obj.data('share') == "1") {
                        $('#menuList [name="share"]').parent().addClass("checked");
                    } else {
                        $('#menuList [name="share"]').parent().removeClass("checked");
                    }
                    $('#menuOper [name="del"],#menuOper [name="rename"],#menuOper [name="save"]').data('id', curVal);
                    //载入字段信息并渲染
                    //更新菜单列表内容
                    resetMenuList();
                    if (curVal == -1) {
                        $('#menuPreviewList').html('<ol class="dd-list"></ol>');
                        $('#menuPreviewDetail').html('');
                        return;
                    }
                    Serial2DOM('#menuPreviewList', obj.data('seg'), 1);
                    updateOutput($('#menuPreviewList').data('output', $('#menuPreviewList_output')));
                    updateMenuPreview(obj.data('seg'));
                });

                // activate Nestable for list 1
                $('#menuPreviewList').nestable({
                    group: 1
                }).on('change', function() {
                    updateOutput($('#menuPreviewList').data('output', $('#menuPreviewList_output')));
                    //console.log($('#menuPreviewList_output').val());
                    updateMenuPreview($.parseJSON($('#menuPreviewList_output').val()));
                });

                $('#menuPreviewList_menu').on('click', function(e) {
                    var target = $(e.target),
                        action = target.data('action');
                    if (action === 'expand-all') {
                        $('.dd').nestable('expandAll');
                    }
                    if (action === 'collapse-all') {
                        $('.dd').nestable('collapseAll');
                    }
                });

            }
        };
    }();

    //弹出式模块初始化
    var UIModals = function() {
        var draggableModals = function() {
            $("#newMenu").draggable({
                handle: ".modal-header"
            });
        };
        return {
            init: function() {
                draggableModals();
            }
        };
    }();

    return {
        init: function() {
            menuList.init();
            menuDetail.init();
            menuEdit.init();
            menuPreview.init();
            UIModals.init();
        }
    };

}();

jQuery(document).ready(function() {
    initDom();
    customizeMenu.init();
    //导出菜单项
    /*var obj = $('.page-sidebar-menu').first().find('li a');
    for(var i=0;i<obj.length;i++){
        console.log(obj[i].href.replace('http://localhost/',''));
        console.log(obj[i].innerText);
    }*/
});

jQuery(window).resize(function() {
    HeadFix();
});