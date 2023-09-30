import { ExportPDFButton } from './ExportPDFButton';

export const NavBar = () => {
  return (
    <>
      <div className="w-screen h-16 bg-[#212121] leading-loose flex flex-row justify-between px-5 py-3 absolute">
        <span className="font-bold">Markdown Editor</span>
        <ExportPDFButton />
        <span className="font-bold">Markdown Preview</span>
      </div>
    </>
  );
}