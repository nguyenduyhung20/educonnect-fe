import { DialogItem } from '@/components/DialogItem';
import { DialogProps, TextField } from '@mui/material';
import React from 'react';

export const ReportPostDialog = ({
  data,
  reason,
  onConfirm,
  setReason,
  ...dialogProps
}: DialogProps & {
  data?: any;
  onConfirm: () => Promise<void>;
  reason: string;
  setReason: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <DialogItem
      title="Bạn muốn báo cáo bài viết này?"
      content=""
      buttonAccept="Xác nhận"
      buttonDeny="Huỷ bỏ"
      open={dialogProps.open}
      onConfirm={onConfirm}
      successMessage="Báo cáo thành công"
      colorButton="error"
      onClose={dialogProps.onClose}
    >
      <TextField
        multiline
        placeholder="Lý do"
        value={reason}
        onChange={(item) => setReason(item.target.value)}
      />
    </DialogItem>
  );
};
