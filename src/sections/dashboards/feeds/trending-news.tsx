import { Box, Paper, Stack, Typography } from '@mui/material';
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
            Xu hướng dành cho bạn
          </Typography>

          <Stack direction={'column'} spacing={1}>
            <TrendingNewsItem content="Bất đẳng thức Cauchy" />
            <TrendingNewsItem content="HSG Quốc gia" />
            <TrendingNewsItem content="Giao thoa sóng" />
            <TrendingNewsItem content="Sinh học 10" />
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
};
