import { BodyNews } from '@/sections/dashboards/feeds/body-news';
import { usePostsContext } from '@/contexts/posts/posts-context';
import { useAuth } from '@/hooks/use-auth';
import { Post, PostDetail, TypePost } from '@/types/post';
import { getFormData } from '@/utils/api-request';
import { Stack } from '@mui/material';
import React, { useMemo } from 'react';
import { BodyNewsDetail } from '@/sections/dashboards/feeds/body-news-detail';
import { useUserContext } from '@/contexts/user/user-context';
import { useRouter } from 'next/router';

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
  const { getUsersProfile } = useUserContext();

  const router = useRouter();
  const userID = useMemo(() => {
    return Number(router.query.userID);
  }, [router.query.userID]);

  return (
    <Stack direction={'column'} spacing={2}>
      {listNewsFeeds.map((newsfeed, index) => {
        return detail ? (
          newsfeed && <BodyNewsDetail post={newsfeed} key={index} type={type} />
        ) : (
          <BodyNews
            post={newsfeed}
            key={index}
            type={type}
            newLimit={async () => {
              if (isAuthenticated) {
                if (type == 'newsfeed') {
                  getNewsFeedApi.call({ id: user?.id || 0 });
                } else if (type == 'profile') {
                  getUsersProfile.call(userID);
                }
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
