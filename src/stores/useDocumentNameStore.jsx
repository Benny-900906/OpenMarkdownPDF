import { create } from 'zustand';

export const useDocumentNameStore = create((set) => ({
  documentName: 'untitled',
  setDocumentName: (filename) => set({ documentName: filename }),
}));