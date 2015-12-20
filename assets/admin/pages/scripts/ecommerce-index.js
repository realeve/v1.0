var EcommerceIndex = function () {

    function showTooltip(x, y, labelX, labelY) {
        $('<div id="tooltip" class="chart-tooltip"><i class="fa fa-rmb"></i>' + (labelY.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')) + '<\/div>').css({
            position: 'absolute',
            display: 'none',
            top: y - 40,
            left: x - 60,
            border: '0px solid #ccc',
            padding: '2px 6px',
            'background-color': '#fff'
        }).appendTo("body").fadeIn(200);
    }
    
    var initChart2 = function () {
        var url = getRootUrl('main')+'order/main_order_amount_list';
        var data = new Array();
        var order_amount = 0;
        $.ajax({
            url:url,
            type:'get',
            async:false,
            success: function(ReturnData){
                 var obj = $.parseJSON(ReturnData);
                 for (var i = 0; i <obj.length; i++) {
                    data[i] = new Array();
                    data[i][0] = obj[i].order_time;
                    data[i][1] = obj[i].order_amount;    
                    order_amount += parseFloat(data[i][1]);
                 };
            }
        });  
        $('.well h3:eq(1)').html('<i class="fa fa-rmb"></i>' + order_amount);
        var plot_statistics = $.plot(
                $("#statistics_2"), 
                [
                    {
                        data:data,
                        lines: {
                            fill: 0.6,
                            lineWidth: 0
                        },
                        color: ['#BAD9F5']
                    },
                    {
                        data: data,
                        points: {
                            show: true,
                            fill: true,
                            radius: 5,
                            fillColor: "#BAD9F5",
                            lineWidth: 3
                        },
                        color: '#fff',
                        shadowSize: 0
                    }
                ], 
                {

                    xaxis: {
                        tickLength: 0,
                        tickDecimals: 0,                        
                        mode: "categories",
                        min: 2,
                        font: {
                            lineHeight: 14,
                            style: "normal",
                            variant: "small-caps",
                            color: "#6F7B8A"
                        }
                    },
                    yaxis: {
                        ticks: 3,
                        tickDecimals: 0,
                        tickColor: "#f0f0f0",
                        font: {
                            lineHeight: 14,
                            style: "normal",
                            variant: "small-caps",
                            color: "#6F7B8A"
                        }
                    },
                    grid: {
                        backgroundColor: {
                            colors: ["#fff", "#fff"]
                        },
                        borderWidth: 1,
                        borderColor: "#f0f0f0",
                        margin: 0,
                        minBorderMargin: 0,
                        labelMargin: 20,
                        hoverable: true,
                        clickable: true,
                        mouseActiveRadius: 6
                    },
                    legend: {
                        show: false
                    }
                }
            );

            var previousPoint = null;

            $("#statistics_2").bind("plothover", function (event, pos, item) {
                $("#x").text(pos.x.toFixed(2));
                $("#y").text(pos.y.toFixed(2));
                if (item) {
                    if (previousPoint != item.dataIndex) {
                        previousPoint = item.dataIndex;

                        $("#tooltip").remove();
                        var x = item.datapoint[0].toFixed(2),
                            y = item.datapoint[1].toFixed(2);

                       showTooltip(item.pageX, item.pageY, item.datapoint[0], item.datapoint[1]);
                    }
                } else {
                    $("#tooltip").remove();
                    previousPoint = null;
                }
            });
    }

    var initChart1 = function () {
        var url = getRootUrl('main')+'order/main_settle_amount_list';
        var data = new Array();
        var settle_amount = 0;
        $.ajax({
            url:url,
            type:'get',
            async:false,
            success: function(ReturnData){
                 var obj = $.parseJSON(ReturnData);
                 for (var i = 0; i <obj.length; i++) {
                    data[i] = new Array();
                    data[i][0] = obj[i].order_time;
                    data[i][1] = obj[i].settle_amount;    
                    settle_amount += parseFloat(data[i][1]);
                 };
                 console.log(data);
            }
        });  
        $('.well h3:eq(0)').html('<i class="fa fa-rmb"></i>' + settle_amount);
        var plot_statistics = $.plot(
            $("#statistics_1"), 
            [
                {
                    data:data,
                    lines: {
                        fill: 0.6,
                        lineWidth: 0
                    },
                    color: ['#f89f9f']
                },
                {
                    data: data,
                    points: {
                        show: true,
                        fill: true,
                        radius: 5,
                        fillColor: "#f89f9f",
                        lineWidth: 3
                    },
                    color: '#fff',
                    shadowSize: 0
                }
            ], 
            {

                xaxis: {
                    tickLength: 0,
                    tickDecimals: 0,                        
                    mode: "categories",
                    min: 2,
                    font: {
                        lineHeight: 15,
                        style: "normal",
                        variant: "small-caps",
                        color: "#6F7B8A"
                    }
                },
                yaxis: {
                    ticks: 3,
                    tickDecimals: 0,
                    tickColor: "#f0f0f0",
                    font: {
                        lineHeight: 15,
                        style: "normal",
                        variant: "small-caps",
                        color: "#6F7B8A"
                    }
                },
                grid: {
                    backgroundColor: {
                        colors: ["#fff", "#fff"]
                    },
                    borderWidth: 1,
                    borderColor: "#f0f0f0",
                    margin: 0,
                    minBorderMargin: 0,
                    labelMargin: 20,
                    hoverable: true,
                    clickable: true,
                    mouseActiveRadius: 6
                },
                legend: {
                    show: false
                }
            }
        );

        var previousPoint = null;

        $("#statistics_1").bind("plothover", function (event, pos, item) {
            $("#x").text(pos.x.toFixed(2));
            $("#y").text(pos.y.toFixed(2));
            if (item) {
                if (previousPoint != item.dataIndex) {
                    previousPoint = item.dataIndex;

                    $("#tooltip").remove();
                    var x = item.datapoint[0].toFixed(2),
                        y = item.datapoint[1].toFixed(2);

                    showTooltip(item.pageX, item.pageY, item.datapoint[0], item.datapoint[1]);
                }
            } else {
                $("#tooltip").remove();
                previousPoint = null;
            }
        });

        $('#overview_1 .view-order').live('click',function() {
            var sn = $(this).parent().attr('sn');
            //跳转
            location.href = getRootUrl('main') + "order/review/" + sn;
        });
        $('#overview_2 .view-customer').live('click',function() {
            var sn = $(this).parent().attr('sn');
            //跳转
            location.href = getRootUrl('main') + "customer/review/" + sn;
        });
        $('#overview_3 .view-product').live('click',function() {
            var sn = $(this).parent().attr('sn');
            //跳转
            location.href = getRootUrl('main') + "goods/edit/" + sn;
        });

        $('.reload:eq(0)').click(function() {
            RefreshOrderList();
            RefreshCustomerList();
            RefreshProductList();
        });
    }

    var RefreshOrderList = function (){
        var url = getRootUrl('main') + 'order/main_order_list';
        var emptyTr = '<tr><td></td><td></td><td></td><td></td><td></td><td align="center"><a class="btn default btn-xs green-stripe view-order"> 查看 </a></td></tr>';
        $.get(url,function(data){
            var obj = $.parseJSON(data);
            $('#order-list').html(emptyTr);
            var iRow = obj.length;
            for (var i = 0; i <iRow; i++) {
                if(i){
                  $('#order-list').append($('#order-list tr:eq(0)').clone());
                }
                $('#order-list tr').last().find('td:eq(0)').text(obj[i].order_sn);
                $('#order-list tr').last().find('td:eq(1)').text(obj[i].order_updatetime);
                $('#order-list tr').last().find('td:eq(2)').text(obj[i].sub_amount);
                $('#order-list tr').last().find('td:eq(3)').text(obj[i].sub_settle);
                $('#order-list tr').last().find('td:eq(4)').text(obj[i].order_status);
                $('#order-list tr').last().find('td:eq(5)').attr('sn',obj[i].order_id);
            };
        });
    }

    var RefreshCustomerList = function (){
        var url = getRootUrl('main') + 'order/main_customer_list';
        var emptyTr = '<tr><td></td><td></td><td></td><td></td><td></td><td></td><td align="center"><a class="btn default btn-xs green-stripe view-customer"> 查看 </a></td></tr>';
        $.get(url,function(data){
            var obj = $.parseJSON(data);
            $('#customer-list').html(emptyTr);
            var iRow = obj.length;
            if(iRow>5) iRow =5;
            for (var i = 0; i <iRow; i++) {
                if(i){
                  $('#customer-list').append($('#customer-list tr:eq(0)').clone());
                }
                $('#customer-list tr').last().find('td:eq(0)').text(obj[i].cus_name);
                $('#customer-list tr').last().find('td:eq(1)').text(obj[i].orderamount);
                $('#customer-list tr').last().find('td:eq(2)').text(obj[i].settleamount);
                $('#customer-list tr').last().find('td:eq(3)').text(obj[i].credit);
                $('#customer-list tr').last().find('td:eq(4)').text(parseFloat(obj[i].cur_value));
                $('#customer-list tr').last().find('td:eq(5)').text(obj[i].alarm);
                $('#customer-list tr').last().find('td:eq(6)').attr('sn',obj[i].cus_id);
            };
        });
    }

    var RefreshProductList = function (){
        var url = getRootUrl('main') + 'order/main_product_list';
        var emptyTr = '<tr><td></td><td></td><td></td><td></td><td></td><td></td><td align="center"><a class="btn default btn-xs green-stripe view-product"> 编辑 </a></td></tr>';
        $.get(url,function(data){
            var obj = $.parseJSON(data);
            $('#Product-list').html(emptyTr);
            var iRow = obj.length;
            if(iRow>5) iRow =5;
            for (var i = 0; i <iRow; i++) {
                if(i){
                  $('#Product-list').append($('#Product-list tr:eq(0)').clone());
                }
                $('#Product-list tr').last().find('td:eq(0)').text(obj[i].goods_sn);
                $('#Product-list tr').last().find('td:eq(1)').text(obj[i].goods_name);
                $('#Product-list tr').last().find('td:eq(2)').text(obj[i].cat_name);
                $('#Product-list tr').last().find('td:eq(3)').text(obj[i].goods_price);
                $('#Product-list tr').last().find('td:eq(4)').text(obj[i].total_settle_num);                
                $('#Product-list tr').last().find('td:eq(5)').text(obj[i].saledate);
                $('#Product-list tr').last().find('td:eq(6)').attr('sn',obj[i].goods_id);
            };
        });
    }

    return {

        //main function
        init: function () {
            initChart1();
            RefreshOrderList();
            RefreshCustomerList();
            RefreshProductList();
            //$('#statistics_amounts_tab').on('shown.bs.tab', function (e) {
                initChart2();
            //});
        }

    };

}();