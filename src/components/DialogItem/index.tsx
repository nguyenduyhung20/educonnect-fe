import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
  Stack
} from '@mui/material';
import React, { ReactNode } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import useFunction from '@/hooks/use-function';

export const DialogItem = ({
  data,
  content,
  onConfirm,
  successMessage,
  title,
  buttonAccept,
  buttonDeny,
  colorButton,
  children,
  ...dialogProps
}: DialogProps & {
  data?: any;
  onConfirm: () => Promise<void>;
  successMessage: string;
  content: string;
  title: string;
  buttonAccept: string;
  buttonDeny: string;
  children?: ReactNode;
  colorButton?:
    | 'primary'
    | 'inherit'
    | 'secondary'
    | 'success'
    | 'error'
    | 'info'
    | 'warning';
}) => {
  const onConfirmHelper = useFunction(onConfirm, {
    successMessage: successMessage
  });
  return (
    <>
      <Dialog {...dialogProps}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Stack spacing={1}>
            <DialogContentText>{content}</DialogContentText>
            {children}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={(e) => {
              dialogProps.onClose?.(e, 'escapeKeyDown');
            }}
            startIcon={<CloseIcon />}
            variant="outlined"
          >
            {buttonDeny}
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
            color={colorButton ?? 'primary'}
          >
            {buttonAccept}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
