import { useState, useEffect } from 'react';

// implement custom hook logic
export const useWordCount = (content) => {
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    
  }, [content]);

  return wordCount;
}