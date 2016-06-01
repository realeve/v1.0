			<!-- BEGIN STYLE CUSTOMIZER -->
			<?php include("templates/themesetting.php");?>
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
				<!--div class="page-toolbar">
					<div id="dashboard-report-range" class="pull-right tooltips btn btn-fit-height btn-info" data-placement="top" data-original-title="点击修改查询时间">
						<i class="icon-calendar"></i>&nbsp;
						<span class="thin uppercase visible-lg-inline-block">&nbsp;</span>&nbsp;
						<i class="fa fa-angle-down"></i>
					</div>
				</div-->
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
				<div class="col-md-8 col-sm-12">
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
								<!--div class="col-md-2 col-sm-2 col-xs-6">
									<div class="font-grey-mint font-sm">
										 9602A
									</div>
									<div class="uppercase font-hg font-red-flamingo" name="quaNum">
										  <span class="font-lg font-grey-mint">%</span>
									</div>
								</div-->
							</div>
							<div id="passed_a_year_quality_static" class="portlet-body-morris-fit morris-chart" style="height: 260px">
							</div>
						</div>
					</div>
					<!-- END PORTLET-->
				</div>
				<div class="col-md-4 col-sm-12">
					<!-- BEGIN WIDGET BLOG -->
					<div class="widget-blog rounded-3 text-center margin-bottom-30 clearfix" style="height: 415px; padding-top: 10px; background-image: url(../../assets/layouts/layout/img/07.jpg);">
						<div class="widget-blog-heading text-uppercase">
							<div class="mt-widget-1" style="border:none;">
								<div class="mt-img" style="margin:0 0 5px">
                            		<img src="./demo/avatar/MTVkZXZlbG9w.jpg" style="width:120px;height:120px;">
                            	</div> 
                            </div>
							<h3 class="widget-blog-title">马可</h3>
							<span class="widget-blog-subtitle">印码机检组</span>
						</div>
						<p>近期多功能-2#机误报较多，请大家注意.
						</p>
						<br/>
						<a class="btn btn-danger text-uppercase" href="#">标记为已读</a>
					</div>
					<!-- END WIDGET BLOG -->
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
                            <!--div class="well margin-top-20">
                                <div class="row">
                                    <div class="col-md-3 col-sm-3 col-xs-6 text-stat">
                                        <span class="label label-success"> Revenue: </span>
                                        <h3>$1,234,112.20</h3>
                                    </div>
                                    <div class="col-md-3 col-sm-3 col-xs-6 text-stat">
                                        <span class="label label-info"> Tax: </span>
                                        <h3>$134,90.10</h3>
                                    </div>
                                    <div class="col-md-3 col-sm-3 col-xs-6 text-stat">
                                        <span class="label label-danger"> Shipment: </span>
                                        <h3>$1,134,90.10</h3>
                                    </div>
                                    <div class="col-md-3 col-sm-3 col-xs-6 text-stat">
                                        <span class="label label-warning"> Orders: </span>
                                        <h3>235090</h3>
                                    </div>
                                </div>
                            </div-->
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
                                <!--div class="btn-group">
                                    <a href="" class="btn blue btn-outline btn-circle btn-sm dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true"> 机台
                                        <span class="fa fa-angle-down"> </span>
                                    </a>
                                    <ul class="dropdown-menu pull-right">
                                        <li>
                                            <a href="javascript:;"> 当前时间 
                                            </a>
                                        </li>
                                        <li class="divider"> </li>
                                        <li>
                                            <a href="javascript:;"> Q2 2014 
                                            </a>
                                        </li>
                                        <li class="active">
                                            <a href="javascript:;"> Q3 2014 
                                            </a>
                                        </li>
                                        <li>
                                            <a href="javascript:;"> Q4 2014 
                                            </a>
                                        </li>
                                    </ul>
                                </div-->
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
            <div class="clearfix">
			</div>
			<!--div class="row">
				<div class="col-md-4 col-sm-4">
					<div class="portlet box blue-steel">
						<div class="portlet-title">
							<div class="caption">
								<i class="fa fa-bell-o"></i>最近事件
							</div>
							<div class="actions">
								<div class="btn-group">
									<a class="btn btn-sm btn-default dropdown-toggle" href="#" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
									Filter By <i class="fa fa-angle-down"></i>
									</a>
									<div class="dropdown-menu hold-on-click dropdown-checkboxes pull-right">
										<label><input type="checkbox"/> Finance</label>
										<label><input type="checkbox" checked=""/> Membership</label>
										<label><input type="checkbox"/> Customer Support</label>
										<label><input type="checkbox" checked=""/> HR</label>
										<label><input type="checkbox"/> System</label>
									</div>
								</div>
							</div>
						</div>
						<div class="portlet-body">
							<div class="scroller" style="height: 300px;" data-always-visible="1" data-rail-visible="0">
								<ul class="feeds">
									<li>
										<div class="col1">
											<div class="cont">
												<div class="cont-col1">
													<div class="label label-sm label-info">
														<i class="fa fa-check"></i>
													</div>
												</div>
												<div class="cont-col2">
													<div class="desc">
														 机检模型月度验证. <span class="label label-sm label-warning ">
														Take action <i class="fa fa-share"></i>
														</span>
													</div>
												</div>
											</div>
										</div>
										<div class="col2">
											<div class="date">
												 刚才
											</div>
										</div>
									</li>
									<li>
										<a href="#">
										<div class="col1">
											<div class="cont">
												<div class="cont-col1">
													<div class="label label-sm label-success">
														<i class="fa fa-bar-chart-o"></i>
													</div>
												</div>
												<div class="cont-col2">
													<div class="desc">
														 XX机型硬盘容易过低.
													</div>
												</div>
											</div>
										</div>
										<div class="col2">
											<div class="date">
												 20分钟前
											</div>
										</div>
										</a>
									</li>
									<li>
										<div class="col1">
											<div class="cont">
												<div class="cont-col1">
													<div class="label label-sm label-danger">
														<i class="fa fa-user"></i>
													</div>
												</div>
												<div class="cont-col2">
													<div class="desc">
														 XX机长近期好品率波动较大.
													</div>
												</div>
											</div>
										</div>
										<div class="col2">
											<div class="date">
												 24分钟前
											</div>
										</div>
									</li>
								</ul>
							</div>
							<div class="scroller-footer">
								<div class="btn-arrow-link pull-right">
									<a href="#">查看所有记录</a>
									<i class="icon-arrow-right"></i>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-md-4 col-sm-4">
					<div class="portlet box green-haze tasks-widget">
						<div class="portlet-title">
							<div class="caption">
								<i class="fa fa-check"></i>Tasks
							</div>
							<div class="tools">
								<a href="#" class="reload">
								</a>
								<a href="javascript:;" class="fullscreen">
								</a>
							</div>
							<div class="actions">
								<div class="btn-group">
									<a class="btn btn-default btn-sm dropdown-toggle" href="#" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
									筛选 <i class="fa fa-angle-down"></i>
									</a>
									<ul class="dropdown-menu pull-right">
										<li>
											<a href="#">
											<i class="i"></i> 所有 </a>
										</li>
										<li class="divider">
										</li>
										<li>
											<a href="#">
											会议 </a>
										</li>
										<li>
											<a href="#">
											待办事项 </a>
										</li>
										<li>
											<a href="#">
											个人事务 </a>
										</li>
										<li>
											<a href="#">
											其它 </a>
										</li>
									</ul>
								</div>
							</div>
						</div>
						<div class="portlet-body">
							<div class="task-content">
								<div class="scroller" style="height: 305px;" data-always-visible="1" data-rail-visible1="1">
									<!-- START TASK LIST -->
									<!--ul class="task-list">
										<li>
											<div class="task-checkbox">
												<input type="hidden" value="1" name="test"/>
												<input type="checkbox" class="liChild" value="2" name="test"/>
											</div>
											<div class="task-title">
												<span class="task-title-sp">
												01-28 13:30 一楼小会议室开会 </span>
												<span class="label label-sm label-success">会议</span>
											</div>
											<div class="task-config">
												<div class="task-config-btn btn-group">
													<a class="btn btn-xs default" href="#" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
													<i class="fa fa-cog"></i><i class="fa fa-angle-down"></i>
													</a>
													<ul class="dropdown-menu pull-right">
														<li class="complete">
															<a href="#">
															<i class="fa fa-check"></i> 完成 </a>
														</li>
														<li class="edit">
															<a href="#">
															<i class="fa fa-pencil"></i> 编辑 </a>
														</li>
														<li class="del">
															<a href="#">
															<i class="fa fa-trash-o"></i> 删除 </a>
														</li>
													</ul>
												</div>
											</div>
										</li>
										<li>
											<div class="task-checkbox">
												<input type="hidden" value="1" name="test"/>
												<input type="checkbox" class="liChild" value="2" name="test"/>
											</div>
											<div class="task-title">
												<span class="task-title-sp">
												01-29 12:30 准备月底汇报材料 </span>
												<span class="label label-sm label-success">个人事务</span>
											</div>
											<div class="task-config">
												<div class="task-config-btn btn-group">
													<a class="btn btn-xs default" href="#" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
													<i class="fa fa-cog"></i><i class="fa fa-angle-down"></i>
													</a>
													<ul class="dropdown-menu pull-right">
														<li class="complete">
															<a href="#">
															<i class="fa fa-check"></i> 完成 </a>
														</li>
														<li class="edit">
															<a href="#">
															<i class="fa fa-pencil"></i> 编辑 </a>
														</li>
														<li class="del">
															<a href="#">
															<i class="fa fa-trash-o"></i> 删除 </a>
														</li>
													</ul>
												</div>
											</div>
										</li>
									</ul>
									<!-- END START TASK LIST -->
								<!--/div>
							</div>
							<div class="task-footer">
								<div class="btn-arrow-link pull-right">
									<a href="#">查看所有记录</a>
									<i class="icon-arrow-right"></i>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="col-md-4 col-sm-12">
					<!-- BEGIN PORTLET-->
					<!--div class="portlet light" style="height:400px;">
						<div class="portlet-title">
							<div class="caption caption-md">
								<i class="icon-bar-chart theme-font-color hide"></i>
								<span class="caption-subject theme-font-color bold uppercase">本月机检日志填写情况</span>
								<span class="caption-helper hide">机检日志...</span>
							</div>
						</div>
						<div class="portlet-body">
							<div class="row number-stats margin-bottom-20">
								<div class="col-md-6 col-sm-6 col-xs-6">
									<div class="stat-left">
										<div class="stat-chart">
											<!-- do not line break "sparkline_bar" div. sparkline chart has an issue when the container div has line break -->
											<!--div id="sparkline_bar"></div>
										</div>
										<div class="stat-number">
											<div class="title">
												 总条数
											</div>
											<div class="number">
												 2460
											</div>
										</div>
									</div>
								</div>
								<div class="col-md-6 col-sm-6 col-xs-6">
									<div class="stat-right">
										<div class="stat-chart">
											<!-- do not line break "sparkline_bar" div. sparkline chart has an issue when the container div has line break -->
											<!--div id="sparkline_bar2"></div>
										</div>
										<div class="stat-number">
											<div class="title">
												 本月
											</div>
											<div class="number">
												 719
											</div>
										</div>
									</div>
								</div>
							</div>
							<div class="table-scrollable table-scrollable-borderless">
								<table class="table table-hover table-light">
								<thead>
								<tr class="uppercase">
									<th colspan="2">
										 人员
									</th>
									<th>
										 机检组
									</th>
									<th>
										 日志数
									</th>
								</tr>
								</thead>
								<tr>
									<td class="fit">
										<img class="user-pic" src="../../assets/layouts/layout/img/avatar4.jpg">
									</td>
									<td>
										<span class="primary-link">张三</span>
									</td>
									<td>
										印码机检组
									</td>
									<td>
										<span class="bold theme-font-color">80</span>
									</td>
								</tr>
								<tr>
									<td class="fit">
										<img class="user-pic" src="../../assets/layouts/layout/img/avatar5.jpg">
									</td>
									<td>
										<span class="primary-link">张四</span>
									</td>
									<td>
										检封机检组
									</td>
									<td>
										<span class="bold theme-font-color">67</span>
									</td>
								</tr>
								<tr>
									<td class="fit">
										<img class="user-pic" src="../../assets/layouts/layout/img/avatar6.jpg">
									</td>
									<td>
										<span class="primary-link">张三</span>
									</td>
									<td>
										钞纸机检组
									</td>
									<td>
										<span class="bold theme-font-color">98</span>
									</td>
								</tr>
								</table>
							</div>
						</div>
					</div>
					<!-- END PORTLET-->
				<!--/div>				
			</div-->
            <div class="clearfix">
			</div>
			<div class="row">
				<div class="col-md-4 col-sm-6 col-xs-12">
					<!-- BEGIN PORTLET-->
					<div class="portlet light tasks-widget widget-comments rounded-3">
						<div class="portlet-title margin-bottom-20">
							<div class="caption caption-md font-red-sunglo">
								<span class="caption-subject theme-font bold uppercase">留言板</span>
							</div>
						</div>
						<div class="portlet-body overflow-h">
							<input type="text" placeholder="联系人" class="form-control margin-bottom-20">
							<input type="text" placeholder="主题" class="form-control margin-bottom-20">
							<textarea placeholder="内容" class="form-control margin-bottom-20" rows="7"></textarea>
							<button class="btn red-sunglo pull-right" type="button">提交</button>
						</div>
					</div>
					<!-- END PORTLET-->
				</div>
				<div class="col-md-8 margin-bottom-30">
					<!-- BEGIN WIDGET TAB -->
					<div class="widget-bg-color-white widget-tab rounded-3">
						<ul class="nav nav-tabs">
							<li class="active">
								<a href="#tab_1_1" data-toggle="tab"> 所有日志 </a>
							</li>
							<li>
								<a href="#tab_1_2" data-toggle="tab"> 钞纸组 </a>
							</li>
							<li>
								<a href="#tab_1_3" data-toggle="tab"> 印码组 </a>
							</li>
							<li>
								<a href="#tab_1_4" data-toggle="tab"> 检封组 </a>
							</li>
							<a class="more btn btn-circle pull-right margin-top-10 margin-right-10" href="javascript:;">
							所有记录<i class="m-icon-swapright"></i>
							</a>
						</ul>
						<div class="tab-content scroller" style="height: 350px;" data-always-visible="1" data-handle-color="#D7DCE2">
							<div class="tab-pane fade active in" id="tab_1_1">
								<div class="widget-news margin-bottom-20">
									<img class="widget-news-left-elem rounded-3" src="../../assets/layouts/layout/img/03.jpg" alt="">
									<div class="widget-news-right-body">
										<h3 class="widget-news-right-body-title">Wondering anyone did this
											<span class="label label-default"> March 25 </span>
										</h3>
										<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit diam nonumy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>
									</div>
								</div>							
							</div>
							<div class="tab-pane fade" id="tab_1_2">
								<div class="widget-news margin-bottom-20">
									<img class="widget-news-left-elem rounded-3" src="../../assets/layouts/layout/img/04.jpg" alt="">
									<div class="widget-news-right-body">
										<h3 class="widget-news-right-body-title">New Workstation
											<span class="label label-default"> March 16 </span>
										</h3>
										<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit diam nonumy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>
									</div>
								</div>
							</div>
							<div class="tab-pane fade" id="tab_1_3">
								<div class="widget-news margin-bottom-20">
									<img class="widget-news-left-elem rounded-3" src="../../assets/layouts/layout/img/05.jpg" alt="">
									<div class="widget-news-right-body">
										<h3 class="widget-news-right-body-title">Most Completed theme
											<span class="label label-default"> March 12 </span>
										</h3>
										<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit diam nonumy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>
									</div>
								</div>
							</div>
							<div class="tab-pane fade" id="tab_1_4">
								<div class="widget-news margin-bottom-20">
									<img class="widget-news-left-elem rounded-3" src="../../assets/layouts/layout/img/07.jpg" alt="">
									<div class="widget-news-right-body">
										<h3 class="widget-news-right-body-title">San Francisco
											<span class="label label-default"> March 10 </span>
										</h3>
										<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit diam nonumy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					<!-- END WIDGET TAB -->
				</div>

				<div class="col-md-12 col-sm-12">
                    <!-- BEGIN UNCHECKINFO-->
                    <div class="portlet light bordered">
                        <div class="portlet-title">
                            <div class="caption">
                                <i class="icon-bar-chart font-green hide"></i>
                                <span class="caption-subject font-green bold uppercase">机检未检</span>
                                <span class="caption-helper">印码机检...</span>
                            </div>

                            <div class="actions">
                                <div class="btn-group">
                                    <a href="" class="btn blue btn-outline btn-circle btn-sm dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true"> 机台
                                        <span class="fa fa-angle-down"> </span>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div class="portlet-body">
                            <div id="nocheck_loading">
                                <img src="../assets/global/img/loading.gif" alt="loading" /> </div>
                            <div id="nocheck_content" class="display-none">
                                <div id="nocheck_statistics" class="chart"> </div>
                            </div>
                        </div>
                    </div>
                    <!-- END UNCHECKINFO-->
                </div>
			</div>
			<!-- END PAGE CONTENT-->
		</div>
	</div>
	<!-- END CONTENT -->
	<?php include("templates/quicksidebar/quicksidebar_welcome.php");?>
</div>
<!-- END CONTAINER -->