import { useState, useEffect } from 'react';
import { useMarkdownContentStore } from '../../stores/useMarkdownContentStore';
import { useMarkdownToHTML } from '../../hooks/useMarkdownToHTML';

export const LiveRenderingPanel = () => {
  const [renderedContent, setRenderedContent] = useState([]);
  const markdownContent = useMarkdownContentStore((state) => state.markdownContent);
  const tempRenderedContent = useMarkdownToHTML(markdownContent);

  useEffect(() => {
    setRenderedContent(tempRenderedContent);
  }, [ tempRenderedContent ])

  return (
    <div className="w-[50%] h-full overflow-y-hidden flex flex-col">
      <span className="font-custom block w-full px-3 py-2 text-[#000000] border text-xs font-thin text-right">PREVIEW</span>
      <div className="w-full h-full px-2 overflow-y-scroll" id="export-content">
        {renderedContent}
      </div>
    </div>
  );
}