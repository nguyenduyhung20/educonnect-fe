import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Stack,
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
                sx={{
                  maxHeight: '350px'
                }}
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
                image={
                  'https://sachhoc.com/image/catalog/LuyenThi/Lop10-12/Sach-giao-khoa-dai-so-10.jpg'
                }
                sx={{
                  maxHeight: '350px'
                }}
              />
              <CardContent>
                <Stack spacing={1}>
                  <Typography fontSize={20} variant="h4">
                    Đại số 10
                  </Typography>
                  <Typography>Trần Tuấn Tú</Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card>
              <CardMedia
                component={'img'}
                image={
                  'https://hieusach24h.com/wp-content/uploads/2021/09/Vat-li-10-1.jpg'
                }
                sx={{
                  maxHeight: '350px'
                }}
              />
              <CardContent>
                <Stack spacing={1}>
                  <Typography fontSize={20} variant="h4">
                    Vật lý 10
                  </Typography>
                  <Typography>Phan Quốc Định</Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={3}>
            <Card>
              <CardMedia
                component={'img'}
                image={
                  'https://salt.tikicdn.com/media/catalog/product/i/m/img900.u335.d20160423.t111315.jpg'
                }
                sx={{
                  maxHeight: '350px'
                }}
              />
              <CardContent>
                <Stack spacing={1}>
                  <Typography fontSize={20} variant="h4">
                    Anh Văn 10
                  </Typography>
                  <Typography>Nguyễn Anh Thư</Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
