import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';


const CustomButton = styled(Button)({
  margin: '0 -7px',
  padding: '0px',
  minWidth: '0',
  backgroundColor: 'transparent', 
  boxShadow: 'none',
  borderRadius: '100%'
});


export default function GroupAvatarsMembers({ members }) {
  return (
    <AvatarGroup max={4}>
      {members.map((member, index) => {
        return (
          <Tooltip arrow key={index} title={member?.user?.name}>
            <CustomButton>
              <Avatar alt={member?.user?.name} src={member?.user?.avatar} />
            </CustomButton>
          </Tooltip>
        );
      })}
    </AvatarGroup>
  );
}
