'use client'
import { useState } from "react";

export default function AddPerson() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch('/api/people', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          address,
          notes,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add person');
      }

      // Clear form after successful submission
      setName("");
      setEmail("");
      setPhone("");
      setAddress("");
      setNotes("");
      
      // You can add a success message or redirect here
      alert('Person added successfully!');
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold mb-6">Add a Person</h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
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
            required
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
            required
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
            required
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
        <button 
          type="submit" 
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
          disabled={isLoading}
        >
          {isLoading ? 'Adding...' : 'Add Person'}
        </button>
      </form>
    </div>
  );
} 