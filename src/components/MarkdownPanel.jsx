import { LineNumber } from './MarkdownComponents/LineNumber';

export const MarkdownPanel = ({markdownText, setMarkdownText}) => {

  const handleMarkdownChange = (e) => {
    setMarkdownText(e.target.value);  
  }

  return (
    <>
      <div className="w-[50%] h-full bg-[#1B1B1B]">
        <LineNumber text={markdownText} />
        <textarea
          value={markdownText}
          onChange={handleMarkdownChange}
          placeholder="Markdown Starts Here ..."
        ></textarea>
      </div>
    </>
  );
}