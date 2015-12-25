var React = require('react-native');
var { StyleSheet, Text, View } = React;

let Gps = React.createClass({
	render: function () {
		let {longitude, latitude} = this.props;
		return (
				<View style={styles.gps}>
					<Text style={styles.title}>GPS</Text>
					<Text>Lat: {latitude}</Text>
					<Text>Lng: {longitude}</Text>
				</View>
		)
	}
});

let styles = StyleSheet.create({
	gps: {
		paddingTop: 20,
		paddingLeft: 10,
		width: 200
		//backgroundColor: 'red'
	},
	title: {
		fontSize: 18
	}
});

module.exports = Gps;