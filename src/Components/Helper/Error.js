import React from 'react';

const Error = ({ error }) => {
	if (!error) return null;
	return <p style={{ color: '#f31', marginBlock: '1rem' }}>{error}</p>;
};

export default Error;
