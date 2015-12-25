

let updatedHills = function (hills) {
	return hills.map(([name, longitude, latitude]) => {
		return [name, longitude, latitude];
	});
};

let downloadHills = function (state=[], action) {
	switch (action.type) {
		case 'HILLS_FETCHING':
			return state;
		case 'HILLS_FETCHED':
			console.log(action.hills);
			return action.hills;
		case 'HEADING_UPDATE':
			return updatedHills(state);
		default:
			return state;
	}
};


module.exports = {downloadHills};