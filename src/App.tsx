import type { ProcessedVideo } from './interfaces';

import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { getVideos } from './services/videos';
import { VideosTable } from './components/VideosTable';
import { Button } from './components/Button';

export const App = () => {
  const [videos, setVideos] = useState<ProcessedVideo[]>([]);

  useEffect(() => {
    getVideos().then(setVideos);
  }, []);

  return (
    <>
      <Header>
        Videos
        {/* TODO: implement `add video` action */}
        <Button primary>Add video</Button>
      </Header>

      <Main>
        <VideosTable videos={videos} />
      </Main>
      
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
`

const Main = styled.main`
  padding: 0 16px;

`

const Footer = styled.footer`
margin-top: auto;
  padding: 16px;
  background: var(--light-gray);
`
