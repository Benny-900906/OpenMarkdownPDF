import { useState, useEffect } from 'react';

export const useMarkdownToHTML = (markdown) => {
  const [renderedContent, setRenderedContent] = useState([]);

  useEffect(() => {
    const lines = markdown.split('\n');
    let result = [];

    lines.forEach(line => {
      if (line.startsWith('# ')) {
        const text = line.replace('# ', '');
        result.push(<h1 key={line}>{text}</h1>);
      } else {
        result.push(<p key={line}>{line}</p>);
      }
    })

    setRenderedContent(result);

  }, [markdown]);

  return renderedContent;
}