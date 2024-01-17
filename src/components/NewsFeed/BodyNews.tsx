import {
  Avatar,
  Box,
  Button,
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
import { useAuth } from '@/hooks/use-auth';
import { Post, TypePost } from '@/types/post';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useRouter } from 'next/router';
import { usePostsContext } from '@/contexts/posts/posts-context';
import NextLink from 'next/link';

export const BodyNews = ({ post, type }: { post: Post; type: TypePost }) => {
  const { isAuthenticated, user } = useAuth();
  const [isLiked, setIsLiked] = useState(post.userInteract ? true : false);
  const router = useRouter();
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
        <NextLink
          href={!isAuthenticated ? `/login` : `/communities/home/${post.id}`}
        >
          <Button
            sx={{
              '&:hover': {
                backgroundColor: 'transparent' // Change the background color to whatever suits your design
              }
            }}
          >
            <Box className="flex flex-col gap-4">
              {post.fileContent.map((item, index) => {
                return (
                  <img src={item} key={index} style={{ maxWidth: '100%' }} />
                );
              })}
            </Box>
          </Button>
        </NextLink>
      </CardMedia>

      <CardContent>
        <Typography variant="h6" style={{ whiteSpace: 'pre-line' }}>
          {post.content}
        </Typography>
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
            <IconButton
              onClick={async () => {
                if (!isAuthenticated) {
                  router.push('/login');
                } else {
                  await reactPost(
                    { id: post.id, type: 'like' },
                    isLiked ? 'dislike' : 'like',
                    type,
                    {
                      senderName: user.name,
                      senderAvatar: user.avatar,
                      receiverID: post.user.id,
                      postID: post.id,
                      itemType: 'post'
                    }
                  );
                  setIsLiked(!isLiked);
                }
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
            <IconButton
              aria-label="delete"
              onClick={() => {
                if (!isAuthenticated) {
                  router.push('/login');
                } else {
                  router.push(`/communities/home/${post.id}`);
                }
              }}
            >
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
