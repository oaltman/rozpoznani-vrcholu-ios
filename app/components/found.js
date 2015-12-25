var Hill = require('./hill');

React = require('react-native');
var { StyleSheet, Text, View, Image } = React;

let Found = React.createClass({

	render: function() {
		console.log(this.props.hills);
		return (
			<View style={styles.container}>
				{this.props.hills
						.filter((hill) => {
							return (hill[1] < 50 && hill[1] > -50)
						})
						.map((hill) => {
							return (<Hill hillValues={hill} />)}
						)
				}
				{this.props.children}
			</View>
		)
	}
});

let styles = StyleSheet.create({
  container: {
	  paddingTop: 100,
	  height: 470,
	  //backgroundColor: 'yellow'
  }
});

module.exports = Found;