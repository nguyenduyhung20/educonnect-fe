import {
  Avatar,
  Box,
  Card,
  CardHeader,
  Drawer,
  IconButton,
  Paper,
  Stack,
  Typography
} from '@mui/material';
import React, { useMemo } from 'react';
import Link from '@/components/Link';
import { ArrowBack } from '@mui/icons-material';
import ClearIcon from '@mui/icons-material/Clear';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { useGroupsContext } from '@/contexts/groups/groups-context';
import { useDialog } from '@/hooks/use-dialog';
import { ConfirmApproveDialog } from './group-confirm-approve-dialog';
import { Member } from '@/types/groups';
import { useAuth } from '@/hooks/use-auth';
import { viFormatDistance } from '@/utils/vi-formatDistance';
import { formatDistance } from 'date-fns';

export const ApproveMemberDrawer = ({
  open,
  onClose
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const { getListUserApplyGroup, approveMember, groupID, refuseMember } =
    useGroupsContext();
  const listUserApplyGroup = useMemo(() => {
    return getListUserApplyGroup.data?.data || [];
  }, [getListUserApplyGroup]);
  const confirmApprove = useDialog<Member>();
  const confirmDelete = useDialog<Member>();
  const { user } = useAuth();
  return (
    <>
      <Drawer
        anchor="right"
        open={open}
        PaperProps={{
          sx: {
            width: 640
          }
        }}
        onClose={onClose}
      >
        <Paper elevation={5} sx={{ p: 3, borderRadius: 0 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start'
            }}
          >
            <Box>
              <Box sx={{ cursor: 'pointer' }} onClick={onClose}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  <ArrowBack
                    fontSize="small"
                    sx={{
                      verticalAlign: 'middle'
                    }}
                  />{' '}
                  Quay lại
                </Typography>
              </Box>
              <Typography variant="h6">{'Phê duyệt thành viên mới'}</Typography>
            </Box>
          </Box>
        </Paper>

        <Stack direction={'column'} spacing={2} padding={2}>
          {listUserApplyGroup.length == 0 ? (
            <>
              <Typography variant="h4">
                Chưa có người dùng xin vào nhóm
              </Typography>
            </>
          ) : (
            listUserApplyGroup.map((item, index) => (
              <Card key={index}>
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
                    <Typography
                      variant="h4"
                      component={Link}
                      href={`/management/profile/${item?.user?.id}`}
                      sx={{
                        color: 'black',
                        '&:hover': { textDecoration: 'underline' }
                      }}
                    >
                      {item?.user?.name}
                    </Typography>
                  }
                  subheader={viFormatDistance(
                    formatDistance(new Date(item.create_at), new Date())
                  )}
                  action={
                    <>
                      <Stack direction={'row'} spacing={1}>
                        <IconButton
                          aria-label="approve"
                          onClick={() => {
                            confirmApprove.handleOpen({
                              memberId: item.user?.id,
                              groupId: groupID,
                              role: 'user',
                              status: 'active'
                            });
                          }}
                        >
                          <PersonAddAltIcon />
                        </IconButton>
                        <IconButton
                          aria-label="delete"
                          onClick={() => {
                            confirmDelete.handleOpen({
                              memberId: item.user?.id,
                              groupId: groupID,
                              role: 'user',
                              status: 'active'
                            });
                          }}
                        >
                          <ClearIcon />
                        </IconButton>
                      </Stack>
                    </>
                  }
                />
              </Card>
            ))
          )}
        </Stack>
      </Drawer>

      <ConfirmApproveDialog
        open={confirmDelete.open}
        onClose={confirmDelete.handleClose}
        onConfirm={async () => {
          await refuseMember({
            member: {
              groupId: confirmDelete.data.groupId,
              memberId: confirmDelete.data.memberId
            },
            userId: user?.id
          });
        }}
        type="delete"
      />

      <ConfirmApproveDialog
        open={confirmApprove.open}
        onClose={confirmApprove.handleClose}
        onConfirm={async () => {
          await approveMember({
            member: {
              groupId: confirmApprove.data.groupId,
              memberId: confirmApprove.data.memberId
            },
            userId: user?.id
          });
        }}
        type="approve"
      />
    </>
  );
};
