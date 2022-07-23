import type { NextPage } from "next";

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
      <p>
        {data.map((q) => (
          <span key={q.id}>{q.question}</span>
        ))}
        {process.env.VERCEL_URL}
      </p>
    </div>
  );
};

export default Home;
