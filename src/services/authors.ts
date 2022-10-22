import type { Author } from '../interfaces';

export const getAuthors = async (): Promise<Author[]> => {
  const response = await fetch(`${process.env.REACT_APP_API}/authors`);

  return response.json() as unknown as Author[];
};

export const updateAuthor = async (author: Author): Promise<Author> => {
  const response = await fetch(`${process.env.REACT_APP_API}/authors/${author.id}`, {
    method: 'PATCH',
    body: JSON.stringify(author),
    headers: { 'Content-type': 'application/json' },
  });
  return response.json() as unknown as Author;
};
