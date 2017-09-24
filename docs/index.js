var Rx = require("rxjs/Rx");
require("rxjs-easing");

window.addEventListener(
    "load",
    function() {
        var button = document.querySelector(".easing .demo button");

        var availableWidth = button.parentElement.clientWidth - button.offsetWidth;

        button.addEventListener(
            "click",
            function() {
                Rx.Observable.backIn(0, 1, 2000)
                    .concat(Rx.Observable.of(0).delay(500))
                    .subscribe(
                        function(offset) {
                            button.style.left = `${availableWidth * offset}px`;
                        });
            }
        );
    }
);
