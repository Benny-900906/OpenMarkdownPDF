import { create } from 'zustand';

interface MarkdownContentState {
  markdownContent: string;
  markdownPrefixes : string[];
  markdownCharacters : string[];
  setMarkdownContent : (content : string) => void;
}

export const useMarkdownContentStore = create<MarkdownContentState>((set) => ({
  markdownContent: '',
  markdownPrefixes: ['#', '##', '###', '-', '```'],
  markdownCharacters: ['#', '-', '`'],
  setMarkdownContent: (content : string) => set({ markdownContent: content }),
}));