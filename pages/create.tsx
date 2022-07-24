import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import {
  CreateQuestionInputType,
  createQuestionValidator,
} from "../shared/create-question-validator";
import { trpc } from "../utils/trpc";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {};

const CreateQuestion = (props: Props) => {
  return (
    <div>
      <h1>Create a new question</h1>

      <CreateQuestionForm />
    </div>
  );
};

const CreateQuestionForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateQuestionInputType>({
    resolver: zodResolver(createQuestionValidator),
  });
  const [questionText, setQuestionText] = React.useState("");
  const { mutate, isLoading } = trpc.useMutation("questions.create", {
    onSuccess() {
      setQuestionText("");
      router.push("/");
    },
  });

  return (
    <form action="" onSubmit={handleSubmit((data) => mutate(data))}>
      <div>
        <input
          type="text"
          {...register("question")}
          disabled={isLoading}
          onChange={(e) => setQuestionText(e.target.value)}
        />
        {errors.question && (
          <p className="text-red-400">{errors.question.message}</p>
        )}
      </div>

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Saving" : "Save"}
      </button>
    </form>
  );
};

export default CreateQuestion;
