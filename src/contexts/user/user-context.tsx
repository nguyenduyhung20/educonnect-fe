import {
  createContext,
  MutableRefObject,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef
} from 'react';

import useFunction, {
  DEFAULT_FUNCTION_RETURN,
  UseFunctionReturnType
} from 'src/hooks/use-function';

import { UserOverviewActivity, UsersApi } from '@/api/users';
import { UserProfile } from '@/types/user';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/use-auth';
import { filterSameElement } from '@/utils/filter-same-element';

interface ContextValue {
  getUsersProfile: UseFunctionReturnType<number, { data: UserProfile }>;
  changeAvatar: (request: { userId: number; uploadedFiles: File[] }) => void;
  changeBackGround: (request: {
    userId: number;
    uploadedFiles: File[];
  }) => void;
  currentUserProfile: MutableRefObject<UserProfile>;
  getOverviewActivity: UseFunctionReturnType<void, UserOverviewActivity>;
}

export const UsersContext = createContext<ContextValue>({
  getUsersProfile: DEFAULT_FUNCTION_RETURN,
  changeAvatar: async () => {},
  changeBackGround: async () => {},
  currentUserProfile: { current: undefined },
  getOverviewActivity: DEFAULT_FUNCTION_RETURN
});

const UsersProvider = ({ children }: { children: ReactNode }) => {
  const getUsersProfile = useFunction(UsersApi.getUserProfile);
  const changeAvatar = useCallback(
    async (request: { userId: number; uploadedFiles: File[] }) => {
      try {
        const response = await UsersApi.changeAvatar(request);
        if (response) {
        }
      } catch (error) {
        throw error;
      }
    },
    []
  );
  const changeBackGround = useCallback(
    async (request: { userId: number; uploadedFiles: File[] }) => {
      try {
        const response = await UsersApi.changeBackGround(request);
        if (response) {
        }
      } catch (error) {
        throw error;
      }
    },
    []
  );

  const getOverviewActivity = useFunction(UsersApi.getUserOverviewActivity);

  const currentUserProfile = useRef<UserProfile>();

  const { isAuthenticated } = useAuth();

  const router = useRouter();

  const userID = useMemo(() => {
    return Number(router.query.userID);
  }, [router.query.userID]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else {
      if (userID) {
        getUsersProfile.call(userID);
      }
    }
  }, [userID]);

  useMemo(() => {
    const currentPosts = currentUserProfile.current;
    if (isAuthenticated) {
      const newPosts = filterSameElement(
        getUsersProfile.data?.data.newsfeed || [],
        currentPosts?.newsfeed || []
      );
      currentUserProfile.current = {
        user: getUsersProfile.data?.data.user,
        newsfeed: [
          ...(getUsersProfile.data?.data.newsfeed || []),
          ...(newPosts || [])
        ]
      };
    }
  }, [getUsersProfile, userID]);

  return (
    <UsersContext.Provider
      value={{
        getUsersProfile,
        changeAvatar,
        changeBackGround,
        currentUserProfile,
        getOverviewActivity
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export const useUserContext = () => useContext(UsersContext);

export default UsersProvider;
