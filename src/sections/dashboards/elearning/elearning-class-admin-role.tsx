import {
  Box,
  Button,
  Card,
  Grid,
  Stack,
  CardContent,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tab,
  CardActions,
  TextField,
  SelectChangeEvent,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import React from 'react';
import { useEffect, useMemo, useState } from 'react';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import useFunction from '@/hooks/use-function';
import { ClassApi } from '@/api/elearning/class';
import { EleaningClassInfo } from './elearning-class-info';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import UserTable from './user-table';
import { DeleteDialog } from './delete-dialog';
import { useDialog } from '@/hooks/use-dialog';
import { DeleteDialogData } from '@/types/elearning';
import { useDrawer } from '@/hooks/use-drawer';
import { ClassCreateDrawer } from './class-create-drawer';
import { ElearningDocument } from './elearning-document';

export const ElearningClassAdminRole = () => {
  const [inClass, setInClass] = useState(0);
  const [inSubject, setInSubject] = useState(0);
  const [className, setClassName] = useState('');
  const [subjectName, setSubjectName] = useState('');
  const [valueTab, setValueTab] = useState('0');
  const deleteDialog = useDialog<DeleteDialogData>();
  const classCreateDrawer = useDrawer();
  const splitClassList = {};
  const [selectedSchoolYear, setselectedSchoolYear] = useState<string>('');

  const timeToSchoolYear = (inputDate: string) => {
    const date = new Date(inputDate);
    let schoolYear = '';
    if (date.getMonth() < 6) {
      schoolYear = `${date.getFullYear() - 1}-${date.getFullYear()}`;
    } else {
      schoolYear = `${date.getFullYear()}-${date.getFullYear() + 1}`;
    }
    return schoolYear;
  };

  const onChangeSelect = (ev: SelectChangeEvent) => {
    setselectedSchoolYear(ev.target.value);
  };

  const handleChangeTab = (_: React.SyntheticEvent, newValue: string) => {
    setValueTab(newValue);
    setInClass(0);
  };
  const [recall, setRecall] = useState(false);
  const getClass = useFunction(ClassApi.getClassStudentLearning);

  useEffect(() => {
    getClass.call('');
    setRecall(false);
  }, [recall]);

  const classList = useMemo(() => {
    return getClass.data?.data?.[0];
  }, [getClass.data]);

  const [title, setTitle] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [docuSelected, setDocuSelected] = useState(null);

  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleCancel = () => {
    setOpenDialog(false);
  };

  const handleSave = async () => {
    const newDocu = classList?.school?.classroom[docuSelected];
    newDocu.name = title;
    await ClassApi.updateClass(newDocu);
    if (classList && classList.school) {
      classList.school.classroom[docuSelected].name = title;
    }
    getClass.setData({
      data: [classList]
    });
    setOpenDialog(false);
  };

  classList?.school?.classroom?.forEach((element) => {
    const schoolYear = timeToSchoolYear(element?.create_at);
    if (splitClassList[schoolYear]) {
      splitClassList[schoolYear]?.push(element);
    } else {
      splitClassList[schoolYear] = [element];
    }
  });
  const selected = Object.keys(splitClassList).length
    ? Object.keys(splitClassList)[0]
    : '';
  if (selectedSchoolYear === '' && selected !== '') {
    setselectedSchoolYear(selected);
  }

  const updateClass = useFunction(handleSave, {
    successMessage: 'Cập nhật thành công!'
  });

  return (
    <>
      <Stack mt={2} spacing={1}>
        <TabContext value={valueTab}>
          <Box textAlign={'center'}>
            <Typography fontSize={24} variant="h4">
              Trường {classList?.school?.name}
            </Typography>
            <Typography fontSize={16} variant="h5">
              {classList?.school?.address}
            </Typography>
          </Box>
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            {inClass !== 0 ? (
              <Box display={'flex'} alignItems={'center'}>
                <Button
                  style={{ height: 38 }}
                  onClick={() =>
                    inSubject === 0 ? setInClass(0) : setInSubject(0)
                  }
                >
                  <KeyboardBackspaceIcon />
                </Button>
                <Typography fontSize={20} variant="h5">
                  {inSubject === 0 ? className : subjectName}
                </Typography>
              </Box>
            ) : (
              <FormControl sx={{ m: 1, minWidth: 120 }} variant="standard">
                <InputLabel
                  style={{ fontSize: '16px' }}
                  id="demo-select-small-label"
                >
                  Niên khóa
                </InputLabel>
                <Select
                  style={{ fontSize: '16px' }}
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={selectedSchoolYear}
                  onChange={onChangeSelect}
                >
                  {Object.keys(splitClassList)?.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList
                onChange={handleChangeTab}
                aria-label="lab API tabs example"
              >
                <Tab label="Lớp học" value="0" />
                <Tab label="Giáo viên" value="1" />
                <Tab label="Học sinh" value="2" />
                <Tab label="Phụ huynh" value="3" />
              </TabList>
            </Box>
          </Box>

          <TabPanel value="0">
            {inClass === 0 ? (
              <>
                <Box
                  width={'100%'}
                  display={'flex'}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                >
                  <Typography fontSize={18} variant="h4">
                    Danh sách lớp học
                  </Typography>
                  <Button onClick={() => classCreateDrawer.handleOpen()}>
                    <AddIcon />
                    <Typography>Thêm lớp học</Typography>
                  </Button>
                </Box>
                <Grid container spacing={3}>
                  {splitClassList?.[selectedSchoolYear]?.map((item, index) => (
                    <Grid key={index} item xs={3}>
                      <Card
                        onClick={() => {
                          setInClass(item?.id);
                          setClassName(item?.name);
                        }}
                        sx={{
                          minHeight: '100px',
                          cursor: 'pointer'
                        }}
                      >
                        <CardContent>
                          <Stack spacing={3}>
                            <Typography fontSize={20} variant="h4">
                              {item?.name}
                            </Typography>
                          </Stack>
                          <CardActions
                            sx={{ width: '100%', justifyContent: 'flex-end' }}
                          >
                            <ModeEditOutlineIcon
                              sx={{
                                padding: '2px',
                                '&:hover': {
                                  color: 'blue'
                                }
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                setTitle(item.name);
                                setOpenDialog(true);
                                setDocuSelected(index);
                              }}
                            />
                            <DeleteOutlineIcon
                              sx={{
                                padding: '2px',
                                '&:hover': {
                                  color: 'red'
                                }
                              }}
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteDialog.handleOpen({
                                  message: `Bạn muốn xóa lớp ${item.name} khỏi trường?`,
                                  id: item.id,
                                  type: 'class'
                                });
                              }}
                            />
                          </CardActions>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </>
            ) : inSubject === 0 ? (
              <EleaningClassInfo
                classId={inClass}
                setInSubject={setInSubject}
                setSubjectName={setSubjectName}
              />
            ) : (
              <ElearningDocument classId={inClass} subjectId={inSubject} />
            )}
          </TabPanel>

          <TabPanel value="1">
            <UserTable type={'teacher'} />
          </TabPanel>

          <TabPanel value="2">
            <UserTable type={'student'} />
          </TabPanel>

          <TabPanel value="3">
            <UserTable type={'parent'} />
          </TabPanel>
        </TabContext>
      </Stack>
      <DeleteDialog
        open={deleteDialog.open}
        data={deleteDialog.data}
        onClose={deleteDialog.handleClose}
        onConfirm={async () => {
          try {
            await ClassApi.deleteClass(deleteDialog.data.id);
            classList.school.classroom = classList?.school?.classroom?.filter(
              (item) => item.id !== deleteDialog.data.id
            );
            getClass.setData({
              data: [classList]
            });
          } catch (error) {
            throw error;
          }
        }}
      />

      <Dialog open={openDialog} onClose={handleCancel}>
        <DialogTitle>Đổi tên lớp</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Tên"
            type="text"
            fullWidth
            value={title}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Hủy bỏ
          </Button>
          <Button
            onClick={async () => await updateClass.call({})}
            color="primary"
          >
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>

      <ClassCreateDrawer
        open={classCreateDrawer.open}
        onClose={classCreateDrawer.handleClose}
        setRecall={setRecall}
      />
    </>
  );
};
