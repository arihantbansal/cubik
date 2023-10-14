import { useState } from "react";
import ErrorBoundary from "~/components/errors/Errorboundary";

export function useErrorBoundary() {
  const [hasError, setHasError] = useState(false);

  const ErrorBoundaryWrapper = (props: { children: React.ReactNode }) => (
    <ErrorBoundary onError={() => setHasError(true)}>
      {props.children}
    </ErrorBoundary>
  );

  return { hasError, ErrorBoundaryWrapper };
}
