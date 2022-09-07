/* redux state*/
import { useSelector, useDispatch } from 'react-redux';
import { contactsActions, contactsSelectors } from 'redux/contacts';

/* style*/
import s from './Filter.module.css';

export const Filter = () => {
    const filter = useSelector(contactsSelectors.getFilter);
    const dispatch = useDispatch();

    return (
        <>
            <h2 className={s.title}>Contacts List</h2>
            <label className={s.label}>
                Find Contacts by name
                <input
                    type="text"
                    onChange={evt =>
                        dispatch(contactsActions.setFilter(evt.currentTarget.value))
                    }
                    name="filter"
                    value={filter}
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                    className={s.input}
                />
            </label>
        </>
    );
};

export default Filter;
