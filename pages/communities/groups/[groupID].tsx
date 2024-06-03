import SidebarLayout from '@/layouts/SidebarLayout';
import { Container, Grid, Stack } from '@mui/material';
import { NewsFeed } from '@/sections/dashboards/feeds/news-feed';
import React, { useEffect, useMemo } from 'react';
import GroupCover from '@/sections/dashboards/groups/group-cover';
import { useRouter } from 'next/router';
import GroupsProvider, {
  useGroupsContext
} from '@/contexts/groups/groups-context';
import { useAuth } from '@/hooks/use-auth';
import PostsProvider from '@/contexts/posts/posts-context';
import { CreateNewsFeed } from '@/sections/dashboards/feeds/create-news-feed';
import ReportProvider from '@/contexts/report/report-context';
import { GroupTrendPost } from '@/sections/dashboards/groups/group-trend-post';

const CommunitiesGroups = () => {
  const router = useRouter();
  const { getGroupsApiById, getPostByGroupId, groupID } = useGroupsContext();

  const group = useMemo(() => {
    return getGroupsApiById.data?.data;
  }, [getGroupsApiById.data]); 

  const listNewsFeeds = useMemo(() => {
    return getPostByGroupId.data?.data || [];
  }, [getPostByGroupId]);

  const listGroupPost = useMemo(() => {
    return getPostByGroupId.data?.sumPosts || [];
  }, [getPostByGroupId]);

  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else {
      if (groupID) {
        getGroupsApiById.call({ id: groupID });
        getPostByGroupId.call({ id: groupID });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [groupID, user, isAuthenticated, router]);
  return (
    <>
      <Container sx={{ mt: 3 }} maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} md={12}>
            {group && <GroupCover group={group} />}
          </Grid>
          <Grid item xs={12} md={7}>
            <CreateNewsFeed />
            <NewsFeed
              listNewsFeeds={listNewsFeeds}
              detail={false}
              type={'group'}
            />
          </Grid>
          <Grid item xs={12} md={5}>
            {/* <PopularTags /> */}
            <Stack spacing={3}>
              {/* <ExploreTrendingSection /> */}
              {/* <RecentActivity /> */}
              <GroupTrendPost listTrendPosts={listGroupPost} />
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

CommunitiesGroups.getLayout = (page) => (
  <SidebarLayout>
      <GroupsProvider>
        <PostsProvider>
          <ReportProvider>{page}</ReportProvider>
        </PostsProvider>
      </GroupsProvider>
  </SidebarLayout>
);

export default CommunitiesGroups;
