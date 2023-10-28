import { useMarkdownContentStore } from '../../stores/useMarkdownContentStore';
import { useReadingTime } from '../../hooks/useReadingTime';
import { useWordCount } from '../../hooks/useWordCount';
import { useCharCount } from '../../hooks/useCharCount';

export const ContentStats = () => {
  const markdownContent = useMarkdownContentStore((state) => state.markdownContent);
  const markdownPrefixes = useMarkdownContentStore((state) => state.markdownPrefixes);
  const markdownCharacters = useMarkdownContentStore((state) => state.markdownCharacters);
  const readingTime = useReadingTime(markdownContent, markdownPrefixes);
  const wordCount = useWordCount(markdownContent, markdownPrefixes);
  const charCount = useCharCount(markdownContent, markdownCharacters);

  return (
    <div className="w-[15%] flex flex-wrap gap-3">
      <span className="font-custom text-[#7b7b7b] text-xs font-thin">READING TIME: <span className="text-[#000000]">{readingTime}</span> m</span>
      <span className="font-custom text-[#7b7b7b] text-xs font-thin">WORDS: <span className="text-[#000000]">{wordCount}</span></span>
      <span className="font-custom text-[#7b7b7b] text-xs font-thin">CHARACTERS: <span className="text-[#000000]">{charCount}</span></span>
    </div>
  );
}