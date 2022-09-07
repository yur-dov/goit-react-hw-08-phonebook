import s from './Container.module.css';

/* propTypes */
import PropTypes from 'prop-types';

const Container = ({ children }) => {
    return <div className={s.container}>{children}</div>;
};

export default Container;

Container.propTypes = {
    children: PropTypes.node.isRequired,
};
