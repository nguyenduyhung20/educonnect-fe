import Head from 'next/head';

import SidebarLayout from '@/layouts/SidebarLayout';

import PageHeader from '@/sections/dashboards/Crypto/PageHeader';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import {  Container, Grid } from '@mui/material';

// import AccountBalance from '@/content/Dashboards/Crypto/AccountBalance';
// import Wallets from '@/content/Dashboards/Crypto/Wallets';
// import AccountSecurity from '@/content/Dashboards/Crypto/AccountSecurity';
// import WatchList from '@/content/Dashboards/Crypto/WatchList';
import { NewsFeed } from '@/sections/dashboards/feeds/news-feed';
import { TrendingNews } from '@/sections/dashboards/feeds/trending-news';
import { CreateNewsFeed } from '@/sections/dashboards/feeds/create-news-feed';

function CommunitiesHome() {
  return (
    <>
      <Head>
        <title>Crypto Dashboard</title>
      </Head>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} md={7}>
            <CreateNewsFeed/>
            <NewsFeed />
          </Grid>
          <Grid item xs={12} md={4}>
            <TrendingNews />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

CommunitiesHome.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default CommunitiesHome;
