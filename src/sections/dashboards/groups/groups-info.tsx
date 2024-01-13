import { Avatar, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import GroupAvatarsMembers from './groups-avatar-members';
import { useAuth } from '@/hooks/use-auth';

export const GroupsInfo = () => {
  const theme = useTheme();

  const { user } = useAuth();

  return (
    <Stack direction={'row'} spacing={1}>
      <Avatar
        sx={{
          mr: 2,
          width: theme.spacing(11),
          height: theme.spacing(11)
        }}
        variant="rounded"
        alt={user?.name}
        src={user?.avatar}
      />
      <Stack justifyContent={'space-between'}>
        <Stack spacing={0.5}>
          <Typography variant="h4">Cộng đồng toán học Việt Nam</Typography>
          <Stack direction={'row'} spacing={1}>
            <Typography variant="h5">321 </Typography>
            <Typography variant="body2">members </Typography>
          </Stack>
        </Stack>
        <Stack justifyContent={'flex-start'} direction={'row'}>
          <GroupAvatarsMembers />
        </Stack> 
      </Stack>
    </Stack>
  );
};
