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
						<a href="#">人工大张抽检荧光质量情况表</a>
					</li>
				</ul>
			</div>
			<h3 class="page-title">
			<span class="caption-subject bold uppercase" name="TableTitle">人工大张抽检荧光质量情况表</span>  <small id="today"></small>
			</h3>
			<!-- END PAGE HEADER-->
			<!-- BEGIN PAGE CONTENT-->

			<!-- 输入框 -->
			<script type="text/x-template" id="my-input-template">
				<div class="col-md-6 form-group" :class="{ 'has-error':param.hasError }" v-if="!param.hide">
					<label class="col-md-3 control-label">{{param.name}}</label>
					<div class="col-md-9">
						<input :type="param.type" :max="param.max" :min="param.min" class="form-control uppercase" :name="name" :class="param.class" :disabled="param.disabled" :placeholder="'请输入'+param.name" v-model.lazy.trim="param.data" :maxlength="param.maxlength">
						<span class="help-block danger">{{ param.errinfo }}</span>
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
							<div v-for="(val,key) in basic">
								<my-input :param="val" :name="key"></my-input>
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
									<my-input :param="param" :name="param.key"></my-input>
								</div>
								<div class="col-md-6 form-group">
									<label class="col-md-3 control-label">检查人</label>
									<div class="col-md-9">
										<select class="form-control select2">
											<option v-for="item of operatorList" :value="item.value">{{item.name}}</option>
										</select>
										<div class="form-control-focus">
										</div>
									</div>
								</div>
							</div>
							<div class="form-actions right">
								<a class="btn green-haze" @click="submit"> 提交 <i class="icon-cloud-upload"></i></a>
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