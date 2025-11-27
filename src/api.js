const API_BASE_URL = "http://localhost:8080/api";

export async function getEvents() {
  const res = await fetch(`${API_BASE_URL}/events`);
  if (!res.ok) {
    throw new Error("Failed to fetch events");
  }
  return res.json();
}

export async function createEvent(event) {
  const res = await fetch(`${API_BASE_URL}/events`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event),
  });

  if (!res.ok) {
    throw new Error("Failed to create event");
  }
  return res.json();
}
