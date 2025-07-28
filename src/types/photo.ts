export interface Photo {
  id: string;
  url: string;
  createdAt: string;
  description?: string;
}

export interface PhotoState {
  photos: Photo[];
  hasMore: boolean;
  isLoading: boolean;
  page: number;
}
