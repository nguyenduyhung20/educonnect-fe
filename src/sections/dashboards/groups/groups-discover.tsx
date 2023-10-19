import {
  Avatar,
  Box,
  IconButton,
  Paper,
  Stack,
  Typography,
  useTheme
} from '@mui/material';
import React from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import GroupAvatarsMembers from './groups-avatar-members';

export const DiscoverGroups = () => {
  const user = {
    name: 'Trần Long Biên',
    avatar: '/static/images/avatars/1.jpg'
  };
  const theme = useTheme();
  return (
    <Box>
      <Paper elevation={5} sx={{ p: 2 }}>
        <Stack direction={'column'} spacing={2}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              fontSize: 23
            }}
          >
            Groups
          </Typography>

          <Stack direction={'column'} spacing={3}>
            <Stack direction={'row'} justifyContent={'space-between'} width={1}>
              <Stack direction={'row'} spacing={1}>
                <Avatar
                  sx={{
                    mr: 2,
                    width: theme.spacing(11),
                    height: theme.spacing(11)
                  }}
                  variant="rounded"
                  alt={user.name}
                  src={user.avatar}
                />
                <Stack justifyContent={'space-between'}>
                  <Stack spacing={0.5}>
                    <Typography variant="h4">
                      Cộng đồng toán học Việt Nam
                    </Typography>
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
              <Box>
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              </Box>
            </Stack>
            <Stack direction={'row'} justifyContent={'space-between'} width={1}>
              <Stack direction={'row'} spacing={1}>
                <Avatar
                  sx={{
                    mr: 2,
                    width: theme.spacing(11),
                    height: theme.spacing(11)
                  }}
                  variant="rounded"
                  alt={user.name}
                  src={user.avatar}
                />
                <Stack justifyContent={'space-between'}>
                  <Stack spacing={0.5}>
                    <Typography variant="h4">
                      Cộng đồng toán học Việt Nam
                    </Typography>
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
              <Box>
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              </Box>
            </Stack>
            <Stack direction={'row'} justifyContent={'space-between'} width={1}>
              <Stack direction={'row'} spacing={1}>
                <Avatar
                  sx={{
                    mr: 2,
                    width: theme.spacing(11),
                    height: theme.spacing(11)
                  }}
                  variant="rounded"
                  alt={user.name}
                  src={user.avatar}
                />
                <Stack justifyContent={'space-between'}>
                  <Stack spacing={0.5}>
                    <Typography variant="h4">
                      Cộng đồng toán học Việt Nam
                    </Typography>
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
              <Box>
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              </Box>
            </Stack>
            <Stack direction={'row'} justifyContent={'space-between'} width={1}>
              <Stack direction={'row'} spacing={1}>
                <Avatar
                  sx={{
                    mr: 2,
                    width: theme.spacing(11),
                    height: theme.spacing(11)
                  }}
                  variant="rounded"
                  alt={user.name}
                  src={user.avatar}
                />
                <Stack justifyContent={'space-between'}>
                  <Stack spacing={0.5}>
                    <Typography variant="h4">
                      Cộng đồng toán học Việt Nam
                    </Typography>
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
              <Box>
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              </Box>
            </Stack>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
};
