import Slider from "../components/Slider";
import Categories from "./Categories";
import Services from "./Services";
import Contact from "./Contact";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getEvents } from "../api";

export default function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function loadEvents() {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (err) {
        console.error("Failed to load events", err);
      }
    }
    loadEvents();
  }, []);

  return (
    <>
      <div className="mb-8"><Slider /></div>
      <Categories />

      {/* Show events below Categories but above Services */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Upcoming Events</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {events.map((ev) => (
            <div key={ev.id} className="bg-white shadow-lg rounded-xl p-4">
              <img src={ev.image} alt={ev.title} className="w-full h-40 object-cover rounded-md" />
              <h3 className="text-xl font-semibold mt-3">{ev.title}</h3>
              <p className="text-gray-600">{ev.location}</p>
              <Link to={`/event/${ev.id}`} className="text-blue-600 mt-3 inline-block">
                View Details →
              </Link>
            </div>
          ))}
        </div>
      </div>

      <Services />
      <Contact />
    </>
  );
}
