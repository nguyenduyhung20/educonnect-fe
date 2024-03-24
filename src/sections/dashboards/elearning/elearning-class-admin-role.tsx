import {
  Box,
  Button,
  Card,
  Accordion,
  AccordionSummary,
  AccordionDetails,
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
  TextField
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import React from 'react';
import { useEffect, useMemo, useState } from 'react';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import useFunction from '@/hooks/use-function';
import { ClassApi } from '@/api/elearning/class';
import { useAuth } from '@/hooks/use-auth';
import { EleaningClassInfo } from './elearning-class-info';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import UserTable from './user-table';
import { DeleteDialog } from './delete-dialog';
import { useDialog } from '@/hooks/use-dialog';
import { DeleteDialogData } from '@/types/elearning';
import { useDrawer } from '@/hooks/use-drawer';
import { ClassCreateDrawer } from './class-create-drawer';

export const ElearningClassAdminRole = () => {
  const [inClass, setInClass] = useState(0);
  const [className, setClassName] = useState('');
  const [valueTab, setValueTab] = useState('0');
  const deleteDialog = useDialog<DeleteDialogData>();
  const classCreateDrawer = useDrawer();

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
    console.log(getClass.data?.data?.[0]);
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
            justifyContent={inClass ? 'space-between' : 'flex-end'}
            alignItems={'center'}
          >
            {inClass !== 0 && (
              <Box display={'flex'} alignItems={'center'}>
                <Button style={{ height: 38 }} onClick={() => setInClass(0)}>
                  <KeyboardBackspaceIcon />
                </Button>
                <Typography fontSize={20} variant="h5">
                  {className}
                </Typography>
              </Box>
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
                  <Button  onClick={() => classCreateDrawer.handleOpen()}>
                    <AddIcon />
                    <Typography>Thêm lớp học</Typography>
                  </Button>
                </Box>
                <Grid container spacing={3}>
                  {classList?.school?.classroom?.map((item, index) => (
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
            ) : (
              <EleaningClassInfo classId={inClass} />
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
