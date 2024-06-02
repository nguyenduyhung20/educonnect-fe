import {
  forwardRef,
  Ref,
  useState,
  ReactElement,
  ChangeEvent,
  useEffect,
  useMemo
} from 'react';
import {
  Avatar,
  Link,
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  lighten,
  List,
  ListItemAvatar,
  TextField,
  Theme,
  Tooltip,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
  Hidden,
  ListItemButton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { TransitionProps } from '@mui/material/transitions';
import SearchTwoToneIcon from '@mui/icons-material/SearchTwoTone';
import ChevronRightTwoToneIcon from '@mui/icons-material/ChevronRightTwoTone';
import { useDebounce } from '@/hooks/use-debounce';
import useFunction from '@/hooks/use-function';
import { SearchApi } from '@/api/search';
import { FindInPage, Group } from '@mui/icons-material';
import { useRouter } from 'next/router';
import Image from 'next/image';

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children: ReactElement<any, any> },
  ref: Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const DialogWrapper = styled(Dialog)(
  () => `
    .MuiDialog-container {
        height: auto;
    }
    
    .MuiDialog-paperScrollPaper {
        max-height: calc(100vh - 64px)
    }
`
);

const SearchInputWrapper = styled(TextField)(
  ({ theme }) => `
    background: ${theme.colors.alpha.white[100]};

    .MuiInputBase-input {
        font-size: ${theme.typography.pxToRem(17)};
    }
`
);

const DialogTitleWrapper = styled(DialogTitle)(
  ({ theme }) => `
    background: ${theme.colors.alpha.black[5]};
    padding: ${theme.spacing(3)}
`
);
// const searchResults = [
//   {
//     id: 2,
//     name: 'Nguyen Duy Hung',
//     avatar: 'https://i.imgur.com/PwqrcYG.png',
//     background: 'http://localhost:4001',
//     email: 'hung@gmail.com',
//     birthday: '2023-10-19T00:00:00.000Z',
//     sex: 'male',
//     createAt: '2024-01-25T09:16:14.354Z'
//   },
//   {
//     id: 3,
//     name: 'Nguyen Duy Hung',
//     avatar: 'https://i.imgur.com/PwqrcYG.png',
//     background: 'http://localhost:4001',
//     email: 'hung@gmail.com',
//     birthday: '2023-10-19T00:00:00.000Z',
//     sex: 'male',
//     createAt: '2024-01-25T09:16:14.354Z'
//   },
//   {
//     id: 4,
//     name: 'Nguyen Duy Hung',
//     avatar: 'https://i.imgur.com/PwqrcYG.png',
//     background: 'http://localhost:4001',
//     email: 'hung@gmail.com',
//     birthday: '2023-10-19T00:00:00.000Z',
//     sex: 'male',
//     createAt: '2024-01-25T09:16:14.354Z'
//   },
//   {
//     id: 5,
//     name: 'Nguyen Duy Hung',
//     avatar: 'https://i.imgur.com/PwqrcYG.png',
//     background: 'http://localhost:4001',
//     email: 'hung@gmail.com',
//     birthday: '2023-10-19T00:00:00.000Z',
//     sex: 'male',
//     createAt: '2024-01-25T09:16:14.354Z'
//   },
//   {
//     id: 6,
//     name: 'Nguyen Duy Hung',
//     avatar: 'https://i.imgur.com/PwqrcYG.png',
//     background: 'http://localhost:4001',
//     email: 'hung@gmail.com',
//     birthday: '2023-10-19T00:00:00.000Z',
//     sex: 'male',
//     createAt: '2024-01-25T09:16:14.354Z'
//   },
//   {
//     id: 7,
//     name: 'Nguyen Duy Hung',
//     avatar: 'https://i.imgur.com/PwqrcYG.png',
//     background: 'http://localhost:4001',
//     email: 'hung@gmail.com',
//     birthday: '2023-10-19T00:00:00.000Z',
//     sex: 'male',
//     createAt: '2024-01-25T09:16:14.354Z'
//   },
//   {
//     id: 8,
//     name: 'Nguyen Duy Hung',
//     avatar: 'https://i.imgur.com/PwqrcYG.png',
//     background: 'http://localhost:4001',
//     email: 'hung@gmail.com',
//     birthday: '2023-10-19T00:00:00.000Z',
//     sex: 'male',
//     createAt: '2024-01-25T09:16:14.354Z'
//   },
//   {
//     id: 9,
//     name: 'Nguyen Duy Hung',
//     avatar: 'https://i.imgur.com/PwqrcYG.png',
//     background: 'http://localhost:4001',
//     email: 'hung@gmail.com',
//     birthday: '2023-10-19T00:00:00.000Z',
//     sex: 'male',
//     createAt: '2024-01-25T09:16:14.354Z'
//   },
//   {
//     id: 10,
//     name: 'Nguyen Duy Hung',
//     avatar: 'https://i.imgur.com/PwqrcYG.png',
//     background: 'http://localhost:4001',
//     email: 'hung@gmail.com',
//     birthday: '2023-10-19T00:00:00.000Z',
//     sex: 'male',
//     createAt: '2024-01-25T09:16:14.354Z'
//   },
//   {
//     id: 25,
//     name: 'Nguyen Duy Hung Day',
//     avatar: 'http://localhost:4001',
//     background: 'http://localhost:4001',
//     email: 'test3@gmail.com',
//     birthday: '2023-10-19T00:00:00.000Z',
//     sex: 'male',
//     createAt: '2024-01-25T09:16:14.405Z'
//   },

//   {
//     id: 1008,
//     name: 'Duy Hung',
//     avatar: 'http://localhost:4001',
//     background: 'http://localhost:4001',
//     email: '',
//     birthday: null,
//     sex: null,
//     createAt: '2024-05-30T05:36:48.257Z'
//   },
//   {
//     id: 1009,
//     name: 'Duy Hung',
//     avatar: 'http://localhost:4001',
//     background: 'http://localhost:4001',
//     email: '',
//     birthday: null,
//     sex: null,
//     createAt: '2024-05-31T01:22:07.448Z'
//   }
// ];
function HeaderSearch() {
  const [openDialog, setOpenDialog] = useState(false);
  const [openSearchResults, setOpenSearchResults] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isShowMore, setIsShowMore] = useState(false);

  const debouncedSearchValue = useDebounce(searchValue, 500);
  const searchUserApi = useFunction(SearchApi.searchUser);
  const router = useRouter();

  const searchResults = useMemo(() => {
    return searchUserApi.data;
  }, [searchUserApi.data]);

  const showSearchResults = searchResults
    ? isShowMore
      ? searchResults
      : searchResults.slice(0, 5)
    : [];

  useEffect(() => {
    const searchUser = async () => {
      if (debouncedSearchValue && debouncedSearchValue !== '') {
        try {
          await searchUserApi.call({
            userInput: debouncedSearchValue
          });
        } catch (error) {
          console.error(error);
          // Handle error state here if needed
        }
        setOpenSearchResults(true);
      } else {
        setOpenSearchResults(false);
      }
    };
    searchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchValue]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchValue(event.target.value);
  };
  const handleClickOpen = () => {
    setOpenDialog(true);
  };
  const handleClose = () => {
    setOpenDialog(false);
  };
  const handleRedirect = (url: string) => {
    router.push(url);
    setOpenDialog(false);
    setSearchValue('');
  };

  return (
    <>
      <Tooltip arrow title="Search">
        <IconButton color="primary" onClick={handleClickOpen}>
          <SearchTwoToneIcon />
        </IconButton>
      </Tooltip>

      <DialogWrapper
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        maxWidth="md"
        fullWidth
        scroll="paper"
        onClose={handleClose}
      >
        <DialogTitleWrapper>
          <SearchInputWrapper
            value={searchValue}
            autoFocus={true}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchTwoToneIcon />
                </InputAdornment>
              )
            }}
            placeholder="Tìm kiếm người dùng"
            fullWidth
            label="Tìm kiếm"
            focused={true}
          />
        </DialogTitleWrapper>
        <Divider />

        {openSearchResults && (
          <DialogContent>
            <Box
              sx={{ pt: 0, pb: 1 }}
              display="flex"
              justifyContent="space-between"
            >
              <Typography variant="body2" component="span">
                Kết quả tìm kiếm cho{' '}
                <Typography
                  sx={{ fontWeight: 'bold' }}
                  variant="body1"
                  component="span"
                >
                  {debouncedSearchValue}
                </Typography>
              </Typography>
            </Box>

            <Divider sx={{ my: 1 }} />

            <List disablePadding>
              {showSearchResults && showSearchResults.length > 0 ? (
                showSearchResults.map((user) => (
                  <ListItemButton
                    key={user.id}
                    onClick={() => {
                      handleRedirect(`/management/profile/${user.id}`);
                    }}
                  >
                    <Hidden smDown>
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            background: (theme: Theme) =>
                              theme.palette.secondary.main
                          }}
                          src={user.avatar}
                        />
                      </ListItemAvatar>
                    </Hidden>
                    <Box flex="1">
                      <Box display="flex" justifyContent="space-between">
                        <Link
                          href={`/management/profile/${user.id}`}
                          underline="hover"
                          sx={{ fontWeight: 'bold' }}
                          variant="body2"
                        >
                          {user.name}
                        </Link>
                      </Box>
                    </Box>
                    <ChevronRightTwoToneIcon />
                  </ListItemButton>
                ))
              ) : (
                <Box
                  sx={{
                    textAlign: 'center',
                    position: 'relative',
                    padding: '4rem'
                  }}
                >
                  <Image
                    src={
                      '/static/images/illustrate/search-no-result-not-found.jpg'
                    }
                    width="250"
                    height="250"
                  />
                  <Typography variant="h3">
                    Không tìm thấy kết quả nào
                  </Typography>
                </Box>
              )}
              {searchResults && searchResults.length > 5 ? (
                isShowMore ? (
                  <Box sx={{ textAlign: 'center' }}>
                    <Button
                      color="primary"
                      onClick={() => setIsShowMore(false)}
                    >
                      Hiển thị ít hơn
                    </Button>
                  </Box>
                ) : (
                  <Box sx={{ textAlign: 'center' }}>
                    <Button color="primary" onClick={() => setIsShowMore(true)}>
                      Hiển thị tất cả
                    </Button>
                  </Box>
                )
              ) : (
                <></>
              )}
              <Divider sx={{ my: 1 }} component="li" />

              <ListItemButton
                onClick={() => {
                  handleRedirect('/communities/explore');
                }}
              >
                <Hidden smDown>
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        background: (theme: Theme) =>
                          theme.palette.secondary.main
                      }}
                    >
                      <FindInPage />
                    </Avatar>
                  </ListItemAvatar>
                </Hidden>
                <Box flex="1">
                  <Box display="flex" justifyContent="space-between">
                    <Link
                      href="#"
                      underline="hover"
                      sx={{ fontWeight: 'bold' }}
                      variant="body2"
                    >
                      Tìm kiếm bài viết
                    </Link>
                  </Box>
                  <Typography
                    component="span"
                    variant="body2"
                    sx={{
                      color: (theme: Theme) =>
                        lighten(theme.palette.secondary.main, 0.5)
                    }}
                  >
                    Bấm để chuyển sang trang tìm kiếm bài viết
                  </Typography>
                </Box>
                <ChevronRightTwoToneIcon />
              </ListItemButton>

              <Divider sx={{ my: 1 }} component="li" />
              <ListItemButton
                onClick={() => handleRedirect('/communities/groups')}
              >
                <Hidden smDown>
                  <ListItemAvatar>
                    <Avatar
                      sx={{
                        background: (theme: Theme) =>
                          theme.palette.secondary.main
                      }}
                    >
                      <Group />
                    </Avatar>
                  </ListItemAvatar>
                </Hidden>
                <Box flex="1">
                  <Box display="flex" justifyContent="space-between">
                    <Link
                      href="#"
                      underline="hover"
                      sx={{ fontWeight: 'bold' }}
                      variant="body2"
                    >
                      Tìm kiếm nhóm
                    </Link>
                  </Box>
                  <Typography
                    component="span"
                    variant="body2"
                    sx={{
                      color: (theme: Theme) =>
                        lighten(theme.palette.secondary.main, 0.5)
                    }}
                  >
                    Bấm để chuyển sang tìm kiếm nhóm
                  </Typography>
                </Box>
                <ChevronRightTwoToneIcon />
              </ListItemButton>
            </List>
            <Divider sx={{ mt: 1, mb: 2 }} />
          </DialogContent>
        )}
      </DialogWrapper>
    </>
  );
}

export default HeaderSearch;
