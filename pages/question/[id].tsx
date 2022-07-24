import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
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
      <h1>{question?.question}</h1>

      <div>
        {(question?.options as OptionType[])?.map((option, index) => {
          if (isOwner || data.vote) {
            const vote = getVoteByChoice(index);
            const percentage = ((vote?._count ?? 0) / totalVotes) * 100;
            return (
              <div key={option.text}>
                <div>
                  {option.text} ({vote?._count})
                </div>
                <progress id="file" max={totalVotes} value={vote?._count} />
                {percentage.toFixed(2)} %
              </div>
            );
          }
          return (
            <div key={option.text}>
              {option.text}
              <button
                type="button"
                disabled={isVoting}
                onClick={() => handleOnClick(index)}
              >
                Vote
              </button>
            </div>
          );
        })}
      </div>
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
      <Link href="/">Home</Link>
      <QuestionPageContent id={id} />
    </div>
  );
}

export default QuestionPage;
