'use client'
import Header from "@/components/header";
import { useState } from "react";

export default function DeletePerson() {

    const [id, setId] = useState("");
    const [message, setMessage] = useState("Waiting for input...");
    const handleDelete = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try{
            const response = await fetch('/api/people', {
                method: 'DELETE',
                body: JSON.stringify({ id }),
            });
            if(!response.ok){
                setMessage("Person with ID "+id+" not found");
                throw new Error('Failed to delete person');
            }
            const data = await response.json();
            console.log(data.message);
            setMessage("Person with ID "+id+" deleted successfully");
            setId("");

        } catch (error) {
            console.error('Error deleting person:', error);
        }


    }

    return (
        <div>
            <Header />
            <h1>Delete Person</h1>
            <form onSubmit={handleDelete}>
                <input type="text" placeholder="Enter ID" value={id} onChange={(e) => setId(e.target.value)} />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Delete</button>
            </form>
            <p>{message}</p>
        </div>
    )
}