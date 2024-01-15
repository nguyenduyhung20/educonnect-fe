import { Box } from '@mui/material';
import HeaderSearch from './Search';
import HeaderNotifications from './Notifications';
import { useState } from 'react';

function HeaderButtons() {
  const [isSeen, setIsSeen] = useState(false);
  return (
    <Box sx={{ mr: 1 }}>
      <HeaderSearch />
      <Box sx={{ mx: 0.5 }} component="span">
        <HeaderNotifications isSeen={isSeen} setIsSeen={setIsSeen} />
      </Box>
    </Box>
  );
}

export default HeaderButtons;
