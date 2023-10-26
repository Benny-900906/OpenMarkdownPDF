import { useState, useEffect } from 'react';
import { useRenderedContentStore } from '../../stores/useRenderedContentStore';

export const NavBar = () => {

  const renderedContent = useRenderedContentStore((state) => state.renderedContent);
  const [docName, setDocName] = useState("untitled");
  const [readingTime, setReadingTime] = useState(0);
  const [numOfWords, setNumOfWords] = useState(0);
  const [numOfChars, setNumOfChars] = useState(0);

  const handleDocNameChange = (e) => {
    setDocName(e.target.value);
  }

  useEffect(() => {

  }, [renderedContent]);
  
  return (
    <>
     <div className="w-full absolute">
      <div className="w-full bg-[#465162] flex flex-row justify-between px-16 py-5">
        {/* logo */}
        <span className="text-[#ffffff] font-bold">GENERATR</span>
        {/* export options */}
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn m-1 font-thin text-sm text-[#a8a8a8]">EXPORT AS</label>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 hidden">
            <li><a>HTML</a></li>
            <li><a>PDF</a></li>
          </ul>
        </div>
      </div>

      <div className="w-full bg-[#ffffff] flex flex-row justify-between px-3 py-4 gap-2">
        {/* document name  */}
        <div className="w-[75%] flex flex-col">
          <span className="text-[#000000] text-sm font-thin px-2">DOCUMENT NAME</span>
          <input 
            placeholder="untitled"
            className="p-2 outline-none text-[#000000] text-md bg-transparent"
            value={docName}
            onChange={handleDocNameChange}
          />
        </div>

        {/* reading time, words, characters */}
        <div className="w-[15%] flex flex-wrap gap-3">
          <span className="text-[#7b7b7b] text-xs font-thin">READING TIME: <span className="text-[#000000]">{readingTime}</span></span>
          <span className="text-[#7b7b7b] text-xs font-thin">WORDS: <span className="text-[#000000]">{numOfWords}</span></span>
          <span className="text-[#7b7b7b] text-xs font-thin">CHARACTERS: <span className="text-[#000000]">{numOfChars}</span></span>
        </div>
      </div>
     </div>
    </>
  );
}