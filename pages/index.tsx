import type { NextPage } from "next";
import Link from "next/link";

import { trpc } from "../utils/trpc";

const Home: NextPage = ({}) => {
  const { data, isLoading, error } = trpc.useQuery(["questions.get-all"]);

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Something bad happened...</div>;
  }

  console.log(data);

  return (
    <div>
      <h1>Open questions</h1>
      <Link href="/create">Create</Link>
      <ul>
        {data.map((q) => (
          <li key={q.id}>
            {q.question}

            <Link href={`/question/${q.id}`}>View</Link>
          </li>
        ))}
        {process.env.VERCEL_URL}
      </ul>
    </div>
  );
};

export default Home;
