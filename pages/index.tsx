import { Card, Grid, Text, Title } from "@mantine/core";
import type { NextPage } from "next";

import QuestionCard from "../components/question-card";

import { trpc } from "../utils/trpc";

const Home: NextPage = ({}) => {
  const { data, isLoading, error } = trpc.useQuery(["questions.get-all"]);

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Something bad happened...</div>;
  }

  return (
    <div>
      <Title order={3} mb="md" color="white">
        Open questions
      </Title>

      <Grid>
        {data.map((q) => (
          <Grid.Col span={4} key={q.id}>
            <QuestionCard question={q} />
          </Grid.Col>
        ))}
        {process.env.VERCEL_URL}
      </Grid>
    </div>
  );
};

export default Home;
