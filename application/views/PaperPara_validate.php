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
						<a href="#">机检验证</a>
					</li>
				</ul>
				<!--div class="page-toolbar">
					<div class="btn-group pull-right">
						<a class="btn btn-fit-height grey-cascade">
						</a>
					</div>
				</div-->
			</div>
			<h3 class="page-title">
			<span class="caption-subject bold uppercase" name="TableTitle"></span>  <small id="today"></small>
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
								<div class="tools">
                                    <a href="javascript:;" class="collapse"> </a>
                                    <a href="" class="fullscreen"> </a>
                                </div>
							</div>
							<div class="portlet-body form">							
								<div class="form-body row">
									<div class="col-md-6">
										<div class="form-group">
											<label class="col-md-3 control-label">品种</label>
											<div class="col-md-9">
												<select class="form-control select2" name="prod_id">
												</select>
												<div class="form-control-focus">
												</div>
											</div>
										</div>
										<div class="form-group">
											<label class="col-md-3 control-label">轴号</label>
											<div class="col-md-9">
												<input type="text" class="form-control uppercase" maxlength="7" placeholder="请在此输入轴号信息,如201500A" name="reel_code">
												<div class="form-control-focus">
												</div>
												<label class="hide">轴号</label>
											</div>
										</div>
										<div class="form-group">
											<label class="col-md-3 control-label">检验员</label>
											<div class="col-md-9">
												<select class="form-control select2" name="oper_id">
												</select>
												<div class="form-control-focus">
												</div>
											</div>
										</div>
										<div class="form-group">
											<label class="control-label col-md-3">判定结果
												<span class="required"> * </span>
											</label>
											<div class="col-md-9">
												<div class="input-group">
													<div class="icheck-inline">
														<label>
															<input type="radio" name="passed" class="icheck"> 不放行 
														</label>
														<label>
															<input type="radio" name="passed" class="icheck"> 放行  
														</label>
													</div>
												</div>
											</div>
										</div>
									</div>									
									<div class="col-md-6">
										<div class="form-group">
											<label class="col-md-3 control-label">验证日期</label>
											<div class="col-md-9">
												<input class="form-control form-control-inline date-picker" name="rec_date" size="16" type="text"/>
												<div class="form-control-focus">
												</div>
											</div>
										</div>
										<div class="form-group">
											<label class="col-md-3 control-label">机台</label>
											<div class="col-md-9">
												<select class="form-control select2" name="machine_id">
												</select>
												<div class="form-control-focus">
												</div>
											</div>
										</div>
										<div class="form-group">
											<label class="control-label col-md-3">检验令数</label>
											<div class="col-md-9">
											<input type="text" class="form-control number" name="validate_num" value ="2">
											</div>
										</div>
										<div class="form-group">
											<label class="control-label col-md-3">数准情况</label>
											<div class="col-md-9">
												<select class="form-control select2" name="number_right">
												<option value="1" selected>准确</option>
												<option value="0">不准确</option>
												</select>
												<div class="form-control-focus">
												</div>
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
						<div class="portlet light bordered validateData">
							<div class="portlet-title">
								<div class="caption font-green">
									<i class="icon-pin font-green"></i>
									<span class="caption-subject bold uppercase"> 检测记录</span>
								</div>
								<div class="actions hidden-print">
									<a class="btn btn-circle btn-icon-only btn-default fullscreen" href="javascript:;" data-original-title="" title="">
									</a>
								</div>
							</div>
							<div class="portlet-body form">
								<div class="form-body row normalPara">									
									<div class="col-md-6">
										<div class="form-group">
											<label class="control-label col-md-3">切纸抄重</label>
											<div class="col-md-9">
											<input type="text" class="form-control number" name="cut_weight">
											</div>
										</div>
										<div class="form-group">
											<label class="control-label col-md-3">封包抄重</label>
											<div class="col-md-9">
											<input type="text" class="form-control number" name="package_weight" value="0">
											</div>
										</div>
										<div class="form-group">
											<label class="control-label col-md-3">严重漏废</label>
											<div class="col-md-9">
											<input type="text" class="form-control number" name="serious_fake">
											</div>
										</div>
										<div class="form-group">
											<label class="control-label col-md-3">一般漏废(大错)</label>
											<div class="col-md-9">
												<input type="text" class="form-control number" name="normal_fake_h">
											</div>
										</div>
										<div class="form-group">
											<label class="control-label col-md-3">一般漏废(中错)</label>
											<div class="col-md-9">
												<input type="text" class="form-control number" name="normal_fake_m">
											</div>
										</div>
										<div class="form-group">
											<label class="control-label col-md-3">一般漏废(小错)</label>
											<div class="col-md-9">
												<input type="text" class="form-control number" name="normal_fake_l">
											</div>
										</div>
									</div>
									<div class="col-md-6">
										<div class="form-group">
											<label class="col-md-3 control-label">轴头轴尾</label>
											<div class="col-md-9">
												<input type="text" class="form-control err-reason" placeholder="请在此输入备注信息" name="reel_end">
												<div class="form-control-focus">
												</div>
											</div>
										</div>	
										<div class="form-group">
											<label class="col-md-3 control-label">怀疑纸</label>
											<div class="col-md-9">
												<input type="text" class="form-control err-reason" placeholder="请在此输入备注信息" name="suspect_paper">
												<div class="form-control-focus">
												</div>
											</div>
										</div>	
										<div class="form-group">
											<label class="col-md-3 control-label">全好品</label>
											<div class="col-md-9">
												<input type="text" class="form-control err-reason" placeholder="请在此输入备注信息" name="well_paper">
												<div class="form-control-focus">
												</div>
											</div>
										</div>
										<div class="form-group">
											<label class="col-md-3 control-label">其它</label>
											<div class="col-md-9">
												<input type="text" class="form-control err-reason" placeholder="请在此输入备注信息" name="other">
												<div class="form-control-focus">
												</div>
											</div>
										</div>	
									</div>
								</div>
								<div class="form-actions noborder row right">	
									<button type="submit" class="btn green-haze"> 提交 <i class="icon-cloud-upload"></i> </button>
									<a name="reset" class="btn default"> 重置 <i class="icon-refresh"></i></a>
								</div>
							</div>
						</div>								
					</div>

                    <!-- BEGIN PROFILE CONTENT -->
                    <div class="col-md-12 profile-content">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="portlet light ">
                                    <div class="portlet-title tabbable-line">
                                        <div class="caption caption-md">
                                            <i class="icon-globe theme-font hide"></i>
                                            <span class="caption-subject font-blue-madison bold uppercase"><i class="fa fa-credit-card"></i> 待放行产品</span>
                                        </div>
                                    </div>
                                    <div class="portlet-body">
                                        <div class="table-scrollable">
                                            <table class="table table-striped table-bordered table-advance table-hover" name="unPassedList">
                                                <thead>
                                                    <tr>
                                                        <th><i class="fa fa-calendar-plus-o"></i> 品种 </th>
                                                        <th><i class="fa fa-briefcase"></i> 机台 </th>
                                                        <th><i class="fa fa-user"></i> 轴号</th>
                                                        <th><i class="fa fa-calendar-plus-o"></i> 检验时间 </th>
                                                        <th><i class="fa fa-dedent"></i> 封包轴重</th>
                                                        <th><i class="fa fa-cut"></i> 裁切轴重</th>
                                                        <th><i class="fa fa-link"></i> 操作 </th>
                                                    </tr>
                                                </thead>
                                                <tbody>                                                  
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- END PROFILE CONTENT -->

					<!-- END SAMPLE FORM PORTLET-->
				</form>
			</div>			
			<!-- END PAGE CONTENT-->
		</div>
	</div>
</div>
	<!-- END CONTENT -->
	<!--?php include("templates/quicksidebar/quicksidebar_QualityChart.php");?-->
</div>
<!-- END CONTAINER -->