import { LiveRenderingPanel } from '../components/LiveRenderingPanel';
import { MarkdownPanel } from '../components/MarkdownPanel';
import { NavBar } from '../components/NavBar';
import { useState } from 'react';

export const Markdown = () => {

  const [renderedContent, setRenderedContent] = useState(<></>);

  return (
    <>
      <div className="w-screen h-screen bg-[#000000] relative">
        <NavBar renderedContent={renderedContent} />
        <div className="w-full h-full bg-white pt-16 flex flex-row">
          <MarkdownPanel setRenderedContent={setRenderedContent} />
          <LiveRenderingPanel renderedContent={renderedContent} />
        </div>
      </div>
    </>
  )
}