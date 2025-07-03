import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
    console.error('RESEND_API_KEY is missing from environment variables');
    throw new Error('Missing RESEND_API_KEY environment variable');
}

console.log('Initializing Resend client with API key:', process.env.RESEND_API_KEY.substring(0, 5) + '...');

export const resend = new Resend(process.env.RESEND_API_KEY);