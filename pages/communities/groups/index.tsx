import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import { Container, Grid } from '@mui/material';
import { TrendingNews } from '@/sections/dashboards/feeds/trending-news';
import { DiscoverGroups } from '@/sections/dashboards/groups/groups-discover';
import GroupsProvider from '@/contexts/groups/groups-context';

function CommunitiesGroups() {
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
            <DiscoverGroups />
          </Grid>
          <Grid item xs={12} md={4}>
            <TrendingNews />
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
