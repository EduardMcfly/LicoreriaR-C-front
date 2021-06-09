import React from 'react';

import AutoComplete, {
  createFilterOptions,
} from '@material-ui/lab/Autocomplete';
import TextField, {
  TextFieldProps,
} from '@material-ui/core/TextField';

import { Category, useCategories, Product } from 'graphqlAPI';

const filterCategory = createFilterOptions<Category>({
  stringify: ({ name }) => [name].map((a) => a || '').join(' '),
});

type Value = Product['categoryId'];

interface CategorySearchProps {
  filterOptions?: (options: Category[]) => Category[];
  onChange: (category: null | Category) => void;
  value: Value;
  textFieldProps?: Partial<TextFieldProps>;
}

const CategorySearch = (props: CategorySearchProps) => {
  const [inputValue, setState] = React.useState('');

  const { value: id, onChange, textFieldProps } = props;

  const res = useCategories();
  const categories = (res && res.data && res.data.categories) || [];

  const value = categories.find((category) => category.id === id);
  return (
    <AutoComplete<Category>
      renderInput={(params) => (
        <TextField
          {...params}
          label={'Selecciona una categoria'}
          variant="standard"
          fullWidth
          autoComplete="off"
          value={inputValue}
          {...textFieldProps}
        />
      )}
      onInputChange={(e) => {
        if (e && e.target instanceof HTMLInputElement)
          setState(e.target.value);
      }}
      getOptionLabel={({ name }) => name}
      options={
        props.filterOptions
          ? props.filterOptions(categories)
          : categories
      }
      onChange={(_event, option) => {
        onChange(option);
      }}
      value={value}
      getOptionSelected={(option, value) => option.id === value.id}
      filterOptions={filterCategory}
    />
  );
};

export default CategorySearch;
