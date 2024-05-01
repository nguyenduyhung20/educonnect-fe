import {
  Box,
  Typography,
  Card,
  CardHeader,
  Divider,
  Avatar,
  useTheme,
  styled,
  CircularProgress
} from '@mui/material';

import ShoppingBagTwoToneIcon from '@mui/icons-material/ShoppingBagTwoTone';
import { useUserContext } from '@/contexts/user/user-context';
import { useEffect } from 'react';

const AvatarPrimary = styled(Avatar)(
  ({ theme }) => `
      background: ${theme.colors.primary.lighter};
      color: ${theme.colors.primary.main};
      width: ${theme.spacing(7)};
      height: ${theme.spacing(7)};
`
);

function RecentActivity() {
  const theme = useTheme();
  const { getOverviewActivity } = useUserContext();

  useEffect(() => {
    getOverviewActivity.call();
  }, []);

  const data = getOverviewActivity.data;

  return (
    <>
      {data ? (
        <Card>
          <CardHeader title="Hoạt động gần đây của bạn" />
          <Divider />
          <Box px={2} py={4} display="flex" alignItems="flex-start">
            <AvatarPrimary>
              <ShoppingBagTwoToneIcon />
            </AvatarPrimary>
            <Box pl={2} flex={1}>
              <Typography variant="h3">Tương tác</Typography>

              <Box pt={2} display="flex">
                <Box pr={8}>
                  <Typography
                    gutterBottom
                    variant="caption"
                    sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
                  >
                    Tương tác
                  </Typography>
                  <Typography variant="h2">{data.interactNumber}</Typography>
                </Box>
                <Box>
                  <Typography
                    gutterBottom
                    variant="caption"
                    sx={{ fontSize: `${theme.typography.pxToRem(16)}` }}
                  >
                    Bình luận
                  </Typography>
                  <Typography variant="h2">{data.commentNumber}</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <Divider />
        </Card>
      ) : (
        <Card
          sx={{
            display: 'flex',
            height: '16rem',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <CircularProgress />
        </Card>
      )}
    </>
  );
}

export default RecentActivity;
