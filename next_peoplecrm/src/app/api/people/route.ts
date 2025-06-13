import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

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

  try{
    const body = await request.json();
    const { name, email, phone, address, notes } = body;

    // Basic validation
    if (!name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    // Create new person
    const {data, error} = await supabase.from('contacts').insert({
      name,
      email,
      phone,
      address,
      notes
    }).select();

    if (error) {
      console.log("Error creating contact: "+error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const newContact = data?.[0];
    return NextResponse.json(newContact, { status: 201 });
  } catch (error) {
    console.error('Error creating contact:', error);
    return NextResponse.json(
      { error: 'Error creating contact' },
      { status: 500 }
    );
  }
  
  //old code
  /*
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
  }*/
}

export async function GET() {

  try {
    const { data: contacts, error } = await supabase.from('contacts').select('*');
    if (error) {
      console.log("Error fetching contacts: "+error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(contacts);
  } catch (error) {
    console.log("Error fetching contacts: "+error);
    return NextResponse.json({ error: "Failed to fetch contacts" }, { status: 500 });
  }
  //console.log("Here is the people array: "+people);
  //return NextResponse.json(people);
}

export async function DELETE(request: Request) {
  
  try {
    const { id } = await request.json();
    const numericId = Number(id);
    const { error, data } = await supabase
      .from('contacts')
      .delete()
      .eq('id', numericId)
      .select();

    if (error) {
      console.error('Error deleting contact:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    if (!data || data.length === 0) {
      return NextResponse.json({ error: 'Person not found' }, { status: 404 });
    }
    return NextResponse.json(
      { message: `Person with ID ${id} deleted successfully` },
      { status: 200 }
    );
  } catch (err) {
    console.error('Error deleting person:', err);
    return NextResponse.json({ error: 'Error deleting person' }, { status: 500 });
  }
    
    //old code
    /*
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
    }*/
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, name, email, phone, address, notes } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID is required to update' }, { status: 400 });
    }

    const updates: Record<string, any> = {
      ...(name && name.trim() !== '' && { name }),
      ...(email && email.trim() !== '' && { email }),
      ...(phone && phone.trim() !== '' && { phone }),
      ...(address && address.trim() !== '' && { address }),
      ...(notes && notes.trim() !== '' && { notes }),
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabase
      .from('contacts')
      .update(updates)
      .eq('id', id) // No user_id filter yet
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ error: 'Person not found' }, { status: 404 });
    }

    return NextResponse.json(data[0], { status: 200 });
  } catch (err) {
    console.error('Unexpected error:', err);
    return NextResponse.json({ error: 'Error updating person' }, { status: 500 });
  }
}
