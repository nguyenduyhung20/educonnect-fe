import Head from 'next/head';

import SidebarLayout from '@/layouts/SidebarLayout';

import { Container, Stack } from '@mui/material';

import PostsProvider, { usePostsContext } from '@/contexts/posts/posts-context';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import { NewsFeed } from '@/sections/dashboards/feeds/news-feed';
import ReportProvider from '@/contexts/report/report-context';

function PostDetail() {
  const router = useRouter();
  const { getDetailPostApi } = usePostsContext();

  const listNewsFeeds = useMemo(() => {
    return [getDetailPostApi.data?.data] || [];
  }, [getDetailPostApi.data]);

  const postID = useMemo(() => {
    return Number(router.query.postID);
  }, [router.query.postID]);

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else {
      if (postID) {
        getDetailPostApi.call({ id: postID });
      }
    }
  }, [postID]);

  return (
    <>
      <Head>
        <title>EduConnect</title>
      </Head>
      <Container maxWidth="lg" sx={{ pt: 2 }}>
        <Stack width={1} justifyContent={'center'} alignItems={'center'}>
          <Stack width={2 / 3}>
            <NewsFeed
              listNewsFeeds={listNewsFeeds}
              detail={true}
              type={'detail'}
            />
          </Stack>
        </Stack>
      </Container>
    </>
  );
}

PostDetail.getLayout = (page) => (
  <SidebarLayout>
    <PostsProvider>
      <ReportProvider>{page}</ReportProvider>
    </PostsProvider>
  </SidebarLayout>
);

export default PostDetail;
