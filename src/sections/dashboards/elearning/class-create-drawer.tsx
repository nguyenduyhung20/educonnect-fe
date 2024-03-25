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
import useFunction from '@/hooks/use-function';
import { ClassApi } from '@/api/elearning/class';

export const ClassCreateDrawer = ({
  open,
  onClose,
  setRecall,
}: {
  open: boolean;
  onClose: () => void;
  setRecall: (recall: boolean) => void;
}) => {
  const formik = useFormik<{ name: string}>({
    initialValues: {
      name: '',
    },
    onSubmit: async (values) => {
      const { error } = await handleSubmitHelper.call(values);
      if (!error) {
        formik.setValues({
          name: '',
        });
      }
    }
  });

  const onSubmit = useCallback(
    async (values: { name: string }) => {
      try {
        await ClassApi.postClass(
          values
        );
        setRecall(true);
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
                Thêm lớp
              </Button>
            </Box>
          </Box>
        </Paper>

        <Stack direction={'column'} spacing={2} padding={2}>
          <Stack direction={'column'} spacing={1}>
            <Typography variant="h5">Tên lớp</Typography>

            <TextField
              placeholder="Nhập tên lớp"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
          </Stack>
        </Stack>
      </form>
    </Drawer>
  );
};
