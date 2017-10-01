var Rx = require("rxjs/Rx");
require("rxjs-easing");

const defaultArguments = [0, 1, 2000];

// Gets the arguments for the named easing function.
function getDemoArguments(easingName) {
    switch (easingName) {
        case "backIn":
        case "backOut":
        case "backInOut":
            return defaultArguments.concat(2);
            
        case "elasticIn":
        case "elasticOut":
        case "elasticInOut":
            return defaultArguments.concat(1, 750);
        
        default:
            return defaultArguments;
    }
}

// Set up a single button.
function initializeButton(button, easingName) {
    // Calculate how far the button can slide.
    var availableWidth = button.parentElement.clientWidth - button.offsetWidth;
    
    // Get the easing function arguments.
    var demoArguments = getDemoArguments(easingName);
    
    // Activate when clicked.
    button.addEventListener(
        "click",
        function() {
            // Prevent multiple clicks.
            button.disabled = true;
            
            // Run the easing observable, then wait 0.5s and reset the position.
            Rx.Observable[easingName].apply(Rx.Observable, demoArguments)
                .concat(Rx.Observable.of(0).delay(500))
                .subscribe(
                    function(offset) { button.style.left = `${availableWidth * offset}px`; },
                    console.error,
                    function() { button.disabled = false; });
        }
    );
}

// Set up all the buttons.
function initializeAllButtons() {
    var demos = document.querySelectorAll(".demo");
    for (var index = 0; index < demos.length; index++) {
        var demo = demos[index];
        initializeButton(demo.querySelector("button"), demo.dataset.demo);
    }
}

// Simple example code.
function initializeExample() {
    // Get the button.
    var button = document.querySelector(".example");

    // On click...
    button.addEventListener("click", function() {
        // Prevent more clicks until the easing is complete.
        button.disabled = true;
        
        // Bounce in, then reset.
        Rx.Observable.bounceOut(0, 300, 2000)
            .concat(Rx.Observable.of(0).delay(500))
            .subscribe(
                function(offset) { button.style.left = offset + "px"; },
                console.error,
                function() { button.disabled = false; });
    });
}

window.addEventListener("load", function() {
    initializeAllButtons();
    initializeExample();
});
