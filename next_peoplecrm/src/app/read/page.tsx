'use client'
import { useState } from "react";
import Header from "@/components/header";

interface Person {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  notes: string;
  createdAt: string;
}

export default function ReadPerson() {
    const [people, setPeople] = useState<Person[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchPeople = async () => {
        setLoading(true);
        setError("");
        try {
            const response = await fetch('/api/people');
            if (!response.ok) {
                throw new Error('Failed to fetch people');
            }
            const data = await response.json();
            setPeople(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch people');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <Header />
            <h1 className="text-2xl font-bold mb-6">People List</h1>
            <button 
                onClick={fetchPeople}
                className="bg-blue-500 text-white p-2 rounded mb-4 hover:bg-blue-600"
            >
                {loading ? 'Loading...' : 'Load People'}
            </button>

            {error && (
                <div className="text-red-500 mb-4">
                    {error}
                </div>
            )}

            <div className="grid gap-4">
                {people.map((person) => (
                    <div key={person.id} className="border rounded p-4 shadow-sm">
                        <div className="flex justify-between items-center">
                            <h2 className="text-xl font-semibold">{person.name}</h2>
                            <span className="text-sm text-gray-500">ID: {person.id}</span>
                        </div>
                        <div className="mt-2 space-y-1">
                            <p><span className="font-medium">Email:</span> {person.email}</p>
                            {person.phone && <p><span className="font-medium">Phone:</span> {person.phone}</p>}
                            {person.address && <p><span className="font-medium">Address:</span> {person.address}</p>}
                            {person.notes && <p><span className="font-medium">Notes:</span> {person.notes}</p>}
                            <p className="text-sm text-gray-500">
                                Added: {new Date(person.createdAt).toLocaleString()}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {people.length === 0 && !loading && !error && (
                <p className="text-gray-500">No people found. Click the button above to load people.</p>
            )}
        </div>
    );
}