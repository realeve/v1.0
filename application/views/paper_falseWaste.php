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
						<a href="#">损纸误废报表</a>
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
							<div class="col-md-3 form-group">
                                <label class="control-label col-md-3">录入月份</label>
                                <div class="col-md-9">
                                    <div class="input-group date date-picker-month">
                                        <input type="text" class="form-control" name="rec_date" readonly>
                                        <span class="input-group-btn">
                                            <button class="btn default" type="button">
                                                <i class="fa fa-calendar"></i>
                                            </button>
                                        </span>
                                    </div>
                                    <!-- /input-group -->
                                    <span class="help-block"> 选择数据录入月份 </span>
                                </div>
                            </div>
							<div class="col-md-3 form-group">
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
							<span class="caption-subject bold uppercase"> 误废信息 </span>
						</div>
					</div>
					<div class="portlet-body form">
						<div class="form-body row formData">
							<div class="col-md-3 form-group">
								<label class="col-md-3 control-label" for="cartnumber">抽检张数</label>
								<div class="col-md-9">
									<input type="text" name="checkNum" class="form-control" placeholder="抽检张数" value="0">
									<span class="help-block"></span>
									<div class="form-control-focus">
									</div>
								</div>
							</div>
							<div class="col-md-3 form-group">
								<label class="col-md-3 control-label" for="cartnumber">误废张数</label>
								<div class="col-md-9">
									<input type="text" name="wasteNum" class="form-control" placeholder="误废张数" value="0">
									<span class="help-block"> </span>
									<div class="form-control-focus">
									</div>
								</div>
							</div>
							<div class="col-md-3 form-group">
								<label class="col-md-3 control-label" for="cartnumber">误废率</label>
								<div class="col-md-9">
									<input type="text" name="wasteRatio" class="form-control" disabled placeholder="误废率" value="0">
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
						<table class="table table-striped table-bordered table-advance table-hover" name="hisData">
							<thead>
								<tr>
									<th><i class="fa fa-tag"></i> 序号 </th>
									<th><i class="fa fa-calendar-plus-o"></i> 月份 </th>
									<th><i class="fa fa-align-center"></i> 抽检张数</th>
									<th><i class="fa fa-search"></i> 误废张数</th>
									<th><i class="fa fa-calculator"></i> 误废率(%) </th>
									<th><i class="fa fa-pencil"></i> 备注 </th>
								</tr>
							</thead>
							<tbody>
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<div class="portlet light bordered">
                <div class="portlet-title">
                    <div class="caption">
                        <i class="icon-bar-chart font-green hide"></i>
                        <span class="caption-subject font-blue bold uppercase"> 损纸误废率曲线图 </span>
                    </div>
                </div>
                <div class="portlet-body">
                    <div id="chart_loading_0">
                        <img src="../assets/global/img/loading.gif" alt="loading" />
                    </div>
                    <div id="chart_content_0">
                        <div id="chart_0" class="chart" style="height:500px;"> </div>
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