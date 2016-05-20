			<?php include("templates/themesetting.php");?><!-- BEGIN PAGE HEADER 面包屑-->
			<div class="page-bar">
				<ul class="page-breadcrumb">
					<li>
						<a href="<?php echo base_url()?>">首页</a>
						<i class="fa fa-circle"></i>
					</li>
					<li>
						<a href="javascript:;">事务处理</a>
						<i class="fa fa-circle"></i>
					</li>
					<li>
						<a href="<?php echo base_url()?>DataInterface">数据接口</a>
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
				<span class="caption-subject bold uppercase" name="TableTitle"></span>   <small id="today"></small>
			</h3>
			<!--div class="alert alert-block alert-info fade in">
                <button type="button" class="close" data-dismiss="alert"></button>
                   <h4 class="alert-heading"><i class="icon-info"></i> 小提示：</h4>
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
			<div class="note note-warning">
				<button id="HideTips" type="button" class="close" data-dismiss="alert"></button>
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
			<div class="mt-element-ribbon bg-white">
				<button id="HideTips" type="button" class="close" data-dismiss="alert"></button>
                <div class="ribbon ribbon-border-hor ribbon-clip ribbon-color-danger uppercase">
                    <div class="ribbon-sub ribbon-clip"></div> 小提示: </div>
                <p class="ribbon-content">
                	<p>
					 <i class="icon-size-actual"></i> 本部分提供各质量数据查询接口定制功能，设置后请牢记接口链接.
					</p>
					<p>
						 <i class="icon-settings"></i> 数据格式为标准Json格式，请按相关标准解析.
					</p>
					<p>
						 <i class="icon-call-end"></i> 如有疑问，请联系技术质量部:8275-6129.<br>
					</p>	
				</p>
            </div-->
			<div class="portlet mt-element-ribbon light portlet-fit bordered">
                <div class="ribbon ribbon-right ribbon-clip ribbon-shadow ribbon-border-dash-hor ribbon-color-danger uppercase">
                    <div class="ribbon-sub ribbon-clip ribbon-right"></div> 小提示 </div>
                <div class="portlet-title">
                    <div class="caption">
                        <i class=" icon-layers font-green"></i>
                        <span class="caption-subject font-green bold uppercase">小提示</span>
                    </div>
                </div>
                <div class="portlet-body">
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
							<div class="portlet light bordered">
								<div class="portlet-title">
									<div class="caption font-green-sharp">
										<i class="icon-speech font-green-sharp"></i>
										<span class="caption-subject bold uppercase" id="apiList_TableTitle"> 表单名称</span>
										<span class="caption-helper" id="sample_datasource">(数据来源:质量综合管理系统)...</span>
									</div>
									<div class="tools" id="apiList_tools"></div>
								</div>
                                <div class="portlet-body">
                                    <div class="table-toolbar pull-right">
		                                    <div class="btn-group">
		                                        <button id="newAPI" class="btn green">
		                                            添加接口 <i class="fa fa-plus"></i>
		                                        </button>
		                                    </div>
                                    </div>
                                    <table class="table table-striped table-bordered table-hover table-header-fixed" id="apiList">
                                        <thead class="hidden-sm">
	                                        <tr>
	                                            <th>序号</th>
	                                            <th>所有者</th>
	                                            <th>数据库</th>
	                                            <th>接口名称</th>
	                                            <th>查询语句</th>
	                                            <th>参数列表</th>
	                                            <th>编辑</th>
	                                            <th>删除</th>
	                                        </tr>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
						</div>
						<div class="tab-pane active container-fluid" id="portlet_tab2">
							<!-- BEGIN PAGE CONTENT-->							
							<div class="row">
								<div class="col-md-12 form-body">
									<table id="user" class="table table-striped table-bordered table-advance">
									<thead>
										<th>接口属性</th>
										<th style="width:50%">值</th>
										<th style="width:35%">说明</th>
									</thead>
									<tbody>
									<tr>
										<td>
											 接口编号
										</td>
										<td>
											<a id="ApiID" data-type="text" data-pk="1" data-placeholder="接口编号">
											<?php echo $CreateID?></a>
										</td>
										<td>
											<span class="text-muted">
											系统自动生成的编号 </span>
										</td>
									</tr>
									<tr>
										<td>
											 创建者
										</td>
										<td>
											<a href="#" id="AuthorName" style="white-space: pre-line" data-type="text" data-pk="1" data-placement="right" data-placeholder="Required" data-original-title="接口建立人员">
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
										<td>
											 接口名称
										</td>
										<td>
											<a href="#" id="ApiName" data-type="text" data-pk="1" data-placeholder="接口名" data-original-title="请输入接口名称">
											</a>
										</td>
										<td>
											<span class="text-muted">
											输入接口名称方便检索,默认为空值 </span>
										</td>
									</tr>								
									
									<tr>
										<td>
											 所属数据库
										</td>
										<td>
											<a href="#" id="DataBaseID" data-type="select2" data-pk="1" data-value="0" data-original-title="请选择数据库">
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
											<!--a href="#" id="params" data-type="select2" data-pk="1" data-original-title="参数说明">
											tstart,tend </a-->
											<input type="text" id="params" value="tstart,tend" data-role="tagsinput">
											 <!--select multiple id="params" data-role="tagsinput">
                                                <option value="tstart">tstart</option>
                                                <option value="tend">tend</option>
                                            </select-->
										</td>
										<td>
											<span class="text-muted">
											请在此输入SQL查询语句中的参数顺序(英文小写)
											</br><span class="badge badge-roundless badge-danger">除非该参数值为0时能顺利执行，调用时不能为空值</span>
											</br>其中系统保留字段为Token(所有者)/ID(接口编号)/M(数据模式)</span>
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
											<a id="url" data-type="text" data-pk="1" data-placement="right" title="接口地址" href="<?php echo base_url()?>DataInterface/Api?Token=<?php echo $token?>&ID=<?php echo $CreateID?>&M=3" target="_blank">
												<?php echo base_url()?>DataInterface/Api?Token=<?php echo $token?>&ID=<?php echo $CreateID?>&M=3</a>
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
											<input type="text" class="form-control" id="PreviewUrl" value="<?php echo base_url()?>DataInterface/Api?Token=<?php echo $token?>&ID=<?php echo $CreateID?>&M=3&tstart=参数1&tend=参数2">
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
			
			<div class="portlet light bordered" name="api_View">
				<div class="portlet-title">
					<div class="caption font-green-sharp">
						<i class="icon-speech font-green-sharp"></i>
						<span class="caption-subject bold uppercase" id="sample_TableTitle"> 表单名称</span>
						<span class="caption-helper" id="sample_datasource">(数据来源:质量综合管理系统)...</span>
					</div>
					<div class="tools" id="sample_tools"></div>
				</div>
				<div class="portlet-body form">	
					<table class="table table-striped table-bordered table-hover" width="100%" id="sample">
						<!-- BEGIN PAGE CONTENT-->						
							<!-- END PAGE CONTENT-->
							<!--table class="table table-striped table-bordered table-advance table-hover table-striped table-condensed flip-content" id="sample" width="100%"-->
						<thead class="hidden-sm"></thead>						
					</table>			
				</div>
			</div>
			<!-- END Portlet PORTLET-->

			<!-- END PAGE CONTENT-->
		</div>
	</div>
	<!-- END CONTENT -->
</div>
<!-- END CONTAINER -->