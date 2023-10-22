import { Textarea } from "../components/ui/text-area";

export default {
  title: "TextArea",
  component: Textarea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} 

export const Default = {
  size: "md",
  state: "default",
  resizable: true,
};

export const Error = {
  size: "md",
  state: "error",
  resizable: true,
};

export const Disabled = {
  size: "md",
  state: "disabled",
  resizable: true,
};

export const Small = {
  size: "sm",
  state: "default",
  resizable: true,
};

export const NonResizable = {
  size: "md",
  state: "default",
  resizable: false,
};
