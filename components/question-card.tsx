import React from "react";

import { Button, Card, createStyles, Text } from "@mantine/core";
import Link from "next/link";
import { FiShare2 } from "react-icons/fi";
import { PollQuestion } from "@prisma/client";
import { ThemeContext } from "@emotion/react";

type Props = {
  question: PollQuestion;
  copyToClipboard: (question: PollQuestion) => void;
};

const useStyles = createStyles(() => ({
  cardActions: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0",
    marginTop: "1rem",
  },
}));

const QuestionCard = ({ question, copyToClipboard }: Props) => {
  const { classes } = useStyles();

  return (
    <Card
      shadow="sm"
      p="lg"
      radius="md"
      withBorder
      sx={(theme) => ({
        backgroundColor: theme.colors.dark[4],
        border: theme.colors.dark[5],
      })}
    >
      <Text weight={500} color="white" size="xl">
        {question.question}
      </Text>
      <Text color="dimmed" size="sm">
        Created on {question.createdAt.toDateString()}
      </Text>
      <div className={classes.cardActions}>
        <Link href={`/question/${question.id}`} passHref>
          <Text component="a" color="white" p={0}>
            View
          </Text>
        </Link>
        <Button
          variant="subtle"
          leftIcon={<FiShare2 />}
          color="white"
          px={"md"}
          onClick={() => copyToClipboard(question)}
        >
          Share
        </Button>
      </div>
    </Card>
  );
};

export default QuestionCard;
