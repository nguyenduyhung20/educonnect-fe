import { Box, IconButton, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Link from 'next/link';

export const TrendingNewsItem = () => {
  const theme = useTheme();
  return (
    <>
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        width={1}
        sx={{
          p: 1,
          '&:hover': {
            background: `${theme.colors.primary.lighter}`,
            borderRadius: 1,
            cursor: 'pointer'
          }
        }}
      >
        <Link href={'/communities/explore/explore-choose-trend'}>
          <Box sx={{ width: 1 }}>
            <Typography variant="subtitle1">Trending</Typography>
            <Typography variant="h4">Lionel Messi</Typography>
            <Typography variant="subtitle2">321K posts</Typography>
          </Box>
        </Link>
        <Box>
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        </Box>
      </Stack>
    </>
  );
};
