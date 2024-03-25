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
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useFormik } from 'formik';
import { Document } from '@/types/elearning';
import useFunction from '@/hooks/use-function';
import { useDropzone } from 'react-dropzone';
import { ClassApi } from '@/api/elearning/class';
import { getFormData } from '@/utils/api-request';

export const DocuCreateDrawer = ({
  open,
  onClose,
  classId,
  subjectId,
  setRecall,
}: {
  open: boolean;
  onClose: () => void;
  classId: number;
  subjectId: number;
  setRecall: (recall: boolean) => void;
}) => {
  const [file, setFile] = useState(null);

  const formik = useFormik<Partial<Document> & { uploadedFile: File }>({
    initialValues: {
      title: '',
      uploadedFile: null
    },
    onSubmit: async (values) => {
      const { error } = await handleSubmitHelper.call(values);
      if (!error) {
        formik.setValues({
          title: '',
          uploadedFile: null
        });
        setFile(null);
      }
    }
  });

  const onSubmit = useCallback(
    async (values: Partial<Document> & { uploadedFile: File }) => {
      try {
        await ClassApi.createDocumentOfSubjectAndClass(
          { classId, subjectId },
          getFormData(values)
        );
        setRecall(true);
        console.log(values);
      } catch (error) {
        throw error;
      }
    },
    []
  );

  const handleSubmitHelper = useFunction(onSubmit, {
    successMessage: 'Thêm thành công!'
  });

  const onDrop = useCallback(
    (acceptedFiles) => {
      formik.setFieldValue('uploadedFile', acceptedFiles[0]);
      console.log(acceptedFiles);
      setFile(acceptedFiles[0]);
    },
    [formik]
  );

  const { getInputProps } = useDropzone({ onDrop });

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
                onClick={() => console.log(file)}
              >
                Thêm tài liệu
              </Button>
            </Box>
          </Box>
        </Paper>

        <Stack direction={'column'} spacing={2} padding={2}>
          <Stack direction={'column'} spacing={1}>
            <Typography variant="h5">Tên tài liệu</Typography>

            <TextField
              placeholder="Nhập tên nhóm"
              name="title"
              value={formik.values.title}
              onChange={formik.handleChange}
            />
          </Stack>

          <Stack direction={'column'} spacing={1}>
            <Typography variant="h5">File</Typography>

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
                {file ? (
                  <Box display={'flex'} alignItems={'center'}>
                    <Typography fontSize={'18px'} style={{ maxWidth: '100%' }}>
                      {file?.name}
                    </Typography>
                    <Button
                      sx={{
                        marginLeft: '2px',
                        '&:hover': {
                          color: 'red'
                        }
                      }}
                    >
                      <DeleteOutlineIcon
                        onClick={() => {
                          setFile(null);
                          formik.setFieldValue('uploadedFile', null);
                        }}
                      />
                    </Button>
                  </Box>
                ) : (
                  <label htmlFor="upload-image">
                    <Button
                      component="span"
                      color="primary"
                      variant="contained"
                    >
                      Tải File lên
                    </Button>
                    <input
                      id="upload-image"
                      name="upload-image"
                      type="file"
                      {...getInputProps()}
                    />
                  </label>
                )}
              </Stack>
            </Paper>
          </Stack>
        </Stack>
      </form>
    </Drawer>
  );
};
