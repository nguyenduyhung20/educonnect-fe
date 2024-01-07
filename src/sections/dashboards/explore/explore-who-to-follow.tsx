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
import { useAuth } from '@/hooks/use-auth';

export const ExploreWhoToFollow = () => {
  const { user } = useAuth();

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
            Who to follow
          </Typography>

          <Stack direction={'column'} spacing={2}>
            <Stack direction={'row'} justifyContent={'space-between'} width={1}>
              <Stack direction={'row'} spacing={1}>
                <Avatar variant="rounded" alt={user?.name} src={user?.avatar} />
                <Stack>
                  <Typography variant="h5">Võ Quốc Bá Cẩn</Typography>
                  <Typography variant="subtitle1">124k follower</Typography>
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
                <Avatar variant="rounded" alt={user?.name} src={user?.avatar} />
                <Stack>
                  <Typography variant="h5">Võ Quốc Bá Cẩn</Typography>
                  <Typography variant="subtitle1">124k follower</Typography>
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
                <Avatar variant="rounded" alt={user?.name} src={user?.avatar} />
                <Stack>
                  <Typography variant="h5">Võ Quốc Bá Cẩn</Typography>
                  <Typography variant="subtitle1">124k follower</Typography>
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
                <Avatar variant="rounded" alt={user?.name} src={user?.avatar} />
                <Stack>
                  <Typography variant="h5">Võ Quốc Bá Cẩn</Typography>
                  <Typography variant="subtitle1">124k follower</Typography>
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
