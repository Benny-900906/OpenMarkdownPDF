import { useExportToPDF } from '../hooks/useExportToPDF';

export const ExportPDFButton = ({ renderedContent }) => {

  const { exportToPDF, setFilename } = useExportToPDF();

  const handleExportClick = (e) => {
    e.preventDefault();
    // triggers a modal that asks for the filename
    exportToPDF(renderedContent);
  }

  return (
    <>
      <button className="font-bold text-[#204029] text-md bg-[#D9D9D9] rounded-lg px-6 hover:cursor-pointer hover:scale-105 hover:bg-[#ECECEC]" onClick={handleExportClick}>EXPORT</button>
    </>
  );
}