import { NextResponse } from 'next/server'; 
import { supabaseAdmin } from '@/lib/supabaseClient';
import { auth } from '@clerk/nextjs/server';


interface EventUpdate {
    eventName: string;
    eventDate: string;
    eventLocation: string;
    eventDescription: string;
    eventOrganizer: string;
}

export async function POST(request: Request) {
    /*const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }*/

    const userId = '123';

    try {
        const body = await request.json();
        const { eventName, eventDate, eventLocation, eventDescription, eventOrganizer } = body;

        if (!eventName || !eventDate) {
            return NextResponse.json({ error: 'Event name and date are required' }, { status: 400 });
        }

        const { data, error } = await supabaseAdmin.from('events').insert({
            user_id: userId,
            eventName,
            eventDate,
            eventLocation,
            eventDescription,
            eventOrganizer
            
        }).select();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        } 

        return NextResponse.json(data, { status: 201 });
    } catch (error) {

        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function GET(){
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { data: events, error } = await supabaseAdmin.from('events').select('*').eq('user_id', userId);

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(events);
    } catch (error){
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(request: Request){
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { id } = await request.json();
        const numericId = Number(id);
        const { error, data } = await supabaseAdmin.from('events').delete().eq('id', numericId).eq('user_id', userId);

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(data);
    } catch (error){
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PUT(request: Request){
    const { userId } = await auth();
    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { id, eventName, eventDate, eventLocation, eventDescription, eventOrganizer } = body;

        if (!id) {
            return NextResponse.json({ error: 'ID is required to update' }, { status: 400 });
        }

        const updates: EventUpdate = {
            ...(eventName && eventName.trim() !== '' && { eventName }),
            ...(eventDate && eventDate.trim() !== '' && { eventDate }),
            ...(eventLocation && eventLocation.trim() !== '' && { eventLocation }),
            ...(eventDescription && eventDescription.trim() !== '' && { eventDescription }),
            ...(eventOrganizer && eventOrganizer.trim() !== '' && { eventOrganizer }),
            updated_at: new Date().toISOString(),
        };

        const { data, error } = await supabaseAdmin.from('events').update(updates).eq('id', id).eq('user_id', userId).select();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(data);
    } catch (error){
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}