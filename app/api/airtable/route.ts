import { NextRequest, NextResponse } from 'next/server';

export async function POST(nextRequest: NextRequest) {
  try {
    const { email, name } = await nextRequest.json();

    const AIRTABLE_URL = `https://api.airtable.com/v0/app1XIenbHqdqZsVe/tblrAwAXSlvbs0lAP`;
    const config = {
      method: 'post',
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        records: [
          {
            fields: {
              Name: name,
              Email: email
            }
          }
        ]
      })
    };

    const airtableResponse = await fetch(AIRTABLE_URL, config);
    const data = await airtableResponse.json();

    if (!airtableResponse.ok) {
      throw new Error(data.error.message || 'Failed to subscribe');
    }

    // Use NextResponse.json to send JSON response
    return NextResponse.json({ message: 'Success', data }, { status: 200 });
  } catch (error) {
    // Catch and return any errors
    return NextResponse.json(
      { message: error || 'An error occurred' },
      { status: 500 }
    );
  }
}
