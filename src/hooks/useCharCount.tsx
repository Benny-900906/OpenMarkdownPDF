import { useState, useEffect } from 'react';

export const useCharCount = (content : string, charactersToAvoid : string[] = []) : number => {
  const [charCount, setCharCount] = useState<number>(0);

  useEffect(() => {
    // string form
    const contentWithoutSpaces : string = content.replace(/\s/g, '')
    // array form
    const contentCharacters : string[] = contentWithoutSpaces.split('');
    let tempCharCount : number = contentCharacters.length;

    contentCharacters.forEach((char) => {
      if (charactersToAvoid.includes(char)) {
        tempCharCount --;
      }
    })

    // array form
    const matchMarkdownLinks : string[] = contentWithoutSpaces.match(/\([^)]+\)/g)!;

    if (matchMarkdownLinks) {
      const extractedLinks : string[] = matchMarkdownLinks.map(match => match.slice(1, -1));
      extractedLinks.forEach((extractedLink) => {
        // the number 4 comes from the square brackets [] and the parenthesis ()
        tempCharCount = tempCharCount - extractedLink.length - 4;
      });
    }

    setCharCount(tempCharCount);
  }, [content]);

  return charCount;
}