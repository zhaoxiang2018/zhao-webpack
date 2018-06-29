(function () {
        var b = document.documentElement,
        a = function () {
            var a = b.getBoundingClientRect().width;
            b.style.fontSize = (100/1300) * (a >= 1300 ? 1300 : a) + "px"
            // b.style.fontSize = (100/750) * a + "px";
        }, c = null;
        window.addEventListener("resize", function () {
            clearTimeout(c);
            c = setTimeout(a, 300)
        });
        a()
    })();
    // (a/750)*100