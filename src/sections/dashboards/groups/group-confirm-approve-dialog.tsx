import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
  Typography
} from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { Group } from '@/types/groups';
import useFunction from '@/hooks/use-function';

export const ConfirmApproveDialog = ({
  type,
  group,
  onConfirm,
  ...dialogProps
}: DialogProps & {
  type: 'approve' | 'delete';
  group?: Group;
  onConfirm: () => Promise<void>;
}) => {
  const onConfirmHelper = useFunction(onConfirm, {
    successMessage:
      type == 'delete' ? 'Đã từ chối!' : 'Phê duyệt thành công!'
  });
  return (
    <>
      <Dialog {...dialogProps}>
        <DialogTitle>
          {' '}
          <Typography variant="h4">Xác nhận</Typography>{' '}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {type == 'delete'
              ? 'Bạn muốn từ chối người này'
              : 'Bạn muốn phê duyệt người này'}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={(e) => {
              dialogProps.onClose?.(e, 'escapeKeyDown');
            }}
            startIcon={<CloseIcon />}
            variant="outlined"
          >
            Hủy bỏ
          </Button>
          <Button
            onClick={async (e) => {
              const { error } = await onConfirmHelper.call({});
              if (!error) {
                dialogProps.onClose?.(e, 'escapeKeyDown');
              }
            }}
            startIcon={<CheckIcon />}
            variant="contained"
          >
            Xác nhận
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
