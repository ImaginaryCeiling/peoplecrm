'use client'
import { useState } from "react";
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
  created_at: string;
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
                            <h2 className="text-xl font-semibold">{person.person_name}</h2>
                            <span className="text-sm text-gray-500">ID: {person.id}</span>
                        </div>
                        <div className="mt-2 space-y-1">
                            {person.person_email && <p><span className="font-medium">Email:</span> {person.person_email}</p>}
                            {person.person_phone && <p><span className="font-medium">Phone:</span> {person.person_phone}</p>}
                            {person.person_location && <p><span className="font-medium">Location:</span> {person.person_location}</p>}
                            {person.person_role && <p><span className="font-medium">Role:</span> {person.person_role}</p>}
                            {person.person_linkedin && (
                                <p>
                                    <span className="font-medium">LinkedIn:</span> 
                                    <a href={person.person_linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                                        {person.person_linkedin}
                                    </a>
                                </p>
                            )}
                            {person.person_notes && <p><span className="font-medium">Notes:</span> {person.person_notes}</p>}
                            <p className="text-sm text-gray-500">
                                Added: {new Date(person.created_at).toLocaleString()}
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