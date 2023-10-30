import { useState, useEffect } from 'react';

export const useWordCount = (content : string, wordsToAvoid : string[] = []) : number => {
  const [wordCount, setWordCount] = useState<number>(0);

  useEffect(() => {
    const words : string[] = content.split(/\s+/); // split by whitespace (space, tab, newline)
    let tempWordCount : number = words.length - 1;

    // if word appears in wordsToAvoid we decrement the number of words by 1
    words.forEach((word) => {
      if (wordsToAvoid.includes(word)) {
        tempWordCount --;
      }
    })
    setWordCount(tempWordCount);
  }, [content]);

  return wordCount;
}