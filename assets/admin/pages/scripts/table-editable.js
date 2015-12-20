var TableEditable = function () {

    var handleTable = function () {

        function restoreRow(oTable, nRow) {
            var aData = oTable.fnGetData(nRow);
            var jqTds = $('>td', nRow);

            for (var i = 0, iLen = jqTds.length; i < iLen; i++) {
                oTable.fnUpdate(aData[i], nRow, i, false);
            }

            oTable.fnDraw();
        }

        function editRow(oTable, nRow) {
            var aData = oTable.fnGetData(nRow);
            var jqTds = $('>td', nRow);
            //创建分类下拉框
            //jqTds[0].innerHTML = '<input type="text" class="form-control input-sm" value="' + aData[0] + '">';
            var url = getRootUrl('order')+'goods/create_cat_html';
            $.post(url,function (options) {
                jqTds[0].innerHTML = '<select>' + options + '</select>';
                cat_val = $('#sample_editable_1 select:eq(0)').parent().attr("value");
                $('#sample_editable_1 select:eq(0)').val(cat_val);
                //更新下一组数据                
                var url =getRootUrl('order')+'order/goodslist_html?cat_id=' + cat_val;
                $.get(url, function (options) {
                    jqTds[1].innerHTML = '<select>' + options + '</select>';
                    $('#sample_editable_1 select:eq(1)').val($('#sample_editable_1 select:eq(1)').parent().attr("value"));
                });
             });
           
            //jqTds[2].innerHTML = '<input type="text" class="form-control input-sm" value="' + aData[2] + '">';
            jqTds[3].innerHTML = '<input type="text" class="form-control input-sm" value="' + aData[3] + '">';
            //jqTds[4].innerHTML = '<input type="text" class="form-control input-sm" value="' + aData[4] + '">';
            //jqTds[5].innerHTML = '<input type="text" class="form-control input-sm" value="' + aData[5] + '">';
            jqTds[6].innerHTML = '<input type="text" class="form-control input-sm" maxlength="2" value="' + aData[6] + '">';
            //jqTds[8].innerHTML = '<a class="cancel" href="javascript:;">取消</a>';
            /*var objTR = $('#sample_editable_1 select:eq(0)').parent().parent();
            objTR.find('a:eq(0)').text('保存');
            objTR.find('a:eq(1)').text('取消');
            objTR.find('a:eq(1)').removeClass('delete');
            objTR.find('a:eq(1)').addClass('cancel');*/
            //$('#sample_editable_1 select:eq(0)').parent().parent().find('a:eq(0)')

            //编辑状态下，新增按钮不可用
            $('#sample_editable_1_new').attr('disabled',true);
        }

        //选择分类
        $('#sample_editable_1 select:eq(0)').live('change',function() {
            var cat_val = $(this).val();
            //更新下一组数据                
            var url = getRootUrl('order')+'order/goodslist_html?cat_id=' + cat_val;
            var objTR = $('#sample_editable_1 select:eq(0)').parent().parent();
            //更新td-value值
            $('#sample_editable_1 select:eq(0)').parent().attr('value',cat_val); 
            var options = {
                url:url,
                type:'get',
                success: function(options) {
                     $('#sample_editable_1 select:eq(1)').html('<select>' + options + '</select>');
                     //单价、数量、总价、重量、折扣
                     objTR.find('td:eq(2)').text(0);
                     objTR.find('td:eq(4)').text(0);
                     objTR.find('td:eq(5)').text(0);
                     objTR.find('input').val(0);
                }
            };
            $.ajax(options);
        });

        //选择商品
        $('#sample_editable_1 select:eq(1)').live('change',function() {
            var goods_val = $(this).val();
            //更新数据                
            var url = getRootUrl('order')+'order/get_good?goods_id=' + goods_val;
            var objTR = $('#sample_editable_1 select:eq(1)').parent().parent();

            //更新td-value值
            $('#sample_editable_1 select:eq(1)').parent().attr('value',goods_val); 

            //商品有效性校验
            var goods_text = $('#sample_editable_1 select:eq(1)').find('option:selected').text().replace(/\./g,'');
            for (var i = 2; i < $('#sample_editable_1 tr').length; i++) {
                var exist_good_val = $('#sample_editable_1 tr:eq('+ i +')').find('td:eq(1)').attr('value');
                if(goods_val == exist_good_val)
                {
                    infoTips('商品'+ goods_text + '已存在，请重新选择',3);
                    return;
                }
            };

            //更新数据
            var options = {
                url:url,
                type:'get',
                success: function(data) {
                     var obj = $.parseJSON(data);
                     //单价：data.goods_price;
                     //重量：data.goods_weight;
                     var nums = objTR.find('input').val();
                     objTR.find('td:eq(2)').text(obj.goods_price);
                     objTR.find('td:eq(4)').text(nums * obj.goods_price );
                     objTR.find('td:eq(5)').attr('value',obj.goods_weight);
                     objTR.find('td:eq(5)').text(nums * obj.goods_weight);
                }
            };
            $.ajax(options);

        });

        //数量变化
        $('#sample_editable_1 input:eq(0)').live('keyup',function() {
            var objTR = $(this).parent().parent();
            var price = objTR.find('td:eq(2)').text().trim();
            var nums = $(this).val();
            var goods_weight = objTR.find('td:eq(5)').attr('value');
            var discount = objTR.find('input:eq(1)').val();
            var price_off = parseFloat(100 - discount)/100;
            //总价
            var sub_price = nums * price * price_off;
            objTR.find('td:eq(4)').text(sub_price.toFixed(2));
            objTR.find('td:eq(5)').text(nums * goods_weight);
            sumPrice();
        });

        //折扣
        $('#sample_editable_1 input:eq(1)').live('keyup',function() {
            var objTR = $(this).parent().parent();
            var price = objTR.find('td:eq(2)').text().trim();
            var discount = $(this).val();
            var nums = objTR.find('input:eq(0)').val();
            var price_off = parseFloat(100 - discount)/100;
            var sub_price = nums * price * price_off;
            objTR.find('td:eq(4)').text(sub_price.toFixed(2)); 
            sumPrice();
          });

        function sumPrice(){
            //汇总价格
            var sum_price = 0;
            for (var i = 1; i < $('#sample_editable_1 tr').length; i++) {
                sum_price += parseFloat($('#sample_editable_1 tr:eq(' + i + ')').find('td:eq(4)').text().trim());
            };
            var total = sum_price + parseFloat($('.well .value:eq(1)').text().trim().replace('￥','')) + parseFloat($('.well .value:eq(2)').text().trim().replace('￥',''));
            $('.well .value:eq(0)').text('￥' + sum_price.toFixed(2));
            $('.well .value:eq(3)').html('<span class="label label-danger">￥' + total.toFixed(2));
        }

        function saveRow(oTable, nRow) {
            var cat_text = $('#sample_editable_1 select:eq(0)').find('option:selected').text().replace(/\./g,'');            
            var goods_text = $('#sample_editable_1 select:eq(1)').find('option:selected').text().replace(/\./g,'');
            var cat_id = $('#sample_editable_1 select:eq(0)').val();
            var goods_id = $('#sample_editable_1 select:eq(1)').val();
            var objTR = $('#sample_editable_1 select:eq(1)').parent().parent();
            var price = objTR.find('td:eq(2)').text().trim();
            var totalprice = objTR.find('td:eq(4)').text().trim();
            var weight = objTR.find('td:eq(5)').text().trim(); 
            var nums = objTR.find('input:eq(0)').val(); 
            var discount = objTR.find('input:eq(1)').val(); 
            var rec_id = objTR.find('a:eq(0)').attr('sn-rec');
            //取值-写到后台
            var data;
            data = {
                'order_id':$('#sample_editable_1_new').attr('sn'),
                'cat_id':cat_id,
                'goods_id':goods_id,
                'goods_price':price,
                'goods_number':nums,
                'discount':discount,
                'sub_weight':weight,
                'sub_amount':totalprice,
                'rec_id':rec_id
            }
            //种类、商品、数量不能为空
            if ( 0!=cat_id && 0!=goods_id && 0!=nums) {   
                //var jqInputs = $('input', nRow);
                //oTable.fnUpdate(jqInputs[1].value, nRow, 6, false); 
                oTable.fnUpdate(cat_text, nRow, 0, false);
                oTable.fnUpdate(goods_text, nRow, 1, false);          
                oTable.fnUpdate(price,nRow,2,false);    
                oTable.fnUpdate(nums, nRow, 3, false);
                oTable.fnUpdate(totalprice,nRow,4,false);
                oTable.fnUpdate(weight,nRow,5,false);
                oTable.fnUpdate(discount,nRow,6,false);
                if ( 0 == rec_id){
					var url = getRootUrl('order') + 'order/add_ordergood';
					$.post(url,data,function(data){
						 var obj = $.parseJSON(data);
						 rec_id = obj.type;
						 $('a[sn-rec=0]').attr('sn-rec',rec_id);
                         infoTips(obj.message,obj.type);						 
					});
                }
                else{
                   var url = getRootUrl('order') + 'order/update_ordergood';
					$.post(url,data,function(data){
						 var obj = $.parseJSON(data);
                         infoTips(obj.message,obj.type);						 
					});
                }

                $('a[sn-rec='+ rec_id +']:eq(0)').text('编辑');
                $('a[sn-rec='+ rec_id +']:eq(1)').text('删除');
                $('a[sn-rec='+ rec_id +']:eq(1)').removeClass('cancel');
                $('a[sn-rec='+ rec_id +']:eq(1)').addClass('delete');
                $('#sample_editable_1_new').attr('disabled',false);
               //oTable.fnDraw();
            }
            else
            {
                infoTips('商品类别、商品名、数量数量不能为空');
            }
        }

        function cancelEditRow(oTable, nRow) {
            var jqInputs = $('input', nRow);
            oTable.fnUpdate(jqInputs[0].value, nRow, 0, false);
            oTable.fnUpdate(jqInputs[1].value, nRow, 1, false);
            oTable.fnUpdate(jqInputs[2].value, nRow, 2, false);
            oTable.fnUpdate(jqInputs[3].value, nRow, 3, false);
            oTable.fnUpdate(jqInputs[4].value, nRow, 4, false);
            oTable.fnUpdate(jqInputs[5].value, nRow, 5, false);
            oTable.fnUpdate(jqInputs[6].value, nRow, 6, false);
            var objTR = $('#sample_editable_1 select:eq(0)').parent().parent();
            objTR.find('a:eq(0)').text('编辑');
            oTable.fnDraw();
        }

        var table = $('#sample_editable_1');

        var oTable = table.dataTable({

            // Uncomment below line("dom" parameter) to fix the dropdown overflow issue in the datatable cells. The default datatable layout
            // setup uses scrollable div(table-scrollable) with overflow:auto to enable vertical scroll(see: assets/global/plugins/datatables/plugins/bootstrap/dataTables.bootstrap.js). 
            // So when dropdowns used the scrollable div should be removed. 
            //"dom": "<'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r>t<'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>",

            "lengthMenu": [
                [5, 15, 20, 100,-1],
                [5, 15, 20, 100,"All"] // change per page values here
            ],
            // set the initial value
            "pageLength": 100,

            "language": {
                "lengthMenu": "每页显示 _MENU_ 条记录"
            },
            "columnDefs": [{ // set default column settings
                'orderable': true,
                'targets': [0]
            }, {
                "searchable": true,
                "targets": [0]
            }],
            "order": [
                [0, "asc"]
            ] // set first column as a default sort by asc
        });

        var tableWrapper = $("#sample_editable_1_wrapper");

        tableWrapper.find(".dataTables_length select").select2({
            showSearchInput: false //hide search box with special css class
        }); // initialize select2 dropdown

        var nEditing = null;
        var nNew = false;

        $('#sample_editable_1_new').click(function (e) {
            e.preventDefault();

            var aiNew = oTable.fnAddData(['', '', '', '', '', '', '', '<a class="edit" href="javascript:;" sn-rec="0">保存</a>', '<a class="cancel" href="javascript:;" sn-rec="0">取消</a>']);
            var nRow = oTable.fnGetNodes(aiNew[0]);
            editRow(oTable, nRow);
            nEditing = nRow;
            nNew = true;
        });

        table.on('click', '.delete', function (e) {
            e.preventDefault();
            var obj = $(this);
            bootbox.dialog({
                message: "确定删除这条商品?",
                title: "删除商品",
                buttons: {
                  success: {
                    label: "删除",
                    className: "green",
                    callback: function() {
                      var nRow = obj.parents('tr')[0];
                      oTable.fnDeleteRow(nRow);
                        var url = getRootUrl('order') + 'order/delete_ordergood';//'../order/delete';
                        $.post(url,{rec_id:obj.attr('sn-rec')},function(data){
                             var obj = $.parseJSON(data);
                             infoTips(obj.message,obj.type);
                        });
                    }
                  },
                  main: {
                    label: "取消",
                    className: "red",
                    callback: function() {
                      return;
                    }
                  }
                }
            });  
            
        });

        table.on('click', '.cancel', function (e) {
            e.preventDefault();
            if (nNew) {
                oTable.fnDeleteRow(nEditing);
                nEditing = null;
                nNew = false;
                $('#sample_editable_1_new').attr('disabled',false);
            } else {
                restoreRow(oTable, nEditing);
                nEditing = null;
            }
        });

        table.on('click', '.edit', function (e) {
            e.preventDefault();

            /* Get the row as a parent of the link that was clicked on */
            var nRow = $(this).parents('tr')[0];

            if (nEditing !== null && nEditing != nRow) {
                /* Currently editing - but not this row - restore the old before continuing to edit mode */
                restoreRow(oTable, nEditing);
                editRow(oTable, nRow);
                nEditing = nRow;
            } else if (nEditing == nRow && this.innerHTML == "保存") {
                /* Editing this row and want to save it */
                saveRow(oTable, nEditing);
                nEditing = null;
            } else {
                /* No edit in progress - let's start one */
                editRow(oTable, nRow);
                nEditing = nRow;
                //保存-取消
                $(this).text('保存');
                $(this).parent().parent().find('a:eq(1)').text('取消');
                $(this).parent().parent().find('a:eq(1)').removeClass('delete');
                $(this).parent().parent().find('a:eq(1)').addClass('cancel')
            }
        });

        function RefreshGoodsList(sn){
            var url = getRootUrl('order') + 'order/goods_settle_list_done';
            var emptyTr = '<tr><td></td><td></td><td class="hidden-xs"></td><td></td><td></td><td></td><td class="hidden-xs" widtd="15%"></td></tr>'
            $.get(url,{order_id:sn},function(data){
                var obj = $.parseJSON(data);
                $('#goods-list').html(emptyTr);
                var iRow = obj.length;
                $('[href=#tab_3] span').text(iRow);
                for (var i = 0; i <iRow; i++) {
                    if(i){
                      $('#goods-list').append($('#goods-list tr:eq(0)').clone());
                    }
                    $('#goods-list tr').last().find('td:eq(0)').text(obj[i].goods_name);
                    $('#goods-list tr').last().find('td:eq(1)').text(obj[i].goods_price);
                    $('#goods-list tr').last().find('td:eq(2)').text(obj[i].goods_number);
                    $('#goods-list tr').last().find('td:eq(3)').text(obj[i].settle_num);
                    $('#goods-list tr').last().find('td:eq(4)').text(obj[i].user_name);
                    $('#goods-list tr').last().find('td:eq(5)').text(obj[i].settle_log);
                    $('#goods-list tr').last().find('td:eq(6)').text(obj[i].settle_data);
                };
            });
        }
        RefreshGoodsList($('#sample_editable_1_new').attr('sn'));
    }

    return {

        //main function to initiate the module
        init: function () {
            handleTable();
        }

    };

}();