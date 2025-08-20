import ReactMarkdown from 'react-markdown';
import { useMarkdownContentStore } from '../../stores/useMarkdownContentStore';
import { PreviewTag } from './PreviewTag';

export const LiveRenderingPanel = (): JSX.Element => {
  const markdownContent = useMarkdownContentStore((s) => s.markdownContent);

  return (
    <>
      {/* Visible preview (unchanged): hidden on small screens */}
      <div className="w-[50%] h-full overflow-y-hidden hidden md:flex flex-col">
        <PreviewTag />
        <ReactMarkdown
          className="w-full h-full px-2 overflow-y-scroll text-renderedContent"
        >
          {markdownContent}
        </ReactMarkdown>
      </div>

      {/* Offscreen export target: ALWAYS visible to DOM */}
      <div
        id="export-root"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          // put it off-canvas but still rendered
          transform: 'translateX(-10000px)',
          width: '800px',       // pick a fixed width you want to render at
          maxHeight: 'none',
          pointerEvents: 'none',
          opacity: 0,
          zIndex: -1,
          color: '#000',                // 🔹 force black text
          WebkitPrintColorAdjust: 'exact',
        }}
      >
        <ReactMarkdown
          // IMPORTANT: export-content is on this element
          className="export-content prose max-w-none px-4"
          components={{
            img: (props) => (
              <img
                {...props}
                crossOrigin="anonymous"
                referrerPolicy="no-referrer"
                style={{ maxWidth: '100%' }}
              />
            ),
            a: (props) => <a {...props} target="_blank" rel="noreferrer" />,
          }}
        >
          {markdownContent}
        </ReactMarkdown>
      </div>
    </>
  );
};
