import {
  Box,
  IconButton,
  Paper,
  Stack,
  Typography
} from '@mui/material';
import React from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export const TrendingNews = () => {
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
            Trends for you
          </Typography>

          <Stack direction={'column'} spacing={1}>
            <Stack direction={'row'} justifyContent={'space-between'} width={1}>
              <Box>
                <Typography variant="subtitle1">Trending</Typography>
                <Typography variant="h4">Lionel Messi</Typography>
                <Typography variant="subtitle2">321K posts</Typography>
              </Box>
              <Box>
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              </Box>
            </Stack>
            <Stack direction={'row'} justifyContent={'space-between'} width={1}>
              <Box>
                <Typography variant="subtitle1">Trending</Typography>
                <Typography variant="h4">Lionel Messi</Typography>
                <Typography variant="subtitle2">321K posts</Typography>
              </Box>
              <Box>
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              </Box>
            </Stack>
            <Stack direction={'row'} justifyContent={'space-between'} width={1}>
              <Box>
                <Typography variant="subtitle1">Trending</Typography>
                <Typography variant="h4">Lionel Messi</Typography>
                <Typography variant="subtitle2">321K posts</Typography>
              </Box>
              <Box>
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              </Box>
            </Stack>
            <Stack direction={'row'} justifyContent={'space-between'} width={1}>
              <Box>
                <Typography variant="subtitle1">Trending</Typography>
                <Typography variant="h4">Lionel Messi</Typography>
                <Typography variant="subtitle2">321K posts</Typography>
              </Box>
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
