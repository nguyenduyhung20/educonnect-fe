import { createContext, ReactNode, useEffect, useContext } from 'react';

import useFunction, {
  DEFAULT_FUNCTION_RETURN,
  UseFunctionReturnType
} from 'src/hooks/use-function';

import { NotificationsApi } from '@/api/notication';
import { useAuth } from '@/hooks/use-auth';

interface ContextValue {
  getNotificationApi: UseFunctionReturnType<
    FormData,
    { data: { message: string; create_at: string }[] }
  >;
}

export const NotificationsContext = createContext<ContextValue>({
  getNotificationApi: DEFAULT_FUNCTION_RETURN
});

const NotificationsProvider = ({ children }: { children: ReactNode }) => {
  const getNotificationApi = useFunction(NotificationsApi.getNotification);
  const { isAuthenticated } = useAuth();
  
  useEffect(() => {
    if (isAuthenticated) {
      getNotificationApi.call(new FormData());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <NotificationsContext.Provider
      value={{
        getNotificationApi
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotificationContext = () => useContext(NotificationsContext);

export default NotificationsProvider;
