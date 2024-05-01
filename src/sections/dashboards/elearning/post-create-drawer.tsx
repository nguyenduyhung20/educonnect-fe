import {
  Box,
  Button,
  Drawer,
  Paper,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import React, { useCallback } from 'react';
import { ArrowBack } from '@mui/icons-material';
import { useFormik } from 'formik';
import { Post } from '@/types/post';
import useFunction from '@/hooks/use-function';
import { ClassApi } from '@/api/elearning/class';

export const PostCreateDrawer = ({
  open,
  onClose,
  data,
}: {
  open: boolean;
  onClose: () => void;
  data: any;
}) => {
  const formik = useFormik<Partial<Post>>({
    initialValues: {
      title: '',
      content: '',
      fileContent: [data?.url]
    },
    onSubmit: async (values) => {
      values.fileContent = [data?.url];
      const { error } = await handleSubmitHelper.call(values);
      if (!error) {
        formik.setValues({
          title: '',
          content: '',
          fileContent: [data?.url]
        });
      }
    }
  });

  const onSubmit = useCallback(
    async (values: Partial<Post>) => {
      try {
        await ClassApi.shareDocument(values);
        onClose();
      } catch (error) {
        throw error;
      }
    },
    []
  );

  const handleSubmitHelper = useFunction(onSubmit, {
    successMessage: 'Thêm thành công!'
  });

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
              alignItems: 'center'
            }}
          >
            <Box sx={{ cursor: 'pointer' }} onClick={onClose}>
              <Typography variant="body2">
                <ArrowBack
                  fontSize="small"
                  sx={{
                    verticalAlign: 'middle'
                  }}
                />{' '}
                Quay lại
              </Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                gap: 2,
                alignItems: 'center'
              }}
            >
              <Button
                variant="contained"
                color="primary"
                type="submit"
              >
                Chia sẻ tài liệu
              </Button>
            </Box>
          </Box>
        </Paper>

        <Stack direction={'column'} spacing={2} padding={2}>
          <Stack direction={'column'} spacing={1}>
            <Typography variant="h5">Tiêu đề</Typography>

            <TextField
              placeholder="Nhập tiêu đề"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
            />
          </Stack>
          
          <Stack direction={'column'} spacing={1}>
            <Typography variant="h5">Nội dung</Typography>

            <TextField
              placeholder="Nhập nội dung"
              name="content"
              value={formik.values.content}
              onChange={formik.handleChange}
            />
          </Stack>

          <Stack direction={'column'} spacing={1}>
            <Typography variant="h5">File</Typography>
            <TextField
              InputProps={{
                readOnly: true
              }}
              value={data?.title}
            />
          </Stack>
        </Stack>
      </form>
    </Drawer>
  );
};
