import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { UserContext } from '../../UserContext';

import styles from './UserHeaderNav.module.css';

import { ReactComponent as Feed } from '../../Assets/feed.svg';
import { ReactComponent as Estatisticas } from '../../Assets/estatisticas.svg';
import { ReactComponent as Sair } from '../../Assets/sair.svg';
import { ReactComponent as Adicionar } from '../../Assets/adicionar.svg';
import useMedia from '../../Hooks/useMedia';

const UserHeaderNav = () => {
	const { userLogout } = React.useContext(UserContext);
	const mobile = useMedia('(max-width: 40rem)');
	const [menu, setMenu] = React.useState(false);

	const pathname = useLocation();

	React.useEffect(() => {
		setMenu(false);
	}, [pathname]);

	return (
		<>
			{mobile && (
				<button
					aria-label="Menu"
					className={`${styles.mobileButton} ${
						menu && styles.mobileButtonActive
					}`}
					onClick={() => setMenu((state) => !state)}
				></button>
			)}
			<nav
				className={`${mobile ? styles.navMobile : styles.nav} ${
					menu && styles.navMobileActive
				}`}
			>
				<NavLink to="/conta" end>
					<Feed />
					{mobile && 'Minhas fotos'}
				</NavLink>
				<NavLink to="/conta/estatisticas">
					<Estatisticas />
					{mobile && 'Estatísticas'}
				</NavLink>
				<NavLink to="/conta/postar">
					<Adicionar />
					{mobile && 'Adicionar foto'}
				</NavLink>

				<button onClick={userLogout}>
					<Sair />
					{mobile && 'Sair'}
				</button>
			</nav>
		</>
	);
};

export default UserHeaderNav;
