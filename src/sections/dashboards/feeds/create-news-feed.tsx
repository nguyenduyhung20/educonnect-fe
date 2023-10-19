import { Avatar, Paper, Stack, TextField, useTheme } from '@mui/material';
import React from 'react';

export const CreateNewsFeed = () => {
  const theme = useTheme();
  const user = {
    name: 'Trần Long Biên',
    avatar: '/static/images/avatars/1.jpg'
  };
  return (
    <Paper elevation={5} sx={{ mb: 2, p: 2 }}>
      <Stack direction={'row'} spacing={2} width={1} alignItems={'center'}>
        <Avatar
          variant="rounded"
          alt={user.name}
          src={user.avatar}
          sx={{
            width: theme.spacing(6),
            height: theme.spacing(6)
          }}
        />
        <TextField placeholder="Create Your Post" fullWidth />
      </Stack>
    </Paper>
  );
};
