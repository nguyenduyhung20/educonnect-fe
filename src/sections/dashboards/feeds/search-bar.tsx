import { Stack, TextField } from '@mui/material';
import React from 'react';
import SearchIcon from '@mui/icons-material/Search';

export const SearchBar = () => {
  return (
    <>
      <TextField
        placeholder="Tìm kiếm"
        sx={{ width: 1 }}
        InputProps={{
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
    </>
  );
};
