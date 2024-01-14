import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle
} from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { Group } from '@/types/groups';
import useFunction from '@/hooks/use-function';

export const GroupOutDialog = ({
  group,
  onConfirm,
  ...dialogProps
}: DialogProps & {
  group?: Group;
  onConfirm: () => Promise<void>;
}) => {
  const onConfirmHelper = useFunction(onConfirm, {
    successMessage: 'Rời nhóm thành công!'
  });
  return (
    <>
      <Dialog {...dialogProps}>
        <DialogTitle>Xác nhận</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn ngừng tham gia nhóm?
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
