import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseClient';
import { auth } from '@clerk/nextjs/server';

interface OrganizationUpdate {
    organization_name?: string;
    organization_logo?: string;
    organization_industry?: string;
    organization_location?: string;
    organization_website?: string;
    organization_contact_email?: string;
    organization_notes?: string;
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
            organization_name: orgName,
            organization_industry: industry,
            organization_location: location,
            organization_website: website,
            organization_contact_email: contactEmail,
            organization_notes: notes
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

export async function GET(request: Request) {
    
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (id) {
            // Fetch single organization by ID
            const { data: organization, error } = await supabaseAdmin
                .from('organizations')
                .select('*')
                .eq('id', id)
                .eq('user_id', userId)
                .single();

            if (error) {
                console.log("Error fetching organization:", error);
                return NextResponse.json({ error: error.message }, { status: 500 });
            }

            if (!organization) {
                return NextResponse.json({ error: 'Organization not found' }, { status: 404 });
            }

            return NextResponse.json(organization);
        } else {
            // Fetch all organizations
            const { data: organizations, error } = await supabaseAdmin
                .from('organizations')
                .select('*')
                .eq('user_id', userId)
                .order('created_at', { ascending: false });

            if (error) {
                console.log("Error fetching organizations:", error);
                return NextResponse.json({ error: error.message }, { status: 500 });
            }

            return NextResponse.json(organizations);
        }
    } catch (error) {
        console.log("Error fetching organizations:", error);
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
            ...(name && name.trim() !== '' && { organization_name: name }),
            ...(industry && industry.trim() !== '' && { organization_industry: industry }),
            ...(location && location.trim() !== '' && { organization_location: location }),
            ...(website && website.trim() !== '' && { organization_website: website }),
            ...(contactEmail && contactEmail.trim() !== '' && { organization_contact_email: contactEmail }),
            ...(notes && notes.trim() !== '' && { organization_notes: notes }),
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
        .select('*')
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