import { Avatar, Box, Card, IconButton, styled } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';
import { useUserContext } from '@/contexts/user/user-context';
import { useDropzone } from 'react-dropzone';
import { User } from '@/types/user';

const AvatarWrapper = styled(Card)(
  ({ theme }) => `
  
      position: relative;
      overflow: visible;
      display: inline-block;
      margin-top: -${theme.spacing(9)};
      margin-left: ${theme.spacing(2)};
  
      .MuiAvatar-root {
        width: ${theme.spacing(16)};
        height: ${theme.spacing(16)};
      }
  `
);

const ButtonUploadWrapper = styled(Box)(
  ({ theme }) => `
      position: absolute;
      width: ${theme.spacing(4)};
      height: ${theme.spacing(4)};
      bottom: -${theme.spacing(1)};
      right: -${theme.spacing(1)};
  
      .MuiIconButton-root {
        border-radius: 100%;
        background: ${theme.colors.primary.main};
        color: ${theme.palette.primary.contrastText};
        box-shadow: ${theme.colors.shadows.primary};
        width: ${theme.spacing(4)};
        height: ${theme.spacing(4)};
        padding: 0;
    
        &:hover {
          background: ${theme.colors.primary.dark};
        }
      }
  `
);

export const AvatarCover = ({ user }: { user: User }) => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    setImages([user?.avatar]);
  }, [user]);

  const { changeAvatar } = useUserContext();

  const onDrop = useCallback(async (acceptedFiles) => {
    const selectedFiles = acceptedFiles.map((file) =>
      URL.createObjectURL(file)
    );
    setImages(selectedFiles);
    changeAvatar({ userId: user.id, uploadedFiles: acceptedFiles });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    useFsAccessApi: false
  });
  return (
    <>
      <AvatarWrapper>
        <Avatar variant="rounded" alt={user?.name} src={images[0]} />
        <ButtonUploadWrapper {...getRootProps()}>
          <label
            htmlFor="upload-image"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <IconButton component="span" color="primary">
              <UploadTwoToneIcon />
            </IconButton>
            <input
              {...getInputProps()}
              id="upload-image"
              name="upload-image"
              type="file"
            />
          </label>
        </ButtonUploadWrapper>
      </AvatarWrapper>
    </>
  );
};
