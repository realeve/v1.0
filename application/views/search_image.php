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
    						<a href="#">实废图像</a>
    					</li>
    				</ul>
                    <div class="page-toolbar">
                        <div id="download" class="pull-right btn btn-fit-height btn-success">
                            下载图像包
                        </div>
                    </div>
    			</div>
    			<!-- <h3 class="page-title"> 实废图像查询
                  <small> 数据来源：码后核查、小张核查、号码三合一数据库
                </h3> -->
    			 <div class="portfolio-content portfolio-1">
                    <div class="clearfix">
                        <div id="js-filters-juicy-projects2" class="cbp-l-filters-alignCenter margin-bottom-5">
                            <div data-filter="*" class="cbp-filter-item-active cbp-filter-item"> 所有图像
                                <div class="cbp-filter-counter"></div>
                            </div> /
                            <div data-filter=".banknote" class="cbp-filter-item"> 票面
                                <div class="cbp-filter-counter"></div>
                            </div> /
                            <div data-filter=".screen" class="cbp-filter-item"> 丝印
                                <div class="cbp-filter-counter"></div>
                            </div> /
                            <div data-filter=".code" class="cbp-filter-item"> 号码
                                <div class="cbp-filter-counter"></div>
                            </div>
                            <div class="cbp-search cbp-l-filters-right margin-bottom-5">
                                <div class="input-icon right">
                                    <i class="icon-magnifier"></i>
                                    <input id="js-search-blog-posts" type="text" placeholder="开位/印码号筛选" data-search="*" class="form-control input-circle uppercase">
                                </div>
                                <div class="cbp-search-nothing">未找到 <i>{{query}}</i> 的结果</div>
                            </div>
                        </div>
                    </div>
                    <div id="js-grid-juicy-projects" class="cbp">
                    </div>
                </div>

            </div>
		</div>
	</div>
</div>
