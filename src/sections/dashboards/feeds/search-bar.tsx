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
import { Post } from '@/types/post';

type FetchSearchInput = {
  input: string;
};
type SearchBarProps = {
  onQueryResult?: (results: Post[]) => void;
};
export const SearchBar = ({ onQueryResult }: SearchBarProps) => {
  const [value, setValue] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getResult = useFunction(ExploreApi.getSearchResult);
  const router = useRouter();

  const handleSearchResult = useCallback(
    (data: SearchResult) => {
      let results: string[] = [];
      if (data?.suggest && data.suggest !== inputValue) {
        results.push(data.suggest);
      }

      if (data?.autocomplete) {
        results.push(...data.autocomplete);
      }
      if (data?.most_access) {
        results.push(...data.most_access);
      }
      if (data?.posts) {
        results.push(...data.posts.map((item) => item.title));
      }

      // Preprocess results
      results = results
        .filter((value, index, arr) => {
          return index === arr.indexOf(value);
        })
        .map((item: string) => {
          if (item.length >= 48) {
            console.log(item, item.length);
            return item + '...';
          }
          return item;
        });
      console.log(results);

      setOptions(results);
    },
    [inputValue]
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

  // Debounce input
  const debouncedFetchSearch = useDebouncedCallback(fetchSearch, 100);

  const queryResult = useCallback(async () => {
    if (value) {
      const result = await getResult.call({ input: value, mode: 'query' });
      console.log('value changed', value, result);
      if (result.data && result.data.posts) {
        onQueryResult(result.data.posts);
      }
    }
  }, [getResult, onQueryResult, value]);

  const calculatedOptions = useCallback(() => {
    let results: string[] = options;
    if (
      inputValue &&
      inputValue.trim() !== options[0] &&
      !options.includes(inputValue)
    ) {
      results = [inputValue, ...results];
    }
    return results;
  }, [inputValue, options]);

  const handleKeyPressEvent = (event: React.KeyboardEvent<HTMLDivElement>) => {
    event.preventDefault();
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

  useEffect(() => {
    /**
     * Listen to value change and call the query respectively
     */
    queryResult();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <>
      <Autocomplete
        placeholder="Tìm kiếm"
        autoComplete
        freeSolo={false}
        filterOptions={(x) => x}
        options={calculatedOptions()}
        value={value}
        onChange={(_event, newValue: string | null) => {
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
