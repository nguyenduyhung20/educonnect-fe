import { Box, Card } from '@mui/material';

export const EmptyComponent = () => {
  return (
    <Box
      mt={8}
      display={'flex'}
      flexDirection="column"
      alignItems={'center'}
      justifyContent={'center'}
    >
      <Card>
        <img
          style={{ height: '100%' }}
          src={'/static/images/elearning/empty.png'}
          alt={'empty'}
        />
      </Card>
    </Box>
  );
};
