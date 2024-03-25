import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import React, { useMemo, useRef, useState } from 'react';
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
import SendIcon from '@mui/icons-material/Send';
import { useRouter } from 'next/router';

export const BodyNewsDetail = ({
  post,
  type
}: {
  post: PostDetail;
  type: TypePost;
}) => {
  const [isLiked, setIsLiked] = useState(post.userInteract ? true : false);

  const { reactPost, createComment, getDetailPostApi } = usePostsContext();

  const { user } = useAuth();

  const textComment = useRef('');

  const router = useRouter();

  const postID = useMemo(() => {
    return Number(router.query.postID);
  }, [router.query.postID]);

  let sumCommentCount = post.commentCount;

  post.comment.forEach((item) => {
    sumCommentCount += item.commentCount;
  });

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar
            component={Link}
            variant="rounded"
            alt={post.user?.name}
            src={post.user?.avatar}
            href={`/management/profile/${post.user?.id}`}
          />
        }
        title={
          <Typography
            variant="h4"
            component={Link}
            href={`/management/profile/${post.user?.id}`}
            sx={{
              color: 'black',
              '&:hover': { textDecoration: 'underline' }
            }}
          >
            {post.user?.name + (post?.group ? ` -> ${post.group.title}` : '')}
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
        <Stack>
          {post.fileContent.map((item, index) => {
            return <img src={item} key={index} style={{ maxWidth: '100%' }} />;
          })}
        </Stack>
      </CardMedia>
      <CardContent>
        <Typography variant="h6" style={{ whiteSpace: 'pre-line' }}>
          {post.content}
        </Typography>
      </CardContent>

      <CardActions>
        <Stack width={1} direction={'column'} spacing={1}>
          <Divider />

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
                      senderName: user?.name,
                      senderAvatar: user?.avatar,
                      receiverID: post.user?.id,
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
                  <Typography>{sumCommentCount}</Typography>
                </Stack>
              </IconButton>
            </Box>
          </Stack>

          <Divider />

          <CommentsList
            post={post}
            type={type}
            degree={2}
            textComment={textComment}
          />

          <Stack sx={{ pb: 1 }} direction={'row'} spacing={2}>
            <Avatar
              component={Link}
              variant="rounded"
              alt={user?.name}
              src={user?.avatar}
              href={`/management/profile${user?.id}`}
            />
            <Stack width={1} direction={'row'} spacing={2}>
              <TextField
                placeholder="Bạn nghĩ gì?"
                multiline
                sx={{ width: 7 / 8 }}
                onChange={(text) => {
                  textComment.current = text.target.value;
                }}
              />

              <IconButton
                onClick={async () => {
                  await createComment({
                    id: post.id,
                    content: textComment.current
                  });
                  textComment.current = '';
                  await getDetailPostApi.call({ id: postID });
                }}
              >
                <SendIcon />
              </IconButton>
            </Stack>
          </Stack>
        </Stack>
      </CardActions>
    </Card>
  );
};
