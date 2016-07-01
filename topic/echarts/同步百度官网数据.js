$('.chart-link').map(function(i, link) {
	console.log(link.href.replace('editor.html?c=', 'data/') + '.js');
});