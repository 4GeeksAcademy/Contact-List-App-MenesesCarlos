export const initialStore = () => ({
  contacts: [],
  loading: false,
  error: null
});

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "contacts/loading":
      return { ...store, loading: true, error: null };
    case "contacts/error":
      return { ...store, loading: false, error: action.payload || "Error" };
    case "contacts/set_list":
      return { ...store, loading: false, error: null, contacts: action.payload };
    case "contacts/add":
      return { ...store, contacts: [action.payload, ...store.contacts] };
    case "contacts/update":
      return { ...store, contacts: store.contacts.map(c => c.id === action.payload.id ? action.payload : c) };
    case "contacts/delete":
      return { ...store, contacts: store.contacts.filter(c => c.id !== action.payload) };
    default:
      return store;
  }
}
