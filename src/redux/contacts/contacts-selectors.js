export const getFilter = state => state.contacts.filter;
export const getContacts = state => state.contacts.items;

export const getFilteredContacts = state =>
    getContacts(state).filter(contact =>
        contact.name.toLowerCase().includes(getFilter(state).toLowerCase())
    );
export const getError = state => state.contacts.error;
export const getLoading = state => state.contacts.loading;

export const getIsFetchingContacts = state => state.contacts.isFetchingContacts;
