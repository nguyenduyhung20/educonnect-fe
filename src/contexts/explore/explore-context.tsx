import { createContext, ReactNode, useEffect, useContext } from 'react';

import useFunction, {
  DEFAULT_FUNCTION_RETURN,
  UseFunctionReturnType
} from 'src/hooks/use-function';

import { PostExplore } from '@/types/post';
import { useAuth } from '@/hooks/use-auth';
import { getFormData } from '@/utils/api-request';
import { ExploreApi } from '@/api/explore';

interface ContextValue {
  getExplorePostsApi: UseFunctionReturnType<FormData, { data: PostExplore[] }>;
  getPublicExplorePostsApi: UseFunctionReturnType<
    FormData,
    { data: PostExplore[] }
  >;
  getUserMostFollower: UseFunctionReturnType<
    any,
    {
      data: {
        followerCount: number;
        id: number;
        name: string;
        avatar: string;
      }[];
    }
  >;
}

export const ExplorePostsContext = createContext<ContextValue>({
  getExplorePostsApi: DEFAULT_FUNCTION_RETURN,
  getPublicExplorePostsApi: DEFAULT_FUNCTION_RETURN,
  getUserMostFollower: DEFAULT_FUNCTION_RETURN
});

const ExplorePostsProvider = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();

  const getExplorePostsApi = useFunction(ExploreApi.getExplorePost);
  const getPublicExplorePostsApi = useFunction(ExploreApi.getPublicExplorePost);
  const getUserMostFollower = useFunction(ExploreApi.getUserMostFollower);

  useEffect(() => {
    if (isAuthenticated) {
      getExplorePostsApi.call(getFormData({}));
    } else {
      getPublicExplorePostsApi.call(getFormData({}));
    }
    getUserMostFollower.call({});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ExplorePostsContext.Provider
      value={{
        getExplorePostsApi,
        getPublicExplorePostsApi,
        getUserMostFollower
      }}
    >
      {children}
    </ExplorePostsContext.Provider>
  );
};

export const useExplorePostsContext = () => useContext(ExplorePostsContext);

export default ExplorePostsProvider;
