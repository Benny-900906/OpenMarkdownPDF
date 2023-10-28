import { useState, useEffect } from 'react';

export const useCharCount = (content, charactersToAvoid = []) => {
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    // string form
    const contentWithoutSpaces = content.replace(/\s/g, '')
    // array form
    const contentCharacters = contentWithoutSpaces.split('');
    let tempCharCount = contentCharacters.length;

    contentCharacters.forEach((char) => {
      if (charactersToAvoid.includes(char)) {
        tempCharCount --;
      }
    })

    // array form
    const matchMarkdownLinks = contentWithoutSpaces.match(/\([^)]+\)/g);

    if (matchMarkdownLinks) {
      const extractedLinks = matchMarkdownLinks.map(match => match.slice(1, -1));
      extractedLinks.forEach((extractedLink) => {
        // the number 4 comes from the square brackets [] and the parenthesis ()
        tempCharCount = tempCharCount - extractedLink.length - 4;
      });
    }

    setCharCount(tempCharCount);
  }, [content]);

  return charCount;
}