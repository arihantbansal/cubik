import { UseFormSetValue } from 'react-hook-form';
import { DonationFormType } from '~/interfaces/donationForm';

interface GraphProps {
  width: number;
  height: number;
  donationAmount: number;
  setValue: UseFormSetValue<DonationFormType>;
  maximumDonationValue: number;
}

export default GraphProps;
