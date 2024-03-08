import Head from 'next/head';

import SidebarLayout from '@/layouts/SidebarLayout';

import PageTitleWrapper from '@/components/PageTitleWrapper';
import { Container, Grid } from '@mui/material';

import { TrendingNews } from '@/sections/dashboards/feeds/trending-news';
import { CreateNewsFeed } from '@/sections/dashboards/feeds/create-news-feed';
import PostsProvider, { usePostsContext } from '@/contexts/posts/posts-context';
import { useAuth } from '@/hooks/use-auth';
import PageHeader from '@/sections/dashboards/feeds/page-header-feed';
import { useMemo } from 'react';
import { NewsFeed } from '@/sections/dashboards/feeds/news-feed';

function CommunitiesHome() {
  const { user, isAuthenticated } = useAuth();
  const { getHotPostsApi, getHotPostsApiByUserID } = usePostsContext();

  const listHotPosts = useMemo(() => {
    if (isAuthenticated) {
      return getHotPostsApiByUserID.data?.data || [];
    }
    return getHotPostsApi.data?.data || [];
  }, [getHotPostsApi]);

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
            <CreateNewsFeed />
            <NewsFeed
              listNewsFeeds={listHotPosts}
              detail={false}
              type={'hotpost'}
            />
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
