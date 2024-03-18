import Head from 'next/head';

import SidebarLayout from '@/layouts/SidebarLayout';

import { Container, Grid } from '@mui/material';

import { ExploreWhoToFollow } from '@/sections/dashboards/explore/explore-who-to-follow';
import ExplorePostsProvider from '@/contexts/explore/explore-context';
import { ExploreTrending } from '@/sections/dashboards/explore/explore-trending';
import PostsProvider from '@/contexts/posts/posts-context';

function CommunitiesExplore() {
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

CommunitiesExplore.getLayout = (page) => (
  <SidebarLayout>
    <ExplorePostsProvider>{page}</ExplorePostsProvider>
  </SidebarLayout>
);

export default CommunitiesExplore;
