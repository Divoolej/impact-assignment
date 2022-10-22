import ReactSelect, { Props, GroupBase, SingleValue, MultiValue } from 'react-select';

export interface Option<T> {
	label: string;
	value: T;
}

export type SingleOption<T> = SingleValue<Option<T>>;
export type MultipleOptions<T> = MultiValue<Option<T>>;

export function Select<Option, IsMulti extends boolean = false, Group extends GroupBase<Option> = GroupBase<Option>>(
	props: Props<Option, IsMulti, Group>
) {
	return <ReactSelect {...props} />;
}
