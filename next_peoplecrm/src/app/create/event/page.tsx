// Indicate that this is a client-side component
'use client'

// Import the useState hook from React for managing state
import { useState } from "react";

// Import the Header component from the components directory
import Header from "@/components/header";

// Define the AddEvent component as the default export
export default function AddEvent() {
  // Declare state variables for form inputs and their respective setters
  const [eventName, setEventName] = useState(""); // State for the event name input
  const [eventDate, setEventDate] = useState(""); // State for the event date input
  const [eventLocation, setEventLocation] = useState(""); // State for the event location input
  const [eventDescription, setEventDescription] = useState(""); // State for the event description input
  const [eventOrganizer, setEventOrganizer] = useState(""); // State for the event organizer input
  
  // Declare a state variable for displaying messages to the user
  const [message, setMessage] = useState("Waiting for input...");

  // Define the handleSubmit function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior
    console.log("Here is the event data: "+eventName, eventDate, eventLocation, eventDescription, eventOrganizer); // Log the form data to the console
    
    try {
      // Send a POST request to the /api/event endpoint with the form data
      const response = await fetch('/api/event', {
        method: 'POST', // Specify the HTTP method
        headers: {
          'Content-Type': 'application/json', // Set the content type to JSON
        },
        body: JSON.stringify({
          eventName, // Include the event name in the request body
          eventDate, // Include the event date in the request body
          eventLocation, // Include the event location in the request body
          eventDescription, // Include the event description in the request body
          eventOrganizer, // Include the event organizer in the request body
        }),
      });

      // Check if the response is not OK
      if (!response.ok) {
        const error = await response.json(); // Parse the error response
        throw new Error(error.message || 'Failed to add event'); // Throw an error with the message
      }

      const data = await response.json(); // Parse the successful response
      setMessage("Event added successfully"); // Update the message state to indicate success
      console.log(data.eventName+" added successfully"); // Log the success message
      
      // Clear the form inputs by resetting their state
      setEventName("");
      setEventDate("");
      setEventLocation("");
      setEventDescription("");
      setEventOrganizer("");
    } catch (error) {
      console.error(error); // Add this line
      // Update the message state with the error message
      setMessage(error instanceof Error ? error.message : "Failed to add event");
    }
  }

  // Return the JSX for rendering the component
  return (
    <div className="max-w-md mx-auto p-6 space-y-4">
      <Header /> {/* Render the Header component */}
      <h1 className="text-2xl font-bold mb-6">Add an Event</h1> {/* Display the page title */}
      <form className="space-y-4" onSubmit={handleSubmit}> {/* Form element with submit handler */}
        <div className="flex flex-col">
          <label htmlFor="eventName" className="mb-1">Event Name *</label> {/* Label for the event name input */}
          <input
            id="eventName"
            type="text"
            value={eventName} // Bind the input value to the eventName state
            onChange={(e) => setEventName(e.target.value)} // Update the eventName state on change
            className="border rounded p-2"
            placeholder="Enter event name" // Placeholder text for the input
            required // Make this field required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="eventDate" className="mb-1">Event Date *</label> {/* Label for the event date input */}
          <input
            id="eventDate"
            type="date"
            value={eventDate} // Bind the input value to the eventDate state
            onChange={(e) => setEventDate(e.target.value)} // Update the eventDate state on change
            className="border rounded p-2"
            required // Make this field required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="eventLocation" className="mb-1">Event Location</label> {/* Label for the event location input */}
          <input
            id="eventLocation"
            type="text"
            value={eventLocation} // Bind the input value to the eventLocation state
            onChange={(e) => setEventLocation(e.target.value)} // Update the eventLocation state on change
            className="border rounded p-2"
            placeholder="Enter event location" // Placeholder text for the input
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="eventDescription" className="mb-1">Event Description</label> {/* Label for the event description input */}
          <textarea
            id="eventDescription"
            value={eventDescription} // Bind the textarea value to the eventDescription state
            onChange={(e) => setEventDescription(e.target.value)} // Update the eventDescription state on change
            className="border rounded p-2"
            placeholder="Enter event description" // Placeholder text for the textarea
            rows={4} // Set the number of rows for the textarea
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="eventOrganizer" className="mb-1">Event Organizer</label> {/* Label for the event organizer input */}
          <input
            id="eventOrganizer"
            type="text"
            value={eventOrganizer} // Bind the input value to the eventOrganizer state
            onChange={(e) => setEventOrganizer(e.target.value)} // Update the eventOrganizer state on change
            className="border rounded p-2"
            placeholder="Enter event organizer" // Placeholder text for the input
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors">
          Add Event {/* Button text */}
        </button>
      </form>
      <p className="text-sm text-gray-600">{message}</p> {/* Display the message to the user */}
      <div className="text-sm text-gray-500">
        <p>Event Name: {eventName}</p> {/* Display the current event name input */}
        <p>Event Date: {eventDate}</p> {/* Display the current event date input */}
        <p>Event Location: {eventLocation}</p> {/* Display the current event location input */}
        <p>Event Description: {eventDescription}</p> {/* Display the current event description input */}
        <p>Event Organizer: {eventOrganizer}</p> {/* Display the current event organizer input */}
      </div>
    </div>
  );
}
