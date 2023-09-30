export const ExportPDFButton = () => {

  const handleExport = (e) => {
    e.preventDefault();
    // ... Export to PDF Logic
  }

  return (
    <>
      <button className="font-bold text-[#204029] text-md bg-[#D9D9D9] rounded-lg px-6 hover:cursor-pointer hover:scale-105 hover:bg-[#ECECEC]" onClick={handleExport}>EXPORT</button>
    </>
  );
}