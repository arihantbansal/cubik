// components/ErrorBoundary.tsx
import { Center } from "@chakra-ui/react";
import { Component, ErrorInfo, ReactNode } from "react";
import ComponentErrors from "./ComponentErrors";

interface Props {
  children: ReactNode;
  onError?: () => void;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    if (this.props.onError) {
      this.props.onError();
    }
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Center
          maxW={"7xl"}
          mx="auto"
          w="full"
          py={{ base: "16px", sm: "24px" }}
          border="1px dashed"
          borderColor={"#1D1F1E"}
          rounded="12px"
        >
          <ComponentErrors />
        </Center>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
