var {headingUpdate, locationUpdate} = require('./location-update');
var {downloadHills} = require('./hills-update');

let coords = (state = {}, action) => {
	return {
		heading: headingUpdate(state.heading, action),
		location: locationUpdate(state.location, action),
		hills: downloadHills(state.hills, action)
	}
};

module.exports = coords;