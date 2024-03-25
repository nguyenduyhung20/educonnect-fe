import { createContext, ReactNode, useCallback, useContext } from 'react';

import useFunction, {
  DEFAULT_FUNCTION_RETURN,
  UseFunctionReturnType
} from 'src/hooks/use-function';

import { UsersApi } from '@/api/users';
import { UserProfile } from '@/types/user';

interface ContextValue {
  getUsersProfile: UseFunctionReturnType<number, { data: UserProfile }>;
  changeAvatar: (request: { userId: number; uploadedFiles: File[] }) => void;
  changeBackGround: (request: {
    userId: number;
    uploadedFiles: File[];
  }) => void;
}

export const UsersContext = createContext<ContextValue>({
  getUsersProfile: DEFAULT_FUNCTION_RETURN,
  changeAvatar: async () => {},
  changeBackGround: async () => {}
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

  return (
    <UsersContext.Provider
      value={{
        getUsersProfile,
        changeAvatar,
        changeBackGround
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export const useUserContext = () => useContext(UsersContext);

export default UsersProvider;
