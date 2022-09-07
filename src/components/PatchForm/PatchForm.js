/* react, react-router-dom */
import { useState } from 'react';

/* redux-state */
import { useSelector, useDispatch } from 'react-redux';
import { contactsOperations, contactsSelectors } from 'redux/contacts';

/* style, materialUI, spinner propTypes */
import s from './PatchForm.module.css';
import { Circles } from 'react-loader-spinner';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import PropTypes from 'prop-types';

function PatchForm({ onClick, id }) {
    const contacts = useSelector(contactsSelectors.getContacts);
    const contactToEdit = contacts.find(contact => contact.id === id);

    const [name, setName] = useState(contactToEdit.name);
    const [number, setNumber] = useState(contactToEdit.number);

    const loading = useSelector(contactsSelectors.getLoading);
    const dispatch = useDispatch();

    const handleInput = evt => {
        switch (evt.currentTarget.id) {
            case 'namePatch':
                setName(evt.currentTarget.value);
                break;
            case 'numberPatch':
                setNumber(evt.currentTarget.value);
                break;
            default:
                console.log('wrong name');
        }
    };

    const handleSubmit = evt => {
        evt.preventDefault();
        dispatch(contactsOperations.patchContact({ name, number, id }));
        onClick();
    };

    return (
        <form className={s.form} onSubmit={handleSubmit}>
            <h2 className={s.title}>Edit contact</h2>
            <label className={s.label} htmlFor="namePatch">
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
                id="namePatch"
            />

            <label className={s.label} htmlFor="numberPatch">
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
                id="numberPatch"
            />

            <div className={s.buttonContainer}>
                <Button
                    type="button"
                    variant="contained"
                    size="large"
                    onClick={onClick}
                >
                    Cancel
                </Button>

                <Button
                    type="submit"
                    variant="contained"
                    endIcon={
                        loading ? (
                            <Circles
                                height="15"
                                width="15"
                                color="white"
                                ariaLabel="loading"
                            />
                        ) : (
                            <EditIcon />
                        )
                    }
                    size="large"
                >
                    Edit
                </Button>
            </div>
        </form>
    );
}

export default PatchForm;

PatchForm.propTypes = {
    onClick: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
};
