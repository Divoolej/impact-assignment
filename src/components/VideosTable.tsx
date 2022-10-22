import type { ProcessedVideo } from '../interfaces';

import styled from 'styled-components';

import { Button } from './Button';

type VideosTableProps = {
  videos: ProcessedVideo[];
  onDelete: (video: ProcessedVideo) => void;
  onEdit: (video: ProcessedVideo) => void;
};

export const VideosTable = ({ videos, onDelete, onEdit }: VideosTableProps) => (
  <Wrapper>
    <Table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Author</th>
          <th>Categories</th>
          <th>Options</th>
        </tr>
      </thead>

      <tbody>
        {videos.map((video) => (
          <tr key={video.id}>
            <td>{video.name}</td>
            <td>{video.author.name}</td>
            <td>{video.categories.map(({ name }) => name).join(', ')}</td>
            <td>
              <Actions>
                <Button small onClick={() => onEdit(video)}>
                  Edit
                </Button>
                <Button small onClick={() => onDelete(video)}>
                  Delete
                </Button>
              </Actions>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  </Wrapper>
);

const Wrapper = styled.div`
  overflow: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: 16px;
    border: 1px solid;
    text-align: left;
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 8px;
`;
