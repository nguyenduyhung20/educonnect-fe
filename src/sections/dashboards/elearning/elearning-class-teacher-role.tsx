import {
  Box,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  Typography
} from '@mui/material';
import React, { useState } from 'react';

export const ElearningClassTeacherRole = ({
  classList,
  setClassId,
  setInSubject,
  setSubjectName
}) => {
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

  classList?.forEach(element => {
    const schoolYear = timeToSchoolYear(element.classroom?.create_at);
    if (splitClassList[schoolYear]) {
      splitClassList[schoolYear]?.push(element);
    } else {
      splitClassList[schoolYear] = [element];
    }
  });
  const selected = Object.keys(splitClassList).length ? Object.keys(splitClassList)[0] : '';
  if (selectedSchoolYear === '' && selected !== '') {    
    setselectedSchoolYear(selected);
  }

  const onChangeSelect = (ev: SelectChangeEvent) => {
    setselectedSchoolYear((ev.target.value));
  };

  return (
    <>
      <Box>
        <FormControl sx={{ m: 1, minWidth: 120 }} variant="standard">
          <InputLabel style={{ fontSize: '16px' }} id="demo-select-small-label">
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
        <Grid container spacing={3}>
          {splitClassList?.[selectedSchoolYear]?.map((item, index) => (
            <Grid key={index} item xs={3}>
              <Card
                onClick={() => {
                  setInSubject(item.subject?.id);
                  setClassId(item.classroom?.id);
                  setSubjectName(
                    item.subject.name + ' - ' + item.classroom?.name
                  );
                }}
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
