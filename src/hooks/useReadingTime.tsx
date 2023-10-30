import { useState, useEffect } from 'react';

export const useReadingTime = (content : string, wordsToAvoid : string[] = []) : number => {
  const [readingTime, setReadingTime] = useState<number>(0);

  useEffect(() => {
    const wordsPerMin : number = 183; // adjust as needed
    
    const words : string[] = content.split(/\s+/); // split by whitespace (space, tab, newline)
    let tempWordCount : number = words.length - 1;

    // if word appears in wordsToAvoid we decrement the number of words by 1
    words.forEach((word) => {
      if (wordsToAvoid.includes(word)) {
        tempWordCount --;
      }
    })
    const estReadingTime : number = Math.ceil(tempWordCount / wordsPerMin);
    setReadingTime(estReadingTime);
  }, [content]);

  return readingTime;
}