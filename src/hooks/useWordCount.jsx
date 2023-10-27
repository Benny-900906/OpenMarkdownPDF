import { useState, useEffect } from 'react';

// implement custom hook logic
export const useWordCount = (renderedContent) => {
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {

  }, [renderedContent]);

  return wordCount;
}