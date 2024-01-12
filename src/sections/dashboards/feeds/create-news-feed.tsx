import { useAuth } from '@/hooks/use-auth';
import { Avatar, Paper, Stack, TextField, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import Link from 'src/components/Link/index';

export const CreateNewsFeed = () => {
  const theme = useTheme();
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();

  return (
    <Paper elevation={5} sx={{ mb: 2, p: 2 }}>
      <Stack direction={'row'} spacing={2} width={1} alignItems={'center'}>
        <Avatar
          variant="rounded"
          alt={user?.name}
          src={user?.avatar}
          sx={{
            width: theme.spacing(6),
            height: theme.spacing(6)
          }}
          component={Link}
          href={'/management/profile'}
        />
        <Link
          href={'/communities/home/home-create-post'}
          sx={{ width: 1 }}
          onClick={() => {
            if (!isAuthenticated) {
              router.push('/login');
            }
          }}
        >
          <TextField
            InputProps={{ readOnly: true }}
            placeholder="Tạo bài viết của bạn"
            fullWidth
          />
        </Link>
      </Stack>
    </Paper>
  );
};
