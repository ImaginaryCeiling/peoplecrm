'use client'

import { useState, useEffect } from "react";
import { useSearchParams } from 'next/navigation';
import Header from "@/components/header";

interface Person {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  organization_id?: number | null;
  notes?: string;
}

export default function EditPerson() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [message, setMessage] = useState("Loading...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchPerson();
    }
  }, [id]);

  const fetchPerson = async () => {
    try {
      const response = await fetch(`/api/people?id=${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch person');
      }
      const person: Person = await response.json();
      setName(person.name || "");
      setEmail(person.email || "");
      setPhone(person.phone || "");
      setAddress(person.address || "");
      setNotes(person.notes || "");
      setMessage("Ready to edit");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Failed to fetch person");
    } finally {
      setLoading(false);
    }
  };

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
          address,
          notes,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update person');
      }

      const data = await response.json();
      setMessage("Person updated successfully");
      console.log(data.name + " updated successfully");
      
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
          <label htmlFor="name" className="mb-1">Name</label>
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
          <label htmlFor="address" className="mb-1">Address</label>
          <input
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border rounded p-2"
            placeholder="Enter address"
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