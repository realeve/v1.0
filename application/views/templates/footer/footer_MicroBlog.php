<!-- BEGIN FOOTER -->
<!-- END PAGE CONTAINER -->
<!-- BEGIN PRE-FOOTER -->
<div class="page-prefooter">
  <div class="container">
    <div class="row">
      <div class="col-md-3 col-sm-6 col-xs-12 footer-block">
        <h2>关于</h2>
        <p>
           2015 &copy; 成都印钞有限公司 . 技术质量部 .
        </p>
      </div>
      <div class="col-md-3 col-sm-6 col-xs12 footer-block">
        <h2>发送邮件</h2>
        <div class="subscribe-form">
          <form action="javascript:;">
            <div class="input-group">
              <input type="text" placeholder="realeve@qq.com" class="form-control">
              <span class="input-group-btn">
              <button class="btn" type="submit">Submit</button>
              </span>
            </div>
          </form>
        </div>
      </div>
      <div class="col-md-3 col-sm-6 col-xs-12 footer-block">
        <h2>Follow</h2>
          <address class="margin-bottom-40">
           <i class="fa fa-weibo"></i>&nbsp;Realeve<br>
           <i class="fa fa-weixin"></i>&nbsp;MicroKia</br>
          </address>
      </div>
      <div class="col-md-3 col-sm-6 col-xs-12 footer-block">
        <h2>联系方式</h2>
        <address class="margin-bottom-40">
        <i class="icon-call-end"></i> 8275 6129<br>
        <i class="icon-envelope-open"></i> realeve@qq.com
        </address>
      </div>
    </div>
  </div>
</div>
<!-- END PRE-FOOTER -->
<div class="page-footer">

	<div class="page-footer-inner">
		 2015 &copy; CBPM All Rights Reserved.
	</div>
	<div class="scroll-to-top">
		<i class="icon-arrow-up"></i>
	</div>
</div>
<!-- END FOOTER -->
<!-- BEGIN JAVASCRIPTS(Load javascripts at bottom, this will reduce page load time) -->
<!-- BEGIN CORE PLUGINS -->
<!--[if lt IE 9]>
<script src="<?php echo base_url()?>assets/global/plugins/respond.min.js"></script>
<script src="<?php echo base_url()?>assets/global/plugins/excanvas.min.js"></script> 
<![endif]-->
<script src="<?php echo base_url()?>assets/global/plugins/jquery.min.js" type="text/javascript"></script>
<script src="<?php echo base_url()?>assets/global/plugins/jquery-migrate.min.js" type="text/javascript"></script>
<!-- IMPORTANT! Load jquery-ui-1.10.3.custom.min.js before bootstrap.min.js to fix bootstrap tooltip conflict with jquery ui tooltip -->
<script src="<?php echo base_url()?>assets/global/plugins/jquery-ui/jquery-ui.min.js" type="text/javascript"></script>
<script src="<?php echo base_url()?>assets/global/plugins/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
<script src="<?php echo base_url()?>assets/global/plugins/bootstrap-hover-dropdown/bootstrap-hover-dropdown.min.js" type="text/javascript"></script>
<script src="<?php echo base_url()?>assets/global/plugins/jquery-slimscroll/jquery.slimscroll.min.js" type="text/javascript"></script>
<script src="<?php echo base_url()?>assets/global/plugins/jquery.blockui.min.js" type="text/javascript"></script>
<script src="<?php echo base_url()?>assets/global/plugins/jquery.cokie.min.js" type="text/javascript"></script>
<script src="<?php echo base_url()?>assets/global/plugins/uniform/jquery.uniform.min.js" type="text/javascript"></script>
<script src="<?php echo base_url()?>assets/global/plugins/bootstrap-switch/js/bootstrap-switch.min.js" type="text/javascript"></script>
<!-- END CORE PLUGINS -->
<!-- BEGIN PAGE LEVEL PLUGINS -->
<script src="<?php echo base_url()?>assets/global/plugins/jquery.pulsate.min.js" type="text/javascript"></script>
<script src="<?php echo base_url()?>assets/global/plugins/bootstrap-daterangepicker/moment.min.js" type="text/javascript"></script>
<script src="<?php echo base_url()?>assets/global/plugins/bootstrap-daterangepicker/daterangepicker.js" type="text/javascript"></script>
<!-- IMPORTANT! fullcalendar depends on jquery-ui-1.10.3.custom.min.js for drag & drop support -->
<script src="<?php echo base_url()?>assets/global/plugins/fullcalendar/fullcalendar.min.js" type="text/javascript"></script>
<script src="<?php echo base_url()?>assets/global/plugins/jquery.sparkline.min.js" type="text/javascript"></script>
<!-- END PAGE LEVEL PLUGINS -->
<!-- BEGIN PAGE LEVEL SCRIPTS -->
<script src="<?php echo base_url()?>assets/global/scripts/metronic.js" type="text/javascript"></script>
<script src="<?php echo base_url()?>assets/admin/layout/scripts/layout.js" type="text/javascript"></script>
<script src="<?php echo base_url()?>assets/admin/layout/scripts/quick-sidebar.js" type="text/javascript"></script>
<script src="<?php echo base_url()?>assets/admin/layout/scripts/demo.js" type="text/javascript"></script>
<!-- END PAGE LEVEL SCRIPTS -->

<!-- BEGIN PAGE LEVEL SCRIPTS -->
<script src="<?php echo base_url()?>assets/global/plugins/bootbox/bootbox.min.js" type="text/javascript"></script>
<script src="<?php echo base_url()?>assets/global/plugins/jquery-idle-timeout/jquery.idletimeout.js" type="text/javascript"></script>
<script src="<?php echo base_url()?>assets/global/plugins/jquery-idle-timeout/jquery.idletimer.js" type="text/javascript"></script>
<!-- END PAGE LEVEL SCRIPTS -->
<!--BEGIN MY LEVEL SCRIPT-->
<script type="text/javascript" src="<?php echo base_url()?>assets/admin/pages/controller/CommonFunctions.min.js"></script>
<script type="text/javascript" src="<?php echo base_url()?>assets/admin/pages/controller/MicroBlog.min.js"></script>
<script type="text/javascript" src="<?php echo base_url()?>assets/admin/pages/controller/idletimeout.min.js"></script>
<!--END MY LEVEL SCRIPT-->
<script>
  //记录选择状态  
   jQuery(document).ready(function() {    
       Metronic.init(); // init metronic core componets
       Layout.init(); // init layout
       QuickSidebar.init(); // init quick sidebar
       Demo.init(); // init demo features 
       UIIdleTimeout.init();

       initDashboardDaterange('YYYY-MM-DD');       
       $("#today").text(today(0));

       HeadFix();
       //修复顶部style="margin-top:-43px;"
       //系统主题设置
       //DarkInfoTheme(1);       
       ReadLogSettings();
       //ChangeMainTheme(1);
       //RoundedTheme(0);
    });
    jQuery(window).resize(function(){
         HeadFix();
      });
    //插入工作日志       
</script>
<!-- END JAVASCRIPTS -->
</body>

<!-- END BODY -->

<!-- Mirrored from www.keenthemes.com/preview/metronic/theme/templates/admin/index.html by HTTrack Website Copier/3.x [XR&CO'2014], Wed, 17 Dec 2014 05:21:52 GMT -->
</html>