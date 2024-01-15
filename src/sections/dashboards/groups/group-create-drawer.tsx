import {
  Box,
  Button,
  Drawer,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import React, { useCallback, useState } from 'react';
import { ArrowBack } from '@mui/icons-material';
import { useFormik } from 'formik';
import { useGroupsContext } from '@/contexts/groups/groups-context';
import { Group } from '@/types/groups';
import useFunction from '@/hooks/use-function';
import { useDropzone } from 'react-dropzone';

export const GroupCreateDrawer = ({
  open,
  onClose
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const { createGroup } = useGroupsContext();

  const [images, setImages] = useState([]);

  const formik = useFormik<Partial<Group> & { uploadedFiles: File[] }>({
    initialValues: {
      title: '',
      meta_title: '',
      uploadedFiles: null
    },
    onSubmit: async (values) => {
      const { error } = await handleSubmitHelper.call(values);
      if (!error) {
        formik.setValues({
          title: '',
          meta_title: '',
          uploadedFiles: null
        });
        setImages([]);
      }
    }
  });

  const onSubmit = useCallback(
    async (values: Partial<Group> & { uploadedFiles: File[] }) => {
      try {
        // await createGroup(values);
        console.log(values);
      } catch (error) {
        throw error;
      }
    },
    [createGroup]
  );

  const handleSubmitHelper = useFunction(onSubmit, {
    successMessage: 'Thêm thành công!'
  });

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

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Drawer
      anchor="right"
      open={open}
      PaperProps={{
        sx: {
          width: 640
        }
      }}
      onClose={onClose}
    >
      <form onSubmit={formik.handleSubmit}>
        <Paper elevation={5} sx={{ p: 3, borderRadius: 0 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start'
            }}
          >
            <Box>
              <Box sx={{ cursor: 'pointer' }} onClick={onClose}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <ArrowBack
                    fontSize="small"
                    sx={{
                      verticalAlign: 'middle'
                    }}
                  />{' '}
                  Quay lại
                </Typography>
              </Box>
              <Typography variant="h6">{'Tạo nhóm của bạn'}</Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                gap: 2,
                alignItems: 'center'
              }}
            >
              <Button color="inherit" variant="contained" onClick={onClose}>
                Hủy bỏ
              </Button>
              <Button variant="contained" color="primary" type="submit">
                Tạo nhóm
              </Button>
            </Box>
          </Box>
        </Paper>

        <Stack direction={'column'} spacing={2} padding={2}>
          <Stack direction={'column'} spacing={1}>
            <Typography variant="h5">Tên nhóm</Typography>

            <TextField
              placeholder="Nhập tên nhóm"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
            />
          </Stack>

          <Stack direction={'column'} spacing={1}>
            <Typography variant="h5">Mô tả nhóm</Typography>

            <TextField
              placeholder="Nhập mô tả nhóm"
              name="meta_title"
              value={formik.values.meta_title}
              onChange={formik.handleChange}
            />
          </Stack>

          <Stack direction={'column'} spacing={1}>
            <Typography variant="h5">Ảnh đại diện và ảnh bìa nhóm</Typography>
            <Typography variant="subtitle2">
              Ảnh được tải theo thứ tự ảnh đại diện - ảnh bìa
            </Typography>
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
                {...getRootProps()}
              >
                <label htmlFor="upload-image">
                  <Button component="span" color="primary" variant="contained">
                    Tải ảnh
                  </Button>
                  <input
                    id="upload-image"
                    name="upload-image"
                    type="file"
                    {...getInputProps()}
                  />
                </label>
              </Stack>
              <></>
            </Paper>
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
          </Stack>
        </Stack>
      </form>
    </Drawer>
  );
};
