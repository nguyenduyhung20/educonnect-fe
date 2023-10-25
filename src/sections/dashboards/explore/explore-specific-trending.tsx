import { SearchBar } from '@/components/dashboards/search-bar';
import { Box, Paper, Stack } from '@mui/material';
import React from 'react';
import { NewsFeed } from '../feeds/news-feed';

export const ExploreSpecificTrending = () => {
  return (
    <Box>
      <Stack direction={'column'} spacing={2}>
        <Paper elevation={5} sx={{ p: 2 }}>
          <SearchBar />
        </Paper>

        <NewsFeed />
      </Stack>
    </Box>
  );
};
