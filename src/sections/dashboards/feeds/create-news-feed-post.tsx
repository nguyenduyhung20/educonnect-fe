import { Post } from '@/types/post';
import {
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
  styled
} from '@mui/material';
import { FormikProps } from 'formik';
import React, { useCallback, useState } from 'react';

const Input = styled('input')({
  display: 'none'
});
import { useDropzone } from 'react-dropzone';

export const CreateNewsFeedPost = ({
  formik
}: {
  formik: FormikProps<Partial<Post>>;
}) => {
  const [images, setImages] = useState([]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const selectedFiles = acceptedFiles.map((file) =>
        URL.createObjectURL(file)
      );
      formik.setFieldValue('uploadedFiles', acceptedFiles);
      setImages(selectedFiles);
    },
    [formik]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

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
          <div {...getRootProps()}>
            <input id="upload-image" name="upload-image" {...getInputProps()} />
            {isDragActive ? (
              <Typography color={'primary'} variant="h4" fontWeight={10}>
                Thả ảnh vào đây
              </Typography>
            ) : (
              <Typography color={'primary'} variant="h4" fontWeight={10}>
                Kéo và thả hình ảnh hoặc
              </Typography>
            )}
          </div>
          <label htmlFor="upload-image">
            <Button component="span" color="primary" variant="outlined">
              Tải lên
            </Button>
          </label>
        </Stack>
        <>
          <Grid container spacing={2} sx={{ pt: 2 }}>
            {images.map((url, index) => {
              return (
                <Grid key={index} item xs={6}>
                  <Box>
                    <img src={url} style={{ maxWidth: '100%' }} />
                  </Box>
                </Grid>
              );
            })}
          </Grid>
        </>
      </Paper>
    </Stack>
  );
};
