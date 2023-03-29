import { User } from './user';

export type projectType = {
  id: string;
  industry: [
    {
      label: string;
      value: string;
      color_scheme: string;
    }
  ];
  logo: string;
  long_description: string;
  owner: User[];
  owner_publickey: string;
  project_name: string;
  short_description: string;
  socials: any;
  project_link: string;
  total: number;
  usd_total?: number;
};
