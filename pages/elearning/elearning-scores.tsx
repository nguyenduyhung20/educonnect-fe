import Head from 'next/head';
import {
  Box,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import Footer from '@/components/Footer';
import ElearningLayout from '@/layouts/elearning';

function EleaningScoresPage() {
  return (
    <>
      <Head>
        <title>Crypto Dashboard</title>
      </Head>

      <Container maxWidth="lg">
        <Box sx={{ width: 1, mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Mã Môn học</TableCell>
                <TableCell align="center">Tên môn học</TableCell>{' '}
                <TableCell align="center">Điểm thành phần</TableCell>
                <TableCell align="center">Điểm tổng kết</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                sx={{
                  '.MuiTableCell-root': {
                    paddingTop: '16px',
                    paddingBottom: '16px'
                  }
                }}
              >
                <TableCell align="center">
                  <Typography variant="inherit">TH11</Typography>
                </TableCell>

                <TableCell align="center">
                  <Typography>Toán học 11</Typography>
                </TableCell>

                <TableCell align="center">{'5, ' + '10, ' + '10'}</TableCell>
                <TableCell align="center" sx={{ whiteSpace: 'nowrap' }}>
                  8
                </TableCell>
              </TableRow>

              <TableRow
                sx={{
                  '.MuiTableCell-root': {
                    paddingTop: '16px',
                    paddingBottom: '16px'
                  }
                }}
              >
                <TableCell align="center">
                  <Typography variant="inherit">HH11</Typography>
                </TableCell>

                <TableCell align="center">
                  <Typography>Hoá học 11</Typography>
                </TableCell>

                <TableCell align="center">{'5, ' + '10, ' + '10'}</TableCell>
                <TableCell align="center" sx={{ whiteSpace: 'nowrap' }}>
                  8
                </TableCell>
              </TableRow>

              <TableRow
                sx={{
                  '.MuiTableCell-root': {
                    paddingTop: '16px',
                    paddingBottom: '16px'
                  }
                }}
              >
                <TableCell align="center">
                  <Typography variant="inherit">VL11</Typography>
                </TableCell>

                <TableCell align="center">
                  <Typography>Vật lý 11</Typography>
                </TableCell>

                <TableCell align="center">{'5, ' + '10, ' + '10'}</TableCell>
                <TableCell align="center" sx={{ whiteSpace: 'nowrap' }}>
                  8
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </Container>
      <Footer />
    </>
  );
}

EleaningScoresPage.getLayout = (page) => (
  <ElearningLayout>{page}</ElearningLayout>
);

export default EleaningScoresPage;
