import { NavLink } from 'react-router-dom';

/* style */
import s from './AuthNav.module.css';

const AuthNav = () => {
    return (
        <div>
            <ul className={s.navList}>
                <li className={s.navListItem}>
                    <NavLink
                        to="/register"
                        className={({ isActive }) =>
                            isActive ? s.navLinkActive : s.navLink
                        }
                    >
                        Register
                    </NavLink>
                </li>
                <li className={s.navListItem}>
                    <NavLink
                        to="/login"
                        className={({ isActive }) =>
                            isActive ? s.navLinkActive : s.navLink
                        }
                    >
                        Login
                    </NavLink>
                </li>
            </ul>
        </div>
    );
};

export default AuthNav;
