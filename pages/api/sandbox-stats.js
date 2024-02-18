const sdk = require('api')('@fp-api/v2.0#kke21clqem4wqf');

export default async function handler(req, res) {
  try {
    const response = await sdk.getV3ProtocolGetprotocolstatshistory({
      chain: 'Ethereum',
      protocol_slug: 'the-sandbox',
      statistics_frequency_model: 'daily',
      start_time: '2023-07-01',
      end_time: '2023-07-25',
      limit: '10',
      'api-key': 'lHcs/9/qHw9k0CIxGOuycEOiSk33ALp+3ehzADf2wtq3Ow7L5ZJ3QJIW9gbWpWEw', // Replace with your actual API key
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
