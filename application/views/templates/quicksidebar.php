﻿<!-- BEGIN QUICK SIDEBAR -->
   <a href="javascript:;" class="page-quick-sidebar-toggler">
      <i class="icon-login"></i></a>
   <div class="page-quick-sidebar-wrapper" data-close-on-body-click="false">
      <div class="page-quick-sidebar">
         <div class="nav-justified">
            <ul class="nav nav-tabs nav-justified">
               <li class="active">
                  <a href="javascript:;" data-target="#quick_sidebar_tab_4" data-toggle="tab">
                  查询 <span class="badge badge-info">2</span>
                  </a>
               </li>
               <li>
                  <a href="javascript:;" data-target="#quick_sidebar_tab_1" data-toggle="tab">
                  好友 <span class="badge badge-danger">2</span>
                  </a>
               </li>
               <li>
                  <a href="javascript:;" data-target="#quick_sidebar_tab_2" data-toggle="tab">
                  系统 <span class="badge badge-success">7</span>
                  </a>
               </li>
               <li class="dropdown">
                  <a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown">
                  更多<i class="fa fa-angle-down"></i>
                  </a>
                  <ul class="dropdown-menu pull-right" role="menu">
                     <li>
                        <a href="javascript:;" data-target="#quick_sidebar_tab_3" data-toggle="tab">
                        <i class="icon-bell"></i> 提醒 </a>
                     </li>
                     <li>
                        <a href="javascript:;" data-target="#quick_sidebar_tab_3" data-toggle="tab">
                        <i class="icon-info"></i> 消息 </a>
                     </li>
                     <li class="divider">
                     </li>
                     <li>
                        <a href="javascript:;" data-target="#quick_sidebar_tab_3" data-toggle="tab">
                        <i class="icon-settings"></i> 系统设置 </a>
                     </li>
                  </ul>
               </li>
            </ul>
            <div class="tab-content">
                <!--TAB SETTINGS START-->
               <div class="tab-pane  active page-quick-sidebar-settings" id="quick_sidebar_tab_4">
                  <div class="page-quick-sidebar-settings-list">
                     <h3 class="list-heading">通用设置</h3>
                     <ul class="list-items borderless">
                        <li>
                            自动刷新<input id="AutoRefresh" type="checkbox" class="make-switch" checked data-on-color="success" data-on-text="是" data-off-color="danger" data-off-text="否">
                        </li>
                         <li>
                            刷新间隔
                           <select id="RefreshTime" class="form-control input-inline input-sm input-small" data-placeholder="刷新间隔...">
                              <option value=""></option>
                              <option value="30">30S</option>
                              <option value="60">1分钟</option>
                              <option value="300">5分钟</option>
                              <option value="600">10分钟</option>
                           </select>
                        </li>
                        <li>
                            机检工序
                           <select id="ProcID" class="form-control input-inline input-sm input-small" data-placeholder="机检工序...">
                              <option value=""></option>
                              <option value="1">钞纸</option>
                              <option value="2">胶凹</option>
                              <option value="3">印码</option>
                              <option value="4">检封</option>
                              <option value="5">所有</option>
                           </select>
                        </li>
                        <li>
                            每次加载
                           <select id="LoadingNum" class="form-control input-inline input-sm input-small" data-placeholder="刷新条数...">
                              <option value=""></option>
                              <option value="1">20条</option>
                              <option value="2">30条</option>
                              <option value="3">40条</option>
                              <option value="4">50条</option>
                           </select>
                        </li>
                     </ul>
                     <h3 class="list-heading">查询选项</h3>
                     <ul class="list-items borderless">
                        <li>
                            处理状态
                           <select id="ProStatus" class="form-control input-inline input-sm input-small" data-placeholder="处理状态...">
                              <option value=""></option>
                              <option value="1">已处理</option>
                              <option value="2">未处理</option>
                              <option value="3" selected>所有日志</option>
                           </select>
                        </li>
                        <li>
                            关键字<input id="KeyWord" class="form-control input-inline input-sm input-small" placeholder="关键字"/>
                        </li>
                        <li>
                            当前ID<input id="LogID" class="form-control input-inline input-sm input-small" disabled value="0"/>
                        </li>                       
                     </ul>
                     <!--ul class="list-items borderless">
                        <li>时间范围
                            <select class="form-control input-inline input-sm input-small">
                              <option value="1">今天</option>
                              <option value="2" selected>过去3天</option>
                              <option value="3">过去7天</option>
                              <option value="4">过去1月</option>
                           </select>
                        </li>
                     </ul-->
                     <div class="containt row">
                        <div class="inner-content col-md-4" style="margin:10px 10px 0 20px">
                           <button id="SaveSettings" class="btn btn-success btn-circle purple-studio"><i class="icon-settings"></i>保存设置</button>
                        </div>
                        <div class="inner-content col-md-4" style="margin:10px 10px 0 20px">
                           <button id="QueryData" class="btn btn-success btn-circle green-seagreen"><i class="icon-magnifier"></i>查询数据</button>
                        </div>
                     </div>
                  </div>
               </div>
               <!--TAB SETTINGS END-->
               <div class="tab-pane page-quick-sidebar-chat" id="quick_sidebar_tab_1">
                  <div class="page-quick-sidebar-chat-users" data-rail-color="#ddd" data-wrapper-class="page-quick-sidebar-list">
                     <h3 class="list-heading">Staff</h3>
                     <ul class="media-list list-items">
                        <li class="media">
                           <div class="media-status">
                              <span class="badge badge-success">8</span>
                           </div>
                           <img class="media-object" src="<?php echo base_url()?>assets/layouts/layout/img/avatar3.jpg" alt="...">
                           <div class="media-body">
                              <h4 class="media-heading">Bob Nilson</h4>
                              <div class="media-heading-sub">
                                  Project Manager
                              </div>
                           </div>
                        </li>
                        <li class="media">
                           <img class="media-object" src="<?php echo base_url()?>assets/layouts/layout/img/avatar1.jpg" alt="...">
                           <div class="media-body">
                              <h4 class="media-heading">Nick Larson</h4>
                              <div class="media-heading-sub">
                                  Art Director
                              </div>
                           </div>
                        </li>
                        <li class="media">
                           <div class="media-status">
                              <span class="badge badge-danger">3</span>
                           </div>
                           <img class="media-object" src="<?php echo base_url()?>assets/layouts/layout/img/avatar4.jpg" alt="...">
                           <div class="media-body">
                              <h4 class="media-heading">Deon Hubert</h4>
                              <div class="media-heading-sub">
                                  CTO
                              </div>
                           </div>
                        </li>
                        <li class="media">
                           <img class="media-object" src="<?php echo base_url()?>assets/layouts/layout/img/avatar2.jpg" alt="...">
                           <div class="media-body">
                              <h4 class="media-heading">Ella Wong</h4>
                              <div class="media-heading-sub">
                                  CEO
                              </div>
                           </div>
                        </li>
                     </ul>
                     <h3 class="list-heading">Customers</h3>
                     <ul class="media-list list-items">
                        <li class="media">
                           <div class="media-status">
                              <span class="badge badge-warning">2</span>
                           </div>
                           <img class="media-object" src="<?php echo base_url()?>assets/layouts/layout/img/avatar6.jpg" alt="...">
                           <div class="media-body">
                              <h4 class="media-heading">Lara Kunis</h4>
                              <div class="media-heading-sub">
                                  CEO, Loop Inc
                              </div>
                              <div class="media-heading-small">
                                  Last seen 03:10 AM
                              </div>
                           </div>
                        </li>
                        <li class="media">
                           <div class="media-status">
                              <span class="label label-sm label-success">new</span>
                           </div>
                           <img class="media-object" src="<?php echo base_url()?>assets/layouts/layout/img/avatar7.jpg" alt="...">
                           <div class="media-body">
                              <h4 class="media-heading">Ernie Kyllonen</h4>
                              <div class="media-heading-sub">
                                  Project Manager,<br>
                                  SmartBizz PTL
                              </div>
                           </div>
                        </li>
                        <li class="media">
                           <img class="media-object" src="<?php echo base_url()?>assets/layouts/layout/img/avatar8.jpg" alt="...">
                           <div class="media-body">
                              <h4 class="media-heading">Lisa Stone</h4>
                              <div class="media-heading-sub">
                                  CTO, Keort Inc
                              </div>
                              <div class="media-heading-small">
                                  Last seen 13:10 PM
                              </div>
                           </div>
                        </li>
                        <li class="media">
                           <div class="media-status">
                              <span class="badge badge-success">7</span>
                           </div>
                           <img class="media-object" src="<?php echo base_url()?>assets/layouts/layout/img/avatar9.jpg" alt="...">
                           <div class="media-body">
                              <h4 class="media-heading">Deon Portalatin</h4>
                              <div class="media-heading-sub">
                                  CFO, H D LTD
                              </div>
                           </div>
                        </li>
                        <li class="media">
                           <img class="media-object" src="<?php echo base_url()?>assets/layouts/layout/img/avatar10.jpg" alt="...">
                           <div class="media-body">
                              <h4 class="media-heading">Irina Savikova</h4>
                              <div class="media-heading-sub">
                                  CEO, Tizda Motors Inc
                              </div>
                           </div>
                        </li>
                        <li class="media">
                           <div class="media-status">
                              <span class="badge badge-danger">4</span>
                           </div>
                           <img class="media-object" src="<?php echo base_url()?>assets/layouts/layout/img/avatar11.jpg" alt="...">
                           <div class="media-body">
                              <h4 class="media-heading">Maria Gomez</h4>
                              <div class="media-heading-sub">
                                  Manager, Infomatic Inc
                              </div>
                              <div class="media-heading-small">
                                  Last seen 03:10 AM
                              </div>
                           </div>
                        </li>
                     </ul>
                  </div>
                  <div class="page-quick-sidebar-item">
                     <div class="page-quick-sidebar-chat-user" style="height:100%;">
                        <div class="page-quick-sidebar-nav">
                           <a href="javascript:;" class="page-quick-sidebar-back-to-list"><i class="icon-arrow-left"></i>Back</a>
                        </div>
                        <div class="page-quick-sidebar-chat-user-messages">
                           <div class="post out">
                              <img class="avatar" alt="" src="<?php echo base_url()?>assets/layouts/layout/img/avatar3.jpg"/>
                              <div class="message">
                                 <span class="arrow"></span>
                                 <a href="javascript:;" class="name">Bob Nilson</a>
                                 <span class="datetime">20:15</span>
                                 <span class="body">
                                 When could you send me the report ? </span>
                              </div>
                           </div>
                           <div class="post in">
                              <img class="avatar" alt="" src="<?php echo base_url()?>assets/layouts/layout/img/avatar2.jpg"/>
                              <div class="message">
                                 <span class="arrow"></span>
                                 <a href="javascript:;" class="name">Ella Wong</a>
                                 <span class="datetime">20:15</span>
                                 <span class="body">
                                 Its almost done. I will be sending it shortly </span>
                              </div>
                           </div>
                           <div class="post out">
                              <img class="avatar" alt="" src="<?php echo base_url()?>assets/layouts/layout/img/avatar3.jpg"/>
                              <div class="message">
                                 <span class="arrow"></span>
                                 <a href="javascript:;" class="name">Bob Nilson</a>
                                 <span class="datetime">20:15</span>
                                 <span class="body">
                                 Alright. Thanks! :) </span>
                              </div>
                           </div>
                           <div class="post in">
                              <img class="avatar" alt="" src="<?php echo base_url()?>assets/layouts/layout/img/avatar2.jpg"/>
                              <div class="message">
                                 <span class="arrow"></span>
                                 <a href="javascript:;" class="name">Ella Wong</a>
                                 <span class="datetime">20:16</span>
                                 <span class="body">
                                 You are most welcome. Sorry for the delay. </span>
                              </div>
                           </div>
                           <div class="post out">
                              <img class="avatar" alt="" src="<?php echo base_url()?>assets/layouts/layout/img/avatar3.jpg"/>
                              <div class="message">
                                 <span class="arrow"></span>
                                 <a href="javascript:;" class="name">Bob Nilson</a>
                                 <span class="datetime">20:17</span>
                                 <span class="body">
                                 No probs. Just take your time :) </span>
                              </div>
                           </div> 
                           <div class="page-quick-sidebar-chat-user-form">
                               <div class="input-group">
                                   <input type="text" class="form-control" placeholder="Type a message here...">
                                   <div class="input-group-btn">
                                       <button type="button" class="btn green">
                                           <i class="icon-paper-clip"></i>
                                       </button>
                                   </div>
                               </div>
                           </div>                        
                        </div>
                     </div>
                  </div>
               </div>
               <div class="tab-pane page-quick-sidebar-alerts" id="quick_sidebar_tab_2">
                  <div class="page-quick-sidebar-alerts-list">
                     <h3 class="list-heading">General</h3>
                     <ul class="feeds list-items">
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
                                        You have 4 pending tasks. <span class="label label-sm label-warning ">
                                       Take action <i class="fa fa-share"></i>
                                       </span>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div class="col2">
                              <div class="date">
                                  Just now
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
                                        Finance Report for year 2013 has been released.
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div class="col2">
                              <div class="date">
                                  20 mins
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
                                        You have 5 pending membership that requires a quick review.
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div class="col2">
                              <div class="date">
                                  24 mins
                              </div>
                           </div>
                        </li>
                        <li>
                           <div class="col1">
                              <div class="cont">
                                 <div class="cont-col1">
                                    <div class="label label-sm label-info">
                                       <i class="fa fa-shopping-cart"></i>
                                    </div>
                                 </div>
                                 <div class="cont-col2">
                                    <div class="desc">
                                        New order received with <span class="label label-sm label-success">
                                       Reference Number: DR23923 </span>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div class="col2">
                              <div class="date">
                                  30 mins
                              </div>
                           </div>
                        </li>
                        <li>
                           <div class="col1">
                              <div class="cont">
                                 <div class="cont-col1">
                                    <div class="label label-sm label-success">
                                       <i class="fa fa-user"></i>
                                    </div>
                                 </div>
                                 <div class="cont-col2">
                                    <div class="desc">
                                        You have 5 pending membership that requires a quick review.
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div class="col2">
                              <div class="date">
                                  24 mins
                              </div>
                           </div>
                        </li>
                        <li>
                           <div class="col1">
                              <div class="cont">
                                 <div class="cont-col1">
                                    <div class="label label-sm label-info">
                                       <i class="fa fa-bell-o"></i>
                                    </div>
                                 </div>
                                 <div class="cont-col2">
                                    <div class="desc">
                                        Web server hardware needs to be upgraded. <span class="label label-sm label-warning">
                                       Overdue </span>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div class="col2">
                              <div class="date">
                                  2 hours
                              </div>
                           </div>
                        </li>
                        <li>
                           <a href="#">
                           <div class="col1">
                              <div class="cont">
                                 <div class="cont-col1">
                                    <div class="label label-sm label-default">
                                       <i class="fa fa-briefcase"></i>
                                    </div>
                                 </div>
                                 <div class="cont-col2">
                                    <div class="desc">
                                        IPO Report for year 2013 has been released.
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div class="col2">
                              <div class="date">
                                  20 mins
                              </div>
                           </div>
                           </a>
                        </li>
                     </ul>
                     <h3 class="list-heading">System</h3>
                     <ul class="feeds list-items">
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
                                        You have 4 pending tasks. <span class="label label-sm label-warning ">
                                       Take action <i class="fa fa-share"></i>
                                       </span>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div class="col2">
                              <div class="date">
                                  Just now
                              </div>
                           </div>
                        </li>
                        <li>
                           <a href="#">
                           <div class="col1">
                              <div class="cont">
                                 <div class="cont-col1">
                                    <div class="label label-sm label-danger">
                                       <i class="fa fa-bar-chart-o"></i>
                                    </div>
                                 </div>
                                 <div class="cont-col2">
                                    <div class="desc">
                                        Finance Report for year 2013 has been released.
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div class="col2">
                              <div class="date">
                                  20 mins
                              </div>
                           </div>
                           </a>
                        </li>
                        <li>
                           <div class="col1">
                              <div class="cont">
                                 <div class="cont-col1">
                                    <div class="label label-sm label-default">
                                       <i class="fa fa-user"></i>
                                    </div>
                                 </div>
                                 <div class="cont-col2">
                                    <div class="desc">
                                        You have 5 pending membership that requires a quick review.
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div class="col2">
                              <div class="date">
                                  24 mins
                              </div>
                           </div>
                        </li>
                        <li>
                           <div class="col1">
                              <div class="cont">
                                 <div class="cont-col1">
                                    <div class="label label-sm label-info">
                                       <i class="fa fa-shopping-cart"></i>
                                    </div>
                                 </div>
                                 <div class="cont-col2">
                                    <div class="desc">
                                        New order received with <span class="label label-sm label-success">
                                       Reference Number: DR23923 </span>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div class="col2">
                              <div class="date">
                                  30 mins
                              </div>
                           </div>
                        </li>
                        <li>
                           <div class="col1">
                              <div class="cont">
                                 <div class="cont-col1">
                                    <div class="label label-sm label-success">
                                       <i class="fa fa-user"></i>
                                    </div>
                                 </div>
                                 <div class="cont-col2">
                                    <div class="desc">
                                        You have 5 pending membership that requires a quick review.
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div class="col2">
                              <div class="date">
                                  24 mins
                              </div>
                           </div>
                        </li>
                        <li>
                           <div class="col1">
                              <div class="cont">
                                 <div class="cont-col1">
                                    <div class="label label-sm label-warning">
                                       <i class="fa fa-bell-o"></i>
                                    </div>
                                 </div>
                                 <div class="cont-col2">
                                    <div class="desc">
                                        Web server hardware needs to be upgraded. <span class="label label-sm label-default ">
                                       Overdue </span>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div class="col2">
                              <div class="date">
                                  2 hours
                              </div>
                           </div>
                        </li>
                        <li>
                           <a href="#">
                           <div class="col1">
                              <div class="cont">
                                 <div class="cont-col1">
                                    <div class="label label-sm label-info">
                                       <i class="fa fa-briefcase"></i>
                                    </div>
                                 </div>
                                 <div class="cont-col2">
                                    <div class="desc">
                                        IPO Report for year 2013 has been released.
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div class="col2">
                              <div class="date">
                                  20 mins
                              </div>
                           </div>
                           </a>
                        </li>
                     </ul>
                  </div>
               </div>
               <!--TAB SETTINGS START-->
               <div class="tab-pane page-quick-sidebar-settings" id="quick_sidebar_tab_3">
                  <div class="page-quick-sidebar-settings-list">
                     <h3 class="list-heading">General Settings</h3>
                     <ul class="list-items borderless">
                        <li>
                            Enable Notifications <input type="checkbox" class="make-switch" checked data-size="small" data-on-color="success" data-on-text="ON" data-off-color="default" data-off-text="OFF">
                        </li>
                        <li>
                            Allow Tracking <input type="checkbox" class="make-switch" data-size="small" data-on-color="info" data-on-text="ON" data-off-color="default" data-off-text="OFF">
                        </li>
                        <li>
                            Log Errors <input type="checkbox" class="make-switch" checked data-size="small" data-on-color="danger" data-on-text="ON" data-off-color="default" data-off-text="OFF">
                        </li>
                        <li>
                            Auto Sumbit Issues <input type="checkbox" class="make-switch" data-size="small" data-on-color="warning" data-on-text="ON" data-off-color="default" data-off-text="OFF">
                        </li>
                        <li>
                            Enable SMS Alerts <input type="checkbox" class="make-switch" checked data-size="small" data-on-color="success" data-on-text="ON" data-off-color="default" data-off-text="OFF">
                        </li>
                     </ul>
                     <h3 class="list-heading">System Settings</h3>
                     <ul class="list-items borderless">
                        <li>
                            Security Level
                           <select class="form-control input-inline input-sm input-small">
                              <option value="1">Normal</option>
                              <option value="2" selected>Medium</option>
                              <option value="e">High</option>
                           </select>
                        </li>
                        <li>
                            Failed Email Attempts <input class="form-control input-inline input-sm input-small" value="5"/>
                        </li>
                        <li>
                            Secondary SMTP Port <input class="form-control input-inline input-sm input-small" value="3560"/>
                        </li>
                        <li>
                            Notify On System Error <input type="checkbox" class="make-switch" checked data-size="small" data-on-color="danger" data-on-text="ON" data-off-color="default" data-off-text="OFF">
                        </li>
                        <li>
                            Notify On SMTP Error <input type="checkbox" class="make-switch" checked data-size="small" data-on-color="warning" data-on-text="ON" data-off-color="default" data-off-text="OFF">
                        </li>
                     </ul>
                     <div class="inner-content">
                        <button class="btn btn-success"><i class="icon-settings"></i> Save Changes</button>
                     </div>
                  </div>
               </div>
               <!--TAB SETTINGS END-->
            </div>
         </div>
      </div>
   </div>
   <!-- END QUICK SIDEBAR -->