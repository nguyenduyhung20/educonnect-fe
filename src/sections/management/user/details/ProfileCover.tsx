import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  Card,
  Avatar,
  CardMedia,
  Button,
  IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';

import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';
import { UserDetail } from '@/types/user';
import { Check } from '@mui/icons-material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import useFunction from '@/hooks/use-function';
import { UsersApi } from '@/api/users';
import { useCallback, useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { useAuth } from '@/hooks/use-auth';
import { useDropzone } from 'react-dropzone';
import { useUserContext } from '@/contexts/user/user-context';
import { BackGroundCover } from './BackGroundCover';
import { AvatarCover } from './AvatarCover';

const Input = styled('input')({
  display: 'none'
});

const AvatarWrapper = styled(Card)(
  ({ theme }) => `

    position: relative;
    overflow: visible;
    display: inline-block;
    margin-top: -${theme.spacing(9)};
    margin-left: ${theme.spacing(2)};

    .MuiAvatar-root {
      width: ${theme.spacing(16)};
      height: ${theme.spacing(16)};
    }
`
);

const ButtonUploadWrapper = styled(Box)(
  ({ theme }) => `
    position: absolute;
    width: ${theme.spacing(4)};
    height: ${theme.spacing(4)};
    bottom: -${theme.spacing(1)};
    right: -${theme.spacing(1)};

    .MuiIconButton-root {
      border-radius: 100%;
      background: ${theme.colors.primary.main};
      color: ${theme.palette.primary.contrastText};
      box-shadow: ${theme.colors.shadows.primary};
      width: ${theme.spacing(4)};
      height: ${theme.spacing(4)};
      padding: 0;
  
      &:hover {
        background: ${theme.colors.primary.dark};
      }
    }
`
);

const CardCover = styled(Card)(
  ({ theme }) => `
    position: relative;

    .MuiCardMedia-root {
      height: ${theme.spacing(26)};
    }
`
);

const CardCoverAction = styled(Box)(
  ({ theme }) => `
    position: absolute;
    right: ${theme.spacing(2)};
    bottom: ${theme.spacing(2)};
`
);

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
      followList.data.userFolloweds.user?.some(
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
      <BackGroundCover user={user}/>

      <Box display={'flex'} justifyContent={'space-between'}>
        <AvatarCover user={user}/>

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

      <Box display={'flex'} justifyContent={'space-between'} py={2} pl={2}>
        <Typography gutterBottom variant="h4">
          {user?.name}
        </Typography>
      </Box>
    </>
  );
};

ProfileCover.propTypes = {
  // @ts-ignore
  user: PropTypes.object.isRequired
};

export default ProfileCover;
