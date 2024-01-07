import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Stack,
  Typography
} from '@mui/material';
import React from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import Link from '../Link';
import { useAuth } from '@/hooks/use-auth';
import { Post } from '@/types/post';

export const BodyNews = ({ post }: { post: Post }) => {
  const { user } = useAuth();
  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar
            component={Link}
            variant="rounded"
            alt={post.user.name}
            src={post.user.avatar}
            href={'/management/profile'}
          />
        }
        title={
          <Typography
            variant="h4"
            component={Link}
            href={'/management/profile'}
            sx={{
              color: 'black',
              '&:hover': { textDecoration: 'underline' }
            }}
          >
            {post.user.name}
          </Typography>
        }
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
        <Typography variant="h6">{post.content}</Typography>
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
              <Stack direction={'row'} alignItems={'center'} spacing={0.5}>
                <FavoriteBorderIcon />
                <Typography>{post.interactCount}</Typography>
              </Stack>
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
              <Stack direction={'row'} alignItems={'center'} spacing={0.5}>
                <ForumOutlinedIcon />
                <Typography>{post.commentCount}</Typography>
              </Stack>
            </IconButton>
          </Box>
        </Box>
      </CardActions>
    </Card>
  );
};
