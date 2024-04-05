import { NotiData } from '@/types/noti';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  Link,
  Stack,
  Typography
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { useCallback, useMemo } from 'react';
import NextLink from 'next/link';

function getErrorString(errorRaw: any): string {
  if (typeof errorRaw == 'string') {
    return errorRaw;
  } else if (errorRaw && typeof errorRaw == 'object') {
    return String(errorRaw.message);
  } else {
    return errorRaw ? String(errorRaw) : '';
  }
}

function useAppSnackbar() {
  const { enqueueSnackbar } = useSnackbar();

  const showSnackbarError = useCallback(
    (error: any) => {
      enqueueSnackbar(getErrorString(error), {
        variant: 'error',
        style: { whiteSpace: 'pre' }
      });
    },
    [enqueueSnackbar]
  );

  const showSnackbarNoti = useCallback(
    (notiData: NotiData) => {
      enqueueSnackbar(
        <>
          {/* <NextLink href={`/communities/home/${notiData.itemId}`} passHref>
            <Button> */}

          <Stack direction={'row'} alignItems={'center'} spacing={1}>
            <Avatar
              component={Link}
              variant="rounded"
              alt={notiData.senderInfo.name}
              src={notiData.senderInfo.avatar}
              href={`/management/profile/${notiData.senderInfo.id}`}
            />
            <Typography
              sx={{
                color: 'black',
                '&:hover': { textDecoration: 'underline' }
              }}
            >
              {notiData.senderInfo.name}
            </Typography>
            <Box>
              <Typography
                component={Link}
                href={`http://localhost:3000/communities/home/${notiData?.itemId}`}
              >
                {notiData.content}
              </Typography>
            </Box>
          </Stack>

          {/* </Button>
          </NextLink> */}
        </>,
        {
          variant: 'default',
          style: { whiteSpace: 'pre' }
        }
      );
    },
    [enqueueSnackbar]
  );

  const showSnackbarSuccess = useCallback(
    (successString: any) => {
      enqueueSnackbar(getErrorString(successString), {
        variant: 'success',
        style: { whiteSpace: 'pre' }
      });
    },
    [enqueueSnackbar]
  );

  return useMemo(
    () => ({
      showSnackbarError,
      showSnackbarSuccess,
      showSnackbarNoti
    }),
    [showSnackbarError, showSnackbarSuccess, showSnackbarNoti]
  );
}

export default useAppSnackbar;
