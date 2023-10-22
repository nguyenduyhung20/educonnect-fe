import Head from 'next/head';
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
  Typography
} from '@mui/material';
import Footer from '@/components/Footer';
import ElearningLayout from '@/layouts/elearning';
import Scrollbar from '@/components/Scrollbar';

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
            <TableBody></TableBody>
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
