import { BodyNews } from '@/components/NewsFeed/BodyNews';
import { usePostsContext } from '@/contexts/posts/posts-context';
import { Stack } from '@mui/material';
import React, { useEffect, useMemo } from 'react';

export const HotPosts = () => {
  const { getHotPostsApi } = usePostsContext();

  const listHotPosts = useMemo(() => {
    return getHotPostsApi.data?.data || [];
  }, [getHotPostsApi]);

  useEffect(() => {
    
  }, []);

  return (
    <Stack direction={'column'} spacing={2}>
      {listHotPosts.map((newsfeed, index) => {
        return <BodyNews post={newsfeed} key={index} />;
      })}
    </Stack>
  );
};
