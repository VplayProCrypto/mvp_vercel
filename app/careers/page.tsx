'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; // Corrected from 'next/navigation' to 'next/router'
import Head from 'next/head';
import Navbar from '../commonComponents/navbar';
import Footer from '../commonComponents/footer';
import Loading from '../commonComponents/loading';
import ApplicationForm from './components/applicationform';
import { Button } from '../../@/components/ui/button';
import Link from 'next/link';

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
  record_id?: string;
}

interface JobPosting {
  id: string;
  createdTime: string;
  fields: JobPostingFields;
}

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

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center z-50">
      <div className="bg-black text-white p-4 rounded-lg shadow-lg space-y-3 flex flex-col space-between">
        {children}
        <Button
          onClick={onClose}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Close
        </Button>
      </div>
    </div>
  );
};

interface FormattedTextProps {
  text: string; // The text to be formatted into paragraphs
}

const FormattedText: React.FC<FormattedTextProps> = ({ text }) => {
  // Function to parse and render text with Markdown-like emphasis
  const renderMarkdown = (text: string) => {
    // Regular expressions to match bold+italic and bold patterns
    const boldItalicPattern = /\*\*\*(.*?)\*\*\*/g;
    const boldPattern = /\*\*(.*?)\*\*/g;

    // Helper function to replace matched patterns with React elements
    const replacePattern = (
      text: string,
      pattern: RegExp,
      component: (matched: string) => JSX.Element
    ) => {
      let match;
      let lastIndex = 0;
      const result = [];

      while ((match = pattern.exec(text)) !== null) {
        const matchedText = match[1];

        // Push preceding text if exists
        if (match.index > lastIndex) {
          result.push(text.substring(lastIndex, match.index));
        }

        // Push styled component
        result.push(component(matchedText));

        lastIndex = pattern.lastIndex;
      }

      // Push remaining text if exists
      if (lastIndex < text.length) {
        result.push(text.substring(lastIndex));
      }

      return result;
    };

    // Replace bold+italic with a header component, then bold
    let processed = replacePattern(text, boldItalicPattern, (matched) => (
      <h3 className="font-bold italic">{matched}</h3>
    ));
    processed = processed.flatMap((part) =>
      typeof part === 'string'
        ? replacePattern(part, boldPattern, (matched) => (
            <span className="font-bold">{matched}</span>
          ))
        : part
    );

    return processed;
  };

  // Split the text into paragraphs and add more spacing
  const paragraphs = text.split('\n').filter((p) => p.length > 0);

  return (
    <div className="space-y-8 px-8">
      {' '}
      {/* Adjusted spacing between paragraphs */}
      {paragraphs.map((paragraph, index) => (
        <div
          key={index}
          className="text-left text-white leading-relaxed mt-5 mb-5"
        >
          {renderMarkdown(paragraph)}
        </div>
      ))}
    </div>
  );
};

const CareersPage: React.FC = () => {
  const [jobPostings, setJobPostings] = useState<JobPosting[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [selectedJob, setSelectedJob] = useState<string | null>(null);
  const [selectedJobName, setSelectedJobName] = useState<string | null>(null);
  const [selectedJobOverview, setSelectedJobOverview] = useState<string | null>(
    null
  );
  const [selectedJobDescription, setSelectedJobDescription] = useState<
    string | null
  >(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const router = useRouter();

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

  async function submitToAirtable(data: FormData) {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/airtable', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        setShowModal(true); // Show modal on successful submission
      } else {
        const responseData = await response.json();
        alert(JSON.stringify(responseData.message) || 'Error Encountered');
      }
    } catch (error) {
      console.error(error);
      alert('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleCloseModal = () => {
    setShowModal(false);
    router.refresh(); // Refresh the page or navigate the user to a confirmation page
  };

  const handleApplyNow = (job: JobPosting) => {
    const jobchosenname = job.fields.Name as string;
    const jobchosen = job.fields.record_id as string;
    const jobchosenoverview = job.fields.Overview as string;
    const jobchoosendescription = job.fields['Job Description'] as string;
    setSelectedJob(jobchosen);
    setSelectedJobName(jobchosenname);
    setShowForm(true);
    setSelectedJobOverview(jobchosenoverview);
    setSelectedJobDescription(jobchoosendescription);
  };

  if (isLoading || isSubmitting) {
    return <Loading />;
  }

  return (
    <>
      <Head>
        <title>Open Positions - Careers</title>
      </Head>
      <Navbar user={undefined} gasFee={''} />
      {showModal && (
        <Modal onClose={handleCloseModal} isOpen={showModal}>
          Thank you for applying! We will get back to you soon.
        </Modal>
      )}

      {/* Modal component to show a friendly message */}
      <div className="bg-gray-900 text-white p-8 rounded-lg shadow-lg space-y-3 flex flex-col items-center">
        {showForm && selectedJob && selectedJobName ? (
          <>
            <div className="bg-gray-900 min-h-screen flex items-center justify-center text-center mt-20 p-5">
              <div>
                <h2 className="text-white text-3xl md:text-4xl font-bold mb-5">
                  {selectedJobName}
                </h2>

                <p className="bg-gray-700 text-gray-200 text-lg mb-5 p-3 rounded-lg shadow">
                  {selectedJobOverview}
                </p>
                <FormattedText text={selectedJobDescription as string} />
              </div>
            </div>

            <Button className="bg-blue-500 text-white text-lg px-4 py-2 rounded hover:bg-blue-600 transition duration-200">
              <Link href="https://airtable.com/appb30pDqbguNgmbd/shrV6cUTmfm78otQH">
                Apply Now
              </Link>
            </Button>
            <button
              className="bg-red-500 text-white text-lg px-4 py-2 rounded hover:bg-red-600 transition duration-200"
              onClick={() => setShowForm(false)}
            >
              Go Back
            </button>
          </>
        ) : (
          <>
            <h1 className="text-4xl font-bold mt-20 mb-10">Open Positions</h1>
            <div className="w-full max-w-6xl mx-auto">
              {jobPostings.map((posting) => (
                <div
                  key={posting.id}
                  className="bg-gray-800 rounded-lg p-6 mb-5 flex justify-between items-center"
                >
                  <div>
                    <h3 className="text-xl font-semibold">
                      {posting.fields.Name}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {posting.fields.Department}
                    </p>
                    <p
                      className="text-xs
                     text-gray-300 max-w-3xl"
                    >
                      {posting.fields.Overview}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm">{posting.fields.Category}</p>
                    {posting.fields['Apply Now'] && (
                      <button
                        onClick={() => handleApplyNow(posting)}
                        className="inline-block mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
                      >
                        See Details
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CareersPage;
