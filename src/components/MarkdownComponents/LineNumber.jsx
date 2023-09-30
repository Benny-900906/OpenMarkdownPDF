export const LineNumber = ({ text }) => {
  const lines = text.split('\n');
  
  return (
    <div className="line-number">
      {lines.map((_, index) => (
        <div key={index}>{index + 1}</div>
      ))}
    </div>
  );
}