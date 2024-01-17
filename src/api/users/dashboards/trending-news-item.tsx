import { Box, IconButton, Stack, Typography, useTheme } from '@mui/material';
import React, { memo } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Link from 'next/link';

export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const TrendingNewsItem = memo(function TrendingNewsItem({
  content
}: {
  content: string;
}) {
  const theme = useTheme();
  const randNum = getRandomInt(0, 2000);
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
            <Typography variant="subtitle1">Xu hướng</Typography>
            <Typography variant="h4">{content}</Typography>
            <Typography variant="subtitle2">{randNum} bài viết</Typography>
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
});
