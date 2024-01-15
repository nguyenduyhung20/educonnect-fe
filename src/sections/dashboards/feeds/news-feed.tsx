import { BodyNewDetail } from '@/components/NewsFeed/BodyNewDetail';
import { BodyNews } from '@/components/NewsFeed/BodyNews';
import { Post, PostDetail, TypePost } from '@/types/post';
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
  return (
    <Stack direction={'column'} spacing={2}>
      {listNewsFeeds.map((newsfeed, index) => {
        return detail ? (
          newsfeed && <BodyNewDetail post={newsfeed} key={index} type={type} />
        ) : (
          <BodyNews post={newsfeed} key={index} type={type} />
        );
      })}
    </Stack>
  );
};
