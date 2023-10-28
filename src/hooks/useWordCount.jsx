import { useState, useEffect } from 'react';

export const useWordCount = (content, wordsToAvoid = []) => {
  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    const words = content.split(/\s+/); // split by whitespace (space, tab, newline)
    let tempWordCount = words.length - 1;

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