import React from "react";

export default function ConfirmModal({ show, title, message, onCancel, onConfirm }) {
  if (!show) return null;
  return (
    <>
      <div className="modal fade show" style={{ display: "block" }} tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button type="button" className="btn-close" onClick={onCancel}></button>
            </div>
            <div className="modal-body">
              <p className="mb-0">{message}</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={onCancel}>Oh no!</button>
              <button className="btn btn-primary" onClick={onConfirm}>Yes baby!</button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </>
  );
}
