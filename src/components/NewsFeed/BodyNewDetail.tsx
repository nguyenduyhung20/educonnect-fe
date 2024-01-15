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
import React, { useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import Link from '../Link';
import { PostDetail, TypePost } from '@/types/post';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { CommentsList } from '@/sections/dashboards/feeds/comments-list';
import { usePostsContext } from '@/contexts/posts/posts-context';
import { useAuth } from '@/hooks/use-auth';

export const BodyNewDetail = ({
  post,
  type
}: {
  post: PostDetail;
  type: TypePost;
}) => {
  const [isLiked, setIsLiked] = useState(post.userInteract ? true : false);

  const { reactPost } = usePostsContext();

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
            href={`/management/profile/${post.user.id}`}
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
      <CardMedia>
        {post.fileContent.map((item, index) => {
          return <img src={item} key={index} style={{ maxWidth: '100%' }} />;
        })}
      </CardMedia>
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
                    type,
                    {
                      senderName: user.name,
                      senderAvatar: user.avatar,
                      receiverID: post.user.id,
                      itemType: 'post',
                      postID: post.id
                    }
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
