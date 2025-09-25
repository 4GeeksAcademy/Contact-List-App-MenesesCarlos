import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { createContact, fetchContact, updateContact } from "../services/contactApi";

const empty = { name: "", email: "", phone: "", address: "" };

export default function AddContact() {
  const { id } = useParams();
  const editing = Boolean(id);
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      if (!editing) { 
        setForm(empty); 
        return; 
      }
      
      const cached = store.contacts.find(c => String(c.id) === String(id));
      if (cached) {
        setForm({
          name: cached.name || "",
          email: cached.email || "",
          phone: cached.phone || "",
          address: cached.address || ""
        });
      } else {
        try {
          const one = await fetchContact(id);
          setForm({
            name: one.name || "",
            email: one.email || "",
            phone: one.phone || "",
            address: one.address || ""
          });
        } catch (e) { 
          setError(e.message);
        }
      }
    })();
  }, [id, editing, store.contacts]);

  const onChange = e => {
    setError("");
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    
    try {
      if (editing) {
        const updated = await updateContact(id, form);
        dispatch({ type: "contacts/update", payload: updated });
      } else {
        const created = await createContact(form);
        dispatch({ type: "contacts/add", payload: created });
      }
      navigate("/");
    } catch (e) {
      setError(e.message);
      console.error('Submit error:', e);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto" style={{ maxWidth: 820 }}>
      <h1 className="display-5 text-center mb-4">
        {editing ? "Edit contact" : "Add a new contact"}
      </h1>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <form className="row g-3" onSubmit={onSubmit}>
        <div className="col-12">
          <label className="form-label">Full Name</label>
          <input
            className="form-control"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={onChange}
            required
          />
        </div>
        <div className="col-12">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            placeholder="Enter email"
            value={form.email}
            onChange={onChange}
            required
          />
        </div>
        <div className="col-12">
          <label className="form-label">Phone</label>
          <input
            className="form-control"
            name="phone"
            placeholder="Enter phone"
            value={form.phone}
            onChange={onChange}
            required
          />
        </div>
        <div className="col-12">
          <label className="form-label">Address</label>
          <input
            className="form-control"
            name="address"
            placeholder="Enter address"
            value={form.address}
            onChange={onChange}
          />
        </div>
        <div className="col-12">
          <button className="btn btn-primary w-100" disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </form>

      <div className="mt-2">
        <Link to="/" className="text-muted">or get back to contacts</Link>
      </div>
    </div>
  );
}