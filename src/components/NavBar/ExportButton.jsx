import { useState } from 'react';
import { useDocumentNameStore } from '../../stores/useDocumentNameStore';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const ExportButton = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  // documentName: for document exporting
  const documentName = useDocumentNameStore((state) => state.documentName);

  const handleExportToPDFClick = () => {
    setIsDownloading(true);
    const capture = document.querySelector('#export-content');
    html2canvas(capture).then((canvas) => {
      const imgData = canvas.toDataURL('img/png');
      const doc = new jsPDF('p', 'mm', 'a4', true);
      const contentWidth = doc.internal.pageSize.getWidth();
      const contentHeight = doc.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(contentWidth / imgWidth, contentHeight / imgHeight);
      const imgX = (contentWidth - imgWidth * ratio) / 2;
      const imgY = 5;
      doc.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      doc.save(`${documentName}.pdf`);
      setIsDownloading(false);
    })
  }

  return (
    <button className="font-custom btn rounded-md px-2 py-1 font-thin text-sm text-[#ffffff] bg-[#38404d] hover:bg-[#4c5769]" onClick={handleExportToPDFClick}>{isDownloading ? 'DOWNLOADING' : 'EXPORT TO PDF'}</button>
  );
}