import { NextRequest, NextResponse } from 'next/server';

export async function POST(nextRequest: NextRequest) {
  try {
    const requestBody = await nextRequest.json();
    let AIRTABLE_URL = '';
    let bodyPayload = {};
    let apiKeyEnvVar = '';

    if ('email' in requestBody && 'name' in requestBody) {
      // Original request type
      AIRTABLE_URL = `https://api.airtable.com/v0/app1XIenbHqdqZsVe/tblrAwAXSlvbs0lAP`;
      apiKeyEnvVar = process.env.REACT_APP_AIRTABLE_SIGNUP as string; // Use the appropriate environment variable for this request type
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
      // New request type
      AIRTABLE_URL = `https://api.airtable.com/v0/appb30pDqbguNgmbd/Applicants`;
      apiKeyEnvVar = process.env.REACT_APP_AIRTABLE_CAREERS as string;
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
    // Catch and return any errors
    return NextResponse.json(
      { message: (error as string) || 'An error occurred' },
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

  // Define the Airtable API URL
  const airtableUrl =
    'https://api.airtable.com/v0/appb30pDqbguNgmbd/Positions?pageSize=50&view=All%20positions';

  // Make the fetch request to the Airtable API
  try {
    const response = await fetch(airtableUrl, {
      method: 'GET', // HTTP method
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_CAREERS_GET_JOBS}` // Use environment variable for the API token
      }
    });

    if (!response.ok) {
      // If the response is not ok, throw an error
      throw new Error(`Airtable API request failed: ${response.statusText}`);
    }

    const data = await response.json(); // Parse the JSON response

    // Return the data as a NextResponse (you might want to adjust this based on your needs)
    return new NextResponse(JSON.stringify(data), {
      status: response.status,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error fetching data from Airtable:', error);
    // Handle errors or return an error response
    return new NextResponse(JSON.stringify({ error: 'Failed to fetch data' }), {
      status: 500, // Internal Server Error
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}
