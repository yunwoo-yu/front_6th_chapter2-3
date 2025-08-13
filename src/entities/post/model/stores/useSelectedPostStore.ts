import { Post } from "@entities/post"
import { create } from "zustand"

interface SelectedPostStore {
  selectedPost: Post | null
  isOpenPostDetail: boolean
  actions: {
    setSelectedPost: (post: Post) => void
    setIsOpenPostDetail: (isOpen: boolean) => void
  }
}

export const useSelectedPostStore = create<SelectedPostStore>((set) => ({
  selectedPost: null,
  isOpenPostDetail: false,
  actions: {
    setSelectedPost: (post) => set({ selectedPost: post }),
    setIsOpenPostDetail: (isOpen) => set({ isOpenPostDetail: isOpen }),
  },
}))
