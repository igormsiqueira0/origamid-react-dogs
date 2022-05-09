import React from 'react';
import { COMMENT_POST } from '../../api';

import styles from './PhotoCommentsForm.module.css';

import { ReactComponent as Enviar } from '../../Assets/enviar.svg';
import useFetch from '../../Hooks/useFetch';
import Error from '../Helper/Error';

const PhotoCommentsForm = ({ id, setComments, single }) => {
	const [comment, setComment] = React.useState('');

	const { request, error } = useFetch();

	async function handleSubmit(e) {
		e.preventDefault();

		const { url, options } = COMMENT_POST(id, { comment });
		const { res, json } = await request(url, options);

		if (res.ok) {
			setComment('');
			setComments((comments) => [...comments, json]);
		}
	}

	return (
		<form
			onSubmit={handleSubmit}
			className={`${styles.form} ${single ? styles.single : ''}`}
		>
			<textarea
				name="comment"
				id="comment"
				placeholder="Comente..."
				className={styles.textarea}
				value={comment}
				onChange={({ target }) => setComment(target.value)}
			></textarea>
			<button className={styles.button}>
				<Enviar />
			</button>

			{error && <Error error={error} />}
		</form>
	);
};

export default PhotoCommentsForm;
