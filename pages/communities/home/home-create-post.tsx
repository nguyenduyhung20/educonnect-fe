import SidebarLayout from '@/layouts/SidebarLayout';
import { SearchOutlined } from '@mui/icons-material';
import {
  Box,
  Button,
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
import React, { ChangeEvent, useCallback, useState } from 'react';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { CreateNewsFeedPost } from '@/sections/dashboards/feeds/create-news-feed-post';
import { CreateNewsFeedLink } from '@/sections/dashboards/feeds/create-news-feed-link';
import { useFormik } from 'formik';
import PostsProvider, { usePostsContext } from '@/contexts/posts/posts-context';
import { Post } from '@/types/post';
import useFunction from '@/hooks/use-function';
import { RuleCommunities } from '@/sections/dashboards/feeds/rule-communities';

function CreatePost() {
  const handleTabsChange = (_event: ChangeEvent<{}>, value: string): void => {
    setCurrentTab(value);
  };

  const [currentTab, setCurrentTab] = useState<string>('Post');

  const { createPost } = usePostsContext();

  const formik = useFormik<Partial<Post> & { uploadedFiles: File[] }>({
    initialValues: {
      title: '',
      content: '',
      uploadedFiles: null
    },
    onSubmit: async (values) => {
      const { error } = await handleSubmitHelper.call(values);
      if (!error) {
        formik.setValues({
          title: '',
          content: '',
          uploadedFiles: null
        });
      }
    }
  });

  const onSubmit = useCallback(
    async (values: Partial<Post> & { uploadedFiles: File[] }) => {
      try {
        await createPost(values);
      } catch (error) {
        throw error;
      }
    },
    [createPost]
  );

  const handleSubmitHelper = useFunction(onSubmit, {
    successMessage: 'Thêm thành công!'
  });

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
                <form onSubmit={formik.handleSubmit}>
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
                      {currentTab === 'Post' && (
                        <CreateNewsFeedPost formik={formik} />
                      )}
                      {currentTab === 'Link' && (
                        <CreateNewsFeedLink formik={formik} />
                      )}
                      <Stack alignItems={'flex-end'}>
                        <Box>
                          <Button variant="contained" type="submit">
                            Đăng bài
                          </Button>
                        </Box>
                      </Stack>
                    </Stack>
                  </Paper>
                </form>
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

CreatePost.getLayout = (page) => (
  <SidebarLayout>
    <PostsProvider>{page}</PostsProvider>
  </SidebarLayout>
);

export default CreatePost;
