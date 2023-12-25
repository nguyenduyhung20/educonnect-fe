import Head from 'next/head';

import SidebarLayout from '@/layouts/SidebarLayout';

// import PageHeader from '@/sections/Dashboards/Crypto/PageHeader';
// import PageTitleWrapper from '@/components/PageTitleWrapper';
import {  Container, Grid } from '@mui/material';

import { ExploreTrending } from '@/sections/dashboards/explore/explore-trending';
import { ExploreWhoToFollow } from '@/sections/dashboards/explore/explore-who-to-follow';

function CommunitiesExplore() {
  return (
    <>
      <Head>
        <title>Crypto Dashboard</title>
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
            <ExploreTrending />
          </Grid>
          <Grid item xs={12} md={4}>
            <ExploreWhoToFollow />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

CommunitiesExplore.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default CommunitiesExplore;
