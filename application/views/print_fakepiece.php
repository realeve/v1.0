			<!-- BEGIN STYLE CUSTOMIZER -->
			<?php include "templates/themesetting.php";?>
			<!-- END STYLE CUSTOMIZER -->
			<!-- BEGIN PAGE HEADER-->
			<div class="page-bar">
				<ul class="page-breadcrumb">
					<li>
						<a href="<?php echo base_url() ?>">首页</a>
						<i class="fa fa-circle"></i>
					</li>
					<li>
						<a href="#">印钞信息录入</a>
						<i class="fa fa-circle"></i>
					</li>
					<li>
						<a href="#">大张废录入</a>
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
						<div class="actions hidden-print">
							<a class="btn btn-circle btn-icon-only btn-default fullscreen" href="javascript:;" data-original-title="" title="">
							</a>
						</div>
					</div>
					<div class="portlet-body form">
						<div class="form-body row">
							<div class="col-md-6 form-group">
								<label class="col-md-3 control-label" for="cartnumber">车号</label>
								<div class="col-md-9">
									<input type="text" id="cartnumber" class="form-control uppercase" maxlength="8" placeholder="请在此输入车号信息" name="cart_number">
									<div class="form-control-focus">
									</div>
									<label class="hide">车号</label>
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
									<select class="form-control select2" name="prod_ID">
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
						</div>
					</div>
				</div>
				<div class="portlet light bordered">
					<div class="portlet-title">
						<div class="caption font-green">
							<i class="icon-pin font-green"></i>
							<span class="caption-subject bold uppercase"> 大张废信息 </span>
						</div>
					</div>
					<div class="portlet-body form">
						<div class="form-body row fakeNum">
							<div class="col-md-3 form-group">
								<label class="col-md-3 control-label" for="cartnumber">作废原因</label>
								<div class="col-md-9">
									<select class="form-control select2" name="ProcID">
									</select>
									<div class="form-control-focus">
									</div>
									<span class="help-block">  </span>
								</div>
							</div>
							<div class="col-md-3 form-group">
								<label class="col-md-3 control-label" for="cartnumber">千位</label>
								<div class="col-md-9">
									<select class="form-control select2" name="KiloID">
									</select>
									<div class="form-control-focus">
									</div>
									<span class="help-block">  </span>
								</div>
							</div>
							<div class="col-md-3 form-group">
								<label class="col-md-3 control-label" for="cartnumber">全张废</label>
								<div class="col-md-9">
									<input type="text" name="FakePiece" class="form-control" placeholder="全张废" value="0">
										<span class="help-block"> </span>
									<div class="form-control-focus">
									</div>
								</div>
							</div>
							<div class="col-md-3 form-group">
								<label class="col-md-3 control-label" for="cartnumber">记半废</label>
								<div class="col-md-9">
									<input type="text" name="HalfPiece" class="form-control" placeholder="记半废" value="0">
										<span class="help-block">记半废(35K产品记18K，40K产品记20K)</span>
									<div class="form-control-focus">
									</div>
								</div>
							</div>
							<div class="col-md-3 form-group">
								<label class="col-md-3 control-label" for="cartnumber">不记废</label>
								<div class="col-md-9">
									<input type="text" name="NoNum" class="form-control" placeholder="不记废" value="0">
									<span class="help-block"> </span>
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
										<th><i class="fa fa-briefcase"></i> 车号 </th>
										<th><i class="fa fa-user"></i> 品种</th>
										<th><i class="fa fa-calendar-plus-o"></i> 录入日期 </th>
										<th><i class="fa fa-cut"></i> 全张废</th>
										<th><i class="fa fa-dedent"></i> 记半废</th>
										<th><i class="fa fa-link"></i> 不记废 </th>
										<th><i class="fa fa-link"></i> 工序 </th>
										<th><i class="fa fa-pencil"></i> 备注 </th>
									</tr>
								</thead>
								<tbody>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</form>
			<!-- END PAGE CONTENT-->
		</div>
	</div>
</div>
<!-- END CONTENT -->
<!-- END CONTENT -->
	<!--?php include("templates/quicksidebar/quicksidebar_paper_para.php");?-->
</div>
<!-- END CONTAINER -->