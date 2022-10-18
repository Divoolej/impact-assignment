import type { ProcessedVideo } from '../interfaces';

import styled from 'styled-components';

type VideosTableProps = {
  videos: ProcessedVideo[];
};

export const VideosTable = ({ videos }: VideosTableProps) => (
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
            <td>{video.author}</td>
            <td>{video.categories.join(', ')}</td>
            <td>
              {/* TODO: implement `edit` and `delete` actions */}
              <button>Edit</button>
              <button>Delete</button>
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
