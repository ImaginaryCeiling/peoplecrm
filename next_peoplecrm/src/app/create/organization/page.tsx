'use client'

import {useState} from 'react'
import Header from '@/components/header'

//name, industry, location, website, #employees, contact email, associated people, associated events
export default function AddOrganization() {
    const [orgName, setOrgName] = useState('');
    const [industry, setIndustry] = useState('');
    const [location, setLocation] = useState('');
    const [website, setWebsite] = useState('');
    const [numEmployees, setNumEmployees] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [associatedPeople, setAssociatedPeople] = useState('');
    const [associatedEvents, setAssociatedEvents] = useState('');
    const [notes, setNotes] = useState('');

    const [message, setMessage] = useState('Waiting for input...');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Here is the data: "+orgName, industry, location, website, numEmployees, contactEmail, associatedPeople, associatedEvents);
    
    try {
        const response = await fetch('/api/organizations', {
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
    }
    catch (error) {
        console.error('Error:', error);
    }

    }

    return (
        <div className="max-w-md mx-auto p-6 space-y-4">
          <Header /> {/* Render the Header component */}
          <h1 className="text-2xl font-bold mb-6">Add a Organization</h1> {/* Display the page title */}
          <form className="space-y-4" onSubmit={handleSubmit}> {/* Form element with submit handler */}
            <div className="flex flex-col">
              <label htmlFor="name" className="mb-1">Organization name</label> {/* Label for the name input */}
              <input
                id="orgName"
                type="text"
                value={orgName} // Bind the input value to the name state
                onChange={(e) => setOrgName(e.target.value)} // Update the name state on change
                className="border rounded p-2"
                placeholder="Enter organization name" // Placeholder text for the input
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="industry" className="mb-1">Industry</label> {/* Label for the email input */}
              <input
                id="industry"
                type="text"
                value={industry} // Bind the input value to the email state
                onChange={(e) => setIndustry(e.target.value)} // Update the email state on change
                className="border rounded p-2"
                placeholder="Enter industry" // Placeholder text for the input
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="location" className="mb-1">Location</label> {/* Label for the phone input */}
              <input
                id="location"
                type="text"
                value={location} // Bind the input value to the phone state
                onChange={(e) => setLocation(e.target.value)} // Update the phone state on change
                className="border rounded p-2"
                placeholder="Enter location" // Placeholder text for the input
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="website" className="mb-1">Website</label> {/* Label for the address input */}
              <input
                id="website"
                type="text"
                value={website} // Bind the input value to the address state
                onChange={(e) => setWebsite(e.target.value)} // Update the address state on change
                className="border rounded p-2"
                placeholder="Enter website" // Placeholder text for the input
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="contact-email" className="mb-1">Contact Email</label> {/* Label for the address input */}
              <input
                id="contact-email"
                type="text"
                value={contactEmail} // Bind the input value to the address state
                onChange={(e) => setContactEmail(e.target.value)} // Update the address state on change
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
            <div className="flex flex-col">
              <label htmlFor="employee-count" className="mb-1">Number of Employees</label>
              <input
                id="employee-count"
                type="text"
                value="Calculated from contacts" // This will be calculated dynamically
                className="border rounded p-2 bg-gray-100"
                readOnly
                disabled
              />
              <p className="text-sm text-gray-600 mt-1">This is automatically calculated based on contacts associated with this organization</p>
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
              Add Organization {/* Button text */}
            </button>
          </form>
          <p>{message}</p> {/* Display the message to the user */}
          <div>
            <p>Organization name: {orgName}</p> {/* Display the current name input */}
            <p>Industry: {industry}</p> {/* Display the current email input */}
            <p>Location: {location}</p> {/* Display the current phone input */}
            <p>Website: {website}</p> {/* Display the current address input */}
            <p>Notes: {notes}</p> {/* Display the current notes input */}
          </div>
        </div>
      );
}