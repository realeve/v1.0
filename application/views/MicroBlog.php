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
						<a href="<?php echo base_url()?>MicroBlog">工作笔记</a>
					</li>
				</ul>
				
				<div class="page-toolbar">
					<div id="dashboard-report-range" class="pull-right tooltips btn btn-fit-height dark" data-placement="top" data-original-title="点击修改查询时间">
						<i class="icon-calendar"></i>&nbsp;
						<span class="thin uppercase">&nbsp;</span>&nbsp;
						<i class="fa fa-angle-down"></i>
					</div>
				</div>
			</div>	
			<h3 class="page-title font-yahei">
				<span class="caption-subject bold uppercase" name="TableTitle"></span>  <small id="today"></small>
			</h3>
			
			<!-- BEGIN PAGE CONTENT-->
			<div class="chat-form" style="background-color:#f1f3fa;">
				<div class="input-group" style="text-align:left">
					<textarea id="BlogContent" class="form-control" rows="3" placeholder="您想记点什么？" style="resize:none"></textarea>
					<span class="input-group-btn text-center">
						<a href="javascript:;" class="btn green-jungle icn-only" style="height:74px;" id="PostMicriBlog" data-sn="0" data-username="<?php echo $username ?>">
						<h5><i class="fa fa-check icon-white" style="padding-top:15px;"></i> 发送 </h5></a>
					</span>
				</div>
				<span class="help-block pull-right" style="margin-bottom:-5px;" id="WordNum">还可以输入140字</span>
			</div>

			<!-- END PAGE CONTENT-->
			<!-- BEGIN PAGE CONTENT-->
			<div class="timeline">							
			</div>
			<!-- END PAGE CONTENT-->
		</div>
	</div>
	<!-- END CONTENT -->
	<?php include("templates/quicksidebar/quicksidebar_MicroBlog.php");?>
</div>
<!-- END CONTAINER -->