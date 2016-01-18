			<!-- BEGIN STYLE CUSTOMIZER -->
			<?php include("templates/themesetting.php");?>
			<!-- END STYLE CUSTOMIZER -->
			<!-- BEGIN PAGE HEADER 面包屑-->
			<div class="page-bar">
				<ul class="page-breadcrumb">
					<li>
						<a href="<?php echo base_url()?>">首页</a>
						<i class="fa fa-circle"></i>
					</li>
					<li>
						<a href="<?php echo base_url()?>worklog">机检日志</a>
						<i class="fa fa-circle"></i>
					</li>
					<li>
						<a href="<?php echo base_url()?>worklog">查看日志</a>
					</li>
				</ul>
				
				<div class="page-toolbar">
					<div id="dashboard-report-range" class="pull-right tooltips btn btn-fit-height green-seagreen" data-placement="top" data-original-title="点击修改查询时间">
						<i class="icon-calendar"></i>&nbsp;
						<span class="thin uppercase">&nbsp;</span>&nbsp;
						<i class="fa fa-angle-down"></i>
					</div>
				</div>
			</div>	
			<h3 class="page-title font-yahei">
				机检工作日志 <small id="today"></small>
			</h3>
			<!-- BEGIN PAGE CONTENT-->
			<div class="timeline">					
			</div>
			<!-- END PAGE CONTENT-->
		</div>
	</div>
	<!-- END CONTENT -->
	<?php include("templates/quicksidebar/quicksidebar_worklog.php");?>
</div>
<!-- END CONTAINER -->