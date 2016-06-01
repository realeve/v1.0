require(["gitbook"], function(gitbook) {
    MathJax.Hub.Config({
               tex2jax: {
                    inlineMath: [ ['$','$']]
                    },
                "HTML-CSS": {
                    imageFont: null,
                    availableFonts: ["TeX"],
                    preferredFont: "TeX"
                },
                extensions: ["jsMath2jax.js", 'tex2jax.js', 'MatchWebFonts.js'],
                messageStyle: "none",
                processEscapes: true
            });
    gitbook.events.bind("page.change", function() {
        var mathjax_dom_ids = $('script[type="math/tex; mode=display"]').map(function(){return $(this).attr('id')});
        var doms = $.merge(["Typeset",MathJax.Hub], mathjax_dom_ids);
        MathJax.Hub.Queue(doms);
    });
});

