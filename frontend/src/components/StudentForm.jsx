import React, { useState, useEffect } from "react";

export default function StudentForm({ initial = {}, onSave, onCancel }) {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    usn: "",
    course: "",
    year: 1,
    ...initial
  });

  useEffect(() => setForm({ ...form, ...initial }), /* eslint-disable-line */ [initial]);

  const change = (k, v) => setForm(s => ({ ...s, [k]: v }));

  return (
    <div style={{ display: "grid", gap: 8 }}>
      <input placeholder="First name" value={form.firstName} onChange={e => change("firstName", e.target.value)} />
      <input placeholder="Last name" value={form.lastName} onChange={e => change("lastName", e.target.value)} />
      <input placeholder="Email" value={form.email} onChange={e => change("email", e.target.value)} />
      <input placeholder="USN" value={form.usn} onChange={e => change("usn", e.target.value)} />
      <input placeholder="Course" value={form.course} onChange={e => change("course", e.target.value)} />
      <input placeholder="Year" type="number" value={form.year} onChange={e => change("year", e.target.value)} />
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={() => onSave(form)}>Save</button>
        <button onClick={onCancel} style={{ background: "#ffdddd" }}>Cancel</button>
      </div>
    </div>
  );
}
