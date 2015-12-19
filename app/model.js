var { RNLocation: Location } = require('NativeModules');
var React = require('react-native');

var {
	DeviceEventEmitter
	} = React;

module.exports = function () {

	Location.requestAlwaysAuthorization();

	return {

		start: function () {
			Location.startUpdatingHeading();
		},

		stop: function () {
			Location.stopUpdatingHeading();
		},

		attachListener: function (cb) {
			DeviceEventEmitter.addListener(
				'headingUpdated',
				cb
			);
		}

	};
};


