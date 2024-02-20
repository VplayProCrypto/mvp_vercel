import { useState } from 'react';
// Import Head for setting page title
import Head from 'next/head';

export default function Access() {
  const [email, setEmail] = useState('');

  // Placeholder function for form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement your sign-up logic here
    // This could involve sending the email to your backend or a third-party service
    alert('Thank you for joining, ${email}!');
    // Here you would also trigger the thank you pop-up and email confirmation
  };

  return (
    <>
      <Head>
        <title>Join VPLAY Community</title>
      </Head>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded shadow-md text-center" style={{ minWidth: '300px' }}>
          <h1 className="text-lg font-bold">Join the VPLAY Community and Beta Testing</h1>
          <p className="text-gray-600 my-4">Join our community, get updates and early access to the VPLAY platform, contribute by letting us know what you think and help shape the future of online and offline gaming.</p>
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <input
              type="email"
              placeholder="Email"
              className="mt-1 p-2 border rounded-lg w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ borderColor: '#ddd', borderWidth: '1px' }}
            />
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            >
              Join Us
            </button>
          </form>
        </div>
        {/* Additional implementation required for floating menu, thank you pop-up, and email confirmation as described in the document */}
      </div>
    </>
  );
}