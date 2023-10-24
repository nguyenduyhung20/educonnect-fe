import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import Footer from '@/components/Footer';

import { Grid, Container } from '@mui/material';

import ProfileCover from '@/sections/Management/Users/details/ProfileCover';
import RecentActivity from '@/sections/Management/Users/details/RecentActivity';
import Feed from '@/sections/Management/Users/details/Feed';
import PopularTags from '@/sections/Management/Users/details/PopularTags';
import MyCards from '@/sections/Management/Users/details/MyCards';
import Addresses from '@/sections/Management/Users/details/Addresses';
import { TrendingNews } from '@/sections/dashboards/feeds/trending-news';
import { NewsFeed } from '@/sections/dashboards/feeds/news-feed';
import { UserViewProfile } from './user-view-profile';
import { UserOtherViewProfile } from './other-user-view-profile';

function ManagementUserProfile() {
  const user = {
    savedCards: 7,
    name: 'Trần Long Biên',
    coverImg: '/static/images/placeholders/covers/5.jpg',
    avatar: '/static/images/avatars/1.jpg',
    description:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage",
    jobtitle: 'Web Developer',
    location: 'Barcelona, Spain',
    followers: '465'
  };

  return (
    <>
      <Head>
        <title>User Details - Management</title>
      </Head>
      <Container sx={{ mt: 3 }} maxWidth="lg">
        <UserViewProfile user={user} />
      </Container>
      <Footer />
    </>
  );
}

ManagementUserProfile.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default ManagementUserProfile;
