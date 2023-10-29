"use client";
import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import { githubGist } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const CodeComponent = () => {
  const codeString = `import { React } from 'react';`;

  const customStyle = {
    fontFamily:
      'Fira Code, Consolas, Monaco, Andale Mono, Ubuntu Mono, monospace',
    fontSize: '16px',
    padding: '16px',
    lineHeight: '1.5',
  };

  return (
    <SyntaxHighlighter
      language={jsx}
      style={githubGist}
      className={customStyle}
    >
      {codeString.trim()}
    </SyntaxHighlighter>
  );
};

export default CodeComponent;
