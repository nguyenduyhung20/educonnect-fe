import {
  Box,
  IconButton,
  Paper,
  Stack,
  Typography,
  useTheme
} from '@mui/material';
import React from 'react';

import { TrendingNewsItem } from '@/components/dashboards/trending-news-item';

export const TrendingNews = () => {
  return (
    <Box>
      <Paper elevation={5} sx={{ p: 2 }}>
        <Stack direction={'column'} spacing={2}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              fontSize: 23
            }}
          >
            Trends for you
          </Typography>

          <Stack direction={'column'} spacing={1}>
            <TrendingNewsItem />

            <TrendingNewsItem />

            <TrendingNewsItem />

            <TrendingNewsItem />
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
};
