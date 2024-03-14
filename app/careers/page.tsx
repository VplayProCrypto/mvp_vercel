"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Corrected from 'next/navigation' to 'next/router'
import Head from "next/head";
import Navbar from "../commonComponents/navbar";
import Footer from "../commonComponents/footer";
import Loading from "../commonComponents/loading";
import { Button } from "../../@/components/ui/button";
import Link from "next/link";
import { fetchWithRetry } from "../../utils/utils";
import FormattedText from "./components/formattedtext";
import Modal from "./components/modal";
import { JobPosting } from "../../types/localTypes";

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
      const url = "/api/airtable";
      try {
        const data = await fetchWithRetry(url);
        setJobPostings(data.records);
      } catch (error) {
        console.error("Error fetching job postings:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchJobPostings();
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
    router.refresh(); // Refresh the page or navigate the user to a confirmation page
  };

  const handleApplyNow = (job: JobPosting) => {
    setSelectedJob(job.fields.record_id as string);
    setSelectedJobName(job.fields.Name as string);
    setShowForm(true);
    setSelectedJobOverview(job.fields.Overview as string);
    setSelectedJobDescription(job.fields["Job Description"] as string);
  };

  if (isLoading || isSubmitting) {
    return <Loading />;
  }

  return (
    <>
      <Head>
        <title>Open Positions - Careers</title>
      </Head>
      <Navbar user={undefined} gasFee={""} />
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
                    {posting.fields["Apply Now"] && (
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
