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
			物理指标检验原始记录（常规） <small id="today"></small>
			</h3>
			<!-- END PAGE HEADER-->
			<!-- BEGIN PAGE CONTENT-->
			<div class="row">
				<form role="form" name="theForm"> <!--class="form-horizontal"-->
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
										<div class="form-group form-md-line-input">
											<label class="col-md-2 control-label">轴号</label>
											<div class="col-md-10">
												<input type="text" class="form-control" maxlength="6" placeholder="请在此输入轴号信息,如201500A" name="Reel_Code">
												<div class="form-control-focus">
												</div>
												<label class="hide">轴号</label>
											</div>
										</div>
										<div class="form-group form-md-line-input">
											<label class="col-md-2 control-label">品种</label>
											<div class="col-md-10">
												<select class="form-control" name="prod_ID">
												</select>
												<div class="form-control-focus">
												</div>
											</div>
										</div>
										<div class="form-group form-md-line-input">
											<label class="col-md-2 control-label">机台</label>
											<div class="col-md-10">
												<select class="form-control" name="machine_ID">
												</select>
												<div class="form-control-focus">
												</div>
											</div>
										</div> 
										<div class="form-group form-md-line-input">
											<label class="col-md-2 control-label">班次</label>
											<div class="md-radio-inline">
												<div class="md-radio">
													<input type="radio" id="radio6" name="class_ID" class="md-radiobtn">
													<label for="radio6">
													<span></span>
													<span class="check"></span>
													<span class="box"></span>
													白班 </label>
												</div>
												<div class="md-radio">
													<input type="radio" id="radio7" name="class_ID" class="md-radiobtn">
													<label for="radio7">
													<span></span>
													<span class="check"></span>
													<span class="box"></span>
													中班 </label>
												</div>
												<div class="md-radio">
													<input type="radio" id="radio8" name="class_ID" class="md-radiobtn">
													<label for="radio8">
													<span></span>
													<span class="check"></span>
													<span class="box"></span>
													夜班 </label>
												</div>
											</div>
										</div>	
									</div>									
									<div class="col-md-6">
										<div class="form-group form-md-line-input">
											<label class="col-md-2 control-label">取样日期</label>
											<div class="col-md-10">
												<input class="form-control form-control-inline date-picker" name="rec_date" size="16" type="text"/>
												<div class="form-control-focus">
												</div>
												<label class="hide">取样日期</label>
											</div>
										</div>
										<div class="form-group form-md-line-input">
											<label class="col-md-2 control-label">温度</label>
											<div class="col-md-10">
												<input type="text" class="form-control" placeholder="检测要求(23±1)℃" name="temperature">
												<div class="form-control-focus">
												</div>
												<label class="hide">温度</label>
											</div>
										</div>
										<div class="form-group form-md-line-input">
											<label class="col-md-2 control-label">湿度</label>
											<div class="col-md-10">
												<input type="text" class="form-control" placeholder="检测要求(50±2%)RH" name="humidity">
												<div class="form-control-focus">
												</div>
												<label class="hide">湿度</label>
											</div>
										</div>
										<div class="form-group form-md-line-input">
											<label class="col-md-2 control-label">检验员</label>
											<div class="col-md-10">
												<select class="form-control" name="oper_ID">
												</select>
												<div class="form-control-focus">
												</div>
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
									<div class="col-md-6">
										<div class="form-group form-md-line-input form-md-floating-label">
											<input type="text" class="form-control" name="basis_weight_prod">
											<label>下机定量 g/平方米</label>
											<span class="help-block">90±3%</span>
										</div>
										<div class="form-group form-md-line-input form-md-floating-label">
											<input type="text" class="form-control" name="basis_weight">
											<label>定量 g/平方米</label>
											<span class="help-block">90±3%</span>
										</div>
										<div class="form-group form-md-line-input form-md-floating-label has-success">
											<input type="text" class="form-control" name="thickness">
											<label>厚度 μm</label>
											<span class="help-block">0.102-0.113</span>
										</div>
										<div class="form-group form-md-line-input form-md-floating-label">
											<input type="text" class="form-control" name="horz_thickness_delta">
											<label>横幅厚度差 μm</label>
											<span class="help-block">≤0.006</span>
										</div>
										<div class="row">
											<div class="col-md-4 form-group form-md-line-input form-md-floating-label">
												<input type="text" class="form-control" name="pull_force_ver">
												<label>拉力(纵) N</label>												
											</div>
											<div class="col-md-4 form-group form-md-line-input form-md-floating-label has-success">
												<input type="text" class="form-control" name="pull_force_horz">
												<label>拉力(横) N</label>												
											</div>
											<div class="col-md-4 form-group form-md-line-input form-md-floating-label">
												<input type="text" class="form-control" name="pull_force_wet">
												<label>拉力(湿) N</label>												
											</div>
										</div>
										<div class="form-group form-md-line-input form-md-floating-label">
											<input type="text" class="form-control" name="avg_break_length">
											<label>平均裂断长 m</label>
											<span class="help-block">≥5500</span>
										</div>
										<div class="form-group form-md-line-input form-md-floating-label has-success">
											<input type="text" class="form-control" name="tensile_strength_wet">
											<label>湿强度 %</label>
											<span class="help-block">25-45</span>
										</div>
										<div class="row">
											<div class="col-md-4 form-group form-md-line-input form-md-floating-label">
												<input type="text" class="form-control" name="fold_val_ver">
												<label>耐折度(纵)</label>
											</div>
											<div class="col-md-4 form-group form-md-line-input form-md-floating-label has-success">
												<input type="text" class="form-control" name="fold_val_horz">
												<label>耐折度(横)</label>
											</div>
											<div class="col-md-4 form-group form-md-line-input form-md-floating-label">
												<input type="text" class="form-control" name="fold_val_avg">
												<label>耐折度(平均)</label>
												<span class="help-block">≥2000</span>
											</div>
										</div>
										<div class="form-group form-md-line-input form-md-floating-label has-success">
											<input type="text" class="form-control"  name="whiteness">
											<label>白度 %</label>
											<span class="help-block">80-84</span>
										</div>
										<div class="form-group form-md-line-input form-md-floating-label has-success">
											<input type="text" class="form-control" name="opacity">
											<label>不透明度 %</label>
											<span class="help-block">≥85</span>
										</div>
										<div class="form-group form-md-line-input form-md-floating-label has-success">
											<input type="text" class="form-control"  name="moisture_content">
											<label>水分 %</label>
											<span class="help-block">6.0±1</span>
										</div>
										<div class="form-group form-md-line-input form-md-floating-label">
											<input type="text" class="form-control" name="moisture_delta">
											<label>水分差 %</label>
											<span class="help-block">≤1.0</span>
										</div>
									</div>
									<div class="col-md-6">
										<div class="form-group form-md-line-input form-md-floating-label">
											<input type="text" class="form-control" name="dust">
											<label>尘埃 个/平米</label>
											<span class="help-block">0.1-0.7 m2 :100;0.7-1m2 :5;1m2以上 0 </span>
										</div>
										<div class="row">
											<div class="col-md-4 form-group form-md-line-input form-md-floating-label">
												<input type="text" class="form-control" name="smoothness_front">
												<label>平滑度(正) S</label>
											</div>
											<div class="col-md-4 form-group form-md-line-input form-md-floating-label has-success">
												<input type="text" class="form-control" name="smoothness_back">
												<label>平滑度(反) S</label>
											</div>
											<div class="col-md-4 form-group form-md-line-input form-md-floating-label">
												<input type="text" class="form-control" name="smoothness_avg">
												<label>平滑度(平均) S</label>
												<span class="help-block">≥10</span>
											</div>
										</div>
										
										<div class="row">
											<div class="col-md-6 form-group form-md-line-input form-md-floating-label">
												<input type="text" class="form-control" name="wet_deformation_ver">
												<label>湿变形(纵) %</label>
												<span class="help-block">-0.25~0.25</span>
											</div>
											<div class="col-md-6 form-group form-md-line-input form-md-floating-label has-success">
												<input type="text" class="form-control" name="wet_deformation_horz">
												<label>湿变形(横) %</label>
												<span class="help-block">0-3.0</span>
											</div>
										</div>
										<div class="row">
											<div class="col-md-6 form-group form-md-line-input form-md-floating-label">
												<input type="text" class="form-control" name="deflection_ver">
												<label>挺度(纵) mN</label>
												<span class="help-block">≥90</span>
											</div>
											<div class="col-md-6 form-group form-md-line-input form-md-floating-label has-success">
												<input type="text" class="form-control" name="deflection_horz">
												<label>挺度(横) mN</label>
												<span class="help-block">≥40</span>
											</div>
										</div>
										<div class="form-group form-md-line-input form-md-floating-label">
											<input type="text" class="form-control" name="tearing_ver">
											<label>纵向撕裂度 mN</label>
											<span class="help-block">≥650</span>
										</div>
										<div class="form-group form-md-line-input form-md-floating-label">
											<input type="text" class="form-control" name="porosity">
											<label>透气度 ml/min</label>
											<span class="help-block">≤20</span>
										</div>
										<div class="row">
											<div class="col-md-6 form-group form-md-line-input form-md-floating-label">
												<input type="text" class="form-control" name="crumpled_porosity_front">
												<label>揉后透气度(正) mN</label>
												
											</div>
											<div class="col-md-6 form-group form-md-line-input form-md-floating-label has-success">
												<input type="text" class="form-control" name="crumpled_porosity_back">
												<label>揉后透气度(反) mN</label>
											</div>
										</div>
										<div class="form-group form-md-line-input form-md-floating-label">
											<input type="text" class="form-control" name="anti_crumpled_dry">
											<label>干耐揉 次</label>
											<span class="help-block">≥16</span>
										</div>
										<div class="form-group form-md-line-input form-md-floating-label">
											<input type="text" class="form-control" name="fibre_tz12">
											<label>TZ1-2纤维 根/平方分米</label>
											<span class="help-block">40-60</span>
										</div>
										<div class="form-group form-md-line-input form-md-floating-label">
											<input type="text" class="form-control" name="fibre_tz2">
											<label>TZ2纤维 根/平方分米</label>
											<span class="help-block">40-60</span>
										</div>
										<div class="row">
											<div class="col-md-4 form-group form-md-line-input form-md-floating-label">
												<input type="text" class="form-control" name="chroma_L">
												<label>L </label>
												<span class="help-block">色度-L</span>
											</div>
											<div class="col-md-4 form-group form-md-line-input form-md-floating-label has-success">
												<input type="text" class="form-control" name="chroma_a">
												<label>a</label>
												<span class="help-block">色度-a</span>
											</div>
											<div class="col-md-4 form-group form-md-line-input form-md-floating-label">
												<input type="text" class="form-control" name="chroma_b">
												<label>b</label>
												<span class="help-block">色度-b</span>
											</div>
										</div>
									</div>
								</div>
								<hr class="hidden-print">
								<h3>非一类指标<small> 钞纸物理指标评价</small></h3>
								<div class="row">
									<div class="col-md-6 form-group form-md-line-input form-md-floating-label">
										<input type="text" class="form-control" name="water_imbibition">
										<label>吸水性 </label>
										<span class="help-block">40~70 g/m^2</span>
									</div>
									<div class="col-md-6 form-group form-md-line-input form-md-floating-label has-success">
										<input type="text" class="form-control" name="PH_val">
										<label>PH值</label>
										<span class="help-block">7~8.5</span>
									</div>
									<div class="col-md-6 form-group form-md-line-input form-md-floating-label">
										<input type="text" class="form-control" name="sur_Strength">
										<label>表面强度</label>
										<span class="help-block">>=2.5m/s</span>
									</div>
									<div class="col-md-6 form-group form-md-line-input form-md-floating-label">
										<input type="text" class="form-control" name="sur_oil_imbibition">
										<label>表面吸油性</label>
										<span class="help-block">40~50$</span>
									</div>
								</div>
								<div>
									<ul class="list-unstyled amounts">
										<li>
											<h4><strong>评价总分:</strong> 100</h4>
										</li>
									</ul>
								</div>
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
	<?php include("templates/quicksidebar/quicksidebar_QualityChart.php");?>
</div>
<!-- END CONTAINER -->