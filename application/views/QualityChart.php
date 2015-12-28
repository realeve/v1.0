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
						<a href="<?php echo base_url()?>QualityTable">印码质量报表</a>
						<i class="fa fa-circle"></i>
					</li>
					<li>
						<a href="<?php echo base_url()?>QualityTable">各品种质量汇总</a>
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
				质量曲线图  <small id="today"></small>
			</h3>
			<div class="note note-success">
				<a href="javascript:;" id="HideTips"><i class="glyphicon glyphicon-remove pull-right"></i></a>
				<h4 class="block"><i class="icon-info"></i> 小提示：</h4>
				<div class="row"> 
					<div class="col-md-6">
						<p>
						 	<i class="icon-size-actual"></i> 数据拖拽.
						</p>
						<p>
							 <i class="icon-settings"></i> 数据序列切换.
						</p>
						<p>
							 <i class="icon-magnifier"></i> 曲线类型切换.
						</p>
						</p>
					</div>
					<div class="col-md-6">
						<p>
							 <i class="icon-cloud-download"></i>数据编辑.
						</p>
						<p>
							 <i class="icon-heart"></i> 图片导出.<i class="fa fa-angle-right"></i>
						</p>
						<p>
							 <i class="icon-link"></i> 更多信息请访问:.
						</p>
					</div>
				</div>
			</div>

			<!-- END PAGE CONTENT-->
			<!-- BEGIN PAGE CONTENT-->

			<!-- BEGIN Portlet PORTLET-->
			<div class="portlet light bordered">
				<div class="portlet-title">
					<div class="caption font-green-sharp">
						<i class="icon-speech font-green-sharp"></i>
						<span class="caption-subject bold uppercase" id="TableTitle"> 质量曲线图</span>
						<span class="caption-helper" id="datasource">(数据来源:质量综合管理系统)...</span>
					</div>						
					<div class="actions"> 						
						<select class="bs-select form-control" data-style="blue" data-width="125px">
						</select>		 		
						<a class="btn btn-circle btn-icon-only btn-default fullscreen" href="#">
						</a>
					</div>
				</div>				
				<div class="row">
					<div class="col-md-12">
						<h3>接口地址:</h3>
							<div class="input-group" style="text-align:left">
								<input type="text" class="form-control" id="PreviewUrl" value="<?php echo base_url()?>DataInterface/Api?Author=<?php echo sha1($username)?>&ID=ID&M=3&tstart=参数1&tend=参数2">
								<span class="input-group-btn">
								<a href="javascript:;" class="btn green" id="Preview">
								<i class="fa fa-eye"></i> 预览接口 </a>
								</span>
							</div>
							<div class="help-block">
								 将此处的参数(例如: 参数1, 参数2)更换为你所需测试的数据并点击预览按钮测试接口有效性.
							</div>
						<hr>
					</div>
				</div>
				<div class="portlet-body form">	
				</div>
			</div>
			<!-- END Portlet PORTLET-->

			<!-- END PAGE CONTENT-->
		</div>
	</div>
	<!-- END CONTENT -->
	<?php include("templates/quicksidebar/quicksidebar_QualityChart.php");?>
</div>
<!-- END CONTAINER -->