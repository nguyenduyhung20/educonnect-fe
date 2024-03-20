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
  TextField,
  Typography
} from '@mui/material';
import React, { useCallback, useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import Link from '../Link';
import { Post, PostDetail, TypePost } from '@/types/post';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { CommentsList } from '@/sections/dashboards/feeds/comments-list';
import { usePostsContext } from '@/contexts/posts/posts-context';
import { useAuth } from '@/hooks/use-auth';
import useFunction from '@/hooks/use-function';
import { useFormik } from 'formik';

export const BodyNewsDetail = ({
  post,
  type
}: {
  post: PostDetail;
  type: TypePost;
}) => {
  const [isLiked, setIsLiked] = useState(post.userInteract ? true : false);

  const { reactPost } = usePostsContext();

  const { user } = useAuth();

  const formik = useFormik<Partial<Post> & { uploadedFiles: File[] }>({
    initialValues: {
      title: '',
      content: '',
      uploadedFiles: null
    },
    onSubmit: async (values) => {
      const { error } = await handleSubmitHelper.call(values);
      if (!error) {
        formik.setValues({
          title: '',
          content: '',
          uploadedFiles: null
        });
      }
    }
  });

  const onSubmit = useCallback(
    async (values: Partial<Post> & { uploadedFiles: File[] }) => {
      try {
        // await createPost(values);
      } catch (error) {
        throw error;
      }
    },
    []
  );

  const handleSubmitHelper = useFunction(onSubmit, {
    successMessage: 'Thêm thành công!'
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
            {post.user?.name}
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
                  <Typography>{post.commentCount}</Typography>
                </Stack>
              </IconButton>
            </Box>
          </Stack>

          <Stack sx={{ pb: 1 }} direction={'row'} spacing={2}>
            <Avatar
              component={Link}
              variant="rounded"
              alt={user?.name}
              src={user?.avatar}
              href={`/management/profile${user?.id}`}
            />
            <Stack width={1} direction={'row'}>
              <TextField
                placeholder="Bạn nghĩ gì?"
                multiline
                sx={{ width: 7 / 8 }}
              />

              <Button>Bình luận</Button>
            </Stack>
          </Stack>

          <CommentsList post={post} />
        </Stack>
      </CardActions>
    </Card>
  );
};
