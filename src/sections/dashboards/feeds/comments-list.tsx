import { useAuth } from '@/hooks/use-auth';
import { PostDetail, TypePost } from '@/types/post';
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Link,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import React, { useRef, useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SendIcon from '@mui/icons-material/Send';
import { usePostsContext } from '@/contexts/posts/posts-context';
import { PostsApi } from '@/api/posts';

export const CommentsList = ({
  post,
  type,
  degree,
  textComment
}: {
  post: PostDetail;
  type: TypePost;
  degree: number;
  textComment: React.MutableRefObject<string>;
}) => {
  const { user } = useAuth();
  const [isLiked, setIsLiked] = useState<boolean[]>(
    post.comment.map((item) => {
      return item.userInteract ? true : false;
    })
  );
  const [isShow, setIsShow] = useState<boolean[]>(
    post.comment.map((item) => {
      return false;
    })
  );

  const listDataComment = useRef<PostDetail[]>([]);

  const updateElementAtIndex = (index: number, value: PostDetail) => {
    const updatedList = [...listDataComment.current]; // Create a copy of the original array
    updatedList[index] = value; // Update the element at the specified index
    listDataComment.current = updatedList; // Update the state with the modified array
  };

  const getCommentApi = PostsApi.getComment;

  const { reactPost, createComment, getDetailPostApi, reactComment } =
    usePostsContext();

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
                href={`/management/profile/${item.user.id}`}
              />
              {isShow[index] && <Divider orientation="vertical" />}
              <Box sx={{ width: 1 }}>
                <Stack>
                  <Box>
                    <Typography
                      variant="h4"
                      component={Link}
                      href={`/management/profile/${item.user.id}`}
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
                <Box>
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
                          await reactComment(
                            { id: post.comment[index].id, type: 'like' },
                            isLiked[index] ? 'dislike' : 'like',
                            type,
                            {
                              senderName: user?.name,
                              senderAvatar: user?.avatar,
                              receiverID: post.user?.id,
                              itemType: 'post',
                              postID: post.comment[index].id
                            },
                            index
                          );
                          setIsLiked(
                            isLiked.map((item, subIndex) => {
                              if (subIndex == index) {
                                item = !item;
                              }
                              return item;
                            })
                          );
                        }}
                      >
                        <Stack
                          direction={'row'}
                          alignItems={'center'}
                          spacing={0.5}
                        >
                          {isLiked[index] ? (
                            <FavoriteIcon />
                          ) : (
                            <FavoriteBorderIcon />
                          )}
                          <Typography>
                            {post.comment[index].interactCount}
                          </Typography>
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
                      {degree > 1 && (
                        <Button
                          aria-label="delete"
                          onClick={async () => {
                            if (!isShow[index]) {
                              const comment = await getCommentApi(item.id);
                              updateElementAtIndex(index, comment.data);
                            }
                            setIsShow(
                              isShow.map((item, subIndex) => {
                                if (subIndex == index) {
                                  item = !item;
                                }
                                return item;
                              })
                            );
                          }}
                        >
                          Trả lời
                        </Button>
                      )}
                    </Box>
                  </Stack>

                  {item.commentCount != 0 && !isShow[index] && (
                    <>
                      <Button
                        onClick={async () => {
                          if (!isShow[index]) {
                            const comment = await getCommentApi(item.id);
                            updateElementAtIndex(index, comment.data);
                          }
                          setIsShow(
                            isShow.map((item, subIndex) => {
                              if (subIndex == index) {
                                item = !item;
                              }
                              return item;
                            })
                          );
                        }}
                        sx={{
                          pb: 1,
                          pl: 1,
                          '&:hover': {
                            background: 'none'
                          }
                        }}
                        size="small"
                      >
                        {`Xem thêm ${item.commentCount} phản hồi`}
                      </Button>
                    </>
                  )}

                  {isShow[index] && (
                    <>
                      {listDataComment.current[index] && (
                        <CommentsList
                          post={listDataComment.current[index]}
                          type={type}
                          degree={degree - 1}
                          textComment={textComment}
                        />
                      )}
                    </>
                  )}

                  {isShow[index] && degree > 1 && (
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
                              id: post.comment[index].id,
                              content: textComment.current
                            });
                            textComment.current = '';
                            await getDetailPostApi.call({ id: post.id });
                          }}
                        >
                          <SendIcon />
                        </IconButton>
                      </Stack>
                    </Stack>
                  )}
                </Box>
              </Box>
            </Stack>
          );
        })}
      </Stack>
    </>
  );
};
