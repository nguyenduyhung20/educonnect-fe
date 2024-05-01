import { DialogProps } from '@mui/material';
import React from 'react';
import { Group } from '@/types/groups';
import { DialogItem } from '@/components/DialogItem';

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
  return (
    <>
      <DialogItem
        successMessage={
          type == 'delete' ? 'Đã từ chối!' : 'Phê duyệt thành công!'
        }
        content={
          type == 'delete'
            ? 'Bạn muốn từ chối người này'
            : 'Bạn muốn phê duyệt người này'
        }
        buttonAccept="Xác nhận"
        buttonDeny="Huỷ bỏ"
        open={dialogProps.open}
        onConfirm={onConfirm}
        title="Xác nhận"
      />
    </>
  );
};
