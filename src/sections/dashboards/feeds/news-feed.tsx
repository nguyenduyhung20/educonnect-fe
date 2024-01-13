import { BodyNewDetail } from '@/components/NewsFeed/BodyNewDetail';
import { BodyNews } from '@/components/NewsFeed/BodyNews';
import { Post, PostDetail } from '@/types/post';
import { Stack } from '@mui/material';
import React from 'react';

export const NewsFeed = ({
  listNewsFeeds,
  detail
}: {
  listNewsFeeds: Post[] | PostDetail[];
  detail: boolean;
}) => {
  return (
    <Stack direction={'column'} spacing={2}>
      {listNewsFeeds.map((newsfeed, index) => {
        return detail ? (
          newsfeed && <BodyNewDetail post={newsfeed} key={index} />
        ) : (
          <BodyNews post={newsfeed} key={index} type="newsfeed" />
        );
      })}
    </Stack>
  );
};
