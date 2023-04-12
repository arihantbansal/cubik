import { OptionBase } from 'chakra-react-select';

export interface tokenGroup extends OptionBase {
  label: string;
  value: string;
  icon: JSX.Element;
}
