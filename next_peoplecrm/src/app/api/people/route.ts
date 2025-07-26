import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseClient';
import { auth } from '@clerk/nextjs/server';

// Define the update type
interface PersonUpdate {
    person_name?: string;
    person_photo?: string;
    person_role?: string;
    person_email?: string;
    person_phone?: string;
    person_location?: string;
    person_linkedin?: string;
    person_notes?: string;
    organization_id?: number | null;
    updated_at: string;
}

export async function POST(request: Request) {

  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { name, email, phone, location, role, linkedin, notes, organization_id } = body;

    // Basic validation
    if (!name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }
    
    // Create new person
    const {data, error} = await supabaseAdmin.from('people').insert({
      user_id: userId, 
      person_name: name,
      person_email: email,
      person_phone: phone,
      person_location: location,
      person_role: role,
      person_linkedin: linkedin,
      person_notes: notes,
      organization_id: organization_id || null
    }).select();

    if (error) {
      console.log("Error creating person: "+error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const newPerson = data?.[0];
    return NextResponse.json(newPerson, { status: 201 });
  } catch (error) {
    console.error('Error creating person:', error);
    return NextResponse.json(
      { error: 'Error creating person' },
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
      // Fetch single person by ID with organization details
      const { data: person, error } = await supabaseAdmin
        .from('people')
        .select(`
          *,
          organizations (
            id,
            organization_name,
            organization_industry,
            organization_location
          )
        `)
        .eq('id', id)
        .eq('user_id', userId)
        .single();

      if (error) {
        console.log("Error fetching person: "+error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      if (!person) {
        return NextResponse.json({ error: 'Person not found' }, { status: 404 });
      }

      return NextResponse.json(person);
    } else {
      // Fetch all people with organization details
      const { data: people, error } = await supabaseAdmin
  .from('people')
  .select(`
    *,
    people_organizations (
      relationship_type,
      organization:organizations (
        id,
        organization_name,
        organization_industry,
        organization_location
      )
    )
  `)
  .eq('user_id', userId)
  .order('created_at', { ascending: false });


      if (error) {
        console.log("Error fetching people: "+error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      return NextResponse.json(people);
    }
  } catch (error) {
    console.log("Error fetching people: "+error);
    return NextResponse.json({ error: "Failed to fetch people" }, { status: 500 });
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
      .from('people')
      .delete()
      .eq('id', numericId)
      .eq('user_id', userId)
      .select();

    if (error) {
      console.error('Error deleting person:', error);
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
}

export async function PUT(request: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { id, name, email, phone, location, role, linkedin, notes, organization_id } = body;

    if (!id) {
      return NextResponse.json({ error: 'ID is required to update' }, { status: 400 });
    }

    const updates: PersonUpdate = {
      ...(name && name.trim() !== '' && { person_name: name }),
      ...(email && email.trim() !== '' && { person_email: email }),
      ...(phone && phone.trim() !== '' && { person_phone: phone }),
      ...(location && location.trim() !== '' && { person_location: location }),
      ...(role && role.trim() !== '' && { person_role: role }),
      ...(linkedin && linkedin.trim() !== '' && { person_linkedin: linkedin }),
      ...(notes && notes.trim() !== '' && { person_notes: notes }),
      ...(organization_id !== undefined && { organization_id: organization_id || null }),
      updated_at: new Date().toISOString(),
    };

    const { data, error } = await supabaseAdmin
      .from('people')
      .update(updates)
      .eq('id', id)
      .eq('user_id', userId)
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
