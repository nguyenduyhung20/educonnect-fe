import { useAuth } from '@/hooks/use-auth';
import { PostDetail } from '@/types/post';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  IconButton,
  Link,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import React, { useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import SendIcon from '@mui/icons-material/Send';

export const CommentsList = ({ post }: { post: PostDetail }) => {
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState(post.userInteract ? true : false);
  const [isShow, setIsShow] = useState(false);

  return (
    <>
      <Stack direction={'column'} width={1} spacing={2}>
        {post.comment.map((item, index) => {
          return (
            <Stack direction={'row'} spacing={1} key={index}>
              <Avatar
                component={Link}
                variant="rounded"
                alt={item.user?.name}
                src={item.user?.avatar}
                href={'/management/profile'}
              />
              <Stack sx={{ width: 1 }}>
                <Stack>
                  <Box>
                    <Typography
                      variant="h4"
                      component={Link}
                      href={'/management/profile'}
                      sx={{
                        color: 'black',
                        '&:hover': { textDecoration: 'underline' },
                        pl: 1
                      }}
                    >
                      {item.user?.name}
                    </Typography>
                  </Box>

                  <Typography sx={{ pl: 1 }}>{item.content}</Typography>
                </Stack>
                <Stack>
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
                          // await reactPost(
                          //   { id: post.id, type: 'like' },
                          //   isLiked ? 'dislike' : 'like',
                          //   type,
                          //   {
                          //     senderName: user?.name,
                          //     senderAvatar: user?.avatar,
                          //     receiverID: post.user?.id,
                          //     itemType: 'post',
                          //     postID: post.id
                          //   }
                          // );
                          // setIsLiked(!isLiked);
                        }}
                      >
                        <Stack
                          direction={'row'}
                          alignItems={'center'}
                          spacing={0.5}
                        >
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
                          setIsShow(!isShow);
                        }}
                      >
                        <Stack
                          direction={'row'}
                          alignItems={'center'}
                          spacing={0.5}
                        >
                          <ForumOutlinedIcon />
                          <Typography>{post.commentCount}</Typography>
                        </Stack>
                      </IconButton>
                    </Box>
                  </Stack>

                  {isShow && (
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
                        />
                        <IconButton>
                          <SendIcon />
                        </IconButton>
                      </Stack>
                    </Stack>
                  )}
                </Stack>
              </Stack>
            </Stack>
          );
        })}
      </Stack>
    </>
  );
};
