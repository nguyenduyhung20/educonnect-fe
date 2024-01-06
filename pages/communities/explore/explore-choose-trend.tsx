import React from 'react';
import Head from 'next/head';
import { Container, Grid } from '@mui/material';
import { ExploreWhoToFollow } from '@/sections/dashboards/explore/explore-who-to-follow';
import SidebarLayout from '@/layouts/SidebarLayout';
import { ExploreSpecificTrending } from '@/sections/dashboards/explore/explore-specific-trending';

function ExploreUserChooseTrend() {
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
            <ExploreSpecificTrending />
          </Grid>
          <Grid item xs={12} md={4}>
            <ExploreWhoToFollow />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

ExploreUserChooseTrend.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default ExploreUserChooseTrend;
