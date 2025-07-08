// Indicate that this is a client-side component
'use client'

// Import the useState hook from React for managing state
import { useState, useEffect } from "react";

// Import the Header component from the components directory
import Header from "@/components/header";

import { parseVCard, VCardContact, parseMultipleVCards } from "@/lib/vcard-parser";

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
  const [vcardFile, setVcardFile] = useState<File | null>(null); // State for vCard file
  const [parsedContacts, setParsedContacts] = useState<VCardContact[]>([]); // State for parsed contacts
  const [showVcardResults, setShowVcardResults] = useState(false); // State for showing vCard results
  const [processingVcard, setProcessingVcard] = useState(false); // State for processing vCard
  
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

  // Handle vCard file upload and parsing
  const handleVcardFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.name.toLowerCase().endsWith('.vcf')) {
      setMessage('Please select a valid .vcf file');
      return;
    }

    setVcardFile(file);
    setProcessingVcard(true);
    setMessage('Processing vCard file...');

    try {
      const text = await file.text();
      const contacts = parseMultipleVCards(text);
      
      if (contacts.length === 0) {
        setMessage('No valid contacts found in the vCard file');
        return;
      }

      setParsedContacts(contacts);
      setShowVcardResults(true);
      setMessage(`Found ${contacts.length} contact(s) in the vCard file`);
    } catch (error) {
      console.error('Error parsing vCard file:', error);
      setMessage('Error parsing vCard file. Please check the file format.');
    } finally {
      setProcessingVcard(false);
    }
  };

  // Add contact data to form
  const applyContactData = (contact: VCardContact) => {
    if (contact.name) setName(contact.name);
    if (contact.email) setEmail(contact.email);
    if (contact.phone) setPhone(contact.phone);
    if (contact.location) setLocation(contact.location);
    if (contact.role) setRole(contact.role);
    if (contact.linkedin) setLinkedin(contact.linkedin);
    if (contact.notes) setNotes(contact.notes);
    
    //find matching org
    if (contact.organization) {
      const matchingOrg = organizations.find(org => 
        org.organization_name.toLowerCase().includes(contact.organization!.toLowerCase())
      );
      if (matchingOrg) {
        setOrganizationId(matchingOrg.id.toString());
      }
    }
    
    setShowVcardResults(false);
    setMessage('Contact data applied to form');
  };

  const clearVcardData = () => {
    setVcardFile(null);
    setParsedContacts([]);
    setShowVcardResults(false);
    setProcessingVcard(false);
    setName("");
    setEmail("");
    setPhone("");
    setLocation("");
    setRole("");
    setLinkedin("");
    setNotes("");
    setOrganizationId("");
    setMessage("Form cleared");
  };
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

      setVcardFile (null);
      setParsedContacts([]);
      setShowVcardResults(false);
      setProcessingVcard(false);
      
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

      
      {/* vCard Upload Section */}
      <div className="bg-gray-50 p-4 rounded-lg border-2 border-dashed border-gray-300">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-semibold">Import from vCard (.vcf)</h2>
          {(vcardFile || showVcardResults) && (
            <button
              type="button"
              onClick={clearVcardData}
              className="text-sm text-red-600 hover:text-red-800 transition-colors"
            >
              Clear
            </button>
          )}
        </div>
        <div className="space-y-3">
          <input
            type="file"
            accept=".vcf"
            onChange={handleVcardFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <p className="text-xs text-gray-600">
            Upload a .vcf file to automatically fill the form with contact information
          </p>
          {processingVcard && (
            <div className="flex items-center gap-2 text-sm text-blue-600">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              Processing vCard file...
            </div>
          )}
        </div>
        
        {/* Show parsed contacts */}
        {showVcardResults && parsedContacts.length > 0 && (
          <div className="mt-4">
            <h3 className="text-md font-medium mb-2">Found Contacts:</h3>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {parsedContacts.map((contact, index) => (
                <div key={index} className="bg-white p-3 rounded border">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <p className="font-medium">{contact.name || 'Unknown Name'}</p>
                      {contact.email && <p className="text-sm text-gray-600">{contact.email}</p>}
                      {contact.organization && <p className="text-sm text-gray-600">{contact.organization}</p>}
                    </div>
                    <button
                      type="button"
                      onClick={() => applyContactData(contact)}
                      className="ml-2 px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

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