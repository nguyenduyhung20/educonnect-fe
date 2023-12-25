import Head from 'next/head';
import { Container, Stack, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import ElearningLayout from '@/layouts/elearning';
import { ElearningGradeTen } from '@/sections/dashboards/elearning/elearning-grade-ten';
import { ElearningGradeEleven } from '@/sections/dashboards/elearning/elearning-grade-elevent';
import { ContainHeader } from '@/sections/dashboards/elearning/contain-header';
import { ElearningGradeTwelve } from '@/sections/dashboards/elearning/elearning-grade-twelve';

function EleaningPage() {
  const tabs = [
    {
      label: 'Lớp 10',
      key: 'Lớp 10'
    },
    {
      label: 'Lớp 11',
      key: 'Lớp 11'
    },
    {
      label: 'Lớp 12',
      key: 'Lớp 12'
    }
  ];
  const [tab, setTab] = useState(tabs[0].key);

  return (
    <>
      <Head>
        <title>Crypto Dashboard</title>
      </Head>

      <Container maxWidth="lg">
        <Stack mt={2} spacing={4}>
          <ContainHeader
            tabs={
              <Tabs
                indicatorColor="primary"
                textColor="primary"
                value={tab}
                onChange={(_, value) => setTab(value)}
              >
                {tabs.map((tab) => (
                  <Tab key={tab.key} label={tab.label} value={tab.key} />
                ))}
              </Tabs>
            }
          />
          {tab === tabs[0].key && <ElearningGradeTen />}
          {tab === tabs[1].key && <ElearningGradeEleven />}
          {tab === tabs[2].key && <ElearningGradeTwelve />}
        </Stack>
      </Container>
    </>
  );
}

EleaningPage.getLayout = (page) => <ElearningLayout>{page}</ElearningLayout>;

export default EleaningPage;
