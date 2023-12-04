import { Avatar, Paper, Stack, TextField, useTheme } from '@mui/material';
import React from 'react';
import Link from 'src/components/Link/index';
import { useRouter } from 'next/router';

export const CreateNewsFeed = () => {
  const theme = useTheme();
  const user = {
    name: 'Trần Long Biên',
    avatar: '/static/images/avatars/1.jpg'
  };
  const router = useRouter();
  const handleLinkClick = (e) => {
    // Ngăn sự kiện mặc định của trình duyệt xảy ra
    e.preventDefault();
    router.push('/communities/home/home-create-post');
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
          component={Link}
          href={'/management/profile'}
        />
        <TextField
          placeholder="Create Your Post"
          fullWidth
          onClick={(e) => handleLinkClick(e)}
        />
      </Stack>
    </Paper>
  );
};
