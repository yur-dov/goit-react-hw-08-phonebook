/* react, react-router-dom */

import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

/* components */
import PatchForm from 'components/PatchForm';

/* style, propTypes */
import PropTypes from 'prop-types';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

function Modal({ onClick, id }) {
    useEffect(() => {
        const onClose = e => {
            if (e.code === 'Escape') {
                onClick();
            }
        };

        document.addEventListener('keydown', onClose);
        return function clean() {
            document.removeEventListener('keydown', onClose);
        };
    });

    return createPortal(
        <div className={s.Overlay}>
            <div className={s.Modal}>
                <PatchForm onClick={onClick} id={id} />
            </div>
        </div>,
        modalRoot
    );
}

export default Modal;

Modal.propTypes = {
    onClick: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
};
