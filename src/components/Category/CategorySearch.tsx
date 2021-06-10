import React from 'react';
import clsx from 'clsx';
import AutoComplete, {
  createFilterOptions,
} from '@material-ui/lab/Autocomplete';
import TextField, {
  TextFieldProps,
} from '@material-ui/core/TextField';
import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Category, useCategories, Product } from 'graphqlAPI';

const useStyles = makeStyles((theme) => ({
  input: { paddingRight: theme.spacing(2) },
}));

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
  const classes = useStyles();
  const [inputValue, setState] = React.useState('');

  const { value: id, onChange, textFieldProps } = props;

  const { data, loading } = useCategories();
  const categories = (data && data.categories) || [];

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
          InputProps={{
            ...params.InputProps,
            ...textFieldProps?.InputProps,
            className: clsx(classes.input),
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
              </React.Fragment>
            ),
          }}
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
      value={value || null}
      getOptionSelected={(option, value) => option.id === value.id}
      filterOptions={filterCategory}
      loadingText={'Cargando...'}
      {...{ loading }}
    />
  );
};

export default CategorySearch;
