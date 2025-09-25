import React from "react";
import { Link } from "react-router-dom";

const avatar = (name) =>
  `https://ui-avatars.com/api/?background=0D8ABC&color=fff&size=120&name=${encodeURIComponent(name || "NA")}`;

export default function ContactCard({ contact, onDelete }) {
  const { id, name, email, phone, address } = contact;

  return (
    <div className="d-flex align-items-center py-3 px-5 " style={{ minHeight: '150px' }}>
      <img 
        src={avatar(name)} 
        alt={name} 
        className="rounded-circle me-5" 
        style={{ width: 110, height: 110, objectFit: 'cover' }} 
      />
      <div className="flex-grow-1">
        <h5 className="mb-2 fw-bold">{name}</h5>
        <div className="text-muted">
          <div className="mb-1">
            <i className="fas fa-map-marker-alt me-2"></i>
            {address || "—"}
          </div>
          <div className="mb-1">
            <i className="fa-solid fa-phone-flip me-2"></i>
            {phone}
          </div>
          <div className="mb-0">
            <i className="fa fa-envelope me-2"></i>
            {email}
          </div>
        </div>
      </div>
      <div className="ms-3 d-flex gap-2">
        <Link to={`/edit/${id}`} className="btn btn-outline">
          <i className="fa fa-pencil text-dark"></i>
        </Link>
        <button className="btn btn-outline" onClick={onDelete}>
          <i className="fas fa-trash-alt text-dark"></i>
        </button>
      </div>
    </div>
  );
}