'use client'

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from 'next/navigation';
import Header from "@/components/header";

interface Person {
  id: number;
  person_name: string;
  person_email?: string;
  person_phone?: string;
  person_location?: string;
  person_role?: string;
  person_linkedin?: string;
  person_notes?: string;
  organization_id?: number | null;
  organizations?: {
    id: number;
    organization_name: string;
    organization_industry?: string;
    organization_location?: string;
  };
}

interface Organization {
  id: number;
  organization_name: string;
  organization_industry?: string;
  organization_location?: string;
}

function EditPersonContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [role, setRole] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [notes, setNotes] = useState("");
  const [organization_id, setOrganizationId] = useState("");
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("Loading...");

  // Fetch organizations
  const fetchOrganizations = useCallback(async () => {
    try {
      const response = await fetch('/api/organization');
      if (response.ok) {
        const data = await response.json();
        setOrganizations(data);
      }
    } catch (error) {
      console.error('Error fetching organizations:', error);
    }
  }, []);

  const fetchPerson = useCallback(async () => {
    try {
      const response = await fetch(`/api/people?id=${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch person');
      }
      const person: Person = await response.json();
      setName(person.person_name || "");
      setEmail(person.person_email || "");
      setPhone(person.person_phone || "");
      setLocation(person.person_location || "");
      setRole(person.person_role || "");
      setLinkedin(person.person_linkedin || "");
      setNotes(person.person_notes || "");
      setOrganizationId(person.organization_id?.toString() || "");
      setMessage("Ready to edit");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to fetch person");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchOrganizations();
      fetchPerson();
    }
  }, [id, fetchPerson, fetchOrganizations]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("Updating...");
    
    try {
      const response = await fetch('/api/people', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: Number(id),
          name,
          email,
          phone,
          location,
          role,
          linkedin,
          notes,
          organization_id: organization_id || null,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update person');
      }

      const data = await response.json();
      setMessage("Person updated successfully");
      console.log(data.person_name + " updated successfully");
      
      // Redirect back to dashboard after successful update
      setTimeout(() => {
        window.location.href = '/home';
      }, 1500);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to update person");
    }
  };

  if (loading) {
    return (
      <div className="max-w-md mx-auto p-6 space-y-4">
        <Header />
        <h1 className="text-2xl font-bold mb-6">Edit Person</h1>
        <p>{message}</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 space-y-4">
      <Header />
      <h1 className="text-2xl font-bold mb-6">Edit Person</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-1">Name *</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded p-2"
            placeholder="Enter name"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="organization" className="mb-1">Organization</label>
          <select
            id="organization"
            value={organization_id}
            onChange={(e) => setOrganizationId(e.target.value)}
            className="border rounded p-2"
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
          <label htmlFor="email" className="mb-1">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded p-2"
            placeholder="Enter email"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="phone" className="mb-1">Phone</label>
          <input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border rounded p-2"
            placeholder="Enter phone number"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="location" className="mb-1">Location</label>
          <input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="border rounded p-2"
            placeholder="Enter location"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="role" className="mb-1">Role</label>
          <input
            id="role"
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border rounded p-2"
            placeholder="Enter role/title"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="linkedin" className="mb-1">LinkedIn</label>
          <input
            id="linkedin"
            type="url"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            className="border rounded p-2"
            placeholder="Enter LinkedIn URL"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="notes" className="mb-1">Notes</label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="border rounded p-2"
            placeholder="Enter notes"
            rows={4}
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors">
          Update Person
        </button>
      </form>
      <p className="text-sm text-gray-600">{message}</p>
    </div>
  );
}

export default function EditPerson() {
  return (
    <Suspense fallback={
      <div className="max-w-md mx-auto p-6 space-y-4">
        <Header />
        <h1 className="text-2xl font-bold mb-6">Edit Person</h1>
        <p>Loading...</p>
      </div>
    }>
      <EditPersonContent />
    </Suspense>
  );
}
