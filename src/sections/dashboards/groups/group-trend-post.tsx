import { TrendingNewsItem } from '@/sections/dashboards/feeds/trending-news-item';
import { Stack, Typography } from '@mui/material';
import React from 'react';

export const GroupTrendPost = ({ listTrendPosts }: any) => {

  return (
    <>
      <Stack spacing={2}>
        <Typography
          variant="h3"
          sx={{
            fontSize: 23,
            fontWeight: 700
          }}
        >
          Xu hướng dành cho bạn
        </Typography>

        <Stack direction={'column'} spacing={2}>
          {listTrendPosts.map((item, index) => {
            return <TrendingNewsItem postExplore={item} key={index} />;
          })}
        </Stack>
      </Stack>
    </>
  );
};
