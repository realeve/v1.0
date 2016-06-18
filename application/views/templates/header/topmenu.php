<!-- BEGIN BODY -->
<!--body class="page-header-fixed page-quick-sidebar-over-content page-sidebar-closed-hide-logo"-->
<body class="page-header-fixed page-sidebar-closed-hide-logo page-container-bg-solid">
<!-- BEGIN HEADER -->
<div class="page-header md-shadow-z-1-i navbar navbar-fixed-top">
	<!-- BEGIN HEADER INNER -->
	<div class="page-header-inner">
		<!-- BEGIN LOGO -->
		<div class="page-logo">
			<a href="<?php echo base_url()?>">
			<img src="../../assets/layouts/layout/img/logo.png" alt="logo" class="logo-default"/>
			</a>
			<div class="menu-toggler sidebar-toggler">
				<!-- DOC: Remove the above "hide" to enable the sidebar toggler button on header -->
			</div>
		</div>
		<!-- END LOGO -->
		<!-- BEGIN HEADER SEARCH BOX -->
		<div class="search-form">
			<div class="input-group">
				<input type="text" class="form-control" placeholder="搜索..." name="query">
				<span class="input-group-btn">
				<a href="javascript:;" class="btn submit"><i class="icon-magnifier"></i></a>
				</span>
			</div>
		</div>
		<!-- END HEADER SEARCH BOX -->
		<!-- BEGIN RESPONSIVE MENU TOGGLER -->
		<a href="javascript:;" class="menu-toggler responsive-toggler" data-toggle="collapse" data-target=".navbar-collapse">
		</a>
		<!-- END RESPONSIVE MENU TOGGLER -->
		<!-- BEGIN TOP NAVIGATION MENU -->
		<div class="top-menu hidden-xs hidden-sm">
			<ul class="nav navbar-nav pull-right">
				<!-- BEGIN USER LOGIN DROPDOWN -->
				<!-- DOC: Apply "dropdown-dark" class after below "dropdown-extended" to change the dropdown styte -->
				<li class="dropdown dropdown-user">
					<a href="#" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">
					<img alt="" class="img-circle"/>
					<span class="username username-hide-on-mobile" data-uid="<?php echo $uid?>" data-avatar="<?php echo $avatar?>" data-set-avatar="<?php echo $set_avatar?>">
					<?php echo $username?> </span>
					<i class="fa fa-angle-down"></i>
					</a>
					<ul class="dropdown-menu dropdown-menu-default">
						<li>
							<a href="<?php echo base_url()?>settings/account">
							<i class="icon-user"></i> 个人信息 </a>
						</li>
						<li class="divider">
						</li>
						<li>
							<a href="<?php echo base_url()?>welcome/lockscreen">
							<i class="icon-lock"></i> 注销 </a>
						</li>
						<li>
							<a href="<?php echo base_url()?>welcome/logout">
							<i class="icon-key"></i> 退出 </a>
						</li>
					</ul>
				</li>
				<!-- END USER LOGIN DROPDOWN -->
				<!-- BEGIN QUICK SIDEBAR TOGGLER -->
				<!-- DOC: Apply "dropdown-dark" class after below "dropdown-extended" to change the dropdown styte -->
				<li class="dropdown dropdown-quick-sidebar-toggler">
					<a href="javascript:;" class="dropdown-toggle">
					<i class="icon-logout"></i>
					</a>
				</li>
				<!-- END QUICK SIDEBAR TOGGLER -->
			</ul>
		</div>
		<!-- END TOP NAVIGATION MENU -->
	</div>
	<!-- END HEADER INNER -->
</div>
<!-- END HEADER -->