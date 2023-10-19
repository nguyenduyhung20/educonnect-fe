import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import { useTheme } from '@mui/material';

export default function GroupAvatarsMembers() {
  const theme = useTheme();
  return (
    <AvatarGroup max={4}>
      <Avatar alt="Travis Howard" src="/static/images/avatars/2.jpg" />
      <Avatar alt="Cindy Baker" src="/static/images/avatars/3.jpg" />
      <Avatar alt="Agnes Walker" src="/static/images/avatars/4.jpg" />
      <Avatar alt="Trevor Henderson" src="/static/images/avatars/5.jpg" />
    </AvatarGroup>
  );
}
