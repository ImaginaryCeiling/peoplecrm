import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({
        hasResendKey: !!process.env.RESEND_API_KEY,
        resendKeyPrefix: process.env.RESEND_API_KEY ? process.env.RESEND_API_KEY.substring(0, 5) + '...' : null,
        nodeEnv: process.env.NODE_ENV,
    });
} 