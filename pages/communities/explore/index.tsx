import Head from 'next/head';

import SidebarLayout from '@/layouts/SidebarLayout';

// import PageHeader from '@/sections/Dashboards/Crypto/PageHeader';
// import PageTitleWrapper from '@/components/PageTitleWrapper';
import {  Container, Grid } from '@mui/material';
import Footer from '@/components/Footer';

// import AccountBalance from '@/content/Dashboards/Crypto/AccountBalance';
// import Wallets from '@/content/Dashboards/Crypto/Wallets';
// import AccountSecurity from '@/content/Dashboards/Crypto/AccountSecurity';
// import WatchList from '@/content/Dashboards/Crypto/WatchList';
// import { NewsFeed } from '@/sections/Dashboards/Feeds/NewsFeed';
import { TrendingNews } from '@/sections/dashboards/feeds/trending-news';
import { ExploreTrending } from '@/sections/dashboards/explore/explore-trending';
import { ExploreWhoToFollow } from '@/sections/dashboards/explore/explore-who-to-follow';
// import { CreateNewsFeed } from '@/sections/Dashboards/Feeds/CreateNewsFeed';

function DashboardCrypto() {
  return (
    <>
      <Head>
        <title>Crypto Dashboard</title>
      </Head>
      
      <Container maxWidth="lg">
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
          mt={2}
        >
          <Grid item xs={12} md={7}>
            <ExploreTrending />
          </Grid>
          <Grid item xs={12} md={4}>
            <ExploreWhoToFollow />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

DashboardCrypto.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default DashboardCrypto;
