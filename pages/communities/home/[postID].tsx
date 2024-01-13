import Head from 'next/head';

import SidebarLayout from '@/layouts/SidebarLayout';

import { Box, Container, Stack } from '@mui/material';

import PostsProvider, { usePostsContext } from '@/contexts/posts/posts-context';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import { NewsFeed } from '@/sections/dashboards/feeds/news-feed';

function PostDetail() {
  const { user } = useAuth();
  const router = useRouter();
  const { getDetailPostApi } = usePostsContext();

  const listNewsFeeds = useMemo(() => {
    return [getDetailPostApi.data?.data] || [];
  }, [getDetailPostApi.data]);

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else {
      getDetailPostApi.call({ id: Number(router.query.postID) });
    }
  }, []);

  return (
    <>
      <Head>
        <title>EduConnect</title>
      </Head>
      <Container maxWidth="lg" sx={{ pt: 2 }}>
        <Stack width={1} justifyContent={'center'} alignItems={'center'}>
          <Stack width={2 / 3}>
            <NewsFeed listNewsFeeds={listNewsFeeds} detail={true} />
          </Stack>
        </Stack>
      </Container>
    </>
  );
}

PostDetail.getLayout = (page) => (
  <SidebarLayout>
    <PostsProvider>{page}</PostsProvider>
  </SidebarLayout>
);

export default PostDetail;
