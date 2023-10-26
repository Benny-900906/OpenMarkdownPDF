export const LineNumber = ({ text, scrollTop }) => {
  const lines = text.split('\n');

  const lineNumberStyle = {
    marginTop: `-${scrollTop}px`,
  }
  
  return (
    <div className="line-number bg-[#3b3b3b] pl-5 pr-3" style={lineNumberStyle}>
      {lines.map((_, index) => (
        <div className="text-[#666666] text-md text-right w-6" key={index}>{index + 1}</div>
      ))}
    </div>
  );
}