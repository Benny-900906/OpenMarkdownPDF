import { create } from 'zustand';

export const useRenderedContentStore = create((set) => ({
  renderedContent: <></>,
  setRenderedContent: (content) => set({ renderedContent: content }),
}));