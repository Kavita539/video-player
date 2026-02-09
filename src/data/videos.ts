import type { Video, Category, MediaType } from "../types/video";
import rawData from "./dataset.json";

const aiSocial: Category = { slug: "social-media-ai", name: "Social Media AI" };
const aiIncome: Category = { slug: "ai-income", name: "AI Income" };
const aiEssentials: Category = { slug: "ai-essentials", name: "AI Essentials" };

export const categoryMap = {
  "social-media-ai": aiSocial,
  "ai-income": aiIncome,
  "ai-essentials": aiEssentials,
} as const;

export const videos: Video[] = rawData.categories.flatMap(({ category, contents }) =>
  contents.map((item) => ({
    id: item.slug,
    title: item.title,
    mediaUrl: item.mediaUrl,
    thumbnailUrl: item.thumbnailUrl, 
    mediaType: item.mediaType as MediaType,
    category: categoryMap[category.slug as keyof typeof categoryMap],
  }))
);