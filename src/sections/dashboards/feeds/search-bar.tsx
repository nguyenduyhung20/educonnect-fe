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
import { SearchResult } from '@/types/explore';

type FetchSearchInput = {
  input: string;
};

// TODO: make example working, shit
export const SearchBar = () => {
  const [value, setValue] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getResult = useFunction(ExploreApi.getSearchResult);
  const router = useRouter();

  const handleSearchResult = useCallback(
    (data: SearchResult) => {
      console.log(options);

      const results = [];
      if (data?.suggest && data.suggest !== inputValue) {
        results.push(data.suggest);
      }
      if (data?.autocomplete) {
        results.push(...data.autocomplete);
      }
      if (data?.posts) {
        results.push(...data.posts.map((item) => item.title));
      }

      setOptions(results);
    },
    [inputValue, options]
  );

  const fetchSearch = useCallback(
    async ({ input }: FetchSearchInput) => {
      setIsLoading(true);
      try {
        const result = await getResult.call({ input, mode: 'suggest' });
        if (result.data) {
          handleSearchResult(result.data);
        }
      } catch (error) {
        if ((error.message as string).includes('unauthorization')) {
          router.push('/login');
        }
      } finally {
        setIsLoading(false);
      }
    },
    [getResult, handleSearchResult, router]
  );

  const debouncedFetchSearch = useDebouncedCallback(fetchSearch, 200);

  const handleKeyPressEvent = (event: React.KeyboardEvent<HTMLDivElement>) => {
    event.preventDefault();
    console.log(event);

    if (event.key === 'Enter' && inputValue.trim() !== '') {
      setValue(inputValue);
    }
  };

  useEffect(() => {
    if (!inputValue.trim()) {
      return undefined;
    }
    if (inputValue.endsWith(' ')) {
      return undefined;
    }
    debouncedFetchSearch({ input: inputValue });
  }, [debouncedFetchSearch, inputValue]);

  return (
    <>
      <Autocomplete
        placeholder="Tìm kiếm"
        sx={{ width: 300 }}
        autoComplete
        freeSolo={false}
        filterOptions={(x) => x}
        options={inputValue ? [inputValue, ...options] : options}
        value={value}
        onChange={(_event, newValue: string | null) => {
          console.log('onchange', newValue);
          setValue(newValue);
        }}
        onInputChange={(_event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        onKeyUp={handleKeyPressEvent}
        isOptionEqualToValue={(option, value) => option === value}
        getOptionLabel={(option: string) => option}
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
