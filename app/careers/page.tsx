// Import necessary dependencies
'use client';
import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Navbar from '../commonComponents/navbar'; // Adjust the import path as needed
import Footer from '../commonComponents/footer'; // Adjust the import path as needed
import Loading from '../commonComponents/loading';
import ApplicationForm from './components/applicationform'; // Ensure this path is correct

interface JobPostingFields {
  Introduction?: string;
  'Required experience'?: string;
  'Position status'?: string;
  Category?: string;
  Overview?: string;
  'Job Description'?: string;
  'Applying for position'?: string[];
  Department?: string;
  Name?: string;
  'Apply Now'?: {
    label: string;
    url: string;
  };
}

interface JobPosting {
  id: string;
  createdTime: string;
  fields: JobPostingFields;
}

// Define the interface for your form data if needed
interface FormData {
  ApplyingFor: string[];
}

async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  retries: number = 3,
  backoff: number = 300
): Promise<any> {
  try {
    const response = await fetch(url, options);
    if (!response.ok)
      throw new Error(`Fetch failed with status ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(`Fetch attempt failed: ${error}`);
    if (retries > 0) {
      console.log(`Retry #${4 - retries} after ${backoff}ms`);
      await new Promise((resolve) => setTimeout(resolve, backoff));
      return fetchWithRetry(url, options, retries - 1, backoff * 2);
    } else throw error;
  }
}

const CareersPage: React.FC = () => {
  const [jobPostings, setJobPostings] = useState<JobPosting[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobPostings = async () => {
      const url = '/api/airtable';
      try {
        const data = await fetchWithRetry(url);
        setJobPostings(data.records);
      } catch (error) {
        console.error('Error fetching job postings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobPostings();
  }, []);

  const handleApplyNow = (job: JobPosting) => {
    const jobchosen = job.fields.Name as string;
    setSelectedJob(jobchosen);
    setShowForm(true);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (showForm && selectedJob) {
    return (
      <>
        <Head>
          <title>Open Positions - Careers</title>
        </Head>
        <Navbar user={undefined} gasFee={''} />
        <div className="bg-gray-900 flex flex-col items-center align-middle justify-center">
          {' '}
          <ApplicationForm
            selectedJob={selectedJob}
            onSubmit={(formData) => console.log(formData)}
          />{' '}
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
            onClick={() => setShowForm(false)}
          >
            Go Back
          </button>
        </div>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Open Positions - Careers</title>
      </Head>
      <Navbar user={undefined} gasFee={''} />
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white py-10">
        <h1 className="text-4xl font-bold mt-10 mb-5">Open Positions</h1>
        <div className="w-full max-w-4xl mx-auto">
          {jobPostings.map((posting) => (
            <div
              key={posting.id}
              className="bg-gray-800 rounded-lg p-6 mb-5 flex justify-between items-center"
            >
              <div>
                <h3 className="text-xl font-semibold">{posting.fields.Name}</h3>
                <p className="text-sm text-gray-400">
                  {posting.fields.Department}
                </p>
              </div>
              <div>
                <p className="text-sm">{posting.fields.Category}</p>
                {posting.fields['Apply Now'] && (
                  <button
                    onClick={() => handleApplyNow(posting)}
                    className="inline-block mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
                  >
                    Apply Now
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CareersPage;
