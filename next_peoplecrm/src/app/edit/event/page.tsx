'use client'

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from 'next/navigation';
import Header from "@/components/header";

interface Event {
  id: number;
  event_name: string;
  event_date: string;
  event_location?: string;
  event_description?: string;
  event_organizer?: string;
}

function EditEventContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventOrganizer, setEventOrganizer] = useState("");
  const [message, setMessage] = useState("Loading...");
  const [loading, setLoading] = useState(true);

  const fetchEvent = useCallback(async () => {
    try {
      const response = await fetch(`/api/event?id=${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch event');
      }
      const event: Event = await response.json();
      setEventName(event.event_name || "");
      setEventDate(event.event_date || "");
      setEventLocation(event.event_location || "");
      setEventDescription(event.event_description || "");
      setEventOrganizer(event.event_organizer || "");
      setMessage("Ready to edit");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to fetch event");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchEvent();
    }
  }, [id, fetchEvent]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("Updating...");
    
    try {
      const response = await fetch('/api/event', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: Number(id),
          eventName,
          eventDate,
          eventLocation,
          eventDescription,
          eventOrganizer,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update event');
      }

      const data = await response.json();
      setMessage("Event updated successfully");
      console.log(data.event_name + " updated successfully");
      
      // Redirect back to dashboard after successful update
      setTimeout(() => {
        window.location.href = '/home';
      }, 1500);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to update event");
    }
  };

  if (loading) {
    return (
      <div className="max-w-md mx-auto p-6 space-y-4">
        <Header />
        <h1 className="text-2xl font-bold mb-6">Edit Event</h1>
        <p>{message}</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 space-y-4">
      <Header />
      <h1 className="text-2xl font-bold mb-6">Edit Event</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label htmlFor="eventName" className="mb-1">Event Name *</label>
          <input
            id="eventName"
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            className="border rounded p-2"
            placeholder="Enter event name"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="eventOrganizer" className="mb-1">Event Organizer</label>
          <input
            id="eventOrganizer"
            type="text"
            value={eventOrganizer}
            onChange={(e) => setEventOrganizer(e.target.value)}
            className="border rounded p-2"
            placeholder="Enter event organizer"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="eventDate" className="mb-1">Event Date *</label>
          <input
            id="eventDate"
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            className="border rounded p-2"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="eventLocation" className="mb-1">Event Location</label>
          <input
            id="eventLocation"
            type="text"
            value={eventLocation}
            onChange={(e) => setEventLocation(e.target.value)}
            className="border rounded p-2"
            placeholder="Enter event location"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="eventDescription" className="mb-1">Event Description</label>
          <textarea
            id="eventDescription"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            className="border rounded p-2"
            placeholder="Enter event description"
            rows={4}
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors">
          Update Event
        </button>
      </form>
      <p className="text-sm text-gray-600">{message}</p>
    </div>
  );
}

export default function EditEvent() {
  return (
    <Suspense fallback={
      <div className="max-w-md mx-auto p-6 space-y-4">
        <Header />
        <h1 className="text-2xl font-bold mb-6">Edit Event</h1>
        <p>Loading...</p>
      </div>
    }>
      <EditEventContent />
    </Suspense>
  );
}
