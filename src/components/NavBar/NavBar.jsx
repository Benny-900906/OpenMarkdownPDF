import { useState, useEffect } from 'react';
import { useRenderedContentStore } from '../../stores/useRenderedContentStore';
import { useReadingTime } from '../../hooks/useReadingTime';
import { useWordCount } from '../../hooks/useWordCount';
import { useCharCount } from '../../hooks/useCharCount';
import { Logo } from './Logo'
import { ExportButton } from './ExportButton';

export const NavBar = () => {

  const renderedContent = useRenderedContentStore((state) => state.renderedContent);
  const [docName, setDocName] = useState("untitled");
  const readingTime = useReadingTime(renderedContent);
  const wordCount = useWordCount(renderedContent);
  const charCount = useCharCount(renderedContent);

  const handleDocNameChange = (e) => {
    setDocName(e.target.value);
  }

  useEffect(() => {

  }, [renderedContent]);
  
  return (
    <>
     <div className="w-full absolute">
      <div className="w-full bg-[#465162] flex flex-row justify-between px-16 py-5">
        <Logo />
        <ExportButton />
      </div>

      <div className="w-full bg-[#ffffff] flex flex-row justify-between px-3 py-4 gap-2">
        {/* document name  */}
        {/* turn this into one functional component */}
        <div className="w-[75%] flex flex-col">
          <span className="font-custom text-[#000000] text-sm font-thin px-2">DOCUMENT NAME</span>
          <input 
            placeholder="untitled"
            className="font-custom p-2 outline-none text-[#000000] text-md font-normal bg-transparent"
            value={docName}
            onChange={handleDocNameChange}
          />
        </div>

        {/* reading time, words, characters */}
        {/* turn this into one functional component */}
        <div className="w-[15%] flex flex-wrap gap-3">
          <span className="font-custom text-[#7b7b7b] text-xs font-thin">READING TIME: <span className="text-[#000000]">{readingTime}</span></span>
          <span className="font-custom text-[#7b7b7b] text-xs font-thin">WORDS: <span className="text-[#000000]">{wordCount}</span></span>
          <span className="font-custom text-[#7b7b7b] text-xs font-thin">CHARACTERS: <span className="text-[#000000]">{charCount}</span></span>
        </div>
      </div>
     </div>
    </>
  );
}