import { useState, useEffect, useRef } from 'react';
import { useRenderedContentStore } from '../../stores/useRenderedContentStore';

export const ExportButton = () => {
  const [isFocused, setIsFocused] = useState(false);
  const renderedContent = useRenderedContentStore((state) => state.renderedContent);
  const buttonRef = useRef(null);

  // close the export options when clicking outside the `EXPORT AS` button 
  useEffect(() => {
    const handleOutOfFocusClick = (e) => {
      if (buttonRef.current && !buttonRef.current.contains(e.target)) {
        if (isFocused) {
          setIsFocused(false);
        }
      }
    }

    document.addEventListener('click', handleOutOfFocusClick);

    return () => {
      document.addEventListener('click', handleOutOfFocusClick);
    }
  }, []);

  const handleExportBtnClick = () => {
    // toggle `EXPORT AS` button
    setIsFocused(!isFocused);
  }

  const handleExportToPDFClick = () => {

  }

  const handleExportToHTMLClick = () => {

  }


  return (
    <div className="relative">
      <button ref={buttonRef} className="font-custom btn rounded-md px-2 py-1 font-thin text-sm text-[#ffffff] bg-[#38404d] hover:bg-[#4c5769]" onClick={handleExportBtnClick}>EXPORT AS</button>
      <div className={`p-2 bg-base-100 w-28 mt-1 absolute flex flex-col gap-2 rounded ${isFocused ? 'block' : 'hidden'}`}>
        <button className="py-2 px-1 font-custom text-[#ffffff] hover:bg-[#2d3c51] font-normal text-sm rounded-sm text-left">PDF</button>
        <button className="py-2 px-1 font-custom text-[#ffffff] hover:bg-[#2d3c51] font-normal text-sm rounded-sm text-left">HTML</button>
      </div>
    </div>
  );
}