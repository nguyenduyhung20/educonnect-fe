import {
  alpha,
  Avatar,
  Badge,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  Popover,
  Stack,
  Tooltip,
  Typography
} from '@mui/material';
import { useMemo, useRef, useState } from 'react';
import NotificationsActiveTwoToneIcon from '@mui/icons-material/NotificationsActiveTwoTone';
import { styled } from '@mui/material/styles';

import { formatDistance, subDays } from 'date-fns';
import useFunction from '@/hooks/use-function';
import { NotificationsApi } from '@/api/notication';
import { useNotificationContext } from '@/contexts/notification/noti-context';

const NotificationsBadge = styled(Badge)(
  ({ theme }) => `
    
    .MuiBadge-badge {
        background-color: ${alpha(theme.palette.error.main, 0.1)};
        color: ${theme.palette.error.main};
        min-width: 16px; 
        height: 16px;
        padding: 0;

        &::after {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            box-shadow: 0 0 0 1px ${alpha(theme.palette.error.main, 0.3)};
            content: "";
        }
    }
`
);

function HeaderNotifications() {
  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const { getNotificationApi } = useNotificationContext();

  const listNoti = useMemo(() => {
    return getNotificationApi.data?.data || [];
  }, [getNotificationApi.data]);

  return (
    <>
      <Tooltip arrow title="Notifications">
        <IconButton color="primary" ref={ref} onClick={handleOpen}>
          <NotificationsBadge
            badgeContent={listNoti.length}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
          >
            <NotificationsActiveTwoToneIcon />
          </NotificationsBadge>
        </IconButton>
      </Tooltip>
      <Popover
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <Box
          sx={{ p: 2 }}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h5">Thông báo</Typography>
        </Box>
        <Divider />
        <List sx={{ p: 0 }}>
          {listNoti.map((item, index) => (
            <ListItem
              sx={{ p: 2, minWidth: 350, display: { xs: 'block', sm: 'flex' } }}
              key={index}
            >
              <Box flex="1">
                <Stack display="flex" justifyContent="space-between">
                  <Stack>
                    <Typography sx={{ fontWeight: 'bold' }}>
                      {item.message}
                    </Typography>
                  </Stack>
                  <Typography variant="caption" sx={{ textTransform: 'none' }}>
                    {formatDistance(new Date(item.create_at), new Date(), {
                      addSuffix: true
                    })}
                  </Typography>
                </Stack>
              </Box>
            </ListItem>
          ))}
        </List>
      </Popover>
    </>
  );
}

export default HeaderNotifications;
