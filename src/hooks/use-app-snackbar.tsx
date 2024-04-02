import { NotiData } from '@/types/noti';
import { Avatar, Box, Button, Stack, Typography } from '@mui/material';
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
          <NextLink href={`/communities/home/${notiData.postId}`} passHref>
            <Button>
              <Stack
                direction={'row'}
                spacing={1}
                justifyContent={'center'}
                alignItems={'center'}
              >
                <Box>
                  <Avatar src={notiData.senderInfo.avatar} />
                </Box>
                <Box>
                  <Typography
                    variant="subtitle1"
                    color={'black'}
                    style={{ textTransform: 'none' }}
                  >
                    {notiData.content}
                  </Typography>
                </Box>
              </Stack>
            </Button>
          </NextLink>
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
