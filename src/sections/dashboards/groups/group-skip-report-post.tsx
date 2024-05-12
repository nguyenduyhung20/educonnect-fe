import React from 'react';
import { DialogProps } from '@mui/material';
import { DialogItem } from '@/components/DialogItem';

export const GroupSkipReportPost = ({
  onConfirm,
  ...dialogProps
}: DialogProps & {
  onConfirm: () => Promise<void>;
}) => {
  return (
    <DialogItem
      title="Xác nhận"
      buttonAccept="Xác nhận"
      buttonDeny="Từ chối"
      open={dialogProps.open}
      onClose={dialogProps.onClose}
      onConfirm={onConfirm}
      successMessage="Bỏ qua thành công"
      content="Bạn muốn bỏ qua báo cáo này?"
      colorButton="error"
    />
  );
};
