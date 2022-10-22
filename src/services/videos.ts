import type { ProcessedVideo, Author, Category } from '../interfaces';

export const getVideos = (categories: Category[], authors: Author[]): ProcessedVideo[] => {
  const categoriesLookup: Record<number, Category> = categories.reduce(
    (lookup, category) => ({
      ...lookup,
      [category.id]: category,
    }),
    {}
  );

  return authors.flatMap((author) =>
    author.videos.map((video) => ({
      id: video.id,
      name: video.name,
      categories: video.catIds.map((id) => categoriesLookup[id]),
      author: {
        id: author.id,
        name: author.name,
      },
    }))
  );
};
