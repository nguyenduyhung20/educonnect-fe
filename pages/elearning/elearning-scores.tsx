import Head from 'next/head';
import {
  Box,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Chart } from '@/components/Chart';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ElearningLayout from '@/layouts/elearning';
import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { TranscriptApi } from '@/api/elearning/transcript';
import useFunction from '@/hooks/use-function';
import { TranscriptRespone } from '@/types/elearning';

interface ChartData {
  name: string;
  data: number[];
}

function EleaningScoresPage() {
  const { user } = useAuth();
  const [valueTab, setValueTab] = useState('1');
  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setValueTab(newValue);
  };
  const option = {
    chart: {
      id: 'Học Kì'
    },
    xaxis: {
      categories: [
        'Kì 1 Lớp 10',
        'Kì 2 Lớp 10',
        'Kì 1 Lớp 11',
        'Kì 2 Lớp 11',
        'Kì 1 Lớp 12',
        'Kì 2 Lớp 12'
      ]
    },
    stroke: {
      curve: 'smooth' as 'smooth'
    }
  };
  const [chartData, setChartData] = useState<ChartData[]>([]);

  const [selectedStudent, setselectedStudent] = useState<number>(0);

  const getTranscript = useFunction(TranscriptApi.getTranscriptsByRole);
  useEffect(() => {
    getTranscript.call(user.role);
  }, []);

  const transcripts = useMemo(() => {
    const data: TranscriptRespone[] = getTranscript.data?.data;
    // data cho chart
    const newChartData: ChartData[] = data?.map((item) => ({
      name: item.studentName,
      data: item.transcript.map((ele) =>
        parseFloat((ele.sum / ele.scores.length)?.toFixed(2))
      )
    }));
    setChartData(newChartData);

    // data cho bảng điểm
    if (data?.length) {
      setselectedStudent(0);
    }
    return data;
  }, [getTranscript.data]);

  const onChangeSelect = (ev: SelectChangeEvent) => {
    setselectedStudent(parseInt(ev.target.value));
  };

  return (
    <>
      <Head>
        <title>EduConnect</title>
      </Head>

      <Container maxWidth="lg">
        <Box sx={{ width: 1, mt: 2 }}>
          <TabContext value={valueTab}>
            <Box
              sx={{ width: 1, mt: 2 }}
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <FormControl sx={{ m: 1, minWidth: 120 }} variant="standard">
                <InputLabel
                  style={{ fontSize: '16px' }}
                  id="demo-select-small-label"
                >
                  Học sinh
                </InputLabel>
                <Select
                  style={{ fontSize: '16px' }}
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={selectedStudent?.toString()}
                  onChange={onChangeSelect}
                >
                  {transcripts?.map((item, index) => (
                    <MenuItem key={index} value={index}>
                      {item.studentName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList
                  onChange={handleChangeTab}
                  aria-label="lab API tabs example"
                >
                  <Tab label="Bảng điểm" value="1" />
                  <Tab label="Biểu đồ điểm" value="2" />
                </TabList>
              </Box>
            </Box>
            <Card>
              <TabPanel value="1">
                {transcripts?.[selectedStudent]?.transcript?.map(
                  (item, index) => (
                    <Accordion key={index} defaultExpanded>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1-content"
                        id="panel1-header"
                      >
                        <Typography variant="h4">{item.label}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell align="center">Tên môn học</TableCell>{' '}
                              <TableCell align="center">
                                Điểm thành phần
                              </TableCell>
                              <TableCell align="center">
                                Điểm tổng kết
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {item.scores.map((item, index) => (
                              <TableRow
                                key={index}
                                sx={{
                                  '.MuiTableCell-root': {
                                    paddingTop: '16px',
                                    paddingBottom: '16px'
                                  }
                                }}
                              >
                                <TableCell align="center">
                                  <Typography>{item.subjectName}</Typography>
                                </TableCell>

                                <TableCell align="center">
                                  {item.fifteen_minutes_score +
                                    ', ' +
                                    item.midterm_score +
                                    ', ' +
                                    item.final_score}
                                </TableCell>
                                <TableCell
                                  align="center"
                                  sx={{ whiteSpace: 'nowrap' }}
                                >
                                  {item.gpa}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </AccordionDetails>
                    </Accordion>
                  )
                )}
              </TabPanel>

              <TabPanel value="2">
                <Chart
                  type="line"
                  options={option}
                  series={chartData}
                  height={680}
                />
              </TabPanel>
            </Card>
          </TabContext>
        </Box>
      </Container>
    </>
  );
}

EleaningScoresPage.getLayout = (page) => (
  <ElearningLayout>
    <>{page}</>
  </ElearningLayout>
);

export default EleaningScoresPage;
