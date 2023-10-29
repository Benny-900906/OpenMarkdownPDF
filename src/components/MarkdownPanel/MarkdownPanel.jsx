import { LineNumber } from './LineNumber';
import { useState } from 'react';
import { useMarkdownContentStore } from '../../stores/useMarkdownContentStore';
import { MarkdownTag } from './MarkdownTag'

export const MarkdownPanel = () => {
  const [scrollTop, setScrollTop] = useState(0);
  const markdownContent = useMarkdownContentStore((state) => state.markdownContent);
  const setMarkdownContent = useMarkdownContentStore((state) => state.setMarkdownContent);

  const handleMarkdownChange = (e) => {
    setMarkdownContent(e.target.value);
  }

  const handleTextareaScroll = (e) => {
    setScrollTop(e.target.scrollTop);
  }

  return (
    <div className="w-full md:w-[50%] h-full overflow-y-hidden flex flex-col">
      <MarkdownTag />
      <div className="w-full h-full overflow-y-hidden flex flex-row">
        <LineNumber content={markdownContent} scrollTop={scrollTop} />
        <textarea
          className="resize-none w-full h-full focus:outline-none px-2 bg-[#1B1B1B] overflow-y-scroll"
          value={markdownContent}
          onChange={handleMarkdownChange}
          onScroll={handleTextareaScroll}
          placeholder=""
        ></textarea>
      </div>
    </div>
  );
}