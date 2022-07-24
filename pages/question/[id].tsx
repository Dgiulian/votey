import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { trpc } from "../../utils/trpc";

const QuestionPageContent: React.FC<{ id: string }> = ({ id }) => {
  const { data, isLoading, error } = trpc.useQuery([
    "questions.get-by-id",
    { id },
  ]);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (!data) {
    return <div>No data available</div>;
  }
  const { question, isOwner } = data;

  if (!question) {
    return <div>No data available</div>;
  }
  return (
    <div>
      {question?.question}
      {isOwner && <p>You are the owner</p>}
      <ul>
        {(question?.options as OptionType[])?.map((option) => (
          <li key={option.text}>{option.text}</li>
        ))}
      </ul>
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
      <h1>Question Page</h1>
      <QuestionPageContent id={id} />
    </div>
  );
}

export default QuestionPage;
