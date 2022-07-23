import { useRouter } from "next/router";
import React from "react";
import { trpc } from "../utils/trpc";

type Props = {};

const CreateQuestion = (props: Props) => {
  const router = useRouter();
  const [questionText, setQuestionText] = React.useState("");
  const { mutate: createQuestion, isLoading } = trpc.useMutation(
    "questions.create",
    {
      onSuccess() {
        setQuestionText("");
        router.push("/");
      },
    }
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(questionText);
    try {
      createQuestion({ question: questionText });
    } catch (error) {}
  };

  return (
    <div>
      <h1>Create a new question</h1>

      <form action="" onSubmit={handleSubmit}>
        <input
          type="text"
          value={questionText}
          disabled={isLoading}
          onChange={(e) => setQuestionText(e.target.value)}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Saving" : "Save"}
        </button>
      </form>
    </div>
  );
};

export default CreateQuestion;
