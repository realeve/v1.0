var IS_STATIC = true;
var configs = {};
_.each((location.search || '').substr(1).split('&'), function (item) {
    var kv = item.split('=');
    configs[kv[0]] = kv[1];
});

var gb = {
    handler: {
        isDown: false
    },
    lastTyping: 0,
    editor: null,
    chart: null,
    loadedCode: null,
    echartsSource: {},

    lastOption: null,
    updateTime: 0,
    debounceTime: 500,
};



$(document).ready(function() {

    initEditor();
    checkEditorIfToShow();

    initEcharts();

    initControl();

    initEventHandler();

    load();

    // loadEchartsOfAllVersions();

});



function initEditor() {

    gb.editor = ace.edit('code-panel');
    gb.editor.getSession().setMode('ace/mode/javascript');

}



function initEcharts() {

    gb.chart = echarts.init($('#chart-panel')[0]);

    gb.editor.setValue('var option = {\n    \n};\n');

    gb.editor.selection.setSelectionRange({
        start: {
            row:1,
            column: 4
        }, end: {
            row:1,
            column: 4
        }
    });

}



function initControl() {

    // init dropdown button groups
    $('#theme-dropdown').on('click', 'li a', function(){
        setThemeButton($(this).text());
    });
    $('#echarts-version-dropdown').on('click', 'li a', function() {
        setEchartsVersionButton($(this).text());
    });

}



function setThemeButton(text) {

    $('#theme-btn').html('ECharts-' + text + ' <span class="caret"></span>');
    $('#theme-btn').val(text);
    disposeAndRun();

}



function setEchartsVersionButton(version) {

    $('#echarts-version-btn').html('ECharts-' + version
        + ' <span class="caret"></span>');
    $('#echarts-version-btn').val(version);
    updateEchartsVersion();

}



function initEventHandler() {

    // reset typing state
    var typingHandler = null;

    gb.editor.on('change', function() {
        runDebounce();
    });

    $('#h-handler').mousedown(function() {

        gb.handler.isDown = true;

    });


    $(window).mousemove(function(e) {

        if (gb.handler.isDown) {
            var left = e.clientX / window.innerWidth;
            setSplitPosition(left);
        }

    }).mouseup(function() {

        gb.handler.isDown = false;

    });

    $(window).resize(function() {
        gb.chart.resize();
        checkEditorIfToShow();
    });

}



// set splitter position by percentage, left should be between 0 to 1
function setSplitPosition(percentage) {
    percentage = Math.min(0.99, Math.max(0.01, percentage));

    var left = percentage * 100;
    $('#code-container').css('width', left + '%');
    $('.right-container').css('width', (100 - left) + '%')
        .css('left', left + '%');
    $('#h-handler').css('left', left + '%');

    if (gb.chart) {
        gb.chart.resize();
    }
}


function checkEditorIfToShow() {

    // hide editor for mobile devices
    if (window.innerWidth < 768) {
        if (gb.editorIsShown === undefined || gb.editorIsShown === true) {
            // hide editor
            $('#code-container').hide();
            $('#h-handler').hide();
            $('.right-container').css('width', '100%').css('left', '0%');
            gb.editorIsShown = false;
        }
    } else {
        if (gb.editorIsShown === undefined || gb.editorIsShown === false) {
            // show editor
            $('#code-container').show();
            $('#h-handler').show();
            setSplitPosition(0.4);
            gb.editorIsShown = true;
        }
    }
}


var appEnv = {};

// run to get echarts locally
var run = function (ignoreOptionNotChange) {

    // check if code is valid
    if (hasEditorError()) {
        log('编辑器内容有误！', 'error');
        return;
    }

    // save locallly
    localSave();

    // run the code
    try {
        var myChart = gb.chart;
        // FIXME
        var app = appEnv;

        // Reset option
        option = null;
        eval(gb.editor.getValue());

        if (option && typeof option === 'object' && (!_.isEqual(option, gb.lastOption) || ignoreOptionNotChange)) {
            gb.lastOption = option;
            var startTime = +new Date();
            gb.chart.setOption(option, true);
            var endTime = +new Date();
            gb.updateTime = endTime - startTime;

            // Find the appropriate throttle time
            var debounceTime = 500;
            var debounceTimeQuantities = [500, 2000, 5000, 10000];
            for (var i = debounceTimeQuantities.length - 1; i >= 0; i--) {
                var quantity = debounceTimeQuantities[i];
                var preferredDebounceTime = debounceTimeQuantities[i + 1] || 1000000;
                if (gb.updateTime > quantity && gb.debounceTime !== preferredDebounceTime) {
                    gb.debounceTime = preferredDebounceTime;
                    runDebounce = _.debounce(run, preferredDebounceTime, {
                        trailing: true
                    });
                    break;
                }
            }
            log('图表已生成, ' + gb.updateTime + 'ms');
        }
    } catch(e) {
        log('编辑器内容有误！', 'error');
        console.error(e);
    }
};

var runDebounce = _.debounce(run, gb.debounceTime, {
    trailing: true
});

function disposeAndRun() {

    // dispose
    if (gb.chart) {
        gb.chart.dispose();
    }

    // init with theme
    var theme = $('#theme-btn').val() || 'default';
    gb.chart = echarts.init($('#chart-panel')[0]);

    // run with option in code panel
    run(true);
}



// update echarts version locally
function updateEchartsVersion() {

    var version = $('#echarts-version-btn').val();

    // update only when version is different
    if (echarts && version === echarts.version && !gb.echartsSource[version]) {
        return;
    }

    // echarts = null;

    try {
        eval(gb.echartsSource[version]);
        disposeAndRun();
    } catch (e) {
        log('加载 ECharts 版本失败！', 'error');
    }

}



// load echarts of different versions
function loadEchartsOfAllVersions() {

    var versions = ['2.2.7', '3.0.0'];
    for (var vid = 0, vlen = versions.length; vid < vlen; ++vid) {
        (function (vid) {
            $.get('./vendors/echarts/echarts-all-' + versions[vid] + '.js',
                function (data) {
                    gb.echartsSource[versions[vid]] = data;
            }, 'text').fail(function () {
                console.error('加载 ECharts ' + versions[vid] + ' 版本失败！');
            })
        })(vid);
    }

}


// save chart to database
function save() {

    if (IS_STATIC) {
        console.warn('静态版无法使用该功能！');
        return;
    }

    $.get('http://' + window.location.host + '/chart/add', {
        code: gb.editor.getValue(),
        echarts_version: $('#echarts-version-btn').val(),
        theme: $('#theme-btn').val()
    }, function(data) {
        window.location = 'http://' + window.location.host + '/' + data.cid;
    }).fail(function (err) {
        log('无法保存到服务器，已在本地缓存，请尝试刷新页面', 'error');
        console.error(err);
    });

}



// fork the chart to a new version
function fork() {

    if (IS_STATIC) {
        console.warn('静态版无法使用该功能！');
        return;
    }

    var cid = getCid();
    var version = getVersion();

    $.get('http://' + window.location.host + '/chart/fork', {
        code: gb.editor.getValue(),
        echarts_version: $('#echarts-version-btn').val(),
        parent_version: version,
        root_id: cid,
        theme: $('#theme-btn').val()
    }, function(data) {
        window.location = 'http://' + window.location.host + '/' + cid + '/'
            + data.version;
    }).fail(function (err) {
        log('无法保存到服务器，已在本地缓存，请尝试刷新页面', 'error');
        console.error(err);
    });

}



// save chart to localStorage
function localSave() {

    var code = gb.editor.getValue();

    if (window.localStorage && code !== gb.loadedCode) {
        try {
            window.localStorage.setItem('code', code);
            $('#reset-btn').css('display', 'inline-block');
        } catch (e) {
            console.error(e);
            log('缓存到本地失败，刷新页面后图表将不被保存，请及时保存');
        }
    }

}



// load code from localStorage
function localLoad() {

    try {
        var code = window.localStorage.getItem('code');
        if (code) {
            gb.editor.setValue(code);
            log('读取本地缓存成功');
        }
    } catch (e) {
        console.error(e);
    }

}



// reset editor with loaded code
function localReset() {

    if (gb.loadedCode) {
        gb.editor.setValue(gb.loadedCode);
        localSave();
        $('#reset-btn').hide();
        run();
    }

}



function hasEditorError() {

    var annotations = gb.editor.getSession().getAnnotations();
    for (var aid = 0, alen = annotations.length; aid < alen; ++aid) {
        if (annotations[aid].type === 'error') {
            return true;
        }
    }
    return false;

}



// load a chart with chart id in url
function load() {

    if (IS_STATIC) {
        if (configs.c) {
            $.ajax('./data/' + configs.c + '.js', {
                dataType: 'text',
                success: function (data) {
                    gb.loadedCode = data;
                    gb.editor.setValue(data);
                }
            }).fail(function () {
                log('加载图表失败！', 'error');
            });
        }
        return;
    }

    var url = window.location.href.split('/');
    var cid = getCid();
    var version = getVersion();

    if (cid !== 'new') {
        $.get('http://' + window.location.host + '/chart/find/' + cid, {
            version: version
        }, function(data) {
            gb.loadedCode = data.code;
            // render chart
            gb.editor.setValue(data.code);
            // set theme
            if (data.theme) {
                setThemeButton(data.theme);
            }
            // set version
            setEchartsVersionButton(data.echartsVersion);
            run();

            // enable forking only if has previously stored
            $('#fork-btn').css('display', 'inline-block');

            // show log info about chart info
            var creater = data.creater || '匿名用户';
            var createTime = formatTime(new Date(data.createTime));
            log(creater + '于' + createTime + '创建了该图表');
        }).fail(function (err) {
            // fail to load chart, redirect to index
            console.error(err);
            window.location.pathname = 'new';
        });
    } else {
        log('欢迎使用 ECharts Playground！');

        // warn if not support localStorage
        if (!window.localStorage) {
            log('浏览器不支持本地缓存，请及时保存图表！', 'warn');
        } else {
            localLoad();
            run();
        }
    }

}



// show log info in code-info panel
// type should be 'info', 'warn', 'error'
function log(text, type) {

    // log time
    var timeStr = formatTime(new Date());

    if (type !== 'warn' && type !== 'error') {
        type = 'info';
    }

    $('#code-info').html(
        '<span class="code-info-time">' + timeStr + '</span>' +
        '<span class="code-info-type-' + type + '">' + text + '</span>'
    );

}



// format time to string
function formatTime(time) {

    var digits = [time.getHours(), time.getMinutes(), time.getSeconds()];
    var timeStr = '';
    for (var i = 0, len = digits.length; i < len; ++i) {
        timeStr += (digits[i] < 10 ? '0' : '') + digits[i];
        if (i < len - 1) {
            timeStr += ':';
        }
    }
    return timeStr;

}



// get version id of current page
function getVersion() {

    var url = window.location.href.split('/');
    if (url.length === 4) {
        // no version in url, first version
        return 1;
    } else {
        return parseInt(url[url.length - 1], 10) || 1;
    }

}



// get version id of current page
function getCid() {

    return window.location.href.split('/')[3];

}
