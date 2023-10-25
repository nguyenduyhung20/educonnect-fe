import ProfileCover from '@/sections/Management/Users/details/ProfileCover';
import RecentActivity from '@/sections/Management/Users/details/RecentActivity';
import { NewsFeed } from '@/sections/dashboards/feeds/news-feed';
import { TrendingNews } from '@/sections/dashboards/feeds/trending-news';
import { Grid, Stack } from '@mui/material';
import React from 'react';

export const UserViewProfile = ({ user }: { user: any }) => {
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
          <ProfileCover user={user} />
        </Grid>
        <Grid item xs={12} md={7}>
          <NewsFeed />
        </Grid>
        <Grid item xs={12} md={5}>
          {/* <PopularTags /> */}
          <Stack spacing={3}>
            <TrendingNews />
            <RecentActivity />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};
