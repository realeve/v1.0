			<!-- BEGIN PAGE HEADER 面包屑-->
			<div class="page-bar">
				<ul class="page-breadcrumb">
					<li>
						<i class="fa fa-home"></i>
						<a href="<?php echo base_url()?>">首页</a>
						<i class="fa fa-angle-right"></i>
					</li>
					<li>
						<a href="<?php echo base_url()?>QualityTable">印码质量报表</a>
						<i class="fa fa-angle-right"></i>
					</li>
					<li>
						<a href="<?php echo base_url()?>QualityTable">各品种质量汇总</a>
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
						印码质量报表  <small id="today"></small>
					</h3>
				
				</div>
				<!-- END PAGE HEADER-->
				<div class="col-md-6">
					<!-- BEGIN STYLE CUSTOMIZER -->
					<?php include("templates/themesetting.php");?>
					<!-- END STYLE CUSTOMIZER -->
				</div>
			</div>	
			<div class="note note-success">
				<a href="javascript:;" id="HideTips"><i class="glyphicon glyphicon-remove pull-right"></i></a>
				<h4 class="block"><i class="icon-info"></i> 小提示：</h4>
				<p>
					 <i class="icon-size-actual"></i> 响应式设计：试着改变一下浏览器宽度以查看不同布局下页面的变化.
				</p>
				<p>
					 <i class="icon-settings"></i> 自由定制：拖动表头各列可以改变各列顺序；在“列操作”按钮中可以对各列数据隐藏或显示.
				</p>
				<p>
					 <i class="icon-magnifier"></i> 数据过滤：表格右上角的搜索框支持对所有数据进行过滤；数据加载完毕后,点击单元格，系统会自动筛选该单元格所在值.
				</p>
				<p>
					 <i class="icon-cloud-download"></i> 数据导出：点击表格上方的'PDF'/'Excel'等按钮可以将数据保存到本地.
				</p>
				<p>
					 <i class="icon-heart"></i> 贴心保存：对于表单所做的所有设置操作都将会自动记录下来(包括各列顺序哟<i class="icon-emoticon-smile"></i>)，下次启动页面将不再设置.
				</p>
			</div>

			<!-- END PAGE CONTENT-->
			<!-- BEGIN PAGE CONTENT-->

			<!-- BEGIN Portlet PORTLET-->
			<div class="portlet light bordered">
				<div class="portlet-title">
					<div class="caption font-green-sharp">
						<i class="icon-speech font-green-sharp"></i>
						<span class="caption-subject bold uppercase" id="TableTitle"> 表单名称</span>
						<span class="caption-helper" id="datasource">(数据来源:质量综合管理系统)...</span>
					</div>
					<div class="row col-md-6 tools"></div>
				</div>
				<div class="portlet-body form">	
					<div class="container-fluid">
						<!-- BEGIN PAGE CONTENT-->
						<div class="flip-scroll">							
							<!-- END PAGE CONTENT-->
							<table class="table table-striped table-bordered table-advance table-hover table-striped table-condensed flip-content" id="sample" width="100%">
								<thead class="flip-content hidden-sm"></thead>						
							</table>	
						</div>
					</div>				
				</div>
			</div>
			<!-- END Portlet PORTLET-->

			<!-- END PAGE CONTENT-->
		</div>
	</div>
	<!-- END CONTENT -->
	<?php include("templates/quicksidebar/quicksidebar_QualityTable.php");?>
</div>
<!-- END CONTAINER -->