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
import useFunction from '@/hooks/use-function';

export const DeleteDialog = ({
  data,
  onConfirm,
  ...dialogProps
}: DialogProps & {
  data?: any;
  onConfirm: () => Promise<void>;
}) => {
  const onConfirmHelper = useFunction(onConfirm, {
    successMessage: 'Xóa thành công!'
  });
  return (
    <>
      <Dialog {...dialogProps}>
        <DialogTitle>Xác nhận</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {data?.message}
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
