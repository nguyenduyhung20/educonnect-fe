import PropTypes from 'prop-types';
import {
  Box,
  Typography,
  Tooltip,
  Button,
  IconButton,
  Stack,
  Badge
} from '@mui/material';

import ArrowBackTwoToneIcon from '@mui/icons-material/ArrowBackTwoTone';
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
import { GroupBackGround } from './group-background-item';
import { GroupAvatarItem } from './group-avatar-item';

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
      {member && <GroupBackGround group={group} member={member} />}
      <Box
        sx={{
          display: { xs: 'block', sm: 'flex' },
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        {member && <GroupAvatarItem group={group} member={member} />}

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
              <Badge
                badgeContent={getListUserApplyGroup.data?.data.length}
                color="error"
              >
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
              </Badge>
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
