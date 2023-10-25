import Footer from '@/components/Footer';
import PageTitleWrapper from '@/components/PageTitleWrapper';
import SidebarLayout from '@/layouts/SidebarLayout';
import PageHeader from '@/sections/Management/Transactions/PageHeader';
import { SearchOutlined } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Card,
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
import ImageIcon from '@mui/icons-material/Image';
import { CreateNewsFeedPost } from '@/sections/dashboards/feeds/create-news-feed-post';

function CreatePost() {
  const tabs = [
    { value: 'Post', label: 'Post' },
    { value: 'Image', label: 'Image' },
    { value: 'Link', label: 'Link' }
  ];

  const handleTabsChange = (_event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value);
  };

  const [currentTab, setCurrentTab] = useState<string>('Post');
  const user = {
    name: 'Catherine Pike',
    avatar: '/static/images/avatars/1.jpg'
  };
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
            <Stack spacing={2}>
              <Box>
                <Typography variant="h4">Create a post</Typography>
              </Box>
              <Divider />
              <Stack spacing={1}>
                <TextField
                  id="input-with-icon-textfield"
                  label="Choose your communities"
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
                        label={'Post'}
                        value={'Post'}
                        icon={<PostAddIcon />}
                        iconPosition="start"
                      />
                      <Tab
                        label={'Image'}
                        value={'Image'}
                        icon={<ImageIcon />}
                        iconPosition="start"
                      />

                      <Tab
                        label={'Link'}
                        value={'Link'}
                        icon={<PostAddIcon />}
                        iconPosition="start"
                      />
                    </Tabs>{' '}
                    <CreateNewsFeedPost></CreateNewsFeedPost>
                  </Stack>
                </Paper>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12} md={3.5}>
            <Paper elevation={5} sx={{ p: 2 }}>
              <Stack spacing={1}>
                <Stack direction={'row'} alignItems={'center'} spacing={2}>
                  <Avatar variant="rounded" alt={user.name} src={user.avatar} />
                  <Typography variant="h5">Posting to EduConnect</Typography>
                </Stack>
                <Divider />
                <Typography variant="h6">1. Remember the human</Typography>
                <Divider />
                <Typography variant="h6">
                  2. Behave like you would in real life
                </Typography>
                <Divider />
                <Typography variant="h6">
                  3. Look for the original source of content
                </Typography>
                <Divider />
                <Typography variant="h6">
                  4. Search for duplicates before posting
                </Typography>
                <Divider />
                <Typography variant="h6">
                  5. Read the community’s rules
                </Typography>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

CreatePost.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default CreatePost;
