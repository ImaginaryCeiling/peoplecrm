import { NextResponse } from 'next/server';

// Define the Person type
interface Person {
    id: number;
    name: string;
    email: string;
    phone?: string;
    address?: string;
    notes?: string;
    createdAt: string;
    updatedAt?: string;
}

// This is a temporary in-memory storage
// In a real application, you'd want to use a database

// Define a global object to store people data across requests
const globalForPeople = globalThis as unknown as { people: Person[] }
// Initialize the people array if it doesn't already exist
globalForPeople.people = globalForPeople.people || []
// Reference the global people array for use in the API
const people = globalForPeople.people

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, address, notes } = body;

    // Basic validation
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Create new person
    const newPerson: Person = {
      id: people.length > 0 ? people[people.length - 1].id + 1 : 1, // Sequential ID generation
      name,
      email,
      phone,
      address,
      notes,
      createdAt: new Date().toISOString()
    };

    // Add to our temporary storage
    people.push(newPerson);

    return NextResponse.json(newPerson, { status: 201 });
  } catch (err) {
    console.error('Error creating person:', err);
    return NextResponse.json(
      { error: 'Error creating person' },
      { status: 500 }
    );
  }
}

export async function GET() {
  console.log("Here is the people array: "+people);
  return NextResponse.json(people);
}

export async function DELETE(request: Request) {
    try {
        // Parse the request body to extract the id
        const { id } = await request.json();
        const numericID = Number(id);

        // Find the index of the person with the given id
        const personIndex = people.findIndex((person) => person.id === numericID);

        // If the person is not found, return a 404 response
        if (personIndex === -1) {
            return NextResponse.json({ error: 'Person not found' }, { status: 404 });
        } 

        // Remove the person from the array
        people.splice(personIndex, 1);

        // Return a success message
        return NextResponse.json({ message: `Person with ID ${id} deleted successfully` }, { status: 200 });
    } catch (err) {
        console.error('Error deleting person:', err);
        // Return a 500 response in case of an error
        return NextResponse.json({ error: 'Error deleting person' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        const { id, name, email, phone, address, notes } = body;
        const numericID = Number(id);

        // Find the person to update
        const personIndex = people.findIndex((person) => person.id === numericID);

        // If person not found, return 404
        if (personIndex === -1) {
            return NextResponse.json(
                { error: 'Person not found' },
                { status: 404 }
            );
        }

        // Create update object with only the fields that have non-empty values
        const updates: Partial<Person> = {};
        if (name && name.trim() !== '') updates.name = name;
        if (email && email.trim() !== '') updates.email = email;
        if (phone && phone.trim() !== '') updates.phone = phone;
        if (address && address.trim() !== '') updates.address = address;
        if (notes && notes.trim() !== '') updates.notes = notes;
        updates.updatedAt = new Date().toISOString();

        // Update the person's information while preserving existing values
        const updatedPerson = {
            ...people[personIndex],
            ...updates
        };

        // Replace the old person data with the updated data
        people[personIndex] = updatedPerson;

        return NextResponse.json(updatedPerson, { status: 200 });
    } catch (err) {
        console.error('Error updating person:', err);
        return NextResponse.json(
            { error: 'Error updating person' },
            { status: 500 }
        );
    }
}