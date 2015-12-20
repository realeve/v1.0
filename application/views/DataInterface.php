			<!-- BEGIN PAGE HEADER 面包屑-->
			<div class="page-bar">
				<ul class="page-breadcrumb">
					<li>
						<i class="fa fa-home"></i>
						<a href="<?php echo base_url()?>">首页</a>
						<i class="fa fa-angle-right"></i>
					</li>
					<li>
						<a href="javascript:;">事务处理</a>
						<i class="fa fa-angle-right"></i>
					</li>
					<li>
						<a href="<?php echo base_url()?>DataInterface">数据接口</a>
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
						质量数据接口  <small id="today"></small>
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
					 <i class="icon-size-actual"></i> 本部分提供各质量数据查询接口定制功能，设置后请牢记接口链接.
				</p>
				<p>
					 <i class="icon-settings"></i> 数据格式为标准Json格式，请按相关标准解析.
				</p>
				<p>
					 <i class="icon-call-end"></i> 如有疑问，请联系技术质量部:8275-6129.<br>
				</p>				
			</div>

			<!-- END PAGE CONTENT-->
			<!-- BEGIN PAGE CONTENT-->

			<!-- BEGIN Portlet PORTLET-->
			<div class="portlet light bordered">			
				<div class="portlet-title tabbable-line">
					<ul class="nav nav-tabs pull-left">
						<li class="active">
							<a href="#portlet_tab2" data-toggle="tab">
							<i class="icon-bar-chart"></i>&nbsp;添加接口</a>
						</li>
						<li>
							<a href="#portlet_tab1" data-toggle="tab">
							<i class="icon-settings"></i>&nbsp;查看接口</a>
						</li>
					</ul>	
					<div class="actions">		
						<!--a href="javascript:;" class="btn btn-circle btn-default">
							<i class="fa fa-plus"></i> 新建 </a-->
						<a href="javascript:;" class="btn btn-circle blue-hoki" id="edit">
							<i class="fa fa-pencil"></i> 编辑/预览 </a>
						<a href="javascript:;" class="btn btn-circle btn-success" id="saves">
							<i class="icon-cloud-upload"></i> 提交 </a>						
						<a class="btn btn-circle btn-icon-only btn-default fullscreen" href="javascript:;">
						</a>
					</div>						
				</div>

				<div class="portlet-body form">
					<div class="tab-content">
						<div class="tab-pane" id="portlet_tab1">
							<div class="scroller form-body" style="height: 700px;">
								<!--/row-->
								<h4 class="form-section font-blue-hoki">1.通用设置</h4>

								<div class="row">
									<div class="col-md-6">
										<div class="form-group">
											<label class="control-label">i.统计方式</label>									
											<select name="QueryWay" id="QueryWay" class="select2_category bs-select form-control select2me"  data-placeholder="请选择统计方式...">
												<option value=""></option>												
												<option value="1">逐月统计</option>
												<option value="2" selected>汇总统计</option>																					
											</select>
											<span class="help-block">
											(您是想逐月统计还是汇总统计)</span>
										</div>
									</div>
									<!--/span-->
									<div class="col-md-6">
										<div class="form-group">
											<label class="control-label">ii.品种</label>									
											<select name="ProductName" id="ProductName" class="select2_category bs-select form-control select2me"  data-placeholder="请选择产品品种...">
												<option value=""></option>
												<optgroup label="印钞">
													<option value="1">9602A</option>
													<option value="2">9603A</option>
													<option value="3">9604A</option>
													<option value="4">9607A</option>
													<option value="5">9607T</option>
													<option value="11" selected>所有品种</option>
												</optgroup>
												<optgroup label="钞纸">
													<option value="6">103-G-2A</option>
													<option value="7">103-G-3A</option>
													<option value="8">103-G-4A</option>
													<option value="9">103-G-7A</option>
													<option value="10">103-G-7T</option>
													<option value="12">所有品种</option>
												</optgroup>
											</select>
											<span class="help-block">
											(选择相应机台产品品种名)</span>
										</div>
									</div>
									<!--/span-->
								</div>	

								<div class="row">
									<div class="col-md-6">
										<div class="form-group">
											<label class="control-label">iii.数据类型</label>									
											<select name="DataType" id="DataType" class="select2_category bs-select form-control select2me"  data-placeholder="请选择数据类型..">
												<option value=""></option>												
												<option value="1" selected>平均值</option>
												<option value="2">原始数据</option>																					
											</select>
										</div>
									</div>
									<div class="col-md-6">
										<div class="form-group">
											<label class="control-label">iv.机台</label>									
											<select name="MachineName" id="MachineName" class="select2_category bs-select form-control select2me"  data-placeholder="请选择机台...">
												<option value=""></option>										
												<optgroup label="小张核查">
													<option value="4">大张-4#</option>
													<option value="5">大张-5#</option>
													<option value="6">大张-6#</option>
												</optgroup>
												<optgroup label="码后核查">
													<option value="7">M81D-1#</option>
													<option value="8">M81D-2#</option>
													<option value="9">多功能-1#</option>
													<option value="10">多功能-2#</option>
													<option value="11">多功能-3#</option>
												</optgroup>
												<optgroup label="其它">
													<option value="21">小张核查</option>
													<option value="22">码后核查</option>
													<option value="23" selected>所有机台</option>
												</optgroup>											
											</select>
											<span class="help-block">
											(选择您所处理的机台)</span>
										</div>
									</div>
								</div>

								<h4 class="form-section font-blue-hoki">2.缺陷反馈设置</h4>
								<div class="row">
									<div class="col-md-6">
										<div class="form-group">
											<label class="control-label">i.好品率类型</label>									
											<select name="GoodRateType" id="GoodRateType" class="select2_category bs-select form-control select2me"  data-placeholder="请选择数据类型..">
												<option value=""></option>												
												<option value="1">一次好品率</option>
												<option value="2">二次在线</option>		
												<option value="3" selected>二次离线</option>																					
											</select>
										</div>
									</div>
									<div class="col-md-6">
										<div class="form-group">
											<label class="control-label">ii.好品率范围</label>									
											<select name="GoodRateNum" id="GoodRateNum" class="select2_category bs-select form-control select2me"  data-placeholder="请选择好品率范围..">
												<option value=""></option>	
												<?php
													for ($i=1; $i <11 ; $i++) { 
														$k = 10*$i;
														$str = '<option value="'. $k .'"';
														if($k==70)
															$str.= ' selected';
														$str.= '>小于'.$k.'%</option>'."\n\t\t\t\t\t\t\t\t\t\t\t\t";
														echo $str;
													}													
												?>																	
											</select>
										</div>
									</div>
								
									<div class="col-md-6">
										<div class="form-group">
											<label class="control-label">iii.缺陷图类型</label>									
											<select name="GoodRateNum" id="GoodRateNum" class="select2_category bs-select form-control select2me"  data-placeholder="请选择好品率范围..">
												<option value="1" selected>实废图像</option>		
												<option value="2">所有图像</option>																	
											</select>
										</div>
									</div>									
								</div>
								<div class="form-actions right">
									<button id="QueryData2" class="btn btn-success btn-circle green"><i class="icon-magnifier"></i>查询数据</button>
								</div>
							</div>
						</div>
						<div class="tab-pane active container-fluid" id="portlet_tab2">
							<!-- BEGIN PAGE CONTENT-->							
							<div class="row">
								<div class="col-md-12 form-body">
									<table id="user" class="table table-striped table-bordered table-advance">
									<!--thead>
										<th>接口属性</th>
										<th style="width:50%">值</th>
										<th style="width:35%">说明</th>
									</thead-->
									<tbody>
									<tr>
										<td style="width:15%">
											 接口编号
										</td>
										<td style="width:50%">
											<a id="ApiID" data-type="text" data-pk="1" data-placeholder="接口编号">
											<?php echo $CreateID?></a>
										</td>
										<td style="width:35%">
											<span class="text-muted">
											系统自动生成的编号 </span>
										</td>
									</tr>
									<tr>
										<td>
											 创建者
										</td>
										<td>
											<a href="#" id="Author" data-type="text" data-pk="1" data-placement="right" data-placeholder="Required" data-original-title="接口建立人员">
											<?php echo $username?></a>
										</td>
										<td>
											<span class="text-muted">
											接口创建者 </span>
										</td>
									</tr>
									<tr>
										<td>
											 建立日期
										</td>
										<td>
											<a href="#" id="CreateDate" data-type="datetime" data-pk="1" data-placement="right" title="设置建立日期">
											 </a>
										</td>
										<td>
											<span class="text-muted">
											建立日期 </span>
										</td>
									</tr>
									<tr>
										<td style="width:15%">
											 接口名称
										</td>
										<td style="width:50%">
											<a href="#" id="ApiName" data-type="text" data-pk="1" data-placeholder="接口名" data-original-title="请输入接口名称">
											</a>
										</td>
										<td style="width:35%">
											<span class="text-muted">
											输入接口名称方便检索,默认为空值 </span>
										</td>
									</tr>								
									
									<tr>
										<td>
											 所属数据库
										</td>
										<td>
											<a href="#" id="DataBaseID" data-type="select" data-pk="1" data-value="0" data-original-title="请选择数据库">
											 </a>
										</td>
										<td>
											<span class="text-muted">
											选择该接口所属数据库以便系统自动连接</span>
										</td>
									</tr>									
									<tr>
										<td>
											 SQL语句
										</td>
										<td>
											<a href="#" id="SQL" data-type="textarea" data-pk="1" data-placeholder="请在此输入查询语句" data-original-title="请输入查询语句">
												 </a>
										</td>
										<td>
											<span class="text-muted">
											请在此输入接口SQL查询语句，接口条件用?代替，如:</br></br>
											Select GoodRate,MachineName</br>from TestTable </br>Where ProduceDate Between ? and ? </br>Group By MachineName </br>Order By 2
											</br> 按<i>ctrl+enter</i>提交输入
											</span>
										</td>
									</tr>									
									<tr>
										<td>
											 接口参数
										</td>
										<td>
											<a href="#" id="params" data-type="select2" data-pk="1" data-original-title="参数说明">
											tstart,tend </a>
										</td>
										<td>
											<span class="text-muted">
											请在此输入SQL查询语句中的参数顺序(英文小写)<span class="badge badge-roundless badge-danger">除非该参数值为0时能顺利执行，调用时不能为空值</span>
											</br>其中系统保留字段为Author(所有者)/ApiID(接口编号)/M(数据模式)</span>
										</td>
									</tr>											
									<tr>
										<td>
											 接口说明
										</td>
										<td>
											<div id="note" data-pk="1" data-type="wysihtml5" data-toggle="manual" data-original-title="Enter notes">
												 <p>[功能说明]</p>
												 <p style="text-indent:2em;">本接口主要用于 <i>XX</i> 信息的查询.</p>
												 <p>[主要参数]</p>
												<ol>
													<li>
														 tstart:开始时间；
													</li>
													<li>
														 tend:结束时间；
													</li>
													<li>
														 M:0.默认所有数据;1.输出列名;</br>2.预览模式;3.DataTables数据格式；
													</li>
												</ol>
											</div>
										</td>
										<td>
											<a href="#" id="pencil">
											<i class="fa fa-pencil"></i> [编辑] </a>
											<br>
											<span class="text-muted">
											请输入关于该接口的详细说明，方便后续开发者使用。 </span>
										</td>
									</tr>

									<tr class="hidden-xs">
										<td>
											 接口地址
										</td>
										<td>
											<a id="url" data-type="text" data-pk="1" data-placement="right" title="接口地址">
												<?php echo base_url()?>DataInterface/Api?Author=<?php echo sha1($username)?>&ID=<?php echo $CreateID?>&M=3</a>
										</td>
										<td>
											<span class="text-muted">
											系统生成的接口地址,使用时需自行补充相关参数。 </span>
										</td>
									</tr>
									</tbody>
									</table>
								</div>
							</div>
							<div class="row">
								<div class="col-md-12 form-actions right">
									<button type="button" id="Reset" class="btn btn-circle btn-default" style="margin-right:10px;"><i class="fa fa-repeat"></i> 重置</button>
									<button type="button" id="SaveAPI" class="btn btn-circle green" style="margin-right:30px;"><i class="icon-cloud-upload"></i> 提交</button>
								</div>
							</div>
							<div class="row">
								<div class="col-md-12">
									<h3>预览地址:</h3>
										<div class="input-group" style="text-align:left">
											<input type="text" class="form-control" id="PreviewUrl" value="<?php echo base_url()?>DataInterface/Api?Author=<?php echo sha1($username)?>&ID=<?php echo $CreateID?>&M=3&tstart=参数1&tend=参数2">
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
						</div>
					</div>	

				</div>
			</div>
			
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
								<tfoot></tfoot>
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
	<?php include("templates/quicksidebar/quicksidebar_DataInterface.php");?>
</div>
<!-- END CONTAINER -->