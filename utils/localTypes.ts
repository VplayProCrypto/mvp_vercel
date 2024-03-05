export interface JobPostingFields {
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

export interface JobPosting {
  id: string;
  createdTime: string;
  fields: JobPostingFields;
}
