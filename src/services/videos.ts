import type { ProcessedVideo } from '../interfaces';

import { getCategories } from './categories';
import { getAuthors } from './authors';

export const getVideos = async (): Promise<ProcessedVideo[]> => {
  const [categories, authors] = await Promise.all([getCategories(), getAuthors()]);

  const categoriesLookup: Record<number, string> = categories.reduce(
    (lookup, category) => ({
      ...lookup,
      [category.id]: category.name,
    }),
    {}
  );

  return authors.flatMap((author) =>
    author.videos.map((video) => ({
      id: video.id,
      name: video.name,
      author: author.name,
      categories: video.catIds.map((id) => categoriesLookup[id]),
    }))
  );
};
