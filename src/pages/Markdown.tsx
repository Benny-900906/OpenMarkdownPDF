import { LiveRenderingPanel } from '../components/LiveRenderingPanel/LiveRenderingPanel';
import { MarkdownPanel } from '../components/MarkdownPanel/MarkdownPanel';
import { NavBar } from '../components/NavBar/NavBar';

export const Markdown = () => {
  return (
    <div className="w-screen h-screen bg-[#000000] relative">
      <NavBar />
      <div className="w-full h-full bg-white flex flex-row pt-40">
        <MarkdownPanel />
        <LiveRenderingPanel />
      </div>
    </div>
  )
}