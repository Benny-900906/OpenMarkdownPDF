import { create } from 'zustand';

export const useMarkdownContentStore = create((set) => ({
  markdownContent: '',
  markdownPrefixes: ['#', '##', '###', '-', '```'],
  markdownCharacters: ['#', '-', '`'],
  setMarkdownContent: (content) => set({ markdownContent: content }),
}));