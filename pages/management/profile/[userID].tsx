import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';

import { Container } from '@mui/material';

import { UserViewProfile } from '@/sections/management/user/user-view-profile';
import { useEffect, useMemo } from 'react';
import useFunction from '@/hooks/use-function';
import { UsersApi } from '@/api/users';
import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/use-auth';

function ManagementUserProfile() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const getUserProfile = useFunction(UsersApi.getUserProfile);

  const userProfile = useMemo(() => {
    return getUserProfile.data?.data;
  }, [getUserProfile.data]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else {
      getUserProfile.call(Number(router.query.userID));
    }
  }, []);

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
  <SidebarLayout>{page}</SidebarLayout>
);

export default ManagementUserProfile;
