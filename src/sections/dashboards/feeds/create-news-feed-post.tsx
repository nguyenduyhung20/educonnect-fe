import { Stack, TextField } from '@mui/material';
import React from 'react';

export const CreateNewsFeedPost = () => {
  return (
    <Stack spacing={1}>
      <TextField placeholder="Title" multiline></TextField>
      <TextField placeholder="Text (optional)" multiline></TextField>
    </Stack>
  );
};
