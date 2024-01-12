import { BodyNews } from '@/components/NewsFeed/BodyNews';
import { Post } from '@/types/post';
import { Stack } from '@mui/material';
import React from 'react';

export const NewsFeed = ({ listNewsFeeds }: { listNewsFeeds: Post[] }) => {
  return (
    <Stack direction={'column'} spacing={2}>
      {listNewsFeeds.map((newsfeed, index) => {
        return <BodyNews post={newsfeed} key={index} type="newsfeed" />;
      })}
    </Stack>
  );
};
