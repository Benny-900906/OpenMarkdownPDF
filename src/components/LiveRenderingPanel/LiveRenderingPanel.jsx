import { useRenderedContentStore } from '../../stores/useRenderedContentStore';

export const LiveRenderingPanel = () => {
  const renderedContent = useRenderedContentStore((state) => state.renderedContent);

  return (
    <>
      <div className="w-[50%] h-full bg-[#D9D9D9] px-2">
        {renderedContent}
      </div>
    </>
  );
}