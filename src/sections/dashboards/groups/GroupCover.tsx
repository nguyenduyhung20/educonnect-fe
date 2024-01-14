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
import CheckIcon from '@mui/icons-material/Check';
import ArrowForwardTwoToneIcon from '@mui/icons-material/ArrowForwardTwoTone';
import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';
import MoreHorizTwoToneIcon from '@mui/icons-material/MoreHorizTwoTone';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import { useRouter } from 'next/router';
import useFunction from '@/hooks/use-function';
import { GroupsApi } from '@/api/groups';
import { useAuth } from '@/hooks/use-auth';
import { Group, Member, MemberRole, MemberStatus } from '@/types/groups';
import { useEffect, useMemo, useState } from 'react';
import { ViMemberStatus } from '@/types/groups';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

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

const GroupCover = ({ group }: { group: Group }) => {
  const router = useRouter();
  const joinGroupApi = useFunction(GroupsApi.joinGroup);
  const leaveGroupApi = useFunction(GroupsApi.leaveGroup);
  const checkJoinGroupApi = useFunction(GroupsApi.checkJoinGroup);

  const { user, isAuthenticated } = useAuth();
  const requestData: Member = {
    memberId: user.id,
    groupId: group.id,
    role: 'user',
    status: 'pending'
  };

  const member = useMemo(() => {
    return checkJoinGroupApi.data?.data;
  }, [checkJoinGroupApi.data]);

  const joinGroup = () => {
    if (member && !member.status) {
      joinGroupApi.call(requestData);
      requestData.status = 'pending';
      checkJoinGroupApi.setData({ data: requestData });
    } else {
      leaveGroupApi.call(requestData);
      requestData.status = null;
      checkJoinGroupApi.setData({ data: requestData });
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else {
      if (user) {
        checkJoinGroupApi.call(requestData);
      }
    }
  }, [user]);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    joinGroup();
    handleClose();
  };

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
        <CardMedia
          image={
            'https://yt3.googleusercontent.com/m3aEIKqYP-rYVvKgjqJObR6-UDgEcBj52re__8VZn38DfiFSu4U1-XyB9F3Lcj_FcT5xZYnaMA=s900-c-k-c0x00ffffff-no-rj'
          }
        />
        <CardCoverAction>
          <Input accept="image/*" id="change-cover" multiple type="file" />
          <label htmlFor="change-cover">
            <Button
              startIcon={<UploadTwoToneIcon />}
              variant="contained"
              component="span"
            >
              Change cover
            </Button>
          </label>
        </CardCoverAction>
      </CardCover>
      <Box
        sx={{
          display: { xs: 'block', sm: 'flex' },
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <AvatarWrapper>
          <Avatar
            variant="rounded"
            alt={group?.title}
            src={
              'https://yt3.googleusercontent.com/m3aEIKqYP-rYVvKgjqJObR6-UDgEcBj52re__8VZn38DfiFSu4U1-XyB9F3Lcj_FcT5xZYnaMA=s900-c-k-c0x00ffffff-no-rj'
            }
          />
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

        <Box py={2} px={2} sx={{ mt: { xs: 0, sm: 1 } }}>
          {member?.status ? (
            <Box>
              <Button
                startIcon={
                  member.status === 'active' ? <CheckIcon /> : <HourglassEmptyIcon />
                }
                sx={{ width: '100%' }}
                onClick={handleOpen}
                variant="outlined"
              >
                {ViMemberStatus[member.status]}
              </Button>

              <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Xác nhận</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Bạn có chắc chắn muốn ngừng tham gia nhóm?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={handleClose}
                    startIcon={<CloseIcon />}
                    variant="outlined"
                  >
                    Hủy bỏ
                  </Button>
                  <Button
                    onClick={handleConfirm}
                    startIcon={<CheckIcon />}
                    variant="contained"
                  >
                    Xác nhận
                  </Button>
                </DialogActions>
              </Dialog>
            </Box>
          ) : (
            <Button
              onClick={joinGroup}
              sx={{ width: '100%' }}
              startIcon={<AddIcon />}
              variant="contained"
            >
              Tham gia
            </Button>
          )}
        </Box>
      </Box>

      <Box py={2} pl={2} mb={3}>
        <Typography gutterBottom variant="h4">
          {group?.title}
        </Typography>
        <Typography variant="subtitle2">{group?.meta_title}</Typography>
      </Box>
    </>
  );
};

GroupCover.propTypes = {
  // @ts-ignore
  group: PropTypes.object.isRequired
};

export default GroupCover;
