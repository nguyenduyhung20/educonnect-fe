import PropTypes from 'prop-types';
import { Box, Stack, Typography } from '@mui/material';

import { UserDetail } from '@/types/user';
import { Check } from '@mui/icons-material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import useFunction from '@/hooks/use-function';
import { UsersApi } from '@/api/users';
import { useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { useAuth } from '@/hooks/use-auth';
import { BackGroundCover } from './BackGroundCover';
import { AvatarCover } from './AvatarCover';
import VerifiedIcon from '@mui/icons-material/Verified';

const ProfileCover = ({ user: user }: { user: UserDetail }) => {
  const [isFollowed, setIsFollowed] = useState<boolean | null>(false);

  const followUserApi = useFunction(UsersApi.followUser);
  const followListApi = useFunction(UsersApi.followList);
  const { user: currentUser } = useAuth();

  const handleUserFollow = async () => {
    const response = await followUserApi.call({ userId: user?.id });
    if (response) {
      setIsFollowed(true);
    }
  };

  const getFollowList = async () => {
    const followList = await followListApi.call(null);
    if (
      followList.data?.userFolloweds.user?.some(
        (followed) => followed.id === user?.id
      )
    ) {
      setIsFollowed(true);
    }
  };

  useEffect(() => {
    if (currentUser?.id !== user?.id) {
      getFollowList();
    }
  }, []);

  return (
    <>
      {user && <BackGroundCover user={user} />}

      <Box display={'flex'} justifyContent={'space-between'}>
        {<AvatarCover user={user} />}

        {currentUser?.id !== user?.id && (
          <Box mt={2} mx={2}>
            <LoadingButton
              onClick={!isFollowed ? handleUserFollow : undefined}
              loading={followUserApi.loading}
              variant={isFollowed ? 'outlined' : 'contained'}
              color="primary"
              startIcon={isFollowed ? <Check /> : <PersonAddIcon />}
            >
              {isFollowed ? 'Đã theo dõi' : 'Theo dõi'}
            </LoadingButton>
          </Box>
        )}
      </Box>

      <Stack py={2} pl={2}>
        <Stack justifyContent={'flex-start'} direction={'row'} spacing={1}>
          <Typography gutterBottom variant="h4">
            {user?.name}
          </Typography>
          {user?.is_famous && <VerifiedIcon color="primary" />}
        </Stack>

        <Typography variant='h5'>Điểm uy tín: {user?.point ?? 0}</Typography>
      </Stack>
    </>
  );
};

ProfileCover.propTypes = {
  // @ts-ignore
  user: PropTypes.object.isRequired
};

export default ProfileCover;
