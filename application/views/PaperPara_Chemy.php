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
						<a href="#">指标检验</a>
						<i class="fa fa-circle"></i>
					</li>
					<li>
						<a href="#">浆料质量检验记录</a>
					</li>
				</ul>
				<div class="page-toolbar">
					<div class="btn-group pull-right">
						<button type="button" class="btn btn-fit-height green dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-delay="1000" data-close-others="true">
						当天已录入数据：0条 <i class="fa fa-angle-down"></i>
						</button>
						<ul class="dropdown dropdown-dark dropdown-menu pull-right" role="menu">							
						</ul>
					</div>
				</div>
			</div>
			<h3 class="page-title">
			浆料质量检验记录 <small id="today"></small>
			</h3>
			<!-- END PAGE HEADER-->
			<!-- BEGIN PAGE CONTENT-->
			<div class="row">
				<form role="form" name="theForm" class="form-horizontal"> <!--class="form-horizontal"-->
					<div class="col-md-12">
						<!-- BEGIN SAMPLE FORM PORTLET-->
						<div class="portlet box blue-hoki">
							<div class="portlet-title">
								<div class="caption">
									<i class="icon-settings"></i>
									<span class="caption-subject bold uppercase">概述</span></br>
								</div>
								<div class="actions hidden-print">
									<a class="btn btn-circle btn-icon-only btn-default fullscreen" href="javascript:;" data-original-title="" title="">
									</a>
								</div>
							</div>
							<div class="portlet-body form">
									<div class="form-body row">
										<div class="col-md-6">
											<div class="form-group">
												<label class="col-md-3 control-label">浆池号</label>
												<div class="col-md-9">
													<label class="hide">浆池号</label>
													<input type="text" class="form-control" disabled placeholder="请在此输入浆池号" name="pulp_code">
												</div>
											</div>
											<div class="form-group">
												<label class="col-md-3 control-label">机台</label>
												<div class="col-md-9">
													<select class="form-control select2" name="machine_ID">
													</select>
												</div>
											</div> 
											<div class="form-group">
												<label class="control-label col-md-3">班次
													<span class="required"> * </span>
												</label>
												<div class="col-md-9">
													<div class="input-group">
														<div class="icheck-inline">
															<label>
															<input type="radio" name="class_id" class="icheck"> 白班  </label>
															<label>
															<input type="radio" name="class_id" class="icheck"> 中班 </label>
															<label>
															<input type="radio" name="class_id" class="icheck"> 夜班 </label>
														</div>
													</div>
												</div>
											</div>
										</div>
										<div class="col-md-6">
											<div class="form-group">
												<label class="col-md-3 control-label">取样日期</label>
												<div class="col-md-9">
													<input class="form-control form-control-inline date-picker" name="rec_date" size="16" type="text"/>
													<div class="form-control-focus">
													</div>
													<label class="hide">取样日期</label>
												</div>
											</div>
											<div class="form-group">
												<label class="col-md-3 control-label">记录人</label>
												<div class="col-md-9">
													<select class="form-control select2" name="oper_ID">
													</select>
													<div class="form-control-focus">
													</div>
												</div>
											</div>
											<div class="form-group">
												<label class="col-md-3 control-label">备注</label>
												<div class="col-md-9">
													<input type="text" class="form-control" placeholder="请在此输入备注信息" name="remark">
													<div class="form-control-focus">
													</div>
													<label class="hide">备注</label>
												</div>
											</div>
										</div>
									</div>
							</div>
						</div>
						<!-- END SAMPLE FORM PORTLET-->
					</div>
					<div class="col-md-12 ">
						<!-- BEGIN SAMPLE FORM PORTLET-->
						<div class="portlet light bordered">
							<div class="portlet-title">
								<div class="caption font-green">
									<i class="icon-pin font-green"></i>
									<span class="caption-subject bold uppercase"> 原始记录</span>
								</div>
								<div class="actions hidden-print">
									<a class="btn btn-circle btn-icon-only btn-default fullscreen" href="javascript:;" data-original-title="" title="">
									</a>
								</div>
							</div>
							<div class="portlet-body form">
									<div class="form-body row ">
										<div class="col-md-3">
											<h4 class="caption font-red">1.水力碎浆机</h4>
											<div class="form-group">
												<label class="control-label col-md-3">叩解度</label>
												<div class="col-md-9">
													<input type="text" class="form-control" name="beating_deg_water">
												</div>
											</div>
											<div class="form-group">
												<label class="control-label col-md-3">湿重</label>
												<div class="col-md-9">
													<input type="text" class="form-control" name="humid_weight_water">
												</div>
											</div>
											<div class="form-group">
												<label class="control-label col-md-3">尘埃</label>
												<div class="col-md-9">
													<input type="text" class="form-control" name="dust_water">
												</div>
											</div>
											<div class="form-group">
												<label class="control-label col-md-3">水分</label>
												<div class="col-md-9">
													<input type="text" class="form-control" name="moisture_content_water">
												</div>
											</div>
											<hr>
											<h4 class="caption font-red">2.精浆</h4>
											<div class="form-group">
												<label class="control-label col-md-3">浓度</label>
												<div class="col-md-9">
													<input type="text" class="form-control" name="thickness_extra">
												</div>
											</div>
										</div>
										<div class="col-md-3">
											<div class="form-group">
												<label class="control-label col-md-3">叩解度</label>
												<div class="col-md-9">
													<input type="text" class="form-control" name="beating_deg_extra">
												</div>
											</div>
											<div class="form-group">
												<label class="control-label col-md-3">湿重</label>
												<div class="col-md-9">
													<input type="text" class="form-control" name="humid_weight_extra">
												</div>
											</div>
											<h4 class="caption font-red">3.磨盘浆</h4>
											<div class="form-group">
												<label class="control-label col-md-3">浓度</label>
												<div class="col-md-9">
													<input type="text" class="form-control" name="thickness_mil">
												</div>
											</div>
											<div class="form-group">
												<label class="control-label col-md-3">叩解度</label>
												<div class="col-md-9">
													<input type="text" class="form-control" name="beating_deg_mil">
												</div>
											</div>
											<div class="form-group">
												<label class="control-label col-md-3">湿重</label>
												<div class="col-md-9">
													<input type="text" class="form-control" name="humid_weight_mil">
												</div>
											</div>										
										</div>
										<div class="col-md-3">
											<h4 class="caption font-red">4.调和浆</h4>
											<div class="form-group">
												<label class="control-label col-md-3">PH值</label>
												<div class="col-md-9">
													<input type="text" class="form-control" name="PH_val_atpr">
												</div>
											</div>
											<div class="form-group">
												<label class="control-label col-md-3">浓度</label>
												<div class="col-md-9">
													<input type="text" class="form-control" name="thickness_atpr">
												</div>
											</div>
											<div class="form-group">
												<label class="control-label col-md-3">电位</label>
												<div class="col-md-9">
													<input type="text" class="form-control" name="elec_atpr">
												</div>
											</div>
											<hr>
											<h4 class="caption font-red">5.上网浆</h4>
											<div class="form-group">
												<label class="control-label col-md-3">浆温</label>
												<div class="col-md-9">
													<input type="text" class="form-control" name="pulp_temp_web">
												</div>
											</div>
											<div class="form-group">
												<label class="control-label col-md-3">浓度</label>
												<div class="col-md-9">
													<input type="text" class="form-control" name="thickness_web">
												</div>
											</div>
										</div>
										<div class="col-md-3">
											<div class="form-group">
												<label class="control-label col-md-3">叩解度</label>
												<div class="col-md-9">
													<input type="text" class="form-control" name="beating_deg_web">
												</div>
											</div>
											<div class="form-group">
												<label class="control-label col-md-3">湿重</label>
												<div class="col-md-9">
													<input type="text" class="form-control" name="wet_weight_web">
												</div>
											</div>
											<div class="form-group">
												<label class="control-label col-md-3">PH值</label>
												<div class="col-md-9">
													<input type="text" class="form-control" name="PH_val_web">
												</div>
											</div>
											<div class="form-group">
												<label class="control-label col-md-3">电位</label>
												<div class="col-md-9">
													<input type="text" class="form-control" name="elec_val_web">
												</div>
											</div>										
										</div>
										<div class="col-md-3">
											<h4 class="caption font-red">6.清水</h4>
											<div class="form-group">
												<label class="control-label col-md-3">温度</label>
												<div class="col-md-9">
													<input type="text" class="form-control" name="tem_clnWater">
												</div>
											</div>
											<div class="form-group">
												<label class="control-label col-md-3">PH值</label>
												<div class="col-md-9">
													<input type="text" class="form-control"  name="PH_val_clnWater">
												</div>
											</div>
										</div>
									</div>
									<hr class="hidden-print">
									<div class="form-actions noborder right">									
										<button type="submit" class="btn green-haze"> 提交 <i class="icon-cloud-upload"></i> </button>
										<button type="reset" class="btn default"> 重置 <i class="icon-refresh"></i></button>
									</div>
							</div>
						</div>								
					</div>				
					<!-- END SAMPLE FORM PORTLET-->
				</form>
			</div>			
			<!-- END PAGE CONTENT-->
		</div>
	</div>
</div>
<!-- END CONTENT -->
	<?php include("templates/quicksidebar/quicksidebar_paper_para.php");?>
</div>
<!-- END CONTAINER -->