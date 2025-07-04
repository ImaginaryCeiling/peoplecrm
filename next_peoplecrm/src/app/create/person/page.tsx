// Indicate that this is a client-side component
'use client'

// Import the useState hook from React for managing state
import { useState } from "react";

// Import the Header component from the components directory
import Header from "@/components/header";

// Define the AddPerson component as the default export
export default function AddPerson() {
  // Declare state variables for form inputs and their respective setters
  const [name, setName] = useState(""); // State for the name input
  const [email, setEmail] = useState(""); // State for the email input
  const [phone, setPhone] = useState(""); // State for the phone input
  const [address, setAddress] = useState(""); // State for the address input
  const [notes, setNotes] = useState(""); // State for the notes input
  
  // Declare a state variable for displaying messages to the user
  const [message, setMessage] = useState("Waiting for input...");

  // Define the handleSubmit function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior
    console.log("Here is the data: "+name, email, phone, address, notes); // Log the form data to the console
    
    try {
      // Send a POST request to the /api/people endpoint with the form data
      const response = await fetch('/api/people', {
        method: 'POST', // Specify the HTTP method
        headers: {
          'Content-Type': 'application/json', // Set the content type to JSON
        },
        body: JSON.stringify({
          
          name, // Include the name in the request body
          email, // Include the email in the request body
          phone, // Include the phone in the request body
          address, // Include the address in the request body
          notes, // Include the notes in the request body
        }),
      }); 

      // Check if the response is not OK
      if (!response.ok) {
        const error = await response.json(); // Parse the error response
        throw new Error(error.message || 'Failed to add person'); // Throw an error with the message
      }

      const data = await response.json(); // Parse the successful response
      setMessage("Person added successfully"); // Update the message state to indicate success
      console.log(data.name+" added successfully"); // Log the success message
      
      // Clear the form inputs by resetting their state
      setName("");
      setEmail("");
      setPhone("");
      setAddress("");
      setNotes("");
      
      // Redirect back to dashboard after successful creation
      setTimeout(() => {
        window.location.href = '/home';
      }, 1500);
    } catch (error) {
      // Update the message state with the error message
      setMessage(error instanceof Error ? error.message : "Failed to add person");
    }
  }

  //LOGIC OVERRRRRRRRRRRR

  // Return the JSX for rendering the component
  return (
    <div className="max-w-md mx-auto p-6 space-y-4">
      <Header /> {/* Render the Header component */}
      <h1 className="text-2xl font-bold mb-6">Add a Person</h1> {/* Display the page title */}
      <form className="space-y-4" onSubmit={handleSubmit}> {/* Form element with submit handler */}
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-1">Name</label> {/* Label for the name input */}
          <input
            id="name"
            type="text"
            value={name} // Bind the input value to the name state
            onChange={(e) => setName(e.target.value)} // Update the name state on change
            className="border rounded p-2"
            placeholder="Enter name" // Placeholder text for the input
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="email" className="mb-1">Email</label> {/* Label for the email input */}
          <input
            id="email"
            type="email"
            value={email} // Bind the input value to the email state
            onChange={(e) => setEmail(e.target.value)} // Update the email state on change
            className="border rounded p-2"
            placeholder="Enter email" // Placeholder text for the input
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="phone" className="mb-1">Phone</label> {/* Label for the phone input */}
          <input
            id="phone"
            type="tel"
            value={phone} // Bind the input value to the phone state
            onChange={(e) => setPhone(e.target.value)} // Update the phone state on change
            className="border rounded p-2"
            placeholder="Enter phone number" // Placeholder text for the input
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="address" className="mb-1">Address</label> {/* Label for the address input */}
          <input
            id="address"
            type="text"
            value={address} // Bind the input value to the address state
            onChange={(e) => setAddress(e.target.value)} // Update the address state on change
            className="border rounded p-2"
            placeholder="Enter address" // Placeholder text for the input
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="notes" className="mb-1">Notes</label> {/* Label for the notes input */}
          <textarea
            id="notes"
            value={notes} // Bind the textarea value to the notes state
            onChange={(e) => setNotes(e.target.value)} // Update the notes state on change
            className="border rounded p-2"
            placeholder="Enter notes" // Placeholder text for the textarea
            rows={4} // Set the number of rows for the textarea
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add Person {/* Button text */}
        </button>
      </form>
      <p>{message}</p> {/* Display the message to the user */}
      <div>
        <p>Name: {name}</p> {/* Display the current name input */}
        <p>Email: {email}</p> {/* Display the current email input */}
        <p>Phone: {phone}</p> {/* Display the current phone input */}
        <p>Address: {address}</p> {/* Display the current address input */}
        <p>Notes: {notes}</p> {/* Display the current notes input */}
      </div>
    </div>
  );
}