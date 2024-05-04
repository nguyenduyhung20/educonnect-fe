import { ClassApi } from '@/api/elearning/class';
import useFunction from '@/hooks/use-function';
import { Box, Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import React, { useEffect, useMemo } from 'react';
import Animation0 from '../../../../public/static/images/animation/0.json';
import Animation1 from '../../../../public/static/images/animation/1.json';
import Animation2 from '../../../../public/static/images/animation/2.json';
import Animation3 from '../../../../public/static/images/animation/3.json';
import Animation4 from '../../../../public/static/images/animation/4.json';
import Animation5 from '../../../../public/static/images/animation/5.json';
import Animation6 from '../../../../public/static/images/animation/6.json';
import Animation7 from '../../../../public/static/images/animation/7.json';
import Animation8 from '../../../../public/static/images/animation/8.json';
import Animation9 from '../../../../public/static/images/animation/9.json';
import Animation10 from '../../../../public/static/images/animation/10.json';
import Animation11 from '../../../../public/static/images/animation/11.json';
import Animation12 from '../../../../public/static/images/animation/12.json';
import dynamic from 'next/dynamic';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

const animation = [
  Animation0,
  Animation1,
  Animation2,
  Animation3,
  Animation4,
  Animation5,
  Animation6,
  Animation7,
  Animation8,
  Animation9,
  Animation10,
  Animation11,
  Animation12
];

export const ElearningClassStudentRole = ({
  classId,
  setInSubject,
  setSubjectName
}) => {
  const getSubject = useFunction(ClassApi.getSubjectOfClass);
  useEffect(() => {
    getSubject.call(classId);
  }, [classId]);

  const subjectList = useMemo(() => {
    return getSubject.data?.data;
  }, [getSubject.data]);

  return (
    <>
      <Box>
        <Grid container spacing={3}>
          {subjectList?.map((item, index) => (
            <Grid item xs={3} key={index}>
              <Card
                onClick={() => {
                  setInSubject(item.subject?.id);
                  setSubjectName(item.subject.name);
                }}
                sx={{
                  minHeight: '120px',
                  cursor: 'pointer'
                }}
              >
                <CardContent>
                  <Stack spacing={1} minHeight={390}>
                    <Lottie
                      animationData={animation[item.subject.id % 13]}
                      loop={true}
                    />
                    <Typography fontSize={20} variant="h4">
                      {item.subject.name}
                    </Typography>
                    <Typography>{item.teacher?.user?.name}</Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};
