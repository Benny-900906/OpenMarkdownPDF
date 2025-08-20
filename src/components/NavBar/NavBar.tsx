import { Logo } from './Logo'
import { ExportButton } from './ExportButton';
import { DocumentNameInput } from './DocumentNameInput';
import { ContentStats } from './ContentStats';

export const NavBar = () : JSX.Element => {
  return (
    <div className="w-full absolute">
      <div className="w-full bg-[#1A1A1A] flex flex-row justify-between px-4 py-5 md:px-16">
        <Logo />
        <ExportButton />
      </div>

      <div className="w-full bg-white flex flex-row justify-between px-3 py-4">
        <DocumentNameInput />
        <ContentStats />
      </div>
    </div>
  );
}