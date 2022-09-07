/* propTypes */
import PropTypes from 'prop-types';

/* react-router-dom */
import { Navigate } from 'react-router-dom';

/* redux-state */
import { useSelector } from 'react-redux';
import { authSelectors } from 'redux/auth';

const PublicRoute = ({ children }) => {
    const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);

    return isLoggedIn ? <Navigate replace to="/contacts" /> : children;
};

export default PublicRoute;

PublicRoute.propTypes = {
    children: PropTypes.node.isRequired,
};
