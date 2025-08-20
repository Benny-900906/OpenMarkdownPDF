import { useState } from "react";
import { useDocumentNameStore } from "../../stores/useDocumentNameStore";
import html2canvas from "html2canvas";
import { PDFDocument } from "pdf-lib";

const A4 = { widthPt: 595.28, heightPt: 841.89 };
const mmToPt = (mm: number) => mm * 2.834645669;

export const ExportButton = (): JSX.Element => {
  const [isDownloading, setIsDownloading] = useState(false);
  const documentName = useDocumentNameStore((s) => s.documentName) || "document";

  const handleExportToPDFClick = async () => {
    setIsDownloading(true);
    try {
      const el = document.querySelector('#export-root .export-content') as HTMLElement | null;
      if (!el) throw new Error('No export root found');

      // Measure before capture
      const sw = el.scrollWidth;
      const sh = el.scrollHeight;
      if (sw === 0 || sh === 0) {
        throw new Error(`Export element has 0 size: ${sw}x${sh}. Is it rendered?`);
      }

      // Expand so html2canvas captures all content
      const { height: oldH, width: oldW, overflow: oldO } = el.style;
      el.style.height = `${sh}px`;
      el.style.width = `${sw}px`;
      el.style.overflow = 'visible';

      const canvas = await html2canvas(el, {
        scale: Math.min(3 * window.devicePixelRatio, 6),
        scrollX: 0,
        scrollY: 0,
        windowWidth: sw,
        windowHeight: sh,
        useCORS: true,
        allowTaint: false,          // avoid tainted canvas -> blank PDF
        backgroundColor: '#ffffff', // make sure PDF isn't transparent/black
      });

      // restore styles
      el.style.height = oldH; el.style.width = oldW; el.style.overflow = oldO;


      if (!canvas.width || !canvas.height) {
        throw new Error(`html2canvas returned empty canvas: ${canvas.width}x${canvas.height}`);
      }

      const pdfDoc = await PDFDocument.create();
      const pdfW = A4.widthPt;
      const pdfH = A4.heightPt;

      const margin = mmToPt(10);
      const printableW = pdfW - margin * 2;
      const printableH = pdfH - margin * 2;

      // px -> pt scale based on width fit
      const ptPerPx = printableW / canvas.width;
      if (!isFinite(ptPerPx) || ptPerPx <= 0) {
        throw new Error(`Bad ptPerPx: ${ptPerPx}, canvas width: ${canvas.width}`);
      }

      const pagePxH = Math.max(1, Math.floor(printableH / ptPerPx)); // at least 1px
      let yOffset = 0;
      const overlapPx = 2; // keeps a couple px overlap between pages

      while (yOffset < canvas.height) {
        const remaining = canvas.height - yOffset;

        // 🔒 If what's left is only the overlap (or less), stop — it's redundant.
        if (remaining <= overlapPx + 1) break;

        const sliceHeightPx = Math.min(pagePxH, remaining);

        const pageCanvas = document.createElement("canvas");
        pageCanvas.width = canvas.width;
        pageCanvas.height = sliceHeightPx;

        const ctx = pageCanvas.getContext("2d")!;
        ctx.drawImage(
          canvas,
          0, yOffset,
          canvas.width, sliceHeightPx,
          0, 0,
          canvas.width, sliceHeightPx
        );

        const dataUrl = pageCanvas.toDataURL("image/png");
        const png = await pdfDoc.embedPng(dataUrl);

        const drawW = printableW;
        const drawH = sliceHeightPx * ptPerPx;

        const page = pdfDoc.addPage([pdfW, pdfH]);
        page.drawImage(png, {
          x: margin,
          y: pdfH - margin - drawH,
          width: drawW,
          height: drawH,
        });

        // ✅ If that was the last *real* page, finish; otherwise advance with overlap.
        if (remaining <= pagePxH) {
          yOffset = canvas.height;            // done (prevents a tiny extra page)
        } else {
          yOffset += Math.max(1, sliceHeightPx - overlapPx);
        }
      }



      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${documentName}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
      alert(`Failed to export PDF: ${(e as Error).message}`);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <button
      className="font-custom btn rounded-md px-2 py-1 font-medium text-sm text-white bg-zinc-700 hover:bg-zinc-500 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:opacity-80"
      onClick={handleExportToPDFClick}
      disabled={isDownloading}
    >
      {isDownloading ? "DOWNLOADING" : "EXPORT AS PDF"}
    </button>
  );
};
