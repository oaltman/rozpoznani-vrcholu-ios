var React = require('react-native');
var { StyleSheet, Text, View } = React;


let formatDistance = function (metres) {
	if(metres > 1000) {
		let distNumber = (metres / 1000) + ((metres % 1000) * 0.001);
		return distNumber.toFixed(2) + ' km';
	}
	return metres + " m";
};


let Hill = React.createClass({
	render: function () {
		var [name, angle, distance] = this.props.hillValues;
		return (
			<View style={[styles.hill, {transform: [{translateX: 90 + 1.2 * angle }]}, Math.abs(angle) < 2 && {borderColor: 'red'}]}>
				<Text style={styles.text}>{name}</Text>
				<Text>{formatDistance(distance)}</Text>
			</View>
		)
	}
});

let styles = StyleSheet.create({
	hill: {
		flex: 0,
		justifyContent: 'center',
		alignItems: 'center',
		width: 150,
		padding: 20,
		borderColor: 'black',
		borderWidth: 2,
		borderRadius: 60
	},
	text: {
		textAlign: 'center',
		fontSize: 20
	}
});

module.exports = Hill;