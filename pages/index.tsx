import Head from 'next/head';

import SidebarLayout from '@/layouts/SidebarLayout';

import { Container, Grid } from '@mui/material';

import { CreateNewsFeed } from '@/sections/dashboards/feeds/create-news-feed';
import PostsProvider, { usePostsContext } from '@/contexts/posts/posts-context';
import { NewsFeed } from '@/sections/dashboards/feeds/news-feed';
import { ExploreTrendingSection } from '@/sections/dashboards/explore/explore-trending-section';
import ExplorePostsProvider from '@/contexts/explore/explore-context';

function CommunitiesHome() {
  const { currentNewsFeedPosts } = usePostsContext();

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
              listNewsFeeds={currentNewsFeedPosts.current}
              detail={false}
              type={'newsfeed'}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <ExploreTrendingSection />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

CommunitiesHome.getLayout = (page) => (
  <SidebarLayout>
    <ExplorePostsProvider>
      <PostsProvider>{page} </PostsProvider>
    </ExplorePostsProvider>
  </SidebarLayout>
);

export default CommunitiesHome;
