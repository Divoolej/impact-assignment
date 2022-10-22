import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { VideoForm } from './VideoForm';

const categories = [
	{ id: 1, name: 'Thriller' },
	{ id: 2, name: 'Crime' },
	{ id: 3, name: 'Comedy' },
	{ id: 4, name: 'Horror' },
];

const authors = [
	{
		id: 1,
		name: 'Steven Spielberg',
		videos: [
			{
				id: 1,
				name: 'Dances with Wolves',
				catIds: [1, 3],
			},
			{
				id: 3,
				name: 'The Hunger Games',
				catIds: [2, 4],
			},
		],
	},
	{
		id: 1,
		name: 'George Lucas',
		videos: [
			{
				id: 2,
				name: 'The Lord of the Rings',
				catIds: [1, 3],
			},
			{
				id: 4,
				name: 'Twilight',
				catIds: [1, 4],
			},
		],
	},
];

test('does not crash', () => {
	render(<VideoForm categories={categories} authors={authors} onSubmit={(_) => {}} onCancel={() => {}} />);
});

describe('when creating a new video', () => {
	test('it displays available authors in a dropdown', async () => {
		render(<VideoForm categories={categories} authors={authors} onSubmit={(_) => {}} onCancel={() => {}} />);
		const authorSelect = screen.getAllByText('Select...')[0];
		await userEvent.click(authorSelect);
		authors.forEach((author) => {
			expect(screen.getByText(author.name)).toBeInTheDocument();
		});
	});

	test('it displays available categories in a dropdown', async () => {
		render(<VideoForm categories={categories} authors={authors} onSubmit={(_) => {}} onCancel={() => {}} />);
		const categoriesSelect = screen.getAllByText('Select...')[1];
		await userEvent.click(categoriesSelect);
		categories.forEach((category) => {
			expect(screen.getByText(category.name)).toBeInTheDocument();
		});
	});

	test('disables the submit button until the author and name are present', async () => {
		render(<VideoForm categories={categories} authors={authors} onSubmit={(_) => {}} onCancel={() => {}} />);
		const button = screen.getByText('Save');
		expect(button).toBeDisabled();
		const authorSelect = screen.getAllByText('Select...')[0];
		await userEvent.click(authorSelect);
		await userEvent.click(screen.getByText(authors[0].name));
		const nameInput = screen.getByLabelText('Name:');
		expect(button).toBeDisabled();
		await userEvent.type(nameInput, 'Star Wars');
		expect(button).not.toBeDisabled();
	});

	test('calls the cancel callback when the cancel button is pressed', async () => {
		const onCancel = jest.fn();
		render(<VideoForm categories={categories} authors={authors} onSubmit={(_) => {}} onCancel={onCancel} />);
		await userEvent.click(screen.getByText('Cancel'));
		expect(onCancel).toHaveBeenCalledTimes(1);
	});

	test('calls the submit callback with proper data when the save button is pressed', async () => {
		const onSubmit = jest.fn();
		render(<VideoForm categories={categories} authors={authors} onSubmit={onSubmit} onCancel={() => {}} />);
		const selects = screen.getAllByText('Select...');
		const authorSelect = selects[0];
		await userEvent.click(authorSelect);
		await userEvent.click(screen.getByText('Steven Spielberg'));
		const nameInput = screen.getByLabelText('Name:');
		await userEvent.type(nameInput, 'Star Wars');
		const categoriesSelect = selects[1];
		await userEvent.click(categoriesSelect);
		await userEvent.click(screen.getByText('Crime'));
		await userEvent.click(screen.getByText('Save'));
		expect(onSubmit).toHaveBeenCalledWith({ name: 'Star Wars', authorId: 1, categories: [2] });
	});
});

describe('when editing an existing video', () => {
	const video = {
		id: 3,
		name: 'The Hunger Games',
		author: {
			id: 1,
			name: 'Steven Spielberg',
		},
		categories: [
			{ id: 2, name: 'Crime' },
			{ id: 4, name: 'Horror' },
		],
	};

	test('it does not have the author input', () => {
		render(<VideoForm video={video} categories={categories} authors={authors} onSubmit={(_) => {}} onCancel={() => {}} />);
		expect(screen.queryByText('Author:')).not.toBeInTheDocument();
	});

	test('calls the submit callback with proper data when the save button is pressed', async () => {
		const onSubmit = jest.fn();
		render(<VideoForm video={video} categories={categories} authors={authors} onSubmit={onSubmit} onCancel={() => {}} />);
		const button = screen.getByText('Save');
		const nameInput = screen.getByLabelText('Name:');
		await userEvent.clear(nameInput);
		await userEvent.type(nameInput, 'Star Wars');
		await userEvent.click(button);
		expect(onSubmit).toHaveBeenCalledWith({ name: 'Star Wars', authorId: 1, categories: [2, 4] });
	});
});
