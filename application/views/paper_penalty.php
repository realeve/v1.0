			<!-- BEGIN STYLE CUSTOMIZER -->
			<?php include("templates/themesetting.php");?>
			<!-- END STYLE CUSTOMIZER -->
			<!-- BEGIN PAGE HEADER-->
			<div class="page-bar">
				<ul class="page-breadcrumb">
					<li>
						<a href="<?php echo base_url()?>">首页</a>
						<i class="fa fa-circle"></i>
					</li>
					<li>
						<a href="#">钞纸信息录入</a>
						<i class="fa fa-circle"></i>
					</li>
					<li>
						<a href="#">完成车间质量考核记录</a>
					</li>
				</ul>
			</div>
			<h3 class="page-title">
			<span class="caption-subject bold uppercase" name="TableTitle"></span>  <small id="today"></small>
			</h3>
			<!-- END PAGE HEADER-->
			<!-- BEGIN PAGE CONTENT-->

			<form role="form" name="theForm" class="form-vertical">
				<div class="portlet box blue-hoki">
					<div class="portlet-title">
						<div class="caption">
							<i class="icon-settings"></i>
							<span class="caption-subject bold uppercase">概述</span>
						</div>
					</div>
					<div class="portlet-body form">
						<div class="form-body row">
							<div class="col-md-6 form-group">
								<label class="control-label col-md-3">人员类型
									<span class="required"> * </span>
								</label>
								<div class="col-md-9">
									<div class="input-group">
										<div class="icheck-inline">
											<label>
												<input type="radio" name="user_type" class="icheck"> 正式工
											</label>
											<label>
												<input type="radio" name="user_type" class="icheck"> 临时工
											</label>
										</div>
									</div>
								</div>
							</div>
							<div class="col-md-6 form-group">
								<label class="col-md-3 control-label">考核人员</label>
								<div class="col-md-9">
									<select class="form-control select2" name="oper_id">
									</select>
									<div class="form-control-focus">
									</div>
								</div>
							</div>
							<div class="col-md-6 form-group">
								<label class="col-md-3 control-label" for="form_control_1">录入日期</label>
								<div class="col-md-9">
									<input class="form-control form-control-inline date-picker" name="rec_date" size="16" type="text"/>
									<div class="form-control-focus">
									</div>
								</div>
							</div>
							<div class="col-md-6 form-group">
								<label class="col-md-3 control-label">用户反馈</label>
								<div class="col-md-9">
									<input type="text" class="form-control" placeholder="请在此输入用户反馈信息" name="user_feedback">
									<div class="form-control-focus">
									</div>
								</div>
							</div>
							<div class="col-md-6 form-group">
								<label class="col-md-3 control-label">车间反馈</label>
								<div class="col-md-9">
									<input type="text" class="form-control" placeholder="请在此输入车间反馈信息" name="dpt_feedback">
									<div class="form-control-focus">
									</div>
								</div>
							</div>
							<div class="col-md-6 form-group">
								<label class="col-md-3 control-label">备注</label>
								<div class="col-md-9">
									<input type="text" class="form-control" placeholder="请在此输入备注信息" name="remark">
									<div class="form-control-focus">
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="portlet light bordered">
					<div class="portlet-title">
						<div class="caption font-blue">
							<i class="icon-pin font-blue"></i>
							<span class="caption-subject bold uppercase"> 考核信息 <small>请录入考核张数</small></span>
						</div>
					</div>
					<div class="portlet-body form">
						<div class="form-body row detail">
							<div class="col-md-6 form-group">
								<label class="col-md-3 control-label" for="cartnumber">严重废品</label>
								<div class="col-md-9">
									<input type="text" name="serious_fake" class="form-control" placeholder="严重废品考核张数" value="0">
									<span class="help-block">( 考核标准:100元/张 )</span>
									<div class="form-control-focus">
									</div>
								</div>
							</div>
							<div class="col-md-6 form-group">
								<label class="col-md-3 control-label" for="cartnumber">一般废品</label>
								<div class="col-md-9">
									<input type="text" name="normal_fake" class="form-control" placeholder="一般废品考核张数" value="0">
									<span class="help-block">( 考核标准:10元/张 )</span>
									<div class="form-control-focus">
									</div>
								</div>
							</div>
							<div class="col-md-6 form-group">
								<label class="col-md-3 control-label" for="cartnumber">严重废考核金额</label>
								<div class="col-md-9">
									<input type="text" name="serious_fake_money" class="form-control" disabled value="0">
								</div>
							</div>
							<div class="col-md-6 form-group">
								<label class="col-md-3 control-label" for="cartnumber">一般废考核金额</label>
								<div class="col-md-9">
									<input type="text" name="normal_fake_money" class="form-control" disabled value="0">
								</div>
							</div>
						</div>
						<div class="form-actions right">
							<button type="submit" class="btn green-haze"> 提交 <i class="icon-cloud-upload"></i> </button>
							<a name="reset" class="btn default"> 重置 <i class="icon-refresh"></i></a>
						</div>
					</div>
					<!-- END SAMPLE FORM PORTLET-->
				</div>
			</form>
			<div class="portlet light ">
				<div class="portlet-title tabbable-line">
					<div class="caption caption-md">
						<i class="icon-globe theme-font hide"></i>
						<span class="caption-subject font-blue-madison bold uppercase"><i class="fa fa-credit-card"></i> 历史数据</span>
					</div>
				</div>
				<div class="portlet-body">
					<div class="table-scrollable">
						<table class="table table-striped table-bordered table-advance table-hover" name="fakeList">
							<thead>
								<tr>
									<th><i class="fa fa-calendar-plus-o"></i> 序号 </th>
									<th><i class="fa fa-briefcase"></i> 人员 </th>
									<th><i class="fa fa-calendar-plus-o"></i> 考核日期 </th>
									<th><i class="fa fa-user"></i> 严重废</th>
									<th><i class="fa fa-calendar-plus-o"></i> 一般废 </th>
									<th><i class="fa fa-calendar-plus-o"></i> 考核金额 </th>
									<th><i class="fa fa-cut"></i> 用户反馈</th>
									<th><i class="fa fa-dedent"></i> 车间考核</th>
									<th><i class="fa fa-pencil"></i> 备注 </th>
								</tr>
							</thead>
							<tbody>
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<div name="singleChart"></div>
			<!-- END PAGE CONTENT-->
		</div>
	</div>
</div>
<!-- END CONTENT -->
<!-- END CONTENT -->
	<!--?php include("templates/quicksidebar/quicksidebar_paper_para.php");?-->
</div>
<!-- END CONTAINER -->