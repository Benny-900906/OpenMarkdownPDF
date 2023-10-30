import { useMarkdownContentStore } from '../../stores/useMarkdownContentStore';
import { useReadingTime } from '../../hooks/useReadingTime';
import { useWordCount } from '../../hooks/useWordCount';
import { useCharCount } from '../../hooks/useCharCount';

export const ContentStats = () => {
  const markdownContent : string = useMarkdownContentStore((state) => state.markdownContent);
  const markdownPrefixes : string[] = useMarkdownContentStore((state) => state.markdownPrefixes);
  const markdownCharacters : string[] = useMarkdownContentStore((state) => state.markdownCharacters);
  const readingTime : number = useReadingTime(markdownContent, markdownPrefixes);
  const wordCount : number = useWordCount(markdownContent, markdownPrefixes);
  const charCount : number = useCharCount(markdownContent, markdownCharacters);

  return (
    <div className="w-[40%] md:w-[20%] lg:w-[15%] flex flex-wrap gap-3">
      <span className="font-custom text-[#7b7b7b] text-xs font-thin">READING TIME: <span className="text-[#000000]">{readingTime}</span> m</span>
      <span className="font-custom text-[#7b7b7b] text-xs font-thin">WORDS: <span className="text-[#000000]">{wordCount}</span></span>
      <span className="font-custom text-[#7b7b7b] text-xs font-thin">CHARACTERS: <span className="text-[#000000]">{charCount}</span></span>
    </div>
  );
}