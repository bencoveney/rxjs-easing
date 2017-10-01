var Rx = require("rxjs/Rx");
require("rxjs-easing");

function getDemoArguments(easingName) {
    switch (easingName) {
        case "backIn":
        case "backOut":
        case "backInOut":
            return [0, 1, 2000, 2];
            
        case "elasticIn":
        case "elasticOut":
        case "elasticInOut":
            return [0, 1, 2000, 1, 750];
        
        default:
            return [0, 1, 2000];
    }
}

function initializeButton(button, easingName) {
    var availableWidth = button.parentElement.clientWidth - button.offsetWidth;
    var demoArguments = getDemoArguments(easingName);
    button.addEventListener(
        "click",
        function() {
            console.log("clicking")
            button.disabled = true;
            // Run the easing observable, then wait 0.5s and reset the position.
            Rx.Observable[easingName].apply(Rx.Observable, demoArguments)
                .concat(Rx.Observable.of(0).delay(500))
                .subscribe(
                    function(offset) {
                        button.style.left = `${availableWidth * offset}px`;
                    },
                    console.error,
                    function() { button.disabled = false; });
        }
    );
}

function initializeAllButtons() {
    console.log("initializing");
    var demos = document.querySelectorAll(".demo");
    for (var index = 0; index < demos.length; index++) {
        var demo = demos[index];
        initializeButton(demo.querySelector("button"), demo.dataset.demo);
    }
}

window.addEventListener("load", initializeAllButtons());
