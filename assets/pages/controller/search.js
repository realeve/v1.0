var ec = [];
var search = function() {

  //公共函数
  /**
   * [convertGZInfo 冠字信息转换为搜索起始值]
   * @param  {[type]} str     [冠字号]
   * @param  {[type]} strProd [品种名]
   * @return {[type]}         [description]
   */
  var convertGZInfo = function(str, strProd) {

    //字符退位
    function minusChar(strAlpha) {

      strAlpha = strAlpha.toUpperCase();

      if (strAlpha == 'A') {
        return 'Z';
      }
      var code = strAlpha.charCodeAt() - 1;
      return String.fromCharCode(code);
    }

    //数字补齐
    function int2String(strNum, iLen) {
      iLen = iLen || 4;
      strNum = '000' + strNum;
      return jsRight(strNum, iLen);
    }

    /**
     * [getCodeRange 获取号码范围]
     * @param  {[type]} strInfo [冠字信息]
     * @return {[type]}         [号码范围]
     */
    function getCodeRange(str, strProd) {

      var strInfo = {
        num: parseInt(str.replace(/[A-Za-z]/g, ''), 10),
        alpha: str.replace(/[0-9]/g, '').toUpperCase(),
        kNum: (strProd == '9602A' || strProd == '9603A') ? 40 : 35
      };


      var range = {
        start: strInfo.num - strInfo.kNum,
        end: strInfo.num
      };

      var alphaList = {
        start: strInfo.alpha[0],
        end: strInfo.alpha[1]
      };

      var alphaList2 = {
        start: strInfo.alpha[0],
        end: strInfo.alpha[1]
      };

      range.start2 = range.start;
      range.end2 = range.end;

      //是否退万
      if (range.start < 0) {

        //需要退万产品，[start-9999]
        range.start += 10000;
        range.end = 9999;

        //需要退万产品，[0-end]
        range.start2 = 0;


        //字符退位处理(末位需处理)
        //退末位
        alphaList.end = minusChar(alphaList.end);

        //末位为A，首位也需退位
        if (alphaList2.end == 'A') {
          alphaList.start = minusChar(alphaList.start);
        }

      }

      return {

        alpha: alphaList,
        start: int2String(range.start),
        end: int2String(range.end),

        alpha2: alphaList2,
        start2: int2String(range.start2),
        end2: int2String(range.end2),
        codeNum: strInfo.num
      };

    }

    //字符串之间加星
    function addStarBtwStr(alphaList, num) {
      var stars = '';
      for (var i = 0; i < num; i++) {
        stars += '*';
      }
      return alphaList.start + stars + alphaList.end;
    }

    var gzInfo = getCodeRange(str, strProd);

    var gz = [/^[A-Za-z]{2}\d{4}$/, /^[A-Za-z]\d[A-Za-z]\d{3}$/, /^[A-Za-z]\d{2}[A-Za-z]\d{2}$/, /^[A-Za-z]\d{3}[A-Za-z]\d$/, /^[A-Za-z]\d{4}[A-Za-z]\$/];

    for (var i = 0; i < gz.length; i++) {
      if (gz[i].test(str)) {
        gzInfo.alpha = addStarBtwStr(gzInfo.alpha, i);
        gzInfo.alpha2 = addStarBtwStr(gzInfo.alpha2, i);
        break;
      }
    }

    return gzInfo;
  };

  //根据起始冠字及指定号码获取开位信息
  function getKinfo(end, start) {
    var num = parseInt(end, 10) - parseInt(start, 10);
    if (num < 0) {
      num += 10000;
    }
    num++;
    return num;
  }

  //查询字符串
  //品种/车号（冠字号）/印码号/大张号
  var queryString = {
    prod: '',
    cart: '',
    codeNo: '',
    paperNo: '',
    type: 0
  };

  //全局车号信息
  var cartInfo = {};

  function getInputData() {
    //get data
    queryString.cart = $('[name="cart"]').val().trim().toUpperCase();
    //queryString.codeNo = $('[name="codeNo"]').val().trim();
    //queryString.paperNo = $('[name="paperNo"]').val().trim();
  }

  function getCartData(updateHisInfo) {

    //匹配查询类型
    queryString.type = judgeSearchType(queryString.cart);

    //是否是本页面链接点击进入
    if (typeof updateHisInfo == 'undefined') {
      queryString.updateHisInfo = true;
    } else {
      queryString.updateHisInfo = updateHisInfo;
    }

    var showPanel = false;

    switch (queryString.type) {
      case config.search.ERR:
        bsTips('请输入有效的车号或冠字信息');
        showPanel = true;
        break;
      case config.search.GZ:
        if (queryString.prod === '') {
          bsTips('冠字号查询需选择品种信息');
          showPanel = true;
          $('[name="cart"]').val(queryString.cart);
        } else {
          getCartInfo(queryString);
        }
        break;
      case config.search.CART:
        //
        if (queryString.codeNo !== '' && queryString.codeNo.length == 4) {
          queryString.type = config.search.CODENO;
        } else if (queryString.paperNo !== '' && queryString.paperNo.length == 4) {
          queryString.type = config.search.PAPERNO;
        }

        getCartInfo(queryString);
        break;
      case config.search.CODE:
        //印码号查询相关信息
        break;
      case config.search.REEL:
        window.location.href = '/search/paper#' + queryString.cart;
        break;
    }

    if (showPanel) {
      $('[name="querySetting"]').click();
    }

    bsTips('数据加载完毕', 1);
  }

  var getStorageInfo = function(cartNo) {
    //缓存一天
    //SELECT a.DepartmentName 部门, a.CaptainName 机台, convert(varchar,a.ProduceDate,120) 生产日期 FROM dbo.CaptainData AS a  INNER JOIN MaHouData b on a.MahouID=b.id and b.CartNumber=?
    //cart
    var url = getRootPath(1) + "/DataInterface/Api?Token=" + config.TOKEN + "&ID=285&M=3&cart=" + cartNo + '&cache=1440';
    $.ajax({
        url: url
      })
      .done(function(data) {
        data = handleAjaxData(data);
        //显示头部(默认不显示)
        data.showHead = 1;
        tpl.render('simpleTable.etpl', data, $('[name="storageInfo"]'));
      })
      .fail(function(e) {
        infoTips(handleError(e), 0, $('.infotips'));
      });
  };

  var handleQualityLine = function(cartNo) {
    //当天生产的其它产品(按车号)
    //282
    //select a.id,a.CartNumber,GoodRate,FormatPos1,ErrCount1,ImgVerify1 from MaHouData a INNER JOIN (SELECT ProduceDate,MachineID FROM MaHouData where id = 39555) b on a.MachineID = b.MachineID and a.ProduceDate = b.ProduceDate order by a.id
    //缓存一天  60*24=1440
    var url = getRootPath(1) + "/DataInterface/Api?Token=" + config.TOKEN + "&ID=282&M=3&cart=" + cartNo + '&cache=1440';
    $.ajax({
        url: url
      })
      .done(function(data) {
        data = handleAjaxData(data);
        if (data.rows === 0) {
          $('[name=qualityLine]').hide();
          $('[name="hisCartList"]').hide();
          return;

        }

        $('[name=qualityLine]').show();
        $('[name="hisCartList"]').show();
        var chartData = {
          xAxis: [],
          yAxis: [],
          type: 'line'
        };
        data.data.map(function(elem) {
          chartData.xAxis.push(elem[1]);
          chartData.yAxis.push(elem[2]);
        });

        ec[0] = echarts.init(document.getElementById("chart"));
        var option = getSimpleEChart(chartData);
        ec[0].setOption(option);

        //历史车号列表
        tpl.render('search/hisCartList.etpl', data, $('[name="hisCartList"]'));
      }).fail(function(e) {
        infoTips(handleError(e), 0, $('.infotips'));
      });
  };

  function setTipInfo() {
    var times = today(1).replace(' ', 'T') + '+08';
    var str = '<div class="note note-danger margin-top-30"> <h4>该万产品未搜索到相关车号信息 <p class="margin-top-10">' +
      '     <i class="fa fa-pencil"></i> <span>质量控制中心  发表于 <span name="isodate" title="' + times + '"></span> </span>' +
      '   </p></h4></div>';
    $('[name="prodInfo"]').html(str);

    $("[name=isodate]").prettyDate({
      interval: 10000
    });
  }

  function setEptStr() {
    var str = '<h4> 该万产品未搜索到相关信息 </h4>';
    setTipInfo();

    $('[name="cartName"]').text(queryString.cart);

    $('[name="cartInfo"]').html('');
    $('[name=qualityLine]').hide();
    $('[name="hisCartList"]').hide();
    $('[name=storageInfo]').hide();

    $('#intaglio').html('');
    $('#offset').html('');

    $('[name="mahouInfo"]').html(str);
    $('[name="mahouImg"]').html('');
    if (typeof ec[1] != 'undefined') {

      ec[1].dispose();
    }

    $('[name="screenInfo"]').html(str);
    $('[name="siyinImg"]').html(str);
    $('[name="imgVerifyInfo"]').html(str);

    $('#ocr').html(str);
    $('#ananysis1').html(str);
    $('#ananysis2').html('');
    $('#ananysis3').html('');
    $('#ananysis4').html('');
    $('#ananysis5').html('');
  }

  function toggleScreenPrint(cart) {
    if (cart.substring(3, 2) == '8') {

      $('#portlet_tab1').removeClass('hidden');
      $('[href="#portlet_tab1"]').parent().removeClass('hidden');

    } else {

      if (!$('#portlet_tab1').hasClass('hidden')) {
        $('#portlet_tab1').addClass('hidden');
        $('[href="#portlet_tab1"]').parent().addClass('hidden');
      }
    }
  }

  //根据工序名(首个汉字)获取起始时间
  function getDateRangeByProdName(prodList, prodName) {
    var dateRange = {
      start: '',
      end: ''
    };
    prodList.map(function(item) {
      //工序名称首字
      var strProc = jsLeft(item.ProcName, 1);
      if (prodName == strProc) {
        dateRange.end = item.StartDate;

        if (dateRange.start === '') {
          dateRange.start = item.StartDate;
        }
      }
    });
    if (dateRange.start !== '') {
      dateRange = {
        start: dateRange.start.split(' ')[0].replace(/-/g, ''),
        end: dateRange.end.split(' ')[0].replace(/-/g, '')
      };
    }
    return dateRange;
  }

  var handleOfflineInfo = function(prodList) {
    //车号
    var cartNo = prodList[0].CartNumber.trim();
    //品种
    var prod = cartNo.substring(3, 2);
    //后3位数字部分用于离线检测数据检索
    cartNo = encodeURI('%') + jsRight(cartNo, 3) + encodeURI('%');

    //胶印离线
    var dtRng = getDateRangeByProdName(prodList, '胶');
    var url = getRootPath(1) + "/DataInterface/Api?Token=" + config.TOKEN + "&M=3&cart=" + cartNo + '&prod=' + prod;
    var strUrl = '&tstart=' + dtRng.start + '&tend=' + dtRng.end + '&ID=';

    //胶印离线检测质量信息
    //SELECT a.LotName 车号, a.MachineName 机台, a.CaptainName 机长, a.OperatorName 操作人员, a.SideName 正反面, a.KiloNum 千位, convert(varchar,a.ProduceTime,120) 生产时间, a.ScoreColor AS 墨色, a.ScoreIConn AS 接线, a.ScoreSafeCircle 安全圆, a.ScoreMixColor 混色, a.ScoreOverPrint 对印, a.ScoreLWInsp 线宽, a.Score AS 总分 FROM dbo.JWLXData AS a WHERE LotName like ? and ProductTypeID = ? and bIntaglio = 0 and ProduceDate between ? and ? order by 7
    //cart,prod,tstart,tend
    //287
    //缓存一天
    $.ajax({
        url: url + strUrl + '287' + '&cache=1440'
      })
      .done(function(data) {
        tpl.render('simpleTable.etpl', handleAjaxData(data), $('#offset'));
      })
      .fail(function(e) {
        infoTips(handleError(e), 0, $('.infotips'));
      });

    //凹印离线
    dtRng = getDateRangeByProdName(prodList, '凹');
    strUrl = '&tstart=' + dtRng.start + '&tend=' + dtRng.end + '&ID=';

    //凹印离线检测质量信息
    //SELECT a.LotName 车号, a.MachineName 机台, a.CaptainName 机长, a.OperatorName 操作人员, a.SideName 正反面, a.KiloNum 千位, a.ProduceTime, a.ScoreColor 墨色, a.ScoreOIOver 套印, a.ScoreIConn 接线, a.Score 总分 FROM dbo.JWLXData AS a WHERE LotName like ? and ProductTypeID = ? and bIntaglio = 1 and ProduceDate between ? and ? order by 7
    //cart,prod,tstart,tend
    //286
    //缓存一天
    //data = ReadData(url + strUrl + '286' + '&cache=1440', true, tpl.render('simpleTable.etpl', data, $('#intaglio')));
    //异步
    $.ajax({
        url: url + strUrl + '286' + '&cache=1440'
      })
      .done(function(data) {
        tpl.render('simpleTable.etpl', handleAjaxData(data), $('#intaglio'));
      })
      .fail(function(e) {
        infoTips(handleError(e), 0, $('.infotips'));
      });
  };
  /**
   * [convertImgData2Tpl 接口数据转换为tpl图像模板格式数据]
   * @param  {[type]} cartID  [车号ID]
   * @param  {[type]} imgType [图像类型]
   * @return {[type]}         [转换后数据]
   */
  function convertImgData2Tpl(data) {
    //289 丝印图像数据
    //SELECT ErrImage1,ErrImage2,ErrImage3 FROM ImageData where SiyinID=?
    //t,blob

    var url = getRootPath(1) + "/DataInterface/Api?Token=" + config.TOKEN + "&M=3&blob=1&t=" + data.cartID + "&ID=" + (data.imgType ? 254 : 289) + '&cache=14400';
    $.ajax({
        url: url
      })
      .done(function(ajaxData) {
        var imgData = handleAjaxData(ajaxData);

        var imgInfo = {
          data: []
        };

        var offset = (data.imgType ? 4 : 3);

        for (var i = 0; i < 3; i++) {
          var j = data.start + i * offset;
          imgInfo.data.push({
            mac: data.data[j],
            pos: data.data[j + 1],
            num: data.data[j + 2],
            img: imgData.data[0][i],
            type: (data.imgType ? data.data[j + 3] : '0')
          });
        }
        tpl.render('imglist.etpl', imgInfo, data.el);
      })
      .fail(function(e) {
        infoTips(handleError(e), 0, $('.infotips'));
      });
  }

  var handleScreenInfo = function(cart) {
    toggleScreenPrint(cart);
    if (cart.substring(3, 2) !== '8') {
      return;
    }
    //对应视图需修改：
    //丝印质量信息 a.FrontCount+SWCount+HWCount+TSCount AS [缺陷图像数]
    //SELECT a.id, c.machineName AS [机台], a.ProduceDate AS [生产日期], round(a.GoodRate, 2) AS [好品率], a.PrintCount AS [开印总数], a.NoCheckCount AS [未检数], a.FrontCount+SWCount+HWCount+TSCount AS [缺陷图像数], a.FrontCount AS 正面缺陷数, a.SWCount AS 丝网缺陷数, a.HWCount AS 红外缺陷数, a.TSCount AS 透视缺陷数, a.Mac1 AS 宏区1, a.FormatPos1 AS 开位1, a.ErrCount1 AS 报错条数1, a.Mac2 AS 宏区2, a.FormatPos2 AS 开位2, a.ErrCount2 AS 报错条数2, a.Mac3 AS 宏区3, a.FormatPos3 AS 开位3, a.ErrCount3 AS 报错条数3 FROM dbo.SiYinData AS a INNER JOIN dbo.machineData AS c ON a.machineID = c.ID WHERE a.[CartNumber] =?
    //cart
    var url = getRootPath(1) + "/DataInterface/Api?Token=" + config.TOKEN + "&ID=288&M=3&cart=" + cart;
    //var data = ReadData(url);
    $.ajax({
        url: url
      })
      .done(function(data) {
        data = handleAjaxData(data);
        if (data.rows === 0) {
          $('[name="screenInfo"]').html('<h4> 该万产品未搜索到相关信息 </h4>');
          $('[name="siyinImg"]').html('');
          return;
        }
        var qua = {
          title: data.title,
          rows: data.rows,
          cols: data.cols,
          source: data.source,
          header: data.header.slice(1, 11),
          data: [], //data.data[0].slice(1, 11),
        };
        qua.data.push(data.data[0].slice(1, 11));
        tpl.render('search/screenQuality.etpl', qua, $('[name="screenInfo"]'));

        convertImgData2Tpl({
          data: data.data[0],
          start: 11, //数组第11个数据开始
          imgType: 0, //丝印
          cartID: data.data[0][0],
          el: $('[name="siyinImg"]')
        });
        //tpl.render('imglist.etpl', imgInfo, $('[name="siyinImg"]'));
      })
      .fail(function(e) {
        infoTips(handleError(e), 0, $('.infotips'));
      });
  };

  var setMahouChart = function(data) {
    var chartData = {
      xAxis: [],
      yAxis: [],
      type: 'bar'
    };

    for (var i = 28; i < 37; i++) {
      chartData.xAxis.push(data.header[i].title);
      chartData.yAxis.push(data.data[0][i]);
    }

    ec[1] = echarts.init(document.getElementById("mahouChart"));
    var option = getSimpleEChart(chartData, 1);

    //option处理
    option.tooltip.formatter = '{b}路:{c}条';
    delete option.yAxis.max;

    ec[1].setOption(option);
  };

  var handleMahouInfo = function(cart) {

    //码后核查质量信息查询
    //SELECT a.id,c.MachineName AS [机台], a.ProduceDate AS [生产日期], a.GoodRate AS [好品率], a.ErrPicCount AS [缺陷条数], a.PMCount AS [票面条数], a.TSCount AS [透视条数], a.NoCheckCount AS [未检条数], a.HMCount AS [号码条数], a.YGCount AS [荧光条数], a.FrontCount AS [正面缺陷数], a.BackCount AS 背面缺陷数, a.SWCount AS [丝网缺陷数], a.TSCount AS [透视缺陷数], a.BlackImgCount AS 黑图数, a.FakePieceCount AS 大张废, a.Mac1 AS [宏区1], a.FormatPos1 AS [开位1], a.ErrCount1 AS [报错条数1], a.ImgVerify1 AS [判废结果1], a.Mac2 AS [宏区2], a.FormatPos2 AS [开位2], a.ErrCount2 AS [报错条数2], a.ImgVerify2 AS [判废结果2], a.Mac3 AS [宏区3], a.FormatPos3 AS [开位3], a.ErrCount3 AS [报错条数3],  a.ImgVerify3 AS [判废结果3], a.F1Count AS [正1], a.F2Count AS [正2], a.F3Count AS [正3], a.F4Count AS [正4], a.F5Count AS [正5], a.BS1Count AS 精1, a.BS2Count AS 精2, a.BS3Count AS 精3, a.BS4Count AS 精4 FROM dbo.MaHouData AS a INNER JOIN dbo.MachineData AS c ON a.MachineID = c.ID where CartNumber = ?
    //cart
    //290

    var url = getRootPath(1) + "/DataInterface/Api?Token=" + config.TOKEN + "&ID=290&M=3&cart=" + cart + '&cache=' + config.cache;
    $.ajax({
        url: url
      })
      .done(function(data) {
        data = handleAjaxData(data);
        if (data.rows === 0) {
          $('[name="mahouInfo"]').html('<h4> 该万产品未搜索到相关信息 </h4>');
          $('[name="mahouImg"]').html('');
          if (typeof ec[1] != 'undefined') {
            ec[1].dispose();
          }
          return;
        }

        convertImgData2Tpl({
          data: data.data[0],
          start: 16, //数组第16个数据开始
          imgType: 1, //核查
          cartID: data.data[0][0],
          el: $('[name="mahouImg"]')
        });

        setMahouChart(data);
        var qua = {
          title: data.title,
          rows: data.rows,
          cols: data.cols,
          source: data.source,
          header: data.header.slice(1, 15),
          noScroll: 1,
          data: [] //纵向排列 data.data[0].slice(1, 15)
        };

        qua.data.push(data.data[0].slice(1, 15));
        //tpl.render('search/screenQuality.etpl', qua, $('[name="mahouInfo"]'));

        tpl.render('simpleTable.etpl', qua, $('[name="mahouInfo"]'));
      })
      .fail(function(e) {
        infoTips(handleError(e), 0, $('.infotips'));
      });
  };

  var handleImgVerifyInfo = function(cart) {

    //图像人工判废
    //SELECT a.[车号], a.[生产日期], a.[工艺], a.[品种], a.[机台], a.[缺陷条数], a.[缺陷开数], a.[判废量], a.[机检锁定条数], a.[实废大张数], a.[实废小开数], a.[实废条数], a.[开包量] FROM dbo.view_print_hecha_image_check AS a where a.[车号]=?
    //cart
    //292
    //
    var objDom = $('[name="imgVerifyInfo"]');
    var id = 292;
    var url = getRootPath(1) + "/DataInterface/Api?Token=" + config.TOKEN + "&ID=" + id + "&M=3&cart=" + cart + '&cache=' + config.cache;
    //tpl.renderTable(objDom, url);
    $.ajax({
        url: url
      })
      .done(function(data) {
        data = $.parseJSON(data);
        objDom.html(tpl.getHTML('simpleTable.etpl', data));
        objDom.find('.scroller').append('<a href="../search/image#' + cart + '" target="_blank" class="cbp-l-project-details-visit btn red uppercase">实废图像</a>');

      })
      .fail(function(e) {
        infoTips(handleError(e), 0, $('.infotips'));
      });


    //$('[name="imgVerifyInfo"]').append('<a href="../search/image#' + cart + '" target="_blank" class="cbp-l-project-details-visit btn red uppercase">实废图像</a>');
  };

  var handleOcrInfo = function(cart) {

    //OCR信息
    //SELECT a.[车号], a.[品种], convert(varchar,a.[采集时间],120) 采集时间, a.[小开总数], a.[已取出], a.[多取出], a.[开包量], a.[机检开包量], a.[票面开包量], a.[小开作废率] FROM dbo.VIEW_PRINT_OCR AS a where a.车号 = ?
    //cart
    //293
    var objDom = $('#ocr');
    var id = 293;
    var url = getRootPath(1) + "/DataInterface/Api?Token=" + config.TOKEN + "&ID=" + id + "&M=3&cart=" + cart + '&cache=' + config.cache;
    tpl.renderTable(objDom, url);
  };

  var handleAnanysisInfo = function(cart) {

    //印钞特抽信息
    //SELECT DISTINCT B.CartNumber 车号,a.GZNum 印码号,a.Date 上传日期,a.FakeDesc 备注,a.FingerLine 手感线,a.WSignal W信号,a.SMSignal SM信号,a.YG 荧光,a.VCode 号码,a.OVMI OVMI,a.TotalScore 总分,a.OfstFSub 胶正总分,a.OfstFInk 胶正墨色,a.OfstFLineWidth 胶正线宽,a.OfstFSafeCircle 胶正安全圆,a.OfstFLineConn 胶正接线,a.OfstFMix 胶正混色,a.OfstFDuiYin 胶正对印,a.OfstBSub 胶背总分,a.OfstBInk 胶背墨色,a.OfstBLineWidth 胶背线宽,a.OfstBSafeCircle 胶背安全线,a.OfstBOIOver 胶背接线,a.OfstBMix 胶背混色,a.OfstBDuiYin 胶背对印,a.ItgFSub 凹正总分,a.ItgFInk 凹正墨色,a.ItgFOIOver 凹正套印,a.ItgFLineConn 凹正接线,a.ItgBSub 凹背总分,a.ItgBMix 凹背混色,a.ItgBOIOver 凹背套印,a.ItgBLineConn 凹背接线,a.CodeSub 印码总分,a.CodeDistance 印码规矩,a.CodeInk 印码墨色,a.CodeMixColor 印码混色,a.CodeFake 印码缺陷,a.CodeYG 印码荧光,a.CutDistance 裁切得分,a.PaperSub 纸张分数,a.PaperWarterMark 纸张水印,a.PaperSafeLine 纸张安全线,c.edge 边缘,c.squareness 方正度,c.size_length 长度,c.size_width 宽度,c.white_edge_tb 白边,c.white_edge_lr,c.score 裁切总分 FROM dbo.NoteAysData a INNER JOIN CartInfoData b on a.id=b.NoteAnayID LEFT JOIN NoteAysCutManulData c on a.id = c.note_ays_id where b.CartNumber=?
    //cart
    //294

    var objDom = $('#ananysis');

    var option = [{
      start: 0,
      end: 10,
      dom: $('#ananysis1'),
      title: '1.综述',
      showHead: true,
      direction: 'ver',
      class: 'col-md-6',
      repeat: {
        switch: false
      }
    }, {
      start: 11,
      end: 24,
      dom: $('#ananysis2'),
      title: '2.胶印工序',
      showHead: true,
      direction: 'ver',
      repeat: {
        switch: true,
        start: 0,
        end: 2
      },
      class: 'col-md-6'
    }, {
      start: 25,
      end: 32,
      dom: $('#ananysis3'),
      title: '3.凹印工序',
      showHead: true,
      direction: 'ver',
      repeat: {
        switch: true,
        start: 0,
        end: 2
      },
      class: 'col-md-6'
    }, {
      start: 33,
      end: 42,
      dom: $('#ananysis4'),
      title: '4.其它',
      showHead: true,
      direction: 'ver',
      repeat: {
        switch: true,
        start: 0,
        end: 2
      },
      class: 'col-md-6'
    }, {
      start: 43,
      end: 49,
      dom: $('#ananysis5'),
      title: '5.人工裁切评分',
      showHead: true,
      direction: 'ver',
      repeat: {
        switch: true,
        start: 0,
        end: 2
      },
      class: 'col-md-6'
    }];

    var id = 294;
    var url = getRootPath(1) + "/DataInterface/Api?Token=" + config.TOKEN + "&ID=" + id + "&M=3&cart=" + cart + '&cache=' + config.cache;
    tpl.renderTable(objDom, url, option);


  };

  //质量信息
  var renderQualityInfo = function(cartNo) {

    // 码后核查(处理时间最长，放到最前)
    handleMahouInfo(cartNo);

    //载入特征图像，载入当天质量曲线
    //如果是本页面点击跳转的数据则不加载该部分数据
    if (queryString.updateHisInfo) {
      handleQualityLine(cartNo);
    }

    // 印码号————大张号互查
    if (queryString.type == config.search.CODENO) {
      //印码号查询大张号（10张）

    } else if (queryString.type == config.search.PAPERNO) {
      //大张号查询印码号

    }

    // 获取库管信息
    getStorageInfo(cartNo);

    // 图像判废结果
    handleImgVerifyInfo(cartNo);

    // 丝印（T品）
    handleScreenInfo(cartNo);

    // OCR信息
    handleOcrInfo(cartNo);

    //单开分析仪
    handleAnanysisInfo(cartNo);

    handleCodeInfo(cartNo);

  };

  var getCodeTypeOption = function(data) {
    function unique(arr) {
      return Array.from(new Set(arr));
    }
    var legendArr = [],
      xAxis = [],
      yAxis = [];

    var series = [];

    data.map(function(elem) {
      xAxis.push(elem[1]);
      legendArr.push(elem[0]);
    });

    legendArr = unique(legendArr).reverse();
    xAxis = unique(xAxis);

    legendArr.map(function(elem) {
      yAxis[elem] = [];
    });

    data.map(function(elem) {
      yAxis[elem[0]][elem[1]] = elem[2];
    });

    legendArr = legendArr.map(function(elem) {
      series.push({
        type: 'bar',
        stack: '合计',
        barMaxWidth: 25,
        name: elem,
        data: []
      });
      var i = series.length - 1;
      xAxis.map(function(item) {
        var val = (typeof yAxis[elem][item] == 'undefined') ? 0 : yAxis[elem][item];
        series[i].data.push(val);
      });
      return {
        name: elem,
        icon: 'circle'
      };
    });

    var option = {
      tooltip: {
        trigger: 'item'
      },
      color: ["#61A5E8", "#7ECF51"],
      legend: {
        data: legendArr,
        x: "right",
        y: "10",
        //orient: 'vertical'
      },
      xAxis: {
        type: 'category',
        boundaryGap: true,
        data: xAxis,
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        },
        show: true
      },
      grid: {
        x: 50,
        y: 10,
        x2: 10,
        y2: 20
      },
      yAxis: {
        type: 'value',
        axisTick: {
          show: false
        },
        axisLine: {
          show: false
        }
      },
      series: series
    };

    return option;
  };

  function handleCodeInfo(cartNo) {
    var url = getRootPath(1) + "/DataInterface/Api?Token=" + config.TOKEN + "&M=3&ID=312&cart=" + cartNo;
    //var testUrl = '../topic/testData/codetype.json';
    $.ajax({
        url: url //testUrl
      })
      .done(function(data) {
        data = $.parseJSON(data);
        if (!data.rows) {
          return;
        }
        var option = getCodeTypeOption(data.data);
        ec[2] = echarts.init(document.getElementById("codeFakeType"));
        ec[2].setOption(option);
      }).error(function(e) {
        infoTips(handleError(e), 0, $('.infotips'));
      });
  }

  var renderProdInfo = function(data) {
    //重置车号信息
    cartInfo = {};
    $('[name="cartName"]').text(data.data[0].CartNumber);
    cartInfo = data.data[0];
    cartInfo.imgUrl = getRootPath(1) + "/search/image/#" + cartInfo.CartNumber;

    //追加星期信息
    //追加格式化日期信息
    data.data.map(function(item, i) {
      data.data[i].WeekDay = getWeekdayByDate(item.StartDate);
      data.data[i].DateTitle = item.StartDate.replace(' ', 'T') + '+08';
      data.data[i].datetime = item.StartDate.split(' ')[0].replace(/-/g, '');
    });

    //渲染机台作业信息
    tpl.render('search/prodinfo.etpl', data, $('[name="prodInfo"]'));
    tpl.render('search/cartinfo.etpl', cartInfo, $('[name="cartInfo"]'));

    // step:3 胶凹离线检测信息
    handleOfflineInfo(data.data);
  };


  // mes 机台作业信息查询
  // 20190106 视图层处理完毕
  // var handleProdLog = function(cart, data) {
  //   var logData;
  //   $.ajax({
  //     async: false, //同步
  //     url: 'http://10.8.1.25:100/api/333/76d8ab1aa9?cart=' + cart,
  //     success: function(data, status) {
  //       logData = data.data;
  //     },
  //     error: function(e) {
  //       console.log("read data error:<br>");
  //       console.log(e.responseText);
  //     }
  //   });

  //   if (logData.length == 0) {
  //     return data;
  //   }

  //   // 匹配作业信息
  //   data.map(function(item) {
  //     if (item.WorkInfo.length > 0) {
  //       return item;
  //     }

  //     var mesInfo = logData.find(function(logData) {
  //       return logData.captain == item.CaptainName
  //     })

  //     item.WorkInfo = mesInfo == null ? '' : mesInfo.comment_text;
  //     return item;
  //   })
  //   return data;
  // }

  //根据车号查询生产信息
  var getCartInfo = function(obj) {

    var strUrl = getRootPath(1) + "/DataInterface/Api?Token=" + config.TOKEN + "&ID=";
    var url, data;

    //step:1 机台作业信息
    if (obj.type == config.search.GZ) {
      //用冠字接口获取车号，后续数据由车号查询
      //284
      //SELECT DISTINCT a.CartNumber, a.CarNumber, a.GzNumber, a.TechTypeName, a.ProcName, a.WorkClassName, a.MachineName, a.CaptainName, a.TeamName, a.MonitorName, a.PrintNum,convert(varchar,a.StartDate,120) StartDate, a.ProductName, a.WorkInfo FROM dbo.CartInfoData AS a WHERE a.NoteAnayID > 0 AND ProductName = ? and ((CarNumber = ? AND GzNumber BETWEEN ? and ?) or (CarNumber = ? AND GzNumber BETWEEN ? and ?)) ORDER BY convert(varchar,a.StartDate,120)
      //param:prod,alpha,start,end,alpha2,start2,end2

      var param = convertGZInfo(obj.cart, obj.prod);

      var queryStr = 'prod=' + obj.prod + '&alpha=' + param.alpha + '&start=' + param.start + '&end=' + param.end + '&alpha2=' + param.alpha2 + '&start2=' + param.start2 + '&end2=' + param.end2;

      url = strUrl + 284 + '&M=0&' + queryStr;
      data = ReadData(url);

      // 20190115 MES上线
      //
      $.ajax('http://10.8.1.25:100/api/332/5c91838515?' + queryStr).done(function(res) {
        var mesData = res.data;
        // 冠字模糊匹配失败，在机台作业系统中重新搜索车号
        if (mesData.length > 0) {
          var cart = mesData[mesData.length - 1].CartNumber;
          data = ReadData(strUrl + 283 + '&M=0&cart=' + cart + '&cache=1440')
		  data.data = data.data || [];
        }

        // if (mesData.length > 0) {
        //   mesData = handleProdLog(mesData[mesData.length - 1].CartNumber, mesData);
        // }

        data.rows = data.rows + mesData.length;
        // 合并数据
        data.data = data.data.concat(mesData)

        // 冠字信息合并
        var gzInfo = data.data[data.data.length - 1];
        data.data = data.data.map(function(item) {
          item.CarNumber = gzInfo.CarNumber;
          item.GzNumber = gzInfo.GzNumber;
          item.TechTypeName = gzInfo.TechTypeName;
          return item;
        })


        $('[name=prodNum]').html(data.rows);
        if (data.rows > 0) {
          //获取开位信息
          var idx = data.data.length - 1;
          data.data[idx].kInfo = getKinfo(param.codeNum, data.data[idx].GzNumber);

          renderQualityInfo(data.data[idx].CartNumber);

          renderProdInfo(data); //渲染质量信息

        } else {
          setEptStr();
          return;
        }
      })


    } else {
      //直接用车号获取生产信息

      //此处替换连接至机台作业系统读取信息
      //SELECT DISTINCT a.CartNumber,  a.CarNumber, a.GzNumber, a.TechTypeName, a.ProcName, a.WorkClassName, a.MachineName, a.CaptainName, a.TeamName, a.MonitorName, a.PrintNum, convert(varchar,a.StartDate,120) StartDate, a.ProductName, a.WorkInfo FROM dbo.CartInfoData AS a WHERE a.NoteAnayID > 0 AND a.CartNumber = ? ORDER BY convert(varchar,a.StartDate,120)
      //param:cart

      //数据缓存一天
      url = strUrl + 283 + '&M=0&cart=' + obj.cart + '&cache=1440';
      $.ajax({
          url: url
        })
        .done(function(data) {
          data = handleAjaxData(data);

          // 20190115 MES上线，数据需做合并
          $.ajax('http://10.8.1.25:100/api/331/8ed6e81fa3/60.html?cart=' + obj.cart).done(function(res) {
            var mesData = res.data;

            // if (mesData.length > 0) {
            //   mesData = handleProdLog(obj.cart, mesData);
            // }

            data.rows = data.rows + mesData.length;

            // 合并数据
            data.data = data.data || []
            data.data = data.data.concat(mesData)

            // 冠字信息合并
            var gzInfo = data.data[data.data.length - 1];
            data.data = data.data.map(function(item) {
              item.CarNumber = gzInfo.CarNumber;
              item.GzNumber = gzInfo.GzNumber;
              item.TechTypeName = gzInfo.TechTypeName;
              return item;
            })

            $('[name=prodNum]').html(data.rows);
            if (data.rows > 0) {
              //仅搜索车号时，不返回开位信息
              data.data[0].kInfo = 0;
            } else {
              setEptStr();
              return;
            }
            renderProdInfo(data);
          })


        }).fail(function(e) {
          infoTips(handleError(e), 0, $('.infotips'));
        });

      //渲染质量信息
      renderQualityInfo(obj.cart);
    }

  };

  var queryData = function() {
    //hide the panal
    $('.btn-theme-panel').removeClass('open');
    getInputData();
    getCartData();
  };

  $('.theme-colors > li', '.theme-panel').click(function() {
    queryString.prod = $(this).find('span').last().text();
    $('ul > li', '.theme-panel').removeClass("active");
    $(this).addClass("active");
  });

  $('#query').click(function() {
    queryData();
  });

  $('a[href="#portlet_tab2"]').parent().click(function() {
    setTimeout(function() {
      if (ec[2]) {
        ec[2].resize();
      }
    }, 0);

  });

  $('a[href="#portlet_tab3"]').parent().click(function() {
    setTimeout(function() {
      if (ec[1]) {
        ec[1].resize();
      }
    }, 0);
  });

  function loadDefaultData() {
    queryString.cart = window.location.hash.replace('#', '');
    if (queryString.cart !== '') {
      getCartData();
    }
  }

  $('.search-form [name="query"]').on('blur', function() {
    $('[name="cart"]').val($(this).val());
  });

  function searchByKeyboard(_self) {
    queryString.cart = _self.val().toUpperCase();
    if (queryString.cart !== '') {
      location.hash = queryString.cart;
    }
  }

  $('input[name="cart"]').keydown(function(event) {
    if (event.key === 'Enter') {
      $('[name="querySetting"]').click();
      searchByKeyboard($(this));
    }
  });

  //modern browsers
  $(window).bind('hashchange', function() {
    queryString.cart = window.location.hash.replace('#', '');

    var updateHisInfo = !$('[name=hiscart][href="#' + queryString.cart + '"]').length;

    getCartData(updateHisInfo);
  });

  return {
    //main function to initiate the module
    init: function() {
      hideSidebarTool();
      $(".page-sidebar-wrapper").css("margin-top", "0px");
      $('[name="qualityLine"]').hide();
      $('[name="hisCartList"]').hide();

      var tplList = [
        'search/prodinfo.etpl',
        'search/cartinfo.etpl',
        'simpleTable.etpl',
        'search/hisCartList.etpl',
        'search/screenQuality.etpl',
        'imglist.etpl'
      ];
      tpl.init(tplList, loadDefaultData);
    }
  };
}();
//记录选择状态
jQuery(document).ready(function() {
  //RoundedTheme(0);
  UIIdleTimeout.init();
  initDom();
  search.init();
  $('.page-bar').after('<div class="margin-top-10 infotips"></div>');
  bsTips('点击本页面工序名称将自动折叠面板');
});

jQuery(window).resize(function() {
  for (var i = 0; i <= 2; i++) {
    if (ec[i]) {
      ec[i].resize();
    }
  }
});
