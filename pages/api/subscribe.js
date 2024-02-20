// pages/api/subscribe.js

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email } = req.body;

    // Your Airtable API URL and headers
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
              Email: email // Assuming you're storing the email address in a field named "Email"
              // Add other fields you want to include here
            }
          }
          // Add more records if needed
        ]
      })
    };

    try {
      const airtableResponse = await fetch(AIRTABLE_URL, config);
      const data = await airtableResponse.json();

      if (!airtableResponse.ok) {
        throw new Error(data.message || 'Failed to subscribe');
      }

      res.status(200).json({ message: 'Success', data });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    // Handle any other HTTP methods
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
