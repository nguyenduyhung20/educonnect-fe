import { useAuth } from '@/hooks/use-auth';
import { Typography, Avatar, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';

function PageHeader() {
  const { user } = useAuth();
  const theme = useTheme();

  return (
    <Grid container alignItems="center">
      <Grid item>
        <Avatar
          sx={{
            mr: 2,
            width: theme.spacing(6),
            height: theme.spacing(6)
          }}
          variant="rounded"
          alt={user?.name}
          src={user?.avatar}
        />
      </Grid>
      <Grid item>
        <Typography variant="h4" fontSize={23} component="h4" gutterBottom>
          Xin chào, {user?.name}!
        </Typography>
        <Typography variant="subtitle2">
          {user?.name} ơi, bạn đang nghĩ gì thế?
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
