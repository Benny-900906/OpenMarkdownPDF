import { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';

export const useExportToPDF = () => {
  const [filename, setFilename] = useState('untitled.pdf');

  const exportToPDF = (renderedContent) => {
    const doc = new jsPDF();

    // Create a function to capture the HTML content and convert it to an image
    const captureHTMLAsImage = async (e) => {
      const canvas = await html2canvas(e);
      const imgData = canvas.toDataURL('image/png');
      return imgData;
    }

    doc.setProperties({ title: filename });

    // loop thru the array of HTML elements
    renderedContent.forEach(async (e, index) => {
      const imgData = await captureHTMLAsImage(e);

      // add the image to the pdf document
      if (index > 0) {
        doc.addPage();
      }
      doc.addImage(imgData, 'PNG', 10, 10, 180, 0);
    });

    // save the file with the user defined filename
    doc.save(filename);
  }

  return { exportToPDF, setFilename };
}