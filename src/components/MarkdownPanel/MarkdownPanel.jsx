import { LineNumber } from './LineNumber';
import { useState, useEffect } from 'react';
import { useMarkdownToHTML } from '../../hooks/useMarkdownToHTML';
import { useMarkdownContentStore } from '../../stores/useMarkdownContentStore';
import { useRenderedContentStore } from '../../stores/useRenderedContentStore';

export const MarkdownPanel = () => {
  
  const [scrollTop, setScrollTop] = useState(0);
  const markdownContent = useMarkdownContentStore((state) => state.markdownContent);
  const setMarkdownContent = useMarkdownContentStore((state) => state.setMarkdownContent);

  // move renderedContent, setRenderedContent, useEffect to LiveRenderingPanel,
  // we could remove useRenderedContentStore, because the renderedContent state will only be used in the LiveRenderingPanel component
  const renderedContent = useMarkdownToHTML(markdownContent);
  const setRenderedContent = useRenderedContentStore((state) => state.setRenderedContent);

  useEffect(() => {
    setRenderedContent(renderedContent);
  }, [renderedContent]);

  

  const handleMarkdownChange = (e) => {
    setMarkdownContent(e.target.value);
  }

  const handleTextareaScroll = (e) => {
    setScrollTop(e.target.scrollTop);
  }

  return (
    <div className="w-[50%] h-full overflow-y-hidden flex flex-col">
      <span className="font-custom block w-full px-3 py-2 text-[#000000] border text-xs font-thin">MARKDOWN</span>
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