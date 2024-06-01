import ProfileCover from '@/sections/management/user/details/ProfileCover';
import RecentActivity from '@/sections/management/user/details/RecentActivity';
import { Grid, Stack } from '@mui/material';
import React from 'react';
import { UserProfile } from '@/types/user';
import { useAuth } from '@/hooks/use-auth';
import { NewsFeed } from '@/sections/dashboards/feeds/news-feed';
import { CreateNewsFeed } from '@/sections/dashboards/feeds/create-news-feed';
import { PostTrendList } from './user-trend-post';

export const UserViewProfile = ({ userData }: { userData: UserProfile }) => {
  const { user } = useAuth();
  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={3}
      >
        <Grid item xs={12} md={12}>
          <ProfileCover user={userData.user} />
        </Grid>
        <Grid item xs={12} md={7}>
          <CreateNewsFeed />
          <NewsFeed
            listNewsFeeds={userData.newsfeed}
            detail={false}
            type={'profile'}
          />
        </Grid>
        <Grid item xs={12} md={5}>
          <Stack spacing={3}>
            {user?.id == userData.user?.id && <RecentActivity />}
            {/* <ExploreTrendingSection /> */}

            <PostTrendList listExplorePosts={userData.listSumPost} />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};
