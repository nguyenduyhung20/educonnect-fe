import { Box, Drawer, Paper, Stack, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import { ArrowBack } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { useReportContext } from '@/contexts/report/report-context';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useDialog } from '@/hooks/use-dialog';
import { GroupDeletePostDialog } from './group-delete-post-dialog';
import { GroupSkipReportPost } from './group-skip-report-post';
import { Group } from '@/types/groups';

export const ListReportedDrawer = ({
  group,
  open,
  onClose
}: {
  group: Group;
  open: boolean;
  onClose: () => void;
}) => {
  const { getPostReportedGroup } = useReportContext();
  const listPosts = useMemo(() => {
    return getPostReportedGroup.data?.data || [];
  }, [getPostReportedGroup]);
  const skipReportPostDialog = useDialog<{ userId: number; postId: number }>();
  const deletePostReportedDialog = useDialog<{
    postId: number;
    groupId: number;
    userId: number;
  }>();
  const { skipReportPost, deletePostReported } = useReportContext();

  const columnsNormal = [
    {
      field: 'reportName',
      headerName: 'Tài khoản báo cáo',
      type: 'string',
      width: 240,
      align: 'left',
      headerAlign: 'left',
      editable: false,
      valueGetter: (params) => params.row.userReport.name
    },
    {
      field: 'postTitle',
      headerName: 'Tiêu đề bài viết',
      headerAlign: 'center',
      align: 'center',
      width: 480,
      editable: false,
      valueGetter: (params) => params.row.post.title
    },
    {
      field: 'postUserName',
      headerName: 'Tài khoản đăng bài viết',
      type: 'string',
      width: 240,
      align: 'left',
      headerAlign: 'left',
      editable: false,
      valueGetter: (params) => params.row.post.user.name
    },
    {
      field: 'reason',
      headerName: 'Lý do báo cáo',
      type: 'string',
      width: 240,
      align: 'left',
      headerAlign: 'left',
      editable: false,
      valueGetter: (params) => params.row.reason
    },
    {
      field: 'link',
      headerName: 'Đường dẫn đến bài viết',
      type: 'string',
      width: 160,
      align: 'left',
      headerAlign: 'left',
      editable: false,
      valueGetter: (params) => params.row.post.user.name
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Hành động',
      width: 100,
      cellClassName: 'actions',
      getActions: (params) => {
        return [
          <GridActionsCellItem
            key={params.id}
            icon={<DeleteIcon />}
            label="Edit"
            className="textPrimary"
            onClick={() => {
              deletePostReportedDialog.handleOpen({
                postId: params.row.post.id,
                groupId: group.id,
                userId: params.row.userReport.id
              });
            }}
            color="inherit"
          />,
          <GridActionsCellItem
            key={params.id}
            icon={<ArrowForwardIcon />}
            label="Delete"
            onClick={() => {
              skipReportPostDialog.handleOpen({
                userId: params.row.userReport.id,
                postId: params.row.post.id
              });
            }}
            color="inherit"
          />
        ];
      }
    }
  ];

  return (
    <>
      <Drawer
        anchor="right"
        open={open}
        PaperProps={{
          sx: {
            width: 1280
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
              <Typography variant="h6">
                {'Quản lí bài viết bị báo cáo'}
              </Typography>
            </Box>
          </Box>
        </Paper>

        <Stack direction={'column'} spacing={2} padding={2}>
          {listPosts.length == 0 ? (
            <>
              <Typography variant="h4">
                Chưa có bài viết nào bị báo cáo
              </Typography>
            </>
          ) : (
            <Box
              sx={{
                height: 600,
                width: '100%'
              }}
            >
              <DataGrid
                // @ts-ignore
                columns={columnsNormal}
                rows={getPostReportedGroup.data?.data}
                editMode="row"
                getRowId={(row) => row.post.id} // Assuming post.id is unique
              />
            </Box>
          )}
        </Stack>
      </Drawer>

      <GroupDeletePostDialog
        open={deletePostReportedDialog.open}
        onConfirm={async () => {
          deletePostReported(
            deletePostReportedDialog.data.postId,
            deletePostReportedDialog.data.groupId,
            deletePostReportedDialog.data.userId
          );
        }}
        onClose={deletePostReportedDialog.handleClose}
      />

      <GroupSkipReportPost
        open={skipReportPostDialog.open}
        onConfirm={async () => {
          skipReportPost(
            skipReportPostDialog.data.userId,
            skipReportPostDialog.data.postId
          );
        }}
        onClose={skipReportPostDialog.handleClose}
      />
    </>
  );
};
