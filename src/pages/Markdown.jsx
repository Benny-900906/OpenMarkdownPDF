import { LiveRenderingPanel } from '../components/LiveRenderingPanel';
import { MarkdownPanel } from '../components/MarkdownPanel';
import { NavBar } from '../components/NavBar';
import { useState } from 'react';

export const Markdown = () => {
  const [markdownText, setMarkdownText] = useState('');

  return (
    <>
      <div className="w-screen h-screen bg-[#000000] relative">
        <NavBar />
        <div className="w-full h-full bg-white pt-16 flex flex-row">
          <MarkdownPanel markdownText={markdownText} setMarkdownText={setMarkdownText} />
          <LiveRenderingPanel markdownText={markdownText} setMarkdownText={setMarkdownText} />
        </div>
      </div>
    </>
  )
}