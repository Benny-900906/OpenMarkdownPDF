import { useState, useEffect } from 'react';

// implement custom hook logic
export const useCharCount = (content) => {
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {

  }, [content]);

  return charCount;
}