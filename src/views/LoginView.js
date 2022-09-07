import { useState } from 'react';

/* redux state   */
import { useDispatch } from 'react-redux';
import { authOperations } from 'redux/auth';

/* style, materialUI   */
import s from './Views.module.css';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

const LoginView = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const handleInput = evt => {
        switch (evt.currentTarget.id) {
            case 'email':
                setEmail(evt.currentTarget.value);
                break;
            case 'password':
                setPassword(evt.currentTarget.value);
                break;
            default:
                console.log('something went wrong');
        }
    };

    const handleSubmit = evt => {
        evt.preventDefault();
        dispatch(authOperations.logIn({ email, password }));
    };

    return (
        <>
            <form onSubmit={handleSubmit} className={s.form}>
                <h2 className={s.title}>Login form</h2>
                <label className={s.label} htmlFor="email">
                    email
                </label>
                <input
                    type="email"
                    onChange={handleInput}
                    name="email"
                    value={email}
                    required
                    id="email"
                    className={s.input}
                />

                <label className={s.label} htmlFor="password">
                    password
                </label>

                <input
                    type="password"
                    onChange={handleInput}
                    name="password"
                    value={password}
                    required
                    id="password"
                    className={s.input}
                />
                <Button
                    type="submit"
                    variant="contained"
                    endIcon={<SendIcon />}
                    size="large"
                >
                    Login
                </Button>
            </form>
        </>
    );
};

export default LoginView;
