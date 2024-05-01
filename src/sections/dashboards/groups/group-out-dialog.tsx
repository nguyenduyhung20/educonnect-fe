import { DialogProps } from '@mui/material';
import React from 'react';
import { Group } from '@/types/groups';
import { DialogItem } from '@/components/DialogItem';

export const GroupOutDialog = ({
  group,
  onConfirm,
  ...dialogProps
}: DialogProps & {
  group?: Group;
  onConfirm: () => Promise<void>;
}) => {
  return (
    <>
      <DialogItem
        successMessage="Rời nhóm thành công"
        title="Xác nhận"
        content="Bạn có chắc chắn muốn ngừng tham gia nhóm?"
        buttonAccept="Xác nhận"
        buttonDeny="Huỷ bỏ"
        open={dialogProps.open}
        onConfirm={onConfirm}
      />
    </>
  );
};
