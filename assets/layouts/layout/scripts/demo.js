/**
Demo script to handle the theme demo
**/
var Demo = function() {

    var panel = $('.theme-panel');
    var lastSelectedLayout = '';
    var lastDataRangeTheme = 'darkblue';
    // handle theme colors
    var setColor = function(color) {
        var color_ = (App.isRTL() ? color + '-rtl' : color);
        $('#style_color').attr("href", Layout.getLayoutCssPath() + 'themes/' + color_ + ".min.css");
        if (color == 'light2') {
            $('.page-logo img').attr('src', Layout.getLayoutImgPath() + 'logo-invert.png');
        } else {
            $('.page-logo img').attr('src', Layout.getLayoutImgPath() + 'logo.png');
        }
    };

    //开关面板
    $('.toggler', panel).click(function() {
        $('.toggler').hide();
        $('.toggler-close').show();
        $('.theme-panel > .theme-options').show();
    });

    $('.toggler-close', panel).click(function() {
        $('.toggler').show();
        $('.toggler-close').hide();
        $('.theme-panel > .theme-options').hide();
    });

    //颜色主题
    $('.theme-colors > ul > li', panel).click(function() {
        var color = $(this).data("style");
        setColor(color);
        //保存至Cookies
        Cookies.set('theme-colors', color);
        $('ul > li', panel).removeClass("current");
        $(this).addClass("current");

        var curTheme = color;
        switch (color) {
            case 'default':
                curTheme = 'dark';
                break;
            case 'darkblue':
                curTheme = 'blue-dark';
                break;
            case 'grey':
                curTheme = 'red-mint';
                break;
            case 'light':
                curTheme = 'grey-steel';
                break;
            case 'light2':
                curTheme = 'yellow-gold';
                break;
        }

        $('#dashboard-report-range').removeClass(lastDataRangeTheme).addClass(curTheme);
        lastDataRangeTheme = curTheme;
    });

    // Handle Theme Settings
    var handleTheme = function() {

        function initColor() {
            var color = Cookies.get('theme-colors');
            $('.theme-colors > ul > li.current').removeClass("current");
            $('.theme-colors > ul > li.color-' + color).addClass("current");
            setColor(color);
        }

        function loadDefaultSettings() {
            $('.theme-options select').map(function() {
                var attrs = $(this).attr('class').split(' ')[0];
                $(this).val(Cookies.get(attrs));
                setLayout(attrs, $(this).val());
            });
        }

        //handle theme layout
        var resetLayout = function() {
            /*$("body").
            removeClass("page-boxed").
            removeClass("page-footer-fixed").
            removeClass("page-sidebar-fixed").
            removeClass("page-header-fixed").
            removeClass("page-sidebar-reversed");

            $('.page-header > .page-header-inner').removeClass("container");

            if ($('.page-container').parent(".container").size() === 1) {
                $('.page-container').insertAfter('body > .clearfix');
            }

            if ($('.page-footer > .container').size() === 1) {
                $('.page-footer').html($('.page-footer > .container').html());
            } else if ($('.page-footer').parent(".container").size() === 1) {
                $('.page-footer').insertAfter('.page-container');
                $('.scroll-to-top').insertAfter('.page-footer');
            }

            $(".top-menu > .navbar-nav > li.dropdown").removeClass("dropdown-dark");

            $('body > .container').remove();
            */

            //初始化cookies值
            /*$('.theme-options select').map(function() {
                //Cookies要记录的值
                var attrs = $(this).attr('class').split(' ')[0];
                console.log('Cookies.set("' + attrs + '","' + $(this).val() + '");' );
            });*/

            //默认主题
            //默认方角
            Cookies.set("layout-style-option", "rounded");//square
            Cookies.set("layout-option", "fluid");
            Cookies.set("page-header-option", "fixed");
            Cookies.set("page-header-top-dropdown-style-option", "light");
            Cookies.set("sidebar-option", "default");
            Cookies.set("sidebar-menu-option", "accordion");
            Cookies.set("sidebar-style-option", "default");
            Cookies.set("sidebar-pos-option", "left");
            Cookies.set("page-footer-option", "default");
            Cookies.set("theme-colors", "darkblue");
            //$('.theme-colors > ul > li.current').removeClass("current");
            //$('.theme-colors > ul > li.color-default').addClass("current");
        };

        function setLayout(attrs, style) {
            var sidebarOption = $('.sidebar-option', panel).val();
            var headerOption = $('.page-header-option', panel).val();

            if (sidebarOption == "fixed" && headerOption == "default") {
                alert('Default Header with Fixed Sidebar option is not supported. Proceed with Fixed Header with Fixed Sidebar.');
                $('.page-header-option', panel).val("fixed");
                $('.sidebar-option', panel).val("fixed");
                sidebarOption = 'fixed';
                headerOption = 'fixed';
            }

            switch (attrs) {

                case 'layout-style-option': //  圆角/方角
                    var file = (style === 'rounded' ? 'components-rounded' : 'components');
                    file = (App.isRTL() ? file + '-rtl' : file);
                    $('#style_components').attr("href", App.getGlobalCssPath() + file + ".min.css");
                    break;

                case 'layout-option': //  固定/填满
                    if (style === "boxed") {
                        $("body").addClass("page-boxed");

                        // set header
                        $('.page-header > .page-header-inner').addClass("container");
                        if (0 === $('body > .container').length) {
                            var cont = $('body > .clearfix').after('<div class="container"></div>');
                        }


                        // set content
                        $('.page-container').appendTo('body > .container');
                        $('.page-footer').appendTo('body > .container');

                    } else {
                        $("body").removeClass("page-boxed");

                        // set header
                        $('.page-header > .page-header-inner').removeClass("container");

                        // set content
                        $('.page-container').appendTo('body > .clearfix');
                        $('.page-footer').appendTo('body > .clearfix');
                        $('body > .container').remove();

                    }

                    if (lastSelectedLayout != style) {
                        //layout changed, run responsive handler: 
                        App.runResizeHandlers();
                    }
                    lastSelectedLayout = style;
                    break;

                case 'page-header-option':
                    //header
                    if (headerOption === 'fixed') {
                        $("body").addClass("page-header-fixed");
                        $(".page-header").removeClass("navbar-static-top").addClass("navbar-fixed-top");
                    } else {
                        $("body").removeClass("page-header-fixed");
                        $(".page-header").removeClass("navbar-fixed-top").addClass("navbar-static-top");
                    }
                    break;

                case 'sidebar-option':
                    //sidebar
                    if ($('body').hasClass('page-full-width') === false) {
                        if (sidebarOption === 'fixed') {
                            $("body").addClass("page-sidebar-fixed");
                            $("page-sidebar-menu").addClass("page-sidebar-menu-fixed");
                            $("page-sidebar-menu").removeClass("page-sidebar-menu-default");
                            Layout.initFixedSidebarHoverEffect();
                        } else {
                            $("body").removeClass("page-sidebar-fixed");
                            $("page-sidebar-menu").addClass("page-sidebar-menu-default");
                            $("page-sidebar-menu").removeClass("page-sidebar-menu-fixed");
                            $('.page-sidebar-menu').unbind('mouseenter').unbind('mouseleave');
                        }
                    }
                    break;

                case 'page-header-top-dropdown-style-option':
                    // top dropdown style
                    if (style == 'dark') {
                        $(".top-menu > .navbar-nav > li.dropdown").addClass("dropdown-dark");
                    } else {
                        $(".top-menu > .navbar-nav > li.dropdown").removeClass("dropdown-dark");
                    }
                    break;

                case 'page-footer-option':
                    //footer 
                    if (style === 'fixed') {
                        $("body").addClass("page-footer-fixed");
                    } else {
                        $("body").removeClass("page-footer-fixed");
                    }
                    break;

                case 'sidebar-style-option':
                    //sidebar style
                    if (style === 'light') {
                        $(".page-sidebar-menu").addClass("page-sidebar-menu-light");
                    } else {
                        $(".page-sidebar-menu").removeClass("page-sidebar-menu-light");
                    }
                    break;

                case 'sidebar-menu-option':
                    //sidebar menu 
                    if (style === 'hover') {
                        if (sidebarOption == 'fixed') {
                            $('.sidebar-menu-option', panel).val("accordion");
                            alert("Hover Sidebar Menu is not compatible with Fixed Sidebar Mode. Select Default Sidebar Mode Instead.");
                        } else {
                            $(".page-sidebar-menu").addClass("page-sidebar-menu-hover-submenu");
                        }
                    } else {
                        $(".page-sidebar-menu").removeClass("page-sidebar-menu-hover-submenu");
                    }
                    break;

                case 'sidebar-pos-option':
                    //sidebar position
                    if (App.isRTL()) {
                        if (style === 'left') {
                            $("body").addClass("page-sidebar-reversed");
                            $('#frontend-link').tooltip('destroy').tooltip({
                                placement: 'right'
                            });
                        } else {
                            $("body").removeClass("page-sidebar-reversed");
                            $('#frontend-link').tooltip('destroy').tooltip({
                                placement: 'left'
                            });
                        }
                    } else {
                        if (style === 'right') {
                            $("body").addClass("page-sidebar-reversed");
                            $('#frontend-link').tooltip('destroy').tooltip({
                                placement: 'left'
                            });
                        } else {
                            $("body").removeClass("page-sidebar-reversed");
                            $('#frontend-link').tooltip('destroy').tooltip({
                                placement: 'right'
                            });
                        }
                    }
                    break;
            }
            Layout.fixContentHeight(); // fix content height            
            Layout.initFixedSidebar(); // reinitialize fixed sidebar
        }

        $('.theme-options select').change(function() {
            //Cookies要记录的值
            var attrs = $(this).attr('class').split(' ')[0];
            //记录Cookies值
            if (typeof Cookies !== "undefined") {
                Cookies.set(attrs, $(this).val());
            }
            setLayout(attrs, $(this).val());
        });

        return {

            init: function() {
                if (typeof Cookies.get('theme-colors') == 'undefined') {
                    resetLayout();
                }
                initColor();
                loadDefaultSettings();

            }
        };
    }();

    return {
        //main function to initiate the theme
        init: function() {
            // handles style customer tool
            handleTheme.init();
        }
    };
}();

if (App.isAngularJsApp() === false) {
    jQuery(document).ready(function() {
        Demo.init(); // init metronic core componets
    });
}