// src/pages/AdminEvents.jsx
import { useEffect, useState } from "react";
import { getEvents, createEvent } from "../api";

export default function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    dateTime: "",
    image: "",
    duration: "",
    cost: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadEvents();
  }, []);

  async function loadEvents() {
    try {
      const data = await getEvents();
      setEvents(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load events");
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!form.title.trim()) {
      setError("Title is required");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        ...form,
        cost: form.cost ? Number(form.cost) : null,
      };

      const newEvent = await createEvent(payload);
      setEvents((prev) => [...prev, newEvent]);

      setForm({
        title: "",
        description: "",
        location: "",
        dateTime: "",
        image: "",
        duration: "",
        cost: "",
      });
    } catch (err) {
      console.error(err);
      setError("Failed to create event");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Admin – Manage Events</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="grid gap-3 mb-10">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="border rounded px-3 py-2"
        />
        <input
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="border rounded px-3 py-2"
        />
        <input
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Location"
          className="border rounded px-3 py-2"
        />
        <input
          name="dateTime"
          value={form.dateTime}
          onChange={handleChange}
          placeholder="Date & Time (text)"
          className="border rounded px-3 py-2"
        />
        <input
          name="image"
          value={form.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="border rounded px-3 py-2"
        />
        <input
          name="duration"
          value={form.duration}
          onChange={handleChange}
          placeholder="Duration (e.g. 5 hours)"
          className="border rounded px-3 py-2"
        />
        <input
          name="cost"
          type="number"
          value={form.cost}
          onChange={handleChange}
          placeholder="Cost (₹)"
          className="border rounded px-3 py-2"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded mt-2 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Add Event"}
        </button>
      </form>

      <h2 className="text-2xl font-semibold mb-3">Existing Events</h2>
      <ul className="space-y-2">
        {events.map((ev) => (
          <li key={ev.id}>
            #{ev.id} – {ev.title} ({ev.location}) – {ev.duration} – ₹{ev.cost}
          </li>
        ))}
      </ul>
    </div>
  );
}
