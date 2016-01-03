var FormWizard = function () {


    return {
        //main function to initiate the module
        init: function () {
            if (!jQuery().bootstrapWizard) {
                return;
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
                    select_cat: {
                        required: true
                    },
                    select_name: {
                        required: true
                    },
                    addInfo: {
                        required: true
                    }
                },
                errorPlacement: function (error, element) { // render error placement for each input type
                    if (element.attr("name") == "gender") { // for uniform radio buttons, insert the after the given container
                        error.insertAfter("#form_gender_error");
                    } else if (element.attr("name") == "payment[]") { // for uniform checkboxes, insert the after the given container
                        error.insertAfter("#form_payment_error");
                    } else {
                        error.insertAfter(element); // for other inputs, just perform default behavior
                    }
                },

                invalidHandler: function (event, validator) { //display error alert on form submit   
                    bsTips('请检查输入数据的有效性');
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
                    if (label.attr("for") == "gender" || label.attr("for") == "payment[]") { // for checkboxes and radio buttons, no need to show OK icon
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
                    bsTips('数据有效性校验通过');
                    //add here some ajax code to submit your form or just call form.submit() if you want to submit the form without ajax
                }

            });

            var displayConfirm = function() {
                $('#tab3 .form-control-static', form).each(function(){
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
                    } else if ($(this).attr("data-display") == 'payment[]') {
                        var payment = [];
                        $('[name="payment[]"]:checked', form).each(function(){ 
                            payment.push($(this).attr('data-title'));
                        });
                        $(this).html(payment.join("<br>"));
                    }
                });

                 $.fn.select2.defaults.set("theme", "bootstrap");
            }

            var handleTitle = function(tab, navigation, index) {
                var total = navigation.find('li').length;
                var current = index + 1;
                // set wizard title
                $('.step-title', $('#form_wizard_1')).text('第 ' + (index + 1) + ' 步，共 ' + total+' 步');
                // set done steps
                jQuery('li', $('#form_wizard_1')).removeClass("done");
                var li_list = navigation.find('li');
                for (var i = 0; i < index; i++) {
                    jQuery(li_list[i]).addClass("done");
                }
                switch(current){
                    case 1:
                        $('#form_wizard_1').find('.button-previous').hide();
                        $('#form_wizard_1').find('.button-next').show();


                        $('.mt-step-col:nth(0)').removeClass('done').addClass('active');
                        $('.mt-step-col:nth(1)').removeClass('active').removeClass('done');
                        break;
                    case 2:
                        if($('#tab2 a.btn-circle:gt(0)').length>0){
                            $('#form_wizard_1').find('.button-next').show();
                        }else
                        {
                            $('#form_wizard_1').find('.button-next').hide();
                        }
                        $('.mt-step-col:nth(1)').addClass('active');
                        $('.mt-step-col').first().removeClass('active');
                        $('.mt-step-col').first().addClass('done');
                        $('#form_wizard_1').find('.button-submit').hide();
                        $('#form_wizard_1').find('.button-previous').show();
                        $('.mt-step-col:nth(2)').removeClass('active').removeClass('done');
                        break;
                    case 3:
                        $('#form_wizard_1').find('.button-next').hide();
                        $('#form_wizard_1').find('.button-submit').show();
                        $('.mt-step-col:nth(1)').removeClass('active');
                        $('.mt-step-col:nth(1)').addClass('done');
                        $('.mt-step-col').last().addClass('active');

                        //列表编辑数据预览
                        var curVal = parseInt($("select[name='select_name'] option").last().val(),10)+1;
                        var len = $('#tab2 input[name="addInfo"]').length;
                        var text,j,strHTML='',strOption='';
                        for (i = 0; i < len; i++) {
                            text = $('#tab2 input[name="addInfo"]:nth('+ i +')').val();
                            val = i+curVal;
                            j = i+1;
                            strHTML +='<div class="form-group">';
                            strHTML +='    <label class="control-label col-md-3">'+j+'</label>';
                            strHTML +='           <div class="col-md-2">';
                            strHTML +='              <p class="form-control-static">'+val+'</p>';
                            strHTML +='           </div>';
                            strHTML +='           <div class="col-md-3">';
                            strHTML +='              <p class="form-control-static">'+text+'</p>';
                            strHTML +='            </div>';
                            strHTML +='</div>';
                            strOption +=  '<option value="' + val + '">' + text + '</option>';
                        }
                        if (len) {                            
                            $("select[name='preview']").append(strOption);
                            $('#tab3').last().append(strHTML);
                        }
                        break;
                }
                App.scrollTo($('.page-title'));
            };

            // default form wizard
            $('#form_wizard_1').bootstrapWizard({
                'nextSelector': '.button-next',
                'previousSelector': '.button-previous',
                onTabClick: function (tab, navigation, index, clickedIndex) {
                   
                    success.hide();
                    error.hide();
                    if (form.valid() === false) {
                        return false;
                    }
                    
                    handleTitle(tab, navigation, clickedIndex);
                },
                onNext: function (tab, navigation, index) {
                    success.hide();
                    error.hide();

                    if (form.valid() === false) {
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
                bsTips('Finished! Hope you like it :)',1);
            }).hide();

            //apply validation on select2 dropdown value change, this only needed for chosen dropdown integration.
            $('#country_list', form).change(function () {
                form.validate().element($(this)); //revalidate the chosen dropdown value and show error or success message for the input
            });
        }

    };

}();

var handleSelect2 = function(){
    function initDOM() {
        var str = getRootPath(1) + "/DataInterface/Api?Token=79d84495ca776ccb523114a2120e273ca80b315b&ID=34&M=3";
        var Data = ReadData(str);
        InitSelect("select_cat", Data);
        var i = 1;
        Data.data.map(function(elem) {
            $("select[name='select_cat'] option:nth("+ i +")").attr('data-apiUrl',elem[2]);
            $("select[name='select_cat'] option:nth("+ i +")").attr('data-tblID',elem[3]);
            i++;
        });
    }

    $(document).on('change','select[name="select_cat"]', function() {
        var str = getRootPath(1)+"/"+$(this).find("option:selected").attr('data-apiUrl');
        var tblID = getRootPath(1)+"/"+$(this).find("option:selected").attr('data-tblID');
        var Data = ReadData(str);
        var selText = $(this).find("option:selected").text();
        InitSelect("select_name",Data);
        InitSelect("preview", Data);
        $("select[name='select_name']").attr('data-tblID',tblID);
        $('span[name="selectName"]').text(selText);
        $('#tab3 p[data-display="select_cat"]').text(selText);
        $('a.button-next').click();
    });

    $('#tab2 a.btn-circle:nth(0)').on('click',function() {
        $('#form_wizard_1').find('.button-next').show();
        var strHTML = '<div class="form-group">';
            strHTML +='    <label class="control-label col-md-3">待增加项';
            strHTML +='         <span class="required"> * </span>';
            strHTML +='     </label>';
            strHTML +='     <div class="col-md-4">';
            strHTML +='         <input type="text" class="form-control" name="addInfo"/>';
            strHTML +='         <span class="help-block"> 输入待增加项信息 </span>';
            strHTML +='     </div>';
            strHTML +='     <a href="javascript:;" class="btn btn-circle btn-icon-only red">';
            strHTML +='         <i class="fa fa-minus"></i>';
            strHTML +='     </a>';
            strHTML +=' </div>';
        $('#tab2').append(strHTML);
    });
    
    $(document).on('click', '#tab2 a.btn-circle:gt(0)', function() {
        $(this).parent().remove();
    });

    return{
        init: function(){
            initDOM();
        }
    };
}();

/*
var Profile = function() {

    var dashboardMainChart = null;

    return {

        //main function
        init: function() {
        
            Profile.initMiniCharts();
        },
        
        initMiniCharts: function() {

            // IE8 Fix: function.bind polyfill
            if (App.isIE8() && !Function.prototype.bind) {
                Function.prototype.bind = function(oThis) {
                    if (typeof this !== "function") {
                        // closest thing possible to the ECMAScript 5 internal IsCallable function
                        throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
                    }

                    var aArgs = Array.prototype.slice.call(arguments, 1),
                        fToBind = this,
                        fNOP = function() {},
                        fBound = function() {
                            return fToBind.apply(this instanceof fNOP && oThis ? this : oThis,
                                aArgs.concat(Array.prototype.slice.call(arguments)));
                        };

                    fNOP.prototype = this.prototype;
                    fBound.prototype = new fNOP();

                    return fBound;
                };
            }
           
            $("#sparkline_bar").sparkline([8, 9, 10, 11, 10, 10, 12, 10, 10, 11, 9, 12, 11], {
                type: 'bar',
                width: '100',
                barWidth: 6,
                height: '45',
                barColor: '#F36A5B',
                negBarColor: '#e02222'
            });

            $("#sparkline_bar2").sparkline([9, 11, 12, 13, 12, 13, 10, 14, 13, 11, 11, 12, 11], {
                type: 'bar',
                width: '100',
                barWidth: 6,
                height: '45',
                barColor: '#5C9BD1',
                negBarColor: '#e02222'
            });
        }

    };

}();*/

jQuery(document).ready(function() {
	initDom();
	FormWizard.init();
    //Profile.init();
    handleSelect2.init();
});

jQuery(window).resize(function() {
	HeadFix();
});