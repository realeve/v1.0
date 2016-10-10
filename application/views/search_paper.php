<!-- BEGIN STYLE CUSTOMIZER -->
<?php include("templates/themesetting.php");?>
<!-- END STYLE CUSTOMIZER -->
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
            <a href="#">钞纸质量信息查询</a>
        </li>
    </ul>
</div>

<h3 class="page-title"> 钞纸质量信息查询
    <small>数据来源：质量中心数据库 </small>
</h3>

<div class="row">
    <div class="col-md-12">
     <!-- BEGIN Portlet PORTLET-->
        <div class="portlet light bordered">
            <div class="portlet-title">
                <div class="caption">
                    <i class="icon-microphone font-blue-hoki"></i>
                    <span class="caption-subject bold font-blue-hoki uppercase"> 机检信息 </span>
                    <span class="caption-helper">纸机与切纸机在线检测...</span>
                </div>
                <div class="actions">
                    <div class="portlet-input input-inline input-small">
                        <div class="input-icon right">
                            <i class="icon-magnifier"></i>
                            <input type="text" class="form-control input-circle" name="reelNo" placeholder="输入轴号信息..."> </div>
                    </div>
                </div>
            </div>
            <div class="portlet-body">
                <div id="inspect" class="scroll" style="min-height:300px;">

                </div>
            </div>
        </div>
        <!-- END Portlet PORTLET-->
    </div>

    <div class="col-md-12">
      <div class="portlet mt-element-ribbon light portlet-fit bordered">
          <div class="ribbon ribbon-right ribbon-clip ribbon-shadow ribbon-border-dash-hor ribbon-color-info uppercase">
              <div class="ribbon-sub ribbon-clip ribbon-right"></div> 检测信息
          </div>
          <div class="portlet-title">
              <div class="tabbable-line">
                  <ul class="nav nav-tabs">
                      <li class="active">
                          <a href="#psc" data-toggle="tab" aria-expanded="false"> 物理站 </a>
                      </li>
                      <li>
                          <a href="#surface" data-toggle="tab" aria-expanded="true"> 物理外观 </a>
                      </li>
                      <li>
                          <a href="#abnormal" data-toggle="tab" aria-expanded="true"> 非常规指标 </a>
                      </li>
                      <li>
                          <a href="#validate" data-toggle="tab" aria-expanded="true"> 人工校验信息 </a>
                      </li>
                      <li>
                          <a href="#batchWaste" data-toggle="tab" aria-expanded="true"> 批量报废记录 </a>
                      </li>
                  </ul>
              </div>
          </div>
          <div class="portlet-body">
            <div class="tab-content" style="min-height:300px;">
                <div class="tab-pane active" id="psc">
                  <div class="row">
                    <div class="col-md-4" id="psc1"></div>
                    <div class="col-md-4" id="psc2"></div>
                    <div class="col-md-4" id="psc3"></div>
                  </div>
                  <div class="row">
                    <div class="col-md-4" id="psc4"></div>
                    <div class="col-md-4 mt-element-card margin-top-40">
                      <div class="mt-card-item bg-white">
                        <div class="mt-card-avatar">
                          <div id="lab"style="height:200px;width:100%;background:#fff"></div>
                        </div>
                        <div class="mt-card-content" id="labinfo">
                          <h3 class="mt-card-name"></h3>
                          <p class="mt-card-desc font-grey-mint">
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="tab-pane" id="surface">
                 <div class="row">
                    <div id="surface1" class="col-md-6">
                    </div>
                    <div id="surface2" class="col-md-6">
                    </div>
                  </div>
                </div>
                <div class="tab-pane" id="abnormal">

                </div>
                <div class="tab-pane" id="validate">

                </div>
                <div class="tab-pane" id="batchWaste">

                </div>
            </div>
          </div>
      </div>
    </div>

</div>

</div>
</div>