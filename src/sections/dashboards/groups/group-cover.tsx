import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  Card,
  Tooltip,
  Avatar,
  CardMedia,
  Button,
  IconButton,
  Stack
} from '@mui/material';
import { styled } from '@mui/material/styles';

import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';
import AddIcon from '@mui/icons-material/Add';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import { useRouter } from 'next/router';
import useFunction from '@/hooks/use-function';
import { GroupsApi } from '@/api/groups';
import { useAuth } from '@/hooks/use-auth';
import { Group, Member } from '@/types/groups';
import { useEffect, useMemo } from 'react';
import { ViMemberStatus } from '@/types/groups';

import { useDialog } from '@/hooks/use-dialog';

import CheckIcon from '@mui/icons-material/Check';
import { GroupOutDialog } from './group-out-dialog';
import { useDrawer } from '@/hooks/use-drawer';
import { ApproveMemberDrawer } from './group-approve-member-drawer';
import { useGroupsContext } from '@/contexts/groups/groups-context';

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
  const approveMemberDrawer = useDrawer();
  const { getListUserApplyGroup, groupID } = useGroupsContext();

  const { user, isAuthenticated } = useAuth();
  const requestData: Member = {
    memberId: user?.id,
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

  useEffect(() => {
    if (member?.role == 'admin' && user) {
      getListUserApplyGroup.call({ userId: user?.id, groupId: groupID });
    }
  }, [member, groupID, user]);

  const outGroupDialog = useDialog();

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
        <CardMedia image={group?.background} />
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
      <Box
        sx={{
          display: { xs: 'block', sm: 'flex' },
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <AvatarWrapper>
          <Avatar variant="rounded" alt={group?.title} src={group?.avatar} />
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
            <Stack spacing={1}>
              <Button
                startIcon={
                  member.status === 'active' ? (
                    <CheckIcon />
                  ) : (
                    <HourglassEmptyIcon />
                  )
                }
                sx={{ width: '100%' }}
                onClick={() => outGroupDialog.handleOpen(group)}
                variant="outlined"
              >
                {ViMemberStatus[member.status]}
              </Button>
              {member.role == 'admin' ? (
                <Button
                  sx={{ width: '100%' }}
                  onClick={() => approveMemberDrawer.handleOpen(group)}
                  variant="outlined"
                >
                  {'Phê duyệt thành viên'}
                </Button>
              ) : (
                <></>
              )}
            </Stack>
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

      <GroupOutDialog
        open={outGroupDialog.open}
        group={group}
        onClose={outGroupDialog.handleClose}
        onConfirm={async () => {
          joinGroup();
        }}
      />

      <ApproveMemberDrawer
        open={approveMemberDrawer.open}
        onClose={approveMemberDrawer.handleClose}
      />
    </>
  );
};

GroupCover.propTypes = {
  // @ts-ignore
  group: PropTypes.object.isRequired
};

export default GroupCover;
