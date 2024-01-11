import { useAuth } from '@/hooks/use-auth';
import { PostDetail } from '@/types/post';
import { Avatar, Box, Button, Link, Stack, TextField, Typography } from '@mui/material';
import React from 'react';

export const CommentsList = ({ post }: { post: PostDetail }) => {
  const { user } = useAuth();

  return (
    <>
      <Stack sx={{ pb: 1 }} direction={'row'} spacing={2}>
        <Avatar
          component={Link}
          variant="rounded"
          alt={user.name}
          src={user.avatar}
          href={'/management/profile'}
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
      <Stack direction={'column'} width={1} spacing={2}>
        {post.comment.map((item, index) => {
          return (
            <Stack direction={'row'} spacing={1} key={index}>
              <Avatar
                component={Link}
                variant="rounded"
                alt={item.user.name}
                src={item.user.avatar}
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
                      {item.user.name}
                    </Typography>
                  </Box>

                  <Typography sx={{ pl: 1 }}>{item.content}</Typography>
                </Stack>
                <Box>
                  <Button>Thích</Button>
                  <Button>Trả lời</Button>
                </Box>
              </Stack>
            </Stack>
          );
        })}
      </Stack>
    </>
  );
};
