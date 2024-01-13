import ProfileCover from '@/sections/management/user/details/ProfileCover';
import RecentActivity from '@/sections/management/user/details/RecentActivity';
import { TrendingNews } from '@/sections/dashboards/feeds/trending-news';
import { Grid, Stack } from '@mui/material';
import React from 'react';
import { UserProfile } from '@/types/user';
import { useAuth } from '@/hooks/use-auth';
import { NewsFeed } from '@/sections/dashboards/feeds/news-feed';

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
          <NewsFeed listNewsFeeds={userData.newsfeed} detail={false} />
        </Grid>
        <Grid item xs={12} md={5}>
          <Stack spacing={3}>
            <TrendingNews />
            {user.id == userData.user.id && (
              <RecentActivity user={userData.user} />
            )}
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};
