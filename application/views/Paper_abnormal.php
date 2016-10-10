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
						<a href="#">纸张物理检验原始记录(非常规)</a>
					</li>
				</ul>
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
									<span class="caption-subject bold uppercase">概述<small> CC—210—16.2 </small></span></br>
								</div>
							</div>
							<div class="portlet-body form">							
								<div class="form-body row">
									<div class="col-md-6">
										<div class="form-group">
											<label class="col-md-3 control-label">轴号</label>
											<div class="col-md-9">
												<input type="text" class="form-control uppercase" maxlength="8" placeholder="请在此输入轴号信息,如6820015A" name="reel_code">
												<div class="form-control-focus">
												</div>
											</div>
										</div>
										<div class="form-group">
											<label class="col-md-3 control-label">室内温度</label>
											<div class="col-md-9">
												<input type="text" class="form-control" placeholder="检测要求(23±1)℃" name="temperature">
												<div class="form-control-focus">
												</div>
											</div>
										</div>
										<div class="form-group">
											<label class="col-md-3 control-label">相对湿度</label>
											<div class="col-md-9">
												<input type="text" class="form-control" placeholder="检测要求(50±2%)RH" name="humidity">
												<div class="form-control-focus">
												</div>
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
											<label class="col-md-3 control-label">主管</label>
											<div class="col-md-9">
												<input type="text" class="form-control" placeholder="请在此输入主管审核人员" name="director_name">
												<div class="form-control-focus">
												</div>
											</div>
										</div>	
									</div>									
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
											<label class="col-md-3 control-label">机台</label>
											<div class="col-md-9">
												<select class="form-control select2" name="machine_id">
												</select>
												<div class="form-control-focus">
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
										<div class="form-group">
											<label class="col-md-3 control-label">备注</label>
											<div class="col-md-9">
												<input type="text" class="form-control" placeholder="请在此输入备注信息" name="remark" value="无">
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
									<span class="caption-subject bold uppercase"> 原始记录</span>
								</div>
							</div>
							<div class="portlet-body form">	
								<div class="form-body row detail">
									<div class="col-md-6 form-group">
										<label class="control-label col-md-3">表面吸油性正</label>
										<div class="col-md-9">
											<input type="text" class="form-control" name="sur_oil_imbibition_f">
											<span class="help-block">40~50%</span>
										</div>
									</div>
									<div class="col-md-6 form-group">
										<label class="control-label col-md-3">表面吸油性反</label>
										<div class="col-md-9">
											<input type="text" class="form-control" name="sur_oil_imbibition_b">
											<span class="help-block">40~50%</span>
										</div>
									</div>
									<div class="col-md-6 form-group">
										<label class="control-label col-md-3">吸水性正 </label>
										<div class="col-md-9">
											<input type="text" class="form-control" name="water_imbibition_f">
											<span class="help-block">40~70 g/m^2</span>
										</div>
									</div>
									<div class="col-md-6 form-group">
										<label class="control-label col-md-3">吸水性反 </label>
										<div class="col-md-9">
											<input type="text" class="form-control" name="water_imbibition_b">
											<span class="help-block">40~70 g/m^2</span>
										</div>
									</div>
									<!--div class="col-md-6 form-group">
										<label class="control-label col-md-3">表面强度( 纵 )正</label>
										<div class="col-md-9">
											<input type="text" class="form-control" name="sur_Strength_v_f">
											<span class="help-block">>=2.5m/s</span>
										</div>
									</div>	
									<div class="col-md-6 form-group">
										<label class="control-label col-md-3">表面强度( 纵 )反</label>
										<div class="col-md-9">
											<input type="text" class="form-control" name="sur_Strength_v_b">
											<span class="help-block">>=2.5m/s</span>
										</div>
									</div-->	
									<div class="col-md-6 form-group">
										<label class="control-label col-md-3">表面强度( 横 )正</label>
										<div class="col-md-9">
											<input type="text" class="form-control" name="sur_Strength_h_f">
											<span class="help-block">>=2.5m/s</span>
										</div>
									</div>	
									<div class="col-md-6 form-group">
										<label class="control-label col-md-3">表面强度( 横 )反</label>
										<div class="col-md-9">
											<input type="text" class="form-control" name="sur_Strength_h_b">
											<span class="help-block">>=2.5m/s</span>
										</div>
									</div>	
									<div class="col-md-6 form-group">
										<label class="control-label col-md-3">油渗性正</label>
										<div class="col-md-9">
											<input type="text" class="form-control" name="oil_perme_f">
											<span class="help-block">( % )</span>
										</div>
									</div>	
									<div class="col-md-6 form-group">
										<label class="control-label col-md-3">油渗性正( 等级 )</label>
										<div class="col-md-9">
											<input type="text" class="form-control" name="oil_perme_f_lv">
											<span class="help-block">( % )</span>
										</div>
									</div>	
									<div class="col-md-6 form-group">
										<label class="control-label col-md-3">油渗性反</label>
										<div class="col-md-9">
											<input type="text" class="form-control" name="oil_perme_b">
											<span class="help-block">( % )</span>
										</div>
									</div>	
									<div class="col-md-6 form-group">
										<label class="control-label col-md-3">油渗性反( 等级 )</label>
										<div class="col-md-9">
											<input type="text" class="form-control" name="oil_perme_b_lv">
											<span class="help-block">( % )</span>
										</div>
									</div>	
									<!--div class="col-md-6 form-group">
										<label class="control-label col-md-3">粗糙度( 纵 )正</label>
										<div class="col-md-9">
											<input type="text" class="form-control" name="roughness_v_f">
											<span class="help-block">( cm3/m2 )</span>
										</div>
									</div>		
									<div class="col-md-6 form-group">
										<label class="control-label col-md-3">粗糙度( 纵 )反</label>
										<div class="col-md-9">
											<input type="text" class="form-control" name="roughness_v_b">
											<span class="help-block">( cm3/m2 )</span>
										</div>
									</div>		
									<div class="col-md-6 form-group">
										<label class="control-label col-md-3">粗糙度( 横 )正</label>
										<div class="col-md-9">
											<input type="text" class="form-control" name="roughness_h_f">
											<span class="help-block">( cm3/m2 )</span>
										</div>
									</div>		
									<div class="col-md-6 form-group">
										<label class="control-label col-md-3">粗糙度( 横 )反</label>
										<div class="col-md-9">
											<input type="text" class="form-control" name="roughness_h_b">
											<span class="help-block">( cm3/m2 )</span>
										</div>
									</div>		
									<div class="col-md-6 form-group">
										<label class="control-label col-md-3">渗透性( 纵 )正</label>
										<div class="col-md-9">
											<input type="text" class="form-control" name="perme_v_f">
											<span class="help-block">( l/m )</span>
										</div>
									</div>		
									<div class="col-md-6 form-group">
										<label class="control-label col-md-3">渗透性( 纵 )反</label>
										<div class="col-md-9">
											<input type="text" class="form-control" name="perme_v_b">
											<span class="help-block">( l/m )</span>
										</div>
									</div>		
									<div class="col-md-6 form-group">
										<label class="control-label col-md-3">渗透性( 横 )正</label>
										<div class="col-md-9">
											<input type="text" class="form-control" name="perme_h_f">
											<span class="help-block">( l/m )</span>
										</div>
									</div>		
									<div class="col-md-6 form-group">
										<label class="control-label col-md-3">渗透性( 横 )反</label>
										<div class="col-md-9">
											<input type="text" class="form-control" name="perme_h_b">
											<span class="help-block">( l/m )</span>
										</div>
									</div>	
									<div class="col-md-6 form-group">
										<label class="control-label col-md-3">耐破度正</label>
										<div class="col-md-9">
											<input type="text" class="form-control" name="burst_f">
											<span class="help-block">( kpa )</span>
										</div>
									</div>	
									<div class="col-md-6 form-group">
										<label class="control-label col-md-3">耐破度反</label>
										<div class="col-md-9">
											<input type="text" class="form-control" name="burst_b">
											<span class="help-block">( kpa )</span>
										</div>
									</div>	
									<div class="col-md-6 form-group">
										<label class="control-label col-md-3">匀度指数正</label>
										<div class="col-md-9">
											<input type="text" class="form-control" name="evennessIdx_f">
											<span class="help-block"> 匀度指数 </span>
										</div>
									</div>	
									<div class="col-md-6 form-group">
										<label class="control-label col-md-3">匀度指数反</label>
										<div class="col-md-9">
											<input type="text" class="form-control" name="evennessIdx_b">
											<span class="help-block"> 匀度指数 </span>
										</div>
									</div>	
									<div class="col-md-6 form-group">
										<label class="control-label col-md-3">PPS正</label>
										<div class="col-md-9">
											<input type="text" class="form-control" name="pps_f">
											<span class="help-block">( mic )</span>
										</div>
									</div>		
									<div class="col-md-6 form-group">
										<label class="control-label col-md-3">PPS反</label>
										<div class="col-md-9">
											<input type="text" class="form-control" name="pps_b">
											<span class="help-block">( mic )</span>
										</div>
									</div-->						
									<div class="col-md-6 form-group">
										<label class="control-label col-md-3">评价总分</label>
										<div class="col-md-9">
											<input type="text" class="form-control" disabled name="score">
										</div>
									</div>
								</div>								
								<div class="form-actions row right">	
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