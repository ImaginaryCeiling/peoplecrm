import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseClient';
import { auth } from '@clerk/nextjs/server';


interface OrganizationUpdate {
    name?: string;
    industry?: string;
    location?: string;
    website?: string;
    contact_email?: string;
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
        const { orgName, industry, location, website, contactEmail, notes } = body;

        // Basic validation
        if (!orgName) {
            return NextResponse.json(
                { error: 'Organization name is required' },
                { status: 400 }
            );
        }

        const { data, error } = await supabaseAdmin.from('organizations').insert({
            user_id: userId,
            name: orgName,
            industry,
            location,
            website,
            contact_email: contactEmail,
            notes
        }).select();

        if (error) {
            console.log("Error creating organization: "+error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        const newOrganization = data?.[0];
        return NextResponse.json(newOrganization, { status: 201 });
    } catch (error) {
        console.error('Error creating organization:', error);
        return NextResponse.json(error, { status: 500 });
    }
}

export async function GET() {
    
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { data: organizations, error } = await supabaseAdmin
        .from('organizations')
        .select(`
            *,
            employee_count:contacts(count)
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

        if (error) {
            console.log("Error fetching organizations: "+error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(organizations);
    } catch (error) {
        console.log("Error fetching organizations: "+error);
        return NextResponse.json({ error: "Failed to fetch organizations" }, { status: 500 });
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
        .from('organizations')
        .delete()
        .eq('id', numericId)
        .eq('user_id', userId);

        if (error) {
            console.log("Error deleting organization: "+error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(data);
    } catch (error) {
        console.log("Error deleting organization: "+error);
        return NextResponse.json({ error: "Failed to delete organization" }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { id, name, industry, location, website, contactEmail, notes } = body;

        if (!id) {
            return NextResponse.json({ error: 'ID is required to update' }, { status: 400 });
        }

        const updates: OrganizationUpdate = {
            ...(name && name.trim() !== '' && { name }),
            ...(industry && industry.trim() !== '' && { industry }),
            ...(location && location.trim() !== '' && { location }),
            ...(website && website.trim() !== '' && { website }),
            ...(contactEmail && contactEmail.trim() !== '' && { contact_email: contactEmail }),
            ...(notes && notes.trim() !== '' && { notes }),
            updated_at: new Date().toISOString(),
        };

        const { data, error } = await supabaseAdmin
        .from('organizations')
        .update(updates)
        .eq('id', id)
        .eq('user_id', userId)
        .select();

        if (error) {
            console.log("Error updating organization: "+error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        if (!data || data.length === 0) {
            return NextResponse.json({ error: 'Organization not found' }, { status: 404 });
          }

        return NextResponse.json(data);
    } catch (error) {
        console.log("Error updating organization: "+error);
        return NextResponse.json({ error: "Failed to update organization" }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Organization ID is required' }, { status: 400 });
        }

        const { data: organization, error } = await supabaseAdmin
        .from('organizations')
        .select(`
            *,
            employee_count:contacts(count),
            employees:contacts(
                id,
                name,
                email,
                phone,
                address,
                notes,
                created_at
            )
        `)
        .eq('id', id)
        .eq('user_id', userId)
        .single();

        if (error) {
            console.log("Error fetching organization: "+error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        if (!organization) {
            return NextResponse.json({ error: 'Organization not found' }, { status: 404 });
        }

        return NextResponse.json(organization);
    } catch (error) {
        console.log("Error fetching organization: "+error);
        return NextResponse.json({ error: "Failed to fetch organization" }, { status: 500 });
    }
}