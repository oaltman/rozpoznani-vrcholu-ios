var React = require('react-native');
var { StyleSheet, Text, View, Image } = React;

/// http://screen.ondrejaltman.eu/0fc56cc2ad23d71edb7322af89c3e7b1e062ac01.png
var Compass = React.createClass({

	render: function() {
		return (
			<View style={styles.compass}>
				<Text style={styles.heading}>{this.props.heading}</Text>
				<Image
					source={{uri: 'http://assets.ondrejaltman.eu/Kompas.png'}}
					style={{ width: 66,
									 height: 70,
									 marginLeft: 20,
									 transform: [ {rotate: (-this.props.heading) + "deg"} ]
								 }} />
			</View>
		);
	}
});

var styles = StyleSheet.create({
	heading: {
		fontSize: 20
	},
	compass: {
		flex: 1,
		width: 130,
		flexDirection: 'row',
		justifyContent: 'flex-end',
		alignItems: 'center',
		//backgroundColor: 'green'
	}
});

module.exports = Compass;