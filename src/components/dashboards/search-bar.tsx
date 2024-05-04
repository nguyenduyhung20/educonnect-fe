import {
  Autocomplete,
  CircularProgress,
  Stack,
  TextField
} from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useDebouncedCallback } from 'use-debounce';
import { useRouter } from 'next/router';
import useFunction from '@/hooks/use-function';
import { ExploreApi } from '@/api/explore';

export interface Film {
  title: string;
}

type FetchSearchInput = {
  input: string;
};

// TODO: make example working, shit
export const SearchBar = () => {
  const [value, setValue] = useState<Film | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState<Film[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getResult = useFunction(ExploreApi.getSearchResult);
  const router = useRouter();

  const fetchSearch = useCallback(
    async ({ input }: FetchSearchInput) => {
      console.log('called');

      try {
        setIsLoading(true);
        const result = await getResult.call({});
        setIsLoading(false);
        if (result.data) {
          if (result) {
            setOptions([...result.data]);
          }
        }
      } catch (error) {
        if ((error.message as string).includes('unauthorization')) {
          router.push('/login');
        }
      }
    },
    [getResult, router]
  );
  const debounced = useDebouncedCallback(fetchSearch, 300);

  useEffect(() => {
    let active = true;

    if (inputValue === '') {
      return undefined;
    }
    if (inputValue.endsWith(' ')) {
      return undefined;
    }

    const querySearch = async () => {
      if (active) {
        await debounced({ input: inputValue });
      }
    };
    querySearch();

    return () => {
      active = false;
    };
  }, [debounced, inputValue]);

  return (
    <>
      <Autocomplete
        placeholder="Tìm kiếm"
        sx={{ width: 300 }}
        autoComplete
        filterOptions={(x) => x}
        options={options}
        value={value}
        onChange={(_event, newValue: Film | null) => {
          console.log(newValue);

          setOptions(newValue ? [newValue, ...options] : options);
          setValue(newValue);
        }}
        onInputChange={(_event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        isOptionEqualToValue={(option, value) => option.title === value.title}
        getOptionLabel={(option: Film) => option.title}
        loading={isLoading}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Tìm kiếm"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {isLoading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
              startAdornment: (
                <Stack
                  sx={{ mr: 1 }}
                  justifyContent={'center'}
                  alignItems={'center'}
                >
                  <SearchIcon />
                </Stack>
              )
            }}
          />
        )}
      />
    </>
  );
};
