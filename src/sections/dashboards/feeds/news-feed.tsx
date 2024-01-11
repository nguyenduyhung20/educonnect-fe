import { BodyNews } from '@/components/NewsFeed/BodyNews';
import { usePostsContext } from '@/contexts/posts/posts-context';
import { Stack } from '@mui/material';
import React, { useMemo } from 'react';

export const NewsFeed = () => {
  const { getNewsFeedApi } = usePostsContext();

  const listNewsFeeds = useMemo(() => {
    return getNewsFeedApi.data?.data || [];
  }, [getNewsFeedApi]);

  return (
    <Stack direction={'column'} spacing={2}>
      {listNewsFeeds.map((newsfeed, index) => {
        return <BodyNews post={newsfeed} key={index} type="newsfeed" />;
      })}
    </Stack>
  );
};
