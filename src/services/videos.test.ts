import { getVideos } from './videos';

describe('getVideos', () => {
	test('returns an empty collection when parameters are empty', () => {
		expect(getVideos([], [])).toEqual([]);
	});

	test('extracts a list of videos from collections of authors and categories', () => {
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
				id: 2,
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
		expect(getVideos(categories, authors)).toEqual([
			{
				id: 1,
				name: 'Dances with Wolves',
				author: {
					id: 1,
					name: 'Steven Spielberg',
				},
				categories: [
					{ id: 1, name: 'Thriller' },
					{ id: 3, name: 'Comedy' },
				],
			},
			{
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
			},
			{
				id: 2,
				name: 'The Lord of the Rings',
				author: {
					id: 2,
					name: 'George Lucas',
				},
				categories: [
					{ id: 1, name: 'Thriller' },
					{ id: 3, name: 'Comedy' },
				],
			},
			{
				id: 4,
				name: 'Twilight',
				author: {
					id: 2,
					name: 'George Lucas',
				},
				categories: [
					{ id: 1, name: 'Thriller' },
					{ id: 4, name: 'Horror' },
				],
			},
		]);
	});
});
