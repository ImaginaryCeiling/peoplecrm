// Indicate that this is a client-side component
'use client'

// Import the useState hook from React for managing state
import { useState, useEffect } from "react";

// Import the Header component from the components directory
import Header from "@/components/header";

// Define the Organization interface
interface Organization {
  id: number;
  organization_name: string;
  organization_industry?: string;
  organization_location?: string;
}

// Define the AddPerson component as the default export
export default function AddPerson() {
  // Declare state variables for form inputs and their respective setters
  const [name, setName] = useState(""); // State for the name input
  const [email, setEmail] = useState(""); // State for the email input
  const [phone, setPhone] = useState(""); // State for the phone input
  const [location, setLocation] = useState(""); // State for the location input
  const [role, setRole] = useState(""); // State for the role input
  const [linkedin, setLinkedin] = useState(""); // State for the linkedin input
  const [notes, setNotes] = useState(""); // State for the notes input
  const [organization_id, setOrganizationId] = useState(""); // State for the organization input
  const [organizations, setOrganizations] = useState<Organization[]>([]); // State for available organizations
  const [loading, setLoading] = useState(false); // State for loading organizations
  
  // Declare a state variable for displaying messages to the user
  const [message, setMessage] = useState("Waiting for input...");

  // Fetch organizations on component mount
  useEffect(() => {
    const fetchOrganizations = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/organization');
        if (response.ok) {
          const data = await response.json();
          setOrganizations(data);
        }
      } catch (error) {
        console.error('Error fetching organizations:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrganizations();
  }, []);

  // Define the handleSubmit function to handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior
    console.log("Here is the data: "+name, email, phone, location, role, linkedin, notes, organization_id); // Log the form data to the console
    
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
          location, // Include the location in the request body
          role, // Include the role in the request body
          linkedin, // Include the linkedin in the request body
          notes, // Include the notes in the request body
          organization_id: organization_id || null, // Include the organization_id in the request body
        }),
      }); 

      // Check if the response is not OK
      if (!response.ok) {
        const error = await response.json(); // Parse the error response
        throw new Error(error.message || 'Failed to add person'); // Throw an error with the message
      }

      const data = await response.json(); // Parse the successful response
      setMessage("Person added successfully"); // Update the message state to indicate success
      console.log(data.person_name+" added successfully"); // Log the success message
      
      // Clear the form inputs by resetting their state
      setName("");
      setEmail("");
      setPhone("");
      setLocation("");
      setRole("");
      setLinkedin("");
      setNotes("");
      setOrganizationId("");
      
      // Redirect back to dashboard after successful creation
      setTimeout(() => {
        window.location.href = '/home';
      }, 1500);
    } catch (error) {
      // Update the message state with the error message
      setMessage(error instanceof Error ? error.message : "Failed to add person");
    }
  }

  // Return the JSX for rendering the component
  return (
    <div className="max-w-md mx-auto p-6 space-y-4">
      <Header /> {/* Render the Header component */}
      <h1 className="text-2xl font-bold mb-6">Add a Person</h1> {/* Display the page title */}
      <form className="space-y-4" onSubmit={handleSubmit}> {/* Form element with submit handler */}
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-1">Name *</label> {/* Label for the name input */}
          <input
            id="name"
            type="text"
            value={name} // Bind the input value to the name state
            onChange={(e) => setName(e.target.value)} // Update the name state on change
            className="border rounded p-2"
            placeholder="Enter name" // Placeholder text for the input
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="organization" className="mb-1">Organization</label> {/* Label for the organization input */}
          <select
            id="organization"
            value={organization_id} // Bind the select value to the organization_id state
            onChange={(e) => setOrganizationId(e.target.value)} // Update the organization_id state on change
            className="border rounded p-2"
            disabled={loading}
          >
            <option value="">Select an organization (optional)</option>
            {organizations.map((org) => (
              <option key={org.id} value={org.id}>
                {org.organization_name}
              </option>
            ))}
          </select>
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
          <label htmlFor="location" className="mb-1">Location</label> {/* Label for the location input */}
          <input
            id="location"
            type="text"
            value={location} // Bind the input value to the location state
            onChange={(e) => setLocation(e.target.value)} // Update the location state on change
            className="border rounded p-2"
            placeholder="Enter location" // Placeholder text for the input
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="role" className="mb-1">Role</label> {/* Label for the role input */}
          <input
            id="role"
            type="text"
            value={role} // Bind the input value to the role state
            onChange={(e) => setRole(e.target.value)} // Update the role state on change
            className="border rounded p-2"
            placeholder="Enter role/title" // Placeholder text for the input
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="linkedin" className="mb-1">LinkedIn</label> {/* Label for the linkedin input */}
          <input
            id="linkedin"
            type="url"
            value={linkedin} // Bind the input value to the linkedin state
            onChange={(e) => setLinkedin(e.target.value)} // Update the linkedin state on change
            className="border rounded p-2"
            placeholder="Enter LinkedIn URL" // Placeholder text for the input
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
        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors">
          Add Person {/* Button text */}
        </button>
      </form>
      <p className="text-sm text-gray-600">{message}</p> {/* Display the message to the user */}
      <div className="text-sm text-gray-500">
        <p>Name: {name}</p> {/* Display the current name input */}
        <p>Organization: {organization_id ? organizations.find((org) => org.id == parseInt(organization_id))?.organization_name : 'None'}</p> {/* Display the current organization input */}
        <p>Email: {email}</p> {/* Display the current email input */}
        <p>Phone: {phone}</p> {/* Display the current phone input */}
        <p>Location: {location}</p> {/* Display the current location input */}
        <p>Role: {role}</p> {/* Display the current role input */}
        <p>LinkedIn: {linkedin}</p> {/* Display the current linkedin input */}
        <p>Notes: {notes}</p> {/* Display the current notes input */}
      </div>
    </div>
  );
}