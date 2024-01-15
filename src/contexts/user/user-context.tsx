import { createContext, ReactNode, useContext } from 'react';

import useFunction, {
  DEFAULT_FUNCTION_RETURN,
  UseFunctionReturnType
} from 'src/hooks/use-function';

import { UsersApi } from '@/api/users';
import { UserProfile } from '@/types/user';

interface ContextValue {
  getUsersProfile: UseFunctionReturnType<number, { data: UserProfile }>;
}

export const UsersContext = createContext<ContextValue>({
  getUsersProfile: DEFAULT_FUNCTION_RETURN
});

const UsersProvider = ({ children }: { children: ReactNode }) => {
  const getUsersProfile = useFunction(UsersApi.getUserProfile);

  return (
    <UsersContext.Provider
      value={{
        getUsersProfile
      }}
    >
      {children}
    </UsersContext.Provider>
  );
};

export const useUserContext = () => useContext(UsersContext);

export default UsersProvider;
