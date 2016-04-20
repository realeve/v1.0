$('.chart-link').map(function(elem, index) {
	var str = "http://echarts.baidu.com/gallery/data/" + $(this).attr('href').split('=')[1] + ".js";
	console.log(str);
});