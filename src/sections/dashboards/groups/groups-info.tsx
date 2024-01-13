import { Avatar, Stack, Typography, useTheme } from '@mui/material';
import React from 'react';
import GroupAvatarsMembers from './groups-avatar-members';
import { useAuth } from '@/hooks/use-auth';
import { Group } from '@/types/groups';

export const GroupsInfo = ({ group }: { group: Group }) => {
  const theme = useTheme();

  return (
    <Stack direction={'row'} spacing={1}>
      <Avatar
        sx={{
          mr: 2,
          width: theme.spacing(11),
          height: theme.spacing(11)
        }}
        variant="rounded"
        alt={group?.title}
        src={group?.avatar}
      />
      
      <Stack justifyContent={'space-between'}>
        <Stack spacing={0.5}>
          <Typography variant="h4">{group?.title}</Typography>
          <Stack direction={'row'} spacing={1}>
            <Typography variant="h5">{group?.memberCount}</Typography>
            <Typography variant="body2">members </Typography>
          </Stack>
        </Stack>
        <Stack justifyContent={'flex-start'} direction={'row'}>
          <GroupAvatarsMembers members={group?.members} />
        </Stack>
      </Stack>
    </Stack>
  );
};
