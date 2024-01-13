import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useContext
} from 'react';

import useFunction, {
  DEFAULT_FUNCTION_RETURN,
  UseFunctionReturnType
} from 'src/hooks/use-function';

import { PostsApi } from '@/api/posts';
import { Post, PostDetail } from '@/types/post';
import { useAuth } from '@/hooks/use-auth';
import { getFormData } from '@/utils/api-request';

interface ContextValue {
  getPostsApi: UseFunctionReturnType<FormData, { data: Post[] }>;
  getNewsFeedApi: UseFunctionReturnType<{ id: number }, { data: Post[] }>;
  getHotPostsApi: UseFunctionReturnType<FormData, { data: Post[] }>;
  getDetailPostApi: UseFunctionReturnType<{ id: number }, { data: PostDetail }>;
  getHotPostsApiByUserID: UseFunctionReturnType<FormData, { data: Post[] }>;

  reactPost: (
    request: { id: number; type: string },
    action: 'like' | 'dislike',
    type: 'detail' | 'newsfeed' | 'hotpost',
    info: {
      senderName: string;
      senderAvatar: string;
      receiverID: number;
      itemType: 'post' | 'comment';
      postID: number;
    }
  ) => Promise<void>;
  createPost: (
    requests: Partial<Post> & { uploadedFiles: File[] }
  ) => Promise<void>;
  updatePost: (post: Post) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
}

export const PostsContext = createContext<ContextValue>({
  getPostsApi: DEFAULT_FUNCTION_RETURN,
  getNewsFeedApi: DEFAULT_FUNCTION_RETURN,
  getHotPostsApi: DEFAULT_FUNCTION_RETURN,
  getDetailPostApi: DEFAULT_FUNCTION_RETURN,
  getHotPostsApiByUserID: DEFAULT_FUNCTION_RETURN,

  reactPost: async () => {},
  createPost: async () => {},
  updatePost: async () => {},
  deletePost: async () => {}
});

const PostsProvider = ({ children }: { children: ReactNode }) => {
  const { user, isAuthenticated } = useAuth();

  const getPostsApi = useFunction(PostsApi.getPosts);

  const getNewsFeedApi = useFunction(PostsApi.getNewsFeed);

  const getHotPostsApi = useFunction(PostsApi.getHotPosts);

  const getHotPostsApiByUserID = useFunction(PostsApi.getHotPostsByUserID);

  const getDetailPostApi = useFunction(PostsApi.getPostsByID);

  const createPost = useCallback(
    async (request: Partial<Post> & { uploadedFiles: File[] }) => {
      try {
        const response = await PostsApi.postPost(getFormData(request));
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
      type: 'detail' | 'newsfeed' | 'hotpost',
      info: {
        senderName: string;
        senderAvatar: string;
        receiverID: number;
        itemType: 'post' | 'comment';
        postID: number;
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
          } else if (type == 'hotpost') {
            const newData = getHotPostsApiByUserID.data.data.map((item) => {
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
            getHotPostsApiByUserID.setData({
              data: [...newData]
            });
          }
        }
      } catch (error) {
        throw error;
      }
    },
    [getDetailPostApi, getHotPostsApiByUserID, getNewsFeedApi]
  );

  const updatePost = useCallback(
    async (post: Post) => {
      try {
      } catch (error) {
        throw error;
      }
    },
    [getPostsApi]
  );

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

  useEffect(() => {
    if (isAuthenticated) {
      getNewsFeedApi.call({ id: user?.id || 0 });
      getHotPostsApiByUserID.call(new FormData());
    } else {
      getHotPostsApi.call(getFormData({}));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PostsContext.Provider
      value={{
        getPostsApi,
        getNewsFeedApi,
        getHotPostsApi,
        getDetailPostApi,
        getHotPostsApiByUserID,

        reactPost,
        createPost,
        updatePost,
        deletePost
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};

export const usePostsContext = () => useContext(PostsContext);

export default PostsProvider;
