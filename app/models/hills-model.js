let extractData = function (data) {
	let arr = data.feed.entry;
	let returned = [];
	for (let i = 0; i< arr.length; i+=3) {
		let hill = [];
		for (let j = 0; j<3; j++) {
			hill.push(arr[i+j]['content']['$t']);
		}
		returned.push(hill);
	}
	return returned;
};

let url = 'https://spreadsheets.google.com/feeds/cells/18dDWbMlEZrJyHq3ShXCkArLIsPAORQ0XQZ4gdGwBIRs/od6/public/full?alt=json';

let fetchData = function () {
	return fetch(url, {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		}
	})
};

module.exports = function (store) {
	return {
		fetch: function() {
			store.dispatch({
				type: 'HILLS_FETCHING'
			});
			fetchData()
				.then((response) => response.text())
				.then((responseText) => {
					return JSON.parse(responseText);
				})
				.then(extractData)
				.then((hills) => store.dispatch({
					type: 'HILLS_FETCHED',
					hills
				}))
				.catch((err) => {
					console.warn(err);
				});
		}
	};
};
