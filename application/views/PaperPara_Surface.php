			<!-- BEGIN PAGE HEADER-->
			<div class="page-bar">
				<ul class="page-breadcrumb">
					<li>
						<i class="fa fa-home"></i>
						<a href="<?php echo base_url()?>">首页</a>
						<i class="fa fa-angle-right"></i>
					</li>
					<li>
						<a href="#">指标检验</a>
						<i class="fa fa-angle-right"></i>
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
			钞纸质量控制水平评价(外观) <small id="today"></small>
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
							<div class="col-md-6 form-group form-md-line-input">
								<label class="col-md-2 control-label" for="form_control_1">序号</label>
								<div class="col-md-10">
									<input type="text" class="form-control" name="chk_ID" placeholder="" disabled>
									<div class="form-control-focus">
									</div>
								</div>
							</div>						
							<div class="col-md-6 form-group form-md-line-input">
								<label class="col-md-2 control-label">品种</label>
								<div class="col-md-10">
									<select class="form-control" name="prod_ID">
									</select>
									<div class="form-control-focus">
									</div>
								</div>
							</div>
							<div class="col-md-6 form-group form-md-line-input">
								<label class="col-md-2 control-label" for="form_control_1">取样日期</label>
								<div class="col-md-10">
									<input class="form-control form-control-inline date-picker" name="rec_date" size="16" type="text"/>
									<div class="form-control-focus">
									</div>
								</div>
							</div>
							<div class="col-md-6 form-group form-md-line-input">
								<label class="col-md-2 control-label">检验员</label>
								<div class="col-md-10">
									<select class="form-control" name="oper_ID">
									</select>
									<div class="form-control-focus">
									</div>
								</div>
							</div>										
							<div class="col-md-12 form-group form-md-line-input">
								<label class="col-md-1 control-label">备注</label>
								<div class="col-md-11">
									<input type="text" class="form-control" placeholder="请在此输入备注信息" name="remark">
									<div class="form-control-focus">
									</div>
									<label class="hide">备注</label>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="portlet light bordered">
					<div class="portlet-title">
						<div class="caption font-green">
							<i class="icon-pin font-green"></i>
							<span class="caption-subject bold uppercase"> 原始记录 <small>(请在不满足以下条件的选项内打√) </small></span>
						</div>
						<div class="actions hidden-print">
							<a class="btn btn-circle btn-icon-only btn-default fullscreen" href="javascript:;" data-original-title="" title="">
							</a>
						</div>
					</div>
					<div class="portlet-body form">
						<div class="form-body row ">
							<div class="col-md-3">
								<div class="form-group form-md-checkboxes">
									<label>1.纸张尺寸</label>
									<div class="md-checkbox-list">
										<div class="md-checkbox">
											<input type="checkbox" id="checkbox1" class="md-check">
											<label for="checkbox1">
											<span></span>
											<span class="check"></span>
											<span class="box"></span>
											纵/横向尺寸偏差≤±1mm </label>
										</div>
									</div>
								</div>
								<div class="form-group form-md-checkboxes">
									<label>2.方正度偏差</label>
									<div class="md-checkbox-list">
										<div class="md-checkbox">
											<input type="checkbox" id="checkbox2" class="md-check">
											<label for="checkbox2">
											<span></span>
											<span class="check"></span>
											<span class="box"></span>
											方正度偏差≤1mm </label>
										</div>
									</div>
								</div>
								<div class="form-group form-md-checkboxes">
									<label>3.水印</label>
									<div class="md-checkbox-list">
										<div class="md-checkbox">
											<input type="checkbox" id="checkbox3" class="md-check">
											<label for="checkbox3">
											<span></span>
											<span class="check"></span>
											<span class="box"></span>
											水印无残缺 </label>
										</div>
									</div>
								</div>
								<div class="form-group form-md-checkboxes">
									<label>4.白水印</label>
									<div class="md-checkbox-list">
										<div class="md-checkbox">
											<input type="checkbox" id="checkbox4" class="md-check">
											<label for="checkbox4">
											<span></span>
											<span class="check"></span>
											<span class="box"></span>
											白水印无残缺 </label>
										</div>
									</div>
								</div>
								<div class="form-group form-md-checkboxes">
									<label>5.水印位置偏差</label>
									<div class="md-checkbox-list">
										<div class="md-checkbox">
											<input type="checkbox" id="checkbox5" class="md-check">
											<label for="checkbox5">
											<span></span>
											<span class="check"></span>
											<span class="box"></span>
											水印位置偏差≤2mm </label>
										</div>
									</div>
								</div>
							</div>
							<div class="col-md-3">
								<div class="form-group form-md-checkboxes">
									<label>6.白水印位置偏差</label>
									<div class="md-checkbox-list">
										<div class="md-checkbox">
											<input type="checkbox" id="checkbox6" class="md-check">
											<label for="checkbox6">
											<span></span>
											<span class="check"></span>
											<span class="box"></span>
											白水印位置偏差≤2mm </label>
										</div>
									</div>
								</div>
								<div class="form-group form-md-checkboxes">
									<label>7.水印清晰度</label>
									<div class="md-checkbox-list">
										<div class="md-checkbox">
											<input type="checkbox" id="checkbox7" class="md-check">
											<label for="checkbox7">
											<span></span>
											<span class="check"></span>
											<span class="box"></span>
											水印清晰 </label>
										</div>
									</div>
								</div>
								<div class="form-group form-md-checkboxes">
									<label>8.白水印清晰度</label>
									<div class="md-checkbox-list">
										<div class="md-checkbox">
											<input type="checkbox" id="checkbox8" class="md-check">
											<label for="checkbox8">
											<span></span>
											<span class="check"></span>
											<span class="box"></span>
											白水印清晰度好 </label>
										</div>
									</div>
								</div><div class="form-group form-md-checkboxes">
									<label>9.水印一致性</label>
									<div class="md-checkbox-list">
										<div class="md-checkbox">
											<input type="checkbox" id="checkbox9" class="md-check">
											<label for="checkbox9">
											<span></span>
											<span class="check"></span>
											<span class="box"></span>
											水印一致性好 </label>
										</div>
									</div>
								</div>
								<div class="form-group form-md-checkboxes">
									<label>10.白水印一致性</label>
									<div class="md-checkbox-list">
										<div class="md-checkbox">
											<input type="checkbox" id="checkbox10" class="md-check">
											<label for="checkbox10">
											<span></span>
											<span class="check"></span>
											<span class="box"></span>
											白水印一致性好 </label>
										</div>
									</div>
								</div>
							</div>
							<div class="col-md-3">
								<div class="form-group form-md-checkboxes">
									<label>11.白水印偏斜</label>
									<div class="md-checkbox-list">
										<div class="md-checkbox">
											<input type="checkbox" id="checkbox11" class="md-check">
											<label for="checkbox11">
											<span></span>
											<span class="check"></span>
											<span class="box"></span>
											白水印偏斜≤6°</label>
										</div>
									</div>
								</div>
								<div class="form-group form-md-checkboxes">
									<label>12.纸张匀度</label>
									<div class="md-checkbox-list">
										<div class="md-checkbox">
											<input type="checkbox" id="checkbox12" class="md-check">
											<label for="checkbox12">
											<span></span>
											<span class="check"></span>
											<span class="box"></span>
											纸张匀度不得低于精品样张 </label>
										</div>
									</div>
								</div>
								<div class="form-group form-md-checkboxes">
									<label>13.纸面整洁度</label>
									<div class="md-checkbox-list">
										<div class="md-checkbox">
											<input type="checkbox" id="checkbox13" class="md-check">
											<label for="checkbox13">
											<span></span>
											<span class="check"></span>
											<span class="box"></span>
											纸面洁净，无明显杂质和尘埃 </label>
										</div>
									</div>
								</div>
								<div class="form-group form-md-checkboxes">
									<label>14.开窗尺寸偏差</label>
									<div class="md-checkbox-list">
										<div class="md-checkbox">
											<input type="checkbox" id="checkbox14" class="md-check">
											<label for="checkbox14">
											<span></span>
											<span class="check"></span>
											<span class="box"></span>
											不得超过标准窗口尺寸的1/3 </label>
										</div>
									</div>
								</div>
								<div class="form-group form-md-checkboxes">
									<label>15.露线</label>
									<div class="md-checkbox-list">
										<div class="md-checkbox">
											<input type="checkbox" id="checkbox15" class="md-check">
											<label for="checkbox15">
											<span></span>
											<span class="check"></span>
											<span class="box"></span>
											≤0.7mm2 </label>
										</div>
									</div>
								</div>
							</div>
							<div class="col-md-3">
								<div class="form-group form-md-checkboxes">
									<label>16.细线</label>
									<div class="md-checkbox-list">
										<div class="md-checkbox">
											<input type="checkbox" id="checkbox16" class="md-check">
											<label for="checkbox16">
											<span></span>
											<span class="check"></span>
											<span class="box"></span>
											各品种安全线不得低于：宽线≥1.7mm，窄线≥1.2mm </label>
										</div>
									</div>
								</div>
								<div class="form-group form-md-checkboxes">
									<label>17.断缺</label>
									<div class="md-checkbox-list">
										<div class="md-checkbox">
											<input type="checkbox" id="checkbox17" class="md-check">
											<label for="checkbox17">
											<span></span>
											<span class="check"></span>
											<span class="box"></span>
											≤1mm </label>
										</div>
									</div>
								</div>
								<div class="form-group form-md-checkboxes">
									<label>18.防伪层脱落</label>
									<div class="md-checkbox-list">
										<div class="md-checkbox">
											<input type="checkbox" id="checkbox18" class="md-check">
											<label for="checkbox18">
											<span></span>
											<span class="check"></span>
											<span class="box"></span>
											≤2mm </label>
										</div>
									</div>
								</div>
								<div class="form-group form-md-checkboxes">
									<label>19.纸张完好度</label>
									<div class="md-checkbox-list">
										<div class="md-checkbox">
											<input type="checkbox" id="checkbox19" class="md-check">
											<label for="checkbox19">
											<span></span>
											<span class="check"></span>
											<span class="box"></span>
											纸张无破洞、破损 </label>
										</div>
									</div>
								</div>
								<div class="form-group form-md-checkboxes">
									<label>20.其它</label>
									<div class="md-checkbox-list">
										<div class="md-checkbox">
											<input type="checkbox" id="checkbox20" class="md-check">
											<label for="checkbox20">
											<span></span>
											<span class="check"></span>
											<span class="box"></span>
											纸无明显硌手的硬质块、浆块纸张 </label>
										</div>
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
	<?php include("templates/quicksidebar/quicksidebar_paper_para.php");?>
</div>
<!-- END CONTAINER -->