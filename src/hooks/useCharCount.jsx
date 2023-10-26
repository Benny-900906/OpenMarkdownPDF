import { useState, useEffect } from 'react';

export const useCharCount = (renderedContent) => {
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {

  }, [renderedContent]);

  return charCount;
}