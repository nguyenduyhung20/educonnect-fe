import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';

import { Container } from '@mui/material';

import { UserViewProfile } from '@/sections/management/user/user-view-profile';

import UsersProvider, { useUserContext } from '@/contexts/user/user-context';
import PostsProvider from '@/contexts/posts/posts-context';
import ReportProvider from '@/contexts/report/report-context';

function ManagementUserProfile() {
  const { currentUserProfile } = useUserContext();

  return (
    <>
      <Head>
        <title>Trang cá nhân</title>
      </Head>
      <Container sx={{ mt: 3 }} maxWidth="lg">
        {currentUserProfile.current && (
          <UserViewProfile userData={currentUserProfile.current} />
        )}
      </Container>
    </>
  );
}

ManagementUserProfile.getLayout = (page) => (
  <SidebarLayout>
      <UsersProvider>
        <PostsProvider>
          <ReportProvider>{page}</ReportProvider>
        </PostsProvider>
      </UsersProvider>
  </SidebarLayout>
);

export default ManagementUserProfile;
