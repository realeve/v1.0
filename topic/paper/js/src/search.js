/*jshint multistr: true */
var sarchBox = (function() {

  //顶部搜索框
  var initSearchBox = function() {

    function queryData() {
      if ($('.search-form').hasClass('open')) {
        var str = $('[name=query]').val().toUpperCase();
        var type = judgeSearchType(str);
        var url = './#' + str;
        switch (type) {
          case config.search.REEL:
            if (location.hash.indexOf('/search/paper') === 0) {
              location.hash = str;
              $('.search-form .submit').attr('href', '#' + str);
            } else {
              window.location.href = url;
            }
            break;
          default:
            bsTips('暂时只支持轴号查询，请确认输入格式');
            break;
        }
      }
    }

    // handle search box expand/collapse
    $('.search-form .icon-magnifier').on('click', function() {
      queryData();
    });

    //回车
    $('.search-form').on('keydown', function(event) {
      if (event.keyCode === 13) {
        queryData();
      }
    });
  };

  function unbindEvent() {
    // handle search box expand/collapse
    $('.search-form .icon-magnifier').unbind('click');
    //回车
    $('.search-form').unbind('keydown');
  }


  var handleDemo = function() {
    var myCodeMirror;
    var myTextArea = document.getElementById('demo');
    if (myTextArea) {
      myCodeMirror = CodeMirror.fromTextArea(myTextArea, {
        lineNumbers: true,
        matchBrackets: true,
        theme: "material"
      });
    }

    myTextArea = document.getElementById('json');
    if (myTextArea) {
      myCodeMirror = CodeMirror.fromTextArea(myTextArea, {
        lineNumbers: true,
        matchBrackets: true,
        theme: "material"
      });
    }

  };

  return {
    init: function() {
      unbindEvent();
      initSearchBox();
      handleDemo();
    }
  };

})();

jQuery(document).ready(function() {
  sarchBox.init();
});