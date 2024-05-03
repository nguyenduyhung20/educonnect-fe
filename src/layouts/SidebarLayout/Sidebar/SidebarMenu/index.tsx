import { useContext } from 'react';
import { useRouter } from 'next/router';

import {
  ListSubheader,
  alpha,
  Box,
  List,
  styled,
  Button,
  ListItem
} from '@mui/material';
import NextLink from 'next/link';
import { SidebarContext } from 'src/contexts/SidebarContext';

// import BrightnessLowTwoToneIcon from '@mui/icons-material/BrightnessLowTwoTone';
// import MmsTwoToneIcon from '@mui/icons-material/MmsTwoTone';
// import TableChartTwoToneIcon from '@mui/icons-material/TableChartTwoTone';
import AccountCircleTwoToneIcon from '@mui/icons-material/AccountCircleTwoTone';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
// import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import { useAuth } from '@/hooks/use-auth';

const MenuWrapper = styled(Box)(
  ({ theme }) => `
  .MuiList-root {
    padding: ${theme.spacing(1)};

    & > .MuiList-root {
      padding: 0 ${theme.spacing(0)} ${theme.spacing(1)};
    }
  }

    .MuiListSubheader-root {
      text-transform: uppercase;
      font-weight: bold;
      font-size: ${theme.typography.pxToRem(12)};
      color: ${theme.colors.alpha.trueWhite[50]};
      padding: ${theme.spacing(0, 2.5)};
      line-height: 1.4;
    }
`
);

const SubMenuWrapper = styled(Box)(
  ({ theme }) => `
    .MuiList-root {

      .MuiListItem-root {
        padding: 1px 0;

        .MuiBadge-root {
          position: absolute;
          right: ${theme.spacing(3.2)};

          .MuiBadge-standard {
            background: ${theme.colors.primary.main};
            font-size: ${theme.typography.pxToRem(10)};
            font-weight: bold;
            text-transform: uppercase;
            color: ${theme.palette.primary.contrastText};
          }
        }
    
        .MuiButton-root {
          display: flex;
          color: ${theme.colors.alpha.trueWhite[70]};
          background-color: transparent;
          width: 100%;
          justify-content: flex-start;
          padding: ${theme.spacing(1.2, 3)};

          .MuiButton-startIcon,
          .MuiButton-endIcon {
            transition: ${theme.transitions.create(['color'])};

            .MuiSvgIcon-root {
              font-size: inherit;
              transition: none;
            }
          }

          .MuiButton-startIcon {
            color: ${theme.colors.alpha.trueWhite[30]};
            font-size: ${theme.typography.pxToRem(20)};
            margin-right: ${theme.spacing(1)};
          }
          
          .MuiButton-endIcon {
            color: ${theme.colors.alpha.trueWhite[50]};
            margin-left: auto;
            opacity: .8;
            font-size: ${theme.typography.pxToRem(20)};
          }

          &.active,
          &:hover {
            background-color: ${alpha(theme.colors.alpha.trueWhite[100], 0.06)};
            color: ${theme.colors.alpha.trueWhite[100]};

            .MuiButton-startIcon,
            .MuiButton-endIcon {
              color: ${theme.colors.alpha.trueWhite[100]};
            }
          }
        }

        &.Mui-children {
          flex-direction: column;

          .MuiBadge-root {
            position: absolute;
            right: ${theme.spacing(7)};
          }
        }

        .MuiCollapse-root {
          width: 100%;

          .MuiList-root {
            padding: ${theme.spacing(1, 0)};
          }

          .MuiListItem-root {
            padding: 1px 0;

            .MuiButton-root {
              padding: ${theme.spacing(0.8, 3)};

              .MuiBadge-root {
                right: ${theme.spacing(3.2)};
              }

              &:before {
                content: ' ';
                background: ${theme.colors.alpha.trueWhite[100]};
                opacity: 0;
                transition: ${theme.transitions.create([
                  'transform',
                  'opacity'
                ])};
                width: 6px;
                height: 6px;
                transform: scale(0);
                transform-origin: center;
                border-radius: 20px;
                margin-right: ${theme.spacing(1.8)};
              }

              &.active,
              &:hover {

                &:before {
                  transform: scale(1);
                  opacity: 1;
                }
              }
            }
          }
        }
      }
    }
`
);

function SidebarMenu() {
  const { closeSidebar } = useContext(SidebarContext);
  const router = useRouter();
  const currentRoute = router.pathname;

  const { user } = useAuth();

  return (
    <>
      <MenuWrapper sx={{ pt: 2 }}>
        <List
          component="div"
          subheader={
            <ListSubheader component="div" disableSticky>
              Cộng đồng
            </ListSubheader>
          }
        >
          <SubMenuWrapper>
            <List component="div">
              <ListItem component="div">
                <NextLink href="/" passHref>
                  <Button
                    className={
                      currentRoute === '/' ||
                      currentRoute === '/communities/home/home-following' ||
                      currentRoute === '/communities/home/home-create-post'
                        ? 'active'
                        : ''
                    }
                    disableRipple
                    component="a"
                    onClick={closeSidebar}
                    startIcon={<HomeOutlinedIcon />}
                  >
                    Trang chủ
                  </Button>
                </NextLink>
              </ListItem>
              <ListItem component="div">
                <NextLink href="/communities/explore" passHref>
                  <Button
                    className={
                      currentRoute === '/communities/explore' ||
                      currentRoute ===
                        '/communities/explore/explore-choose-trend'
                        ? 'active'
                        : ''
                    }
                    disableRipple
                    component="a"
                    onClick={closeSidebar}
                    startIcon={<SearchOutlinedIcon />}
                  >
                    Khám phá
                  </Button>
                </NextLink>
              </ListItem>

              <ListItem component="div">
                <NextLink href="/communities/groups" passHref>
                  <Button
                    className={
                      currentRoute === '/communities/groups' ? 'active' : ''
                    }
                    disableRipple
                    component="a"
                    onClick={closeSidebar}
                    startIcon={<GroupOutlinedIcon />}
                  >
                    Nhóm
                  </Button>
                </NextLink>
              </ListItem>
            </List>
          </SubMenuWrapper>
        </List>
        {user && user.role != 'user' ? (
          <List
            component="div"
            subheader={
              <ListSubheader component="div" disableSticky>
                Trang học tập
              </ListSubheader>
            }
          >
            <SubMenuWrapper>
              <List component="div">
                <ListItem component="div">
                  <NextLink href="/elearning" passHref>
                    <Button
                      className={currentRoute === '/elearning' ? 'active' : ''}
                      disableRipple
                      component="a"
                      onClick={closeSidebar}
                      startIcon={<SchoolOutlinedIcon />}
                    >
                      Trường của bạn
                    </Button>
                  </NextLink>
                </ListItem>
              </List>
            </SubMenuWrapper>
          </List>
        ) : (
          <></>
        )}
        {user ? (
          <List
            component="div"
            subheader={
              <ListSubheader component="div" disableSticky>
                Tài khoản
              </ListSubheader>
            }
          >
            <SubMenuWrapper>
              <List component="div">
                <ListItem component="div">
                  <NextLink href={`/management/profile/${user?.id}`} passHref>
                    <Button
                      className={
                        currentRoute === `/management/profile/[userID]`
                          ? 'active'
                          : ''
                      }
                      disableRipple
                      component="a"
                      onClick={closeSidebar}
                      startIcon={<AccountCircleTwoToneIcon />}
                    >
                      Trang cá nhân
                    </Button>
                  </NextLink>
                </ListItem>
                {/* <ListItem component="div">
                  <NextLink href="/management/profile/settings" passHref>
                    <Button
                      className={
                        currentRoute === '/management/profile/settings'
                          ? 'active'
                          : ''
                      }
                      disableRipple
                      component="a"
                      onClick={closeSidebar}
                      startIcon={<DisplaySettingsTwoToneIcon />}
                    >
                      Cài đặt
                    </Button>
                  </NextLink>
                </ListItem> */}
              </List>
            </SubMenuWrapper>
          </List>
        ) : (
          <></>
        )}
      </MenuWrapper>
    </>
  );
}

export default SidebarMenu;
