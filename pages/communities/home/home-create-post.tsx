import SidebarLayout from '@/layouts/SidebarLayout';
import { SearchOutlined } from '@mui/icons-material';
import {
  Box,
  Container,
  Divider,
  Grid,
  InputAdornment,
  Paper,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography
} from '@mui/material';
import Head from 'next/head';
import React, { ChangeEvent, useState } from 'react';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { CreateNewsFeedPost } from '@/sections/dashboards/feeds/create-news-feed-post';
import { CreateNewsFeedLink } from '@/sections/dashboards/feeds/create-news-feed-link';
import { RuleCommunities } from './rule-communities';

function CreatePost() {
  const handleTabsChange = (_event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value);
  };

  const [currentTab, setCurrentTab] = useState<string>('Post');

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
            <Stack spacing={2}>
              <Box>
                <Typography variant="h4">Tạo một bài viết</Typography>
              </Box>
              <Divider />
              <Stack spacing={1}>
                <TextField
                  id="input-with-icon-textfield"
                  label="Chọn nhóm của bạn"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchOutlined />
                      </InputAdornment>
                    )
                  }}
                  sx={{ width: 1 / 2, background: 'white' }}
                />

                <Paper elevation={5} sx={{ p: 2 }}>
                  <Stack display={'flex'} spacing={2}>
                    <Tabs
                      value={currentTab}
                      onChange={handleTabsChange}
                      variant="fullWidth"
                    >
                      <Tab
                        label={'Bài viết'}
                        value={'Post'}
                        icon={<PostAddIcon />}
                        iconPosition="start"
                      />

                      <Tab
                        label={'Link'}
                        value={'Link'}
                        icon={<PostAddIcon />}
                        iconPosition="start"
                      />
                    </Tabs>{' '}
                    {currentTab === 'Post' && <CreateNewsFeedPost />}
                    {currentTab === 'Link' && <CreateNewsFeedLink />}
                  </Stack>
                </Paper>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12} md={3.5}>
            <RuleCommunities />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

CreatePost.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default CreatePost;
