export interface Category {
  id: number;
  name: string;
}

export interface Video {
  id: number;
  catIds: number[];
  name: string;
}

export interface Author {
  id: number;
  name: string;
  videos: Video[];
}

export interface ProcessedAuthor {
  id: number;
  name: string;
}

export interface ProcessedVideo {
  id: number;
  name: string;
  author: ProcessedAuthor;
  categories: Category[];
}

export interface VideoData {
  name: string;
  authorId: number;
  categories: number[];
}
