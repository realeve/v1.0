var PaperParam = function() {
	var handleDatePickers = function() {
		if (jQuery().datepicker) {
			$('.date-picker').datepicker({
				rtl: Metronic.isRTL(),
				orientation: "left",
				autoclose: true
			});
		}
	};

	function initDOM() {
		var str = getRootPath(1) + "/DataInterface/Api?Author=0cf7187bf9fa92a76e26aaa380aa532b72247fd5&ID=24&M=3&t=1";
		var Data = ReadData(str);
		InitSelect("prod_ID", Data);

		str = getRootPath(1) + "/DataInterface/Api?Author=0cf7187bf9fa92a76e26aaa380aa532b72247fd5&ID=23&M=3&t=1";
		Data = ReadData(str);
		InitSelect("machine_ID", Data);

		str = getRootPath(1) + "/DataInterface/Api?Author=0cf7187bf9fa92a76e26aaa380aa532b72247fd5&ID=25&M=3&t=1";
		Data = ReadData(str);
		InitSelect("oper_ID", Data);
	}

	function initChecked() {
		var iHours = new Date().getHours();
		if (iHours >= 0 && iHours < 8) { //夜班
			SetRadioChecked('class_ID', 2);
		} else if (iHours >= 8 && iHours < 16) { //白班
			SetRadioChecked('class_ID', 0);
		} else { //中班
			SetRadioChecked('class_ID', 1);
		}
	}

	function vialidate() {
		if ($('select[name="oper_ID"]').val() === '' || $('select[name="prod_ID"]').val() === '' || $('select[name="machine_ID"]').val() === '') {
			$('.portlet.light').hide();
			return 1;
		}
		$('.portlet.light').show();
		return 0;
	}

	$('select[name="oper_ID"]').change(function() {
		if (!vialidate()) {
			refreshData();
		}
	});

	$('select[name="machine_ID"]').change(function() {
		if (!vialidate()) {
			refreshData();
		}
		initChecked();
	});

	$('select[name="prod_ID"]').change(function() {
		if (vialidate()) {
			$('.grey-cascade').html('');
			return;
		}
		refreshData();
	});

	function refreshData() {
		var startMonth = $("input[name='rec_date']").val();
		startMonth = startMonth.substr(6, 4) + startMonth.substr(0, 2);
		var prod = $('select[name="prod_ID"]').val();
		var str = getRootPath(1) + "/DataInterface/Api?Author=0cf7187bf9fa92a76e26aaa380aa532b72247fd5&ID=27&M=3&tmonth=" + startMonth + "&prod=" + prod;
		var DataPsc = ReadData(str);
		str = getRootPath(1) + "/DataInterface/Api?Author=0cf7187bf9fa92a76e26aaa380aa532b72247fd5&ID=28&M=3&tmonth=" + startMonth + "&prod=" + prod;
		var DataSur = ReadData(str);
		$('.grey-cascade').html('物理指标得分：' + xround(DataPsc.data[0][0], 2) + '，外观指标得分：' + xround(DataSur.data[0][0], 2));
	}

	var handleValidate = function() {
		
        $('form[name=theForm]').validate({
			errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            focusInvalid: true, // do not focus the last invalid input
            rules:getValidateRule('theForm'),
            messages: {
                Reel_Code: {
                    required: "轴号不能为空."
                }
            },
            highlight: function(element) { // hightlight error inputs
                $(element).closest('.form-group').addClass('has-error'); // set error class to the control group
            },
            success: function(label) {
                label.closest('.form-group').removeClass('has-error');
                label.remove();
            }
        });

        function insertData() {
            if ($('form[name=theForm]').validate().form()) {
                var options = {
					url: getRootUrl('PaperPara') + 'insert',
					type: 'post',
					resetForm: true,
					data: {
						'tbl': '0',
						'class_ID': GetRadioChecked('class_ID')
					},
					success: function(data) {
						var obj = $.parseJSON(data);
						infoTips(obj.message, obj.type);
						$('button[type="reset"]').click();
						$('.portlet.light').hide();
					},
					error: function(data) {
						infoTips(JSON.stringify(data));
					}
				};
				$(this).ajaxSubmit(options);
				return false;
            }else{
				infoTips('请确保所有必要信息均正确输入');
            }
        }

		$('form[name=theForm]').submit(function() {
			insertData();
		});
		$('button[type="reset"]').on('click',function(){
			$('.portlet.light').hide();
		});
    };

	return {
		init: function() {
			$('.portlet.light').hide();
			handleDatePickers();
			initDOM();
			initChecked();
			handleValidate();
		}
	};

}();