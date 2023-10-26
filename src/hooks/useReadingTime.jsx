import { useState, useEffect } from 'react';

export const useReadingTime = (renderedContent) => {
  const [readingTime, setReadingTime] = useState(0);

  useEffect(() => {

  }, [renderedContent]);

  return readingTime;
}