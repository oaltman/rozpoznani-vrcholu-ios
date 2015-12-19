'use strict';

var React = require('react-native');
var Kefir = require('kefir');
var Model = require('./app/model');

var hills = [
  ["Chlup", 2.3, 4.5]
];


var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
} = React;

var LocationModel = Model();

var WhatTheHill = React.createClass({

  getInitialState: function() {
    return {
      text: "Foo",
      rotation: 0
    };
  },

  componentDidMount: function() {
    LocationModel.start();
    LocationModel.attachListener( (data)  =>
      this.setState({
        rotation: -data.heading
      }));
  },

  componentWillUnmount: function() {
    LocationModel.stop();
  },

  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {this.state.text}
        </Text>
        <Image
          source={{ uri: 'http://screen.ondrejaltman.eu/0fc56cc2ad23d71edb7322af89c3e7b1e062ac01.png' }}
          style={{ width: 400,
                   height: 400,
                   flex: 0.8,
                   transform: [ {rotate: this.state.rotation + "deg"} ]
                 }} />
        <Text>{this.state.heading}</Text>
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5
  }
});

AppRegistry.registerComponent('WhatTheHill', () => WhatTheHill);
