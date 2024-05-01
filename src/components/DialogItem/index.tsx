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
  
  export const DialogItem = ({
    data,
    content,
    onConfirm,
    successMessage,
    title,
    buttonAccept,
    buttonDeny,
    ...dialogProps
  }: DialogProps & {
    data?: any;
    onConfirm: () => Promise<void>;
    successMessage: string;
    content: string;
    title: string;
    buttonAccept: string;
    buttonDeny: string
  }) => {
    const onConfirmHelper = useFunction(onConfirm, {
      successMessage: successMessage
    });
    return (
      <>
        <Dialog {...dialogProps}>
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {content}
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
            >
                {buttonAccept}
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  };
  