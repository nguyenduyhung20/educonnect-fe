import SidebarLayout from '@/layouts/SidebarLayout';
import {  Container, Grid, Stack } from '@mui/material';
import { TrendingNews } from '@/sections/dashboards/feeds/trending-news';
import { NewsFeed } from '@/sections/dashboards/feeds/news-feed';
import React, { useEffect, useMemo } from 'react';
import GroupCover from '@/sections/dashboards/groups/group-cover';
import { useRouter } from 'next/router';
import GroupsProvider, {
  useGroupsContext
} from '@/contexts/groups/groups-context';
import { useAuth } from '@/hooks/use-auth';
import PostsProvider from '@/contexts/posts/posts-context';

const CommunitiesGroups = () => {
  const router = useRouter();
  const { getGroupsApiById } = useGroupsContext();

  const group = useMemo(() => {
    return getGroupsApiById.data?.data;
  }, [getGroupsApiById.data]);

  const { getPostByGroupId } = useGroupsContext();

  const groupID = useMemo(() => {
    return Number(router.query.groupID);
  }, [router.query.groupID]);

  const listNewsFeeds = useMemo(() => {
    return getPostByGroupId.data?.data || [];
  }, [getPostByGroupId]);

  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else {
      if (groupID) {
        getGroupsApiById.call({ id: groupID });
        getPostByGroupId.call({ id: groupID });
      }
    }
  }, [groupID]);
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
            <NewsFeed
              listNewsFeeds={listNewsFeeds}
              detail={false}
              type={'group'}
            />
          </Grid>
          <Grid item xs={12} md={5}>
            {/* <PopularTags /> */}
            <Stack spacing={3}>
              <TrendingNews />
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
    <GroupsProvider>
      <PostsProvider>{page}</PostsProvider>
    </GroupsProvider>
  </SidebarLayout>
);

export default CommunitiesGroups;
