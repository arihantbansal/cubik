import { ProjectsModel } from "@cubik/database";
import { tokenGroup } from "./token";

export interface DonationFormType {
  amount: number;
  token: tokenGroup;
  matchingPoolDonation: number;
  percentage: number;
}

export interface ListDonationFormType extends DonationFormType {
  projects: ProjectsModel[];
  amount: number;
}
