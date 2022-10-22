import type { Category, Author, ProcessedVideo, VideoData } from './interfaces';

import { useEffect, useState, useCallback } from 'react';
import styled from 'styled-components';

import { getAuthors, updateAuthor } from './services/authors';
import { getCategories } from './services/categories';
import { getVideos } from './services/videos';
import { VideosTable } from './components/VideosTable';
import { VideoForm } from './components/VideoForm';
import { Button } from './components/Button';

enum AppState {
  List = 'AppState.List',
  New = 'AppState.New',
  Edit = 'AppState.Edit',
}

const UNEXPECTED_ERROR = 'An unexpected error has occurred';

export const App = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [videos, setVideos] = useState<ProcessedVideo[]>([]);
  const [currentVideo, setCurrentVideo] = useState<ProcessedVideo | null>(null);
  const [appState, setAppState] = useState<AppState>(AppState.List);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const tryAsync = useCallback(async (work: () => Promise<void>) => {
    try {
      setError(null);
      setLoading(true);
      await work();
    } catch (err) {
      setError(UNEXPECTED_ERROR);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    tryAsync(async () => {
      const categories = await getCategories();
      const authors = await getAuthors();
      setCategories(categories);
      setAuthors(authors);
    });
  }, [tryAsync]);

  useEffect(() => {
    if (categories.length && authors.length) {
      setVideos(getVideos(categories, authors));
    }
  }, [categories, authors]);

  const addVideo = useCallback(
    (vid: VideoData) => {
      tryAsync(async () => {
        const author = authors.find((a) => a.id === vid.authorId)!;
        const newVideo = {
          // In a real app the ID should be generated on the database level
          id: Math.max(...videos.map((v) => v.id)) + 1,
          name: vid.name,
          catIds: vid.categories,
        };
        const updatedAuthor = await updateAuthor({ ...author, videos: [...author.videos, newVideo] });
        setAuthors(authors.map((a) => (a.id === author.id ? updatedAuthor : a)));
        setAppState(AppState.List);
      });
    },
    [authors, videos, tryAsync]
  );

  const updateVideo = useCallback(
    (vid: VideoData) => {
      tryAsync(async () => {
        const author = authors.find((a) => a.id === vid.authorId)!;
        const updatedAuthor = await updateAuthor({
          ...author,
          videos: author.videos.map((v) =>
            v.id === currentVideo!.id
              ? {
                  ...v,
                  name: vid.name,
                  catIds: vid.categories,
                }
              : v
          ),
        });
        setAuthors(authors.map((a) => (a.id === author.id ? updatedAuthor : a)));
        setAppState(AppState.List);
        setCurrentVideo(null);
      });
    },
    [currentVideo, authors, tryAsync]
  );

  const deleteVideo = useCallback(
    async (video: ProcessedVideo) => {
      tryAsync(async () => {
        const author = authors.find((a) => a.id === video.author.id)!;
        const updatedAuthor = await updateAuthor({
          ...author,
          videos: author.videos.filter(({ id }) => id !== video.id),
        });
        setAuthors(authors.map((a) => (a.id === author.id ? updatedAuthor : a)));
      });
    },
    [authors, tryAsync]
  );

  return (
    <>
      <Header>
        Videos
        <Button primary onClick={() => setAppState(AppState.New)}>
          Add video
        </Button>
      </Header>

      {error && <Error>{error}</Error>}

      {loading ? (
        <Loading>Loading...</Loading>
      ) : (
        <Main>
          {appState === AppState.List && (
            <VideosTable
              videos={videos}
              onDelete={deleteVideo}
              onEdit={(video) => {
                setCurrentVideo(video);
                setAppState(AppState.Edit);
              }}
            />
          )}
          {appState === AppState.New && (
            <VideoForm
              categories={categories}
              authors={authors}
              onSubmit={addVideo}
              onCancel={() => {
                setAppState(AppState.List);
              }}
            />
          )}
          {appState === AppState.Edit && (
            <VideoForm
              video={currentVideo}
              categories={categories}
              authors={authors}
              onSubmit={updateVideo}
              onCancel={() => {
                setAppState(AppState.List);
                setCurrentVideo(null);
              }}
            />
          )}
        </Main>
      )}

      <Footer>Impact Coding Assignment</Footer>
    </>
  );
};

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: var(--dark-gray);
  color: var(--white);
`;

const Main = styled.main`
  padding: 0 16px;
`;

const Footer = styled.footer`
  margin-top: auto;
  padding: 16px;
  background: var(--light-gray);
`;

const Error = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px 0;
  background: var(--red);
  color: var(--white);
`;

const Loading = styled.div`
  display: flex;
  justify-content: center;
  padding: 16px 0;
`;
