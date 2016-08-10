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
						<a href="#">批量报废</a>
					</li>
				</ul>
			</div>
			<h3 class="page-title">
			<span class="caption-subject bold uppercase" name="TableTitle"></span>  <small id="today"></small>
			</h3>
			<!-- END PAGE HEADER-->
			<!-- BEGIN PAGE CONTENT-->

			<form role="form" name="theForm" class="form-horizontal">
				<div class="portlet box blue-hoki">
					<div class="portlet-title">
						<div class="caption">
							<i class="icon-settings"></i>
							<span class="caption-subject bold uppercase">概述</span>
						</div>
					</div>
					<div class="portlet-body form">
						<div class="form-body row">
							<div class="col-md-6 form-group has-success">
								<label class="col-md-3 control-label" for="cartnumber">轴号</label>
								<div class="col-md-9">
									<input type="text" id="cartnumber" class="form-control uppercase" maxlength="8" placeholder="请在此输入轴号信息" name="reel_code">
									<div class="form-control-focus">
									</div>
									<label class="hide">轴号</label>
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
								<label class="col-md-3 control-label">品种</label>
								<div class="col-md-9">
									<select class="form-control select2" name="prod_id">
									</select>
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
									<label class="hide">备注</label>
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
				<div class="portlet light bordered">
					<div class="portlet-title">
						<div class="caption font-green">
							<i class="icon-pin font-green"></i>
							<span class="caption-subject bold uppercase"> 批量报废信息 </span>
						</div>
					</div>
					<div class="portlet-body form">
						<div class="form-body row detail">
							<div class="col-md-6 form-group">
								<label class="col-md-3 control-label" for="cartnumber">纸病情况</label>
								<div class="col-md-9">
									<input type="text" name="fake_reason" class="form-control" placeholder="纸病情况">
									<span class="help-block">  </span>
									<div class="form-control-focus">
									</div>
								</div>
							</div>
							<div class="col-md-6 form-group">
								<label class="col-md-3 control-label" for="cartnumber">报废数量</label>
								<div class="col-md-9">
									<input type="text" name="fake_num" class="form-control" placeholder="报废数量" value="0">
									<span class="help-block">  </span>
									<div class="form-control-focus">
									</div>
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
									<th><i class="fa fa-briefcase"></i> 轴号 </th>
									<th><i class="fa fa-user"></i> 品种</th>
									<th><i class="fa fa-calendar-plus-o"></i> 机台 </th>
									<th><i class="fa fa-calendar-plus-o"></i> 录入日期 </th>
									<th><i class="fa fa-cut"></i> 纸病情况</th>
									<th><i class="fa fa-dedent"></i> 报废数量</th>
									<th><i class="fa fa-pencil"></i> 备注 </th>
								</tr>
							</thead>
							<tbody>
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<!-- END PAGE CONTENT-->
		</div>
	</div>
</div>
<!-- END CONTENT -->
<!-- END CONTENT -->
	<!--?php include("templates/quicksidebar/quicksidebar_paper_para.php");?-->
</div>
<!-- END CONTAINER -->