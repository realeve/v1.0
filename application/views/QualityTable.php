			<?php include("templates/themesetting.php");?>
			<!-- BEGIN PAGE HEADER 面包屑-->
			<div class="page-bar">
				<ul class="page-breadcrumb">
					<li>
						<a href="<?php echo base_url()?>">首页</a>
						<i class="fa fa-circle"></i>
					</li>
					<li>
						<a href="<?php echo base_url()?>QualityTable">报表查询</a>
						<i class="fa fa-circle"></i>
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
			<!--div class="note note-success">
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
			</div-->
			<div class="mt-element-ribbon bg-white">
				<button id="HideTips" type="button" class="close" data-dismiss="alert"></button>
                <div class="ribbon ribbon-border-hor ribbon-clip ribbon-color-info uppercase">
                    <div class="ribbon-sub ribbon-clip"></div> 小提示: </div>
                <p class="ribbon-content">
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
				</p>
            </div>
			<!-- END PAGE CONTENT-->
			<!-- BEGIN PAGE CONTENT-->

			<div class="row" id="Preview">
				<div class="col-md-12">
					<h3>预览地址:</h3>
						<div class="input-group" style="text-align:left">
							<input type="text" class="form-control" value="<?php echo base_url()?>DataInterface/Api?Token=<?php echo sha1('QCCenter'.$username)?>&ID=ID&M=3&tstart=参数1&tend=参数2">
							<span class="input-group-btn">
							<a href="javascript:;" class="btn green">
							<i class="fa fa-eye"></i> 预览接口 </a>
							</span>
						</div>
						<div class="help-block">
							 将此处的参数(例如: 参数1, 参数2)更换为你所需测试的数据并点击预览按钮测试接口有效性.
						</div>
					<hr>
				</div>
			</div>
			<!-- BEGIN Portlet PORTLET-->
			<div class="portlet light bordered">
				<div class="portlet-title">
					<div class="caption font-green-sharp">
						<i class="icon-speech font-green-sharp"></i>
						<span class="caption-subject bold uppercase" name="TableTitle"> 表单名称</span>
						<span class="caption-helper" name="datasource">(数据来源:质量综合管理系统)...</span>
					</div>
					<div class="tools"></div>
				</div>
				<div class="portlet-body form">	
					<table class="table table-striped table-bordered table-hover table-header-fixed" width="100%" name="sampleTable">
						<thead class="hidden-sm"></thead>						
					</table>
				</div>
			</div>
			<!-- END Portlet PORTLET-->

			<!-- END PAGE CONTENT-->
		</div>
	</div>
	<!-- END CONTENT -->
	<!--?php include("templates/quicksidebar/quicksidebar_QualityTable.php");?-->
</div>
<!-- END CONTAINER -->