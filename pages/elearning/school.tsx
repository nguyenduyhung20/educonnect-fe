import Head from 'next/head';
import {
  Box,
  Button,
  Container,
  Stack,
  Tab,
  Tabs,
  Typography
} from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import ElearningLayout from '@/layouts/elearning';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { ContainHeader } from '@/sections/dashboards/elearning/contain-header';
import { ElearningClassStudentRole } from '@/sections/dashboards/elearning/elearning-class-student-role';
import { ElearningClassTeacherRole } from '@/sections/dashboards/elearning/elearning-class-teacher-role';
import useFunction from '@/hooks/use-function';
import { ClassApi } from '@/api/elearning/class';
import { ElearningDocument } from '@/sections/dashboards/elearning/elearning-document';
import { useAuth } from '@/hooks/use-auth';
import { ElearningClassAdminRole } from '@/sections/dashboards/elearning/elearning-class-admin-role';

function EleaningPage() {
  const [inSubject, setInSubject] = useState(0);
  const [subjectName, setSubjectName] = useState('');
  const { user } = useAuth();
  const getClass = useFunction(ClassApi.getClassStudentLearning);
  const getSchool = useFunction(ClassApi.getSchool);
  useEffect(() => {
    getClass.call('');
    getSchool.call('');
  }, []);

  const [classId, setClassId] = useState(0);
  const classList = useMemo(() => {
    const classMapped = getClass.data?.data;
    if (classMapped?.length && user?.role === 'student') {
      setClassId(classMapped?.[0].classroom.id);
    }
    return classMapped;
  }, [getClass.data]);

  const school = useMemo(() => {
    return getSchool.data?.data?.school;
  }, [getSchool.data]);

  return (
    <>
      <Head>
        <title>EduConnect</title>
      </Head>

      <Container maxWidth="lg">
        {user?.role === 'admin' ? (
          <>{<ElearningClassAdminRole />}</>
        ) : (
          <Stack mt={2} spacing={4}>
            {school && (
              <Box textAlign={'center'}>
                <Typography fontSize={24} variant="h4">
                  Trường {school?.name}
                </Typography>
                <Typography fontSize={16} variant="h5">
                  {school?.address}
                </Typography>
              </Box>
            )}
            <Box
              display={'flex'}
              justifyContent={
                user?.role === 'teacher'
                  ? 'flex-start'
                  : inSubject
                  ? 'space-between'
                  : 'flex-end'
              }
              alignItems={'center'}
            >
              {inSubject !== 0 && (
                <Box display={'flex'} alignItems={'center'}>
                  <Button
                    style={{ height: 38 }}
                    onClick={() => setInSubject(0)}
                  >
                    <KeyboardBackspaceIcon />
                  </Button>
                  <Typography fontSize={20} variant="h5">
                    {subjectName}
                  </Typography>
                </Box>
              )}
              {user?.role !== 'teacher' && (
                <ContainHeader
                  tabs={
                    <Tabs
                      indicatorColor="primary"
                      textColor="primary"
                      value={classId}
                      onChange={(_, value) => {
                        setClassId(value);
                        setInSubject(0);
                      }}
                    >
                      {classList?.map((item) => (
                        <Tab
                          key={item.classroom?.id}
                          label={'Lớp ' + item.classroom?.name}
                          value={item.classroom?.id}
                        />
                      ))}
                    </Tabs>
                  }
                />
              )}
            </Box>
            {inSubject === 0 ? (
              user?.role === 'teacher' ? (
                <ElearningClassTeacherRole
                  classList={classList}
                  setClassId={setClassId}
                  setInSubject={setInSubject}
                  setSubjectName={setSubjectName}
                />
              ) : (
                <ElearningClassStudentRole
                  classId={classId}
                  setInSubject={setInSubject}
                  setSubjectName={setSubjectName}
                />
              )
            ) : (
              <>
                <ElearningDocument classId={classId} subjectId={inSubject} />
              </>
            )}
          </Stack>
        )}
      </Container>
    </>
  );
}

EleaningPage.getLayout = (page) => <ElearningLayout>{page}</ElearningLayout>;

export default EleaningPage;
