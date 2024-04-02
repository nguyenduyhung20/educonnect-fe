import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  Link,
  Stack,
  Typography
} from '@mui/material';
import React, { useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Comment } from '@/types/comment';
import { usePostsContext } from '@/contexts/posts/posts-context';
import { CommentSendItem } from './comment-send-item';
import { PostsApi } from '@/api/posts';
import { CommentsList } from './comments-list';

export const CommentItem = ({
  comment,
  index,
  degree,
  parentIndex
}: {
  comment: Comment;
  index: number;
  degree: number;
  parentIndex?: number;
}) => {
  const [isLiked, setIsLiked] = useState(comment.userInteract ? true : false);
  const [isShow, setIsShow] = useState(false);


  const { reactComment, getDetailPostApi } = usePostsContext();
  return (
    <Stack direction={'row'} spacing={1}>
      <Avatar
        component={Link}
        variant="rounded"
        alt={comment.user?.name}
        src={comment.user?.avatar}
        href={`/management/profile/${comment.user.id}`}
      />
      {<Divider orientation="vertical" />}
      <Box sx={{ width: 1 }}>
        <Stack>
          <Box>
            <Typography
              variant="h4"
              component={Link}
              href={`/management/profile/${comment.user.id}`}
              sx={{
                color: 'black',
                '&:hover': { textDecoration: 'underline' },
                pl: 1
              }}
            >
              {comment.user?.name}
            </Typography>
          </Box>

          <Typography sx={{ pl: 1 }}>{comment.content}</Typography>
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
                    { id: comment.id, type: 'like' },
                    isLiked ? 'dislike' : 'like',
                    'detail',
                    {
                      senderName: comment?.user?.name,
                      senderAvatar: comment?.user?.avatar,
                      receiverID: comment?.user?.id,
                      itemType: 'comment',
                      postID: comment.id
                    },
                    index,
                    parentIndex
                  );
                  setIsLiked(!isLiked);
                }}
              >
                <Stack direction={'row'} alignItems={'center'} spacing={0.5}>
                  {isLiked ? (
                    <FavoriteIcon color="primary" />
                  ) : (
                    <FavoriteBorderIcon color="primary" />
                  )}
                  <Typography>{comment.interactCount}</Typography>
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
              {
                <Button aria-label="delete" onClick={() => setIsShow(true)}>
                  Trả lời
                </Button>
              }
            </Box>
          </Stack>

          {!isShow && comment.commentCount != 0 && (
            <>
              <Button
                sx={{
                  pb: 1,
                  pl: 1,
                  '&:hover': {
                    background: 'none'
                  }
                }}
                size="small"
                onClick={async () => {
                  setIsShow(true);
                  const detailComment = await PostsApi.getComment(comment.id);
                  const newComment = getDetailPostApi.data?.data.comment.map(
                    (item, subIndex) => {
                      if (subIndex == index) {
                        return detailComment.data;
                      }
                      return item;
                    }
                  );
                  getDetailPostApi.setData({
                    data: {
                      ...getDetailPostApi.data?.data,
                      comment: newComment
                    }
                  });
                }}
              >
                {`Xem thêm ${comment.commentCount} phản hồi`}
              </Button>
            </>
          )}

          {isShow &&
            getDetailPostApi.data?.data.comment[index]?.comment &&
            degree > 1 && (
              <CommentsList
                post={getDetailPostApi.data?.data.comment[index]}
                degree={degree - 1}
                parentIndex={index}
              />
            )}

          {isShow && degree > 1 && (
            <>
              <CommentSendItem item={comment} parentIndex={index} />
            </>
          )}
        </Box>
      </Box>
    </Stack>
  );
};
