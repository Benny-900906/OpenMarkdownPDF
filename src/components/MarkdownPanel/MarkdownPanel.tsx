import Editor from '@monaco-editor/react';
import { MarkdownTag } from './MarkdownTag';
import { useMarkdownContentStore } from '../../stores/useMarkdownContentStore';

export const MarkdownPanel = () : JSX.Element => {
  // defaultValue
  const markdownContent = useMarkdownContentStore((state) => state.markdownContent);
  // markdownContent Setter
  const setMarkdownContent = useMarkdownContentStore((state) => state.setMarkdownContent);

  const handleEditorChange = (value : string) => {
    setMarkdownContent(value);
  }

  return (
    <div className="w-full md:w-[50%] h-full overflow-y-hidden flex flex-col">
      <MarkdownTag />
      <div className="w-full h-full overflow-y-hidden flex flex-row">
        <Editor 
          height="100%"
          width="100%"
          padding-inline="2rem"
          theme="vs-dark"
          defaultLanguage="markdown"
          defaultValue={markdownContent}
          onChange={handleEditorChange}
        />
      </div>
    </div>
  );
}