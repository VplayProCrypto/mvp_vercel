import { NextRequest, NextResponse } from 'next/server';

export async function POST(nextRequest: NextRequest) {
  try {
    const requestBody = await nextRequest.json();
    let AIRTABLE_URL = '';
    let bodyPayload = {};
    let apiKeyEnvVar = '';

    if ('email' in requestBody && 'name' in requestBody) {
      AIRTABLE_URL = `https://api.airtable.com/v0/app1XIenbHqdqZsVe/tblrAwAXSlvbs0lAP`;
      apiKeyEnvVar = process.env.AIRTABLE_SIGNUP as string;
      bodyPayload = {
        records: [
          {
            fields: {
              Name: requestBody.name,
              Email: requestBody.email
            }
          }
        ]
      };
    } else if ('records' in requestBody) {
      AIRTABLE_URL = `https://api.airtable.com/v0/appb30pDqbguNgmbd/Applicants`;
      apiKeyEnvVar = process.env.AIRTABLE_CAREERS_APPLY as string;
      bodyPayload = requestBody;
    } else {
      throw new Error('Invalid request format');
    }

    const config = {
      method: 'post',
      headers: {
        Authorization: `Bearer ${apiKeyEnvVar}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bodyPayload)
    };

    const airtableResponse = await fetch(AIRTABLE_URL, config);
    const data = await airtableResponse.json();

    if (!airtableResponse.ok) {
      throw new Error(data.error.message || 'Failed to process request');
    }

    return NextResponse.json({ message: 'Success', data }, { status: 200 });
  } catch (error) {
    console.log(error);
    console.log(nextRequest);
    // Catch and return any errors
    return NextResponse.json(
      { message: (error as Error) || 'An error occurred' },
      { status: 500 }
    );
  }
}

export async function GET(nextRequest: NextRequest): Promise<NextResponse> {
  // Your existing code to extract the URL and parameters
  const url = new URL(nextRequest.url);
  const action = url.searchParams.get('action');
  const params: { [key: string]: string | null } = Object.fromEntries(
    url.searchParams
  );

  const airtableUrl =
    'https://api.airtable.com/v0/appb30pDqbguNgmbd/Positions?pageSize=50&view=All%20positions';

  try {
    const response = await fetch(airtableUrl, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_CAREERS_GET_JOBS}`
      }
    });

    if (!response.ok) {
      throw new Error(`Airtable API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    return new NextResponse(JSON.stringify(data), {
      status: response.status,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error fetching data from Airtable:', error);
    return new NextResponse(JSON.stringify({ error: 'Failed to fetch data' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
