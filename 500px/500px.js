javascript: (function() {
	//window.location.href = $('.photo').attr('src');
	function downloadFile(fileName, url) {
		var aLink = document.createElement('a');
		aLink.download = fileName;
		aLink.href = url;
		aLink.click();
	}
	var name, url;
	var host = location.hostname.replace('.com', '');
	if (host == '500px') {
		url = $('.photo').attr('src');
		name = "stock-photo-" + url.split('photo/')[1].split('/')[0] + '.jpg';
	} else if (host == 'pixabay') {
		name = $('[name="download"]').last().val();
		url = 'https://pixabay.com/zh/photos/download/' + name + '?attachment';
	}
	downloadFile(name, url);
})();