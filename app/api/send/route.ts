import { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse } from 'next/server';
import { sendEmail } from '@/components/email/send_email';

/**
 * Handler for GET requests to the /api/send endpoint.
 * 
 * @param req - The incoming request object
 * @param res - The outgoing response object
 * @returns A JSON response with a message
 */
export async function GET(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Validate request if necessary
        sendEmail('max.duh22@gmail.com', 'Test email', '<p>This is a test email</p>');

        // Process the request and prepare the response
        const responseMessage = { message: 'GET request received successfully' };

        // Send the response
        return NextResponse.json(responseMessage);
    } catch (error) {
        // Handle exceptions gracefully
        return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
    }
}