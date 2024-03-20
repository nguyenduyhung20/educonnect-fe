import React from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Stack,
  Typography
} from '@mui/material';
import Link from '../Link';
import { Post, PostExplore, TypePost } from '@/types/post';
import ClearIcon from '@mui/icons-material/Clear';
import NextLink from 'next/link';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { User } from '@/types/user';
import { NextRouter } from 'next/router';

export const BodyNewsItem = ({
  post,
  newsFeedRef,
  isAuthenticated,
  reactPost,
  isLiked,
  user,
  router,
  type,
  setIsLiked
}: {
  post: Post | PostExplore;
  newsFeedRef?: React.MutableRefObject<undefined>;
  isAuthenticated?: boolean;
  reactPost?: (
    request: {
      id: number;
      type: string;
    },
    action: 'like' | 'dislike',
    type: TypePost,
    info: {
      senderName: string;
      senderAvatar: string;
      receiverID: number;
      itemType: 'post' | 'comment';
      postID: number;
    }
  ) => Promise<void>;
  isLiked?: boolean;
  user?: User;
  router?: NextRouter;
  type?: TypePost;
  setIsLiked?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const isPostType = (post: Post | PostExplore): post is Post => {
    return (post as Post).fileContent !== undefined;
  };
  return (
    <>
      <Card ref={newsFeedRef}>
        {isPostType(post) ? (
          <CardHeader
            avatar={
              <Avatar
                component={Link}
                variant="rounded"
                alt={post?.user?.name}
                src={post?.user?.avatar}
                href={`/management/profile/${post.user?.id}`}
              />
            }
            title={
              <Typography
                variant="h4"
                component={Link}
                href={`/management/profile/${post?.user?.id}`}
                sx={{
                  color: 'black',
                  '&:hover': { textDecoration: 'underline' }
                }}
              >
                {post?.user?.name}
              </Typography>
            }
            subheader="17 phút"
            action={
              <IconButton aria-label="delete">
                <ClearIcon />
              </IconButton>
            }
          />
        ) : (
          <></>
        )}
        <CardContent>
          <Stack spacing={1}>
            <Typography variant="h4" style={{ whiteSpace: 'pre-line' }}>
              {post?.title}
            </Typography>
            {!isPostType(post) && (
              <Typography variant="h6" style={{ whiteSpace: 'pre-line' }}>
                {post.contentSummarization}
              </Typography>
            )}
            <Link
              href={
                !isAuthenticated ? `/login` : `/communities/home/${post?.id}`
              }
            >
              <Typography
                variant="subtitle1"
                style={{ whiteSpace: 'pre-line' }}
              >
                Chi tiết bài viết
              </Typography>
            </Link>
            {!isPostType(post) && (
              <Typography>{`${
                post.commentCount + post.interactCount
              } tương tác`}</Typography>
            )}
          </Stack>
        </CardContent>
        {isPostType(post) ? (
          <CardMedia>
            <NextLink
              href={
                !isAuthenticated ? `/login` : `/communities/home/${post.id}`
              }
            >
              <Button
                sx={{
                  '&:hover': {
                    backgroundColor: 'transparent' // Change the background color to whatever suits your design
                  }
                }}
              >
                <Box className="flex flex-col gap-4">
                  {isPostType(post) &&
                    post.fileContent.map((item, index) => {
                      return (
                        <img
                          src={item}
                          key={index}
                          style={{ maxWidth: '100%' }}
                        />
                      );
                    })}
                </Box>
              </Button>
            </NextLink>
          </CardMedia>
        ) : (
          <></>
        )}

        {isPostType(post) ? (
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
                          senderName: user?.name,
                          senderAvatar: user?.avatar,
                          receiverID: post.user?.id,
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
        ) : (
          <></>
        )}
      </Card>
    </>
  );
};