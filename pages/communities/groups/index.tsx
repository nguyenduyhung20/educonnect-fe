import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import { Button, Container, Grid, Stack } from '@mui/material';
import { DiscoverGroups } from '@/sections/dashboards/groups/groups-discover';
import GroupsProvider from '@/contexts/groups/groups-context';
import { useAuth } from '@/hooks/use-auth';

function CommunitiesGroups() {
  const { isAuthenticated } = useAuth();
  return (
    <>
      <Head>
        <title>EduConnect</title>
      </Head>

      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
          mt={2}
        >
          <Grid item xs={12} md={7}>
            <DiscoverGroups type="hot" />
          </Grid>
          <Grid item xs={12} md={4}>
            <Stack spacing={2}>
              {isAuthenticated && (
                <Button variant="contained" fullWidth>
                  Tạo nhóm của bạn
                </Button>
              )}
              {isAuthenticated && <DiscoverGroups type={'host'} />}
              {isAuthenticated && <DiscoverGroups type={'join'} />}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

CommunitiesGroups.getLayout = (page) => (
  <SidebarLayout>
    <GroupsProvider>{page}</GroupsProvider>
  </SidebarLayout>
);

export default CommunitiesGroups;
