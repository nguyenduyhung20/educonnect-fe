import {
    Box,
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    Container,
    Grid,
    Stack,
    Tab,
    Tabs,
    Typography
  } from '@mui/material';
import React from 'react';

export const ElearningGradeTen = () => {
  return (
    <>
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Card>
              <CardMedia
                component={'img'}
                image={'/static/images/elearning/sgk-hoa-lop-10.jpg'}
              />
              <CardContent>
                <Stack spacing={1}>
                  <Typography fontSize={20} variant="h4">
                    Hoá Học 10
                  </Typography>
                  <Typography>Huỳnh Thị Mỹ Điều</Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card>
              <CardMedia
                component={'img'}
                image={'/static/images/elearning/sgk-hoa-lop-10.jpg'}
              />
              <CardContent>
                <Stack spacing={1}>
                  <Typography fontSize={20} variant="h4">
                    Hoá Học 10
                  </Typography>
                  <Typography>Huỳnh Thị Mỹ Điều</Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card>
              <CardMedia
                component={'img'}
                image={'/static/images/elearning/sgk-hoa-lop-10.jpg'}
              />
              <CardContent>
                <Stack spacing={1}>
                  <Typography fontSize={20} variant="h4">
                    Hoá Học 10
                  </Typography>
                  <Typography>Huỳnh Thị Mỹ Điều</Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card>
              <CardMedia
                component={'img'}
                image={'/static/images/elearning/sgk-hoa-lop-10.jpg'}
              />
              <CardContent>
                <Stack spacing={1}>
                  <Typography fontSize={20} variant="h4">
                    Hoá Học 10
                  </Typography>
                  <Typography>Huỳnh Thị Mỹ Điều</Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
