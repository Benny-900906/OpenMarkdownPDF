import { useState, useEffect } from 'react';

// implement custom hook logic
export const useReadingTime = (content) => {
  const [readingTime, setReadingTime] = useState(0);

  useEffect(() => {
    const words = content.split(/\s+/); // split by whitespace (space, tab, newline)
    const wordsPerMin = 183; // adjust as needed
    const estReadingTime = Math.round(words.length / wordsPerMin);
    setReadingTime(estReadingTime);
  }, [content]);

  return readingTime;
}