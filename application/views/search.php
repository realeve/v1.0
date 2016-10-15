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
            <a href="#">印钞车号查询</a>
        </li>
    </ul>
    <div class="page-toolbar">
        <!-- BEGIN THEME PANEL -->
        <!-- 以下DIV加入  .open则默认打开 -->
        <div class="btn-group btn-theme-panel">
            <div class="pull-right btn btn-fit-height blue dropdown-toggle" name="querySetting" data-toggle="dropdown" aria-expanded="true">
                <i class="icon-settings"></i> 查询条件
            </div>
            <div class="dropdown-menu theme-panel pull-right dropdown-custom margin-top-15 hold-on-click">
                <div class="row">
                    <div class="col-md-4 col-sm-4 col-xs-12" style="padding:20px 30px;">
                        <h3>品种</h3>
                        <ul class="theme-colors">
                            <li class="theme-color">
                                <span class="theme-color-view" style="background:#7ECF51"></span>
                                <span class="theme-color-name">9602A</span>
                            </li>
                            <li class="theme-color theme-color-light">
                                <span class="theme-color-view" style="background:rgb(189,66,175)"></span>
                                <span class="theme-color-name">9603A</span>
                            </li>
                            <li class="theme-color">
                                <span class="theme-color-view" style="background:#61A5E8"></span>
                                <span class="theme-color-name">9604A</span>
                            </li>
                            <li class="theme-color">
                                <span class="theme-color-view" style="background:#3D7F18"></span>
                                <span class="theme-color-name">9606A</span>
                            </li>
                            <li class="theme-color">
                                <span class="theme-color-view" style="background:rgb(255,127,104)"></span>
                                <span class="theme-color-name">9607T</span>
                            </li>
                        </ul>
                    </div>
                    <div class="col-md-8 col-sm-8 col-xs-12 seperator" style="padding:20px 30px;">
                        <h3>查询设置</h3>
                        <ul class="theme-settings">
                            <li>
                                <div class="row">
                                    <div class="col-md-4">车号/冠字</div>
                                    <div class="col-md-8 inputs">
                                        <div class="portlet-input input-inline">
                                            <div class="input-icon right">
                                                <i class="icon-magnifier"></i>
                                                <input type="text" class="form-control input-circle uppercase" autocomplete="off" placeholder="车号/冠字" name="cart"> </div>
                                            <span class="help-block"> 按冠字号查询时需选择左侧品种信息. </span>
                                        </div>
                                    </div>
                                    <hr>
                                </div>
                            </li>
                            <!-- <li>
                                <div class="row">
                                    <div class="col-md-4">印码号</div>
                                    <div class="col-md-8 inputs">
                                        <div class="portlet-input input-inline">
                                            <div class="input-icon right">
                                                <i class="icon-refresh"></i>
                                                <input type="text" class="form-control input-circle" placeholder="印码号" autocomplete="off" name="codeNo"> </div>
                                            <span class="help-block"> 印码号查询大张号，输入后4位 </span>
                                        </div>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="row">
                                    <div class="col-md-4">大张号</div>
                                    <div class="col-md-8 inputs">
                                        <div class="portlet-input input-inline">
                                            <div class="input-icon right">
                                                <i class="icon-cloud-download"></i>
                                                <input type="text" class="form-control input-circle" placeholder="大张号" autocomplete="off" name="paperNo"> </div>
                                            <span class="help-block"> 大张号查询印码号，输入后4位 </span>
                                        </div>
                                    </div>
                                </div>
                            </li> -->
                            <li>
                                <div class="row">
                                    <div class="col-md-6 col-md-offset-3">
                                        <a id="query" href="javascript:;" class="btn btn-circle btn-block red btn-outline"> <i class="icon-magnifier"></i> 查询 </a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <!-- END THEME PANEL -->
    </div>
</div>

<div class="row margin-top-20 margin-bottom-20">
    <div class="col-lg-12">
        <div class="mt-element-list bg-white">
            <div class="mt-list-head list-simple ext-1 font-white bg-blue-chambray">
                <div class="list-head-title-container">
                    <div class="list-date"><small name="cartName"></small></div>
                    <h3 class="list-title">印钞生产/ 质量信息追溯</h3>
                </div>
            </div>
            <div class="mt-list-container list-simple ext-1 group">


                <a class="list-toggle-container" data-toggle="collapse" href="#productInfo" aria-expanded="false">
                    <div class="list-toggle bg-blue-dark bg-font-blue-dark uppercase"> 生产信息
                        <span class="badge badge-default pull-right bg-white font-blue-dark" name="prodNum">0</span>
                    </div>
                </a>
                <div class="panel-collapse collapse in" id="productInfo">
                    <div class="cbp-popup-container bg-white" style="padding:0 20px 30px 20px;">
                        <div class="portfolio-content">
                            <div class="cbp-l-project-container">
                                <!-- 机台作业信息 -->
                                <div name="prodInfo">
                                </div>

                                <div class="cbp-l-project-details">

                                    <!-- 车号概述面板 -->
                                    <div name="cartInfo">
                                    </div>

                                    <!-- 核查产品显示质量曲线 -->
                                    <div name="qualityLine">
                                        <div class="cbp-l-project-details-title margin-top-40">
                                            <span>当天好品率曲线</span>
                                        </div>
                                        <div class="cbp-l-project-details-list" id="chart" style="min-height: 250px;"></div>
                                    </div>

                                    <!-- 车号列表 -->
                                    <div class="margin-top-40" name="hisCartList">
                                    </div>

                                    <!-- 库管信息 -->
                                    <div class="margin-top-40" name="storageInfo">
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>



                <a class="list-toggle-container" data-toggle="collapse" href="#offlineInfo" aria-expanded="false">
                    <div class="list-toggle done uppercase"> 胶凹离线检测
                        <span class="badge badge-default pull-right bg-white font-green">2</span>
                    </div>
                </a>
                <div class="panel-collapse collapse in" id="offlineInfo">
                    <!-- BEGIN Portlet PORTLET-->
                    <div class="portlet light">
                        <div class="portlet-title">
                            <div class="tabbable-line">
                                <ul class="nav nav-tabs">
                                    <li>
                                        <a href="#offset" data-toggle="tab" aria-expanded="false"> 胶印离线 </a>
                                    </li>
                                    <li class="active">
                                        <a href="#intaglio" data-toggle="tab" aria-expanded="true"> 凹印离线 </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="portlet-body">
                            <div class="tab-content">
                                <div class="tab-pane" id="offset">

                                </div>
                                <div class="tab-pane active" id="intaglio">

                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- END Portlet PORTLET-->
                </div>

                <a class="list-toggle-container" data-toggle="collapse" href="#codeInfo" aria-expanded="false">
                    <div class="list-toggle uppercase"> 印码工序
                        <span class="badge badge-default pull-right bg-white font-dark">3</span>
                    </div>
                </a>
                <div class="panel-collapse collapse in" id="codeInfo">
                    <!-- BEGIN Portlet PORTLET-->
                    <div class="portlet light">
                        <div class="portlet-title">
                            <div class="tabbable-line">
                                <ul class="nav nav-tabs">
                                    <li class="hidden">
                                        <a href="#portlet_tab1" data-toggle="tab" aria-expanded="false"> 丝印 </a>
                                    </li>
                                    <li class="active">
                                        <a href="#portlet_tab2" data-toggle="tab" aria-expanded="false"> 号码 </a>
                                    </li>
                                    <li>
                                        <a href="#portlet_tab3" data-toggle="tab" aria-expanded="true"> 码后核查 </a>
                                    </li>
                                    <li>
                                        <a href="#portlet_tab4" data-toggle="tab" aria-expanded="false"> 图像判废 </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="portlet-body">
                            <div class="tab-content">
                                <div class="tab-pane hidden" id="portlet_tab1" style="min-height: 300px;">
                                    <div class="row">
                                        <div class="col-md-4" name="screenInfo">
                                            <h4> 该万产品未搜索到相关信息 </h4>
                                        </div>
                                        <div class="col-md-8" name="siyinImg">
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane active" id="portlet_tab2" style="min-height: 300px;">
                                    <div class="row">
                                        <div class="col-md-6" id="codeFakeType" style="min-height:300px;">
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane" id="portlet_tab3" style="min-height: 300px;">
                                    <div class="row">
                                        <div class="col-md-12" name="mahouInfo">
                                            <h4>该万产品未搜索到相关信息 </h4>
                                        </div>
                                        <div class="col-md-6 margin-top-20" name="mahouImg">
                                        </div>
                                        <div class="col-md-6 margin-top-20" id="mahouChart" style="min-height: 250px;">
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane" id="portlet_tab4" style="min-height: 300px;">
                                    <div name="imgVerifyInfo">
                                        <h4>该万产品未搜索到相关信息 </h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <a class="list-toggle-container" data-toggle="collapse" href="#package" aria-expanded="false">
                    <div class="list-toggle bg-purple-studio bg-font-purple-studio uppercase"> 检封工序
                        <span class="badge badge-default pull-right bg-white font-purple-studio">2</span>
                    </div>
                </a>
                <div class="panel-collapse collapse in" id="package">
                    <!-- BEGIN Portlet PORTLET-->
                    <div class="portlet light">
                        <div class="portlet-title">
                            <div class="tabbable-line">
                                <ul class="nav nav-tabs">
                                    <li class="active">
                                        <a href="#ocr" data-toggle="tab" aria-expanded="false"> OCR </a>
                                    </li>
                                    <li>
                                        <a href="#ananysis" data-toggle="tab" aria-expanded="true"> 印钞特抽 </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="portlet-body">
                            <div class="tab-content">
                                <div class="tab-pane active" id="ocr">

                                </div>
                                <div class="tab-pane" id="ananysis">
                                    <div class="row">
                                        <div class="col-md-6" id="ananysis1"></div>
                                        <div class="col-md-6" id="ananysis2"></div>
                                        <div class="col-md-6" id="ananysis3"></div>
                                        <div class="col-md-6" id="ananysis4"></div>
                                        <div class="col-md-6" id="ananysis5"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- END Portlet PORTLET-->
                </div>

            </div>
        </div>
    </div>
</div>

</div>
</div>