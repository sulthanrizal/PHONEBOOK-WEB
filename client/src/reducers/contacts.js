const contacts = (state = { phonebooks: [], page: 1, limit: 60, total: 1, pages: 1 }, action) => {
    switch (action.type) {
        case 'LOAD_CONTACT_SUCCESS':
            return { ...action.contacts, ...action.sort }
        case 'ADD_CONTACT_SUCCES':
            return state;
        case 'UPDATE_CONTACT_SUCCESS':
            const update = { phonebooks: [...(state.phonebooks.filter((contacts) => contacts.id !== action.data.id)), action.data] };
            update.phonebooks.sort((a, b) => {
                if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
                return 0;
            });
            if (state.sort === "desc") update.phonebooks.reverse()
            return {
                ...state,
                phonebooks: update.phonebooks.filter(contact => {
                    return contact.name.toLowerCase().includes(state.keyword.toLowerCase()) ||
                        contact.phone.toLowerCase().includes(state.keyword.toLowerCase())
                })
            };
        case 'DELETE_CONTACT_SUCCESS':
            return { ...state, phonebooks: state.phonebooks.filter((contacts) => contacts.id !== action.id) }
        case 'UPDATE_AVATAR_SUCCESS':
            return state;
        case 'LOAD_PAGE_SUCCESS':
            return { ...state, phonebooks: [...state.phonebooks, ...action.contacts.phonebooks], page: action.contacts.page }
        case 'LOAD_CONTACT_FAILED':
        case 'ADD_CONTACT_FAILED':
        case 'UPDATE_CONTACT_FAILED':
        case 'DELETE_CONTACT_FAILED':
        case 'UPDATE_AVATAR_FAILED':
        default:
            return state;
    }
}

export default contacts