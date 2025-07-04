import { supabase } from '@/lib/supabaseClient';
import { resend } from '@/lib/resend';
import { NextResponse } from 'next/server';
import WelcomeEmail from '@/emails/welcome-email';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email } = body;

        // Input validation
        if (!email || typeof email !== 'string') {
            return NextResponse.json(
                { error: 'Valid email is required' },
                { status: 400 }
            );
        }

        // Email format validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            );
        }

        // Check for duplicate email
        const { data: existingEmail } = await supabase
            .from('waitlist')
            .select('email')
            .eq('email', email)
            .single();

        if (existingEmail) {
            return NextResponse.json(
                { error: 'Email already registered' },
                { status: 409 }
            );
        }

        // Insert new email with timestamp
        const { data, error } = await supabase
            .from('waitlist')
            .insert([
                { 
                    email,
                    created_at: new Date().toISOString()
                }
            ])
            .select();

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json(
                { error: 'Failed to add email to waitlist' },
                { status: 500 }
            );
        }

        // Send welcome email
        try {
            console.log('Attempting to send welcome email to:', email);
            
            const emailResponse = await resend.emails.send({
                from: 'Kokoro <onboarding@resend.dev>', // Using Resend's test domain
                to: email,
                subject: 'Welcome to Kokoro - You\'re on the waitlist!',
                react: WelcomeEmail({ email }),
            });
            
            console.log('Email sent successfully:', emailResponse);
        } catch (emailError) {
            console.error('Detailed email error:', {
                message: emailError instanceof Error ? emailError.message : 'Unknown error',
                error: emailError,
                stack: emailError instanceof Error ? emailError.stack : undefined
            });
            // Don't fail the request if email sending fails
        }

        return NextResponse.json(
            { 
                message: 'Email added to waitlist successfully',
                data: data[0]
            },
            { status: 201 }
        );

    } catch (error) {
        console.error('Error processing waitlist signup:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}