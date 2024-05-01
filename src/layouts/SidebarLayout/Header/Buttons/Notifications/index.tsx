import {
  alpha,
  Avatar,
  Badge,
  Box,
  Card,
  CardHeader,
  Divider,
  IconButton,
  Link,
  Popover,
  Stack,
  Tooltip,
  Typography
} from '@mui/material';
import { SetStateAction, useMemo, useRef, useState } from 'react';
import NotificationsActiveTwoToneIcon from '@mui/icons-material/NotificationsActiveTwoTone';
import { styled } from '@mui/material/styles';

import { formatDistance } from 'date-fns';
import { useNotificationContext } from '@/contexts/notification/noti-context';
import { viFormatDistance } from '@/utils/vi-formatDistance';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

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

function HeaderNotifications({
  isSeen,
  setIsSeen
}: {
  isSeen: boolean;
  setIsSeen: React.Dispatch<SetStateAction<boolean>>;
}) {
  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setIsSeen(true);
    setOpen(false);
  };

  const { getNotificationApi, readNotification } = useNotificationContext();

  const listNoti = useMemo(() => {
    return getNotificationApi.data?.data || [];
  }, [getNotificationApi.data]);

  return (
    <>
      <Tooltip arrow title="Notifications">
        <IconButton color="primary" ref={ref} onClick={handleOpen}>
          <NotificationsBadge
            badgeContent={
              !isSeen
                ? getNotificationApi.data?.data.filter((item) => {
                    return !item.isRead;
                  }).length
                : 0
            }
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

        {listNoti.map((item, index) => (
          <Stack key={index} sx={{ paddingTop: 1 }}>
            <Card>
              <CardHeader
                avatar={
                  <Avatar
                    component={Link}
                    variant="rounded"
                    alt={item?.user?.name}
                    src={item?.user?.avatar}
                    href={`/management/profile/${item?.user?.id}`}
                  />
                }
                title={
                  <Stack direction={'row'} spacing={1 / 2}>
                    <Typography
                      variant="h4"
                      component={Link}
                      href={`/management/profile/${item?.user?.id}`}
                      sx={{
                        color: 'black',
                        '&:hover': { textDecoration: 'underline' }
                      }}
                    >
                      {item?.user?.name + ' '}
                    </Typography>
                    <Typography
                      component={Link}
                      href={`http://localhost:3000/communities/home/${item?.itemId}`}
                      onClick={async () => {
                        await readNotification(item.id);
                      }}
                    >
                      {item?.message}
                    </Typography>
                  </Stack>
                }
                subheader={
                  <>
                    <Stack
                      direction={'row'}
                      spacing={1}
                      justifyContent={'space-between'}
                    >
                      {viFormatDistance(
                        formatDistance(new Date(item.createdAt), new Date())
                      )}
                      {!item.isRead && (
                        <FiberManualRecordIcon
                          color="primary"
                          fontSize="small"
                        />
                      )}
                    </Stack>
                  </>
                }
                action={<></>}
              />
            </Card>
          </Stack>
        ))}
      </Popover>
    </>
  );
}

export default HeaderNotifications;
