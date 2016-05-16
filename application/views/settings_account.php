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
						<a href="<?php echo base_url()?>settings">系统管理</a>
						<i class="fa fa-circle"></i>
					</li>
					<li>
						<a href="#">帐户设置</a>
					</li>
				</ul>
			</div>
			<h3 class="page-title">
			<span class="caption-subject bold uppercase" name="TableTitle"></span>  <small id="today"></small>
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
                                <img class="img-responsive" alt=""> </div>
                            <!-- END SIDEBAR USERPIC src="../assets/pages/media/profile/profile_user.jpg"  -->
                            <!-- SIDEBAR USER TITLE -->
                            <div class="profile-usertitle">
                                <div class="profile-usertitle-name"></div>
                                <div class="profile-usertitle-job"></div>
                            </div>
                            <!-- END SIDEBAR USER TITLE -->
                            <!-- SIDEBAR MENU -->
                            <div class="profile-usermenu">
                                <ul class="nav">
                                    <li>
                                        <a href="javascript:;">
                                            <i class="icon-home"></i> 概览 </a>
                                    </li>
                                    <li class="active">
                                        <a href="#">
                                            <i class="icon-settings"></i> 帐户设置 </a>
                                    </li>
                                    <li>
                                        <a href="<?php echo base_url()?>Settings/select">
                                            <i class="icon-info"></i> 下拉菜单管理 </a>
                                    </li>
                                    <li>
                                        <a href="<?php echo base_url()?>Settings/accountActive">
                                            <i class="icon-user"></i> 帐户激活 </a>
                                    </li>
                                </ul>
                            </div>
                            <!-- END MENU -->
                        </div>
                        <!-- END PORTLET MAIN -->
                        <!-- PORTLET MAIN -->
                        <!--div class="portlet light ">
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
                            <div>
                                <h4 class="profile-desc-title">关于 <?php echo $username?></h4>
                                <span class="profile-desc-text"> 这是开发者帐户，用于记录系统各项接口设置等信息. </span>
                                <div class="margin-top-20 profile-desc-link">
                                    <i class="fa fa-weixin"></i>
                                    <a href="#">@</a>
                                </div>
                                <div class="margin-top-20 profile-desc-link">
                                    <i class="fa fa-weibo"></i>
                                    <a href="#">@</a>
                                </div>
                            </div>
                        </div-->
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
                                                <a href="#tab_1_1" data-toggle="tab">个人信息</a>
                                            </li>
                                            <li>
                                                <a href="#tab_1_2" data-toggle="tab">上传头像文件</a>
                                            </li>
                                            <li>
                                                <a href="#tab_1_3" data-toggle="tab">编辑头像</a>
                                            </li>
                                            <li>
                                                <a href="#tab_1_4" data-toggle="tab">更改密码</a>
                                            </li>
                                            <li>
                                                <a href="#tab_1_5" data-toggle="tab">其它设置</a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="portlet-body">
                                        <div class="tab-content">
                                            <!-- PERSONAL INFO TAB -->
                                            <div class="tab-pane active" id="tab_1_1">
                                                <form role="form" action="#" name="userInfo">
                                                    <div class="form-group">
                                                        <label class="control-label"> <i class="fa fa-user"></i> 姓名</label>
                                                        <input type="text" placeholder="请填写真实姓名" class="form-control" name="FullName"/> </div>
                                                    <div class="form-group">
                                                        <label class="control-label"> <i class="fa fa-phone"></i> 电话</label>
                                                        <input type="text" placeholder="填写个人办公电话" class="form-control" name="Phone"/> </div>
                                                    <div class="form-group">
                                                        <label class="control-label"> <i class="fa fa-users"></i> 部门</label>
                                                        <label class="control-label visible-ie8 visible-ie9">所在部门</label>
                                                        <select name="department" class="form-control">
                                                        </select>
                                                    </div>
                                                    <div class="form-group">
                                                        <label class="control-label"> <i class="icon-envelope"></i> Email</label>
                                                        <input type="text" placeholder="该信息是找回密码唯一凭据" class="form-control" name="Email"/> </div>
                                                    <div class="margiv-top-10">
                                                        <a href="javascript:;" class="btn green" name="saveUserInfo"> <i class="fa fa-save"></i> 保存设置 </a>
                                                        <a href="javascript:;" class="btn default" name="restore"> <i class="fa fa-rotate-left"></i> 还原 </a>
                                                    </div>
                                                </form>
                                            </div>
                                            <!-- END PERSONAL INFO TAB -->
                                            <!-- CHANGE AVATAR TAB -->
                                            <div class="tab-pane" id="tab_1_2">
                                                <p> 点击选择个人头像. </p>												
												<form id="avatarForm">  
													<div class="form-group">
														<div class="fileinput fileinput-new" data-provides="fileinput">
															<div class="fileinput-new thumbnail">
																<img name="hisAvatar" src="../../assets/pages/media/profile/Avatar_none.jpg" alt="" /> </div>
															<div class="fileinput-preview fileinput-exists thumbnail"> </div>
															<div>
																<span class="btn default btn-file">
																	<span class="fileinput-new"> 选择图像 </span>
																	<span class="fileinput-exists"> 重新选择 </span>
																	<input id="file-input" type="file" name="file" id="avatarFile" multiple class="file-loading" accept="image/*" name="avatarFile"/></span>
																<a href="javascript:;" class="btn default fileinput-exists" data-dismiss="fileinput"> 移除 </a>
															</div>
															<div class="clearfix margin-top-10">
																<span class="label label-danger">注意! </span>
																<span>&nbsp;图像文件请不要超过1M！ </span>
															</div>
														</div>
													</div>
													<div class="margin-top-10">
														<a value="上传" class="btn green" id="submitAvatar"> 提交 </a>
														<a href="javascript:;" class="btn default"> 取消 </a>
													</div>	
												</form> 												
                                            </div>
                                            <!-- END CHANGE AVATAR TAB -->
											
                                            <!-- CHANGE AVATAR TAB -->
                                            <div class="tab-pane" id="tab_1_3">
												<div class="row">
                                                    <div class="col-md-9 responsive-1024">
                                                        <!-- This is the image we're attaching Jcrop to -->
                                                        <img name="hisAvatar" src="../../assets/pages/media/profile/Avatar_none.jpg" id="demo8" alt="Jcrop Example"> </div>
														
                                                    <div class="col-md-12 responsive-1024 margin-top-20">
														<!--div id="preview-pane">
                                                            <div class="preview-container">
                                                                <img name="hisAvatar" src="../../assets/pages/media/profile/Avatar_none.jpg" class="jcrop-preview" alt="Preview" />																
																</div>
                                                        </div-->
                                                        <form id="demo8_form">
                                                            <input type="hidden" id="crop_x" name="x" />
                                                            <input type="hidden" id="crop_y" name="y" />
                                                            <input type="hidden" id="crop_w" name="w" />
                                                            <input type="hidden" id="crop_h" name="h" />
														</form>
                                                        <a id="saveAvatar" href="javascript:;" class="btn btn-large green"> 裁剪为头像 </a>
                                                    </div>
                                                </div>										
                                            </div>
                                            <!-- END CHANGE AVATAR TAB -->
                                            <!-- CHANGE PASSWORD TAB -->
                                            <div class="tab-pane" id="tab_1_4">
                                                <form action="#" name="userPsw">
                                                    <div class="form-group">
                                                        <label class="control-label">旧密码</label>
                                                        <input type="password" class="form-control" name="oldPsw"/> </div>
                                                    <div class="form-group">
                                                        <label class="control-label">新密码</label>
                                                        <input type="password" class="form-control" name="newPsw"/> </div>
                                                    <div class="form-group">
                                                        <label class="control-label">请重新输入密码</label>
                                                        <input type="password" class="form-control" name="rptPsw"/> </div>
                                                    <div class="margin-top-10">
                                                        <a href="javascript:;" class="btn green" name="changePsw"> 更新密码 </a>
                                                        <a href="javascript:;" class="btn default" name="clearPsw"> 取消 </a>
                                                    </div>
                                                </form>
                                            </div>
                                            <!-- END CHANGE PASSWORD TAB -->
                                            <!-- PRIVACY SETTINGS TAB -->
                                            <div class="tab-pane" id="tab_1_5">
                                                <form action="#">
                                                    <table class="table table-light table-hover">
                                                        <tr>
                                                            <td> 设置1.. </td>
                                                            <td>
                                                                <label class="uniform-inline">
                                                                    <input type="radio" name="optionsRadios1" value="option1" /> Yes </label>
                                                                <label class="uniform-inline">
                                                                    <input type="radio" name="optionsRadios1" value="option2" checked/> No </label>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td> 设置2 </td>
                                                            <td>
                                                                <label class="uniform-inline">
                                                                    <input type="checkbox" value="" /> Yes </label>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td> 设置3 </td>
                                                            <td>
                                                                <label class="uniform-inline">
                                                                    <input type="checkbox" value="" /> Yes </label>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td> 设置4 </td>
                                                            <td>
                                                                <label class="uniform-inline">
                                                                    <input type="checkbox" value="" /> Yes </label>
                                                            </td>
                                                        </tr>
                                                    </table>
                                                    <!--end profile-settings-->
                                                    <div class="margin-top-10">
                                                        <a href="javascript:;" class="btn red"> 保存设置 </a>
                                                        <a href="javascript:;" class="btn default"> 取消 </a>
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
	<?php include("templates/quicksidebar/quicksidebar_welcome.php");?>
</div>
<!-- END CONTAINER -->