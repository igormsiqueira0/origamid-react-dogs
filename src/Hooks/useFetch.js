import React from 'react';

const useFetch = () => {
	const [data, setData] = React.useState(null);
	const [error, setError] = React.useState(null);
	const [loading, setLoading] = React.useState(false);

	const request = React.useCallback(async (url, options) => {
		let res, json;

		try {
			setError(null);
			setLoading(true);
			res = await fetch(url, options);
			json = await res.json();

			console.log(res);
			if (res.ok === false) throw new Error(json.message);
		} catch (err) {
			json = null;
			setError(err.message);
			console.log(err);
		} finally {
			setData(json);
			setLoading(false);
			return { res, json };
		}
	}, []);

	return {
		data,
		loading,
		error,
		request,
	};
};

export default useFetch;
