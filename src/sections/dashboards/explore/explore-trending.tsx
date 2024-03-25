import { Box, Paper, Stack } from '@mui/material';
import React from 'react';
import { SearchBar } from '@/components/dashboards/search-bar';
import { ExploreTrendingSection } from './explore-trending-section';

export const ExploreTrending = () => {
  return (
    <Box>
      <Paper elevation={5} sx={{ p: 2 }}>
        <Stack direction={'column'} spacing={2}>
          <SearchBar />
          <ExploreTrendingSection />
        </Stack>
      </Paper>
    </Box>
  );
};
