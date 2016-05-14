　　
define(function() {　　　　
  var pChart = function(arr) {　　　　
    var avg = getArrAvg(arr);

    //印制产品，各种率为100分位，故此处为100-avg
    var sigma = getArrSegma(arr,avg);//Math.sqrt(avg * (100 - avg) / arr.length);

    var obj = {
      UCL: avg + 3 * sigma,
      CL: avg,
      LCL: avg - 3 * sigma
    };
    obj.LCL = obj.LCL < 0 ? 0 : obj.LCL;
    return obj;　　　　
  };

  var getArrSegma = function(arr,avg){
    var sum = 0;
    var delta;
    arr.map(function(data) {
      delta = data-avg;
      sum += delta*delta;
    });
    return Math.sqrt(sum/(arr.length-1))
  }
  
  var getArrAvg = function(arr) {
    var sum = 0;
    arr.map(function(data) {
      sum += Number.parseFloat(data);
    })
    return sum / arr.length;
  }

  　　　　
  return {

    　　　　　　
    pChart: pChart　　　　
  };

  　　
});