import { ClassApi } from '@/api/elearning/class';
import useFunction from '@/hooks/use-function';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  Typography
} from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';

export const ElearningClassStudentRole = ({ classId, setInSubject, setSubjectName }) => {
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
              onClick={() => {setInSubject(item.subject?.id); setSubjectName(item.subject.name)}}
              sx={{
                minHeight: '120px',
                cursor: 'pointer'
              }}>
                {/* <CardMedia
                  component={'img'}
                  image={'/static/images/elearning/sgk-hoa-lop-10.jpg'}
                /> */}
                <CardContent>
                  <Stack spacing={1}>
                    <Typography fontSize={20} variant="h4" >
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
