import {
  Box,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography
} from '@mui/material';
import React from 'react';

export const ElearningClassTeacherRole = ({ classList, setClassId, setInSubject, setSubjectName }) => {
  return (
    <>
      <Box>
        <Grid container spacing={3}>
        {classList?.map((item, index) => (
            <Grid key={index} item xs={3}>
              <Card
              onClick={() => {setInSubject(item.subject?.id); setClassId(item.classroom?.id); setSubjectName(item.subject.name + ' - ' + item.classroom?.name)}}
              sx={{
                minHeight: '100px',
                cursor: 'pointer'
              }}
              >
                <CardContent>
                  <Stack spacing={1}>
                    <Typography fontSize={20} variant="h4">
                      {item.classroom?.name}
                    </Typography>
                    <Typography>{item.subject?.name}</Typography>
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
