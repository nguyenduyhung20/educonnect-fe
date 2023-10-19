import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from '@mui/material';
import React from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';

export const BodyNews = () => {

  const user = {
    name: 'Catherine Pike',
    avatar: '/static/images/avatars/1.jpg'
  };
  return (
    <Card>
      <CardHeader
        avatar={<Avatar variant="rounded" alt={user.name} src={user.avatar} />}
        title={ <Typography variant='h4'>Trần Long Biên</Typography>}
        subheader="17 phút"
        action={
          <IconButton aria-label="delete">
            <ClearIcon />
          </IconButton>
        }
      />
      <CardMedia
        component={'img'}
        image={
          '/static/images/feeds/392825007_691969853024257_4320526996950590956_n.jpg'
        }
      />
      <CardContent>
        <Typography variant="h6">Chào anh em đứng đây từ chiều</Typography>
      </CardContent>
      <CardActions>
        <Box
          sx={{
            display: 'flex',
            width: 1
          }}
        >
          <Box
            sx={{
              width: 1,
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <IconButton aria-label="delete">
              <FavoriteBorderIcon />
            </IconButton>
          </Box>
          <Box
            sx={{
              width: 1,
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <IconButton aria-label="delete">
              <ForumOutlinedIcon />
            </IconButton>
          </Box>

          <Box
            sx={{
              width: 1,
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <IconButton aria-label="delete">
              <ReplyOutlinedIcon />
            </IconButton>
          </Box>
        </Box>
      </CardActions>
    </Card>
  );
};
