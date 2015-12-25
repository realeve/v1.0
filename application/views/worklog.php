			<!-- BEGIN STYLE CUSTOMIZER -->
			<?php include("templates/themesetting.php");?>
			<!-- END STYLE CUSTOMIZER -->
			<!-- BEGIN SAMPLE PORTLET CONFIGURATION MODAL FORM-->
			<div class="modal fade" id="portlet-config" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
							<h4 class="modal-title">Modal title</h4>
						</div>
						<div class="modal-body">
							 Widget settings form goes here
						</div>
						<div class="modal-footer">
							<button type="button" class="btn blue">Save changes</button>
							<button type="button" class="btn default" data-dismiss="modal">Close</button>
						</div>
					</div>
					<!-- /.modal-content -->
				</div>
				<!-- /.modal-dialog -->
			</div>
			<!-- /.modal -->
			<!-- END SAMPLE PORTLET CONFIGURATION MODAL FORM-->
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
				<!-- TIMELINE ITEM 
				<div class="timeline-item">
					<div class="timeline-badge">
						<div class="timeline-icon">
							<i class="icon-emoticon-smile font-green-haze"></i>
							<img class="timeline-badge-userpic" src="<?php echo base_url()?>assets/pages/media/users/avatar80_2.jpg">
						</div>
					</div>
					<div class="timeline-body">
						<div class="timeline-body-arrow"></div>
						<div class="timeline-body-head">
							<div class="timeline-body-head-caption">
								<a href="#" class="timeline-body-title font-blue-madison">Andres Iniesta</a>
								<span class="timeline-body-time font-grey-cascade">Replied at 7:45 PM</span>
							</div>
							<div class="timeline-body-head-actions">
								<div class="btn-group">
									<button class="btn btn-circle green-haze btn-sm dropdown-toggle" type="button" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
									操作 <i class="fa fa-angle-down"></i>
									</button>
									<ul class="dropdown-menu pull-right" role="menu">
										<li><a href="#" id="EditLog"><i class="icon-pencil"></i>&nbsp;&nbsp;编辑 </a></li>
										<li><a href="#" id="DelLog" data-toggle="confirmation" data-singleton="true" data-popout="true" data-placement="left" data-title="确定删除该条日志?" data-btn-ok-label="是" data-btn-ok-icon="icon-trash" data-btn-ok-class="btn-success" data-btn-cancel-label="取消" data-btn-cancel-icon="icon-close" data-btn-cancel-class="btn-danger"><i class="icon-trash"></i>&nbsp;&nbsp;删除 </a></li>
										<li><a href="#" id="MarkLog"><i class="icon-star"></i>&nbsp;&nbsp;收藏 </a></li>
										<li class="divider"></li>
										<li><a href="#" id="CompleteLog" data-toggle="confirmation" data-singleton="true" data-popout="true" data-placement="left" data-title="确定标记为已完成?" data-btn-ok-label="是" data-btn-ok-icon="icon-check" data-btn-ok-class="btn-success" data-btn-cancel-label="取消" data-btn-cancel-icon="icon-close"><i class="icon-check"></i>&nbsp;&nbsp;标记为已完成 </a></li>
									</ul>
								</div>
							</div>
						</div>
						<div class="timeline-body-content">
							<span class="font-grey-cascade">
							Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. 
							</span>
						</div>
					</div>
				</div>
				END TIMELINE ITEM -->					
			</div>
			<!-- END PAGE CONTENT-->
		</div>
	</div>
	<!-- END CONTENT -->
	<?php include("templates/quicksidebar/quicksidebar_worklog.php");?>
</div>
<!-- END CONTAINER -->