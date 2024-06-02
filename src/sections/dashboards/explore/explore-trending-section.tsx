import { TrendingNewsItem } from '@/sections/dashboards/feeds/trending-news-item';
import { useExplorePostsContext } from '@/contexts/explore/explore-context';
import { useAuth } from '@/hooks/use-auth';
import { Stack, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import { Post } from '@/types/post';

type ExploreTrendingSectionProps = {
  queryResults?: Post[];
};
export const ExploreTrendingSection = ({
  queryResults
}: ExploreTrendingSectionProps) => {
  const { getExplorePostsApi, getPublicExplorePostsApi } =
    useExplorePostsContext();
  const { isAuthenticated } = useAuth();

  const listExplorePosts = useMemo(() => {
    if (isAuthenticated) {
      if (queryResults && queryResults.length > 0) {
        return queryResults.map((item: any) => ({
          ...item,
          commentCount: item.comment_count,
          interactCount: item.interact_count
        }));
      } else {
        return getExplorePostsApi.data?.data || [];
      }
    }
    return getPublicExplorePostsApi.data?.data || [];
  }, [
    getExplorePostsApi.data?.data,
    getPublicExplorePostsApi.data?.data,
    isAuthenticated,
    queryResults
  ]);

  // console.log(queryResults);

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
