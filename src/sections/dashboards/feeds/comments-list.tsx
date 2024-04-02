import { PostDetail } from '@/types/post';
import { Stack } from '@mui/material';
import React from 'react';

import { CommentItem } from './comment-item';

export const CommentsList = ({
  post,
  degree,
  parentIndex
}: {
  post: PostDetail;
  degree: number;
  parentIndex?: number;
}) => {
  return (
    <>
      <Stack direction={'column'} width={1} spacing={2}>
        {post.comment.map((item, index) => {
          return (
            <CommentItem
              comment={item}
              key={index}
              index={index}
              degree={degree}
              parentIndex={parentIndex}
            />
          );
        })}
      </Stack>
    </>
  );
};
