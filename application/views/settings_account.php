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
						<a href="#">帐户设置</a>
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
			帐户设置 <small id="today"></small>
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
                                    <li class="active">
                                        <a href="#">
                                            <i class="icon-settings"></i> 帐户设置 </a>
                                    </li>
                                    <li>
                                        <a href="<?php echo base_url()?>/select">
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
                                <div class="portlet light ">
                                    <div class="portlet-title tabbable-line">
                                        <div class="caption caption-md">
                                            <i class="icon-globe theme-font hide"></i>
                                            <span class="caption-subject font-blue-madison bold uppercase">个人帐户</span>
                                        </div>
                                        <ul class="nav nav-tabs">
                                            <li class="active">
                                                <a href="#tab_1_1" data-toggle="tab">帐户设置</a>
                                            </li>
                                            <li>
                                                <a href="#tab_1_2" data-toggle="tab">更改头像</a>
                                            </li>
                                            <li>
                                                <a href="#tab_1_3" data-toggle="tab">更改密码</a>
                                            </li>
                                            <li>
                                                <a href="#tab_1_4" data-toggle="tab">隐私设置</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="portlet-body">
                                        <div class="tab-content">
                                            <!-- PERSONAL INFO TAB -->
                                            <div class="tab-pane active" id="tab_1_1">
                                                <form role="form" action="#">
                                                    <div class="form-group">
                                                        <label class="control-label">姓</label>
                                                        <input type="text" placeholder="姓" class="form-control" /> </div>
                                                    <div class="form-group">
                                                        <label class="control-label">名</label>
                                                        <input type="text" placeholder="名" class="form-control" /> </div>
                                                    <div class="form-group">
                                                        <label class="control-label">电话</label>
                                                        <input type="text" placeholder="6129" class="form-control" /> </div>
                                                    <div class="form-group">
                                                        <label class="control-label">职务</label>
                                                        <input type="text" placeholder="机检建模岗" class="form-control" /> </div>
                                                    <div class="form-group">
                                                        <label class="control-label">简介</label>
                                                        <textarea class="form-control" rows="3" placeholder="这是开发者帐户，用于记录系统各项接口设置等信息. "></textarea>
                                                    </div>
                                                    <div class="form-group">
                                                        <label class="control-label">个人页面</label>
                                                        <input type="text" placeholder="http://10.8.2.133" class="form-control" /> </div>
                                                    <div class="margiv-top-10">
                                                        <a href="javascript:;" class="btn green"> 保存设置 </a>
                                                        <a href="javascript:;" class="btn default"> 退出 </a>
                                                    </div>
                                                </form>
                                            </div>
                                            <!-- END PERSONAL INFO TAB -->
                                            <!-- CHANGE AVATAR TAB -->
                                            <div class="tab-pane" id="tab_1_2">
                                                <p> Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum
                                                    eiusmod. </p>
                                                <form action="#" role="form">
                                                    <div class="form-group">
                                                        <div class="fileinput fileinput-new" data-provides="fileinput">
                                                            <div class="fileinput-new thumbnail" style="width: 200px; height: 150px;">
                                                                <img src="http://www.placehold.it/200x150/EFEFEF/AAAAAA&amp;text=no+image" alt="" /> </div>
                                                            <div class="fileinput-preview fileinput-exists thumbnail" style="max-width: 200px; max-height: 150px;"> </div>
                                                            <div>
                                                                <span class="btn default btn-file">
                                                                    <span class="fileinput-new"> Select image </span>
                                                                    <span class="fileinput-exists"> Change </span>
                                                                    <input type="file" name="..."> </span>
                                                                <a href="javascript:;" class="btn default fileinput-exists" data-dismiss="fileinput"> Remove </a>
                                                            </div>
                                                        </div>
                                                        <div class="clearfix margin-top-10">
                                                            <span class="label label-danger">NOTE! </span>
                                                            <span>Attached image thumbnail is supported in Latest Firefox, Chrome, Opera, Safari and Internet Explorer 10 only </span>
                                                        </div>
                                                    </div>
                                                    <div class="margin-top-10">
                                                        <a href="javascript:;" class="btn green"> Submit </a>
                                                        <a href="javascript:;" class="btn default"> Cancel </a>
                                                    </div>
                                                </form>
                                            </div>
                                            <!-- END CHANGE AVATAR TAB -->
                                            <!-- CHANGE PASSWORD TAB -->
                                            <div class="tab-pane" id="tab_1_3">
                                                <form action="#">
                                                    <div class="form-group">
                                                        <label class="control-label">Current Password</label>
                                                        <input type="password" class="form-control" /> </div>
                                                    <div class="form-group">
                                                        <label class="control-label">New Password</label>
                                                        <input type="password" class="form-control" /> </div>
                                                    <div class="form-group">
                                                        <label class="control-label">Re-type New Password</label>
                                                        <input type="password" class="form-control" /> </div>
                                                    <div class="margin-top-10">
                                                        <a href="javascript:;" class="btn green"> Change Password </a>
                                                        <a href="javascript:;" class="btn default"> Cancel </a>
                                                    </div>
                                                </form>
                                            </div>
                                            <!-- END CHANGE PASSWORD TAB -->
                                            <!-- PRIVACY SETTINGS TAB -->
                                            <div class="tab-pane" id="tab_1_4">
                                                <form action="#">
                                                    <table class="table table-light table-hover">
                                                        <tr>
                                                            <td> Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus.. </td>
                                                            <td>
                                                                <label class="uniform-inline">
                                                                    <input type="radio" name="optionsRadios1" value="option1" /> Yes </label>
                                                                <label class="uniform-inline">
                                                                    <input type="radio" name="optionsRadios1" value="option2" checked/> No </label>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td> Enim eiusmod high life accusamus terry richardson ad squid wolf moon </td>
                                                            <td>
                                                                <label class="uniform-inline">
                                                                    <input type="checkbox" value="" /> Yes </label>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td> Enim eiusmod high life accusamus terry richardson ad squid wolf moon </td>
                                                            <td>
                                                                <label class="uniform-inline">
                                                                    <input type="checkbox" value="" /> Yes </label>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td> Enim eiusmod high life accusamus terry richardson ad squid wolf moon </td>
                                                            <td>
                                                                <label class="uniform-inline">
                                                                    <input type="checkbox" value="" /> Yes </label>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <!--end profile-settings-->
                                                    <div class="margin-top-10">
                                                        <a href="javascript:;" class="btn red"> Save Changes </a>
                                                        <a href="javascript:;" class="btn default"> Cancel </a>
                                                    </div>
                                                </form>
                                            </div>
                                            <!-- END PRIVACY SETTINGS TAB -->
                                        </div>
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