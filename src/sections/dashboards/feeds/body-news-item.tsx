import React, { useCallback, useState } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  IconButton,
  Stack,
  Typography
} from '@mui/material';
import Link from '../../../components/Link';
import { Post, PostExplore, TypePost } from '@/types/post';
import NextLink from 'next/link';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { User } from '@/types/user';
import { NextRouter } from 'next/router';
import { formatDistance } from 'date-fns';
import { viFormatDistance } from '@/utils/vi-formatDistance';
import VerifiedIcon from '@mui/icons-material/Verified';
import ReportIcon from '@mui/icons-material/Report';
import { useDialog } from '@/hooks/use-dialog';
import { ReportPostDialog } from './report-post-dialog';
import { useReportContext } from '@/contexts/report/report-context';

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
      senderAvatar: string;
      senderId: number;
      senderName: string;
      receiverID: number;
      itemType: 'post' | 'comment';
      itemId: number;
    }
  ) => Promise<void>;
  isLiked?: boolean;
  user?: User;
  router?: NextRouter;
  type?: TypePost;
  setIsLiked?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const isPostType = useCallback(
    (post: Post | PostExplore): post is Post => {
      return (post as Post).fileContent !== undefined;
    },
    [post]
  );
  const reportPostDialog = useDialog();

  const { reportPost } = useReportContext();

  const [reason, setReason] = useState<string>('');

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
              <Stack direction={'row'} spacing={1}>
                <Typography
                  variant="h4"
                  component={Link}
                  href={`/management/profile/${post?.user?.id}`}
                  sx={{
                    color: 'black',
                    '&:hover': { textDecoration: 'underline' }
                  }}
                >
                  {post?.user?.name +
                    (post?.group ? ' -> ' + post?.group?.title : '')}
                </Typography>
                {post?.user.is_famous && (
                  <VerifiedIcon color="primary" fontSize="small" />
                )}
              </Stack>
            }
            subheader={viFormatDistance(
              formatDistance(new Date(post.createdAt), new Date())
            )}
            action={
              <IconButton
                aria-label="delete"
                onClick={() => {
                  reportPostDialog.handleOpen();
                }}
              >
                <ReportIcon />
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
            {isPostType(post) && (
              <Typography variant="h6" style={{ whiteSpace: 'pre-line' }}>
                {post.content.split(/\s+/).slice(0, 100).join(' ') + '... '}
              </Typography>
            )}
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
                      return item.endsWith('.pdf') ? (
                        // <Link
                        //   marginLeft={2}
                        //   href={item}
                        //   target="_blank"
                        //   rel="noreferrer noopener"
                        // >
                        //   Bấm vào đây để xem tài liệu
                        // </Link>
                        <></>
                      ) : (
                        <Stack>
                          <img
                            src={item}
                            key={index}
                            style={{ maxWidth: '100%' }}
                          />
                        </Stack>
                      );
                    })}
                </Box>
              </Button>
            </NextLink>
            <Divider />
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
                          senderId: user?.id,
                          senderName: user?.name,
                          senderAvatar: user?.avatar,
                          receiverID: post.user?.id,
                          itemId: post.id,
                          itemType: 'post'
                        }
                      );
                      setIsLiked(!isLiked);
                    }
                  }}
                >
                  <Stack direction={'row'} alignItems={'center'} spacing={0.5}>
                    {isLiked ? (
                      <FavoriteIcon color="primary" />
                    ) : (
                      <FavoriteBorderIcon color="primary" />
                    )}
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
                    <ForumOutlinedIcon color="primary" />
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

      <ReportPostDialog
        open={reportPostDialog.open}
        onConfirm={async () => {
          if (isPostType(post)) {
            reportPost(post.id, user.id, reason, post?.group?.id);
          }
        }}
        onClose={reportPostDialog.handleClose}
        reason={reason}
        setReason={setReason}
      />
    </>
  );
};
