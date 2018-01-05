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
						<a href="#">切纸机生产原始记录</a>
					</li>
				</ul>
			</div>
			<h3 class="page-title">
			<span class="caption-subject bold uppercase" name="TableTitle"></span>  <small id="today"></small>
			</h3>
			<!-- END PAGE HEADER--

			<!-- BEGIN PAGE CONTENT-->
			<div class="row">
				<form role="form" name="theForm" class="form-horizontal"> <!--class="form-horizontal"-->
					<div class="col-md-9">
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
									<div class="col-md-6 form-group">
										<label class="col-md-3 control-label">轴号</label>
										<div class="col-md-9">
											<input type="text" class="form-control uppercase" maxlength="14" placeholder="请在此输入轴号信息,如201500A" name="reel_code">
											<div class="form-control-focus">
											</div>
											<label class="hide">轴号</label>
										</div>
									</div>	
									<div class="col-md-6 form-group">
										<label class="col-md-3 control-label">品种</label>
										<div class="col-md-9">
											<select class="form-control select2" name="prod_id">
											</select>
											<div class="form-control-focus">
											</div>
										</div>
									</div>
									<div class="col-md-6 form-group">
										<label class="col-md-3 control-label">机台</label>
										<div class="col-md-9">
											<select class="form-control select2" name="machine_id">
											</select>
											<div class="form-control-focus">
											</div>
										</div>
									</div>
									<div class="col-md-6 form-group">
										<label class="control-label col-md-3">纸轴抄重</label>
										<div class="col-md-9">
										<input type="text" class="form-control number" name="reel_weight">
										</div>
									</div>
									
									<div class="col-md-6 form-group">
										<label class="control-label col-md-3">封包令数</label>
										<div class="col-md-9">
										<input type="text" class="form-control number" name="ream_package">
										</div>
									</div>
									<div class="col-md-6 form-group">
										<label class="control-label col-md-3">抽检令数</label>
										<div class="col-md-9">
										<input type="text" class="form-control number" name="ream_check">
										</div>
									</div>
									<div class="col-md-6 form-group">
										<label class="control-label col-md-3">6.9转数封令数</label>
										<div class="col-md-9">
										<input type="text" class="form-control number" name="ream_69">
										</div>
									</div>
									<div class="col-md-6 form-group">
										<label class="control-label col-md-3">4.9令数</label>
										<div class="col-md-9">
										<input type="text" class="form-control number" name="ream_49">
										</div>
									</div>
									<div class="col-md-6 form-group">
										<label class="control-label col-md-3">轴头尾令数</label>
										<div class="col-md-9">
										<input type="text" class="form-control number" name="ream_reel_head_tail">
										</div>
									</div>


									<div class="col-md-6 form-group">
										<label class="control-label col-md-3">切纸机怀疑仓总数</label>
										<div class="col-md-9">
										<input type="text" class="form-control number" name="suspect_num">
										</div>
									</div>
									<div class="col-md-6 form-group">
										<label class="control-label col-md-3">切纸机废纸仓总数</label>
										<div class="col-md-9">
										<input type="text" class="form-control number" name="waste_num">
										</div>
									</div>
									<!-- <div class="form-group">
										<label class="col-md-3 control-label">生产日期</label>
										<div class="col-md-9">
											<input class="form-control form-control-inline date-picker" name="rec_date" size="16" type="text"/>
											<div class="form-control-focus">
											</div>
										</div>
									</div> -->
																	
									<div class="col-md-6 form-group">
										<label class="control-label col-md-3">质量情况描述</label>
										<div class="col-md-9">
										<textarea type="text" class="form-control" rows="4" name="remark"></textarea>
										</div>
									</div>
										
								</div>
								<div class="form-actions noborder row right">
									<button type="submit" class="btn green-haze"> 提交 <i class="icon-cloud-upload"></i> </button>
									<a name="loadHisData" class="btn red"> 载入数据 <i class="fa fa-cloud-download"></i> </a>
									<a name="reset" class="btn default"> 重置 <i class="icon-refresh"></i></a>
								</div>
							</div>
						</div>
						<!-- END SAMPLE FORM PORTLET-->
					</div>
					
					
					<div class="col-md-3">
						<!-- BEGIN SAMPLE FORM PORTLET-->
						<div class="portlet box blue-hoki">
							<div class="portlet-title">
								<div class="caption">
									<i class="icon-settings"></i>
									<span class="caption-subject bold uppercase">生产人员信息</span></br>
								</div>
								<div class="tools">
									<a href="javascript:;" class="collapse"> </a>
									<a href="" class="fullscreen"> </a>
								</div>
							</div>
							<div class="portlet-body form">
								<div class="form-body row" name="operatorInfo">
									<div class="col-md-12 form-group">
										<label class="col-md-3 control-label">班别</label>
										<div class="col-md-9">
											<select class="form-control select" name="class_name">
												<option value="401">401</option>
												<option value="402">402</option>
												<option value="403">403</option>
												<option value="404">404</option>
												<option value="405">405</option>
												<option value="406">406</option>
												<option value="407">407</option>
												<option value="408">408</option>
												<option value="409">409</option>
												<option value="410">410</option>
											</select>
											<!-- <input type="text" class="form-control uppercase" name="class_name"> -->
											<div class="form-control-focus">
											</div>
											<label class="hide">班别</label>
										</div>
									</div>								
									<div class="col-md-12 form-group">
										<label class="col-md-3 control-label">班次</label>
										<div class="col-md-9">
											<select class="form-control select" name="class_time">
												<option value="白班">白班</option>
												<option value="中班">中班</option>
												<option value="夜班">夜班</option>
											</select>
											<div class="form-control-focus">
											</div>
											<label class="hide">班别</label>
										</div>
									</div>
								</div>
								<div class="form-actions noborder row right">
									<a name="saveUsers" class="btn green-haze"> 保存用户信息 <i class="icon-cloud-upload"></i></a>
								</div>
							</div>
						</div>
						<!-- END SAMPLE FORM PORTLET-->
					</div>
                    

                    <!-- BEGIN PROFILE CONTENT -->
                    <div class="col-md-12 profile-content">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="portlet light ">
                                    <div class="portlet-title tabbable-line">
                                        <div class="caption caption-md">
                                            <i class="icon-globe theme-font hide"></i>
                                            <span class="caption-subject font-blue-madison bold uppercase"><i class="fa fa-credit-card"></i> 历史数据</span>
                                        </div>
                                    </div>
                                    <div class="portlet-body">
                                        <div class="table-scrollable">
                                            <table class="table table-striped table-bordered table-advance table-hover" name="reelList">
                                                <thead>
                                                    <tr>
                                                        <th> 编号</th>
                                                        <th><i class="fa fa-user"></i> 轴号</th>
                                                        <th><i class="fa fa-calendar-plus-o"></i> 录入时间 </th>
                                                        <th>抄重</th>
                                                        <th>机废张数</th>
																												<th>机怀张数</th>
																												<th>封包令数</th>
																												<th>抽检令数</th>
																												<th>6.9令数</th>
																												<th>4.9令数</th>
																												<th>轴头尾令数</th>
																												<th>班别</th>
																												<th>班次</th>
																												<th>导边</th>
																												<th>质检</th>
																												<th>纸斗</th>
																												<th>查纸</th>
																												<th>数数</th>
																												<th>封包</th>
																												<th>机长</th>
																												<th>备注</th>
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