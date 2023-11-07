'use client';

import React, { CSSProperties } from 'react';
import { Fira_Code } from 'next/font/google';
import SyntaxHighlighter from 'react-syntax-highlighter';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import {
  dark,
  githubGist,
} from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { toast } from 'sonner';

import { Button, useTheme } from '@cubik/ui';

interface Props {
  codeString?: string;
}

const firacode = Fira_Code({
  subsets: ['latin', 'cyrillic-ext'],
  weight: '300',
});

const CodeComponent = ({ codeString }: { codeString: string }) => {
  const { theme, toggleTheme } = useTheme();
  // const codeString = `import { React } from 'react';`;

  const customStyle: CSSProperties = {
    fontSize: '16px',
    padding: '16px',
    lineHeight: '1.5',
    ...firacode.style,
  };

  return (
    <div>
      <Button
        size="sm"
        onClick={() => {
          navigator.clipboard.writeText(codeString);
          toast.success('Copied to clipboard!');
        }}
        variant="outline"
      >
        Copy
      </Button>
      <SyntaxHighlighter
        language={jsx}
        style={{
          ...githubGist,
          ...(theme === 'dark' ? dark : {}),
        }}
        customStyle={customStyle}
      >
        {codeString.trim()}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeComponent;
