import { useState } from 'react';
import { useDocumentNameStore } from '../../stores/useDocumentNameStore';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const ExportButton = () : JSX.Element => {
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  // documentName: for document exporting
  const documentName : string = useDocumentNameStore((state) => state.documentName);

  const handleExportToPDFClick = () => {
    setIsDownloading(true);
    const capture : HTMLElement = document.querySelector('.export-content')!;
    html2canvas(capture).then((canvas) => {
      const imgData : string = canvas.toDataURL('img/png');
      const doc : jsPDF = new jsPDF('p', 'mm', 'a4', true);
      const contentWidth : number = doc.internal.pageSize.getWidth();
      const contentHeight : number = doc.internal.pageSize.getHeight();
      const imgWidth : number = canvas.width;
      const imgHeight : number = canvas.height;
      const ratio : number = Math.min(contentWidth / imgWidth, contentHeight / imgHeight);
      const imgX : number = (contentWidth - imgWidth * ratio) / 2;
      const imgY : number = 5;
      doc.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      doc.save(`${documentName}.pdf`);
      setIsDownloading(false);
    })
  }

  return (
    <button className="font-custom btn rounded-md px-2 py-1 font-thin text-sm text-[#ffffff] bg-[#38404d] hover:bg-[#4c5769]" onClick={handleExportToPDFClick}>{isDownloading ? 'DOWNLOADING' : 'EXPORT AS PDF'}</button>
  );
}