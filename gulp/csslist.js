var cssList = [];
cssList = $('link').map(function(i) {
	var href = $('link:nth(' + i + ')').attr('href').replace('../', '').replace('.min', '');
	return href;
});
console.log(cssList);

var jsList = [];
jsList = $('script').map(function(i) {
	var href = $('script:nth(' + i + ')').attr('src').replace('../', '').replace('.min', '');
	return href;
});

console.log(jsList);