import { ClassApi } from '@/api/elearning/class';
import useFunction from '@/hooks/use-function';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Link,
  Stack,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import ShareIcon from '@mui/icons-material/Share';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import React, { useEffect, useMemo, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { EmptyComponent } from '@/components/Empty';
import { DeleteDialog } from './delete-dialog';
import { useDialog } from '@/hooks/use-dialog';
import { DeleteDialogData } from '@/types/elearning';
import { useDrawer } from '@/hooks/use-drawer';
import { DocuCreateDrawer } from './docu-create-drawer';

export const ElearningDocument = ({ classId, subjectId }) => {
  const { user } = useAuth();
  const [recall, setRecall] = useState(false);
  const getDocument = useFunction(ClassApi.getDocumentOfSubjectAndClass);
  const docuCreateDrawer = useDrawer();

  useEffect(() => {
    getDocument.call({ classId, subjectId });
    setRecall(false);
  }, [recall]);
  const deleteDialog = useDialog<DeleteDialogData>();

  const documentList = useMemo(() => {
    return getDocument.data?.data;
  }, [getDocument.data]);

  const [title, setTitle] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [docuSelected, setDocuSelected] = useState(null);
  const handleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleCancel = () => {
    setOpenDialog(false);
  };

  const handleSave = async () => {
    const newDocu = documentList[docuSelected];
    newDocu.title = title;
    await ClassApi.updateDocument(newDocu);
    documentList[docuSelected].title = title;
    getDocument.setData({
      data: documentList
    });
    setOpenDialog(false);
  };

  const updateDocument = useFunction(handleSave, {
    successMessage: 'Cập nhật thành công!'
  });
  return (
    <>
      <style>
        {`
          .document-title {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
                    line-clamp: 2; 
            -webkit-box-orient: vertical;
          }
          .delete:hover {
            color: red;
          }
          .update:hover {
            color: orange;
          }
          .share:hover {
            color: blue;
          }
          .ml-1 {
            margin-left: 2px;
            padding: 2px;
          }
        `}
      </style>
      {documentList?.length || user?.role === 'teacher' ? (
        <Box mt={4}>
          <Grid container spacing={3}>
            {user?.role === 'teacher' && (
              <Grid item xs={4}>
                <Card
                  sx={{ display: 'flex', height: '124px' }}
                  onClick={() => docuCreateDrawer.handleOpen()}
                >
                  <Button
                    variant="outlined"
                    sx={{
                      border: '2px dashed  ',
                      width: '100%',
                      height: '100%'
                    }}
                  >
                    <ControlPointIcon fontSize="large" />
                  </Button>
                </Card>
              </Grid>
            )}
            {documentList?.map((item, index) => (
              <Grid key={index} item xs={4}>
                <Card sx={{ display: 'flex', height: '124px' }}>
                  <CardMedia
                    component={'img'}
                    image={
                      item.url?.endsWith('.pdf')
                        ? '/static/images/elearning/PDF-icon.png'
                        : '/static/images/elearning/PNG-icon.png'
                    }
                    sx={{
                      width: '100px'
                    }}
                  />
                  <CardContent
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      height: '100%',
                      width: '100%'
                    }}
                  >
                    <Stack spacing={1}>
                      <Tooltip title={item.title}>
                        <Link
                          href={item.url}
                          underline="none"
                          target="_blank"
                          rel="noreferrer noopener"
                        >
                          <Typography
                            fontSize={16}
                            variant="h5"
                            className="document-title"
                          >
                            {item.title}
                          </Typography>
                        </Link>
                      </Tooltip>
                    </Stack>
                    {user.role === 'teacher' && <CardActions
                      sx={{ width: '100%', justifyContent: 'flex-end' }}
                    >
                      <ShareIcon className="share" onClick={() => {}} />
                      <ModeEditOutlineIcon
                        className="update ml-1"
                        onClick={() => {
                          setTitle(item.title);
                          setOpenDialog(true);
                          setDocuSelected(index);
                        }}
                      />
                      <DeleteOutlineIcon
                        className="delete ml-1"
                        onClick={() => {
                          deleteDialog.handleOpen({
                            message: `Bạn muốn xóa tài liệu ${item.title} khỏi lớp?`,
                            id: item.id,
                            type: 'document'
                          });
                        }}
                      />
                    </CardActions>}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : (
        <EmptyComponent />
      )}
      <DeleteDialog
        open={deleteDialog.open}
        data={deleteDialog.data}
        onClose={deleteDialog.handleClose}
        onConfirm={async () => {
          try {
            await ClassApi.deleteDocument(deleteDialog.data.id);
            getDocument.setData({
              data: getDocument.data?.data.filter(
                (item) => item.id !== deleteDialog.data.id
              )
            });
          } catch (error) {
            throw error;
          }
        }}
      />

      <Dialog open={openDialog} onClose={handleCancel}>
        <DialogTitle>Đổi tên tài liệu</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Tên"
            type="text"
            fullWidth
            value={title}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Hủy bỏ
          </Button>
          <Button
            onClick={async () => await updateDocument.call({})}
            color="primary"
          >
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>

      <DocuCreateDrawer
        open={docuCreateDrawer.open}
        onClose={docuCreateDrawer.handleClose}
        classId={classId}
        subjectId={subjectId}
        setRecall={setRecall}
      />
    </>
  );
};
