import ReactMarkdown from 'react-markdown';
import { useMarkdownContentStore } from '../../stores/useMarkdownContentStore';
import { PreviewTag } from './PreviewTag';

export const LiveRenderingPanel = () : JSX.Element => {
  const markdownContent : string = useMarkdownContentStore((state) => state.markdownContent);

  return (
    <div className="w-[50%] h-full overflow-y-hidden hidden md:flex flex-col">
      <PreviewTag />
      <ReactMarkdown 
        className="w-full h-full px-2 overflow-y-scroll text-renderedContent export-content">
        {markdownContent}
      </ReactMarkdown>
    </div>
  );
}