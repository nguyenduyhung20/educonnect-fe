import { Avatar, IconButton, Link, Stack, TextField } from '@mui/material';
import React, { useCallback } from 'react';
import SendIcon from '@mui/icons-material/Send';
import { useFormik } from 'formik';
import useFunction from '@/hooks/use-function';
import { usePostsContext } from '@/contexts/posts/posts-context';
import { useAuth } from '@/hooks/use-auth';
import { Post } from '@/types/post';
import { Comment } from '@/types/comment';

export const CommentSendItem = ({
  item,
  parentIndex
}: {
  item: Post | Comment;
  parentIndex?: number;
}) => {
  const { createComment, getDetailPostApi } = usePostsContext();
  const { user } = useAuth();

  const formik = useFormik<{ content: string }>({
    initialValues: {
      content: ''
    },
    onSubmit: async (values) => {
      const { error } = await handleSubmitHelper.call(values);
      if (!error) {
        formik.setValues({
          content: ''
        });
      }
    }
  });

  const onSubmit = useCallback(
    async (values: { content: string }) => {
      try {
        if (typeof parentIndex != 'undefined') {
          const result = await createComment({ ...values, id: item.id });
          const newComment = [
            ...(getDetailPostApi.data?.data.comment || []).map(
              (item, index) => {
                if (index == parentIndex) {
                  item.comment = [...(item.comment || []), result];
                  item.commentCount += 1;
                }
                return item;
              }
            )
          ];
          getDetailPostApi.setData({
            data: {
              ...getDetailPostApi.data?.data,
              comment: newComment,
              commentCount: getDetailPostApi.data?.data.commentCount + 1
            }
          });
        } else {
          const result = await createComment({ ...values, id: item.id });
          const newComment = [
            ...(getDetailPostApi.data?.data.comment || []),
            result
          ];
          getDetailPostApi.setData({
            data: {
              ...getDetailPostApi.data?.data,
              comment: newComment,
              commentCount: getDetailPostApi.data?.data.commentCount + 1
            }
          });
        }
      } catch (error) {
        throw error;
      }
    },
    [createComment, parentIndex]
  );

  const handleSubmitHelper = useFunction(onSubmit, {
    successMessage: 'Bình luận thành công!'
  });
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Stack sx={{ pb: 1 }} direction={'row'} spacing={2}>
          <Avatar
            component={Link}
            variant="rounded"
            alt={user?.name}
            src={user?.avatar}
            href={`/management/profile${user?.id}`}
          />
          <Stack width={1} direction={'row'} spacing={2}>
            <TextField
              placeholder="Bạn nghĩ gì?"
              multiline
              sx={{ width: 7 / 8 }}
              onChange={formik.handleChange}
              name="content"
              value={formik.values.content}
              autoFocus
            />

            <IconButton type="submit" disabled={formik.isSubmitting}>
              <SendIcon color={formik.isSubmitting ? 'disabled' : 'primary'} />
            </IconButton>
          </Stack>
        </Stack>
      </form>
    </>
  );
};
