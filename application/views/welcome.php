			<!-- BEGIN STYLE CUSTOMIZER -->
			<?php include "templates/themesetting.php";?>
			<!-- END STYLE CUSTOMIZER -->
			<!-- END SAMPLE PORTLET CONFIGURATION MODAL FORM-->
			<div class="page-bar">
				<ul class="page-breadcrumb">
					<li>
						<a>首页</a>
						<i class="fa fa-circle"></i>
					</li>
					<li>
						<a>仪表盘</a>
					</li>
				</ul>
			</div>
			<!-- END PAGE HEADER-->
			<!--h3 class="page-title font-yahei">
				<span class="caption-subject bold uppercase" name="TableTitle"></span>   <small id="today"></small>
			</h3-->
			<!-- BEGIN DASHBOARD STATS -->
			<div class="row top-info">
				<div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
					<div class="dashboard-stat blue-madison">
						<div class="visual">
							<i class="fa fa-comments"></i>
						</div>
						<div class="details">
							<div class="number" data-counter="counterup">
							</div>
							<div class="desc">
								 印钞机检好品率低于70%
							</div>
						</div>
						<a class="more" href="javascript:;">
						查看详情 <i class="m-icon-swapright m-icon-white"></i>
						</a>
					</div>
				</div>
				<div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
					<div class="dashboard-stat red-intense">
						<div class="visual">
							<i class="fa fa-bar-chart-o"></i>
						</div>
						<div class="details">
							<div class="number" data-counter="counterup">
							</div>
							<div class="desc">
								 已开印产品
							</div>
						</div>
						<a class="more" href="javascript:;">
						查看详情 <i class="m-icon-swapright m-icon-white"></i>
						</a>
					</div>
				</div>
				<div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
					<div class="dashboard-stat green-haze">
						<div class="visual">
							<i class="fa fa-shopping-cart"></i>
						</div>
						<div class="details">
							<div class="number" data-counter="counterup">
							</div>
							<div class="desc">
								 今日好品率低于80%机台数
							</div>
						</div>
						<a class="more" href="javascript:;">
						查看详情 <i class="m-icon-swapright m-icon-white"></i>
						</a>
					</div>
				</div>
				<div class="col-lg-3 col-md-3 col-sm-6 col-xs-12">
					<div class="dashboard-stat purple-plum">
						<div class="visual">
							<i class="fa fa-globe"></i>
						</div>
						<div class="details">
							<div class="number" data-counter="counterup">
							</div>
							<div class="desc">
								 机检系统异常产品
							</div>
						</div>
						<a class="more" href="javascript:;">
						查看详情 <i class="m-icon-swapright m-icon-white"></i>
						</a>
					</div>
				</div>
			</div>
			<!-- END DASHBOARD STATS -->

			<div class="row">
				<div class="col-md-6 col-sm-12">
					<!-- BEGIN PORTLET-->
					<div class="portlet light" name="hisQuality">
						<div class="portlet-title">
							<div class="caption caption-md">
								<i class="icon-bar-chart theme-font-color hide"></i>
								<span class="caption-subject theme-font-color bold uppercase">机检好品率</span>
								<span class="caption-helper">码后核查工艺...</span>
							</div>
							<div class="actions">
								<div class="btn-group btn-group-devided" data-toggle="buttons">
									<label class="btn btn-outline purple-studio btn-circle btn-sm active" data-id=0>
									<input type="radio" name="options" class="toggle">最近一天</label>
									<label class="btn btn-outline purple-studio btn-circle btn-sm" data-id=1>
									<input type="radio" name="options" class="toggle">本周</label>
									<label class="btn btn-outline purple-studio btn-circle btn-sm" data-id=2>
									<input type="radio" name="options" class="toggle">本月</label>
								</div>
							</div>
						</div>
						<div class="portlet-body">
							<div class="row list-separated">
							</div>
							<div id="passed_a_year_quality_static" class="portlet-body-morris-fit morris-chart" style="height: 260px">
							</div>
						</div>
					</div>
					<!-- END PORTLET-->
				</div>
				<div class="col-md-6 col-sm-12">
					<div class="portlet light bordered">
	                        <div class="portlet-title">
	                            <div class="caption">
	                                <i class="icon-bar-chart font-green hide"></i>
	                                <span class="caption-subject font-blue bold uppercase">机检开包量</span>
	                            </div>
	                        </div>
	                        <div class="portlet-body" style="height:331px;">
	                            <div id="nocheck_loading_0">
	                                <img src="../assets/global/img/loading.gif" alt="loading" />
	                            </div>
	                            <div id="nocheck_content_0">
	                                <div id="nocheck_statistics_0" class="chart"> </div>
	                            </div>
	                        </div>
	                    </div>
				</div>
			</div>
			<div class="clearfix">
			</div>
			<div class="row">
                <div class="col-md-6 col-sm-6">
                    <!-- BEGIN PORTLET-->
                    <div class="portlet light bordered">
                        <div class="portlet-title">
                            <div class="caption">
                                <i class="icon-bar-chart font-green hide"></i>
                                <span class="caption-subject font-green bold uppercase">设备运行情况</span>
                                <span class="caption-helper">数据库大小及硬盘可用量...</span>
                            </div>
                            <div class="actions" id="site_statistics_legend">
                            </div>
                        </div>
                        <div class="portlet-body">
                            <div id="site_statistics_loading">
                                <img src="../assets/global/img/loading.gif" alt="loading" /> </div>
                            <div id="site_statistics_content" class="display-none">
                                <div id="site_statistics" class="chart"> </div>
                            </div>
                        </div>
                    </div>
                    <!-- END PORTLET-->
                </div>

                <div class="col-md-6">
                    <!-- Begin: life time stats -->
                    <!-- BEGIN PORTLET-->
                    <div class="portlet light bordered">
                        <div class="portlet-title tabbable-line">
                            <div class="caption">
                                <i class="icon-globe font-red"></i>
                                <span class="caption-subject font-red bold uppercase">过程质量控制水平</span>
                            </div>
                            <ul class="nav nav-tabs">
                                <li class="active">
                                    <a href="#portlet_process_quality_1" data-toggle="tab"> 单开分析仪 </a>
                                </li>
                                <li>
                                    <a href="#portlet_process_quality_2" id="process_quality_cut_tab" data-toggle="tab"> 检封裁切 </a>
                                </li>
                                <li>
                                    <a href="#portlet_process_quality_3" id="process_quality_offline_tab" data-toggle="tab"> 大张离线 </a>
                                </li>
                            </ul>
                        </div>
                        <div class="portlet-body">
                            <div class="tab-content">
                                <div class="tab-pane active" id="portlet_process_quality_1">
									<div id="noteAnany_static" class="portlet-body-morris-fit morris-chart" style="height: 314px">
									</div>
                                    <!--div id="statistics_1" class="chart"> </div-->
                                </div>
                                <div class="tab-pane" id="portlet_process_quality_2">
									<!--div id="statistics_2" class="portlet-body-morris-fit morris-chart" style="height: 314px"-->
									<div id="statistics_2" class="chart"> </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- End: life time stats -->
                </div>
            </div>

			<div class="clearfix"></div>
			<div class="row">
                <div class="col-md-4 col-sm-12">
                    <!-- BEGIN PORTLET  bordered-->
                    <div class="portlet light">
                        <div class="portlet-title">
                            <div class="caption">
                                <i class="icon-share font-red-sunglo hide"></i>
                                <span class="caption-subject font-red-sunglo bold uppercase">数据上传情况</span>
                                <span class="caption-helper">最近印刷20车产品...</span>
                            </div>
                            <div class="actions" id="data_upload_legend">
                            </div>
                        </div>
                        <div class="portlet-body">
                            <div id="data_upload_loading">
                                <img src="../assets/global/img/loading.gif" alt="loading" /> </div>
                            <div id="data_upload_content" class="display-none">
                                <div id="data_upload" class="chart"> </div>
                            </div>
                        </div>
                    </div>
                    <!-- END PORTLET-->
                </div>
				<div class="col-md-8 col-sm-12">
                    <!-- BEGIN PORTLET-->
                    <div class="portlet light bordered">
                        <div class="portlet-title">
                            <div class="caption">
                                <i class="icon-bar-chart font-green hide"></i>
                                <span class="caption-subject font-green bold uppercase" name="curQuality_title"></span>
                                <span class="caption-helper">码后核查...</span>
                            </div>

                            <div class="actions">
                            	<a href="javascript:;" class="btn blue-madison btn-outline" name="curQuality">
								<i class="fa fa-repeat"></i> 当前质量</a>

                            </div>
                        </div>
                        <div class="portlet-body">
                            <div id="real_quality_loading">
                                <img src="../assets/global/img/loading.gif" alt="loading" /> </div>
                            <div id="real_quality_content" class="display-none">
                                <div id="real_quality_statistics" class="chart"> </div>
                            </div>
                        </div>
                    </div>
                    <!-- END PORTLET-->
                </div>
						</div>
						<div class="row">
							<div class="col-md-12 col-sm-12">
	                    <div class="portlet light bordered">
	                        <div class="portlet-title">
	                            <div class="caption">
	                                <i class="icon-bar-chart font-green hide"></i>
	                                <span class="caption-subject font-green bold uppercase">本月机检未检</span>
	                                <span class="caption-helper">印码机检...</span>
	                            </div>
	                        </div>
	                        <div class="portlet-body">
	                            <div id="nocheck_loading_1">
	                                <img src="../assets/global/img/loading.gif" alt="loading" />
	                            </div>
	                            <div id="nocheck_content_1">
	                                <div id="nocheck_statistics_1" class="chart" style="min-Height:600px;"> </div>
	                            </div>
	                        </div>
	                    </div>
	                </div>
			</div>
		</div>
	</div>
	<!-- END CONTENT -->
	<?php include "templates/quicksidebar/quicksidebar_welcome.php";?>
</div>
<!-- END CONTAINER -->