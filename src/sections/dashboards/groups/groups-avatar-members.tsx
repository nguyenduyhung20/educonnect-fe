import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';

export default function GroupAvatarsMembers({ members }) {
  return (
    <AvatarGroup max={4}>
      {members.map((member, index) => {
        return <Avatar key={index} alt={member?.user?.name} src={member?.user?.avatar}/>;
      })}
    </AvatarGroup>
  );
}
