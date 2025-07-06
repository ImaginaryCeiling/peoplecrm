'use client'

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from 'next/navigation';
import Header from "@/components/header";

interface Organization {
  id: number;
  organization_name: string;
  organization_industry?: string;
  organization_location?: string;
  organization_website?: string;
  organization_contact_email?: string;
  organization_notes?: string;
}

function EditOrganizationContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  
  const [orgName, setOrgName] = useState("");
  const [industry, setIndustry] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState("Loading...");
  const [loading, setLoading] = useState(true);

  const fetchOrganization = useCallback(async () => {
    try {
      const response = await fetch(`/api/organization?id=${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch organization');
      }
      const organization: Organization = await response.json();
      setOrgName(organization.organization_name || "");
      setIndustry(organization.organization_industry || "");
      setLocation(organization.organization_location || "");
      setWebsite(organization.organization_website || "");
      setContactEmail(organization.organization_contact_email || "");
      setNotes(organization.organization_notes || "");
      setMessage("Ready to edit");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to fetch organization");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchOrganization();
    }
  }, [id, fetchOrganization]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("Updating...");
    
    try {
      const response = await fetch('/api/organization', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: Number(id),
          name: orgName,
          industry,
          location,
          website,
          contactEmail,
          notes,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update organization');
      }

      const data = await response.json();
      setMessage("Organization updated successfully");
      console.log(data.organization_name + " updated successfully");
      
      // Redirect back to dashboard after successful update
      setTimeout(() => {
        window.location.href = '/home';
      }, 1500);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to update organization");
    }
  };

  if (loading) {
    return (
      <div className="max-w-md mx-auto p-6 space-y-4">
        <Header />
        <h1 className="text-2xl font-bold mb-6">Edit Organization</h1>
        <p>{message}</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto p-6 space-y-4">
      <Header />
      <h1 className="text-2xl font-bold mb-6">Edit Organization</h1>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label htmlFor="orgName" className="mb-1">Organization Name *</label>
          <input
            id="orgName"
            type="text"
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
            className="border rounded p-2"
            placeholder="Enter organization name"
            required
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="industry" className="mb-1">Industry</label>
          <input
            id="industry"
            type="text"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="border rounded p-2"
            placeholder="Enter industry"
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
          <label htmlFor="website" className="mb-1">Website</label>
          <input
            id="website"
            type="url"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            className="border rounded p-2"
            placeholder="Enter website URL"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="contactEmail" className="mb-1">Contact Email</label>
          <input
            id="contactEmail"
            type="email"
            value={contactEmail}
            onChange={(e) => setContactEmail(e.target.value)}
            className="border rounded p-2"
            placeholder="Enter contact email"
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
          Update Organization
        </button>
      </form>
      <p className="text-sm text-gray-600">{message}</p>
    </div>
  );
}

export default function EditOrganization() {
  return (
    <Suspense fallback={
      <div className="max-w-md mx-auto p-6 space-y-4">
        <Header />
        <h1 className="text-2xl font-bold mb-6">Edit Organization</h1>
        <p>Loading...</p>
      </div>
    }>
      <EditOrganizationContent />
    </Suspense>
  );
}
