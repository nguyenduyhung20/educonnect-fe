import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Paper,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import React, { useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import Link from '../Link';
import { PostDetail } from '@/types/post';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { CommentsList } from '@/sections/dashboards/feeds/comments-list';
import { usePostsContext } from '@/contexts/posts/posts-context';

export const BodyNewDetail = ({ post }: { post: PostDetail }) => {
  const [isLiked, setIsLiked] = useState(post.userInteract ? true : false);

  const { reactPost } = usePostsContext();

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
        <Stack width={1} direction={'column'} spacing={1}>
          <Stack width={1} direction={'row'}>
            <Box
              sx={{
                width: 1,
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <IconButton
                onClick={async () => {
                  await reactPost(
                    { id: post.id, type: 'like' },
                    isLiked ? 'dislike' : 'like',
                    'detail'
                  );
                  setIsLiked(!isLiked);
                }}
              >
                <Stack direction={'row'} alignItems={'center'} spacing={0.5}>
                  {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
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
          </Stack>

          <CommentsList post={post} />
        </Stack>
      </CardActions>
    </Card>
  );
};
