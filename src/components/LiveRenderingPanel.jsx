export const LiveRenderingPanel = ({ renderedContent }) => {
  return (
    <>
      <div className="w-[50%] h-full bg-[#D9D9D9] px-2">
        {renderedContent}
      </div>
    </>
  );
}