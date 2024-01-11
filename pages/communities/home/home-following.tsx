import Head from 'next/head';

import SidebarLayout from '@/layouts/SidebarLayout';

import PageTitleWrapper from '@/components/PageTitleWrapper';
import { Container, Grid } from '@mui/material';
import PageHeader from '@/sections/dashboards/feeds/page-header-feed';
import { NewsFeed } from '@/sections/dashboards/feeds/news-feed';
import { TrendingNews } from '@/sections/dashboards/feeds/trending-news';
import { CreateNewsFeed } from '@/sections/dashboards/feeds/create-news-feed';
import PostsProvider from '@/contexts/posts/posts-context';

function CommunitiesHomeFollowing() {
  return (
    <>
      <Head>
        <title>EduConnect</title>
      </Head>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} md={7}>
            <CreateNewsFeed />
            <NewsFeed />
          </Grid>
          <Grid item xs={12} md={4}>
            <TrendingNews />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

CommunitiesHomeFollowing.getLayout = (page) => (
  <SidebarLayout>
    <PostsProvider>{page}</PostsProvider>
  </SidebarLayout>
);

export default CommunitiesHomeFollowing;
