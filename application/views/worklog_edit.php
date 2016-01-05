			<?php include("templates/themesetting.php");?>
			<!-- BEGIN PAGE HEADER 面包屑-->
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
						
			<h3 class="page-title">
			机检日志原始记录 <small id="today"></small>
			</h3>
			<form role="form" name="theForm" class="form-horizontal">
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
						<div class="form-body">
							<div class="row">
								<div class="col-md-6 form-group">
									<label class="control-label col-md-3">工序
										<span class="required"> * </span>
									</label>
									<div class="col-md-9">
										<div class="input-group">
											<div class="icheck-inline" name="proc_id" data-proc="<?php echo $GroupID?>">
												<label>
												<input type="radio" name="proc_id" class="icheck"> 钞纸  </label>
												<label>
												<input type="radio" name="proc_id" class="icheck"> 胶凹 </label>
												<label>
												<input type="radio" name="proc_id" class="icheck"> 印码 </label>
												<label>
												<input type="radio" name="proc_id" class="icheck"> 检封 </label>
											</div>
										</div>
									</div>
								</div>
								<div class="col-md-6 form-group">
									<label class="control-label col-md-3">班次
										<span class="required"> * </span>
									</label>
									<div class="col-md-9">
										<div class="input-group">
											<div class="icheck-inline">
												<label>
												<input type="radio" name="class_id" class="icheck"> 白班  </label>
												<label>
												<input type="radio" name="class_id" class="icheck"> 中班 </label>
												<label>
												<input type="radio" name="class_id" class="icheck"> 夜班 </label>
											</div>
										</div>
									</div>
								</div>
								<div class="col-md-6">
									<div class="form-group">
										<label class="col-md-3 control-label">记录人</label>
										<div class="col-md-9">
											<input class="form-control" name="rec_user_name" placeholder="请在此输入用户名" type="text" value="<?php echo $FullName?>">
										</div>
									</div>
								</div>
								<div class="col-md-6 form-group">
									<label class="control-label col-md-3">添加至工作报告
										<span class="required"> * </span>
									</label>
									<div class="col-md-9">
										<div class="checkbox-list">
											<label>
												<input type="checkbox" name="bReport" class="icheck"/> 将该条信息生成至工作报告中										
											</label>
										</div>
									</div>
								</div>
								<div class="col-md-6 form-group">
									<label class="col-md-3 control-label">品种</label>
									<div class="col-md-9">
										<select class="form-control select2" name="prod_id">
										</select>
										<div class="form-control-focus">
										</div>
									</div>
								</div>
								<div class="col-md-6 form-group">
									<label class="col-md-3 control-label">机台</label>
									<div class="col-md-9">
										<select class="form-control select2" name="machine_id">
										</select>
										<div class="form-control-focus">
										</div>
									</div>
								</div>
							</div>		
						</div>
					</div>
				</div>

				<div class="portlet light">
					<div class="portlet-title">
						<div class="caption font-yahei font-purple-plum">
							<i class="icon-pencil"></i>
							<span class="caption-subject bold uppercase">2.故障描述</span>
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
					<div class="portlet-body">
						<div class="form-body">						
							<!--/row-->
							<div class="row">
								<div class="col-md-6 form-group">
									<label class="col-md-3">处理状态</label>
									<div class="col-md-9">
										<select class="form-control select2" name="ProStatus">
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
									</div>
								</div>
								<div class="col-md-6 form-group">
									<label class="col-md-3 control-label">处理时间</label>
									<div class="col-md-9 input-group date form_advance_datetime" data-date="<?php echo date('Y-m-d',time());?>">
										<input name="process_time" type="text" size="16" class="form-control">
										<span class="input-group-btn">
										<button class="btn default date-reset" type="button"><i class="fa fa-times"></i></button>
										<button class="btn default date-set" type="button"><i class="fa fa-calendar"></i></button>
										</span>
									</div>
								</div>
								<div class="col-md-6 form-group">
									<label class="col-md-3 control-label">操作人员</label>
									<div class="col-md-9">																				
										<select name="oper_name" class="form-control select2 select2-multiple">
										</select>
									</div>
								</div>
								<div class="col-md-6 form-group">
									<label class="col-md-3 control-label">相关车号/轴号</label>
									<div class="col-md-9">
										<input type="text" class="form-control uppercase" maxlength="8" placeholder="输入产品涉及的车号或轴号" name="prod_info">
									</div>
								</div>
								<div class="col-md-6 form-group">
									<label class="col-md-3 control-label">一级描述</label>
									<div class="col-md-9">
										<select name="main_err" class="form-control select2"  data-placeholder="一级描述...">
										</select>																		
										<span class="help-block">
											(信息的分类意义非常重要，请您勿必选择)</span>
									</div>
								</div>
								<div class="col-md-6 form-group">
									<label class="col-md-3 control-label">二级描述</label>
									<div class="col-md-9">
										<select name="sub_err" class="form-control select2"  data-placeholder="二级描述...">										
										</select>	
										<span class="help-block">
										(信息的分类意义非常重要，请您勿必选择)</span>
									</div>
								</div>
								<div class="col-md-12 ">
									<h3>故障详细说明</h3>
									<div class="form-group">
										<div name="ErrDesc" id="ErrDesc">	</div>
									</div>
								</div>					

								<div class="form form-actions pull-right">
									<button type="button" id="Preview" class="btn btn-circle default" style="margin-right:30px;">取消</button>
									<button type="button" id="SaveChanges" class="btn btn-circle green" style="margin-right:30px;"><i class="fa fa-check"></i> 提交</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</form>	
			<!-- END PAGE CONTENT-->
		</div>
	</div>
	<!-- END CONTENT -->
	<?php include("templates/quicksidebar.php");?>
</div>
<!-- END CONTAINER -->