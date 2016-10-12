var sarchBox = (function() {

  //顶部搜索框
  var initSearchBox = function() {

    function queryData() {
      if ($('.search-form').hasClass('open')) {
        var str = $('[name=query]').val().toUpperCase();
        var type = judgeSearchType(str);

        switch (type) {
          case config.search.REEL:
            location.hash = str;
            $('.search-form .submit').attr('href', '#' + str);
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

  function unbindEvent(){

    // handle search box expand/collapse
    $('.search-form .icon-magnifier').unbind('click');

    //回车
    $('.search-form').unbind('keydown');
  }

  return {
    init:function(){
      unbindEvent();
      initSearchBox();
    }
  };

})();

jQuery(document).ready(function() {
  sarchBox.init();
});