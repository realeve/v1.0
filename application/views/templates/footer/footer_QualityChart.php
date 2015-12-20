<!-- BEGIN FOOTER -->
<!-- END PAGE CONTAINER -->

<div class="page-footer" style="margin-top:-36px;">
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
<!-- END PAGE LEVEL PLUGINS -->
<!-- BEGIN PAGE LEVEL SCRIPTS -->
<script src="<?php echo base_url()?>assets/global/scripts/metronic.js" type="text/javascript"></script>
<script src="<?php echo base_url()?>assets/admin/layout/scripts/layout.js" type="text/javascript"></script>
<script src="<?php echo base_url()?>assets/admin/layout/scripts/quick-sidebar.js" type="text/javascript"></script>
<script src="<?php echo base_url()?>assets/admin/layout/scripts/demo.js" type="text/javascript"></script>
<!-- END PAGE LEVEL SCRIPTS -->
<!-- BEGIN PAGE LEVEL PLUGINS -->
<script src="<?php echo base_url()?>assets/global/plugins/bootstrap-switch/js/bootstrap-switch.min.js" type="text/javascript"></script>
<script src="<?php echo base_url()?>assets/global/plugins/bootstrap-touchspin/bootstrap.touchspin.js" type="text/javascript"></script>
<script src="<?php echo base_url()?>assets/global/plugins/typeahead/handlebars.min.js" type="text/javascript"></script>
<script src="<?php echo base_url()?>assets/global/plugins/typeahead/typeahead.bundle.min.js" type="text/javascript"></script>
<script type="text/javascript" src="<?php echo base_url()?>assets/global/plugins/fuelux/js/spinner.min.js"></script>
<script type="text/javascript" src="<?php echo base_url()?>assets/global/plugins/bootstrap-daterangepicker/daterangepicker.js"></script>
<script src="<?php echo base_url()?>assets/global/plugins/bootstrap-confirmation/bootstrap-confirmation.min.js" type="text/javascript"></script>
<script src="<?php echo base_url()?>assets/global/plugins/bootstrap-select/bootstrap-select.min.js"></script>

<!-- END PAGE LEVEL PLUGINS -->

<script src="<?php echo base_url()?>assets/global/plugins/echarts/js/echarts.js" type="text/javascript"></script>
<script src="<?php echo base_url()?>assets/global/plugins/echarts/js/ThemeStyle.js" type="text/javascript"></script>


<!-- BEGIN PAGE LEVEL SCRIPTS -->
<script src="<?php echo base_url()?>assets/global/plugins/bootbox/bootbox.min.js" type="text/javascript"></script>
<script src="<?php echo base_url()?>assets/global/plugins/jquery-idle-timeout/jquery.idletimeout.js" type="text/javascript"></script>
<script src="<?php echo base_url()?>assets/global/plugins/jquery-idle-timeout/jquery.idletimer.js" type="text/javascript"></script>
<script type="text/javascript" src="<?php echo base_url()?>assets/admin/pages/controller/idletimeout.min.js"></script>
<!-- END PAGE LEVEL SCRIPTS -->
<!--BEGIN MY LEVEL SCRIPT-->
<script type="text/javascript" src="<?php echo base_url()?>assets/admin/pages/controller/CommonFunctions.min.js"></script>
<script type="text/javascript" src="<?php echo base_url()?>assets/admin/pages/controller/QualityChart.min.js"></script>
<!--END MY LEVEL SCRIPT-->
<script>
  //记录选择状态  
   jQuery(document).ready(function() {    
       Metronic.init(); // init metronic core componets
       Layout.init(); // init layout
       QuickSidebar.init(); // init quick sidebar
       Demo.init(); // init demo features 
       UIIdleTimeout.init();

       initDashboardDaterange('YYYYMMDD');     
       $("#today").text(today(0));

       HeadFix();
       //修复顶部style="margin-top:-43px;"
       //系统主题设置
       
       ReadSettings();
       InitChart();
       //初始化表格

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