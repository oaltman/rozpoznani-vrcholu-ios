'use strict';

var React = require('react-native');
var {StyleSheet,AppRegistry, View, Text} = React;
var {createStore} = require('redux');

var Model = require('./app/models/model');
var HillsModel = require('./app/models/hills-model');
var CommunicationModel = require('./app/models/communication-model');

var Compass = require('./app/components/compass');
var Location = require('./app/components/location');
var Gps = require('./app/components/gps');
var Found = require('./app/components/found');
var Hill = require('./app/components/hill');

var reducers = require('./app/reducers/top-reducer');

let store = createStore(reducers);
var compute = require('./app/models/compute')(store);


//const logUpdates = () => {
//	console.log(store.getState());
//};

var LocationModel = Model(store);
var HillsModel = HillsModel(store);
var CommunicationModel = CommunicationModel(store, LocationModel);
HillsModel.fetch();

CommunicationModel.initializeConnection();

//store.subscribe(logUpdates);
store.subscribe(compute.computeAll);

let TopLevelComponent = React.createClass({

	getInitialState: function () {
		return {
			heading: 0,
			location: {},
			hills: []
		}
	},

	componentDidMount: function ()  {
		store.subscribe(() => {
			this.setState({
				heading: store.getState()['heading'],
				location: store.getState()['location'],
				hills: store.getState()['hills']
			});
		});
		LocationModel.start();
	},

	render: function () {
		let hills = compute.computeAll();

		return (
				<View style={styles.main}>
					<Found hills={hills} />
					<Location>
						<Gps longitude={this.state.location.longitude} latitude={this.state.location.latitude} />
						<Compass heading={this.state.heading}/>
					</Location>
				</View>
		)
	}
});
//{this.state.hills.map(([name, lat, long]) => {
//	return (<Hill name={name} latitude={lat} longitude={long} />);
//})}
let styles = StyleSheet.create({
	main: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-end'
	},
	link: {
		fontSize: 20
	}
});


AppRegistry.registerComponent('WhatTheHill', () => TopLevelComponent);
