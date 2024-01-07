import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';

import { Container } from '@mui/material';

import { UserViewProfile } from './user-view-profile';
import { useAuth } from '@/hooks/use-auth';

function ManagementUserProfile() {
  const { user } = useAuth();

  return (
    <>
      <Head>
        <title>User Details - Management</title>
      </Head>
      <Container sx={{ mt: 3 }} maxWidth="lg">
        <UserViewProfile user={user} />
      </Container>
    </>
  );
}

ManagementUserProfile.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default ManagementUserProfile;
