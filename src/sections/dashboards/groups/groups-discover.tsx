import {
  Avatar,
  Box,
  Collapse,
  IconButton,
  IconButtonProps,
  Paper,
  Stack,
  Typography,
  styled,
  useTheme
} from '@mui/material';
import React, { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import GroupAvatarsMembers from './groups-avatar-members';
import { SearchBar } from '@/components/dashboards/search-bar';
import { GroupsInfo } from './groups-info';

const user = {
  name: 'Trần Long Biên',
  avatar: '/static/images/avatars/1.jpg'
};

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

export const DiscoverGroups = () => {
  const theme = useTheme();

  const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme }) => ({
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  }));

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Box>
      <Paper elevation={5} sx={{ p: 2 }}>
        <Stack direction={'column'} spacing={2}>
          <SearchBar />
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
            <Stack
              direction={'row'}
              justifyContent={'space-between'}
              width={1}
              sx={{
                p: 1,
                '&:hover': {
                  background: `${theme.colors.primary.lighter}`,
                  borderRadius: 1
                }
              }}
            >
              <GroupsInfo />
              <Box>
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              </Box>
            </Stack>

            <Stack
              direction={'row'}
              justifyContent={'space-between'}
              width={1}
              sx={{
                p: 1,
                '&:hover': {
                  background: `${theme.colors.primary.lighter}`,
                  borderRadius: 1
                }
              }}
            >
              <GroupsInfo />
              <Box>
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              </Box>
            </Stack>

            <Stack
              direction={'row'}
              justifyContent={'space-between'}
              width={1}
              sx={{
                p: 1,
                '&:hover': {
                  background: `${theme.colors.primary.lighter}`,
                  borderRadius: 1
                }
              }}
            >
              <GroupsInfo />
              <Box>
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              </Box>
            </Stack>

            <Stack
              direction={'row'}
              justifyContent={'space-between'}
              width={1}
              sx={{
                p: 1,
                '&:hover': {
                  background: `${theme.colors.primary.lighter}`,
                  borderRadius: 1
                }
              }}
            >
              <GroupsInfo />
              <Box>
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              </Box>
            </Stack>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <Stack direction={'column'} spacing={3}>
                <Stack
                  direction={'row'}
                  justifyContent={'space-between'}
                  width={1}
                  sx={{
                    p: 1,
                    '&:hover': {
                      background: `${theme.colors.primary.lighter}`,
                      borderRadius: 1
                    }
                  }}
                >
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
                <Stack
                  direction={'row'}
                  justifyContent={'space-between'}
                  width={1}
                  sx={{
                    p: 1,
                    '&:hover': {
                      background: `${theme.colors.primary.lighter}`,
                      borderRadius: 1
                    }
                  }}
                >
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
            </Collapse>
            <Stack justifyContent={'center'} direction={'row'}>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                {!expanded ? (
                  <Typography variant="h4" color={'primary'}>
                    Show more
                  </Typography>
                ) : (
                  <Typography variant="h4" color={'primary'}>
                    Hide
                  </Typography>
                )}
              </ExpandMore>
            </Stack>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
};
