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
			</div-->

			<div class="mt-element-ribbon bg-white">
				<button id="HideTips" type="button" class="close" data-dismiss="alert"></button>
                <div class="ribbon ribbon-border-hor ribbon-clip ribbon-color-success uppercase">
                    <div class="ribbon-sub ribbon-clip"></div> 小提示: </div>
                <p class="ribbon-content">     
	                <div class="table-responsive">
	                	<table class="table table-striped table-bordered table-hover">
							<thead><tr><th>参数名</th><th>参数说明</th><th>可选值</th></tr></thead>
							<tbody>
								<tr><td>tid</td><td>图表ID</td><td>随数据接口而变化</td></tr>
								<tr><td>type</td><td>图表类型</td><td>line:曲线图,bar:柱状图,boxplot:箱形图,pie:饼图,funnel:漏斗图,sunrise:旭日图,parallel:平行坐标系,treemap:树形图,radar:雷达图,scatter:散点图</td></tr>
								<tr><td>minmax</td><td>箱形图boxplot专用，将上下边缘设置为最大最小值</td><td>0，1</td></tr>
								<tr><td>linearea</td><td>线形图专用，设为1表示面积图</td><td>0，1</td></tr>
								<tr><td>circle</td><td>饼图专用，设为1表示为环形图</td><td>0，1（默认为1)</td></tr>
								<tr><td>rose</td><td>饼图专用，是否为玫瑰图</td><td>area(面积模式),radius(半径模式)</td></tr>
								<tr><td>smooth</td><td>线型图专用，是否平滑曲线</td><td>0,1</td></tr>
								<tr><td>dimension</td><td>平行坐标系专用，默认以第几维数据区分线条颜色</td><td>默认1</td></tr>
								<tr><td>squareratio</td><td>树形图专用，每个方格的长宽比</td><td>(默认)1.618</td></tr>
								<tr><td>shape</td><td>雷达图专用，雷达形状，默认为多边形(polygon)，可设为环形(circle)</td><td>(默认)polygon,circle</td></tr>
								<tr><td>scattersize</td><td>散点图专用，最大散点大小</td><td>(默认)15</td></tr>

								<tr><td>reverse</td><td>是否反转X/Y轴<br>对于柱状图/箱形图，变换X/Y轴后图像有不同的表现，例如柱状图交换后成为了条形图</td><td>0,1</td></tr>
								<tr><td>markline</td><td>标注线（平均值）</td><td>0,1</td></tr>
								<tr><td>markpoint</td><td>标注点（最大值，最小值）</td><td>0,1</td></tr>
								<tr><td>barwidth</td><td>柱形宽度</td><td>数值型(默认100)</td></tr>
								<tr><td>splitarea</td><td>值域背景分割条</td><td>0，1</td></tr>
								<tr><td>zoom</td><td>显示缩放控件</td><td>0(关闭),v(vertical 垂直),h(horizontal 水平),vh(同时打开)</td></tr>
								<!--tr><td>blind</td><td>多表是否绑定，如果不绑定则各图表独立操作</td><td>0,1</td></tr-->
							</tbody>
						</table>
	                </div>          
					<p>注：<br>
					   1.各图表可单独设置参数，以逗号隔开; <br>
					   2.关于可视化图表的更多详情请<a href="../topic/doc/slide" target="_blank">点击这里</a></p>
				</p>
            </div>

			<!-- END PAGE CONTENT-->
			<!-- BEGIN PAGE CONTENT-->		

			<div class="row" id="Preview">
				<div class="col-md-12">
					<h3>接口地址:</h3>
					<div class="input-group" style="text-align:left">
						<input type="text" class="form-control" value="<?php echo base_url()?>DataInterface/Api?Author=<?php echo sha1($username)?>&ID=ID&M=3&tstart=参数1&tend=参数2">
						<span class="input-group-btn">
						<a href="javascript:;" class="btn green">
						<i class="fa fa-eye"></i> 预览接口 </a>
						</span>
					</div>
					<div class="help-block">
						 将此处的参数(例如: 参数1, 参数2)更换为你所需测试的数据并点击预览按钮测试接口有效性.
					</div>
				</div>
			</div>
					
			<!-- BEGIN Portlet PORTLET-->
			<div class="portlet light bordered">
				<div class="portlet-title">
					<div class="caption font-green-sharp">
						<i class="icon-speech font-green-sharp"></i>
						<span class="caption-subject bold uppercase" name="TableTitle"> 图表接口</span>
						<span class="caption-helper" name="datasource">(数据来源:质量综合管理系统)...</span>
					</div>						
					<div class="actions"> 						
						<select class="bs-select form-control" data-style="blue" data-width="125px">
						</select>		 		
						<a class="btn btn-circle btn-icon-only btn-default fullscreen" href="#">
						</a>
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
</div>
<!-- END CONTAINER -->