var Index = function() {
  return {
    init: function() {
     
    }
  };
}();

jQuery(document).ready(function() {
  UIIdleTimeout.init();
  initDom();
  initDashboardDaterange('YYYY-MM-DD');
  Index.init();
});
jQuery(window).resize(function() {
  HeadFix();
});
//插入工作日志