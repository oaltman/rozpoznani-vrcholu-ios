

/**
 * @see http://stackoverflow.com/questions/9566069/how-to-calculate-angle-between-two-geographical-gps-coordinates
 */
let computeAngle = function (pointA, pointB) {
	let toDegrees = (angle) => {
		degree = angle * (180/Math.PI);
		//degree -= 180;
		return degree > 0 ? degree : degree + 360;
	};
	let toRad = (num) => num * Math.PI / 180;

	let λ1 = toRad(pointA.longitude);
	let φ1 = toRad(pointA.latitude);
	let λ2 = toRad(pointB.longitude);
	let φ2 = toRad(pointB.latitude);

	var y = Math.sin(λ2-λ1) * Math.cos(φ2);
	var x = Math.cos(φ1)*Math.sin(φ2) -
			Math.sin(φ1)*Math.cos(φ2)*Math.cos(λ2-λ1);
	return toDegrees(Math.atan2(y, x));
};

let computeDistance = function (pointA, pointB) {
	let toRad = (num) => num * Math.PI / 180;
	let lat2 = pointB.latitude;
	let lon2 = pointB.longitude;
	let lat1 = pointA.latitude;
	let lon1 = pointA.longitude;
	let R = 6371000;
	let φ1 = toRad(lat1);
	let φ2 = toRad(lat2);
	let Δφ = toRad(lat2 - lat1);
	let Δλ = toRad(lon2 - lon1);

	let a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
			Math.cos(φ1) * Math.cos(φ2) *
			Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
	let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	return R * c
};

module.exports = function (store) {
	return {
		computeAll: function () {
			let {location, heading, hills} = store.getState();

			angles = hills.map((hill) => {
				let [name, latitude, longitude] = hill;
				let hillCoords = {latitude, longitude};
				let angle = (Math.floor(computeAngle(location, hillCoords))) - heading;
				let distance = Math.floor(computeDistance(location, hillCoords));
				return [name, angle, distance];
			}).filter(([_1, _2, distance]) => {
				return distance < 10000; // 100km
			}).sort((a,b) => {
				return b[2] - a[2];
			});
			return angles;
		}
	};
};

