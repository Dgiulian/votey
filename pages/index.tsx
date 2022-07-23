import type { NextPage } from "next";

import { trpc } from "../utils/trpc";

const Home: NextPage = ({}) => {
  const { data, isLoading, error } = trpc.useQuery(["question.get-all"]);

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Something bad happened...</div>;
  }

  return (
    <div>
      <p>
        {data.map((q) => (
          <div key={q.id}>{q.question}</div>
        ))}
        {process.env.VERCEL_URL}
      </p>
    </div>
  );
};

export default Home;
