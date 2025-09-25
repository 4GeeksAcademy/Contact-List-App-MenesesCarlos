import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { fetchContact, updateContact } from "../services/contactApi";

export default function EditContact() {
  const { id } = useParams();
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  const [form, setForm] = useState({ id: null, name: "", phone: "", email: "", address: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const cached = store.contacts.find(c => String(c.id) === String(id));
      if (cached) {
        setForm(cached);
      } else {
        try {
          const one = await fetchContact(id);
          setForm(one);
        } catch (e) {
          alert(e.message);
        }
      }
    })();
  }, [id, store.contacts]);

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const upd = await updateContact(id, {
        name: form.name,
        phone: form.phone,
        email: form.email,
        address: form.address
      });
      dispatch({ type: "contacts/update", payload: upd });
      navigate("/");
    } catch (e) {
      alert(e.message);
    } finally {
      setSaving(false);
    }
  };

  if (!form.id) return <div className="container py-4"><p className="text-muted">Cargando…</p></div>;

  return (
    <div className="container py-4">
      <h2 className="mb-3">Editar contacto</h2>
      <form className="row g-3" onSubmit={onSubmit}>
        <div className="col-md-6">
          <label className="form-label">Nombre</label>
          <input name="name" className="form-control" value={form.name} onChange={onChange} required />
        </div>
        <div className="col-md-6">
          <label className="form-label">Teléfono</label>
          <input name="phone" className="form-control" value={form.phone} onChange={onChange} required />
        </div>
        <div className="col-md-6">
          <label className="form-label">Email</label>
          <input type="email" name="email" className="form-control" value={form.email} onChange={onChange} required />
        </div>
        <div className="col-md-6">
          <label className="form-label">Dirección</label>
          <input name="address" className="form-control" value={form.address} onChange={onChange} />
        </div>
        <div className="col-12 d-flex gap-2">
          <button className="btn btn-primary" disabled={saving}>
            {saving ? "Guardando…" : "Actualizar"}
          </button>
          <button type="button" className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
