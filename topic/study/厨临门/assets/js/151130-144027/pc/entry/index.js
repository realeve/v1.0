define("clm/pc/app", [], function() {
	return {}
}), define("clm/pc/entry/index", ["clm/pc/app"], function() {
	function t() {
		function n() {
			e == 4 && (clearTimeout(t), t = setTimeout(r, 3e3))
		}

		function r() {
			e == 4 && (clearTimeout(t), $.fn.fullpage.moveSlideRight(), t = setTimeout(r, 3e3))
		}
		var e, t;
		$(document).ready(function() {
			var r = !1;
			$("#fullpage").fullpage({
				anchors: ["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8"],
				navigation: !0,
				navigationPosition: "right",
				css3: !1,
				verticalCentered: !1,
				resize: !0,
				onLeave: function(e, t, n) {
					$("#fp-nav").removeClass("white"), t == 8 ? $("#iSlider-arrow").hide() : $("#iSlider-arrow").show()
				},
				afterLoad: function(t, i) {
					e = i, $("#section" + i).addClass("cur"), i == 5 && !r && (r = !0, $("#tile-img").animate("tile", {
						duration: 2e3,
						cols: 15,
						rows: 2,
						sequent: !0,
						sequence: "tblr",
						effect: "slideFromLeft",
						fillMode: "backwards"
					}), setTimeout(function() {
						$("#tile-img").show()
					}, 2e3)), i == 4 && n(), i != 2 && i != 7 && ($("#fp-nav").addClass("white"), $(".fp-controlArrow").addClass("white"))
				},
				afterSlideLoad: function(e, t, n, r) {
					t == 4 && (r == 0 || r == 1 || r == 3 ? ($("#fp-nav").addClass("white"), $(".fp-controlArrow").addClass("white")) : ($("#fp-nav").removeClass("white"), $(".fp-controlArrow").removeClass("white"), (r == 4 || r == 5) && $(".fp-prev").addClass("white")))
				},
				afterResize: function() {}
			}), $("#section6 .btn").click(function() {
				$("#section6 .flipper")[0].classList.toggle("hover")
			}), $("#section4").click(function(e) {
				clearTimeout(t);
				if (!$(e.target) || !$(e.target).hasClass("fp-controlArrow")) e.pageX > $(window).width() / 2 ? $.fn.fullpage.moveSlideRight() : $.fn.fullpage.moveSlideLeft();
				n()
			})
		})
	}
	var e = require("clm/pc/app");
	return {
		init: t
	}
});