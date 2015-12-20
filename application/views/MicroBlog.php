			<!-- BEGIN PAGE HEADER 面包屑-->
			<div class="page-bar">
				<ul class="page-breadcrumb">
					<li>
						<i class="fa fa-home"></i>
						<a href="<?php echo base_url()?>">首页</a>
						<i class="fa fa-angle-right"></i>
					</li>
					<li>
						<a href="<?php echo base_url()?>MicroBlog">工作笔记</a>
						<i class="fa fa-angle-right"></i>
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
			<div class="content row">
				<div class="col-md-6">
					<h3 class="page-title font-yahei">
						我的工作笔记 <small id="today"></small>
					</h3>
				</div>
				<!-- END PAGE HEADER-->
				<div class="col-md-6" style="margin-top:-40px;">
					<!-- BEGIN STYLE CUSTOMIZER -->
					<?php include("templates/themesetting.php");?>
					<!-- END STYLE CUSTOMIZER -->
				</div>
			</div>	

			<!-- BEGIN PAGE CONTENT-->
			<div class="chat-form" style="background-color:#f1f3fa;">
				<div class="input-group" style="text-align:left">
					<textarea id="BlogContent" class="form-control" rows="3" placeholder="在此处输入您的信息..." style="resize:none"></textarea>
					<span class="input-group-btn text-center">
						<a href="javascript:;" class="btn green-jungle icn-only" style="height:74px;" id="PostMicriBlog">
						</br>
						<i class="fa fa-check icon-white"></i> 发送 </a>
					</span>
				</div>
				<span class="help-block pull-right" style="margin-bottom:-5px;" id="WordNum">还可以输入140字</span>
			</div>

			<!-- END PAGE CONTENT-->
			<!-- BEGIN PAGE CONTENT-->
			<div class="timeline">
				<!-- TIMELINE ITEM 
				<div class="timeline-item">
					<div class="timeline-badge">
						<div class="timeline-icon">
							<i class="icon-emoticon-smile font-green-haze"></i>
							<img class="timeline-badge-userpic" src="<?php echo base_url()?>assets/admin/pages/media/users/avatar80_2.jpg">
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
	<?php include("templates/quicksidebar/quicksidebar_MicroBlog.php");?>
</div>
<!-- END CONTAINER -->