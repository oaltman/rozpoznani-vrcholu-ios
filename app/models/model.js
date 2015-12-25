var { RNLocation: Location } = require('NativeModules');
var React = require('react-native');

var {
	DeviceEventEmitter
	} = React;

module.exports = function (store) {


	return {

		start: function () {
			console.log("Attaching listeners");
			Location.requestWhenInUseAuthorization();
			Location.startUpdatingHeading();
			Location.startUpdatingLocation();

			DeviceEventEmitter.addListener(
					'headingUpdated',
					(data) => {
						store.dispatch({
							type: 'HEADING_UPDATE',
							heading: Math.floor(data.heading)
						});
					}
			);
			DeviceEventEmitter.addListener(
					'locationUpdated',
					(data) => {
						var {latitude,longitude} = data.coords;
						store.dispatch({
							type: 'LOCATION_UPDATE',
							location: {latitude,longitude}
						});
					}
			);
		},

		stop: function () {
			console.log("Removing all listeners");
			Location.stopUpdatingHeading();
			Location.stopUpdatingLocation();
		}
	};
};


