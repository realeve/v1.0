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
						<a href="#">印钞信息录入</a>
						<i class="fa fa-circle"></i>
					</li>
					<li>
						<a href="#">耐性检验</a>
					</li>
				</ul>
			</div>
			<h3 class="page-title">
			<span class="caption-subject bold uppercase" name="TableTitle">耐性检验</span>  <small id="today"></small>
			</h3>
			<!-- END PAGE HEADER-->
			<!-- BEGIN PAGE CONTENT-->

			<!-- 输入框 -->
			<script type="text/x-template" id="my-input-template">
				<div class="col-md-6 form-group" v-if="param.show" :key="param">
					<label class="col-md-3 control-label">{{param.name}}</label>
					<div class="col-md-9">
						<input type="text" class="form-control" :name="param.key" :placeholder="param.name" v-model="param.data">
						<span class="help-block"> </span>
						<div class="form-control-focus"></div>
					</div>
				</div>
			</script>

			<!-- bootstrap样式表格 -->
			<script type="text/x-template" id="my-table-template">
				<table class="table table-striped table-bordered table-advance table-hover">
					<thead>
						<tr>
							<th v-for="th of tbl.header">{{th.title}}</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="tr of tbl.data">
							<td v-for="td of tr">{{td}}</td>
						</tr>
					</tbody>
				</table>
			</script>

			<form role="form" name="theForm" class="form-horizontal">
				<div class="portlet box blue-hoki">
					<div class="portlet-title">
						<div class="caption">
							<i class="icon-settings"></i>
							<span class="caption-subject bold uppercase">概述</span>
						</div>
					</div>
					<div class="portlet-body form">
						<div class="form-body row animated fadeIn" id="basic">
							<div class="col-md-6 form-group">
								<label class="col-md-3 control-label">冠字号</label>
								<div class="col-md-9">
									<input type="text" id="gznumber" name="gznumber" maxlength="4" class="form-control uppercase" v-model="basic.gznumber">
									<div class="form-control-focus">
									</div>
								</div>
							</div>
							<div class="col-md-6 form-group">
								<label class="col-md-3 control-label">检测日期</label>
								<div class="col-md-9">
									<input class="form-control form-control-inline date-picker" type="text" v-model="basic.rec_date"/>
									<div class="form-control-focus">
									</div>
								</div>
							</div>
							<div class="col-md-6 form-group">
								<label class="col-md-3 control-label">品种</label>
								<div class="col-md-9">
									<select class="form-control select2" id="#prodid">
										<option v-for="proditem of prodList" :value="proditem.value">{{proditem.name}}</option>
									</select>
									<div class="form-control-focus">
									</div>
								</div>
							</div>
							<div class="col-md-6 form-group">
								<label class="col-md-3 control-label">备注</label>
								<div class="col-md-9">
									<input type="text" class="form-control" v-model="basic.remark">
									<div class="form-control-focus">
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div id="report">
					<div class="portlet light bordered">
						<div class="portlet-title">
							<div class="caption font-green">
								<i class="icon-pin font-green"></i>
								<span class="caption-subject bold uppercase"> {{portletName}} </span>
							</div>
						</div>
						<div class="portlet-body form">
							<div class="form-body row">
								<div v-for="param of params">
									<transition
									    name="custom-classes-transition"
									    enter-active-class="animated slideInUp"
									    leave-active-class="animated fadeOut"
									  >
										<my-input :param="param"></my-input>
									</transition>
								</div>
							</div>
							<div class="form-actions right">
								<button type="submit" class="btn green-haze"> 提交 <i class="icon-cloud-upload"></i></button>
								<a class="btn default" @click="reset"> 重置 <i class="icon-refresh"></i></a>
								<a class="btn red" @click="loadHisData"> 载入列表 <i class="icon-cloud-download"></i></a>
							</div>
						</div>
					</div>
				</div>
			</form>

			<div id="sheet">
				<div class="portlet light bordered" v-if="tbl.rows">
					<div class="portlet-title">
						<div class="caption font-green">
							<i class="icon-pin font-green"></i>
							<span class="caption-subject bold uppercase"> {{tbl.title}} </span>
							<span class="caption-helper">({{tbl.source}})</span>
						</div>
					</div>
					<div class="portlet-body">
						<my-table :tbl="tbl"></my-table>
					</div>
				</div>
			</div>
			<!-- END PAGE CONTENT-->
		</div>
	</div>
</div>
<!-- END CONTENT -->
<!-- END CONTENT -->
	<!--?php include("templates/quicksidebar/quicksidebar_paper_para.php");?-->
</div>
<!-- END CONTAINER -->