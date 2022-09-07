/* react, react-router-dom */
import React, { useState, useEffect } from 'react';

/* redux-state */
import { useSelector, useDispatch } from 'react-redux';
import { contactsOperations, contactsSelectors } from 'redux/contacts';

/* style */
import s from './ContactList.module.css';

/* components */
import Modal from 'components/Modal';
import ContactListItem from '../ContactListItem';

const ContactList = () => {
    const [patchContactId, setPatchContactId] = useState(null);

    const allContacts = useSelector(contactsSelectors.getContacts);
    const filteredContacts = useSelector(contactsSelectors.getFilteredContacts);
    const loading = useSelector(contactsSelectors.getLoading);
    const isFetchingContacts = useSelector(
        contactsSelectors.getIsFetchingContacts
    );

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(contactsOperations.fetchContacts());
    }, [dispatch]);

    const handleHideModal = e => {
        setPatchContactId(null);
    };

    const handleShowModal = e => {
        setPatchContactId(e.currentTarget.id);
    };

    if (filteredContacts.length === 0 && allContacts.length !== 0) {
        return <p>Don't find any contact, try something else</p>;
    }

    return (
        <>
            <ul className={s.list}>
                {filteredContacts.map(({ name, number, id }) => (
                    <ContactListItem
                        key={id}
                        id={id}
                        name={name}
                        number={number}
                        loader={loading?.id === id}
                        handleShowModal={handleShowModal}
                    />
                ))}
            </ul>

            {allContacts.length === 0 && !isFetchingContacts && (
                <p>You don't have any contact, please add your contacts</p>
            )}

            {patchContactId && (
                <Modal onClick={handleHideModal} id={patchContactId} />
            )}
        </>
    );
};

export default ContactList;
