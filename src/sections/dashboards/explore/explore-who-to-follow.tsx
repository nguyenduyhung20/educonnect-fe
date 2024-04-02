import {
  Avatar,
  Box,
  IconButton,
  Paper,
  Stack,
  Typography
} from '@mui/material';
import React, { useMemo } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useExplorePostsContext } from '@/contexts/explore/explore-context';
import Link from '@/components/Link';

export const ExploreWhoToFollow = () => {
  const { getUserMostFollower } = useExplorePostsContext();
  const listUsers = useMemo(() => {
    return getUserMostFollower.data?.data || [];
  }, [getUserMostFollower]);

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
            Người nổi tiếng
          </Typography>

          <Stack direction={'column'} spacing={2}>
            {listUsers.map((item, index) => (
              <Stack
                direction={'row'}
                justifyContent={'space-between'}
                width={1}
                key={index}
              >
                <Stack direction={'row'} spacing={1}>
                  <Avatar
                    component={Link}
                    variant="rounded"
                    alt={item?.name}
                    src={item?.avatar}
                    href={`/management/profile/${item?.id}`}
                  />
                  <Stack>
                    <Typography
                      variant="h5"
                      component={Link}
                      href={`/management/profile/${item?.id}`}
                      sx={{
                        color: 'black',
                        '&:hover': { textDecoration: 'underline' }
                      }}
                    >
                      {item.name}
                    </Typography>
                    <Typography variant="subtitle1">{`${item.followerCount} người theo dõi`}</Typography>
                  </Stack>
                </Stack>
                <Box>
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                </Box>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
};
