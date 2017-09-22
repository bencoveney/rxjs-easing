var easing = require("../lib/rx.easing");
var rx = require("rx");

function areAlmostEqual(a, b) {
	var difference = a > b ? a - b : b - a;
	return difference < 0.1;
}

rx.Observable
	.zip(
		rx.Observable.linear(100, 0, 500),
		rx.Observable.from([100, 93.3, 86.6, 80, 73.3, 66.6, 60, 53.3, 46.6, 40, 33.3, 26.6, 20, 13.3, 6.6, 0, 0]),
		areAlmostEqual
	)
	.subscribe(console.log, console.error, console.log);
