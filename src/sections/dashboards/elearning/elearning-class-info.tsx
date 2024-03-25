import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  Button
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddIcon from '@mui/icons-material/Add';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useEffect, useMemo, useState } from 'react';
import useFunction from '@/hooks/use-function';
import { ClassApi } from '@/api/elearning/class';
import { DeleteDialog } from './delete-dialog';
import { useDialog } from '@/hooks/use-dialog';
import { DeleteDialogData } from '@/types/elearning';
import { useDrawer } from '@/hooks/use-drawer';
import { ClassManagerDrawer } from './class-manager-drawer';

export const EleaningClassInfo = ({ classId }) => {
  const getSubject = useFunction(ClassApi.getSubjectOfClass);
  const getTeacher = useFunction(ClassApi.getTeacherOfClass);
  const getStudent = useFunction(ClassApi.getStudentOfClass);
  const [recall, setRecall] = useState(false);

  useEffect(() => {
    getSubject.call(classId);
    getTeacher.call(classId);
    getStudent.call(classId);
    setRecall(false);
  }, [classId, recall]);

  const classManagerDrawer = useDrawer();

  const teacherList = useMemo(() => {
    return getTeacher.data?.data;
  }, [getTeacher.data]);
  const studentList = useMemo(() => {
    return getStudent.data?.data;
  }, [getStudent.data]);

  const deleteDialog = useDialog<DeleteDialogData>();

  return (
    <>
      <Box sx={{ width: 1, mt: 2 }}>
        <Card>
          <Accordion defaultExpanded>
            <AccordionSummary
              sx={{ flexDirection: 'row-reverse' }}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Box
                width={'100%'}
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
              >
                <Typography fontSize={18} variant="h4">
                  Danh sách môn học
                </Typography>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    classManagerDrawer.handleOpen({ type: 'subject' });
                  }}
                >
                  <AddIcon />
                  <Typography>Thêm môn học</Typography>
                </Button>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">ID môn học</TableCell>
                    <TableCell align="center">Tên môn học</TableCell>
                    <TableCell align="center">ID giáo viên</TableCell>
                    <TableCell align="center">Giáo viên giảng dạy</TableCell>
                    <TableCell align="center">Hành động</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {getSubject.data?.data?.map((item, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        '.MuiTableCell-root': {
                          paddingTop: '16px',
                          paddingBottom: '16px'
                        }
                      }}
                    >
                      <TableCell align="center" width={120}>
                        <Typography>{item.subject.id}</Typography>
                      </TableCell>
                      <TableCell align="center">{item.subject.name}</TableCell>
                      <TableCell align="center" width={120}>
                        <Typography>{item.teacher?.user?.id}</Typography>
                      </TableCell>
                      <TableCell align="center" sx={{ whiteSpace: 'nowrap' }}>
                        {item.teacher?.user?.name}
                      </TableCell>
                      <TableCell align="center" width={180}>
                        <ModeEditOutlineIcon
                          sx={{
                            whiteSpace: 'nowrap',
                            cursor: 'pointer',
                            '&:hover': {
                              color: 'blue'
                            }
                          }}
                          onClick={() => {
                            classManagerDrawer.handleOpen({
                              type: 'teacher',
                              data: item
                            });
                          }}
                        />
                        <DeleteOutlineIcon
                          sx={{
                            marginLeft: '16px',
                            whiteSpace: 'nowrap',
                            cursor: 'pointer',
                            '&:hover': {
                              color: 'red'
                            }
                          }}
                          onClick={() =>
                            deleteDialog.handleOpen({
                              message: `Bạn muốn xóa môn học ${item.subject.name} khỏi lớp?`,
                              id: item.subject.id,
                              type: 'subject'
                            })
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </AccordionDetails>
          </Accordion>
        </Card>
      </Box>
      <Box sx={{ width: 1, mt: 2 }}>
        <Card>
          <Accordion defaultExpanded>
            <AccordionSummary
              sx={{ flexDirection: 'row-reverse' }}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Box
                width={'100%'}
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
              >
                <Typography fontSize={18} variant="h4">
                  Danh sách học sinh
                </Typography>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    classManagerDrawer.handleOpen({ type: 'student' });
                  }}
                >
                  <AddIcon />
                  <Typography>Thêm học sinh</Typography>
                </Button>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">ID học sinh</TableCell>
                    <TableCell align="center">Tên học sinh</TableCell>
                    <TableCell align="center">Giới tính</TableCell>
                    <TableCell align="center">Ngày sinh</TableCell>
                    <TableCell align="center">Địa chỉ</TableCell>
                    <TableCell align="center">Xóa</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {studentList?.map((item, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        '.MuiTableCell-root': {
                          paddingTop: '16px',
                          paddingBottom: '16px'
                        }
                      }}
                    >
                      <TableCell align="center" width={120}>
                        <Typography>{item.student?.user.id}</Typography>
                      </TableCell>

                      <TableCell width={400} align="center">
                        {item.student?.user.name}
                      </TableCell>
                      <TableCell
                        align="center"
                        width={120}
                        sx={{ whiteSpace: 'nowrap' }}
                      >
                        {item.student?.user.sex}
                      </TableCell>
                      <TableCell
                        align="center"
                        width={240}
                        sx={{ whiteSpace: 'nowrap' }}
                      >
                        {new Date(
                          item.student?.user?.birthday
                        ).toLocaleDateString('en-GB')}
                      </TableCell>
                      <TableCell align="center" sx={{ whiteSpace: 'nowrap' }}>
                        {item.student?.user.address}
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          whiteSpace: 'nowrap',
                          cursor: 'pointer',
                          '&:hover': {
                            color: 'red'
                          }
                        }}
                        width={40}
                        onClick={() =>
                          deleteDialog.handleOpen({
                            message: `Bạn muốn xóa học sinh ${item.student?.user.name} khỏi lớp?`,
                            id: item.student.user.id,
                            type: 'student'
                          })
                        }
                      >
                        <DeleteOutlineIcon />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </AccordionDetails>
          </Accordion>
        </Card>
      </Box>
      <Box sx={{ width: 1, mt: 2 }}>
        <Card>
          <Accordion defaultExpanded>
            <AccordionSummary
              sx={{ flexDirection: 'row-reverse' }}
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Box width={'100%'} display={'flex'} alignItems={'center'}>
                <Typography fontSize={18} variant="h4">
                  Danh sách giáo viên
                </Typography>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">ID giáo viên</TableCell>
                    <TableCell align="center">Tên giáo viên</TableCell>
                    <TableCell align="center">Giới tính</TableCell>
                    <TableCell align="center">Ngày sinh</TableCell>
                    <TableCell align="center">Địa chỉ</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {teacherList?.map((item, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        '.MuiTableCell-root': {
                          paddingTop: '16px',
                          paddingBottom: '16px'
                        }
                      }}
                    >
                      <TableCell align="center" width={120}>
                        <Typography>{item.teacher?.user?.id}</Typography>
                      </TableCell>

                      <TableCell width={400} align="center">
                        {item.teacher?.user?.name}
                      </TableCell>
                      <TableCell
                        align="center"
                        width={120}
                        sx={{ whiteSpace: 'nowrap' }}
                      >
                        {item.teacher?.user?.sex === 'male' ? 'Nam' : 'Nữ'}
                      </TableCell>
                      <TableCell
                        align="center"
                        width={240}
                        sx={{ whiteSpace: 'nowrap' }}
                      >
                        {new Date(
                          item.teacher?.user?.birthday
                        ).toLocaleDateString('en-GB')}
                      </TableCell>
                      <TableCell align="center" sx={{ whiteSpace: 'nowrap' }}>
                        {item.teacher?.user?.address}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </AccordionDetails>
          </Accordion>
        </Card>
      </Box>
      <DeleteDialog
        open={deleteDialog.open}
        data={deleteDialog.data}
        onClose={deleteDialog.handleClose}
        onConfirm={async () => {
          try {
            if (deleteDialog.data?.type === 'student') {
              const studentId = deleteDialog.data?.id;
              await ClassApi.deleteStudentInClass({ classId, studentId });
              console.log('student');
              getStudent.setData({
                data: studentList.filter(
                  (item) => item.student.user.id !== studentId
                )
              });
            } else {
              const subjectId = deleteDialog.data?.id;
              await ClassApi.deleteSubjectInClass({ classId, subjectId });
              getSubject.setData({
                data: getSubject.data?.data.filter(
                  (item) => item.subject.id !== subjectId
                )
              });
            }
          } catch (error) {
            throw error;
          }
        }}
      />

      <ClassManagerDrawer
        open={classManagerDrawer.open}
        data={classManagerDrawer.data}
        classId={classId}
        onClose={classManagerDrawer.handleClose}
        setRecall={setRecall}
      />
    </>
  );
};
