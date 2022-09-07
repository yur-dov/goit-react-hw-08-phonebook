/* propTypes */
import PropTypes from 'prop-types';

/* react-router-dom */
import { Navigate } from 'react-router-dom';

/* redux-state */
import { useSelector } from 'react-redux';
import { authSelectors } from 'redux/auth';

const PrivateRoute = ({ children }) => {
    const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);

    return isLoggedIn ? children : <Navigate replace to="/login" />;
};

export default PrivateRoute;

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
};
