/* redux state  */
import { useSelector } from 'react-redux';
import { authSelectors } from 'redux/auth';

import * as React from 'react';

/* materialUI  */
import AppBarUI from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

/* components  */
import Navigation from 'components/Navigation';
import AuthNav from 'components/AuthNav';
import UserMenu from 'components/UserMenu';

const AppBar = () => {
    const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);

    return (
        <div>
            <Box sx={{ flexGrow: 1 }}>
                <AppBarUI position="static">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <Navigation />
                        </Typography>
                        {isLoggedIn ? <UserMenu /> : <AuthNav />}
                    </Toolbar>
                </AppBarUI>
            </Box>
        </div>
    );
};

export default AppBar;
