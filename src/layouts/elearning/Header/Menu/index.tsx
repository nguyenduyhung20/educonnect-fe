import { useAuth } from '@/hooks/use-auth';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  styled
} from '@mui/material';
import Link from 'src/components/Link';


const ListWrapper = styled(Box)(
  ({ theme }) => `
        .MuiTouchRipple-root {
            display: none;
        }
        
        .MuiListItem-root {
            transition: ${theme.transitions.create(['color', 'fill'])};
            
            &.MuiListItem-indicators {
                padding: ${theme.spacing(1, 2)};
            
                .MuiListItemText-root {
                    .MuiTypography-root {
                        &:before {
                            height: 4px;
                            width: 22px;
                            opacity: 0;
                            visibility: hidden;
                            display: block;
                            position: absolute;
                            bottom: -10px;
                            transition: all .2s;
                            border-radius: ${theme.general.borderRadiusLg};
                            content: "";
                            background: ${theme.colors.primary.main};
                        }
                    }
                }

                &.active,
                &:active,
                &:hover {
                
                    background: transparent;
                
                    .MuiListItemText-root {
                        .MuiTypography-root {
                            &:before {
                                opacity: 1;
                                visibility: visible;
                                bottom: 0px;
                            }
                        }
                    }
                }
            }
        }
`
);

function HeaderMenu() {
  const { user } = useAuth();
  return (
    <>
      <ListWrapper
        sx={{
          display: {
            xs: 'none',
            md: 'block'
          }
        }}
      >
        <List disablePadding component={Box} display="flex">
          <ListItem
            classes={{ root: 'MuiListItem-indicators' }}
            button
            component={Link}
            href="/elearning"
          >
            <ListItemText
              primaryTypographyProps={{ noWrap: true }}
              primary="Lịch của bạn"
            />
          </ListItem>
          {(user?.role === 'admin' || user?.role === 'student' || user?.role === 'teacher') && <ListItem
            classes={{ root: 'MuiListItem-indicators' }}
            button
            component={Link}
            href="/elearning/school"
          >
            <ListItemText
              primaryTypographyProps={{ noWrap: true }}
              primary="Trường học của bạn"
            />
          </ListItem>}
          {(user?.role === 'parent' || user?.role === 'student')&& <ListItem
            classes={{ root: 'MuiListItem-indicators' }}
            button
            component={Link}
            href="/elearning/elearning-scores"
          >
            <ListItemText
              primaryTypographyProps={{ noWrap: true }}
              primary={user?.role === 'parent' ? "Điểm số của con bạn" : "Điểm số của bạn"}
            />
          </ListItem>}
          {/* <ListItem
            classes={{ root: 'MuiListItem-indicators' }}
            button
            ref={ref}
            onClick={handleOpen}
          >
            <ListItemText
              primaryTypographyProps={{ noWrap: true }}
              primary={
                <Box display="flex" alignItems="center">
                  Others
                  <Box display="flex" alignItems="center" pl={0.3}>
                    <ExpandMoreTwoToneIcon fontSize="small" />
                  </Box>
                </Box>
              }
            />
          </ListItem> */}
        </List>
      </ListWrapper>
    </>
  );
}

export default HeaderMenu;
