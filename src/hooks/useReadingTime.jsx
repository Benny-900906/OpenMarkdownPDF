import { useState, useEffect } from 'react';

// implement custom hook logic
export const useReadingTime = (renderedContent) => {
  const [readingTime, setReadingTime] = useState(0);

  useEffect(() => {

  }, [renderedContent]);

  return readingTime;
}