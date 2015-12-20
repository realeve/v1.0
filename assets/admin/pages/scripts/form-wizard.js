var FormWizard = function () {


    return {
        //main function to initiate the module
        init: function () {
            if (!jQuery().bootstrapWizard) {
                return;
            }

            function format(state) {
                if (!state.id) return state.text; // optgroup
                return "<img class='flag' src='../../assets/global/img/flags/" + state.id.toLowerCase() + ".png'/>&nbsp;&nbsp;" + state.text;
            }

            var form = $('#submit_form');
            var error = $('.alert-danger', form);
            var success = $('.alert-success', form);

            form.validate({
                doNotHideMessage: true, //this option enables to show the error/success messages on tab switch.
                errorElement: 'span', //default input error message container
                errorClass: 'help-block help-block-error', // default input error message class
                focusInvalid: false, // do not focus the last invalid input
                rules: {
                    //goods
                    product_name: {
                        required: true
                    },
                    product_num: {
                        required: true
                    },
                    //profile
					customer_name: {
                        required: true
                    },
                    name: {
                        required: true
                    },
                    phone: {
                        required: true
                    },
                    paid: {
                        required: true
                    },
                    address: {
                        required: true
                    },
                    city: {
                        required: true
                    }
                },

                errorPlacement: function (error, element) { // render error placement for each input type
                    if (element.attr("name") == "paid") { // for uniform radio buttons, insert the after the given container
                        error.insertAfter("#form_paid_error");
                    } else {
                        error.insertAfter(element); // for other inputs, just perform default behavior
                    }
                },

                invalidHandler: function (event, validator) { //display error alert on form submit   
                    success.hide();
                    error.show();
                    Metronic.scrollTo(error, -200);
                },

                highlight: function (element) { // hightlight error inputs
                    $(element)
                        .closest('.form-group').removeClass('has-success').addClass('has-error'); // set error class to the control group
                },

                unhighlight: function (element) { // revert the change done by hightlight
                    $(element)
                        .closest('.form-group').removeClass('has-error'); // set error class to the control group
                },

                success: function (label) {
                    if (label.attr("for") == "paid" ) { // for checkboxes and radio buttons, no need to show OK icon
                        label
                            .closest('.form-group').removeClass('has-error').addClass('has-success');
                        label.remove(); // remove error label here
                    } else { // display success icon for other inputs
                        label
                            .addClass('valid') // mark the current input as valid and display OK icon
                        .closest('.form-group').removeClass('has-error').addClass('has-success'); // set success class to the control group
                    }
                },

                submitHandler: function (form) {
                    success.show();
                    error.hide();
                    //add here some ajax code to submit your form or just call form.submit() if you want to submit the form without ajax
					
                }

            });

            var displayConfirm = function() {
                $('#tab4 .form-control-static', form).each(function(){
                    var input = $('[name="'+$(this).attr("data-display")+'"]', form);
                    if (input.is(":radio")) {
                        input = $('[name="'+$(this).attr("data-display")+'"]:checked', form);
                    }
                    if (input.is(":text") || input.is("textarea")) {
                        $(this).html(input.val());
                    } else if (input.is("select")) {
                        $(this).html(input.find('option:selected').text());
                    } else if (input.is(":radio") && input.is(":checked")) {
                        $(this).html(input.attr("data-title"));
                    }
                });
            }

            var handleTitle = function(tab, navigation, index) {
                var total = navigation.find('li').length;
                var current = index + 1;
                // set wizard title
                $('.step-title', $('#form_wizard_1')).text('第 ' + (index + 1) + ' 步，共 ' + total +'步');
                // set done steps
                jQuery('li', $('#form_wizard_1')).removeClass("done");
                var li_list = navigation.find('li');
                for (var i = 0; i < index; i++) {
                    jQuery(li_list[i]).addClass("done");
                }

                if (current == 1) {
                    $('#form_wizard_1').find('.button-previous').hide();
                } else {
                    $('#form_wizard_1').find('.button-previous').show();
                }

                if (current >= total) {
                    $('#form_wizard_1').find('.button-next').hide();
                    $('#form_wizard_1').find('.button-submit').show();
                    
                    //取商品相关值
                    var iLen = $('.ProductList .col-md-6').length;
                    var strNum = '';
                    var strPremium = '';
                    for (var i = 0; i < iLen; i++) {
                        strNum += $('.ProductList .col-md-6  input[name="product_num"]:eq(' + i + ')').val()+"、 ";
                        strPremium += $('.ProductList .col-md-6  input[name="goods_premium"]:eq(' + i + ')').val()+"、 ";
                    };
                    //infoTips(strNum);
                    displayConfirm();       

                    strNum = strNum.substring(0,strNum.length-2);  
                    strPremium = strPremium.substring(0,strPremium.length-2);         
                    $('p[data-display="product_num"]').html(strNum);
                    $('p[data-display="goods_premium"]').html(strPremium);     
                    //收货地址
                    var strAddr = $('#customeraddr').find('option:selected').text().trim();
                    $('p[data-display="customeraddr"]').html(strAddr);               
                } else {
                    $('#form_wizard_1').find('.button-next').show();
                    $('#form_wizard_1').find('.button-submit').hide();
                }
                Metronic.scrollTo($('.page-title'));
            }

            // default form wizard
            $('#form_wizard_1').bootstrapWizard({
                'nextSelector': '.button-next',
                'previousSelector': '.button-previous',
                onTabClick: function (tab, navigation, index, clickedIndex) {
                    return false;
                    /*
                    success.hide();
                    error.hide();
                    if (form.valid() == false) {
                        return false;
                    }
                    handleTitle(tab, navigation, clickedIndex);
                    */
                },
                onNext: function (tab, navigation, index) {
                    success.hide();
                    error.hide();

                    if (form.valid() == false) {
                        return false;
                    }

                    handleTitle(tab, navigation, index);
                },
                onPrevious: function (tab, navigation, index) {
                    success.hide();
                    error.hide();

                    handleTitle(tab, navigation, index);
                },
                onTabShow: function (tab, navigation, index) {
                    var total = navigation.find('li').length;
                    var current = index + 1;
                    var $percent = (current / total) * 100;
                    $('#form_wizard_1').find('.progress-bar').css({
                        width: $percent + '%'
                    });
                }
            });

            $('#form_wizard_1').find('.button-previous').hide();
            $('#form_wizard_1 .button-submit').click(function () {
                // alert('订单添加成功! :)');
                var iLen = $('.ProductList .col-md-6').length;
                var strNum;
                var strPremium;
                var strType;
                var strGoods;
                var strRemarks;
                //var strAdress;
                var strPhone;
                var strName;
                strRemarks = $("textarea[name='remarks']").val();
                //strAdress = $('#customeraddr').find('option:selected').text().trim();
                strPhone = $("input[name='phone']").val();
                strName = $("input[name='name']").val();

                var data={
                    order_sn:  $('#ordersn').val(),//订单编号
                    cus_id:  $('#customername').val(),//客户ID
                    postscripts: strRemarks,//备注
                    //goods_number: strNum,//商品数量
                    //goods_id: strGoods,//商品ID
                    //cat_id: strType,//商品大类
                    //goods_premium: strPremium,// 单价
                    order_status: 1,
                    //order_adress: strAdress,//联系地址+联系人
                    province: $('#myModal2 select[name=province]').val(),
                    city:$('#myModal2 input[name=city]').val(),
                    area:$('#myModal2 input[name=area]').val(),
                    address:$('#myModal2 input[name=address]').val(),
                    consignee: strName,
                    mobile: strPhone,
                    zipcode: $('input[name=zipcode]').val(),
                    goods_num:iLen//商品条数
               };

                //拼凑JSON 字符串，再将字符串转JSON对象赋值传值
                //如果用二维数组，数据转为JSON对象较为麻烦
                var goods ={};
                var str='';
                for (var i = 0; i < iLen; i++) {
                    goods['goods_id'] = $('.ProductList #goodslist:eq(' + i + ')').val();
                    goods['goods_number'] = $('.ProductList .col-md-6  input[name="product_num"]:eq(' + i + ')').val();
                    goods['goods_price'] = $('.ProductList .col-md-6  input[name="goods_premium"]:eq(' + i + ')').val();
                    //goods['cat_id'] = $('.ProductList #cat_type:eq(' + i + ')').val();
                    if (i > 0) {
                        str += ','+JSON.stringify(goods);
                    }else{
                        str = JSON.stringify(goods);
                    }                    
                };       
                str = '[' + str + ']';
                data.goodsinfo = $.parseJSON(str);//商品信息

               var obj = JSON.stringify(data);
               //infoTips('输入字符串:<br>' + obj);

			   var strUrl = getRootUrl('order') + "order/order_insert";
				   $.post(strUrl,data,function(data,status){
						if (status == "success") {
                            obj = $.parseJSON(data)
                            location.href = getRootUrl('order') + "order/review/"+ obj.id +"?i=1";
						}
						else
						{
							infoTips("保存设置失败，请稍后重试或联系管理员!");
						}
				   });
            }).hide();

        }

    };

}();