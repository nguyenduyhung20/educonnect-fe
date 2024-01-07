import Footer from '@/components/Footer';
import SidebarLayout from '@/layouts/SidebarLayout';
import { SearchOutlined } from '@mui/icons-material';
import {
  Avatar,
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
import ImageIcon from '@mui/icons-material/Image';
import { CreateNewsFeedPost } from '@/sections/dashboards/feeds/create-news-feed-post';
import { CreateNewsFeedImage } from '@/sections/dashboards/feeds/create-news-feed-image';
import { CreateNewsFeedLink } from '@/sections/dashboards/feeds/create-news-feed-link';
import { useAuth } from '@/hooks/use-auth';

function CreatePost() {
  const tabs = [
    { value: 'Post', label: 'Bài viết' },
    { value: 'Image', label: 'Hình ảnh' },
    { value: 'Link', label: 'Link' }
  ];

  const handleTabsChange = (_event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value);
  };

  const [currentTab, setCurrentTab] = useState<string>('Post');
  const { user } = useAuth();
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
                        label={'Hình ảnh'}
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
                    {currentTab === 'Post' && (
                      <CreateNewsFeedPost></CreateNewsFeedPost>
                    )}
                    {currentTab === 'Image' && (
                      <CreateNewsFeedImage></CreateNewsFeedImage>
                    )}
                    {currentTab === 'Link' && (
                      <CreateNewsFeedLink></CreateNewsFeedLink>
                    )}
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
                  <Typography variant="h5">
                    Khi đăng bài ở nền tảng EduConnect của chúng tôi:
                  </Typography>
                </Stack>
                <Divider />
                <Typography variant="h6">
                  1. Hãy nhớ rằng bạn đang giao tiếp với người khác.
                </Typography>
                <Divider />
                <Typography variant="h6">
                  2. Hãy cư xử đúng mực như khi bạn đang ở ngoài đời thật.
                </Typography>
                <Divider />
                <Typography variant="h6">
                  3. Hãy nhớ nguồn gốc ban đầu của nội dung bài viết của bạn.
                </Typography>
                <Divider />
                <Typography variant="h6">
                  4. Hãy tìm kiếm những bài đăng trùng lặp nếu có.
                </Typography>
                <Divider />
                <Typography variant="h6">
                  5. Hãy đọc quy tắc và tiêu chuẩn cộng đồng của chúng tôi.
                </Typography>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

CreatePost.getLayout = (page) => <SidebarLayout>{page}</SidebarLayout>;

export default CreatePost;
