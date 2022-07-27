import { Card, Grid, Text, Title } from "@mantine/core";
import { PollQuestion } from "@prisma/client";
import type { NextPage } from "next";
import { useCallback } from "react";
import { toast, ToastContainer } from "react-toast";

import QuestionCard from "../components/question-card";

import { trpc } from "../utils/trpc";

const Home: NextPage = ({}) => {
  const { data, isLoading, error } = trpc.useQuery(["questions.get-all"]);

  const copyToClipboard = useCallback((question: PollQuestion) => {
    const url = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : `http://localhost:${process.env.PORT ?? 3000}`;

    navigator.clipboard.writeText(`${url}/question/${question.id}`);
    toast.success("Url copied to clipboard");
  }, []);

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
            <QuestionCard question={q} copyToClipboard={copyToClipboard} />
          </Grid.Col>
        ))}
        {process.env.VERCEL_URL}
      </Grid>
      <ToastContainer position="bottom-right" delay={1000} />
    </div>
  );
};

export default Home;
