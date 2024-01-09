import Head from 'next/head';

import SidebarLayout from '@/layouts/SidebarLayout';

import { Box, Container, Stack } from '@mui/material';

import PostsProvider from '@/contexts/posts/posts-context';
import { useAuth } from '@/hooks/use-auth';
import { FeedDetail } from '@/sections/dashboards/feeds/feed-detail';

function PostDetail() {
  const { user } = useAuth();

  return (
    <>
      <Head>
        <title>EduConnect</title>
      </Head>
      <Container maxWidth="lg" sx={{ pt: 2 }}>
        <Stack width={1} justifyContent={'center'} alignItems={'center'}>
          <Stack width={2 / 3}>
            <FeedDetail />
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
