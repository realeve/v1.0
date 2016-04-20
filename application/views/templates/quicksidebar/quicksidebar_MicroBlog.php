   <!-- BEGIN QUICK SIDEBAR -->
   <a href="javascript:;" class="page-quick-sidebar-toggler">
      <i class="icon-login"></i></a>
   <div class="page-quick-sidebar-wrapper" data-close-on-body-click="false">
      <div class="page-quick-sidebar">
         <div class="nav-justified">
            <ul class="nav nav-tabs nav-justified">
               <li>
                  <a href="javascript:;" data-target="#quick_sidebar_tab_1" data-toggle="tab">
                  工作笔记查询设置
                  </a>
               </li>               
            </ul>
            <div class="tab-content">
                <!--TAB SETTINGS START-->
               <div class="tab-pane  active page-quick-sidebar-settings" id="quick_sidebar_tab_4">
                  <div class="page-quick-sidebar-settings-list">
                     <h3 class="list-heading">通用设置</h3>
                     <ul class="list-items borderless">
                        <li class="hide">
                            自动刷新<input id="AutoRefresh" type="checkbox" class="make-switch" checked data-on-color="success" data-on-text="是" data-off-color="danger" data-off-text="否">
                        </li>
                         <li class="hide">
                            刷新间隔
                           <select class="layout-option form-control input-sm" id="RefreshTime">
                              <option value="1" selected="selected">30秒</option>
                              <option value="2">1分钟</option>
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
                            关键字<input id="KeyWord" class="form-control input-inline input-sm input-small" placeholder="关键字"/>
                        </li>                    
                     </ul>
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
            </div>
         </div>
      </div>
   </div>
   <!-- END QUICK SIDEBAR -->