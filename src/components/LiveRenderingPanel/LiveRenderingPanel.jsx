import { useRenderedContentStore } from '../../stores/useRenderedContentStore';
import { nanoid } from 'nanoid';

export const LiveRenderingPanel = () => {
  const renderedContent = useRenderedContentStore((state) => state.renderedContent);

  return (
    <>
      <div className="w-[50%] h-full overflow-y-hidden flex flex-col">
        <span className="font-custom block w-full px-3 py-2 text-[#000000] border text-xs font-thin text-right">PREVIEW</span>
        <div className="w-full h-full px-2 overflow-y-scroll">
          {renderedContent}
        </div>
      </div>
    </>
  );
}