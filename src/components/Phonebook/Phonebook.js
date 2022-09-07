/* react, react-router-dom */
import { useState } from 'react';

/* redux state */
import { useSelector, useDispatch } from 'react-redux';
import { contactsOperations, contactsSelectors } from 'redux/contacts';

/* style, notification, spinner, materialUI */
import s from './Phonebook.module.css';
import toast from 'react-hot-toast';
import { Circles } from 'react-loader-spinner';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

function Phonebook() {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const contacts = useSelector(contactsSelectors.getContacts);
    const loading = useSelector(contactsSelectors.getLoading);
    const dispatch = useDispatch();

    const handleInput = evt => {
        switch (evt.currentTarget.id) {
            case 'nameAdd':
                setName(evt.currentTarget.value);
                break;
            case 'numberAdd':
                setNumber(evt.currentTarget.value);
                break;
            default:
                console.log('wrong name');
        }
    };

    const handleSubmit = evt => {
        evt.preventDefault();
        addContactToContacts(name, number);
    };

    const reset = () => {
        setName('');
        setNumber('');
    };

    const addContactToContacts = (name, number) => {
        const isNameInContacts = contacts
            .map(({ name }) => name.toLowerCase())
            .includes(name.toLowerCase());

        if (isNameInContacts) {
            toast.error(`${name} is already in contacts`, {
                duration: 3000,
                position: 'top-center',
            });
        } else {
            dispatch(contactsOperations.addContact({ name, number }));
            reset();
        }
    };

    return (
        <form className={s.form} onSubmit={handleSubmit}>
            <h2 className={s.title}>Add contact</h2>
            <label className={s.label} htmlFor="nameAdd">
                Name
            </label>
            <input
                type="text"
                onChange={handleInput}
                name="name"
                value={name}
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
                className={s.input}
                id="nameAdd"
            />

            <label className={s.label} htmlFor="numberAdd">
                Number
            </label>
            <input
                type="tel"
                onChange={handleInput}
                name="number"
                value={number}
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
                className={s.input}
                id="numberAdd"
            />

            <Button
                type="submit"
                variant="contained"
                endIcon={
                    name && loading ? (
                        <Circles height="15" width="15" color="white" ariaLabel="loading" />
                    ) : (
                        <SendIcon />
                    )
                }
                size="large"
            >
                Add contact
            </Button>
        </form>
    );
}

export default Phonebook;
