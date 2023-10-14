import { OptionBase } from "chakra-react-select";

export interface tokenGroup extends OptionBase {
  label: string;
  value: "solana" | "usd" | "bonk";
  devNetAdd?: string;
  mainNetAdd?: string;
  icon?: JSX.Element;
}
