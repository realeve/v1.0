function ecLog(e) {
	var r = "./images/es.gif?",
		t = (new Date).getTime();
	({
		path: document.location.href,
		referrer: document.referrer
	});
	e.extend = (e.extend || "") + ".t_" + (new Date).getTime() + "_" + EC_LOG_IDX++, e.path = document.location.href, e.referrer = document.referrer;
	var n = [];
	for (var o in e) e.hasOwnProperty(o) && n.push(o + "=" + encodeURIComponent(e[o]));
	r += n.join("&");
	var a = window["EC_LOG_" + t] = new Image;
	a.src = r
}
var EC_LOG_IDX = 0;