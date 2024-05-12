import SidebarLayout from '@/layouts/SidebarLayout';
import { SearchOutlined } from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
  useTheme
} from '@mui/material';
import Head from 'next/head';
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import PostAddIcon from '@mui/icons-material/PostAdd';
import { CreateNewsFeedPost } from '@/sections/dashboards/feeds/create-news-feed-post';
import { CreateNewsFeedLink } from '@/sections/dashboards/feeds/create-news-feed-link';
import { useFormik } from 'formik';
import PostsProvider, { usePostsContext } from '@/contexts/posts/posts-context';
import { Post } from '@/types/post';
import useFunction from '@/hooks/use-function';
import { RuleCommunities } from '@/sections/dashboards/feeds/rule-communities';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/router';
import { GroupsApi } from '@/api/groups';
import { GroupsInfo } from '@/sections/dashboards/groups/groups-info';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function CreatePost() {
  const handleTabsChange = (
    _event: ChangeEvent<{}>,
    value: 'link' | 'post'
  ): void => {
    setCurrentTab(value);
    formik.setFieldValue('type', value);
  };

  const [currentTab, setCurrentTab] = useState<'post' | 'link'>('post');

  const { createPost } = usePostsContext();

  const [images, setImages] = useState<string[]>([]);

  const { isAuthenticated } = useAuth();

  const router = useRouter();

  const getGroupsUserJoinApi = useFunction(GroupsApi.getGroupUserJoinHost);

  const { user } = useAuth();

  const [isShow, setIsShow] = useState(false);

  const [searchContent, setSearchContent] = useState('');

  const theme = useTheme();

  const searchInputRef = useRef(null);

  const formik = useFormik<
    Partial<Post> & { uploadedFiles: File[] } & { type: 'post' | 'link' } & {
      contentLink: string;
    } & { titleLink: string } & { topicPost: string }
  >({
    initialValues: {
      title: '',
      content: '',
      uploadedFiles: null,
      group: null,
      type: 'post',
      contentLink: '',
      titleLink: '',
      topicPost: ''
    },
    onSubmit: async (values) => {
      const { error } = await handleSubmitHelper.call(values);
      if (!error) {
        formik.setValues({
          title: '',
          content: '',
          uploadedFiles: null,
          group: null,
          type: currentTab,
          contentLink: '',
          titleLink: '',
          topicPost: ''
        });
        setImages([]);
        setSearchContent('');
        setIsShow(false);
      }
    }
  });

  const onSubmit = useCallback(
    async (
      values: Partial<Post> & { uploadedFiles: File[] } & {
        type: 'post' | 'link';
      } & { contentLink: string } & { titleLink: string } & {
        topicPost: string;
      }
    ) => {
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

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    } else {
      getGroupsUserJoinApi.call(user.id);
    }
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        searchInputRef.current &&
        !searchInputRef.current.contains(event.target)
      ) {
        setIsShow(false);
        setSearchContent('');
        setBackGround(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const listGroupsFilter = useMemo(() => {
    return (getGroupsUserJoinApi.data?.data || []).filter((item) =>
      item.title.toLowerCase().includes(searchContent.toLowerCase())
    );
  }, [searchContent, getGroupsUserJoinApi]);

  const [background, setBackGround] = useState(false);

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
              <Stack spacing={1} ref={searchInputRef}>
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
                    onClick={() => {
                      setIsShow(true);
                    }}
                    sx={{ width: 1, background: 'white' }}
                    onChange={(item) => {
                      setSearchContent(item.target.value);
                    }}
                  />
                  <Stack spacing={1} width={'100%'}>
                    {isShow &&
                      listGroupsFilter.map((item, index) => (
                        <Stack
                          key={index}
                          direction={'row'}
                          justifyContent={'space-between'}
                          width={1}
                          sx={{
                            '&:hover': {
                              background: `${theme.colors.primary.lighter}`,
                              borderRadius: 1
                            },
                            background: background
                              ? `${theme.colors.primary.lighter}`
                              : 'white'
                          }}
                          onClick={() => {
                            formik.setFieldValue('group', {
                              id: item.id,
                              title: item.title
                            });
                            setSearchContent(item.title);
                            setBackGround(true);
                          }}
                        >
                          <GroupsInfo group={item} />
                          <Box>
                            <IconButton aria-label="settings">
                              <MoreVertIcon />
                            </IconButton>
                          </Box>
                        </Stack>
                      ))}
                  </Stack>
                </Stack>

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
                          value={'post'}
                          icon={<PostAddIcon />}
                          iconPosition="start"
                        />

                        <Tab
                          label={'Link'}
                          value={'link'}
                          icon={<PostAddIcon />}
                          iconPosition="start"
                        />
                      </Tabs>
                      {
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            Chủ đề
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={formik.values.topicPost}
                            label="Chủ đề"
                            onChange={formik.handleChange}
                            name="topicPost"
                          >
                            <MenuItem value={'Toán học'}>Toán học</MenuItem>
                            <MenuItem value={'Vật Lý'}>Vật Lý</MenuItem>
                            <MenuItem value={'Hoá học'}>Hoá học</MenuItem>
                            <MenuItem value={'Sinh học'}>Sinh học</MenuItem>
                            <MenuItem value={'Văn học'}>Văn học</MenuItem>
                            <MenuItem value={'Lịch sử'}>Lịch sử</MenuItem>
                            <MenuItem value={'Địa lý'}>Địa lý</MenuItem>
                            <MenuItem value={'Giáo dục công dân'}>
                              Giáo dục công dân
                            </MenuItem>
                            <MenuItem value={'Ngoại ngữ'}>Ngoại ngữ</MenuItem>
                            <MenuItem value={'Tin học'}>Tin học</MenuItem>
                            <MenuItem value={'Giáo giục quốc phòng và an ninh'}>
                              Giáo giục quốc phòng và an ninh
                            </MenuItem>
                            <MenuItem value={'Thể thao và giáo dục thể chất'}>
                              Thể thao và giáo dục thể chất
                            </MenuItem>
                            <MenuItem value={'Hiểu biết chung'}>
                              Hiểu biết chung
                            </MenuItem>
                            <MenuItem value={'Tin tức'}>Tin tức</MenuItem>
                          </Select>
                        </FormControl>
                      }
                      {currentTab === 'post' && (
                        <CreateNewsFeedPost
                          formik={formik}
                          images={images}
                          setImages={setImages}
                        />
                      )}
                      {currentTab === 'link' && (
                        <CreateNewsFeedLink formik={formik} />
                      )}
                      <Stack alignItems={'flex-end'}>
                        <Box>
                          <Button
                            variant="contained"
                            type="submit"
                            disabled={
                              currentTab == 'post'
                                ? formik.values.content == '' ||
                                  formik.values.title == '' ||
                                  formik.values.topicPost == ''
                                  ? true
                                  : false
                                : formik.values.contentLink == '' ||
                                  formik.values.titleLink == '' ||
                                  formik.values.topicPost == ''
                                ? true
                                : false
                            }
                          >
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
