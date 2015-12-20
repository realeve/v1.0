var TableAdvanced = function () {
    var initTable1 = function () {
        var table = $('#sample_1');
        /* Formatting function for row expanded details */
        function fnFormatDetails(oTable, nTr,sn) {
            var aData = oTable.fnGetData(nTr);
            var sOut;
            sOut = '<tr><td>商品详单:</td><td sn='+ sn+'></td></tr>';           
            return sOut;
        }

        /*
         * Insert a 'details' column to the table
         */
        var nCloneTh = document.createElement('th');
        nCloneTh.className = "table-checkbox";
        
        var nCloneTd = document.createElement('td');
        nCloneTd.innerHTML = '<span class="row-details row-details-close"></span>';

        table.find('thead tr').each(function () {
            this.insertBefore(nCloneTh, this.childNodes[0]);
        });

        table.find('tbody tr').each(function () {
            this.insertBefore(nCloneTd.cloneNode(true), this.childNodes[0]);
        });

        var oTable = table.dataTable({

            // Internationalisation. For more info refer to http://datatables.net/manual/i18n
            "language": {
                "aria": {
                    "sortAscending": ": activate to sort column ascending",
                    "sortDescending": ": activate to sort column descending"
                },
                "emptyTable": "No data available in table",
                "info": "Showing _START_ to _END_ of _TOTAL_ entries",
                "infoEmpty": "No entries found",
                "infoFiltered": "(filtered1 from _MAX_ total entries)",
                "lengthMenu": "Show _MENU_ entries",
                "search": "Search:",
                "zeroRecords": "No matching records found"
            },

            "columnDefs": [{
                "orderable": false,
                "targets": [0]
            }],
            "order": [
                [1, 'asc']
            ],
            "lengthMenu": [
                [5, 15, 20, -1],
                [5, 15, 20, "All"] // change per page values here
            ],
            // set the initial value
            "pageLength": 5,
        });

        /* Add event listener for opening and closing details
         * Note that the indicator for showing which row is open is not controlled by DataTables,
         * rather it is done here
         */
        table.on('click', ' tbody td .row-details', function () {
            var nTr = $(this).parents('tr')[0];
            if (oTable.fnIsOpen(nTr)) {
                /* This row is already open - close it */
                $(this).addClass("row-details-close").removeClass("row-details-open");
                oTable.fnClose(nTr);
            } else {
                /* Open this row */
                $(this).addClass("row-details-open").removeClass("row-details-close");
                var sn = $(this).parent().parent().find('td:eq(1)').attr('sn');
                oTable.fnOpen(nTr, fnFormatDetails(oTable, nTr,sn), 'details');
                if($('.details td[sn='+ sn +']').text() == ''){
                    //读取商品详单
                    var url = getRootUrl('order')+'order/settle_goods_desc';
                    var param ={order_id:sn};
                    $.get(url,param,function(data){
                         var obj = $.parseJSON(data);
                         var goods_desc = '';
                         for(i=0;i<obj.length;i++){
                            if(i){
                                goods_desc +='、'+obj[i].goods_desc;
                            }else{
                                goods_desc = obj[i].goods_desc;
                            }
                         }
                         $('.details td[sn='+ sn +']').text(goods_desc);   
                    });     
                }                         
            }
        });

        table.on('click', '.detail', function (e) {
            e.preventDefault();
            var sn = $(this).parent().parent().find('td:eq(1)').attr('sn');
            var order_text = $(this).parent().parent().find('td:eq(1)').text().trim();            
            $('#order-title').text('订单号：'+order_text);
            $('#order-title').attr('order-sn',sn);
            RefreshGoodsList(sn);          
        });
        
        function RefreshGoodsList(sn){
            var url = getRootUrl('order') + 'order/goods_settle_list';
            var emptyTr = '<tr><td></td><td></td><td class="hidden-xs"></td><td></td><td></td><td></td><td></td><td class="hidden-xs" widtd="15%"></td>';
                emptyTr += '<td align="center"><a href="#myModal" class="btn btn-default btn-sm btn-circle check" data-toggle="modal"><span class="md-click-circle md-click-animate"></span>';
                emptyTr += '<i class="fa fa-cloud-upload"></i>结算</a></td></tr>'
            $.get(url,{order_id:sn},function(data){
                var obj = $.parseJSON(data);
                $('#goods-list').html(emptyTr);
                var iRow = obj.length;
                for (var i = 0; i <iRow; i++) {
                    if(i){
                      $('#goods-list').append($('#goods-list tr:eq(0)').clone());
                    }
                    $('#goods-list tr').last().find('td:eq(0)').text(obj[i].goods_name);
                    $('#goods-list tr').last().find('td:eq(1)').text(obj[i].goods_price);
                    $('#goods-list tr').last().find('td:eq(2)').text(obj[i].goods_number);
                    $('#goods-list tr').last().find('td:eq(3)').text(obj[i].settle_num);
                    $('#goods-list tr').last().find('td:eq(4)').text(obj[i].sum_settle);
                    $('#goods-list tr').last().find('td:eq(5)').text(obj[i].discount);
                    $('#goods-list tr').last().find('td:eq(6)').text(obj[i].sub_amount);
                    $('#goods-list tr').last().find('td:eq(7)').text(obj[i].order_updatetime);
                    $('#goods-list tr').last().find('td:eq(8)').attr('rec-sn',obj[i].rec_id)
                };
            });
        }
        
        $('[href="#myModal"]').live("click",function(){
            var objTR = $(this).parent().parent();
            var goods_name = objTR.find('td:eq(0)').text().trim();
            var rec_id = $(this).parent().attr('rec-sn');
            $('#myModal .caption-subject').text(goods_name);
            $('#myModal .caption-subject').attr('rec_id',rec_id);
            var goods_number = objTR.find('td:eq(2)').text().trim();
            var settle_num = objTR.find('td:eq(3)').text().trim();
            var tips = goods_number - settle_num;
            $('#myModal .help-block').text("商品结算数不能超过"+tips);
            $('#myModal input').val('');
            $('#myModal textarea').val('');
            $('#myModal input').attr('data-max',tips);
        });

        $('#myModal #submit').click(function() {
            if($('#myModal input').val() > parseInt($('#myModal input').attr('data-max'))){
                infoTips('结算数不能超过' + $('#myModal input').attr('data-max'),3);
                return;
            }else if($('#myModal input').val()<1){
                infoTips('结算数至少需为1',3);
                return;
            }

            var remarks = $('#myModal  textarea').val();
            if (remarks == '') {remarks ='无'};
			var settle_num = $('#myModal  input').val();
            var data={
                rec_id:$('#myModal .caption-subject').attr('rec_id'),
                settle_num:settle_num,//本次结算量，不代表总结算量
                settle_log: remarks,
            }
            var url = getRootUrl('order') +'order/update_settle';
            $.get(url,data, function(data){  
                //如果是最后一条信息刷新页面
                if($('#goods-list tr').length == 1)
                {
                    location.href = getRootUrl('order') + "order/settle?i=1";
                }   
                else
                {                    //刷新商品信息
                    var sn = $('#order-title').attr('order-sn');
                    RefreshGoodsList(sn);
                    var obj = $.parseJSON(data);
                    infoTips(obj.message,obj.type);
                }           
            });
        });

    }

    return {

        //main function to initiate the module
        init: function () {

            if (!jQuery().dataTable) {
                return;
            }
            initTable1();
        }

    };

}();