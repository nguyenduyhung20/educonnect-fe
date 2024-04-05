import {
  createContext,
  ReactNode,
  useEffect,
  useContext,
  useCallback
} from 'react';

import useFunction, {
  DEFAULT_FUNCTION_RETURN,
  UseFunctionReturnType
} from 'src/hooks/use-function';

import { NotificationsApi } from '@/api/notication';
import { useAuth } from '@/hooks/use-auth';
import { Notification } from '@/types/noti';

interface ContextValue {
  getNotificationApi: UseFunctionReturnType<FormData, { data: Notification[] }>;
  readNotification: (notificationId: number) => void;
}

export const NotificationsContext = createContext<ContextValue>({
  getNotificationApi: DEFAULT_FUNCTION_RETURN,
  readNotification: async () => {}
});

const NotificationsProvider = ({ children }: { children: ReactNode }) => {
  const getNotificationApi = useFunction(NotificationsApi.getNotification);
  const readNotification = useCallback((notificationId: number) => {
    const response = NotificationsApi.readNotification(notificationId);
    if (response) {
    }
  }, []);
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
        getNotificationApi,
        readNotification
      }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotificationContext = () => useContext(NotificationsContext);

export default NotificationsProvider;
