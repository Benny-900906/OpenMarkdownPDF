import { FC } from "react";

interface LineNumberProps {
  content : string;
  scrollTop : number;
}

interface LineNumberStyle {
  marginTop : string;
} 

export const LineNumber : FC<LineNumberProps> = ({ content, scrollTop }) : JSX.Element => {
  const lines : string[] = content.split('\n');

  const lineNumberStyle : LineNumberStyle = {
    marginTop: `-${scrollTop}px`,
  }
  
  return (
    <div className="line-number bg-[#3b3b3b] pl-5 pr-3" style={lineNumberStyle}>
      {lines.map((_, index) => (
        <div className="font-custom text-[#666666] text-md text-right w-6" key={index}>{index + 1}</div>
      ))}
    </div>
  );
}