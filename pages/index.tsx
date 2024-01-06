import Head from 'next/head';

import SidebarLayout from '@/layouts/SidebarLayout';

import PageHeader from '@/sections/dashboards/Crypto/PageHeader';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import { Container, Grid } from '@mui/material';

import { NewsFeed } from '@/sections/dashboards/feeds/news-feed';
import { TrendingNews } from '@/sections/dashboards/feeds/trending-news';
import { CreateNewsFeed } from '@/sections/dashboards/feeds/create-news-feed';
import PostsProvider from '@/contexts/posts/posts-context';
import { useAuth } from '@/hooks/use-auth';

function CommunitiesHome() {
  const { user } = useAuth();

  return (
    <>
      <Head>
        <title>EduConnect</title>
      </Head>
      <PageTitleWrapper>{user ? <PageHeader /> : <></>}</PageTitleWrapper>
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

CommunitiesHome.getLayout = (page) => (
  <SidebarLayout>
    <PostsProvider>{page}</PostsProvider>
  </SidebarLayout>
);

export default CommunitiesHome;
