import { useState, useEffect } from 'react';

export const useReadingTime = (content, wordsToAvoid = []) => {
  const [readingTime, setReadingTime] = useState(0);

  useEffect(() => {
    const wordsPerMin = 183; // adjust as needed
    
    const words = content.split(/\s+/); // split by whitespace (space, tab, newline)
    let tempWordCount = words.length - 1;

    // if word appears in wordsToAvoid we decrement the number of words by 1
    words.forEach((word) => {
      if (wordsToAvoid.includes(word)) {
        tempWordCount --;
      }
    })
    const estReadingTime = Math.ceil(tempWordCount / wordsPerMin);
    setReadingTime(estReadingTime);
  }, [content]);

  return readingTime;
}