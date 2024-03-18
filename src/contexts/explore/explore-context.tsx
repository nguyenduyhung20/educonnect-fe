import { createContext, ReactNode, useEffect, useContext } from 'react';

import useFunction, {
  DEFAULT_FUNCTION_RETURN,
  UseFunctionReturnType
} from 'src/hooks/use-function';

import { Post, PostExplore } from '@/types/post';
import { useAuth } from '@/hooks/use-auth';
import { getFormData } from '@/utils/api-request';
import { ExploreApi } from '@/api/explore';

interface ContextValue {
  getExplorePostsApi: UseFunctionReturnType<FormData, { data: PostExplore[] }>;
}

export const ExplorePostsContext = createContext<ContextValue>({
  getExplorePostsApi: DEFAULT_FUNCTION_RETURN
});

const ExplorePostsProvider = ({ children }: { children: ReactNode }) => {
  const { user, isAuthenticated } = useAuth();

  const getExplorePostsApi = useFunction(ExploreApi.getExplorePost);
  const getPublicExplorePostsApi = useFunction(ExploreApi.getExplorePost);

  useEffect(() => {
    if (isAuthenticated) {
      getExplorePostsApi.call(getFormData({}));
    } else {
      getPublicExplorePostsApi.call(getFormData({}));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ExplorePostsContext.Provider
      value={{
        getExplorePostsApi
      }}
    >
      {children}
    </ExplorePostsContext.Provider>
  );
};

export const useExplorePostsContext = () => useContext(ExplorePostsContext);

export default ExplorePostsProvider;
