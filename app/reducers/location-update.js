
let headingUpdate = (state = 0, action) => {
	switch (action.type) {
		case 'HEADING_UPDATE':
			return action.heading;
		default:
			return state;
	}
};

let locationUpdate = (state = {}, action)  => {
	switch (action.type) {
		case 'LOCATION_UPDATE':
			//return {latitude: 49.751825, longitude: 13.417914};
			return action.location;
		default:
			return state;
	}
};

module.exports = {headingUpdate, locationUpdate};