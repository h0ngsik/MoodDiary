import { create } from "zustand";
import { Photo, PhotoState } from "@/types/photo";

const STORAGE_KEY = "photo-gallery";

// localStorage에서 데이터 로드
const loadPhotosFromStorage = (): Photo[] => {
  if (typeof window === "undefined") return [];

  const saved = localStorage.getItem(STORAGE_KEY);
  return saved ? JSON.parse(saved) : [];
};

// localStorage에 데이터 저장
const savePhotosToStorage = (photos: Photo[]) => {
  if (typeof window === "undefined") return;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(photos));
};

interface PhotoStore extends PhotoState {
  addPhoto: (photo: Photo) => void;
  fetchPhotos: () => Promise<void>;
  fetchMorePhotos: () => Promise<void>;
  setLoading: (isLoading: boolean) => void;
  resetPage: () => void;
}

export const usePhotoStore = create<PhotoStore>((set, get) => ({
  photos: [],
  hasMore: true,
  isLoading: false,
  page: 1,

  addPhoto: (photo) => {
    set((state) => {
      const newPhotos = [photo, ...state.photos];
      savePhotosToStorage(newPhotos);
      return { photos: newPhotos };
    });
  },

  fetchPhotos: async () => {
    set({ isLoading: true });
    try {
      const savedPhotos = loadPhotosFromStorage();
      set({ photos: savedPhotos, page: 1 });
    } catch (error) {
      console.error("Failed to fetch photos:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  fetchMorePhotos: async () => {
    const { isLoading, hasMore, page } = get();
    if (isLoading || !hasMore) return;

    set({ isLoading: true });
    try {
      // 페이지네이션 로직은 유지하되, 현재는 모든 데이터를 한 번에 로드
      set((state) => ({
        page: state.page + 1,
        hasMore: false, // 현재는 모든 데이터를 한 번에 로드하므로 false
      }));
    } catch (error) {
      console.error("Failed to fetch more photos:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  setLoading: (isLoading) => set({ isLoading }),
  resetPage: () => set({ page: 1, hasMore: true }),
}));
