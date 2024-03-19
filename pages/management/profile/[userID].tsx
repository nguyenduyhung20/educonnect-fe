import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';

import { Container } from '@mui/material';

import { UserViewProfile } from '@/sections/management/user/user-view-profile';
import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/use-auth';
import UsersProvider, { useUserContext } from '@/contexts/user/user-context';
import { Explicit } from '@mui/icons-material';
import ExplorePostsProvider from '@/contexts/explore/explore-context';

function ManagementUserProfile() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const { getUsersProfile } = useUserContext();

  const userProfile = useMemo(() => {
    return getUsersProfile.data?.data;
  }, [getUsersProfile.data]);

  const userID = useMemo(() => {
    return Number(router.query.userID);
  }, [router.query.userID]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else {
      if (userID) {
        getUsersProfile.call(userID);
      }
    }
  }, [userID]);

  return (
    <>
      <Head>
        <title>Trang cá nhân</title>
      </Head>
      <Container sx={{ mt: 3 }} maxWidth="lg">
        {userProfile && <UserViewProfile userData={userProfile} />}
      </Container>
    </>
  );
}

ManagementUserProfile.getLayout = (page) => (
  <SidebarLayout>
    <ExplorePostsProvider>
      <UsersProvider>{page}</UsersProvider>
    </ExplorePostsProvider>
  </SidebarLayout>
);

export default ManagementUserProfile;
