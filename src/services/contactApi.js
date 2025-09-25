// src/services/contactApi.js
const BASE = "https://playground.4geeks.com/contact";
const SLUG = "carlos";

async function okOrThrow(res) {
  if (res.ok) return res.json();
  const errorText = await res.text();
  console.error('API Error:', res.status, errorText);
  throw new Error(`${res.status}: ${errorText}`);
}

export async function ensureAgenda() {
  try {
    const check = await fetch(`${BASE}/agendas/${SLUG}`);
    if (check.ok) return true;
    
    const create = await fetch(`${BASE}/agendas/${SLUG}`, {
      method: "POST"
    });
    
    if (create.ok || create.status === 400) return true;
    throw new Error(`Cannot create agenda: ${create.status}`);
  } catch (error) {
    console.warn('Agenda issue:', error.message);
    return true;
  }
}

export async function fetchContacts() {
  try {
    const res = await fetch(`${BASE}/agendas/${SLUG}/contacts`);
    if (res.status === 404) return [];
    
    const data = await okOrThrow(res);
    return data.contacts || [];
  } catch (error) {
    console.error('Error fetching contacts:', error);
    return [];
  }
}

export async function createContact({ name, email, phone, address }) {
  const body = { name, email, phone, address };
  
  const res = await fetch(`${BASE}/agendas/${SLUG}/contacts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  
  return okOrThrow(res);
}

export async function updateContact(id, { name, email, phone, address }) {
  const body = { name, email, phone, address };
  
  const res = await fetch(`${BASE}/agendas/${SLUG}/contacts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  
  return okOrThrow(res);
}

export async function fetchContact(id) {
  const res = await fetch(`${BASE}/agendas/${SLUG}/contacts/${id}`);
  return okOrThrow(res);
}

export async function deleteContact(id) {
  const res = await fetch(`${BASE}/agendas/${SLUG}/contacts/${id}`, { 
    method: "DELETE" 
  });
  
  if (res.ok) return true;
  throw new Error(`Delete failed: ${res.status}`);
}