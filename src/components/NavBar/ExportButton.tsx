import { useState } from 'react';
import { useDocumentNameStore } from '../../stores/useDocumentNameStore';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const ExportButton = () : JSX.Element => {
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  // documentName: for document exporting
  const documentName : string = useDocumentNameStore((state) => state.documentName);

  const handleExportToPDFClick = async () => {
  setIsDownloading(true);
  const el = document.querySelector('.export-content') as HTMLElement;
  if (!el) return;

  // 1) Expand so html2canvas can see everything
  const { height: oldH, width: oldW, overflow: oldO } = el.style;
  el.style.height   = `${el.scrollHeight}px`;
  el.style.width    = `${el.scrollWidth}px`;
  el.style.overflow = 'visible';

  const canvas = await html2canvas(el, {
    scale: window.devicePixelRatio * 3,
    scrollX: -window.scrollX,
    scrollY: -window.scrollY,
    windowWidth: el.scrollWidth,
    windowHeight: el.scrollHeight,
    useCORS: true,
    allowTaint: true,
  });

  // restore
  el.style.height   = oldH;
  el.style.width    = oldW;
  el.style.overflow = oldO;

  const pdf = new jsPDF('p', 'mm', 'a4', true);
  const pdfW = pdf.internal.pageSize.getWidth();
  const pdfH = pdf.internal.pageSize.getHeight();

  // 2) set your margin (mm)
  const margin = 10;
  const printableW = pdfW - margin * 2;
  const printableH = pdfH - margin * 2;

  // 3) compute scale & how many px per page
  const scale       = printableW / canvas.width;
  const pagePxH     = printableH / scale;

  let yOffset = 0;
  let pageNum = 0;

  // 4) slice & paginate
  while (yOffset < canvas.height) {
    // create a sub-canvas for one “page” worth of content
    const pageCanvas = document.createElement('canvas');
    pageCanvas.width  = canvas.width;
    pageCanvas.height = Math.min(pagePxH, canvas.height - yOffset);

    const ctx = pageCanvas.getContext('2d')!;
    ctx.drawImage(
      canvas,
      0, yOffset,
      canvas.width, pageCanvas.height,
      0, 0,
      canvas.width, pageCanvas.height
    );

    const imgData = pageCanvas.toDataURL('image/png');

    if (pageNum > 0) pdf.addPage();
    // place the image at [margin, margin], scaled to printableW x (pageCanvas.height * scale)
    pdf.addImage(
      imgData,
      'PNG',
      margin,                // x
      margin,                // y
      printableW,            // width
      pageCanvas.height * scale  // height
    );

    yOffset += pagePxH;
    pageNum++;
  }

  pdf.save(`${documentName}.pdf`);
  setIsDownloading(false);
};

  return (
    <button className="font-custom btn rounded-md px-2 py-1 font-thin text-sm text-[#ffffff] bg-[#38404d] hover:bg-[#4c5769]" onClick={handleExportToPDFClick}>{isDownloading ? 'DOWNLOADING' : 'EXPORT AS PDF'}</button>
  );
}