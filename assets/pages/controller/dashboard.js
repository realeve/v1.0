var dashboardApp = function() {
	var isInited = false;
	var detailList = function() {
		// init cubeportfolio
		var initCubeportfolio = function() {
			$('#js-grid-lightbox-gallery').cubeportfolio({
					filters: '#js-filters-lightbox-gallery1',
					//loadMore: '#js-loadMore-juicy-projects',
					loadMore: '#js-loadMore-lightbox-gallery',
					loadMoreAction: 'click',
					layoutMode: 'grid',
					mediaQueries: [{
						width: 1500,
						cols: 7
					}, {
						width: 1100,
						cols: 6
					}, {
						width: 800,
						cols: 5
					}, {
						width: 480,
						cols: 3
					}, {
						width: 320,
						cols: 2
					}],
					defaultFilter: '*',
					animationType: 'rotateSides',
					gapHorizontal: 10,
					gapVertical: 10,
					gridAdjustment: 'responsive',
					caption: 'zoom',
					displayType: 'sequentially',
					displayTypeSpeed: 100,

					// lightbox
					lightboxDelegate: '.cbp-lightbox',
					lightboxGallery: true,
					lightboxTitleSrc: 'data-title',
					lightboxCounter: '<div class="cbp-popup-lightbox-counter">{{current}} of {{total}}</div>',

					// singlePageInline
					singlePageInlineDelegate: '.cbp-singlePageInline',
					singlePageInlinePosition: 'below',
					singlePageInlineInFocus: true,
					singlePageInlineCallback: function(url, element) {
						// to update singlePageInline content use the following method: this.updateSinglePageInline(yourContent)
						var t = this;
						$.ajax({
								url: url,
								type: 'GET',
								dataType: 'html',
								timeout: 10000
							})
							.done(function(result) {

								t.updateSinglePageInline(result);

							})
							.fail(function() {
								t.updateSinglePageInline('AJAX Error! Please refresh the page!');
							});
					}
				},
				function() {
					bsTips('数据渲染完毕', 1);
				});
		};

		if (isInited) {
			$('#js-grid-lightbox-gallery').cubeportfolio('destroy', initCubeportfolio);
		} else {
			initCubeportfolio();
		}

		isInited = true;
	};

	return {
		//main function to initiate the module
		init: function() {
			detailList();
			var tplList = [
				"image/fakeimg.etpl"
			];
			tpl.init(tplList);
		}
	};
}();
//记录选择状态
$(document).ready(function() {
	toggleSidebar();
	whiteBackground();
	hideSidebarTool();
	//RoundedTheme(0);
	UIIdleTimeout.init();
	initDom(0);
	dashboardApp.init();
});