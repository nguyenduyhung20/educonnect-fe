import { DialogItem } from '@/components/DialogItem';
import { DialogProps } from '@mui/material';
import React from 'react';

export const GroupDeletePostDialog = ({
  onConfirm,
  ...dialogProps
}: DialogProps & { onConfirm: () => Promise<void> }) => {
  return (
    <>
      <DialogItem
        title="Xác nhận"
        successMessage="Xoá bài viết thành công"
        content="Bạn muốn xoá bài viết này?"
        open={dialogProps.open}
        onClose={dialogProps.onClose}
        onConfirm={onConfirm}
        buttonAccept="Xác nhận"
        buttonDeny="Từ chối"
      />
    </>
  );
};
