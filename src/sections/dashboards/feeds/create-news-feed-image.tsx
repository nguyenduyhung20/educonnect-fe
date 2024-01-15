import {
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
  styled
} from '@mui/material';
import React from 'react';

export const CreateNewsFeedImage = () => {
  const Input = styled('input')({
    display: 'none'
  });
  return (
    <Stack spacing={1}>
      <TextField placeholder="Title" multiline></TextField>
      <Paper
        elevation={0}
        sx={{
          paddingTop: 20,
          paddingBottom: 20,
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
          <Typography color={'primary'} variant="h4" fontWeight={10}>
            Drag and drop image or
          </Typography>
          <Input
            accept="image/*"
            id="upload-image"
            name="upload-image"
            type="file"
          />
          <label htmlFor="upload-image">
            <Button component="span" color="primary" variant="outlined">
              Upload
            </Button>
          </label>
        </Stack>
      </Paper>
    </Stack>
  );
};
