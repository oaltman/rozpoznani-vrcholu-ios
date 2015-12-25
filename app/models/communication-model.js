
window.navigator.userAgent = "react-native";
var io = require("../../node_modules/socket.io/node_modules/socket.io-client/socket.io.js");

module.exports = function (store, sensorsModel) {
	return {

		initializeConnection: function () {
			var socket = io('http://pdd-ondrejaltman.herokuapp.com:80',{jsonp: false});
			socket.on('connect', () => {
				socket.emit('subscribe', 2);
			});
			socket.on('heading', (data) => {
				store.dispatch({
					type: 'HEADING_UPDATE',
					heading: data
				});
			});
			socket.on('coords', (data) => {
				store.dispatch({
					type: 'LOCATION_UPDATE',
					location: {latitude: data.lat, longitude: data.lng}
				});
			});
			socket.on('turnOffSensors', (data) => {
				sensorsModel.stop();
			});
			socket.on('turnOnSensors', (data) => {
				sensorsModel.start();
			});
			socket.on('connect_error', (err) => {
				console.log(err);
			});
		}
	}
};