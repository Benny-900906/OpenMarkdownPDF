import { useState, useEffect } from 'react';
import { useMarkdownContentStore } from '../../stores/useMarkdownContentStore';
import { useMarkdownToHTML } from '../../hooks/useMarkdownToHTML';
import { PreviewTag } from './PreviewTag';


export const LiveRenderingPanel = () => {
  const [renderedContent, setRenderedContent] = useState([]);
  const markdownContent = useMarkdownContentStore((state) => state.markdownContent);
  const tempRenderedContent = useMarkdownToHTML(markdownContent);

  useEffect(() => {
    setRenderedContent(tempRenderedContent);
  }, [ tempRenderedContent ])

  return (
    <div className="w-[50%] h-full overflow-y-hidden hidden md:flex flex-col">
      <PreviewTag />
      <div className="w-full h-full px-2 overflow-y-scroll" id="export-content">
        {renderedContent}
      </div>
    </div>
  );
}