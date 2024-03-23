import { styled } from '@mui/material/styles';
import { Box, Button, Card, CardMedia } from '@mui/material';
import React, { useCallback, useState } from 'react';
import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';
import { useAuth } from '@/hooks/use-auth';
import { useUserContext } from '@/contexts/user/user-context';
import { useDropzone } from 'react-dropzone';

const CardCover = styled(Card)(
  ({ theme }) => `
      position: relative;
  
      .MuiCardMedia-root {
        height: ${theme.spacing(26)};
      }
  `
);

const CardCoverAction = styled(Box)(
  ({ theme }) => `
      position: absolute;
      right: ${theme.spacing(2)};
      bottom: ${theme.spacing(2)};
  `
);

export const BackGroundCover = ({ user }: { user: User }) => {
  const [background, setBackGround] = useState<string[]>([user?.background]);
  const { changeBackGround } = useUserContext();

  const onDrop = useCallback(async (acceptedFiles) => {
    const selectedFiles = acceptedFiles.map((file) =>
      URL.createObjectURL(file)
    );
    setBackGround(selectedFiles);
    changeBackGround({ userId: user.id, uploadedFiles: acceptedFiles });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    useFsAccessApi: false
  });
  return (
    <>
      <CardCover>
        <CardMedia image={background[0]} />
        <CardCoverAction {...getRootProps()}>
          <label
            htmlFor="change-cover"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Button
              startIcon={<UploadTwoToneIcon />}
              variant="contained"
              component="span"
            >
              Thay đổi ảnh bìa
            </Button>
            <input
              {...getInputProps()}
              id="change-cover"
              name="change-cover"
              type="file"
            />
          </label>
        </CardCoverAction>
      </CardCover>
    </>
  );
};
