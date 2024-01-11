import { BodyNews } from '@/components/NewsFeed/BodyNews';
import { usePostsContext } from '@/contexts/posts/posts-context';
import { useAuth } from '@/hooks/use-auth';
import { Stack } from '@mui/material';
import React, { useEffect, useMemo } from 'react';

export const HotPosts = () => {
  const { getHotPostsApi, getHotPostsApiByUserID } = usePostsContext();

  const { isAuthenticated } = useAuth();

  const listHotPosts = useMemo(() => {
    if (isAuthenticated) {
      return getHotPostsApiByUserID.data?.data || [];
    }
    return getHotPostsApi.data?.data || [];
  }, [getHotPostsApi]);

  useEffect(() => {}, []);

  return (
    <Stack direction={'column'} spacing={2}>
      {listHotPosts?.map((newsfeed, index) => {
        return <BodyNews post={newsfeed} key={index} type="hotpost" />;
      })}
    </Stack>
  );
};
