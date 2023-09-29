import { LiveRenderingPanel } from '../components/LiveRenderingPanel';
import { MarkdownPanel } from '../components/MarkdownPanel';

export const Markdown = () => {
  return (
    <>
      <div>
        <MarkdownPanel />
        <LiveRenderingPanel />
      </div>
    </>
  )
}