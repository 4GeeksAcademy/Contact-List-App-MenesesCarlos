import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import ContactCard from "../components/ContactCard";
import ConfirmModal from "../components/ConfirmModal";
import { ensureAgenda, fetchContacts, deleteContact } from "../services/contactApi";

export default function Contacts() {
  const { store, dispatch } = useGlobalReducer();
  const [toDelete, setToDelete] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        dispatch({ type: "contacts/loading" });
        await ensureAgenda();
        const list = await fetchContacts();
        dispatch({ type: "contacts/set_list", payload: list });
      } catch (e) {
        dispatch({ type: "contacts/error", payload: e.message });
      }
    })();
  }, [dispatch]);

  const onConfirmDelete = async () => {
    try {
      await deleteContact(toDelete);
      dispatch({ type: "contacts/delete", payload: toDelete });
    } catch (e) {
      alert(e.message);
    } finally {
      setToDelete(null);
    }
  };

  return (
  <div className="container-fluid" style={{ maxWidth: '1200px' }}>
    <div className="d-flex justify-content-end mb-4">
      <Link to="/add" className="btn btn-success px-4 py-2">
        Add new contact
      </Link>
    </div>
    <div className="border rounded">
      {Array.isArray(store.contacts) && store.contacts.length > 0 ? (
        store.contacts.map((contact, index) => (
          <div key={contact.id}>
            <ContactCard contact={contact} onDelete={() => setToDelete(contact.id)} />
            {index < store.contacts.length - 1 && <hr className="my-0" />}
          </div>
        ))
      ) : (
        <div className="text-center text-muted py-5">
          <p>No contacts yet</p>
        </div>
      )}
    </div>

    <ConfirmModal
        show={toDelete !== null}
        title="Are you sure?"
        message="If you delete this thing the entire universe will go down!"
        onCancel={() => setToDelete(null)}
        onConfirm={onConfirmDelete}
      />
    </div>
);

}