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
						<a href="#">指标检验</a>
						<i class="fa fa-circle"></i>
					</li>
					<li>
						<a href="#">成品率数据采集</a>
					</li>
				</ul>
				<!--div class="page-toolbar">
					<div class="btn-group pull-right">
						<a class="btn btn-fit-height grey-cascade">
						</a>
					</div>
				</div-->
			</div>
			<h3 class="page-title">
			<span class="caption-subject bold uppercase" name="TableTitle"></span>  <small id="today"></small>
			</h3>
			<!-- END PAGE HEADER-->
			<!-- BEGIN PAGE CONTENT-->
			<div class="row">
				<form role="form" name="theForm" class="form-horizontal"> <!--class="form-horizontal"-->
					<div class="col-md-12">
						<!-- BEGIN SAMPLE FORM PORTLET-->
						<div class="portlet box blue-hoki">
							<div class="portlet-title">
								<div class="caption">
									<i class="icon-settings"></i>
									<span class="caption-subject bold uppercase">概述</span></br>
								</div>
								<div class="tools">
		                                    <a href="javascript:;" class="collapse"> </a>
		                                    <a href="" class="fullscreen"> </a>
		                                </div>
							</div>
							<div class="portlet-body form">
								<div class="form-body row">
									<div class="col-md-6">
										<div class="form-group">
											<label class="col-md-3 control-label">轴号</label>
											<div class="col-md-9">
												<input type="text" class="form-control uppercase" maxlength="8" placeholder="请在此输入轴号信息,如201500A" name="reel_code">
												<div class="form-control-focus">
												</div>
												<label class="hide">轴号</label>
											</div>
										</div>
										<div class="form-group">
											<label class="control-label col-md-3">切纸抄重</label>
											<div class="col-md-9">
											<input type="text" class="form-control number" name="cut_weight">
											</div>
										</div>
									</div>
									<div class="col-md-6">
										<div class="form-group">
											<label class="col-md-3 control-label">验证日期</label>
											<div class="col-md-9">
												<input class="form-control form-control-inline date-picker" name="rec_date" size="16" type="text"/>
												<div class="form-control-focus">
												</div>
											</div>
										</div>
										<div class="form-group">
											<label class="col-md-3 control-label">品种</label>
											<div class="col-md-9">
												<select class="form-control select2" name="prod_id">
												</select>
												<div class="form-control-focus">
												</div>
											</div>
										</div>
										<div class="form-group">
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
								<div class="form-actions noborder row right">
									<button type="submit" class="btn green-haze"> 提交 <i class="icon-cloud-upload"></i> </button>
									<a name="loadHisData" class="btn red"> 载入数据 <i class="fa fa-cloud-download"></i> </a>
									<a name="reset" class="btn default"> 重置 <i class="icon-refresh"></i></a>
								</div>
							</div>
						</div>
						<!-- END SAMPLE FORM PORTLET-->
					</div>
                    <!-- BEGIN PROFILE CONTENT -->
                    <div class="col-md-12 profile-content">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="portlet light ">
                                    <div class="portlet-title tabbable-line">
                                        <div class="caption caption-md">
                                            <i class="icon-globe theme-font hide"></i>
                                            <span class="caption-subject font-blue-madison bold uppercase"><i class="fa fa-credit-card"></i> 历史数据</span>
                                        </div>
                                    </div>
                                    <div class="portlet-body">
                                        <div class="table-scrollable">
                                            <table class="table table-striped table-bordered table-advance table-hover" name="reelList">
                                                <thead>
                                                    <tr>
                                                        <th><i class="fa fa-user"></i> 轴号</th>
                                                        <th><i class="fa fa-calendar-plus-o"></i> 录入时间 </th>
                                                        <th><i class="fa fa-cut"></i> 切后好纸数</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- END PROFILE CONTENT -->

					<!-- END SAMPLE FORM PORTLET-->
				</form>
			</div>
			<!-- END PAGE CONTENT-->
		</div>
	</div>
</div>
	<!-- END CONTENT -->
	<!--?php include("templates/quicksidebar/quicksidebar_QualityChart.php");?-->
</div>
<!-- END CONTAINER -->