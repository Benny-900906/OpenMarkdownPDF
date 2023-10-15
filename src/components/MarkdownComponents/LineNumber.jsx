export const LineNumber = ({ text, scrollTop }) => {
  const lines = text.split('\n');

  const lineNumberStyle = {
    marginTop: `-${scrollTop}px`,
  }
  
  return (
    <div className="line-number" style={lineNumberStyle}>
      {lines.map((_, index) => (
        <div key={index}>{index + 1}</div>
      ))}
    </div>
  );
}