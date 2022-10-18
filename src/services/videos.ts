import type { ProcessedVideo } from '../interfaces';

import { getCategories } from './categories';
import { getAuthors } from './authors';

export const getVideos = async (): Promise<ProcessedVideo[]> => {
  const [categories, authors] = await Promise.all([getCategories(), getAuthors()]);

  return []; // TODO: combine `categories` and `authors` into `videos` and use it to fill the table
};
