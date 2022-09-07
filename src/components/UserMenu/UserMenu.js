/*redux state  */
import { useSelector, useDispatch } from 'react-redux';
import { authOperations, authSelectors } from 'redux/auth';

/*style, materialUI  */
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { deepPurple } from '@mui/material/colors';
import s from './UserMenu.module.css';

const UserMenu = () => {
    const userName = useSelector(authSelectors.getUserName);
    const dispatch = useDispatch();

    return (
        <>
            <Avatar sx={{ bgcolor: deepPurple[500] }}>{userName.slice(0, 1)}</Avatar>
            <div className={s.text}>
                Welcome,
                <span className={s.userName}>{userName}</span>
                <Button
                    color="inherit"
                    type="buttom"
                    onClick={() => dispatch(authOperations.logOut())}
                >
                    Logout
                </Button>
            </div>
        </>
    );
};

export default UserMenu;
