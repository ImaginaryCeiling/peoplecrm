'use client'
import Header from "@/components/header";
import { useState } from "react";

export default function UpdatePerson() {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [location, setLocation] = useState("");
    const [role, setRole] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [notes, setNotes] = useState("");
    const [message, setMessage] = useState("Waiting for input...");

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/people', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id,
                    name,
                    email,
                    phone,
                    location,
                    role,
                    linkedin,
                    notes,
                }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to update person');
            }

            const data = await response.json();
            setMessage(`Person with ID ${id} updated successfully`);
            console.log(data);
        } catch (error) {
            console.error('Error updating person:', error);
            setMessage('Error updating person');
        }
    }

    return (
        <div className="max-w-md mx-auto p-6 space-y-4">
            <Header />
            <h1 className="text-2xl font-bold mb-6">Update Person</h1>
            <form onSubmit={handleUpdate} className="space-y-4">
                <div className="flex flex-col">
                    <label htmlFor="id" className="mb-1">ID *</label>
                    <input 
                        id="id"
                        type="text" 
                        placeholder="Enter ID" 
                        value={id} 
                        onChange={(e) => setId(e.target.value)} 
                        required 
                        className="border rounded p-2"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="name" className="mb-1">Name</label>
                    <input 
                        id="name"
                        type="text" 
                        placeholder="Enter Name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        className="border rounded p-2"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="email" className="mb-1">Email</label>
                    <input 
                        id="email"
                        type="email" 
                        placeholder="Enter Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        className="border rounded p-2"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="phone" className="mb-1">Phone</label>
                    <input 
                        id="phone"
                        type="text" 
                        placeholder="Enter Phone" 
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)} 
                        className="border rounded p-2"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="location" className="mb-1">Location</label>
                    <input 
                        id="location"
                        type="text" 
                        placeholder="Enter Location" 
                        value={location} 
                        onChange={(e) => setLocation(e.target.value)} 
                        className="border rounded p-2"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="role" className="mb-1">Role</label>
                    <input 
                        id="role"
                        type="text" 
                        placeholder="Enter Role" 
                        value={role} 
                        onChange={(e) => setRole(e.target.value)} 
                        className="border rounded p-2"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="linkedin" className="mb-1">LinkedIn</label>
                    <input 
                        id="linkedin"
                        type="url" 
                        placeholder="Enter LinkedIn URL" 
                        value={linkedin} 
                        onChange={(e) => setLinkedin(e.target.value)} 
                        className="border rounded p-2"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="notes" className="mb-1">Notes</label>
                    <textarea 
                        id="notes"
                        placeholder="Enter Notes" 
                        value={notes} 
                        onChange={(e) => setNotes(e.target.value)} 
                        className="border rounded p-2"
                        rows={4}
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors w-full">
                    Update Person
                </button>
            </form>
            <p className="text-sm text-gray-600">{message}</p>
        </div>
    )
}
