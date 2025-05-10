'use client'
import { useState } from "react";
import Header from "@/components/header";

export default function AddPerson() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  
  const [message, setMessage] = useState("Waiting for input...");


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(name, email, phone, address, notes);
    setMessage("Person added successfully");
  }

  return (
    <div className="max-w-md mx-auto p-6 space-y-4">
      <Header />
      <h1 className="text-2xl font-bold mb-6">Add a Person</h1>
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
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add Person
        </button>
      </form>
      <p>{message}</p>
      <div>
        <p>Name: {name}</p>
        <p>Email: {email}</p>
        <p>Phone: {phone}</p>
        <p>Address: {address}</p>
        <p>Notes: {notes}</p>
      </div>
    </div>
  );
}