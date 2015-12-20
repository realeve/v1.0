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
						<i class="fa fa-home"></i>
						<a href="<?php echo base_url()?>">首页</a>
						<i class="fa fa-angle-right"></i>
					</li>
					<li>
						<a href="<?php echo base_url()?>worklog">机检日志</a>
						<i class="fa fa-angle-right"></i>
					</li>
					<li>
						<a href="<?php echo base_url()?>worklog/editlog">填写日志</a>
					</li>
				</ul>
				
				<div class="page-toolbar">
					<div class="btn-group">
						<button type="button" class="btn btn-sm btn-circle btn-default dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-delay="1000" data-close-others="true">
						操作 <i class="fa fa-angle-down"></i>
						</button>
						<ul class="dropdown-menu pull-right" role="menu">
							<li>
								<a href="#portlet-config">操作1</a>
							</li>
							<li>
								<a href="#">操作2</a>
							</li>
							<li>
								<a href="#">其它操作</a>
							</li>
							<li class="divider">
							</li>
							<li>
								<a href="#">分离文本</a>
							</li>
						</ul>
					</div>
				</div>
			</div>	
			
			<h6 class="page-title"></h6>

			<!-- BEGIN PAGE CONTENT-->
			<div class="portlet light">
				<div class="portlet-title">
					<div class="caption font-yahei">
						<i class="icon-pencil"></i>
						<span class="caption-subject bold font-yellow-casablanca">1.基础信息</span>
						<span class="caption-helper">添加记录</span>
					</div>
					<div class="tools">
						<a href="#" class="collapse">
						</a>
						<a href="#portlet-config" data-toggle="modal" class="config">
						</a>
						<a href="#" class="reload">
						</a>
						<a class="fullscreen" href="#">
						</a>
						<!--<a href="#" class="remove">
						</a>-->
					</div>
				</div>
				<div class="portlet-body form">
					<!-- BEGIN FORM-->
					<form class="horizontal-form">
						<div class="form-body">
							<div class="row">
								<div class="col-md-6">
									<label class="control-label">i.工序</label>
									<div style="margin:5px 0 15px 0;">
										<input type="radio" name="workProc" value="1" data-on-color="success" data-off-color="warning" data-on-text="钞纸" data-off-text="钞纸" class="make-switch switch-radio1">&nbsp;&nbsp;&nbsp;&nbsp;
										<input type="radio" name="workProc" value="2" data-on-color="success" data-off-color="warning" data-on-text="胶凹" data-off-text="胶凹"  class="make-switch switch-radio1">&nbsp;&nbsp;&nbsp;&nbsp;
										<input type="radio" name="workProc" value="3" data-on-color="success" data-off-color="warning" data-on-text="印码" data-off-text="印码"  class="make-switch switch-radio1">&nbsp;&nbsp;&nbsp;&nbsp;
										<input type="radio" name="workProc" value="4" data-on-color="success" data-off-color="warning" data-on-text="检封" data-off-text="检封"  class="make-switch switch-radio1">
									</div>
								</div>
								<!--/span-->
								<div class="col-md-6">
									<label class="control-label">ii.班次</label>
									<div style="margin:5px 0 15px 0;">
										<input type="radio" name="workClass" value="1" data-on-color="success" data-on-text="白班" data-off-text="白班" class="make-switch switch-radio1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
										<input type="radio" name="workClass" value="2" data-on-color="success" data-on-text="中班" data-off-text="中班"  class="make-switch switch-radio1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
										<input type="radio" name="workClass" value="3" data-on-color="success" data-on-text="夜班" data-off-text="夜班"  class="make-switch switch-radio1">
									</div>
								</div>
								<!--/span-->
							</div>

							<!--/row-->
							<div class="row">
								<div class="col-md-6">
									<div class="form-group form-md-line-input form-md-floating-label">
										<label class="control-label">iii.机台</label>									
										<select name="MachineName" id="MachineName" class="select2_category bs-select form-control select2me"  data-placeholder="请选择机台...">
											<option value=""></option>
											<optgroup label="钞纸">
												<option value="10">老线-1</option>
												<option value="11">新线-2</option>
												<option value="12">新线-3</option>
											</optgroup>
											<optgroup label="成品">
												<option value="13">Pasaban</option>
												<option value="14">Bilomatic-1</option>
												<option value="15">Bilomatic-2</option>
											</optgroup>
											<optgroup label="胶凹">
												<option value="1">J98-1</option>
												<option value="2">J98-2</option>
												<option value="3">J98-3</option>
											</optgroup>
											<optgroup label="印码">
												<option value="4">DMJ12-1</option>
												<option value="5">DMJ12-2</option>
												<option value="6">DMJ12-3</option>
											</optgroup>
											<optgroup label="检封">
												<option value="7">清分机-1</option>
												<option value="8">清分机-2</option>
												<option value="9">清分机-3</option>
											</optgroup>											
										</select>
										<span class="help-block">
										(选择您所处理的机台)</span>
									</div>
								</div>
								<!--/span-->
								<div class="col-md-6">
									<div class="form-group form-md-line-input form-md-floating-label">
										<label class="control-label">iv.品种</label>									
										<select name="ProductName" id="ProductName" class="select2_category bs-select form-control select2me"  data-placeholder="请选择产品品种...">
											<option value=""></option>
											<optgroup label="印钞">
												<option value="1">9602A</option>
												<option value="2">9603A</option>
												<option value="3">9604A</option>
												<option value="4">9607A</option>
												<option value="5">9607T</option>
											</optgroup>
											<optgroup label="钞纸">
												<option value="6">103-G-2A</option>
												<option value="7">103-G-3A</option>
												<option value="8">103-G-4A</option>
												<option value="9">103-G-7A</option>
												<option value="10">103-G-7T</option>
											</optgroup>
										</select>
										<span class="help-block">
										(选择相应机台产品品种名)</span>
									</div>
								</div>
								<!--/span-->
							</div>			
						</form>
						<!-- END FORM-->
					</div>
				</div>
			</div>
			<!-- END PAGE CONTENT-->

			<!-- BEGIN PAGE CONTENT-->
			<div class="portlet light">
				<div class="portlet-title">
					<div class="caption font-yahei font-purple-plum">
						<i class="icon-pencil"></i>
						<span class="caption-subject bold uppercase">2.处理结果</span>
					</div>
					<div class="tools">
						<a href="#" class="collapse">
						</a>
						<a href="#portlet-config" data-toggle="modal" class="config">
						</a>
						<a href="#" class="reload">
						</a>
						<a class="fullscreen" href="#">
						</a>
						<!--<a href="#" class="remove">
						</a>-->
					</div>
				</div>
				<div class="portlet-body form">
					<!-- BEGIN FORM-->
					<form class="horizontal-form">
						<div class="form-body">						
							<!--/row-->
							<div class="row">
								<div class="col-md-6">
									<div class="form-group">
										<label class="control-label">i.处理状态</label>									
										<select name="ProStatus" id="ProStatus" class="select2_category bs-select form-control select2me"  data-placeholder="请选择处理结果...">
											<option value=""></option>
											<optgroup label="已完成">
												<option value="1" selected>当班解决</option>
												<option value="2">经后续处理解决</option>
												<option value="3">已处理，需观察</option>
											</optgroup>
											<optgroup label="处理中">
												<option value="4">移交对班</option>
												<option value="5">移交外协</option>
												<option value="6">原因查找中</option>
											</optgroup>
										</select>
										<span class="help-block">
										(选择故障处理结果信息)</span>
									</div>
								</div>
								<!--/span-->
								<div class="col-md-6">
									<div class="form-group">
										<label class="control-label">ii.处理时间</label>
										<div class="input-group date form_advance_datetime" data-date="<?php echo date('Y-m-d',time());?>">
											<input name="ProTime" id="ProTime" type="text" size="16" class="form-control">
											<span class="input-group-btn">
											<button class="btn default date-reset" type="button"><i class="fa fa-times"></i></button>
											<button class="btn default date-set" type="button"><i class="fa fa-calendar"></i></button>
											</span>
										</div>
										<span class="help-block">
										(选择故障处理起始时间)</span>
									</div>
								</div>
								<!--/span-->
							</div>
							<div class="row">
								<div class="col-md-6">
									<label class="control-label">iii.操作人员</label>
									<div class="form-group has-warning">																				
										<select name="ProUserName" id="ProUserName" multiple="multiple" class="multi-select required ">
											<optgroup label="钞纸机检组">
												<option value="1">于潇</option>
												<option value="2">丰锋</option>
												<option value="3">彭鹏</option>
											<optgroup>
											<optgroup label="胶凹机检组">
												<option value="4">赵文倩</option>
												<option value="5">蒲明玥</option>
											<optgroup>
											<optgroup label="印码机检组">
												<option value="6">舒粤</option>												
												<option value="7">马可</option>
												<option value="8">胡新玥</option>
												<option value="9">李超群</option>
												<option value="10">徐闵</option>
												<option value="11">李宾</option>
											<optgroup>
											<optgroup label="检封机检组">
												<option value="12">杨林</option>
												<option value="13">金鑫</option>
												<option value="14">包诚</option>
											<optgroup>
										</select>									
										<span class="help-block">
										(请选择故障处理人员)</span>
									</div>
								</div>
								<div class="col-md-6">
									<div class="form-group">
										<label class="control-label">iv.事务移交</label>	
										<select name="TransUserName[]" id="TransUserName" multiple="multiple" class="multi-select">
											<optgroup label="钞纸机检组">
												<option value="1">于潇</option>
												<option value="2">丰锋</option>
												<option value="3">彭鹏</option>
											<optgroup>
											<optgroup label="胶凹机检组">
												<option value="4">赵文倩</option>
												<option value="5">蒲明玥</option>
											<optgroup>
											<optgroup label="印码机检组">
												<option value="6">舒粤</option>												
												<option value="7">马可</option>
												<option value="8">胡新玥</option>
												<option value="9">李超群</option>
												<option value="10">徐闵</option>
												<option value="11">李宾</option>
											<optgroup>
											<optgroup label="检封机检组">
												<option value="12">杨林</option>
												<option value="13">金鑫</option>
												<option value="14">包诚</option>
											<optgroup>
										</select>
										<span class="help-block">
										(如果没有则不用选择，系统会将该信息通知至所选择人员)</span>
									</div>
								</div>
							</div>
							<div class="row">
								<div class="col-md-6">
									<div class="form-group form-md-line-input form-md-floating-label">										
										<input name="ProInfo" ID="ProInfo" type="text" class="form-control">
										<label for="ProInfo">v.相关车号/轴号</label>
										<span class="help-block">
										输入产品可能涉及的车号/轴号</span>
									</div>									
								</div>
								<!--/span-->
								<div class="col-md-6">
									<label class="control-label">vi.添加至工作报告</label>
									<div class="has-warning" style="margin:0px 0 15px 0;">
										<input type="checkbox" name="ReportOutput" id="ReportOutput" data-on-color="success" data-on-text="添加" data-off-text="不添加" checked class="make-switch switch-radio1">
										<span class="help-block">
										(是否将该条信息生成至工作报告中,零碎事件不建议勾选)</span>
									</div>						
								</div>
								<!--/span-->
							</div>
							<div class="row">
								<div class="col-md-6">
									<div class="form-group form-md-line-input form-md-floating-label">										
										<input name="RecordUserName" id="RecordUserName" type="text" value="<?php echo $FullName?>" class="form-control">
										<label>vii.记录人</label>
									</div>
									<span class="help-block">
										请在此输入用户名</span>
								</div>
								<!--/span-->
								<div class="col-md-6">
									<div class="form-group form-md-line-input form-md-floating-label">
										<label>viii.记录时间</label>
										<input name="RecordTime" id="RecordTime" type="text" disabled value="<?php echo $curDate?>" placeholder="记录时间" class="form-control">
									</div>
								</div>
								<!--/span-->
							</div>
						</div>			
					</form>
					<!-- END FORM-->
				</div>
			</div>
			<!-- END PAGE CONTENT-->
						

			<!-- BEGIN PAGE CONTENT-->
			<div class="portlet light">
				<div class="portlet-title">
					<div class="caption font-yahei">
						<i class="icon-pencil"></i>
						<span class="caption-subject bold font-green-meadow">3.故障描述</span>
					</div>
					<div class="tools">
						<a href="#" class="collapse">
						</a>
						<a href="#portlet-config" data-toggle="modal" class="config">
						</a>
						<a href="#" class="reload">
						</a>
						<a class="fullscreen" href="#">
						</a>
						<!--<a href="#" class="remove">
						</a>-->
					</div>
				</div>
				<div class="portlet-body form">
					<!-- BEGIN FORM-->
					<form class="horizontal-form">
						<div class="form-body">
							<!--/row-->
							<h4 class="form-section font-blue-hoki" style="border-bottom: 2px solid #eee;">1.问题分类</h4>
							<div class="row">
								<div class="col-md-6">
									<div class="form-group has-warning">
										<label>i.一级描述</label>
										<select name="MainDesc" id="MainDesc" class="select2_category bs-select form-control select2me"  data-placeholder="一级描述...">
											<option value=""></option>
											<option value="1">软件故障</option>
											<option value="2">硬件故障</option>
											<option value="3" selected>模型调整</option>	
											<option value="4">系统升级</option>
											<option value="5">其它</option>	

										</select>																		
										<span class="help-block">
											(信息的分类意义非常重要，请您勿必选择)</span>
									</div>
								</div>
								<!--/span-->
								<div class="col-md-6">
									<div class="form-group has-warning">
										<label>ii.二级描述</label>
										<select name="SubDesc" id="SubDesc" class="select2_category bs-select form-control select2me"  data-placeholder="二级描述...">
												<option value=""></option>
											<optgroup label="软件故障">
												<option value="1">操作系统</option>
												<option value="2">数据库</option>
												<option value="3">检测系统</option>
												<option value="4">其它</option>
											</optgroup>
											<optgroup label="硬件故障">
												<option value="5">相机</option>
												<option value="6">数据线</option>
												<option value="7">采集卡</option>
												<option value="8">服务器/工控机</option>
												<option value="9">其它</option>
											</optgroup>
											<optgroup label="模型调整">
												<option value="10">新建模型</option>
												<option value="11">实物验证</option>
												<option value="12">虚拟验证</option>
												<option value="13" selected>临时学样</option>
												<option value="14">样张更新</option>
												<option value="15">转产</option>
												<option value="16">漏废调整</option>
												<option value="17">其它</option>
											</optgroup>	
											<optgroup label="系统升级">
												<option value="18">软件升级</option>
												<option value="19">硬件升级</option>
											</optgroup>	
											<optgroup label="其它">
												<option value="20">其它</option>
											</optgroup>											
										</select>	
										<span class="help-block">
											(信息的分类意义非常重要，请您勿必选择)</span>
									</div>
								</div>
								<!--/span-->
							</div>
							<h4 class="form-section font-blue-hoki" style="border-bottom: 2px solid #eee;">2.故障描述</h4>
							<div class="row">
								<div class="col-md-12 ">
									<div class="form-group">
										<div name="ErrDesc" id="ErrDesc">	</div>
									</div>
								</div>
							</div>						

							<div class="form-actions right">
								<button type="button" id="Preview" class="btn btn-circle default" style="margin-right:30px;">取消</button>
								<button type="button" id="SaveChanges" class="btn btn-circle green" style="margin-right:30px;"><i class="fa fa-check"></i> 提交</button>
							</div>
						</div>			
					</form>
					<!-- END FORM-->
				</div>
			</div>
			<!-- END PAGE CONTENT-->



		</div>
	</div>
	<!-- END CONTENT -->
	<?php include("templates/quicksidebar.php");?>
</div>
<!-- END CONTAINER -->