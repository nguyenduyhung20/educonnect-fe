import { Post } from '@/types/post';
import { Stack, TextField } from '@mui/material';
import { FormikProps } from 'formik';
import React from 'react';

export const CreateNewsFeedLink = ({
  formik
}: {
  formik: FormikProps<Partial<Post>>;
}) => {
  return (
    <Stack spacing={1}>
      <TextField
        placeholder="Nhập tiêu đề"
        multiline
        name="title"
        onChange={formik.handleChange}
      ></TextField>
      <TextField
        placeholder="Nhập url"
        multiline
        name="content"
        onChange={formik.handleChange}
      ></TextField>
    </Stack>
  );
};
