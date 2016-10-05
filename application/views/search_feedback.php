    			<?php include("templates/themesetting.php");?>
    			<!-- BEGIN PAGE HEADER 面包屑-->
    			<div class="page-bar">
    				<ul class="page-breadcrumb">
    					<li>
    						<a href="<?php echo base_url()?>">首页</a>
    						<i class="fa fa-circle"></i>
    					</li>
    					<li>
    						<a href="<?php echo base_url()?>search">信息追溯</a>
    						<i class="fa fa-circle"></i>
    					</li>
    					<li>
    						<a href="#">质量信息反馈</a>
    					</li>
    				</ul>

    				<div class="page-toolbar">
    					<div id="dashboard-report-range" class="pull-right tooltips btn btn-fit-height dark" data-placement="top" data-original-title="点击修改查询时间">
    						<i class="icon-calendar"></i>&nbsp;
    						<span class="thin uppercase">&nbsp;</span>&nbsp;
    						<i class="fa fa-angle-down"></i>
    					</div>
    				</div>
    			</div>
    			<h3 class="page-title"> 质量信息反馈
                  <small> 数据来源：图像判废、机台作业、质量中心数据库 <span class="badge badge-danger"> 实废 </span> <span class="badge badge-info"> 误废 </span> <span class="badge"> 未判废 </span></small>
              </h3>
    			 <div class="portfolio-content portfolio-1">
                    <div class="clearfix">
                        <div id="js-filters-juicy-projects2" class="cbp-l-filters-alignCenter">
                            <div data-filter="*" class="cbp-filter-item-active cbp-filter-item"> 所有品种
                                <div class="cbp-filter-counter"></div>
                            </div> /
                            <div data-filter=".9602A" class="cbp-filter-item"> 9602A
                                <div class="cbp-filter-counter"></div>
                            </div> /
                            <div data-filter=".9603A" class="cbp-filter-item"> 9603A
                                <div class="cbp-filter-counter"></div>
                            </div> /
                            <div data-filter=".9604A" class="cbp-filter-item"> 9604A
                                <div class="cbp-filter-counter"></div>
                            </div> /
                            <div data-filter=".9606A" class="cbp-filter-item"> 9606A
                                <div class="cbp-filter-counter"></div>
                            </div> /
                            <div data-filter=".9607T" class="cbp-filter-item"> 9607T
                                <div class="cbp-filter-counter"></div>
                            </div> /
                        </div>
                        <div id="js-filters-juicy-projects" class="cbp-l-filters-alignLeft cbp-l-filters-left">
                            <div data-filter="*" class="cbp-filter-item-active cbp-filter-item uppercase"> 所有图像
                                (<div class="cbp-filter-counter"></div>)
                            </div>
                            <div data-filter=".notfake" class="cbp-filter-item uppercase"> 误废
                               (<div class="cbp-filter-counter"></div>)
                            </div>
                            <div data-filter=".fake" class="cbp-filter-item uppercase"> 实废
                               (<div class="cbp-filter-counter"></div>)
                            </div>
                            <div data-filter=".none" class="cbp-filter-item uppercase"> 未判废
                              (<div class="cbp-filter-counter"></div>)
                            </div>
                        </div>
                        <div class="cbp-search cbp-l-filters-right">
                            <input id="js-search-blog-posts" type="text" placeholder="输入以过滤" data-search="*" class="cbp-search-input">
                            <div class="cbp-search-icon"></div>
                            <div class="cbp-search-nothing">未找到 <i>{{query}}</i> 的结果</div>
                        </div>
                    </div>
                    <!--div id="js-filters-juicy-projects" class="cbp-l-filters-work">
                        <div data-filter="*" class="cbp-filter-item-active cbp-filter-item"> 所有图像
                            <div class="cbp-filter-counter"></div>
                        </div>
                        <div data-filter=".notfake" class="cbp-filter-item"> 误废
                            <div class="cbp-filter-counter"></div>
                        </div>
                        <div data-filter=".fake" class="cbp-filter-item"> 实废
                            <div class="cbp-filter-counter"></div>
                        </div>
                        <div data-filter=".none" class="cbp-filter-item"> 未判废
                            <div class="cbp-filter-counter"></div>
                        </div>
                    </div-->
                    <!-- cbp-l-grid-work-->
                    <div id="js-grid-juicy-projects" class="cbp">
                    </div>
                    <!--div id="js-loadMore-juicy-projects" class="cbp-l-loadMore-button">
                        <a href="http://scriptpie.com/cubeportfolio/live-preview/templates/agency-work/ajax-agency/loadMore.html?block=2" class="cbp-l-loadMore-link" rel="nofollow">
                            <span class="cbp-l-loadMore-defaultText">LOAD MORE</span>
                            <span class="cbp-l-loadMore-loadingText">LOADING...</span>
                            <span class="cbp-l-loadMore-noMoreLoading">NO MORE WORKS</span>
                        </a>
                    </div-->
                </div>
            </div>
		</div>
	</div>
	<?php include("templates/quicksidebar/quicksidebar_search_feedback.php");?>
</div>
