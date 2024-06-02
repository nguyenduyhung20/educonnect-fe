import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useContext,
  useRef,
  MutableRefObject,
  useMemo
} from 'react';

import useFunction, {
  DEFAULT_FUNCTION_RETURN,
  UseFunctionReturnType
} from 'src/hooks/use-function';

import { PostsApi } from '@/api/posts';
import { Post, PostDetail, TypePost } from '@/types/post';
import { useAuth } from '@/hooks/use-auth';
import { getFormData } from '@/utils/api-request';
import { useGroupsContext } from '../groups/groups-context';
import { useUserContext } from '../user/user-context';
import { filterSameElement } from '@/utils/filter-same-element';
import { useRouter } from 'next/router';
import { Comment } from '@/types/comment';

interface ContextValue {
  getPostsApi: UseFunctionReturnType<FormData, { data: Post[] }>;
  getNewsFeedApi: UseFunctionReturnType<{ id: number }, { data: Post[] }>;
  getPublicPostsApi: UseFunctionReturnType<FormData, { data: Post[] }>;
  getDetailPostApi: UseFunctionReturnType<{ id: number }, { data: PostDetail }>;

  newsfeedCurrent: TypePost;

  currentNewsFeedPosts: MutableRefObject<Post[]>;

  reactPost: (
    request: { id: number; type: string },
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

  reactComment: (
    request: { id: number; type: string },
    action: 'like' | 'dislike',
    type: TypePost,
    info: {
      senderAvatar: string;
      senderId: number;
      senderName: string;
      receiverID: number;
      itemType: 'post' | 'comment';
      itemId: number;
    },
    index: number,
    parentIndex?: number
  ) => Promise<void>;

  createPost: (
    requests: Partial<Post> & { uploadedFiles: File[] } & {
      type: 'post' | 'link';
    } & {
      contentLink: string;
    } & { titleLink: string } & { topicPost: string }
  ) => Promise<void>;
  updatePost: (post: Post) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
  sendViewEvent: (postId: number) => Promise<void>;
  createComment: (request: { id: number; content: string }) => Promise<Comment>;
}

export const PostsContext = createContext<ContextValue>({
  getPostsApi: DEFAULT_FUNCTION_RETURN,
  getNewsFeedApi: DEFAULT_FUNCTION_RETURN,
  getPublicPostsApi: DEFAULT_FUNCTION_RETURN,
  getDetailPostApi: DEFAULT_FUNCTION_RETURN,

  newsfeedCurrent: 'newsfeed',

  currentNewsFeedPosts: { current: [] },

  reactPost: async () => {},
  reactComment: async () => {},

  createPost: async () => {},
  updatePost: async () => {},
  deletePost: async () => {},
  sendViewEvent: async () => {},

  createComment: async (): Promise<Comment> => {
    return {
      id: 0,
      title: '',
      content: '',
      fileContent: [],
      user: { name: '', avatar: '', id: 0, is_famous: false },
      parentPostId: 0,
      group: { id: 0, title: '' },
      createdAt: '',
      commentCount: 0,
      interactCount: 0,
      userInteract: '',
      comment: []
    };
  }
});

const PostsProvider = ({ children }: { children: ReactNode }) => {
  const { user, isAuthenticated } = useAuth();

  const getPostsApi = useFunction(PostsApi.getPosts);

  const getNewsFeedApi = useFunction(PostsApi.getNewsFeed);

  const getPublicPostsApi = useFunction(PostsApi.getPublicPosts);

  const getDetailPostApi = useFunction(PostsApi.getPostsByID);

  const { getPostByGroupId } = useGroupsContext();
  const { getUsersProfile } = useUserContext();

  let newsfeedCurrent: TypePost = 'newsfeed';

  const currentNewsFeedPosts = useRef<Post[]>([]);

  const createComment = useCallback(
    async (request: { id: number; content: string }) => {
      try {
        const response = await PostsApi.postComment(request);
        if (response) {
        }
        return response;
      } catch (error) {
        throw error;
      }
    },
    [getPostsApi]
  );

  const createPost = useCallback(
    async (
      request: Partial<Post> & { uploadedFiles: File[] } & {
        type: 'post' | 'link';
      } & {
        contentLink: string;
      } & { titleLink: string } & { topicPost: string }
    ) => {
      try {
        const response = await PostsApi.postPost(
          getFormData({
            title: request.type == 'post' ? request.title : request.titleLink,
            content:
              request.type == 'post' ? request.content : request.contentLink,
            uploadedFiles: request.uploadedFiles ?? null,
            groupId: request.group?.id ?? null,
            type: request.type
          })
        );
        if (response) {
        }
      } catch (error) {
        throw error;
      }
    },
    [getPostsApi]
  );

  const reactPost = useCallback(
    async (
      request: { id: number; type: string },
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
    ) => {
      try {
        const response = await PostsApi.reactPost(request, action, info);
        if (response) {
          if (type == 'detail') {
            const postDetail = getDetailPostApi.data.data;
            getDetailPostApi.setData({
              data: {
                ...postDetail,
                interactCount:
                  action == 'like'
                    ? postDetail.interactCount + 1
                    : postDetail.interactCount - 1
              }
            });
          } else if (type == 'newsfeed') {
            const newData = getNewsFeedApi.data.data.map((item) => {
              if (item.id == request.id) {
                return {
                  ...item,
                  interactCount:
                    action == 'like'
                      ? item.interactCount + 1
                      : item.interactCount - 1
                };
              }
              return item;
            });
            getNewsFeedApi.setData({
              data: [...newData]
            });
          } else if (type == 'group') {
            // If user doesn't pass value, we don't process.
            const newData = getPostByGroupId.data.data.map((item) => {
              if (item.id == request.id) {
                return {
                  ...item,
                  interactCount:
                    action == 'like'
                      ? item.interactCount + 1
                      : item.interactCount - 1
                };
              }
              return item;
            });
            getPostByGroupId.setData({
              data: [...newData],
              sumPosts: getPostByGroupId.data.sumPosts
            });
          } else if (type == 'profile') {
            const newData = getUsersProfile.data?.data.newsfeed.map((item) => {
              if (item.id == request.id) {
                return {
                  ...item,
                  interactCount:
                    action == 'like'
                      ? item.interactCount + 1
                      : item.interactCount - 1
                };
              }
              return item;
            });
            getUsersProfile.setData({
              data: {
                user: getUsersProfile.data?.data.user,
                newsfeed: [...(newData || [])],
                listSumPost: getUsersProfile.data?.data.listSumPost
              }
            });
          }
        }
      } catch (error) {
        throw error;
      }
    },
    [getDetailPostApi, getNewsFeedApi, getPostByGroupId, getUsersProfile]
  );

  const reactComment = useCallback(
    async (
      request: { id: number; type: string },
      action: 'like' | 'dislike',
      type: TypePost,
      info: {
        senderAvatar: string;
        senderId: number;
        senderName: string;
        receiverID: number;
        itemType: 'post' | 'comment';
        itemId: number;
      },
      index: number,
      parentIndex?: number
    ) => {
      try {
        const response = await PostsApi.reactComment(request, action, info);
        if (response) {
          if (type == 'detail') {
            const postDetail = getDetailPostApi.data.data;
            if (typeof parentIndex != 'undefined') {
              getDetailPostApi.setData({
                data: {
                  ...postDetail,
                  comment: postDetail.comment.map((item, itemIndex) => {
                    if (itemIndex == parentIndex) {
                      item.comment = item.comment.map(
                        (subItem, subItemIndex) => {
                          if (subItemIndex == index) {
                            subItem.interactCount =
                              action == 'like'
                                ? subItem.interactCount + 1
                                : subItem.interactCount - 1;
                          }
                          return subItem;
                        }
                      );
                    }
                    return item;
                  })
                }
              });
            } else {
              getDetailPostApi.setData({
                data: {
                  ...postDetail,
                  comment: postDetail.comment.map((item, subIndex) => {
                    if (subIndex == index) {
                      item.interactCount =
                        action == 'like'
                          ? item.interactCount + 1
                          : item.interactCount - 1;
                    }
                    return item;
                  })
                }
              });
            }
          } else if (type == 'newsfeed') {
            const newData = getNewsFeedApi.data.data.map((item) => {
              if (item.id == request.id) {
                return {
                  ...item,
                  interactCount:
                    action == 'like'
                      ? item.interactCount + 1
                      : item.interactCount - 1
                };
              }
              return item;
            });
            getNewsFeedApi.setData({
              data: [...newData]
            });
          } else if (type == 'group') {
            // If user doesn't pass value, we don't process.
            const newData = getPostByGroupId.data.data.map((item) => {
              if (item.id == request.id) {
                return {
                  ...item,
                  interactCount:
                    action == 'like'
                      ? item.interactCount + 1
                      : item.interactCount - 1
                };
              }
              return item;
            });
            getPostByGroupId.setData({
              data: [...newData],
              sumPosts: getPostByGroupId.data.sumPosts
            });
          } else if (type == 'profile') {
            const newData = getUsersProfile.data?.data.newsfeed.map((item) => {
              if (item.id == request.id) {
                return {
                  ...item,
                  interactCount:
                    action == 'like'
                      ? item.interactCount + 1
                      : item.interactCount - 1
                };
              }
              return item;
            });
            getUsersProfile.setData({
              data: {
                user: getUsersProfile.data?.data.user,
                newsfeed: [...(newData || [])],
                listSumPost: getUsersProfile.data?.data.listSumPost
              }
            });
          }
        }
      } catch (error) {
        throw error;
      }
    },
    [getDetailPostApi, getNewsFeedApi, getPostByGroupId, getUsersProfile]
  );

  const updatePost = useCallback(
    async (post: Post) => {
      try {
        console.log(post);
      } catch (error) {
        throw error;
      }
    },
    [getPostsApi]
  );

  const router = useRouter();

  const deletePost = useCallback(
    async (id: string) => {
      try {
        const response = await PostsApi.deletePost({ id: id });
        if (response) {
        }
      } catch (error) {
        throw error;
      }
    },
    [getPostsApi]
  );

  const sendViewEvent = useCallback(async (postId: number) => {
    try {
      PostsApi.sendViewEvent({ postId });
    } catch (error) {
      throw error;
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      if (router.asPath == '/') {
        getNewsFeedApi.call({ id: user?.id || 0 });
      }
    } else {
      getPublicPostsApi.call(getFormData({}));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useMemo(() => {
    const currentPosts = currentNewsFeedPosts.current;
    if (isAuthenticated) {
      const newPosts = filterSameElement(
        getNewsFeedApi.data?.data || [],
        currentPosts
      );
      currentNewsFeedPosts.current = [
        ...(getNewsFeedApi.data?.data || []),
        ...(newPosts || [])
      ];
    } else {
      const newPosts = filterSameElement(
        getPublicPostsApi.data?.data || [],
        currentPosts
      );
      currentNewsFeedPosts.current = [
        ...(getPublicPostsApi.data?.data || []),
        ...(newPosts || [])
      ];
    }
  }, [getNewsFeedApi, getPublicPostsApi]);

  return (
    <PostsContext.Provider
      value={{
        getPostsApi,
        getNewsFeedApi,
        getPublicPostsApi,
        getDetailPostApi,
        newsfeedCurrent,
        currentNewsFeedPosts,
        reactComment,
        createComment,
        reactPost,
        createPost,
        updatePost,
        deletePost,
        sendViewEvent
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};

export const usePostsContext = () => useContext(PostsContext);

export default PostsProvider;
