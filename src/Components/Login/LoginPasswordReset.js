import React from 'react';
import Input from '../Forms/Input';
import Button from '../Forms/Button';
import useForm from '../../Hooks/useForm';
import { PASSWORD_RESET } from '../../api';
import useFetch from '../../Hooks/useFetch';
import Error from '../Helper/Error';
import { useNavigate } from 'react-router-dom';
import Head from '../Helper/Head';

const LoginPasswordReset = () => {
	const [login, setLogin] = React.useState();
	const [key, setKey] = React.useState();

	const password = useForm();
	const { error, loading, request } = useFetch();

	const navigate = useNavigate();

	async function handleSubmit(e) {
		e.preventDefault();

		if (password.validate()) {
			const { url, options } = PASSWORD_RESET({
				login,
				key,
				password: password.value,
			});

			const { res } = await request(url, options);
			if (res && res.ok) navigate('/login');
		}
	}

	React.useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const key = params.get('key');
		const login = params.get('login');

		if (key) setKey(key);
		if (login) setLogin(login);
	}, []);

	return (
		<section className="animeLeft">
			<Head title="Resete a senha" />
			<h1 className="title">Resete a senha</h1>
			<form onSubmit={handleSubmit}>
				<Input
					type="password"
					label="Nova senha"
					name="password"
					{...password}
				/>
				{loading ? (
					<Button disabled>Resetando</Button>
				) : (
					<Button>Resetar</Button>
				)}
				<Error error={error} />
			</form>
		</section>
	);
};

export default LoginPasswordReset;
