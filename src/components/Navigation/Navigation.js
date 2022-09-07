import { NavLink } from 'react-router-dom';
import s from './Navigation.module.css';

/* redux state*/
import { useSelector } from 'react-redux';
import { getIsLoggedIn } from 'redux/auth/auth-selectors';

const Navigation = () => {
    const isLoggedIn = useSelector(getIsLoggedIn);

    return (
        <div>
            <ul className={s.navList}>
                <li className={s.navListItem}>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? s.navLinkActive : s.navLink
                        }
                    >
                        Home
                    </NavLink>
                </li>

                {isLoggedIn && (
                    <li className={s.navListItem}>
                        <NavLink
                            to="/contacts"
                            className={({ isActive }) =>
                                isActive ? s.navLinkActive : s.navLink
                            }
                        >
                            Contacts
                        </NavLink>
                    </li>
                )}
            </ul>
        </div>
    );
};

export default Navigation;
