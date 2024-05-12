import { Box, Paper, Stack } from '@mui/material';
import React, { useState } from 'react';
import { SearchBar } from '@/sections/dashboards/feeds/search-bar';
import { ExploreTrendingSection } from './explore-trending-section';
import { Post } from '@/types/post';

export const ExploreTrending = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  return (
    <Box>
      <Paper elevation={5} sx={{ p: 2 }}>
        <Stack direction={'column'} spacing={2}>
          <SearchBar onQueryResult={(results) => setPosts(results)} />
          <ExploreTrendingSection queryResults={posts} />
        </Stack>
      </Paper>
    </Box>
  );
};
