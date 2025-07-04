import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseClient';
import { auth } from '@clerk/nextjs/server';

// Define the update type
interface ContactUpdate {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
    organization_id?: number | null;
    notes?: string;
    updated_at: string;
}


export async function POST(request: Request) {

  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, email, phone, address, organization_id, notes } = body;

    // Basic validation
    if (!name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }
    
    
    // Create new contact
    const {data, error} = await supabaseAdmin.from('contacts').insert({
      user_id: userId, 
      name,
      email,
      phone,
      address,
      organization_id,
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
}

export async function GET(request: Request) {
  
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
      // Fetch single contact by ID
      const { data: contact, error } = await supabaseAdmin
        .from('contacts')
        .select('*')
        .eq('id', id)
        .eq('user_id', userId)
        .single();

      if (error) {
        console.log("Error fetching contact: "+error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      if (!contact) {
        return NextResponse.json({ error: 'Contact not found' }, { status: 404 });
      }

      return NextResponse.json(contact);
    } else {
      // Fetch all contacts
      const { data: contacts, error } = await supabaseAdmin
        .from('contacts')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) {
        console.log("Error fetching contacts: "+error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      return NextResponse.json(contacts);
    }
  } catch (error) {
    console.log("Error fetching contacts: "+error);
    return NextResponse.json({ error: "Failed to fetch contacts" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await request.json();
    const numericId = Number(id);
    const { error, data } = await supabaseAdmin
      .from('contacts')
      .delete()
      .eq('id', numericId)
      .eq('user_id', userId)
      .select();

    if (error) {
      console.error('Error deleting contact:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    if (!data || data.length === 0) {
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 });
    }
    return NextResponse.json(
      { message: `Contact with ID ${id} deleted successfully` },
      { status: 200 }
    );
  } catch (err) {
    console.error('Error deleting contact:', err);
    return NextResponse.json({ error: 'Error deleting contact' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, name, email, phone, address, organization_id, notes } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID is required to update' }, { status: 400 });
    }

    const updates: ContactUpdate = {
      ...(name && name.trim() !== '' && { name }),
      ...(email && email.trim() !== '' && { email }),
      ...(phone && phone.trim() !== '' && { phone }),
      ...(address && address.trim() !== '' && { address }),
      ...(organization_id !== undefined && { organization_id }),
      ...(notes && notes.trim() !== '' && { notes }),
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabaseAdmin
      .from('contacts')
      .update(updates)
      .eq('id', id)
      .eq('user_id', userId)
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 });
    }

    return NextResponse.json(data[0], { status: 200 });
  } catch (err) {
    console.error('Unexpected error:', err);
    return NextResponse.json({ error: 'Error updating contact' }, { status: 500 });
  }
}
