import {
  Box,
  Button,
  Drawer,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ArrowBack } from '@mui/icons-material';
import { useFormik } from 'formik';
import useFunction from '@/hooks/use-function';
import { ClassApi } from '@/api/elearning/class';
import SearchIcon from '@mui/icons-material/Search';

export const ClassManagerDrawer = ({
  open,
  data,
  classId,
  onClose,
  setRecall
}: {
  open: boolean;
  data: any;
  classId: number;
  onClose: () => void;
  setRecall: (recall: boolean) => void;
}) => {
  const formik = useFormik<{ name: string }>({
    initialValues: {
      name: ''
    },
    onSubmit: async (values) => {
      const { error } = await handleSubmitHelper.call(values);
      if (!error) {
        formik.setValues({
          name: ''
        });
      }
    }
  });
  const [user, setUser] = useState(null);
  const [searched, setSearched] = useState(false);

  const onSubmit = useCallback(
    async (values: { name: string }) => {
      console.log(values);
      try {
        if (data?.type === 'student') {
          const reqData = {
            studentId: user.id
          };
          console.log(reqData);
          await ClassApi.addStudentToClass(classId, reqData);
        } else if (data?.type === 'teacher') {
          const reqData = {
            id: parseInt(subject),
            teacherId: data?.data?.teacher?.user?.id,
            newTeacherId: user?.id
          };
          await ClassApi.updateSubjectInClass(classId, reqData);
        } else if (data?.type === 'subject') {
          const reqData = {
            subjectId: parseInt(subject),
            teacherId: user?.id
          };
          console.log(reqData);
          await ClassApi.postSubjectToClass(classId, reqData);
        } else {
          throw new Error('Đã có lỗi xảy ra');
        }
        setRecall(true);
        setSearched(false);
        onClose();
      } catch (error) {
        throw error;
      }
    },
    [data, user]
  );

  const getSubject = useFunction(ClassApi.getSubject);

  useEffect(() => {
    getSubject.call('');
  }, []);

  const subjectList = useMemo(() => {
    return getSubject.data?.data;
  }, [getSubject.data]);

  const handleSubmitHelper = useFunction(onSubmit, {
    successMessage: 'Thêm thành công!'
  });

  const [subject, setSubject] = React.useState('1');

  const handleChange = (event: SelectChangeEvent) => {
    setSubject(event.target.value as string);
  };

  const searchUser = async () => {
    try {
      const ret = await ClassApi.searchUser(formik.values.name);
      setUser(ret.data?.user);
      setSearched(true);
    } catch (error) {
      throw error;
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      PaperProps={{
        sx: {
          width: 640
        }
      }}
      onClose={() => {
        setUser(null);
        setSearched(false);
        formik.setFieldValue('name', '');
        onClose();
      }}
    >
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
              onClick={() => formik.handleSubmit()}
              disabled={user ? false : true}
            >
              {data?.type === 'teacher'
                ? 'Cập nhật'
                : data?.type === 'student'
                ? 'Thêm học sinh'
                : 'Thêm môn học'}
            </Button>
          </Box>
        </Box>
      </Paper>

      {/* Thêm học sinh */}
      {data?.type === 'student' && (
        <Stack direction={'column'} spacing={2} padding={2}>
          <Typography variant="h5">Tên đăng nhập học sinh</Typography>
          <Box display={'flex'} alignItems={'center'}>
            <TextField
              fullWidth={true}
              placeholder="Nhập tên đăng nhập học sinh"
              name="name"
              value={formik.values.name}
              onChange={(e) => {
                if (searched) {
                  setSearched(false);
                }
                formik.handleChange(e);
              }}
            />
            <Button sx={{ marginLeft: '4px' }} onClick={searchUser}>
              <SearchIcon />
              <Typography sx={{ width: '100px' }}>Tìm kiếm</Typography>
            </Button>
          </Box>
        </Stack>
      )}

      {/* Thay đổi giáo viên */}
      {data?.type === 'teacher' && (
        <Stack direction={'column'} spacing={2} padding={2}>
          <Typography variant="h5">Môn học</Typography>
          <TextField
            id="outlined-basic"
            variant="outlined"
            value={data.data?.subject.name}
            InputProps={{
              readOnly: true
            }}
          />
          <Typography variant="h5">Tên đăng nhập giáo viên</Typography>
          <Box display={'flex'} alignItems={'center'}>
            <TextField
              fullWidth={true}
              placeholder="Nhập tên đăng nhập giáo viên"
              name="name"
              value={formik.values.name}
              onChange={(e) => {
                if (searched) {
                  setSearched(false);
                }
                formik.handleChange(e);
              }}
            />
            <Button sx={{ marginLeft: '4px' }} onClick={searchUser}>
              <SearchIcon />
              <Typography sx={{ width: '100px' }}>Tìm kiếm</Typography>
            </Button>
          </Box>
        </Stack>
      )}

      {/* Thêm môn học */}
      {data?.type === 'subject' && (
        <Stack direction={'column'} spacing={2} padding={2}>
          <FormControl fullWidth sx={{ marginTop: '8px' }}>
            <InputLabel id="demo-simple-select-label">Môn học</InputLabel>
            <Select
              fullWidth
              value={subject}
              labelId="demo-simple-select-label"
              label="Môn học"
              id="demo-simple-select"
              onChange={handleChange}
            >
              {subjectList?.map((item, index) => (
                <MenuItem key={index} value={item.id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Typography variant="h5">Tên đăng nhập giáo viên</Typography>
          <Box display={'flex'} alignItems={'center'}>
            <TextField
              fullWidth={true}
              placeholder="Nhập tên đăng nhập giáo viên"
              name="name"
              value={formik.values.name}
              onChange={(e) => {
                if (searched) {
                  setSearched(false);
                }
                formik.handleChange(e);
              }}
            />
            <Button sx={{ marginLeft: '4px' }} onClick={searchUser}>
              <SearchIcon />
              <Typography sx={{ width: '100px' }}>Tìm kiếm</Typography>
            </Button>
          </Box>
        </Stack>
      )}

      {searched && (
        <Stack direction={'column'} spacing={1} paddingX={2}>
          {user ? (
            <>
              <Typography variant="h5">Tài khoản tìm được</Typography>
              <Box paddingX={2}>
                <TextField
                  fullWidth={true}
                  margin={'normal'}
                  variant="outlined"
                  label="ID"
                  value={user?.id}
                  InputProps={{
                    readOnly: true
                  }}
                />
                <TextField
                  fullWidth={true}
                  margin={'normal'}
                  variant="outlined"
                  label="Tên"
                  value={user?.name}
                  InputProps={{
                    readOnly: true
                  }}
                />
                <TextField
                  fullWidth={true}
                  margin={'normal'}
                  variant="outlined"
                  label="Vai trò"
                  value={user?.role}
                  InputProps={{
                    readOnly: true
                  }}
                />
                <TextField
                  fullWidth={true}
                  margin={'normal'}
                  variant="outlined"
                  label="Sinh nhật"
                  value={user?.birthday}
                  InputProps={{
                    readOnly: true
                  }}
                />
                <TextField
                  fullWidth={true}
                  margin={'normal'}
                  variant="outlined"
                  label="Giới tính"
                  value={user?.sex === 'male' ? 'Nam' : 'Nữ'}
                  InputProps={{
                    readOnly: true
                  }}
                />
                <TextField
                  fullWidth={true}
                  margin={'normal'}
                  variant="outlined"
                  label="Địa chỉ"
                  value={user?.address}
                  InputProps={{
                    readOnly: true
                  }}
                />
                <TextField
                  fullWidth={true}
                  margin={'normal'}
                  variant="outlined"
                  label="Số điện thoại"
                  value={user?.phone}
                  InputProps={{
                    readOnly: true
                  }}
                />
              </Box>
            </>
          ) : (
            <Box>
              <Typography variant="h6">Không tìm được tài khoản nào</Typography>
            </Box>
          )}
        </Stack>
      )}
    </Drawer>
  );
};
