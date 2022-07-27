import {
  Box,
  Button,
  Group,
  Progress,
  Space,
  Text,
  Title,
} from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { getPercentage } from "../../utils/misc";
import { trpc } from "../../utils/trpc";

const QuestionPageContent: React.FC<{ id: string }> = ({ id }) => {
  const { data, isLoading, error } = trpc.useQuery([
    "questions.get-by-id",
    { id },
  ]);
  const { mutate, isLoading: isVoting } = trpc.useMutation(
    "questions.vote-on-question",
    {
      onSuccess(data) {
        window.location.reload();
      },
    }
  );

  const handleOnClick = (option: number) => {
    mutate({
      questionId: id,
      option,
    });
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!data) {
    return <div>No data available</div>;
  }
  const { question, isOwner, votes } = data;

  if (!question) {
    return <div>No data available</div>;
  }

  console.log(data);

  const totalVotes =
    votes?.reduce((count, vote) => count + vote._count, 0) ?? 0;

  const getVoteByChoice = (option: number) =>
    votes?.find((vote) => vote.choice === option);

  return (
    <div>
      <Title order={1} mb="xl" my="xl">
        {question?.question}
      </Title>

      <Box>
        {(question?.options as OptionType[])?.map((option, index) => {
          if (isOwner || data.vote) {
            const vote = getVoteByChoice(index);
            const percentage = getPercentage(vote?._count ?? 0, totalVotes);

            return (
              <Box key={option.text} mb="xl">
                <Group>
                  <Text size="md">{option.text}</Text>
                  <Text>({vote?._count ?? 0})</Text>
                </Group>

                <Progress value={percentage} size="md" my="xs" />
                <Text size="md" my="sm">
                  {percentage.toFixed(2)} %
                </Text>
              </Box>
            );
          }
          return (
            <div key={option.text}>
              <Group my="sm">
                <Text>{option.text}</Text>
                <Button
                  type="button"
                  disabled={isVoting}
                  onClick={() => handleOnClick(index)}
                >
                  Vote
                </Button>
              </Group>
            </div>
          );
        })}
      </Box>
    </div>
  );
};
type OptionType = {
  text: string;
};
function QuestionPage() {
  const { query } = useRouter();
  const { id } = query;
  if (!id || Array.isArray(id)) {
    return <div>Something went horribly wrong!</div>;
  }
  return (
    <div>
      <QuestionPageContent id={id} />
      <Space h="xl" />
      <Link href="/" passHref>
        <Text component="a">Go back</Text>
      </Link>
    </div>
  );
}

export default QuestionPage;
