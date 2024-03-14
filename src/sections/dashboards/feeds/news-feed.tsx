import { BodyNewDetail } from '@/components/NewsFeed/BodyNewDetail';
import { BodyNews } from '@/components/NewsFeed/BodyNews';
import { usePostsContext } from '@/contexts/posts/posts-context';
import { useAuth } from '@/hooks/use-auth';
import { Post, PostDetail, TypePost } from '@/types/post';
import { getFormData } from '@/utils/api-request';
import { Stack } from '@mui/material';
import React from 'react';

export const NewsFeed = ({
  listNewsFeeds,
  detail,
  type
}: {
  listNewsFeeds: Post[] | PostDetail[];
  detail: boolean;
  type: TypePost;
}) => {
  const { isAuthenticated, user } = useAuth();
  const { getNewsFeedApi, getPublicPostsApi } = usePostsContext();
  return (
    <Stack direction={'column'} spacing={2}>
      {listNewsFeeds.map((newsfeed, index) => {
        return detail ? (
          newsfeed && <BodyNewDetail post={newsfeed} key={index} type={type} />
        ) : (
          <BodyNews
            post={newsfeed}
            key={index}
            type={type}
            newLimit={async () => {
              if (isAuthenticated) {
                getNewsFeedApi.call({ id: user?.id || 0 });
              } else {
                getPublicPostsApi.call(getFormData({}));
              }
            }}
            isLast={index === listNewsFeeds.length - 1}
          />
        );
      })}
    </Stack>
  );
};
