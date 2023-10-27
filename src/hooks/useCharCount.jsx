import { useState, useEffect } from 'react';

// implement custom hook logic
export const useCharCount = (renderedContent) => {
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {

  }, [renderedContent]);

  return charCount;
}