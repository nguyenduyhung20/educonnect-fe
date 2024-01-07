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
import { Post } from '@/types/post';
import { useAuth } from '@/hooks/use-auth';

interface ContextValue {
  getPostsApi: UseFunctionReturnType<FormData, { data: Post[] }>;
  getNewsFeedApi: UseFunctionReturnType<{ id: number }, { data: Post[] }>;

  createPost: (requests: Post) => Promise<void>;
  updatePost: (post: Post) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
}

export const PostsContext = createContext<ContextValue>({
  getPostsApi: DEFAULT_FUNCTION_RETURN,
  getNewsFeedApi: DEFAULT_FUNCTION_RETURN,

  createPost: async () => {},
  updatePost: async () => {},
  deletePost: async () => {}
});

const PostsProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();

  const getPostsApi = useFunction(PostsApi.getPosts);

  const getNewsFeedApi = useFunction(PostsApi.getNewsFeed);

  const createPost = useCallback(
    async (request: Post) => {
      try {
        const response = await PostsApi.postPost(request);
        if (response) {
        }
      } catch (error) {
        throw error;
      }
    },
    [getPostsApi]
  );

  const updatePost = useCallback(
    async (post: Post) => {
      try {
        const response = await PostsApi.postPost(post);

        if (response) {
        }
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
    getNewsFeedApi.call({ id: user?.id || 0 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PostsContext.Provider
      value={{
        getPostsApi,
        getNewsFeedApi,

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
