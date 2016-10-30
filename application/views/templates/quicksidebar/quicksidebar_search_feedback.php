<!-- BEGIN QUICK SIDEBAR -->
   <a href="javascript:;" class="page-quick-sidebar-toggler">
      <i class="icon-login"></i></a>
   <div class="page-quick-sidebar-wrapper" data-close-on-body-click="false">
      <div class="page-quick-sidebar">
         <div class="nav-justified">
            <ul class="nav nav-tabs nav-justified">
               <li>
                  <a href="javascript:;" data-target="#quick_sidebar_tab_1" data-toggle="tab">
                  查询设置
                  </a>
               </li>
            </ul>
            <div class="tab-content">
                <!--TAB SETTINGS START-->
               <div class="tab-pane  active page-quick-sidebar-settings" id="quick_sidebar_tab_4">
                  <div class="page-quick-sidebar-settings-list">
                     <h3 class="list-heading">产品设置</h3>
                     <ul class="list-items borderless">
                        <!--li>
                            产品品种
                            <select class="form-control input-inline input-sm input-small" name="prodType">
                           </select>
                        </li-->
                         <li>
                            机台
                           <select class="form-control input-inline input-sm input-small" name="machineID">
                           </select>
                        </li>
                     </ul>
                     <h3 class="list-heading">好品率设置</h3>
                     <ul class="list-items borderless">
                        <!--li>
                            好品率类型
                            <select class="form-control input-inline input-sm input-small" id="dataType">
                              <option value="0" selected="selected">二次离线</option>
                              <option value="1">二次在线</option>
                              <option value="2">一次在线好品率</option>
                           </select>
                        </li-->
                         <li>
                            不高于(%)
                           <select class="form-control input-inline input-sm input-small" id="limit">
                           </select>
                        </li>
                     </ul>
                     <h3 class="list-heading">缺陷条数</h3>
                     <ul class="list-items borderless">
                         <li>
                            高于
                           <select class="form-control input-inline input-sm input-small" id="errnum">
                           </select>
                        </li>
                     </ul>
                     <!--h3 class="list-heading">其余设置</h3>
                     <ul class="list-items borderless">
                        <li>
                            缺陷类型
                            <select class="form-control input-inline input-sm input-small" id="fakeType">
                              <option value="0" selected="selected">人工实废</option>
                              <option value="1">所有图像</option>
                           </select>
                        </li>
                     </ul-->
                     <div class="containt row">
                        <div class="inner-content col-md-4">
                           <button id="saveSettings" class="btn btn-success btn-circle green-seagreen"><i class="icon-magnifier"></i>保存设置</button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
   <!-- END QUICK SIDEBAR -->