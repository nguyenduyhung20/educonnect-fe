import Head from 'next/head';

import SidebarLayout from '@/layouts/SidebarLayout';

import PageTitleWrapper from '@/components/PageTitleWrapper';
import { Container, Grid } from '@mui/material';

import { TrendingNews } from '@/sections/dashboards/feeds/trending-news';
import { CreateNewsFeed } from '@/sections/dashboards/feeds/create-news-feed';
import PostsProvider, { usePostsContext } from '@/contexts/posts/posts-context';
import { useAuth } from '@/hooks/use-auth';
import { io } from 'socket.io-client';
import PageHeader from '@/sections/dashboards/feeds/page-header-feed';
import { useEffect, useMemo } from 'react';
import { NewsFeed } from '@/sections/dashboards/feeds/news-feed';

function CommunitiesHome() {
  const { user, isAuthenticated } = useAuth();

  // From a different domain
  useEffect(() => {
    if (isAuthenticated) {
      const socket = io('http://localhost:5001/');
      socket.emit('newUser', `${user.id}`);
      socket.on('disconnect', () => {
        console.log(socket.id); // undefined
      });
    }
  }, [])

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
            <NewsFeed listNewsFeeds={listHotPosts} detail={false}/>
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
