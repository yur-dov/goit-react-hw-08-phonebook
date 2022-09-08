/* react, react-router-dom */
import React from 'react';

/* redux-state */
import { useDispatch } from 'react-redux';
import { contactsOperations } from 'redux/contacts';

/* style, materialUI, spinner */

import s from './ContactListItem.module.css';
import { Circles } from 'react-loader-spinner';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import Fab from '@mui/material/Fab';
import EditIcon from '@mui/icons-material/Edit';

/* propTypes */
import PropTypes from 'prop-types';

const ContactListItem = ({ id, name, number, loader, handleShowModal }) => {
    const dispatch = useDispatch();

    return (
        <li className={s.item}>
            <Fab
                size="small"
                color="primary"
                aria-label="edit"
                className={s.fab}
                onClick={handleShowModal}
                id={id}
            >
                <EditIcon />
            </Fab>
            <div className={s.contactContainer}>
                <span className={s.name}>{name}</span>
                <span className={s.number}>{number}</span>
            </div>

            <Button
                className={s.button}
                id={id}
                name={name}
                variant="outlined"
                startIcon={
                    loader ? (
                        <Circles height="20" width="20" color="blue" ariaLabel="loading" />
                    ) : (
                        <DeleteIcon />
                    )
                }
                onClick={evt => {
                    dispatch(
                        contactsOperations.deleteContact({
                            id: evt.currentTarget.id,
                            name: evt.currentTarget.name,
                        })
                    );
                }}
            >
                Delete
            </Button>
        </li>
    );
};

ContactListItem.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    number: PropTypes.string.isRequired,
    loader: PropTypes.bool.isRequired,
    handleShowModal: PropTypes.func.isRequired,
};

export default ContactListItem;
