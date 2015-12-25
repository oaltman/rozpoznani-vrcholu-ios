
React = require('react-native');
var { StyleSheet, Text, View, Image } = React;


let Location = React.createClass({

	render: function () {
		return (
			<View style={styles.container}>
				{this.props.children}
			</View>
		)
	}
});

let styles = StyleSheet.create({
	container: {
		//backgroundColor: 'blue',
		flexDirection: 'row',
		flex: 1,
		flexWrap: 'nowrap',
		justifyContent: 'space-between'
	}
});


module.exports = Location;