export type UserProject = {
  id: string;
  logo: string; //
  status: string;
  project_name: string; //
  long_description: string;
  owner_publickey: string;
  short_description: string;
  socials: any;
  project_link: string; //
  contributions: {
    id: string;
    user: any;
    token: string;
    amount: number;
    date: Date;
  }[];
  estimated_matching_amount: number;
  visitors: {
    date: Date;
    count: number;
  }[];
};
