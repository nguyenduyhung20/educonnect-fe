import { Post } from '@/types/post';
import {
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
  styled
} from '@mui/material';
import { FormikProps } from 'formik';
import React from 'react';

const Input = styled('input')({
  display: 'none'
});

export const CreateNewsFeedPost = ({
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
        value={formik.values.title}
        onChange={formik.handleChange}
      />
      <TextField
        placeholder="Nhập nội dung"
        multiline
        name="content"
        value={formik.values.content}
        onChange={formik.handleChange}
      />
      <Paper
        elevation={0}
        sx={{
          paddingTop: 10,
          paddingBottom: 10,
          border: 1,
          borderColor: 'divider'
        }}
      >
        <Stack
          justifyContent={'center'}
          alignItems={'center'}
          direction={'row'}
          spacing={1}
        >
          <Typography color={'primary'} variant="h4" fontWeight={10}>
            Drag and drop image or
          </Typography>
          <Input
            accept="image/*"
            id="upload-image"
            name="upload-image"
            type="file"
          />
          <label htmlFor="upload-image">
            <Button component="span" color="primary" variant="outlined">
              Upload
            </Button>
          </label>
        </Stack>
      </Paper>
    </Stack>
  );
};
