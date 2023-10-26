import { useState, useEffect } from 'react';

export const useWordCount = (renderedContent) => {
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {

  }, [renderedContent]);

  return wordCount;
}