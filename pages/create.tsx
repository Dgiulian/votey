import { useRouter } from "next/router";
import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
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
    reset,
  } = useForm<CreateQuestionInputType>({
    resolver: zodResolver(createQuestionValidator),
    defaultValues: {
      options: [{ text: "Yes" }, { text: "No" }],
    },
  });
  const { fields, append, prepend, remove, swap, move, insert } =
    useFieldArray<CreateQuestionInputType>({
      name: "options", // unique name for your Field Array,
      control, // control props comes from useForm (optional: if you are using FormContext)
    });
  const { mutate, isLoading } = trpc.useMutation("questions.create", {
    onSuccess(data) {
      reset();
      router.push(`/questions/${data.id}`);
    },
  });

  return (
    <form action="" onSubmit={handleSubmit((data) => mutate(data))}>
      <div>
        <input type="text" {...register("question")} disabled={isLoading} />
        {errors.question && <p className="">{errors.question.message}</p>}
      </div>
      {/* Options */}
      <div>
        {fields.map((field, index) => {
          return (
            <div key={field.id}>
              <section key={field.id}>
                <input
                  placeholder="name"
                  {...register(`options.${index}.text`, {
                    required: true,
                  })}
                />
                <button type="button" onClick={() => remove(index)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </section>
            </div>
          );
        })}
      </div>
      {/* Add new Question */}
      <div className="flex items-center my-3">
        <button
          type="button"
          value="Add more options"
          onClick={() => append({ text: "Another Option" })}
        >
          Add options
        </button>
      </div>

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Saving" : "Save"}
      </button>
    </form>
  );
};

export default CreateQuestion;
