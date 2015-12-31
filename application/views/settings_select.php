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
						<a href="<?php echo base_url()?>/settings">系统管理</a>
						<i class="fa fa-circle"></i>
					</li>
					<li>
						<a href="#">下拉菜单设置</a>
					</li>
				</ul>
				 <div class="page-toolbar">
                    <div class="btn-group pull-right">
                        <button type="button" class="btn green btn-sm btn-outline dropdown-toggle" data-toggle="dropdown"> Actions
                            <i class="fa fa-angle-down"></i>
                        </button>
                        <ul class="dropdown-menu pull-right" role="menu">
                            <li>
                                <a href="#">
                                    <i class="icon-bell"></i> Action</a>
                            </li>
                            <li>
                                <a href="#">
                                    <i class="icon-shield"></i> Another action</a>
                            </li>
                            <li>
                                <a href="#">
                                    <i class="icon-user"></i> Something else here</a>
                            </li>
                            <li class="divider"> </li>
                            <li>
                                <a href="#">
                                    <i class="icon-bag"></i> Separated link</a>
                            </li>
                        </ul>
                    </div>
                </div>
			</div>
			<h3 class="page-title">
			下拉菜单设置 <small id="today"></small>
			</h3>
	        <!-- END PAGE HEADER-->
	        <div class="row">
                <div class="col-md-12">
                    <!-- BEGIN PROFILE SIDEBAR -->
                    <div class="profile-sidebar">
                        <!-- PORTLET MAIN -->
                        <div class="portlet light profile-sidebar-portlet ">
                            <!-- SIDEBAR USERPIC -->
                            <div class="profile-userpic">
                                <img src="../assets/pages/media/profile/profile_user.jpg" class="img-responsive" alt=""> </div>
                            <!-- END SIDEBAR USERPIC -->
                            <!-- SIDEBAR USER TITLE -->
                            <div class="profile-usertitle">
                                <div class="profile-usertitle-name"> <?php echo $username?> </div>
                                <div class="profile-usertitle-job"> <?php echo $FullName?> </div>
                            </div>
                            <!-- END SIDEBAR USER TITLE -->
                            <!-- SIDEBAR MENU -->
                            <div class="profile-usermenu">
                                <ul class="nav">
                                    <li>
                                        <a href="<?php echo base_url()?>/settings">
                                            <i class="icon-home"></i> 概览 </a>
                                    </li>
                                    <li>
                                        <a href="<?php echo base_url()?>/account">
                                            <i class="icon-settings"></i> 帐户设置 </a>
                                    </li>
                                    <li class="active">
                                        <a href="#">
                                            <i class="icon-info"></i> 下拉菜单管理 </a>
                                    </li>
                                </ul>
                            </div>
                            <!-- END MENU -->
                        </div>
                        <!-- END PORTLET MAIN -->
                        <!-- PORTLET MAIN -->
                        <div class="portlet light ">
                            <!-- STAT -->
                            <div class="row list-separated profile-stat">
                                <div class="col-md-4 col-sm-4 col-xs-6">
                                    <div class="uppercase profile-stat-title"> 37 </div>
                                    <div class="uppercase profile-stat-text"> 数据接口 </div>
                                </div>
                                <div class="col-md-4 col-sm-4 col-xs-6">
                                    <div class="uppercase profile-stat-title"> 51 </div>
                                    <div class="uppercase profile-stat-text"> 表单 </div>
                                </div>
                                <div class="col-md-4 col-sm-4 col-xs-6">
                                    <div class="uppercase profile-stat-title"> 61 </div>
                                    <div class="uppercase profile-stat-text"> 机检日志 </div>
                                </div>
                            </div>
                            <!-- END STAT -->
                            <div>
                                <h4 class="profile-desc-title">关于 <?php echo $username?></h4>
                                <span class="profile-desc-text"> 这是开发者帐户，用于记录系统各项接口设置等信息. </span>
                                <div class="margin-top-20 profile-desc-link">
                                    <i class="fa fa-weixin"></i>
                                    <a href="#">@宾不厌诈</a>
                                </div>
                                <div class="margin-top-20 profile-desc-link">
                                    <i class="fa fa-weibo"></i>
                                    <a href="#">@realeve</a>
                                </div>
                            </div>
                        </div>
                        <!-- END PORTLET MAIN -->
                    </div>
                    <!-- END BEGIN PROFILE SIDEBAR -->
                    <!-- BEGIN PROFILE CONTENT -->
                    <div class="profile-content">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="portlet light bordered" id="form_wizard_1">
                                    <div class="portlet-title">
                                        <div class="caption">
                                            <i class=" icon-layers font-red"></i>
                                            <span class="caption-subject font-red bold uppercase"> 下拉菜单管理 -
                                                <span class="step-title">第1步，共3步</span>
                                            </span>
                                        </div>
                                        <div class="actions">
                                            <a class="btn btn-circle btn-icon-only btn-default" href="javascript:;">
                                                <i class="icon-cloud-upload"></i>
                                            </a>
                                            <a class="btn btn-circle btn-icon-only btn-default" href="javascript:;">
                                                <i class="icon-wrench"></i>
                                            </a>
                                            <a class="btn btn-circle btn-icon-only btn-default" href="javascript:;">
                                                <i class="icon-trash"></i>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="portlet-body form">
                                        <form class="form-horizontal" action="#" id="submit_form" method="POST" novalidate="novalidate">
                                            <div class="form-wizard">
                                                <div class="form-body">
                                                    <ul class="nav nav-pills nav-justified steps hide">
                                                        <li>
                                                            <a href="#tab1" data-toggle="tab" class="step" aria-expanded="false">
                                                            </a>
                                                        </li>
                                                        <li class="">
                                                            <a href="#tab2" data-toggle="tab" class="step active" aria-expanded="false">
                                                              </a>
                                                        </li>
                                                        <li class="">
                                                            <a href="#tab3" data-toggle="tab" class="step" aria-expanded="false">
                                                                <span class="number"> 3 </span>
                                                                <span class="desc">
                                                                    <i class="fa fa-check"></i> 预览及提交 </span>
                                                            </a>
                                                        </li>
                                                    </ul>

                                                    <div class="mt-element-step">
                                                        <div class="row step-default">
                                                            <div class="col-md-4 bg-grey mt-step-col active">
                                                                <div class="mt-step-number bg-white font-grey">1</div>
                                                                <div class="mt-step-title uppercase font-grey-cascade">选择待调整下拉框</div>
                                                                <div class="mt-step-content font-grey-cascade">请不要调整您个人业务范围之外的下拉框</div>
                                                            </div>
                                                            <div class="col-md-4 bg-grey mt-step-col">
                                                                <div class="mt-step-number bg-white font-grey">2</div>
                                                                <div class="mt-step-title uppercase font-grey-cascade">调整选项卡内容</div>
                                                                <div class="mt-step-content font-grey-cascade">此处仅允许增加条目或删除已确认的无效项</div>
                                                            </div>
                                                            <div class="col-md-4 bg-grey mt-step-col ">
                                                                <div class="mt-step-number bg-white font-grey">3</div>
                                                                <div class="mt-step-title uppercase font-grey-cascade">预览及提交</div>
                                                                <div class="mt-step-content font-grey-cascade">Preview</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div id="bar" class="progress progress-striped margin-top-10" role="progressbar">
                                                        <div class="progress-bar progress-bar-info" style="width: 33%;"> </div>
                                                    </div>
                                                    <div class="tab-content">
                                                        <div class="tab-pane" id="tab1">
                                                            <h3 class="block">选择需要调整的下拉框</h3>
                                                            <div class="form-group">
                                                                <label class="col-md-3 control-label" for="select_cat">下拉框类型</label>
                                                                <div class="col-md-4">
                                                                    <select name="select_cat" class="form-control select2">                                                                    
                                                                    </select>
                                                                    <div class="form-control-focus"> </div>
                                                                    <span class="help-block">所需调整的下拉框所属类型...</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="tab-pane" id="tab2">
                                                            <h3 class="block"><span name="selectName" class="bold font-green"></span> 下拉框列表项调整</h3>                                                            
                                                            <div class="form-group">
                                                                <label class="col-md-3 control-label" for="select_name">当前列表项</label>
                                                                <div class="col-md-4">
                                                                    <select name="select_name" class="form-control select2">                                                                      
                                                                    </select>
                                                                    <div class="form-control-focus"> </div>
                                                                    <span class="help-block">所需调整的下拉框...</span>
                                                                </div>
                                                                <a href="javascript:;" class="btn btn-circle btn-icon-only green">
                                                                    <i class="fa fa-plus"></i>
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <div class="tab-pane" id="tab3">
                                                            <h3 class="block">您本次修改的内容如下</h3>
                                                            <h4 class="form-section">概述</h4>
                                                            <div class="form-group">
                                                                <label class="control-label col-md-3">下拉选择框名称:</label>
                                                                <div class="col-md-4">
                                                                    <p class="form-control-static" data-display="select_cat"></p>
                                                                </div>
                                                            </div>
                                                            <div class="form-group">
                                                                <label class="control-label col-md-3">列表框预览</label>
                                                                <div class="col-md-4">
                                                                    <select name="preview" class="form-control select2">                                                                      
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <h4 class="form-section">添加项</h4>
                                                            <div class="form-group">
                                                                <label class="control-label col-md-3 blue bold">序号</label>
                                                                <div class="col-md-2">
                                                                    <p class="form-control-static blue bold">值</p>
                                                                </div>
                                                                <div class="col-md-3">
                                                                    <p class="form-control-static blue bold">列表项</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-actions">
                                                    <div class="row">
                                                        <div class="col-md-offset-3 col-md-9">
                                                            <a href="javascript:;" class="btn default button-previous" style="display: inline-block;">
                                                                <i class="fa fa-angle-left"></i> 返回 </a>
                                                            <a href="javascript:;" class="btn btn-outline green button-next" style="display: inline-block;"> 继续
                                                                <i class="fa fa-angle-right"></i>
                                                            </a>
                                                            <a href="javascript:;" class="btn green button-submit" style="display: none;"> 提交
                                                                <i class="fa fa-check"></i>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- END PROFILE CONTENT -->
                </div>
            </div>
        </div>
        <!-- END CONTENT BODY -->
    </div>
    <!-- END CONTENT -->        
	<?php include("templates/quicksidebar/quicksidebar_QualityChart.php");?>
</div>
<!-- END CONTAINER -->