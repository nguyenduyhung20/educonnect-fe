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
import { ExploreTrendingSection } from '@/sections/dashboards/explore/explore-trending-section';
import ExplorePostsProvider from '@/contexts/explore/explore-context';
import { CreateNewsFeed } from '@/sections/dashboards/feeds/create-news-feed';
import ReportProvider from '@/contexts/report/report-context';

const CommunitiesGroups = () => {
  const router = useRouter();
  const { getGroupsApiById, getPostByGroupId, groupID } = useGroupsContext();

  const group = useMemo(() => {
    return getGroupsApiById.data?.data;
  }, [getGroupsApiById.data]);

  const listNewsFeeds = useMemo(() => {
    return getPostByGroupId.data?.data || [];
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
              <ExploreTrendingSection />
              {/* <RecentActivity /> */}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

CommunitiesGroups.getLayout = (page) => (
  <SidebarLayout>
    <ExplorePostsProvider>
      <GroupsProvider>
        <PostsProvider>
          <ReportProvider>{page}</ReportProvider>
        </PostsProvider>
      </GroupsProvider>
    </ExplorePostsProvider>
  </SidebarLayout>
);

export default CommunitiesGroups;
