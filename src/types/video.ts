export type MediaType = "MP4" | "YOUTUBE";

export interface Category {
  slug: "social-media-ai" | "ai-income" | "ai-essentials";
  name: string;
  iconUrl?: string;
}

export interface Video {
  id: string;
  title: string;
  mediaUrl: string;
  thumbnailUrl: string;
  mediaType: MediaType;
  category: Category;
}