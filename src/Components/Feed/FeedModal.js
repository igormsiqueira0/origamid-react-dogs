import React from 'react';

import styles from './FeedModal.module.css';

import useFetch from '../../Hooks/useFetch';
import { PHOTO_GET } from '../../api';
import Error from '../Helper/Error';
import Loading from '../Helper/Loading';
import PhotoContent from '../Photo/PhotoContent';

const FeedModal = ({ photo, setModalPhoto }) => {
	const { data, error, loading, request } = useFetch();

	function handleOutsideClick(e) {
		if (e.target === e.currentTarget) setModalPhoto(null);
	}

	React.useEffect(() => {
		const { url, options } = PHOTO_GET(photo.id);
		request(url, options);
	}, [photo, request]);

	return (
		<div className={styles.modal} onClick={handleOutsideClick}>
			{error && <Error />}
			{loading && <Loading />}
			{data && <PhotoContent data={data} />}
		</div>
	);
};

export default FeedModal;
