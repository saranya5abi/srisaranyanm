import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [assignments, setAssignments] = useState([]);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [status, setStatus] = useState("Pending");
  const [filter, setFilter] = useState("All");

  const addAssignment = () => {
    if (!title || !subject || !dueDate) return;
    const newAssignment = {
      id: Date.now(),
      title,
      subject,
      dueDate,
      status,
    };
    setAssignments([...assignments, newAssignment]);
    setTitle("");
    setSubject("");
    setDueDate("");
    setStatus("Pending");
  };

  const updateStatus = (id, newStatus) => {
    setAssignments(
      assignments.map((a) =>
        a.id === id ? { ...a, status: newStatus } : a
      )
    );
  };

  const filteredAssignments =
    filter === "All"
      ? assignments
      : assignments.filter((a) => a.subject === filter);

  const summary = {
    Submitted: assignments.filter((a) => a.status === "Submitted").length,
    Pending: assignments.filter((a) => a.status === "Pending").length,
    Late: assignments.filter((a) => a.status === "Late").length,
  };

  return (
    <div className="container">
      <h1>📚 College Assignment Submission Tracker</h1>

      <div className="form">
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option>Pending</option>
          <option>Submitted</option>
          <option>Late</option>
        </select>
        <button onClick={addAssignment}>Add Assignment</button>
      </div>

      <div className="filter">
        <label>Filter by Subject: </label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option>All</option>
          {[...new Set(assignments.map((a) => a.subject))].map((sub) => (
            <option key={sub}>{sub}</option>
          ))}
        </select>
      </div>

      <div className="summary">
        <h2>Dashboard Summary</h2>
        <p>✅ Submitted: {summary.Submitted}</p>
        <p>🕒 Pending: {summary.Pending}</p>
        <p>⚠️ Late: {summary.Late}</p>
      </div>

      <div className="list">
        <h2>Assignments</h2>
        <ul>
          {filteredAssignments.map((a) => (
            <li key={a.id}>
              <strong>{a.title}</strong> ({a.subject}) - Due: {a.dueDate} - Status:{" "}
              <select
                value={a.status}
                onChange={(e) => updateStatus(a.id, e.target.value)}
              >
                <option>Pending</option>
                <option>Submitted</option>
                <option>Late</option>
              </select>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
