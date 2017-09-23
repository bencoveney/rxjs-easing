var easing = require("../lib/rx.easing");
var rx = require("rx");

// Helper function to get input data for an easing function
function getData(name, args) {
	rx.Observable[name].apply(null, args)
		.toArray()
		.subscribe(array => {
			console.log("Data for " + name);
			console.log(JSON.stringify(array
				.map(value => "" + Math.round(value * 10) / 10)
				.join(", ")
			))
		})
}

// How much margin of error to accept from rounding, timing, floating point math etc.
var tolerance = 0.1;

// Tests that the function returns the expected result when invoked with the specified parameters.
function test(name, args, expected) {
	rx.Observable[name].apply(null, args)
		.toArray()
		.subscribe(
			(actual) => {
				console.log("Tests for " + name);
				if (expected.length != actual.length) {
					console.error("Expected " + expected.length + " values but got " + actual.length + "                       :C");
				} else {
					console.log("Same length");
				}
				for (var index = 0; index < Math.max(expected.length, actual.length); index++) {
					var prefix = index < 10 ? index + ":  " : index + ": ";
					var expectedValue = expected[index];
					var actualValue = actual[index];
					var difference = expectedValue > actualValue ? expectedValue - actualValue : actualValue - expectedValue;
					if (difference >= tolerance || typeof expectedValue !== "number" || typeof actualValue !== "number") {
						console.error(prefix + "Expected " + expectedValue + " but got " + actualValue + "                       :C");
					} else {
						console.log(prefix + "Same value of " + expectedValue);
					}
				}
				console.log("----------------------");
			}
		);
}

test(
	"bounceIn",
	[100, 0, 500],
	[100, 98.8, 95.5, 94, 99.2, 86.1, 77.3, 75.1, 79.7, 91, 84, 53.8, 30.3, 13.4, 3.4, 0, 0]
);

test(
	"bounceOut",
	[100, 0, 500],
	[100, 96.6, 86.6, 69.8, 46.2, 16, 9, 20.3, 24.9, 22.8, 13.9, 0.8, 6, 4.5, 1.2, 0, 0]
);

test(
	"bounceInOut",
	[100, 0, 500],
	[100, 97.8, 99.6, 88.6, 89.8, 92, 65.1, 51.7, 48.3, 34.9, 8, 10.2, 11.4, 0.4, 2.2, 0, 0]
);

test(
	"circIn",
	[100, 0, 500],
	[100, 99.8, 99.1, 98, 96.4, 94.3, 91.7, 88.4, 84.6, 80, 74.5, 68, 60, 49.9, 35.9, 0]
);

test(
	"circOut",
	[100, 0, 500],
	[100, 64.1, 50.1, 40, 32, 25.5, 20, 15.4, 11.6, 8.3, 5.7, 3.6, 2, 0.9, 0.2, 0]
);

test(
	"circInOut",
	[100, 0, 500],
	[100, 99.6, 98.2, 95.8, 92.3, 87.3, 80, 68, 32, 20, 12.7, 7.7, 4.2, 1.8, 0.4, 0]
);

test(
	"cubicIn",
	[100, 0, 500],
	[100, 100, 99.8, 99.2, 98.1, 96.3, 93.6, 89.8, 84.8, 78.4, 70.4, 60.6, 48.8, 34.9, 18.7, 0]
);

test(
	"cubicOut",
	[100, 0, 500],
	[100, 81.3, 65.1, 51.2, 39.4, 29.6, 21.6, 15.2, 10.2, 6.4, 3.7, 1.9, 0.8, 0.2, 0, 0, 0]
);

test(
	"cubicInOut",
	[100, 0, 500],
	[100, 99.9, 99.1, 96.8, 92.4, 85.2, 74.4, 59.3, 40.7, 25.6, 14.8, 7.6, 3.2, 0.9, 0.1, 0, 0]
);

test(
	"expoIn",
	[100, 0, 500],
	[100, 99.8, 99.8, 99.6, 99.4, 99, 98.4, 97.5, 96.1, 93.8, 90.1, 84.3, 75, 60.3, 37, 0]
);

test(
	"expoOut",
	[100, 0, 500],
	[100, 63, 39.7, 25, 15.7, 9.9, 6.3, 3.9, 2.5, 1.6, 1, 0.6, 0.4, 0.2, 0.2, 0]
);

test(
	"expoInOut",
	[100, 0, 500],
	[100, 99.9, 99.7, 99.2, 98, 95, 87.5, 68.5, 31.5, 12.5, 5, 2, 0.8, 0.3, 0.1, 0]
);

test(
	"linear",
	[100, 0, 500],
	[100, 93.3, 86.6, 80, 73.3, 66.6, 60, 53.3, 46.6, 40, 33.3, 26.6, 20, 13.3, 6.6, 0, 0]
);

test(
	"quadIn",
	[100, 0, 500],
	[100, 99.6, 98.2, 96, 92.9, 88.9, 84, 78.2, 71.6, 64, 55.6, 46.2, 36, 24.9, 12.9, 0]
);

test(
	"quadOut",
	[100, 0, 500],
	[100, 87.1, 75.1, 64, 53.8, 44.4, 36, 28.4, 21.8, 16, 11.1, 7.1, 4, 1.8, 0.4, 0, 0]
);

test(
	"quadInOut",
	[100, 0, 500],
	[100, 99.1, 96.4, 92, 85.8, 77.8, 68, 56.4, 43.6, 32, 22.2, 14.2, 8, 3.6, 0.9, 0, 0]
);

test(
	"quartIn",
	[100, 0, 500],
	[100, 100, 100, 99.8, 99.5, 98.8, 97.4, 95.3, 91.9, 87, 80.2, 71.1, 59, 43.6, 24.1, 0, 0]
);

test(
	"quartOut",
	[100, 0, 500],
	[100, 75.9, 56.4, 41, 28.9, 19.8, 13, 8.1, 4.7, 2.6, 1.2, 0.5, 0.2, 0, 0, 0, 0]
);

test(
	"quartInOut",
	[100, 0, 500],
	[100, 100, 99.7, 98.7, 96, 90.1, 79.5, 62.1, 37.9, 20.5, 9.9, 4, 1.3, 0.3, 0, 0, 0]
);

test(
	"quintIn",
	[100, 0, 500],
	[100, 100, 100, 100, 99.9, 99.6, 99, 97.8, 95.7, 92.2, 86.8, 78.8, 67.2, 51.1, 29.2, 0, 0]
);

test(
	"quintOut",
	[100, 0, 500],
	[100, 70.8, 48.9, 32.8, 21.2, 13.2, 7.8, 4.3, 2.2, 1, 0.4, 0.1, 0, 0, 0, 0, 0]
);

test(
	"quintInOut",
	[100, 0, 500],
	[100, 100, 99.9, 99.5, 97.8, 93.4, 83.6, 64.6, 35.4, 16.4, 6.6, 2.2, 0.5, 0.1, 0, 0, 0]
);

test(
	"sineIn",
	[100, 0, 500],
	[100, 99.5, 97.8, 95.1, 91.4, 86.6, 80.9, 74.3, 66.9, 58.8, 50, 40.7, 30.9, 20.8, 10.5, 0, 0]
);

test(
	"sineOut",
	[100, 0, 500],
	[100, 89.5, 79.2, 69.1, 59.3, 50, 41.2, 33.1, 25.7, 19.1, 13.4, 8.6, 4.9, 2.2, 0.5, 0, 0]
);

test(
	"sineInOut",
	[100, 0, 500],
	[100, 98.9, 95.7, 90.5, 83.5, 75, 65.5, 55.2, 44.8, 34.5, 25, 16.5, 9.5, 4.3, 1.1, 0, 0]
);

test(
	"circleIn",
	[100, 0, 500],
	[100, 99.8, 99.1, 98, 96.4, 94.3, 91.7, 88.4, 84.6, 80, 74.5, 68, 60, 49.9, 35.9, NaN, 0]
);

test(
	"circleOut",
	[100, 0, 500],
	[100, 64.1, 50.1, 40, 32, 25.5, 20, 15.4, 11.6, 8.3, 5.7, 3.6, 2, 0.9, 0.2, 0, 0]
);

test(
	"circleInOut",
	[100, 0, 500],
	[100, 99.6, 98.2, 95.8, 92.3, 87.3, 80, 68, 32, 20, 12.7, 7.7, 4.2, 1.8, 0.4, 0, 0]
);

test(
	"linearNone",
	[100, 0, 500],
	[100, 93.3, 86.7, 80, 73.3, 66.7, 60, 53.3, 46.7, 40, 33.3, 26.7, 20, 13.3, 6.7, 0, 0]
);

test(
	"linearIn",
	[100, 0, 500],
	[100, 93.3, 86.7, 80, 73.3, 66.7, 60, 53.3, 46.7, 40, 33.3, 26.7, 20, 13.3, 6.7, 0, 0]
);

test(
	"linearOut",
	[100, 0, 500],
	[100, 93.3, 86.7, 80, 73.3, 66.7, 60, 53.3, 46.7, 40, 33.3, 26.7, 20, 13.3, 6.7, 0, 0]
);

test(
	"linearInOut",
	[100, 0, 500],
	[100, 93.3, 86.7, 80, 73.3, 66.7, 60, 53.3, 46.7, 40, 33.3, 26.7, 20, 13.3, 6.7, 0]
);
