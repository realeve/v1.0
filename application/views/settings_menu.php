            <!-- BEGIN STYLE CUSTOMIZER -->
            <?php include "templates/themesetting.php";?>
            <!-- END STYLE CUSTOMIZER -->
            <!-- BEGIN PAGE HEADER-->
            <div class="page-bar">
                <ul class="page-breadcrumb">
                    <li>
                        <a href="<?php echo base_url() ?>">首页</a>
                        <i class="fa fa-circle"></i>
                    </li>
                    <li>
                        <a href="<?php echo base_url() ?>settings">系统设置</a>
                        <i class="fa fa-circle"></i>
                    </li>
                    <li>
                        <a href="#">个性化设置</a>
                        <i class="fa fa-circle"></i>
                    </li>
                    <li>
                        <a href="#">自定义菜单</a>
                    </li>
                </ul>
            </div>
            <h3 class="page-title">
            <span class="caption-subject bold uppercase" name="TableTitle"></span>  <small id="today"></small>
            </h3>
            <!-- END PAGE HEADER-->
            <div class="row">
                <div class="modal fade draggable-modal" id="newMenu" tabindex="-1" role="basic" aria-hidden="true">
                    <div class="modal-dialog modal-normal">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
                                <h4 class="modal-title">添加新菜单</h4>
                            </div>
                            <div class="modal-body">
                                <input type="text" class="form-control" placeholder="请输入菜单名" name="menuName">
                                <div class="form-group">
                                    <div class="checkbox">
                                        <label>
                                            <input type="checkbox" name="share"> 将此菜单内容分享给所有人 </label>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-danger btn-outline" data-dismiss="modal" name="cancel"><i class="fa fa-arrow-left"></i>取消</button>
                                <button type="button" class="btn btn-success" name="save"><i class="fa fa-save"></i>添加菜单</button>
                            </div>
                        </div>
                        <!-- /.modal-content -->
                    </div>
                    <!-- /.modal-dialog -->
                </div>

                <!--div class="col-md-12">
                    <div class="portlet light portlet-fit bordered">
                        <div class="portlet-body">
                            <div class="mt-element-step">
                                <div class="row step-line">
                                    <div class="col-md-3 mt-step-col first done">
                                        <div class="mt-step-number bg-white">1</div>
                                        <div class="mt-step-title uppercase font-grey-cascade"><i class="fa fa-hourglass-1"></i> 开始</div>
                                        <div class="mt-step-content font-grey-cascade">选择待操作的预存储菜单或新增菜单</div>
                                    </div>
                                    <div class="col-md-3 mt-step-col done">
                                        <div class="mt-step-number bg-white">2</div>
                                        <div class="mt-step-title uppercase font-grey-cascade"><i class="fa fa-hourglass-2"></i> 选择</div>
                                        <div class="mt-step-content font-grey-cascade">勾选要添加的菜单列表项</div>
                                    </div>
                                    <div class="col-md-3 mt-step-col active">
                                        <div class="mt-step-number bg-white">3</div>
                                        <div class="mt-step-title uppercase font-grey-cascade"><i class="fa fa-hourglass-3"></i> 编辑</div>
                                        <div class="mt-step-content font-grey-cascade">编辑个人菜单项，设置URL或名称</div>
                                    </div>
                                    <div class="col-md-3 mt-step-col last error">
                                        <div class="mt-step-number bg-white">4</div>
                                        <div class="mt-step-title uppercase font-grey-cascade"><i class="fa fa-hourglass-end"></i> 调整</div>
                                        <div class="mt-step-content font-grey-cascade">拖动以调整菜单结构</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div-->
                <div class="col-md-6">
                    <div class="col-md-12 portlet light bordered" id="menuList">
                        <div class="portlet-title">
                            <div class="caption">
                                <i class="fa fa-hourglass-1"></i> 1.开始
                            </div>
                        </div>
                        <div class="portlet-body ">
                            <div class="form-group">
                                <label class="col-md-3 control-label">菜单列表：</label>
                                <div class="col-md-6">
                                    <select class="form-control select2" name="menu_list" placeholder="选择要编辑的菜单">
                                    </select>
                                    <span class="help-block">每个帐户最多允许创建10个菜单列表</span>
                                </div>
                                <div class="actions" id="menuOper">
                                    <div class="btn-group">
                                        <a class="btn blue btn-sm" href="javascript:;" data-toggle="dropdown" data-hover="dropdown" data-close-others="true"> <i class="icon-settings"></i> 操作
                                            <i class="fa fa-angle-down"></i>
                                        </a>
                                        <ul class="dropdown-menu pull-right">
                                            <li>
                                                <a data-toggle="modal" href="#newMenu" name="add"><i class="icon-docs"></i> 新建</a>
                                            </li>
                                            <li>
                                                <a href="javascript:;" name="del" data-toggle="confirmation" data-singleton="true" data-popout="true" data-placement="left" data-title="确定删除这个菜单?" data-btn-ok-label="是" data-btn-ok-icon="icon-trash" data-btn-ok-class="btn-success" data-btn-cancel-label="取消" data-btn-cancel-icon="icon-close" data-btn-cancel-class="btn-danger"><i class="icon-trash"></i> 删除</a>
                                            </li>
                                            <li>
                                                <a data-toggle="modal" href="#newMenu" name="rename"><i class="icon-pencil"></i> 重命名</a>
                                            </li>
                                            <li>
                                                <a name="save"><i class="fa fa-save"></i> 保存设置</a>
                                            </li>
                                            <li>
                                                <a name="active"><i class="fa fa-eye"></i> 设为默认 </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-md-offset-3 col-md-9">
                                    <div class="checkbox">
                                        <label>
                                            <input type="checkbox" name="share"> 将此菜单内容分享给所有人 </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12 portlet light bordered tasks-widget" id="menuDetail">
                        <div class="portlet-title">
                            <div class="caption">
                                <i class="fa fa-hourglass-2"></i> 2.选择
                                <span class="caption-helper">勾选以将菜单项添加到预览列表中...<br>(如果被删除菜单中存在子菜单，子菜单项将被移至主菜单末尾)</span>
                            </div>
                        </div>
                        <div class="portlet-body ">
                            <div class="task-content">
                                <div class="scroller" style="max-height: 950px;min-height:600px;" data-always-visible="1" data-rail-visible1="1">
                                    <!-- START TASK LIST -->
                                    <ul class="task-list col-md-6">

                                    </ul>
                                    <ul class="task-list col-md-6">

                                    </ul>
                                    <!-- END START TASK LIST -->
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-12 portlet light bordered" id="menuEdit">
                        <div class="portlet-title">
                            <div class="caption">
                                <span class="caption-subject sbold uppercase">
                                    <i class="fa fa-hourglass-3"></i> 3.编辑</span>
                            </div>
                            <div class="actions">
                            </div>
                        </div>
                        <div class="portlet-body">
                                <div class="form-group">
                                    <label class="control-label col-md-3">菜单项</label>
                                    <div class="col-md-9">
                                        <select class="form-control select2" name="menuDetail">
                                        </select>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-3 control-label">菜单名称</label>
                                    <div class="col-md-9">
                                        <div class="input-icon margin-top-10">
                                            <i class="fa fa-user"></i>
                                            <input type="text" class="form-control" name="name" placeholder="点击输入菜单名称"> </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-3 control-label">URL</label>
                                    <div class="col-md-9">
                                        <div class="input-icon margin-top-10">
                                            <i class="fa fa-globe"></i>
                                            <input type="text" class="form-control" name="url" placeholder="点击输入菜单地址"> </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-md-3 control-label margin-top-10">菜单图标</label>
                                    <div class="col-md-9 margin-top-10">
                                        <a class="btn btn-circle btn-icon-only blue tooltips" data-original-title="点击选择菜单图标" data-toggle="modal"  data-target="#icon_library">
                                        </a>
                                        <div class="help-block">点击按钮添加图标</div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-md-offset-3 col-md-9">
                                        <div class="checkbox">
                                            <label>
                                                <input type="checkbox" name="share"> 将此菜单项分享给所有人 </label>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="col-md-offset-2 col-md-10 action">
                                        <button class="btn green" name="add"><span class="glyphicon glyphicon-plus-sign"> </span> 添加</button>
                                        <button class="btn" name="edit"><i class="fa fa-floppy-o"></i> 修改</button>
                                        <button class="btn" name="hide"><i class="fa fa-eye-slash"></i> 隐藏</button>
                                    </div>
                                </div>
                        </div>
                    </div>
                </div>
                <div class="modal fade" id="icon_library">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content c-square">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <h4 class="modal-title">点击选择菜单图标</h4>
                            </div>
                            <div class="modal-body">
                                <div class="tabbable-line">
                                    <ul class="nav nav-tabs uppercase bold">
                                        <li class="active">
                                            <a href="#blue_tab_1_content" data-toggle="tab">Simple Line 图标</a>
                                        </li>
                                        <li>
                                            <a href="#blue_tab_2_content" data-toggle="tab">Fontawesome 图标</a>
                                        </li>
                                        <li>
                                            <a href="#blue_tab_3_content" data-toggle="tab">Glyph 图标</a>
                                        </li>
                                    </ul>
                                    <div class="tab-content">
                                        <div class="tab-pane glyphicons-demo active" id="blue_tab_1_content">
                                            <ul class="bs-glyphicons bs-glyphicons-list">
                                                <li>
                                                    <i class="icon-user"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-user-female"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-users"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-user-follow"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-user-following"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-user-unfollow"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-trophy"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-speedometer"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-social-youtube"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-social-twitter"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-social-tumblr"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-social-facebook"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-social-dropbox"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-social-dribbble"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-shield"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-screen-tablet"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-screen-smartphone"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-screen-desktop"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-plane"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-notebook"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-moustache"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-mouse"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-magnet"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-magic-wand"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-hourglass"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-graduation"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-ghost"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-game-controller"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-fire"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-eyeglasses"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-envelope-open"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-envelope-letter"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-energy"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-emoticon-smile"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-disc"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-cursor-move"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-crop"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-credit-card"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-chemistry"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-bell"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-badge"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-anchor"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-action-redo"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-action-undo"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-bag"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-basket"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-basket-loaded"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-book-open"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-briefcase"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-bubbles"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-calculator"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-call-end"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-call-in"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-call-out"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-compass"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-cup"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-diamond"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-direction"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-directions"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-docs"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-drawer"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-drop"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-earphones"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-earphones-alt"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-feed"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-film"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-folder-alt"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-frame"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-globe"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-globe-alt"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-handbag"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-layers"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-map"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-picture"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-pin"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-playlist"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-present"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-printer"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-puzzle"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-speech"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-vector"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-wallet"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-arrow-down"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-arrow-left"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-arrow-right"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-arrow-up"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-bar-chart"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-bulb"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-calendar"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-control-end"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-control-forward"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-control-pause"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-control-play"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-control-rewind"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-control-start"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-cursor"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-dislike"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-equalizer"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-graph"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-grid"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-home"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-like"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-list"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-login"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-logout"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-loop"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-microphone"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-music-tone"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-music-tone-alt"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-note"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-pencil"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-pie-chart"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-question"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-rocket"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-share"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-share-alt"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-shuffle"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-size-actual"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-size-fullscreen"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-support"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-tag"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-trash"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-umbrella"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-wrench"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-ban"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-bubble"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-camcorder"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-camera"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-check"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-clock"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-close"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-cloud-download"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-cloud-upload"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-doc"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-envelope"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-eye"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-flag"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-folder"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-heart"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-info"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-key"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-link"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-lock"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-lock-open"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-magnifier"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-magnifier-add"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-magnifier-remove"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-paper-clip"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-paper-plane"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-plus"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-pointer"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-power"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-refresh"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-reload"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-settings"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-star"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-symbol-female"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-symbol-male"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-target"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-volume-1"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-volume-2"></i>
                                                </li>

                                                <li>
                                                    <i class="icon-volume-off"></i>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="tab-pane glyphicons-demo" id="blue_tab_2_content">
                                            <ul class="bs-glyphicons bs-glyphicons-list">
                                                <li>
                                                    <i class="fa fa-500px"></i></li>
                                                <li>
                                                    <i class="fa fa-amazon"></i></li>
                                                <li>
                                                    <i class="fa fa-balance-scale"></i></li>
                                                <li>
                                                    <i class="fa fa-battery-0"></i></li>
                                                <li>
                                                    <i class="fa fa-battery-1"></i></li>
                                                <li>
                                                    <i class="fa fa-battery-2"></i></li>
                                                <li>
                                                    <i class="fa fa-battery-3"></i></li>
                                                <li>
                                                    <i class="fa fa-battery-4"></i></li>
                                                <li>
                                                    <i class="fa fa-battery-empty"></i></li>
                                                <li>
                                                    <i class="fa fa-battery-full"></i></li>
                                                <li>
                                                    <i class="fa fa-battery-half"></i></li>
                                                <li>
                                                    <i class="fa fa-battery-quarter"></i></li>
                                                <li>
                                                    <i class="fa fa-battery-three-quarters"></i></li>
                                                <li>
                                                    <i class="fa fa-black-tie"></i></li>
                                                <li>
                                                    <i class="fa fa-calendar-check-o"></i></li>
                                                <li>
                                                    <i class="fa fa-calendar-minus-o"></i></li>
                                                <li>
                                                    <i class="fa fa-calendar-plus-o"></i></li>
                                                <li>
                                                    <i class="fa fa-calendar-times-o"></i></li>
                                                <li>
                                                    <i class="fa fa-cc-diners-club"></i></li>
                                                <li>
                                                    <i class="fa fa-cc-jcb"></i></li>
                                                <li>
                                                    <i class="fa fa-chrome"></i></li>
                                                <li>
                                                    <i class="fa fa-clone"></i></li>
                                                <li>
                                                    <i class="fa fa-commenting"></i></li>
                                                <li>
                                                    <i class="fa fa-commenting-o"></i></li>
                                                <li>
                                                    <i class="fa fa-contao"></i></li>
                                                <li>
                                                    <i class="fa fa-creative-commons"></i></li>
                                                <li>
                                                    <i class="fa fa-expeditedssl"></i></li>
                                                <li>
                                                    <i class="fa fa-firefox"></i></li>
                                                <li>
                                                    <i class="fa fa-fonticons"></i></li>
                                                <li>
                                                    <i class="fa fa-genderless"></i></li>
                                                <li>
                                                    <i class="fa fa-get-pocket"></i></li>
                                                <li>
                                                    <i class="fa fa-gg"></i></li>
                                                <li>
                                                    <i class="fa fa-gg-circle"></i></li>
                                                <li>
                                                    <i class="fa fa-hand-grab-o"></i></li>
                                                <li>
                                                    <i class="fa fa-hand-lizard-o"></i></li>
                                                <li>
                                                    <i class="fa fa-hand-paper-o"></i></li>
                                                <li>
                                                    <i class="fa fa-hand-peace-o"></i></li>
                                                <li>
                                                    <i class="fa fa-hand-pointer-o"></i></li>
                                                <li>
                                                    <i class="fa fa-hand-rock-o"></i></li>
                                                <li>
                                                    <i class="fa fa-hand-scissors-o"></i></li>
                                                <li>
                                                    <i class="fa fa-hand-spock-o"></i></li>
                                                <li>
                                                    <i class="fa fa-hand-stop-o"></i></li>
                                                <li>
                                                    <i class="fa fa-hourglass"></i></li>
                                                <li>
                                                    <i class="fa fa-hourglass-1"></i></li>
                                                <li>
                                                    <i class="fa fa-hourglass-2"></i></li>
                                                <li>
                                                    <i class="fa fa-hourglass-3"></i></li>
                                                <li>
                                                    <i class="fa fa-hourglass-end"></i></li>
                                                <li>
                                                    <i class="fa fa-hourglass-half"></i></li>
                                                <li>
                                                    <i class="fa fa-hourglass-o"></i></li>
                                                <li>
                                                    <i class="fa fa-hourglass-start"></i></li>
                                                <li>
                                                    <i class="fa fa-houzz"></i></li>
                                                <li>
                                                    <i class="fa fa-i-cursor"></i></li>
                                                <li>
                                                    <i class="fa fa-industry"></i></li>
                                                <li>
                                                    <i class="fa fa-internet-explorer"></i></li>
                                                <li>
                                                    <i class="fa fa-map"></i></li>
                                                <li>
                                                    <i class="fa fa-map-o"></i></li>
                                                <li>
                                                    <i class="fa fa-map-pin"></i></li>
                                                <li>
                                                    <i class="fa fa-map-signs"></i></li>
                                                <li>
                                                    <i class="fa fa-mouse-pointer"></i></li>
                                                <li>
                                                    <i class="fa fa-object-group"></i></li>
                                                <li>
                                                    <i class="fa fa-object-ungroup"></i></li>
                                                <li>
                                                    <i class="fa fa-odnoklassniki"></i></li>
                                                <li>
                                                    <i class="fa fa-odnoklassniki-square"></i></li>
                                                <li>
                                                    <i class="fa fa-opencart"></i></li>
                                                <li>
                                                    <i class="fa fa-opera"></i></li>
                                                <li>
                                                    <i class="fa fa-optin-monster"></i></li>
                                                <li>
                                                    <i class="fa fa-registered"></i></li>
                                                <li>
                                                    <i class="fa fa-safari"></i></li>
                                                <li>
                                                    <i class="fa fa-sticky-note"></i></li>
                                                <li>
                                                    <i class="fa fa-sticky-note-o"></i></li>
                                                <li>
                                                    <i class="fa fa-television"></i></li>
                                                <li>
                                                    <i class="fa fa-trademark"></i></li>
                                                <li>
                                                    <i class="fa fa-tripadvisor"></i></li>
                                                <li>
                                                    <i class="fa fa-tv"></i></li>
                                                <li>
                                                    <i class="fa fa-vimeo"></i></li>
                                                <li>
                                                    <i class="fa fa-wikipedia-w"></i></li>
                                                <li>
                                                    <i class="fa fa-y-combinator"></i></li>
                                                <li>
                                                    <i class="fa fa-yc"></i></li>
                                                <li>
                                                    <i class="fa fa-adjust"></i></li>
                                                <li>
                                                    <i class="fa fa-anchor"></i></li>
                                                <li>
                                                    <i class="fa fa-archive"></i></li>
                                                <li>
                                                    <i class="fa fa-area-chart"></i></li>
                                                <li>
                                                    <i class="fa fa-arrows"></i></li>
                                                <li>
                                                    <i class="fa fa-arrows-h"></i></li>
                                                <li>
                                                    <i class="fa fa-arrows-v"></i></li>
                                                <li>
                                                    <i class="fa fa-asterisk"></i></li>
                                                <li>
                                                    <i class="fa fa-at"></i></li>
                                                <li>
                                                    <i class="fa fa-automobile"></i></li>
                                                <li>
                                                    <i class="fa fa-balance-scale"></i></li>
                                                <li>
                                                    <i class="fa fa-ban"></i></li>
                                                <li>
                                                    <i class="fa fa-bank"></i></li>
                                                <li>
                                                    <i class="fa fa-bar-chart"></i></li>
                                                <li>
                                                    <i class="fa fa-bar-chart-o"></i></li>
                                                <li>
                                                    <i class="fa fa-barcode"></i></li>
                                                <li>
                                                    <i class="fa fa-bars"></i></li>
                                                <li>
                                                    <i class="fa fa-battery-0"></i></li>
                                                <li>
                                                    <i class="fa fa-battery-1"></i></li>
                                                <li>
                                                    <i class="fa fa-battery-2"></i></li>
                                                <li>
                                                    <i class="fa fa-battery-3"></i></li>
                                                <li>
                                                    <i class="fa fa-battery-4"></i></li>
                                                <li>
                                                    <i class="fa fa-battery-empty"></i></li>
                                                <li>
                                                    <i class="fa fa-battery-full"></i></li>
                                                <li>
                                                    <i class="fa fa-battery-half"></i></li>
                                                <li>
                                                    <i class="fa fa-battery-quarter"></i></li>
                                                <li>
                                                    <i class="fa fa-battery-three-quarters"></i></li>
                                                <li>
                                                    <i class="fa fa-bed"></i></li>
                                                <li>
                                                    <i class="fa fa-beer"></i></li>
                                                <li>
                                                    <i class="fa fa-bell"></i></li>
                                                <li>
                                                    <i class="fa fa-bell-o"></i></li>
                                                <li>
                                                    <i class="fa fa-bell-slash"></i></li>
                                                <li>
                                                    <i class="fa fa-bell-slash-o"></i></li>
                                                <li>
                                                    <i class="fa fa-bicycle"></i></li>
                                                <li>
                                                    <i class="fa fa-binoculars"></i></li>
                                                <li>
                                                    <i class="fa fa-birthday-cake"></i></li>
                                                <li>
                                                    <i class="fa fa-bolt"></i></li>
                                                <li>
                                                    <i class="fa fa-bomb"></i></li>
                                                <li>
                                                    <i class="fa fa-book"></i></li>
                                                <li>
                                                    <i class="fa fa-bookmark"></i></li>
                                                <li>
                                                    <i class="fa fa-bookmark-o"></i></li>
                                                <li>
                                                    <i class="fa fa-briefcase"></i></li>
                                                <li>
                                                    <i class="fa fa-bug"></i></li>
                                                <li>
                                                    <i class="fa fa-building"></i></li>
                                                <li>
                                                    <i class="fa fa-building-o"></i></li>
                                                <li>
                                                    <i class="fa fa-bullhorn"></i></li>
                                                <li>
                                                    <i class="fa fa-bullseye"></i></li>
                                                <li>
                                                    <i class="fa fa-bus"></i></li>
                                                <li>
                                                    <i class="fa fa-cab"></i></li>
                                                <li>
                                                    <i class="fa fa-calculator"></i></li>
                                                <li>
                                                    <i class="fa fa-calendar"></i></li>
                                                <li>
                                                    <i class="fa fa-calendar-check-o"></i></li>
                                                <li>
                                                    <i class="fa fa-calendar-minus-o"></i></li>
                                                <li>
                                                    <i class="fa fa-calendar-o"></i></li>
                                                <li>
                                                    <i class="fa fa-calendar-plus-o"></i></li>
                                                <li>
                                                    <i class="fa fa-calendar-times-o"></i></li>
                                                <li>
                                                    <i class="fa fa-camera"></i></li>
                                                <li>
                                                    <i class="fa fa-camera-retro"></i></li>
                                                <li>
                                                    <i class="fa fa-car"></i></li>
                                                <li>
                                                    <i class="fa fa-caret-square-o-down"></i></li>
                                                <li>
                                                    <i class="fa fa-caret-square-o-left"></i></li>
                                                <li>
                                                    <i class="fa fa-caret-square-o-right"></i></li>
                                                <li>
                                                    <i class="fa fa-caret-square-o-up"></i></li>
                                                <li>
                                                    <i class="fa fa-cart-arrow-down"></i></li>
                                                <li>
                                                    <i class="fa fa-cart-plus"></i></li>
                                                <li>
                                                    <i class="fa fa-cc"></i></li>
                                                <li>
                                                    <i class="fa fa-certificate"></i></li>
                                                <li>
                                                    <i class="fa fa-check"></i></li>
                                                <li>
                                                    <i class="fa fa-check-circle"></i></li>
                                                <li>
                                                    <i class="fa fa-check-circle-o"></i></li>
                                                <li>
                                                    <i class="fa fa-check-square"></i></li>
                                                <li>
                                                    <i class="fa fa-check-square-o"></i></li>
                                                <li>
                                                    <i class="fa fa-child"></i></li>
                                                <li>
                                                    <i class="fa fa-circle"></i></li>
                                                <li>
                                                    <i class="fa fa-circle-o"></i></li>
                                                <li>
                                                    <i class="fa fa-circle-o-notch"></i></li>
                                                <li>
                                                    <i class="fa fa-circle-thin"></i></li>
                                                <li>
                                                    <i class="fa fa-clock-o"></i></li>
                                                <li>
                                                    <i class="fa fa-clone"></i></li>
                                                <li>
                                                    <i class="fa fa-close"></i></li>
                                                <li>
                                                    <i class="fa fa-cloud"></i></li>
                                                <li>
                                                    <i class="fa fa-cloud-download"></i></li>
                                                <li>
                                                    <i class="fa fa-cloud-upload"></i></li>
                                                <li>
                                                    <i class="fa fa-code"></i></li>
                                                <li>
                                                    <i class="fa fa-code-fork"></i></li>
                                                <li>
                                                    <i class="fa fa-coffee"></i></li>
                                                <li>
                                                    <i class="fa fa-cog"></i></li>
                                                <li>
                                                    <i class="fa fa-cogs"></i></li>
                                                <li>
                                                    <i class="fa fa-comment"></i></li>
                                                <li>
                                                    <i class="fa fa-comment-o"></i></li>
                                                <li>
                                                    <i class="fa fa-commenting"></i></li>
                                                <li>
                                                    <i class="fa fa-commenting-o"></i></li>
                                                <li>
                                                    <i class="fa fa-comments"></i></li>
                                                <li>
                                                    <i class="fa fa-comments-o"></i></li>
                                                <li>
                                                    <i class="fa fa-compass"></i></li>
                                                <li>
                                                    <i class="fa fa-copyright"></i></li>
                                                <li>
                                                    <i class="fa fa-creative-commons"></i></li>
                                                <li>
                                                    <i class="fa fa-credit-card"></i></li>
                                                <li>
                                                    <i class="fa fa-crop"></i></li>
                                                <li>
                                                    <i class="fa fa-crosshairs"></i></li>
                                                <li>
                                                    <i class="fa fa-cube"></i></li>
                                                <li>
                                                    <i class="fa fa-cubes"></i></li>
                                                <li>
                                                    <i class="fa fa-cutlery"></i></li>
                                                <li>
                                                    <i class="fa fa-dashboard"></i></li>
                                                <li>
                                                    <i class="fa fa-database"></i></li>
                                                <li>
                                                    <i class="fa fa-desktop"></i></li>
                                                <li>
                                                    <i class="fa fa-diamond"></i></li>
                                                <li>
                                                    <i class="fa fa-dot-circle-o"></i></li>
                                                <li>
                                                    <i class="fa fa-download"></i></li>
                                                <li>
                                                    <i class="fa fa-edit"></i></li>
                                                <li>
                                                    <i class="fa fa-ellipsis-h"></i></li>
                                                <li>
                                                    <i class="fa fa-ellipsis-v"></i></li>
                                                <li>
                                                    <i class="fa fa-envelope"></i></li>
                                                <li>
                                                    <i class="fa fa-envelope-o"></i></li>
                                                <li>
                                                    <i class="fa fa-envelope-square"></i></li>
                                                <li>
                                                    <i class="fa fa-eraser"></i></li>
                                                <li>
                                                    <i class="fa fa-exchange"></i></li>
                                                <li>
                                                    <i class="fa fa-exclamation"></i></li>
                                                <li>
                                                    <i class="fa fa-exclamation-circle"></i></li>
                                                <li>
                                                    <i class="fa fa-exclamation-triangle"></i></li>
                                                <li>
                                                    <i class="fa fa-external-link"></i></li>
                                                <li>
                                                    <i class="fa fa-external-link-square"></i></li>
                                                <li>
                                                    <i class="fa fa-eye"></i></li>
                                                <li>
                                                    <i class="fa fa-eye-slash"></i></li>
                                                <li>
                                                    <i class="fa fa-eyedropper"></i></li>
                                                <li>
                                                    <i class="fa fa-fax"></i></li>
                                                <li>
                                                    <i class="fa fa-feed"></i></li>
                                                <li>
                                                    <i class="fa fa-female"></i></li>
                                                <li>
                                                    <i class="fa fa-fighter-jet"></i></li>
                                                <li>
                                                    <i class="fa fa-file-archive-o"></i></li>
                                                <li>
                                                    <i class="fa fa-file-audio-o"></i></li>
                                                <li>
                                                    <i class="fa fa-file-code-o"></i></li>
                                                <li>
                                                    <i class="fa fa-file-excel-o"></i></li>
                                                <li>
                                                    <i class="fa fa-file-image-o"></i></li>
                                                <li>
                                                    <i class="fa fa-file-movie-o"></i></li>
                                                <li>
                                                    <i class="fa fa-file-pdf-o"></i></li>
                                                <li>
                                                    <i class="fa fa-file-photo-o"></i></li>
                                                <li>
                                                    <i class="fa fa-file-picture-o"></i></li>
                                                <li>
                                                    <i class="fa fa-file-powerpoint-o"></i></li>
                                                <li>
                                                    <i class="fa fa-file-sound-o"></i></li>
                                                <li>
                                                    <i class="fa fa-file-video-o"></i></li>
                                                <li>
                                                    <i class="fa fa-file-word-o"></i></li>
                                                <li>
                                                    <i class="fa fa-file-zip-o"></i></li>
                                                <li>
                                                    <i class="fa fa-film"></i></li>
                                                <li>
                                                    <i class="fa fa-filter"></i></li>
                                                <li>
                                                    <i class="fa fa-fire"></i></li>
                                                <li>
                                                    <i class="fa fa-fire-extinguisher"></i></li>
                                                <li>
                                                    <i class="fa fa-flag"></i></li>
                                                <li>
                                                    <i class="fa fa-flag-checkered"></i></li>
                                                <li>
                                                    <i class="fa fa-flag-o"></i></li>
                                                <li>
                                                    <i class="fa fa-flash"></i></li>
                                                <li>
                                                    <i class="fa fa-flask"></i></li>
                                                <li>
                                                    <i class="fa fa-folder"></i></li>
                                                <li>
                                                    <i class="fa fa-folder-o"></i></li>
                                                <li>
                                                    <i class="fa fa-folder-open"></i></li>
                                                <li>
                                                    <i class="fa fa-folder-open-o"></i></li>
                                                <li>
                                                    <i class="fa fa-frown-o"></i></li>
                                                <li>
                                                    <i class="fa fa-futbol-o"></i></li>
                                                <li>
                                                    <i class="fa fa-gamepad"></i></li>
                                                <li>
                                                    <i class="fa fa-gavel"></i></li>
                                                <li>
                                                    <i class="fa fa-gear"></i></li>
                                                <li>
                                                    <i class="fa fa-gears"></i></li>
                                                <li>
                                                    <i class="fa fa-gift"></i></li>
                                                <li>
                                                    <i class="fa fa-glass"></i></li>
                                                <li>
                                                    <i class="fa fa-globe"></i></li>
                                                <li>
                                                    <i class="fa fa-graduation-cap"></i></li>
                                                <li>
                                                    <i class="fa fa-group"></i></li>
                                                <li>
                                                    <i class="fa fa-hand-grab-o"></i></li>
                                                <li>
                                                    <i class="fa fa-hand-lizard-o"></i></li>
                                                <li>
                                                    <i class="fa fa-hand-paper-o"></i></li>
                                                <li>
                                                    <i class="fa fa-hand-peace-o"></i></li>
                                                <li>
                                                    <i class="fa fa-hand-pointer-o"></i></li>
                                                <li>
                                                    <i class="fa fa-hand-rock-o"></i></li>
                                                <li>
                                                    <i class="fa fa-hand-scissors-o"></i></li>
                                                <li>
                                                    <i class="fa fa-hand-spock-o"></i></li>
                                                <li>
                                                    <i class="fa fa-hand-stop-o"></i></li>
                                                <li>
                                                    <i class="fa fa-hdd-o"></i></li>
                                                <li>
                                                    <i class="fa fa-headphones"></i></li>
                                                <li>
                                                    <i class="fa fa-heart"></i></li>
                                                <li>
                                                    <i class="fa fa-heart-o"></i></li>
                                                <li>
                                                    <i class="fa fa-heartbeat"></i></li>
                                                <li>
                                                    <i class="fa fa-history"></i></li>
                                                <li>
                                                    <i class="fa fa-home"></i></li>
                                                <li>
                                                    <i class="fa fa-hotel"></i></li>
                                                <li>
                                                    <i class="fa fa-hourglass"></i></li>
                                                <li>
                                                    <i class="fa fa-hourglass-1"></i></li>
                                                <li>
                                                    <i class="fa fa-hourglass-2"></i></li>
                                                <li>
                                                    <i class="fa fa-hourglass-3"></i></li>
                                                <li>
                                                    <i class="fa fa-hourglass-end"></i></li>
                                                <li>
                                                    <i class="fa fa-hourglass-half"></i></li>
                                                <li>
                                                    <i class="fa fa-hourglass-o"></i></li>
                                                <li>
                                                    <i class="fa fa-hourglass-start"></i></li>
                                                <li>
                                                    <i class="fa fa-i-cursor"></i></li>
                                                <li>
                                                    <i class="fa fa-image"></i></li>
                                                <li>
                                                    <i class="fa fa-inbox"></i></li>
                                                <li>
                                                    <i class="fa fa-industry"></i></li>
                                                <li>
                                                    <i class="fa fa-info"></i></li>
                                                <li>
                                                    <i class="fa fa-info-circle"></i></li>
                                                <li>
                                                    <i class="fa fa-institution"></i></li>
                                                <li>
                                                    <i class="fa fa-key"></i></li>
                                                <li>
                                                    <i class="fa fa-keyboard-o"></i></li>
                                                <li>
                                                    <i class="fa fa-language"></i></li>
                                                <li>
                                                    <i class="fa fa-laptop"></i></li>
                                                <li>
                                                    <i class="fa fa-leaf"></i></li>
                                                <li>
                                                    <i class="fa fa-legal"></i></li>
                                                <li>
                                                    <i class="fa fa-lemon-o"></i></li>
                                                <li>
                                                    <i class="fa fa-level-down"></i></li>
                                                <li>
                                                    <i class="fa fa-level-up"></i></li>
                                                <li>
                                                    <i class="fa fa-life-bouy"></i></li>
                                                <li>
                                                    <i class="fa fa-life-buoy"></i></li>
                                                <li>
                                                    <i class="fa fa-life-ring"></i></li>
                                                <li>
                                                    <i class="fa fa-life-saver"></i></li>
                                                <li>
                                                    <i class="fa fa-lightbulb-o"></i></li>
                                                <li>
                                                    <i class="fa fa-line-chart"></i></li>
                                                <li>
                                                    <i class="fa fa-location-arrow"></i></li>
                                                <li>
                                                    <i class="fa fa-lock"></i></li>
                                                <li>
                                                    <i class="fa fa-magic"></i></li>
                                                <li>
                                                    <i class="fa fa-magnet"></i></li>
                                                <li>
                                                    <i class="fa fa-mail-forward"></i></li>
                                                <li>
                                                    <i class="fa fa-mail-reply"></i></li>
                                                <li>
                                                    <i class="fa fa-mail-reply-all"></i></li>
                                                <li>
                                                    <i class="fa fa-male"></i></li>
                                                <li>
                                                    <i class="fa fa-map"></i></li>
                                                <li>
                                                    <i class="fa fa-map-marker"></i></li>
                                                <li>
                                                    <i class="fa fa-map-o"></i></li>
                                                <li>
                                                    <i class="fa fa-map-pin"></i></li>
                                                <li>
                                                    <i class="fa fa-map-signs"></i></li>
                                                <li>
                                                    <i class="fa fa-meh-o"></i></li>
                                                <li>
                                                    <i class="fa fa-microphone"></i></li>
                                                <li>
                                                    <i class="fa fa-microphone-slash"></i></li>
                                                <li>
                                                    <i class="fa fa-minus"></i></li>
                                                <li>
                                                    <i class="fa fa-minus-circle"></i></li>
                                                <li>
                                                    <i class="fa fa-minus-square"></i></li>
                                                <li>
                                                    <i class="fa fa-minus-square-o"></i></li>
                                                <li>
                                                    <i class="fa fa-mobile"></i></li>
                                                <li>
                                                    <i class="fa fa-mobile-phone"></i></li>
                                                <li>
                                                    <i class="fa fa-money"></i></li>
                                                <li>
                                                    <i class="fa fa-moon-o"></i></li>
                                                <li>
                                                    <i class="fa fa-mortar-board"></i></li>
                                                <li>
                                                    <i class="fa fa-motorcycle"></i></li>
                                                <li>
                                                    <i class="fa fa-mouse-pointer"></i></li>
                                                <li>
                                                    <i class="fa fa-music"></i></li>
                                                <li>
                                                    <i class="fa fa-navicon"></i></li>
                                                <li>
                                                    <i class="fa fa-newspaper-o"></i></li>
                                                <li>
                                                    <i class="fa fa-object-group"></i></li>
                                                <li>
                                                    <i class="fa fa-object-ungroup"></i></li>
                                                <li>
                                                    <i class="fa fa-paint-brush"></i></li>
                                                <li>
                                                    <i class="fa fa-paper-plane"></i></li>
                                                <li>
                                                    <i class="fa fa-paper-plane-o"></i></li>
                                                <li>
                                                    <i class="fa fa-paw"></i></li>
                                                <li>
                                                    <i class="fa fa-pencil"></i></li>
                                                <li>
                                                    <i class="fa fa-pencil-square"></i></li>
                                                <li>
                                                    <i class="fa fa-pencil-square-o"></i></li>
                                                <li>
                                                    <i class="fa fa-phone"></i></li>
                                                <li>
                                                    <i class="fa fa-phone-square"></i></li>
                                                <li>
                                                    <i class="fa fa-photo"></i></li>
                                                <li>
                                                    <i class="fa fa-picture-o"></i></li>
                                                <li>
                                                    <i class="fa fa-pie-chart"></i></li>
                                                <li>
                                                    <i class="fa fa-plane"></i></li>
                                                <li>
                                                    <i class="fa fa-plug"></i></li>
                                                <li>
                                                    <i class="fa fa-plus"></i></li>
                                                <li>
                                                    <i class="fa fa-plus-circle"></i></li>
                                                <li>
                                                    <i class="fa fa-plus-square"></i></li>
                                                <li>
                                                    <i class="fa fa-plus-square-o"></i></li>
                                                <li>
                                                    <i class="fa fa-power-off"></i></li>
                                                <li>
                                                    <i class="fa fa-print"></i></li>
                                                <li>
                                                    <i class="fa fa-puzzle-piece"></i></li>
                                                <li>
                                                    <i class="fa fa-qrcode"></i></li>
                                                <li>
                                                    <i class="fa fa-question"></i></li>
                                                <li>
                                                    <i class="fa fa-question-circle"></i></li>
                                                <li>
                                                    <i class="fa fa-quote-left"></i></li>
                                                <li>
                                                    <i class="fa fa-quote-right"></i></li>
                                                <li>
                                                    <i class="fa fa-random"></i></li>
                                                <li>
                                                    <i class="fa fa-recycle"></i></li>
                                                <li>
                                                    <i class="fa fa-refresh"></i></li>
                                                <li>
                                                    <i class="fa fa-registered"></i></li>
                                                <li>
                                                    <i class="fa fa-remove"></i></li>
                                                <li>
                                                    <i class="fa fa-reorder"></i></li>
                                                <li>
                                                    <i class="fa fa-reply"></i></li>
                                                <li>
                                                    <i class="fa fa-reply-all"></i></li>
                                                <li>
                                                    <i class="fa fa-retweet"></i></li>
                                                <li>
                                                    <i class="fa fa-road"></i></li>
                                                <li>
                                                    <i class="fa fa-rocket"></i></li>
                                                <li>
                                                    <i class="fa fa-rss"></i></li>
                                                <li>
                                                    <i class="fa fa-rss-square"></i></li>
                                                <li>
                                                    <i class="fa fa-search"></i></li>
                                                <li>
                                                    <i class="fa fa-search-minus"></i></li>
                                                <li>
                                                    <i class="fa fa-search-plus"></i></li>
                                                <li>
                                                    <i class="fa fa-send"></i></li>
                                                <li>
                                                    <i class="fa fa-send-o"></i></li>
                                                <li>
                                                    <i class="fa fa-server"></i></li>
                                                <li>
                                                    <i class="fa fa-share"></i></li>
                                                <li>
                                                    <i class="fa fa-share-alt"></i></li>
                                                <li>
                                                    <i class="fa fa-share-alt-square"></i></li>
                                                <li>
                                                    <i class="fa fa-share-square"></i></li>
                                                <li>
                                                    <i class="fa fa-share-square-o"></i></li>
                                                <li>
                                                    <i class="fa fa-shield"></i></li>
                                                <li>
                                                    <i class="fa fa-ship"></i></li>
                                                <li>
                                                    <i class="fa fa-shopping-cart"></i></li>
                                                <li>
                                                    <i class="fa fa-sign-in"></i></li>
                                                <li>
                                                    <i class="fa fa-sign-out"></i></li>
                                                <li>
                                                    <i class="fa fa-signal"></i></li>
                                                <li>
                                                    <i class="fa fa-sitemap"></i></li>
                                                <li>
                                                    <i class="fa fa-sliders"></i></li>
                                                <li>
                                                    <i class="fa fa-smile-o"></i></li>
                                                <li>
                                                    <i class="fa fa-soccer-ball-o"></i></li>
                                                <li>
                                                    <i class="fa fa-sort"></i></li>
                                                <li>
                                                    <i class="fa fa-sort-alpha-asc"></i></li>
                                                <li>
                                                    <i class="fa fa-sort-alpha-desc"></i></li>
                                                <li>
                                                    <i class="fa fa-sort-amount-asc"></i></li>
                                                <li>
                                                    <i class="fa fa-sort-amount-desc"></i></li>
                                                <li>
                                                    <i class="fa fa-sort-asc"></i></li>
                                                <li>
                                                    <i class="fa fa-sort-desc"></i></li>
                                                <li>
                                                    <i class="fa fa-sort-down"></i></li>
                                                <li>
                                                    <i class="fa fa-sort-numeric-asc"></i></li>
                                                <li>
                                                    <i class="fa fa-sort-numeric-desc"></i></li>
                                                <li>
                                                    <i class="fa fa-sort-up"></i></li>
                                                <li>
                                                    <i class="fa fa-space-shuttle"></i></li>
                                                <li>
                                                    <i class="fa fa-spinner"></i></li>
                                                <li>
                                                    <i class="fa fa-spoon"></i></li>
                                                <li>
                                                    <i class="fa fa-square"></i></li>
                                                <li>
                                                    <i class="fa fa-square-o"></i></li>
                                                <li>
                                                    <i class="fa fa-star"></i></li>
                                                <li>
                                                    <i class="fa fa-star-half"></i></li>
                                                <li>
                                                    <i class="fa fa-star-half-empty"></i></li>
                                                <li>
                                                    <i class="fa fa-star-half-full"></i></li>
                                                <li>
                                                    <i class="fa fa-star-half-o"></i></li>
                                                <li>
                                                    <i class="fa fa-star-o"></i></li>
                                                <li>
                                                    <i class="fa fa-sticky-note"></i></li>
                                                <li>
                                                    <i class="fa fa-sticky-note-o"></i></li>
                                                <li>
                                                    <i class="fa fa-street-view"></i></li>
                                                <li>
                                                    <i class="fa fa-suitcase"></i></li>
                                                <li>
                                                    <i class="fa fa-sun-o"></i></li>
                                                <li>
                                                    <i class="fa fa-support"></i></li>
                                                <li>
                                                    <i class="fa fa-tablet"></i></li>
                                                <li>
                                                    <i class="fa fa-tachometer"></i></li>
                                                <li>
                                                    <i class="fa fa-tag"></i></li>
                                                <li>
                                                    <i class="fa fa-tags"></i></li>
                                                <li>
                                                    <i class="fa fa-tasks"></i></li>
                                                <li>
                                                    <i class="fa fa-taxi"></i></li>
                                                <li>
                                                    <i class="fa fa-television"></i></li>
                                                <li>
                                                    <i class="fa fa-terminal"></i></li>
                                                <li>
                                                    <i class="fa fa-thumb-tack"></i></li>
                                                <li>
                                                    <i class="fa fa-thumbs-down"></i></li>
                                                <li>
                                                    <i class="fa fa-thumbs-o-down"></i></li>
                                                <li>
                                                    <i class="fa fa-thumbs-o-up"></i></li>
                                                <li>
                                                    <i class="fa fa-thumbs-up"></i></li>
                                                <li>
                                                    <i class="fa fa-ticket"></i></li>
                                                <li>
                                                    <i class="fa fa-times"></i></li>
                                                <li>
                                                    <i class="fa fa-times-circle"></i></li>
                                                <li>
                                                    <i class="fa fa-times-circle-o"></i></li>
                                                <li>
                                                    <i class="fa fa-tint"></i></li>
                                                <li>
                                                    <i class="fa fa-toggle-down"></i></li>
                                                <li>
                                                    <i class="fa fa-toggle-left"></i></li>
                                                <li>
                                                    <i class="fa fa-toggle-off"></i></li>
                                                <li>
                                                    <i class="fa fa-toggle-on"></i></li>
                                                <li>
                                                    <i class="fa fa-toggle-right"></i></li>
                                                <li>
                                                    <i class="fa fa-toggle-up"></i></li>
                                                <li>
                                                    <i class="fa fa-trademark"></i></li>
                                                <li>
                                                    <i class="fa fa-trash"></i></li>
                                                <li>
                                                    <i class="fa fa-trash-o"></i></li>
                                                <li>
                                                    <i class="fa fa-tree"></i></li>
                                                <li>
                                                    <i class="fa fa-trophy"></i></li>
                                                <li>
                                                    <i class="fa fa-truck"></i></li>
                                                <li>
                                                    <i class="fa fa-tty"></i></li>
                                                <li>
                                                    <i class="fa fa-tv"></i></li>
                                                <li>
                                                    <i class="fa fa-umbrella"></i></li>
                                                <li>
                                                    <i class="fa fa-university"></i></li>
                                                <li>
                                                    <i class="fa fa-unlock"></i></li>
                                                <li>
                                                    <i class="fa fa-unlock-alt"></i></li>
                                                <li>
                                                    <i class="fa fa-unsorted"></i></li>
                                                <li>
                                                    <i class="fa fa-upload"></i></li>
                                                <li>
                                                    <i class="fa fa-user"></i></li>
                                                <li>
                                                    <i class="fa fa-user-plus"></i></li>
                                                <li>
                                                    <i class="fa fa-user-secret"></i></li>
                                                <li>
                                                    <i class="fa fa-user-times"></i></li>
                                                <li>
                                                    <i class="fa fa-users"></i></li>
                                                <li>
                                                    <i class="fa fa-video-camera"></i></li>
                                                <li>
                                                    <i class="fa fa-volume-down"></i></li>
                                                <li>
                                                    <i class="fa fa-volume-off"></i></li>
                                                <li>
                                                    <i class="fa fa-volume-up"></i></li>
                                                <li>
                                                    <i class="fa fa-warning"></i></li>
                                                <li>
                                                    <i class="fa fa-wheelchair"></i></li>
                                                <li>
                                                    <i class="fa fa-wifi"></i></li>
                                                <li>
                                                    <i class="fa fa-wrench"></i></li>
                                                <li>
                                                    <i class="fa fa-file"></i></li>
                                                <li>
                                                    <i class="fa fa-file-archive-o"></i></li>
                                                <li>
                                                    <i class="fa fa-file-audio-o"></i></li>
                                                <li>
                                                    <i class="fa fa-file-code-o"></i></li>
                                                <li>
                                                    <i class="fa fa-file-excel-o"></i></li>
                                                <li>
                                                    <i class="fa fa-file-image-o"></i></li>
                                                <li>
                                                    <i class="fa fa-file-movie-o"></i></li>
                                                <li>
                                                    <i class="fa fa-file-o"></i></li>
                                                <li>
                                                    <i class="fa fa-file-pdf-o"></i></li>
                                                <li>
                                                    <i class="fa fa-file-photo-o"></i></li>
                                                <li>
                                                    <i class="fa fa-file-picture-o"></i></li>
                                                <li>
                                                    <i class="fa fa-file-powerpoint-o"></i></li>
                                                <li>
                                                    <i class="fa fa-file-sound-o"></i></li>
                                                <li>
                                                    <i class="fa fa-file-text"></i></li>
                                                <li>
                                                    <i class="fa fa-file-text-o"></i></li>
                                                <li>
                                                    <i class="fa fa-file-video-o"></i></li>
                                                <li>
                                                    <i class="fa fa-file-word-o"></i></li>
                                                <li>
                                                    <i class="fa fa-file-zip-o"></i></li>
                                                <li>
                                                    <i class="fa fa-area-chart"></i></li>
                                                <li>
                                                    <i class="fa fa-bar-chart"></i></li>
                                                <li>
                                                    <i class="fa fa-bar-chart-o"></i></li>
                                                <li>
                                                    <i class="fa fa-line-chart"></i></li>
                                                <li>
                                                    <i class="fa fa-pie-chart"></i></li>
                                            </ul>
                                        </div>
                                        <div class="tab-pane glyphicons-demo" id="blue_tab_3_content">
                                            <ul class="bs-glyphicons bs-glyphicons-list">
                                                <li>
                                                    <i class="glyphicon glyphicon-asterisk"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-plus"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-euro"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-minus"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-cloud"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-envelope"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-pencil"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-glass"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-music"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-search"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-heart"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-star"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-star-empty"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-user"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-film"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-th-large"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-th"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-th-list"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-ok"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-remove"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-zoom-in"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-zoom-out"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-off"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-signal"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-cog"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-trash"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-home"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-file"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-time"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-road"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-download-alt"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-download"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-upload"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-inbox"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-play-circle"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-repeat"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-refresh"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-list-alt"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-lock"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-flag"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-headphones"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-volume-off"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-volume-down"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-volume-up"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-qrcode"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-barcode"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-tag"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-tags"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-book"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-bookmark"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-print"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-camera"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-font"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-bold"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-italic"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-text-height"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-text-width"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-align-left"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-align-center"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-align-right"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-align-justify"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-list"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-indent-left"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-indent-right"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-facetime-video"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-picture"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-map-marker"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-adjust"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-tint"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-edit"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-share"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-check"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-move"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-step-backward"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-fast-backward"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-backward"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-play"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-pause"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-stop"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-forward"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-fast-forward"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-step-forward"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-eject"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-chevron-left"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-chevron-right"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-plus-sign"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-minus-sign"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-remove-sign"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-ok-sign"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-question-sign"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-info-sign"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-screenshot"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-remove-circle"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-ok-circle"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-ban-circle"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-arrow-left"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-arrow-right"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-arrow-up"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-arrow-down"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-share-alt"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-resize-full"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-resize-small"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-exclamation-sign"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-gift"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-leaf"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-fire"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-eye-open"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-eye-close"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-warning-sign"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-plane"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-calendar"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-random"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-comment"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-magnet"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-chevron-up"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-chevron-down"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-retweet"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-shopping-cart"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-folder-close"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-folder-open"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-resize-vertical"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-resize-horizontal"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-hdd"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-bullhorn"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-bell"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-certificate"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-thumbs-up"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-thumbs-down"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-hand-right"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-hand-left"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-hand-up"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-hand-down"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-circle-arrow-right"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-circle-arrow-left"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-circle-arrow-up"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-circle-arrow-down"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-globe"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-wrench"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-tasks"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-filter"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-briefcase"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-fullscreen"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-dashboard"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-paperclip"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-heart-empty"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-link"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-phone"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-pushpin"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-usd"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-gbp"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-sort"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-sort-by-alphabet"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-sort-by-alphabet-alt"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-sort-by-order"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-sort-by-order-alt"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-sort-by-attributes"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-sort-by-attributes-alt"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-unchecked"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-expand"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-collapse-down"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-collapse-up"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-log-in"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-flash"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-log-out"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-new-window"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-record"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-save"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-open"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-saved"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-import"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-export"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-send"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-floppy-disk"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-floppy-saved"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-floppy-remove"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-floppy-save"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-floppy-open"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-credit-card"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-transfer"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-cutlery"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-header"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-compressed"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-earphone"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-phone-alt"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-tower"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-stats"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-sd-video"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-hd-video"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-subtitles"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-sound-stereo"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-sound-dolby"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-sound-5-1"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-sound-6-1"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-sound-7-1"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-copyright-mark"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-registration-mark"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-cloud-download"> </i>

                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-cloud-upload"> </i>
                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-tree-conifer"> </i>
                                                </li>
                                                <li>
                                                    <i class="glyphicon glyphicon-tree-deciduous"> </i>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-outline dark sbold uppercase" data-dismiss="modal">关闭</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 portlet light bordered" id="menuPreview">
                    <div class="portlet-title">
                        <div class="caption">
                            <span class="caption-subject font-grey-gallery sbold uppercase">
                                <i class="fa fa-hourglass-end"></i> 4.调整</span>
                            <span class="caption-helper">拖动设定您所需要的菜单结构...</span>
                        </div>
                        <div class="actions">
                            <div class="btn-group btn-group-devided" data-toggle="buttons" id="menuPreviewList_menu">
                                <button class="btn btn-transparent green btn-circle btn-sm toggle" data-action="expand-all">展开所有</button>
                                <button class="btn btn-transparent green btn-circle btn-sm toggle" data-action="collapse-all">折叠所有</button>
                            </div>
                        </div>
                    </div>
                    <div class="portlet-body">
                        <div class="row">
                            <div class="dd col-md-6" id="menuPreviewList">
                                <ol class="dd-list">
                                </ol>
                            </div>
                            <div class="col-md-6">
                                <div class="page-sidebar-wrapper">
                                    <div class="page-sidebar navbar-collapse collapse">
                                        <ul class="page-sidebar-menu font-yahei" id="menuPreviewDetail" data-keep-expanded="false" data-auto-scroll="true" data-slide-speed="200">
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6 portlet light bordered hide">
                    <div class="portlet-body">
                        <h3>序列化字段</h3>
                        <textarea id="menuPreviewList_output" class="form-control col-md-12 margin-bottom-10"></textarea>
                    </div>
                </div>
            </div>
        </div>
        <!-- END CONTENT BODY -->
    </div>
    <!-- END CONTENT -->
</div>
<!-- END CONTAINER -->