import {
  Box,
  Button,
  Collapse,
  IconButton,
  IconButtonProps,
  Paper,
  Stack,
  Typography,
  styled
} from '@mui/material';
import React, { useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

export const ExploreTrending = () => {
  const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
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
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <Stack direction={'column'} spacing={1}>
                <Stack
                  direction={'row'}
                  justifyContent={'space-between'}
                  width={1}
                >
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
                <Stack
                  direction={'row'}
                  justifyContent={'space-between'}
                  width={1}
                >
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
                <Stack
                  direction={'row'}
                  justifyContent={'space-between'}
                  width={1}
                >
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
