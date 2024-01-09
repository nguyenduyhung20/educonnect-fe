import { BodyNewDetail } from '@/components/NewsFeed/BodyNewDetail';
import { usePostsContext } from '@/contexts/posts/posts-context';
import { useAuth } from '@/hooks/use-auth';
import { Stack } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo } from 'react';

export const FeedDetail = () => {
  const router = useRouter();
  const { getDetailPostApi } = usePostsContext();

  const listNewsFeeds = useMemo(() => {
    return [getDetailPostApi.data?.data] || [];
  }, [getDetailPostApi.data]);

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else {
      getDetailPostApi.call({ id: Number(router.query.postID) });
    }
  }, []);

  return (
    <Stack direction={'column'}>
      {listNewsFeeds.map((item, index) => {
        return item && <BodyNewDetail post={item} key={index} />;
      })}
    </Stack>
  );
};
