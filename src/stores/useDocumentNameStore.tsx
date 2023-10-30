import { create } from 'zustand';

interface DocumentNameState {
  documentName: string;
  setDocumentName: (filename : string) => void;
}

export const useDocumentNameStore = create<DocumentNameState>((set) => ({
  documentName: 'untitled',
  setDocumentName: (filename : string) => set({ documentName: filename }),
}));