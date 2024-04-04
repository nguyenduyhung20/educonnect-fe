import { Group, Member } from '@/types/groups';
import { Box, Button, Card, CardMedia, styled } from '@mui/material';
import React, { useCallback, useMemo, useState } from 'react';
import UploadTwoToneIcon from '@mui/icons-material/UploadTwoTone';
import { useGroupsContext } from '@/contexts/groups/groups-context';
import { useDropzone } from 'react-dropzone';
import useFunction from '@/hooks/use-function';
import { GroupsApi } from '@/api/groups';

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

export const GroupBackGround = ({
  group,
  member
}: {
  group: Group;
  member: Member;
}) => {
  const [background, setBackGround] = useState<string[]>([group?.background]);
  const { changeBackGround } = useGroupsContext();

  const onDrop = useCallback(async (acceptedFiles) => {
    const selectedFiles = acceptedFiles.map((file) =>
      URL.createObjectURL(file)
    );
    setBackGround(selectedFiles);
    changeBackGround({ groupId: group.id, uploadedFiles: acceptedFiles });
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
            {member.role == 'admin' && (
              <Button
                startIcon={<UploadTwoToneIcon />}
                variant="contained"
                component="span"
              >
                Thay đổi ảnh bìa
              </Button>
            )}
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
