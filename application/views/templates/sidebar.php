<!-- END HEADER -->
<div class="clearfix">
</div>
<!-- BEGIN CONTAINER -->
<div class="page-container">
	<!-- BEGIN SIDEBAR -->
	<div class="page-sidebar-wrapper">
		<div class="page-sidebar navbar-collapse collapse">
			<!-- BEGIN SIDEBAR MENU -->
			<!-- DOC: Apply "page-sidebar-menu-light" class right after "page-sidebar-menu" to enable light sidebar menu style(without borders) -->
			<!-- DOC: Apply "page-sidebar-menu-hover-submenu" class right after "page-sidebar-menu" to enable hoverable(hover vs accordion) sub menu mode -->
			<!-- DOC: Apply "page-sidebar-menu-closed" class right after "page-sidebar-menu" to collapse("page-sidebar-closed" class must be applied to the body element) the sidebar sub menu mode -->
			<!-- DOC: Set data-auto-scroll="false" to disable the sidebar from auto scrolling/focusing -->
			<!-- DOC: Set data-keep-expand="true" to keep the submenues expanded -->
			<!-- DOC: Set data-auto-speed="200" to adjust the sub menu slide up/down speed -->
			<ul class="page-sidebar-menu font-yahei" data-keep-expanded="false" data-auto-scroll="true" data-slide-speed="200">
				<li class="nav-item start active open">
					<a href="javascript:;" class="nav-link nav-toggle">
					<i class="icon-home"></i>
					<span class="title">质量控制中心</span>
					<span class="selected"></span>
					<span class="arrow open"></span>
					</a>
					<ul class="sub-menu">
						<li class="nav-item active">
							<a href="<?php echo base_url()?>">
							<i class="icon-screen-desktop"></i>
							事务中心</a>
						</li>
						<li class="nav-item">
							<a href="javascript:;" class="nav-link nav-toggle">
							<i class="icon-notebook"></i> 机检日志 <span class="arrow"></span>
							</a>
							<ul class="sub-menu">
								<li class="nav-item">
									<a href="<?php echo base_url()?>worklog"><i class="icon-book-open"></i> 查看日志</a>
								</li>
								<li class="nav-item">
									<a href="<?php echo base_url()?>worklog/editlog"><i class="icon-pencil"></i> 填写日志</a>
								</li>
							</ul>
						</li>
					</ul>
				</li>

				<li class="heading nav-link nav-toggle">
					<h3 class="uppercase" style="font-size:1.3em;">质量数据</h3>
				</li>
				<li class="tooltips nav-item" data-container="body" data-placement="right" data-html="true" data-original-title="交互式质量数据可视化图表">
					<a href="javascript:;" class="nav-link nav-toggle">
					<i class="icon-bar-chart"></i>
					<span class="title">质量曲线图</span>
					<span class="arrow"></span><span class="badge badge-default badge-success">4</span>
					</a>
					<ul class="sub-menu" style="display: none;">
						<li class="nav-item">
							<a href="javascript:;" class="nav-link nav-toggle">
							<i class="icon-directions"></i> 钞纸机检工序 <span class="arrow"></span><span class="badge badge-roundless badge-warning">new</span>
							</a>
							<ul class="sub-menu">
								<li class="nav-item">
									<a href="javascript:;" class="nav-link nav-toggle">
									<i class="icon-user"></i>
									纸张测量统计 <span class="arrow"></span>
									</a>
									<ul class="sub-menu">
										<li class="nav-item">
											<a href="#" class="nav-link nav-toggle"><i class="icon-power"></i> 横切光标间距</a>
										</li>
										<li class="nav-item">
											<a href="#" class="nav-link nav-toggle"><i class="icon-paper-plane"></i> 对角线差</a>
										</li>
										<li class="nav-item">
											<a href="#" class="nav-link nav-toggle"><i class="icon-star"></i> 单幅水印宽 </a>
										</li>
										<li class="nav-item">
											<a href="#" class="nav-link nav-toggle"><i class="icon-star"></i> 单幅水印高 </a>
										</li>
										<li class="nav-item">
											<a href="#" class="nav-link nav-toggle"><i class="icon-star"></i> 抄宽 </a>
										</li>
									</ul>
								</li>
								<li class="nav-item">
									<a href="#" class="nav-link nav-toggle"><i class="icon-camera"></i> 缺陷类型统计 </a>
								</li>
								<li class="nav-item">
									<a href="#" class="nav-link nav-toggle"><i class="icon-link"></i> 缺陷区域统计 </a>
								</li>
								<li class="nav-item">
									<a href="#" class="nav-link nav-toggle"><i class="icon-pointer"></i> 小开缺陷统计 </a>
								</li>
								<li class="nav-item">
									<a href="#" class="nav-link nav-toggle"><i class="icon-pointer"></i> 缺陷类型分布 </a>
								</li>
							</ul>
						</li>
						<li class="nav-item">
							<a href="javascript:;" class="nav-link nav-toggle">
							<i class="icon-layers"></i> 成品机检工序 <span class="arrow"></span><span class="badge badge-roundless badge-danger">new</span>
							</a>
							<ul class="sub-menu">
								<li class="nav-item">
									<a href="javascript:;" class="nav-link nav-toggle">
									<i class="icon-user"></i>
									纸张测量统计 <span class="arrow"></span>
									</a>
									<ul class="sub-menu">
										<li class="nav-item">
											<a href="#" class="nav-link nav-toggle"><i class="icon-power"></i> 横切光标间距</a>
										</li>
										<li class="nav-item">
											<a href="#" class="nav-link nav-toggle"><i class="icon-paper-plane"></i> 对角线差</a>
										</li>
										<li class="nav-item">
											<a href="#" class="nav-link nav-toggle"><i class="icon-star"></i> 单幅水印宽 </a>
										</li>
										<li class="nav-item">
											<a href="#" class="nav-link nav-toggle"><i class="icon-star"></i> 单幅水印高 </a>
										</li>
										<li class="nav-item">
											<a href="#" class="nav-link nav-toggle"><i class="icon-star"></i> 抄宽 </a>
										</li>
									</ul>
								</li>
								<li class="nav-item">
									<a href="#" class="nav-link nav-toggle"><i class="icon-camera"></i> 缺陷类型统计 </a>
								</li>
								<li class="nav-item">
									<a href="#" class="nav-link nav-toggle"><i class="icon-link"></i> 缺陷区域统计 </a>
								</li>
								<li class="nav-item">
									<a href="#" class="nav-link nav-toggle"><i class="icon-pointer"></i> 小开缺陷统计 </a>
								</li>
								<li class="nav-item">
									<a href="#" class="nav-link nav-toggle"><i class="icon-pointer"></i> 缺陷类型分布 </a>
								</li>
							</ul>
						</li>
						<li class="nav-item">
							<a href="javascript:;" class="nav-link nav-toggle">
							<i class="icon-puzzle"></i> 胶凹离线检测 <span class="arrow"></span>
							</a>
							<ul class="sub-menu">
								<li class="nav-item">
									<a href="javascript:;" class="nav-link nav-toggle">
									<i class="icon-user"></i>
									胶印离线质量 <span class="arrow"></span>
									</a>
									<ul class="sub-menu">
										<li class="nav-item">
											<a href="#" class="nav-link nav-toggle"><i class="icon-star"></i> 月度质量汇总</a>
										</li>
										<li class="nav-item">
											<a href="#" class="nav-link nav-toggle"><i class="icon-paper-plane"></i> 当天质量汇总</a>
										</li>
										<li class="nav-item">
											<a href="#" class="nav-link nav-toggle"><i class="icon-graph"></i> 原始质量数据</a>
										</li>
									</ul>
								</li>
								<li class="nav-item">
									<a href="javascript:;" class="nav-link nav-toggle">
									<i class="icon-user"></i>
									凹印离线质量 <span class="arrow"></span>
									</a>
									<ul class="sub-menu">
										<li class="nav-item">
											<a href="#" class="nav-link nav-toggle"><i class="icon-star"></i> 月度质量汇总</a>
										</li>
										<li class="nav-item">
											<a href="#" class="nav-link nav-toggle"><i class="icon-paper-plane"></i> 当天质量汇总</a>
										</li>
										<li class="nav-item">
											<a href="#" class="nav-link nav-toggle"><i class="icon-graph"></i> 原始质量数据</a>
										</li>
									</ul>
								</li>
							</ul>
						</li>
						<li class="nav-item">
							<a href="javascript:;" class="nav-link nav-toggle">
							<i class="icon-calendar"></i> 印码核查工艺 <span class="arrow"></span>
							</a>
							<ul class="sub-menu">
								<li class="nav-item">
									<a href="#" class="nav-link nav-toggle"><i class="icon-tag"></i> 各品种质量汇总</a>
								</li>
								<li class="nav-item">
									<a href="#" class="nav-link nav-toggle"><i class="icon-pencil"></i>各机台质量汇总</a>
								</li>
								<li class="nav-item">
									<a href="#" class="nav-link nav-toggle"><i class="icon-graph"></i> 各机长平均好品率</a>
								</li>
								<li class="nav-item">
									<a href="#" class="nav-link nav-toggle"><i class="icon-graph"></i> 原始质量数据</a>
								</li>
							</ul>
						</li>
						<li class="nav-item">
							<a href="javascript:;" class="nav-link nav-toggle">
							<i class="icon-screen-desktop"></i> 图像判废及特抽 <span class="arrow"></span><span class="badge badge-roundless badge-success">new</span>
							</a>
							<ul class="sub-menu">								
								<li class="nav-item">
									<a href="#" class="nav-link nav-toggle"><i class="icon-pencil"></i>胶凹机台实废情况</a>
								</li>
								<li class="nav-item">
									<a href="#" class="nav-link nav-toggle"><i class="icon-tag"></i>印码机台实废情况</a>
								</li>
								<li class="nav-item">
									<a href="#" class="nav-link nav-toggle"><i class="icon-graph"></i>小开分析仪</a>
								</li>
								<li class="nav-item">
									<a href="#" class="nav-link nav-toggle"><i class="icon-graph"></i>FLC荧光标定仪</a>
								</li>
							</ul>
						</li>
						<li class="nav-item">
							<a href="javascript:;" class="nav-link nav-toggle">
							<i class="icon-shield"></i> 检封机检工序 <span class="arrow"></span><span class="badge badge-roundless badge-warning">new</span>
							</a>
							<ul class="sub-menu">
								<li class="nav-item">
									<a href="#" class="nav-link nav-toggle"><i class="icon-tag"></i> 清分机质量曲线 </a>
								</li>
								<li class="nav-item">
									<a href="#" class="nav-link nav-toggle"><i class="icon-pencil"></i> 装箱情况 </a>
								</li>
							</ul>
						</li>
						<li class="nav-item">
							<a href="javascript:;" class="nav-link nav-toggle">
							<i class="icon-bar-chart"></i> 其它 <span class="arrow"></span>
							</a>
							<ul class="sub-menu" style="display: none;">
								<li class="nav-item">
									<a href="#" class="nav-link nav-toggle"><i class="icon-tag"></i> 备用1</a>
								</li>
								<li class="nav-item">
									<a href="#" class="nav-link nav-toggle"><i class="icon-pencil"></i> 备用2</a>
								</li>
								<li class="nav-item">
									<a href="#" class="nav-link nav-toggle"><i class="icon-graph"></i> 备用3</a>
								</li>
							</ul>
						</li>
					</ul>
				</li>
				
				<li class="tooltips nav-item" data-container="body" data-placement="right" data-html="true" data-original-title="交互式质量数据报表">
					<a href="javascript:;" class="nav-link nav-toggle">
					<i class="icon-pie-chart"></i>
					<span class="title">报表查询</span>
					<span class="arrow"></span><span class="badge badge-default badge-info">4</span>
					</a>
					<ul class="sub-menu" style="display: none;">
						<li class="nav-item">
							<a href="javascript:;" class="nav-link nav-toggle">
							<i class="icon-directions"></i> 钞纸机检工序 <span class="arrow"></span><span class="badge badge-roundless badge-warning">new</span>
							</a>
							<ul class="sub-menu">
								<li class="nav-item">
									<a href="javascript:;" class="nav-link nav-toggle">
									<i class="icon-user"></i>
									算法参数 <span class="arrow"></span>
									</a>
									<ul class="sub-menu">
										<li class="nav-item">
											<a href="#" class="nav-link nav-toggle"><i class="icon-power"></i> 宏区算法参数</a>
										</li>
										<li class="nav-item">
											<a href="#" class="nav-link nav-toggle"><i class="icon-paper-plane"></i> 纸区算法参数</a>
										</li>
										<li class="nav-item">
											<a href="#" class="nav-link nav-toggle"><i class="icon-star"></i> 安全线算法参数 </a>
										</li>
									</ul>
								</li>
								<li class="nav-item">
									<a href="javascript:;" class="nav-link nav-toggle">
									<i class="icon-user"></i>
									判废标准 <span class="arrow"></span>
									</a>
									<ul class="sub-menu">
										<li class="nav-item">
											<a href="#" class="nav-link nav-toggle"><i class="icon-power"></i> 宏区判废标准</a>
										</li>
										<li class="nav-item">
											<a href="#" class="nav-link nav-toggle"><i class="icon-paper-plane"></i> 纸区判废标准</a>
										</li>
										<li class="nav-item">
											<a href="#" class="nav-link nav-toggle"><i class="icon-star"></i> 安全线判废标准 </a>
										</li>
									</ul>
								</li>
								<li class="nav-item">
									<a href="javascript:;" class="nav-link nav-toggle">
									<i class="icon-user"></i>
									纸张测量统计 <span class="arrow"></span>
									</a>
									<ul class="sub-menu">
										<li class="nav-item">
											<a href="#" class="nav-link nav-toggle"><i class="icon-power"></i> 横切光标间距</a>
										</li>
										<li class="nav-item">
											<a href="#" class="nav-link nav-toggle"><i class="icon-paper-plane"></i> 对角线差</a>
										</li>
										<li class="nav-item">
											<a href="#" class="nav-link nav-toggle"><i class="icon-star"></i> 单幅水印宽 </a>
										</li>
										<li class="nav-item">
											<a href="#" class="nav-link nav-toggle"><i class="icon-star"></i> 单幅水印高 </a>
										</li>
										<li class="nav-item">
											<a href="#" class="nav-link nav-toggle"><i class="icon-star"></i> 抄宽 </a>
										</li>
									</ul>
								</li>
								<li class="nav-item">
									<a href="#" class="nav-link nav-toggle"><i class="icon-camera"></i> 缺陷类型统计 </a>
								</li>
								<li class="nav-item">
									<a href="#" class="nav-link nav-toggle"><i class="icon-link"></i> 缺陷区域统计 </a>
								</li>
								<li class="nav-item">
									<a href="#" class="nav-link nav-toggle"><i class="icon-pointer"></i> 小开缺陷统计 </a>
								</li>
								<li class="nav-item">
									<a href="#" class="nav-link nav-toggle"><i class="icon-pointer"></i> 缺陷类型分布 </a>
								</li>
							</ul>
						</li>
						<li class="nav-item">
							<a href="javascript:;" class="nav-link nav-toggle">
							<i class="icon-layers"></i> 成品机检工序 <span class="arrow"></span><span class="badge badge-roundless badge-danger">new</span>
							</a>
							<ul class="sub-menu">
									<li class="nav-item">
									<a href="javascript:;" class="nav-link nav-toggle">
									<i class="icon-user"></i>
									算法参数 <span class="arrow"></span>
									</a>
									<ul class="sub-menu">
										<li class="nav-item">
											<a href="#" class="nav-link nav-toggle"><i class="icon-power"></i> 宏区算法参数</a>
										</li>
										<li class="nav-item">
											<a href="#" class="nav-link nav-toggle"><i class="icon-paper-plane"></i> 纸区算法参数</a>
										</li>
										<li class="nav-item">
											<a href="#" class="nav-link nav-toggle"><i class="icon-star"></i> 安全线算法参数 </a>
										</li>
									</ul>
								</li>
								<li class="nav-item">
									<a href="javascript:;" class="nav-link nav-toggle">
									<i class="icon-user"></i>
									判废标准 <span class="arrow"></span>
									</a>
									<ul class="sub-menu">
										<li class="nav-item">
											<a href="#" class="nav-link nav-toggle"><i class="icon-power"></i> 宏区判废标准</a>
										</li>
										<li class="nav-item">
											<a href="#" class="nav-link nav-toggle"><i class="icon-paper-plane"></i> 纸区判废标准</a>
										</li>
										<li class="nav-item">
											<a href="#" class="nav-link nav-toggle"><i class="icon-star"></i> 安全线判废标准 </a>
										</li>
									</ul>
								</li>
								<li class="nav-item">
									<a href="javascript:;" class="nav-link nav-toggle">
									<i class="icon-user"></i>
									纸张测量统计 <span class="arrow"></span>
									</a>
									<ul class="sub-menu">
										<li class="nav-item">
											<a href="#" class="nav-link nav-toggle"><i class="icon-power"></i> 横切光标间距</a>
										</li>
										<li class="nav-item">
											<a href="#" class="nav-link nav-toggle"><i class="icon-paper-plane"></i> 对角线差</a>
										</li>
										<li class="nav-item">
											<a href="#" class="nav-link nav-toggle"><i class="icon-star"></i> 单幅水印宽 </a>
										</li>
										<li class="nav-item">
											<a href="#" class="nav-link nav-toggle"><i class="icon-star"></i> 单幅水印高 </a>
										</li>
										<li class="nav-item">
											<a href="#" class="nav-link nav-toggle"><i class="icon-star"></i> 抄宽 </a>
										</li>
									</ul>
								</li>
								<li class="nav-item">
									<a href="#" class="nav-link nav-toggle"><i class="icon-camera"></i> 缺陷类型统计 </a>
								</li>
								<li class="nav-item">
									<a href="#" class="nav-link nav-toggle"><i class="icon-link"></i> 缺陷区域统计 </a>
								</li>
								<li class="nav-item">
									<a href="#" class="nav-link nav-toggle"><i class="icon-pointer"></i> 小开缺陷统计 </a>
								</li>
								<li class="nav-item">
									<a href="#" class="nav-link nav-toggle"><i class="icon-pointer"></i> 缺陷类型分布 </a>
								</li>
							</ul>
						</li>
						<li class="nav-item">
							<a href="javascript:;" class="nav-link nav-toggle">
							<i class="icon-puzzle"></i> 胶凹离线检测 <span class="arrow"></span>
							</a>
							<ul class="sub-menu">
								<li class="nav-item">
									<a href="javascript:;" class="nav-link nav-toggle">
									<i class="icon-user"></i>
									胶印离线质量 <span class="arrow"></span>
									</a>
									<ul class="sub-menu">
										<li class="nav-item">
											<a href="#" class="nav-link nav-toggle"><i class="icon-star"></i> 月度质量汇总</a>
										</li>
										<li class="nav-item">
											<a href="#" class="nav-link nav-toggle"><i class="icon-paper-plane"></i> 当天质量汇总</a>
										</li>
										<li class="nav-item">
											<a href="#" class="nav-link nav-toggle"><i class="icon-graph"></i> 原始质量数据</a>
										</li>
									</ul>
								</li>
								<li class="nav-item">
									<a href="javascript:;" class="nav-link nav-toggle">
									<i class="icon-user"></i>
									凹印离线质量 <span class="arrow"></span>
									</a>
									<ul class="sub-menu">
										<li class="nav-item">
											<a href="#" class="nav-link nav-toggle"><i class="icon-star"></i> 月度质量汇总</a>
										</li>
										<li class="nav-item">
											<a href="#" class="nav-link nav-toggle"><i class="icon-paper-plane"></i> 当天质量汇总</a>
										</li>
										<li class="nav-item">
											<a href="#" class="nav-link nav-toggle"><i class="icon-graph"></i> 原始质量数据</a>
										</li>
									</ul>
								</li>
							</ul>
						</li>
						<li class="nav-item">
							<a href="javascript:;" class="nav-link nav-toggle">
							<i class="icon-calendar"></i> 印码核查工艺 <span class="arrow"></span>
							</a>
							<ul class="sub-menu">
								<li class="nav-item">
									<a href="<?php echo base_url()?>QualityTable" class="nav-link nav-toggle"><i class="icon-tag"></i> 各品种质量汇总</a>
								</li>
								<li class="nav-item">
									<a href="#" class="nav-link nav-toggle"><i class="icon-pencil"></i>各机台质量汇总</a>
								</li>
								<li class="nav-item">
									<a href="#" class="nav-link nav-toggle"><i class="icon-graph"></i> 各机长平均好品率</a>
								</li>
								<li class="nav-item">
									<a href="#" class="nav-link nav-toggle"><i class="icon-graph"></i> 原始质量数据</a>
								</li>
							</ul>
						</li>
						<li class="nav-item">
							<a href="javascript:;" class="nav-link nav-toggle">
							<i class="icon-screen-desktop"></i> 图像判废及特抽 <span class="arrow"></span><span class="badge badge-roundless badge-success">new</span>
							</a>
							<ul class="sub-menu">								
								<li class="nav-item">
									<a href="#" class="nav-link nav-toggle"><i class="icon-pencil"></i>胶凹机台实废情况</a>
								</li>
								<li class="nav-item">
									<a href="#" class="nav-link nav-toggle"><i class="icon-tag"></i>印码机台实废情况</a>
								</li>
								<li class="nav-item">
									<a href="#" class="nav-link nav-toggle"><i class="icon-graph"></i>小开分析仪</a>
								</li>
								<li class="nav-item">
									<a href="#" class="nav-link nav-toggle"><i class="icon-graph"></i>FLC荧光标定仪</a>
								</li>
							</ul>
						</li>
						<li class="nav-item">
							<a href="javascript:;" class="nav-link nav-toggle">
							<i class="icon-shield"></i> 检封机检工序 <span class="arrow"></span><span class="badge badge-roundless badge-warning">new</span>
							</a>
							<ul class="sub-menu">
								<li class="nav-item">
									<a href="#" class="nav-link nav-toggle"><i class="icon-tag"></i> 清分机质量曲线 </a>
								</li>
								<li class="nav-item">
									<a href="#" class="nav-link nav-toggle"><i class="icon-pencil"></i> 装箱情况 </a>
								</li>
							</ul>
						</li>
						<li class="nav-item">
							<a href="javascript:;" class="nav-link nav-toggle">
							<i class="icon-bar-chart"></i> 其它 <span class="arrow"></span>
							</a>
							<ul class="sub-menu">
								<li class="nav-item">
									<a href="#" class="nav-link nav-toggle"><i class="icon-tag"></i> 备用1</a>
								</li>
								<li class="nav-item">
									<a href="#" class="nav-link nav-toggle"><i class="icon-pencil"></i> 备用2</a>
								</li>
								<li class="nav-item">
									<a href="#" class="nav-link nav-toggle"><i class="icon-graph"></i> 备用3</a>
								</li>
							</ul>
						</li>
					</ul>
				</li>

				<li class="nav-item">
					<a href="javascript:;" class="nav-link nav-toggle">
					<i class="icon-globe"></i>
					<span class="title">专题分析</span>
					<span class="arrow "></span><span class="badge badge-roundless badge-success">new</span>
					</a>
					<ul class="sub-menu">
						<li class="nav-item">
							<a href="javascript:;" class="nav-link nav-toggle">
							<i class="icon-settings"></i> 钞纸/成品工序 <span class="arrow"></span>
							</a>
							<ul class="sub-menu">
								<li class="nav-item">
									<a href="javascript:;" class="nav-link nav-toggle">
									<i class="icon-user"></i>
									主题1 <span class="arrow"></span>
									</a>
									<ul class="sub-menu">
										<li class="nav-item">
											<a href="#" class="nav-link nav-toggle"><i class="icon-power"></i> 年度分析</a>
										</li>
										<li class="nav-item">
											<a href="#" class="nav-link nav-toggle"><i class="icon-paper-plane"></i> 半年分析</a>
										</li>
										<li class="nav-item">
											<a href="#" class="nav-link nav-toggle"><i class="icon-star"></i> 月度分析</a>
										</li>
									</ul>
								</li>
								<li class="nav-item">
									<a href="javascript:;" class="nav-link nav-toggle">
									<i class="icon-user"></i>
									主题2 <span class="arrow"></span>
									</a>
									<ul class="sub-menu">
										<li class="nav-item">
											<a href="#" class="nav-link nav-toggle"><i class="icon-power"></i> 年度分析</a>
										</li>
										<li class="nav-item">
											<a href="#" class="nav-link nav-toggle"><i class="icon-paper-plane"></i> 半年分析</a>
										</li>
										<li class="nav-item">
											<a href="#" class="nav-link nav-toggle"><i class="icon-star"></i> 月度分析</a>
										</li>
									</ul>
								</li>
							</ul>
						</li>
						<li class="nav-item">
							<a href="javascript:;" class="nav-link nav-toggle">
							<i class="icon-settings"></i> 胶凹离线检测<span class="arrow"></span>
							</a>
							<ul class="sub-menu">
								<li class="nav-item">
									<a href="javascript:;" class="nav-link nav-toggle">
									各机台质量对比 <span class="arrow"></span>
									</a>
									<ul class="sub-menu">
										<li class="nav-item">
											<a href="#" class="nav-link nav-toggle"><i class="icon-power"></i> 年度分析</a>
										</li>
										<li class="nav-item">
											<a href="#" class="nav-link nav-toggle"><i class="icon-paper-plane"></i> 半年分析</a>
										</li>
										<li class="nav-item">
											<a href="#" class="nav-link nav-toggle"><i class="icon-star"></i> 月度分析</a>
										</li>
									</ul>
								</li>
								<li class="nav-item">
									<a href="javascript:;" class="nav-link nav-toggle">
									各机台设备使用情况 <span class="arrow"></span>
									</a>
									<ul class="sub-menu">
										<li class="nav-item">
											<a href="#" class="nav-link nav-toggle"><i class="icon-power"></i> 年度分析</a>
										</li>
										<li class="nav-item">
											<a href="#" class="nav-link nav-toggle"><i class="icon-paper-plane"></i> 半年分析</a>
										</li>
										<li class="nav-item">
											<a href="#" class="nav-link nav-toggle"><i class="icon-star"></i> 月度分析</a>
										</li>
									</ul>
								</li>
							</ul>
						</li>
						<li class="nav-item">
							<a href="javascript:;" class="nav-link nav-toggle">
							<i class="icon-globe"></i> 印码核查工艺 <span class="arrow"></span><span class="badge badge-roundless badge-danger">new</span>
							</a>
							<ul class="sub-menu">
								<li class="nav-item">
									<a href="<?php echo base_url()?>Addition/QualityAnaly/index.html" target="_Blank" class="nav-link nav-toggle"><i class="icon-tag"></i> 2014印钞质量分析</a>
								</li>
								<li class="nav-item">
									<a href="#" class="nav-link nav-toggle"><i class="icon-pencil"></i> 2014印码三合一作废分析 </a>
								</li>
								<li class="nav-item">
									<a href="#" class="nav-link nav-toggle"><i class="icon-graph"></i> 印码机检未检数分布情况 </a>
								</li>
								<li class="nav-item">
									<a href="#" class="nav-link nav-toggle"><i class="icon-graph"></i> 不同时间开印产品质量对比</a>
								</li>
								<li class="nav-item">
									<a href="#" class="nav-link nav-toggle"><i class="icon-graph"></i> 白班/中班开印产品质量对比</a>
								</li>
								<li class="nav-item">
									<a href="#" class="nav-link nav-toggle"><i class="icon-graph"></i> 胶凹各机长质量对比</a>
								</li>
								<li class="nav-item">
									<a href="#" class="nav-link nav-toggle"><i class="icon-graph"></i> 胶凹机长异常品分布</a>
								</li>
								<li class="nav-item">
									<a href="#" class="nav-link nav-toggle"><i class="icon-graph"></i> 2011-2015印码机检好品率对比</a>
								</li>
								<li class="nav-item">
									<a href="#" class="nav-link nav-toggle"><i class="icon-graph"></i> 印码机台误废分析</a>
								</li>
								<li class="nav-item">
									<a href="#" class="nav-link nav-toggle"><i class="icon-graph"></i> 胶凹机台实废分析</a>
								</li>
							</ul>
						</li>
						<li class="nav-item">
							<a href="javascript:;" class="nav-link nav-toggle">
							<i class="icon-globe"></i> 检封质量 <span class="arrow"></span>
							</a>
							<ul class="sub-menu">
								<li class="nav-item">
									<a href="javascript:;" class="nav-link nav-toggle">
									<i class="icon-user"></i>
									清分机加抽建议 <span class="arrow"></span>
									</a>
									<ul class="sub-menu">
										<li class="nav-item">
											<a href="#" class="nav-link nav-toggle"><i class="icon-power"></i> 连续开位缺陷数较多产品</a>
										</li>
										<li class="nav-item">
											<a href="#" class="nav-link nav-toggle"><i class="icon-paper-plane"></i> 连续开位缺陷数较少产品</a>
										</li>
									</ul>
								</li>
								<li class="nav-item">
									<a href="javascript:;" class="nav-link nav-toggle">
									<i class="icon-user"></i>
									检封机台成品率对比 <span class="arrow"></span>
									</a>
									<ul class="sub-menu">
										<li class="nav-item">
											<a href="#" class="nav-link nav-toggle"><i class="icon-power"></i> 年度分析</a>
										</li>
										<li class="nav-item">
											<a href="#" class="nav-link nav-toggle"><i class="icon-paper-plane"></i> 半年分析</a>
										</li>
										<li class="nav-item">
											<a href="#" class="nav-link nav-toggle"><i class="icon-star"></i> 月度分析</a>
										</li>
									</ul>
								</li>
								<li class="nav-item">
									<a href="javascript:;" class="nav-link nav-toggle">
									<i class="icon-user"></i>
									胶凹机长成品率对比 <span class="arrow"></span>
									</a>
									<ul class="sub-menu">
										<li class="nav-item">
											<a href="#" class="nav-link nav-toggle"><i class="icon-power"></i> 年度分析</a>
										</li>
										<li class="nav-item">
											<a href="#" class="nav-link nav-toggle"><i class="icon-paper-plane"></i> 半年分析</a>
										</li>
										<li class="nav-item">
											<a href="#" class="nav-link nav-toggle"><i class="icon-star"></i> 月度分析</a>
										</li>
									</ul>
								</li>
							</ul>
						</li>
						<li class="nav-item">
							<a href="#" class="nav-link nav-toggle">
							<i class="icon-bar-chart"></i>
							其它 </a>
						</li>
					</ul>
				</li>
				<li class="heading nav-link nav-toggle">
					<h3 class="uppercase" style="font-size:1.3em;">事务中心</h3>
				</li>
				<li class="nav-item">
					<a href="javascript:;" class="nav-link nav-toggle">
					<i class="icon-wallet"></i>
					<span class="title">事务处理</span>
					<span class="arrow "></span>
					</a>
					<ul class="sub-menu">
						<li class="nav-item">
							<a href="javascript:;" class="nav-link nav-toggle">
							待办事务<span class="arrow"></span></a>
							<ul class="sub-menu">
								<li class="nav-item">
									<a href="#" class="nav-link nav-toggle"><i class="icon-power"></i>个人事务</a>
								</li>
								<li class="nav-item">
									<a href="#" class="nav-link nav-toggle"><i class="icon-paper-plane"></i>部门事务</a>
								</li>
								<li class="nav-item">
									<a href="#" class="nav-link nav-toggle"><i class="icon-star"></i>机检组事务</a>
								</li>
							</ul>
						</li>
						<li class="nav-item">
							<a href="portlet_general2.html" class="nav-link nav-toggle">
							<span class="badge badge-roundless badge-danger">new</span>系统提醒</a>
						</li>
						<li class="nav-item">
							<a href="portlet_general3.html" class="nav-link nav-toggle">
							<span class="badge badge-roundless badge-success">new</span>邮件系统</a>
						</li>
						<li class="nav-item">
							<a href="<?php echo base_url()?>MicroBlog" class="nav-link nav-toggle">
							<span class="badge badge-roundless badge-danger">new</span>工作笔记</a>
						</li>
						<li class="nav-item">
							<a href="<?php echo base_url()?>DataInterface" class="nav-link nav-toggle">
							数据接口</a>
						</li>
						<li class="nav-item">
							<a href="portlet_draggable.html" class="nav-link nav-toggle">
							个人信息</a>
						</li>
					</ul>
				</li>				
				<li class="nav-item">
					<a href="javascript:;" class="nav-link nav-toggle">
					<i class="icon-bar-chart"></i>
					<span class="title">检测系统实时监测</span>
					<span class="arrow "></span>
					</a>
					<ul class="sub-menu">
						<li class="nav-item">
							<a href="charts_flotcharts.html" class="nav-link nav-toggle">
							钞纸工序</a>
						</li>
						<li class="nav-item">
							<a href="charts_flotcharts.html" class="nav-link nav-toggle">
							成品工序</a>
						</li>
						<li class="nav-item">
							<a href="charts_amcharts.html" class="nav-link nav-toggle">
							胶凹工序</a>
						</li>
						<li class="nav-item">
							<a href="javascript:;" class="nav-link nav-toggle">
							印码工序<span class="arrow"></span></a>
							<ul class="sub-menu">
								<li class="nav-item">
									<a href="javascript:;" class="nav-link nav-toggle"><i class="icon-power"></i>机检系统状态<span class="arrow"></span></a>
									<ul class="sub-menu">
										<li class="nav-item">
											<a href="#" class="nav-link nav-toggle"><i class="icon-power"></i>硬盘使用情况</a>
										</li>
										<li class="nav-item">
											<a href="#" class="nav-link nav-toggle"><i class="icon-paper-plane"></i>数据上传情况</a>
										</li>
										<li class="nav-item">
											<a href="#" class="nav-link nav-toggle"><i class="icon-power"></i>检测系统异常监测</a>
										</li>
										<li class="nav-item">
											<a href="#" class="nav-link nav-toggle"><i class="icon-paper-plane"></i>数据库用量</a>
										</li>
										<li class="nav-item">
											<a href="#" class="nav-link nav-toggle"><i class="icon-power"></i>模型备份情况</a>
										</li>
										<li class="nav-item">
											<a href="#" class="nav-link nav-toggle"><i class="icon-paper-plane"></i>模型验证情况</a>
										</li>
									</ul>
								</li>
								<li class="nav-item">
									<a href="javascript:;" class="nav-link nav-toggle"><i class="icon-paper-plane"></i>实时质量信息
										<span class="arrow"></span></a>
										<ul class="sub-menu">											
											<li class="nav-item">
												<a href="#" class="nav-link nav-toggle"><i class="icon-paper-plane"></i>小张核查</a>
											</li>
											<li class="nav-item">
												<a href="#" class="nav-link nav-toggle"><i class="icon-power"></i>码后核查</a>
											</li>
											<li class="nav-item">
												<a href="#" class="nav-link nav-toggle"><i class="icon-paper-plane"></i>丝印品</a>
											</li>
										</ul>
								</li>
							</ul>
						</li>
						<li class="nav-item">
							<a href="charts_flotcharts.html" class="nav-link nav-toggle">
							检封工序</a>
						</li>						
					</ul>
				</li>
				<li class="tooltips nav-item" data-container="body" data-placement="right" data-html="true" data-original-title="1.提交车号（自动关联机长、工艺、机型等生产信息）;</br>2.异常描述;</br>3.机台">
					<a href="javascript:;" class="nav-link nav-toggle">
					<i class="icon-bar-chart"></i>
					<span class="title">异常品处理</span>
					<span class="arrow "></span>
					</a>
					<ul class="sub-menu">
						<li class="nav-item">
							<a href="charts_amcharts.html" class="nav-link nav-toggle">
							提交申请</a>
						</li>
						<li class="nav-item">
							<a href="charts_flotcharts.html" class="nav-link nav-toggle">
							异常品确认</a>
						</li>
						<li class="nav-item">
							<a href="charts_flotcharts.html" class="nav-link nav-toggle">
							异常品清单</a>
						</li>
					</ul>
				</li>
				<li class="tooltips nav-item" data-container="body" data-placement="right" data-html="true" data-original-title="1.类似于南钞的形式">
					<a href="javascript:;" class="nav-link nav-toggle">
					<i class="icon-bar-chart"></i>
					<span class="title">工艺流程处理</span>
					<span class="arrow "></span>
					</a>
					<ul class="sub-menu">
						<li class="nav-item">
							<a href="charts_amcharts.html" class="nav-link nav-toggle">
							工艺流程查询</a>
						</li>
						<li class="tooltips nav-item" data-container="body" data-placement="right" data-html="true" data-original-title="1.小张核查、码后核查</br>2.清分机全检</br>3.清分机加抽</br>4.人工全检/复检</br>5.图像重新判废</br>6.图像判废审核">
							<a href="charts_flotcharts.html" class="nav-link nav-toggle">
							流程更改</a>
						</li>
					</ul>
				</li>
				<li class="nav-item">
					<a href="javascript:;" class="nav-link nav-toggle">
					<i class="icon-bar-chart"></i>
					<span class="title">质量反馈</span>
					<span class="arrow "></span>
					</a>
					<ul class="sub-menu">
						<li class="nav-item">
							<a href="charts_amcharts.html" class="nav-link nav-toggle">
							核查工艺月度质量反馈</a>
						</li>
						<li class="nav-item">
							<a href="charts_flotcharts.html" class="nav-link nav-toggle">
							月度质量分析报告</a>
						</li>
						<li class="tooltips nav-item" data-container="body" data-placement="right" data-html="true" data-original-title="1.由图像判废班班长提交结果；</br>2.系统对当天判废结果按条数与区域排序；</br>3.大于指定条目时反馈至胶凹班长；</br>4.连续实废较多的产品反馈至胶凹班长">
							<a href="javascript:;" class="nav-link nav-toggle">
							图像判废实废反馈<span class="arrow "></span></a>
							<ul class="sub-menu">
								<li class="nav-item">
									<a href="charts_amcharts.html" class="nav-link nav-toggle">
									提交申请</a>
								</li>
								<li class="nav-item">
									<a href="charts_flotcharts.html" class="nav-link nav-toggle">
									实废查看</a>
								</li>
							</ul>
						</li>
					</ul>
				</li>				
				<li class="tooltips nav-item" data-container="body" data-placement="right" data-html="true" data-original-title="1.以车号/轴号来检索;</br>2.一站式入口">
					<a href="javascript:;" class="nav-link nav-toggle">
					<i class="icon-bar-chart"></i>
					<span class="title">质量信息追溯</span>
					<span class="arrow "></span>
					</a>
					<ul class="sub-menu">
						<li class="nav-item">
							<a href="javascript:;" class="nav-link nav-toggle">
							<i class="icon-settings"></i> 钞纸 <span class="arrow"></span><span class="badge badge-roundless badge-warning">new</span>
							</a>
							<ul class="sub-menu">
								<li class="nav-item">
									<a href="javascript:;" class="nav-link nav-toggle">
									<i class="icon-user"></i>
									Sample Link 1 <span class="arrow"></span>
									</a>
									<ul class="sub-menu">
										<li class="nav-item">
											<a href="#" class="nav-link nav-toggle"><i class="icon-power"></i> Sample Link 1</a>
										</li>
									</ul>
								</li>
								<li class="nav-item">
									<a href="#" class="nav-link nav-toggle"><i class="icon-camera"></i> Sample Link 1</a>
								</li>
							</ul>
						</li>
						<li class="nav-item">
							<a href="javascript:;" class="nav-link nav-toggle">
							<i class="icon-settings"></i> 成品 <span class="arrow"></span>
							</a>
							<ul class="sub-menu">
								<li class="nav-item">
									<a href="javascript:;" class="nav-link nav-toggle">
									<i class="icon-user"></i>
									Sample Link 1 <span class="arrow"></span>
									</a>
									<ul class="sub-menu">
										<li class="nav-item">
											<a href="#" class="nav-link nav-toggle"><i class="icon-power"></i> Sample Link 1</a>
										</li>
									</ul>
								</li>
							</ul>
						</li>
						<li class="nav-item">
							<a href="javascript:;" class="nav-link nav-toggle">
							<i class="icon-settings"></i> 胶凹离线检测 <span class="arrow"></span>
							</a>
							<ul class="sub-menu">
								<li class="nav-item">
									<a href="javascript:;" class="nav-link nav-toggle">
									<i class="icon-user"></i>
									Sample Link 1 <span class="arrow"></span>
									</a>
									<ul class="sub-menu">
										<li class="nav-item">
											<a href="#" class="nav-link nav-toggle"><i class="icon-power"></i> Sample Link 1</a>
										</li>
									</ul>
								</li>
								<li class="nav-item">
									<a href="#" class="nav-link nav-toggle"><i class="icon-camera"></i> Sample Link 1</a>
								</li>
							</ul>
						</li>
						<li class="nav-item">
							<a href="javascript:;" class="nav-link nav-toggle">
							<i class="icon-globe"></i> 印码核查工艺 <span class="arrow"></span>
							</a>
							<ul class="sub-menu">
								<li class="nav-item">
									<a href="#" class="nav-link nav-toggle"><i class="icon-tag"></i> Sample Link 1</a>
								</li>
							</ul>
						</li>
						<li class="nav-item">
							<a href="javascript:;" class="nav-link nav-toggle">
							<i class="icon-globe"></i> 图像判废 <span class="arrow"></span>
							</a>
							<ul class="sub-menu">
								<li class="nav-item">
									<a href="#" class="nav-link nav-toggle"><i class="icon-tag"></i> Sample Link 1</a>
								</li>
							</ul>
						</li>
						<li class="nav-item">
							<a href="javascript:;" class="nav-link nav-toggle">
							<i class="icon-globe"></i> 检封质量 <span class="arrow"></span>
							</a>
							<ul class="sub-menu">
								<li class="nav-item">
									<a href="#" class="nav-link nav-toggle"><i class="icon-tag"></i> Sample Link 1</a>
								</li>
							</ul>
						</li>
						<li class="nav-item">
							<a href="#" class="nav-link nav-toggle">
							<i class="icon-bar-chart"></i>
							其它 </a>
						</li>
					</ul>
				</li>

				<li class="heading nav-link nav-toggle">
					<h3 class="uppercase" style="font-size:1.3em;">质量日志</h3>
				</li>
				<li class="nav-item">
					<a href="javascript:;" class="nav-link nav-toggle">
					<i class="icon-notebook"></i> <span class="title">机检工作日志</span> <span class="arrow"></span><span class="badge badge-roundless badge-danger">new</span>
					</a>
					<ul class="sub-menu">
						<li class="nav-item">
							<a href="<?php echo base_url()?>worklog" class="nav-link nav-toggle"><i class="icon-book-open"></i> 查看日志</a>
						</li>
						<li class="nav-item">
							<a href="<?php echo base_url()?>worklog/editlog" class="nav-link nav-toggle"><i class="icon-pencil"></i> 填写日志</a>
						</li>
					</ul>
				</li>
				<li class="nav-item">
					<a href="javascript:;" class="nav-link nav-toggle">
					<i class="icon-graph"></i>
					<span class="title">质量会议纪要</span>
					<span class="arrow "></span>
					</a>
					<ul class="sub-menu">
						<li class="nav-item">
							<a href="javascript:;" class="nav-link nav-toggle">
							<i class="icon-settings"></i> 填写会议纪要
							</a>							
						</li>
						<li class="nav-item">
							<a href="javascript:;" class="nav-link nav-toggle">
							<i class="icon-globe"></i> 查看会议纪要
							</a>
						</li>						
					</ul>
				</li>
				<li class="nav-item">
					<a href="javascript:;" class="nav-link nav-toggle">
					<i class="icon-globe"></i>
					<span class="title">年度重点工作</span>
					<span class="arrow "></span><span class="badge badge-default badge-danger">2</span>
					</a>
					<ul class="sub-menu">
						<li class="nav-item">
							<a href="javascript:;" class="nav-link nav-toggle">
							<i class="icon-settings"></i> 填写记录
							</a>							
						</li>
						<li class="nav-item">
							<a href="javascript:;" class="nav-link nav-toggle">
							<i class="icon-globe"></i> 查看记录
							</a>
						</li>						
					</ul>
						
				</li>
				<li class="heading nav-link nav-toggle">
					<h3 class="uppercase" style="font-size:1.3em;">质量报告</h3>
				</li>
				<li class="nav-item">
					<a href="javascript:;" class="nav-link nav-toggle">
					<i class="icon-settings"></i>
					<span class="title">机检质量报告</span>
					<span class="arrow "></span>
					</a>
					<ul class="sub-menu">						
						<li class="nav-item">
							<a href="form_editable.html" class="nav-link nav-toggle">
							<span class="badge badge-roundless badge-warning">new</span>钞纸制作部</a>
						</li>
						<li class="nav-item">
							<a href="form_wizard.html" class="nav-link nav-toggle">
							成品制作部</a>
						</li>
						<li class="nav-item">
							<a href="form_controls.html" class="nav-link nav-toggle">
							胶凹制作部<span class="arrow "></span></a>
							<ul class="sub-menu">
								<li class="nav-item">
									<a href="javascript:;" class="nav-link nav-toggle">
									<i class="icon-settings"></i>部门领导
									</a>							
								</li>
								<li class="nav-item">
									<a href="javascript:;" class="nav-link nav-toggle">
									<i class="icon-globe"></i>班组长
									</a>
								</li>
								<li class="nav-item">
									<a href="javascript:;" class="nav-link nav-toggle">
									<i class="icon-globe"></i>机台
									</a>
								</li>						
							</ul>
						</li>
						<li class="nav-item">
							<a href="form_icheck.html" class="nav-link nav-toggle">
							印码制作部</a>
						</li>
						<li class="nav-item">
							<a href="form_layouts.html" class="nav-link nav-toggle">
							检封制作部</a>
						</li>
					</ul>
				</li>
				<li class="nav-item">
					<a href="javascript:;" class="nav-link nav-toggle">
					<i class="icon-briefcase"></i>
					<span class="title">机检工作报告</span>
					<span class="arrow "></span>
					</a>
					<ul class="sub-menu">						
						<li class="nav-item">
							<a href="form_wizard.html" class="nav-link nav-toggle">
							<span class="badge badge-roundless badge-warning">new</span>钞纸机检组</a>
						</li>
						<li class="nav-item">
							<a href="form_controls.html" class="nav-link nav-toggle">
							胶凹机检组</a>
						</li>
						<li class="nav-item">
							<a href="javascript:;" class="nav-link nav-toggle">
							印码机检组<span class="arrow "></span></a>
							<ul class="sub-menu">
								<li class="nav-item">
									<a href="javascript:;" class="nav-link nav-toggle">
									<i class="icon-settings"></i> 编辑报告
									</a>							
								</li>
								<li class="nav-item">
									<a href="javascript:;" class="nav-link nav-toggle">
									<i class="icon-globe"></i> 查看报告
									</a>
								</li>						
							</ul>
						</li>
						<li class="nav-item">
							<a href="form_layouts.html" class="nav-link nav-toggle">
							检封机检组</a>
						</li>
					</ul>
				</li>
				<li class="nav-item">
					<a href="javascript:;" class="nav-link nav-toggle">
					<i class="icon-wallet"></i>
					<span class="title">模型管理报告</span>
					<span class="arrow "></span>
					</a>
					<ul class="sub-menu">
						<li class="nav-item">
							<a href="portlet_general.html" class="nav-link nav-toggle">
							模型验证</a>
						</li>
						<li class="nav-item">
							<a href="portlet_general2.html" class="nav-link nav-toggle">
							<span class="badge badge-roundless badge-danger">new</span>模型调整</a>
						</li>
						<li class="nav-item">
							<a href="portlet_general3.html" class="nav-link nav-toggle">
							<span class="badge badge-roundless badge-danger">new</span>漏废分析</a>
						</li>
					</ul>
				</li>
				<li class="nav-item">
					<a href="javascript:;" class="nav-link nav-toggle">
					<i class="icon-bar-chart"></i>
					<span class="title">按时间分类</span>
					<span class="arrow "></span>
					</a>
					<ul class="sub-menu">
						<li class="nav-item">
							<a href="charts_amcharts.html" class="nav-link nav-toggle">
							质量周报</a>
						</li>
						<li class="nav-item">
							<a href="charts_flotcharts.html" class="nav-link nav-toggle">
							质量月报</a>
						</li>
						<li class="nav-item">
							<a href="charts_flotcharts.html" class="nav-link nav-toggle">
							质量季度报告</a>
						</li>
						<li class="nav-item">
							<a href="charts_flotcharts.html" class="nav-link nav-toggle">
							半年质量报告</a>
						</li>
						<li class="nav-item">
							<a href="charts_flotcharts.html" class="nav-link nav-toggle">
							年度质量报告</a>
						</li>
					</ul>
				</li>
				
				<li class="heading nav-link nav-toggle">
					<h3 class="uppercase" style="font-size:1.3em;">质量档案</h3>
				</li>
				<li class="nav-item">
					<a href="javascript:;" class="nav-link nav-toggle">
					<i class="icon-settings"></i>
					<span class="title">机检设备档案</span>
					<span class="arrow "></span>
					</a>
					<ul class="sub-menu">
						<li class="nav-item">
							<a href="form_controls.html" class="nav-link nav-toggle">
							设备概述</a>
						</li>
						<li class="nav-item">
							<a href="form_icheck.html" class="nav-link nav-toggle">
							大事记</a>
						</li>
						<li class="nav-item">
							<a href="form_layouts.html" class="nav-link nav-toggle">
							质量概况</a>
						</li>
						<li class="nav-item">
							<a href="form_editable.html" class="nav-link nav-toggle">
							<span class="badge badge-roundless badge-warning">new</span>实时质量情况</a>
						</li>
						<li class="nav-item">
							<a href="form_wizard.html" class="nav-link nav-toggle">
							模型调整情况</a>
						</li>
						<li class="nav-item">
							<a href="form_validation.html" class="nav-link nav-toggle">
							机检维护情况</a>
						</li>
						<li class="nav-item">
							<a href="form_image_crop.html" class="nav-link nav-toggle">
							<span class="badge badge-roundless badge-danger">new</span>检测软件版本变化</a>
						</li>
						<li class="nav-item">
							<a href="form_fileupload.html" class="nav-link nav-toggle">
							相关标准</a>
							<ul class="sub-menu">
								<li class="nav-item">
									<a href="charts_amcharts.html" class="nav-link nav-toggle">
									机检标准</a>
								</li>								
								<li class="nav-item">
									<a href="form_dropzone.html" class="nav-link nav-toggle">
									工艺标准</a>
								</li>
							</ul>
						</li>
					</ul>
				</li>
				<li class="nav-item">
					<a href="javascript:;" class="nav-link nav-toggle">
					<i class="icon-briefcase"></i>
					<span class="title">机长质量档案</span>
					<span class="arrow "></span>
					</a>
					<ul class="sub-menu">
						<li class="nav-item">
							<a href="table_basic.html" class="nav-link nav-toggle">
							开印品种</a>
						</li>
						<li class="nav-item">
							<a href="table_responsive.html" class="nav-link nav-toggle">
							开印设备</a>
						</li>
						<li class="nav-item">
							<a href="table_managed.html" class="nav-link nav-toggle">
							质量横向对比（同类型机长）</a>
						</li>
						<li class="nav-item">
							<a href="table_editable.html" class="nav-link nav-toggle">
							个人质量动态变化</a>
						</li>
						<li class="nav-item">
							<a href="table_advanced.html" class="nav-link nav-toggle">
							质量反馈情况</a>
						</li>
						<li class="nav-item">
							<a href="table_ajax.html" class="nav-link nav-toggle">
							质量隐患/事故汇总</a>
						</li>
					</ul>
				</li>


				<li class="heading nav-link nav-toggle">
					<h3 class="uppercase" style="font-size:1.3em;">质量标准</h3>
				</li>
				<li class="nav-item">
					<a href="javascript:;" class="nav-link nav-toggle">
					<i class="icon-rocket"></i>
					<span class="title">钞纸工艺规程</span>
					<span class="arrow "></span>
					</a>
					<ul class="sub-menu">
						<li class="nav-item">
							<a href="layout_horizontal_sidebar_menu.html" class="nav-link nav-toggle">
							工艺卡</a>
						</li>
						<li class="nav-item">
							<a href="index_horizontal_menu.html" class="nav-link nav-toggle">
							工艺规定</a>
						</li>
						<li class="nav-item">
							<a href="layout_horizontal_menu1.html" class="nav-link nav-toggle">
							风险梳理及防范</a>
						</li>						
					</ul>
				</li>
				<li class="nav-item">
					<a href="javascript:;" class="nav-link nav-toggle">
					<i class="icon-rocket"></i>
					<span class="title">印钞工艺规程</span>
					<span class="arrow "></span>
					</a>
					<ul class="sub-menu">
						<li class="nav-item">
							<a href="layout_horizontal_sidebar_menu.html" class="nav-link nav-toggle">
							工艺卡</a>
						</li>
						<li class="nav-item">
							<a href="index_horizontal_menu.html" class="nav-link nav-toggle">
							工艺规定</a>
						</li>
						<li class="nav-item">
							<a href="layout_horizontal_menu1.html" class="nav-link nav-toggle">
							风险梳理及防范</a>
						</li>						
					</ul>
				</li>
				<li class="nav-item">
					<a href="javascript:;" class="nav-link nav-toggle">
					<i class="icon-diamond"></i>
					<span class="title">机检技术标准</span>
					<span class="arrow "></span>
					</a>
					<ul class="sub-menu">
						<li class="nav-item">
							<a href="ui_general.html" class="nav-link nav-toggle">
							机检模型技术标准</a>
						</li>
						<li class="nav-item">
							<a href="ui_buttons.html" class="nav-link nav-toggle">
							验收测试标准</a>
						</li>
						<li class="nav-item">
							<a href="ui_confirmations.html" class="nav-link nav-toggle">
							机检维护标准</a>
						</li>						
					</ul>
				</li>
				<li class="nav-item">
					<a href="javascript:;" class="nav-link nav-toggle">
					<i class="icon-puzzle"></i>
					<span class="title">机检技术档案</span>
					<span class="arrow "></span>
					</a>
					<ul class="sub-menu">
						<li class="tooltips nav-item" data-container="body" data-placement="right" data-html="true" data-original-title="宏区编号、宏区参数、宏区范围">
							<a href="components_pickers.html" class="nav-link nav-toggle">
							检测参数</a>
						</li>
						<li class="nav-item">
							<a href="components_dropdowns.html" class="nav-link nav-toggle">
							检测信息存储<span class="arrow "></span></a>
							<ul class="sub-menu">
								<li class="nav-item">
									<a href="components_pickers.html" class="nav-link nav-toggle">
									本地数据库</a>
								</li>
								<li class="nav-item">
									<a href="components_dropdowns.html" class="nav-link nav-toggle">
									中心数据库</a>
								</li>
								<li class="nav-item">
									<a href="components_dropdowns.html" class="nav-link nav-toggle">
									缺陷图格式</a>
								</li>						
							</ul>
						</li>						
					</ul>
				</li>
				<!-- BEGIN ANGULARJS LINK -->
				<li class="tooltips nav-item" data-container="body" data-placement="right" data-html="true" data-original-title="点击查看各机检系统软件版本">
					<a href="angularjs/index.html" target="_blank" class="nav-link nav-toggle">
					<i class="icon-paper-plane"></i>
					<span class="title">
					软件版本管理 </span><span class="arrow "></span>
					</a>
					<ul class="sub-menu">
						<li class="nav-item">
							<a href="charts_flotcharts.html" class="nav-link nav-toggle">
							钞纸工序</a>
						</li>
						<li class="nav-item">
							<a href="charts_flotcharts.html" class="nav-link nav-toggle">
							成品工序</a>
						</li>
						<li class="nav-item">
							<a href="charts_amcharts.html" class="nav-link nav-toggle">
							胶凹工序</a>
						</li>
						<li class="nav-item">
							<a href="components_pickers.html" class="nav-link nav-toggle">
							印码工序<span class="arrow "></span></a>
							<ul class="sub-menu">								
								<li class="tooltips nav-item" data-container="body" data-placement="right" data-html="true" data-original-title="宏区编号、宏区参数、宏区范围">
									<a href="components_dropdowns.html" class="nav-link nav-toggle">
									DMJ12型</a>							
								</li>
								<li class="nav-item">
									<a href="components_dropdowns.html" class="nav-link nav-toggle">多功能</a>							
								</li>
								<li class="nav-item">
									<a href="components_dropdowns.html" class="nav-link nav-toggle">丝凸机</a>							
								</li>	
								<li class="nav-item">
									<a href="components_dropdowns.html" class="nav-link nav-toggle">双色机</a>							
								</li>		
							</ul>
						</li>
						<li class="nav-item">
							<a href="charts_amcharts.html" class="nav-link nav-toggle">
							检封工序</a>
						</li>					
					</ul>
				</li>
				<!-- END ANGULARJS LINK -->

				<li class="heading nav-link nav-toggle">
					<h3 class="uppercase" style="font-size:1.3em;">知识库</h3>
				</li>
				<li class="nav-item">
					<a href="javascript:;" class="nav-link nav-toggle">
					<i class="icon-settings"></i>
					<span class="title">机检故障处理</span>
					<span class="arrow "></span>
					</a>
					<ul class="sub-menu">
						<li class="nav-item">
							<a href="form_controls.html" class="nav-link nav-toggle">
							Form Controls</a>
						</li>
						<li class="nav-item">
							<a href="form_icheck.html" class="nav-link nav-toggle">
							iCheck Controls</a>
						</li>
						<li class="nav-item">
							<a href="form_layouts.html" class="nav-link nav-toggle">
							Form Layouts</a>
						</li>
						<li class="nav-item">
							<a href="form_editable.html" class="nav-link nav-toggle">
							<span class="badge badge-roundless badge-warning">new</span>Form X-editable</a>
						</li>
						<li class="nav-item">
							<a href="form_wizard.html" class="nav-link nav-toggle">
							Form Wizard</a>
						</li>
						<li class="nav-item">
							<a href="form_validation.html" class="nav-link nav-toggle">
							Form Validation</a>
						</li>
						<li class="nav-item">
							<a href="form_image_crop.html" class="nav-link nav-toggle">
							<span class="badge badge-roundless badge-danger">new</span>Image Cropping</a>
						</li>
						<li class="nav-item">
							<a href="form_fileupload.html" class="nav-link nav-toggle">
							Multiple File Upload</a>
						</li>
						<li class="nav-item">
							<a href="form_dropzone.html" class="nav-link nav-toggle">
							Dropzone File Upload</a>
						</li>
					</ul>
				</li>
				<li class="nav-item">
					<a href="javascript:;" class="nav-link nav-toggle">
					<i class="icon-briefcase"></i>
					<span class="title">钞纸工艺</span>
					<span class="arrow "></span>
					</a>
					<ul class="sub-menu">
						<li class="nav-item">
							<a href="table_basic.html" class="nav-link nav-toggle">
							Basic Datatables</a>
						</li>
						<li class="nav-item">
							<a href="table_responsive.html" class="nav-link nav-toggle">
							Responsive Datatables</a>
						</li>
						<li class="nav-item">
							<a href="table_managed.html" class="nav-link nav-toggle">
							Managed Datatables</a>
						</li>
						<li class="nav-item">
							<a href="table_editable.html" class="nav-link nav-toggle">
							Editable Datatables</a>
						</li>
						<li class="nav-item">
							<a href="table_advanced.html" class="nav-link nav-toggle">
							Advanced Datatables</a>
						</li>
						<li class="nav-item">
							<a href="table_ajax.html" class="nav-link nav-toggle">
							Ajax Datatables</a>
						</li>
					</ul>
				</li>
				<li class="nav-item">
					<a href="javascript:;" class="nav-link nav-toggle">
					<i class="icon-wallet"></i>
					<span class="title">印钞工艺</span>
					<span class="arrow "></span>
					</a>
					<ul class="sub-menu">
						<li class="nav-item">
							<a href="portlet_general.html" class="nav-link nav-toggle">
							General Portlets</a>
						</li>
						<li class="nav-item">
							<a href="portlet_general2.html" class="nav-link nav-toggle">
							<span class="badge badge-roundless badge-danger">new</span>New Portlets #1</a>
						</li>
						<li class="nav-item">
							<a href="portlet_general3.html" class="nav-link nav-toggle">
							<span class="badge badge-roundless badge-danger">new</span>New Portlets #2</a>
						</li>
						<li class="nav-item">
							<a href="portlet_ajax.html" class="nav-link nav-toggle">
							Ajax Portlets</a>
						</li>
						<li class="nav-item">
							<a href="portlet_draggable.html" class="nav-link nav-toggle">
							Draggable Portlets</a>
						</li>
					</ul>
				</li>
				<li class="nav-item">
					<a href="javascript:;" class="nav-link nav-toggle">
					<i class="icon-bar-chart"></i>
					<span class="title">版网工艺</span>
					<span class="arrow "></span>
					</a>
					<ul class="sub-menu">
						<li class="nav-item">
							<a href="charts_amcharts.html" class="nav-link nav-toggle">
							amChart</a>
						</li>
						<li class="nav-item">
							<a href="charts_flotcharts.html" class="nav-link nav-toggle">
							Flotchart</a>
						</li>
					</ul>
				</li>

				<li class="heading nav-link nav-toggle">
					<h3 class="uppercase" style="font-size:1.3em;">其它</h3>
				</li>
				<li class="nav-item">
					<a href="javascript:;" class="nav-link nav-toggle">
					<i class="icon-logout"></i>
					<span class="title">帮助说明</span>
					<span class="arrow "></span>
					</a>
					<ul class="sub-menu">
						<li class="nav-item">
							<a href="quick_sidebar_push_content.html" class="nav-link nav-toggle">
							Push Content</a>
						</li>
						<li class="nav-item">
							<a href="quick_sidebar_over_content.html" class="nav-link nav-toggle">
							Over Content</a>
						</li>
						<li class="nav-item">
							<a href="quick_sidebar_over_content_transparent.html" class="nav-link nav-toggle">
							Over Content &amp; Transparent</a>
						</li>
						<li class="nav-item">
							<a href="quick_sidebar_on_boxed_layout.html" class="nav-link nav-toggle">
							Boxed Layout</a>
						</li>
					</ul>
				</li>
				<li class="nav-item">
					<a href="javascript:;" class="nav-link nav-toggle">
					<i class="icon-envelope-open"></i>
					<span class="title">关于我们</span>
					<span class="arrow "></span>
					</a>
					<ul class="sub-menu">
						<li class="nav-item">
							<a href="email_newsletter.html" class="nav-link nav-toggle">
							Responsive Newsletter<br>
							Email Template</a>
						</li>
						<li class="nav-item">
							<a href="email_system.html" class="nav-link nav-toggle">
							Responsive System<br>
							Email Template</a>
						</li>
					</ul>
				</li>
			</ul>
			<!-- END SIDEBAR MENU -->
		</div>
	</div>
	<!-- END SIDEBAR -->
	<!-- BEGIN CONTENT -->
	<div class="page-content-wrapper">
		<div class="page-content font-yahei">