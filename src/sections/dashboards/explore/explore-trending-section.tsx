import { TrendingNewsItem } from '@/components/dashboards/trending-news-item';
import { useExplorePostsContext } from '@/contexts/explore/explore-context';
import { Stack, Typography } from '@mui/material';
import React, { useMemo } from 'react';

export const ExploreTrendingSection = () => {
  const { getExplorePostsApi } = useExplorePostsContext();

  const listExplorePosts = useMemo(() => {
    return getExplorePostsApi.data?.data || [];
  }, [getExplorePostsApi]);
  return (
    <>
      <Stack spacing={2}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            fontSize: 23
          }}
        >
          Xu hướng dành cho bạn
        </Typography>

        <Stack direction={'column'} spacing={2}>
          {listExplorePosts.map((item, index) => {
            return <TrendingNewsItem postExplore={item} key={index} />;
          })}
        </Stack>
      </Stack>
    </>
  );
};
