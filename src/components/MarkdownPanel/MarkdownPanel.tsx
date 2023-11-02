import { LineNumber } from './LineNumber';
import { useState } from 'react';
import { useMarkdownContentStore } from '../../stores/useMarkdownContentStore';
import { MarkdownTag } from './MarkdownTag'

export const MarkdownPanel = () : JSX.Element => {
  const [scrollTop, setScrollTop] = useState<number>(0);
  const markdownContent : string = useMarkdownContentStore((state) => state.markdownContent);
  const setMarkdownContent : (content : string) => void = useMarkdownContentStore((state) => state.setMarkdownContent);

  const handleMarkdownChange = (e : React.ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdownContent(e.target.value);
  }

  const handleTextareaScroll = (e : React.UIEvent<HTMLTextAreaElement>) => {
    setScrollTop(e.currentTarget.scrollTop);
  }

  return (
    <div className="w-full md:w-[50%] h-full overflow-y-hidden flex flex-col">
      <MarkdownTag />
      <div className="w-full h-full overflow-y-hidden flex flex-row">
        <LineNumber content={markdownContent} scrollTop={scrollTop} />
        <textarea
          className="resize-none w-full h-full focus:outline-none px-2 bg-[#1B1B1B] overflow-y-scroll text-markdownContent"
          value={markdownContent}
          onChange={handleMarkdownChange}
          onScroll={handleTextareaScroll}
          placeholder=""
        ></textarea>
      </div>
    </div>
  );
}