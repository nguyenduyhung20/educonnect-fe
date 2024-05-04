import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import { Button, Container, Grid, Stack } from '@mui/material';
import { DiscoverGroups } from '@/sections/dashboards/groups/groups-discover';
import GroupsProvider, {
  useGroupsContext
} from '@/contexts/groups/groups-context';
import { useAuth } from '@/hooks/use-auth';
import { useDrawer } from '@/hooks/use-drawer';
import { GroupCreateDrawer } from '@/sections/dashboards/groups/group-create-drawer';
import { useMemo } from 'react';

function CommunitiesGroups() {
  const createGroupDrawer = useDrawer();

  const {
    getHotGroups,
    getGroupsApi,
    getGroupsUserHostApi,
    getGroupsUserJoinApi
  } = useGroupsContext();

  const { isAuthenticated } = useAuth();

  const listGroups = useMemo(() => {
    if (isAuthenticated) {
      return getGroupsApi.data?.data || [];
    }
    return getHotGroups.data?.data || [];
  }, [getHotGroups, getGroupsApi]);

  const listGroupsUserHost = useMemo(() => {
    return getGroupsUserHostApi.data?.data || [];
  }, [getGroupsUserHostApi]);

  const listGroupsUserJoin = useMemo(() => {
    return getGroupsUserJoinApi.data?.data || [];
  }, [getGroupsUserJoinApi]);

  return (
    <>
      <Head>
        <title>EduConnect</title>
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
            <DiscoverGroups type="hot" listGroups={listGroups} />
          </Grid>
          <Grid item xs={12} md={4}>
            <Stack spacing={2}>
              {isAuthenticated && (
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => createGroupDrawer.handleOpen()}
                >
                  Tạo nhóm của bạn
                </Button>
              )}
              {isAuthenticated && (
                <DiscoverGroups type={'host'} listGroups={listGroupsUserHost} />
              )}
              {isAuthenticated && (
                <DiscoverGroups type={'join'} listGroups={listGroupsUserJoin} />
              )}
            </Stack>
          </Grid>
        </Grid>
      </Container>

      <GroupCreateDrawer
        open={createGroupDrawer.open}
        onClose={createGroupDrawer.handleClose}
      />
    </>
  );
}

CommunitiesGroups.getLayout = (page) => (
  <SidebarLayout>
    <GroupsProvider>
      {page}
    </GroupsProvider>
  </SidebarLayout>
);

export default CommunitiesGroups;
