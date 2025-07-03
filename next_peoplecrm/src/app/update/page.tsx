'use client'
import Header from "@/components/header";
import { useState } from "react";

export default function UpdatePerson() {
    const [id, setId] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
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
                    address,
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
        <div>
            <Header />
            <h1>Update Person</h1>
            <form onSubmit={handleUpdate}>
                <input type="text" placeholder="Enter ID" value={id} onChange={(e) => setId(e.target.value)} required />
                <input type="text" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="text" placeholder="Enter Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
                <input type="text" placeholder="Enter Address" value={address} onChange={(e) => setAddress(e.target.value)} />
                <input type="text" placeholder="Enter Notes" value={notes} onChange={(e) => setNotes(e.target.value)} />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Update</button>
            </form>
            <p>{message}</p>
        </div>
    )
}
