import { Logo } from './Logo'
import { ExportButton } from './ExportButton';
import { DocumentNameInput } from './DocumentNameInput';
import { ContentStats } from './ContentStats';

export const NavBar = () => {
  return (
    <div className="w-full absolute">
      <div className="w-full bg-[#465162] flex flex-row justify-between px-16 py-5">
        <Logo />
        <ExportButton />
      </div>

      <div className="w-full bg-[#ffffff] flex flex-row justify-between px-3 py-4 gap-2">
        <DocumentNameInput />
        <ContentStats />
      </div>
    </div>
  );
}