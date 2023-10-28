import { useEffect } from 'react';
import { useRenderedContentStore } from '../../stores/useRenderedContentStore';
import { useReadingTime } from '../../hooks/useReadingTime';
import { useWordCount } from '../../hooks/useWordCount';
import { useCharCount } from '../../hooks/useCharCount';

export const ContentStats = () => {
  const renderedContent = useRenderedContentStore((state) => state.renderedContent);
  const readingTime = useReadingTime(renderedContent);
  const wordCount = useWordCount(renderedContent);
  const charCount = useCharCount(renderedContent);

  useEffect(() => {

  }, [renderedContent]);

  return (
    <div className="w-[15%] flex flex-wrap gap-3">
      <span className="font-custom text-[#7b7b7b] text-xs font-thin">READING TIME: <span className="text-[#000000]">{readingTime}</span></span>
      <span className="font-custom text-[#7b7b7b] text-xs font-thin">WORDS: <span className="text-[#000000]">{wordCount}</span></span>
      <span className="font-custom text-[#7b7b7b] text-xs font-thin">CHARACTERS: <span className="text-[#000000]">{charCount}</span></span>
    </div>
  );
}