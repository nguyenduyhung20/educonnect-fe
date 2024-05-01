import { DialogProps } from '@mui/material';
import React from 'react';
import { DialogItem } from '@/components/DialogItem';

export const DeleteDialog = ({
  data,
  onConfirm,
  ...dialogProps
}: DialogProps & {
  data?: any;
  onConfirm: () => Promise<void>;
}) => {
  return (
    <>
      <DialogItem
        open={dialogProps.open}
        successMessage="Xoá thành công!"
        title="Xác nhận"
        content={data?.message}
        buttonDeny="Huỷ bỏ"
        buttonAccept="Xác nhận"
        onConfirm={onConfirm}
      />
    </>
  );
};
