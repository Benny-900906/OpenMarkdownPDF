import { create } from 'zustand';

export const useMarkdownContentStore = create((set) => ({
  markdownContent: '',
  setMarkdownContent: (content) => set({ markdownContent: content }),
}));