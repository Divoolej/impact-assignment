import type { VideoData, Category, Author, ProcessedVideo } from '../interfaces';

import { useState } from 'react';
import styled from 'styled-components';

import { Select, Option, SingleOption, MultipleOptions } from './Select';
import { Button } from './Button';

type VideoFormProps = {
	video?: ProcessedVideo | null;
	authors: Author[];
	categories: Category[];
	onSubmit: (video: VideoData) => void;
	onCancel: () => void;
};

function toOptions<T extends { name: string }>(collection?: T[]): Option<T>[] {
	return (collection || []).map((el) => ({ label: el.name, value: el }));
}

export const VideoForm = ({ video, authors, categories, onSubmit, onCancel }: VideoFormProps) => {
	const [name, setName] = useState(video?.name || '');
	const [author, setAuthor] = useState<SingleOption<Author>>();
	const [selectedCategories, setSelectedCategories] = useState<MultipleOptions<Category>>(toOptions(video?.categories));

	const isValid = (video || author) && name.length > 0;

	const submit = () => {
		const videoData: VideoData = {
			name,
			authorId: video?.author?.id || author!.value!.id,
			categories: selectedCategories.map(({ value }) => value.id),
		};
		onSubmit(videoData);
	};

	return (
		<Form>
			{!video && (
				<>
					<label>Author: </label>
					<Select value={author} onChange={setAuthor} options={toOptions(authors)} />
				</>
			)}
			<label htmlFor="name">Name: </label>
			<Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
			<label>Categories: </label>
			<Select isMulti value={selectedCategories} onChange={setSelectedCategories} options={toOptions(categories)} />
			<Actions>
				<CancelBtn type="button" onClick={onCancel}>
					Cancel
				</CancelBtn>
				<SaveBtn primary type="button" disabled={!isValid} onClick={submit}>
					Save
				</SaveBtn>
			</Actions>
		</Form>
	);
};

const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: 8px;
	margin: 0 auto;
	max-width: 512px;
`;

const Input = styled.input`
	height: 38px;
	padding: 0 10px;
	font-size: 16px;
	border-radius: 4px;
	border: 1px solid var(--gray);
`;

const Actions = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 8px;
	gap: 8px;
`;

const CancelBtn = styled(Button)`
	width: 96px;
	background: var(--white);
	color: var(--dark-gray);
	border: 1px solid var(--gray);
`;

const SaveBtn = styled(Button)`
	width: 96px;
`;
