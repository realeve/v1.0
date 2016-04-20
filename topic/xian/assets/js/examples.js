	$(document).ready(function() {
		$('#fullpage').fullpage({
			'verticalCentered': false,
			'css3': true,
			'sectionsColor': ['#F0F2F4', '#fff', '#F0F2F4', '#fff','#F0F2F4'],
			'navigation': true,
			'navigationPosition': 'right',
			//'navigationTooltips': ['fullPage.js', 'Powerful', 'Amazing', 'Simple'],
			//'continuousVertical': true,
			'anchors': ['firstPage', 'secondPage', '3rdPage', '4thPage', 'lastPage'],
			'menu': '#menu',
			'loopTop': true,
			'loopBottom': true,
			
			'afterLoad': function(anchorLink, index){
				if(index == 2){
					$('#iphone3, #iphone2, #iphone4').addClass('active');
				}
			},

			'onLeave': function(index, nextIndex, direction){
				if (index == 4 && direction == 'down'){
					$('.section').eq(index -1).removeClass('moveDown').addClass('moveUp');
				}
				else if(index == 4 && direction == 'up'){
					$('.section').eq(index -1).removeClass('moveUp').addClass('moveDown');
				}

				$('#staticImg').toggleClass('active', (index == 2 && direction == 'down' ) || (index == 4 && direction == 'up'));
				$('#staticImg').toggleClass('moveDown', nextIndex == 4);
				$('#staticImg').toggleClass('moveUp', index == 4 && direction == 'up');
			}
		});
	});