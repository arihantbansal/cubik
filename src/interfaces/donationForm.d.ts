import { ProjectsModel } from '@prisma/client';

export interface DonationFormType {
  amount: number;
  token: string;
}

export interface ListDonationFormType extends DonationFormType {
  projects: ProjectsModel[];
  amount: number;
}
