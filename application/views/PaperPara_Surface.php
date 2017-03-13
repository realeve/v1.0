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
						<a href="#">指标检验</a>
						<i class="fa fa-circle"></i>
					</li>
					<li>
						<a href="#">钞纸质量控制水平评价</a>
					</li>
				</ul>
				<div class="page-toolbar">
					<div class="btn-group pull-right">
						<a class="btn btn-fit-height grey-cascade">
						</a>
					</div>
				</div>
			</div>
			<h3 class="page-title">
			<span class="caption-subject bold uppercase" name="TableTitle"></span>  <small id="today"></small>
			</h3>
			<!-- END PAGE HEADER-->
			<!-- BEGIN PAGE CONTENT-->

			<form role="form" name="theForm" class="form-horizontal">
				<div class="portlet box blue-hoki">
					<div class="portlet-title">
						<div class="caption">
							<i class="icon-settings"></i>
							<span class="caption-subject bold uppercase">概述</span>
						</div>
						<div class="actions hidden-print">
							<a class="btn btn-circle btn-icon-only btn-default fullscreen" href="javascript:;" data-original-title="" title="">
							</a>
						</div>
					</div>
					<div class="portlet-body form">
						<div class="form-body row">
							<div class="col-md-6 form-group">
								<label class="col-md-3 control-label" for="form_control_1">序号</label>
								<div class="col-md-9">
									<input type="text" class="form-control" name="chk_ID" placeholder="" disabled>
									<div class="form-control-focus">
									</div>
								</div>
							</div>
							<div class="col-md-6 form-group">
								<label class="col-md-3 control-label">轴号</label>
								<div class="col-md-9">
									<input type="text" class="form-control uppercase" maxlength="8" placeholder="请在此输入轴号信息,如201500A" name="Reel_Code">
									<div class="form-control-focus">
									</div>
									<label class="hide">轴号</label>
								</div>
							</div>
							<div class="col-md-6 form-group">
								<label class="col-md-3 control-label" for="form_control_1">取样日期</label>
								<div class="col-md-9">
									<input class="form-control form-control-inline date-picker" name="rec_date" size="16" type="text"/>
									<div class="form-control-focus">
									</div>
								</div>
							</div>
							<div class="col-md-6 form-group">
								<label class="col-md-3 control-label">品种</label>
								<div class="col-md-9">
									<select class="form-control select2" name="prod_ID">
									</select>
									<div class="form-control-focus">
									</div>
								</div>
							</div>
							<div class="col-md-6 form-group">
								<label class="col-md-3 control-label">备注</label>
								<div class="col-md-9">
									<input type="text" class="form-control" placeholder="请在此输入备注信息" name="remark">
									<div class="form-control-focus">
									</div>
									<label class="hide">备注</label>
								</div>
							</div>
							<div class="col-md-6 form-group">
								<label class="col-md-3 control-label">检验员</label>
								<div class="col-md-9">
									<select class="form-control select2" name="oper_ID">
									</select>
									<div class="form-control-focus">
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="portlet light bordered">
					<div class="portlet-title">
						<div class="caption font-green">
							<i class="icon-pin font-green"></i>
							<span class="caption-subject bold uppercase"> 原始记录 <small>(请输入不满足以下条件的纸张张数) </small></span>
						</div>
						<div class="actions hidden-print">
							<a class="btn btn-circle btn-icon-only btn-default fullscreen" href="javascript:;" data-original-title="" title="">
							</a>
						</div>
					</div>
					<div class="portlet-body form">
						<div class="form-body row normalPara">
							<div class="col-md-3">
								<div class="form-group">
									<div class="col-md-12">
										<input type="text" name="checkbox1" class="form-control" placeholder="纸张尺寸">
										<span class="help-block">纵/横向尺寸偏差≤±1mm </span>
									</div>
								</div>
								<div class="form-group">
									<div class="col-md-12">
										<input type="text" name="checkbox2" class="form-control" placeholder="方正度偏差">
										<span class="help-block">方正度偏差≤1mm </span>
									</div>
								</div>
								<div class="form-group">
									<div class="col-md-12">
										<input type="text" name="checkbox3" class="form-control" placeholder="水印">
										<span class="help-block">水印无残缺 </span>
									</div>
								</div>
								<div class="form-group">
									<div class="col-md-12">
										<input type="text" name="checkbox4" class="form-control" placeholder="白水印">
										<span class="help-block">白水印无残缺 </span>
									</div>
								</div>
								<div class="form-group">
									<div class="col-md-12">
										<input type="text" name="checkbox5" class="form-control" placeholder="水印位置偏差">
										<span class="help-block">水印位置偏差≤2mm </span>
									</div>
								</div>
							</div>
							<div class="col-md-3">
								<div class="form-group">
									<div class="col-md-12">
										<input type="text" name="checkbox6" class="form-control" placeholder="白水印位置偏差">
										<span class="help-block">白水印位置偏差≤2mm </span>
									</div>
								</div>
								<div class="form-group">
									<div class="col-md-12">
										<input type="text" name="checkbox7" class="form-control" placeholder="水印清晰度">
										<span class="help-block">水印清晰 </span>
									</div>
								</div>
								<div class="form-group">
									<div class="col-md-12">
										<input type="text" name="checkbox8" class="form-control" placeholder="白水印清晰度">
										<span class="help-block">白水印清晰度好 </span>
									</div>
								</div><div class="form-group">
										<div class="col-md-12">
										<input type="text" name="checkbox9" class="form-control" placeholder="水印一致性">
										<span class="help-block">水印一致性好 </span>
									</div>
								</div>
								<div class="form-group">
									<div class="col-md-12">
										<input type="text" name="checkbox10" class="form-control" placeholder="白水印一致性">
										<span class="help-block">白水印一致性好 </span>
									</div>
								</div>
							</div>
							<div class="col-md-3">
								<div class="form-group">
									<div class="col-md-12">
										<input type="text" name="checkbox11" class="form-control" placeholder="白水印偏斜">
										<span class="help-block">白水印偏斜≤6°</span>
									</div>
								</div>
								<div class="form-group">
									<div class="col-md-12">
										<input type="text" name="checkbox12" class="form-control" placeholder="纸张匀度">
										<span class="help-block">纸张匀度不得低于精品样张 </span>
									</div>
								</div>
								<div class="form-group">
									<div class="col-md-12">
										<input type="text" name="checkbox13" class="form-control" placeholder="纸面整洁度">
										<span class="help-block">纸面洁净，无明显杂质和尘埃 </span>
									</div>
								</div>
								<div class="form-group">
									<div class="col-md-12">
										<input type="text" name="checkbox14" class="form-control" placeholder="开窗尺寸偏差">
										<span class="help-block">不得超过标准窗口尺寸的1/3 </span>
									</div>
								</div>
								<div class="form-group">
									<div class="col-md-12">
										<input type="text" name="checkbox15" class="form-control" placeholder="安全线露线">
										<span class="help-block">≤0.7mm2 </span>
									</div>
								</div>
							</div>
							<div class="col-md-3">
								<div class="form-group">
									<div class="col-md-12">
										<input type="text" name="checkbox16" class="form-control" placeholder="安全线细线">
										<span class="help-block">不得低于：宽线≥1.7mm，窄线≥1.2mm </span>
									</div>
								</div>
								<div class="form-group">
									<div class="col-md-12">
										<input type="text" name="checkbox17" class="form-control" placeholder="安全线断缺">
										<span class="help-block">≤1mm </span>
									</div>
								</div>
								<div class="form-group">
									<div class="col-md-12">
										<input type="text" name="checkbox18" class="form-control" placeholder="防伪层脱落">
										<span class="help-block">≤2mm </span>
									</div>
								</div>
								<div class="form-group">
									<div class="col-md-12">
										<input type="text" name="checkbox19" class="form-control" placeholder="全埋安全线拉伸">
										<span class="help-block">拉伸≤5% </span>
									</div>
								</div>
								<div class="form-group">
									<div class="col-md-12">
										<input type="text" name="checkbox20" class="form-control" placeholder="开窗安全线位置">
										<span class="help-block">开窗安全线摆幅度在标准范围内 </span>
									</div>
								</div>
								<div class="form-group">
									<div class="col-md-12">
										<input type="text" name="checkbox21" class="form-control" placeholder="小开版式">
										<span class="help-block">小埋区大埋区符合标准要求（8、15与5、18）</span>
									</div>
								</div>
								<div class="form-group">
									<div class="col-md-12">
										<input type="text" name="checkbox22" class="form-control" placeholder="纸张完好度">
										<span class="help-block">纸张无破洞、破损 </span>
									</div>
								</div>
								<div class="form-group">
									<div class="col-md-12">
										<input type="text" name="checkbox23" class="form-control" placeholder="其它">
										<span class="help-block">纸无明显硌手的硬质块、浆块纸张 </span>
									</div>
								</div>
							</div>
						</div>
						<hr class="hidden-print">
						<div>
							<ul class="list-unstyled amounts right">
								<li>
								</li>
								<li>
								</li>
								<li>
								</li>
								<li>
								</li>
							</ul>
						</div>
						<div class="form-actions noborder right">
							<a name="submit" class="btn btn-success" data-toggle="modal">提交 <i class="icon-cloud-upload"></i> </a>
							<button type="reset" class="btn default"> 重置 <i class="icon-refresh"></i></button>
						</div>
						<div id="info" class="modal fade" tabindex="-1" data-backdrop="info" data-keyboard="false">
							<div class="modal-dialog">
								<div class="modal-content">
									<div class="modal-header">
										<button type="button" class="close" data-dismiss="modal" aria-hidden="true"></button>
										<h4 class="modal-title">继续提交？</h4>
									</div>
									<div class="modal-body">
										<p>
											当前数据提交后，过程质量控制水平将低于95分，是否继续提交？
										</p>
									</div>
									<div class="modal-footer">
										<button type="button" data-dismiss="modal" class="btn default">取消</button>
										<button type="button" data-dismiss="modal" class="btn green">继续提交</button>
									</div>
								</div>
							</div>
						</div>
					</div>
					<!-- END SAMPLE FORM PORTLET-->
				</div>
			</form>
			<!-- END PAGE CONTENT-->
		</div>
	</div>
</div>
<!-- END CONTENT -->
<!-- END CONTENT -->
	<!--?php include("templates/quicksidebar/quicksidebar_paper_para.php");?-->
</div>
<!-- END CONTAINER -->