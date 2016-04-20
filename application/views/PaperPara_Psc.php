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
						<a href="#">物理指标原始记录</a>
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
												<select class="form-control select2" name="Prod_id">
												</select>
												<div class="form-control-focus">
												</div>
											</div>
										</div>
										<div class="form-group">
											<label class="col-md-3 control-label">轴号</label>
											<div class="col-md-9">
												<input type="text" class="form-control uppercase" maxlength="7" placeholder="请在此输入轴号信息,如201500A" name="Reel_Code">
												<div class="form-control-focus">
												</div>
												<label class="hide">轴号</label>
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
										<div class="form-group">
											<label class="col-md-3 control-label">取样日期</label>
											<div class="col-md-9">
												<input class="form-control form-control-inline date-picker" name="rec_date" size="16" type="text"/>
												<div class="form-control-focus">
												</div>
												<label class="hide">取样日期</label>
											</div>
										</div>
									</div>									
									<div class="col-md-6">
										<div class="form-group">
											<label class="col-md-3 control-label">温度</label>
											<div class="col-md-9">
												<input type="text" class="form-control" placeholder="检测要求(23±1)℃" name="temperature">
												<div class="form-control-focus">
												</div>
												<label class="hide">温度</label>
											</div>
										</div>
										<div class="form-group">
											<label class="col-md-3 control-label">湿度</label>
											<div class="col-md-9">
												<input type="text" class="form-control" placeholder="检测要求(50±2%)RH" name="humidity">
												<div class="form-control-focus">
												</div>
												<label class="hide">湿度</label>
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
						<div class="portlet light bordered validateData">
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
								<div class="form-body row normalPara">									
									<div class="col-md-6">
										<div class="form-group">
											<label class="control-label col-md-3">定量 g/平方米</label>
											<div class="col-md-9">
											<input type="text" class="form-control" name="basis_weight">
											<span class="help-block">90±3%</span>
											</div>
										</div>
										<div class="form-group">
											<label class="control-label col-md-3">厚度 μm</label>
											<div class="col-md-9">
											<input type="text" class="form-control" name="thickness">
											<span class="help-block">102-113</span>
											</div>
										</div>
										<div class="form-group">
											<label class="control-label col-md-3">横幅厚度差 μm</label>
											<div class="col-md-9">
											<input type="text" class="form-control" name="horz_thickness_delta">
											<span class="help-block">≤6</span>
											</div>
										</div>
											<div class="form-group">
												<label class="control-label col-md-3">拉力(纵) N</label>
											<div class="col-md-9">
												<input type="text" class="form-control" name="pull_force_ver">
											</div>												
											</div>
											<div class="form-group">
												<label class="control-label col-md-3">拉力(横) N</label>
											<div class="col-md-9">
												<input type="text" class="form-control" name="pull_force_horz">
											</div>
											</div>
											<div class="form-group">
												<label class="control-label col-md-3">拉力(湿) N</label>
											<div class="col-md-9">
												<input type="text" class="form-control" name="pull_force_wet">
											</div>
											</div>
										<div class="form-group">
											<label class="control-label col-md-3">平均裂断长 m</label>
											<div class="col-md-9">
											<input type="text" class="form-control" name="avg_break_length">
											<span class="help-block">≥5500</span>
											</div>
										</div>
										<div class="form-group">
											<label class="control-label col-md-3">湿强度 %</label>
											<div class="col-md-9">
											<input type="text" class="form-control" name="tensile_strength_wet">
											<span class="help-block">25-45</span>
											</div>
										</div>
										<!--div class="form-group">
											<label class="control-label col-md-3">耐折度(纵)</label>
										<div class="col-md-9">
											<input type="text" class="form-control" name="fold_val_ver">
										</div>
										</div>
										<div class="form-group">
											<label class="control-label col-md-3">耐折度(横)</label>
										<div class="col-md-9">
											<input type="text" class="form-control" name="fold_val_horz">
										</div>
										</div-->
										<div class="form-group">
											<label class="control-label col-md-3">耐折度(平均)</label>
											<div class="col-md-9">
												<input type="text" class="form-control" name="fold_val_avg">
												<span class="help-block">≥2000</span>
											</div>
										</div>
										<div class="form-group">
											<label class="control-label col-md-3">白度 %</label>
											<div class="col-md-9">
											<input type="text" class="form-control"  name="whiteness">
											<span class="help-block">80-84</span>
											</div>
										</div>
										<div class="form-group">
											<label class="control-label col-md-3">不透明度 %</label>
											<div class="col-md-9">
											<input type="text" class="form-control" name="opacity">
											<span class="help-block">≥85</span>
											</div>
										</div>
										<div class="form-group">
											<label class="control-label col-md-3">水分 %</label>
											<div class="col-md-9">
											<input type="text" class="form-control"  name="moisture_content">
											<span class="help-block">6.0±1</span>
											</div>
										</div>
										<div class="form-group">
											<label class="control-label col-md-3">水分差 %</label>
											<div class="col-md-9">
											<input type="text" class="form-control" name="moisture_delta">
											<span class="help-block">≤1.0</span>
											</div>
										</div>
										<div class="form-group">
											<label class="control-label col-md-3">尘埃 个/平米</label>
											<div class="col-md-9">
											<input type="text" class="form-control" name="dust">
											<span class="help-block">0.1-0.7 m2 :100;0.7-1m2 :5;1m2以上 0 </span>
											</div>
										</div>
										<!--div class="form-group">
											<label class="control-label col-md-3">平滑度(正) S</label>
											<div class="col-md-9">
												<input type="text" class="form-control" name="smoothness_front">
											</div>
										</div>
										<div class="form-group">
											<label class="control-label col-md-3">平滑度(反) S</label>
										<div class="col-md-9">
											<input type="text" class="form-control" name="smoothness_back">
										</div>
										</div-->
										<div class="form-group">
											<label class="control-label col-md-3">平滑度(平均) S</label>
											<div class="col-md-9">
												<input type="text" class="form-control" name="smoothness_avg">
												<span class="help-block">≥10</span>
											</div>
										</div>
									</div>
									<div class="col-md-6">
										<div class="form-group">
											<label class="control-label col-md-3">湿变形(纵) %</label>
										<div class="col-md-9">
											<input type="text" class="form-control" name="wet_deformation_ver">
											<span class="help-block">-0.25~0.25</span>
										</div>
										</div>
										<div class="form-group">
											<label class="control-label col-md-3">湿变形(横) %</label>
										<div class="col-md-9">
											<input type="text" class="form-control" name="wet_deformation_horz">
											<span class="help-block">0-3.0</span>
										</div>
										</div>
										<div class="form-group">
											<label class="control-label col-md-3">挺度(纵) mN</label>
										<div class="col-md-9">
											<input type="text" class="form-control" name="deflection_ver">
											<span class="help-block">≥90</span>
										</div>
										</div>
										<div class="form-group">
											<label class="control-label col-md-3">挺度(横) mN</label>
											<div class="col-md-9">
												<input type="text" class="form-control" name="deflection_horz">
												<span class="help-block">≥40</span>
											</div>
										</div>
										<div class="form-group">
											<label class="control-label col-md-3">纵向撕裂度 mN</label>
											<div class="col-md-9">
											<input type="text" class="form-control" name="tearing_ver">
											<span class="help-block">≥650</span>
											</div>
										</div>
										<div class="form-group">
											<label class="control-label col-md-3">透气度 ml/min</label>
											<div class="col-md-9">
											<input type="text" class="form-control" name="porosity">
											<span class="help-block">≤20</span>
											</div>
										</div>
										<div class="form-group">
											<label class="control-label col-md-3">揉后透气度(正) mN</label>
											<div class="col-md-9">
												<input type="text" class="form-control" name="crumpled_porosity_front">	
												<span class="help-block"></span>	
											</div>		
										</div>
										<div class="form-group">
											<label class="control-label col-md-3">揉后透气度(反) mN</label>
											<div class="col-md-9">
												<input type="text" class="form-control" name="crumpled_porosity_back">
												<span class="help-block"></span>
											</div>
										</div>
										<div class="form-group">
											<label class="control-label col-md-3">干耐揉 次</label>
											<div class="col-md-9">
											<input type="text" class="form-control" name="anti_crumpled_dry">
											<span class="help-block">≥16</span>
											</div>
										</div>
										<div class="form-group">
											<label class="control-label col-md-3">TZ1-2纤维 根/平方分米</label>
											<div class="col-md-9">
											<input type="text" class="form-control" name="fibre_tz12">
											<span class="help-block">40-60</span>
											</div>
										</div>
										<div class="form-group">
											<label class="control-label col-md-3">TZ2纤维 根/平方分米</label>
											<div class="col-md-9">
											<input type="text" class="form-control" name="fibre_tz2">
											<span class="help-block">40-60</span>
											</div>
										</div>
											<div class="form-group">
												<label class="control-label col-md-3">L </label>
											<div class="col-md-9">
												<input type="text" class="form-control" name="chroma_L">
												<span class="help-block">色度-L</span>
											</div>
											</div>
											<div class="form-group">
												<label class="control-label col-md-3">a</label>
											<div class="col-md-9">
												<input type="text" class="form-control" name="chroma_a">
												<span class="help-block">色度-a</span>
											</div>
											</div>
											<div class="form-group">
												<label class="control-label col-md-3">b</label>
											<div class="col-md-9">
												<input type="text" class="form-control" name="chroma_b">
												<span class="help-block">色度-b</span>
											</div>
											</div>
									</div>
								</div>
								<hr class="hidden-print">
								<h3>非一类指标<small> 钞纸物理指标评价</small></h3>
								<div class="row">
									<div class="col-md-6">
										<div class="form-group">
											<label class="control-label col-md-3">吸水性 </label>
											<div class="col-md-9">
												<input type="text" class="form-control" name="water_imbibition">
												<span class="help-block">40~70 g/m^2</span>
											</div>
										</div>
										<div class="form-group">
											<label class="control-label col-md-3">PH值</label>
											<div class="col-md-9">
												<input type="text" class="form-control" name="PH_val">
												<span class="help-block">7~8.5</span>
											</div>
										</div>
										<div class="form-group">
											<label class="control-label col-md-3">允许修改常规指标
												<span class="required"> * </span>
											</label>
											<div class="col-md-4">
												<div class="checkbox-list">
													<label>
														<input type="checkbox" id="checkbox2" class="icheck"/> 允许修改常规指标										
													</label>
												</div>
											</div>
										</div>
									</div>
									<div class="col-md-6">
										<div class="form-group">
											<label class="control-label col-md-3">表面强度</label>
											<div class="col-md-9">
												<input type="text" class="form-control" name="sur_Strength">
												<span class="help-block">>=2.5m/s</span>
											</div>
										</div>
										<div class="form-group">
											<label class="control-label col-md-3">表面吸油性</label>
											<div class="col-md-9">
												<input type="text" class="form-control" name="sur_oil_imbibition">
												<span class="help-block">40~50%</span>
											</div>
										</div>
									</div>
								</div>
								<div>
									<ul class="list-unstyled amounts">
										<li>
											<h4><strong>评价总分:</strong> 100</h4>
										</li>
									</ul>
								</div>
								<div class="form-actions noborder row right">	
									<button type="submit" class="btn green-haze"> 提交 <i class="icon-cloud-upload"></i> </button>
									<a name="reset" class="btn default"> 重置 <i class="icon-refresh"></i></a>
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
	<!--?php include("templates/quicksidebar/quicksidebar_QualityChart.php");?-->
</div>
<!-- END CONTAINER -->