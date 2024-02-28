import React, { useState } from 'react';
import { Input } from '../../../@/components/ui/input';
import { Button } from '../../../@/components/ui/button';

interface FormData {
  Name: string;
  Email: string;
  ApplyingFor: string;
  Resume: string; // Updated to string for URL
  WhyDoYouWantToWorkWithUs: string;
  Phone: string;
}

interface ApplicationFormProps {
  onSubmit: (data: any) => void;
  selectedJob: string;
  selectedJobName: string;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({
  onSubmit,
  selectedJob,
  selectedJobName
}) => {
  const [formData, setFormData] = useState<FormData>({
    Name: '',
    Email: '',
    ApplyingFor: selectedJob,
    Resume: '',
    WhyDoYouWantToWorkWithUs: '',
    Phone: ''
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const submissionData = {
      records: [
        {
          fields: {
            Name: formData.Name,
            'Email address': formData.Email,
            'Applying for': [formData.ApplyingFor],
            Resume: [{ url: formData.Resume }], // Directly using the URL string
            'Why do you want to work with us?':
              formData.WhyDoYouWantToWorkWithUs,
            Phone: formData.Phone
          }
        }
      ]
    };
    onSubmit(submissionData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-900 mt-10 space-y-4">
      <Input
        className="w-min p-2 rounded-lg text-gray-900"
        type="text"
        name="Name"
        value={formData.Name}
        onChange={handleInputChange}
        placeholder="Name"
      />
      <Input
        className="w-min p-2 rounded-lg text-gray-900"
        type="email"
        name="Email"
        value={formData.Email}
        onChange={handleInputChange}
        placeholder="Email Address"
      />
      <p className="text-white">
        Please provide a publicly accessible url to your resume
      </p>
      <Input
        className="w-full p-2 rounded-lg text-gray-900"
        type="text"
        name="Resume"
        value={formData.Resume}
        onChange={handleInputChange}
        placeholder="Resume Public URL"
      />
      <textarea
        className="w-full p-2 rounded-lg text-gray-900"
        name="WhyDoYouWantToWorkWithUs"
        value={formData.WhyDoYouWantToWorkWithUs}
        onChange={handleInputChange}
        placeholder="Why do you want to work with us?"
      />
      <Input
        className="w-min p-2 rounded-lg text-gray-900"
        type="text"
        name="Phone"
        value={formData.Phone}
        onChange={handleInputChange}
        placeholder="Phone"
      />
      <Button
        className="px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded-lg text-white font-bold"
        type="submit"
      >
        Submit
      </Button>
    </form>
  );
};

export default ApplicationForm;
