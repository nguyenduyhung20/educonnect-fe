import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  Card,
  Tooltip,
  Avatar,
  CardMedia,
  Button,
  IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';

import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import ArrowForwardTwoToneIcon from '@mui/icons-material/ArrowForwardTwoTone';
import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';
import MoreHorizTwoToneIcon from '@mui/icons-material/MoreHorizTwoTone';
import { UserDetail } from '@/types/user';
import { useRouter } from 'next/router';
import { Check } from '@mui/icons-material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import useFunction from '@/hooks/use-function';
import { UsersApi } from '@/api/users';
import { useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { useAuth } from '@/hooks/use-auth';

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

  const router = useRouter();
  const followUserApi = useFunction(UsersApi.followUser);
  const followListApi = useFunction(UsersApi.followList);
  const { user: currentUser } = useAuth();

  const handleUserFollow = async () => {
    const response = await followUserApi.call({ userId: user.id });
    if (response) {
      setIsFollowed(true);
    }
  };

  useEffect(() => {
    const getFollowList = async () => {
      const followList = await followListApi.call(null);
      if (
        followList.data.userFolloweds.user.some(
          (followed) => followed.id === user.id
        )
      ) {
        setIsFollowed(true);
      }
    };
    getFollowList();
  }, []);

  return (
    <>
      <Box display="flex" mb={3}>
        <Tooltip arrow placement="top" title="Go back">
          <IconButton
            color="primary"
            onClick={() => {
              router.back();
            }}
          >
            <ArrowBackTwoToneIcon />
          </IconButton>
        </Tooltip>
      </Box>
      <CardCover>
        <CardMedia image={user?.avatar} />
        <CardCoverAction>
          <Input accept="image/*" id="change-cover" multiple type="file" />
          <label htmlFor="change-cover">
            <Button
              startIcon={<UploadTwoToneIcon />}
              variant="contained"
              component="span"
            >
              Thay đổi ảnh bìa
            </Button>
          </label>
        </CardCoverAction>
      </CardCover>

      <Box display={'flex'} justifyContent={'space-between'}>
        <AvatarWrapper>
          <Avatar variant="rounded" alt={user?.name} src={user?.avatar} />
          <ButtonUploadWrapper>
            <Input
              accept="image/*"
              id="icon-button-file"
              name="icon-button-file"
              type="file"
            />
            <label htmlFor="icon-button-file">
              <IconButton component="span" color="primary">
                <UploadTwoToneIcon />
              </IconButton>
            </label>
          </ButtonUploadWrapper>
        </AvatarWrapper>

        {currentUser.id !== user.id && (
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

      <Box
        display={'flex'}
        justifyContent={'space-between'}
        py={2}
        pl={2}
        mb={3}
      >
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
