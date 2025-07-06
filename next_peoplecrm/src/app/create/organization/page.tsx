'use client'

import {useState} from 'react'
import Header from '@/components/header'

//name, industry, location, website, #employees, contact email, associated people, associated events
export default function AddOrganization() {
    const [orgName, setOrgName] = useState('');
    const [industry, setIndustry] = useState('');
    const [location, setLocation] = useState('');
    const [website, setWebsite] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [notes, setNotes] = useState('');

    const [message, setMessage] = useState('Waiting for input...');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Here is the data: "+orgName, industry, location, website, contactEmail, notes);
    
    try {
        const response = await fetch('/api/organization', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                orgName,
                industry,
                location,
                website,
                contactEmail,
                notes
            })
        })

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Failed to add organization');
        }

        const data = await response.json();
        console.log('Organization added:', data);
        setOrgName('');
        setIndustry('');
        setLocation('');
        setWebsite('');
        setContactEmail('');
        setNotes('');
        setMessage('Organization added successfully');
        
        // Redirect back to dashboard after successful creation
        setTimeout(() => {
          window.location.href = '/home';
        }, 1500);
    }
    catch (error) {
        console.error('Error:', error);
        setMessage(error instanceof Error ? error.message : "Failed to add organization");
    }

    }

    return (
        <div className="max-w-md mx-auto p-6 space-y-4">
          <Header /> {/* Render the Header component */}
          <h1 className="text-2xl font-bold mb-6">Add an Organization</h1> {/* Display the page title */}
          <form className="space-y-4" onSubmit={handleSubmit}> {/* Form element with submit handler */}
            <div className="flex flex-col">
              <label htmlFor="orgName" className="mb-1">Organization name *</label> {/* Label for the name input */}
              <input
                id="orgName"
                type="text"
                value={orgName} // Bind the input value to the name state
                onChange={(e) => setOrgName(e.target.value)} // Update the name state on change
                className="border rounded p-2"
                placeholder="Enter organization name" // Placeholder text for the input
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="industry" className="mb-1">Industry</label> {/* Label for the industry input */}
              <input
                id="industry"
                type="text"
                value={industry} // Bind the input value to the industry state
                onChange={(e) => setIndustry(e.target.value)} // Update the industry state on change
                className="border rounded p-2"
                placeholder="Enter industry" // Placeholder text for the input
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
              <label htmlFor="website" className="mb-1">Website</label> {/* Label for the website input */}
              <input
                id="website"
                type="url"
                value={website} // Bind the input value to the website state
                onChange={(e) => setWebsite(e.target.value)} // Update the website state on change
                className="border rounded p-2"
                placeholder="Enter website URL" // Placeholder text for the input
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="contact-email" className="mb-1">Contact Email</label> {/* Label for the contact email input */}
              <input
                id="contact-email"
                type="email"
                value={contactEmail} // Bind the input value to the contact email state
                onChange={(e) => setContactEmail(e.target.value)} // Update the contact email state on change
                className="border rounded p-2"
                placeholder="Enter contact email" // Placeholder text for the input
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
              Add Organization {/* Button text */}
            </button>
          </form>
          <p className="text-sm text-gray-600">{message}</p> {/* Display the message to the user */}
          <div className="text-sm text-gray-500">
            <p>Organization name: {orgName}</p> {/* Display the current name input */}
            <p>Industry: {industry}</p> {/* Display the current industry input */}
            <p>Location: {location}</p> {/* Display the current location input */}
            <p>Website: {website}</p> {/* Display the current website input */}
            <p>Contact Email: {contactEmail}</p> {/* Display the current contact email input */}
            <p>Notes: {notes}</p> {/* Display the current notes input */}
          </div>
        </div>
      );
}