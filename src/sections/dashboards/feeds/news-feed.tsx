import { BodyNews } from '@/components/NewsFeed/BodyNews';
import { Stack } from '@mui/material';
import React from 'react';

export const NewsFeed = () => {
  return (
      <Stack direction={'column'} spacing={2}>
        <BodyNews />
        <BodyNews />
      </Stack>
  );
};
