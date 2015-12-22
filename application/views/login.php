<!DOCTYPE html>
<!--[if IE 8]> <html lang="zh" class="ie8 no-js"> <![endif]-->
<!--[if IE 9]> <html lang="zh" class="ie9 no-js"> <![endif]-->
<!--[if !IE]><!-->
<html lang="zh">
<!--<![endif]-->
<!-- BEGIN HEAD -->
<!-- Added by HTTrack --><meta http-equiv="content-type" content="text/html;charset=UTF-8" /><!-- /Added by HTTrack -->
<head>
<meta charset="utf-8"/>
<title>质量控制中心 | 登录 - 系统登录</title>
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<meta http-equiv="Content-type" content="text/html; charset=utf-8">
<meta content="" name="description"/>
<meta content="" name="author"/>
<!-- BEGIN GLOBAL MANDATORY STYLES -->
<link href="<?php echo base_url()?>assets/global/plugins/font-awesome/css/font-awesome.min.css" rel="stylesheet" type="text/css"/>
<link href="<?php echo base_url()?>assets/global/plugins/simple-line-icons/simple-line-icons.min.css" rel="stylesheet" type="text/css"/>
<link href="<?php echo base_url()?>assets/global/plugins/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css"/>
<link href="<?php echo base_url()?>assets/global/plugins/uniform/css/uniform.default.css" rel="stylesheet" type="text/css"/>
<!-- END GLOBAL MANDATORY STYLES -->
<!-- BEGIN PAGE LEVEL STYLES -->
<link href="<?php echo base_url()?>assets/pages/css/login.css" rel="stylesheet" type="text/css"/>
<!-- END PAGE LEVEL SCRIPTS -->
<!-- BEGIN THEME STYLES -->
<link href="<?php echo base_url()?>assets/global/css/components.css" id="style_components" rel="stylesheet" type="text/css"/>
<link href="<?php echo base_url()?>assets/global/css/plugins.css" rel="stylesheet" type="text/css"/>
<link href="<?php echo base_url()?>assets/layouts/layout/css/layout.css" rel="stylesheet" type="text/css"/>
<link href="<?php echo base_url()?>assets/layouts/layout/css/themes/darkblue.css" rel="stylesheet" type="text/css" id="style_color"/>
<link href="<?php echo base_url()?>assets/layouts/layout/css/custom.css" rel="stylesheet" type="text/css"/>
<!-- END THEME STYLES -->
<link rel="shortcut icon" href="favicon.ico"/>
</head>
<!-- END HEAD -->
<!-- BEGIN BODY -->
<body class="login">
<!-- BEGIN SIDEBAR TOGGLER BUTTON -->
<div class="menu-toggler sidebar-toggler">
</div>
<!-- END SIDEBAR TOGGLER BUTTON -->
<!-- BEGIN LOGO -->
<div class="logo">
	<a href="#">
	<img src="<?php echo base_url()?>assets/layouts/layout/img/logo-large.png" alt=""/>
	</a>
</div>
<!-- END LOGO -->
<!-- BEGIN LOGIN -->
<div class="content">
	<!-- BEGIN LOGIN FORM -->
	<form class="login-form">
		<h3 class="form-title">登录</h3>
		<div id="bootstrap_alerts_demo">
		</div>
		<!--div class="alert alert-danger display-hide">
			<button class="close" data-close="alert"></button>
			<span>
			用户名与密码不能为空. </span>
		</div-->
		<div class="form-group">
			<!--ie8, ie9 does not support html5 placeholder, so we just show field title for that-->
			<label class="control-label visible-ie8 visible-ie9">用户名</label>
			<input class="form-control form-control-solid placeholder-no-fix" type="text" autocomplete="off" placeholder="用户名" name="username"/>
		</div>
		<div class="form-group">
			<label class="control-label visible-ie8 visible-ie9">密码</label>
			<input class="form-control form-control-solid placeholder-no-fix" type="password" autocomplete="off" placeholder="密码" name="password"/>
		</div>
		<div class="form-actions">
			<button type="submit" class="btn btn-success uppercase">登录</button>
			<label class="rememberme check">
			<input type="checkbox" name="remember" checked="true" name="tnc"/>记住密码 </label>
			<a href="javascript:;" id="forget-password" class="forget-password">忘记密码?</a>
		</div>
		<div class="create-account">
			<p>
				<a href="javascript:;" id="register-btn" class="uppercase">注册帐户</a>
			</p>
		</div>
	</form>
	<!-- END LOGIN FORM -->
	<!-- BEGIN FORGOT PASSWORD FORM -->
	<form class="forget-form">
		<h3 class="form-title">忘记密码 ?</h3>
		<div id="bootstrap_alerts_demo3">
		</div>
		<p>
			 请输入您的用户名及电子邮件以重置密码.
		</p>
		<div class="form-group">
			<label class="control-label visible-ie8 visible-ie9">用户名</label>
			<input class="form-control placeholder-no-fix" type="text" autocomplete="off"  minLength=4 maxLength=16 placeholder="用户名" name="username"/>
		</div>
		<div class="form-group">
			<input class="form-control placeholder-no-fix" type="text" autocomplete="off" placeholder="Email" name="email"/>
		</div>
		<div class="form-group">
			<label class="control-label visible-ie8 visible-ie9">密码</label>
			<input class="form-control placeholder-no-fix" type="password" autocomplete="off" minLength=5 maxLength=16 placeholder="密码" name="password"/>
		</div>	
		<div class="form-actions">
			<button type="button" id="back-btn" class="btn btn-default">返回</button>
			<button type="submit" class="btn btn-success uppercase pull-right">重置密码</button>
		</div>
	</form>
	<!-- END FORGOT PASSWORD FORM -->
	<!-- BEGIN REGISTRATION FORM -->
	<form class="register-form">
		<h3 class="form-title">注册帐户</h3>
		<div id="bootstrap_alerts_demo2">
		</div>
		<p class="hint">
			 请在下方输入您的个人真实信息以待管理员验证:
		</p>
		<div class="form-group">
			<label class="control-label visible-ie8 visible-ie9">姓名</label>
			<input class="form-control placeholder-no-fix" type="text"  minLength=2 maxLength=5 placeholder="姓名" name="fullname"/>
		</div>
		<div class="form-group">
			<!--ie8, ie9 does not support html5 placeholder, so we just show field title for that-->
			<label class="control-label visible-ie8 visible-ie9">电子邮件</label>
			<input class="form-control placeholder-no-fix" type="text" placeholder="电子邮件(找回密码所需信息)" name="email"/>
		</div>
		<div class="form-group">
			<label class="control-label visible-ie8 visible-ie9">办公电话</label>
			<input class="form-control placeholder-no-fix" type="text" placeholder="办公电话" name="phone"/>
		</div>
		<div class="form-group">
			<label class="control-label visible-ie8 visible-ie9">所在部门</label>
			<select name="department" class="form-control">
				<option value="">所在部门</option>				
				<option value="JZ">技术质量部</option>
				<option value="SC">生产管理部</option>
				<option value="QG">企管信息部</option>
				<option value="CZ">钞纸制作部</option>
				<option value="CP">钞纸成品制作部</option>
				<option value="JW">胶凹制作部</option>
				<option value="YM">印码制作部</option>
				<option value="JF">检封制作部</option>
				<option value="SG">数字管理部</option>
			</select>
		</div>
		<p class="hint">
			 请输入您的登录信息:
		</p>
		<div class="form-group">
			<label class="control-label visible-ie8 visible-ie9">用户名</label>
			<input class="form-control placeholder-no-fix" type="text" autocomplete="off"  minLength=4 maxLength=16 placeholder="用户名" name="username"/>
		</div>
		<div class="form-group">
			<label class="control-label visible-ie8 visible-ie9">密码</label>
			<input class="form-control placeholder-no-fix" type="password" autocomplete="off" minLength=5 maxLength=16 id="register_password" placeholder="密码" name="password"/>
		</div>
		<div class="form-group">
			<label class="control-label visible-ie8 visible-ie9">请再次输入密码</label>
			<input class="form-control placeholder-no-fix" type="password" autocomplete="off" minLength=5 maxLength=16 placeholder="请再次输入密码" name="rpassword"/>
		</div>
		<div class="form-group margin-top-20 margin-bottom-20 hide">
			<label class="check">
			<input type="checkbox" name="tnc"/> I agree to the <a href="#">
			Terms of Service </a>
			& <a href="#">
			Privacy Policy </a>
			</label>
			<div id="register_tnc_error">
			</div>
		</div>
		<div class="form-actions">
			<button type="button" id="register-back-btn" class="btn btn-default">返回</button>
			<button type="submit" id="register-submit-btn" class="btn btn-success uppercase pull-right">提交</button>
		</div>
	</form>
	<!-- END REGISTRATION FORM -->
</div>
<div class="copyright">
	 2015 &copy; 成都印钞有限公司 . 技术质量部.
</div>
<!-- END LOGIN -->
<!-- BEGIN JAVASCRIPTS(Load javascripts at bottom, this will reduce page load time) -->
<!-- BEGIN CORE PLUGINS -->
<!--[if lt IE 9]>
<script src="<?php echo base_url()?>assets/global/plugins/respond.min.js"></script>
<script src="<?php echo base_url()?>assets/global/plugins/excanvas.min.js"></script> 
<![endif]-->
<script src="<?php echo base_url()?>assets/global/plugins/jquery.min.js" type="text/javascript"></script>
<script src="<?php echo base_url()?>assets/global/plugins/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
<script src="<?php echo base_url()?>assets/global/plugins/jquery.blockui.min.js" type="text/javascript"></script>
<script src="<?php echo base_url()?>assets/global/plugins/js.cookie.min.js" type="text/javascript"></script>
<script src="<?php echo base_url()?>assets/global/plugins/uniform/jquery.uniform.min.js" type="text/javascript"></script>
<!-- END CORE PLUGINS -->
<!-- BEGIN PAGE LEVEL PLUGINS  -->
<script src="<?php echo base_url()?>assets/global/plugins/jquery-validation/js/jquery.validate.min.js" type="text/javascript"></script>
<script src="<?php echo base_url()?>assets/global/plugins/jquery-validation/js/localization/messages_zh.min.js" type="text/javascript"></script>
<!-- END PAGE LEVEL PLUGINS -->
<!-- BEGIN PAGE LEVEL SCRIPTS -->
<script src="<?php echo base_url()?>assets/global/scripts/App.min.js" type="text/javascript"></script>
<script src="<?php echo base_url()?>assets/layouts/layout/scripts/layout.js" type="text/javascript"></script>
<script src="<?php echo base_url()?>assets/layouts/layout/scripts/demo.js" type="text/javascript"></script>
<script src="<?php echo base_url()?>assets/pages/controller/login.min.js" type="text/javascript"></script>
<script src="<?php echo base_url()?>assets/pages/controller/CommonFunctions.min.js" type="text/javascript"></script>
<!-- END PAGE LEVEL SCRIPTS -->
<!-- END JAVASCRIPTS -->
</body>

<!-- END BODY -->
</html>