import { FC, ReactNode, useCallback, useEffect, useMemo, useRef } from 'react';
import { Box, alpha, lighten, useTheme } from '@mui/material';
import PropTypes from 'prop-types';

import Sidebar from './Sidebar';
import Header from './Header';
import { useAuth } from '@/hooks/use-auth';
import { io } from 'socket.io-client';
import useAppSnackbar from '@/hooks/use-app-snackbar';
import { NotiData } from '@/types/noti';
import { useNotificationContext } from '@/contexts/notification/noti-context';

interface SidebarLayoutProps {
  children?: ReactNode;
}

const SidebarLayout: FC<SidebarLayoutProps> = ({ children }) => {
  const theme = useTheme();
  const { user, isAuthenticated } = useAuth();
  const { showSnackbarNoti } = useAppSnackbar();
  const { getNotificationApi } = useNotificationContext();

  const listNoti = useMemo(() => {
    return getNotificationApi.data?.data || [];
  }, [getNotificationApi.data]);

  const handleNotifyFunction = useRef<(data: NotiData) => void>();

  handleNotifyFunction.current = useCallback(
    (data: NotiData) => {
      const newData = {
        data: [
          ...listNoti,
          { message: data.content, create_at: new Date().toISOString() }
        ]
      };
      getNotificationApi.setData(newData);
      showSnackbarNoti(data);
    },
    [listNoti]
  );

  useEffect(() => {
    if (isAuthenticated) {
      // const socket = io(process.env.NEXT_PUBLIC_API_NOTIFICATION);
      // socket.emit('newUser', `${user.id}`);
      // socket.on('getNotification', (data: NotiData) => {
      //   handleNotifyFunction.current?.(data);
      // });
      // socket.on('disconnect', () => {
      //   // undefined
      // });

      return () => {
        // Cleanup logic (disconnect socket) if needed
      };
    }
  }, [isAuthenticated, user]);

  return (
    <>
      <Box
        sx={{
          flex: 1,
          height: '100%',

          '.MuiPageTitle-wrapper': {
            background:
              theme.palette.mode === 'dark'
                ? theme.colors.alpha.trueWhite[5]
                : theme.colors.alpha.white[50],
            marginBottom: `${theme.spacing(4)}`,
            boxShadow:
              theme.palette.mode === 'dark'
                ? `0 1px 0 ${alpha(
                    lighten(theme.colors.primary.main, 0.7),
                    0.15
                  )}, 0px 2px 4px -3px rgba(0, 0, 0, 0.2), 0px 5px 12px -4px rgba(0, 0, 0, .1)`
                : `0px 2px 4px -3px ${alpha(
                    theme.colors.alpha.black[100],
                    0.1
                  )}, 0px 5px 12px -4px ${alpha(
                    theme.colors.alpha.black[100],
                    0.05
                  )}`
          }
        }}
      >
        <Header />
        <Sidebar />
        <Box
          sx={{
            position: 'relative',
            zIndex: 5,
            display: 'block',
            flex: 1,
            pt: `${theme.header.height}`,
            [theme.breakpoints.up('lg')]: {
              ml: `${theme.sidebar.width}`
            },
            pb: `${theme.header.height}`,
            [theme.breakpoints.up('lg')]: {
              ml: `${theme.sidebar.width}`
            }
          }}
        >
          <Box display="block">{children}</Box>
        </Box>
      </Box>
    </>
  );
};

SidebarLayout.propTypes = {
  children: PropTypes.node
};

export default SidebarLayout;
